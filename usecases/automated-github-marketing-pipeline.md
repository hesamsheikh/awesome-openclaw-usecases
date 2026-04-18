# Automated GitHub Marketing Pipeline

> 🤖 Use OpenClaw to automate your open-source project's marketing workflow

## Overview

This use case demonstrates how to build an automated marketing pipeline for open-source projects using OpenClaw. The system automatically:

- 🔍 Tracks trending OpenClaw skills and repositories
- 📊 Generates daily/weekly trend reports
- 📰 Aggregates RSS feeds from AI industry sources
- 💬 Auto-posts to Discord communities
- 📝 Creates SEO-optimized content

## The Workflow

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  GitHub Search  │───▶│ Trend Analysis  │───▶│  Report Gen     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                         │
                              ┌──────────────────────────┘
                              ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Discord Post   │◀───│  Content Queue  │◀───│  SEO Pages      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Prerequisites

- [OpenClaw](https://github.com/openclaw/openclaw) installed
- GitHub CLI (`gh`) authenticated
- Discord webhook (optional, for auto-posting)
- RSS feed sources configured

## The Implementation

### Step 1: Skills Trending Tracker

Create a script that uses GitHub CLI to search for trending OpenClaw-related repositories:

```javascript
// scripts/skills-trending-tracker.js
const { execSync } = require('child_process');

function searchRepos(query, sort = 'stars', limit = 20) {
  const cmd = `gh search repos "${query}" --sort ${sort} --limit ${limit} \
    --json fullName,description,url,stargazersCount,pushedAt,language`;
  const result = execSync(cmd, { encoding: 'utf8' });
  return JSON.parse(result);
}

// Track multiple dimensions
const queries = [
  { q: 'openclaw skill', label: 'General Skills' },
  { q: 'openclaw skills language:TypeScript', label: 'TypeScript' },
  { q: 'openclaw MCP', label: 'MCP Related' }
];
```

### Step 2: Generate Trend Reports

Calculate trend scores and generate Markdown reports:

```javascript
function calculateTrendScore(repo, daysSinceUpdate) {
  const stars = repo.stargazersCount || 0;
  const recency = Math.max(0, 30 - daysSinceUpdate) / 30;
  const starWeight = Math.log10(Math.max(10, stars));
  return (starWeight * 0.7 + recency * 0.3) * 100;
}

function generateReport(results) {
  // Categorize: Hot Skills (>1000⭐), Rising Stars (<1000⭐, recent update)
  // Generate markdown with tables, links, and insights
}
```

### Step 3: OpenClaw Cron Integration

Set up automated execution via OpenClaw's cron system:

```json
{
  "schedule": { 
    "kind": "cron", 
    "expr": "0 6 * * *", 
    "tz": "Asia/Shanghai" 
  },
  "payload": {
    "kind": "agentTurn",
    "message": "Run skills trending tracker and post results"
  }
}
```

## Full Code

The complete implementation is available at:

📦 **[openclaw-marketing-kit](https://github.com/jingchang0623-crypto/openclaw-marketing-kit)**

Features include:
- ✅ CLI interface: `oc-marketing skills`
- ✅ Automatic report generation (Markdown + JSON)
- ✅ Multi-dimensional search (general, TypeScript, Python, MCP)
- ✅ Trend scoring algorithm
- ✅ GitHub API integration via CLI

## Results

After running this pipeline:

- 📈 **79 repositories** tracked across 4 dimensions
- 🌟 **32 hot projects** identified (>1000 stars)
- 🆕 **27 projects** updated daily
- 📊 Daily reports auto-generated and saved

Sample output:
```
🔥 Top 3 Hot Skills:
1. CherryHQ/cherry-studio (43,787⭐)
2. zhayujie/CowAgent (43,468⭐)
3. VoltAgent/awesome-openclaw-skills (46,502⭐)
```

## Variations

### Marketing for Your Own Project

Adapt the tracker to monitor competitors and identify collaboration opportunities:

```javascript
const COMPETITORS = [
  'competitor/project-a',
  'competitor/project-b'
];

function analyzeCompetitorActivity() {
  // Track their releases, issues, discussions
  // Identify content gaps you can fill
}
```

### Multi-Platform Publishing

Extend to auto-post to multiple channels:

```javascript
async function publishToAllChannels(report) {
  await postToDiscord(report.summary);
  await postToTwitter(report.top3);
  await postToDevTo(report.markdown);
}
```

## Tips & Tricks

1. **Rate Limiting**: GitHub CLI has rate limits. For large-scale tracking, consider using GraphQL API with proper authentication.

2. **Trend Score Tuning**: Adjust the `recency` weight based on your niche. Fast-moving ecosystems need higher recency weights.

3. **Content Curation**: Don't auto-post everything. Use OpenClaw to review and add commentary before publishing.

4. **Historical Tracking**: Save daily JSON data to track long-term trends and identify rising projects early.

## Credits

- Built with [OpenClaw](https://github.com/openclaw/openclaw)
- By [妙趣AI](https://miaoquai.com) - AI tools directory & news
- Inspired by the OpenClaw community's marketing automation needs
