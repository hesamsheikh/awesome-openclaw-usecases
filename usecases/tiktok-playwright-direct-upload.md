# TikTok Upload via Playwright Direct

Upload videos to TikTok Studio headlessly via Playwright — no API key, no third-party scheduler, just cookies and a browser script.

## Pain Point

TikTok has no official upload API for creators. Third-party schedulers cost money, require API keys, and add unnecessary middlemen. Browser-based upload is the only free option, but doing it manually for every video — logging in, picking the file, typing the caption, dismissing popups — is tedious and doesn't scale.

## What It Does

Automates the entire TikTok Studio upload flow using Playwright's chromium-headless-shell:

- **Cookie-based auth** — Converts Netscape cookie files to Playwright JSON format and injects them via `context.addCookies()`, so you never handle passwords
- **File upload** — Finds the hidden `input[type="file"]` element and uses `setInputFiles()` to upload the video
- **Caption setting** — Bypasses Playwright's `fill()` (which doesn't work on contenteditable divs) by using `page.evaluate()` to set `textContent` and dispatch input events directly
- **Popup dismissal** — Automatically clicks "Got it" on copyright check dialogs and "Cancel" on "Turn on" prompts that appear after upload
- **Post submission** — Uses JS `.click()` via `evaluate()` instead of Playwright's `click()` because modals intercept pointer events; the real Post button sits at `y > 1400` on the page
- **Success verification** — Confirms upload by checking for a redirect to `/tiktokstudio/content`

## Prompts

**Convert cookies:**
```text
Convert my tiktok_cookies.txt (Netscape format) to Playwright JSON format and save to /tmp/tiktok_cookies_cdp.json
```

**Upload a video:**
```text
Upload /path/to/video.mp4 to TikTok with caption "Your caption here #hashtags #viral"
```

**Batch upload:**
```text
Upload all videos in /content/queue/ to TikTok, one at a time. Use the caption from each video's .md file. Wait 2 minutes between uploads.
```

## Skills Needed

- **Playwright** — Built-in or via `npm install playwright`; uses `chromium_headless_shell` (not full Chromium)
- **Cookie management** — Netscape → Playwright JSON conversion script
- **FFmpeg** (optional) — For pre-processing videos to 9:16, 1080x1920 before upload

## Key Gotchas

- **Don't use `fill()` on contenteditable** — It silently fails. Use `page.evaluate()` to set `textContent` and dispatch an input event.
- **Don't use Playwright `click()` on Post** — Modals overlay the button and intercept pointer events. Use `page.evaluate(() => document.querySelector('button').click())` instead.
- **Post button position** — The submit "Post" button is at `y > 1400`. The nav tab "Posts" (plural) at `y ~232` is a different element — don't confuse them.
- **Viewport height** — Use 1600px viewport height so the Post button is visible without scrolling issues.
- **Modals appear after upload** — A copyright check popup ("Got it") and a "Turn on" prompt ("Cancel") must be dismissed before setting the caption or posting.
- **httpOnly cookies** — Netscape format doesn't include httpOnly, but Playwright's `addCookies()` sets them via CDP which bypasses this limitation.

## Related Links

- [Playwright Documentation](https://playwright.dev/)
- [TikTok Studio](https://www.tiktok.com/tiktokstudio/upload)
