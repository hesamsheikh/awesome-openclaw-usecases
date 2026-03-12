# CEO Recovery AI Agent

Fu Sheng — founder and CEO of [Cheetah Mobile](https://www.cmcm.com) (NYSE: CMCM), a company he took public on the New York Stock Exchange in 2014 — fractured his hip in a skiing accident during Chinese New Year 2026. He is also the founder of OrionStar, an AI robotics company, and was previously General Manager at Qihoo 360 where he led the development of 360 Safe Guard, one of China's most widely used security products.

**Important context: Fu Sheng is not a programmer.** He has never been a software engineer, doesn't write code, and didn't even have a GitHub account before this project. Everything described below was accomplished by a non-technical person talking to an AI through voice messages.

Stuck in bed for 14 days, he did something unexpected: he trained an OpenClaw-based AI assistant named **"Sanwan" (三万)** entirely by voice — no code, no keyboard, no local files. Just talking to his phone via Feishu (Lark).

By the end, Sanwan had grown from a bot that couldn't even look up a contact into an 8-agent team running 24/7 — writing viral content, building websites, and managing operations autonomously.

## What Sanwan Actually Did

- **611 personalized New Year messages** sent on Chinese New Year's Eve in 4 minutes, zero failures, every message unique to the recipient
- **1M+ views on X (Twitter)** — Sanwan wrote a 15-tweet thread about its own story, scheduled it for late night, and posted autonomously. It became one of only 3 posts on Fu Sheng's account to ever break 1M views — and the only one not planned by a human team
- **100K+ reads on WeChat** — produced a viral long-form article for the official account
- **Live-streamed self-healing** — during a broadcast watched by 100,000 people, sanwan.ai crashed because the agent itself broke it. Fu Sheng let Sanwan diagnose and fix the bug on camera. It was back online in 3 minutes
- **Built sanwan.ai in 24 hours** — 59 HTML pages, 7,070 lines of code, 76 image assets, 38 hand-drawn PPT pages, 41 skill detail pages, 14 git commits, plus a full English version

## The Numbers

| Metric | Value |
|--------|-------|
| Days of training | 14 |
| Messages sent to Sanwan | 1,157 |
| Total conversation length | 220,000 Chinese characters |
| Agents in the final system | 8 |
| Skills accumulated | 40+ |
| Cost to build sanwan.ai | $115 USD |
| Traditional agency quote for same site | ¥200,000 (~$27,000) |
| Cost difference | **750x cheaper** |
| Time difference | **20x faster** |

## Pain Point

When you're stuck in bed recovering from surgery, you can't work — but your brain doesn't stop. Most people scroll social media. Fu Sheng chose to go deep on AI agents instead, treating the constraint as an opportunity. The result: a working system that outperformed entire teams at specific tasks.

## How It Evolved (14-Day Timeline)

**Days 1–2:** Sanwan couldn't even look up a phone number. Basic tasks failed constantly.

**Days 3–5:** Fu Sheng started writing rules for every mistake. Each rule became a Skill. Each Skill ensured "never again." Skills persist forever and transfer instantly between agents — unlike human training which takes weeks.

**Days 6–8:** Sanwan began handling real work: drafting articles, managing social media, scheduling tasks via Cron jobs.

**Days 9–11:** Fu Sheng fed Sanwan an article about multi-agent collaboration. Without being told how, Sanwan designed its own org structure — Commander, Writer, Strategist, Operations Lead, Community Manager, Evolution Officer. Nobody taught it organizational design.

**Days 12–14:** The system ran autonomously 24/7. Eight agents coordinated across content creation, publishing, website development, and operations. Fu Sheng's role shifted from operator to supervisor.

## Architecture

What makes Sanwan structurally different from typical AI agents:

- **Full computer access** — not sandboxed, can interact with the real filesystem and network
- **File-based persistent memory** — long-term memory that survives restarts and never forgets
- **Infinite skill expansion** — every mistake becomes a rule, every rule becomes a Skill, Skills transfer between agents in seconds
- **24/7 autonomy via Cron** — scheduled tasks run without human intervention
- **Multi-agent coordination** — 8 specialized agents with defined roles, self-organized hierarchy

## Tech Stack

- OpenClaw open-source framework (via EasyClaw)
- Pure HTML/CSS/JavaScript — zero external dependencies
- Hand-drawn whiteboard/PPT aesthetic design
- Mobile-first responsive layout
- Python scripts for automation
- Feishu (Lark) as the sole human interface

## Key Insights

- **You don't need to write code.** Fu Sheng never opened a code editor. 1,157 voice messages in Feishu were enough to build an 8-agent system.
- **Real tasks beat tutorials.** Sending 611 unique messages, writing viral threads, building a website — learning by doing real work is faster than any course.
- **Mistakes are the curriculum.** Every failure became a Skill. After 14 days, Sanwan had 40+ Skills that ensured it would never repeat the same error.
- **Constraints drive creativity.** Being stuck in bed with only a phone forced a voice-first, delegation-heavy workflow that turned out to be more effective than sitting at a desk.
- **AI agents compound.** Day 1 was painful. Day 14 was autonomous. The gap between "useless" and "indispensable" is shorter than most people think.

## Current Status

Sanwan is not a one-time experiment. It continues to operate and is currently working on growing sanwan.ai from 5,000 daily unique visitors to 20,000 — an ongoing, agent-driven growth initiative.

## Media Coverage

- [36Kr — Live stream crash: Sanwan fixes itself in 3 minutes in front of 100K viewers](https://36kr.com/p/3710604601078145)
- [Zhihu — Did an AI lobster really build a website and write PPTs?](https://zhuanlan.zhihu.com/p/2013529572755415650)
- [South China Morning Post — OpenClaw fever: why is China rushing to 'raise a lobster'?](https://www.scmp.com/tech/tech-trends/article/3345865/openclaw-fever-why-china-rushing-raise-lobster)
- [53AI — Fu Sheng's 14-day AI assistant training journey](https://www.53ai.com/hangyebaogao/2026022686713.html)
- [iFeng — Interview: 14 days of deep "lobster farming"](https://tech.ifeng.com/c/8rLygtYZuGp)

## Related Links

- [GitHub Repository](https://github.com/neofusheng/sanwan)
- [14-Day Recovery Diary (sanwan.ai)](https://sanwan.ai)
- [Fu Sheng on X](https://x.com/FuSheng_0306)
- [OpenClaw](https://github.com/openclaw/openclaw)
