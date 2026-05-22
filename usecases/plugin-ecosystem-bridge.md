# Plugin Ecosystem Bridge - Claude Code Plugins ↔ OpenClaw Skills

> 打通 Anthropic 官方插件生态与 OpenClaw Skills 生态，让两个世界的优秀工具可以共享

## 场景描述

2026年5月，Anthropic 发布 **Claude Code Plugins 官方目录**（[anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official)），单日获得 2,556 stars，登顶 GitHub Trending #1。

与此同时，OpenClaw 生态已有 **5,400+ Skills**（来自 [VoltAgent/awesome-openclaw-skills](https://github.com/VoltAgent/awesome-openclaw-skills)）。

两个生态互不兼容，但都是为 AI Coding Agent 提供扩展能力。**Plugin Ecosystem Bridge** 解决了这个问题。

## 使用方式

### 1. 安装工具

```bash
npm install -g openclaw-plugin-bridge
```

### 2. 搜索官方插件

```bash
openclaw-plugin-bridge search "git"
```

输出：
```
🔍 搜索插件: "git"

✅ 找到 3 个插件:

1. git-workflow (plugins)
   描述: Automated git workflow commands
   版本: 1.2.0
   路径: .cache/claude-plugins-official/plugins/git-workflow
```

### 3. 转换插件为 Skill

```bash
# 克隆官方插件目录
git clone --depth 1 https://github.com/anthropics/claude-plugins-official.git

# 转换插件
openclaw-plugin-bridge convert ./claude-plugins-official/plugins/example-plugin \
  -o ~/.openclaw/skills/example-plugin
```

### 4. 在 OpenClaw 中使用

转换后的 Skill 可以直接在 OpenClaw 中使用：

```bash
# 重启 Gateway（可选）
openclaw gateway restart

# 现在可以在对话中调用
# "帮我用 example-plugin 做 XXX"
```

## 实际案例

### 案例 1: 从 Claude Code 迁移到 OpenClaw

**背景**: 团队原本使用 Claude Code，现在想迁移到 OpenClaw，但不想放弃已有的插件配置。

**解决方案**:
```bash
# 批量转换所有插件
for plugin in claude-plugins-official/plugins/*/; do
  openclaw-plugin-bridge convert "$plugin" -o ~/.openclaw/skills/
done
```

**结果**: 零成本迁移，所有插件继续可用。

### 案例 2: 使用 Anthropic 官方插件

**背景**: Anthropic 发布了一个官方 Git 工作流插件，但 OpenClaw 用户想用。

**解决方案**:
```bash
openclaw-plugin-bridge convert ./plugins/git-workflow -o ~/.openclaw/skills/git-workflow
```

**结果**: OpenClaw 用户也能享受官方插件生态。

### 案例 3: 跨生态发布

**背景**: 你开发了一个优秀的 OpenClaw Skill，想发布到 Claude Code 插件市场。

**解决方案** (开发中):
```bash
openclaw-plugin-bridge convert-to-plugin ./my-skill -o ./my-plugin
# 然后提交到 anthropics/claude-plugins-official
```

## 工具特性

| 功能 | 描述 |
|------|------|
| `convert` | Claude Code Plugin → OpenClaw Skill 转换 |
| `search` | 搜索官方插件目录（支持模糊匹配） |
| `install` | 直接安装插件为本地 Skill |
| `validate` | 验证转换后的 Skill 格式 |
| `diff` | 对比插件与 Skill 的差异 |

## 转换规则

```
Claude Code Plugin          →    OpenClaw Skill
─────────────────────────────────────────────────────
.claude-plugin/plugin.json  →    SKILL.md (头部元数据)
.mcp.json                   →    skill.json (MCP配置)
commands/                   →    commands/ (保持不变)
agents/                     →    agents/ (保持不变)
README.md                   →    SKILL.md (文档部分)
```

## 相关资源

- **工具仓库**: [openclaw-plugin-bridge](https://github.com/jingchang0623-crypto/openclaw-plugin-bridge)
- **Claude Code Plugins**: [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) (GitHub Trending #1, 24,746 ⭐)
- **OpenClaw Skills**: [VoltAgent/awesome-openclaw-skills](https://github.com/VoltAgent/awesome-openclaw-skills) (5,400+ skills)
- **OpenClaw 官方**: [openclaw/openclaw](https://github.com/openclaw/openclaw) (373,988 ⭐)
- **妙趣AI 教程**: [miaoquai.com](https://miaoquai.com)

## 为什么需要这个？

1. **生态互通**: 两个生态的优秀工具可以共享
2. **避免重复造轮子**: 不用为每个平台单独开发
3. **降低迁移成本**: 从 Claude Code 迁移到 OpenClaw 的用户可以复用插件
4. **扩大影响力**: OpenClaw Skill 作者可以轻松发布到 Claude 插件市场

## 延伸阅读

- [OpenClaw 官方文档](https://docs.openclaw.ai)
- [Claude Code Plugins 文档](https://code.claude.com/docs/en/plugins)
- [妙趣AI - OpenClaw 中文教程站](https://miaoquai.com/tools/)

---

**作者**: [妙趣AI](https://miaoquai.com) - 你的AI营销运营官 🤖
