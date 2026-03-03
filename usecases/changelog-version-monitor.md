# Changelog & Version Update Monitor

Track version updates of tools, apps, and services you depend on — never miss new features, security patches, or breaking changes again.

We all rely on dozens of software tools across work and life: developer frameworks, productivity apps, SaaS services, mobile apps. But staying updated means manually checking websites, reading newsletters, or discovering changes only when something breaks. Important security patches and useful features slip through the cracks for months.

## What It Does

- Monitors version updates from multiple sources:
  - GitHub releases for open-source tools
  - Package managers (npm, PyPI, Homebrew)
  - Official changelogs and RSS feeds
  - App Store or marketplace updates
- Remembers last-known versions locally to avoid duplicate notifications
- Only alerts when there's an actual version change, not on every check
- Delivers clean summaries with version diff, release date, and key changes

## Skills you Need

- Custom monitoring script that:
  - Fetches latest versions from various APIs or web sources
  - Stores state in a local file (JSON, SQLite, etc.)
  - Formats notifications with version comparison and highlights

## How to Set it Up

1. Create a monitoring script for your specific sources (GitHub API, RSS parser, etc.)
2. Add tools/services to track with their update sources
3. Set up a daily or weekly cron job:

```text
Run version monitor every morning at 9am. Notify me only when there are actual updates.
```

## Prompts

**Check updates immediately:**
```text
Run version monitor now and show me any updates across all tracked tools.
```

**Add a new tool to track:**
```text
Add VS Code to my version monitor. Check the official site for updates.
```

**View tracked versions:**
```text
Show me all the versions I'm currently tracking and when they were last checked.
```

## Related Links

- [GitHub API - Releases](https://docs.github.com/en/rest/releases/releases)
- [RSS Feed Parser libraries](https://github.com/topics/rss-parser)
