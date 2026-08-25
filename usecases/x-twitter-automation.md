# X/Twitter Automation from Chat

Full X/Twitter automation through natural language: post tweets, reply, like,
retweet, follow, DM, search, extract data, run giveaways, and monitor accounts
from your OpenClaw chat.

## Pain Point

Managing an X/Twitter presence requires jumping between the app, third-party
dashboards, and analytics tools. Running giveaways means manual winner picking.
Extracting followers, likers, or retweeters requires scraping scripts. There is
no single interface that lets you do all of this conversationally.

## What It Does

TweetClaw is an OpenClaw plugin that connects your agent to the X/Twitter API.
You interact entirely through chat:

- **Post & engage** — Compose tweets, reply to threads, like, retweet, follow,
  unfollow, and send DMs
- **Search & extract** — Search tweets and users. Extract followers, likers,
  retweeters, quote tweeters, and list members
- **Giveaways** — Pick random winners from tweet engagements with configurable
  follower, account age, and keyword filters
- **Monitors** — Watch accounts for new tweets or follower changes

Live actions use the Xquik API. TweetClaw keeps browser cookies out of the
agent and stores its API key in OpenClaw configuration. Review the plugin
source and requested permissions before installation.

## Setup

Install TweetClaw from its verified ClawHub publisher:

```bash
openclaw plugins install clawhub:@xquik/tweetclaw
```

Use the explicit npm source only when you need the npm fallback:

```bash
openclaw plugins install npm:@xquik/tweetclaw
```

Create an API key in the [Xquik dashboard](https://dashboard.xquik.com/). Keep
it out of chat and shell history. Export it in a secure shell session, then
store it through OpenClaw:

```bash
openclaw config set plugins.entries.tweetclaw.config.apiKey "$XQUIK_API_KEY"
```

Check your tool allowlist before changing it:

```bash
openclaw config get tools.alsoAllow
```

If it is unset, add both TweetClaw tools. Otherwise, append both names without
removing existing entries:

```bash
openclaw config set tools.alsoAllow '["explore", "tweetclaw"]'
openclaw plugins inspect tweetclaw --runtime --json
```

`explore` searches the local route catalog without a network call. Private,
paid, recurring, extraction, and account-changing calls require one-time
approval. Review the exact account, request, and effect before approval.

## Prompts

**Find the current route before a live call:**

```text
Search the TweetClaw catalog for "search tweets by query".
Do not run a live call yet.
```

**Post a tweet:**

```text
Draft this post: "Just shipped a new feature — try it out!"
Show the exact connected X account and final text.
Ask for one-time approval before publishing.
```

**Run a giveaway:**

```text
Pick 3 random winners from the retweeters of this tweet:
https://x.com/username/status/123456789
Exclude accounts with fewer than 50 followers.
```

**Extract data:**

```text
Extract all users who liked this tweet and export as CSV: https://x.com/username/status/123456789
```

**Monitor an account:**

```text
Monitor @elonmusk and notify me whenever he posts a new tweet.
```

## Skills Needed

- [@xquik/tweetclaw](https://www.npmjs.com/package/@xquik/tweetclaw) — Install
  from ClawHub with `openclaw plugins install clawhub:@xquik/tweetclaw`.

## Related Links

- [GitHub Repository](https://github.com/Xquik-dev/tweetclaw)
- [npm Package](https://www.npmjs.com/package/@xquik/tweetclaw)
- [OpenClaw Setup Guide](https://github.com/Xquik-dev/tweetclaw/blob/master/docs/openclaw-setup.md)
