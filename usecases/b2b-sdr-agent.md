# B2B AI Sales Development Representative (SDR)

Export companies and manufacturers spend hours every day on repetitive sales tasks: researching leads, writing outreach emails, following up on WhatsApp, qualifying prospects, and updating CRM records. Most small trade businesses can't afford a dedicated sales team, so the founder does it all — badly.

This use case turns OpenClaw into an AI-powered SDR that handles the full B2B sales pipeline across WhatsApp, Telegram, and email. It runs 24/7 with a 7-layer context system that knows your company, products, ideal customer profile, and sales playbook.

## Pain Point

- B2B export sales is labor-intensive: research → outreach → follow-up → qualification → quotation → negotiation — one person can manage maybe 20 leads per day
- Small trade companies (factories, exporters) can't hire SDR teams — the founder/owner handles sales alongside operations
- Generic chatbots don't understand B2B context: product specs, MOQ, shipping terms (FOB/CIF), payment terms (T/T, L/C)
- Sales follow-ups fall through the cracks — a buyer asks a question on WhatsApp at 2 AM your time, and by morning they've gone to a competitor
- No CRM discipline — conversations are scattered across WhatsApp, email, and WeChat with no unified pipeline

## What It Does

- **7-layer context system**: IDENTITY.md (company info), SOUL.md (personality/rules), AGENTS.md (10-stage sales workflow), USER.md (ICP + product catalog), HEARTBEAT.md (pipeline inspection), MEMORY.md (3-engine memory), TOOLS.md (CRM + channels)
- **Full pipeline automation**: Lead capture → Qualification → Needs analysis → Product matching → Quotation → Negotiation → Follow-up → Close
- **Multi-channel**: Responds on WhatsApp, Telegram, and email simultaneously, maintaining context across channels
- **10 scheduled cron jobs**: Morning pipeline review, lead scoring updates, follow-up reminders, weekly reports, stale deal alerts
- **Smart qualification**: Scores leads based on country, industry, order size, and engagement — focuses agent time on high-value prospects
- **Culturally aware**: Adjusts communication style for different markets (formal for Middle East, direct for Europe, relationship-first for Asia)
- **Human escalation**: Knows when to hand off to the business owner — large orders, custom requirements, or when the buyer insists on talking to a human

## Skills You Need

- OpenClaw with WhatsApp channel configured (or Telegram/email)
- The b2b-sdr-agent skill from ClawHub, or the full template repo
- Your product catalog and company information (filled into the 7 Markdown files)

## How to Set It Up

### 1. Install

```bash
# Option A: via ClawHub
clawhub install b2b-sdr-agent

# Option B: full repo
git clone https://github.com/iPythoning/b2b-sdr-agent-template.git
```

### 2. Customize the 7 Context Layers

Each layer is a Markdown file you edit for your business:

```bash
vim IDENTITY.md   # Company name, role, what you sell
vim USER.md       # Products, pricing, ICP, competitors
vim SOUL.md       # Communication rules, tone, boundaries
vim AGENTS.md     # 10-stage sales workflow
vim HEARTBEAT.md  # Scheduled pipeline checks
vim MEMORY.md     # How the agent remembers past interactions
vim TOOLS.md      # CRM setup, channel config
```

Replace all `{{placeholders}}` with your actual information.

### 3. Connect Channels

Add WhatsApp via OpenClaw's channel system. The agent will start responding to incoming messages using your sales context.

### 4. Test with a Real Lead

Send a test message on WhatsApp: "Hi, I'm interested in your products for the African market. What's your MOQ?"

The agent should respond with product details, ask qualifying questions, and move the lead through the pipeline.

## Key Insights

- **Context layers > prompt engineering**: Instead of one massive prompt, splitting context into 7 focused Markdown files (identity, personality, workflow, memory, tools) makes the agent dramatically better at staying in character and following your sales process. Each file is under 2000 tokens, but together they give deep business context.
- **Cron jobs are the SDR's discipline**: Real sales success comes from consistent follow-up, not brilliant first messages. The 10 scheduled jobs (morning pipeline review, stale deal alerts, weekly reports) enforce the discipline that humans forget.
- **B2B sales needs memory**: Unlike customer support, B2B sales cycles span weeks or months. The 3-engine memory system (conversation memory, deal memory, relationship memory) lets the agent reference past interactions naturally — "Last month you mentioned you were expanding to Kenya — have you finalized those plans?"
- **Multi-channel is table stakes**: B2B buyers in different regions prefer different channels. Middle East buyers use WhatsApp, European buyers prefer email, Southeast Asian buyers use Telegram. The agent must maintain unified context across all of them.

## Inspired By

Built from real deployment experience with Chinese export companies (manufacturers, trading companies) selling to 50+ countries. The 7-layer context architecture was developed through iterative testing on actual sales conversations — each layer was added when the agent consistently failed at a specific task without it.

The template has been open-sourced at [iPythoning/b2b-sdr-agent-template](https://github.com/iPythoning/b2b-sdr-agent-template) and published as a ClawHub skill.

## Related Links

- [b2b-sdr-agent-template (GitHub)](https://github.com/iPythoning/b2b-sdr-agent-template) — Full template with 7-layer context system
- [b2b-sdr-agent (ClawHub)](https://clawhub.ai/ipythoning/b2b-sdr-agent) — OpenClaw skill for quick install
- [OpenClaw Documentation](https://github.com/openclaw/openclaw)
