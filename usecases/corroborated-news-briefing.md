# Corroborated Daily News Briefing & Breaking Alerts

Get a personalized daily news briefing where every story is corroborated by multiple independent sources, plus real-time breaking-news alerts — all from one skill install, no API key required.

## Pain Point

News digests built on a single feed happily forward unverified single-source stories, and you can't tell a confirmed event from a rumor. Checking multiple outlets to corroborate a story yourself defeats the point of a digest. And a daily digest is too slow for genuinely breaking news.

## What It Does

Uses the [newsflash](https://clawhub.ai/zatmonkey/newsflash) skill, backed by a hosted event graph that dedupes 260+ global sources (21 languages) into single events with corroboration counts and confidence scores:

- Interviews you once about your interests (topics, regions, tickers, people)
- Sends a daily briefing ranked by corroboration — stories confirmed by more independent sources rank higher
- Quarantines single-source stories into a separate "watchlist" section instead of presenting them as fact
- Watches the real-time SSE stream between briefings and pings you when a breaking event matching your interests crosses a confidence threshold

Works keyless on the free tier — nothing to sign up for before you see it working.

## Prompts

**Install and set up:**
```text
Install the newsflash skill (clawhub install newsflash), then interview me
about my news interests and set up a daily 8:00 AM briefing to Telegram.
Rank stories by corroboration and put single-source stories in a watchlist
section at the bottom.
```

**Breaking alerts:**
```text
Watch the newsflash real-time stream and alert me immediately when a
breaking story matching my interests reaches at least 3 corroborating
sources.
```

**Verify the underlying feed directly (no key needed):**
```bash
npx newsflash stream -c tech
```

## Skills Needed

- [newsflash](https://clawhub.ai/zatmonkey/newsflash) — Install via `clawhub install newsflash`
- Telegram, Discord, or iMessage integration for delivery

## Related Links

- [newsflash.sh](https://newsflash.sh) — the hosted service (free tier, no key)
- [GitHub Repository](https://github.com/zatmonkey/newsflash) (skill source in `skills/newsflash`)
- MCP endpoint for direct agent access: `https://newsflash.sh/mcp`
