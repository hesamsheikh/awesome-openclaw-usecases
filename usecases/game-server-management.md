# Game Server Management via API

Running a multiplayer game server for your community means dealing with hosting dashboards, config files, mod installations, and restarts — all through web UIs designed for humans. If you manage servers across multiple games, the friction multiplies.

This use case connects OpenClaw to a game server hosting API, letting your agent order, configure, start, stop, and monitor dedicated game servers through natural conversation.

## Pain Point

Managing game servers through traditional hosting panels involves:

- Navigating web dashboards to change a single config value (max players, difficulty, mods)
- Manually checking if the server is online, how many players are connected, or whether it crashed
- Switching between different hosting providers or panels for each game
- Restarting servers, updating settings, or reading logs requires multiple clicks and page loads
- No way to automate recurring tasks like "restart the Valheim server every morning at 6 AM" or "change the map on Rust every Friday"

## What It Does

- **Order servers**: Purchase and deploy a new dedicated game server with a chosen plan, region, and game — all from chat
- **Lifecycle control**: Start, stop, and restart servers with a single message
- **Configuration**: Read and update server settings (max players, difficulty, passwords, mods) without touching a web panel
- **Monitoring**: Check server status, player count, and connection details on demand
- **Console access**: Send RCON / console commands directly to the running game server
- **Log inspection**: Pull recent server logs to diagnose crashes or issues
- **Multi-game support**: Same API pattern works across 17+ games — Valheim, Palworld, Rust, ARK, Factorio, and more

## Supported Games

ARK: Survival Ascended, Counter-Strike 2, Enshrouded, Factorio, HumanitZ, Hytale, Necesse, Palworld, Project Zomboid, Rust, Satisfactory, Sons of the Forest, Terraria, Unturned, V Rising, Valheim, and Vintage Story.

## Skills You Need

- HTTP requests (`fetch` / `curl`) to call the REST API
- A [Supercraft](https://supercraft.host) hosting account

No custom MCP server needed — the API is a standard REST endpoint that any agent can call.

## How to Set It Up

### 1. Get API Access

Sign up at [supercraft.host](https://supercraft.host) and get your API credentials. The API is documented at [claws.supercraft.host](https://claws.supercraft.host/documentation-for-agents/getting-started.md) with per-game guides (e.g., [Valheim Server API](https://claws.supercraft.host/valheim-server-api)).

### 2. Agent Configuration

Add this to your `AGENTS.md`:

```text
## Game Server Management

I can manage dedicated game servers via the Supercraft API.

API base: https://claws.supercraft.host
Auth: Bearer token (JWT) — obtained via login-link or purchase flow
Security: Never paste tokens into AGENTS.md or commit them to git.
  Load the token from environment variables or a secret manager at runtime.

Available actions:
- List my servers: GET /servers
- Server details & status: GET /servers/{id}
- Start/stop/restart: POST /servers/{id}/start|stop|restart
- View config: GET /servers/{id}/config
- Update config: PUT /servers/{id}/config
- Connection info: GET /servers/{id}/connection
- Send console command: POST /servers/{id}/console
- View logs: GET /servers/{id}/logs
- Browse available games: GET /catalog/games

When the user asks about their game server:
1. List servers to find the right one
2. Check status before taking action
3. Confirm destructive operations (restart, config changes) before executing
```

### 3. Example Conversations

**Check server status:**
> "Is my Valheim server running?"

The agent calls `GET /servers`, finds the Valheim deployment, calls `GET /servers/{id}` for live status, and responds:

> "Your Valheim server is online with 3/10 players connected. It's been running for 14 hours."

**Change a setting:**
> "Set max players to 20 on my Palworld server"

The agent fetches the current config, updates the `max_players` field, and applies it:

> "Done — max players updated to 20. The server needs a restart for this to take effect. Want me to restart it?"

**Order a new server:**
> "I want to host a Factorio server for my friends, something cheap"

The agent checks `GET /catalog/games/fac`, shows available plans with pricing, and after confirmation calls `POST /orders/purchase` with the selected product.

**Debug a crash:**
> "My Rust server seems down, check what happened"

The agent checks status (`stopped`), pulls recent logs via `GET /servers/{id}/logs`, identifies the error, and offers to restart.

## Key Insights

- **REST API = no MCP needed**: The API uses standard HTTP with JWT auth, so any agent with `fetch` or `curl` can use it — no custom skill installation required
- **Per-game API guides**: Each game has a dedicated guide (e.g., `/valheim-server-api`) with real product IDs and pricing, so the agent can make accurate purchase recommendations
- **Config is game-aware**: The config schema endpoint returns field definitions (types, ranges, defaults) specific to each game, so the agent knows what values are valid
- **Console commands enable deep control**: RCON access lets the agent run in-game commands — ban players, change weather, broadcast messages — not just manage the hosting layer

## Related Links

- [Supercraft Game Server Hosting](https://supercraft.host)
- [API Getting Started Guide](https://claws.supercraft.host/documentation-for-agents/getting-started.md)
- [API Reference (OpenAPI)](https://claws.supercraft.host/docs)
- [Machine-readable discovery](https://supercraft.host/llms.txt)
