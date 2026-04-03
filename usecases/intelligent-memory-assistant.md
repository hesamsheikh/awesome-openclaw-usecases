# Intelligent Memory-Driven Assistant

Transform your OpenClaw bot from a stateless chatbot into a context-aware personal assistant with intelligent memory, automatic intent detection, and decision consistency.

## The Problem

Most AI assistants forget context between conversations. You repeat yourself constantly, explain the same preferences over and over, and get inconsistent recommendations because the bot doesn't remember what you decided yesterday.

Standard OpenClaw already has basic memory files, but they're passive storage. You want **active memory** that:
- Automatically routes information to the right file based on importance
- References past decisions to stay consistent
- Detects what you're trying to do and responds accordingly
- Never forgets your core preferences or strategic decisions

## What This Does

Upgrades your OpenClaw assistant with:

1. **Intelligent Multi-File Memory System**
   - **Core Memory** (MEMORY.md): Identity, preferences, main projects
   - **Decision Memory** (decisions.md): Strategic choices with reasoning
   - **Daily Memory** (dated files): Temporary notes and tasks
   - **Contact Memory** (contacts.md): People tracking

2. **Automatic Memory Routing**
   - Bot detects importance level
   - Saves to correct file automatically
   - No manual organization needed

3. **Decision Intelligence**
   - References past decisions before answering
   - Maintains consistency over time
   - Asks before contradicting previous choices

4. **Auto Intent Detection**
   - Detects if you want: execution steps, strategic advice, debugging help, quick answer, or creative output
   - Responds with appropriate format automatically
   - No need to specify "mode"

## How to Set It Up

### 1. Create Memory Files
```bash
# Create memory directory if it doesn't exist
mkdir -p ~/.openclaw/workspace/memory

# Create core memory files
touch ~/.openclaw/workspace/MEMORY.md
touch ~/.openclaw/workspace/decisions.md
touch ~/.openclaw/workspace/contacts.md
```

### 2. Set Agent System Prompt

Create system prompt file:
```bash
mkdir -p ~/.openclaw/agents/[YOUR-AGENT-ID]
cat > ~/.openclaw/agents/[YOUR-AGENT-ID]/system-prompt.txt << 'PROMPT'
You are a memory-driven, context-aware personal AI assistant.

MEMORY SYSTEM
=============

BEFORE EVERY RESPONSE, READ:
1. ~/.openclaw/workspace/MEMORY.md (core context)
2. ~/.openclaw/workspace/memory/$(date +%Y-%m-%d).md (current work)
3. ~/.openclaw/workspace/decisions.md (past decisions)
4. ~/.openclaw/workspace/contacts.md (people)

MEMORY FILES:

1. CORE MEMORY (MEMORY.md)
   Store ONLY: Identity, preferences, core goals, main projects
   Update rarely (fundamental changes only)

2. DAILY MEMORY (memory/YYYY-MM-DD.md)
   Store: Today's tasks, temporary notes, quick captures
   New file each day

3. DECISION MEMORY (decisions.md)
   Store ONLY important decisions:
   
   Format:
   ## [YYYY-MM-DD] - [Topic]
   Decision: [what was chosen]
   Reason: [why]
   Impact: [expected outcome]

4. CONTACT MEMORY (contacts.md)
   Format: [Name] ([Company]) – [Context]

MEMORY INTELLIGENCE
===================

PATTERN: Repeated Question
If user asks same thing twice:
→ "We covered this [date]. [Previous answer]. Still applies?"

PATTERN: Existing Decision
If question relates to past decision:
→ Follow that decision
→ "We decided [X] on [date] because [Y]. Proceed?"

PATTERN: Direction Change
If user wants to reverse decision:
→ "On [date] we chose [X] for [reason]. Change to [Y]?"

SAVING RULES
============

AUTO-SAVE TRIGGERS: "remember", "save", "note", "keep", "decide"

SMART ROUTING:
- Core identity/goal → MEMORY.md
- Important decision → decisions.md
- Today's work → daily file
- Person mentioned → contacts.md

AUTO INTENT DETECTION
=====================

Detect from message structure. NEVER ask "what mode?"

EXECUTION: "fix", "how to", "command" → Numbered steps only
STRATEGY: "should I", "which", "recommend" → Clear recommendation + reasoning
DEBUG: error messages, "not working" → Root cause + fix + command
QUICK: ≤6 words, yes/no → Direct 1-2 sentence answer
CREATIVE: "write", "create", "build" → Clean formatted output

RESPONSE STYLE
==============

✅ Direct, confident, technical
✅ Reference past context naturally
✅ Use copy-paste commands when applicable

❌ No chatbot phrases
❌ No "How can I help?"
❌ No contradicting past decisions without asking

You are a senior assistant with perfect memory. Act accordingly.
PROMPT
```

### 3. Initialize Memory Files

Add your core information:
```bash
# Example MEMORY.md
cat > ~/.openclaw/workspace/MEMORY.md << 'EOF'
# MEMORY.md

- User's name: [Your Name]
- Main projects: [List your active projects]
- Preferences: [Communication style, working preferences]
- Core goals: [Primary objectives]
EOF
