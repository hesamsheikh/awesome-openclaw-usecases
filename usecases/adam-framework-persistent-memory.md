# Adam Framework: Persistent Memory for OpenClaw Agents

## Pain Point

Every time you start a new OpenClaw session, your agent wakes up blank. You re-explain your projects, business, goals, and decisions over and over. After weeks of daily use your agent still does not know your name unless you tell it. This is AI amnesia, and it compounds the more you build with an agent.

There is also a subtler problem: within a long session, as context accumulates, the agent's reasoning consistency quietly degrades before compaction triggers. It does not announce this. It just starts drifting.

## What It Does

The Adam Framework gives your OpenClaw agent persistent memory and identity across sessions via a 5-layer architecture running locally alongside OpenClaw:

- Layer 1: Vault injection via SENTINEL. Identity files loaded at every boot. Agent wakes knowing who it is.
- Layer 2: memory-core plugin. Live memory search mid-session via memory_search and memory_get tools.
- Layer 3: Neural graph (nmem_context). Associative recall, 7219 neurons, 29291 synapses.
- Layer 4: Nightly reconciliation. Gemini merges daily logs into CORE_MEMORY.md while you sleep.
- Layer 5: Coherence monitor. Detects scratchpad dropout, fires re-anchor before drift causes visible damage.

## What Changes

Day 1: Agent knows your name, projects, and role before you say anything. Sessions start with context.
Week 1: Neural graph builds real connections. Agent references previous sessions unprompted.
Month 1: Sleep cycle has merged weeks of logs. Agent has genuine project history. Memory compounds.

## Prompts

Path 1: Read SETUP_HUMAN.md (30-60 min, plain English, four phases with expected outputs):
https://github.com/strangeadvancedmarketing/Adam/blob/master/SETUP_HUMAN.md

Path 2: Paste SETUP_AI.md into your agent's chat. It asks 8 questions and handles the install:
https://github.com/strangeadvancedmarketing/Adam/blob/master/SETUP_AI.md

## Skills Needed

- OpenClaw running with a model
- Python 3.10+
- mcporter (npm install -g mcporter)
- NVIDIA Developer free API key (Kimi K2.5, 131K context, free tier)
- Gemini API key (free) for nightly sleep cycle

## Proof

Validated in production over 353 sessions and 6619 message turns on a live business. 33/33 coherence monitor tests passing. Interactive proof: https://strangeadvancedmarketing.github.io/Adam/showcase/ai-amnesia-solved.html

## Related Links

- Repo: https://github.com/strangeadvancedmarketing/Adam
- Live site: https://strangeadvancedmarketing.github.io/Adam/
- Architecture: https://github.com/strangeadvancedmarketing/Adam/blob/master/docs/ARCHITECTURE.md
- Production failure log: https://github.com/strangeadvancedmarketing/Adam/blob/master/docs/LESSONS_LEARNED.md