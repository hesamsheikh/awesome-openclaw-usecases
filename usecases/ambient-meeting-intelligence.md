# Ambient Meeting Intelligence

You're in back-to-back meetings all day. By the third call, you've already forgotten what was promised in the first one. You take notes sometimes, but they're scattered across docs, sticky notes, and your unreliable memory. Worse — you walk into meetings with no context on what you last discussed with each person.

This use case turns your OpenClaw agent into an always-listening meeting companion that captures conversations, extracts commitments, builds a knowledge graph of people and topics, and generates pre-meeting briefings before your next call.

## What It Does

- Wears an [Omi](https://www.omi.me/) pendant (or any audio source) that streams ambient audio to your agent
- Automatically transcribes conversations using local Whisper (zero cloud dependency)
- Extracts entities (people, companies, projects) and maps relationships between them
- Tracks commitments and promises ("I'll send the docs by Friday") with deadline detection
- Before your next meeting, generates a briefing: what you last discussed with each attendee, open commitments, recurring topics
- Searchable knowledge base across all conversations via CLI or MCP

## Pain Point

Meeting notes are a solved problem — if you remember to take them. The real gap is **ambient capture** (you shouldn't have to do anything) and **cross-meeting context** (what did Rob say about the budget across the last 4 meetings?). No tool connects the dots between conversations over time.

## Skills You Need

- [Percept](https://github.com/GetPercept/percept) — the ambient intelligence layer (`pip install getpercept`)
- An audio source: [Omi pendant](https://www.omi.me/), Apple Watch, browser extension, or just your laptop mic
- iMessage, Telegram, or Discord for receiving briefings and summaries

## How to Set It Up

1. Install Percept:
```bash
pip install getpercept
percept init
```

2. Configure your audio source. For Omi pendant:
```bash
# Set your webhook URL in the Omi app
# Percept receives audio at /webhook/transcript
percept serve --port 8900
```

For browser audio (meetings on Zoom/Meet/Teams web):
```bash
# Load the Chrome extension from percept/src/browser_capture/extension
# Click "Start Capturing" on any meeting tab
```

3. Percept automatically:
   - Transcribes audio locally (faster-whisper)
   - Extracts entities and relationships
   - Detects commitments with deadlines
   - Generates conversation summaries
   - Indexes everything for semantic search

4. Before a meeting, get a briefing:
```bash
percept briefing                    # next meeting from your calendar
percept briefing --person "Rob"     # everything about Rob
```

5. Search across all conversations:
```bash
percept search "budget concerns"           # hybrid keyword + semantic search
percept search --speaker "David" "FHIR"    # what did David say about FHIR?
percept commitments list                    # all open commitments
percept commitments overdue                 # what's past due?
```

6. For Claude Desktop users, Percept includes an MCP server:
```bash
percept mcp  # starts MCP server for Claude Desktop integration
```

## Example Output

**Pre-meeting briefing:**
```
## Briefing: VectorCare Standup (11:30 AM)

### Rob Martinez
Last spoke: Feb 25 (standup)
Recent topics: FHIR integration, ambulance scheduling API, Q2 roadmap
Open commitments:
  - "I'll send the updated API docs by Friday" (Feb 24, OVERDUE)
Key context: Mentioned budget concerns 3x this month
```

**Commitment tracking:**
```
$ percept commitments overdue
⚠️  "Send API docs to team" — Rob, Feb 24 (3 days overdue)
⚠️  "Review the vendor proposal" — You, Feb 25 (2 days overdue)
```

## Why This Works

The key insight is **zero-effort capture**. You don't open an app, you don't press record, you don't take notes. The pendant listens, the agent processes, and the knowledge graph grows. After a month, your agent knows your professional network better than you do.

## Related Links

- [Percept GitHub](https://github.com/GetPercept/percept)
- [Percept on PyPI](https://pypi.org/project/getpercept/)
- [Omi pendant](https://www.omi.me/)
- [Percept MCP for Claude Desktop](https://github.com/GetPercept/percept#mcp-server)
