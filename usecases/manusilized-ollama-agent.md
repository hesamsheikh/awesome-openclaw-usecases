# Manus-Level AI Agent with Open-Source Models via Ollama

**Category:** AI & LLMs / Productivity
**Skill:** [manusilized](https://github.com/wd041216-bit/manusilized)

## What It Does

Run a fully autonomous, Manus-quality AI agent on your own hardware using only open-source models from Ollama — no API keys, no cloud costs, no data leaving your machine.

`manusilized` patches OpenClaw's Ollama integration at the kernel level to unlock three capabilities that were previously only available with closed-source models like GPT-4 or Claude:

1. **Real-time streaming** — See the agent's thoughts and actions appear token-by-token, just like Manus
2. **Reliable tool use** — Open-source models (GLM-5, Qwen3, DeepSeek V3.2, Kimi-K2.5) can now call tools reliably, even when they output Markdown instead of JSON
3. **Long-horizon tasks** — Context compression lets the agent work on complex, multi-step tasks without hitting token limits

## Example Use Cases

### 1. Autonomous Research Agent
Ask the agent to research a topic, browse the web, summarize findings, and write a report — all while watching it work in real-time via streaming output.

```
"Research the latest developments in quantum computing, visit 5 relevant papers, 
and write a 2-page executive summary with citations."
```

### 2. Full-Stack Code Generation
Have the agent scaffold a complete project, write tests, fix bugs, and commit to GitHub — using only a local Qwen3-Coder model.

```
"Create a FastAPI backend with JWT auth, SQLite database, and Docker support. 
Write tests and push to my GitHub repo."
```

### 3. Multi-Step Data Analysis
Feed the agent a CSV file and have it clean the data, run analysis, generate charts, and produce a PDF report — all locally.

```
"Analyze this sales data, identify trends, create visualizations, 
and generate a board-ready PDF report."
```

## Setup

### Prerequisites
- [OpenClaw](https://github.com/openclaw/openclaw) installed
- [Ollama](https://ollama.ai) running locally or on a cloud VPS

### Installation

```bash
# 1. Clone manusilized
git clone https://github.com/wd041216-bit/manusilized
cd manusilized

# 2. Apply the OpenClaw kernel patch
bash install-patch.sh /path/to/your/openclaw

# 3. Pull a recommended model
ollama pull qwen3-coder   # Best for coding tasks
ollama pull glm-5         # Best for reasoning & planning
ollama pull deepseek-v3.2 # Best overall balance

# 4. Configure OpenClaw to use Ollama
# In OpenClaw settings, select Ollama as provider
```

## Recommended Models

| Task | Model | Why |
|------|-------|-----|
| General reasoning & planning | `glm-5` | Best open-source reasoning, MoE architecture |
| Code generation | `qwen3-coder` | State-of-the-art code quality |
| Long-context tasks | `kimi-k2.5` | 256K context window |
| Fast responses | `deepseek-v3.2` | Excellent speed/quality ratio |
| Vision tasks | `qwen3-vl` | Best open-source vision model |

## Why This Matters

Before `manusilized`, using Ollama with OpenClaw meant:
- ❌ Waiting for the full response before seeing any output (no streaming)
- ❌ Frequent crashes when models output tool calls in Markdown format
- ❌ Tasks failing after 10-15 turns due to context overflow

After `manusilized`:
- ✅ Real-time token streaming — watch the agent think
- ✅ 95%+ tool call success rate with open-source models
- ✅ Unlimited task length via intelligent context compression
- ✅ Smart error recovery — the agent learns from failures

## Contributing

Issues and PRs welcome at [github.com/wd041216-bit/manusilized](https://github.com/wd041216-bit/manusilized)
