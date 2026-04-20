# Automated Content Scheduling

JSON-based cron system that scans for new content, extracts captions, and schedules uploads at optimal engagement times across platforms.

## Pain Point

Managing a content queue across multiple platforms means tracking what's been posted, what's scheduled, and what's next. Spreadsheets break, reminders get missed, and posting at the wrong time kills engagement. Most creators either post inconsistently or waste hours each day managing their schedule manually.

## What It Does

- **Queue scanning** — Automatically discovers new rendered/postable videos by comparing the rendered clips directory against posted metadata files
- **Caption extraction** — Pulls upload captions from markdown packages that accompany each video (handles multiple caption heading formats: `## Upload Caption` and `## Caption`)
- **Optimal timing** — Schedules uploads at engagement-optimized times with configurable rules:
  - 3 posts per day at 17:30, 20:30, 23:30 local time
  - Minimum 3-hour gap between posts
  - No posts between 02:00-10:00 (low engagement window)
  - Optional daytime slots (11:30, 14:30) for variety
- **JSON cron jobs** — Each upload is a one-shot cron job with ISO timestamp scheduling, written to a central `jobs.json` file
- **Per-platform dedup** — Filters by both content ID and platform keyword to prevent scheduling the same video twice for the same platform (TikTok and YouTube jobs share the same content ID namespace)
- **Auto-completion** — One-shot jobs increment their `completed` counter after execution and stop recurring

## Prompts

**Schedule next batch:**
```text
Schedule the next 5 unscheduled TikTok videos with 3-hour gaps starting at 17:30
```

**Check queue status:**
```text
What videos are scheduled? What's been posted? What's still in the queue?
```

**Schedule with custom cadence:**
```text
Schedule all unscheduled content for YouTube Shorts. Post 2 per day at 12:00 and 18:00, skipping weekends.
```

**Full pipeline:**
```text
Check for new rendered clips, extract their captions, and schedule them across TikTok and YouTube with optimal timing. stagger platforms by 2 hours.
```

## Skills Needed

- **JSON cron system** — Read/write `jobs.json` for scheduling
- **File system monitoring** — Compare rendered clips vs posted metadata
- **Markdown parsing** — Extract captions from `.md` packages
- **Platform upload automation** — Playwright for TikTok, YouTube API/Playwright for Shorts

## Key Insights

- The queue state is split between a root-owned canonical file (read-only) and a hermes-owned working copy — always write to the writable copy
- Caption format varies by content batch range — always grep for both `## Upload Caption` and `## Caption` patterns
- At 3 posts/day, a queue of 14 videos covers ~4.5 days. When the queue drops below 3 days, flag that new content generation is needed
- One-shot jobs stay in `jobs.json` after completion with `completed` count incremented — cleanup is optional but helps readability
- Platform dedup is critical: a naive filter on content ID alone will match YouTube jobs when you're scheduling TikTok (and vice versa)

## Related Links

- [Cron scheduling concepts](https://en.wikipedia.org/wiki/Cron)
- [Social media optimal posting times research](https://sproutsocial.com/insights/best-times-to-post-on-social-media/)
