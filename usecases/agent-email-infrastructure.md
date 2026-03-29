# Agent Email Infrastructure

Give your OpenClaw agent its own email address — no human signup, no API keys, no dashboard.

## The Problem

AI agents need to send and receive email for tasks like outreach, notifications, account verification, and communication. Traditional email providers require human signup flows, API key management, and dashboard configuration — none of which an autonomous agent can do.

## The Solution

Install the [LobsterMail skill](https://clawhub.ai/samuelchenardlovesboards/lobstermail-agent-email) and your agent can:

- **Create its own inbox** in one line of code
- **Send and receive email** autonomously  
- **Stay safe** with prompt injection scanning across 6 categories
- **Authenticate properly** with SPF/DKIM/DMARC built in

## Quick Start

```
clawhub install lobstermail-agent-email
```

Then tell your agent: *"Create yourself an email address and send a test message."*

## Skills Used

- [lobstermail-agent-email](https://clawhub.ai/samuelchenardlovesboards/lobstermail-agent-email) — Email infrastructure for AI agents

## Links

- [LobsterMail](https://lobstermail.ai/) — Website
- [Node.js SDK](https://www.npmjs.com/package/lobstermail) — `npm install lobstermail`
- [MCP Server](https://lobstermail.ai/mcp) — For MCP-compatible clients
