# Biometric Morning Briefing

Your morning routine probably involves checking multiple apps — weather, calendar, email, maybe your sleep score. But none of them talk to each other. Your calendar doesn't know you slept terribly, and your sleep app doesn't know you have a big meeting at 9 AM. What if your morning briefing actually started with how your body is doing, then adapted everything else accordingly?

This workflow delivers a daily briefing that leads with real biometric data — how you actually slept, your overnight heart rate and glucose trends, your recovery state — then layers in your calendar, weather, and priorities, all adjusted based on how your body is performing.

## What It Does

- Pulls last night's sleep data (stages, duration, fragmentation, time awake) from Fulcra
- Analyzes overnight heart rate and HRV trends for recovery assessment
- Includes overnight glucose stability if you use a CGM
- Pulls today's calendar and highlights meetings that need prep
- Checks weather for your location
- Adapts tone and recommendations based on recovery: a rough night gets "protect your energy today" while a great night gets "you're charged up — go hard"
- Delivers via Signal, Telegram, iMessage, or email at your wake time

## Pain Point

Generic morning briefings treat every day the same. But your energy, focus, and capacity vary wildly based on how you recovered overnight. A briefing that knows you got 4 hours of fragmented sleep should look very different from one after 8 hours of deep recovery.

## Skills You Need

- [fulcra-context](https://skills.sh) — Biometric and calendar data via Fulcra's Life API
- Weather skill (or web search)
- Email skill (optional, for inbox summary)
- Signal, Telegram, or iMessage integration

## How to Set It Up

1. Install the fulcra-context skill and connect your Fulcra account.

2. Prompt OpenClaw:
```text
Every morning at 7:30 AM, send me a briefing on Signal. Structure:

🛌 SLEEP: Total hours, deep sleep %, time awake, sleep score assessment
💓 RECOVERY: Overnight resting HR trend, morning HRV reading
🩸 GLUCOSE (if available): Overnight stability, morning fasting level
📅 TODAY: Calendar shape — key meetings, gaps, intensity level
🌤️ WEATHER: Current + forecast for my area
📧 EMAIL: Any urgent unreads (just count + senders, not content)

Tone rules:
- Poor sleep (<5h or <15% deep): Lead with "rough night" framing,
  suggest protecting energy, flag meetings that might be hard
- Good sleep (>6h, >20% deep): Energetic tone, suggest tackling
  hard things early
- Always be brief — this should take 30 seconds to read

Also email a copy to [your email] for reference.
```

3. The briefing evolves as the agent learns your patterns. After a few weeks, it starts adding context like "3rd bad night this week" or "your HRV has been trending up since you started the new supplement."

## Example Output

```
☀️ Friday Morning Briefing

🛌 SLEEP: 6.2h total | Deep 24% (great) | 52min awake
💓 RECOVERY: RHR 62 bpm (below your avg 68 — well recovered)
🩸 GLUCOSE: Stable overnight, fasting 94 mg/dL

📅 TODAY: Medium day — 2 external meetings (10 AM, 2 PM), rest is
   focus time. Good day to tackle deep work in the AM.
🌤️ 45°F, partly cloudy, no rain
📧 3 unreads (1 from investor, 2 newsletters)

You're well-recovered today. Front-load the hard stuff. 💪
```
