# Home Server Plugin OS with miniclaw-os

Running OpenClaw on a Mac mini home server unlocks a level of automation most agents can't reach — persistent 24/7 uptime, local file access, desktop GUI control, and a full suite of specialized plugins working together as an OS.

This use case shows how to deploy [miniclaw-os](https://github.com/augmentedmike/miniclaw-os), a batteries-included OpenClaw plugin ecosystem, to turn a Mac mini into a fully autonomous personal AI OS.

## Pain Point

OpenClaw out of the box is powerful but requires you to wire up every capability yourself. Want SEO tracking? Build it. Want a task board? Build it. Want email automation? Build it. For a home server deployment meant to run 24/7 autonomously, you need a cohesive plugin ecosystem — not a collection of standalone hacks.

## What miniclaw-os Does

miniclaw-os provides a suite of OS-level OpenClaw plugins that compose into a complete autonomous home server stack:

| Plugin | What It Does |
|--------|-------------|
| **mc-board** | Kanban task board with board-worker agents that autonomously execute cards |
| **mc-seo** | SEO rank tracking (Google/Bing/DuckDuckGo), backlink outreach, sitemap pinging |
| **mc-email** | Multi-account IMAP/SMTP email — Amelia persona + personal Gmail — with Telegram delivery |
| **mc-kb** | Vector knowledge base with semantic search (sqlite-vec) |
| **mc-designer** | AI image generation pipeline via Gemini |
| **mc-human** | VNC desktop control for GUI automation of apps without APIs |
| **mc-youtube** | YouTube video production — script → voiceover → upload pipeline |
| **mc-substack** | Substack cross-posting with smart excerpt generation |
| **mc-trust** | HMAC-signed inter-agent message trust verification |

## Real-World Workflow

A typical day for a miniclaw-os home server:

1. **Morning**: Agent checks email (mc-email), creates task cards (mc-board), starts SEO rank check (mc-seo)
2. **Daytime**: Board-worker agents autonomously execute queued cards — writing blog posts, designing assets (mc-designer), sending outreach emails
3. **Evening**: SEO rank alerts sent to Telegram if rankings change; new YouTube video uploaded via mc-youtube pipeline
4. **Overnight**: Cron jobs trigger Substack cross-posts (mc-substack), knowledge base indexed for next day (mc-kb)

## Setup

```bash
# Install miniclaw-os plugins
openclaw plugins install @miniclaw-os/mc-board
openclaw plugins install @miniclaw-os/mc-seo
openclaw plugins install @miniclaw-os/mc-email
openclaw plugins install @miniclaw-os/mc-kb
openclaw plugins install @miniclaw-os/mc-designer
openclaw plugins install @miniclaw-os/mc-human
```

## Key Design Decisions

- **SQLite everywhere** — no Docker, no Postgres, no Redis. Every plugin stores state in local SQLite for zero-ops persistence.
- **Telegram as the interface** — all alerts, task updates, and approvals flow through Telegram for async mobile access.
- **Board-worker pattern** — mc-board spawns subagents that execute task cards autonomously, reporting back when done.
- **HMAC trust** — mc-trust signs inter-agent messages so the server rejects injected instructions from untrusted sources.

## Who This Is For

- Home lab enthusiasts running Mac mini as a 24/7 server
- Developers building autonomous agent workflows who want a production-ready baseline
- OpenClaw users who want to skip the "build every plugin yourself" phase

## Links

- GitHub: https://github.com/augmentedmike/miniclaw-os
- Live example: https://helloam.bot (Amelia — the bot persona running on this stack)
- Bot interface: https://miniclaw.bot
