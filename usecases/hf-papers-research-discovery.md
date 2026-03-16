# HF Papers Research Discovery

Keeping up with ML research means refreshing Hugging Face Papers daily, scanning dozens of titles, clicking into each one for the abstract, and manually cross-referencing GitHub repos. You want a conversational way to discover, triage, and deep-read trending papers without leaving your workspace.

This workflow combines two skills to create a full research discovery pipeline:

- Browse today's trending papers on Hugging Face — sorted by upvotes or date
- Search papers by keyword to find relevant work on any topic
- Get full paper metadata: abstract, authors, GitHub repos, community upvotes, AI-generated summaries
- Read community discussion and comments on any paper
- Deep-read the full LaTeX source of any paper via its arXiv ID (using arxiv-source)

## Skills you Need

- [hf-papers](https://github.com/openclaw/skills/tree/main/skills/willamhou/hf-papers) skill (4 tools: `hf_daily_papers`, `hf_search_papers`, `hf_paper_detail`, `hf_paper_comments`)
- [arxiv-source](https://github.com/openclaw/skills/tree/main/skills/willamhou/arxiv-source) skill (3 tools: `arxiv_fetch`, `arxiv_sections`, `arxiv_abstract`) — for full paper text

No Docker or authentication required — both skills use public APIs with local caching.

## How to Set it Up

1. Install both skills:
```bash
clawhub install hf-papers
clawhub install arxiv-source
```

2. Prompt OpenClaw with your research workflow:
```text
I want to stay on top of ML research. Here's my daily workflow:

1. Every morning, show me the top 10 trending papers on Hugging Face (sorted by upvotes)
   - For each paper, show: title, upvotes, GitHub repo (if any), and 1-line AI summary

2. When I say "search [topic]":
   - Search HF Papers and show the most relevant results
   - Highlight papers with linked GitHub repos or high upvote counts

3. When I pick a paper (by ID):
   - Show the full abstract, authors, and linked resources
   - Show community comments if any
   - Ask if I want a deep read

4. For deep reads:
   - Fetch the full paper via arxiv-source
   - Summarize key contributions, methodology, and results
   - Note any linked code repos I should check out

Keep a running list of papers I've reviewed today with one-line takeaways.
```

3. Try it: "What's trending on Hugging Face Papers today?"
