# M365 Email Triage with Prefetch Architecture

> Smart email monitoring across multiple Microsoft 365 tenants, with cost-optimized prefetching that cuts token use by 99% and intelligent triage that decides what's worth alerting you about — and what can wait.

## The Problem

If you use OpenClaw to monitor email, you've probably hit one of these walls:

- **Cost explosion**: Every cron job triggers a full cache write of the system prompt. If you're checking email every 15 minutes, you're paying for 96 cold starts per day — before the agent even reads a message. At ~$0.20 per cold start on Claude Sonnet, that's $20/day just for email checking.
- **Token bloat**: If your agent calls the M365 tool directly (via mcporter), it retrieves full HTML email bodies — CSS, tracking pixels, images, everything. A single inbox check can consume 1.45 million tokens. Your agent is eating entire rendered web pages for breakfast.
- **Alert fatigue**: Without smart triage, you get pinged for every email — marketing, newsletters, automated receipts, stale messages — and you stop trusting the alerts.

## What This Solves

A two-stage architecture that separates **data gathering** (cheap, no LLM) from **intelligent triage** (LLM, but with minimal token input).

**Stage 1 — Prefetch (system cron, no AI cost):**
A Python script runs every 30 minutes during business hours. It calls mcporter to pull email metadata from multiple M365 tenants, strips reply chains, filters by time window, and writes a small JSON file. Cost: zero LLM tokens.

**Stage 2 — Triage (OpenClaw cron, minimal tokens):**
Seven minutes later, your OpenClaw agent reads the pre-built JSON file and makes judgment calls: what's urgent, what's routine, what can wait for the morning briefing. It delivers alerts via Telegram with emoji categorization and suggested actions. Cost: ~14K tokens instead of 1.45M.

## Setup

### Skills Required

- **mcporter** (bundled) — Microsoft 365 integration
- **message** or Telegram channel — for delivering alerts

### Stage 1: The Prefetch Script

Create a Python script that runs as a system cron job (not an OpenClaw cron — no LLM cost):

```python
#!/usr/bin/env python3
"""Email prefetch — runs via system cron, writes JSON for OpenClaw to read."""
import subprocess, json, os
from datetime import datetime, timedelta, timezone

CST = timezone(timedelta(hours=-6))
LOOKBACK = timedelta(minutes=35)  # slightly wider than the 30-min interval
OUTPUT = "/tmp/openclaw/email-monitor-pending.json"

TENANTS = [
    {"name": "Primary", "account": "user@company.com"},
    {"name": "Secondary", "account": "user@otherdomain.com"},
]

def fetch_tenant(tenant):
    since = (datetime.now(CST) - LOOKBACK).strftime("%Y-%m-%dT%H:%M:%S")
    cmd = [
        "openclaw", "skills", "call", "mcporter",
        "--", "outlook", "mail", "list",
        "--account", tenant["account"],
        "--filter", f"receivedDateTime ge {since}",
        "--select", "subject,from,receivedDateTime,isRead,bodyPreview",
        "--top", "20",
        "--output", "text"
    ]
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
    return json.loads(result.stdout) if result.returncode == 0 else []

def strip_reply_chains(emails):
    """Remove quoted reply content from bodyPreview to save tokens."""
    for email in emails:
        preview = email.get("bodyPreview", "")
        for marker in ["From:", "-----Original", "On ", "> "]:
            idx = preview.find(marker)
            if idx > 50:  # keep at least 50 chars
                preview = preview[:idx].rstrip()
                break
        email["bodyPreview"] = preview[:200]  # cap at 200 chars
    return emails

results = {}
for tenant in TENANTS:
    emails = fetch_tenant(tenant)
    results[tenant["name"]] = strip_reply_chains(emails)

os.makedirs(os.path.dirname(OUTPUT), exist_ok=True)
with open(OUTPUT, "w") as f:
    json.dump({"fetched_at": datetime.now(CST).isoformat(), "tenants": results}, f)
```

**System crontab** (runs every 30 minutes, 8 AM to 11 PM):
```
CRON_TZ=America/Chicago
*/30 8-23 * * * /usr/bin/python3 /path/to/email-prefetch.py >> /tmp/openclaw/email-monitor.log 2>&1
```

### Stage 2: OpenClaw Cron Job

Create an OpenClaw cron job that runs 7 minutes after the prefetch:

```bash
openclaw cron add \
  --name "email-monitor" \
  --schedule "7,37 8-23 * * *" \
  --message "Read /tmp/openclaw/email-monitor-pending.json. Triage emails using EMAIL_MONITOR_PREFS.md rules. Alert me via Telegram only for items that need my attention. Use emoji categories and add → action lines for actionable items. Add a blank line between items. If nothing is actionable, skip the alert entirely."
```

### Stage 3: Triage Rules

Create `~/.openclaw/workspace/EMAIL_MONITOR_PREFS.md`:

```markdown
# Email Monitor Preferences

## Always Alert (regardless of time)
- Financial transactions, payment failures, bank alerts
- Security alerts from any service
- VIP contacts (see VIP_CONTACTS.md)
- Messages about children/dependents from schools, camps, caregivers

## Alert During Business Hours
- Client emails requiring response
- Calendar invitations
- Service outage notifications

## Suppress / Morning Briefing Only
- Marketing emails and newsletters
- Automated receipts and confirmations
- Social media notifications
- Messages older than 6 hours (stale — not worth a late alert)

## Formatting
- 🔴 Urgent: needs response within 1 hour
- 🟡 Actionable: needs response today
- 🔵 Informational: FYI, no action needed
- → Suggested action line for each actionable item
```

Create `~/.openclaw/workspace/VIP_CONTACTS.md`:
```markdown
# VIP Contacts — Always Surface
- boss@company.com (Manager)
- spouse@email.com (Family)
- school@district.edu (Kids' school)
```

## Key mcporter Gotchas

These cost us days of debugging. Save yourself the pain:

1. **Always use `--select` with `bodyPreview`** instead of retrieving full email bodies. Without this, mcporter returns rendered HTML — CSS, images, tracking pixels — which breaks JSON parsing intermittently and consumes 100x more tokens.

2. **Always use `--output text`** for clean JSON. The default output wraps responses in an MCP envelope that requires extra parsing.

3. **Calendar date filtering is silently broken.** mcporter's `startdatetime` / `enddatetime` parameters for calendar queries don't actually filter. Retrieve all events and filter in Python post-fetch.

## Results

| Metric | Before (direct API) | After (prefetch) |
|--------|-------------------|-------------------|
| Tokens per check | ~1,450,000 | ~14,000 |
| JSON parse failures | Intermittent | Zero |
| Daily cost (email only) | ~$20+ | ~$1-2 |
| False alert rate | High | Low (VIP + time-aware) |

## Tips

- **Stale message suppression** is the biggest quality-of-life win. If an email arrived 6 hours ago and it's 10 PM, your agent should skip it rather than buzzing your phone. It'll show up in the morning briefing.
- **Reply chain stripping** matters more than you'd think. Without it, a 10-message email thread sends the full history on every check. Cap `bodyPreview` at 200 characters.
- **The 7-minute offset** between prefetch and triage ensures the JSON file is always fresh when the agent reads it. Without the offset, race conditions cause the agent to read stale or partially-written data.
- **Multi-tenant is free.** The prefetch script loops through tenants sequentially. Adding another M365 account is one line in the config.

## Why Prefetch Instead of Direct Tool Calls?

Every OpenClaw cron job triggers a full system prompt cache write (~$0.20 on Claude Sonnet with a typical workspace). That's the fixed cost of waking the agent up. If the agent then makes 3-4 mcporter tool calls to check multiple inboxes, each call adds round-trip latency and token consumption.

The prefetch pattern inverts this: spend zero on data gathering (Python + system cron), then give the agent a single, pre-digested JSON file to reason about. One cache write, one file read, one triage decision. The agent's job is judgment, not data collection.

## Attribution

Developed as part of the Triss Manifold project — a production OpenClaw deployment running on a Beelink SER5 mini PC, managing email triage across multiple M365 tenants for a managed services provider. Running daily since February 2026.
