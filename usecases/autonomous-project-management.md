# Autonomous Project Management with Subagents

Managing complex projects with multiple parallel workstreams is exhausting. You end up context-switching constantly, tracking status across tools, and manually coordinating handoffs.

This use case implements a decentralized project management pattern where subagents work autonomously on tasks, coordinating through shared state files rather than a central orchestrator.

## Pain Point

Traditional orchestrator patterns create bottlenecks—the main agent becomes a traffic cop. For complex projects (multi-repo refactors, research sprints, content pipelines), you need agents that can work in parallel without constant supervision.

## What It Does

- **Decentralized coordination**: Agents read/write to a shared `STATE.yaml` file
- **Parallel execution**: Multiple subagents work on independent tasks simultaneously
- **No orchestrator overhead**: Main session stays thin (CEO pattern—strategy only)
- **Self-documenting**: All task state persists in version-controlled files

## Core Pattern: STATE.yaml

Each project maintains a `STATE.yaml` file that serves as the single source of truth:

```yaml
# STATE.yaml - Project coordination file
project: website-redesign
updated: 2026-02-10T14:30:00Z

tasks:
  - id: homepage-hero
    status: in_progress
    owner: pm-frontend
    started: 2026-02-10T12:00:00Z
    notes: "Working on responsive layout"
    
  - id: api-auth
    status: done
    owner: pm-backend
    completed: 2026-02-10T14:00:00Z
    output: "src/api/auth.ts"
    
  - id: content-migration
    status: blocked
    owner: pm-content
    blocked_by: api-auth
    notes: "Waiting for new endpoint schema"

next_actions:
  - "pm-content: Resume migration now that api-auth is done"
  - "pm-frontend: Review hero with design team"
```

## How It Works

1. **Main agent receives task** → spawns subagent with specific scope
2. **Subagent reads STATE.yaml** → finds its assigned tasks
3. **Subagent works autonomously** → updates STATE.yaml on progress
4. **Other agents poll STATE.yaml** → pick up unblocked work
5. **Main agent checks in periodically** → reviews state, adjusts priorities

## Skills You Need

- `sessions_spawn` / `sessions_send` for subagent management
- File system access for STATE.yaml
- Git for state versioning (optional but recommended)

## Setup: AGENTS.md Configuration

```text
## PM Delegation Pattern

Main session = coordinator ONLY. All execution goes to subagents.

Workflow:
1. New task arrives
2. Check PROJECT_REGISTRY.md for existing PM
3. If PM exists → sessions_send(label="pm-xxx", message="[task]")
4. If new project → sessions_spawn(label="pm-xxx", task="[task]")
5. PM executes, updates STATE.yaml, reports back
6. Main agent summarizes to user

Rules:
- Main session: 0-2 tool calls max (spawn/send only)
- PMs own their STATE.yaml files
- PMs can spawn sub-subagents for parallel subtasks
- All state changes committed to git
```

## Example: Spawning a PM

```text
User: "Refactor the auth module and update the docs"

Main agent:
1. Checks registry → no active pm-auth
2. Spawns: sessions_spawn(
     label="pm-auth-refactor",
     task="Refactor auth module, update docs. Track in STATE.yaml"
   )
3. Responds: "Spawned pm-auth-refactor. I'll report back when done."

PM subagent:
1. Creates STATE.yaml with task breakdown
2. Works through tasks, updating status
3. Commits changes
4. Reports completion to main
```

## Key Insights

- **STATE.yaml > orchestrator**: File-based coordination scales better than message-passing
- **Git as audit log**: Commit STATE.yaml changes for full history
- **Label conventions matter**: Use `pm-{project}-{scope}` for easy tracking
- **Thin main session**: The less the main agent does, the faster it responds

## Based On

This pattern is inspired by [Nicholas Carlini's approach](https://nicholas.carlini.com/) to autonomous coding agents—let agents self-organize rather than micromanaging them.

## Related Links

- [OpenClaw Subagent Docs](https://github.com/openclaw/openclaw)
- [Anthropic: Building Effective Agents](https://www.anthropic.com/research/building-effective-agents)
