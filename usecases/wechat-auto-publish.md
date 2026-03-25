# Auto WeChat Official Account Publishing

## Pain Point

Publishing a long markdown article to WeChat Official Account is repetitive and error-prone when done manually in the browser every time.

## What It Does

This setup lets OpenClaw publish markdown from chat channels (Feishu/Telegram/Web UI) to WeChat via a `publish_wechat` skill and a Gateway service.

- OpenClaw sends raw markdown to Gateway (no markdown-to-HTML conversion in OpenClaw)
- Gateway creates a publish task and returns status
- If login is required, OpenClaw shows a QR image for WeChat login
- User confirms login and OpenClaw continues the publish flow

## Prompts

Natural language trigger:

```text
帮我把这篇文章发到微信公众号上去
```

Skill command examples:

```text
/publish_wechat
/publish_wechat status <task_id>
/publish_wechat confirm <task_id>
/publish_wechat relogin
```

Example operator flow:

1. Paste markdown article in the chat
2. Send `帮我把这篇文章发到微信公众号上去` (or `/publish_wechat`)
3. If status is `waiting_login`, scan the QR code image
4. Send `/publish_wechat confirm <task_id>`
5. Use `/publish_wechat status <task_id>` to check final status

## Skills Needed

- Custom OpenClaw skill: `publish_wechat`
  - Supports: publish, status, confirm, relogin

## Related Links

- OpenClaw: https://github.com/openclaw/openclaw
- WeChat publish gateway implementation: https://github.com/xu75/openclaw-wechat-gateway
