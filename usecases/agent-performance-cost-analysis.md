# Agent Performance & Cost Analysis

Find where your OpenClaw agent’s tokens are really going. Check which steps burn money on retry loops, which models justify their cost, and whether your last optimization improved outcomes or just increased spend.

## Pain Point

You're running OpenClaw. Token costs keep climbing. You swap models, tweak prompts, and hope it helped — but you're never sure.

Most people don't know:
- Where exactly the money's going in each run
- Which step kept retrying without making progress
- Whether the score went up enough to justify the cost increase
- Which model is actually worth its price for your tasks

Raw session logs don't make this obvious. You need to replay what happened, score the result, and break down where every token went.

## What It Does

**ClawClip** is a local web app that reads your OpenClaw / ZeroClaw session logs and gives you three answers:

1. **Run Insights (Replay)** — Step through what your agent actually did: every tool call, retry, reasoning block, and response, in order. Find where it went sideways without digging through raw JSONL.

2. **Agent Scorecard (Benchmark)** — Six-dimension verdict after each run (writing, code, tool use, retrieval, safety, cost-efficiency). When you make a change, you get before/after proof: score, tokens, cost — with a plain verdict: better, worse, or no real difference.

3. **Cost Report** — Breaks spend by model, task, and session. Flags retry loops, context bloat, prompt inefficiency, and model mismatches. Tells you which changes are most likely to cut cost without hurting quality.

## How to Set It Up

ClawClip runs locally — no upload, reads your existing logs.

\`\`\`bash
git clone https://github.com/Ylsssq926/clawclip.git
cd clawclip && npm install
npm start
\`\`\`

Open \`http://localhost:8080\`. The built-in demo sessions load immediately. When you're ready, point it at your own logs:

\`\`\`bash
# Point at a custom log directory
CLAWCLIP_LOBSTER_DIRS=/path/to/your/sessions npm start
\`\`\`

## Session Sources

| Source | Notes |
| --- | --- |
| \`~/.openclaw/\` | Auto-discovered at startup |
| \`OPENCLAW_STATE_DIR\` | Override the default OpenClaw state path |
| \`CLAWCLIP_LOBSTER_DIRS\` | Add extra folders (comma or semicolon separated) |
| Built-in demo sessions | Available immediately, no real data needed |
| ZeroClaw exports / other JSONL | Supported progressively |

## What You'll See

After a run, you can:
- **Replay it step by step** — see which tool calls succeeded, which failed, which retried
- **Get a scorecard** — six dimensions, overall score, rank (S/A/B/C/D)
- **See the cost breakdown** — which model, which task type, which session
- **Compare before/after** — did the last change make it stronger or just more expensive?
- **Get savings suggestions** — prioritized by impact

## Skills Needed

None. ClawClip is a standalone tool, not an OpenClaw skill. It reads session logs after the fact.

## Related Links

- [ClawClip GitHub](https://github.com/Ylsssq926/clawclip)
- [Live Demo](https://clawclip.luelan.online)
- [FAQ](https://github.com/Ylsssq926/clawclip/blob/main/docs/FAQ.md)

## Why This Matters

Knowing today's total spend isn't enough. Being able to point at the exact step where the money's going — that's when you can actually start cutting waste.

ClawClip doesn't change how your agent runs. It shows you what happened so you can decide what to fix next.
