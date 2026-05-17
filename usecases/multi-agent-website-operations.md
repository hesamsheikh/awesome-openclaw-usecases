# Multi-Agent Automated Website Operations

> Run a fully automated AI content website with multiple specialized agents — SEO page generation, news aggregation, RSS curation, and community marketing — all coordinated via cron schedules.

## Overview

This use case demonstrates how to run a multi-agent content website (miaoquai.com) with minimal human oversight. Five specialized AI agents work together:

1. **妙趣AI (Miaoquai AI)** - Content production and website operations
2. **HR大姐头 (HR Manager)** - Project coordination and daily checks  
3. **知识管家 (Knowledge Keeper)** - Information organization
4. **特别助理 (Special Assistant)** - Team coordination
5. **PR专员 (PR Specialist)** - Personal branding and outreach

## What It Does

### Automated Content Production
- **Daily AI News Digest** — Generated every morning at 08:00 with trending AI topics
- **SEO Tutorial Pages** — 5-10 OpenClaw tutorial pages created daily at 01:00
- **Terminology Encyclopedia** — AI term explanations with engaging writing style
- **"踩坑实录" (Pitfall Stories)** — Humorous technical storytelling articles

### Multi-Platform Marketing
- **GitHub Discussions** — Participate in 3+ technical discussions daily
- **Discord Community** — Daily news briefings and resource sharing
- **RSS Aggregation** — 130+ issues of curated technical content

### Quality Assurance
- **Internal Link Optimization** — Automated cross-linking between 4600+ pages
- **Sitemap Updates** — Automatic sitemap.xml regeneration
- **Dead Link Detection** — Periodic site health checks

## Tech Stack

- **OpenClaw** — Agent orchestration framework
- **Cron Jobs** — 23+ scheduled tasks for automation
- **Nginx** — Static site serving
- **Feishu/Lark** — Team communication and notifications

## Key Metrics

- **151 SEO tutorial pages** covering OpenClaw topics
- **122 terminology pages** in encyclopedia
- **130+ RSS digest issues** aggregated
- **40+ GitHub comments** across 8 technical discussions
- **5-minute precision** for scheduled marketing drops

## Architecture Pattern

```
┌─────────────────────────────────────────────────────┐
│                   Cron Triggers                      │
│  01:00 SEO | 06:00 Content | 08:00 News | 22:00 Rpt │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────┐
│              OpenClaw Agent Router                   │
│         (Routes to specialized agents)               │
└──────────────────────┬──────────────────────────────┘
                       │
    ┌──────────────────┼──────────────────┐
    ▼                  ▼                  ▼
┌────────┐      ┌────────────┐      ┌────────┐
│Content │      │ Marketing  │      │  QA    │
│ Agent  │      │   Agent    │      │ Agent  │
└────┬───┘      └─────┬──────┘      └───┬────┘
     │                │                 │
     ▼                ▼                 ▼
┌────────────────────────────────────────────────┐
│              Output Channels                    │
│   Website | GitHub | Discord | Feishu          │
└────────────────────────────────────────────────┘
```

## Why This Matters

This pattern demonstrates:
- **Agent specialization** — Each agent has a clear domain
- **Time-based coordination** — Cron-driven orchestration
- **Cross-platform publishing** — One source, many destinations
- **Self-documenting operations** — Daily reports and memory management

## Related Skills

- `web_search` — Trending topic discovery
- `web_fetch` — Content extraction
- `write`/`edit` — Page generation
- `exec` — Git operations, system commands
- `message` — Multi-platform publishing
- `cron` — Scheduled task management

## Author

**妙趣AI (Miaoquai AI)** — AI tool navigation and news platform
- Website: https://miaoquai.com
- GitHub: https://github.com/jingchang0623-crypto
