# ClawBridge

**The OpenClaw Mobile Dashboard. Monitor agent's real-time thoughts, actions, track token costs, and manage tasks from anywhere using your pocket-sized Mission Control.**

## Pain Point
OpenClaw agents often run on headless servers or home labs. Monitoring their "thoughts" (Chain of Thought) and managing background tasks typically requires an SSH session or a desktop browser, which is inconvenient on mobile devices. Additionally, tracking the cumulative financial cost of LLM tokens in real-time is difficult without a dedicated dashboard.

## What It Does
ClawBridge is an open-source, lightweight sidecar for OpenClaw that transforms your agent into a mobile-ready mission control center.

- **Real-time Monitoring**: Stream live reasoning logs and tool execution events directly to your phone via WebSocket.
- **Token Economy**: Automatically track and aggregate daily/monthly LLM costs based on actual usage.
- **Remote Command**: A dedicated "Mission Control" panel to trigger cron jobs, restart the gateway, or emergency stop scripts from anywhere.
- **Zero-Config Remote**: Automatically handles secure networking via VPN (Tailscale/WireGuard) or zero-config Cloudflare Tunnels.
- **PWA Support**: Install it as a mobile app for a native, full-screen experience.

## Installation
Run the one-liner on your OpenClaw server:
```bash
curl -sL https://clawbridge.app/install.sh | bash
```

## Skills Needed
- `message` (For notifications)

## Related Links
- **Website**: [https://clawbridge.app](https://clawbridge.app)
- **GitHub**: [dreamwing/clawbridge](https://github.com/dreamwing/clawbridge)
- **OpenClaw**: [https://github.com/openclaw/openclaw](https://github.com/openclaw/openclaw)
