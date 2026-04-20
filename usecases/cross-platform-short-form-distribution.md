# Cross-Platform Short-Form Distribution

Upload one video to TikTok, YouTube Shorts, and Instagram Reels in sequence with per-platform captions and staggered timing — all automated.

## Pain Point

Short-form creators need to post the same video to 3+ platforms, each with different caption styles, hashtag limits, and optimal posting windows. Doing this manually means logging into each platform, rewriting captions for each audience, and remembering the timing — repeated several times a day. It's a full-time job that eats into actual content creation time.

## What It Does

- **Single source distribution** — One video gets uploaded to TikTok, YouTube Shorts, and Instagram Reels from a single command
- **Per-platform caption generation** — Automatically adapts the caption for each platform's audience and format:
  - TikTok: casual tone, trending hashtags, 150-char limit
  - YouTube Shorts: descriptive with SEO keywords, #Shorts tag
  - Instagram Reels: aesthetic tone, hashtag clusters, CTA in caption
- **Staggered posting schedule** — Posts to each platform at different times (e.g., TikTok now, YouTube in 2 hours, Instagram in 4 hours) to maximize reach and avoid algorithm penalties for simultaneous cross-posting
- **Cron-based automation** — Entire distribution pipeline runs on a schedule via JSON cron jobs
- **Status tracking** — Per-platform posting metadata prevents double-posts and tracks what's been published where

## Prompts

**Distribute to all platforms:**
```text
Distribute this video to TikTok, YouTube Shorts, and Instagram Reels with platform-optimized captions. Post TikTok now, YouTube in 2 hours, Instagram in 4 hours.
```

**Custom schedule:**
```text
Schedule this video across all platforms. TikTok at 17:30, YouTube Shorts at 19:30, Instagram Reels at 21:30. Generate captions for each platform from the markdown package.
```

**Check distribution status:**
```text
Which platforms has video NP-215 been posted to? Schedule it for any remaining platforms.
```

## Skills Needed

- **Playwright** — For TikTok upload automation (cookies + headless browser)
- **YouTube OAuth2** — For YouTube Shorts upload via API or Playwright
- **Instagram automation** — Via Playwright or Meta API for Reels upload
- **JSON cron system** — For scheduling staggered posts across platforms
- **File system monitoring** — For detecting new rendered clips and tracking posted metadata

## Key Insights

- Staggering posts by 2-4 hours per platform avoids algorithm penalties that some platforms apply when the same video appears everywhere simultaneously
- Per-platform caption adaptation matters more than most creators think — a TikTok caption style actively hurts performance on YouTube
- The dedup system tracks by content ID + platform keyword (e.g., "NP-215" + "TikTok") so both TikTok and YouTube jobs coexist in the same queue without collisions
- One-shot cron jobs auto-complete after execution, keeping the queue clean

## Related Links

- [TikTok Studio](https://www.tiktok.com/tiktokstudio/upload)
- [YouTube Shorts](https://studio.youtube.com/)
- [Instagram Reels](https://www.instagram.com/reels/)
