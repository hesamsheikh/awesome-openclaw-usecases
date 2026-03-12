# Deep Research Orchestrator

You're already paying for Claude, ChatGPT, and Gemini subscriptions. Each has a "deep research" mode. Running the same question through all three often gives the best result — one might find a critical source the others missed, one might overthink while another nails the straightforward answer, or two might agree on something the third got wrong. But doing this manually — copying the same prompt between tabs, waiting, then reading and cross-referencing three long reports — is tedious enough that you stop doing it, even when the mixed result would clearly be better.

## One sentence in, three providers deep researching, one verified answer out

This workflow automates it into one conversation:

1. You tell OpenClaw what you want to research
2. OpenClaw searches the topic, asks you a few clarifying questions
3. Generates a focused research prompt, shows it to you for approval
4. Fans it out to Claude, ChatGPT, and Gemini deep research via browser relay
5. Collects all three results and synthesizes a single cross-referenced conclusion

No API keys · No dependencies · Your existing subscriptions via browser relay

## Pain Point

Multi-provider deep research gives better results than any single provider alone, but the manual process — open three tabs, paste the same prompt into each, wait, then read and cross-reference three long reports — is so tedious that you just don't do it. You default to one provider even though you know the combined result would be better.

## Skills You Need

- [OpenClaw Browser Tool](https://docs.openclaw.ai/tools/browser) — browser control via the Chrome extension relay
- [OpenClaw Chrome Extension](https://docs.openclaw.ai/tools/chrome-extension) — connects OpenClaw to your browser tabs

Use a dedicated Chrome profile for the relay — don't attach to your daily-driver profile. Log into Claude, ChatGPT, and Gemini in that profile once before your first run.

## How to Set It Up

1. Set up the OpenClaw Chrome extension relay following the [Chrome extension guide](https://docs.openclaw.ai/tools/chrome-extension).

2. Log into Claude, ChatGPT, and Gemini in your dedicated Chrome profile.

3. Give OpenClaw the following system instructions. Use a strong model (Opus-tier) — it needs to search the web, ask good questions, generate a tight prompt, drive the browser, and synthesize results all in one session.

```text
You are a deep research orchestrator. When the user gives you a research topic:

PHASE 1 — UNDERSTAND THE TOPIC
- Search the web briefly to understand the current landscape of the topic
- Based on what you find, ask the user 3-4 clarifying questions: scope, geography, timeline, intended use, what angle matters most to them
- Wait for their answers before proceeding

PHASE 2 — GENERATE THE RESEARCH PROMPT
Using the user's answers, generate a focused deep research prompt. Rules:
- The prompt = ONLY the research question + 3-5 sub-questions
- Maximum 300 words
- NEVER include methodology, source types, expected sections, quality checks, structure guidance, or deliverable format
- NEVER tell the research agent HOW to research — only WHAT to research
- Include this instruction: "Write all sources inline as plain text (Source Name - URL), not clickable links"
- End with: DON'T FORGET THIS IS A DEEP RESEARCH. NEVER LIMIT WEB SEARCH TO AVOID SPENDING TOKENS. RESEARCH PROPERLY WITHOUT TRYING TO OPTIMIZE TOKEN SPENDING
- Show the prompt to the user for approval before proceeding

PHASE 3 — FAN OUT TO PROVIDERS
Generate a run ID at the start: {YYYYMMDD}-{HHMM}-{topic-slug} using current UTC time (e.g., 20260312-2350-ai-agent-frameworks). This is the directory name for the entire run. You will remember this in context for all subsequent steps.

Create ~/research-reports/{run-id}/ and start deep research in each provider one at a time (browser relay controls one tab at a time):
1. Open Claude (claude.ai), paste the prompt, start deep research
2. Open ChatGPT (chatgpt.com), paste the prompt, start deep research
3. Open Gemini (gemini.google.com), paste the prompt, start deep research

Then track and poll for completion:
- Before starting the first provider, write ~/research-reports/{run-id}/status.json with the run_id, started_at_utc, poll_cron_id (null), the approved prompt text, current phase ("starting"), and empty provider slots (status "pending", targetId null for each).
- After each provider is started, immediately update status.json with that provider's targetId. This way if the session is interrupted mid-startup, you keep the targetIds already collected.
- Once all three are started, update phase to "polling". status.json now contains ALL state needed to resume after interruption:
  {"run_id": "...", "started_at_utc": "...", "poll_cron_id": "...", "phase": "polling", "prompt": "...", "providers": {"claude": {"status": "pending", "targetId": "..."}, "chatgpt": {"status": "pending", "targetId": "..."}, "gemini": {"status": "pending", "targetId": "..."}}}
- This file is the source of truth. If the user sends a message, runs /compact, or context is lost for any reason, ALWAYS read status.json first to recover full state before continuing. If phase is "starting" and some providers have null targetIds, resume launching from where you left off using the saved prompt.

Schedule the polling via cron so it runs automatically in the main session (the user's chat), even if the user is idle or context is compacted:
- First check: `cron add --session main --at {now + 8 minutes ISO 8601} --system-event "Deep research poll: read ~/research-reports/{run-id}/status.json and check pending providers"`
  This one-shot cron auto-deletes after firing.
- When the first check fires: the agent wakes in the main session, reads status.json, checks each pending provider.
  If providers are still "pending": create a single recurring job:
  `cron add --session main --every 120000 --system-event "Deep research poll: read ~/research-reports/{run-id}/status.json and check pending providers"`
  Save the returned cron job ID to status.json as poll_cron_id.
- Every 2 minutes, the recurring cron wakes the agent in the main session. The user will see these check cycles in their chat.
- Once all providers are "done" or "partial": `cron remove {poll_cron_id}` and proceed to Phase 4.

On each check cycle (triggered by cron):
  1. Read status.json to get current state
  2. For each provider still "pending": focus its tab by targetId, take a snapshot, check if the research response is fully visible with no loading indicator
  3. If done: save output to ~/research-reports/{run-id}/{provider}.md, update status in status.json to "done"
  4. If still running: leave as "pending"
  5. If "pending" for more than 30 minutes (compare current UTC to started_at_utc): save partial output, mark "partial" in status.json
- Once all providers are "done" or "partial", proceed to Phase 4

PHASE 4 — SYNTHESIZE
Read all three saved outputs. Produce:

A) Ultra-short TL;DR for each provider
- 2-4 bullets per provider
- Max ~12 words per bullet
- Format:

Claude - TL;DR
- ...

ChatGPT - TL;DR
- ...

Gemini - TL;DR
- ...

B) Final conclusion
- Compare where providers agree and differ
- Do quick web searches to verify any disputed claims
- Pick the conclusion best supported by current evidence
- Format:

Final conclusion (one short sentence):
- ...

Why this is the best conclusion (2-4 bullets):
- ...

Key disagreement across providers (optional, 1-3 bullets):
- ...

Add source URLs in parentheses where relevant.
No intro, no outro, no text outside this structure.
```

## Real World Example

See the [flow diagram](#flow-diagram) below for a complete walkthrough.

## Key Insights

- **Use a strong model (Opus-tier)** for the entire orchestration. It needs to search well, ask good clarifying questions, generate tight prompts, and synthesize large outputs. This is not a job for a fast/cheap model.
- **Don't skip the clarifying questions phase.** A scoped prompt gives you three excellent reports. A vague prompt gives you three mediocre ones.
- **status.json survives interruptions.** The polling phase can take 10-30 minutes. If you send messages, run /compact, or context gets trimmed, the agent recovers by reading status.json — all state (run ID, targetIds, timestamps, completion status) lives on disk, not in context.
- **Don't use sub-agents for polling.** You might consider spawning a sub-agent to handle the polling loop while the main agent stays free. But both would need browser access, and the browser relay controls one tab at a time — two agents fighting over tab focus will collide. Keep everything in the main agent with status.json as the recovery mechanism.
- **Browser relay conflicts.** If other sessions or agents are using the same Chrome relay profile while your research is running, they may steal tab focus mid-check or navigate away from a provider tab. Use a dedicated Chrome profile that only this workflow touches, and don't run other browser-dependent tasks during the polling phase.

## Terms of Service Notice

Browser automation that controls logged-in sessions may conflict with the Terms of Service of some platforms. Before using this workflow, review the ToS of each provider (Claude, ChatGPT, Gemini) to confirm automated browser interaction is permitted. If a provider's ToS prohibits automated access, do not use this method with that provider. You are solely responsible for compliance.

## Related Links

- [OpenClaw Browser Tool](https://docs.openclaw.ai/tools/browser)
- [OpenClaw Chrome Extension Guide](https://docs.openclaw.ai/tools/chrome-extension)
- [OpenClaw](https://github.com/openclaw/openclaw)

## Flow Diagram

```text
┌─────────────────────────────────────────────────────────┐
│                    USER MESSAGE                         │
│  "Deep research the current state of AI agent           │
│   frameworks for production use"                        │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│              PHASE 1 — UNDERSTAND                       │
│                                                         │
│  Main agent (Opus-tier) in single session               │
│                                                         │
│  1. web_search "AI agent frameworks production 2026"    │
│  2. Finds: OpenClaw, LangGraph, CrewAI, AutoGen, etc.   │
│  3. Asks user:                                          │
│     - Evaluating for a specific project or overview?    │
│     - Self-hosted only, or cloud-hosted too?            │
│     - Criteria: pricing, enterprise support, community? │
│     - Timeline: last 3 months, 6 months, or year?       │
│  4. Wait for user answers                               │
└─────────────────────┬───────────────────────────────────┘
                      │ user answers:
                      │ "General overview, both hosted options,
                      │  care about community size and docs
                      │  quality, last 6 months"
                      ▼
┌─────────────────────────────────────────────────────────┐
│           PHASE 2 — GENERATE PROMPT                     │
│                                                         │
│  Generates ≤300 word prompt, e.g.:                      │
│                                                         │
│  "What is the current state of AI agent frameworks      │
│   for production use as of early 2026?                  │
│   1. Which frameworks have the most active              │
│      communities and best documentation?                │
│   2. How do self-hosted vs cloud-hosted compare?        │
│   3. What changed in the last 6 months?                 │
│   4. Which are actually used in production vs demos?    │
│   ..."                                                  │
│                                                         │
│  Shows to user → user approves                          │
└─────────────────────┬───────────────────────────────────┘
                      │ user approves
                      ▼
┌─────────────────────────────────────────────────────────┐
│         PHASE 3a — START PROVIDERS                      │
│                                                         │
│  Generate run-id: 20260312-1430-ai-agent-frameworks     │
│  Create ~/research-reports/20260312-1430-ai-agent-      │
│         frameworks/                                     │
│                                                         │
│  Write status.json (empty provider slots):              │
│  {"run_id":"...","providers":{"claude":                 │
│   {"status":"pending","targetId":null},...}}            │
│                                                         │
│  ┌───────────────────────────────────────────┐          │
│  │ Browser relay (one tab at a time)         │          │
│  │                                           │          │
│  │  1. Focus Claude tab → paste prompt       │          │
│  │     → click deep research → start         │          │
│  │     → update status.json w/ targetId      │          │
│  │                                           │          │
│  │  2. Focus ChatGPT tab → paste prompt      │          │
│  │     → click deep research → start         │          │
│  │     → update status.json w/ targetId      │          │
│  │                                           │          │
│  │  3. Focus Gemini tab → paste prompt       │          │
│  │     → click deep research → start         │          │
│  │     → update status.json w/ targetId      │          │
│  └───────────────────────────────────────────┘          │
│                                                         │
│  Final status.json:                                     │
│  {                                                      │
│    "run_id": "20260312-1430-ai-agent-frameworks",       │
│    "started_at_utc": "2026-03-12T14:30:00Z",            │
│    "poll_cron_id": null,                                │
│    "providers": {                                       │
│      "claude":  {"status":"pending",                    │
│                  "targetId":"target-abc-123"},          │
│      "chatgpt": {"status":"pending",                    │
│                  "targetId":"target-def-456"},          │
│      "gemini":  {"status":"pending",                    │
│                  "targetId":"target-ghi-789"}           │
│    }                                                    │
│  }                                                      │
│                                                         │
│  Schedule first check:                                  │
│  cron add --session main                                │
│    --at "2026-03-12T14:38:00Z"                          │
│    --system-event "Deep research poll: read             │
│      ~/research-reports/20260312-1430-ai-agent-         │
│      frameworks/status.json and check pending"          │
│                                                         │
│  Tell user: "All three providers running. I'll check    │
│  back in 8 minutes. You can keep chatting."             │
└─────────────────────┬───────────────────────────────────┘
                      │
                      │  (user is free for 8 min)
                      │  (cron fires at 14:38 UTC)
                      ▼
┌─────────────────────────────────────────────────────────┐
│         PHASE 3b — CRON-DRIVEN POLL LOOP                │
│                                                         │
│  ┌────────────────────────────────────────────────┐     │
│  │  SCHEDULING (via OpenClaw cron tool)           │     │
│  │  All cron jobs run in --session main           │     │
│  │  (user's chat session, not isolated)           │     │
│  │                                                │     │
│  │  14:38 — one-shot cron fires (auto-deletes)    │     │
│  │    → agent wakes in main chat                  │     │
│  │    → runs first check cycle (see below)        │     │
│  │                                                │     │
│  │  Result: Claude done, ChatGPT/Gemini pending   │     │
│  │                                                │     │
│  │  → cron add --session main --every 120000      │     │
│  │    --system-event "Deep research poll: ..."    │     │
│  │  → save cron ID "cron-poll-xyz" to status.json │     │
│  │                                                │     │
│  │  14:40 — recurring cron fires                  │     │
│  │    → ChatGPT done, Gemini still pending        │     │
│  │                                                │     │
│  │  14:42 — recurring cron fires                  │     │
│  │    → Gemini done                               │     │
│  │    → cron remove "cron-poll-xyz"               │     │
│  │    → proceed to Phase 4                        │     │
│  └────────────────────────────────────────────────┘     │
│                                                         │
│  ┌────────────────────────────────────────────────┐     │
│  │              CHECK CYCLE                       │     │
│  │  (runs each time cron fires)                   │     │
│  │                                                │     │
│  │  1. Read status.json (source of truth)         │     │
│  │                                                │     │
│  │  2. For each provider where status="pending":  │     │
│  │     ┌──────────────────────────────────┐       │     │
│  │     │ Focus tab by targetId            │       │     │
│  │     │ Take snapshot                    │       │     │
│  │     │                                  │       │     │
│  │     │ Loading indicator visible?       │       │     │
│  │     │   YES → leave "pending"          │       │     │
│  │     │   NO  → response complete        │       │     │
│  │     │         save {provider}.md       │       │     │
│  │     │         update status → "done"   │       │     │
│  │     │                                  │       │     │
│  │     │ >30 min since started_at_utc?    │       │     │
│  │     │   YES → save partial output      │       │     │
│  │     │         update status → "partial"│       │     │
│  │     └──────────────────────────────────┘       │     │
│  │                                                │     │
│  │  3. Write updated status.json                  │     │
│  │                                                │     │
│  │  4. All done/partial?                          │     │
│  │     YES → cron remove {poll_cron_id}           │     │
│  │           → proceed to Phase 4                 │     │
│  │     NO  → cron keeps running, next check       │     │
│  │           in 2 min                             │     │
│  └────────────────────────────────────────────────┘     │
│                                                         │
│  ┌────────────────────────────────────────────────┐     │
│  │         INTERRUPTION HANDLING                  │     │
│  │                                                │     │
│  │  User sends message mid-poll:                  │     │
│  │    → Agent responds to message                 │     │
│  │    → Next cron trigger reads status.json       │     │
│  │    → Polling continues automatically           │     │
│  │                                                │     │
│  │  /compact or context trimmed:                  │     │
│  │    → Agent loses in-memory state               │     │
│  │    → Next cron trigger reads status.json       │     │
│  │    → Agent recovers everything from file       │     │
│  │                                                │     │
│  │  status.json has: run_id, started_at_utc,      │     │
│  │  poll_cron_id, all targetIds, all statuses     │     │
│  │  → Agent can always reconstruct full state     │     │
│  └────────────────────────────────────────────────┘     │
└─────────────────────┬───────────────────────────────────┘
                      │ all "done" or "partial"
                      ▼
┌─────────────────────────────────────────────────────────┐
│              PHASE 4 — SYNTHESIZE                       │
│                                                         │
│  Read from ~/research-reports/20260312-1430-ai-agent-   │
│            frameworks/:                                 │
│    ├── claude.md    (done — full report)                │
│    ├── chatgpt.md   (done — full report)                │
│    └── gemini.md    (done — full report)                │
│                                                         │
│  Produce:                                               │
│                                                         │
│  Claude - TL;DR                                         │
│  - LangGraph leads in production adoption               │
│  - CrewAI best docs, smallest learning curve            │
│                                                         │
│  ChatGPT - TL;DR                                        │
│  - OpenClaw dominates developer mindshare               │
│  - AutoGen strong in enterprise, weak community         │
│                                                         │
│  Gemini - TL;DR                                         │
│  - CrewAI + LangGraph most production-ready             │
│  - New entrants gaining fast (Mastra, Agno)             │
│                                                         │
│  Final conclusion:                                      │
│  LangGraph and CrewAI are the most production-ready     │
│  frameworks with the strongest communities as of        │
│  early 2026.                                            │
│                                                         │
│  Why: all three providers ranked them in top 2;         │
│  verified via GitHub stars + recent release cadence.    │
│                                                         │
│  Key disagreement: Claude rated OpenClaw higher for     │
│  developer mindshare, Gemini highlighted newer          │
│  entrants that the others missed.                       │
│                                                         │
│  Output to user in structured format                    │
└─────────────────────────────────────────────────────────┘
```
