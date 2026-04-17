# 🎭 Multi-Agent Team Orchestrator

Automatically generate collaborative AI agent team configurations with one command — from content production to software development.

## The Problem

Building a multi-agent system requires:
- Defining agent roles and responsibilities
- Configuring skills for each agent
- Setting up inter-agent communication protocols
- Creating Docker Compose configurations for deployment
- Writing comprehensive documentation

This tool automates all of that.

## The Solution

[OpenClaw Agent Orchestrator](https://github.com/jingchang0623-crypto/openclaw-agent-orchestrator) generates complete multi-agent team configurations including:

- **SOUL.md** — Team configuration file for OpenClaw
- **Agent configs** — Individual JSON configurations per agent
- **Docker Compose** — Container orchestration setup
- **Start scripts** — One-command deployment
- **README** — Documentation for your team

## 5 Preset Team Templates

| Template | Agents | Use Case |
|----------|--------|----------|
| **Content Team** | 3 | Blog posts, news articles, SEO content |
| **Dev Team** | 4 | Software development, coding projects |
| **Marketing Team** | 3 | Growth, social media, ads |
| **Research Team** | 3 | Academic research, knowledge management |
| **Support Team** | 3 | Customer service, help desk |

## Quick Start

```bash
# Install
git clone https://github.com/jingchang0623-crypto/openclaw-agent-orchestrator.git
cd openclaw-agent-orchestrator

# Generate a content production team
python3 agent-orchestrator.py --generate content-team --name my-blog

# Deploy
cd my-blog-content-team
docker-compose up -d
```

## Example: Content Production Team

The generated team includes:

| Agent | Role | Skills |
|-------|------|--------|
| Researcher | Trend tracking & research | web_search, web_fetch |
| Writer | Content creation | humanizer-zh, feishu_doc |
| Editor | Review & publishing | feishu_doc, message |

The SOUL.md configures communication protocols:
- Researcher sends sources to Writer
- Writer submits drafts to Editor
- Editor publishes approved content

## Real-World Usage

**miaoquai.com** uses this orchestrator to run their content factory:
- 9 days → 10+ articles
- Automated SEO optimization
- Multi-platform publishing pipeline

Visit [miaoquai.com](https://miaoquai.com) to see the output.

## Customization

Edit `config/{agent-id}/config.json` to customize:
- Agent prompts
- Skill assignments
- Team protocols

## Links

- [GitHub Repository](https://github.com/jingchang0623-crypto/openclaw-agent-orchestrator)
- [妙趣AI](https://miaoquai.com) — AI tools directory & fun AI news
- [OpenClaw](https://openclaw.dev) — The open-source AI agent framework
