# Personal CRM with Automatic Contact Discovery

Keeping track of who you've met, when, and what you discussed is impossible to do manually. Important follow-ups slip through the cracks, and you forget context before important meetings.

This workflow builds and maintains a personal CRM automatically:

• Daily cron job scans email and calendar for new contacts and interactions
• Stores contacts in a structured database with relationship context
• Natural language queries: "What do I know about [person]?", "Who needs follow-up?", "When did I last talk to [person]?"
• Daily meeting prep briefing: before each day's meetings, researches external attendees via CRM + email history and delivers a briefing

## Skills you Need

- `gog` CLI (for Gmail and Google Calendar)
- Custom CRM database (SQLite or similar) or use the [crm-query](https://clawhub.ai) skill if available
- Telegram topic for CRM queries

## How to Set it Up

1. Create a CRM database:
```sql
CREATE TABLE contacts (
  id INTEGER PRIMARY KEY,
  name TEXT,
  email TEXT,
  first_seen TEXT,
  last_contact TEXT,
  interaction_count INTEGER,
  notes TEXT
);
```
2. Set up a Telegram topic called "personal-crm" for queries.
3. Prompt OpenClaw:
```text
Run a daily cron job at 6 AM to:
1. Scan my Gmail and Calendar for the past 24 hours
2. Extract new contacts and update existing ones
3. Log interactions (meetings, emails) with timestamps and context

Also, every morning at 7 AM:
1. Check my calendar for today's meetings
2. For each external attendee, search my CRM and email history
3. Deliver a briefing to Telegram with: who they are, when we last spoke, what we discussed, and any follow-up items

When I ask about a contact in the personal-crm topic, search the database and give me everything you know.
```
