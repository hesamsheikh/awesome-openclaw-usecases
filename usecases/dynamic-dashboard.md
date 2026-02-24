# Dynamic Dashboard with Sub-agent Spawning

Static dashboards show stale data and require constant manual updates. You want real-time visibility across multiple data sources without building a custom frontend or hitting API rate limits.

This workflow creates a live dashboard that spawns sub-agents to fetch and process data in parallel:

• Monitors multiple data sources simultaneously (APIs, databases, GitHub, social media)
• Spawns sub-agents for each data source to avoid blocking and distribute API load
• Aggregates results into a unified dashboard (text, HTML, or Canvas)
• Updates every N minutes with fresh data
• Sends alerts when metrics cross thresholds
• Maintains historical trends in a database for visualization

## Pain Point

Building a custom dashboard takes weeks. By the time it's done, requirements have changed. Polling multiple APIs sequentially is slow and hits rate limits. You need insight now, not after a weekend of coding.

## What It Does

You define what you want to monitor conversationally: "Track GitHub stars, Twitter mentions, Polymarket volume, and system health." OpenClaw spawns sub-agents to fetch each data source in parallel, aggregates the results, and delivers a formatted dashboard to Discord or as an HTML file. Updates run automatically on a cron schedule.

Example dashboard sections:
- **GitHub**: stars, forks, open issues, recent commits
- **Social Media**: Twitter mentions, Reddit discussions, Discord activity
- **Markets**: Polymarket volume, prediction trends
- **System Health**: CPU, memory, disk usage, service status

## Skills Needed

- Sub-agent spawning for parallel execution
- `github` (gh CLI) for GitHub metrics
- `bird` (Twitter) for social data
- `web_search` or `web_fetch` for external APIs
- `postgres` for storing historical metrics
- Discord or Canvas for rendering the dashboard
- Cron jobs for scheduled updates

## How to Set it Up

1. Set up a metrics database:
```sql
CREATE TABLE metrics (
  id SERIAL PRIMARY KEY,
  source TEXT, -- e.g., "github", "twitter", "polymarket"
  metric_name TEXT,
  metric_value NUMERIC,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE alerts (
  id SERIAL PRIMARY KEY,
  source TEXT,
  condition TEXT,
  threshold NUMERIC,
  last_triggered TIMESTAMPTZ
);
```

2. Create a Discord channel for dashboard updates (e.g., #dashboard).

3. Prompt OpenClaw:
```text
You are my dynamic dashboard manager. Every 15 minutes, run a cron job to:

1. Spawn sub-agents in parallel to fetch data from:
   - GitHub: stars, forks, open issues, commits (past 24h)
   - Twitter: mentions of "@username", sentiment analysis
   - Polymarket: volume for tracked markets
   - System: CPU, memory, disk usage via shell commands

2. Each sub-agent writes results to the metrics database.

3. Aggregate all results and format a dashboard:

📊 **Dashboard Update** — [timestamp]

**GitHub**
- ⭐ Stars: [count] (+[change])
- 🍴 Forks: [count]
- 🐛 Open Issues: [count]
- 💻 Commits (24h): [count]

**Social Media**
- 🐦 Twitter Mentions: [count]
- 📈 Sentiment: [positive/negative/neutral]

**Markets**
- 📊 Polymarket Volume: $[amount]
- 🔥 Trending: [market names]

**System Health**
- 💻 CPU: [usage]%
- 🧠 Memory: [usage]%
- 💾 Disk: [usage]%

4. Post to Discord #dashboard.

5. Check alert conditions:
   - If GitHub stars change > 50 in 1 hour → ping me
   - If system CPU > 90% → alert
   - If negative sentiment spike on Twitter → notify

Store all metrics in the database for historical analysis.
```

4. Optional: Use Canvas to render an HTML dashboard with charts and graphs.

5. Query historical data: "Show me GitHub star growth over the past 30 days."

## Related Links

- [Parallel Processing with Sub-agents](https://docs.openclaw.ai/subagents)
- [Dashboard Design Principles](https://www.nngroup.com/articles/dashboard-design/)
