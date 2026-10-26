# Personal LifeOS with Search-First Memory

Most personal agents are good at capturing new information but weak at deciding where it belongs. Over time, the same event gets copied into multiple notes, follow-up thoughts lose their original context, and a successful API response is mistaken for a successful memory.

This workflow connects OpenClaw to the documents and structured tables you already use, then applies a conservative loop: **search → decide → write → read back**. It has been used in a real personal Feishu workspace for diary updates, idea continuation, project and habit routing, and recalling past behavioral patterns.

## Pain Point

Personalization is often treated as a model-training or vector-database problem. In practice, a general-purpose agent can already become much more personal if it can reliably:

- find the relevant piece of prior context;
- distinguish a diary entry from an idea, project, task, habit, or activity log;
- update the original record instead of creating a duplicate;
- ask one short question when multiple destinations are plausible;
- verify that every write landed in the intended place.

## What It Does

- Merges multiple messages about the same day or event into one diary entry.
- Finds earlier notes that explain a recurring state or behavior pattern.
- Routes new information to diary, ideas, projects, tasks, habits, or activity logs.
- Searches before writing and prefers an append or field-level patch over creating a new record.
- Treats the user's explicitly named destination as authoritative.
- Reads the target back before reporting success.
- Uses an operation identifier or equivalent ledger to prevent retry duplicates.

## Skills You Need

- A messaging channel supported by OpenClaw, such as Feishu/Lark, Telegram, or Discord.
- Read and search access to your existing documents.
- Schema-aware read and write access to your structured tables or database.
- A small routing policy and resource map stored in the agent workspace.

Feishu documents and Bitable work well for this setup, but the same pattern can use Markdown, Notion, or any workspace that supports search, narrow writes, and readback.

## How to Set It Up

1. Inventory your existing documents and tables using read-only access. Do not create a new knowledge system yet.

2. Create a resource map that records the purpose, schema, identifiers, and allowed write operations for each destination.

3. Give the agent a routing policy with rules such as:

```text
Before writing anything:
1. Decide whether I am only talking or asking you to remember/change something.
2. If I name a destination, use that destination.
3. Search the relevant existing documents or records.
4. Update a unique match; create only when no match exists.
5. If multiple matches are plausible, ask me one short question and do not write.
6. Read the result back before you say it succeeded.
7. Never infer deadlines, priority, completion, or a stable personality trait.
```

4. Implement one narrow path first, for example: natural-language input → search today's diary → append one event → read it back.

5. Test the failure cases before expanding:

- Send the same message twice and confirm it is not duplicated.
- Create two similarly named records and confirm the agent asks which one you mean.
- Simulate a failed write and confirm the agent does not claim success.
- Explicitly name a destination and confirm it overrides automatic routing.

6. Expand to ideas, projects, tasks, habits, and activity logs only after the first path passes.

You can also hand the full blueprint to an agent with this prompt:

```text
Read AGENTS.md and docs/BUILD_WITH_YOUR_AGENT.md in the Beike LifeOS repository.
First inspect my existing workspace using read-only access. Do not create or
modify anything yet. Return a resource map and the smallest implementation
plan, then wait for my approval before making changes.
```

## Key Insights

- **File structure is part of personalization.** Stable titles and explicit destinations often solve the first version without a vector database.
- **Update beats capture.** A useful personal agent continues the original context instead of producing more fragments.
- **Uncertainty should be visible.** One clarification question is safer than a confident write to the wrong place.
- **Readback is mandatory.** Tool success is not the same as the intended content being stored correctly.
- **The durable asset is your own structure.** Models, agent frameworks, and storage tools can be replaced while your files and rules remain portable.

## Privacy and Safety

- Keep credentials, tenant identifiers, document IDs, and private text out of public repositories.
- Use allowlists for readable and writable resources.
- Disable bulk edits, deletion, sharing, and permission changes by default.
- Publish re-typeset and redacted examples rather than raw conversation screenshots.

## Related Links

- [Beike LifeOS blueprint](https://github.com/ludowang/beike-lifeos)
- [OpenClaw](https://github.com/openclaw/openclaw)
- [OpenClaw Feishu/Lark channel documentation](https://docs.openclaw.ai/channels/feishu)
