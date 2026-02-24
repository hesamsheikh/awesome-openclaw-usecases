# Polymarket Autopilot: Automated Paper Trading

Manually monitoring prediction markets for arbitrage opportunities and executing trades is time-consuming and requires constant attention. You want to test and refine trading strategies without risking real capital.

This workflow automates paper trading on Polymarket with custom strategies:

• Monitors market data via API (prices, volume, spreads)
• Executes paper trades using TAIL (trend-following) and BONDING (contrarian) strategies
• Tracks portfolio performance, P&L, and win rate
• Delivers daily summaries to Discord with trade logs and insights
• Learns from patterns: adjusts strategy parameters based on backtesting results

## Pain Point

Prediction markets move fast. Manual trading means missing opportunities, emotional decisions, and difficulty tracking what works. Testing strategies with real money risks losses before you understand market behavior.

## What It Does

The autopilot continuously scans Polymarket for opportunities, simulates trades using configurable strategies, and logs everything for analysis. You wake up to a summary of what it "traded" overnight, what worked, and what didn't.

Example strategies:
- **TAIL**: Follow trends when volume spikes and momentum is clear
- **BONDING**: Buy contrarian positions when markets overreact to news
- **SPREAD**: Identify mispriced markets with arbitrage potential

## Skills Needed

- `web_search` or `web_fetch` (for Polymarket API data)
- `postgres` or SQLite for trade logs and portfolio tracking
- Discord integration for daily reports
- Cron jobs for continuous monitoring
- Sub-agent spawning for parallel market analysis

## How to Set it Up

1. Set up a database for paper trading:
```sql
CREATE TABLE paper_trades (
  id SERIAL PRIMARY KEY,
  market_id TEXT,
  market_name TEXT,
  strategy TEXT,
  direction TEXT,
  entry_price DECIMAL,
  exit_price DECIMAL,
  quantity DECIMAL,
  pnl DECIMAL,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE portfolio (
  id SERIAL PRIMARY KEY,
  total_value DECIMAL,
  cash DECIMAL,
  positions JSONB,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

2. Create a Discord channel for updates (e.g., #polymarket-autopilot).

3. Prompt OpenClaw:
```text
You are a Polymarket paper trading autopilot. Run continuously (via cron every 15 minutes):

1. Fetch current market data from Polymarket API
2. Analyze opportunities using these strategies:
   - TAIL: Follow strong trends (>60% probability + volume spike)
   - BONDING: Contrarian plays on overreactions (sudden drops >10% on news)
   - SPREAD: Arbitrage when YES+NO > 1.05
3. Execute paper trades in the database (starting capital: $10,000)
4. Track portfolio state and update positions

Every morning at 8 AM, post a summary to Discord #polymarket-autopilot:
- Yesterday's trades (entry/exit prices, P&L)
- Current portfolio value and open positions
- Win rate and strategy performance
- Market insights and recommendations

Use sub-agents to analyze multiple markets in parallel during high-volume periods.

Never use real money. This is paper trading only.
```

4. Iterate on strategies based on performance. Adjust thresholds, add new strategies, backtest historical data.

## Related Links

- [Polymarket API](https://docs.polymarket.com/)
- [Paper Trading Best Practices](https://www.investopedia.com/articles/trading/11/paper-trading.asp)
