# OpenClaw + Opik Tracing and Cost Observability

Running OpenClaw in production quickly creates an observability gap: failures happen across LLM calls, tool execution, and sub-agent orchestration, but the debugging context is often scattered across logs.

This use case shows how to add end-to-end tracing to OpenClaw with `@opik/opik-openclaw`, so you can inspect traces, spans, errors, and cost/usage in one place.

## Pain Point

- **Low traceability across agent runs**: It's hard to correlate one user request with all downstream LLM/tool/sub-agent activity.
- **Slow incident triage**: Root-causing failures requires jumping between gateway logs and provider dashboards.
- **Cost blind spots**: Token/cost patterns are hard to monitor per workflow or per project.

## What It Does

- Sends OpenClaw events to Opik as structured traces and spans
- Captures:
  - LLM request/response spans
  - Tool call spans (inputs/outputs/errors)
  - Sub-agent lifecycle spans
  - Run finalize metadata
  - Usage and cost metadata
- Adds CLI setup/status flow for fast operational rollout

## Prompts

You can ask OpenClaw to run lightweight ops checks after setup:

```text
Run a gateway health check, send a test message, then summarize any failed tool calls from today's Opik traces.
```

```text
For the last 24 hours, list the top workflows by token and cost usage from Opik traces and suggest one optimization each.
```

## Skills Needed

- Core OpenClaw CLI usage
- No additional OpenClaw skills required

## How to Set It Up

1. Install plugin:

```bash
openclaw plugins install @opik/opik-openclaw
```

2. Configure:

```bash
openclaw opik configure
```

3. Validate effective settings:

```bash
openclaw opik status
```

4. Generate a test trace:

```bash
openclaw gateway run
openclaw message send "hello from openclaw"
```

5. Open Opik and verify trace + span ingestion.

## Related Links

- [opik-openclaw repository](https://github.com/comet-ml/opik-openclaw)
- [Opik documentation](https://www.comet.com/docs/opik/)
- [OpenClaw plugin docs](https://docs.openclaw.ai/plugin)
