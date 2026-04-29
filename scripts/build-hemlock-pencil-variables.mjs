#!/usr/bin/env node
/**
 * Builds Pencil variable payloads from tokens/ for hemlock-library.pen.
 * Run: node scripts/build-hemlock-pencil-variables.mjs
 *
 * Writes merged payloads under scripts/ (e.g. ndjson-line-*.json, pencil-mcp-full-with-replace.json).
 * To apply into the open .pen via Pencil MCP (Cursor must be running):
 *   node scripts/push-hemlock-chunks-stdio.mjs
 * Full replace (optional): node scripts/push-hemlock-full-replace.mjs
 *
 * Typography uses desktop scales from tokens/typography.ts (not typography.css).
 *
 * Colors: only primitives from colors.css (`color-{name}`). Semantic roles from
 * tokens/colors.ts are NOT emitted as separate Theme variables — Pencil variables are
 * literal hex only (no alias primitive→semantic). Designers pick primitives on the
 * canvas (`$color-gray-50`); semantic names stay in colors.ts for dev handoff.
 * Set INCLUDE_SEMANTIC_COLOR_VARS=1 to restore denormalized `colors-*` duplicates.
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

/** Supports `export const name =` and `export const name: Type =` */
function extractExportedObject(source, constName) {
  const re = new RegExp(`export const ${constName}(?::[^=]+)?\\s*=\\s*`)
  const m = source.match(re)
  if (!m) throw new Error(`Missing export const ${constName}`)
  let idx = m.index + m[0].length
  while (/\s/.test(source[idx])) idx++
  if (source[idx] !== '{') throw new Error(`expected { after export const ${constName}`)
  let depth = 0
  for (let j = idx; j < source.length; j++) {
    if (source[j] === '{') depth++
    else if (source[j] === '}') {
      depth--
      if (depth === 0) return source.slice(idx, j + 1)
    }
  }
  throw new Error('unbalanced braces')
}

function parseColorsCss(css) {
  const map = {}
  const noComments = css.replace(/\/\*[\s\S]*?\*\//g, '')
  const re = /--color-([a-z0-9-]+):\s*([\d ]+);/g
  const src = noComments
  let m
  while ((m = re.exec(src)) !== null) {
    const key = m[1]
    const parts = m[2].trim().split(/\s+/).map(Number)
    const [r, g, b] = parts
    const hex = `#${[r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')}`
    map[key] = hex
  }
  return map
}

function rgbToHex(r, g, b, a = 1) {
  const rr = Math.round(r)
  const gg = Math.round(g)
  const bb = Math.round(b)
  if (a >= 1) {
    return `#${[rr, gg, bb].map((x) => x.toString(16).padStart(2, '0')).join('')}`
  }
  const ai = Math.round(a * 255)
  return `#${[rr, gg, bb, ai].map((x) => x.toString(16).padStart(2, '0')).join('')}`
}

function parseRgbVar(str, primitives) {
  const t = str.trim()
  if (t === 'transparent') return '#00000000'
  const m = t.match(/rgb\(var\(--color-([a-z0-9-]+)\)\s*\/\s*([^)]+)\)/)
  if (!m) return null
  const primKey = m[1]
  const alphaPart = m[2].trim()
  const rgb = primitives[primKey]
  if (!rgb) return null
  const r = parseInt(rgb.slice(1, 3), 16)
  const g = parseInt(rgb.slice(3, 5), 16)
  const b = parseInt(rgb.slice(5, 7), 16)
  let a = 1
  if (alphaPart === '<alpha-value>') a = 1
  else if (alphaPart.endsWith('%')) a = parseFloat(alphaPart) / 100
  else a = parseFloat(alphaPart)
  return rgbToHex(r, g, b, a)
}

function flattenColorsObj(obj, prefix = '') {
  const out = {}
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}-${k}` : k
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      Object.assign(out, flattenColorsObj(v, key))
    } else {
      out[key] = v
    }
  }
  return out
}

function evalObjectLiteralFromFile(sourceFile, constName) {
  const src = fs.readFileSync(sourceFile, 'utf8')
  const literal = extractExportedObject(src, constName)
  const fn = new Function(`return ${literal}`)
  return fn()
}

function pxToNumber(pxStr) {
  const n = parseFloat(String(pxStr).replace('px', '').trim())
  return Number.isFinite(n) ? n : 0
}

function chunkObject(obj, size) {
  const entries = Object.entries(obj)
  const chunks = []
  for (let i = 0; i < entries.length; i += size) {
    chunks.push(Object.fromEntries(entries.slice(i, i + size)))
  }
  return chunks
}

function main() {
  const colorsCss = fs.readFileSync(path.join(ROOT, 'tokens/colors.css'), 'utf8')
  const primitives = parseColorsCss(colorsCss)

  const variables = {}

  // Primitives: color-{name} matches --color-* without leading --
  for (const [name, hex] of Object.entries(primitives)) {
    variables[`color-${name}`] = { type: 'color', value: hex }
  }

  // Optional: duplicate semantics as resolved hex (`colors-*`). Default off — keeps
  // Theme aligned with code (single primitive layer + colors.ts for semantics).
  if (process.env.INCLUDE_SEMANTIC_COLOR_VARS === '1') {
    const colorsTs = path.join(ROOT, 'tokens/colors.ts')
    const colorsObj = evalObjectLiteralFromFile(colorsTs, 'colors')
    const flatColors = flattenColorsObj(colorsObj)
    for (const [semanticKey, val] of Object.entries(flatColors)) {
      if (typeof val !== 'string') continue
      const hex = parseRgbVar(val, primitives)
      if (hex) {
        variables[`colors-${semanticKey}`] = { type: 'color', value: hex }
      }
    }
  }

  // Spacing (rem → px at 16px root), names: spacing-{key}
  const spacingObj = evalObjectLiteralFromFile(
    path.join(ROOT, 'tokens/spacing.ts'),
    'spacing',
  )
  for (const [k, v] of Object.entries(spacingObj)) {
    const rem = parseFloat(String(v).replace('rem', ''))
    const px = Math.round(rem * 16)
    variables[`spacing-${k}`] = { type: 'number', value: px }
  }

  // Font families (match typography.ts)
  variables['font-family-primary'] = {
    type: 'string',
    value: 'Heebo Variable',
  }
  variables['font-family-secondary'] = {
    type: 'string',
    value: 'Cormorant Garamond',
  }

  const typoPath = path.join(ROOT, 'tokens/typography.ts')
  const fontSize = evalObjectLiteralFromFile(typoPath, 'fontSize')
  const lineHeight = evalObjectLiteralFromFile(typoPath, 'lineHeight')
  const fontWeight = evalObjectLiteralFromFile(typoPath, 'fontWeight')
  const letterSpacing = evalObjectLiteralFromFile(typoPath, 'letterSpacing')

  const styleKeys = new Set([
    ...Object.keys(fontSize),
    ...Object.keys(lineHeight),
    ...Object.keys(fontWeight),
    ...Object.keys(letterSpacing),
  ])

  for (const styleKey of styleKeys) {
    /** Matches CSS class / TS token names: typo-primary-base-semibold-font-size */
    const prefix = styleKey
    if (fontSize[styleKey] !== undefined) {
      variables[`${prefix}-font-size`] = {
        type: 'number',
        value: pxToNumber(fontSize[styleKey]),
      }
    }
    if (lineHeight[styleKey] !== undefined) {
      variables[`${prefix}-line-height`] = {
        type: 'number',
        value: pxToNumber(lineHeight[styleKey]),
      }
    }
    if (fontWeight[styleKey] !== undefined) {
      variables[`${prefix}-font-weight`] = {
        type: 'number',
        value: Number(fontWeight[styleKey]),
      }
    }
    if (letterSpacing[styleKey] !== undefined) {
      const ls = letterSpacing[styleKey]
      variables[`${prefix}-letter-spacing`] = {
        type: 'number',
        value: typeof ls === 'string' ? parseFloat(ls) || 0 : Number(ls),
      }
    }
    const familyVar =
      styleKey.startsWith('typo-secondary') ? 'font-family-secondary' : 'font-family-primary'
    variables[`${prefix}-font-family`] = {
      type: 'string',
      value:
        familyVar === 'font-family-primary'
          ? 'Heebo Variable'
          : 'Cormorant Garamond',
    }
  }

  const chunks = chunkObject(variables, 120)
  const out = chunks.map((c) => ({ variables: c }))
  console.log(JSON.stringify(out))
}

main()
