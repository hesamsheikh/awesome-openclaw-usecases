# Multi-Source Tech News Digest

Automatically aggregate, score, and deliver tech news from 109+ sources across RSS, Twitter/X, GitHub releases, and web search — all managed through natural language.

## Pain Point

Staying updated across AI, open-source, and frontier tech requires checking dozens of RSS feeds, Twitter accounts, GitHub repos, and news sites daily. Manual curation is time-consuming, and most existing tools either lack quality filtering or require complex configuration.

## What It Does

A four-layer data pipeline that runs on a schedule:

1. **RSS Feeds** (46 sources) — OpenAI, Hacker News, MIT Tech Review, etc.
2. **Twitter/X KOLs** (44 accounts) — @karpathy, @sama, @VitalikButerin, etc.
3. **GitHub Releases** (19 repos) — vLLM, LangChain, Ollama, Dify, etc.
4. **Web Search** (4 topic searches) — via Brave Search API

All articles are merged, deduplicated by title similarity, and quality-scored (priority source +3, multi-source +5, recency +2, engagement +1). The final digest is delivered to Discord, email, or Telegram.

The framework is fully customizable — add your own RSS feeds, Twitter handles, GitHub repos, or search queries in 30 seconds.

## Prompts

**Install and set up daily digest:**
```text
Install tech-news-digest from ClawHub. Set up a daily tech digest at 9am to Discord #tech-news channel. Also send it to my email at myemail@example.com.
```

**Add custom sources:**
```text
Add these to my tech digest sources:
- RSS: https://my-company-blog.com/feed
- Twitter: @myFavResearcher
- GitHub: my-org/my-framework
```

**Generate on demand:**
```text
Generate a tech digest for the past 24 hours and send it here.
```

## Skills Needed

- [tech-news-digest](https://clawhub.ai/skills/tech-news-digest) — Install via `clawhub install tech-news-digest`
- [gog](https://clawhub.ai/skills/gog) (optional) — For email delivery via Gmail

## Environment Variables (Optional)

- `X_BEARER_TOKEN` — Twitter/X API bearer token for KOL monitoring
- `BRAVE_API_KEY` — Brave Search API key for web search layer
- `GITHUB_TOKEN` — GitHub token for higher API rate limits

## Related Links

- [GitHub Repository](https://github.com/draco-agent/tech-news-digest)
- [ClawHub Page](https://clawhub.ai/skills/tech-news-digest)
