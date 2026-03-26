# Multi-Source Tech News Digest

Automatically aggregate, score, and deliver tech news from 150+ sources across 6 data layers — all managed through natural language.

## Pain Point

Staying updated across AI, open-source, and frontier tech requires checking dozens of RSS feeds, Twitter accounts, GitHub repos, Reddit threads, and news sites daily. Manual curation is time-consuming, and most existing tools either lack quality filtering or require complex configuration.

## What It Does

A six-source pipeline that runs on a schedule (~30s):

1. **RSS Feeds** (62 sources) — OpenAI, Hacker News, MIT Tech Review, indie tech blogs, etc.
2. **Twitter/X KOLs** (48 accounts) — @karpathy, @sama, @VitalikButerin, etc. (dual backend: official X API v2 + twitterapi.io)
3. **GitHub Releases** (28 repos) — vLLM, LangChain, Ollama, Foundry, etc.
4. **GitHub Trending** — Daily trending repos via Search API across 4 topics
5. **Reddit** (13 subreddits) — r/MachineLearning, r/LocalLLaMA, r/ChatGPT, etc.
6. **Web Search** (Tavily or Brave) — 4 topic searches with API key rotation

All articles are merged, URL-deduplicated, and quality-scored (priority source +3, multi-source cross-ref +5, recency +2, engagement +1, Reddit score bonus +1/+3/+5). High-scoring articles can optionally be enriched with full text via [Cloudflare Markdown for Agents](https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/).

Output sections: 🧠 LLM, 🤖 AI Agent, 🔬 Frontier Tech, 📢 KOL Updates, 📦 GitHub Releases, 🐙 GitHub Trending, 📝 Blog Picks — delivered to Discord, email (with PDF attachment), or Telegram.

The framework is fully customizable — add your own RSS feeds, Twitter handles, GitHub repos, subreddits, or search queries in seconds.

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
- Reddit: r/YourSubreddit
```

**Generate on demand:**
```text
Generate a tech digest for the past 24 hours and send it here.
```

**Weekly digest with enrichment:**
```text
Generate a weekly tech digest with full-text article enrichment enabled.
```

## Skills Needed

- [tech-news-digest](https://clawhub.ai/skills/tech-news-digest) — Install via `clawhub install tech-news-digest`

## Environment Variables (Optional)

All variables are optional — the pipeline works out of the box with whatever sources are available.

- `TWITTER_API_BACKEND` — Backend selection: `auto` (default), `official` (X API v2), or `twitterapiio`
- `X_BEARER_TOKEN` — Twitter/X API v2 bearer token (required for `official` backend)
- `TWITTERAPI_IO_KEY` — twitterapi.io API key (required for `twitterapiio` backend)
- `BRAVE_API_KEY` / `BRAVE_API_KEYS` — Brave Search API key(s); use `BRAVE_API_KEYS` (comma-separated) for automatic rotation, or `BRAVE_API_KEY` for a single key
- `TAVILY_API_KEY` — Tavily Search API key (preferred over Brave when available)
- `WEB_SEARCH_BACKEND` — `auto` (default) / `brave` / `tavily`
- `GITHUB_TOKEN` — GitHub token for higher API rate limits

## Customization

Works out of the box with 150+ sources. Override defaults by placing config overlays in your workspace:

```bash
cp config/defaults/sources.json workspace/config/tech-news-digest-sources.json
```

Your overlay **merges** with defaults — only include what you want to change:
- Match an `id` to override or disable (`"enabled": false`) a built-in source
- Use a new `id` to add your own sources

## Output Formats

- **Discord** — Bullet list with emoji headers, link suppression, mobile-optimized
- **Email** — HTML body with PDF attachment (Chinese typography via Noto Sans CJK)
- **PDF** — Styled A4 with page headers/footers, blue accent theme

## Related Links

- [GitHub Repository](https://github.com/draco-agent/tech-news-digest)
- [ClawHub Page](https://clawhub.ai/skills/tech-news-digest)
