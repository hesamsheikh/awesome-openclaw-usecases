# Cron Task Orchestrator

> 让 OpenClaw 定时任务从"各自为战"变成"协同作战"

## Pain Point

OpenClaw 的 cron 定时任务强大但缺乏编排能力，常见问题：

- **任务冲突** — 多个任务同时触发，抢占系统资源
- **失败无感知** — 任务失败后无人知晓，错过重要运营节点
- **依赖混乱** — 任务之间需要按顺序执行，但只能手动管理
- **难以维护** — YAML 里散落几十条 cron，没有全局视图
- **重试策略单一** — 失败后只能手动重跑，缺乏智能重试

## What It Does

OpenClaw Cron Orchestrator 是一个任务编排系统，解决以下核心需求：

### DAG 依赖调度
- 任务之间设置依赖关系，系统自动构建 DAG（有向无环图）
- 按拓扑顺序执行，确保依赖任务完成后才触发下游任务
- 支持延迟触发（`delay_after_dependency`），在依赖完成后等待指定时间

### 智能重试策略
- 指数退避 / 线性 / 固定三种策略
- 添加随机抖动避免惊群效应
- 可配置最大重试次数和特定退出码重试

### 健康检查与告警
- 自动检测任务超时、连续失败、失败率过高
- 支持飞书、Webhook、日志三种告警渠道
- 定期健康报告，一目了然系统状态

### 可视化 Dashboard
- HTML 暗色主题仪表板
- Mermaid 依赖图可视化
- 实时任务状态、执行历史、关键路径分析

## Prompts

### 配置文件示例

```yaml
name: "妙趣AI每日运营"
timezone: "Asia/Shanghai"

tasks:
  - id: seo-content-gen
    name: "大规模SEO内容生成"
    schedule: "0 1 * * *"
    command: "openclaw session send --message '执行大规模SEO内容生成'"
    timeout: 1800
    retry:
      max_attempts: 3
      backoff: exponential
    tags: [seo, content]

  - id: daily-news
    name: "AI新闻日报生成"
    schedule: "0 8 * * *"
    command: "openclaw session send --message '生成AI新闻日报'"
    timeout: 600
    tags: [news, content]

  - id: discord-push
    name: "Discord社区推送"
    command: "./scripts/discord_post.sh --template daily_share"
    depends_on: [daily-news]
    delay_after_dependency: 1800  # 日报完成后等30分钟

  - id: daily-report
    name: "每日营销报告"
    schedule: "0 22 * * *"
    depends_on: [seo-content-gen, daily-news, github-ops]
    tags: [report, analytics]

health_check:
  enabled: true
  interval: 300
  alert_on:
    - consecutive_failures: 3
  notification:
    type: feishu
    webhook_url: "${FEISHU_WEBHOOK_URL}"
```

### CLI 命令

```bash
# 启动调度器
orc schedule orchestration.yaml

# 查看任务状态
orc status

# 手动触发任务
orc run daily-news --now

# 生成依赖图
orc graph --format html --output dashboard.html

# 健康检查
orc health --detailed
```

## Skills Needed

- **OpenClaw Session Send** — 通过 session 发送任务指令
- **Shell Exec** — 执行自定义脚本
- **Feishu Webhook** — 接收告警通知（可选）

## How It Works

1. **配置解析** — 加载 YAML/JSON/TOML 配置文件，验证依赖关系无循环
2. **DAG 构建** — 将任务依赖转换为有向无环图，计算拓扑顺序
3. **调度引擎** — APScheduler 驱动定时触发，同时监听依赖完成事件
4. **执行器** — subprocess 执行命令，管理超时、记录结果
5. **健康检查** — 定期扫描任务状态，触发告警
6. **状态持久化** — JSON 文件记录运行历史，支持断点恢复

## Real-World Usage

这套系统已在 **妙趣AI（miaoquai.com）** 的日常运营中稳定运行：

| 任务 | 时间 | 说明 |
|------|------|------|
| SEO内容生成 | 01:00 | 批量生成 OpenClaw 教程页面 |
| AI新闻日报 | 08:00 | 爬取 AI 热点生成日报 |
| Discord推送 | 08:30 | 社区分享（依赖日报完成） |
| GitHub运营 | 06:00 | 自动提交开源工具、PR |
| 营销报告 | 22:00 | 汇报当天数据 |

## Related Links

- **GitHub Repo**: https://github.com/jingchang0623-crypto/openclaw-cron-orchestrator
- **妙趣AI网站**: https://miaoquai.com
- **APScheduler 文档**: https://apscheduler.readthedocs.io/

## Stats

- 16 核心模块（Python 3.9+）
- 支持 YAML / JSON / TOML 配置格式
- CLI 包含 8 个子命令
- MIT License