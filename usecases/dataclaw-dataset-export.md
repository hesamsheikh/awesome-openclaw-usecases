# DataClaw: Export Conversation History to Hugging Face

Your OpenClaw conversation history contains thousands of real-world human-AI coding interactions. That data disappears unless you export it. DataClaw parses your session logs, redacts secrets and PII, and publishes the result as a structured dataset on Hugging Face — contributing to a growing open repository of AI coding collaboration data.

## What It Does

- Converts OpenClaw (and Claude Code, Codex, Gemini CLI, OpenCode) session logs into structured JSONL data
- Automatically redacts secrets, API keys, and PII before publishing
- Uploads the dataset to Hugging Face tagged with `dataclaw` so it becomes part of a [distributed community dataset](https://huggingface.co/datasets?other=dataclaw)
- Walks you through confirmation and attestation steps before anything is published

## Pain Point

AI companies train on the world's freely shared data but make it difficult to share AI conversation data in return. DataClaw closes that loop, letting you contribute your own real coding sessions back to the open-source community.

## Skills You Need

- No extra OpenClaw skills required — DataClaw is a standalone Python tool
- A [Hugging Face](https://huggingface.co) account (free) for publishing

## How to Set It Up

Paste the following prompt into OpenClaw:

```text
Help me export my OpenClaw conversation history to Hugging Face using DataClaw.
Install it, set up the skill, then walk me through the process.

STEP 1 — INSTALL
  pip install dataclaw
  If that fails: git clone https://github.com/peteromallet/dataclaw.git /tmp/dataclaw && pip install /tmp/dataclaw

STEP 2 — INSTALL SKILL
  dataclaw update-skill claude

STEP 3 — START
  dataclaw prep
  Every dataclaw command outputs next_steps in its JSON — follow them through the entire flow.

STEP 3A — CHOOSE SOURCE SCOPE (REQUIRED BEFORE EXPORT)
  Ask me explicitly: Claude Code, Codex, Gemini CLI, OpenCode, OpenClaw, or all?
  dataclaw config --source "openclaw"
  Do not export until source scope is explicitly confirmed.

STEP 3B — PRESENT ALL FOLDERS (REQUIRED BEFORE EXPORT)
  dataclaw list --source "openclaw"
  Send the FULL project/folder list in a message. Ask which projects to exclude.
  dataclaw config --exclude "project1,project2" OR dataclaw config --confirm-projects
  Do not export until folder selection is explicitly confirmed.

STEP 4 — REVIEW + CONFIRM (REQUIRED BEFORE PUSH)
  dataclaw export --no-push --output /tmp/dataclaw_export.jsonl
  Review PII findings and apply excludes/redactions as needed.
  Ask for my full name for an exact-name privacy scan.
  dataclaw confirm --full-name "MY FULL NAME" --attest-full-name "..." --attest-sensitive "..." --attest-manual-scan "..."

STEP 5 — PUBLISH (ONLY AFTER MY EXPLICIT APPROVAL)
  dataclaw export --publish-attestation "User explicitly approved publishing to Hugging Face."
  Never publish unless I explicitly say yes.
```

## Related Links

- [DataClaw on GitHub](https://github.com/peteromallet/dataclaw)
- [Community datasets tagged dataclaw](https://huggingface.co/datasets?other=dataclaw)
- [Hugging Face](https://huggingface.co)
