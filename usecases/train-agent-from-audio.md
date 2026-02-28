# Train Your Agent on Any Subject

You want your AI agent to understand a topic deeply — not from a quick web search, but from the same lectures, podcasts, and tutorials you'd watch yourself. But feeding hours of video transcripts into a chat window doesn't work. You need the knowledge structured, searchable, and connected.

This use case lets you play any audio content (YouTube lectures, podcasts, online courses, earnings calls) and have your OpenClaw agent build a searchable knowledge graph from what it hears.

## What It Does

- Captures audio from any browser tab using a Chrome extension (CDP-based)
- Transcribes in real-time using local Whisper — no cloud, no API keys
- Extracts entities (people, concepts, organizations) and maps relationships
- Builds a searchable knowledge base with hybrid keyword + semantic search
- Your agent can then answer questions about the material with full context

## Pain Point

AI agents are great at reasoning but terrible at **domain knowledge you haven't explicitly given them**. You can't paste 40 hours of lecture content into a prompt. But you can let your agent listen to the same material you would, and build structured understanding over time.

## Skills You Need

- [Percept](https://github.com/GetPercept/percept) — ambient audio intelligence (`pip install getpercept`)
- Chrome browser (for the tab capture extension)
- No API keys required — everything runs locally

## How to Set It Up

1. Install Percept and start the receiver:
```bash
pip install getpercept
percept init
percept serve --port 8900
```

2. Load the browser capture extension:
   - Open `chrome://extensions` → Enable Developer Mode
   - Click "Load unpacked" → select `percept/src/browser_capture/extension/`

3. Open any audio/video content in Chrome:
   - YouTube lecture, podcast, online course, earnings call, webinar
   - Click the Percept extension icon → "Start Capturing"

4. Let it play. Percept automatically:
   - Captures tab audio as PCM16
   - Transcribes via local Whisper
   - Extracts entities and concepts
   - Indexes into the vector store for semantic search

5. When done, click "Stop Capturing" (or just close the tab)

6. Query your new knowledge:
```bash
percept search "transformer architecture attention mechanism"
percept search "what did the professor say about backpropagation"
percept entities list --type concept
```

## Example Workflow

**Learning about distributed systems:**
```bash
# 1. Play MIT 6.824 lectures in Chrome
# 2. Click Percept extension → Start Capturing
# 3. Let 3 lectures play while you do other work
# 4. Query later:

$ percept search "Raft consensus protocol"
[Conv 2026-02-28_10-15] "...Raft solves the consensus problem by electing
a leader. The leader accepts log entries from clients and replicates them
to other servers..."

$ percept search "difference between Paxos and Raft"
[Conv 2026-02-28_11-30] "...Raft was designed to be more understandable
than Paxos. The key difference is Raft uses a stronger form of leadership..."
```

**Research for a presentation:**
```bash
# Play 5 YouTube videos about the topic
# Then ask your agent (via OpenClaw) to synthesize:
"Based on everything Percept captured today about AI in healthcare,
 give me the 5 key trends and who's driving each one."
```

## Why This Works

Your agent isn't just getting transcripts — it's building **structured understanding**. Entity extraction identifies key concepts and people. The knowledge graph connects them. Semantic search means you can query by meaning, not just keywords. After processing a few lectures, your agent genuinely understands the domain well enough to discuss it intelligently.

## Related Links

- [Percept GitHub](https://github.com/GetPercept/percept)
- [Percept Browser Capture Extension](https://github.com/GetPercept/percept/tree/main/src/browser_capture)
- [Percept on PyPI](https://pypi.org/project/getpercept/)
