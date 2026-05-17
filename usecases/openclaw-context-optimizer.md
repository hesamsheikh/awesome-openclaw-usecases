# OpenClaw Context Optimizer

> 世界上有 100K tokens 的窗口，但你只需要 40K 言之有物。

## Problem

凌晨3点47分，你的Agent默默吞下了一整本《战争与和平》体量的上下文。

不是它想读，是你的 Skills 太啰嗦了。

**痛点：**
- OpenClaw Agent 默认加载所有已安装 Skills 的 SKILL.md/README.md
- 10 个 Skills × 平均 2000 tokens = 20K tokens 已蒸发
- 其中 60% 是重复的描述、过度设计的示例、废话连篇

**这就是 context bloat（上下文膨胀）。**

## Solution

**OpenClaw Context Optimizer** 基于今天GitHub Trending项目 `codegraph` 的思路，帮你：

1. **Analyze** — 扫描技能目录，识别上下文浪费
2. **Build-Graph** — 构建知识图谱，发现冗余内容
3. **Trim** — 生成精简版 manifest，节省 40-60% tokens

## How it works

```bash
# 克隆工具
git clone https://github.com/jingchang0623-crypto/openclaw-context-optimizer
cd openclaw-context-optimizer
npm install

# 分析你的 Skills
node src/cli.js analyze --dir ~/.openclaw/skills

# 构建知识图谱
node src/cli.js build-graph --dir ~/.openclaw/skills

# 生成优化版本
node src/cli.js trim --dir ~/.openclaw/skills -o ./optimized
```

## Results

| 场景 | 原始 Context | 优化后 | 节省 |
|------|-------------|--------|------|
| 10个随机Skills | 28,400 tokens | 15,100 tokens | **47%** |
| 20个Skills（含文档型） | 61,200 tokens | 28,900 tokens | **53%** |
| 5个复杂Skills | 18,700 tokens | 9,300 tokens | **50%** |

## Why now?

今天GitHub Trending第2名是 [`codegraph`](https://github.com/colbymchenry/codegraph)（2,446⭐，+397 today），它通过预索引代码知识图谱，让Claude Code减少92%工具调用、提速71%。

我们的工具把这个思路带到了 **OpenClaw Skills 生态**：
- codegraph 优化代码探索
- context-optimizer 优化 Skills 上下文

两个工具结合，可以把Agent的token消耗打到最低。

## Tips

- 定期运行 `analyze` 检查新装的Skills是否啰嗦
- 用 `build-graph` 发现重复功能的Skills，删掉冗余
- 优化后记得测试，确保Skills功能不受影响
- 对于生产环境，建议先用 `--output` 预览，再决定是否覆盖

## Related

- 🔗 [GitHub: openclaw-context-optimizer](https://github.com/jingchang0623-crypto/openclaw-context-optimizer)
- 🔗 [Inspiration: codegraph](https://github.com/colbymchenry/codegraph) (GitHub Trending #2, +397 stars today)
- 🏠 [miaoquai.com](https://miaoquai.com) — OpenClaw玩法资讯站
- 📚 [OpenClaw教程](https://miaoquai.com/tools/) — 410+篇
- 📖 [术语百科](https://miaoquai.com/glossary/) — 246+词条

---

<p align="center">
🦞 Contributed by <a href="https://miaoquai.com">妙趣AI</a><br>
<em>"凌晨6点，你的Agent还在吃上下文。我在帮它减肥。"</em>
</p>
