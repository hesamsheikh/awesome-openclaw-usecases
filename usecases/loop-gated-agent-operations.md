# Loop-Gated Agent Operations

OpenClaw is useful as an always-on assistant, but recurring autonomous work can become hard to trust when every run is just "do the task and tell me what happened." For maintenance, project follow-up, code review, publishing, and operational checks, you usually need the agent to prove what it inspected, what it changed, which verifier passed, and when it should stop.

This use case wraps OpenClaw tasks in a small loop contract: inspect, act, verify, decide. The loop makes the agent produce evidence before it continues, stop after repeated verifier failures, and ask for human confirmation before external-impact actions.

## Pain Point

Long-running agents drift when prompts only describe the desired outcome:

- They may skip the boring readback step after publishing, sending, or editing something.
- They may keep retrying a failing action without narrowing the problem.
- They may report success from intention instead of evidence.
- Different tasks end up with inconsistent formats, making daily review or debugging harder.

## What It Does

Use a loop packet as the task handoff for OpenClaw. Each packet defines:

- **Goal**: the single outcome for this task run
- **Current State**: what is known before the agent starts
- **Cycle**: inspect -> act -> verify -> decide
- **Verifiers**: commands or checklist items that prove the task is complete
- **Stop Rules**: when to stop, rollback, or ask a human
- **Report Contract**: JSON-only status that can be logged, queried, or reviewed later

This is useful for tasks like:

- daily repo health checks
- project status follow-up
- pull request review follow-up
- documentation refreshes
- local service monitoring
- scheduled bug triage

## Skills Needed

- OpenClaw with the channels or tools you already use for task execution
- Shell or GitHub access when your loop needs code, CI, or repository checks
- Optional: [Ariadne Loop](https://github.com/zhangzeyu99-web/ariadne-loop) CLI or browser builder to generate loop packets

## How to Set It Up

### 1. Generate a loop packet

Use either the browser builder or the CLI:

```bash
ariadne-loop quickstart --output openclaw-loop-demo
```

For a custom recurring task:

```bash
ariadne-loop init --title "OpenClaw daily repo health" --output openclaw-health-snapshot.json
ariadne-loop make --input openclaw-health-snapshot.json --output openclaw-health-loop.json --format json
ariadne-loop packet --loop openclaw-health-loop.json --output openclaw-health-agent-packet.md
```

### 2. Paste the packet into OpenClaw

Give OpenClaw the generated packet as the task contract:

```text
Use this loop packet as your operating contract for this task.

Follow the cycle in order:
1. inspect
2. act
3. verify
4. decide

Do not continue after a failed verifier until you record the failure and narrow the next action.
Before publishing, sending, deleting, or changing external state, ask for human confirmation unless the packet explicitly allows it.
Return only the JSON report described in the Report Contract.
```

### 3. Add a scheduled run

For recurring work, add the packet to your OpenClaw schedule or heartbeat file:

```text
Every morning:
- Run the OpenClaw daily repo health loop.
- Inspect open notifications, failed checks, stale PRs, and recent commits.
- Verify the actual GitHub state before reporting success.
- Log the JSON report to the project history.
```

### 4. Review the JSON reports

The report contract gives you a stable record:

```json
{
  "action_id": "verify",
  "status": "stop",
  "evidence": ["python -m pytest -q passed", "GitHub PR state read back as open"],
  "next_step": "No action needed until the next scheduled run",
  "passed_verifiers": ["gate-1", "gate-2"],
  "failed_verifiers": []
}
```

## Tips

- Keep each loop focused on one operational outcome.
- Put risky actions behind human gates.
- Prefer verifiers that read the real target after action, not just local intention.
- Save report JSON lines so future OpenClaw runs can inspect previous failures before retrying.

## Related Links

- [Ariadne Loop](https://github.com/zhangzeyu99-web/ariadne-loop)
- [Ariadne Loop browser builder](https://zhangzeyu99-web.github.io/ariadne-loop/playground.html)
- [OpenClaw](https://github.com/openclaw/openclaw)
