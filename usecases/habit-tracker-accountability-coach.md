# Habit Tracker & Accountability Coach

You've tried every habit tracker app out there. They all work for a week, then you stop opening them. The problem isn't the app - it's that tracking habits is passive. What if your agent actively reached out to you, asked how your day went, and adapted its approach based on whether you're on a streak or falling off?

This use case turns OpenClaw into a proactive accountability partner that checks in with you daily via Telegram or SMS. You can also extend it to lightweight task and routine reminders using the same check-in flow.

## Pain Point

Habit apps rely on you remembering to open them. Push notifications are easy to ignore. What actually works for behavior change is **active accountability** - someone (or something) that asks you directly, celebrates your wins, and nudges you when you slip. This agent does exactly that, without the awkwardness of bugging a friend.

## What It Does

- **Daily check-ins** via Telegram or SMS at times you choose (e.g., 7 AM for morning routine, 9 PM for end-of-day review)
- **Tracks habits** you define — exercise, reading, meditation, water intake, coding, whatever matters to you
- **Streak tracking** — knows your current streak for each habit and references it in messages
- **Optional task add-ons** - track a short daily task list alongside your habits
- **Optional routine reminders** - schedule recurring prompts for simple routines
- **Adaptive nudges** — adjusts tone based on your performance (encouraging when you're consistent, gently persistent when you miss days)
- **Weekly reports** — summarizes your week with completion rates, longest streaks, and patterns (e.g., "You tend to skip workouts on Wednesdays")

## Skills You Need

- Telegram or SMS integration (Twilio for SMS, or Telegram Bot API)
- Scheduling / cron for timed check-ins
- File system or database access for storing habit data
- Optional: Google Sheets integration for a visual habit dashboard

## How to Set It Up

1. Define your habits and check-in schedule:
```text
I want you to be my accountability coach. Track these daily habits for me:

1. Morning workout (check in at 7:30 AM)
2. Read for 30 minutes (check in at 8:00 PM)
3. No social media before noon (check in at 12:30 PM)
4. Drink 8 glasses of water (check in at 6:00 PM)

Send me a Telegram message at each check-in time asking if I completed
the habit. Keep track of my streaks in a local file.
```

2. Optional - add simple tasks and routines:
```text
Add a task: finish the API integration by Friday.
Mark "review PR" as done.
Show me all my pending tasks for today.

Every weekday at 6 PM, remind me to plan tomorrow's top 3 priorities.
```

3. Set up the tracking and tone:
```text
When I confirm a habit, respond with a short encouraging message and
mention my current streak. Example: "Day 12 of morning workouts. Solid."

When I miss a habit, don't guilt-trip me. Just acknowledge it and remind
me why I started. If I miss 3 days in a row, send a longer motivational
message and ask if I want to adjust the goal.

If I don't respond to a check-in within 2 hours, send one follow-up.
Don't spam me after that.
```

4. Add weekly reports:
```text
Every Sunday at 10 AM, send me a weekly summary:
- Completion rate for each habit
- Current streaks
- Best day and worst day
- One pattern you noticed (e.g., "You always skip reading on Fridays")
- One suggestion for next week

Store all data in ~/habits/log.json so I can review history anytime.
```

5. Optional - visual dashboard via Google Sheets:
```text
At the end of each day, update a Google Sheet with today's habit data.
Columns: Date, Workout, Reading, No Social Media, Water, Notes.
Mark completed habits with ✓ and missed with ✗.
```

## Key Insights

- The **adaptive tone** is what makes this different from a cron job. A static reminder gets ignored. A message that says "Day 15, don't break it now" actually motivates.
- Keep the number of tracked habits small (3-5). Tracking too many leads to check-in fatigue and you'll start ignoring the messages.
- The weekly pattern analysis is surprisingly useful — you'll discover things like "I never exercise on days I have early meetings" and can plan around it.
- Pairs well with the [Health & Symptom Tracker](health-symptom-tracker.md) if you want to correlate habits with how you feel.
- If you already run a multi-channel setup, you can map this pattern to services like Buffy Agent for synced reminders and check-ins.

## Related Links

- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Twilio SMS API](https://www.twilio.com/docs/sms)
- [Google Sheets API](https://developers.google.com/sheets/api)
- [Buffy Agent on ClawHub](https://clawhub.ai/phantue2002/buffy-agent)
