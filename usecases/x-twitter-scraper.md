# X/Twitter Data Extraction & Automation

Building X/Twitter integrations usually means wrestling with API rate limits, pagination, authentication, and data normalization. You end up writing the same boilerplate for every project — fetching tweets, looking up users, extracting followers, tracking engagement.

With the `x-twitter-scraper` skill, AI coding agents can do all of this out of the box. 40+ tools covering tweet search, user lookup, follower/following extraction, engagement metrics, giveaway draws, trending topics, write actions (post, reply, retweet, like), and Telegram bot integrations.

## Pain Point

Every X/Twitter integration project starts from scratch: pagination logic, rate limit handling, data formatting. Existing libraries are either deprecated, paid, or incomplete.

## What It Does

Gives your AI coding agent a complete X/Twitter toolkit:

- **Read**: Search tweets, get user profiles, extract followers/following, fetch replies, quotes, retweets, lists, likes, bookmarks, communities, spaces
- **Write**: Post tweets, reply, retweet, like, unlike, follow, unfollow, block, mute, create lists, send DMs
- **Analyze**: Engagement metrics, follower overlap, audience analysis, trending topics
- **Automate**: Giveaway draws with filters, scheduled extractions, webhook delivery, Telegram notifications
- **Export**: JSON and CSV export for all extracted data

## Skills Needed

Install the x-twitter-scraper skill:
```
clawhub install x-twitter-scraper
```

## Prompts

Here are some example prompts:

- "Search for tweets about 'AI agents' from the last 24 hours and export them as CSV"
- "Get the follower list of @openai and find accounts that also follow @anthropic"
- "Run a giveaway draw from the replies to my latest tweet, excluding accounts with less than 100 followers"
- "Monitor trending topics in the US and send me a Telegram summary every 6 hours"
- "Extract all engagement metrics for my last 50 tweets and identify my best performing content"

## Related Links

- [x-twitter-scraper on GitHub](https://github.com/Xquik-dev/x-twitter-scraper)
- [ClawhubSkills listing](https://clawhub.com/skills/x-twitter-scraper)
- Works with Claude Code, Cursor, Codex, Copilot, Windsurf & 40+ agents
