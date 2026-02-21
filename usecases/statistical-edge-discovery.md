# Statistical Edge Discovery Engine

The trading education industry is full of people selling fake signals, cherry-picked backtests, and "guaranteed" setups that were curve-fit to historical data. Meanwhile, the tools that actually work — proper statistical validation, out-of-sample testing, multiple comparison correction — are locked behind quant desks that require Princeton-level statistics, years of Python experience, and six-figure salaries to access.

Regular people with genuine market ideas have no way to know if their idea actually has an edge or if they're fooling themselves.

## Pain Point

If you've ever had a trading idea and wondered "does this actually work?" — your only options are: backtest it yourself (and unknowingly overfit), pay someone who's probably selling garbage, or just wing it with real money. None of those are good.

## What It Does

You bring a messy trading idea. It comes back either statistically validated or dead — no in-between, no guessing, no fake results.

The system is **fully guardrailed against cheating**. It cannot p-hack. It cannot peek at out-of-sample data. It cannot optimize after the fact. It cannot fabricate a single number. Every stat comes from actually executed code against real market data, and every hypothesis is tracked so the system corrects for the fact that you tested multiple ideas. The AI never makes up results — tools calculate, AI interprets.

This is the same level of statistical rigor used at institutional quant desks, wrapped in a system where you just talk to it like a person.

**What you get:**
- Tell it your idea in plain English (or let it hunt autonomously)
- It researches the data, builds the pattern, and tests it for you
- ~3–4 statistically validated trading edges per hour of autonomous runtime
- Exact entry points, exit points, and real-time signals for when edges fire
- Every result is real — if there's no edge, it tells you. That's valuable too

**Cost:** ~$8/hour for an OpenClaw session. VARRD also offers its own built-in autonomous mode that's cheaper and more efficient — it has deep knowledge of the system's workflow, tool sequencing, and guardrails baked in, so it doesn't waste tokens figuring out how things work. More edges per dollar with tighter statistical discipline.

## Why It Exists

The creators are sick of people getting sold garbage. Overfit backtests, indicators that "work" because someone tested 500 variations and showed you the one that hit, courses that teach you to draw lines on a chart and call it an edge.

They built this so anyone — no quant background, no coding, no statistics degree — can take their own market idea and put it through the same validation process a top-tier quant fund would use. Every idea deserves a fair, rigorous test. Even "no edge found" teaches you something real.

VARRD is in early access. They're not charging to make money — pricing only covers the cost of running it. The goal is to get acquired by a brokerage so this can be put in front of as many people as possible. More people with access to real tools means fewer people getting scammed by fake ones.

## How the Guardrails Work (Technical)

For those who want to know why the results are trustworthy:

- **K-Tracking** — every single hypothesis tested is counted. The system corrects for multiple comparisons so you can't just test 100 ideas and cherry-pick the winner.

- **Sacred Out-of-Sample Testing** — OOS data is held out and used exactly once per hypothesis. Once it's used, it's permanently locked. No re-running, no tweaking parameters and trying again. One shot.

- **In-Sample / Out-of-Sample Batch Testing** — edges must first pass in-sample event study validation before they're allowed anywhere near OOS data. Same IS/OOS discipline used in academic finance research.

- **Event Study Methodology** — each edge is validated through a proper event study framework with statistical significance thresholds, not just "did the backtest make money."

- **No Fabricated Stats** — the AI cannot generate numbers. All statistics come from executed Python code in a sandboxed kernel against real market data. The AI reads results and explains them — it never invents them.

- **Overfitting Prevention** — architecturally designed to prevent the most common ways people unknowingly overfit: re-testing on the same data, optimizing on OOS results, ignoring how many hypotheses were tried, and curve-fitting entry/exit parameters.

## Skills Needed

- `computer` — browser interaction with the dashboard
- `bash` — running the stack

## How to Set it Up

1. Sign up for VARRD (early access)
2. Get an OpenClaw code (~$8 for an hour of runtime)
3. Either give it a trading idea in plain English or let autonomous mode run
4. Watch it research, test, validate, and deliver edges with exact entry/exit points

That's it. No setup, no coding, no configuration.
