# AI-Run Business Tool Factory

Your AI agent doesn't just build apps — it runs a business. This use case shows how an OpenClaw agent autonomously built, deployed, and marketed 10+ web tools overnight using Codex CLI, GitHub Pages, and a nightly cron job.

## What It Does

- A nightly cron triggers the agent while the human sleeps
- The agent checks its task board, picks high-impact work, and ships it
- Uses Codex CLI ($20/mo) for code generation, keeping OpenClaw token costs near zero
- Deploys static web apps to GitHub Pages (free hosting, instant URLs)
- Cross-links all tools, adds SEO, analytics, email capture, and CTAs to paid products
- Submits to awesome-lists and directories for organic discovery
- Logs everything in structured daily memory files

## What Got Built (One Weekend)

| Tool | Description | Lines |
|------|-------------|-------|
| Agent Configurator | AI agent setup wizard → downloadable AGENTS.md/SOUL.md | 1013 |
| AI Prompt Library | 60 searchable prompts across 10 categories | 1267 |
| AI ROI Calculator | Interactive ROI projections with industry benchmarks | 975 |
| AI Readiness Quiz | 5-dimension assessment with tier-based results | 692 |
| AI Roadmap Generator | Personalized AI implementation roadmaps | 1002 |
| OpenClaw Chat | Mobile-first PWA chat client for OpenClaw agents | ~800 |
| AI Tools Hub | Central landing page connecting all tools | 494 |
| Services Landing | Productized AI consulting services page | 463 |
| Main Landing | Portfolio homepage with full funnel | ~500 |
| Blog | 5 SEO-optimized articles with structured data | ~1500 |

Total: 10 deployed pages, ~8,700 lines of code, all in one weekend.

## Pain Point

Solo founders can't build fast enough. AI agents can build overnight, but most people use them for one-off tasks. This pattern turns your agent into a systematic business builder — it picks what to build, builds it, deploys it, and markets it while you sleep.

## Skills You Need

- Telegram (for notifications and morning summaries)
- `sessions_spawn` (for delegating to Codex/Claude Code sub-agents)
- GitHub CLI (`gh`) for repo management and PR creation
- Nightly cron job (`openclaw cron add`)
- GoatCounter or similar for analytics

## How to Set It Up

### Step 1: Define Your Business Goals

In your `AGENTS.md`, add standing orders:

```markdown
## Standing Orders
1. Keep your workspace clean
2. Give me one suggestion per day
3. Log all infrastructure improvements
4. Build one business improvement every day
5. Clear your own roadblocks
```

### Step 2: Create a Nightly Cron

```bash
openclaw cron add \
  --name "Nightly Work" \
  --cron "0 0 * * *" \
  --prompt "Nightly work session. Check memory for last session, pick ONE thing, go deep. Ship it. PRs only, never push to main." \
  --best-effort-deliver
```

### Step 3: Set Up the Tool Pipeline

The agent needs:
- A GitHub account with repos for each tool
- GitHub Pages enabled on each repo
- A consistent design system (we use dark glassmorphism)
- Cross-site navigation linking all tools together
- Analytics on every page
- Email capture (Buttondown, ConvertKit, etc.)

### Step 4: Let It Run

The agent will:
1. Check what it did last session (via `memory/heartbeat-state.json`)
2. Review the task board for priorities
3. Pick the highest-impact item
4. Build it using Codex CLI or Claude Code
5. Deploy to GitHub Pages
6. Update cross-site links, sitemap, analytics
7. Log everything in daily memory
8. Report results in your morning brief

## Architecture

```
Nightly Cron → OpenClaw Agent
  ├── Read memory/heartbeat-state.json (what happened last)
  ├── Read canvas/board-data.json (task board)
  ├── Pick highest-impact task
  ├── Spawn Codex CLI (background, pty)
  │   └── Build tool per PRD template
  ├── Deploy to GitHub Pages
  ├── Update cross-site navigation
  ├── Submit to awesome-lists (PRs)
  └── Write memory/YYYY-MM-DD.md (daily log)
```

## Key Insights

- **Codex CLI for code, OpenClaw for orchestration** — keeps costs down dramatically
- **Single HTML files** — no build step, no dependencies, instant deploy
- **PRD-first workflow** — write the spec before spawning the builder
- **Standing orders > task lists** — the agent internalizes principles, not just todos
- **Memory files are critical** — without persistent memory, the agent rebuilds from scratch every session

## Results

- 10 production web tools deployed in 48 hours
- 5 SEO-optimized blog posts
- 30-day Twitter content queue prepared
- Newsletter platform set up with first issue drafted
- 2 awesome-list PRs submitted (4.4K and 5.4K star repos)
- Total human effort: ~30 minutes of auth setup and PR reviews

## Links

- [Main Landing](https://wmiddendorff.github.io/)
- [AI Tools Hub](https://wmiddendorff.github.io/ai-tools-hub/)
- [OpenClaw](https://github.com/openclaw/openclaw)
