# Multi-Agent CFO Research Suite

A multi-agent research system powered by the Consensus Hardening Protocol (CHP) that produces institutional-quality financial analysis — forecasts, SEC deep dives, investment memos, and board-ready outputs — with full auditable reasoning trails.

## Pain Point

- **Single-agent research lacks depth**: A lone agent can summarize a 10-K but can't cross-examine its own findings or detect subtle narrative shifts across filings
- **No audit trail**: Standard AI financial analysis is a black box — you can't trace which assumptions drove which conclusions
- **Board-ready quality takes hours**: Manually producing investment committee memos with proper sourcing, variance analysis, and confidence ranges is time-prohibitive for nimble teams
- **Context fragmentation**: Finance research spans SEC filings, earnings calls, macro data, news sentiment, and internal models — no single tool stitches them together with accountability

## What It Does

- **Multi-agent deliberation**: Three agents (Finance, Strategy, Compliance) each analyze the same data independently, then converge via CHP adversarial consensus
- **CHP-hardened outputs**: Every conclusion carries an auditable payload envelope showing which agents contributed, what sources they used, and where they agreed/disagreed
- **Board-ready formatting**: Outputs are structured as executive summaries with risk flags, confidence intervals (P10/P50/P90), and source citations
- **Cross-model verification**: When agents disagree, the protocol escalates to deliberative debate before locking a conclusion (EXPLORING → PROVISIONAL_LOCK → LOCKED workflow)

## Prompts

### Initial Company Brief

```text
Research $TICKER for an investment committee memo.

1. Finance Agent: Run fundamentals (AlphaVantage) — revenue trends, margins, cash flow, and key ratios over 5 quarters
2. Strategy Agent: Analyze competitive positioning, TAM, and recent strategic moves from earnings calls
3. Compliance Agent: Review SEC filings for risk disclosures, accounting changes, and legal exposures

Cross-reference all findings via CHP. Flag any disagreements between agents. Output as a board-ready memo with an audit envelope.
```

### SEC Filing Alert Analysis

```text
A new 8-K just dropped for $TICKER.

Finance: Compare any revised guidance vs prior expectations
Strategy: Assess the strategic implications (M&A, restructuring, new segment)
Compliance: Flag any material disclosure gaps vs the previous 10-K

Run CHP adversarial review. If all three agents agree on materiality → lock finding. If any disagree → open deliberative debate.
```

### Peer Comparison

```text
Compare $TICKER vs $PEER1 and $PEER2 on:
- Revenue growth trajectory
- Margin expansion/compression
- Cash efficiency
- Risk factor evolution

Each agent analyzes one dimension. Finance agent validates numerical comparisons. Strategy agent adds competitive context. Compliance agent flags any disclosure discrepancies between peers.

Output: 3-column comparison table with confidence ratings per data point.
```

## Skills You Need

- `web_fetch` for SEC EDGAR and earnings call transcripts
- File system access for storing CHP audit envelopes
- API access to AlphaVantage, FRED, or similar financial data sources
- Scheduled heartbeat for regular filings monitoring

## How to Set It Up

### 1. Create shared workspace

```text
research/
├── current/               # Active research sessions
│   └── $TICKER/
│       ├── CHP-audit.md           # Consensus audit envelope
│       ├── finance-findings.md     # Finance agent output
│       ├── strategy-findings.md    # Strategy agent output
│       ├── compliance-findings.md  # Compliance agent output
│       └── board-memo.md           # Final synthesized output
├── archive/               # Completed research
└── sources/               # Cached SEC filings, transcripts
```

### 2. CHP workflow integration

```text
## AGENTS.md — CHP Research Protocol

Research Pipeline:
1. DISPATCH — Agent sends its findings to shared workspace
2. REVIEW — Each agent reads the other agents' findings
3. DELIBERATE — If any two agents disagree, escalate to debate
4. LOCK — All three agents must agree before conclusion is marked as LOCKED
5. SYNTHESIZE — Coordinator agent compiles into board-ready format

Audit Envelope:
- ALL conclusions must include source citations
- DISAGREEMENTS must be recorded even after resolution
- CONFIDENCE must be stated per finding (High/Medium/Low with rationale)
```

### 3. Trigger scenarios

```text
On demand: "Research $TICKER for board meeting next week"
Scheduled: Weekly portfolio monitoring (Monday 8 AM)
Event-driven: SEC filing alert → auto-initiate research
```

## Key Insights

- **Adversarial review catches more than collaboration**: Agents that trust each other miss things. CHP forces each agent to try to find flaws in the other agents' analysis. This produces better research
- **Explict disagreement records build credibility**: A board memo that shows "Strategy disagreed on TAM estimate, resolved after debate with revised source data" is more trusted than a consensus that papered over differences
- **Start with one company**: Run the full workflow on a single company before expanding to portfolio monitoring. The CHP protocol takes tuning to get the deliberation depth right
- **The audit envelope is the product**: The real value isn't the analysis itself — it's the ability to show exactly how every conclusion was reached

## Related Links

- [Cubiczan Consensus Hardening Protocol](https://github.com/zan-maker/consensus-hardening-protocol)
- [Multi-Agent CFO OS](https://github.com/zan-maker/multi-agent-cfo-os)
- [SEC Earnings Workbench](https://github.com/zan-maker/sec-earnings-workbench)
- [Anthropic: Building Effective Agents](https://www.anthropic.com/research/building-effective-agents)
