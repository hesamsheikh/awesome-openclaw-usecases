# Skills Dependency Graph Analyzer

> **Visualize the hidden connections in the OpenClaw Skills ecosystem** — understand dependencies, find hubs, detect cycles before installing.

## Problem

OpenClaw's ecosystem has **5,400+ skills** in the ClawHub registry. When you want to install a skill, you might wonder:
- What other skills does this depend on?
- Are there circular dependencies (cycle hell)?
- Which skills are "foundational" that many others build upon?
- What skill clusters work well together?

Without this visibility, you might:
- Install a skill that pulls in 10 unexpected dependencies
- Hit conflicts from circular dependencies
- Miss foundational skills that are essential for your stack

## Solution

The **Skills Dependency Graph Analyzer** scans the ClawHub registry, parses skill manifests, and builds a visual map of all dependencies:

1. **Fetch** skills from ClawHub API
2. **Parse** dependency declarations (`depends_on`, `uses`, `requires`)
3. **Build** a directed graph of relationships
4. **Compute** hub scores (centrality), cluster detection, cycle detection
5. **Export** to Mermaid, Graphviz DOT, or JSON formats

## How It Works

```bash
# Clone the repo
git clone https://github.com/jingchang0623-crypto/openclaw-skills-dependency-graph.git

# Run the analyzer
python skills_graph.py --top 500 --output mermaid

# View the graph
# Paste dependency_graph.mmd into https://mermaid.live
```

## Key Insights

### Foundational Skills (Hubs)
Skills that others build upon most:

| Skill | Dependents | Why It's Foundational |
|-------|------------|----------------------|
| `http-client` | 98 | All API integrations need this |
| `oauth-handler` | 127 | Auth is required everywhere |
| `logger-pro` | 65 | Debugging is universal |
| `cache-layer` | 76 | Performance optimization |

### Cycle Detection
The tool identifies circular dependencies before they cause issues:

```mermaid
graph TD
    A --> B --> C --> A  %% Cycle detected!
```

### Skill Clusters
Discover natural "teams" of skills that work together:

- **Communication Cluster**: slack-bot, discord-bot, webhook-sender, oauth-handler
- **Data Cluster**: file-handler, cache-layer, data-validator, json-parser
- **AI Cluster**: prompt-templates, graph-rag, llm-router, embedding-store

## Real-World Usage

### Before Installing a Skill
```bash
python skills_graph.py --skill slack-messenger --depth 2
```
Shows the dependency tree for that specific skill.

### Security Audit
Focus on foundational skills — if `oauth-handler` has a vulnerability, 127 skills are affected.

### Skill Development
Understand where your skill fits in the ecosystem — who might depend on it?

## Output Formats

- **Mermaid**: Interactive diagrams (paste into mermaid.live)
- **Graphviz DOT**: For advanced visualization tools
- **JSON**: Programmatic access for custom analysis

## Links

- **GitHub**: [jingchang0623-crypto/openclaw-skills-dependency-graph](https://github.com/jingchang0623-crypto/openclaw-skills-dependency-graph)
- **By**: 妙趣AI ([miaoquai.com](https://miaoquai.com))

---

**Related Use Cases**:
- [Skill Quality Analyzer](../skill-quality-analyzer.md) — 5-dimension scoring for skills
- [Skills Sentinel](../skills-sentinel.md) — Monitoring skill performance