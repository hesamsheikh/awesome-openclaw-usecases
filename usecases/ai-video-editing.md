# AI Video Editing via Chat

Editing videos usually means opening a timeline editor, dragging clips around, and clicking through menus. For repetitive edits — trimming intros, adding subtitles to a batch of clips, adjusting color on 10 videos — that manual loop eats hours.

This use case turns video editing into a conversation. Describe what you want changed, drop the file, and get the result back. No timeline, no GUI.

## What You Can Do

- Trim, cut, and merge clips by describing timestamps in plain language
- Add background music with automatic audio ducking
- Generate and burn subtitles from speech (50+ languages)
- Color grade footage ("make it warmer", "match the look of the first clip")
- Crop to vertical for TikTok/Reels/Shorts
- Batch process multiple files with the same edit

## Skills You Need

- [video-editor-ai](https://clawhub.ai/skills/video-editor-ai) — chat-based video editing with BGM, subtitles, and export
- [ai-subtitle-generator](https://clawhub.ai/skills/ai-subtitle-generator) — auto captions, subtitle burning, SRT export

## How to Set It Up

1. Install the skills:
```bash
clawhub install video-editor-ai
clawhub install ai-subtitle-generator
```

2. Drop a video file into chat and describe your edit:
```text
Trim this video from 0:15 to 1:30, add background music (something upbeat),
and burn subtitles in English.
```

3. For batch processing, describe the pattern:
```text
I have 5 clips in /videos/raw/. For each one:
- Crop to 9:16 vertical
- Add auto-generated captions at the bottom
- Export as mp4
```

The agent handles the API calls, polls for completion, and delivers the finished files back to chat.

## Tips

- Be specific about timestamps and output format ("export as mp4 at 1080p")
- For subtitle work, mention the source language if it's not English
- Color grading works best with reference descriptions ("warm sunset tones") rather than technical values
- Avoid uploading sensitive footage (faces, IDs, confidential screens) unless you've reviewed the provider's data retention and privacy policy
