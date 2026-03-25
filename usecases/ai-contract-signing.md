# AI Employee That Closes Deals

Your agent researches leads, writes proposals, sends emails — but the moment a prospect says "send me the contract"... you have to step in manually. Not anymore.

This use case turns OpenClaw into a closer. It drafts contracts, NDAs, or proposals in Markdown and sends them for legally binding e-signing — without you touching a thing. Both parties sign, both get a SHA-256 certified PDF. Done.

## The Pain Point

Every AI sales workflow has the same gap: the agent can do everything *except* get ink on paper. Stripe handles payments. AgentMail handles email. But signing? That's still a manual step — until now.

## What It Does

1. You tell OpenClaw about a deal, client, or agreement
2. It drafts the document in Markdown (NDAs, contracts, proposals, SOWs — anything)
3. It sends the document via Signbee for two-party e-signing
4. Sender signs → recipient gets an email → they sign
5. Both parties receive a tamper-proof signed PDF with SHA-256 certificate

The whole flow runs autonomously. You wake up to signed contracts in your inbox.

## Skills Needed

[Signbee MCP Server](https://github.com/signbee/mcp) — install via npm:

```json
{
  "mcpServers": {
    "signbee": {
      "command": "npx",
      "args": ["-y", "signbee-mcp"],
      "env": {
        "SIGNBEE_API_KEY": "your-api-key-from-signb.ee"
      }
    }
  }
}
```

Get a free API key at [signb.ee](https://signb.ee) (5 docs/month free).

## How to Set It Up

1. Install the Signbee MCP server (config above)
2. Instruct OpenClaw:

```txt
You are my AI business closer. When I tell you about a deal, you:

1. Draft the appropriate document (NDA, contract, proposal, or SOW) in clean markdown
2. Include all relevant terms, dates, and party details
3. Use the send_document tool to send it for e-signing
4. Report back with the document status

When drafting, be professional but concise. Use proper headings, numbered clauses, and clear language. Always include an effective date, both party names, and a termination clause.

If I give you a PDF instead, use send_document_pdf with the URL.
```

## Example Prompts

**Close a freelance deal:**
> "Send an NDA to Sarah at sarah@acme.com. We're about to start a consulting engagement. My name is Michael Beckett, michael@company.com."

**Send a proposal as PDF:**
> "I've got a proposal PDF at https://example.com/proposal.pdf — send it to James at james@client.com for signing."

**Autonomous deal flow:**
> "Draft a 6-month service agreement for $5,000/month with DataCorp (contact: lisa@datacorp.com). Include payment terms, IP ownership, and confidentiality. Send it for signing."

## Why This Hits Different

Most "AI employee" setups stop at the conversation. This one closes. Your agent goes from lead → proposal → signed contract without you lifting a finger. Stack it with email (AgentMail), payments (Stripe), and scheduling (Cal.com) for a fully autonomous sales machine.

## Related Links

- [Signbee](https://signb.ee) — Document signing API for AI agents
- [signbee-mcp on npm](https://www.npmjs.com/package/signbee-mcp) — MCP server package
- [GitHub](https://github.com/signbee/mcp) — Source code
