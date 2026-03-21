# OpenClaw Cost Estimation Before Running Agents

## Pain Point

OpenClaw users often run agents without knowing how much it will cost.

This leads to:
- budgets draining unexpectedly
- heartbeats consuming tokens silently
- fallback models increasing spend without visibility

Most users only realize the cost after it's too late.

---

## What It Does

This use case helps you estimate your OpenClaw setup cost before running agents.

By defining your:
- model usage (primary + fallback)
- heartbeat interval
- message volume
- multi-agent setup

You can calculate expected daily, monthly, and yearly spend.

---

## Prompts

Example config inputs:

- Primary model: claude-sonnet
- Fallback model: claude-haiku
- Messages/day: 50
- Heartbeat interval: 30 minutes
- Tokens per message: 800 input / 1200 output

---

## Skills Needed

- Basic OpenClaw configuration
- Understanding of models and token usage
- Optional: multi-agent setup

---

## Related Links

- OpenClaw Setup Cost Calculator: https://calculator.guardclaw.dev/
