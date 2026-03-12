# Auditable Project Memory & Decision Recall

Long-running OpenClaw projects eventually hit a memory problem: the agent remembers *something*, but you cannot quickly tell **what changed, why it changed, where that context came from, or whether it should still be trusted**.

This workflow uses [openclaw-mem](https://github.com/phenomenoner/openclaw-mem) as a local-first memory layer for project work. Instead of treating memory like a black box, you keep a ledger you can inspect, query, and review before old context quietly shapes new decisions.

## Pain Point

In longer projects, context starts to drift.

You ask:
- "Why did we stop using that library?"
- "What changed since the last working version?"
- "What is this answer based on?"

Without an auditable memory layer, the agent can surface stale or weakly-sourced context and you have no fast way to verify it. Search alone helps, but it does not solve the trust problem.

## What It Does

- Captures project observations into a local JSONL + SQLite memory ledger
- Gives you a deterministic recall loop: **search → timeline → get**
- Lets you inspect recent decision history without loading giant memory files into context
- Produces JSON receipts so recall and review are easier to audit
- Supports read-only memory hygiene checks, so you can review stale or bloated memory before changing anything
- Helps keep weaker or stale memories from taking over the agent's limited context window

## Skills You Need

- [`openclaw-mem`](https://github.com/phenomenoner/openclaw-mem)
- Python 3.13 + [`uv`](https://github.com/astral-sh/uv)
- OpenClaw (optional if you want to add auto-capture later)

## How to Set It Up

1. Clone and install:

```bash
git clone https://github.com/phenomenoner/openclaw-mem.git
cd openclaw-mem
uv sync --locked
```

2. Quick-test the local ledger:

```bash
uv run --python 3.13 --frozen -- python -m openclaw_mem --json status
```

3. Ingest notes, decisions, or sample memory into the database:

```bash
python3 ./scripts/make_sample_jsonl.py --out ./sample.jsonl
uv run --python 3.13 --frozen -- python -m openclaw_mem ingest --file ./sample.jsonl --json
```

4. Use the recall loop to inspect what the system would surface:

```bash
uv run --python 3.13 --frozen -- python -m openclaw_mem search "OpenClaw" --limit 10 --json
uv run --python 3.13 --frozen -- python -m openclaw_mem timeline 2 --window 2 --json
uv run --python 3.13 --frozen -- python -m openclaw_mem get 1 --json
```

5. Run a read-only memory hygiene pass:

```bash
uv run --python 3.13 --frozen -- python -m openclaw_mem optimize review --json --limit 200
```

6. If you already run OpenClaw, add the sidecar plugin so observations are captured automatically:

```bash
ln -s ./extensions/openclaw-mem ~/.openclaw/plugins/openclaw-mem
openclaw gateway restart
```

Then ingest captured observations:

```bash
uv run --python 3.13 --frozen -- python -m openclaw_mem ingest \
  --file ~/.openclaw/memory/openclaw-mem-observations.jsonl --json
```

## Prompt / Workflow

Once the ledger is populated, use it as a check before acting on old context:

```text
Before answering questions about past decisions on this project:
1. Check openclaw-mem first
2. Prefer recent, well-supported context
3. If the memory looks stale or weakly grounded, say so explicitly
4. Cite the memory receipt or source note when relevant
```

## Key Insights

- **Receipts beat vibes.** It is much safer to ask "what is this answer based on?" than to assume the agent remembered correctly.
- **Local-first memory is easier to trust.** You can inspect the ledger directly instead of treating memory as hidden state.
- **Memory quality is mostly about selection.** In long-running projects, the hard part is not only storing more context — it is deciding what still deserves space in the window.
- **Sidecar-first adoption keeps risk low.** You can prove value with local capture and recall before changing anything deeper in your OpenClaw setup.

## Related Links

- [openclaw-mem GitHub](https://github.com/phenomenoner/openclaw-mem)
- [Quickstart](https://github.com/phenomenoner/openclaw-mem/blob/main/QUICKSTART.md)
- [Auto-capture plugin](https://github.com/phenomenoner/openclaw-mem/blob/main/docs/auto-capture.md)
- [About the product](https://github.com/phenomenoner/openclaw-mem/blob/main/docs/about.md)
- [OpenClaw](https://github.com/openclaw/openclaw)
