# Personal Knowledge Base (RAG)

You read articles, tweets, and watch videos all day but can never find that one thing you saw last week. Bookmarks pile up and become useless.

This workflow builds a searchable knowledge base from everything you save:

• Drop any URL into Telegram or Slack and it auto-ingests the content (articles, tweets, YouTube transcripts, PDFs)
• Semantic search over everything you've saved: "What did I save about agent memory?" returns ranked results with sources
• Feeds into other workflows — e.g., the video idea pipeline queries the KB for relevant saved content when building research cards

## Skills you Need

- [knowledge-base](https://clawhub.ai) skill (or build custom RAG with embeddings)
- `web_fetch` (built-in)
- Telegram topic or Slack channel for ingestion

## How to Set it Up

1. Install the knowledge-base skill from ClawdHub.
2. Create a Telegram topic called "knowledge-base" (or use a Slack channel).
3. Prompt OpenClaw:
```text
When I drop a URL in the "knowledge-base" topic:
1. Fetch the content (article, tweet, YouTube transcript, PDF)
2. Ingest it into the knowledge base with metadata (title, URL, date, type)
3. Reply with confirmation: what was ingested and chunk count

When I ask a question in this topic:
1. Search the knowledge base semantically
2. Return top results with sources and relevant excerpts
3. If no good matches, tell me

Also: when other workflows need research (e.g., video ideas, meeting prep), automatically query the knowledge base for relevant saved content.
```

4. Test it by dropping a few URLs and asking questions like "What do I have about LLM memory?"
