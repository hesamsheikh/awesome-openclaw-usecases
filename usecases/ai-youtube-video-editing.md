# AI YouTube Video Editing with Tubeify

## Pain Point
Solo YouTube creators spend hours manually scrubbing through raw recordings to cut dead air, filler words, and long pauses before uploading. This is tedious, repetitive work that an AI agent can fully automate.

## What It Does
Use OpenClaw with the Tubeify skill to submit a raw video URL and receive a polished, trimmed video back in minutes — no manual editing, no NLE software required.

## Prompts
```text
Edit my latest recording at [VIDEO_URL]. Remove all pauses longer than 0.5s and filler words. Keep speed at 1.0x.
```

## Skills Needed
- [`tubeify`](https://clawhub.ai/esokullu/tubeify) — AI video editor for YouTube via API

## Workflow
1. Agent authenticates to Tubeify with wallet address
2. Submits raw video URL with processing options (pause removal, filler removal, speed)
3. Polls status endpoint until processing is complete
4. Returns download link for the cleaned video

## Related Links
- [Tubeify](https://tubeify.xyz)
- [ClawHub skill](https://clawhub.ai/esokullu/tubeify)
- API: `POST https://tubeify.xyz/process.php`
