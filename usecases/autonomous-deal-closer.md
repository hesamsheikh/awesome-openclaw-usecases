# Autonomous Deal Closer

You find leads, qualify them, send outreach, book meetings, draft contracts, and get signatures. That's 6 tools across 3 hours of manual work per deal. OpenClaw can run this entire pipeline while you sleep.

## Pain Point

Closing a B2B deal requires coordinating across research, email, calendaring, and document signing tools. Each step depends on the previous one, and context gets lost between tools. You end up copy-pasting between tabs for hours.

## What It Does

- **Lead research**: Uses Firecrawl MCP to scrape a prospect's website and extract team info, product details, and contact data
- **Outreach drafting**: Generates a personalised cold email using the scraped context
- **Calendar booking**: Uses Cal.com to find mutual availability and include a booking link in the outreach
- **Contract generation**: Drafts a services agreement in markdown using deal-specific terms from the conversation
- **E-signing**: Sends the contract for two-party signing with SHA-256 certificates via Signbee MCP
- **Status tracking**: Updates a local `DEALS.yaml` file with pipeline status after each step

## Skills Needed

- `mcp__firecrawl__scrape` — prospect research and data extraction
- `mcp__gmail__send` or any email MCP — outreach delivery
- `mcp__calcom__create_booking` — meeting scheduling
- `mcp__signbee__send_document` — contract e-signing
- File system access for DEALS.yaml status tracking
- `sessions_spawn` (optional) — run multiple deal pipelines in parallel

## Setup

Add these MCP servers to your configuration:

```json
{
  "mcpServers": {
    "firecrawl": {
      "command": "npx",
      "args": ["-y", "firecrawl-mcp"],
      "env": { "FIRECRAWL_API_KEY": "your-key" }
    },
    "calcom": {
      "command": "npx",
      "args": ["-y", "@calcom/mcp"],
      "env": { "CAL_API_KEY": "your-key" }
    },
    "signbee": {
      "command": "npx",
      "args": ["-y", "signbee-mcp"],
      "env": { "SIGNBEE_API_KEY": "your-key" }
    }
  }
}
```

## Example Prompt

```text
I need to close a partnership deal with the company at https://acme.io.

1. Scrape their site using Firecrawl. Find the founder or CTO name and email.
2. Draft a short, personalised partnership email. Reference something specific
   from their product page. Include my Cal.com booking link for a 30-min call.
3. After I confirm the call went well, generate a simple services agreement
   in markdown. Include both party names, scope of work, and payment terms.
4. Send the agreement for signing via Signbee to the contact you found.
5. Track everything in DEALS.yaml with status updates after each step.
```

## DEALS.yaml Format

```yaml
deals:
  - company: acme.io
    contact: Jane Smith (CTO)
    email: jane@acme.io
    status: contract_sent
    steps:
      research: done
      outreach: done
      meeting: done
      contract_drafted: done
      signing: pending
    signbee_document_id: doc_abc123
    updated: 2026-04-01T10:30:00Z
```

## Key Insights

- **Chain MCP tools, don't use them in isolation.** The power isn't any single tool. It's combining Firecrawl + email + Cal.com + Signbee into one uninterrupted flow.
- **Markdown contracts work.** Agents think in text. Keeping contracts as markdown means the agent can draft, edit, and iterate without leaving the terminal. Signbee converts markdown to PDF automatically.
- **Free tiers cover testing.** Firecrawl, Cal.com, and Signbee all have free plans. You can test the full pipeline without spending anything.
- **Use subagents for parallel deals.** Spawn one subagent per prospect with `sessions_spawn` and let them all run independently. Track status via DEALS.yaml.

## Related Links

- [Firecrawl MCP](https://github.com/mendableai/firecrawl)
- [Cal.com](https://cal.com)
- [Signbee MCP](https://www.npmjs.com/package/signbee-mcp)
- [AgentMail](https://agentmail.to) (alternative email MCP for agent-native email)
