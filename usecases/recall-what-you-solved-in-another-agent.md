# Recall what you already solved in another agent

You fixed a connection-pool timeout in Claude Code in June. In August the same
error shows up while you are driving OpenClaw. Instead of debugging it twice,
the agent asks the machine's own history first — the transcripts Claude Code,
Codex, Cursor and the other agents already wrote to disk, months before this.

What to use it for:

• "Didn't we fix this before?" — the answer, with the session it came from
• The command that actually worked here, with its real flags
• Which past sessions touched a file, before editing it
• Picking up in OpenClaw what you started in another agent

> Local only. No LLM, no embeddings, nothing leaves the machine; credentials are
> stripped as the index is built.

## Skills you Need
[deja-search](https://clawhub.ai/vshulcz/deja-search) skill, and the `deja`
binary it drives: `brew install deja-vu` or `npm i -g @vshulcz/deja-vu`.

For recall that arrives on its own rather than when asked, also run
`deja install openclaw-auto` — it adds a hook pack under `~/.openclaw/hooks`
(bootstrap digest) and a plugin that answers `before_prompt_build` on each
prompt. Set `hooks.internal.enabled` so the pack runs.

## How to Set it Up
Install the skill and the binary, then run once:

```text
deja install openclaw-auto
```

Then ask OpenClaw as you normally would:

```text
We had a pool timeout like this last month in another project — what did we do?
```

The agent searches the index and answers from the session it finds, naming it,
e.g. `deja-vu recalled: Jun 8, claude · api — raised max_conns and added a
clock-skew test`. Silence is the common case: when nothing in your history
matches, nothing is added.

## Notes
- The index is built from the session files the agents already keep
  (`~/.claude/projects`, `~/.codex/sessions`, `~/.openclaw/agents/*/sessions`
  and so on), so history from before you installed anything is searchable from
  the first minute.
- A transcript a client later deletes stays searchable; `deja forget <id>`
  drops one on purpose.
- Guide: https://vshulcz.github.io/deja-vu/guide/memory-for-openclaw.html
