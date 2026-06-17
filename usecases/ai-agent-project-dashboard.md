# AI Agent Project Dashboard

## Pain Point

Your AI agent starts every session blank. Across multiple projects, you re-explain the goal, the decisions, and where things stand — again and again. Context is lost between sessions, tasks drift, and there's no shared view of what multiple agents are actually working on.

## What It Does

FlowBoard is a local-first project workspace for OpenClaw and external coding agents (Claude Code, Codex, Cursor). It solves two problems at once:

### 1. The Knowledge Layer — Multi-Project Context with Lazy Loading

Your agent starts every session blank. Across several projects, you re-explain the goal, the decisions, and where things stand — again and again.

FlowBoard gives each project a persistent knowledge layer: goals, architecture decisions, live task state, and specs. When you activate a project, your agent pulls in exactly the slice it needs, when it needs it — **lazy-loaded, so token usage stays low.** Switch projects and the right context follows; nothing to re-explain.

- Activate a project → agent gets goals, decisions, specs, and current task state
- Switch between projects without losing track
- Session handoff — pick up exactly where you left off
- Modular Overview dashboard with 26 widgets (blockers, approvals, milestones, GitHub PRs/CI/releases, file viewer, and more)

### 2. The Working Mode — Spec-Driven Development from a Sticky Note

You jot a rough idea on the Idea Canvas — a visual brainstorming space with sticky notes and connections. One click runs the **Specify workflow**: a guided ANALYZE → CLARIFY → GENERATE loop that asks a few clarifying questions and turns that one-line idea into a proper spec with acceptance criteria. The spec lands on the Kanban board as a task, ready for your agents to claim, implement, and move through review — with full multi-agent visibility so you see who's working on what.

- **Idea → Spec → Done in one flow** — rough sticky note on the Canvas, Specify turns it into a detailed spec, Kanban tracks it through implementation. No manual spec-writing, no re-explaining.
- **Agent-native Kanban** — agents create tasks, write specs, claim work with leases, checkpoint progress, and hand completed work to review
- **Multi-agent visibility** — stable agent identity, task claims, checkpoints, and review approvals. Works for OpenClaw agents and external runtimes alike.
- **Telegram Mini App** — access your project dashboard remotely from your phone.

Everything runs on your machine, event-sourced in SQLite — no SaaS, no account, your project names stay local.

## Prompts

**Setup:**
```
Install the FlowBoard plugin: openclaw plugins install flowboard
Then run: node scripts/setup.mjs
Open http://localhost:18790 and click "Finish setup"
```

**Daily use:**
```
"New project: my-app" — creates a project with full folder structure
"Project: my-app" — activates it, agent gets full context
"What's the status of project X?" — agent checks FlowBoard API
"Create a task for the authentication refactor" — agent creates task + spec
"Promote these canvas notes to tasks" — turns brainstorm into structured work
"Show me blocked tasks across all projects" — agent queries the API
```

**External agents (Claude Code, Codex, Cursor):**
```
Run once: node ~/repos/FlowBoard/dashboard/install-trigger.mjs --repo ~/myrepo
Then the agent discovers FlowBoard via GET /api/status and fetches context on demand.
```

## Skills Needed

- [FlowBoard](https://github.com/rasimme/FlowBoard) — OpenClaw plugin (install via `openclaw plugins install flowboard` or ClawHub)
- OpenClaw ≥ 2026.6.6 (for the project-context hook)
- Node.js ≥ 18

## Related Links

- [FlowBoard on GitHub](https://github.com/rasimme/FlowBoard)
- [FlowBoard on ClawHub](https://clawhub.ai) (plugin)
- [HZL Task Runtime](https://www.hzl-tasks.com)
- [OpenClaw](https://github.com/openclaw/openclaw)
