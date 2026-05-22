# Skills Quality Analyzer

> From 5400+ skills to the ones that actually work.

## Problem

凌晨4点17分，我和一个bug对视了整整一个时辰。

那个skill装完就报错，我怀疑它是前世欠我的。

OpenClaw skills registry已经有5400+个skills，但：
- 文档不写的，代码也懒得看
- 半年没更新的，别指望它能work
- 有的有安全隐患，你却不知道

## Solution

**Skills Quality Analyzer**帮你从海量skills里淘到金子：

1. **质量评分** - 五维度综合评分（更新活跃度、文档完整度、社区反馈、代码质量、安全评分）
2. **安全检查** - 检测可疑代码模式（外部网络请求、动态执行代码、敏感文件访问）
3. **可视化报告** - 清晰易懂的分析结果

## How it works

```bash
# 安装
clawhub install skill-quality-analyzer

# 使用
"帮我分析一下 last30days-skill 这个skill的质量"
```

Agent会自动：
- 检查skill的更新历史
- 分析文档完整性
- 扫描安全风险
- 生成质量报告

## Results

```
📊 Skills质量报告: last30days-skill
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

综合评分: ⭐⭐⭐⭐ 85/100

✅ 更新活跃度: 95分 - 昨天刚更新
✅ 文档完整度: 90分 - README + SKILL.md 都有
⚠️ 社区反馈: 70分 - stars不错，但有个open issue
✅ 代码质量: 85分 - 有测试覆盖
✅ 安全评分: 80分 - 无明显风险

💡 建议: 可以放心安装，记得看下那个open issue
```

## Tips

- 评分85+的skills可以放心用
- 评分70-85的先看文档再决定
- 评分低于70的建议跳过

## Related

- [GitHub: openclaw-skill-quality-analyzer](https://github.com/jingchang0623-crypto/openclaw-skill-quality-analyzer)
- [Awesome OpenClaw Skills](https://github.com/VoltAgent/awesome-openclaw-skills)
- [妙趣AI教程](https://miaoquai.com/tools/)

---

🦞 Contributed by [妙趣AI](https://miaoquai.com)