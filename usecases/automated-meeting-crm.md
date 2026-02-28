# Automated Meeting CRM & Intel

You have a meeting in 30 minutes with someone you met once, six months ago. You scramble to remember what you talked about, check LinkedIn, maybe search your email. By the time the meeting starts, you're still not sure what they're working on now or what you discussed last time.

This workflow automatically builds and maintains a contact database from your calendar, enriches profiles with web research, and delivers pre-meeting intel briefs so you walk into every meeting prepared.

## What It Does

- Scans your calendar daily and extracts attendee names and email addresses
- Creates a contact file for every person you meet (stored as local Obsidian-compatible markdown)
- Enriches profiles with LinkedIn, company info, recent news, and role context via web search
- Before meetings, delivers a brief: who they are, what their company does, what you discussed last time, and suggested talking points
- After meetings (if you forward transcripts), updates the contact file with discussion notes
- Grows automatically — the more meetings you have, the richer your CRM becomes

## Pain Point

Professional relationships require context, but maintaining a CRM is tedious. Most people don't do it, so they walk into meetings cold. The data already exists in your calendar and email — it just needs an agent to organize it.

## Skills You Need

- [fulcra-context](https://skills.sh) — Calendar access via Fulcra's Life API (or any calendar integration)
- Web search (for contact enrichment)
- Email skill (for transcript ingestion, optional)
- Signal, Telegram, or iMessage (for pre-meeting alerts)
- Cron jobs (for daily intel and 30-min advance alerts)

## How to Set It Up

1. Create a CRM directory: `~/openclaw/crm/people/`

2. Prompt OpenClaw:
```text
You are my meeting intelligence system. Two jobs:

JOB 1 — Daily Intel (every morning at 7:45 AM):
- Pull today's calendar events
- For each meeting with external attendees:
  - Look up or create a file in ~/openclaw/crm/people/[name].md
  - Research the person: role, company, recent news, LinkedIn
  - Note what we discussed last time (if we've met before)
- Send me a brief on Signal with today's meeting lineup and key context

JOB 2 — 30-Minute Alerts:
- Check calendar every 15 minutes
- When a meeting is 30 min away, send a quick alert:
  "Meeting with [Name] in 30 min — [their role] at [company].
   Last discussed: [topic]. Suggested talking points: [X, Y, Z]"

Filters — DON'T brief me on:
- Internal recurring meetings (I already know these people)
- Focus time / writing blocks
- Large meetings (>5 people)

Contact file format:
---
name: [Full Name]
company: [Company]
role: [Title]
email: [Email]
linkedin: [URL]
last_meeting: [Date]
---
## Notes
- [Date]: [What we discussed]
```

3. To enrich with meeting transcripts, forward Otter.ai (or similar) summaries to your agent's email. The agent parses the transcript, identifies key discussion points, and updates the relevant contact files.

## What It Builds Over Time

After a few months, you have:
- A searchable database of everyone you've met professionally
- History of what you discussed with each person
- Automatic enrichment that keeps profiles current
- The ability to ask: "When did I last talk to [person]?" or "Who have I met from [company]?"

All stored as plain markdown files — no vendor lock-in, works with Obsidian, and fully portable.
