# Event Guest Confirmation

You're hosting an event — a dinner party, a wedding, a company offsite — and you need to confirm attendance from a list of guests. Manually calling 20+ people is tedious: you play phone tag, forget who said what, and lose track of dietary restrictions or plus-ones. Texting works sometimes, but people ignore messages. A real phone call gets a much higher response rate.

This use case has OpenClaw call each guest on your list using the [SuperCall](https://clawhub.ai/xonder/supercall) plugin, confirm whether they're attending, collect any notes, and compile everything into a summary for you.

## What It Does

- Iterates through a guest list (names + phone numbers) and calls each one
- The AI introduces itself as your event coordinator with a friendly persona
- Confirms the event date, time, and location with the guest
- Asks if they're attending, and collects any notes (dietary needs, plus-ones, arrival time, etc.)
- After all calls are complete, compiles a summary: who confirmed, who declined, who didn't pick up, and any notes

## Why SuperCall

This use case works with the [SuperCall](https://clawhub.ai/xonder/supercall) plugin specifically — not the built-in `voice_call` plugin. The key difference: SuperCall is a fully standalone voice agent. The AI persona on the call **only has access to the context you provide** (the persona name, the goal, and the opening line). It cannot access your gateway agent, your files, your other tools, or anything else.

This matters for guest confirmation because:

- **Safety**: The person on the other end of the call can't manipulate or access your agent through the conversation. There's no risk of prompt injection or data leakage.
- **Better conversations**: Because the AI is scoped to a single focused task (confirm attendance), it stays on-topic and handles the call more naturally than a general-purpose voice agent would.
- **Batch-friendly**: You're making many calls to different people. A sandboxed persona that resets per call is exactly what you want — no bleed-over between conversations.

## Skills You Need

- [SuperCall](https://clawhub.ai/xonder/supercall) — install via `openclaw plugins install @xonder/supercall`
- A Twilio account with a phone number (for making outbound calls)
- An OpenAI API key (for the GPT-4o Realtime voice AI)
- ngrok (for webhook tunneling — free tier works)

See the [SuperCall README](https://github.com/xonder/supercall) for full configuration instructions.

## How to Set It Up

1. Install and configure SuperCall following the [setup guide](https://github.com/xonder/supercall#configuration). Make sure hooks are enabled in your OpenClaw config.

2. Prepare your guest list. You can paste it directly in chat or keep it in a file:

```text
Guest List — Summer BBQ, Saturday June 14th, 4 PM, 23 Oak Street

- Sarah Johnson: +15551234567
- Mike Chen: +15559876543
- Rachel Torres: +15555551234
- David Kim: +15558887777
```

3. Prompt OpenClaw:

```text
I need you to confirm attendance for my event. Here are the details:

Event: Summer BBQ
Date: Saturday, June 14th at 4 PM
Location: 23 Oak Street

Here is my guest list:
<paste your guest list here>

For each guest, use supercall to call them. Use the persona "Jamie, event coordinator
for [your name]". The goal for each call is to confirm whether they're attending,
and note any dietary restrictions, plus-ones, or other comments.

After each call, log the result. Once all calls are done, give me a full summary:
- Who confirmed
- Who declined
- Who didn't answer
- Any notes or special requests from each guest
```

4. OpenClaw will call each guest one by one using SuperCall, then compile the results. You can check in on progress at any time by asking for a status update.

## Key Insights

- **Start with a small test**: Try it with 2-3 guests first to make sure the persona and opening line sound right. You can adjust the tone before calling the full list.
- **Be mindful of calling hours**: Don't schedule calls too early or too late. You can tell OpenClaw to only call between certain hours.
- **Review transcripts**: SuperCall logs transcripts to `~/clawd/supercall-logs`. Skim through them after the first batch to see how conversations went.
- **No-answer handling**: If someone doesn't pick up, OpenClaw can note it and you can decide whether to retry later or follow up by text.
- **Real phone calls cost money**: Each call uses Twilio minutes. Set appropriate limits in your Twilio account, especially for large guest lists.

## Related Links

- [SuperCall on ClawHub](https://clawhub.ai/xonder/supercall)
- [SuperCall on GitHub](https://github.com/xonder/supercall)
- [Twilio Console](https://console.twilio.com)
- [OpenAI Realtime API](https://platform.openai.com/docs/guides/realtime)
- [ngrok](https://ngrok.com)
