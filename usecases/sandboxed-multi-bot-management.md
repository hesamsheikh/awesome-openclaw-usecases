# Running Multiple OpenClaw Bots in Docker Sandboxes

## Overview

Manage multiple OpenClaw instances through a native desktop GUI, with each bot running in its own isolated Docker container. Containers start with `--network none` by default — network access is opt-in per bot.

## Why?

OpenClaw has OS-level access to your email, calendars, files, and messaging platforms. Running it directly on your host means a prompt injection gives an attacker your machine. ClawPier isolates each bot inside a Docker container with network disabled by default, so a compromised agent can't reach your host or the internet.

## Setup

### Install ClawPier

**macOS (Homebrew):**
```bash
brew tap SebastianElvis/clawpier
brew install --cask clawpier
```

**Or download** from [GitHub Releases](https://github.com/SebastianElvis/clawpier/releases) — available for macOS (signed & notarized), Linux (.AppImage, .deb), and Windows (.exe, .msi).

### Prerequisites

- Docker must be installed and running
- ClawPier will prompt you to pull the OpenClaw image on first launch

## How It Works

1. **Create a bot** — give it a name and optionally set a workspace path
2. **Configure** — set environment variables, resource limits (CPU/memory), network mode, and port mappings from the GUI
3. **Start** — the bot runs in its own Docker container, isolated from your host by default
4. **Interact** — use the built-in chat, terminal, log viewer, file browser, or skill browser
5. **Monitor** — live CPU, memory, and network I/O stats per bot

### Key Security Features

- **Network isolation** — each bot's container starts with no network access; enable bridge/host only when needed
- **Resource limits** — set CPU and memory caps per bot from the GUI
- **One-click stop** — kill a misbehaving agent instantly; your host is never at risk
- **Port conflict detection** — warns if a host port is already in use before you start

### Skill Management

Browse 50+ bundled skills, search the ClawHub registry, and install/uninstall skills with one click — all from a visual skill browser inside ClawPier.

## Links

- [GitHub](https://github.com/SebastianElvis/clawpier)
- [Demo Video](https://github.com/SebastianElvis/clawpier/releases/download/v0.3.0/clawpier-demo.mov)
