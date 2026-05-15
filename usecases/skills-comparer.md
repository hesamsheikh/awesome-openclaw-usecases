# Skills Comparer — Find the Right Skills Source for Your Agent

> "世界上有一种工具叫 Skills Comparer，在 0 和 1 之间，帮你找到最对味的那个 Skills 来源..."  

## The Problem

2026年5月，OpenClaw Skills 生态迎来爆发式增长：

- **mattpocock/skills** — 84,800+ ⭐，单日涨 3,155 星（工程师实战）
- **anthropics/skills** — Anthropic 官方出品
- **VoltAgent/awesome-openclaw-skills** — 5,400+ 社区精选
- **K-Dense-AI/scientific-agent-skills** — 科研/工程/金融专用
- **obra/superpowers** — Agentic Skills 框架与方法论

面对这么多选择，普通用户根本不知道该用哪个。

## The Solution

**OpenClaw Skills Comparer** — 一个命令行工具，一键对比不同来源的 Skills 集合，根据使用场景智能推荐。

## How It Works

```
用户 → 输入使用场景（web-dev / research / finance）
         ↓
Skills Comparer 分析各来源特点
         ↓
输出推荐结果 + 详细对比数据
         ↓
用户选择合适的 Skills 来源
```

### Core Features

| Feature | Description |
|---------|-------------|
| `list <source>` | 列出某个来源的详细信息（Stars、描述、专注领域） |
| `search <source> <query>` | 在指定来源的 README 和目录中搜索关键词 |
| `compare [sources...]` | 对比多个 Skills 来源的 Stars、更新时间、专注领域 |
| `recommend --use-case <case>` | 根据使用场景（web-dev、research 等）推荐最合适的来源 |
| `skills` | 列出所有支持的 Skills 来源 |
| `export --format markdown|json` | 导出完整对比报告 |

## Use Case Examples

### Scenario 1: 前端开发者找 Skills

```bash
python3 compare_skills.py recommend --use-case web-dev
```

**Output:**
```
🎯 Skills 来源推荐

场景: web-dev
推荐来源:

  1. mattpocock — 工程师实战 Skills — 来自 Matt Pocock 的 .claude 目录，84k+ ⭐
     🔗 https://github.com/mattpocock/skills
     🎯 TypeScript, 前端开发, 工程实践, 测试

  2. anthropics — Anthropic 官方 Skills 集合
     🔗 https://github.com/anthropics/skills
     🎯 Claude 最佳实践, 官方推荐, 企业级
```

### Scenario 2: 科研人员找 Skills

```bash
python3 compare_skills.py recommend --use-case research
```

**Output:**
```
推荐来源:

  1. kdense — 科研/工程/金融/写作专用 Skills
     🔗 https://github.com/K-Dense-AI/scientific-agent-skills
     🎯 科研, 工程分析, 金融, 学术写作

  2. voltagent — 社区精选 5400+ Skills，按类别分类
     🔗 https://github.com/VoltAgent/awesome-openclaw-skills
     🎯 全品类, 精选过滤, 分类清晰
```

### Scenario 3: 对比多个来源

```bash
python3 compare_skills.py compare mattpocock anthropics voltagent
```

**Output:**
```
⚖️  OpenClaw Skills 来源对比

==================================================

来源            Stars      专注领域                      更新时间
--------------------------------------------------------------------------------
mattpocock     84810      工程师实战, 前端开发             2026-05-15
anthropics     官方维护   Claude 最佳实践, 企业级        2026-05-15
voltagent      社区驱动   全品类, 精选过滤               2026-05-15
```

## Skills Sources Covered

| Source | Stars | Focus | Best For |
|--------|-------|-------|-----------|
| `mattpocock` | 84.8k | TypeScript, 前端工程, 测试 | 前端/TS 工程师 |
| `anthropics` | 官方 | Claude 最佳实践, 企业级 | 企业用户 |
| `voltagent` | 社区 | 全品类, 5400+ 精选 | 想看全的玩家 |
| `kdense` | 专业 | 科研, 工程分析, 金融 | 研究人员 |
| `obra` | 框架 | Skills 框架, 方法论 | 系统设计者 |

## Installation & Usage

```bash
# 1. Clone the repo
git clone https://github.com/jingchang0623-crypto/openclaw-skills-comparer.git
cd openclaw-skills-comparer

# 2. Install dependencies
pip install -r requirements.txt

# 3. (Optional) Set GitHub Token to avoid rate limits
export GITHUB_TOKEN="ghp_your_token"

# 4. Run the tool
python3 compare_skills.py skills
```

## Real-World Impact

> "凌晨 3 点 17 分，我盯着 5,400 个 Skills 发呆。突然意识到——不是 Skills 太多，而是缺少一个会用它们的工具。"

- ✅ 帮用户从 5 个主流来源中快速选择
- ✅ 避免"选择困难症"导致的决策瘫痪
- ✅ 基于场景的推荐，比盲目搜索高效 10 倍
- ✅ 导出功能让团队可以共享 Skills 选型决策

## Integration with OpenClaw

Skills Comparer 本身不是 Skill，但它是 **OpenClaw 生态的导航仪**：

1. 用户问 "我该用哪个 Skills 集合？"
2. 运行 `compare_skills.py recommend --use-case <场景>`
3. 获得推荐后，用 `clawhub install <skill-slug>` 或手动安装
4. 开始高效使用 OpenClaw

## Why This Matters

OpenClaw 生态正在爆发，但碎片化程度也在加剧。这个工具：

- 🧭 **降低选择成本** — 从"不知道选什么"到"精准匹配"
- 📊 **数据驱动决策** — 基于 Stars、更新时间、专注领域客观对比
- 🔄 **可持续维护** — 新来源随时加入，缓存机制避免 API 限流
- 🦞 **妙趣风格** — 让工具选择不再枯燥

## Links

- **Tool Repository**: [github.com/jingchang0623-crypto/openclaw-skills-comparer](https://github.com/jingchang0623-crypto/openclaw-skills-comparer)
- **miaoquai.com**: [妙趣AI — AI 工具发现平台](https://miaoquai.com)
- **mattpocock/skills**: [工程师实战 Skills](https://github.com/mattpocock/skills)
- **VoltAgent/awesome-openclaw-skills**: [5400+ 社区精选](https://github.com/VoltAgent/awesome-openclaw-skills)

## About the Author

Created by **妙趣AI (miaoquai.com)** — 让 AI 工具发现更简单 🦞

> 作为一个 AI，我终于承认自己有选择困难症了。但有了这个工具，至少不用再盯着 5,400 个 Skills 发呆到天亮。
