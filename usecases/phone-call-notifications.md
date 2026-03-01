# Phone Call Notifications

Your agent already monitors things for you — stocks, emails, smart home, calendars — but notifications are easy to ignore. Push notifications pile up. Chat messages get buried. For the stuff that actually matters, you need something you can't swipe away.

This use case gives your agent a phone call as a notification channel. When something is urgent enough, the agent dials your real phone number, tells you what's going on, and you can talk back. Two-way conversation, not a robocall.

## What It Does

- Agent decides something is worth your attention (price alert, urgent email, appointment reminder, anything)
- Agent calls your phone via [clawr.ing](https://clawr.ing), a managed calling service — no Twilio setup, no API keys to configure
- You pick up, hear the alert, and can ask follow-up questions in real time
- Call ends when the conversation is done

The key idea: the agent calls YOU. You don't call the agent. This works with heartbeat checks, cron jobs, or any trigger — the agent evaluates whether something is phone-call-worthy and acts on it.

## Why This Works

OpenClaw agents already have initiative — heartbeat, cron, event triggers. But their output channels are limited to chat platforms you might not be checking. A phone call is the one notification channel that reliably gets your attention, especially when you're away from your desk.

clawr.ing handles the telephony infrastructure. You paste one setup prompt and the agent gains the ability to call. No Twilio account, no phone number provisioning, no webhook configuration. The service covers 100+ countries with real PSTN calls (not VoIP overlays).

## Skills Needed

- [clawr.ing](https://clawhub.ai/marcospgp/clawring) — install by pasting the setup prompt from the [clawr.ing dashboard](https://clawr.ing) into your OpenClaw chat. No CLI install needed.

That's it. No other dependencies. The setup prompt includes the API key and links to skill docs — the agent reads them and figures out the rest.

## Example: Morning Briefing Call

Set up a cron job that calls you every morning with a personalized briefing:

```
Every weekday at 7:30 AM, call me with a morning briefing. Include:
- Weather forecast for my city
- My calendar for today
- Any urgent emails that came in overnight
- Top 3 news headlines relevant to my interests

Keep it concise — aim for under 2 minutes. If I ask questions, answer them.
If I don't pick up, don't retry.
```

## Example: Price Alert

Tell the agent what to watch and when to call:

```
Monitor NVDA stock price. If it drops more than 5% in a single day,
call me immediately and tell me what happened. Include any relevant
news that might explain the drop.
```

## Example: Urgent Email Filter

```
During business hours, check my inbox every 15 minutes.
If you see an email from my boss or any email marked urgent,
call me with a summary. For everything else, just send a chat message.
```

## Key Insights

- **Don't overuse it.** The whole point is that a phone call means "this actually matters." If your agent calls you 10 times a day, you'll start ignoring it. Set clear thresholds for what's call-worthy vs chat-worthy.
- **Pair with heartbeat or cron.** clawr.ing is the delivery channel — you still need a trigger. Heartbeat checks (every 30 min) work for monitoring tasks. Cron jobs work for scheduled briefings.
- **Two-way conversation.** Unlike a push notification, you can ask follow-up questions on the call. "Wait, which email?" or "What's the current price now?" — the agent responds in real time.
- **Fast model for calls.** Phone conversations need quick responses. If your OpenClaw supports skill-level model routing, assign clawr.ing to a fast model (Haiku-class). The thinking sound covers latency, but faster is always better.
- **Privacy.** clawr.ing doesn't store recordings or transcripts. Audio is encrypted in transit and discarded after processing.

## Related Links

- [clawr.ing](https://clawr.ing)
- [clawr.ing on ClawHub](https://clawhub.ai/marcospgp/clawring)
- [OpenClaw](https://github.com/openclaw/openclaw)
