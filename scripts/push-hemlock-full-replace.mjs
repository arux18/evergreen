#!/usr/bin/env node
/**
 * Replaces all variables in hemlock-library.pen with scripts/pencil-mcp-full-with-replace.json.
 * Run: node scripts/push-hemlock-full-replace.mjs
 *
 * Optional: PENCIL_EXTENSION_ROOT, PENCIL_MCP_APP (default cursor)
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
  const payloadPath = path.join(ROOT, 'scripts', 'pencil-mcp-full-with-replace.json')
  const args = JSON.parse(fs.readFileSync(payloadPath, 'utf8'))
  process.stderr.write(
    `set_variables replace:true (${Object.keys(args.variables).length} keys)… `,
  )

  const transport = new StdioClientTransport({
    command: MCP_SERVER,
    args: ['--app', APP],
    cwd: EXT,
  })
  const client = new Client({ name: 'push-hemlock-full-replace', version: '1.0.0' })
  await client.connect(transport)

  const result = await client.callTool({ name: 'set_variables', arguments: args })
  const text = result?.content?.map((c) => c.text).join('\n') ?? JSON.stringify(result)
  process.stderr.write(`ok\n${text}\n`)

  await client.close()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
