# OpenClaw Installation & VPS Setup

Getting OpenClaw running on your own infrastructure is the first step to having a permanent, always-available AI assistant. This use case covers the complete installation journey — from VPS provisioning to a fully operational self-hosted agent.

## Pain Point

Chat-based AI assistants reset every session. They don't remember who you are, they can't run continuously, and they have no access to your tools or data. Self-hosting OpenClaw solves all of this but requires navigating:

- VPS selection and provisioning
- Docker and Node.js setup
- Domain and SSL configuration
- Telegram/Discord integration
- Memory persistence configuration

## What It Does

- **Permanent memory**: OpenClaw remembers conversations across sessions using a file-based memory system
- **Always-on agent**: Runs 24/7 on your VPS — never sleeps, never resets
- **Multi-platform**: Connect to Telegram, Discord, Signal, WhatsApp, and more simultaneously
- **Private & secure**: Your data never leaves your server
- **Extensible**: Add skills, MCP tools, and custom capabilities

## How It Works

1. **Provision a VPS**: Debian/Ubuntu server with Docker and Node.js
2. **Install OpenClaw**: One-command install via npm or Docker
3. **Configure channels**: Link your Telegram bot, Discord bot, or other messaging platforms
4. **Set up skills**: Install community skills from ClawHub or write your own
5. **Deploy and forget**: OpenClaw runs as a systemd service, auto-restarts on failure

```text
┌──────────────┐     Messaging API     ┌──────────────────┐     Skills/MCP     ┌──────────────┐
│   Telegram    │ ←───────────────────  │    OpenClaw      │ ───────────────→  │   External    │
│   Discord     │                      │   (VPS/Docker)   │                   │   Services   │
│   Signal      │                      │   AI Agent       │                   │   & APIs     │
│   ...         │                      │   + Memory       │                   │              │
└──────────────┘                       └──────────────────┘                   └──────────────┘
```

## How to Set It Up

### Quick Start (Docker)

```bash
# Install OpenClaw
curl -fsSL https://get.openclaw.ai | sh
# Or via npm
npm install -g openclaw
```

### Step-by-Step Guide

For a complete walkthrough covering VPS setup, Docker deployment, Telegram bot linking, and production configuration, see:

**[Install OpenClaw on VPS — Complete Guide](https://install-openclaw.net/blog/install-openclaw-vps/)**

This guide covers:
- Choosing the right VPS provider (DigitalOcean, Hetzner, Vultr)
- Server hardening basics (UFW, SSH keys)
- Docker installation and OpenClaw setup
- Telegram bot creation and linking
- Reverse proxy with Caddy for HTTPS
- Memory persistence configuration
- Systemd service setup for auto-restart

### Telegram Setup

Connect OpenClaw to Telegram:

1. Create a bot via [@BotFather](https://t.me/BotFather) on Telegram
2. Get your bot token
3. Configure it in OpenClaw's environment
4. Start chatting with your self-hosted AI

A full walkthrough: **[Connect OpenClaw to Telegram](https://install-openclaw.net/blog/openclaw-telegram-setup/)**

## Skills You Need

- Basic Linux command-line knowledge
- A VPS or local server (minimum 1GB RAM, 10GB storage)
- Docker installed (optional but recommended)
- A Telegram account (for the bot setup)

## Key Insights

- **Cost**: A basic VPS costs ~$5-10/month — cheaper than any AI subscription
- **Memory matters**: OpenClaw's persistent memory is what makes it feel like an actual assistant, not a chatbot
- **Start simple**: Begin with Telegram-only, then add channels and skills as you go
- **N8n Integration**: OpenClaw pairs naturally with n8n for workflow automation — see [n8n Workflow Orchestration](https://install-openclaw.net/blog/openclaw-n8n-integration/)

## Related Links

- [What Is OpenClaw? Complete Introduction](https://install-openclaw.net/blog/what-is-openclaw/)
- [Install OpenClaw on VPS Guide](https://install-openclaw.net/blog/install-openclaw-vps/)
- [OpenClaw Telegram Setup](https://install-openclaw.net/blog/openclaw-telegram-setup/)
- [OpenClaw vs ChatGPT Comparison](https://install-openclaw.net/blog/openclaw-vs-chatgpt/)
- [Official OpenClaw GitHub](https://github.com/openclaw/openclaw)
