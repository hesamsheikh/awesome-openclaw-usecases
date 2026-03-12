# Cloud Backup and Disaster Recovery for OpenClaw

## Pain Point

OpenClaw agents accumulate valuable state over time: memory files, cron jobs, skills, credentials, and configuration. A disk failure, OS reinstall, or machine migration can wipe all of it. Manual backup approaches (git, rsync, Time Machine) either miss credentials, don't encrypt at rest, or don't work across machines.

## What It Does

Sets up automated encrypted cloud backups of your entire OpenClaw workspace. Backups run on a schedule via cron, encrypt everything client-side before upload, and store encrypted snapshots in cloud storage. You can restore to the same machine or a completely different one with a single command. Includes a safe restore drill that verifies recovery works without touching your live workspace.

## Prompts

### Initial Setup

```text
Install the keepmyclaw skill and configure daily encrypted backups of my workspace.
```

### Verify First Backup

```text
Run a backup now and verify the snapshot was uploaded successfully. List my snapshots to confirm.
```

### Safe Restore Drill

```text
Run a restore drill into a temporary directory such as /tmp/keepmyclaw-restore-check so I can verify recovery works without touching my live workspace.
```

### Migrate to New Machine

On the new machine after installing OpenClaw:

```text
Install keepmyclaw and restore my latest backup from the cloud.
```

## Skills Needed

- [keepmyclaw](https://clawhub.ai/Ryce/keepmyclaw) — Encrypted cloud backup and restore for OpenClaw workspaces

```bash
clawhub install keepmyclaw
```

## What Gets Backed Up

- Workspace files (MEMORY.md, SOUL.md, USER.md, etc.)
- Memory directory (daily notes, long-term memory)
- Cron job configurations
- Installed skills
- Credentials and API keys (encrypted client-side)
- Config snapshots

## How It Works

1. Everything is encrypted locally with your passphrase before leaving your machine
2. Encrypted snapshots are uploaded to Cloudflare R2 cloud storage
3. The server never sees plaintext — only you can decrypt with your passphrase
4. Cron job runs backups automatically on your chosen schedule (daily recommended)
5. Restore pulls the encrypted snapshot and decrypts locally

> **⚠️ Passphrase Recovery:** Your encryption passphrase is the only way to decrypt backups. Store it outside your OpenClaw workspace (e.g., in a password manager or printed offline backup). If you lose the passphrase, cloud snapshots cannot be restored.

## Related Links

- [Keep My Claw](https://keepmyclaw.com) — Product page and pricing
- [Setup Guide](https://keepmyclaw.com/docs) — Full documentation
- [How to Verify Your First Backup](https://keepmyclaw.com/blog/openclaw-first-backup-proof.html)
- [Restoring Onto a Different Machine](https://keepmyclaw.com/blog/openclaw-new-machine-restore.html)
- [Backup Checklist](https://keepmyclaw.com/blog/openclaw-backup-checklist.html)
