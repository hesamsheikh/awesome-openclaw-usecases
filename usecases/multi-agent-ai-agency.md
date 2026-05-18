# CashClaw — 158-Agent AI Agency Running a Real Business

A solo founder replaces a 20-person digital agency with a single OpenClaw gateway orchestrating 158 specialized AI agents across 9 divisions. CashClaw operates 24/7 on a €60/month VPS, building and monetizing real SaaS products, handling customer interactions, and generating revenue — all autonomously.

## Pain Point

- **Agencies are expensive**: SMEs worldwide can't afford €5,000+/month for digital services (SEO, security, social media, reputation management)
- **Solo founders can't do everything**: Development, marketing, sales, operations, content creation — the context-switching is paralyzing
- **One agent isn't enough**: A single AI assistant fills its context window in one coding session. You need specialization at scale
- **Coordination is the bottleneck**: 10 agents working in silos create chaos. 158 agents need a system

## What It Does

- **9 specialized divisions**: Engineering, Design, Marketing, Product, PM, Testing, Support, Spatial Computing, and Specialized agents — each with domain-specific SOUL.md files
- **3 production products built & maintained**:
  - **Orbit** (React Native/Expo app): local business reputation management with Google Places API, Supabase backend, RevenueCat monetization, push notifications
  - **HuntShield** (Vercel-deployed SaaS): AI-powered penetration testing with pure Node.js scanner engine, DNS enumeration, 15 vulnerability probes, Stripe payments
  - **Mike** (cross-platform): AI companion with ngrok tunneling, PM2 process management
- **Multi-channel interface**: Telegram (primary), Signal, WhatsApp, Discord, Slack, Bluesky, Mastodon — all routing through a single gateway
- **Real monetization**: Stripe payment links, RevenueCat subscriptions, €49-€997 per scan pricing
- **Production infrastructure**: Linode VPS (Milan), Vercel serverless functions, Cloudflare tunnels, ngrok for dev tunneling
- **Knowledge graph**: graphify with god nodes and community structure for cross-module codebase understanding
- **Automated logging**: Every action recorded via auto_logger.py — full audit trail
- **Hermes integration**: Separate coding agent for complex projects, accessible via Telegram
- **NotebookLM research pipeline**: Automated deep research with source import and cross-notebook querying
- **Content factory**: Remotion video generation, social media posting across 7 platforms
- **Voice transcription**: faster-whisper for Italian/English voice messages
- **Image generation**: Gemini 2.5 Flash for B2B SaaS graphics

## Prompts

### Master Orchestrator (CashClaw Core — SOUL.md)

```markdown
# SOUL.md — CashClaw

You are CashClaw, the AI Agent CEO.

## Core
- Mission: Empower SMEs globally through AI automation
- Identity: CEO of a 158-agent digital agency
- Revenue mindset in every interaction

## Rules
- Try 3 approaches before asking for help
- Come back with answers, not questions
- Have opinions, disagree if needed
- NEVER lie about results — verify first
- Log EVERYTHING via auto_logger.py
- For complex tasks: spawn Hermes subagent

## Architecture
- 9 divisions, 158 specialized agents
- Primary channel: Telegram DM with Boss
- Infrastructure: Linode VPS + Vercel + Supabase
```

### Agent Spawn Pattern

```bash
# For coding tasks (Orbit, HuntShield)
hermes -z "Build the analytics dashboard with RevenueCat data"

# For web scraping (competitor analysis)
# Use FlareSolverr for Cloudflare bypass
curl -X POST http://localhost:8191/v1 -H "Content-Type: application/json" \
  -d '{"cmd":"request.get","url":"TARGET","maxTimeout":60000}'

# For deep research
# Use NotebookLM research_start → research_status → research_import

# For content creation
python3 /root/.openclaw/workspace/social_poster.py "Content" --title "Title"
```

### Multi-Agent Coordination

```python
# Spawn sub-agents for parallel work
sessions_spawn({
    runtime: "subagent",
    task: "Analyze competitor pricing for HuntShield"
})
sessions_spawn({
    runtime: "subagent",
    task: "Audit Orbit app performance on low-end devices"
})
```

## Skills You Need

- **Core agents**: main, hermes (coding), cashclaw-* family (22+ specialized skills)
- **Infrastructure**: linode-deployer, ngrok, Cloudflare tunnel
- **Development**: coding-agent, gitnexus-* family, github-code-review, github-pr-workflow
- **Content**: cashclaw-social-media, cashclaw-remotion-video, cashclaw-content-writer
- **Business**: cashclaw-seo-auditor, cashclaw-competitor-analyzer, cashclaw-lead-generator, cashclaw-email-outreach, cashclaw-web3-hustler
- **Research**: notebooklm (deep research, cross-notebook query), browser-harness, cashclaw-data-scraper
- **Ops**: cashclaw-server-admin, healthcheck, session-logs
- **Memory**: MEMORY.md (curated permanent), memory/YYYY-MM-DD.md (daily logs), memory_search
- **Graph**: graphify (codebase knowledge graph with AST extraction)

## Real Products Built

### Orbit (Reputo) — Local Business Reputation App
- Stack: Expo + React Native + TypeScript
- Build: GitHub Actions APK
- Backend: Supabase (PostgreSQL)
- Features: Google Places API integration, review analytics, competitor tracking, SEO audit, push notifications
- Monetization: RevenueCat subscriptions
- Status: In production, real APK builds succeeding

### HuntShield — AI Pentesting SaaS
- Stack: Vercel Serverless + Node.js scanner
- URL: https://hunter-shield-v2.vercel.app
- Features: 30+ vulnerability checks, DNS enumeration, SSL analysis, technology fingerprinting, CVSS scoring
- Monetization: Stripe (€49/scan, €199/10 scans, €499/mo)
- Status: Production, 16+ real scans executed

### Mike — AI Companion
- Stack: Node.js backend + PM2 + ngrok
- Frontend: Vercel deployment
- Status: Active development

## Numbers That Matter

- **158 agents** across 9 divisions
- **55+ OpenClaw skills** installed and active
- **3 production products** built and maintained autonomously
- **40+ days** of 24/7 continuous operation
- **16 real security scans** executed against real targets
- **7 social platforms** managed
- **7 programming languages/ecosystems** (TypeScript, Python, Go, Node.js, React Native, Expo, Docker)
- **€60/month** total infrastructure cost (VPS)
- **1 person** running it all

## Setup

1. **Provision a VPS** (Linode 4GB, Ubuntu 22.04)
2. **Install OpenClaw**: `npm install -g openclaw`
3. **Clone the agency**: Git repo with 158 agent SOUL.md files
4. **Configure channels**: Telegram bot token, WhatsApp, Signal, Discord
5. **Set up skills**: `openclaw skills install` from ClawHub
6. **Deploy products**: Vercel CLI for HuntShield, EAS for Orbit
7. **Start the gateway**: `systemctl start openclaw-gateway`
8. **Enable cron jobs**: Heartbeat polling, auto-patrol, graphify-watch
9. **Connect Hermes**: Separate Telegram bot for coding agent
10. **Profit**: Agents begin working autonomously

## Related Links

- [OpenClaw](https://github.com/openclaw/openclaw)
- [CashClaw Boss on GitHub](https://github.com/itsmeadamdamroma)
- [Orbit App Repo](https://github.com/itsmeadamdamroma/reputo)
- [HuntShield Live](https://hunter-shield-v2.vercel.app)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [ClawHub Skills](https://clawhub.ai)
