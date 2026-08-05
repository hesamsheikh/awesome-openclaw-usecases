# Hands-Free Voice Control of Your OpenClaw Gateway

If your OpenClaw gateway runs long jobs (research, deploys, content pipelines), you end up glued to the WebUI or Telegram to check progress, type follow-ups, and approve things. Away from your desk, the agent effectively goes quiet.

qwen-audio-agent is an open-source realtime voice runtime that connects to an OpenClaw Gateway over the official `openclaw acp` bridge, so you can run your gateway entirely by voice — from your Mac desktop, a terminal TUI, or a browser.

## Pain Point

OpenClaw's surfaces are text-first: WebUI, Telegram, CLI. That works for quick tasks, but long-running autonomous work means constant back-and-forth typing: "is it done yet?", "what's the status?", "cancel that and try this instead". You can't do that while cooking, walking, or in a meeting.

## What It Does

- **Full-duplex voice conversations**: talk to your OpenClaw gateway and interrupt it mid-answer (barge-in), like a phone call.
- **Native delegation to OpenClaw sessions**: heavy requests are delegated through OpenClaw's own session tools (`sessions_spawn` / `sessions_send` / `sessions_history`), so background work keeps running in your gateway while the conversation continues. When a task finishes, the result is spoken back into the same voice session.
- **Voice permission prompts**: tool/approval requests from OpenClaw arrive as spoken confirmations — say yes or no without touching a keyboard.
- **Local wake word**: the app sleeps on idle (sherpa-onnx keyword spotting runs fully local, no cloud), and your wake phrase brings it back.
- **Three surfaces**: macOS desktop app with an animated orb, terminal TUI, and web UI — same runtime.

## How to Set It Up

1. Install the runtime:

```bash
npm install -g qwen-audio-agent
```

2. Configure a DashScope API key (the realtime voice model) following the onboarding in the app or CLI.

3. In settings, choose the **OpenClaw** backend and point it at your gateway (WebSocket URL + gateway token). On first connection, approve the ACP device permission in OpenClaw.

4. Talk to it:

```text
"帮我看看刚才那个部署任务跑到哪一步了"
```

```text
"把这个仓库的依赖升级跑一下，有问题随时停下来问我"
```

```text
"取消刚才那个任务"
```

## Related Links

- qwen-audio-agent: https://github.com/QwenAudio/qwen-audio-agent
- Agent Client Protocol: https://agentclientprotocol.com
- OpenClaw ACP bridge: https://docs.openclaw.ai/cli/acp
