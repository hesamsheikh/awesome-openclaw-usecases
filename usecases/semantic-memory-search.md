# Semantic Memory Search

OpenClaw's built-in memory system stores everything as markdown files — but as memories grow over weeks and months, finding that one decision from last Tuesday becomes impossible. There is no search, just scrolling through files.

This use case adds **vector-powered semantic search** on top of OpenClaw's existing markdown memory files using [memsearch](https://github.com/zilliztech/memsearch), so you can instantly find any past memory by meaning, not just keywords.

## What It Does

- Index all your OpenClaw markdown memory files into a vector database (Milvus) with a single command
- Search by meaning: "what caching solution did we pick?" finds the relevant memory even if the word "caching" does not appear
- Hybrid search (dense vectors + BM25 full-text) with RRF reranking for best results
- SHA-256 content hashing means unchanged files are never re-embedded — zero wasted API calls
- File watcher auto-reindexes when memory files change, so the index is always up to date
- Works with any embedding provider: OpenAI, Google, Voyage, Ollama, or fully local (no API key needed)

## Pain Point

OpenClaw's memory is stored as plain markdown files. This is great for portability and human readability, but it has no search. As your memory grows, you either have to grep through files (keyword-only, misses semantic matches) or load entire files into context (wastes tokens on irrelevant content). You need a way to ask "what did I decide about X?" and get the exact relevant chunk, regardless of phrasing.

## Skills You Need

- No OpenClaw skills required — memsearch is a standalone Python CLI/library
- Python 3.10+ with pip or uv

## How to Set It Up

1. Install memsearch:
```bash
pip install memsearch
```

2. Run the interactive config wizard:
```bash
memsearch config init
```

3. Index your OpenClaw memory directory:
```bash
memsearch index ~/path/to/your/memory/
```

4. Search your memories by meaning:
```bash
memsearch search "what caching solution did we pick?"
```

5. For live sync, start the file watcher — it auto-indexes on every file change:
```bash
memsearch watch ~/path/to/your/memory/
```

6. For a fully local setup (no API keys), install the local embedding provider:
```bash
pip install "memsearch[local]"
memsearch config set embedding.provider local
memsearch index ~/path/to/your/memory/
```

## Key Insights

- **Markdown stays the source of truth.** The vector index is just a derived cache — you can rebuild it anytime with `memsearch index`. Your memory files are never modified.
- **Smart dedup saves money.** Each chunk is identified by a SHA-256 content hash. Re-running `index` only embeds new or changed content, so you can run it as often as you like without wasting embedding API calls.
- **Hybrid search beats pure vector search.** Combining semantic similarity (dense vectors) with keyword matching (BM25) via Reciprocal Rank Fusion catches both meaning-based and exact-match queries.

## Related Links

- [memsearch GitHub](https://github.com/zilliztech/memsearch) — the library powering this use case
- [memsearch Documentation](https://zilliztech.github.io/memsearch/) — full CLI reference, Python API, and architecture
- [OpenClaw](https://github.com/openclaw/openclaw) — the memory architecture that inspired memsearch
- [Milvus](https://milvus.io/) — the vector database backend
