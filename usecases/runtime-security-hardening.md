# Runtime Security Hardening with PRISM

## Pain Point

OpenClaw agents have broad tool access — they can execute commands, read/write files, and make network requests. A single prompt injection (from a malicious email, web page, or tool result) can hijack the agent into running dangerous commands, exfiltrating credentials, or tampering with critical config files. Without runtime defense, you only discover the breach after it happens.

## What It Does

[PRISM](https://github.com/KyaClaw/openclaw-prism) is a zero-fork security layer that intercepts **every stage** of the agent lifecycle via 10 OpenClaw hooks. It runs as one plugin plus four sidecar services:

- **Injection detection** — Two-tier scanning (10 heuristic regex rules + optional Ollama LLM cascade) on all inbound messages and tool results
- **Session risk accumulation** — Per-session risk scores with TTL decay. High risk automatically blocks dangerous tools and sub-agent spawning
- **Exec sandboxing** — Whitelist-first, blacklist-second pipeline with shell trampoline detection (`bash -c`, `python -c`, `node -e`), metacharacter rejection, and protected path enforcement
- **Outbound DLP** — Scans outgoing messages for credential patterns (AWS keys, SSH private keys, Slack/GitHub/OpenAI tokens) before they leave the gateway
- **File integrity monitoring** — Watches critical OpenClaw files (openclaw.json, AGENTS.md, SOUL.md, auth-profiles.json) for unauthorized changes
- **HMAC-signed audit trail** — Append-only JSONL log with per-entry HMAC-SHA256 signatures and chain verification via CLI
- **Dashboard** — Web UI for viewing block events, one-click Allow workflow, and live config management

## Setup

```bash
git clone https://github.com/KyaClaw/openclaw-prism.git
cd openclaw-prism
bash install.sh
```

The `install.sh` installer generates secrets, links the plugin to `~/.openclaw/extensions/`, and writes the PRISM runtime configuration.
On Linux with `systemd`, `install.sh` also installs and starts the PRISM services and injects env vars into the OpenClaw user service automatically.
On macOS, `install.sh` only prints the `launchd` and manual startup steps, so you must run the provided `launchd` commands yourself.

After install, open the Dashboard at `http://127.0.0.1:18768` and enter the `PRISM_DASHBOARD_TOKEN` from your `.env` file to see blocked events in real time.

## Skills Needed

No OpenClaw skills required — PRISM installs as a native OpenClaw plugin (uses the hooks API). Works alongside any existing skills without conflict.

## Related Links

- [PRISM GitHub](https://github.com/KyaClaw/openclaw-prism)
- [OpenClaw Security Guide](https://docs.openclaw.ai/gateway/security)
- [OpenClaw Hooks API](https://docs.openclaw.ai/automation/hooks)
