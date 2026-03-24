# Buffy Agent — Habit, Task & Routine Tracker

You've got habits to build, tasks to finish, and routines to stick to — but they're scattered across different apps. None of them talk to each other, none of them meet you where you already are. Buffy Agent solves this by operating as a personal behavior engine directly inside OpenClaw (and your other channels), turning plain conversation into structured habit tracking, task management, and routine reminders.

## Pain Point

Habit and task apps require you to open them. Reminders are easy to dismiss. The real problem is context-switching — every tool you use lives in a different place. Buffy Agent runs inside OpenClaw, Telegram, Slack, and ChatGPT simultaneously, so your habits and tasks follow you wherever you work.

## What It Does

- **Natural language interface** — create habits, tasks, and routines in plain English: "Remind me to drink water every 2 hours" or "Add a task: review PR before 5 PM"
- **Habit tracking** — establish recurring behaviors and track completion over time
- **Task management** — create, update, complete, and prioritize tasks conversationally
- **Routine & reminder scheduling** — time-based notifications sent directly in your preferred channel
- **Daily briefing** — a scheduled summary of pending tasks, active habits, and upcoming routines
- **Multi-channel sync** — one source of truth across OpenClaw, Telegram, Slack, and ChatGPT — update in one, see it in all

## Skills You Need

- [Buffy Agent OpenClaw Skill](https://clawhub.ai/phantue2002/buffy-agent) — single skill, one API key (`BUFFY_API_KEY`)
- Scheduling / cron for daily briefings and timed reminders
- Optional: Telegram or Slack integration for cross-channel sync

## How to Set It Up

1. Install the Buffy Agent skill from [ClawHub](https://clawhub.ai/phantue2002/buffy-agent) and add your `BUFFY_API_KEY`.

2. Start tracking habits with plain English:
```text
Create a habit: drink 8 glasses of water daily.
Remind me every day at 8 AM to do a 10-minute meditation.
Track my habit: read for 30 minutes before bed.
```

3. Manage tasks conversationally:
```text
Add a task: finish the API integration by Friday.
Mark "review PR" as done.
Show me all my pending tasks for today.
```

4. Set up routines and your daily briefing:
```text
Every morning at 7:30 AM, send me a briefing with:
- Today's pending tasks
- Active habits and their status
- Any routines scheduled for today
```

5. Optional — enable cross-channel sync by connecting Telegram or Slack through OpenClaw's integrations, then tell Buffy:
```text
Sync my tasks and habits to Telegram as well.
If I mark something done in Slack, reflect it everywhere.
```

## Key Insights

- The **single API endpoint** (`POST /v1/message`) keeps the skill lean — no complex setup, just one credential and you're running.
- **Behavioral memory** means Buffy adapts over time: it learns when you tend to skip check-ins and adjusts reminder timing accordingly.
- **Multi-channel sync** is the real differentiator — you're not locked into one interface. Update your task list from OpenClaw, get reminded in Telegram, review in Slack.
- Keep habits focused: 3–5 active habits produce better results than trying to track everything at once.

## Related Links

- [Buffy Agent Website](https://www.buffyai.org/)
- [Buffy Agent on ClawhHub](https://clawhub.ai/phantue2002/buffy-agent)
