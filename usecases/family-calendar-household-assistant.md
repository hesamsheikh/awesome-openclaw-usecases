# Family Calendar Aggregation & Household Assistant

Modern families juggle five or more calendars — work, personal, shared family, kids' school, extracurriculars — across different platforms and formats. Important events slip through the cracks because no single view exists. Meanwhile, household coordination (grocery lists, pantry inventory, appointment scheduling) happens through scattered text messages that get buried.

This use case turns OpenClaw into an always-on household coordinator: aggregating calendars into a morning briefing, monitoring messages for actionable items, and managing household logistics through a shared chat interface.

## Pain Point

- **Calendar fragmentation**: Work calendars have security restrictions preventing sharing. School calendars arrive as PDFs or hand-written websites. Camp schedules live in emails. Manually checking each one every morning is unsustainable — and "copying events across calendars works well until I forget and one slips through the cracks."
- **Household coordination overhead**: "How much milk do we have?" requires physically checking the fridge, then the basement pantry, then texting back. Multiply this across a week's worth of grocery runs.
- **Missed appointments**: Appointment confirmations arrive via text message and sit there unacted upon — no calendar event, no driving time buffer, no reminder.

## What It Does

- **Morning briefing**: Aggregates all family calendars into a single daily summary delivered via your preferred channel
- **Ambient message monitoring**: Watches iMessage/text conversations and automatically creates calendar events when it detects appointments (dentist confirmations, meeting plans, etc.)
- **Driving time buffers**: Adds travel time blocks before and after detected appointments
- **Household inventory**: Maintains a running inventory of pantry/fridge items that either partner can query from anywhere
- **Grocery coordination**: Deduplicates ingredients across recipes, tracks what's running low, and generates shopping lists
- **Photo-based input**: Snap a photo of a school calendar or freezer contents and the agent processes it into structured data

## Skills You Need

- Calendar API access (Google Calendar, Apple Calendar via `ical`)
- `imessage` skill for message monitoring (macOS only)
- Telegram or Slack for the shared family chat interface
- File system access for inventory tracking
- Camera/photo processing for OCR of physical calendars

## How to Set It Up

### 1. Calendar Aggregation

Configure OpenClaw to pull from all family calendar sources:

```text
## Calendar Sources

On morning briefing (8:00 AM):

1. Fetch my Google Work Calendar (read-only OAuth)
2. Fetch shared Family Google Calendar
3. Fetch partner's calendar (shared view)
4. Check ~/Documents/school-calendars/ for any new PDFs → OCR and extract events
5. Check recent emails for calendar attachments or event invitations

Compile into a single briefing:
- Today's events (all calendars, color-coded by source)
- Upcoming 3-day lookahead for conflicts
- Any new events added since yesterday
- Weather context for outdoor events

Deliver via Telegram/Slack family channel.
```

### 2. Ambient Message Monitoring

This is the key differentiator — the agent watches passively and acts when it recognizes something actionable:

```text
## Message Monitoring (HEARTBEAT.md)

Every 15 minutes:
1. Check new iMessages across all conversations
2. Detect appointment-like patterns:
   - "Your appointment is confirmed for..."
   - "Can we meet on [date] at [time]?"
   - "Practice moved to Saturday at 3pm"
3. When detected:
   - Create calendar event with details
   - Add 30-minute driving buffer before AND after
   - Send confirmation to family Telegram: "Created: Dentist appointment, Tue 2pm. Added drive time 1:30-2:00 and 3:00-3:30."
   - If relevant to partner, add invite
4. Detect promise/commitment patterns:
   - "I'll send that over by Friday"
   - "Let's do dinner next week"
   → Create calendar hold or reminder
```

### 3. Household Inventory

```text
## Pantry Tracking

Maintain ~/household/inventory.json with:
- Item name, quantity, location (fridge/pantry/basement)
- Last updated timestamp
- Low-stock threshold

Update methods:
- Photo: User sends photo of fridge/pantry → vision model extracts items
- Text: "We're out of eggs" / "Bought 2 gallons of milk"
- Receipt: Photo of grocery receipt → update inventory

Query: Either partner can ask via Telegram:
- "Do we have butter?" → Check inventory, respond with location and quantity
- "What's running low?" → List items below threshold
- "Generate grocery list" → Compile low-stock items + any recipe ingredients needed
```

## Key Insights

- **Ambient > active**: The biggest unlock is the agent acting without being asked. Detecting an appointment in a text message and creating a calendar event with driving buffers — "I didn't ask it to do that. It just knew that's what I'd want."
- **Mac Mini is the sweet spot**: This use case benefits heavily from running on a home Mac Mini — iMessage integration, Apple Calendar, and always-on availability
- **Start read-only**: Begin with calendar reading and message monitoring before enabling write actions (creating events, sending messages)
- **Shared Telegram channel**: Gives both partners visibility into what the agent is doing — builds trust and catches errors early
- **Photo input is underrated**: Snapping a photo of a school calendar PDF or freezer contents is faster than typing — and the vision model handles it well

## Inspired By

This use case combines several community patterns:

- **Calendar aggregation**: Described by HN user `angiolillo` in [a Hacker News discussion](https://news.ycombinator.com/item?id=46872465), who detailed the pain of checking work, personal, family, and kids' school calendars separately each morning.
- **Ambient message monitoring**: Documented by [Sparkry AI](https://sparkryai.substack.com/p/24-hours-with-openclaw-the-ai-setup) — when a wife received a dental appointment text, OpenClaw automatically created a calendar event with 30-minute driving buffers, without being asked. Also confirmed on the [OpenClaw Showcase](https://openclaw.ai/showcase) where `@theaaron` called chat-based calendar management "one of the best uses of an LLM I've ever experienced."
- **Household coordination**: Brandon Wang's [Clawdbot "Linguini"](https://brandon.wang/2026/clawdbot) running on a Mac Mini at home — handling text message follow-ups, creating calendar events from photos, tracking Airbnb prices, processing freezer inventory photos, and coordinating household logistics via iMessage and Slack.
- **Pantry tracking**: Multiple HN users discussed the value (and challenge) of maintaining household inventory, with `dns_snek` noting: "I forget where I put things down 5 seconds ago... It's genuinely a big problem for me because I let things expire."

## Related Links

- [OpenClaw iMessage Skill](https://github.com/openclaw/openclaw)
- [Google Calendar API](https://developers.google.com/calendar)
- [Apple Calendar (EventKit)](https://developer.apple.com/documentation/eventkit)
- [OpenClaw Showcase — Calendar Testimonials](https://openclaw.ai/showcase)
