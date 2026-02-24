# Second Brain

You come up with ideas, find interesting links, hear about books to read — but you never have a good system for capturing them. Notion gets complex, Apple Notes becomes a graveyard of 10,000 unread entries. You need something as simple as texting a friend.

This workflow turns OpenClaw into a memory-capture system you interact with via text message, backed by a custom searchable UI you can browse anytime.

## What It Does

- Text anything to your OpenClaw via Telegram, iMessage, or Discord — "Remind me to read a book about local LLMs" — and it remembers it instantly
- OpenClaw's built-in memory system stores everything you tell it permanently
- A custom Next.js dashboard lets you search through every memory, conversation, and note
- Global search (Cmd+K) across all memories, documents, and tasks
- No folders, no tags, no complex organization — just text and search

## Pain Point

Every note-taking app eventually becomes a chore. You stop using it because the friction of organizing is higher than the friction of forgetting. The key insight is: **capture should be as easy as texting, and retrieval should be as easy as searching**.

## Skills You Need

- Telegram, iMessage, or Discord integration (for text-based capture)
- Next.js (OpenClaw builds this for you — no coding needed)

## How to Set It Up

1. Make sure your OpenClaw is connected to your preferred messaging platform (Telegram, Discord, etc.).

2. Start using it immediately — just text your bot anything you want to remember:
```text
Hey, remind me to read "Designing Data-Intensive Applications"
Save this link: https://example.com/interesting-article
Remember: John recommended the restaurant on 5th street
```

3. Build the searchable UI by prompting OpenClaw:
```text
I want to build a second brain system where I can review all our notes,
conversations, and memories. Please build that out with Next.js.

Include:
- A searchable list of all memories and conversations
- Global search (Cmd+K) across everything
- Ability to filter by date and type
- Clean, minimal UI
```

4. OpenClaw will build and deploy the entire Next.js app for you. Navigate to the URL it provides and you have your second brain dashboard.

5. From now on, whenever you think of something — on the road, in a meeting, before bed — just text your bot. Come back to the dashboard whenever you need to find something.

## Key Insights

- The power is in the **zero-friction capture**. You don't need to open an app, pick a folder, or add tags. Just text.
- OpenClaw's memory system is cumulative — it remembers *everything* you've ever told it, making it more powerful over time.
- You can text your bot from your phone and it builds things on your computer. The interface is the conversation.

## Based On

Inspired by [Alex Finn's video on life-changing OpenClaw use cases](https://www.youtube.com/watch?v=41_TNGDDnfQ).

## Related Links

- [OpenClaw Memory System](https://github.com/openclaw/openclaw)
- [Building a Second Brain (Tiago Forte)](https://www.buildingasecondbrain.com/)
