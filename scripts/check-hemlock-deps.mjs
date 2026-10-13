#!/usr/bin/env node
/**
 * Checks a .pen file's Hemlock dependencies against hemlock-library.lib.pen.
 *
 * Written for gen-ui-canvas_v1.pen (Hemlock imported under the `g` alias), but it
 * works for any .pen that imports Hemlock. Run it after every Hemlock change.
 *
 * Reports:
 *   BREAKING  tokens the file binds ($g:…) that Hemlock no longer defines
 *   BREAKING  Hemlock components the file instances (g:…) that no longer exist
 *   BREAKING  instance override paths (`descendants` keys) that no longer
 *             resolve inside the Hemlock component they target
 *   REVIEW    bound tokens whose resolved Light/Dark value changed since the
 *             baseline, and Hemlock components whose name changed
 *   CONTRAST  WCAG ratios for the text/surface role pairs the canvas uses, in
 *             both color themes (text needs 4.5:1)
 *
 * Advisory by default (always exits 0), same policy as lint-pen-spacing.mjs.
 * Pass --strict to exit 1 on any BREAKING finding.
 *
 * The baseline records the Hemlock values the file was built against. Write it
 * once per accepted Hemlock version (--write-baseline). If the .pen has not
 * been saved yet (no nodes), the token and component lists come from --seed
 * or from the existing baseline.
 *
 * Usage:
 *   node scripts/check-hemlock-deps.mjs [file.pen] [--baseline <json>]
 *        [--write-baseline] [--seed <json>] [--json] [--strict]
 *
 * Defaults: file = pencil/design-system/in-progress/gen-ui-canvas_v1.pen
 *           baseline = <file>.hemlock-baseline.json (next to the .pen)
 */
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

const argv = process.argv.slice(2)
const has = (f) => argv.includes(f)
const opt = (f) => {
  const i = argv.indexOf(f)
  return i >= 0 ? argv[i + 1] : undefined
}
const VALUE_FLAGS = ['--baseline', '--seed']
const positional = argv.filter((a, i) => !a.startsWith('--') && !VALUE_FLAGS.includes(argv[i - 1]))

const penPath = path.resolve(positional[0] || 'pencil/design-system/in-progress/gen-ui-canvas_v1.pen')
const baselinePath = path.resolve(opt('--baseline') || penPath.replace(/\.pen$/, '.hemlock-baseline.json'))
const seedPath = opt('--seed')

const pen = JSON.parse(fs.readFileSync(penPath, 'utf8'))
const alias = Object.keys(pen.imports || {}).find((k) => /hemlock/i.test(pen.imports[k]))
if (!alias) {
  console.error(`No Hemlock import found in ${penPath}`)
  process.exit(2)
}
const P = `${alias}:`
const libPath = path.resolve(path.dirname(penPath), pen.imports[alias])
const libRaw = fs.readFileSync(libPath, 'utf8')
const lib = JSON.parse(libRaw)
const libHash = crypto.createHash('sha256').update(libRaw).digest('hex').slice(0, 16)

// ---------- indexes ----------

function indexNodes(roots) {
  const map = new Map()
  const visit = (n) => {
    if (!n || typeof n !== 'object') return
    if (n.id) map.set(n.id, n)
    for (const c of n.children || []) visit(c)
  }
  roots.forEach(visit)
  return map
}
const libNodes = indexNodes(lib.children || [])
const penNodes = indexNodes(pen.children || [])

function findIn(node, id) {
  if (!node) return null
  if (node.id === id) return node
  for (const c of node.children || []) {
    const hit = findIn(c, id)
    if (hit) return hit
  }
  return null
}

// A ref inside the .pen points at `g:<id>` (Hemlock) or `<id>` (local).
// A ref inside Hemlock points at a bare Hemlock id.
function refTarget(node, inLib) {
  const ref = String(node.ref || '')
  if (inLib) return [libNodes.get(ref), true]
  return ref.startsWith(P) ? [libNodes.get(ref.slice(P.length)), true] : [penNodes.get(ref), false]
}

// Walk a descendants key ("local/g:a/g:b") from the instance into the
// components it targets. Returns null when the path resolves.
function checkOverridePath(instance, key) {
  let cur = instance
  let inLib = false
  for (const raw of key.split('/')) {
    if (cur.type === 'ref') {
      ;[cur, inLib] = refTarget(cur, inLib)
      if (!cur) return 'instance target no longer exists'
    }
    const libSeg = raw.startsWith(P)
    if (libSeg !== inLib) return `"${raw}" is not inside a ${libSeg ? 'Hemlock' : 'local'} component here`
    const hit = findIn(cur, libSeg ? raw.slice(P.length) : raw)
    if (!hit) return `"${raw}" not found`
    cur = hit
  }
  return null
}

// ---------- scan the .pen ----------

const tokenUses = new Map()
const componentUses = new Map()
const overrideFindings = []
const themeAxes = new Set()
const bump = (map, k) => map.set(k, (map.get(k) || 0) + 1)

function collectTokens(v) {
  if (typeof v === 'string') {
    if (v.startsWith(`$${P}`)) bump(tokenUses, v.slice(P.length + 1))
  } else if (Array.isArray(v)) {
    v.forEach(collectTokens)
  } else if (v && typeof v === 'object') {
    Object.values(v).forEach(collectTokens)
  }
}

function scan(node, trail) {
  if (!node || typeof node !== 'object') return
  for (const [k, v] of Object.entries(node)) {
    if (k !== 'children' && k !== 'descendants') collectTokens(v)
  }
  for (const axis of Object.keys(node.theme || {})) {
    if (axis.startsWith(P)) themeAxes.add(axis.slice(P.length))
  }
  if (node.type === 'ref' && typeof node.ref === 'string') {
    if (node.ref.startsWith(P)) bump(componentUses, node.ref.slice(P.length))
    for (const [key, ov] of Object.entries(node.descendants || {})) {
      if (key.includes(P)) {
        const err = checkOverridePath(node, key)
        if (err) overrideFindings.push({ where: trail, instanceOf: node.ref, key, problem: err })
      }
      if (ov && typeof ov === 'object' && ov.type) scan(ov, `${trail} › ${key}`)
      else collectTokens(ov)
    }
  }
  for (const c of node.children || []) scan(c, `${trail} / ${c.name || c.id}`)
}
for (const root of pen.children || []) scan(root, root.name || root.id)

const penIsEmpty = !(pen.children || []).length
let baseline = fs.existsSync(baselinePath) ? JSON.parse(fs.readFileSync(baselinePath, 'utf8')) : null
if (penIsEmpty) {
  const seed = seedPath ? JSON.parse(fs.readFileSync(seedPath, 'utf8')) : baseline
  if (!seed) {
    console.error(`${path.basename(penPath)} has no nodes (not saved yet?) and there is no baseline or --seed to check.`)
    process.exit(2)
  }
  for (const t of Array.isArray(seed.tokens) ? seed.tokens : Object.keys(seed.tokens || {})) bump(tokenUses, t)
  for (const c of Array.isArray(seed.components) ? seed.components : Object.keys(seed.components || {})) {
    bump(componentUses, c.replace(P, ''))
  }
}

// ---------- token resolution ----------

const THEMES = {
  Light: { '🎨 Colors': 'Light', '🆎 Typography': 'desktop' },
  Dark: { '🎨 Colors': 'Dark', '🆎 Typography': 'desktop' },
}

function resolveVar(name, theme, depth = 0) {
  const def = (lib.variables || {})[name]
  if (!def || depth > 20) return undefined
  let v = def.value
  if (Array.isArray(v)) {
    let pick
    for (const e of v) {
      const th = e.theme || {}
      if (Object.entries(th).every(([axis, val]) => theme[axis] === undefined || theme[axis] === val)) pick = e.value
    }
    v = pick
  }
  if (typeof v === 'string' && v.startsWith('$')) return resolveVar(v.slice(1), theme, depth + 1)
  return v
}
const valuesOf = (name) => ({ Light: resolveVar(name, THEMES.Light), Dark: resolveVar(name, THEMES.Dark) })

// ---------- contrast ----------

function rgba(hex) {
  if (typeof hex !== 'string' || !hex.startsWith('#')) return null
  let h = hex.slice(1)
  if (h.length === 3) h = h.split('').map((c) => c + c).join('')
  if (h.length === 6) h += 'FF'
  if (h.length !== 8) return null
  const n = (i) => parseInt(h.slice(i, i + 2), 16)
  return [n(0), n(2), n(4), n(6) / 255]
}
const over = (fg, bg) => [0, 1, 2].map((i) => fg[i] * fg[3] + bg[i] * (1 - fg[3])).concat(1)
function luminance([r, g, b]) {
  const lin = (c) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}
function contrast(fgHex, bgHex, baseHex) {
  let bg = rgba(bgHex)
  let fg = rgba(fgHex)
  const base = rgba(baseHex) || [255, 255, 255, 1]
  if (!bg || !fg) return null
  if (bg[3] < 1) bg = over(bg, base)
  if (fg[3] < 1) fg = over(fg, bg)
  const [a, b] = [luminance(fg), luminance(bg)].sort((x, y) => y - x)
  return Math.round(((a + 0.05) / (b + 0.05)) * 100) / 100
}

// Text roles the canvas library binds, on the surfaces they sit on.
const PAIRS = [
  ['sem-text-header', 'sem-background-main', 'Title, H2, H3, stat values'],
  ['sem-text-body', 'sem-background-main', 'Deck, body, body small'],
  ['sem-text-meta', 'sem-background-main', 'Meta, label, caption, footnote'],
  ['sem-text-meta', 'sem-background-surface', 'Meta on Saved Tile, Snapshot Bar'],
  ['sem-text-meta', 'sem-background-elevated', 'Meta on Toast'],
  ['sem-text-action', 'sem-background-main', 'Eyebrow, text links'],
  ['sem-btnSecondaryTextActive', 'sem-btnSecondaryBgActive', 'Save Button / Pressed, Saved'],
  ['sem-btnSecondaryTextHover', 'sem-btnSecondaryBgHover', 'Save Button / Hover, Saved Hover'],
  ['sem-text-deposit', 'sem-background-main', 'Positive values'],
  ['sem-text-deposit', 'sem-background-highlight', 'Positive values in Table / Row Highlight'],
  ['sem-text-body', 'sem-background-highlight', 'Tip body, Row Highlight secondary text'],
  ['sem-text-action', 'sem-background-elevated', 'Saved Tile eyebrow'],
  ['sem-btnLinkText', 'sem-background-elevated', 'Toast actions, Saved Tile Refresh (Button/sm/text)'],
  ['sem-btnSecondaryText', 'sem-btnSecondaryBg', 'Save Button / Default'],
  ['sem-tagText', 'sem-tagBg', 'Tags'],
  ['sem-chatTextPrimary', 'sem-chatBg', 'Chat AI text, Canvas Link title'],
  ['sem-chatTextSecondary', 'sem-chatBg', 'Canvas Link kicker, prompt chips'],
  ['sem-navTextSecondary', 'sem-navBg', 'Nav items, Saved count'],
  ['sem-navTextPrimary', 'sem-navActiveBg', 'Active nav item'],
]

// ---------- findings ----------

const libVars = lib.variables || {}
const missingTokens = [...tokenUses.keys()].filter((t) => !(t in libVars)).sort()
const missingComponents = [...componentUses.keys()].filter((id) => !libNodes.has(id)).sort()
const libThemes = lib.themes || {}
const missingAxes = [...themeAxes].filter((a) => !(a in libThemes))

const currentTokens = Object.fromEntries([...tokenUses.keys()].sort().map((t) => [t, valuesOf(t)]))
const currentComponents = Object.fromEntries(
  [...componentUses.keys()].sort().map((id) => [id, libNodes.get(id)?.name ?? null]),
)

const changedTokens = []
const renamedComponents = []
if (baseline && !has('--write-baseline')) {
  for (const [t, now] of Object.entries(currentTokens)) {
    const was = baseline.tokens?.[t]
    if (!was) continue
    for (const theme of ['Light', 'Dark']) {
      if (JSON.stringify(was[theme]) !== JSON.stringify(now[theme])) {
        changedTokens.push({ token: t, theme, was: was[theme], now: now[theme] })
      }
    }
  }
  for (const [id, name] of Object.entries(currentComponents)) {
    const was = baseline.components?.[id]
    if (was && name && was !== name) renamedComponents.push({ id, was, now: name })
  }
}

const contrastRows = PAIRS.filter(([fg, bg]) => fg in libVars && bg in libVars).map(([fg, bg, use]) => {
  const row = { fg, bg, use }
  for (const theme of ['Light', 'Dark']) {
    row[theme] = contrast(
      resolveVar(fg, THEMES[theme]),
      resolveVar(bg, THEMES[theme]),
      resolveVar('sem-background-main', THEMES[theme]),
    )
  }
  return row
})
const contrastFails = contrastRows.filter((r) => ['Light', 'Dark'].some((t) => r[t] !== null && r[t] < 4.5))

const breaking = missingTokens.length + missingComponents.length + overrideFindings.length + missingAxes.length

// ---------- output ----------

if (has('--write-baseline')) {
  const out = {
    note: `Hemlock values ${path.basename(penPath)} was built against. Rewrite with --write-baseline after accepting a Hemlock update.`,
    generatedAt: new Date().toISOString(),
    hemlock: { file: path.relative(path.dirname(baselinePath), libPath), sha256: libHash },
    tokens: currentTokens,
    components: currentComponents,
  }
  fs.writeFileSync(baselinePath, `${JSON.stringify(out, null, 2)}\n`)
}

const report = {
  file: path.relative(process.cwd(), penPath),
  hemlock: { file: path.relative(process.cwd(), libPath), sha256: libHash },
  baseline: baseline ? { file: path.relative(process.cwd(), baselinePath), sha256: baseline.hemlock?.sha256 } : null,
  scannedFrom: penIsEmpty ? 'baseline/seed (the .pen has no nodes — save it in Pencil)' : 'pen',
  uses: { tokens: tokenUses.size, components: componentUses.size },
  breaking: { missingTokens, missingComponents, missingThemeAxes: missingAxes, brokenOverrides: overrideFindings },
  review: { changedTokens, renamedComponents },
  contrast: contrastRows,
}

if (has('--json')) {
  console.log(JSON.stringify(report, null, 2))
} else {
  const line = (s = '') => console.log(s)
  line(`Hemlock dependency check · ${report.file}`)
  line(`Hemlock ${report.hemlock.file} (sha ${libHash})` + (baseline ? ` · baseline sha ${baseline.hemlock?.sha256}` : ' · no baseline'))
  if (penIsEmpty) line('Note: the .pen has no nodes yet, so the token/component list comes from the baseline or --seed.')
  line(`Uses ${tokenUses.size} Hemlock tokens and ${componentUses.size} Hemlock components.`)
  line()
  line(`BREAKING (${breaking})`)
  for (const t of missingTokens) line(`  token missing      $${P}${t}`)
  for (const c of missingComponents) line(`  component missing  ${P}${c}`)
  for (const a of missingAxes) line(`  theme axis missing ${P}${a}`)
  for (const o of overrideFindings) line(`  override broken    ${o.instanceOf} :: ${o.key} — ${o.problem}\n                     at ${o.where}`)
  if (!breaking) line('  none')
  line()
  line(`REVIEW (${changedTokens.length + renamedComponents.length})`)
  if (!baseline) line('  no baseline yet — run with --write-baseline to record the current Hemlock values')
  for (const c of changedTokens) line(`  ${c.theme.padEnd(5)} $${P}${c.token}: ${c.was} → ${c.now}`)
  for (const r of renamedComponents) line(`  renamed ${P}${r.id}: ${r.was} → ${r.now}`)
  if (baseline && !changedTokens.length && !renamedComponents.length) line('  none')
  line()
  line(`CONTRAST (text needs 4.5:1) — ${contrastFails.length} pair(s) under AA`)
  for (const r of contrastRows) {
    const fmt = (v) => (v === null ? '  n/a' : `${v.toFixed(2).padStart(5)}${v < 4.5 ? ' ✗' : '  '}`)
    line(`  ${fmt(r.Light)} light  ${fmt(r.Dark)} dark   ${r.fg} on ${r.bg} (${r.use})`)
  }
  if (has('--write-baseline')) line(`\nBaseline written: ${path.relative(process.cwd(), baselinePath)}`)
}

process.exit(has('--strict') && breaking ? 1 : 0)
