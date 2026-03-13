# Character Image Generation

Generate AI images of your adopted character in any scene, style, or mood — directly from chat.

## Pain Point

Creating character images normally requires navigating the platform web UI, searching for scenes manually, and tweaking settings by hand. There's no way to just describe what you want in natural language and get an image back without leaving your workflow.

## What It Does

Using the `image-generation-claw-skill`, OpenClaw reads your character from `SOUL.md`, resolves it to a character vtoken, builds a structured prompt, submits an image generation job, polls until complete, and returns the image URL — all from a single chat message like:

> *"Draw 关羽 in a rainy bamboo forest, cinematic lighting, portrait"*

Supports:
- Custom prompts in natural language
- Art styles (manga, oil painting, watercolor, cinematic, pixel art, etc.)
- Aspect ratios: portrait, landscape, square, tall
- Extra reference images for style/consistency control
- Character search if you want to switch characters mid-session

## Prompts

```
Draw [character name] in [scene description], [style], [mood]
```

```
Generate a landscape banner of [character] with dramatic lighting
```

```
Same character, watercolor style, autumn forest
```

```
Show me style options
```

## Skills Needed

- [`image-generation-claw-skill`](https://github.com/tonyclawskill/image-generation-claw-skill) — zero-dependency Node.js helper
- A `SOUL.md` file with your adopted character (created by the `adopt` skill)
- API token in `~/.openclaw/workspace/.env`

## Example Output

> 🔍 Looking up character: 关羽...
> ✅ Character resolved: 关羽
> 🎨 Generating image (576×768)...
> ⏳ Task submitted: 3835c8de-...
>
> ━━━━━━━━━━━━━━━━━━━━━━━━
> ✨ 关羽 · rainy bamboo forest, cinematic
> https://oss.talesofai.cn/picture/3835c8de-...webp
> ━━━━━━━━━━━━━━━━━━━━━━━━

## Related Links

- [image-generation-claw-skill](https://github.com/tonyclawskill/image-generation-claw-skill)
- [travelclaw — character adventure skill](https://github.com/talesofai/travelclaw)
