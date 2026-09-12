# YouTube Channel Research Assistant

Pull everything a specific creator has ever said about a topic — across their
entire back catalog, not just their latest upload — and turn it into a
research brief with sources.

## Pain Point

YouTube's own search only really surfaces a channel's most recent or most
popular videos on a topic. If a creator has covered something across dozens
of videos over several years, there's no easy way to find every mention, pull
the actual spoken content, and compare what they said in 2021 versus what
they say now. Doing this by hand means opening video after video and
scrubbing through transcripts manually.

## What It Does

- Searches *within* one channel's uploads for a topic (not a global YouTube
  search) and paginates through every match
- Fetches the full transcript for each matching video
- Synthesizes a research brief: what the creator has said, how their view has
  changed over time, direct quotes with video titles/links as sources

## Skills You Need

Install the [youtube-transcript](https://clawhub.ai/tubeagentkit/youtube-transcript)
skill.

```text
"Install the youtube-transcript skill and set it up for me"
```
or
```bash
npx clawhub@latest install tubeagentkit/youtube-transcript
```

The agent handles account creation and API key setup for you — 100 free
credits on signup, no card required.

## How to Set It Up

Prompt your agent:

```text
Search @channelhandle for every video mentioning "topic X". Paginate through
all results using the continuation token until there are no more pages.

For each matching video:
1. Fetch the transcript
2. Pull out what they specifically said about "topic X" (quote it)
3. Note the video title, upload context, and link

Then write a research brief:
- How has their view on "topic X" evolved across these videos?
- Where do they contradict themselves or change their mind?
- What's their most recent/current take?

Cite every claim with the source video.
```

Or point it at a whole playlist/course instead of a channel search:

```text
Go through every video in this playlist: <playlist URL>.
Fetch each transcript and write structured notes per video, then a summary
that ties the whole playlist together as a study guide.
```

## Tips

- `search_channel_videos` and `list_channel_videos`/`list_playlist_videos`
  are metered per page (1 credit), not per video inside the page — cheap
  even across a long back catalog
- `get_channel_latest_videos` / channel resolution is free (0 credits) if you
  just need to confirm you have the right channel before searching it
- Ask for a "changed their mind" or "consistency" framing specifically — it's
  a good way to surface contradictions across years of content that a single
  video summary would never show
