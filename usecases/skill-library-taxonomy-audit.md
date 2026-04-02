# Skill Library Taxonomy Audit

Once an OpenClaw workspace grows beyond a handful of skills, the real problem is no longer "how do I add one more skill?" — it's **understanding what is already there**. Multiple skills start matching the same prompt, workspace copies drift away from root skills, orchestration layers bypass shared abstractions, and the router gets worse long before anybody notices.

This use case applies [skill-taxonomy](https://github.com/SeeleAI/skill-taxonomy) to your existing OpenClaw skill library so you can turn a messy skill folder into an **interactive architecture report**: layered graph, dependency map, routing conflicts, duplicate capabilities, layer violations, missing abstractions, and a prioritized cleanup list.

## What It Does

- Scans skill folders across root and workspace locations
- Classifies each skill into **L0 / L1 / L2** architecture layers
- Maps skill-to-skill dependencies and workspace ownership
- Detects routing conflicts, duplicate capabilities, layer violations, and missing abstractions
- Outputs a machine-readable JSON analysis plus an **interactive HTML report**
- Gives you a concrete audit surface before merging, deleting, or refactoring skills

## Pain Point

OpenClaw makes it easy to keep adding capabilities. That is exactly why mature setups become hard to reason about.

Typical failure modes:

- two or more skills appear equally valid for the same request
- a workspace overrides a root skill, then silently drifts
- task-level orchestration skills talk directly to low-level systems and skip shared abstractions
- deprecated or legacy skills continue to match and confuse routing
- nobody has a quick way to explain the skill system to new collaborators

A flat folder listing does not reveal any of that. You need a structural view, not another directory dump.

## Skills You Need

- [skill-taxonomy](https://github.com/SeeleAI/skill-taxonomy) — the analysis workflow and HTML report generator
- Python 3.10+ for `scripts/generate_graph.py`
- An OpenClaw workspace with enough skills to audit (root and/or workspace-level)

## How to Set It Up

1. Clone the analyzer:
```bash
git clone https://github.com/SeeleAI/skill-taxonomy.git
cd skill-taxonomy
```

2. Ask your agent to scan the target skill library and normalize the result into `/tmp/skill-taxonomy-data.json` following the contract in `SKILL.md`.

Example prompt:

```text
Audit my OpenClaw skill library with skill-taxonomy.
Scan all root and workspace skill directories, extract name/description/workspace/dependencies/external systems/deprecation signals,
classify each skill into L0/L1/L2, detect routing conflicts / duplicate capabilities / layer violations / missing abstractions,
and write the normalized result to /tmp/skill-taxonomy-data.json.
```

3. Generate the interactive report:
```bash
python3 scripts/generate_graph.py \
  --input /tmp/skill-taxonomy-data.json \
  --output /tmp/skill-taxonomy-graph.html
```

4. Open the result:
```bash
open /tmp/skill-taxonomy-graph.html
```

5. Use the report to decide what to merge, deprecate, rename, or re-layer before your next wave of skill work.

## Key Insights

- **Visibility comes before cleanup.** Most routing problems are architecture problems in disguise.
- **Layering helps force better boundaries.** L0/L1/L2 is useful not just for documentation, but for detecting violations automatically.
- **Duplicate capability is not harmless.** It increases router ambiguity and makes future maintenance harder.
- **Interactive output matters.** A graph + analysis panel is dramatically faster to reason about than raw markdown lists.

## Related Links

- [skill-taxonomy](https://github.com/SeeleAI/skill-taxonomy) — the repository used in this use case
- [OpenClaw](https://github.com/openclaw/openclaw) — the agent runtime this audits
