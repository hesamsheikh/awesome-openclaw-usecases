# Voice-Activated Agent with Context

You're cooking dinner, driving, or walking the dog — and you need your agent to do something. "Hey Jarvis, email Rob about the budget." Your agent should know who Rob is, what budget you're talking about, and send the right email without you spelling everything out.

This use case turns OpenClaw into a voice-activated assistant that resolves commands against a knowledge graph of your contacts, projects, and recent conversations.

## What It Does

- Listens for a wake word ("Hey Jarvis", or whatever you configure)
- Transcribes your voice command locally
- Resolves entities from your personal knowledge graph ("Rob" → Rob Martinez, rob@vectorcare.com)
- Dispatches actions: email, text, reminder, search, calendar, notes
- Confirms what it did via your preferred channel (iMessage, Telegram, etc.)
- Speaker authorization ensures only approved voices trigger actions

## Pain Point

Voice assistants like Siri and Alexa are dumb. They don't know your contacts beyond your phone book. They can't resolve "the client" to a person, or "that budget thing" to a specific conversation. The missing piece is **context** — and that requires a knowledge graph built from your actual conversations.

## Skills You Need

- [Percept](https://github.com/GetPercept/percept) — voice capture + context intelligence (`pip install getpercept`)
- An audio source: [Omi pendant](https://www.omi.me/), Apple Watch, or laptop mic
- iMessage, Telegram, or Discord for confirmations
- Google Workspace (optional, for email/calendar via `gog` CLI)

## How to Set It Up

1. Install and start Percept:
```bash
pip install getpercept
percept init
percept serve --port 8900
```

2. Configure wake words in the Percept dashboard (default port 8960):
   - Navigate to Settings
   - Set wake words: `["hey jarvis"]` (or your preferred trigger)

3. Authorize speakers (security — only your voice triggers actions):
```bash
# Speak naturally for a few conversations so Percept learns your voice label
# Then authorize your speaker ID:
percept speakers authorize SPEAKER_0
```

4. Connect your audio source (Omi pendant, Watch, or mic) and start talking:
```
"Hey Jarvis, email Rob about the Q2 budget meeting next Tuesday"
"Hey Jarvis, remind me in 20 minutes to check the deploy"
"Hey Jarvis, what did Sarah say about the vendor contract?"
"Hey Jarvis, add a note — the client wants the proposal by March 5th"
```

5. Percept will:
   - Detect the wake word
   - Wait for the full command (with smart silence detection)
   - Resolve "Rob" → Rob Martinez from your knowledge graph
   - Parse intent (email, reminder, search, note)
   - Execute via OpenClaw and confirm via iMessage/Telegram

## Example Interaction

```
You: "Hey Jarvis, text the team that standup is moved to 2pm"

[Percept]
  → Wake word detected
  → Intent: text/message
  → Resolved: "the team" → VectorCare Standup group
  → Action: Send via iMessage to group

Agent: "✅ Sent to VectorCare Standup: 'Standup moved to 2pm today'"
```

```
You: "Hey Jarvis, what did we discuss with Priority Ambulance last week?"

[Percept]
  → Wake word detected
  → Intent: search
  → Entity: Priority Ambulance
  → Searching conversations from last 7 days...

Agent: "Last Tuesday you discussed their Georgia fleet expansion,
the FHIR integration timeline, and they asked about real-time
GPS tracking. Rob committed to sending a pricing proposal by Friday."
```

## Why This Works

The magic isn't the voice recognition — Whisper handles that. The magic is **entity resolution against your personal knowledge graph**. When you say "Rob," Percept's 5-tier resolution cascade checks exact matches, fuzzy matches, relationship graph context, recency, and semantic similarity to figure out which Rob you mean. That's what makes it feel like a real assistant instead of a glorified dictation tool.

## Security

- Speaker authorization: only approved voices trigger actions
- All processing is local — audio never leaves your machine
- Dangerous commands (rm, sudo, transfers) are blocked with safety checks
- Security events are logged for audit

## Related Links

- [Percept GitHub](https://github.com/GetPercept/percept)
- [Omi pendant](https://www.omi.me/)
- [Percept on PyPI](https://pypi.org/project/getpercept/)
- [OpenClaw Skills](https://github.com/openclaw/openclaw)
