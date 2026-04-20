# TikTok Video Upload via Playwright Direct

Uploading videos to TikTok programmatically typically requires the TikTok API (which has strict rate limits and approval requirements) or third-party schedulers with monthly fees. This approach uses Playwright browser automation to upload directly to TikTok Studio — no API key, no external service, no Python dependencies beyond what's already in the container.

## Pain Point

TikTok's official API for content uploading is restricted to approved partners and has rate limits that make batch uploading impractical. Third-party schedulers (Later, Hootsuite, Buffer) charge monthly fees and add their own limitations. If you're running an automated content pipeline that produces videos overnight, you need a way to push them to TikTok without manual intervention or paid tools.

## What It Does

A headless Chromium instance navigates to TikTok Studio, authenticates via injected cookies (no login flow needed), uploads the video file, sets the caption with hashtags, dismisses copyright-check modals, and clicks Post — all in one automated script.

- **Cookie-based auth** — No login flow. Export your TikTok session cookies once and reuse them via Playwright's `addCookies` API
- **Headless upload** — Runs in chrome-headless-shell (no display needed). Works in Docker containers and CI environments
- **Modal handling** — Automatically dismisses the copyright check popup ("Got it") and the "Turn on" upsell prompt ("Cancel")
- **Caption injection** — Sets the post caption by directly manipulating the contenteditable div via JavaScript (Playwright's `fill()` doesn't work on TikTok's rich text editor)

## Prompts

**Export cookies from your browser:**
```text
Use your browser's cookie export extension to export TikTok cookies in Netscape format. Save to tiktok_cookies.txt. Convert to Playwright JSON format for injection.
```

**Upload a video:**
```text
Upload the video at /path/to/video.mp4 to TikTok with the caption "Your caption here #hashtag1 #hashtag2". Use the Playwright Direct upload script. After upload, confirm the video URL.
```

**Batch upload from a queue:**
```text
Check the rendered clips directory for any unuploaded videos. For each one, extract the caption from the markdown package file and schedule an upload. Skip any that already have posted metadata.
```

## Skills Needed

- Playwright (built-in at `/opt/hermes/node_modules/`)
- chrome-headless-shell (pre-installed at `/opt/hermes/.playwright/`)
- Cookie file in Playwright JSON format

## How to Set It Up

1. **Export your TikTok cookies** from a logged-in browser session (Netscape format).
2. **Convert to Playwright format** — parse the Netscape cookie file into the JSON structure Playwright expects (`name`, `value`, `domain`, `path`, `secure`, `httpOnly`, `expires`, `sameSite`).
3. **Write the upload script** (Node.js, using Playwright's CDP):
   - Launch chromium-headless-shell with a 1600px viewport height
   - Create browser context with a mobile user-agent string
   - Inject cookies via `context.addCookies()`
   - Navigate to `https://www.tiktok.com/tiktokstudio/upload`
   - Set video file via `input[type="file"].setInputFiles()`
   - Wait 15s for upload processing
   - Dismiss modals (copyright check + upsell)
   - Set caption via `page.evaluate()` on the contenteditable div
   - Click Post via `page.evaluate()` (not Playwright click — modals intercept pointer events)
   - Wait 30s and verify redirect to `/tiktokstudio/content`
4. **Run via environment variable:**
```bash
VIDEO="/path/to/video.mp4" CAPTION="Your caption" node upload_script.js
```

## Key Insights

- The Post button is positioned at y > 1400 on the page. The "Posts" nav tab is at y ~232. Don't confuse them.
- TikTok's upload page may briefly show an "unavailable" warning but the upload still completes — don't abort on that.
- Cookies expire. Set up a weekly refresh cycle or use a cookie management skill to detect and re-export when uploads start failing.
- This same approach works for YouTube Studio uploads (different selectors, same Playwright pattern).
