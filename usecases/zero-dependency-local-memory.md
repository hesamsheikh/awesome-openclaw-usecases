# Zero-Dependency Local Memory Engine

Give your OpenClaw agent fully offline long-term memory: Mnemosyne stores everything as plain Markdown and searches it locally with TF-IDF + KNN — no LLM API, no vector DB, zero token cost.

## Why this is useful

Most memory setups (Mem0, Zep, embedding-based search) require external APIs and vector databases. [Mnemosyne](https://github.com/ElonAug7/openclaw-mnemosyne-memory-engine) keeps the whole loop on your machine: 271KB runtime, Git-friendly Markdown storage, ~55ms retrieval, and a built-in Web UI at localhost:8766.

## Setup

1. Install Mnemosyne from its repo (MIT licensed).
2. Point it at your OpenClaw workspace so daily notes and `MEMORY.md` are indexed automatically.
3. Query via the CLI or the Web UI; memories stay human-readable and `git diff`-able.

## What you get

- **Seven retrieval channels in parallel**: semantic, keyword, temporal, profile, heartbeat, decision, and todo — merged into one ranked answer.
- **Zero ongoing cost**: every recall runs locally, so heartbeat-driven memory maintenance never burns tokens.
- **Full offline operation**: works on air-gapped machines and setups without API keys.

## Verified

Used daily as the memory layer for an OpenClaw agent: morning briefs, decision logs, and todo recall all served from local Markdown with no external calls.
