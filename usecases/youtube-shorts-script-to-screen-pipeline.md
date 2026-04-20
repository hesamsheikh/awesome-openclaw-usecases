# YouTube Shorts Pipeline: Script to Screen in 5 Minutes

Producing a YouTube Short typically means writing a script, recording audio, finding or creating visuals, editing them together with subtitles, and uploading. Each step is a separate tool and a separate context switch. This pipeline chains them all together: text script in, published Short out.

## Pain Point

YouTube Shorts demand high upload frequency to grow. But producing even a 30-second video involves: writing a hook, generating voiceover (TTS), creating or sourcing visuals, burning in subtitles, and exporting in the right format. Most creators do this in 3-4 different apps. The result is a bottleneck — you can only produce as fast as your slowest manual step.

## What It Does

An end-to-end pipeline that takes a text script and produces a YouTube Short:

- **Script to voice** — TTS generates a voiceover MP3 from the script text (Thai or English)
- **Voice to subtitles** — ASS karaoke subtitles are generated with per-character timing proportional to text length
- **Text to image** — RunningHub's text-to-image API generates a styled still frame matching the video's topic
- **Image to video** — RunningHub's Wan2.2 model animates the still into a gentle zoom/pan video loop
- **Assembly** — FFmpeg composites the animated video, 1.2x-speed audio, headline subtitle, and karaoke subtitle into a final MP4
- **Upload** — Playwright automation uploads to YouTube Shorts (or TikTok) with SEO-optimized metadata

## Skills Needed

- RunningHub API (text-to-image + Wan2.2 image-to-video)
- FFmpeg for video assembly
- TTS/voice generation (HeyGen, ElevenLabs, or similar)
- Playwright for YouTube Studio upload
- Google Sheets or markdown files for content data (scripts, captions, prompts)

## How to Set It Up

1. **Set up your content data source:**
```text
Use a Google Sheet or local markdown files as the content database.
Each row needs: content ID, TTS script, on-screen text, image prompt,
post caption, and hashtags. The Google Sheets API or a CSV export
feeds the pipeline.
```

2. **Write the build script:**
```text
Create a Python script that takes a content ID and:
1. Fetches the content data (script, prompts, caption) from the sheet
2. Extracts and speeds up the voice audio (1.2x via ffmpeg atempo)
3. Generates ASS subtitle files (headline + karaoke)
4. Calls RunningHub text-to-image with the image prompt (9:16, 2k)
5. Uploads the image to RunningHub
6. Calls RunningHub Wan2.2 image-to-video (gentle zoom, 720x1280, 5s)
7. Polls for completion (90-250 seconds typical)
8. Assembles with FFmpeg: loop video + audio + burn subtitles
9. Creates a markdown package with specs and upload caption
10. Verifies output with ffprobe
```

3. **Batch render:**
```text
Render multiple clips in sequence:
  python3 build_script.py NP-225
  python3 build_script.py NP-226
  python3 build_script.py NP-227

Each takes 2-5 minutes. Run in background for longer batches.
```

4. **Schedule uploads:**
```text
After rendering, schedule YouTube Shorts uploads via cron at optimal times.
Include the video title, description, and tags from the content data.
YouTube Shorts tags go in the description (not hashtags).
```

## Key Insights

- **1.2x audio speed is the sweet spot.** TikTok and Shorts audiences expect slightly faster pacing. It also shortens the video, which boosts completion rate.
- **RunningHub image generation can exceed 5 minutes.** The text-to-image step is the longest pole. Use a 600-second timeout and poll every 15 seconds. If it times out locally, the task continues server-side — query by task ID later.
- **ASS karaoke subtitles with `\kf` tags** give per-word timing (best quality). Basic ASS gives phrase-level (acceptable fallback). The timing should be proportional to the TTS text length, not hardcoded.
- **Loop the Wan2.2 video to match audio length.** The generated clip is typically 5 seconds. FFmpeg's `-stream_loop -1` with `-shortest` handles this.
- **Content IDs are your dedup key.** Use them consistently across rendering, scheduling, and posting to prevent duplicate uploads and track pipeline status.
