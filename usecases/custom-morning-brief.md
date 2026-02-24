# Custom Morning Brief

You wake up and spend the first 30 minutes of your day catching up — scrolling news, checking your calendar, reviewing your to-do list, trying to figure out what matters today. What if all of that was already done and waiting for you as a text message?

This workflow has OpenClaw send you a fully customized morning briefing every day at a scheduled time, covering news, tasks, ideas, and proactive recommendations.

## What It Does

- Sends a structured morning report to Telegram, Discord, or iMessage at the same time every day (e.g., 8:00 AM)
- Researches overnight news relevant to your interests by browsing the web
- Reviews your to-do list and surfaces tasks for the day
- Generates creative output (full scripts, email drafts, business proposals — not just ideas) while you sleep
- Recommends tasks the AI can complete autonomously to help you that day

## Pain Point

You're spending your most productive morning hours just getting oriented. Meanwhile, your AI agent sits idle all night. The morning brief turns idle overnight hours into productive prep time — you wake up to work already done.

## Skills You Need

- Telegram, Discord, or iMessage integration
- Todoist / Apple Reminders / Asana integration (whichever you use for tasks)
- [x-research-v2](https://clawhub.ai) for social media trend research (optional)

## How to Set It Up

1. Connect OpenClaw to your messaging platform and task manager.

2. Prompt OpenClaw:
```text
I want to set up a regular morning brief. Every morning at 8:00 AM,
send me a report through Telegram.

I want this report to include:
1. News stories relevant to my interests (AI, startups, tech)
2. Ideas for content I can create today
3. Tasks I need to complete today (pull from my to-do list)
4. Recommendations for tasks you can complete for me today

For the content ideas, write full draft scripts/outlines — not just titles.
```

3. OpenClaw will schedule this automatically. Verify it's working by checking your messages the next morning.

4. Customize over time — just text your bot:
```text
Add weather forecast to my morning brief.
Stop including general news, focus only on AI.
Include a motivational quote each morning.
```

5. If you can't think of what to include, you don't have to — just say:
```text
I want this report to include things relevant to me.
Think of what would be most helpful to put in this report.
```

## Key Insights

- The AI-recommended tasks section is the most powerful part — it has the agent proactively think of ways to help you, rather than waiting for instructions.
- You can customize the brief just by texting. Say "Add stock prices to my morning brief" and it updates.
- Full drafts (not just ideas) are the key to saving time. Wake up to scripts, not suggestions.
- It doesn't matter what industry you're in — a morning brief with tasks, news, and proactive suggestions is universally useful.

## Based On

Inspired by [Alex Finn's video on life-changing OpenClaw use cases](https://www.youtube.com/watch?v=41_TNGDDnfQ).
