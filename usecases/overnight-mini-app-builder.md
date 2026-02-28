# Goal-Driven Autonomous Tasks

Your AI agent is powerful but reactive — it only works when you tell it what to do. What if it knew your goals and proactively came up with tasks to move you closer to them every single day, without being asked?

This workflow turns OpenClaw into a self-directed employee. You brain dump your goals once, and the agent autonomously generates, schedules, and completes tasks that advance those goals — including building you surprise mini-apps overnight.

## What It Does

- You brain dump all your goals, missions, and objectives into OpenClaw (personal and professional)
- Every morning, the agent generates 4-5 tasks it can complete autonomously on your computer
- Tasks go beyond app building: research, writing scripts, building features, creating content, analyzing competitors
- The agent executes the tasks itself and tracks them on a custom Kanban board it builds for you
- You can also have it build you a surprise mini-app every night — a new SaaS idea, a tool that automates a boring part of your life, shipped as an MVP

## Pain Point

Most people have big goals but struggle to break them into daily actionable steps. And even when they do, execution takes all their time. This system offloads both the planning AND the execution to your AI agent. You define the destination; the agent figures out the daily steps and walks them.

## Skills You Need

- Telegram or Discord integration
- `sessions_spawn` / `sessions_send` for autonomous task execution
- Next.js or similar (for the Kanban board — OpenClaw builds it for you)

## How to Set It Up

### Step 1: Brain Dump Your Goals

This is the most important step. Text your OpenClaw everything you're trying to accomplish:

```text
Here are my goals and missions. Remember all of this:

Career:
- Grow my YouTube channel to 100k subscribers
- Launch my SaaS product by Q3
- Build a community around AI education

Personal:
- Read 2 books per month
- Learn Spanish

Business:
- Scale revenue to $10k/month
- Build partnerships with 5 companies in my space
- Automate as much of my workflow as possible

Use this context for everything you do going forward.
```

### Step 2: Set Up Autonomous Daily Tasks

```text
Every morning at 8:00 AM, come up with 4-5 tasks that you can complete
on my computer today that bring me closer to my goals.

Then schedule and complete those tasks yourself. Examples:
- Research competitors and write analysis reports
- Draft video scripts based on trending topics
- Build new features for my apps
- Write and schedule social media content
- Research potential business partnerships
- Build me a surprise mini-app MVP that gets me closer to one of my goals

Track all tasks on a Kanban board. Update the board as you complete them.
```

### Step 3: Build the Kanban Board (Optional)

```text
Build me a Kanban board in Next.js where I can see all the tasks you're
working on. Show columns for To Do, In Progress, and Done. Update it
in real-time as you complete tasks.
```

## Key Insights

- The **brain dump is everything**. The more context you give about your goals, the better the agent's daily tasks will be. Don't hold back.
- The agent discovers tasks you wouldn't have thought of. It connects dots across your goals and finds opportunities you'd miss.
- The Kanban board turns your agent into a trackable employee. You can see exactly what it's been doing and course-correct.
- For overnight app building specifically: explicitly tell it to build MVPs and not to overcomplicate. You'll wake up every morning with a new surprise.
- This compounds over time — the agent learns what kinds of tasks are most helpful and adjusts.

## Pitfalls & Patterns (Learned in Production)

### ⚠️ Race Condition: Sub-Agents Editing Shared Files

When you run this workflow with sub-agents, both the main session and spawned sub-agents may try to update the same task file (e.g., your Kanban/AUTONOMOUS.md). This causes silent failures.

**Why it happens:** OpenClaw's `edit` tool requires an exact `oldText` match. If a sub-agent updates a line between the time your main session reads the file and tries to edit it, the text no longer matches — the edit silently fails.

**The fix: split your task file into two roles:**

1. **`AUTONOMOUS.md`** — stays small and clean. Contains only goals + open backlog. Only the main session touches this. Sub-agents never edit it.

2. **`memory/tasks-log.md`** — append-only log. Sub-agents only ever *add new lines at the bottom*. Never edit existing lines.

```markdown
# tasks-log.md — Completed Tasks (append-only)
# Sub-agents: always append to the END. Never edit existing lines.

### 2026-02-24
- ✅ TASK-001: Research competitors → research/competitors.md
- ✅ TASK-002: Draft blog post → drafts/post-1.md
```

This pattern is borrowed from Git's commit log: you never rewrite history, you only add new commits. It eliminates race conditions entirely and has a bonus: `AUTONOMOUS.md` stays small, so it costs fewer tokens every time it's loaded in a heartbeat.

**Rule to give your agent:** In sub-agent spawn instructions, always include:
> "When done, append a ✅ line to `memory/tasks-log.md`. Never edit `AUTONOMOUS.md` directly."

### 💡 Keep AUTONOMOUS.md Token-Light

The task tracking file gets loaded on every heartbeat poll. If it grows unbounded with completed tasks, you'll burn tokens unnecessarily. 

Keep `AUTONOMOUS.md` under ~50 lines: goals (one-liners) + open backlog only. Archive everything completed to a separate file that is only read on-demand.

## Based On

Inspired by [Alex Finn](https://www.youtube.com/watch?v=UTCi_q6iuCM&t=414s) and his [video on life-changing OpenClaw use cases](https://www.youtube.com/watch?v=41_TNGDDnfQ).

## Related Links

- [OpenClaw Memory System](https://github.com/openclaw/openclaw)
- [OpenClaw Subagent Docs](https://github.com/openclaw/openclaw)
