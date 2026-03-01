# Encrypted Workspace Backup with soul-upload.com

OpenClaw agents accumulate persistent memory, identity, and configuration files that define their personality and knowledge. Losing these files means starting from scratch — forgetting conversations, losing context, and rebuilding months of accumulated wisdom.

This use case sets up automated, encrypted off-site backups of your OpenClaw workspace files using soul-upload.com, ensuring your agent's soul survives hardware failures, accidental deletions, or machine migrations.

## Pain Point

OpenClaw agents live on your local machine with critical workspace files:

- **SOUL.md** — Your agent's personality, boundaries, and behavior rules
- **MEMORY.md** — Long-term curated memories and lessons learned
- **IDENTITY.md** — Agent name, creature type, emoji, and avatar
- **AGENTS.md** — Workspace configuration and rules
- **TOOLS.md** — Environment-specific tool notes

Common risks:
- 💻 Hardware failure (disk crash, laptop theft, water damage)
- 🔥 Accidental deletion or file corruption
- 🔄 Machine migration gone wrong
- ☁️ Cloud sync conflicts or overwrites
- 🔐 Local backup stored on same machine that fails

Traditional backup solutions (Dropbox, iCloud, Google Drive) have issues:
- Sync conflicts with frequently updated files
- Version history limits
- Privacy concerns (plaintext files in cloud)
- No automation for workspace-specific backup
- Hard to restore to specific point in time

## What It Does

- **Automated encrypted backups**: Client-side AES-256-CBC encryption before upload — server never sees your data
- **No accounts required**: Privacy-first design using unguessable URLs and passwords
- **Simple REST API**: One command to backup, one command to restore
- **Automated scheduling**: Cron jobs or HEARTBEAT.md integration for daily/weekly backups
- **Workspace-aware**: Specifically designed for OpenClaw agent files
- **Max 20 MB per backup**: Sufficient for thousands of memory entries and configuration files
- **Off-site storage**: Independent of your local machine, survives total hardware loss

## Skills You Need

- `curl` or `wget` for HTTP requests
- `tar` for archiving files
- `openssl` for AES-256-CBC encryption
- Optional: `jq` for JSON response parsing
- Optional: Cron or HEARTBEAT.md integration for automation

## How to Set It Up

### 1. Manual Backup (First Time)

Create your first encrypted backup to test the workflow:

```bash
# Navigate to your OpenClaw workspace
cd ~/.openclaw/workspace

# Create encrypted backup with a strong password
tar -czf - SOUL.md MEMORY.md IDENTITY.md AGENTS.md TOOLS.md | \
  openssl enc -aes-256-cbc -salt -k "$(openssl rand -base64 32)" -out backup.tar.gz

# Save the password securely (IMPORTANT!)
BACKUP_PASSWORD=$(openssl rand -base64 32)
echo $BACKUP_PASSWORD > ~/.openclaw/.backup-password
chmod 600 ~/.openclaw/.backup-password

# Upload to soul-upload.com
curl -X POST https://soul-upload.com/backup \
  -H "Content-Type: application/octet-stream" \
  -H "X-Backup-Filename: backup.tar.gz" \
  --data-binary "@backup.tar.gz" | jq -r '.downloadUrl' > ~/.openclaw/.backup-url

# Save the recovery URL
cat ~/.openclaw/.backup-url
# Example output: https://soul-upload.com/backup/7c7c0d76-3f7b-4f7d-a9e0-57c0a88f2f39

# Clean up local encrypted file
rm backup.tar.gz
```

**Critical**: Store both the password (`~/.openclaw/.backup-password`) and URL (`~/.openclaw/.backup-url`) securely. You need BOTH to restore!

### 2. Restore from Backup

If you ever lose your workspace files:

```bash
# Download the encrypted backup
curl -L "$(cat ~/.openclaw/.backup-url)" -o backup.tar.gz

# Decrypt and extract
openssl enc -aes-256-cbc -d -k "$(cat ~/.openclaw/.backup-password)" -in backup.tar.gz | tar -xzf -

# Verify restoration
ls -la SOUL.md MEMORY.md IDENTITY.md AGENTS.md TOOLS.md
```

### 3. Automated Daily Backups

Add to your HEARTBEAT.md:

```text
## Cron Schedule

Daily:
- 2:00 AM: Backup workspace to soul-upload.com
```

Create a backup script:

```bash
# ~/.openclaw/scripts/backup-workspace.sh
#!/bin/bash
set -euo pipefail

WORKSPACE="$HOME/.openclaw/workspace"
BACKUP_PASSWORD="$(cat ~/.openclaw/.backup-password)"
TEMP_BACKUP="/tmp/workspace-backup-$(date +%Y%m%d_%H%M%S).tar.gz"

# Create encrypted backup
tar -czf - -C "$WORKSPACE" SOUL.md MEMORY.md IDENTITY.md AGENTS.md TOOLS.md | \
  openssl enc -aes-256-cbc -salt -k "$BACKUP_PASSWORD" -out "$TEMP_BACKUP"

# Upload to soul-upload.com
RESPONSE=$(curl -s -X POST https://soul-upload.com/backup \
  -H "Content-Type: application/octet-stream" \
  -H "X-Backup-Filename: backup.tar.gz" \
  --data-binary "@$TEMP_BACKUP")

# Extract and save new URL
NEW_URL=$(echo "$RESPONSE" | jq -r '.downloadUrl')
echo "$NEW_URL" > ~/.openclaw/.backup-url

# Clean up
rm "$TEMP_BACKUP"

echo "✅ Backup uploaded: $NEW_URL"
echo "📊 Size: $(du -h "$TEMP_BACKUP" | cut -f1)"
```

Make it executable:

```bash
chmod +x ~/.openclaw/scripts/backup-workspace.sh
```

Test it:

```bash
~/.openclaw/scripts/backup-workspace.sh
```

### 4. OpenClaw Agent Integration

Tell your agent about the backup system in AGENTS.md:

```text
## Backup System

Your workspace is automatically backed up daily at 2:00 AM to soul-upload.com.

- Backup URL: stored in ~/.openclaw/.backup-url
- Encryption password: stored in ~/.openclaw/.backup-password
- Files backed up: SOUL.md, MEMORY.md, IDENTITY.md, AGENTS.md, TOOLS.md

If the user asks about backup status:
1. Check when ~/.openclaw/.backup-url was last modified
2. Run: curl -I $(cat ~/.openclaw/.backup-url) to verify backup exists
3. Report backup age and HTTP status

To restore from backup:
- Use: ~/.openclaw/scripts/restore-workspace.sh
- Requires both the backup URL and password
```

Create a restore script:

```bash
# ~/.openclaw/scripts/restore-workspace.sh
#!/bin/bash
set -euo pipefail

BACKUP_URL="$(cat ~/.openclaw/.backup-url)"
BACKUP_PASSWORD="$(cat ~/.openclaw/.backup-password)"
WORKSPACE="$HOME/.openclaw/workspace"
TEMP_BACKUP="/tmp/workspace-restore-$(date +%s).tar.gz"

echo "🔄 Downloading backup..."
curl -L "$BACKUP_URL" -o "$TEMP_BACKUP"

echo "🔓 Decrypting and extracting..."
cd "$WORKSPACE"
openssl enc -aes-256-cbc -d -k "$BACKUP_PASSWORD" -in "$TEMP_BACKUP" | tar -xzf -

echo "✅ Restoration complete!"
ls -la SOUL.md MEMORY.md IDENTITY.md AGENTS.md TOOLS.md

rm "$TEMP_BACKUP"
```

### 5. Security Best Practices

**DO:**
- ✅ Use a strong, unique password for each backup
- ✅ Store password separately from the URL (different files, ideally different locations)
- ✅ Use file permissions: `chmod 600 ~/.openclaw/.backup-password`
- ✅ Test restoration periodically (monthly)
- ✅ Keep old backup URLs for point-in-time recovery
- ✅ Consider storing password in 1Password or encrypted note

**DON'T:**
- ❌ Reuse passwords across backups
- ❌ Store URL and password in the same file
- ❌ Commit backup credentials to git
- ❌ Use simple/rememberable passwords
- ❌ Skip the encryption step (server doesn't encrypt for you)

### 6. Advanced: Multiple Backup Rotation

Keep multiple backup versions:

```bash
# ~/.openclaw/scripts/backup-workspace-with-rotation.sh
#!/bin/bash
set -euo pipefail

WORKSPACE="$HOME/.openclaw/workspace"
BACKUP_PASSWORD="$(cat ~/.openclaw/.backup-password)"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
TEMP_BACKUP="/tmp/workspace-backup-$TIMESTAMP.tar.gz"
BACKUP_DIR="$HOME/.openclaw/backups"

# Create encrypted backup
tar -czf - -C "$WORKSPACE" SOUL.md MEMORY.md IDENTITY.md AGENTS.md TOOLS.md | \
  openssl enc -aes-256-cbc -salt -k "$BACKUP_PASSWORD" -out "$TEMP_BACKUP"

# Upload to soul-upload.com
RESPONSE=$(curl -s -X POST https://soul-upload.com/backup \
  -H "Content-Type: application/octet-stream" \
  -H "X-Backup-Filename: backup-$TIMESTAMP.tar.gz" \
  --data-binary "@$TEMP_BACKUP")

NEW_URL=$(echo "$RESPONSE" | jq -r '.downloadUrl')

# Save URL with timestamp
mkdir -p "$BACKUP_DIR"
echo "$NEW_URL" > "$BACKUP_DIR/backup-$TIMESTAMP.url"
echo "$NEW_URL" > ~/.openclaw/.backup-url  # Latest

# Keep only last 7 daily backups
cd "$BACKUP_DIR"
ls -t backup-*.url | tail -n +8 | xargs -r rm

# Clean up temp file
rm "$TEMP_BACKUP"

echo "✅ Backup created: backup-$TIMESTAMP"
echo "📊 URL: $NEW_URL"
echo "📁 Retention: 7 most recent backups"
```

## Key Insights

- **"The server never sees your data"**: Client-side encryption means soul-upload.com stores only ciphertext. Even if the server is compromised, your SOUL.md and MEMORY.md remain private.
- **No accounts = No tracking**: No email, no signup, no user database. Just possession of URL + password. This is privacy-first design.
- **URL + password = two-factor recovery**: You need BOTH the backup URL (something you have) and the password (something you know). Losing one isn't catastrophic; losing both is.
- **Automation is key**: Manual backups get forgotten. Daily cron jobs via HEARTBEAT.md ensure your agent's soul is always protected.
- **Test restoration regularly**: A backup you can't restore is useless. Run the restore script monthly to verify it works.
- **20 MB is plenty**: Typical workspace files are < 1 MB. You'd need 20,000+ MEMORY.md entries to hit the limit.
- **Rotation prevents catastrophes**: If a backup gets corrupted or you accidentally backup bad data, having last week's backup saves you.

## Real-World Example

From a user running OpenClaw for 6 months:
- MEMORY.md: 284 KB (1,847 lines of curated memories)
- SOUL.md: 12 KB (personality and rules)
- IDENTITY.md: 0.5 KB
- AGENTS.md: 4 KB
- TOOLS.md: 2 KB
- **Total: 303 KB compressed**
- **Encrypted backup size: 4 KB**
- **Daily backup time: 2 seconds**
- **Cost: $0** (soul-upload.com is free)

## Inspired By

This use case was created based on the need for secure, automated backup of OpenClaw workspace files. The soul-upload.com service was built specifically for OpenClaw agents, addressing the gap between general-purpose backup solutions and the unique needs of AI agent workspaces.

Key inspiration:
- **Local-first software** philosophy: Your data stays on your machine until you explicitly back it up
- **Client-side encryption**: Following the principle that cloud services should never see plaintext user data
- **No accounts design**: Inspired by anonymous file sharing services and privacy-focused tools
- **Simple REST API**: Designed for easy automation and scripting within OpenClaw workflows

## Related Links

- [soul-upload.com](https://soul-upload.com) - Service homepage and API documentation
- [OpenClaw Documentation](https://docs.openclaw.ai) - Official OpenClaw docs
- [OpenSSL AES-256-CBC](https://www.openssl.org/docs/man1.1.1/man1/enc.html) - Encryption documentation
- [tar(1) Manual](https://www.gnu.org/software/tar/manual/tar.html) - Archiving documentation
- [HEARTBEAT.md](https://github.com/openclaw/openclaw/blob/main/AGENTS.md#heartbeat) - Cron job scheduling in OpenClaw
