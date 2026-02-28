# Autonomous PBR Code Shipping Pipeline

You have a GitHub issue. By morning, there's a pull request with passing tests, green CI, and a code review already done — and you didn't write a single line.

This use case wires OpenClaw into a **Plan → Build → Review** pipeline where three specialized sub-agents handle each phase of software delivery. You describe the feature; the pipeline ships it.

## Pain Point

- **Context-switching kills momentum**: Switching between planning, implementation, and code review in a single agent session leads to shallow work at each phase
- **Quality collapses under speed pressure**: Without a dedicated reviewer, tests get skipped and coverage drops
- **Manual code review is a bottleneck**: Waiting for human review on every PR when an agent could catch 80% of issues immediately
- **Long tasks exhaust context windows**: A single agent trying to plan, implement, write tests, and review a large feature will run out of context before finishing

## What It Does

- **Planner agent** reads the GitHub issue, explores the codebase, and produces a detailed implementation spec — file list, function signatures, test plan, edge cases
- **Builder agent** receives only the spec (not the full conversation history) and implements: writes the code, writes the tests, opens the PR
- **Reviewer agent** reads the PR diff and spec independently — checks logic, tests, coverage, security, and style — then posts a structured review comment
- Each agent runs in an **isolated session** with the right model for its job (reasoning for Planner, coding for Builder, analytical for Reviewer)
- CI must be green before merge — the pipeline enforces this as a hard gate
- Outcome is logged to the **RSI loop** so the pipeline improves over time based on what reviewers keep catching

## Real Results

This pattern was used to ship multiple production features for an open-source L1 blockchain project:

| Feature | Tests | Coverage | Review findings fixed |
|---------|-------|----------|-----------------------|
| Block Explorer (Next.js 14) | 136 | 97.6% | 8 missing test files, 1 TypeScript bug |
| Testnet Faucet (Express.js) | 38/38 | 100% | Security: rate limiting verified |
| WebSocket Terminal (xterm.js) | 17 | — | `setInterval` leak + CSWSH vulnerability |
| Tool Loop Phase 2 (Go) | 10/10 | race-clean | Order-guarantee edge case |

Every PR was opened by the pipeline. Every Reviewer finding was real and non-trivial.

## Skills You Need

- `sessions_spawn` / `sessions_send` for isolated sub-agent execution
- `github` skill (`gh` CLI) for reading issues and opening PRs
- A cron job or heartbeat trigger to kick off the pipeline
- Shared workspace directory accessible to all agents
- (Optional) RSI loop skill for outcome tracking

## How to Set It Up

### Step 1: Define the orchestrator prompt

Add this to your `AGENTS.md` or a dedicated `ORCHESTRATOR.md`:

```markdown
## PBR Pipeline

When asked to implement a GitHub issue, always follow this sequence:

1. **PLAN** — Spawn a Planner agent. Give it: the issue text, repo name, relevant file paths.
   The Planner must output a PLAN.md with:
   - Goal and acceptance criteria
   - Files to create/modify
   - Function signatures and interfaces
   - Test plan with specific test cases
   - Known edge cases and risks

2. **BUILD** — Spawn a Builder agent. Give it ONLY: PLAN.md + repo access.
   The Builder must NOT see the planning conversation.
   Builder outputs: working code + tests + open PR.

3. **REVIEW** — Spawn a Reviewer agent. Give it: PR diff + PLAN.md.
   Reviewer must output a structured checklist:
   - [ ] Logic correctness
   - [ ] Test coverage (target: 85%+)
   - [ ] Edge cases handled
   - [ ] No security issues
   - [ ] CI passing
   If anything fails: Builder fixes, Reviewer re-checks.
   If all pass: approve and merge.
```

### Step 2: Model selection per phase

Match the model to the cognitive load of each phase:

```markdown
## Agent routing

Planner  → reasoning model (complex analysis, codebase exploration)
Builder  → coding model   (implementation, test writing, PR creation)
Reviewer → analytical     (diff review, logic verification)

Example config:
- Planner:  anthropic/claude-opus-4-6    (deep reasoning)
- Builder:  anthropic/claude-sonnet-4-6  (fast, high-quality code)
- Reviewer: anthropic/claude-sonnet-4-6  (structured analysis)
```

### Step 3: Trigger the pipeline

From your chat interface:

```text
Implement GitHub issue #42: Add rate limiting to the faucet endpoint.
Repo: myorg/myproject. Run full PBR pipeline.
```

Or automate it via cron — every morning, pick the top-priority open issue and run the pipeline:

```text
Every weekday at 2:00 AM:
1. Fetch the highest-priority open GitHub issue labeled "ready"
2. Run the PBR pipeline on it
3. Send me a summary of what was built when I wake up
```

### Step 4: Wire in the RSI loop (optional but recommended)

After each pipeline run, log the outcome:

```text
Log to RSI: task=code_generation, success=true, quality=4,
notes="Reviewer caught missing error handling in 2 functions. Builder fixed in 8 min."
```

Over time the pipeline self-improves: the Planner's prompts get more precise, the Builder's test patterns get stronger, the Reviewer's checklist expands.

### Step 5: Enforce quality gates in CI

In your repo's CI (GitHub Actions example):

```yaml
- name: Coverage check
  run: go test ./... -coverprofile=coverage.out && \
       go tool cover -func=coverage.out | \
       awk '/total/ { if ($3+0 < 85) { print "Coverage below 85%"; exit 1 } }'
```

The pipeline will not merge until this passes. The Reviewer agent checks CI status before approving.

## Key Insights

- **Isolation is the secret**: The Builder must NOT read the planning conversation. Give it only the spec. This prevents context contamination and forces the spec to be self-contained — which makes it better
- **The Reviewer always finds something**: In every run, the Reviewer catches at least one non-trivial issue. Don't skip it thinking the Builder is infallible
- **Planner time is never wasted**: A 5-minute planning phase prevents a 40-minute debugging session. Resist the urge to skip straight to Builder
- **Coverage is a proxy, not a goal**: Target 85%+ but instruct the Builder to write tests that actually test behavior, not just inflate coverage numbers
- **One issue per pipeline run**: Scope each run to a single, well-defined issue. Multi-feature PRs lead to shallow implementations across all features
- **The pipeline works overnight**: Queue 3–4 issues before you sleep. Wake up to reviewed, mergeable PRs
