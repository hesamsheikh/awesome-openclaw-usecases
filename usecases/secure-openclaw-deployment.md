# Secure-by-Default OpenClaw Deployment on Ubuntu

Running your OpenClaw agent swarm locally gives you full control and privacy — but it also means giving powerful AI agents shell, network, and tool access. Without proper hardening, even a single compromised skill or prompt injection can leak data or make unwanted outbound calls.

**OpenClaw Secure Kit** turns any Ubuntu machine into a **secure-by-default** OpenClaw deployment with verifiable egress guardrails, zero-trust networking, and a one-command security audit.

## Pain Point

- Open outbound internet = data exfiltration risk
- Docker containers running as root + exposed ports
- No reproducible or auditable security posture
- Hard to prove to yourself (or stakeholders) that the agent can’t phone home unexpectedly
- Manual firewall/nftables rules break every time you update

## What It Does

- **Profile-driven hardening** — generates a full deployment folder (`out/<profile>/`) with locked-down `docker-compose.yml`, `.env`, and nftables rules
- **DNS allowlisting + host firewall** — only whitelisted domains can be resolved; everything else is dropped
- **Loopback-first gateway** — OpenClaw gateway binds to `127.0.0.1` by default (no public exposure)
- **Non-root runtime** — all containers run as user `1000:1000`
- **Externalized secrets** — never baked into compose files
- **Pinned images + reproducible builds**
- **One-command verifier** — `ocs doctor` produces a human-readable `security-report.md` (PASS/WARN/FAIL) + strict IP-egress mode
- **Multiple profiles** — `research-only`, `work`, `strict`, or your own custom allowlist

## Skills You Need

- Ubuntu 22.04 or 24.04 with Docker + Docker Compose
- Basic familiarity with `docker compose up`
- (Optional) understanding of nftables / systemd services

## How to Set It Up

```bash
# 1. Install the kit (one-liner)
curl -fsSL https://raw.githubusercontent.com/NinoSkopac/openclaw-secure-kit/main/install.sh | bash

# 2. Create a hardened profile
ocs install --profile research-only

# 3. Start the secure stack
cd out/research-only
docker compose --env-file .env up -d

# 4. Verify everything is locked down
sudo ocs doctor --profile research-only --strict-ip-egress
cat out/research-only/security-report.md
```

Example output snippet:
```
SECURITY: PASS: 11 WARN: 0 FAIL: 0
DOCTOR: PASS: 10 WARN: 0 FAIL: 0
✅ Egress DNS allowlist enforced
✅ Gateway bound to 127.0.0.1 only
✅ All containers non-root
✅ Secrets externalized
```

You can now safely run any other OpenClaw use case (self-healing server, multi-agent team, personal CRM, etc.) on top of this hardened base layer.
# Key Insights
The kit makes security observable and reproducible - every stakeholder can read the security-report.md and trust the deployment.
DNS-level + firewall-level guardrails catch 99 % of accidental leaks; the strict IP-egress check catches the rest.
Zero manual hardening steps after the first ocs install.
Perfect foundation for production self-hosted OpenClaw (home lab, VPS, or company air-gapped server).

# Inspired By
The author’s own journey securing OpenClaw after seeing prompt-injection risks in the wild.
Community discussions on OpenClaw security and the need for “secure-by-default” self-hosting patterns.
