#!/usr/bin/env node
/**
 * Syncs tokens/colors.css primitive RGB triplets from Hemlock's resolved hex values.
 * Strips block comments before parsing so example lines like --color-name in the
 * header do not pollute the primitive list.
 *
 * Primitives are taken **only** from `hemlock-library.lib.pen` (`color-*` with hex).
 *
 * Run from repo root: node scripts/sync-tokens-from-hemlock.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

const HEMLOCK = path.join(ROOT, 'pencil/design-system/in-progress/hemlock-library.lib.pen')
const COLORS_CSS = path.join(ROOT, 'tokens/colors.css')

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
  const re = /--color-([a-z0-9-]+):/g
  let x
  const clean = stripBlockComments(css)
  while ((x = re.exec(clean)) !== null) {
    if (!order.includes(x[1])) order.push(x[1])
  }
  return order
}

function main() {
  const pen = JSON.parse(fs.readFileSync(HEMLOCK, 'utf8'))
  const v = pen.variables || {}

  const fromPen = {}
  for (const [key, def] of Object.entries(v)) {
    if (!key.startsWith('color-') || def.type !== 'color') continue
    const name = key.slice('color-'.length)
    if (typeof def.value !== 'string' || !def.value.startsWith('#')) continue
    fromPen[name] = hexToRgbTriplet(def.value)
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

  const lines = fullOrder.map((name) => `  --color-${name}: ${merged[name]};`)

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
