# Browser-Grounded Social Research

Social research often depends on posts, profiles, comments, and videos that generic web search cannot see. Manually opening each result is slow, while giving a general browser agent unrestricted account access creates unnecessary risk.

This workflow lets OpenClaw invoke Jev Social as a standard Agent Skill. Jev chooses from a changing set of bounded research operations, and the local `socai` CLI executes the selected operation in the user's existing Chrome session.

## What It Does

- Searches Instagram, TikTok, or LinkedIn through a signed-in local browser
- Opens relevant posts or profiles and reads available comments before summarizing
- Rebuilds the allowed operation list from observed results after every step
- Returns compact post records, source URLs, an explicit run status, and a source-linked report
- Preserves partial evidence when a login wall, challenge, rate limit, or step limit stops the run
- Never posts, comments, likes, follows, or sends messages

TikTok media can be downloaded only when the user explicitly asks to save or archive it. That local download permission does not authorize any remote account action.

## Skills You Need

- [Jev Social Agent Skill](https://github.com/socai-io/jev-social/tree/c411ae1532dd37ab94f8164f13552ed05f4c9ecc/skills/jev-social)
- Node.js 20 or newer
- A current local [`socai` CLI](https://github.com/socai-io/socai) with support for the requested platform
- Chrome already signed in when the platform requires authentication
- A configured decision provider: OpenRouter Jev or a user-started loopback System One server

Jev Social is an Agent Skill that calls a local CLI; it is not an OpenClaw plugin. Review the Skill and CLI source before granting browser access.

## How to Set It Up

From the OpenClaw workspace, install the immutable v0.1.8 Skill source:

```bash
npx skills add https://github.com/socai-io/jev-social/tree/c411ae1532dd37ab94f8164f13552ed05f4c9ecc/skills/jev-social --skill jev-social --agent openclaw --copy
```

The Skill checks readiness before research. If Node.js, the decision provider, the `socai` CLI, platform support, or browser login is missing, fix only that prerequisite; do not bypass a platform challenge or switch browser profiles.

## Privacy and Data Flow

With OpenRouter decision routing, Jev Social sends the research goal, bounded decision options, source URLs, compact action summaries, and short visible-text excerpts to the configured model. Optional report synthesis is a separate OpenRouter request containing the goal, platform, run status and stop reason, coverage counts, and up to 40 bounded records with source URLs, titles, author claims or captions, comment excerpts, engagement fields, and capture depth. Setting `OPENROUTER_REPORT_MODEL=off` disables that report request, but it does not make decision routing local; avoiding OpenRouter model calls also requires a supported user-started loopback System One provider.

Browser automation uses the Chrome profile selected by `socai`. Use a dedicated profile or test account for sensitive research, and review its signed-in account scope before running the Skill. Jev Social does not intentionally add cookies, downloaded media, raw CLI JSON, or filesystem fields to model requests.

## Prompt

```text
Use Jev Social to research how people discuss [topic] on Instagram.

- Collect up to four useful records.
- Open the most relevant posts and available comments; do not treat search cards as fully read posts.
- Do not post, comment, like, follow, message, or change my account.
- Stop on login, CAPTCHA, challenge, or rate-limit gates and keep any evidence already captured.
- Return a concise comparison table with source links, then state whether the run completed or remained partial.
```

For cross-platform comparison, run a separate prompt for TikTok or LinkedIn so each result keeps its platform, status, and evidence boundary clear.

## Expected Result

OpenClaw should return the useful records instead of raw CLI JSON or local paths. Each conclusion should remain traceable to a captured source URL, and the answer should distinguish search-only cards from posts whose details or comments were actually opened.

The project includes a [recorded Instagram report](https://github.com/socai-io/jev-social/blob/v0.1.8/docs/example-report.md) with four source-linked records after two searches and one post-detail read. It is a dated example, not a latency or coverage guarantee.

## Related Links

- [Jev Social repository](https://github.com/socai-io/jev-social)
- [v0.1.8 setup and evidence](https://github.com/socai-io/jev-social/tree/v0.1.8)
- [Local System One setup](https://socai-io.github.io/jev-social/local-system-one/)
