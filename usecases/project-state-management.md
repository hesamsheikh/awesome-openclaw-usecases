# Project State Management System: Event-Driven Alternative to Kanban

Traditional Kanban boards are static and require manual updates. You forget to move cards, lose context between sessions, and can't track the "why" behind state changes. Projects drift without clear visibility.

This workflow replaces Kanban with an event-driven system that tracks project state automatically:

• Stores project state in a database with full history
• Captures context: decisions, blockers, next steps, key insights
• Event-driven updates: "Just finished X, blocked on Y" → automatic state transition
• Natural language queries: "What's the status of [project]?", "Why did we pivot on [feature]?"
• Daily standup summaries: What happened yesterday, what's planned today, what's blocked
• Git integration: links commits to project events for traceability

## Pain Point

Kanban boards become stale. You waste time updating cards instead of doing work. Context gets lost—three months later, you can't remember why you made a key decision. There's no automatic link between code changes and project progress.

## What It Does

Instead of dragging cards, you chat with your assistant: "Finished the auth flow, starting on the dashboard." The system logs the event, updates project state, and preserves context. When you ask "Where are we on the dashboard?" it gives you the full story: what's done, what's next, what's blocking you, and why.

Git commits are automatically scanned and linked to projects. Your daily standup summary writes itself.

## Skills Needed

- `postgres` or SQLite for project state database
- `github` (gh CLI) for commit tracking
- Discord or Telegram for updates and queries
- Cron jobs for daily summaries
- Sub-agents for parallel project analysis

## How to Set it Up

1. Set up a project state database:
```sql
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE,
  status TEXT, -- e.g., "active", "blocked", "completed"
  current_phase TEXT,
  last_update TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id),
  event_type TEXT, -- e.g., "progress", "blocker", "decision", "pivot"
  description TEXT,
  context TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE blockers (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id),
  blocker_text TEXT,
  status TEXT DEFAULT 'open', -- "open", "resolved"
  created_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);
```

2. Create a Discord channel for project updates (e.g., #project-state).

3. Prompt OpenClaw:
```text
You are my project state manager. Instead of Kanban, I'll tell you what I'm working on conversationally.

When I say things like:
- "Finished [task]" → log a "progress" event, update project state
- "Blocked on [issue]" → create a blocker entry, update project status to "blocked"
- "Starting [new task]" → log a "progress" event, update current phase
- "Decided to [decision]" → log a "decision" event with full context
- "Pivoting to [new approach]" → log a "pivot" event with reasoning

When I ask:
- "What's the status of [project]?" → fetch latest events, blockers, and current phase
- "Why did we decide [X]?" → search events for decision context
- "What's blocking us?" → list all open blockers across projects

Every morning at 9 AM, run a cron job to:
1. Scan git commits from the past 24 hours (via gh CLI)
2. Link commits to projects based on branch names or commit messages
3. Post a daily standup summary to Discord #project-state:
   - What happened yesterday (events + commits)
   - What's planned today (based on current phase and recent conversations)
   - What's blocked (open blockers)

When I'm planning a sprint, spawn a sub-agent to analyze each project's state and suggest priorities.
```

4. Integrate with your workflow: Just talk to your assistant naturally about what you're doing. The system captures everything.

## Related Links

- [Event Sourcing Pattern](https://martinfowler.com/eaaDev/EventSourcing.html)
- [Why Kanban Fails for Solo Developers](https://blog.nuclino.com/why-kanban-doesnt-work-for-me)
