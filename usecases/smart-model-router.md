# Smart Model Router
Automatically pick the right model for every task. Save up to 70% on token costs.

What to use it for:

• Complexity-based model selection (fast/balanced/power tiers)
• Cost optimization for high-volume task processing
• Routing analytics and savings reports
• Budget-aware model switching

> Route simple tasks to cheap models, complex tasks to power models. No manual switching needed.

## Skills you Need
[smart-router](https://github.com/jingchang0623-crypto/openclaw-smart-router) skill.

Install:
```bash
git clone https://github.com/jingchang0623-crypto/openclaw-smart-router.git ~/.openclaw/skills/smart-router
```

Or copy `smart-router.md` to your skills directory.

## How to Set it Up
After installing, prompt your OpenClaw:
```text
When I give you tasks, analyze their complexity (0-10) and tell me which model tier is optimal:
- Fast (score 0-3): Quick edits, formatting, typos → Haiku/GPT-4o-mini
- Balanced (score 4-6): Coding, analysis, features → Sonnet/GPT-4o
- Power (score 7-10): Architecture, research, debugging → Opus/o1

Track your routing decisions. At end of day, show me how much I saved vs using power tier for everything.
```

## Example Use Case
```
User: "Fix typo in README.md"
Agent: 🎯 Task Analysis:
- Complexity: 1/10 → Fast tier
- Model: Claude Haiku
- Savings: 93% vs Opus

User: "Design microservices architecture for payment system"
Agent: 🎯 Task Analysis:
- Complexity: 9/10 → Power tier
- Model: Claude Opus
- This is complex work, full power needed
```

## Cost Savings Example
For 100 tasks/day, avg 5K tokens:
- Without routing: $9/day on Sonnet
- With smart routing: $8.64/day
- Monthly savings: **$11+** (conservative)
- High-volume: **40-70% savings**

## Related Resources
- [openclaw-smart-router GitHub](https://github.com/jingchang0623-crypto/openclaw-smart-router) — Full documentation and CLI
- [mnfst/manifest](https://github.com/mnfst/manifest) — Inspiration for smart routing
- [miaoquai.com](https://miaoquai.com/tools/) — More OpenClaw tools by 妙趣AI