# Native iOS Push for Agent Completion Events

When an OpenClaw run finishes while you are away from the Gateway chat, a native iOS notification can be easier to notice than a buried chat message. This use case adds a small, explicit notification path for completion events without claiming to repair OpenClaw's core Web Push, dashboard, or browser relay.

## Pain Point

Long-running agents, cron jobs, and subagent work can finish after you leave the desktop. Polling the dashboard or a chat channel adds friction and can miss the completion entirely.

## What It Does

`reply-push-v2` sends native push notifications through the official OpenClaw iOS app for the supported `agentFinished` event. The Free edition covers that event; the optional Pro edition adds other documented event categories. A single-device setup can use the paired iPhone node and the plugin's documented defaults.

## Tested Setup

The package was verified from a clean npm package install/load test for version `2.1.1`. The public repository contains the manifest, installation instructions, and the Free/Pro capability boundary.

1. Pair the official OpenClaw iOS app/node with the Gateway.
2. Install the plugin:

```bash
openclaw plugins install reply-push-v2
```

3. Run an agent task and wait for the supported completion event.
4. Confirm the notification on the paired iPhone.

If npm installation is unavailable, use the manual fallback documented in the repository. Do not paste Gateway or APNs credentials into the prompt; follow the repository's configuration guidance.

## Example Prompt

```text
Notify my paired iPhone when this OpenClaw task finishes. Do not send intermediate updates.
```

## Scope and Limits

- This is a notification path for supported plugin events, not a fix for OpenClaw core Web Push, UI, gateway, or browser-relay bugs.
- A paired iOS node and the official OpenClaw app are required.
- The Free edition covers `agentFinished`; other categories are documented separately.
- Review the plugin source and permissions before installing third-party code.

## Related Links

- [reply-push-v2 repository](https://github.com/verdeoc/reply-push-v2)
- [reply-push-v2 on ClawHub](https://clawhub.ai/verdeoc/plugins/reply-push-v2)
- [OpenClaw plugin documentation](https://docs.openclaw.ai/tools/plugin)
