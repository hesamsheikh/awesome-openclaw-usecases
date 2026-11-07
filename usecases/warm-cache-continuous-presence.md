# Warm Cache & Continuous Presence

Your agent forgets the last session. Not the big things — `MEMORY.md` covers those — but the
small, urgent ones: what you were mid-way through, which task is still open, what was decided
yesterday at 2 a.m. and why. So every morning opens with you re-explaining your own life.

This use case gives an OpenClaw agent a **warm cache** — a small, tagged file it writes at the
end of a substantive session and reads at the start of the next one — plus a **living loop** that
lets it know when you last spoke and, carefully, write first. Silence is a first-class outcome:
the gate that decides whether to speak is a script, so a quiet cycle costs no model call at all.

## Pain Point

Long-term memory files are curated: they hold what matters forever. They do not hold "we
stopped halfway through the nginx config and the service is down". Context continuity and
memory are different problems, and OpenClaw ships with a good answer to the second one.

The symptoms are familiar:

- You re-explain the same unfinished task every session.
- The agent asks "what would you like to work on?" while three tasks are open.
- It cannot tell whether it spoke to you an hour ago or three days ago.
- Proactive check-ins either never happen or arrive at 3 a.m.

A bigger context window fixes none of this. A window is a budget you pay on every turn, and it
fills with whatever was said last, not with what is still open.

## What It Does

Five layers, each cheap and independently useful — you can run only the first one forever and
still get value.

1. **Curated session cache** — `memory/session-cache/YYYY-MM-DD-HHMM.md`, written by the agent at
   the end of substantive sessions: open `[ ]` tasks, decisions **and their rationale**, context
   for the next session. Frontmatter carries `importance: critical | important | routine`;
   `critical` is injected for 14 days, `important` for 7, `routine` never — it stays searchable
   only. The filename sorts chronologically, so the reader needs no index to find the newest
   files.

2. **Raw session dumps** — OpenClaw's built-in `session-memory` hook writes the last ~15 messages
   to `memory/YYYY-MM-DD-HHMM.md` on `/new`, `/reset` or an automatic rollover. This is "what was
   said", as opposed to the cache's "what to do next". The two layers are deliberately not
   merged: mixing them is the usual reason memory files rot.

3. **Semantic index** — a ChromaDB collection over both layers, refreshed by a nightly idempotent
   job that skips files whose `mtime` has not changed. Answers "what did we decide about the
   cache TTL?" from six weeks ago, which no startup window can do. Remote agents do not install
   `chromadb` at all: they call a ~60-line HTTP proxy on the host that already has it, using
   plain `urllib`. (Two hard reasons: numpy needs `X86_V2` instructions that small VPS CPUs lack,
   and the v2 REST API wants `query_embeddings`, not `query_texts`.)

4. **Importance digest at startup** — a Python script prints exactly the cache files still inside
   their TTL window, with their open tasks. Replacing "read the last 3–5 files" with this is what
   keeps startup cost flat as history grows.

5. **Living loop** — an append-only `memory/stream/YYYY-MM-DD.jsonl` written by a hook on every
   message, a `memory/live/MEMORY.md` injected at bootstrap, a `memory/people/<name>.md` note on
   how the user actually communicates, and a presence watcher. The watcher is a cron job whose
   **condition script** returns `fire` only when the user has been silent for more than three
   hours, it is outside the night window (22:00–07:00 on weekdays, 22:00–10:00 on weekends and
   Russian public holidays), and no ping went out in the last three hours. A three-day
   consolidation job folds the stream back into the cache.

The result: a new session starts with "here is the open task from last night, and here is why we
chose that approach", and the agent occasionally says something first — with a gate that keeps it
from being a notification machine.

## Skills You Need

- No external services for layers 1, 2 and 4: Python 3.10+ and the filesystem.
- `session-memory` — an internal hook bundled with OpenClaw. Enable it with one command.
- Layer 3 needs a ChromaDB container (any host); layer 5 needs the `automations` scheduler plus a
  chat channel to deliver to. Layer 5's stream hook is ~60 lines of JavaScript.
- Optional: Tailscale (or any private network) if several agents should share one index.

## How to Set It Up

The full procedure is a skill, not an essay — every step has a command and a check, plus 29
documented pitfalls at the end. Minimum viable path first:

**1. Create the cache directory and write the first file.**

```bash
mkdir -p ~/.openclaw/workspace/memory/session-cache
```

```markdown
---
importance: critical
date: 2026-11-07
open_tasks: 2
---
## Open
- [ ] Start nginx on staging after the 04:00 certificate renewal — service is stopped on purpose
- [ ] Decide where the backup key lives

## Decisions
- No restart before the renewal: two changes in one window make rollback ambiguous.
```

**2. Wire startup reading into `AGENTS.md`,** between daily notes and `MEMORY.md`:

```markdown
3.5. Run `python3 scripts/session-cache-digest.py` — it prints open `[ ]` tasks from cache
     files still inside their importance window. Session-cache is a hint, not truth: if it
     contradicts a config or a file, verify and fix the cache.
```

A brand-new workspace has no `AGENTS.md`; create it with a `## Session Startup` section first,
or the line has nowhere to go.

**3. Enable the built-in raw dump:**

```bash
openclaw hooks enable session-memory
```

Check it actually fires: send `/new` in a safe conversation and confirm a new `memory/*.md` file
appears and the log says `Session context saved to`. `openclaw hooks list` showing "ready" proves
nothing on its own.

**4. Ask the agent to write a cache at the end of the current session:**

```text
Before we finish, write memory/session-cache/2026-11-07-2210.md: what is unfinished, what we
decided and why, and what the next session should do first. Mark it critical.
```

**5. (Optional) Add the vector layer and the presence watcher** — the full procedure, hook code,
systemd unit, indexer and automation payloads live in the companion skill (`warm-cache-setup`:
`SKILL.md`, `references/living-loop.md`, seven scripts).

## What It Looks Like in Practice

**Recovering an interrupted task.** A config change is half-applied and the service is stopped on
purpose; the session ends without a closing message. Next morning the digest prints the
`critical` file and the agent opens with:

> Yesterday we stopped after editing the upstream block on staging. `nginx -t` passed, but the
> service is still stopped: we were waiting for the 04:00 certificate renewal so a rollback would
> be unambiguous. It renewed at 04:03. Shall I start the service and watch the error log?

The task text alone would not produce that message. The **reason** in the cache is what stops the
agent from doing the one thing the previous session decided against.

**A decision from six weeks ago.** The file expired from the startup window, so the agent uses
the index:

```bash
python3 session_search.py "importance TTL days"
```

> Found in `2026-09-24-2310` (`importance: critical`): TTL was set to 14 days for critical, 7 for
> important, and routine is never injected — so startup stops growing with history.

TTL keeps startup cheap; the index keeps old decisions findable. Removing either half breaks the
other.

**A quiet hour.** The gate runs every 20 minutes and returns `{"fire":false}` without waking a
model when the user is asleep, recently pinged, or simply active. Silence here is a pass, and the
correct behaviour is `NO_REPLY` with delivery suppressed — a content-free "checking in! 👋" is
the failure mode, not the goal.

## How to Verify It Works

| Check | Expected |
|---|---|
| `ls -la memory/session-cache/` | newest file is from the last substantive session |
| `python3 scripts/session-cache-digest.py` | open task count matches what you know is open |
| `grep -c "3.5" AGENTS.md` | exactly `1` — two means the block was inserted twice |
| `/new`, then `ls -t memory/*.md \| head -1` | a fresh dump, and `Session context saved to` in the log |
| index twice | second run reports `added=0 updated=0 unchanged=N` |
| gate in a sandbox at 23:10 MSK | `{"fire":false}`; at 14:00 with 4 h of silence, `{"fire":true}` |
| new session, unprompted | the unfinished task is named, not a generic greeting |

Point the gate at a sandbox `OPENCLAW_WORKSPACE` when testing. A `--now` run against the live
workspace reads the live silence file, so a fire/quiet result proves nothing about the window.

## What We Learned

- **The cache must be a hint, not truth.** An agent that confidently repeats a stale cache is
  worse than one that re-checks the config.
- **Importance windows beat "last N files".** Without TTL, startup slowly fills with resolved
  notes and burns context on nothing.
- **Proactivity needs a gate that runs before the model.** Ours is a small Node script returning
  `fire:false`; silence, night hours and ping spacing are all decided without a single token.
- **Silence is a feature.** A watcher with nothing to say must return `NO_REPLY` and suppress
  delivery, or it teaches the user to ignore every future ping.
- **Separate "what was said" from "what to do next".** Two files, two purposes, no drift.
- **Most of this fails silently.** A hook that skips a file with an unexpected basename, an
  injected state file that must be called `MEMORY.md`, a name comparison that misses a Latin `A`
  inside Cyrillic — none of them throw. Hence the pitfall list.

Verified on a fresh profile on 2026-11-07: steps 1–6 and the importance digest were reproduced
from an empty workspace, with observed output recorded in
[CLEANRUN-2026-11-07.md](https://github.com/port338/warm-cache-continuity/blob/main/CLEANRUN-2026-11-07.md).
Two parts stay unverified on a clean profile — ChromaDB (needs an external service) and the
living loop (needs the extra plugin, automations and a model provider). Otherwise tested and
running continuously on a personal OpenClaw deployment since November 2026 (single user, three
agents, one shared ChromaDB index over a private network).

## Related Links

- Full package (MIT): [port338/warm-cache-continuity](https://github.com/port338/warm-cache-continuity) — the `warm-cache-setup` skill, `references/living-loop.md`, seven scripts and the clean-install report
- Companion skill: `warm-cache-setup` (`SKILL.md` + `references/living-loop.md`)
- OpenClaw hooks: `openclaw hooks list`, `openclaw hooks info session-memory`
- Related but different: semantic search over memory files, project-state databases, habit
  trackers. Those answer "find an old fact", "track a project", "nudge a habit" — this one
  answers "where were we, and should I speak first".
