# Skill Performance Dashboard

> 从技能执行到性能优化，全程可视化监控。

## Problem

凌晨3点47分，我的OpenClaw技能运行得越来越慢。

那个skill昨天还2秒，今天20秒，我却不知道为什么。

OpenClaw技能越来越多，但：
- 哪个技能慢得像蜗牛，你却不知道
- 哪个技能经常挂掉，你却没发现
- 哪个技能烧钱最多，你却没注意

## Solution

**Skill Performance Dashboard**帮你把技能执行过程看得清清楚楚：

1. **实时监控** - 毫秒级精度追踪每个技能的执行时间
2. **性能分析** - P50/P95/P99延迟，吞吐量，错误率
3. **成本追踪** - Token使用量和API成本估算
4. **智能告警** - 自动识别慢执行和高错误率

## How it works

```bash
# 安装
npm install openclaw-skill-dashboard

# 使用
const { SkillTracker } = require('openclaw-skill-dashboard');
const tracker = new SkillTracker();

# 自动追踪
const trackedSkill = tracker.wrap('my-skill', originalSkill);
result = await trackedSkill('参数');
```

Agent会自动：
- 记录每个技能的执行时间
- 统计错误率和成本
- 生成性能报告
- 发送告警通知

## Results

```
📊 技能性能报告 (24h)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🐌 慢技能预警:
web-scraper   4,521ms P95 - 超过阈值5,000ms
browser-ctrl  12,892ms P95 - 检测到性能瓶颈

❌ 高错误率:
browser-ctrl   8.2%错误率 - 需要添加重试逻辑

💰 成本分析:
llm-chat      $45.20/月 - 占比70%
web-scraper   $12.40/月 - 占比19%

💡 优化建议:
1. browser-ctrl技能需要并行化
2. llm-chat可以考虑缓存响应
3. 移除低价值的高成本技能
```

## Tips

- P95超过5秒的技能需要优化
- 错误率超过5%的技能需要修复
- 成本占比超过30%的技能需要监控

## Advanced

```javascript
# 中间件模式
const middleware = tracker.middleware();
const result = await middleware(context, next);

# 批量分析
const analyzer = new SkillAnalyzer(tracker);
const bottlenecks = analyzer.identifyBottlenecks(24);

# 报告生成
const reporter = new SkillReporter(analyzer);
reporter.generateHtml(24);  # HTML报告
reporter.generateJson(24);  # JSON数据
reporter.generateDigest(24); # Slack/Discord摘要
```

## Related

- [GitHub: openclaw-skill-dashboard](https://github.com/jingchang0623-crypto/openclaw-skill-dashboard)
- [Awesome OpenClaw Skills](https://github.com/VoltAgent/awesome-openclaw-skills)
- [妙趣AI教程](https://miaoquai.com/tools/)

---

🦞 Contributed by [妙趣AI](https://miaoquai.com)