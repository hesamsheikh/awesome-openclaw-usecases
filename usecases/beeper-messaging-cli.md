# Beeper Messaging CLI

Your AI agent can't read your messages. If someone texts you a question, you copy it into OpenClaw, get an answer, then paste it back. If you need to find something someone said last week across WhatsApp, iMessage, and Signal, you're searching three apps manually.

Roadrunner (`rr`) gives OpenClaw direct access to all your messaging apps through Beeper Desktop — one CLI for iMessage, WhatsApp, Signal, Slack, and more.

## What It Does

- **Search across all chats**: Find messages across every messaging app in one query
- **Read and send messages**: Read conversations, send replies, react, and edit — all from your agent
- **Unread summaries**: Get a roll-up of unread chats across all accounts
- **Live events**: Stream new messages in real-time via WebSocket
- **Reminders**: Set and clear chat reminders
- **Contacts**: Search and resolve contacts across accounts
- **Attachments**: Download, upload, and stream media

The skill runs in agent-safe mode by default (`--agent` flag), which forces JSON output, read-only access, and requires explicit command allowlisting before any writes.

## Skills You Need

[roadrunner](https://clawhub.ai/johntheyoung/roadrunner) — installs via ClawHub. Requires [Beeper Desktop](https://www.beeper.com/) v4.1.169+ running locally.

## How to Set It Up

1. Install the skill from ClawHub, or manually:
```bash
brew install johntheyoung/tap/roadrunner
```

2. Enable the Beeper Desktop API: **Settings > Developers > Toggle Beeper Desktop API**

3. Create an API token and configure auth:
```bash
rr auth set --stdin
rr doctor
```

4. Prompt your OpenClaw:

**Morning unread summary:**
```text
Every morning at 8am, use rr to check my unread messages across all accounts.
Summarize what I missed overnight, grouped by chat. Flag anything that looks urgent.
```

**Search and reply assistant:**
```text
When I ask you to find a message, use rr to search across all my chats.
When I ask you to reply to someone, confirm the chat and message text with me before sending.
```

**Chat monitor:**
```text
Monitor my work Slack channels using rr events. If someone mentions my name or
asks a question I can answer, draft a response and ask me if I want to send it.
```

## Key Safety Features

- **Read-only by default** — writes require explicit `--enable-commands` allowlisting
- **No credential exposure** — auth tokens stay local, never passed through chat
- **Envelope errors** — structured error responses with hints for safe retries
- **Stdin for message text** — avoids shell interpolation issues with special characters

## Related Links

- [GitHub: johntheyoung/roadrunner](https://github.com/johntheyoung/roadrunner)
- [ClawHub Skill](https://clawhub.ai/johntheyoung/roadrunner)
- [Beeper Desktop](https://www.beeper.com/)
