# AI File Manager (Claw Drive)

Stop manually organizing files. Send a file to your OpenClaw agent and it automatically categorizes, tags, deduplicates, and indexes it. Later, find any file with natural language — no more digging through nested folders.

## Pain Point

- Files scattered across `new-folder`, `new-folder(2)`, `final-version`, `final-FINAL-version`
- Finding an insurance card or medical report means 10 minutes of folder diving
- Duplicate downloads everywhere
- No consistent naming or organization

## What It Does

- **Auto-categorize**: Send a file (local, email, Telegram) → agent picks the right directory (`documents/`, `finance/`, `medical/`, etc.)
- **Auto-tag**: Agent generates description and tags based on content or filename
- **Dedup**: SHA-256 hash prevents storing the same file twice
- **Privacy-first**: Sensitive mode by default — if you don't explicitly allow content reading, it only uses the filename
- **Natural language search**: "Where's my cat's vet report?" → instant result
- **Cloud backup**: Optional Google Drive sync via fswatch + rclone

## Example

You say: "Store this car insurance card"

```
✅ Stored: insurance/car-insurance-id-2026.pdf
   Tags: insurance, auto, honda-civic
   Description: Acme Insurance, policy ****3441
```

Three months later: "What's my car insurance policy number?" → instant answer.

## Skills Needed

[Claw Drive](https://github.com/dissaozw/claw-drive) — open source CLI + JSONL index. Works as an OpenClaw skill.

## How to Set It Up

1. Clone and install the skill:
```bash
git clone https://github.com/dissaozw/claw-drive.git ~/.openclaw/skills/claw-drive
cd ~/.openclaw/skills/claw-drive && bash install.sh
```

2. Tell your agent about it:
```text
I want you to manage my files using Claw Drive. When I send you any file,
store it with appropriate category and tags. For sensitive documents (medical,
financial, legal), use sensitive mode — don't read the content, just use the
filename and any description I give you. For everything else, you can read
the content to generate better tags.
```

3. Optional — set up cloud backup:
```text
Set up Google Drive sync for my Claw Drive files so everything is backed up
automatically.
```

## Related Links

- [Claw Drive repo](https://github.com/dissaozw/claw-drive)
- [OpenClaw docs](https://docs.openclaw.ai)
