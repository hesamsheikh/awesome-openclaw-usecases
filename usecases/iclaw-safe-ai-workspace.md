# iClaw: Safe AI Workspace for OpenClaw Sessions

**Author:** iClaw Team
**Tags:** security, sandbox, workspace, safe-execution

## Overview
iClaw is a local-first AI workspace that wraps OpenClaw sessions in a sandboxed environment. Every file dropped into iClaw runs in an isolated container — malware, credential theft, and exfiltration attempts are detected before they reach your machine.

## Use Case
Traditional OpenClaw agents have direct access to your file system and tools. When you download a sketchy file (a zip, a script, a repo) and drop it into an agent, it could exfiltrate SSH keys, cloud tokens, or send data to malicious servers.

iClaw acts as a safety layer: you drop a file, iClaw runs it in a container, analyzes behavior (SSH key access, token scraping, network calls), and reports everything. The container is then deleted. Your machine is untouched.

## Real-World Example
A file dropped into iClaw attempted to:
- Steal SSH private keys
- Scrape AWS, GitHub, and OpenAI tokens from environment variables
- Send 67 requests to a server in North Korea

iClaw detected all of this in the sandbox, showed the full report, and deleted the container. The user's system remained completely safe.

## How It Works
1. Drop a file into iClaw
2. iClaw spins up an isolated container
3. The file executes inside the sandbox
4. iClaw monitors for malicious behavior (credential theft, C2 calls, exfiltration)
5. A full report is shown to the user
6. Container destroyed — nothing touched the host

## Why This Matters for OpenClaw Users
- **ClawJacked:** Websites can hijack your agent and issue commands
- **ClawHavoc:** 1,184 malware skills found in ClawHub
- **Clinejection:** npm packages can inject malicious skills into your agent
- **~15% of ClawHub skills** contain malicious instructions

iClaw doesn't replace OpenClaw — it wraps it in a safety layer so you can use agents without the fear of file-based attacks.

## Links
- GitHub: https://github.com/iclawapp/iclaw
- npm: `npm i @iclawapp/iclaw`
- License: MIT
