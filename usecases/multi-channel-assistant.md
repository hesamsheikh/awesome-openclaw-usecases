# Multi-Channel Personal Assistant

Context-switching between apps to manage tasks, schedule events, send messages, and track work is exhausting. You want one interface that routes to all your tools.

This workflow consolidates everything into a single AI assistant:

• Telegram as primary interface with topic-based routing (different topics for video ideas, CRM, earnings, config, etc.)
• Slack integration for team collaboration (task assignment, knowledge base saves, video idea triggers)
• Google Workspace: create calendar events, manage email, upload to Drive — all from chat
• Todoist for quick task capture
• Asana for project management
• Automated reminders: trash day, weekly company letter, etc.

## Skills you Need

- `gog` CLI (Google Workspace)
- Slack integration (bot + user tokens)
- Todoist API or skill
- Asana API or skill
- Telegram channel with multiple topics configured

## How to Set it Up

1. Set up Telegram topics for different contexts:
   - `config` — bot settings and debugging
   - `updates` — status and notifications
   - `video-ideas` — content pipeline
   - `personal-crm` — contact management
   - `earnings` — financial tracking
   - `knowledge-base` — RAG ingestion and queries

2. Connect all your tools via OpenClaw config:
   - Google OAuth (Gmail, Calendar, Drive)
   - Slack (app + user tokens)
   - Todoist API token
   - Asana API token

3. Prompt OpenClaw:
```text
You are my multi-channel assistant. Route requests based on context:

Telegram topics:
- "config" → system settings, debugging
- "updates" → daily summaries, reminders, calendar
- "video-ideas" → content pipeline and research
- "personal-crm" → contact queries and meeting prep
- "earnings" → financial tracking
- "knowledge-base" → save and search content

When I ask you to:
- "Add [task] to my todo" → use Todoist
- "Create a card for [topic]" → use Asana Video Pipeline project
- "Schedule [event]" → use gog calendar
- "Email [person] about [topic]" → draft email via gog gmail
- "Upload [file] to Drive" → use gog drive

Set up automated reminders:
- Monday 6 PM: "🗑️ Trash day tomorrow"
- Friday 3 PM: "✍️ Time to write the weekly company update"
```

4. Test each integration individually, then test cross-workflow interactions (e.g., saving a Slack link to knowledge base, then using it in a video research card).
