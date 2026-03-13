# AI-Powered Learning Pipeline

Turn OpenClaw into a personal tutor that teaches you one concept per day across multiple disciplines — with automatic curriculum management, progress tracking, and spaced repetition.

## Pain Point

You want to deeply learn a new field (machine learning papers, biology, etc.), but:
- Reading lists pile up and never get touched
- You lose momentum after a few days
- There's no one to explain things at your level
- Context switching between "finding what to read" and "actually learning" kills focus

What if your agent just *taught you* — one bite-sized lesson per day, adapted to what you already know?

## What It Does

- Maintains structured curricula across multiple learning tracks (e.g., "Ilya Sutskever's 30 Must-Read Papers", "Biology × AI Foundations")
- Delivers one lesson per day via Telegram at a scheduled time
- Each lesson: starts with a question, explains the core concept with analogies, links to original sources, and connects to your existing knowledge
- Tracks progress in JSON files (current index, completion dates)
- Finds and links real YouTube lectures and explainers (verified via web search)
- Optionally integrates with NotebookLM for source management

## Example: Daily Paper Deep-Dive

A cron job runs daily at noon. The agent:

1. Reads `memory/ilya-30-papers.json` → finds the next paper
2. Fetches the original paper and writes a detailed study note in `~/second-brain/ilya-30/`
3. Sends a Telegram message:

```
📄 #14/30 — "Attention Is All You Need" (Vaswani et al., 2017)

Why it matters: Before Transformers, sequence modeling was dominated by RNNs...

Core ideas:
- Self-attention lets every position attend to all others at once
- Positional encoding preserves order information
- Multi-head attention captures diverse relationships simultaneously

Impact on modern AI: GPT, BERT, and the very agent sending you this message...

📓 Detailed study note: ~/second-brain/ilya-30/14-attention-is-all-you-need.md

Reply with questions — I'll remember the context for next time.
```

## Example: Multi-Discipline Curriculum

You can run multiple tracks in parallel:

| Track | Schedule | What it teaches |
|-------|----------|----------------|
| Ilya 30 Papers | Daily 12:00 | Foundational ML/AI papers |
| Bio × AI | Daily 13:00 | Biology concepts relevant to AI (DNA→protein, evolution, neuroscience) |
| Legal AI Monitor | Daily 09:00 | Latest developments in computational law & AI regulation |

Each track has its own curriculum file, progress tracker, and delivery schedule.

## Prompts

### Setting up a paper reading track

```text
I want to study Ilya Sutskever's recommended 30 papers, one per day.

Create a JSON file at memory/ilya-30-papers.json with all 30 papers 
(title, authors, year, url) and a current_index starting at 0.

Every day at noon, pick the next paper and send me a lesson via Telegram:
- Why this paper matters (historical context)
- Core ideas explained for a non-specialist
- How it connects to modern AI
- Link to the original paper
- A detailed study note saved to ~/second-brain/ilya-30/

After sending, increment current_index.
```

### Setting up a curriculum-based track

```text
I want to learn biology fundamentals relevant to AI — DNA, proteins, 
evolution, neuroscience, longevity research.

Create a 30-lesson curriculum in memory/bio-ai-curriculum.md.
Track progress in memory/bio-ai-progress.json.

Every day at 1pm, teach me the next lesson:
- Start with a problem or question
- Explain in 3-5 sentences, use analogies
- Include 1-2 verified YouTube links
- Connect to what I already know (information theory, law, previous lessons)
- End with "curious about anything? ask me"

Keep it under 2000 chars — one Telegram message.
```

### Integrating NotebookLM for source management

```text
For each learning track, create a NotebookLM notebook and load 
the source papers/textbooks. Use it for deeper Q&A when I ask 
follow-up questions about a lesson.
```

## Skills Needed

- **Cron** — Schedule daily deliveries
- **Web Search** — Find and verify YouTube lectures, paper links
- **Telegram** (or any messaging channel) — Deliver lessons
- **File management** — Track progress, store study notes
- **NotebookLM** (optional) — Deep source management via CLI

## Tips

- Start with one track. Add more once the habit sticks.
- Reply to lessons with questions — the agent remembers context and can go deeper.
- Keep lessons short (under 2000 chars). You can always ask for more.
- The agent verifies all YouTube links via web search before sending — no broken links.
- Progress JSON makes it trivial to pause, resume, or skip ahead.

## Who This Is For

Anyone who wants to systematically learn a new field but struggles with consistency. Especially useful for:
- Researchers entering a new domain
- Career changers building foundational knowledge
- Anyone with a reading list they never get to
