# Multi-Agent Editorial Newsroom

You want to produce a steady stream of written content (news digests, opinion pieces, technical posts) but you're one person. Hiring an editorial team is expensive. What if a chat room of specialized AI agents could draft, critique, and publish on its own — with you only weighing in on what ships?

This use case sets up a small editorial newsroom inside an OpenClaw group chat: writers draft, a critic tears apart slop, a judge decides what goes out. We've run versions of this with anywhere from 3 agents to 200+ — the smaller versions are more practical.

## What It Does

- **Writer agents** (3-10 of them, each with a distinct personality/voice) — when a topic enters the chat, multiple writers draft an angle on it
- **Critic agent** — reads each draft and posts blunt feedback. The critic's job is to catch AI slop, weak claims, and filler
- **Judge agent** — final gatekeeper. Reads the critic's feedback and the draft, decides: ship, revise, or kill
- The judge's "ship" verdict triggers publish (to a Discord channel, RSS feed, blog, etc.)

The whole thing runs as a group chat, not a pipeline. Writers see each other's drafts, critic sees writers' reactions, judge sees everything. Coordination happens through the chat itself.

## Pain Point

A pipeline-based content workflow (research → write → review → publish) is rigid. If a writer's draft is bad, the pipeline still pushes it forward — only the reviewer catches it, and only at the end. Group-chat coordination lets quality control happen continuously: the critic intervenes mid-draft, writers self-correct after seeing the critic's previous verdicts, and the judge gets to compare multiple drafts on the same topic before picking one.

The cost is more total messages and more tokens. The benefit is higher final quality and writers that genuinely improve over time as they internalize the critic's standards.

## Skills You Need

- A group chat (Discord works well, Telegram supergroup also fine)
- `sessions_spawn` / `sessions_send` to put multiple agents in one room
- A token budget skill to cap group spend (this is non-negotiable past ~5 agents — see "Failure modes" below)
- [kinthai-self-improving-user](https://github.com/kinthaiofficial/kinthai-self-improving-user) (optional but useful — gives each writer agent a per-context learning store so they remember what the critic taught them)

## How to Set It Up

1. Create a group chat. For Discord: `#newsroom`. For Telegram: a supergroup.

2. Define agent SOULs. Three roles, distinct personalities. Sketch:

   **Writer (×3-10)** — Each writer has a voice (analytical, narrative, contrarian, etc.). SOUL.md essentials:
   ```
   You are a writer in an editorial newsroom group chat.
   When a topic is introduced, draft a 200-400 word piece on it.
   You can see other writers' drafts and the critic's verdicts.
   Improve based on the critic's previous feedback.
   ```

   **Critic** — One critic, separate context window from the writers (this is structural — see "Failure modes"):
   ```
   You read drafts in this group chat and respond with blunt critique.
   Catch AI slop (vague claims, filler words, hedge language).
   Be specific: "Paragraph 2 says nothing" beats "needs work".
   Your goal is to make the writers better, not to be liked.
   ```

   **Judge** — One judge, final gatekeeper:
   ```
   You decide what ships. Read drafts and the critic's feedback.
   Verdicts: SHIP / REVISE / KILL.
   You can compare multiple drafts on the same topic and pick the best.
   On SHIP, post the final draft to {publish-target}.
   ```

3. Spawn agents into the group via `sessions_spawn`. Most OpenClaw deployments cap concurrent sessions per gateway — start with 5 writers + 1 critic + 1 judge = 7 total, scale up only if needed.

4. Set a group-level token budget. **Don't** set per-agent budgets — they don't bound group spend. With 7 agents, a group budget of ~50K tokens/hour is reasonable to start; raise once you see whether your topic mix burns more or less.

5. Drop a topic into the chat:
   ```
   Topic: <your topic here>
   Writers: 200-400 words. Critic: review the most recent draft.
   Judge: pick a winner once you have at least 3 drafts.
   ```

## Failure Modes (and Fixes)

These all bite at scale; better to know up front:

- **The critic gets soft.** If the critic operates in the same context as the writers, it gets pulled into the social dynamic and softens over time. **Fix:** the critic must run on a separate context window — it can see drafts but not the writers' real-time reactions to its previous critiques. (More on this in [this writeup of running the same architecture at 221 agents](https://blog.kinthai.ai/221-agents-multi-agent-coordination-lessons).)

- **Politeness loops.** Two writers will sometimes get into "no, after you" deference loops. **Fix:** dispatcher timeout — force a decision after N seconds.

- **Topic drift.** A strong opinion from one writer pulls the room off-topic. **Fix:** a periodic "topic anchor" reminder from the judge.

- **Token-budget runaway.** Per-agent budgets don't bound group spend. **Fix:** group-level budget, dispatcher backs off as cap approaches.

## Related Links

- [221 AI agents in one chat — engineering postmortem](https://blog.kinthai.ai/221-agents-multi-agent-coordination-lessons) — same architecture at much larger scale
- [`kinthai-self-improving-user`](https://github.com/kinthaiofficial/kinthai-self-improving-user) — open-source skill for per-context learning, useful for writer agents that should remember the critic's standards
- [OpenClaw `sessions_spawn` docs](https://docs.openclaw.ai) — for the multi-agent setup
