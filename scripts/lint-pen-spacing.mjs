#!/usr/bin/env node
/**
 * Lints a .pen design file for off-scale spacing values.
 *
 * Walks every node's `padding`, `gap`, and `margin` (raw numbers and numeric
 * arrays; string variable refs are skipped — those are already token-bound)
 * and reports each value that is not on the design-system spacing scale,
 * with its node path and the two nearest tokens.
 *
 * Also reports duplicate same-named reusable components (a wrong-node hazard:
 * agents transferring styles can implement/verify against the wrong spec).
 *
 * Advisory-first policy (2026-08-19): default mode ALWAYS exits 0 — the report
 * is the gate artifact, reviewed and acknowledged by the design owner before a
 * design moves to pencil/designs/4-approved/. Pass --strict to exit 1 on any
 * off-scale value (future hard-gate mode, once approved designs are cleaned).
 *
 * Usage: node scripts/lint-pen-spacing.mjs <file.pen> [--json] [--strict]
 */
import fs from 'fs'

// Spacing token scale from @money-evergreen/design-system tokens/spacing.ts
// (px): 2→4xs, 4→3xs, 8→2xs, 12→xs, 16→sm, 24→md, 32→lg, 40→xl, 48→2xl,
// 64→3xl, 72→4xl, 128→5xl. 0 is always on-scale.
const SCALE = [0, 2, 4, 8, 12, 16, 24, 32, 40, 48, 64, 72, 128]
const TOKEN_NAMES = {
  0: '0',
  2: '4xs',
  4: '3xs',
  8: '2xs',
  12: 'xs',
  16: 'sm',
  24: 'md',
  32: 'lg',
  40: 'xl',
  48: '2xl',
  64: '3xl',
  72: '4xl',
  128: '5xl',
}
const PROPS = ['padding', 'gap', 'margin']

function nearestTokens(value) {
  let below = null
  let above = null
  for (const t of SCALE) {
    if (t <= value) below = t
    if (t >= value && above === null) above = t
  }
  const fmt = (t) => (t === null ? 'none' : `${t} (${TOKEN_NAMES[t]})`)
  return `${fmt(below)} / ${fmt(above)}`
}

function numericValues(raw) {
  if (typeof raw === 'number') return [raw]
  if (Array.isArray(raw)) return raw.filter((v) => typeof v === 'number')
  return [] // strings are variable refs (already token-bound); objects are ignored
}

function walk(node, path, findings, counts, components) {
  if (!node || typeof node !== 'object' || Array.isArray(node)) return
  const label = node.name || node.id || '?'
  const here = path.concat(label)

  if (node.reusable === true && node.name) {
    const list = components.get(node.name) || []
    list.push({
      id: node.id ?? null,
      path: here.join(' > '),
      spec: JSON.stringify({ padding: node.padding ?? null, gap: node.gap ?? null }),
    })
    components.set(node.name, list)
  }

  for (const prop of PROPS) {
    for (const value of numericValues(node[prop])) {
      counts.total++
      if (SCALE.includes(value)) {
        counts.onScale++
      } else {
        counts.offScale++
        findings.push({
          path: here.join(' > '),
          id: node.id ?? null,
          property: prop,
          value,
          nearestTokens: nearestTokens(value),
        })
      }
    }
  }

  for (const child of node.children || []) {
    walk(child, here, findings, counts, components)
  }
}

// Same-named reusable components are a wrong-node hazard for style transfer:
// an agent matching by name may implement/verify against the wrong spec.
function duplicateComponents(components) {
  const duplicates = []
  for (const [name, nodes] of components) {
    if (nodes.length < 2) continue
    const specsDiffer = new Set(nodes.map((n) => n.spec)).size > 1
    duplicates.push({ name, specsDiffer, nodes })
  }
  return duplicates
}

function main() {
  const args = process.argv.slice(2)
  const json = args.includes('--json')
  const strict = args.includes('--strict')
  const file = args.find((a) => !a.startsWith('--'))

  if (!file) {
    console.error('Usage: node scripts/lint-pen-spacing.mjs <file.pen> [--json] [--strict]')
    process.exit(2)
  }

  const pen = JSON.parse(fs.readFileSync(file, 'utf8'))
  const findings = []
  const counts = { total: 0, onScale: 0, offScale: 0 }
  const components = new Map()

  for (const root of pen.children || []) {
    walk(root, [], findings, counts, components)
  }

  const duplicates = duplicateComponents(components)
  const pct = counts.total === 0 ? 0 : Math.round((counts.offScale / counts.total) * 1000) / 10

  if (json) {
    console.log(
      JSON.stringify(
        { file, scale: SCALE, summary: { ...counts, offScalePct: pct }, findings, duplicates },
        null,
        2,
      ),
    )
  } else {
    for (const f of findings) {
      console.log(`OFF-SCALE ${f.property}=${f.value} nearest ${f.nearestTokens} at ${f.path}${f.id ? ` [${f.id}]` : ''}`)
    }
    for (const d of duplicates) {
      console.log(
        `DUPLICATE-NAME "${d.name}" x${d.nodes.length}${d.specsDiffer ? ' with DIFFERING padding/gap specs' : ' (same spec)'}: ${d.nodes.map((n) => `${n.id ?? '?'} at ${n.path}`).join(' | ')}`,
      )
    }
    console.log(
      `\n${file}: ${counts.total} spacing values — ${counts.onScale} on-scale, ${counts.offScale} off-scale (${pct}%); ${duplicates.length} duplicate component name${duplicates.length === 1 ? '' : 's'}`,
    )
  }

  // exitCode (not process.exit) — exit() can truncate large piped stdout before it flushes
  process.exitCode = strict && counts.offScale > 0 ? 1 : 0
}

main()
