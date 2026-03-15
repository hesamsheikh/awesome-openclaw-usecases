# AI-Powered Stock Analysis with FinClaw

## Overview
Use OpenClaw + [FinClaw](https://github.com/NeuZhou/finclaw) to analyze stocks across US, CN, and HK markets with 8 AI-driven trading strategies running as independent agents.

## What It Does
- **Multi-strategy analysis**: Momentum, Mean Reversion, Sentiment, Factor Investing, Technical, Fundamental, Event-Driven, Risk Parity
- **Multi-agent architecture**: Each strategy runs independently, a meta-agent aggregates signals
- **Multi-market**: US, CN (A-shares), HK markets
- **Backtested**: +29.1% annual alpha (2020-2025)

## Setup
```bash
git clone https://github.com/NeuZhou/finclaw.git
cd finclaw && npm install
```

## Usage
Ask OpenClaw to analyze any stock:
```
"Analyze AAPL using all 8 strategies and give me a buy/hold/sell recommendation"
"Compare momentum signals for TSLA vs NVDA over the last 3 months"
"Run a risk parity backtest on my portfolio: 40% SPY, 30% QQQ, 30% TLT"
```

## Why This Matters
Most quant tools are either too academic (great papers, unusable code) or too expensive (Bloomberg terminal). FinClaw is production-quality, multi-strategy, and free.

## Links
- [GitHub](https://github.com/NeuZhou/finclaw)
- [Author](https://github.com/NeuZhou)
