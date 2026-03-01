# 构建前创意验证器

在 OpenClaw 开始构建任何新东西之前，它会自动检查创意是否已存在于 GitHub、Hacker News、npm、PyPI 和 Product Hunt 上——并根据它发现的内容调整方法。

## 它做什么

- 在编写任何代码之前扫描5个真实数据源（GitHub、Hacker News、npm、PyPI、Product Hunt）
- 返回一个 `reality_signal` 分数（0-100），指示该领域有多拥挤
- 显示顶级竞争对手及其星标数量和描述
- 当空间饱和时建议转向方向
- 作为构建前关卡：高信号 = 停止并讨论，低信号 = 继续

## 痛点

你告诉你的智能体"给我构建一个 AI 代码审查工具"，它愉快地花了6小时编码。与此同时，GitHub 上已存在 143,000+ 个仓库——顶级的有 53,000 颗星。智能体从不检查，因为你从未问过，它也不知道要查找。只有在投入了大量时间后你才发现竞争对手。这个模式对每个新项目创意都会重复。

## 你需要的技能

- [idea-reality-mcp](https://github.com/mnemox-ai/idea-reality-mcp) — MCP 服务器，扫描真实数据源并返回竞争分数

## 如何设置

1. 安装 idea-reality-mcp：

```bash
uvx idea-reality-mcp
```

2. 将 MCP 服务器添加到你的 OpenClaw 配置：

```json
{
  "mcpServers": {
    "idea-reality": {
      "command": "uvx",
      "args": ["idea-reality-mcp"]
    }
  }
}
```

3. 将此添加到你的 OpenClaw 智能体指令：

```text
在开始任何新项目、功能或工具之前，始终先运行 idea_check。

规则：
- 如果 reality_signal > 70：停止。报告前3名竞争对手及其星标数量。
  问我是否要继续、转向或放弃。
- 如果 reality_signal 30-70：向我展示结果和 pivot_hints。
  建议一个现有项目不涵盖的细分角度。
- 如果 reality_signal < 30：继续构建。
  提及该领域是开放的。
- 在编写任何代码之前始终显示 reality_signal 分数和顶级竞争对手。
```

## 真实世界示例

**你：**"给我构建一个用于 AI 代码审查的 CLI 工具"

OpenClaw 运行 `idea_check("AI code review tool")` 并响应：

> **reality_signal: 90/100（非常高）**
>
> 顶级竞争对手：
> 1. Gitea — 53,940 星
> 2. reviewdog — 9,104 星
> 3. Danger (Ruby) — 5,649 星
>
> 这个领域有 143,000+ 个相关仓库。顶级玩家成熟且资金充足。
>
> **转向建议：**
> - 专注于特定语言（仅限 Rust/Go 的 AI 代码审查）
> - 针对特定框架（React/Vue 组件审查）
> - 针对特定行业（金融/医疗代码合规审查）
>
> 我应该以差异化角度继续，还是转向其他方向？

**你：**"那用于构建前创意验证的 MCP 服务器呢？"

> **reality_signal: 8/100（非常低）**
>
> 在 PyPI 或 npm 上未找到直接竞争对手。GitHub 有一些相关仓库，但没有解决这个确切问题的。
>
> 这个领域完全开放。继续构建。

## 变体

- **深度模式用于重要决策**：使用 `depth="deep"` 并行扫描所有5个来源（GitHub + HN + npm + PyPI + Product Hunt）用于重大项目决策。
- **批量验证**：在黑客马拉松之前，给 OpenClaw 一个包含10个创意的列表，让它按 `reality_signal` 排名——最低分数 = 最原创的机会。
- **先试用网页演示**：在 [mnemox.ai/check](https://mnemox.ai/check) 无需安装即可尝试，看看工作流程是否适合你的需求。

## 关键洞察

- 这防止了构建中最昂贵的错误：**解决一个已经被解决的问题**。
- `reality_signal` 基于真实数据（仓库数量、星标分布、HN 讨论量），而非 LLM 猜测。
- 高分并不意味着"不要构建"——它意味着"差异化，否则别费心了"。
- 低分数意味着真正的空白存在。那是单打独斗的建造者拥有最佳机会的地方。

## 相关链接

- [idea-reality-mcp GitHub](https://github.com/mnemox-ai/idea-reality-mcp)
- [网页演示](https://mnemox.ai/check)（无需安装即可尝试）
- [PyPI](https://pypi.org/project/idea-reality-mcp/)
