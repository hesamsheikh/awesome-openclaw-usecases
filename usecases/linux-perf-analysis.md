# Linux Perf Performance Analysis
Profile and optimize your application performance using Linux perf.

What to use it for:

• CPU profiling and hotspot identification
• System call overhead analysis
• Bottleneck diagnosis (syscall, lock contention, memory)
• Performance optimization workflow
• Comparative analysis (before/after)

> Complete workflow: Setup → Record → Analyze → Diagnose → Optimize

## Skills you Need
[perf-skills](https://github.com/caomengxuan666/perf-skills) skill.

## How to Set it Up
1. Add to your project:
```bash
git clone https://github.com/caomengxuan666/perf-skills.git .claude/skills/linux-perf
```

2. Or use with Claude Code:
```
/plugin marketplace add caomengxuan666/perf-skills
```

3. Then prompt your agent:
```text
Help me profile my application with perf. My app is running slowly.
```

The skill will guide you through:
- Environment setup (permissions, debug symbols)
- Data collection (perf record)
- Analysis (perf report, hotspots)
- Diagnosis (syscall, lock, memory patterns)
- Optimization recommendations