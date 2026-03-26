---
name: pre-build-idea-validator
description: Use when starting any new project, feature, or tool before writing any code, or when the user shares a GitHub repo URL and wants to understand its idea or market position
---

# Pre-Build Idea Validator

Before starting anything new, check whether it already exists. Scans GitHub and Hacker News and returns a `reality_signal` score (0–100).

## Setup

Install the `idea-reality-mcp` Python package (required):

```bash
pip install idea-reality-mcp
```

Place `idea-check.mjs` (included in this skill directory) alongside this `SKILL.md`.

## When to Use

- Before any new project, feature, CLI tool, or library
- When you want to know if an idea is original
- Before a hackathon: batch-validate multiple ideas and pick the lowest score
- When the user shares a GitHub repo URL and asks what it does, whether it's worth building, or how crowded the space is

## How to Use

### New idea
```bash
node {baseDir}/idea-check "describe the idea here"
```

For a deeper scan (all 5 sources — GitHub, HN, npm, PyPI, Product Hunt):
```bash
node {baseDir}/idea-check "describe the idea here" --depth deep
```

### GitHub repo URL
1. Fetch the repo README to extract a 1-sentence description
2. Run `idea-check` with that description as the query
3. Report the `reality_signal` alongside what the repo does

## Decision Rules

| reality_signal | Action |
|---|---|
| > 70 | **STOP.** Report top 3 competitors with star counts. Ask whether to proceed, pivot, or abandon. |
| 30–70 | Show results + pivot hints. Suggest a niche angle existing projects don't cover. |
| < 30 | Proceed. Mention the space is open. |

Always show the score and top competitors before writing any code. Do NOT write `idea-check.mjs` yourself — it already exists in `{baseDir}`.

## Example Output

```
reality_signal: 59/100 (MEDIUM competition)

Top competitors:
  1. bruno-smith/Automated_Tee_Time_Booking — 11 stars
     Python code to book tee times through selenium
  2. niallhodgen/tee-time-booker — 4 stars
     An experimental program to automate tee time booking

Pivot hints:
  • Moderate competition exists. Focus on a specific use case current solutions handle poorly.
  • Validate with potential users before building.
```
