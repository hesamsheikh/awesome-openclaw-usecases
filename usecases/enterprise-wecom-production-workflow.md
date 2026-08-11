# Enterprise WeCom Workflow with Deterministic Writes and Human Handoff

Putting an OpenClaw agent into a business chat is straightforward. Letting it safely write to business systems is harder.

This pattern was shaped by an anonymized enterprise WeCom workflow that uses two role-based OpenClaw agents. It keeps reasoning in the agent while moving writes, retries, state, and audit into deterministic controls.

## Pain Point

A prompt-only design tends to mix business rules, workflow state, exception handling, and output formatting in one place. That makes it difficult to test and dangerous to retry.

The most useful production failure was not a hallucination: an external action succeeded, but its response was parsed incorrectly. The agent treated the action as failed and retried it, creating a duplicate write.

Adding “do not retry” to the prompt was not enough. The workflow needed transaction controls outside the model.

## What It Does

- Keeps WeCom as the surface where business requests already arrive
- Gives role-based agents bounded operating perspectives instead of using one universal assistant
- Uses skills for independently testable capabilities
- Routes every external write through a deterministic adapter
- Persists business idempotency keys, locks, state, and audit records outside the model
- Returns explicit `success`, `failure`, or `already_completed` states
- Stops out-of-bound work and creates a structured package for a named human owner

## Architecture

```text
WeCom message
  -> role-based OpenClaw agent
  -> bounded skill
  -> deterministic validation and write adapter
  -> business system / task record
  -> explicit success, failure, or already_completed state

Out-of-bound request
  -> structured handoff package
  -> named human owner
  -> decision written back
  -> resume from a known workflow node
```

The five responsibilities stay separate:

1. **Work surface** — WeCom receives the request and returns status.
2. **Role-based agent** — interprets the request from one operating perspective.
3. **Skill** — performs one bounded, testable capability.
4. **Operating rules** — define stop conditions, permissions, and handoff requirements.
5. **Deterministic state and write layer** — owns writes, locks, deduplication, result parsing, and audit.

## Skills You Need

- A WeCom channel/plugin supported by your OpenClaw deployment
- Field extraction and validation
- Rule or knowledge retrieval with source and version metadata
- A deterministic adapter for task or record creation
- A database or durable store for idempotency keys and workflow state
- Structured human handoff

## How to Set It Up

### 1. Define the business operation

Choose a stable identifier for the business object and action. Do not use the model response, timestamp, or retry number as the key.

```text
idempotency_key = hash(tenant_id + business_object_id + operation_type)
```

### 2. Put the write behind an adapter

The adapter should:

1. validate required fields;
2. acquire a lock or rely on a unique database constraint;
3. check whether the idempotency key already completed;
4. perform the external action once;
5. persist the result before returning;
6. return a machine-readable result contract.

Example result contract:

```json
{
  "status": "success | failure | already_completed",
  "operation_id": "stable-operation-id",
  "retryable": false,
  "message": "short diagnostic for the operator"
}
```

### 3. Add the operating boundary to `AGENTS.md`

```markdown
## External action boundary

Before any external write:
1. Validate all required business fields.
2. Create a stable idempotency key from the business object and action.
3. Call the deterministic adapter once.
4. Accept only explicit states: success, failure, already_completed.
5. Never infer write success from natural-language output.

Stop and hand off when:
- the authoritative rule version is unclear;
- the action is outside the approved permission boundary;
- a failure would be irreversible;
- two owners give conflicting instructions;
- the external result cannot be parsed safely.

The handoff package must include:
- the original request;
- extracted facts;
- sources and rule versions;
- actions already taken;
- the stop reason and risk;
- one decision required from the person;
- the workflow node to resume from.
```

### 4. Test failure and recovery before normal use

Inject at least these cases:

- the external action succeeds but the response is delayed;
- the same message is delivered twice;
- the response is ambiguous or cannot be parsed;
- the rule version conflicts with the request;
- no human owner is available;
- the action is irreversible and outside the approved boundary.

Verify that a duplicate delivery returns `already_completed`, that ambiguous results stop instead of retrying, and that a human decision resumes from a known node.

## Key Insights

- Model instructions cannot provide transaction semantics for an external action.
- A successful API call is not safe until its state can be parsed unambiguously.
- Idempotency needs a business key, a lock or unique constraint, and explicit result states.
- Human handoff is a workflow node, not a notification.
- Work surface and controllability should be selected before model intelligence.

## Related Links

- [Official WeCom OpenClaw plugin](https://github.com/WecomTeam/wecom-openclaw-plugin)
- [Field note and 12-point production checklist](https://hensq.com/en/articles/openclaw-enterprise-wecom/?utm_source=github&utm_medium=referral&utm_campaign=openclaw_wecom_production&utm_content=awesome_usecase_pr)

This use case intentionally excludes client identity, operating volume, commercial terms, and business outcomes. It shares only production facts, methods, and the failure that shaped the controls.
