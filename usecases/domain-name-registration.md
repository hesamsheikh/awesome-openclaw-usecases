# Domain Name Registration with LobsterDomains

Register ICANN domains (.com, .xyz, .org, 1000+ TLDs) using your OpenClaw agent — check availability, compare prices, and complete registration with no browser interaction or manual forms.

## Pain Point

Registering a domain usually means navigating clunky registrar websites, comparing prices across multiple tabs, and manually filling out forms. For AI agents building or deploying web projects, this is especially painful — traditional registrars require CAPTCHAs, browser interaction, and manual credit card entry that agents can't handle.

## What It Does

Use OpenClaw with the LobsterDomains skill to let your agent handle the entire domain registration workflow autonomously:

- **Check availability** of any domain across 1000+ TLDs
- **Compare pricing** across different TLDs to find the best deal
- **Register domains** programmatically — pay with on-chain USDC (no credit card needed)
- **Track orders** and check registration status

## Skills Needed

[`lobsterdomains`](https://clawhub.ai/esokullu/lobsterdomains) — ICANN domain registration via crypto-friendly API. Requires a `LOBSTERDOMAINS_API_KEY`.

Get your API key at [lobsterdomains.xyz](https://lobsterdomains.xyz)

## How to Set it Up

1. Get your API key from [lobsterdomains.xyz](https://lobsterdomains.xyz)
2. Add the skill to your agent with the API key configured as `LOBSTERDOMAINS_API_KEY`
3. Start chatting — ask your agent to find and register domains

## Example Prompts

```text
Is example.com available?
```
```text
Find me a .ai domain for my startup called NeuralFlow, under $50/year
```
```text
Register openagent.dev if it's available. Pay with USDC from my wallet.
```
```text
What TLDs are available for 'openagent' under $20?
```

## Workflow (Autonomous Mode)

1. Agent checks domain availability + live price via `GET /api/v1/domains/check`
2. Confirms price with user (or proceeds autonomously if pre-approved)
3. Sends USDC payment on-chain to Ethereum/Arbitrum/Base
4. Submits tx hash to `POST /api/v1/domains/register`
5. Receives DNS management credentials

## Related Links

- [LobsterDomains](https://lobsterdomains.xyz)
- [ClawHub skill page](https://clawhub.ai/esokullu/lobsterdomains)
