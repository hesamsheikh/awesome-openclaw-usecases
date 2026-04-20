# YouTube Shorts: Script to Screen

End-to-end pipeline from text script to published YouTube Short — TTS voice, AI-generated visuals, karaoke subtitles, FFmpeg assembly, and automated upload.

## Pain Point

Creating a single YouTube Short involves writing a script, generating voice audio, creating or sourcing visuals, adding subtitles, assembling the video, and uploading it. Each step requires a different tool, and the manual handoff between them is where most creators lose time. A batch of 10 shorts can take an entire day.

## What It Does

- **Script ingestion** — Takes a text script from a Google Sheet content batch (with columns for TTS text, onscreen text, image prompts, and post copy) or from manual input
- **TTS voice generation** — Generates voice audio via HeyGen or similar TTS service, then extracts and speeds up to 1.2x for snappier delivery
- **AI visual generation** — Two-step process via RunningHub APIs:
  - Text-to-image: Generates a static 9:16 frame from a prompt (NanoBanana2 model, 4K resolution)
  - Image-to-video (Wan2.2): Animates the still image with gentle zoom/pan motion (90-250 seconds)
- **Karaoke subtitles** — Builds ASS subtitle files with per-character timing proportional to TTS text length, using `\kf` tags for word-level karaoke highlighting
- **FFmpeg assembly** — Combines all assets into a single postable video:
  - Loops the Wan2.2 animated clip to match audio duration
  - Burns in headline subtitle (top of screen, full duration)
  - Burns in karaoke subtitle (bottom, per-character timing)
  - Applies `-shortest` to trim to shortest stream
  - Adds `-movflags +faststart` for web-optimized playback
- **Markdown package** — Creates a `.md` file alongside the video with full specs, rendering details, and upload caption
- **Automated upload** — Posts the finished Short to YouTube via Playwright or the YouTube API

## Prompts

**Build a single Short:**
```text
Build a YouTube Short from script NP-225: generate the AI visual, add karaoke subtitles, assemble the video, and prepare it for upload.
```

**Batch render:**
```text
Render the next 3 clips from the content batch. For each one: generate visuals via RunningHub, build subtitles, assemble with FFmpeg, and create the markdown package.
```

**Full pipeline:**
```text
Take the next 5 scripts from the Google Sheet, render them into YouTube Shorts, and schedule them for upload with 2-hour gaps starting tomorrow at 12:00.
```

## Skills Needed

- **RunningHub API** — Text-to-image (`rhart-image` endpoint) and Wan2.2 image-to-video (`1950084449721606146` endpoint)
- **FFmpeg** — Video assembly, subtitle burning, audio processing
- **TTS service** — HeyGen or equivalent for voice generation
- **ASS subtitle generation** — Custom script for karaoke-style timing
- **YouTube upload** — Playwright or YouTube API for Shorts upload
- **Google Sheets API** — For reading content batch data (optional, can use manual input)

## Typical Timing

| Step | Duration |
|------|----------|
| TTS voice generation | 30-60s |
| Text-to-image (RunningHub) | 15-45s |
| Image-to-video (Wan2.2) | 90-250s |
| FFmpeg assembly | 5-10s |
| **Total per clip** | **2-5 minutes** |
| **3 clips sequential** | **6-15 minutes** |

## Key Gotchas

- **RunningHub image generation can exceed 5 minutes** — Use background processes for batch rendering and poll for completion
- **Wan2.2 video is only 5 seconds** — Must be looped in FFmpeg to match audio duration
- **ASS subtitle scaling** — Use `scale=1.5` filter for ASS subtitles on 712x1280 resolution, otherwise text is too small
- **Polling pattern** — RunningHub tasks need polling every 15 seconds; status goes `RUNNING` → `SUCCESS` or `FAIL`
- **Timeout management** — Use background processes for renders over 5 minutes; redirect stdout to a log file since Hermes swallows background process output
- **Partial assets** — If a render times out mid-pipeline, partial assets (audio, subtitles) will exist in the assets folder. The build script should skip already-existing assets on retry

## Related Links

- [RunningHub API](https://www.runninghub.ai/)
- [FFmpeg Documentation](https://ffmpeg.org/documentation.html)
- [ASS Subtitle Format](https://aegisub.org/docs/3.2/ASS_Tags/)
- [YouTube Shorts Best Practices](https://support.google.com/youtube/answer/10059040)
