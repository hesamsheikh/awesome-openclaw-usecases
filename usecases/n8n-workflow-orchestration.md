# OpenClaw + n8n Workflow Orchestration

Letting your AI agent directly manage API keys and call external services is a recipe for security incidents. Every new integration means another credential in `.env.local`, another surface for the agent to accidentally leak or misuse.

This use case describes a pattern where OpenClaw delegates all external API interactions to n8n workflows via webhooks — the agent never touches credentials, and every integration is visually inspectable and lockable.

## Pain Point

When OpenClaw handles everything directly, you get three compounding problems:

- **No visibility**: It's hard to inspect what the agent actually built when it's buried in JavaScript skill files or shell scripts
- **Credential sprawl**: Every API key lives in the agent's environment, one bad commit away from exposure
- **Wasted tokens**: Deterministic sub-tasks (send an email, update a spreadsheet) burn LLM reasoning tokens when they could run as simple workflows

## What It Does

- **Proxy pattern**: OpenClaw writes n8n workflows with incoming webhooks, then calls those webhooks for all future API interactions
- **Credential isolation**: API keys live in n8n's credential store — the agent only knows the webhook URL
- **Visual debugging**: Every workflow is inspectable in n8n's drag-and-drop UI
- **Lockable workflows**: Once a workflow is built and tested, you lock it so the agent can't modify how it interacts with the API
- **Safeguard steps**: You can add validation, rate limiting, and approval gates in n8n before any external call executes

## How It Works

1. **Agent designs the workflow**: Tell OpenClaw what you need (e.g., "create a workflow that sends a Slack message when a new GitHub issue is labeled `urgent`")
2. **Agent builds it in n8n**: OpenClaw creates the workflow via n8n's API, including an incoming webhook trigger
3. **You add credentials**: Open n8n's UI, add your Slack token / GitHub token manually
4. **You lock the workflow**: Prevent further modifications by the agent
5. **Agent calls the webhook**: From now on, OpenClaw calls `http://n8n:5678/webhook/my-workflow` with a JSON payload — it never sees the API key

```text
┌──────────────┐     webhook call      ┌─────────────────┐     API call     ┌──────────────┐
│   OpenClaw   │ ───────────────────→  │   n8n Workflow   │ ─────────────→  │  External    │
│   (agent)    │   (no credentials)    │  (locked, with   │  (credentials   │  Service     │
│              │                       │   API keys)      │   stay here)    │  (Slack, etc)│
└──────────────┘                       └─────────────────┘                  └──────────────┘
```

## Skills You Need

- `n8n` API access (for creating/triggering workflows)
- `fetch` or `curl` for webhook calls
- Docker (if using the pre-configured stack)
- n8n credential management (manual, one-time setup per integration)

## How to Set It Up

### Option 1: Pre-configured Docker Stack

A community-maintained Docker Compose setup ([openclaw-n8n-stack](https://github.com/caprihan/openclaw-n8n-stack)) pre-wires everything on a shared Docker network:

```bash
git clone https://github.com/caprihan/openclaw-n8n-stack.git
cd openclaw-n8n-stack
cp .env.template .env
# Add your Anthropic API key to .env
docker-compose up -d
```

This gives you:
- OpenClaw on port 3456
- n8n on port 5678
- Shared Docker network so OpenClaw can call `http://n8n:5678/webhook/...` directly
- Pre-built workflow templates (multi-LLM fact-checking, email triage, social monitoring)

### Option 2: Manual Setup

1. Install n8n (`npm install n8n -g` or run via Docker)
2. Configure OpenClaw to know the n8n base URL
3. Add this to your AGENTS.md:

```text
## n8n Integration Pattern

When I need to interact with external APIs:

1. NEVER store API keys in my environment or skill files
2. Check if an n8n workflow already exists for this integration
3. If not, create one via n8n API with a webhook trigger
4. Notify the user to add credentials and lock the workflow
5. For all future calls, use the webhook URL with a JSON payload

Workflow naming: openclaw-{service}-{action}
Example: openclaw-slack-send-message

Webhook call format:
curl -X POST http://n8n:5678/webhook/{workflow-name} \
  -H "Content-Type: application/json" \
  -d '{"channel": "#general", "message": "Hello from OpenClaw"}'
```

## Key Insights

- **Three wins in one**: Observability (visual UI), security (credential isolation), and performance (deterministic workflows don't burn tokens)
- **Lock after testing**: The "build → test → lock" cycle is critical — without locking, the agent can silently modify workflows
- **n8n has 400+ integrations**: Most external services you'd want to connect already have n8n nodes, saving the agent from writing custom API calls
- **Audit trail for free**: n8n logs every workflow execution with input/output data

## Inspired By

This pattern was described by [Simon Høiberg](https://x.com/SimonHoiberg/status/2020843874382487959), who outlined three reasons this approach beats letting OpenClaw handle API interactions directly: observability through n8n's visual UI, security through credential isolation, and performance by running deterministic sub-tasks as workflows instead of LLM calls. The [openclaw-n8n-stack](https://github.com/caprihan/openclaw-n8n-stack) repository provides a ready-to-run Docker Compose setup implementing this pattern.

## Related Links

- [n8n Documentation](https://docs.n8n.io/)
- [openclaw-n8n-stack (Docker setup)](https://github.com/caprihan/openclaw-n8n-stack)
- [n8n Webhook Trigger Docs](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/)
