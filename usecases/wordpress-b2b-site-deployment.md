# WordPress B2B Trade Site Deployment

International trade companies (manufacturers, exporters, trading companies) need professional websites to reach overseas buyers. But most lack technical staff — they rely on expensive agencies or struggle with manual WordPress setup across servers, SSL, CDN, multilingual content, and SEO. A typical site takes days or weeks of back-and-forth.

This use case turns OpenClaw into a deployment agent that interactively collects business requirements, provisions a server, and deploys a fully configured WordPress site in under 40 minutes — complete with Docker orchestration, triple-layer caching, multilingual support, and security hardening.

## Pain Point

- Non-technical business owners can't deploy WordPress properly (SSL, reverse proxy, caching, security)
- Hiring a web agency costs $2,000–10,000 and takes weeks
- Generic WordPress templates miss B2B trade essentials: multilingual pages, WhatsApp integration, product catalogs without WooCommerce overhead
- Manual server setup is error-prone — missed firewall rules, no swap on low-RAM VPS, forgotten SSL renewal, unoptimized cache layers
- Performance matters for SEO: a slow site means lost buyers from Google search

## What It Does

- **Interactive requirements gathering**: Collects company name, products, target markets, languages, and contact info before touching any server
- **Server provisioning**: SSH into a fresh VPS, configure firewall/swap/timezone, install Docker
- **Template deployment**: Clones a battle-tested Docker Compose stack (WordPress 6.7 + MySQL 8 + Nginx Alpine) and generates env config from user inputs
- **SSL automation**: Let's Encrypt with auto-renewal cron, or Cloudflare Origin certificate — user picks
- **Plugin stack installation**: Bulk installs 9 curated plugins via WP-CLI (Astra, Elementor, Rank Math, WP Super Cache, Imagify, Polylang, Jetpack Boost, Contact Form 7, Chaty)
- **Multilingual setup**: Configures Polylang languages based on the target markets identified in step 1
- **SEO configuration**: Rank Math setup with company schema, XML sitemap, Open Graph
- **Triple-layer cache**: WP Super Cache (application) + Nginx proxy cache (server) + Cloudflare CDN (edge) — verified with curl headers
- **Security hardening**: File permissions, xmlrpc.php blocking, automated database backups, UptimeRobot monitoring
- **Final verification**: Runs a 10-point checklist and outputs a summary report with all access URLs

## Skills You Need

- SSH access to a Linux server (Ubuntu 22.04+ recommended)
- A domain name with DNS management access
- (Optional) Cloudflare account for CDN
- (Optional) Imagify API key for image optimization

No OpenClaw skills from ClawHub are required — the agent follows the SKILL.md instructions to execute shell commands over SSH directly.

## How to Set It Up

### 1. Install the Skill

```bash
clawhub install wordpress-trade-site
```

Or clone the template repo directly:

```bash
git clone https://github.com/iPythoning/wordpress-trade-starter.git
```

### 2. Start the Conversation

Tell your OpenClaw agent:

> "Help me deploy a WordPress site for my trade company"

The agent will begin Phase 1 (business info collection) and walk through all 9 phases interactively.

### 3. What You'll Need Ready

- Server IP and SSH credentials (or budget to buy a VPS — the agent recommends providers based on your target market)
- Your domain name
- Business details: company name, products, target markets, contact info
- ~40 minutes of your time for the interactive setup

### 4. Architecture

The deployed stack looks like this:

```
Cloudflare (CDN + WAF)
    ↓
Nginx (Reverse Proxy + Gzip + Proxy Cache)
    ↓
WordPress 6.7 (Apache + WP Super Cache + Plugins)
    ↓
MySQL 8 (Persistent Volume)
```

All running in Docker containers with automatic restart and health checks.

## Key Insights

- **Business context first, tech later**: Collecting company info, target markets, and languages BEFORE server setup means every technical decision (datacenter location, language packs, SEO schema) is informed by actual business needs. This is what agencies do — and what most "one-click deploy" scripts skip.
- **Triple-layer cache is the real performance win**: Most WordPress optimization guides focus on plugin caching alone. Stacking WP Super Cache + Nginx proxy cache + Cloudflare CDN dropped TTFB from 1.8s to 0.3s on a $10/month VPS. The agent configures and verifies all three layers.
- **WP-CLI makes agents powerful**: Without WP-CLI, WordPress configuration requires browser interaction. With it, the agent can install plugins, create pages, build menus, and configure settings — all via SSH commands. This is what makes the fully automated flow possible.
- **xmlrpc.php is a real threat**: Trade site owners won't think about WordPress security. The agent blocks xmlrpc.php, locks file permissions, and sets up automated backups by default — security shouldn't be opt-in.

## Inspired By

Built from real deployment experience at [TitanPuls.com](https://titanpuls.com), a semi-trailer manufacturer serving 50+ countries. The template and 11-part documentation were extracted from a production site and packaged into [wordpress-trade-starter](https://github.com/iPythoning/wordpress-trade-starter) — then wrapped as an interactive OpenClaw skill.

## Related Links

- [wordpress-trade-starter (GitHub)](https://github.com/iPythoning/wordpress-trade-starter) — Docker template + 11-part documentation
- [wordpress-trade-site (ClawHub)](https://clawhub.ai/ipythoning/wordpress-trade-site) — OpenClaw skill for interactive deployment
- [WordPress WP-CLI Documentation](https://developer.wordpress.org/cli/commands/)
- [Cloudflare Free Plan](https://www.cloudflare.com/plans/free/) — CDN + WAF at zero cost
