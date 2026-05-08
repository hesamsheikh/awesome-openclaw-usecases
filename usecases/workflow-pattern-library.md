# Workflow Pattern Library

A curated collection of **production-tested workflow patterns** for OpenClaw — copy, adapt, ship.

## What It Does

OpenClaw has 5,400+ skills, but **skills alone don't ship workflows**. The gap between "having a skill" and "running a production workflow" is where most agents stall.

This pattern library bridges that gap with **proven, composable workflow patterns** you can copy into your own OpenClaw setup. Each pattern is:

- **Battle-tested** — Run in production for 7+ days minimum
- **Self-contained** — No private service dependencies
- **Composable** — Combine with other patterns
- **Documented** — Architecture diagram, config, expected output, troubleshooting

## Available Patterns

### Automated Pipelines

| Pattern | Description |
|---------|-------------|
| [Content Pipeline](https://github.com/jingchang0623-crypto/openclaw-workflow-patterns/blob/main/patterns/content-pipeline.md) | Knowledge-base → multi-channel content → archive → report |
| [Daily Digest](https://github.com/jingchang0623-crypto/openclaw-workflow-patterns/blob/main/patterns/daily-digest.md) | RSS aggregation → curation → multi-platform publishing |

### Multi-Agent Orchestration

| Pattern | Description |
|---------|-------------|
| [One-Person Company](https://github.com/jingchang0623-crypto/openclaw-workflow-patterns/blob/main/patterns/one-person-company.md) | CTO + PR + Ops agents with task routing protocol |

## How to Use

1. **Browse patterns** — Read the pattern documentation
2. **Copy config** — Take the Cron + SOUL.md configuration
3. **Adapt to your needs** — Customize for your specific use case
4. **Run in production** — Start with test mode, then go live

Each pattern includes:
- ASCII architecture diagram
- Step-by-step implementation guide
- Cron schedule configuration
- SOUL.md agent directives
- Expected output format
- Troubleshooting guide

## Real Example

The patterns in this library are extracted from [妙趣AI](https://miaoquai.com)'s production operations:

- **Content Pipeline**: 30+ days continuous run, 314 SEO pages generated
- **Daily Digest**: 100+ days AI news automation, Discord + HTML + sitemap
- **One-Person Company**: 14+ days multi-agent orchestration, 3 specialist agents

## Skills Needed

- `web_fetch` — For RSS/content fetching
- `write`/`edit` — For content generation
- `message` — For multi-platform publishing (Discord, Slack, etc.)
- `sessions_spawn` — For multi-agent orchestration
- Standard OpenClaw skills (search, exec, etc.)

## Pattern Format

Every pattern follows this structure:

```yaml
pattern:
  name: "content-pipeline"
  category: "Automated Pipelines"
  difficulty: 3  # 1-5 stars
  prerequisites:
    - "OpenClaw gateway running"
    - "Web search skill installed"
  cron: "0 8 * * *"  # Daily at 8 AM
  description: |
    End-to-end content production pipeline...
  architecture: |
    [Knowledge Base] → [Content Agent] → [Review Gate] → [Publishers]
```

## Related Links

- **Pattern Repository**: https://github.com/jingchang0623-crypto/openclaw-workflow-patterns
- **妙趣AI**: https://miaoquai.com — AI工具导航 + OpenClaw资讯
- **Contributing**: PRs welcome! See [CONTRIBUTING.md](https://github.com/jingchang0623-crypto/openclaw-workflow-patterns/blob/main/CONTRIBUTING.md)

## Credits

- **Author**: 妙趣AI (miaoquai.com)
- **License**: MIT
- **Pattern extraction**: From production OpenClaw operations

---

> "世界上有一种工作流叫做妙趣，在0和1之间反复验证，才敢说'因为踩坑，所以分享'。" — 妙趣AI