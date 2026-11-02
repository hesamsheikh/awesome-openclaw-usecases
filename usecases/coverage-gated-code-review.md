# Coverage-Gated Multi-Pass Code Review

Force OpenClaw through an append-only deliberation ledger before it can finish a coding or review task, ensuring every file in scope is graded across 4 distinct perspectives (`skeptic`, `builder`, `dreamer`, `empath`) and consecutive passes converge with zero churn.

## Pain Point

When you ask an autonomous coding agent to audit a repository or review a multi-file pull request before merging, two failure modes happen repeatedly:
1. **Partial-coverage quitting**: The agent inspects 8 out of 12 files, declares the codebase clean, and stops early.
2. **Rubber-stamping or thrashing**: On a second pass, the agent either agrees with everything it just wrote (sycophancy) or invents cosmetic nitpicks indefinitely (precision drops from 49% to 29% by pass 4 in unconstrained self-refine loops).

Without a deterministic state machine outside the LLM prompt, the agent decides for itself when it has "thought enough."

## What It Does

- Enumerates every file or unit in scope (`ponder units --diff main` or `--scan src/`) and records it in an append-only ledger (`.ponder/<slug>/ledger.jsonl`).
- Requires a pre-pass churn prediction (`ponder predict`), per-unit rubric grading across 6 dimensions (`ponder grade`), and 4 distinct perspectives (`skeptic`, `builder`, `dreamer`, `empath`) in `ponder deliberate`.
- Computes objective convergence signals (`coverage`, `novelty`, `churn`, `thrash`, `surprise`, `stall`, `confidenceFloor`) via `ponder judge`.
- Blocks `ponder decide stop` if any unit is ungraded (`coverage < 1.00`) or if `minPasses` has not been reached.
- Reconciles `units.json` and `findings.json` against the append-only ledger via `ponder verify` to detect manual tampering.

## Skills Needed

- [ponder](https://github.com/Quinnod345/ponder) (`clawhub install ponder` or `npx @quinnod345/ponder install --openclaw`) - zero-dependency Node.js CLI and OpenClaw skill (`SKILL.md`).

## How to Set It Up

1. Install the `ponder` skill into your OpenClaw workspace (or via ClawHub):

```bash
npx @quinnod345/ponder install --openclaw
# or via ClawHub:
clawhub install ponder
```

2. Add this rule to your OpenClaw coding agent prompt or `AGENTS.md`:

```text
Before opening a pull request or marking a code audit complete, run a 2-pass Ponder deliberation loop (`ponder start "<task>" --lens code --min-passes 2`).

Rules:
- Seed the unit inventory from git diff (`ponder units --diff main`) so no modified file is skipped.
- Do not finish the task until `ponder judge` reports `coverage: 1.00` and `churn: 0.00` on Pass 2 and `ponder verify` reconciles the ledger.
```

## Real World Example

Running OpenClaw + `ponder` across production open-source agent repositories surfaced subtle multi-file bugs that single-pass review missed, resulting in merged upstream fixes:

1. **[`EveryInc/compound-engineering-plugin#1919`](https://github.com/EveryInc/compound-engineering-plugin/pull/1919)** (merged): Caught an installer path where target conversion clobbered user prompt files and accumulated backup directories on repeated runs.
2. **[`addyosmani/agent-skills#766`](https://github.com/addyosmani/agent-skills/pull/766)** (merged): Caught a `simplify-ignore.sh` hook edge case where re-indented placeholders failed restoration and `Stop` hook cleanup left state behind.
3. **[`steipete/CodexBar#839`](https://github.com/steipete/CodexBar/pull/839)** (merged): Caught a SweetCookieKit browser cookie import bug in CodexBar.

## Prompts

```text
Audit the current branch against main using the ponder skill (`--lens code --min-passes 2`). Grade every touched file, deliberate from all 4 perspectives (skeptic, builder, dreamer, empath), fix any findings scoring below 4/5, and run passes until coverage is 1.00 and churn reaches 0.00.
```

## Related Links

- [Ponder GitHub Repository](https://github.com/Quinnod345/ponder)
- [Ponder on npm (`@quinnod345/ponder`)](https://www.npmjs.com/package/@quinnod345/ponder)
- [Empirical Ablation Study (`studies/ablation.md`)](https://github.com/Quinnod345/ponder/blob/main/studies/ablation.md)
