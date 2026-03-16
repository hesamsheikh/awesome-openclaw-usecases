# Mission Control: Multi-Agent Task Orchestration for OpenClaw

## Summary

Mission Control is a practical operations layer for OpenClaw teams. It automatically scans tasks from Kanban and chatroom sources, routes work to the right agent based on capability matrices, tracks lifecycle state, and keeps everyone aligned through event-driven inbox notifications.

## Problem

When multiple agents collaborate, teams often hit:

- **Unclear ownership**: No one knows which agent owns which task
- **Inconsistent task state**: Task status gets out of sync across channels
- **Missing handoff context**: When one agent finishes, the next doesn't know what happened
- **No single place to inspect progress**: You have to check multiple channels to understand what's happening

## Solution

Mission Control combines:

- **Task lifecycle tracking** — Full audit trail from creation to completion
- **Event bus and agent inboxes** — Agents communicate through structured messages
- **Orchestration plans** — Multi-phase workflows with dependencies
- **Status and history reporting** — Real-time operational visibility

This creates a lightweight control plane for multi-agent execution without complex infrastructure.

## Core Components

```
Mission Control/
├── coordinator.py          # Orchestration and scheduling entrypoint
├── tracker.py             # Task lifecycle persistence and stats
├── mission_control_events.py  # Event bus + inbox messaging
├── orchestrator.py        # Multi-phase plan templates and execution
└── state.json            # Persistent state
```

### Key Features

| Component | Function |
|-----------|----------|
| **coordinator.py** | Scans Kanban/Chatroom, assigns tasks, runs cron jobs |
| **tracker.py** | Records task lifecycle, computes statistics, generates reports |
| **mission_control_events.py** | Event-driven messaging between agents |
| **orchestrator.py** | Multi-phase workflow templates (research, code_review, content) |

## Workflow

1. **Create/Scan Tasks**
   - Automatically scan `Mission-Control-Kanban.md` for new tasks
   - Monitor chatroom messages for task requests

2. **Assign Task**
   - Match task to agent based on capability matrix (health, memory, tool, capability, performance, issue)
   - Route to appropriate agent (@coder, @vision, @fast, @main)

3. **Track Lifecycle**
   - Emit events: `created` → `assigned` → `started` → `progress` → `completed` / `failed`
   - Store full history in `task_lifecycles.json`

4. **Notify Agents**
   - Deliver notifications to per-agent inbox
   - Publish events to event bus for subscribers

5. **Report Status**
   - Generate daily briefings
   - Track metrics (completion time, failure rate, agent workload)

## Why It Works

- **Event-driven updates** eliminate hidden state changes
- **Lifecycle history** provides accountability and auditability
- **Plan templates** enforce repeatable execution patterns
- **Agent-specific inboxes** reduce coordination noise

## Example Use Cases

### 1. Daily Maintenance & Reliability Checks

```
Task: "Run system health check"
→ Assigned to: @main
→ Phases: collect_metrics → analyze → report
→ Status tracked automatically
```

### 2. Multi-Agent Research Pipeline

```
Task: "Research AI Agent trends"
→ Assigned to: @fast (quick scan)
→ Then: @vision (deep analysis)  
→ Then: @main (synthesize recommendations)
```

### 3. Cross-Agent Code Review

```
Task: "Review new feature code"
→ Assigned to: @coder (Codex review)
→ Then: @coder2 (Claude review)
→ Then: @main (merge insights)
```

### 4. Automated Backlog Triage

```
Task: "Prioritize TODO items"
→ Auto-scan Kanban
→ Score by priority tags
→ Assign to agents based on capacity
```

## Skills You Need

- `sessions_spawn` / `sessions_send` for multi-agent orchestration
- Cron jobs for scheduled scans (see `HEARTBEAT.md`)
- File system access for Kanban/memory reading
- Discord or Feishu for notifications

## How to Set It Up

### 1. Project Structure

```bash
mkdir -p ~/.openclaw/workspace/subagents/mission-control
cd ~/.openclaw/workspace/subagents/mission-control

# Core files
touch coordinator.py tracker.py mission_control_events.py orchestrator.py
mkdir events logs
```

### 2. Define Agent Capabilities

Edit `coordinator.py` to configure your agent matrix:

```python
AGENT_CAPABILITIES = {
    "@coder": ["code", "performance", "tool"],
    "@vision": ["analysis", "research", "creative"],
    "@fast": ["quick", "simple", "routine"],
    "@main": ["coordination", "decision", "reporting"]
}
```

### 3. Set Up Cron Scanning

Add to `HEARTBEAT.md`:

```markdown
## Mission Control Scan

Every 15 minutes:
- Scan Mission-Control-Kanban.md
- Check for new tasks
- Assign to agents based on priority
```

### 4. Start the Coordinator

```bash
python3 coordinator.py scan      # Manual scan
python3 coordinator.py status  # View task status
python3 coordinator.py briefing # Generate daily report
```

## Operational Benefits

- **Faster handoffs** — Agents know exactly what to pick up next
- **Better observability** — Real-time view of active work across all agents
- **Fewer dropped tasks** — Automatic tracking from creation to completion
- **Cleaner postmortems** — Full lifecycle history for debugging

## Technical Improvements (Latest)

Recent optimizations made to the system:

- **Atomic JSON persistence** — Prevents data corruption from interrupted writes
- **Safe JSON loading** — Graceful fallback when state files are corrupted
- **Template immutability** — Workflow templates won't get polluted after repeated use
- **Portable paths** — Uses relative paths instead of hardcoded absolute paths
- **Accurate status semantics** — `assigned` vs `started` correctly distinguished

## Related Links

- [OpenClaw Subagent Documentation](https://github.com/openclaw/openclaw)
- [Multi-Agent Content Factory](usecases/content-factory.md)
- [Multi-Agent Specialized Team](usecases/multi-agent-team.md)
- [Autonomous Project Management](usecases/autonomous-project-management.md)

---

*Built for OpenClaw v2026.02+*
