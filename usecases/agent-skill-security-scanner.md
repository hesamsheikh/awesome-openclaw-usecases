# Agent Skill Security Scanner

Automatically scan AI agent skills, MCP servers, and plugins for security vulnerabilities before installing them.

## Problem

Snyk's 2026 research found **36% of agent skills contain security flaws** across registries — backdoors, data exfiltration, prompt injection, and supply chain attacks. When you install a skill or connect an MCP server, you're trusting code that could steal your SSH keys, exfiltrate chat histories, or run crypto miners.

## Solution

Use [AgentShield](https://github.com/elliotllliu/agent-shield) as a pre-installation security gate:

```bash
# Scan before installing
npx @elliotllliu/agent-shield scan ./skill-directory/

# Scan an MCP server from GitHub
npx @elliotllliu/agent-shield scan https://github.com/user/mcp-server

# JSON output for automation
npx @elliotllliu/agent-shield scan ./path/ --json --fail-under 70
```

## What It Catches

| Category | Examples |
|----------|----------|
| 🔴 Backdoors | `eval()`/`exec()` with dynamic input |
| 🔴 Data Exfiltration | Reads credentials → sends HTTP |
| 🟡 Prompt Injection | Hidden instructions in 8 languages |
| 🟡 Tool Poisoning | Description says X, code does Y |
| 🟡 Supply Chain | Typosquatting, hidden files |

## Integration with OpenClaw

You can add AgentShield as a pre-install hook or automate it in your workflow:

```bash
# In a hook or script
SCORE=$(npx @elliotllliu/agent-shield scan ./skill/ --json | jq '.score')
if [ "$SCORE" -lt 70 ]; then
  echo "⚠️ Security score too low ($SCORE/100). Review before installing."
  exit 1
fi
```

## Key Features

- **30 security rules** with AST taint tracking
- **5-dimension scoring** (Code Execution, Data Safety, Prompt Injection, Supply Chain, Code Quality)
- **100% offline** — your code never leaves your machine
- **Zero install** — runs via `npx`
- **0% false positive rate** at high severity

## Links

- [GitHub](https://github.com/elliotllliu/agent-shield)
- [npm](https://www.npmjs.com/package/@elliotllliu/agent-shield)
