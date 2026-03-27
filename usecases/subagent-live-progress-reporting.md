# Sub-Agent Live Progress Reporting

When you spawn sub-agents for autonomous tasks, they run silently and only announce when finished. This use case adds **live Telegram/Discord progress updates** throughout execution — so you see what your agent is doing in real time, not just when it's done.

## What It Does

- Sub-agents send you a message when they **start** a task
- They check in at each **major step** ("Searching for X...", "Writing file Y...")
- They report **completion** with a result summary and output file path
- They report **errors** immediately if something goes wrong

## Pain Point

Running autonomous agents without progress visibility feels like sending someone on an errand and hearing nothing for 10 minutes. Did it work? Is it stuck? Did it fail silently? Live reporting gives you confidence that your agent is actually doing something — and lets you catch problems early.

## Setup

### Step 1: Store your Chat ID in TOOLS.md

Find your Telegram chat ID (e.g., by messaging `@userinfobot`) and add it to your private `TOOLS.md`. This file should **never be committed to a public repo** — it's your personal config.

```markdown
## Telegram
- OWNER_CHAT_ID: 123456789
```

> **Why not hardcode it?** Your chat ID is personal. Storing it in `TOOLS.md` (private) instead of `HEARTBEAT.md` (shareable template) keeps your identity out of any code you share with others.

### Step 2: Add Progress Reporting to Every Sub-Agent Task

When spawning a sub-agent via `sessions_spawn`, include this block in the task description. Before spawning, read `OWNER_CHAT_ID` from your `TOOLS.md` and substitute the real value:

```
## Progress Reporting (mandatory)
Send live updates via the message tool:
- On start:    "🔄 [TASK-ID] gestartet: [what you're about to do]"
- Each step:   "⚙️ [TASK-ID] [what's happening right now]"
- On success:  "✅ [TASK-ID] fertig: [result summary + output file path]"
- On failure:  "❌ [TASK-ID] Fehler: [what went wrong]"

Use: message(action="send", channel="telegram", target="123456789", message="...")
```

### Step 3: Update HEARTBEAT.md to Always Include Reporting

Add the progress reporting block as a required section in your `HEARTBEAT.md` spawn instructions so it's never forgotten:

```markdown
## Sub-Agent Progress Reporting (PFLICHT / mandatory)

Every spawned sub-agent MUST include this in its task:

  message(action="send", channel="telegram", target="{{OWNER_CHAT_ID}}", message="...")

  🔄 on start | ⚙️ each major step | ✅ on done | ❌ on error

(Read OWNER_CHAT_ID from TOOLS.md and inject the real value before spawning)
```

## How It Looks in Practice

You spawn a sub-agent to research a topic. Within seconds, your phone gets:

```
🔄 [RES-005] gestartet: Recherchiere Polar API Dokumentation...
⚙️ [RES-005] 3 relevante Seiten gefunden, lese Authentifizierungs-Docs...
⚙️ [RES-005] Schreibe Zusammenfassung nach research/polar-api.md...
✅ [RES-005] fertig: Polar API unterstützt OAuth 2.0 + Webhooks → research/polar-api.md
```

No polling. No waiting. Just live updates straight to your phone.

## Key Insights

- **OWNER_CHAT_ID belongs in TOOLS.md**, not in any shared template. TOOLS.md is your private environment config — never commit it publicly.
- **Inject at spawn time**: your main session reads the chat ID from TOOLS.md and substitutes it into the task string before calling `sessions_spawn`. The template uses `{{OWNER_CHAT_ID}}` as a placeholder.
- **Emoji prefixes make scanning easy**: 🔄/⚙️/✅/❌ let you instantly parse a burst of messages without reading every word.
- **Works for any channel**: swap `channel="telegram"` for `channel="discord"` or `channel="slack"` — same pattern, different target.
- **Make it mandatory, not optional**: put it in HEARTBEAT.md as a required block so every sub-agent inherits it automatically without you having to remember.

## Related Use Cases

- [Goal-Driven Autonomous Tasks](overnight-mini-app-builder.md) — the autonomous workflow this reporting enhances
