# Autonomous Domain Registration with LobsterDomains

## Pain Point
Registering domains for projects typically requires browser interaction, CAPTCHAs, and manual credit card entry. AI agents building or deploying web projects cannot do this autonomously with traditional registrars.

## What It Does
Use OpenClaw with the LobsterDomains skill to let your agent check domain availability, pay with on-chain USDC, and register ICANN domains (.com, .xyz, .org, 1000+ TLDs) — all programmatically with no human in the loop.

## Prompts
```
Check if [DOMAIN].com is available and register it if so. Pay with USDC from my wallet.
```

## Skills Needed
- [`lobsterdomains`](https://clawhub.ai/esokullu/lobsterdomains) — ICANN domain registration via crypto API

## Workflow
1. Agent checks domain availability + live price via `GET /api/v1/domains/check`
2. Confirms price with user (or proceeds autonomously if pre-approved)
3. Sends USDC payment on-chain to Ethereum/Arbitrum/Base
4. Submits tx hash to `POST /api/v1/domains/register`
5. Receives DNS management credentials

## Related Links
- [LobsterDomains](https://lobsterdomains.xyz)
- [ClawHub skill](https://clawhub.ai/esokullu/lobsterdomains)
- API: `GET /api/v1/domains/check`, `POST /api/v1/domains/register`
