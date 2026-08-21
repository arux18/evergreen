#!/usr/bin/env node
/**
 * Syncs tokens/colors.css primitive RGB triplets from Hemlock's resolved hex values.
 * Strips block comments before parsing so example lines like --prim-name in the
 * header do not pollute the primitive list.
 *
 * Primitives are taken **only** from `hemlock-library.lib.pen` (`prim-*` color
 * variables). Since the two-theme restructure (Aug 2026), every variable value is
 * a list of per-theme entries — primitives are static paint, so the Light entry
 * is authoritative (the script warns if a primitive's Dark entry differs).
 *
 * Shadow colors (`shadow-*-color`) are NOT primitives and are intentionally
 * excluded — they live in the dark-mode handoff package with their theme pairs.
 *
 * Run from repo root: node scripts/sync-tokens-from-hemlock.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

const HEMLOCK = path.join(ROOT, 'pencil/design-system/in-progress/hemlock-library.lib.pen')
const COLORS_CSS = path.join(ROOT, 'pencil/design-system/tokens/colors.css')

function stripBlockComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, '')
}

function hexToRgbTriplet(hex) {
  const h = hex.replace('#', '').toLowerCase()
  if (h.length !== 6) {
    throw new Error(`Expected #RRGGBB, got ${hex}`)
  }
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `${r} ${g} ${b}`
}

function primitiveOrder(css) {
  const order = []
  const re = /--prim-([a-z0-9-]+):/g
  let x
  const clean = stripBlockComments(css)
  while ((x = re.exec(clean)) !== null) {
    if (!order.includes(x[1])) order.push(x[1])
  }
  return order
}

function lightValue(key, def) {
  const v = def.value
  if (typeof v === 'string') return v
  if (Array.isArray(v)) {
    const entries = v.filter((e) => typeof e.value === 'string')
    const light = entries.find((e) => Object.values(e.theme || {}).includes('Light'))
    const chosen = light || entries[0]
    const dark = entries.find((e) => Object.values(e.theme || {}).includes('Dark'))
    if (light && dark && light.value.toLowerCase() !== dark.value.toLowerCase()) {
      process.stderr.write(`warning: ${key} differs between Light and Dark — primitives should be static\n`)
    }
    return chosen ? chosen.value : null
  }
  return null
}

function main() {
  const pen = JSON.parse(fs.readFileSync(HEMLOCK, 'utf8'))
  const v = pen.variables || {}

  const fromPen = {}
  for (const [key, def] of Object.entries(v)) {
    if (!key.startsWith('prim-') || def.type !== 'color') continue
    const name = key.slice('prim-'.length)
    const hex = lightValue(key, def)
    if (typeof hex !== 'string' || !hex.startsWith('#')) continue
    if (hex.replace('#', '').length !== 6) {
      process.stderr.write(`warning: ${key} = ${hex} has an alpha channel; skipped (triplets are opaque only)\n`)
      continue
    }
    fromPen[name] = hexToRgbTriplet(hex)
  }

  const css = fs.readFileSync(COLORS_CSS, 'utf8')
  const order = primitiveOrder(css)

  const merged = { ...fromPen }

  let fullOrder = order.filter((name) => merged[name] != null)
  const seen = new Set(fullOrder)
  for (const name of Object.keys(merged).sort()) {
    if (!seen.has(name)) {
      fullOrder.push(name)
      seen.add(name)
    }
  }

  const lines = fullOrder.map((name) => `  --prim-${name}: ${merged[name]};`)

  const block = `  /* primitives */\n${lines.join('\n')}`

  const primitiveBlock = /\s*\/\* primitives \*\/[\s\S]*?(?=\n\})/
  if (!primitiveBlock.test(css)) {
    throw new Error('colors.css: could not find /* primitives */ block before closing brace')
  }

  const replaced = css.replace(primitiveBlock, `\n${block}`)

  if (replaced !== css) {
    fs.writeFileSync(COLORS_CSS, replaced, 'utf8')
  }

  process.stderr.write(
    `tokens/colors.css: ${Object.keys(fromPen).length} primitives from Hemlock${replaced === css ? ' (unchanged)' : ''}.\n`,
  )
}

main()
