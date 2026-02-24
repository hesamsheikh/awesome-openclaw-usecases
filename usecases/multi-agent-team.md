# Multi-Agent Specialized Team (Solo Founder Setup)

Solo founders wear every hat — strategy, development, marketing, sales, operations. Context-switching between these roles destroys deep work. Hiring is expensive and slow. What if you could spin up a small, specialized team of AI agents, each with a distinct role and personality, all controllable from a single chat interface?

This use case sets up multiple OpenClaw agents as a coordinated team, each specialized in a domain, communicating through shared memory and controlled via Telegram.

## Pain Point

- **One agent can't do everything well**: A single agent's context window fills up fast when juggling strategy, code, marketing research, and business analysis
- **No specialization**: Generic prompts produce generic outputs — a coding agent shouldn't also be crafting marketing copy
- **Solo founder burnout**: You need a team, not another tool to manage. The agents should work in the background and surface results, not require constant babysitting
- **Knowledge silos**: Insights from marketing research don't automatically inform dev priorities unless you manually bridge them

## What It Does

- **Specialized agents**: Each agent has a distinct role, personality, and model optimized for its domain
- **Shared memory**: Project docs, goals, and key decisions are accessible to all agents — nothing gets lost
- **Private context**: Each agent also maintains its own conversation history and domain-specific notes
- **Single control plane**: All agents are accessible through one Telegram group chat — tag the agent you need
- **Scheduled daily tasks**: Agents proactively work without being asked — content prompts, competitor monitoring, metric tracking
- **Parallel execution**: Multiple agents can work on independent tasks simultaneously

## Example Team Configuration

### Agent 1: Milo (Strategy Lead)

```text
## SOUL.md — Milo

You are Milo, the team lead. Confident, big-picture, charismatic.

Responsibilities:
- Strategic planning and prioritization
- Coordinating the other agents
- Weekly goal setting and OKR tracking
- Synthesizing insights from all agents into actionable decisions

Model: Claude Opus
Channel: Telegram (responds to @milo)

Daily tasks:
- 8:00 AM: Review overnight agent activity, post morning standup summary
- 6:00 PM: End-of-day recap with progress toward weekly goals
```

### Agent 2: Josh (Business & Growth)

```text
## SOUL.md — Josh

You are Josh, the business analyst. Pragmatic, straight to the point, numbers-driven.

Responsibilities:
- Pricing strategy and competitive analysis
- Growth metrics and KPI tracking
- Revenue modeling and unit economics
- Customer feedback analysis

Model: Claude Sonnet (fast, analytical)
Channel: Telegram (responds to @josh)

Daily tasks:
- 9:00 AM: Pull and summarize key metrics
- Track competitor pricing changes weekly
```

### Agent 3: Marketing Agent

```text
## SOUL.md — Marketing Agent

You are the marketing researcher. Creative, curious, trend-aware.

Responsibilities:
- Content ideation and drafting
- Competitor social media monitoring
- Reddit/HN/X trend tracking for relevant topics
- SEO keyword research

Model: Gemini (strong at web research and long-context analysis)
Channel: Telegram (responds to @marketing)

Daily tasks:
- 10:00 AM: Surface 3 content ideas based on trending topics
- Monitor competitor Reddit/X mentions daily
- Weekly content calendar draft
```

### Agent 4: Dev Agent

```text
## SOUL.md — Dev Agent

You are the dev agent. Precise, thorough, security-conscious.

Responsibilities:
- Coding and architecture decisions
- Code review and quality checks
- Bug investigation and fixing
- Technical documentation

Model: Claude Opus / Codex (for implementation)
Channel: Telegram (responds to @dev)

Daily tasks:
- Check CI/CD pipeline health
- Review open PRs
- Flag technical debt items
```

## Skills You Need

- `telegram` skill for the shared control interface
- `sessions_spawn` / `sessions_send` for multi-agent coordination
- Shared file system or note-taking tool for team memory
- Individual API keys for different model providers (if using mixed models)
- A VPS or always-on machine to run the agents

## How to Set It Up

### 1. Shared Memory Structure

```text
team/
├── GOALS.md           # Current OKRs and priorities (all agents read)
├── DECISIONS.md       # Key decisions log (append-only)
├── PROJECT_STATUS.md  # Current project state (updated by all)
├── agents/
│   ├── milo/          # Milo's private context and notes
│   ├── josh/          # Josh's private context
│   ├── marketing/     # Marketing agent's research
│   └── dev/           # Dev agent's technical notes
```

### 2. Telegram Routing

Configure a single Telegram group where all agents listen, but each responds only when tagged:

```text
## AGENTS.md — Telegram Routing

Telegram group: "Team"

Routing:
- @milo → Strategy agent (spawns/resumes milo session)
- @josh → Business agent (spawns/resumes josh session)
- @marketing → Marketing agent (spawns/resumes marketing session)
- @dev → Dev agent (spawns/resumes dev session)
- @all → Broadcast to all agents
- No tag → Milo (team lead) handles by default

Each agent:
1. Reads shared GOALS.md and PROJECT_STATUS.md for context
2. Reads its own private notes
3. Processes the message
4. Responds in Telegram
5. Updates shared files if the response involves a decision or status change
```

### 3. Scheduled Tasks

```text
## HEARTBEAT.md — Team Schedule

Daily:
- 8:00 AM: Milo posts morning standup (aggregates overnight agent activity)
- 9:00 AM: Josh pulls key metrics
- 10:00 AM: Marketing surfaces content ideas from trending topics
- 6:00 PM: Milo posts end-of-day recap

Ongoing:
- Dev: Monitor CI/CD health, review PRs as they come in
- Marketing: Reddit/X keyword monitoring (every 2 hours)
- Josh: Competitor pricing checks (weekly)

Weekly:
- Monday: Milo drafts weekly priorities (input from all agents)
- Friday: Josh compiles weekly metrics report
```

## Key Insights

- **Personality matters more than you'd think**: Giving agents distinct names and communication styles makes it natural to "talk to your team" rather than wrestle with a generic AI
- **Shared memory + private context**: The combination is critical — agents need common ground (goals, decisions) but also their own space to accumulate domain expertise
- **Right model for the right job**: Don't use an expensive reasoning model for keyword monitoring. Match model capability to task complexity
- **Scheduled tasks are the flywheel**: The real value emerges when agents proactively surface insights, not just when you ask
- **Start with 2, not 4**: Begin with a lead + one specialist, then add agents as you identify bottlenecks

## Inspired By

This pattern was described by [Trebuh on X](https://x.com/iamtrebuh/status/2011260468975771862), a solo founder who set up 4 OpenClaw agents — Milo (strategy lead), Josh (business), a marketing agent, and a dev agent — all controlled through a single Telegram chat on a VPS. Each agent has its own personality, model, and scheduled tasks, while sharing project memory. He described it as "a real small team available 24/7."

The pattern was also confirmed on the [OpenClaw Showcase](https://openclaw.ai/showcase), where `@jdrhyne` reported running "15+ agents, 3 machines, 1 Discord server — IT built most of this, just by chatting," and `@nateliason` described a multi-model pipeline (prototype → summarize → optimize → implement → repeat) using different models at each stage. Another user, `@danpeguine`, runs two different OpenClaw instances collaborating in the same WhatsApp group.

## Related Links

- [OpenClaw Subagent Documentation](https://github.com/openclaw/openclaw)
- [OpenClaw Telegram Skill](https://github.com/openclaw/openclaw)
- [OpenClaw Showcase](https://openclaw.ai/showcase)
- [Anthropic: Building Effective Agents](https://www.anthropic.com/research/building-effective-agents)
