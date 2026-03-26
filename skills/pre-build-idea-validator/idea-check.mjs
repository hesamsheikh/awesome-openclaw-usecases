#!/usr/bin/env node
/**
 * idea-check — CLI wrapper for idea-reality-mcp
 *
 * Bridges OpenClaw's exec tool to the idea-reality-mcp MCP server over stdio.
 * Finds the installed binary automatically, falling back to uvx.
 *
 * Usage:
 *   node idea-check "your idea description" [--depth quick|deep]
 *
 * Setup (pick one):
 *   pip install idea-reality-mcp   ← recommended, fastest
 *   uvx idea-reality-mcp           ← auto-downloads on first run, slower
 */
import { spawn, execSync } from 'node:child_process';
import { parseArgs } from 'node:util';
import { existsSync } from 'node:fs';

const { values, positionals } = parseArgs({
  options: {
    depth: { type: 'string', default: 'quick' },
    help: { type: 'boolean', short: 'h', default: false },
  },
  allowPositionals: true,
  strict: false,
});

if (values.help || positionals.length === 0) {
  console.log('Usage: node idea-check "your idea" [--depth quick|deep]');
  process.exit(0);
}

const ideaText = positionals.join(' ');
const depth = values.depth;

function findBinary() {
  // 1. System PATH
  try {
    const p = execSync('which idea-reality-mcp 2>/dev/null', { encoding: 'utf8' }).trim();
    if (p && existsSync(p)) return [p, []];
  } catch {}
  // 2. Common install locations
  const candidates = [
    `${process.env.HOME}/.local/bin/idea-reality-mcp`,
    '/usr/local/bin/idea-reality-mcp',
    '/usr/bin/idea-reality-mcp',
  ];
  for (const c of candidates) {
    if (existsSync(c)) return [c, []];
  }
  // 3. Fallback: uvx (slower on first run — downloads packages)
  return ['uvx', ['idea-reality-mcp']];
}

function formatOutput(d) {
  const signal = d.reality_signal;
  const level = signal > 70 ? 'HIGH' : signal >= 30 ? 'MEDIUM' : 'LOW';
  const lines = [`reality_signal: ${signal}/100 (${level} competition)`, ''];
  if (d.top_similars?.length) {
    lines.push('Top competitors:');
    d.top_similars.slice(0, 3).forEach((s, i) => {
      lines.push(`  ${i + 1}. ${s.name} — ${s.stars} stars`);
      if (s.description) lines.push(`     ${s.description}`);
    });
    lines.push('');
  }
  if (d.pivot_hints?.length) {
    lines.push('Pivot hints:');
    d.pivot_hints.forEach(h => lines.push(`  • ${h}`));
  }
  return lines.join('\n');
}

const [cmd, args] = findBinary();
const proc = spawn(cmd, args, { stdio: ['pipe', 'pipe', 'pipe'] });

let buffer = '';
let initialized = false;
let done = false;

proc.stdout.on('data', chunk => {
  buffer += chunk.toString();
  const lines = buffer.split('\n');
  buffer = lines.pop();
  for (const line of lines) {
    if (!line.trim()) continue;
    let msg;
    try { msg = JSON.parse(line); } catch { continue; }

    if (msg.id === 1 && msg.result?.serverInfo && !initialized) {
      initialized = true;
      proc.stdin.write(JSON.stringify({ jsonrpc: '2.0', method: 'notifications/initialized' }) + '\n');
      proc.stdin.write(JSON.stringify({
        jsonrpc: '2.0', id: 2, method: 'tools/call',
        params: { name: 'idea_check', arguments: { idea_text: ideaText, depth } },
      }) + '\n');
    }

    if (msg.id === 2 && !done) {
      done = true;
      const text = msg.result?.content?.map(c => c.text ?? '').join('\n').trim();
      try { console.log(formatOutput(JSON.parse(text))); }
      catch { console.log(text); }
      proc.kill(); process.exit(0);
    }

    if (msg.error && !done) {
      done = true;
      console.error('Error:', msg.error.message);
      proc.kill(); process.exit(1);
    }
  }
});

proc.stderr.on('data', d => {
  const s = d.toString();
  const noise = ['Downloading', 'Installed', 'Downloaded', 'INFO', 'FastMCP', 'fastmcp', 'Starting', 'gofastmcp'];
  if (!noise.some(n => s.includes(n))) process.stderr.write(s);
});

proc.on('error', err => {
  console.error('Failed to start idea-reality-mcp:', err.message);
  console.error('Install it with: pip install idea-reality-mcp');
  process.exit(1);
});
proc.on('close', code => {
  if (!done) { console.error('Process exited early (code ' + code + ')'); process.exit(1); }
});

proc.stdin.write(JSON.stringify({
  jsonrpc: '2.0', id: 1, method: 'initialize',
  params: { protocolVersion: '2024-11-05', capabilities: {}, clientInfo: { name: 'idea-check-cli', version: '1.0' } },
}) + '\n');

setTimeout(() => { if (!done) { console.error('Timeout'); proc.kill(); process.exit(1); } }, 60000);
