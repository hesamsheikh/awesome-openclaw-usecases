# Automated Bounty Hunting

Earning crypto bounties manually means constantly checking GitHub issues, Discord servers, and bounty platforms across dozens of tabs. You want to automate the discovery and submission pipeline so your AI agent finds and pursues paying bounties 24/7.

This workflow turns OpenClaw into a self-evolving bounty hunter:

• Self-evolving meta-cognition loop: diagnose strategy effectiveness → decide next action → execute → learn from results
• Searches GitHub for labeled crypto bounties (USDC, ETH, SOL) using rotating queries
• Auto-forks repos, applies fixes, and submits PRs for eligible issues
• Tracks earnings, strategy effectiveness, and platform status in a state file
• Reports daily progress to Feishu/Slack with earnings, PRs, and risk assessments
• Exhausts failing strategies after 3 attempts and invents new ones from web research

## Skills you Need

- `gh` CLI (GitHub CLI) — for searching issues, forking, and creating PRs
- `web_search` (built-in) — for discovering new bounty platforms
- `web_fetch` (built-in) — for scraping platform pages and bounty details
- Cron job support — for hourly or daily execution
- A GitHub account with OAuth token for PR submission

## How to Set it Up

1. Create a directory for state tracking:
```bash
mkdir -p ~/.openclaw/workspace/artifacts/bounty-hunter
```

2. Set up a cron job in OpenClaw:
```text
Schedule a cron job every hour to run the bounty hunter pipeline:
1. Read the state file to diagnose current strategy effectiveness
2. If the current strategy has ≥3 failed attempts with $0 earned, switch strategies
3. Search GitHub for crypto bounty issues using rotating queries
4. For each eligible bounty: fork → fix → submit PR
5. Check passive platforms (BotBounty, AI Agent Store) for new tasks
6. Update state file with results and lessons learned
7. Report to Feishu with daily earnings and strategy status
```

3. First-run prompt:
```text
Initialize the bounty hunter:
- Set up state.json tracking file at artifacts/bounty-hunter/state.json
- Register wallet address for crypto payments
- Map all available bounty strategies (GitHub issues, crypto platforms, agent marketplaces)
- Run an initial scan of GitHub bounties and active platforms
- Set up the self-evolving strategy registry with attempts/successes/earnings tracking
```

4. The agent will self-evolve — when all active strategies fail, it automatically searches the web for new earning methods and invents replacement strategies.
