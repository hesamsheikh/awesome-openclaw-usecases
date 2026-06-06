# Lifecycle Email Ops

## Pain Point

Founders and small teams often have customer and subscriber data in one place, campaign ideas in another, and no clean way to let an agent safely turn those into lifecycle emails without handing it a full inbox or asking it to improvise inside a marketing UI.

## What It Does

Use OpenClaw with the Sequenzy email marketing skill to operate warm-audience email workflows from chat:

- Import or update subscribers and segments.
- Draft campaigns and lifecycle sequences for existing users or subscribers.
- Create transactional email templates.
- Inspect campaign and delivery stats before deciding what to improve next.

The useful pattern is not cold outreach. It is letting an agent help run product, lifecycle, and transactional email for audiences that already have a relationship with you.

## Prompts

```text
Use the Sequenzy email marketing skill to create an onboarding sequence for new workspace signups.

Audience: users who created an account but have not sent their first campaign.
Goal: get them to import subscribers, create a segment, and send a test campaign.
Tone: direct, helpful, not salesy.

Draft the sequence first. Do not send anything until I approve the copy.
```

```text
Check Sequenzy campaign stats for the last 7 days. Summarize what changed, identify the weakest subject line, and draft one improved follow-up for the same warm audience.
```

```text
Create a transactional email template for passwordless login. Keep it short, include the login link variable, and do not add marketing copy.
```

## Skills Needed

- Sequenzy Email Marketing skill: https://github.com/Sequenzy/skills/tree/main/skills/sequenzy-email-marketing
- A Sequenzy API key configured for the agent runtime.

## Related Links

- Sequenzy: https://sequenzy.com
- Skill repository: https://github.com/Sequenzy/skills
- Direct skill install with the `skills` CLI:

```bash
npx skills add Sequenzy/skills --skill sequenzy-email-marketing
```
