# Swarm Intelligence Orchestrator

Orchestrate specialized AI agents using swarm intelligence — stigmergic coordination (agents self-organize via shared markers), adversarial consensus (CHP cross-validation), and performance-optimized team composition (PARL learning).

## Pain Point

- **Central orchestrators bottleneck**: Traditional multi-agent setups route everything through a single coordinator — when one agent blocks, the whole pipeline stalls
- **No learning across runs**: Every call to a multi-agent system is stateless — agents don't remember which configurations worked best in the past
- **Quality isn't validated**: Agents produce outputs with no cross-checking. A rogue agent's bad analysis goes straight to the user
- **Arbitrary team composition**: Picking which agents to deploy for a task is guesswork — no data on which agents perform best for which task types

## What It Does

- **Stigmergic coordination**: Agents self-organize by claiming tasks from a shared marker board — no central scheduler needed. If Agent A is busy, Agent B picks up the next available task
- **CHP adversarial consensus**: Every critical output is reviewed by at least one other agent before delivery. Disagreements escalate to deliberative debate
- **PARL performance tracking**: After each run, agents are rated on output quality, speed, and reliability. The system learns which agents to prefer for which task types
- **Swarm visualization**: A status board shows which agents are working, idle, or stuck — you see the swarm state at a glance

## Prompts

### Research Synthesis Task

```text
Task: Competitive analysis of lithium supply chain diversification

Swarm orchestration mode:
1. Decompose into sub-tasks: geopolitical risk, trade flow analysis, peer company research, strategic synthesis
2. Post stigmergic markers for each sub-task on /swarm/board
3. Let agents self-assign based on availability and PARL ratings
4. Run CHP cross-validation on all findings
5. Synthesize into a single board-ready report

Output swarm status every 2 minutes:
- Which agents are working on what
- Estimated time to completion per sub-task
- Any conflicts or stuck agents
```

### Multi-Agent Quality Gate

```text
Review the attached Q3 forecast draft through CHP:

Agent A (Finance): Validate the revenue projections against historical trends
Agent B (Strategy): Assess the competitive positioning assumptions
Agent C (Compliance): Check for disclosure completeness and risk flagging

Process:
1. Each agent produces independent findings
2. All agents read each other's findings
3. Flag any disagreements — must resolve via debate before LOCK
4. Record the full audit trail in /swarm/audit/

If any two agents disagree on a material finding after 3 debate rounds → ESCALATE to human.
```

### PARL Performance Review

```text
Run PARL review on the last 10 completed swarm tasks.

For each task:
- Which agents were assigned
- Task type (research, analysis, code, writing)
- Output quality score (CHP consensus cross-validated)
- Completion time
- Reliability (did the agent stall, hallucinate, or need rework?)

Build a PARL ranking table:
- Best agent for financial analysis
- Best agent for document research
- Best agent for strategic writing
- Best agent for data verification

Update agent routing preferences based on findings.
```

## Skills You Need

- `sessions_spawn` / `sessions_send` for multi-agent orchestration
- File system for stigmergic marker board and CHP audit envelopes
- JSON for PARL performance tracking
- Heartbeat for periodic swarm health checks

## How to Set It Up

### 1. Shared stigmergic marker board

```text
/swarm/board/
├── AVAILABLE/       # Tasks ready for pickup
│   ├── task-001.json  # {type, description, priority, required_skills}
│   └── task-002.json
├── IN_PROGRESS/     # Tasks being worked
│   └── task-001.json  # {assigned_to, started_at, eta}
├── COMPLETE/        # Finished tasks
│   └── task-001.json  # {output_ref, chp_status, quality_score}
├── CONFLICT/        # CHP disagreements needing resolution
└── AUDIT/           # Full run audit trails
```

### 2. CHP validation pipeline

```text
## AGENTS.md — CHP Workflow

Quality Gates:
1. OUTPUT → Initial finding (any agent)
2. REVIEW → At least one other agent reads and critiques
3. REVISE → Original agent addresses critiques
4. LOCK → Both agents agree output is correct
5. AUDIT → Full chain recorded in /swarm/audit/

If REVIEWER and ORIGINAL cannot reach consensus after 2 rounds → NEW agent joins as mediator. If 3 agents still disagree → HUMAN ESCALATION.
```

### 3. PARL performance database

```text
/swarm/parl/
├── ratings.json        # Agent performance by task type
├── rankings.json       # Preferred agent order per task type
└── history.json        # Full run history for analysis

PARL scoring:
- Quality: 0-10 (based on CHP cross-validation pass rate)
- Speed: 0-10 (relative to expected completion time)
- Reliability: 0-10 (inverse of stalls, reworks, escalations)
```

## Key Insights

- **Stigmergy beats central scheduling for complex tasks**: Agents self-assigning via markers is more resilient than a coordinator making all decisions. If one agent crashes, another picks up the work
- **Adversarial consensus isn't just safety — it's quality**: The cross-validation step catches reasoning errors that no single pass would catch. It's the code review of AI agents
- **PARL data compounds**: After 20+ runs, you can predict with high accuracy which agent to assign to which task type. Don't guess — use the data
- **Swarm visualization makes debugging possible**: Being able to see "Agent A has been stuck on X for 10 minutes" is essential for debugging multi-agent workflows

## Related Links

- [Cubiczan Swarm Pack](https://github.com/zan-maker/cubiczan-swarm-pack)
- [GenSwarm — Stigmergic Coordination Protocol](https://github.com/zan-maker/genswarm-contract)
- [Consensus Hardening Protocol](https://github.com/zan-maker/consensus-hardening-protocol)
- [SwarmChat — Multi-Agent Debate Platform](https://github.com/zan-maker/swarmchat)
