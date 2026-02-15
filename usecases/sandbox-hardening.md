# Sandbox Hardening & Structural Isolation

Running AI agents with full access to `~/.openclaw/` means a single prompt injection or rogue script can read your bot tokens, API keys, and crypto store. Default sandbox configs mount everything read-write, relying on the agent's good behavior rather than actual isolation.

This use case replaces policy-based trust with **structural isolation** — secrets are physically unreachable from inside the sandbox, config is read-only, and resource limits prevent runaway processes.

## Pain Point

Out of the box, OpenClaw's sandbox mounts `~/.openclaw/:rw` as a single volume. This means:

- The agent can read `credentials/` (channel auth tokens), `secrets.env` (all API keys), and `matrix/` (crypto store)
- The agent can modify `openclaw.json` (reconfigure itself)
- A compromised dependency or prompt injection gets full access to everything
- No memory, CPU, or PID limits — a runaway `crawl4ai` session can OOM the host
- No self-healing — if the gateway crashes at 3 AM, it stays down until you notice

## What It Does

- **Granular bind mounts**: 25 per-directory mounts with `:ro`/`:rw` modes matched to purpose — agent gets workspace read-write but config read-only
- **Secrets isolation**: `secrets.env` moved outside the mounted tree entirely; API keys injected as environment variables per-exec (never on the filesystem inside the sandbox)
- **Resource limits**: Memory (8 GB), CPU (4 cores), PID (512) caps on sandbox containers, applied automatically every 5 minutes
- **Self-healing timers**: Health check (3 min), sandbox liveness probe (5 min), daily maintenance with automated backups
- **Backups**: sqlite3-safe backup of agent memory databases and Matrix crypto store (survives corruption from mid-write copies)
- **Validation suite**: Isolation tests that verify secrets, credentials, and config are unreachable from inside the sandbox

## Skills You Need

- `exec` (shell command execution inside sandbox)
- Container runtime: Podman 5.x+ (Linux) or Docker Desktop (macOS/Windows)
- systemd (Linux) for timers and self-healing (launchd/Task Scheduler alternatives for other platforms)

## How to Set It Up

### 1. Replace Monolithic Mount with Granular Binds

In `openclaw.json`, replace the single `~/.openclaw:rw` bind with per-directory mounts:

```json
"binds": [
  "/home/USER/.openclaw/workspace:/agent-workspace:rw",
  "/home/USER/.openclaw/agents:/home/USER/.openclaw/agents:rw",
  "/home/USER/.openclaw/memory:/home/USER/.openclaw/memory:rw",
  "/home/USER/.openclaw/cron:/home/USER/.openclaw/cron:rw",
  "/home/USER/.openclaw/logs:/home/USER/.openclaw/logs:ro",
  "/home/USER/.openclaw/openclaw.json:/home/USER/.openclaw/openclaw.json:ro",
  "/home/USER/.openclaw/extensions:/home/USER/.openclaw/extensions:ro",
  "/home/USER/.openclaw/skills:/home/USER/.openclaw/skills:ro"
]
```

Key principle: `:rw` only where the agent must write (workspace, memory, cron). Everything else `:ro` or not mounted at all.

### 2. Move Secrets Out of the Mounted Tree

```bash
mkdir -p ~/.config/openclaw-secrets
chmod 700 ~/.config/openclaw-secrets
mv ~/.openclaw/secrets.env ~/.config/openclaw-secrets/secrets.env
chmod 600 ~/.config/openclaw-secrets/secrets.env
```

Load via systemd drop-in (Linux):

```ini
# ~/.config/systemd/user/openclaw-gateway.service.d/secrets.conf
[Service]
EnvironmentFile=%h/.config/openclaw-secrets/secrets.env
```

API keys reach the sandbox as env vars per-exec (`podman exec -e`), never as files on disk.

### 3. Apply Resource Limits

```bash
# Run periodically (or via timer) after sandbox container is created
for CID in $(podman ps -q --filter name=openclaw-sbx); do
    podman update --memory=8g --cpus=4 --pids-limit=512 "$CID"
done
```

### 4. Self-Healing Health Check

```bash
# healthcheck.sh — run every 3 minutes via systemd timer
GATEWAY_PORT=18789
FAILURES_FILE="${XDG_RUNTIME_DIR}/openclaw-health-failures"

if curl -sfk --max-time 3 "https://127.0.0.1:${GATEWAY_PORT}/health" > /dev/null 2>&1; then
    echo 0 > "$FAILURES_FILE"
    exit 0
fi

FAILURES=$(cat "$FAILURES_FILE" 2>/dev/null || echo 0)
FAILURES=$((FAILURES + 1))
echo "$FAILURES" > "$FAILURES_FILE"

if [ "$FAILURES" -ge 3 ]; then
    systemctl --user restart openclaw-gateway.service
    echo 0 > "$FAILURES_FILE"
fi
```

### 5. Verify Isolation

After setup, confirm from inside the sandbox:

```bash
CTR=$(podman ps -q --filter name=openclaw-sbx | head -1)

# These should all fail:
podman exec "$CTR" cat /root/.config/openclaw-secrets/secrets.env    # No such file
podman exec "$CTR" ls /home/USER/.openclaw/credentials/              # No such file
podman exec "$CTR" sh -c 'echo x >> /home/USER/.openclaw/openclaw.json'  # Read-only
podman exec "$CTR" find / -name "secrets.env" 2>/dev/null            # No results

# This should succeed:
podman exec "$CTR" touch /agent-workspace/.test                      # Writable
```

## Key Insights

- **Structural > policy**: Don't rely on the agent following rules about which files to read. If `credentials/` isn't mounted, it can't be read — no prompt injection changes that.
- **Env var paradox is an accepted trade-off**: Secrets aren't on the filesystem, but they're still in env vars (the agent needs API keys to function). `env` inside the sandbox will show them. This blocks file-discovery attacks while accepting that a determined agent can still read its own environment.
- **`network:host` is a necessary compromise on rootless Podman**: The pasta networking backend fails with `/dev/net/tun: No such device` in some environments. Bridge mode works on Docker Desktop. Host mode removes network isolation but the agent needs API access anyway.
- **Sandbox image has no custom labels**: `openclaw sandbox build` doesn't set labels. Don't use `--filter label=openclaw` for pruning — it matches nothing silently.
- **Resource limits must be applied post-creation**: OpenClaw v2026.2.13 doesn't support native resource config keys (`memory`, `cpus`, `pidsLimit` in openclaw.json). Use `podman update` / `docker update` via a timer.
- **sqlite3 `.backup` for memory DBs**: Raw `cp` of a sqlite database can produce a corrupt backup if the agent is writing during the copy. Always use `sqlite3 db.sqlite ".backup dest.sqlite"`.

## Full Guide

The complete 13-section setup guide with all bind mounts, shim configs, systemd units, backup scripts, and troubleshooting is available at:

**[openclaw-fortress](https://github.com/mzkri/openclaw-fortress)** — Production hardening for OpenClaw sandboxed agent execution.

## Related Links

- [OpenClaw Documentation](https://github.com/openclaw/openclaw)
- [openclaw-fortress (full guide)](https://github.com/mzkri/openclaw-fortress)
- [Podman Rootless Containers](https://docs.podman.io/en/latest/markdown/podman.1.html)
- [Self-Healing Home Server](self-healing-home-server.md) — complementary use case for infrastructure monitoring
