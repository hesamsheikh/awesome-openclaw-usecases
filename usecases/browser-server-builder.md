# Browser-Based Server Builder & Sandbox

Build, test, and share OpenClaw server configurations entirely in your browser — no install, no terminal, no server required.

## What It Does

- Visual 6-step server builder (name, model, agents, skills, channels, review) that generates a complete OpenClaw config
- Boots a full OpenClaw sandbox instance **in the browser** with free AI models — you can chat with your agent immediately
- Server library to save, duplicate, export, and import configurations
- Flavour system lets you switch between pre-built server personalities (DevOps, Creative Studio, Security Auditor, etc.)
- Share configs as JSON files — others can import and boot them instantly

## Pain Point

Setting up OpenClaw for the first time means installing Node.js, running CLI commands, editing YAML configs, and figuring out which models and skills to use. For non-technical users or people who just want to try different agent setups quickly, this is too much friction. You want to experiment with different configurations, test them live, and save the ones that work — all without touching a terminal.

## Skills You Need

None. VibeClaw runs entirely in your browser at [vibeclaw.dev](https://vibeclaw.dev). No OpenClaw installation required.

## How to Set It Up

### Step 1: Open VibeClaw

Go to [vibeclaw.dev](https://vibeclaw.dev) and click **BOOT YOUR SERVER NOW**.

The sandbox boots a full OpenClaw instance in your browser in under 3 seconds. You can start chatting with the default agent immediately using free AI models (Solar Pro 3, DeepSeek R1, Llama 3.1, etc.).

### Step 2: Try Different Flavours

Use the flavour dropdown on the homepage to switch between pre-configured server personalities:

- **DevOps SRE** — Infrastructure monitoring, incident response
- **Creative Studio** — Content generation, brainstorming
- **Security Auditor** — Vulnerability scanning, compliance checks
- **Personal Assistant** — Calendar, email, task management

Each flavour comes with pre-configured agents, skills, and system prompts.

### Step 3: Build a Custom Server (ClawForge)

Click **Forge** in the nav to open the visual builder:

1. **Name & describe** your server
2. **Choose a model** (free models available, Pro models coming soon)
3. **Configure agents** with custom system prompts
4. **Select skills** from the available library
5. **Set up channels** (Telegram, Discord, WhatsApp, etc.)
6. **Review & save** — configs auto-save as you build

### Step 4: Manage Your Library

Click **My Servers** to see all your saved configurations. From here you can:

- **Boot** any config directly in the sandbox
- **Duplicate** a config to create variations
- **Export** as JSON to share with others
- **Import** configs from files or community shares
- **Delete** configs you no longer need

## Tips

- **Auto-save is on** — your work in the Forge saves automatically every 500ms, so you never lose progress
- **Export before experimenting** — duplicate a working config before making big changes
- **Free models are surprisingly capable** — Solar Pro 3 and DeepSeek R1 handle most agent tasks well
- **Share configs with your team** — export JSON files and have others import them to get identical setups

## Links

- **Live site:** [vibeclaw.dev](https://vibeclaw.dev)
- **Source:** [github.com/jasonkneen/vibeclaw](https://github.com/jasonkneen/vibeclaw)
- **Forge builder:** [vibeclaw.dev/forge](https://vibeclaw.dev/forge)
