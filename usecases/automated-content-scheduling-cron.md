# Automated Content Scheduling with Cron

You have a content pipeline that produces videos, scripts, and social media posts. But someone still has to manually decide when to post, copy captions, and hit publish. This use case automates the scheduling layer — the agent reads from a content queue, extracts captions, and schedules uploads at optimal times across platforms.

## Pain Point

Content creation is automated, but content publishing is still manual. You need to:
- Track which clips are ready vs. already posted
- Post at optimal times (platform-specific engagement peaks)
- Maintain a posting cadence (e.g. 3 TikTok posts/day)
- Avoid gaps or pile-ups in the schedule
- Handle failures gracefully (re-queue, skip, alert)

Doing this by hand with a spreadsheet or mental checklist doesn't scale past a handful of posts per week.

## What It Does

A JSON-based cron system manages the entire posting schedule:

- **Content inventory scan** — Automatically detects new rendered clips by comparing the rendered output directory against posted metadata files
- **Caption extraction** — Reads per-video captions from markdown package files (different heading formats for different content ranges)
- **Smart scheduling** — Spaces uploads at optimal intervals (e.g. 3+ hours apart, avoiding 02:00-10:00 low-engagement window)
- **Platform-aware naming** — TikTok and YouTube jobs coexist in the same queue with distinct names (`"TikTok upload NP-224"` vs `"YouTube upload NP-224"`) to prevent dedup collisions
- **One-shot execution** — Each scheduled job runs once and completes. No recurring job management needed.
- **State tracking** — Posted video metadata (URL, timestamp, status) is written to JSON files after successful upload

## Skills Needed

- JSON-based cron scheduler (writable jobs file)
- File system scanning for content inventory
- Markdown parsing for caption extraction
- Platform-specific upload scripts (TikTok Playwright, YouTube API, etc.)

## How to Set It Up

1. **Set up your content directories:**
```text
Create the directory structure:
  rendered_clips/     — Final video files ready for upload
  posted_videos/      — Metadata JSON for successfully posted videos
  cron_jobs.json      — Scheduling queue
```

2. **Write the scheduling prompt:**
```text
Scan the rendered_clips directory for videos that don't have corresponding
metadata in posted_videos/. For each unposted video:

1. Read the markdown package to extract the caption
2. Calculate the next optimal posting time (3+ hours after the last scheduled
   post, within 11:00-23:00 window, alternating slots)
3. Create a one-shot cron job with:
   - Platform-specific name (e.g. "TikTok upload NP-225")
   - Upload command with video path and caption
   - Scheduled run_at time
4. Write the job to the cron jobs file
5. Verify no scheduling conflicts exist
```

3. **Run on a schedule:**
```text
Run the scheduling check daily. It should:
1. Check what's been posted (read metadata files)
2. Check what's already scheduled (read jobs file, filter by platform keyword)
3. Identify the gap (new clips minus posted minus scheduled)
4. Fill the schedule up to 3 days ahead
5. Report the schedule summary
```

## Key Insights

- **Dedup by platform keyword, not just content ID.** A TikTok upload and YouTube upload of the same video are separate jobs. Filtering by content ID alone will skip the second platform.
- **State files may be root-owned.** If you can't write to the canonical state file, write to an alternate location and establish it as the authoritative copy.
- **Caption formats change over time.** Older content may use `## Upload Caption` while newer uses `## Caption`. Always grep and verify before parsing.
- **Queue exhaustion is a planning signal, not an error.** When all rendered clips are scheduled, flag that new content needs to be generated. Calculate the runway (posts remaining × posting frequency) and alert before the queue runs dry.
