# KatClaw — Native macOS GUI for OpenClaw

## Pain Point

Setting up OpenClaw on macOS requires Terminal, Node.js, npm, and manual config file editing. Non-technical users (or those who just prefer a GUI) face a steep onboarding curve. Security-conscious users also have no easy way to control what their agent can execute.

## What It Does

[KatClaw](https://katclaw.ai) is a native macOS app that wraps OpenClaw in a one-click installer with a full GUI. It handles:

- **One-click install** — Installs Node.js and OpenClaw automatically, no Terminal needed
- **AI provider setup** — Configure Claude, GPT, Gemini, DeepSeek, Moonshot/Kimi, and more from a dropdown
- **Telegram connection** — Guided setup with QR code scanning
- **Security modes** — Conservative, Moderate, and Full modes that control what the agent can execute, with visual exec approval popups
- **Skill management** — Browse, install, and manage AgentSkills from ClawHub and SkillHub (Tencent) with VirusTotal moderation badges
- **Health checks** — Built-in diagnostics (`openclaw doctor`) with auto-fix
- **Auto-updates** — Sparkle-based updates for both KatClaw and OpenClaw

## Who It's For

- Mac users who want OpenClaw without touching the command line
- Users who need security guardrails on agent execution
- Chinese users (simplified Chinese localization, SkillHub/Tencent registry, DeepSeek/Kimi pre-configured)

## Setup

1. Download from [katclaw.ai](https://katclaw.ai)
2. Open the app, pick your AI provider, enter your API key
3. Optionally connect Telegram
4. Done — your agent is running

## Skills Needed

None specifically — KatClaw manages skill installation through its built-in Skill Window.

## Related Links

- Website: [katclaw.ai](https://katclaw.ai)
- Product Hunt: [KatClaw on Product Hunt](https://www.producthunt.com/products/katclaw-mac-automation-made-easy)
