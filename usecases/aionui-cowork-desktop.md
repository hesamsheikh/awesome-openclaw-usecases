# OpenClaw as Desktop Cowork (AionUi) — Remote Rescue & Multi-Agent Hub

Use OpenClaw from a desktop Cowork UI, access it from Telegram or WebUI when you’re away, and fix it remotely when it won’t connect. AionUi is a free, open-source app that runs **OpenClaw as a first-class agent** alongside 12+ others (Claude Code, Codex, Qwen Code, etc.), with a built-in **OpenClaw deployment expert** for install, diagnose, and repair — including **remote rescue** when OpenClaw is down and you’re not at the machine.

## Why OpenClaw + AionUi

| If you want… | AionUi gives you… |
|---------------|--------------------|
| **Use OpenClaw with a real desktop UI** | Cowork workspace where you see OpenClaw (and other agents) read/write files, run commands, browse the web — not just terminal/chat. |
| **Fix OpenClaw when it’s broken and you’re remote** | Open AionUi via **Telegram or WebUI** from anywhere → use the **OpenClaw deployment expert** to run `openclaw doctor`, fix config, restart gateway. Many users rely on this. |
| **One place for OpenClaw + other agents** | OpenClaw, built-in agent, Claude Code, Codex, etc. in one app; switch or run in parallel, same MCP config for all. |
| **Remote access to your OpenClaw** | WebUI, Telegram, Lark, DingTalk — talk to the same AionUi instance (and thus OpenClaw) from phone or another device. |

## Pain Point

You already use OpenClaw from CLI or Telegram, but:

- You want to **see** what the agent is doing (files, terminal, web) instead of inferring from logs.
- When **OpenClaw won’t connect** and you’re not at the machine, you have no way to run `openclaw doctor` or fix config — you need remote access to something that can repair OpenClaw.
- You use several CLI agents (OpenClaw, Claude Code, Codex, …) and don’t want to juggle apps or reconfigure MCP for each.

## What It Does

- **OpenClaw as a Cowork agent**: Install AionUi and OpenClaw; AionUi auto-detects OpenClaw. Use OpenClaw from the same Cowork UI — file-aware workspace, visible actions.
- **Remote OpenClaw rescue**: When OpenClaw is broken or unreachable, open AionUi via **Telegram or WebUI** and use the built-in **OpenClaw deployment expert**. It helps with install, runs `openclaw doctor`, fixes config, restarts gateway, and walks you through recovery. A common pattern for users who run OpenClaw headless or on another machine.
- **Multi-agent in one app**: Run OpenClaw next to built-in agent (Gemini/OpenAI/Anthropic/Ollama), Claude Code, Codex, and 12+ others — one interface, parallel sessions.
- **MCP once, all agents**: Configure MCP servers in AionUi once; they sync to OpenClaw and every other agent — no per-agent MCP setup.
- **Remote access**: Use WebUI, Telegram, Lark, or DingTalk to reach your AionUi instance (and OpenClaw) from anywhere.
- **Optional automation**: AionUi cron can run OpenClaw (or other agents) on a schedule for 24/7 tasks.

## Skills You Need

- **OpenClaw** (e.g. `npm install -g openclaw@latest`). AionUi’s **OpenClaw Setup** assistant can guide install, gateway, and config.
- API keys or auth for your models (OpenClaw config + any built-in agent keys in AionUi).

## How to Set It Up

1. **Install AionUi**: [AionUi Releases](https://github.com/iOfficeAI/AionUi/releases) (macOS / Windows / Linux).
2. **Install OpenClaw** (if needed):
   ```bash
   npm install -g openclaw@latest
   openclaw onboard --install-daemon   # optional: daemon for 24/7
   ```
3. **Open AionUi**: It auto-detects OpenClaw. If not, use the in-app **OpenClaw Setup** assistant.
4. **Create a Cowork session** and choose OpenClaw. Same workspace, MCP, and (if enabled) remote channels.

For remote access or cron, configure channels and automation in AionUi settings.

## Related Links

- [AionUi GitHub](https://github.com/iOfficeAI/AionUi)
- [AionUi Website](https://www.aionui.com)
- [OpenClaw GitHub](https://github.com/openclaw/openclaw)
- [OpenClaw Docs](https://docs.openclaw.ai)
