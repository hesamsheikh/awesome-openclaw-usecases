# Off Switch & Cost Meter for Your OpenClaw Agent

An always-on OpenClaw agent is wonderful until it loops on a task at 3am and you find out from the API bill. This use case gives you a local dashboard that reads the session logs OpenClaw already writes, a per-session emergency stop, and a spend cap the agent cannot talk its way past.

## Pain Point

- You cannot see what the agent is doing right now, or what the last hour cost, without tailing JSONL files.
- A stuck loop (same tool call, same failure, again and again) burns tokens until you notice.
- Stopping it means finding the process by hand, and a "pause" that only exists in your head.

## What It Does

- **See everything**: live sessions, transcripts, every tool call, tokens and cache-aware cost per session and per model, read from `~/.openclaw` on disk. No SDK, nothing in the request path, nothing leaves the machine by default.
- **Stop one session**: an emergency stop per session (SIGTERM to the process ClawMetry identified), one click or one curl.
- **Cap spend**: an optional local proxy that returns `BUDGET_EXCEEDED` instead of forwarding once a daily or monthly cap is hit, and flags repeated near-identical requests as a loop.
- **Hold risky tool calls**: optional approval gate for high-risk actions (recursive deletes, force pushes, sudo, credential files), answered from the dashboard or a phone.

## Skills You Need

- Python 3.8+ on the machine that runs OpenClaw.
- `pip install clawmetry`. OpenClaw observability is free in the open-source app; approvals and the other runtimes are the paid tier.

## How to Set It Up

### 1. Install and run

```bash
pip install clawmetry && clawmetry
```

The dashboard opens at `http://localhost:8900` and finds your OpenClaw workspace by itself. The Sessions tab shows what is running and what each session has cost.

### 2. Stop a runaway session

From the Sessions tab, or from the terminal:

```bash
curl -s http://localhost:8900/api/sessions
curl -s -X POST http://localhost:8900/api/sessions/<session_id>/stop
```

A `409` means ClawMetry could not identify a process for that session; it says so instead of pretending.

### 3. Put a ceiling on spend

```bash
clawmetry proxy start --daily-budget 10
export ANTHROPIC_BASE_URL=http://localhost:4100/v1   # or OPENAI_BASE_URL
```

Only traffic routed through the proxy is capped; loop detection comes with it.

### 4. Let the agent set it up for you (optional)

The same steps exist as a portable skill for Claude Code, Codex, Cursor, Gemini CLI and OpenClaw:

```bash
npx skills add vivekchand/clawmetry --skill agent-kill-switch
```

## Key Insights

- Reading logs from disk beats a proxy or SDK for observation: nothing can break the agent's request path, and the dashboard works on sessions that already happened.
- An off switch is only honest if it reports when it cannot act. The `409` is a feature.
- A budget cap enforced outside the model is the only kind the model cannot argue with.

## Related Links

- [ClawMetry on GitHub](https://github.com/vivekchand/clawmetry)
- [Website and docs](https://clawmetry.com)
- [Why an off switch](https://clawmetry.com/why)
