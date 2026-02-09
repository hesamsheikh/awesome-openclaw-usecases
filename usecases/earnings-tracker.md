# AI-Powered Earnings Tracker

Following earnings season across dozens of tech companies means checking multiple sources and remembering report dates. You want to stay on top of AI/tech earnings without manually tracking every company.

This workflow automates earnings tracking and delivery:

• Weekly Sunday preview: scans the upcoming earnings calendar and posts relevant tech/AI companies to Telegram
• You pick which companies you care about, and OpenClaw schedules one-shot cron jobs for each earnings date
• After each report drops, OpenClaw searches for results, formats a detailed summary (beat/miss, key metrics, AI highlights), and delivers it

## Skills you Need

- `web_search` (built-in)
- Cron job support in OpenClaw
- Telegram topic for earnings updates

## How to Set it Up

1. Create a Telegram topic called "earnings" for updates.
2. Prompt OpenClaw:
```text
Every Sunday at 6 PM, run a cron job to:
1. Search for the upcoming week's earnings calendar for tech and AI companies
2. Filter for companies I care about (NVDA, MSFT, GOOGL, META, AMZN, TSLA, AMD, etc.)
3. Post the list to my Telegram "earnings" topic
4. Wait for me to confirm which ones I want to track

When I reply with which companies to track:
1. Schedule one-shot cron jobs for each earnings date/time
2. After each report drops, search for earnings results
3. Format a summary including: beat/miss, revenue, EPS, key metrics, AI-related highlights, guidance
4. Post to Telegram "earnings" topic

Keep a memory of which companies I typically track so you can auto-suggest them each week.
```
