# Speaker-Labeled YouTube Transcripts

Ask your agent to summarize a YouTube video and get back who said what. Interviews, panels, and podcasts stop being a wall of unattributed text.

## Pain Point

Generic transcript tools collapse a multi-speaker video into one undifferentiated stream. When your agent summarizes an interview from that, attribution is lost or guessed: was that claim from the host or the guest? For quoting someone, building show notes, or feeding a debate into downstream analysis, a transcript without speaker labels is close to useless.

YouTube's own auto-captions have the same problem, plus no punctuation.

## What It Does

- Takes a YouTube, X, Instagram, or TikTok URL (up to 3 hours)
- Returns a diarized transcript in about 3 minutes: every segment attributed to a speaker, labels held consistent across the whole recording
- Your agent then summarizes, quotes, or pipes it into whatever comes next, with attribution intact
- Output formats: TXT, JSON, SRT, VTT

## Skills You Need

Install [youtube-transcript-speaker-diarization](https://clawhub.ai/patelnav/youtube-transcript-speaker-diarization) from ClawHub:

```bash
npx clawhub@latest install youtube-transcript-speaker-diarization
```

You need a [diarize.io](https://diarize.io) API key (create one at [diarize.io/settings/api-keys](https://diarize.io/settings/api-keys)). New accounts get 3 hours free, no credit card. Set it as `YOUTUBE_TRANSCRIPT_API_KEY` in your environment.

## How to Set It Up

One-shot:

```text
Get the transcript of https://www.youtube.com/watch?v=VIDEO_ID and tell me
what each speaker argued. Quote the strongest claim from each person.
```

As a pipeline step:

```text
Whenever I send you a YouTube link, fetch the speaker-labeled transcript,
then give me: a 5-bullet summary with names attached, the three most
quotable lines (with speaker and timestamp), and any factual claims worth
checking.
```

## Tips

- The JSON format includes per-segment timestamps, useful when you want the agent to link back to moments in the video
- SRT/VTT output drops straight into caption workflows
- Garry Tan documented this exact flow in [gbrain's content-media guide](https://github.com/garrytan/gbrain/blob/master/docs/guides/content-media.md): get the full diarized transcript first, then let the agent work on it
