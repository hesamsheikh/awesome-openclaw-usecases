# Authenticated Portal Monitoring

Many important systems still live behind login walls: billing dashboards, partner portals, shipping consoles, internal admin panels, and vendor back offices. They often have no usable API, break simple scrapers, and require a real browser session to inspect what changed.

This workflow gives OpenClaw a browser-backed monitoring path for those portals. Instead of manually logging in every morning, the agent opens the site, signs in, checks the pages you care about, extracts the important data, and sends you a scheduled summary with screenshots or PDFs as evidence.

## Pain Point

You need updates from web apps that are:

- authenticated
- heavily client-rendered
- hostile to simple HTTP fetches
- too tedious to check by hand every day

Examples:

- client or vendor dashboards
- ad platforms and analytics portals
- internal tools without APIs
- order management and support consoles
- finance, compliance, or billing portals where screenshots matter

## What It Does

OpenClaw uses a browser workflow to:

- open a real browser session for a target portal
- log in and navigate through multi-step flows
- extract the metrics, alerts, or table rows you care about
- capture screenshots or PDFs for auditability
- send the result back on a schedule via Telegram, Slack, Discord, email, or another channel

This is especially useful when you want both a summary and proof. The summary tells you what changed; the screenshot or PDF lets you verify it quickly without opening the site yourself.

## Skills Needed

- [steel-browser](https://github.com/steel-dev/cli/tree/main/skills/steel-browser) - reusable browser skill for session-backed navigation, extraction, screenshots, and PDFs
- [Steel CLI](https://github.com/steel-dev/cli) - optional terminal-first path for the same browser workflows
- Cron jobs in OpenClaw - for scheduled checks and reports

## How to Set It Up

1. Add the `steel-browser` skill to your OpenClaw workspace.

2. Give OpenClaw a standing instruction like this:

```text
You monitor authenticated web portals for me.

When I give you a portal-monitoring task:
- use the steel-browser workflow
- log in and navigate the site step by step
- extract only the fields I ask for
- capture a screenshot or PDF when the page is important or when something changed
- return a concise summary first, then attach evidence
- if login fails or the page structure changes, report exactly where it failed

Do not guess values. If a field is missing or unclear, say so explicitly.
```

3. Create a recurring task or cron job. Example prompt:

```text
Every weekday at 8:30 AM, open the Acme partner portal and check:
- new orders
- failed orders
- unread support escalations
- account balance

Send me a short summary in Telegram.
If failed orders or escalations exist, include a screenshot of the relevant page.
If the balance changed from yesterday, export the billing page as PDF.
```

## Example Use Cases

### Billing dashboard check

```text
Every morning, log into our billing portal and tell me:
- yesterday's spend
- month-to-date spend
- any new payment failures

If payment failures exist, send a screenshot of the failures table.
```

### Marketplace seller operations

```text
Twice a day, check the seller portal for:
- new orders
- refund requests
- policy violations

If there are policy violations, send me the exact text plus a screenshot.
```

### Internal admin QA

```text
At 9 AM and 4 PM, log into our staging admin panel, confirm the queue length,
pending jobs, and failed jobs, then send me a summary.
Attach a screenshot of the jobs page if failed jobs are non-zero.
```

## Key Insights

- This works best for sites where APIs are missing, incomplete, or harder to maintain than browser automation.
- Screenshots and PDFs make the workflow auditable. That matters for finance, compliance, and operational reviews.
- Keep extraction rules narrow. Ask for a small set of fields instead of "summarize everything on the page."
- Scheduled monitoring is better than reactive checking for portals you know you will revisit every day.
- If a portal uses MFA or periodic re-auth, document the expected login behavior in the agent instructions so failures are easier to diagnose.

## Related Links

- [Steel Browser](https://github.com/steel-dev/steel-browser)
- [Steel CLI](https://github.com/steel-dev/cli)
- [steel-browser skill](https://github.com/steel-dev/cli/tree/main/skills/steel-browser)
- [Steel docs](https://docs.steel.dev/)
- [OpenClaw](https://github.com/openclaw/openclaw)
