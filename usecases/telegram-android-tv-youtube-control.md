# Telegram + Android TV YouTube Remote Control

Control an Android TV from Telegram with OpenClaw, including opening YouTube, searching by keyword, and auto-submitting the first result after a short delay.

## Pain Point

Typing YouTube search terms on a TV remote is slow and frustrating. Voice search is not always reliable, especially for mixed-language keywords.

## What It Does

- Connects to Android TV over ADB on local network
- Opens YouTube on command
- Searches a requested keyword
- Waits 2–3 seconds
- Sends one `OK` key automatically to enter/select the first item
- Supports basic TV controls (wake/sleep/home/ok/navigation)

This setup is useful for quick hands-free content launching from Telegram.

## Prompts

Use natural prompts like:

- `開電視`
- `轉YouTube`
- `YouTube 搜尋：拉布拉多警長 2秒後按一次 OK`
- `開啟YouTube,等待3秒後按下一次ok`

You can also standardize a single command style such as:

- `搜尋Youtube <keyword>`

## Skills Needed

- A local TV-control skill (ADB-based)
- OpenClaw cron (optional, for scheduled routines)
- Telegram channel integration

## Implementation Notes

- TV and OpenClaw host must be on the same LAN
- Enable ADB debugging on TV (and pair/authorize if required)
- Keep TV IP configurable (default can be fixed, but override should be supported)
- Preserve command scripts as deterministic wrappers to avoid LLM drift

### Example script behavior

`tv-youtube-search-submit.ps1`

1. Connect ADB to TV
2. Run YouTube search with provided query
3. Sleep for N seconds (default 3)
4. Send one `OK` keyevent

## Related Links

- OpenClaw: https://github.com/openclaw/openclaw
- Android Debug Bridge (ADB): https://developer.android.com/tools/adb
