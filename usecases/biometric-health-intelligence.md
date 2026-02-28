# Biometric Health Intelligence

You're wearing an Apple Watch, maybe a CGM, tracking nutrition — generating thousands of health data points per day. But you never look at any of it, and when you do, it's isolated: sleep in one app, heart rate in another, workouts in a third. The patterns that actually matter — how last night's late dinner affected your HRV, whether your new supplement is working, why you slept terribly on Tuesday — require cross-referencing multiple data streams over time. No single app does this.

This workflow turns OpenClaw into a health detective that continuously monitors your biometric data, builds theories about what affects your health, and runs real investigations — asking you questions, tracking experiments, and reporting back with findings.

## What It Does

- Pulls biometric data (HR, HRV, sleep stages, SpO2, respiratory rate, steps, workouts, nutrition, glucose) from the [Fulcra Life API](https://www.fulcradynamics.com) every 2 hours
- Cross-correlates multiple data streams to find patterns no single app can see (e.g., "Your HRV drops 15% on days you eat after 9 PM")
- Maintains a living theory document with hypotheses about your health, complete with evidence, counter-evidence, and open questions
- Asks you one targeted question per insight — "Did you take your magnesium last night?" — to fill gaps the data can't answer
- Tracks experiments over time: "It's been 10 days since you switched to magnesium glycinate — here's what changed"
- Sends proactive alerts only when something actually matters (anomalous HRV, sleep pattern breaks, unusual glucose)
- Learns your personal baselines and uses percentage-based thresholds (not population averages)

## Pain Point

Health wearables collect incredible data but present it in silos. The real value is in **cross-stream correlation** — connecting your sleep, HRV, nutrition, supplements, workouts, stress, and life context into a unified picture. That requires a persistent agent that remembers your history, understands your routines, and can reason across all your data simultaneously.

## Skills You Need

- [fulcra-context](https://skills.sh) — OAuth2 connection to Fulcra's Life API for biometrics, sleep, workouts, nutrition, location, and calendar
- Cron jobs (for periodic data pulls and analysis)
- Signal, Telegram, or iMessage integration (for alerts and questions)

## How to Set It Up

1. Install the fulcra-context skill and authorize with your Fulcra account (requires the [Context app](https://apps.apple.com/us/app/context-by-fulcra/id1633037434) connected to Apple Health).

2. Create a biometric context file at `~/openclaw/memory/topics/biometric-context.md`:
```markdown
# Biometric Context

## Personal Baselines
- Resting HR: [will be auto-populated]
- HRV (SDNN): [will be auto-populated]
- Avg Sleep: [will be auto-populated]
- Avg Steps: [will be auto-populated]

## Life Context
- [Add anything relevant: new parent, shift worker, athlete, medications, supplements, injuries, etc.]

## Active Theories
1. [Agent will build these over time]

## Resolved Theories
- [Confirmed or disproven hypotheses move here]
```

3. Prompt OpenClaw:
```text
You are my health detective. Every 2 hours during the day (8 AM - 8 PM),
pull my biometric data from Fulcra and look for patterns.

Rules:
- Always cross-reference at least 2 data streams before surfacing an insight
- Use MY baselines (from biometric-context.md), not population averages
- Frame findings as theories, not diagnoses ("I notice X" not "You have Y")
- Ask me ONE question when you see something interesting — while I can still
  remember (same day)
- Track my answers as evidence in biometric-context.md
- Never repeat an insight you've already shared
- Only alert me when something is genuinely notable — silence means normal

Build theories over time. When you have enough evidence, suggest a specific
experiment ("Try X for 1 week, I'll track the results"). After the experiment
period, report back with findings.
```

4. Over time, the agent builds a rich understanding of your health. Example theories it might develop:
   - "Bedtime before 11 PM → 25%+ deep sleep (vs 8% baseline)"
   - "Evening supplements taken consistently → lower overnight HR"
   - "Strength training days → HRV dip next morning, recovery by evening"

## What Makes This Different

Most health tracking use cases are simple logging ("tell me what you ate"). This is a **persistent investigation system** with three feedback loops:

1. **Data → Insight**: Raw biometrics analyzed for cross-stream patterns
2. **Conversation → Context**: Everything you mention about your health (supplements, stress, schedule) feeds back into the analysis
3. **Theory → Question → Answer → Smarter Theory**: The agent builds hypotheses, gathers evidence through questions, and refines its model of your health over time

The agent gets smarter about *you* specifically — not generic health advice, but personalized theories based on your actual data and life context.
