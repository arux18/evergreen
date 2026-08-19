#!/usr/bin/env node
/**
 * Lints a .pen design file for off-scale spacing values.
 *
 * Walks every node's `padding`, `gap`, and `margin` (raw numbers and numeric
 * arrays; string variable refs are skipped — those are already token-bound)
 * and reports each value that is not on the design-system spacing scale,
 * with its node path and the two nearest tokens.
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

function walk(node, path, findings, counts) {
  if (!node || typeof node !== 'object' || Array.isArray(node)) return
  const label = node.name || node.id || '?'
  const here = path.concat(label)

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
    walk(child, here, findings, counts)
  }
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

  for (const root of pen.children || []) {
    walk(root, [], findings, counts)
  }

  const pct = counts.total === 0 ? 0 : Math.round((counts.offScale / counts.total) * 1000) / 10

  if (json) {
    console.log(
      JSON.stringify(
        { file, scale: SCALE, summary: { ...counts, offScalePct: pct }, findings },
        null,
        2,
      ),
    )
  } else {
    for (const f of findings) {
      console.log(`OFF-SCALE ${f.property}=${f.value} nearest ${f.nearestTokens} at ${f.path}${f.id ? ` [${f.id}]` : ''}`)
    }
    console.log(
      `\n${file}: ${counts.total} spacing values — ${counts.onScale} on-scale, ${counts.offScale} off-scale (${pct}%)`,
    )
  }

  // exitCode (not process.exit) — exit() can truncate large piped stdout before it flushes
  process.exitCode = strict && counts.offScale > 0 ? 1 : 0
}

main()
