# Warm Cache & Continuous Presence

Your agent forgets the last session. Not the big things — `MEMORY.md` covers those — but the
small, urgent ones: what you were mid-way through, which task is still open, what was decided
yesterday at 2 a.m. and why. So every morning opens with you re-explaining your own life.

This use case gives an OpenClaw agent a **warm cache** — a small file it writes at the end of
a substantive session and reads at the start of the next one — plus a **living loop** that
lets it know when you last spoke and, carefully, write first.

## Pain Point

Long-term memory files are curated: they hold what matters forever. They do not hold "we
stopped halfway through the nginx config and the service is down". Context continuity and
memory are different problems, and OpenClaw ships with a good answer to the second one.

The symptoms are familiar:

- You re-explain the same unfinished task every session.
- The agent asks "what would you like to work on?" while three tasks are open.
- It cannot tell whether it spoke to you an hour ago or three days ago.
- Proactive check-ins either never happen or arrive at 3 a.m.

## What It Does

Four layers, each cheap and independently useful:

1. **Session cache** — `memory/session-cache/YYYY-MM-DD-HHMM.md`, written by the agent at the
   end of substantive sessions: open `[ ]` tasks, decisions and their rationale, context for
   the next session. Frontmatter carries `importance: critical | important | routine`; a
   digest script injects `critical` for 14 days, `important` for 7, and never `routine`.
2. **Raw session dumps** — OpenClaw's built-in `session-memory` hook writes the last ~15
   messages to `memory/YYYY-MM-DD-HHMM.md` on `/new` or auto-rollover. This is "what was
   said", as opposed to the cache's "what to do next".
3. **Semantic index** — a ChromaDB collection over both layers, refreshed by a nightly
   idempotent job that skips files whose `mtime` has not changed. Answers "what did we decide
   about the cache TTL?" from six weeks ago.
4. **Living loop** — an append-only `memory/stream/YYYY-MM-DD.jsonl`, a
   `memory/live/MEMORY.md` injected at bootstrap, a `memory/people/<name>.md` note on how the
   user actually communicates, and a presence watcher: a cron job whose **condition script**
   returns `fire` only when the user has been silent for more than three hours, it is outside
   the night window, and no ping went out in the last three hours. Quiet cycles cost no model
   call at all.

The result: a new session starts with "here is the open task from last night, and here is why
we chose that approach", and the agent occasionally says something first — with a gate that
keeps it from being a notification machine.

## Skills You Need

- No external services. A `session-memory` internal hook (bundled with OpenClaw) and Python
  3.10+ for the scripts.
- ChromaDB only for layers 3–4; layers 1–2 need nothing but the filesystem.
- Optional: Tailscale (or any private network) if several agents should share one index.

## How to Set It Up

1. Create the cache directory and let the agent write to it:

```bash
mkdir -p ~/.openclaw/workspace/memory/session-cache
```

2. Add startup reading to `AGENTS.md`, between daily notes and `MEMORY.md`:

```markdown
3.5. Run `python3 scripts/session-cache-digest.py` — it prints open `[ ]` tasks from cache
     files still inside their importance window. Session-cache is a hint, not truth: if it
     contradicts a config or a file, verify and fix the cache.
```

3. Enable the built-in raw dump:

```bash
openclaw hooks enable session-memory
```

4. Ask the agent to write a cache file at the end of the current session:

```text
Before we finish, write memory/session-cache/2026-11-07-2210.md: what is unfinished,
what we decided and why, and what the next session should do first. Mark it important.
```

5. (Optional) Add the vector layer and the presence watcher — the full procedure, hook code
   and automation payloads are in the companion skill (`warm-cache-setup`, section
   "Living loop").

## What We Learned

- **The cache must be a hint, not truth.** An agent that confidently repeats a stale cache is
  worse than one that re-checks the config.
- **Importance windows beat "last N files".** Without TTL, startup slowly fills with resolved
  notes and burns context on nothing.
- **Proactivity needs a gate that runs before the model.** Ours is a small Node script
  returning `fire: false` — silence, night hours and ping spacing are all decided without a
  single token spent.
- **Silence is a feature.** A watcher that has nothing to say must return `NO_REPLY` and
  suppress delivery. A "checking in!" message with no content teaches the user to ignore it.
- **Separate "what was said" from "what to do next".** Two files, two purposes, no drift.

Tested and running continuously on a personal OpenClaw deployment since November 2026
(single user, three agents, one shared ChromaDB index over a private network).

Also verified on a fresh profile on 2026-11-07: steps 1–6 and Phase 4 were reproduced from
an empty workspace, with the observed output recorded in
[CLEANRUN-2026-11-07.md](https://github.com/port338/warm-cache-continuity/blob/main/CLEANRUN-2026-11-07.md).
Two parts stay unverified on a clean profile — ChromaDB (needs an external service) and the
living loop (needs the extra plugin, automations and a model provider).

## Related Links

- Full package (MIT): [port338/warm-cache-continuity](https://github.com/port338/warm-cache-continuity) — the `warm-cache-setup` skill, `references/living-loop.md` and seven scripts
- Companion skill: `warm-cache-setup` (SKILL.md + `references/living-loop.md`)
- OpenClaw hooks: `openclaw hooks list`, `openclaw hooks info session-memory`
- Related but different: semantic search over memory files, project-state databases, habit
  trackers. Those answer "find an old fact", "track a project", "nudge a habit" — this one
  answers "where were we, and should I speak first".
