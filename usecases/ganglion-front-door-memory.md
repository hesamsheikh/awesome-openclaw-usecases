# Ganglion: Give Your Agent's Front Door a Memory

**Category:** Infrastructure & DevOps

## Pain Point

Every agent has a front door — a `pre_llm_call` hook, a message gate, a reflex
check that decides "is this message allowed / does it need escalation / is it
machine boilerplate". Those checks re-run on **every single message**, and the
same content shows up again and again: the same cron boilerplate, the same
gateway echo line, the same "are you there" ping from a watchdog.

If the check calls a model, each repeat costs tokens. If you roll your own
cache, you get a worse problem: a **stale verdict** replayed as if it were fresh.
An arbitration check that sees different account state every round must judge
differently every round — feeding it yesterday's answer is worse than no cache
at all.

## What It Does

[Ganglion](https://github.com/huv0310-arch/ganglion) is a 105-line,
stdlib-only primitive that freezes a verdict and remembers it:

```python
from ganglion import Ganglion

g = Ganglion(mem=shared_dict, ttl=3600)
verdict, reason = g.check(message, processor=my_existing_judge)
# 1st call → (1, "放行")                  real judgment
# 2nd call → (1, "[记忆:0s前] 放行")       ledger lookup, 0 tokens
```

Three properties matter for a message gate:

- **0 / 1 / None three values.** "Didn't decide" and "decided bad" are
  different failure modes; merging them lies to you.
- **Fail-open never writes memory.** If the judge throws, you get `None` and
  nothing is cached — a transient blip cannot freeze a bad verdict for an hour.
- **Zero assumptions.** It wants one `dict` and one `callable`. No framework,
  no I/O, no identity. Your existing judge function is wrapped, not rewritten.

## Wiring Recipe (what we actually ran)

Four mount points, three of them agent message gates in production since
2026-10-29:

```python
# 1. fail-open first layer
try:
    from ganglion import Ganglion as _StdGanglion
except Exception:
    _StdGanglion = None

# 2. wrap the EXISTING inline judge, don't rewrite it
def _ganglion_check(msg, platform):
    if _StdGanglion is None:
        return _inline_judge(msg)                     # fallback: original path
    key = f"{platform}::{msg}"                        # namespace the key!
    v, r = _G.check(key, processor=_inline_judge)
    return (1, r) if v == 1 else (0, r)
```

Two rules we learned the hard way:

1. **Namespace the key yourself.** The primitive only hashes the content you
   pass. Without `platform::` in the key, a hit cached on the desktop channel
   leaks into the CLI channel and bypasses a gate that was supposed to be
   desktop-only. The core deliberately doesn't solve this — the host must.
2. **Persist the memory.** Hooks spawn a fresh process per message, so an
   in-process dict lives exactly one message long. Write it to disk
   (`~/.crypto/ganglion_mem_fd.json`), keep TTL-valid entries plus the most
   recent 500.

## Results

| What we measured | Result |
|---|---|
| 20-message old/new verdict regression (gate A) | 20/20 identical, zero drift |
| Second occurrence of the same message | 0 tokens, 0.0s |
| Regression suite (gate B) | 11/11 |
| Third gate | installed by the agent itself, unprompted |

And the part that saved more tokens than the cache ever did — three caching
designs we replayed against 6,224 real production events and **killed**:

| Design | Hit rate | Verdict |
|---|---|---|
| Cache the arbitration verdict (key = full prompt incl. account tail) | 0.7% | Dead — the tail changes every round, the key never repeats |
| Same, key = message only | 22.9%, but only **89.8%** agreement with the live verdict | Dead — stale second opinions are worse than none |
| 10-minute duplicate window on the message stream | 21%, **82%** agreement | Dead — *repetition is not identity* |

The real win came from a **filter**, not a cache: 97.9% of what entered our
judgment pipeline was memory-ledger bookkeeping, not signal. Blocking it at the
bus cut judgments from 3,410 to 93 per day. Measure what enters the pipeline
before you memoize it.

## Skills Needed

- None beyond Python 3.8+ stdlib.
- Optional: an OpenClaw hook (`pre_llm_call` or a message hook) to mount the gate.

## Related Links

- Repo + tests: https://github.com/huv0310-arch/ganglion
- Field notes (wiring recipe, kill-file, 10 real incidents): `docs/KNOWLEDGE.md` in the repo
- Frozen core: `ganglion.py`, 105 lines, unchanged since 2026-10-29, 19 tests
