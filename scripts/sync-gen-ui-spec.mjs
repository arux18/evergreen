#!/usr/bin/env node
/**
 * Keeps a gen-UI canvas spec in step with its .pen file.
 *
 * Written for gen-ui-canvas_v2.pen and its spec, gen-ui-canvas_v2.md. Run it
 * after every change to the .pen, before committing.
 *
 * Writes <file>.components.md: every local component's layers and the tokens
 * they bind, with values that aren't bound to Hemlock in bold. It's generated
 * from the .pen, so never edit it by hand.
 *
 * Reports what it can't write, so the hand-written spec gets updated:
 *   CHANGED  components, top-level frames, notes, board text and local tokens
 *            added, removed, renamed or edited since the spec was last reviewed
 *            (the baseline), with the spec lines that mention each component
 *   STALE    component and layer names, node IDs, Hemlock components and tokens
 *            the spec mentions that no longer exist
 *   MISSING  components the spec never mentions
 *   NOTES    the same staleness check over the notes inside the .pen (advisory)
 *
 * Once the spec is up to date, record the review with --write-baseline.
 *
 * Advisory by default (always exits 0), same policy as check-hemlock-deps.mjs.
 *
 * Usage:
 *   node scripts/sync-gen-ui-spec.mjs [file.pen] [--check] [--write-baseline] [--strict]
 *
 *   --check           write nothing; also report whether the reference is out of date
 *   --write-baseline  record the current .pen as reviewed against the spec
 *   --strict          exit 1 if the reference is out of date, or if CHANGED, STALE
 *                     or MISSING lists anything
 *
 * Defaults: file = pencil/design-system/in-progress/gen-ui-canvas_v2.pen
 *           spec = <file>.md, reference = <file>.components.md,
 *           baseline = <file>.spec-baseline.json (all next to the .pen)
 */
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

const argv = process.argv.slice(2)
const has = (f) => argv.includes(f)
const positional = argv.filter((a) => !a.startsWith('--'))

const penPath = path.resolve(positional[0] || 'pencil/design-system/in-progress/gen-ui-canvas_v2.pen')
const stem = penPath.replace(/\.pen$/, '')
const specPath = `${stem}.md`
const refPath = `${stem}.components.md`
const baselinePath = `${stem}.spec-baseline.json`
const rel = (p) => path.relative(process.cwd(), p)
const base = (p) => path.basename(p)

const pen = JSON.parse(fs.readFileSync(penPath, 'utf8'))
if (!(pen.children || []).length) {
  console.error(`${rel(penPath)} has no nodes. Save it in Pencil, then run this again.`)
  process.exit(2)
}
const alias = Object.keys(pen.imports || {}).find((k) => /hemlock/i.test(pen.imports[k]))
const lib = alias ? JSON.parse(fs.readFileSync(path.resolve(path.dirname(penPath), pen.imports[alias]), 'utf8')) : {}
const P = alias ? `${alias}:` : '\u0000'

// ---------- indexes ----------

function indexDoc(doc) {
  const nodes = new Map()
  const parent = new Map()
  const order = []
  const visit = (n, p) => {
    if (!n || typeof n !== 'object') return
    nodes.set(n.id, n)
    if (p) parent.set(n.id, p)
    order.push(n)
    for (const c of n.children || []) visit(c, n)
  }
  for (const c of doc.children || []) visit(c, null)
  return { nodes, parent, order }
}
const { nodes, parent, order } = indexDoc(pen)
const libNodes = indexDoc(lib).nodes
const hemlockTokens = new Set(Object.keys(lib.variables || {}))
const localTokens = pen.variables || {}
const components = order.filter((n) => n.reusable)
const componentNames = components.map((c) => c.name)
const layerNames = new Set(order.map((n) => n.name).filter(Boolean))
const hemlockComponents = [...libNodes.values()].filter((n) => n.reusable).map((n) => n.name.replace(/^component\//, ''))

const ancestors = (n) => {
  const out = []
  for (let p = parent.get(n.id); p; p = parent.get(p.id)) out.push(p)
  return out
}
const boardOf = (n) => ancestors(n).at(-1) || n
// A board's sections are its direct children ("05 Numbers", "Row / Yes-No").
const sectionOf = (n) => ancestors(n).at(-2) || null
const familyOf = (name) => {
  const s = name.split(' / ')
  return s.length >= 3 ? s.slice(0, -1).join(' / ') : name
}
const hash = (v) => crypto.createHash('sha256').update(JSON.stringify(v)).digest('hex').slice(0, 12)
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const isExempt = (c) => /^Annotation \//.test(c.name)

// ---------- layer specs ----------

const short = (v) => (typeof v === 'number' ? String(+v.toFixed(3)) : String(v))
const WEIGHTS = { normal: '400', bold: '700' }
const isVar = (v) => typeof v === 'string' && v.startsWith('$')
const clip = (s, n = 40) => (s.length > n ? `${s.slice(0, n - 1)}…` : s)

// Formats one layer's values. Tokens print as `name`. Anything that skips
// Hemlock prints in bold and goes onto `raw` as { at, what }, where `at` names
// a layer inside an instance (empty for the layer itself).
function formatter(raw, at = '') {
  const flag = (what) => {
    raw.push({ at, what })
    return `**${what}**`
  }
  const t = (v, what) => {
    if (isVar(v)) {
      if (v.startsWith(`$${P}`)) return `\`${v.slice(P.length + 1)}\``
      raw.push({ at, what: `${what} \`${v.slice(1)}\` (local token)` })
      return `\`${v.slice(1)}\` (local)`
    }
    if (v === 0) return '0'
    raw.push({ at, what: `${what} ${short(v)}` })
    return `**${short(v)}**`
  }
  const list = (v, what) => (Array.isArray(v) ? `[${v.map((x) => t(x, what)).join(', ')}]` : t(v, what))
  const paint = (f, what) => {
    const arr = (Array.isArray(f) ? f : [f]).filter((x) => x !== undefined && x !== null && x.enabled !== false)
    if (!arr.length) return null
    return arr
      .map((x) => {
        if (typeof x === 'string') return t(x, what)
        if (x.type === 'color') return t(x.color, what)
        if (x.type === 'gradient') {
          return `${x.gradientType || 'linear'} gradient ${(x.colors || []).map((c) => t(c.color, `${what} stop`)).join(' → ')}`
        }
        return x.type
      })
      .join(' + ')
  }
  const effects = (e) =>
    (Array.isArray(e) ? e : [e])
      .filter((x) => x && x.enabled !== false)
      .map((x) => {
        if (x.type !== 'shadow') return `${x.type.replace('_', ' ')}${x.radius !== undefined ? ` ${short(x.radius)}` : ''}`
        const parts = [x.shadowType === 'inner' ? 'inner shadow' : 'shadow']
        parts.push(`y ${t(x.offset?.y ?? 0, 'shadow y')}`, `blur ${t(x.blur ?? 0, 'shadow blur')}`)
        if (x.offset?.x) parts.push(`x ${short(x.offset.x)}`)
        if (x.color) parts.push(t(x.color, 'shadow color'))
        return parts.join(' ')
      })
      .join(', ')
  return { flag, t, list, paint, effects }
}

// What one layer binds, as a single line; null when it binds nothing.
function describe(n, raw, isRoot) {
  const { flag, t, list, paint, effects } = formatter(raw)
  const parts = []
  const spacing = () => {
    if (n.gap !== undefined && n.gap !== 0) parts.push(`gap ${t(n.gap, 'gap')}`)
    const flat = Array.isArray(n.padding) ? n.padding : [n.padding]
    if (n.padding !== undefined && flat.some((v) => v !== 0)) parts.push(`padding ${list(n.padding, 'padding')}`)
  }
  const surface = () => {
    const fill = n.fill !== undefined && paint(n.fill, 'fill')
    if (fill) parts.push(`fill ${fill}`)
    const stroke = n.stroke !== undefined && paint(n.stroke, 'border')
    if (stroke) {
      const w = n.strokeWidth
      const width = w === undefined ? '' : typeof w === 'object' ? ` ${Object.entries(w).map(([s, v]) => `${s} ${short(v)}`).join(' ')}` : ` ${short(w)}`
      parts.push(`border ${stroke}${width}`)
    }
    const flatRadius = Array.isArray(n.cornerRadius) ? n.cornerRadius : [n.cornerRadius]
    if (n.cornerRadius !== undefined && flatRadius.some((v) => v !== 0)) parts.push(`radius ${list(n.cornerRadius, 'radius')}`)
    const e = n.effect !== undefined && effects(n.effect)
    if (e) parts.push(e)
  }
  const opacity = () => {
    if (n.opacity !== undefined && n.opacity !== 1) parts.push(`opacity ${short(n.opacity)}`)
  }

  if (n.type === 'ref') {
    const imported = n.ref.startsWith(P)
    const master = imported ? libNodes.get(n.ref.slice(P.length)) : nodes.get(n.ref)
    parts.push(imported ? `Hemlock \`${(master?.name || n.ref).replace(/^component\//, '')}\`` : `\`${master?.name || n.ref}\``)
    for (const [k, label] of [['fontFamily', 'font'], ['fontSize', 'size'], ['lineHeight', 'line height']]) {
      if (n[k] !== undefined) parts.push(`${label} ${t(n[k], label)}`)
    }
    spacing()
    surface()
    opacity()
    for (const [key, o] of Object.entries(n.descendants || {})) if (o && typeof o === 'object') parts.push(override(n.ref, key, o, raw))
    return parts.join(' · ')
  }

  if (n.type === 'text') {
    parts.push(n.fontFamily !== undefined ? t(n.fontFamily, 'font') : flag('font not set'))
    const size = n.fontSize !== undefined ? t(n.fontSize, 'size') : flag('size not set')
    parts.push(`${size} / ${n.lineHeight !== undefined ? t(n.lineHeight, 'line height') : flag('line height not set')}`)
    if (n.fontWeight !== undefined) parts.push(WEIGHTS[n.fontWeight] || short(n.fontWeight))
    if (n.fontStyle && n.fontStyle !== 'normal') parts.push(n.fontStyle)
    if (n.letterSpacing) parts.push(`tracking ${short(n.letterSpacing)}`)
    parts.push((n.fill !== undefined && paint(n.fill, 'color')) || 'no color') // invisible on purpose, e.g. a line-box strut
    opacity()
    return parts.join(' · ')
  }

  if (n.type === 'icon') {
    parts.push(`${n.icon || 'icon'} ${short(n.width ?? '')}`.trim())
    const color = n.fill !== undefined && paint(n.fill, 'icon color')
    if (color) parts.push(color)
    opacity()
    return parts.join(' · ')
  }

  if (isRoot && (typeof n.width === 'number' || typeof n.height === 'number')) {
    parts.push([typeof n.width === 'number' && `width ${short(n.width)}`, typeof n.height === 'number' && `height ${short(n.height)}`].filter(Boolean).join(', '))
  }
  spacing()
  surface()
  opacity()
  return parts.length ? parts.join(' · ') : null
}

// The node an instance override targets. Keys are ID paths that can step
// through nested instances, so resolve each step in the right document.
function findInside(refId, key) {
  let inLib = refId.startsWith(P)
  let root = inLib ? libNodes.get(refId.slice(P.length)) : nodes.get(refId)
  const findById = (n, id) => {
    if (!n) return null
    if (n.id === id) return n
    for (const c of n.children || []) {
      const hit = findById(c, id)
      if (hit) return hit
    }
    return null
  }
  let node = null
  const ids = key.split('/')
  for (const [i, step] of ids.entries()) {
    node = findById(root, step.startsWith(P) ? step.slice(P.length) : step)
    if (!node) return null
    if (i === ids.length - 1) break
    if (node.type !== 'ref') root = node
    else if (node.ref.startsWith(P)) {
      inLib = true
      root = libNodes.get(node.ref.slice(P.length))
    } else root = (inLib ? libNodes : nodes).get(node.ref)
  }
  return node
}

// One instance override, as "Layer: values".
function override(refId, key, o, raw) {
  const node = findInside(refId, key)
  const target = node?.name || key
  if (o.type) {
    scan(o, target, raw)
    return `${target}: replaced`
  }
  const { t, list, paint } = formatter(raw, target)
  const parts = []
  for (const [k, v] of Object.entries(o)) {
    if (k === 'content') parts.push(`"${clip(String(v))}"`)
    else if (k === 'icon') parts.push(`\`${v}\``)
    else if (k === 'enabled') parts.push(v === false ? 'hidden' : 'shown')
    else if (k === 'fontFamily') parts.push(t(v, 'font'))
    else if (k === 'fontSize') parts.push(`size ${t(v, 'size')}`)
    else if (k === 'lineHeight') parts.push(`line height ${t(v, 'line height')}`)
    else if (k === 'fill') parts.push(paint(v, node?.type === 'text' ? 'color' : 'fill') || 'no fill')
    else if (k === 'stroke') parts.push(`border ${paint(v, 'border') || 'none'}`)
    else if (['gap', 'padding', 'cornerRadius'].includes(k)) {
      const label = k === 'cornerRadius' ? 'radius' : k
      parts.push(`${label} ${list(v, label)}`)
    } else if (v === null || typeof v !== 'object') parts.push(`${k} ${short(v)}`)
    else parts.push(k)
  }
  return `${target}: ${parts.join(', ')}`
}

// Collects unbound values in a replaced subtree without describing it.
function scan(n, at, raw) {
  const inner = []
  describe(n, inner, false)
  for (const r of inner) raw.push({ at: r.at ? `${at} › ${r.at}` : at, what: r.what })
  if (n.type !== 'ref') for (const c of n.children || []) scan(c, `${at} › ${c.name || c.type}`, raw)
}

// A component as a tree of described layers. Runs of identical siblings with
// the same name collapse into one entry with a count (12 bars print once).
function layerTree(n, isRoot) {
  const raw = []
  const name = isRoot ? 'Root' : n.name || n.type
  if (!isRoot && n.enabled === false) return { root: false, name, text: 'off', raw, kids: [], count: 1 }
  const text = describe(n, raw, isRoot)
  const kids = []
  if (n.type !== 'ref') {
    for (const c of n.children || []) {
      const k = layerTree(c, false)
      const prev = kids.at(-1)
      if (prev && prev.name === k.name && sig(prev) === sig(k)) prev.count++
      else kids.push(k)
    }
  }
  return { root: isRoot, name, text, raw, kids, count: 1 }
}
const sig = (t) => JSON.stringify([t.name, t.text, t.raw, t.kids.map((k) => [sig(k), k.count])])

// Flattens a layer tree into [path, values] lines and unbound-value strings.
function flatten(tree) {
  const lines = []
  const raws = []
  const seen = new Set()
  const walk = (t, trail, times) => {
    let segs = trail
    if (!t.root) {
      const seg = t.count > 1 ? `${t.name} ×${t.count}` : t.name
      segs = [...trail, seg]
      for (let i = 2; seen.has(segs.join(' › ')); i++) segs = [...trail, `${seg} (${i})`]
    }
    const key = segs.join(' › ') || 'Root'
    seen.add(key)
    if (t.text) lines.push([key, t.text])
    const n = times * t.count
    for (const r of t.raw) raws.push(`${key}${r.at ? ` › ${r.at}` : ''}: ${r.what}${n > 1 ? ` (×${n})` : ''}`)
    for (const c of t.kids) walk(c, segs, n)
  }
  walk(tree, [], 1)
  return { lines, raws }
}

// ---------- the reference ----------

const specs = new Map(
  components.map((c) => {
    const { lines, raws } = flatten(layerTree(c, true))
    return [c.id, { c, lines, raw: isExempt(c) ? [] : raws }]
  }),
)

const boards = []
for (const c of components) {
  const board = boardOf(c)
  let b = boards.find((x) => x.node.id === board.id)
  if (!b) boards.push((b = { node: board, sections: [] }))
  const section = sectionOf(c)
  const sName = section ? section.name.replace(/^Row \/ /, '') : 'Components'
  let s = b.sections.find((x) => x.name === sName)
  if (!s) b.sections.push((s = { name: sName, families: [] }))
  const fam = familyOf(c.name)
  let f = s.families.find((x) => x.name === fam)
  if (!f) s.families.push((f = { name: fam, members: [] }))
  f.members.push(specs.get(c.id))
}
boards.sort((a, b) => (a.node.y ?? 0) - (b.node.y ?? 0) || (a.node.x ?? 0) - (b.node.x ?? 0))

const variantLabel = (fam, c) => (c.name === fam.name ? c.name.split(' / ').at(-1) : c.name.slice(fam.name.length + 3))
const strays = [...specs.values()].filter((s) => s.raw.length)
const strayCount = strays.reduce((n, s) => n + s.raw.length, 0)

function renderReference() {
  const out = []
  const line = (s = '') => out.push(s)
  line(`# ${title} — Component reference`)
  line()
  line(`Generated from \`${base(penPath)}\` by \`scripts/sync-gen-ui-spec.mjs\`. Don't edit this file: change the .pen, then run the script. It belongs to the spec, [${base(specPath)}](${base(specPath)}).`)
  line()
  line('How to read it:')
  line()
  line("- Each component lists its layers and what they bind. Token names are Hemlock's, without the `g:` prefix.")
  line("- **Bold** marks a value that isn't bound to a Hemlock token: a raw number or color, a missing font, size or line height, or `(local)` for one of this file's own tokens.")
  line('- In a family, the first variant lists every layer; the others list only the layers that differ.')
  line('- An instance names its master (a component in this file, or a Hemlock one) and the properties it overrides.')
  line('- Annotation components are exempt: they draw touch hints, not UI.')
  line()
  line('## Contents')
  line()
  line(`- [Not bound to Hemlock](#not-bound-to-hemlock) (${strayCount} values in ${strays.length} components)`)
  for (const b of boards) {
    const count = b.sections.reduce((n, s) => n + s.families.reduce((m, f) => m + f.members.length, 0), 0)
    line(`- ${b.node.name} (\`${b.node.id}\`, ${count} components): ${b.sections.map((s) => s.name).join(' · ')}`)
  }
  line()
  line('## Not bound to Hemlock')
  line()
  if (!strays.length) line('Every component binds Hemlock tokens.')
  else {
    line(`${strayCount} values in ${strays.length} components skip Hemlock. Bind each one to its token, or record in the spec why it stays.`)
    line()
    line('| Component | Values |')
    line('|---|---|')
    for (const s of strays) line(`| \`${s.c.name}\` | ${s.raw.join(' · ').replace(/\|/g, '\\|')} |`)
  }
  for (const b of boards) {
    line()
    line(`## ${b.node.name}`)
    line()
    line(`Board \`${b.node.id}\`.`)
    for (const s of b.sections) {
      line()
      line(`### ${s.name}`)
      for (const f of s.families) {
        line()
        const [first, ...rest] = f.members
        if (!rest.length) {
          line(`#### ${first.c.name} · \`${first.c.id}\``)
          line()
          for (const [k, v] of first.lines) line(`- ${k} — ${v}`)
          continue
        }
        line(`#### ${f.name}`)
        line()
        line(`Variants: ${f.members.map((m) => `${variantLabel(f, m.c)} \`${m.c.id}\``).join(' · ')}`)
        line()
        line(`**${variantLabel(f, first.c)}**`)
        line()
        for (const [k, v] of first.lines) line(`- ${k} — ${v}`)
        const baseMap = new Map(first.lines)
        for (const m of rest) {
          line()
          const master = m.c.type === 'ref' && f.members.find((x) => x.c.id === m.c.ref)
          if (master) {
            // A variant built as an instance of another variant: its overrides are the difference.
            line(`**${variantLabel(f, m.c)}**, an instance of ${variantLabel(f, master.c)}:`)
            line()
            line(`- ${m.lines[0][1].split(' · ').slice(1).join(' · ') || 'no overrides'}`)
            continue
          }
          const keys = new Set(m.lines.map(([k]) => k))
          const diff = m.lines.filter(([k, v]) => baseMap.get(k) !== v).map(([k, v]) => `- ${k} — ${v}`)
          for (const [k] of first.lines) if (!keys.has(k)) diff.push(`- ${k} — not in this variant`)
          line(diff.length ? `**${variantLabel(f, m.c)}**, differs from ${variantLabel(f, first.c)}:` : `**${variantLabel(f, m.c)}**: same layers and tokens as ${variantLabel(f, first.c)}.`)
          if (diff.length) {
            line()
            diff.forEach((d) => line(d))
          }
        }
      }
    }
  }
  return `${out.join('\n')}\n`
}

const spec = fs.existsSync(specPath) ? fs.readFileSync(specPath, 'utf8') : ''
const specLines = spec.split('\n')
const title = (spec.match(/^# (.+?)(?: — | \x60|$)/m) || [])[1] || base(stem)

const reference = renderReference()
const oldReference = fs.existsSync(refPath) ? fs.readFileSync(refPath, 'utf8') : null
const referenceState = oldReference === reference ? 'up to date' : has('--check') ? 'OUT OF DATE' : 'rewritten'
if (!has('--check') && referenceState === 'rewritten') fs.writeFileSync(refPath, reference)

// ---------- what the spec has to catch up on ----------

// Spec lines that mention a component, by its most specific name prefix.
function mentions(name) {
  const segs = name.split(' / ')
  for (let i = segs.length; i >= 2; i--) {
    const re = new RegExp(`${escapeRe(segs.slice(0, i).join(' / '))}(?![\\w&])`)
    const hits = specLines.flatMap((l, j) => (re.test(l) ? [j + 1] : []))
    if (hits.length) return hits
  }
  return []
}
const where = (lines) => (lines.length ? `spec line${lines.length > 1 ? 's' : ''} ${lines.slice(0, 6).join(', ')}${lines.length > 6 ? ', …' : ''}` : 'not in the spec')

// Library boards: top-level frames that hold components or are named as boards.
const libraryBoards = pen.children.filter(
  (n) => n.type === 'frame' && !/ — (label|section header)/.test(n.name || '') && (/Components$/.test(n.name || '') || boards.some((b) => b.node.id === n.id)),
)
const textOf = (n) => {
  const out = []
  const walk = (x) => {
    if (x.reusable) return
    if (x.type === 'text' && typeof x.content === 'string') out.push(x.content)
    for (const o of Object.values(x.descendants || {})) if (o && typeof o.content === 'string') out.push(o.content)
    for (const c of x.children || []) walk(c)
  }
  walk(n)
  return out.join('\n')
}
const noteSources = [
  ...pen.children
    .filter((n) => ['context', 'prompt', 'note'].includes(n.type))
    .map((n) => ({ id: n.id, name: `note "${n.name || String(n.content || '').split('\n')[0].slice(0, 48)}"`, text: String(n.content || '') })),
  ...libraryBoards.flatMap((b) =>
    (b.children || []).filter((s) => s.type === 'frame').map((s) => ({ id: s.id, name: `board text "${b.name} › ${s.name}"`, text: textOf(s) })),
  ),
  ...pen.children.filter((n) => /^00 · Start here/.test(n.name || '')).map((n) => ({ id: n.id, name: `board text "${n.name}"`, text: textOf(n) })),
]

const current = {
  components: Object.fromEntries(
    components.map((c) => {
      const { x, y, ...rest } = c
      return [c.id, { name: c.name, hash: hash(rest) }]
    }),
  ),
  frames: Object.fromEntries(pen.children.map((n) => [n.id, n.name || `${n.type}: ${String(n.content || '').split('\n')[0].slice(0, 60)}`])),
  notes: Object.fromEntries(noteSources.map((s) => [s.id, { name: s.name, hash: hash(s.text) }])),
  tokens: Object.fromEntries(Object.entries(localTokens).map(([k, v]) => [k, hash(v)])),
}

const baseline = fs.existsSync(baselinePath) && !has('--write-baseline') ? JSON.parse(fs.readFileSync(baselinePath, 'utf8')) : null
const changed = []
if (baseline) {
  const diff = (kind, now, was, label, lines) => {
    for (const [id, v] of Object.entries(now)) {
      const w = was?.[id]
      const name = typeof v === 'string' ? v : v.name ?? id
      const wasName = typeof w === 'string' ? w : w?.name ?? id
      if (w === undefined) changed.push(`added    ${label}${name} (${id})${lines ? ` · ${where(lines(name))}` : ''}`)
      else if (wasName !== name) changed.push(`renamed  ${label}${id}: ${wasName} → ${name}${lines ? ` · ${where(lines(wasName))}` : ''}`)
      else if (typeof v === 'object' ? v.hash !== w.hash : v !== w) changed.push(`edited   ${label}${name} (${id})${lines ? ` · ${where(lines(name))}` : ''}`)
    }
    for (const [id, w] of Object.entries(was || {})) {
      if (now[id] === undefined) {
        const wasName = typeof w === 'string' ? w : w?.name ?? id
        changed.push(`removed  ${label}${wasName} (${id})${lines ? ` · ${where(lines(wasName))}` : ''}`)
      }
    }
  }
  diff('components', current.components, baseline.components, 'component ', mentions)
  diff('frames', current.frames, baseline.frames, 'frame ')
  diff('notes', current.notes, baseline.notes, '')
  diff('tokens', Object.fromEntries(Object.entries(current.tokens).map(([k, h]) => [k, { name: k, hash: h }])), Object.fromEntries(Object.entries(baseline.tokens || {}).map(([k, h]) => [k, { name: k, hash: h }])), 'local token ')
}

const isToken = (s) => {
  const name = s.replace(/^\$/, '').replace(new RegExp(`^${escapeRe(P)}`), '')
  if (/^font-/.test(name) && !/^font-[a-z]+$/.test(name)) return true // CSS words like font-variant-numeric
  return hemlockTokens.has(name) || name in localTokens || hemlockTokens.has(`${name}-blur`)
}
const TOKEN_PREFIX = '(?:sem|prim|chart-(?:categorical|sequential|threshold)|spacing|radius|shadow|text-size|line-height|font|duration|easing)'
const TOKEN_LIKE = new RegExp(`^\\$?(?:[a-z]+:)?${TOKEN_PREFIX}(?:-[\\w/-]+)?$`)
const LOCAL_NAME = /^(?:Canvas|Chat|Nav|Q&A|Type|Saved|Feed|Annotation|Slot) \/ /
const HEMLOCK_NAME = /^[A-Z][A-Za-z]+(?:\/[\w-]+)+$/
const ID_LIKE = /^(?:[a-z]+:)?[A-Za-z0-9]{5,6}$/
const looksLikeId = (s) => {
  const id = s.replace(/^[a-z]+:/, '')
  return ID_LIKE.test(s) && /[A-Za-z]/.test(id) && !/^[A-Z]?[a-z]+$/.test(id) && !/^[A-Z]+$/.test(id) && !/^\d+[a-z]+$/i.test(id)
}
const localExists = (s) => layerNames.has(s) || componentNames.some((n) => n === s || n.startsWith(`${s} / `))

const staleSpec = []
let fenced = false
specLines.forEach((l, i) => {
  if (/^\s*```/.test(l)) fenced = !fenced
  if (fenced) return
  for (const [, s] of l.matchAll(/`([^`]+)`/g)) {
    if (s.includes('*')) continue
    let problem = null
    if (LOCAL_NAME.test(s)) problem = localExists(s) ? null : 'no component or layer has this name'
    else if (TOKEN_LIKE.test(s)) problem = isToken(s) ? null : 'not a Hemlock or local token'
    else if (HEMLOCK_NAME.test(s)) problem = hemlockComponents.some((n) => n === s || n.startsWith(`${s}/`)) ? null : 'no Hemlock component has this name'
    else if (looksLikeId(s)) {
      const imported = s.startsWith(P)
      const exists = imported ? libNodes.has(s.slice(P.length)) : nodes.has(s)
      problem = exists ? null : 'no node has this ID'
    }
    if (problem) staleSpec.push(`line ${i + 1}  \`${s}\` — ${problem}`)
  }
})

const missing = []
for (const fam of [...new Set(components.filter((c) => !isExempt(c)).map((c) => familyOf(c.name)))]) {
  const members = components.filter((c) => familyOf(c.name) === fam)
  if (!members.some((c) => mentions(c.name).length)) missing.push(`${fam} (${members.map((c) => c.id).join(', ')})`)
}

const staleNotes = []
const NOTE_TOKEN = new RegExp(`(?<![\\w-])\\$?(?:[a-z]+:)?(${TOKEN_PREFIX}-[\\w/-]*)`, 'g')
const NOTE_NAME = /\b(?:Canvas|Chat|Nav|Q&A|Type|Saved|Feed) \/ [A-Z0-9&][\w&'’+-]*(?: [A-Z0-9&][\w&'’+-]*)*(?: \/ [A-Z0-9&][\w&'’+-]*(?: [A-Z0-9&][\w&'’+-]*)*)*/g
for (const s of noteSources) {
  const found = new Set()
  for (const m of s.text.matchAll(NOTE_TOKEN)) {
    if (s.text[m.index + m[0].length] === '*') continue
    const name = m[1].replace(/[-/]+$/, '')
    if (name.includes('-') && !isToken(name)) found.add(`${name} — not a Hemlock or local token`)
  }
  for (const [name] of s.text.matchAll(NOTE_NAME)) {
    if (name.split(' / ').slice(1).every((seg) => seg === seg.toUpperCase())) continue // CAPS kickers
    if (!(layerNames.has(name) || componentNames.some((n) => n === name || n.startsWith(`${name} `)))) found.add(`${name} — no component or layer has this name`)
  }
  for (const f of found) staleNotes.push(`${s.name} (${s.id})  ${f}`)
}

// ---------- output ----------

if (has('--write-baseline')) {
  const out = {
    note: `What ${base(specPath)} was last reviewed against. Rewrite with --write-baseline after updating the spec.`,
    reviewedAt: new Date().toISOString(),
    pen: base(penPath),
    ...current,
  }
  fs.writeFileSync(baselinePath, `${JSON.stringify(out, null, 2)}\n`)
}

const line = (s = '') => console.log(s)
const section = (title, items, empty = 'none') => {
  line()
  line(`${title} (${items.length})`)
  for (const i of items) line(`  ${i}`)
  if (!items.length) line(`  ${empty}`)
}
line(`Gen-UI spec sync · ${rel(penPath)}`)
line(`Spec ${base(specPath)}${spec ? '' : ' (missing)'} · reference ${base(refPath)} (${referenceState}${referenceState === 'OUT OF DATE' ? ', run without --check' : ''})`)
line(`${components.length} components · ${strayCount} values in ${strays.length} components not bound to Hemlock (listed in the reference)`)
section(
  'CHANGED SINCE THE SPEC WAS LAST REVIEWED',
  changed,
  baseline ? 'none' : has('--write-baseline') ? 'baseline just written' : 'no baseline yet: review the spec, then run with --write-baseline',
)
section('STALE IN THE SPEC', staleSpec)
section('MISSING FROM THE SPEC', missing)
section("STALE IN THE FILE'S NOTES (advisory)", staleNotes)
if (has('--write-baseline')) line(`\nBaseline written: ${rel(baselinePath)}`)
else if (changed.length || staleSpec.length || missing.length) line('\nNext: update the spec for everything listed, then run with --write-baseline.')

const needsWork = referenceState === 'OUT OF DATE' || changed.length || staleSpec.length || missing.length
process.exit(has('--strict') && needsWork ? 1 : 0)
