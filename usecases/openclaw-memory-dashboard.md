# OpenClaw Memory Dashboard

Your OpenClaw agent has been running for months, accumulating thousands of memories across sessions. You're starting to wonder: Is all this memory actually useful? Are there stale entries slowing things down? How many tokens is this costing me? 

The Memory Dashboard gives you visibility into your agent's "brain" — analyzing memory health, detecting bloat, and generating beautiful HTML reports.

## What It Does

- **Memory Analytics** — Scan all memory files across your OpenClaw agents, categorize by type (episodic, instruction, persona), and calculate health scores
- **Stale Memory Detection** — Find memories older than 30 days that haven been accessed, flagging potential cleanup candidates  
- **Bloat Detection** — Identify oversized memory files (>10KB) that could be compressed or summarized
- **HTML Dashboard** — Generate interactive visual reports with charts, category breakdowns, and recommendations
- **Multi-Agent Support** — Analyze all 6+ agents in your OpenClaw instance simultaneously
- **Export Formats** — JSON, CSV, or HTML for integration with other tools

## Pain Point

OpenClaw's memory system is powerful but opaque. As your agent runs daily tasks, memories pile up without clear metrics on:

- How much storage is consumed
- Which memories are stale vs. active  
- Whether token budgets are being exceeded
- If memory structure is healthy or degrading

Without visibility, you're flying blind — memory bloat slows responses, stale entries cause outdated behavior, and you can't optimize what you can't measure.

## Skills You Need

**No skills required** — this is a standalone CLI tool that analyzes OpenClaw's file-based memory structure directly.

## How It Works

```bash
# Install
npm install -g openclaw-memory-dashboard

# Analyze all agents
openclaw-memory-dashboard analyze ~/.openclaw

# Generate HTML dashboard
openclaw-memory-dashboard dashboard ~/.openclaw -o memory-report.html

# Health check
openclaw-memory-dashboard health ~/.openclaw

# Export as JSON for programmatic use
openclaw-memory-dashboard export ~/.openclaw --format json
```

The tool reads OpenClaw's standard memory files:
- `SOUL.md` / `IDENTITY.md` — Persona configuration
- `USER.md` — User context
- `memory/` directory — All stored memories
- Scene blocks, episodic logs, instruction rules

## Output Example

```
=== OpenClaw Memory Analysis ===
Agent: miaoquai
─────────────────────────────────
Memory Files:        210
Total Size:          18.2 MB
Episodic Memories:   132
Instruction Memory:  45
Persona Memories:    33
─────────────────────────────────
Health Score:        85/100
Stale Memories (>30d): 12
Large Memories (>10KB): 5
Estimated Tokens:    ~45,500
─────────────────────────────────
Recommendations:
  ⚠️  Prune 12 stale memories older than 30 days
  ⚠️  Consolidate 5 large memories into summaries
```

## Integration Points

- Works with **agentmemory** MCP server — analyze memory from both OpenClaw native and agentmemory storage
- Compatible with **hermes-agent** learning loop — visualize Hermes user modeling data
- Export JSON for downstream tools — feeding into analytics pipelines or automated cleanup scripts

## Who This Is For

- **Solo OpenClaw operators** running daily cron tasks — monitor memory growth over time
- **Multi-agent teams** — compare memory profiles across specialized agents  
- **Token cost optimizers** — estimate memory-related token consumption before it hurts your budget
- **Memory researchers** — studying how AI agents accumulate and use long-term memory

## Real-World Use Case

**妙趣AI (MiaoQuai)** — An AI marketing operations agent running 24/7 SEO generation, trend monitoring, and community engagement. After 3 months of operation, memory grew to 210 files totaling 18MB. The dashboard revealed:

- 12 stale memories from deprecated tasks
- 5 oversized files from verbose logging
- Health score of 85 (good, but room for optimization)

Based on recommendations, the team implemented weekly memory pruning, reducing estimated token costs by ~30%.

## Resources

- [GitHub Repository](https://github.com/jingchang0623-crypto/openclaw-memory-dashboard)
- [HTML Dashboard Demo](https://miaoquai.com/tools/memory-dashboard-demo.html)
- [Related: agentmemory Integration](https://github.com/rohitg00/agentmemory/tree/main/integrations/openclaw)

---

*Built by [妙趣AI](https://miaoquai.com) — Your AI Marketing Operations Officer.*