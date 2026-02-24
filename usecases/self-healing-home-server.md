# Self-Healing Home Server & Infrastructure Management

Running a home server means being on-call 24/7 for your own infrastructure. Services go down at 3 AM, certificates expire silently, disk fills up, and pods crash-loop — all while you're asleep or away.

This use case turns OpenClaw into a persistent infrastructure agent with SSH access, automated cron jobs, and the ability to detect, diagnose, and fix issues before you know there's a problem.

## Pain Point

Home lab operators and self-hosters face a constant maintenance burden:

- Health checks, log monitoring, and alerting require manual setup and attention
- When something breaks, you have to SSH in, diagnose, and fix — often from your phone
- Infrastructure-as-code (Terraform, Ansible, Kubernetes manifests) needs regular updates
- Knowledge about your setup lives in your head, not in searchable documentation
- Routine tasks (email triage, deployment checks, security audits) eat hours every week

## What It Does

- **Automated health monitoring**: Cron-based checks on services, deployments, and system resources
- **Self-healing**: Detects issues via health checks and applies fixes autonomously (restart pods, scale resources, fix configs)
- **Infrastructure management**: Writes and applies Terraform, Ansible, and Kubernetes manifests
- **Morning briefings**: Daily summary of system health, calendar, weather, and task board status
- **Email triage**: Scans inbox, labels actionable items, archives noise
- **Knowledge extraction**: Processes notes and conversation exports into a structured, searchable knowledge base
- **Blog publishing pipeline**: Draft → generate banner → publish to CMS → deploy to hosting — fully automated
- **Security auditing**: Regular scans for hardcoded secrets, privileged containers, and overly permissive access

## Skills You Need

- `ssh` access to home network machines
- `kubectl` for Kubernetes cluster management
- `terraform` and `ansible` for infrastructure-as-code
- `1password` CLI for secrets management
- `gog` CLI for email access
- Calendar API access
- Obsidian vault or notes directory (for knowledge base)
- `openclaw doctor` for self-diagnostics

## How to Set It Up

### 1. Core Agent Configuration

Name your agent and define its access scope in AGENTS.md:

```text
## Infrastructure Agent

You are Reef, an infrastructure management agent.

Access:
- SSH to all machines on the home network (192.168.1.0/24)
- kubectl for the K3s cluster
- 1Password vault (read-only for credentials, dedicated AI vault)
- Gmail via gog CLI
- Calendar (yours + partner's)
- Obsidian vault at ~/Documents/Obsidian/

Rules:
- NEVER hardcode secrets — always use 1Password CLI or environment variables
- NEVER push directly to main — always create a PR
- Run `openclaw doctor` as part of self-health checks
- Log all infrastructure changes to ~/logs/infra-changes.md
```

### 2. Automated Cron Job System

The power of this setup is the scheduled job system. Configure in HEARTBEAT.md:

```text
## Cron Schedule

Every 15 minutes:
- Check kanban board for in-progress tasks → continue work

Every hour:
- Monitor health checks (Gatus, ArgoCD, service endpoints)
- Triage Gmail (label actionable items, archive noise)
- Check for unanswered alerts or notifications

Every 6 hours:
- Knowledge base data entry (process new Obsidian notes)
- Self health check (openclaw doctor, disk usage, memory, logs)

Every 12 hours:
- Code quality and documentation audit
- Log analysis via Loki/monitoring stack

Daily:
- 4:00 AM: Nightly brainstorm (explore connections between notes)
- 8:00 AM: Morning briefing (weather, calendars, system stats, task board)
- 1:00 AM: Velocity assessment (process improvements)

Weekly:
- Knowledge base QA review
- Infrastructure security audit
```

### 3. Security Setup (Critical)

This is non-negotiable. Before giving your agent SSH access:

```text
## Security Checklist

1. Pre-push hooks:
   - Install TruffleHog or similar secret scanner on ALL repositories
   - Block any commit containing hardcoded API keys, tokens, or passwords

2. Local-first Git workflow:
   - Use Gitea (self-hosted) for private code before pushing to public GitHub
   - CI scanning pipeline (Woodpecker or similar) runs before any public push
   - Human review required before main branch merges

3. Defense in depth:
   - Dedicated 1Password vault for AI agent (limited scope)
   - Network segmentation for sensitive services
   - Daily automated security audits checking for:
     * Privileged containers
     * Hardcoded secrets in code or configs
     * Overly permissive file/network access
     * Known vulnerabilities in deployed images

4. Agent constraints:
   - Branch protection: PR required for main, agent cannot override
   - Read-only access where write isn't needed
   - All changes logged and auditable via git
```

### 4. Morning Briefing Template

```text
## Daily Briefing Format

Generate and deliver at 8:00 AM:

### Weather
- Current conditions and forecast for [your location]

### Calendars
- Your events today
- Partner's events today
- Conflicts or overlaps flagged

### System Health
- CPU / RAM / Storage across all machines
- Services: UP/DOWN status
- Recent deployments (ArgoCD)
- Any alerts in last 24h

### Task Board
- Cards completed yesterday
- Cards in progress
- Blocked items needing attention

### Highlights
- Notable items from nightly brainstorm
- Emails requiring action
- Upcoming deadlines this week
```

## Key Insights

- **"I can't believe I have a self-healing server now"**: The agent can run SSH, Terraform, Ansible, and kubectl commands to fix infrastructure issues before you even know there's a problem
- **AI will hardcode secrets**: This is the #1 security risk. The agent will happily put an API key inline in code if you don't enforce guardrails. Pre-push hooks and secret scanning are mandatory
- **Local-first Git is essential**: Never let the agent push directly to public repositories. Use a private Gitea instance as a staging area with CI scanning
- **Cron jobs are the real product**: The scheduled automation (health checks, email triage, briefings) provides more daily value than ad-hoc commands
- **Knowledge extraction compounds**: Processing notes, conversation exports, and emails into a structured knowledge base gets more valuable over time — one user extracted 49,079 atomic facts from their ChatGPT history alone

## Inspired By

This use case is based on Nathan's detailed writeup ["Everything I've Done with OpenClaw (So Far)"](https://madebynathan.com/2026/02/03/everything-ive-done-with-openclaw-so-far/), where he describes his OpenClaw agent "Reef" running on a home server with SSH access to all machines, a Kubernetes cluster, 1Password integration, and an Obsidian vault with 5,000+ notes. Reef runs 15 active cron jobs, 24 custom scripts, and has autonomously built and deployed applications including a task management UI. Nathan's hard-won lesson after a Day 1 API key exposure: "AI assistants will happily hardcode secrets. They sometimes don't have the same instincts humans do." His defense-in-depth security setup (TruffleHog pre-push hooks, local Gitea, CI scanning, daily audits) is essential reading for anyone attempting this pattern.

Also referenced on the [OpenClaw Showcase](https://openclaw.ai/showcase), where `@georgedagg_` described a similar pattern: deployment monitoring, log review, configuration fixes, and PR submissions — all while walking the dog.

## Related Links

- [Nathan's Full Writeup](https://madebynathan.com/2026/02/03/everything-ive-done-with-openclaw-so-far/)
- [OpenClaw Documentation](https://github.com/openclaw/openclaw)
- [TruffleHog (Secret Scanning)](https://github.com/trufflesecurity/trufflehog)
- [K3s (Lightweight Kubernetes)](https://k3s.io/)
- [Gitea (Self-hosted Git)](https://gitea.io/)
- [n8n (Workflow Automation)](https://n8n.io/)
