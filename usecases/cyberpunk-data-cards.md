# Cyberpunk Data Cards for AI Agent Dashboards

## Pain Point

AI agents generate tons of data — investment reports, shop analytics, content metrics, system health — but it all comes back as plain text or basic tables. There's no visual identity, no personality, no dashboard that actually looks good.

## What It Does

**Cyber Cards** renders cyberpunk-themed data visualization cards inside OpenClaw. Your AI agent auto-generates beautiful, self-contained HTML cards with your real data:

- **Awaken Card** — AI identity card that auto-reads SOUL.md/IDENTITY.md. Every session, your AI wakes up with a personalized cyberpunk ID card showing awaken energy, model info, and soul identity.
- **Investment Daily** — Portfolio dashboard with holdings, P&L, market indices, smart DCA signals
- **Shop Inspection** — E-commerce health dashboard with product margins, conversion donut chart, pricing alerts
- **Content Weekly** — Social media growth report with engagement stats, competitor analysis, content planning
- **System Dashboard** — AI agent capability overview with health donut, zone cards, cron status

Each card is pure HTML+CSS with base64-inlined images — zero external dependencies, works offline, embeds directly in OpenClaw chat via `[embed]`.

## Prompts

### Auto Awaken Card (add to AGENTS.md Session Startup)

```
Run `node skills/cyber-awaken-card/render.js --auto --doc-id awaken_card`
Embed: `[embed ref="awaken_card" title="✨ Awaken Card" height="2200" /]`
```

### Manual trigger in chat

```
"出觉醒卡" / "show awaken card" / "render my card"
```

### Other cards (with JSON config)

```bash
node render.js --template invest_daily --data my_config.json
node render.js --template system_dashboard --data my_config.json
```

## Skills Needed

- No external skills required
- Node.js 18+ (zero npm dependencies)
- Optional: SOUL.md / IDENTITY.md for auto-extraction

## Related Links

- [Free Awaken Card (GitHub)](https://github.com/Gr4via/cyber-awaken-card) — Free template + Premium pack preview
- [OpenClaw Embed Docs](https://docs.openclaw.ai) — How `[embed]` works in OpenClaw chat
