# YouTube Content Pipeline

As a daily YouTube creator, finding fresh, timely video ideas across the web and X/Twitter is time-consuming. Tracking what you've already covered prevents duplicates and helps you stay ahead of trends.

This workflow automates the entire content scouting and research pipeline:

• Hourly cron job scans breaking AI news (web + X/Twitter) and pitches video ideas to Telegram
• Maintains a 90-day video catalog with view counts and topic analysis to avoid re-covering topics
• Stores all pitches in a SQLite database with vector embeddings for semantic dedup (so you never get pitched the same idea twice)
• When you share a link in Slack, OpenClaw researches the topic, searches X for related posts, queries your knowledge base, and creates an Asana card with a full outline

## Skills you Need

- `web_search` (built-in)
- [x-research-v2](https://clawhub.ai) or custom X/Twitter search skill
- [knowledge-base](https://clawhub.ai) skill for RAG
- Asana integration (or Todoist)
- `gog` CLI for YouTube Analytics
- Telegram topic for receiving pitches

## How to Set it Up

1. Set up a Telegram topic for video ideas and configure it in OpenClaw.
2. Install the knowledge-base skill and x-research skill.
3. Create a SQLite database for pitch tracking:
```sql
CREATE TABLE pitches (
  id INTEGER PRIMARY KEY,
  timestamp TEXT,
  topic TEXT,
  embedding BLOB,
  sources TEXT
);
```
4. Prompt OpenClaw:
```text
Run an hourly cron job to:
1. Search web and X/Twitter for breaking AI news
2. Check against my 90-day YouTube catalog (fetch from YouTube Analytics via gog)
3. Check semantic similarity against all past pitches in the database
4. If novel, pitch the idea to my Telegram "video ideas" topic with sources

Also: when I share a link in Slack #ai_trends, automatically:
1. Research the topic
2. Search X for related posts
3. Query my knowledge base
4. Create an Asana card in Video Pipeline with a full outline
```
