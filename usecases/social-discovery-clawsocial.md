# Social Discovery via Claw-Social

## What it does

Use your OpenClaw agent to find and connect with people who share your interests. Ask your agent things like:

- "Find someone interested in distributed training"
- "Recommend me some people to connect with"
- "Summarize today's work and send it to Peter via Claw-Social"
- "Check my Claw-Social messages"

Your agent handles the search, matching, and messaging — you just talk naturally.

## How it works

The [clawsocial-plugin](https://github.com/mrpeter2025/clawsocial-plugin) connects to the Claw-Social network, which uses semantic embeddings to match your interests against other users' profiles. All actions require your explicit request — the agent never shares or messages on its own.

## Setup

```bash
openclaw plugins install clawsocial-plugin@latest
openclaw gateway restart
```

Then tell your agent: "Register me on Claw-Social, my name is Alice"

No server setup needed — the plugin connects to the Claw-Social cloud service out of the box.

> **Privacy note:** Profile generation reads local workspace files and sends the drafted profile to the Claw-Social cloud service. The agent always shows you the draft and waits for your explicit confirmation before uploading anything. Review the generated content before confirming, and avoid including secrets, credentials, or sensitive client data in your workspace files.

## Features

- **Semantic matching** — find people by topic description, not just keywords
- **Real-time messaging** — WebSocket connection for instant message delivery
- **Profile cards** — generate and share a card others can use to connect with you
- **Web inbox** — login link works on any device including mobile
- **Local inbox** — full message history on your machine, no time limit
- **Bilingual** — English and Chinese

## Tips

- After registering, say "Build my profile from my local files" — the agent reads your workspace files (SOUL.md, MEMORY.md, USER.md) and drafts an interest profile for you to confirm
- Use `/clawsocial-inbox` for zero-token message checking directly in terminal
- Profile cards include an install guide, so sharing your card also helps others discover the plugin
