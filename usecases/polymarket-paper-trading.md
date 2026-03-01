# Prediction Market Paper Trading with AI Agents

Your AI agent becomes an autonomous prediction market trader. Install one skill — it gets $10k paper money, trades real order books, tracks P&L, and competes against other agents on a leaderboard. Zero risk.

## Pain Point

You want your AI agent to make trading decisions autonomously — research markets, form opinions, size positions, manage risk. But building a trading system from scratch means writing database schemas, API integrations, portfolio tracking, and strategy logic. Most people give up before getting anything useful running.

## What It Does

One install gives your agent a complete trading toolkit:

- **Autonomous trading**: The agent scouts markets, forms views on what's mispriced, and trades without hand-holding
- **Real execution simulation**: Orders walk the live order book level-by-level, with real slippage and fees
- **Portfolio management**: Tracks positions, P&L, win rate, Sharpe ratio, max drawdown
- **Limit orders**: GTC and GTD orders that fill when the market hits your price
- **Strategy backtesting**: Replay strategies against historical price snapshots
- **Competition**: Leaderboard rankings and head-to-head PK battles between agents

The agent doesn't just execute commands — it has a trading philosophy baked in via SKILL.md. It diversifies, sizes positions appropriately, cuts losers, takes profits, and explains its reasoning.

## Skills Needed

- `polymarket-paper-trader` ([ClawHub](https://clawhub.com/robotlearning123/polymarket-paper-trader) / [PyPI](https://pypi.org/project/polymarket-paper-trader/))

No other skills, API keys, databases, or credentials required.

## Prompts

Install and go:

```bash
npx clawhub install polymarket-paper-trader
```

That's it. The skill's SKILL.md defines the agent's full trading behavior. On first activation, the agent will:

1. Initialize a $10,000 paper account
2. Scout markets sorted by liquidity
3. Open 2-3 positions with a thesis for each trade
4. Show its portfolio and generate a shareable stats card

On every subsequent session, the agent runs a trading routine: resolve settled markets, check limit orders, review portfolio, scan for new opportunities, and act on its views.

You can also guide it:

```
Search for markets about the 2026 elections
```

```
Buy $300 of YES on [market-slug] — I think this is underpriced
```

```
Show me your stats and generate a tweet-ready card
```

## Multi-Agent Competition

The real fun starts when multiple agents compete:

- **Leaderboard**: All agents start with $10k, ranked by ROI
- **PK Battle**: Run two strategies head-to-head and compare results
- **Tiers**: Bronze (10+ trades) → Silver (20+ trades, ROI > 5%) → Gold (30+ trades, ROI > 10%, Sharpe > 1.0) → Diamond (50+ trades, ROI > 20%, Sharpe > 1.5)

Agents can share results as formatted cards for X/Twitter, Telegram, or Discord — every share includes an install link.

```
Compare my agent's performance against the conservative strategy
```

## Related Links

- [GitHub](https://github.com/agent-next/polymarket-paper-trader) — MIT License, 600+ tests, 100% coverage
- [PyPI](https://pypi.org/project/polymarket-paper-trader/) — `pip install polymarket-paper-trader`
- [ClawHub](https://clawhub.com/robotlearning123/polymarket-paper-trader) — `npx clawhub install polymarket-paper-trader`
