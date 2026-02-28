# Pre-Build Idea Validator

Before OpenClaw starts building anything new, it automatically checks whether the idea already exists across GitHub, Hacker News, npm, PyPI, and Product Hunt — and adjusts its approach based on what it finds.

## What It Does

- Scans 5 real data sources (GitHub, Hacker News, npm, PyPI, Product Hunt) before any code is written
- Returns a `reality_signal` score (0-100) indicating how crowded the space is
- Shows top competitors with star counts and descriptions
- Suggests pivot directions when the space is saturated
- Works as a pre-build gate: high signal = stop and discuss, low signal = proceed

## Pain Point

You tell your agent "build me an AI code review tool" and it happily spends 6 hours coding. Meanwhile, 143,000+ repos already exist on GitHub — the top one has 53,000 stars. The agent never checks because you never asked, and it doesn't know to look. You only discover competitors after you've invested significant time. This pattern repeats for every new project idea.

## Skills You Need

- [idea-reality-mcp](https://github.com/mnemox-ai/idea-reality-mcp) — MCP server that scans real data sources and returns a competition score

## How to Set It Up

1. Install idea-reality-mcp:

```bash
uvx idea-reality-mcp
```

2. Add the MCP server to your OpenClaw config:

```json
{
  "mcpServers": {
    "idea-reality": {
      "command": "uvx",
      "args": ["idea-reality-mcp"]
    }
  }
}
```

3. Add this to your OpenClaw agent instructions:

```text
Before starting any new project, feature, or tool, always run idea_check first.

Rules:
- If reality_signal > 70: STOP. Report the top 3 competitors with star counts.
  Ask me if I want to proceed, pivot, or abandon.
- If reality_signal 30-70: Show me the results and pivot_hints.
  Suggest a niche angle that existing projects don't cover.
- If reality_signal < 30: Proceed to build.
  Mention that the space is open.
- Always show the reality_signal score and top competitors before writing any code.
```

## Real World Example

**You:** "Build me a CLI tool for AI code review"

OpenClaw runs `idea_check("AI code review tool")` and responds:

> **reality_signal: 90/100 (very high)**
>
> Top competitors:
> 1. Gitea — 53,940 stars
> 2. reviewdog — 9,104 stars
> 3. Danger (Ruby) — 5,649 stars
>
> This space has 143,000+ related repos. The top players are mature and well-funded.
>
> **Pivot suggestions:**
> - Focus on a specific language (Rust/Go-only AI code review)
> - Target a specific framework (React/Vue component review)
> - Target a specific industry (financial/medical code compliance review)
>
> Should I proceed with a differentiated angle, or pivot to something else?

**You:** "What about an MCP server for pre-build idea validation?"

> **reality_signal: 8/100 (very low)**
>
> 0 direct competitors found on PyPI or npm. GitHub has some tangentially related repos but none solve this exact problem.
>
> The space is wide open. Proceeding to build.

## Variations

- **Deep mode for serious decisions**: Use `depth="deep"` to scan all 5 sources in parallel (GitHub + HN + npm + PyPI + Product Hunt) for major project decisions.
- **Batch validation**: Before a hackathon, give OpenClaw a list of 10 ideas and have it rank them by `reality_signal` — lowest score = most original opportunity.
- **Web demo first**: Try without installing at [mnemox.ai/check](https://mnemox.ai/check) to see if the workflow fits your needs.

## Key Insights

- This prevents the most expensive mistake in building: **solving a problem that's already been solved**.
- The `reality_signal` is based on real data (repo counts, star distributions, HN discussion volume), not LLM guessing.
- A high score doesn't mean "don't build" — it means "differentiate or don't bother."
- A low score means genuine white space exists. That's where solo builders have the best odds.

## Related Links

- [idea-reality-mcp GitHub](https://github.com/mnemox-ai/idea-reality-mcp)
- [Web demo](https://mnemox.ai/check) (try without installing)
- [PyPI](https://pypi.org/project/idea-reality-mcp/)
