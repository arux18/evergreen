#!/usr/bin/env node
/**
 * Pushes `scripts/ndjson-line-*.json` chunks into hemlock-library.lib.pen via Pencil MCP (stdio).
 * Requires Cursor + Pencil with an open session (socket ~/.pencil/socket/pencil-cursor.sock).
 *
 * Run from repo root: node scripts/push-hemlock-chunks-stdio.mjs
 *
 * Optional: PENCIL_EXTENSION_ROOT=/path/to/highagency.pencildev-*-universal
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import os from 'node:os'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

function resolveExtensionRoot() {
  if (process.env.PENCIL_EXTENSION_ROOT) return process.env.PENCIL_EXTENSION_ROOT
  const base = path.join(os.homedir(), '.cursor/extensions')
  const hit = fs
    .readdirSync(base)
    .filter((n) => n.startsWith('highagency.pencildev-'))
    .sort()
    .pop()
  if (!hit) {
    throw new Error(
      'Pencil extension not found under ~/.cursor/extensions; set PENCIL_EXTENSION_ROOT',
    )
  }
  return path.join(base, hit)
}

const EXT = resolveExtensionRoot()
const SDK_CLIENT = path.join(
  EXT,
  'node_modules/@modelcontextprotocol/sdk/dist/esm/client/index.js',
)
const SDK_STDIO = path.join(
  EXT,
  'node_modules/@modelcontextprotocol/sdk/dist/esm/client/stdio.js',
)
const { Client } = await import(SDK_CLIENT)
const { StdioClientTransport } = await import(SDK_STDIO)

const MCP_SERVER = path.join(
  EXT,
  'out',
  process.platform === 'darwin'
    ? process.arch === 'arm64'
      ? 'mcp-server-darwin-arm64'
      : 'mcp-server-darwin-x64'
    : process.platform === 'linux'
      ? process.arch === 'arm64'
        ? 'mcp-server-linux-arm64'
        : 'mcp-server-linux-x64'
      : 'mcp-server-windows-x64.exe',
)

const APP = process.env.PENCIL_MCP_APP ?? 'cursor'

async function main() {
  const transport = new StdioClientTransport({
    command: MCP_SERVER,
    args: ['--app', APP],
    cwd: EXT,
  })
  const client = new Client({ name: 'push-hemlock-chunks', version: '1.0.0' })
  await client.connect(transport)

  for (let i = 0; i < 9; i++) {
    const chunkPath = path.join(ROOT, 'scripts', `ndjson-line-${i}.json`)
    const args = JSON.parse(fs.readFileSync(chunkPath, 'utf8'))
    const n = Object.keys(args.variables || {}).length
    process.stderr.write(`set_variables merge chunk ${i} (${n} keys)… `)
    const result = await client.callTool({ name: 'set_variables', arguments: args })
    const text = result?.content?.map((c) => c.text).join('\n') ?? JSON.stringify(result)
    process.stderr.write(`ok\n${text}\n`)
  }

  await client.close()
  process.stderr.write('Done.\n')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
