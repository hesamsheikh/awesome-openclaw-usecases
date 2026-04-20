# Cross-Platform Short-Form Video Distribution

You've built a short-form video pipeline that produces TikTok-ready clips. But your audience is also on YouTube Shorts, Instagram Reels, and Facebook Reels. Uploading the same video to 4 platforms manually means logging into each one, copying captions, adjusting hashtags, and waiting for processing — a 20-minute task per video that kills the automation advantage.

## Pain Point

Short-form video content is platform-agnostic — a 9:16 vertical clip works on TikTok, YouTube Shorts, Instagram Reels, and Facebook Reels. But each platform has its own upload flow, caption limits, hashtag rules, and posting times. Cross-posting manually is tedious, and using a multi-platform scheduler adds cost and loses the ability to customize per-platform captions.

## What It Does

A single scheduled job uploads one video to multiple platforms in sequence, with per-platform caption customization:

- **Unified queue** — One directory of rendered clips, one scheduling system
- **Per-platform captions** — TikTok gets Thai + hashtags, YouTube gets English description + tags, Instagram gets a shorter caption with different hashtag mix
- **Sequential upload** — TikTok first (via Playwright), then YouTube Shorts (via API or Playwright), then Instagram Reels (via Meta Graph API or Playwright)
- **Status tracking** — JSON metadata per video per platform tracks upload status, video URL, and timestamp
- **Staggered timing** — Optional delays between platform uploads to avoid detection patterns

## Skills Needed

- Playwright browser automation (for TikTok and YouTube Studio)
- YouTube Data API v3 (optional, for YouTube Shorts via API)
- Meta Graph API (optional, for Instagram Reels via API)
- Cookie management for browser-based uploads
- JSON-based cron/scheduling system

## How to Set It Up

1. **Set up per-platform auth:**
   - TikTok: Export cookies from browser (Netscape → Playwright JSON)
   - YouTube: OAuth2 client credentials or browser cookies
   - Instagram: Meta Graph API token with `instagram_content_publish` permission

2. **Create a cross-platform upload script:**
```text
Create an upload script that:
1. Takes a video file path and a platform-agnostic content ID (e.g. NP-224)
2. Reads per-platform captions from a markdown package file
3. Uploads to TikTok via Playwright Direct
4. Uploads to YouTube Shorts via API or Playwright
5. Uploads to Instagram Reels via Meta Graph API
6. Writes metadata JSON for each successful upload
7. Reports any failures with error details
```

3. **Define caption templates per platform:**
```text
For each content piece, generate platform-specific captions:
- TikTok: Thai text + 5-8 hashtags, under 150 chars
- YouTube Shorts: English description + tags, SEO-optimized title
- Instagram Reels: Shorter hook + 10-15 hashtags, CTA to follow
Store these in the markdown package alongside the video
```

4. **Schedule via cron:**
```text
Schedule cross-platform uploads at optimal times per platform:
- TikTok: 17:30, 20:30, 23:30 local time
- YouTube Shorts: 14:00, 18:00 local time
- Instagram Reels: 12:00, 19:00 local time
Use the cron scheduler to queue jobs with per-platform timing
```

## Key Insights

- YouTube Shorts has a 60-second limit. TikTok allows up to 10 minutes but 15-60s performs best. Design your clips at 15-30s for maximum cross-platform compatibility.
- Instagram Reels requires a business/creator account for API access. Browser automation works for personal accounts.
- Hashtag behavior differs by platform: TikTok favors 3-5 niche hashtags, Instagram favors 10-15 mixed-size hashtags, YouTube uses tags (not hashtags) in the description.
- Upload one platform at a time and verify before moving to the next. A failure on one platform shouldn't block the others.
