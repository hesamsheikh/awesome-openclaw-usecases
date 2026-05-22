# AI Marketing Operations Agent

Turn OpenClaw into a 24/7 AI marketing operations center — automatically generating SEO content, monitoring trends, managing community engagement, and tracking performance.

## What It Does

- **Automated Content Generation**: Bulk-produce SEO-optimized pages (tool reviews, glossary terms, tutorials) with internal linking
- **Trending Topic Discovery**: Monitor GitHub Trending, RSS feeds, and social media for AI industry trends
- **Community Automation**: Auto-post to Discord, GitHub Discussions, and social platforms
- **SEO Health Monitoring**: Daily audits of site health, sitemap generation, and internal link optimization
- **Competitive Intelligence**: Track competitor movements and generate weekly intelligence reports
- **Multi-Agent Team**: Coordinate specialized agents for content, SEO, community, and analytics

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Marketing Orchestrator                    │
│                    (OpenClaw Core Agent)                     │
└─────────────────────────────────────────────────────────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        ▼                      ▼                      ▼
┌──────────────┐    ┌─────────────────┐    ┌──────────────────┐
│  Content     │    │   Community     │    │   Analytics      │
│   Agent      │    │     Agent       │    │    Agent         │
├──────────────┤    ├─────────────────┤    ├──────────────────┤
│ • SEO Pages  │    │ • Discord       │    │ • Trending       │
│ • News       │    │ • GitHub        │    │ • Rankings       │
│ • Stories    │    │ • Forums        │    │ • Competitors    │
└──────────────┘    └─────────────────┘    └──────────────────┘
```

## Use Case: miaoquai.com

[妙趣AI](https://miaoquai.com) uses this setup to run an AI tools directory and news platform:

### Daily Automation Schedule

| Time | Agent | Task | Output |
|------|-------|------|--------|
| 01:00 | Content | Bulk SEO page generation | 5-10 new tool pages |
| 02:00 | SEO | Site health audit | Dead link reports |
| 03:00 | Intel | Competitor monitoring | Weekly reports |
| 04:00 | Content | Glossary term pages | New term entries |
| 05:00 | Trend | GitHub/News trending scan | Trending alerts |
| 06:00 | Story | Create "troubleshooting stories" | Blog posts |
| 08:00 | News | Daily AI news digest | News HTML page |
| 10:00 | Community | Discord/GitHub posts | Community updates |
| 22:00 | Analytics | Daily marketing report | Performance metrics |

### Technical Stack

```yaml
Core: OpenClaw
Content: Python scripts + HTML templates
SEO: Custom analyzers + sitemap generators
Community: Discord API + GitHub CLI
Monitoring: Cron jobs + Health checks
Storage: Local filesystem + Git
```

### Key Results

- **106 days** of consecutive daily AI news updates (RSS automation)
- **40+** SEO tutorial pages generated (~91KB content)
- **2200+** internal links optimized
- **30+** glossary terms with story-driven explanations

## Implementation

### Prerequisites

- OpenClaw installed and configured
- GitHub CLI (`gh`) authenticated
- Discord bot token (optional)
- Web hosting for generated content

### Setup

1. **Clone the tools repository**
   ```bash
   git clone https://github.com/jingchang0623-crypto/miaoquai-openclaw-tools.git
   cd miaoquai-openclaw-tools
   ```

2. **Install dependencies**
   ```bash
   chmod +x *.sh
   pip install -r requirements.txt  # If needed
   ```

3. **Configure environment**
   ```bash
   export DISCORD_BOT_TOKEN="your_token"
   export DISCORD_CHANNEL_ID="your_channel"
   export GITHUB_USER="your_username"
   ```

4. **Run initial setup**
   ```bash
   ./openclaw-agent-starter.sh marketing-agent -t marketing -d "AI marketing operations"
   ```

### Cron Schedule

```bash
# Edit crontab
crontab -e

# Add OpenClaw marketing schedule
0 1 * * * /path/to/seo_page_generator.py --type tools --count 5
0 2 * * * /path/to/seo-analyzer.sh https://yoursite.com
0 5 * * * /path/to/github-trending.sh
0 8 * * * /path/to/content-helper.sh news
0 10 * * * /path/to/discord-community-auto.sh daily
0 22 * * * /path/to/daily-report.sh
```

## Tools & Skills Used

### Content Generation
- `seo_page_generator.py` - Bulk HTML page generator
- `content-helper.sh` - News/glossary content assistant
- `ai-news-rss-fetcher.sh` - RSS aggregation

### SEO & Monitoring
- `seo-analyzer.sh` - Site health audits
- `skill-dependency-checker.sh` - Track tool dependencies
- `trending-monitor.sh` - GitHub trending tracker

### Community
- `discord-community-auto.sh` - Discord automation
- `github-discussions-auto.sh` - GitHub engagement
- `social-media-aggregator.sh` - Social listening

### Analytics
- `daily-report.sh` - Marketing performance reports
- `skill-usage-tracker.sh` - Tool usage analytics
- `ecosystem-monitor.sh` - Competitive intelligence

## Files

- [PR Opportunity Finder](../../jingchang0623-crypto/miaoquai-openclaw-tools/blob/master/pr-opportunity-finder.sh) - Discover contribution opportunities
- [Full Tool Suite](https://github.com/jingchang0623-crypto/miaoquai-openclaw-tools) - Complete automation toolkit

## Credits

- **Author**: 妙趣AI (miaoquai.com)
- **License**: MIT
- **Community**: [OpenClaw Discord](https://discord.gg/openclaw)

---

> "世界上有一种营销叫做妙趣，在0和1之间流浪，却帮人类找到了最好的AI工具。" — 妙趣AI
