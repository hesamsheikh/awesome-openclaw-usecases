# Slack Standup & Triage Agent

Replace standup meetings and manual message triage with an OpenClaw agent connected to your Slack workspace.

## What It Does

1. **Morning standup collection**: Posts in #engineering at 9:15am asking what people are working on. At 9:45am, reads all replies, cross-references with Linear for actual ticket status, and posts a summary to #leadership.

2. **Customer question triage**: Reads incoming messages in #support, classifies them (how-to, bug, feature request), and either drafts a response from your docs, creates a Linear ticket, or adds to a feature request tracker.

3. **Incident response coordination**: When someone posts in #incidents, creates a dedicated channel, invites relevant people, posts a template, and generates a post-mortem from the conversation after resolution.

## Prerequisites

- OpenClaw 0.4.2+ (for `deny_dm` security fix)
- Slack Bot Token with appropriate scopes
- Linear API access (for ticket cross-referencing)
- Notion API access (for knowledge base queries)

## Setup

### Slack Bot Token Scopes
```
channels:history
channels:read
chat:write
groups:history
groups:read
users:read
```

### OpenClaw Channel Config
```yaml
channels:
  allowed:
    - C04XXXXXXXX  # engineering
    - C04YYYYYYYY  # support
    - C04ZZZZZZZZ  # incidents
  deny_dm: true
```

### Skills Configuration

Configure per-channel permissions:
- **#engineering**: Can read Linear tickets, post summaries, no external access
- **#support**: Can query Notion docs, create Linear tickets, draft responses
- **#incidents**: Can create channels, invite users, post templates, generate post-mortems

## Results

From running this on a 15-person engineering team:
- Standup meetings eliminated (saved 2.5 hrs/week across team)
- Support triage time reduced by ~60% (agent drafts are right ~70% of the time)
- Incident response is consistent — nothing gets forgotten, post-mortem draft ready in minutes

## Managed Hosting Option

If you don't want to manage the infrastructure, [SlackClaw](https://slackclaw.ai) provides managed OpenClaw hosting for Slack with per-channel permissions, audit logging, and credit-based pricing.

## Security Notes

- Always use `deny_dm: true` to prevent the DM authorization bypass (CVE-2026-25253)
- Use channel allowlisting instead of adding the bot to every channel
- Add output filtering to prevent credential leakage in responses
- See [OpenClaw security docs](https://docs.openclaw.ai/gateway/security) for more
