# Private Landing Page

Most website builders and landing page tools require your email just to get started, then spam you forever. You shouldn't need to hand over personal data to put a page on the internet.

This workflow uses [Private Landing](https://github.com/vhscom/private-landing) — an edge-ready auth system for Cloudflare Workers — to scaffold and deploy a landing page with real authentication built in. Your visitors sign up with just a username and password. No email harvesting, no third-party tracking, deployed to the edge in minutes.

This is also a natural fit for AI agents, which typically don't have email addresses. An agent can create an account and authenticate with just a username and password — no email verification flow to work around.

Under the hood you get PBKDF2 password hashing, dual-token JWT sessions, and security headers out of the box — so the auth isn't just private, it's solid.

## What You Can Build With This

- A personal landing page or portfolio with a members-only section
- A gated community page where users sign up without handing over an email
- An agent-accessible service — your OpenClaw agent (or any AI agent) can register and authenticate programmatically since there's no email verification step
- A private beta page for a side project where you want to control access without wiring up a full auth provider
- A lightweight internal tool behind auth, deployed globally on the edge

## Skills you Need

- `web_fetch` (built-in)
- `computer_use` or a Cloudflare Workers deployment skill

## How to Set it Up

1. Fork or clone the [private-landing](https://github.com/vhscom/private-landing) repo.
2. Prompt OpenClaw:
```text
I want to create a landing page using the private-landing repo I just cloned. Help me:
1. Customize the page content and styling for my project
2. Configure the Cloudflare Workers deployment
3. Deploy it to my Cloudflare account

Use the repo's built-in auth system so visitors can sign up without needing an email — just a username and password. Keep it simple and don't overcomplicate it.
```

3. OpenClaw handles the rest — you get a live landing page with privacy-respecting auth, running on the edge, no data brokers involved.

## Going Further

Once the page is live, you can layer on more workflows:

- **Agent self-service:** Have OpenClaw register its own account on your site, then use it to check or update content autonomously
- **Gated content drops:** Prompt OpenClaw to update the protected page on a schedule — weekly updates, changelog entries, private blog posts
- **User monitoring:** Set up a cron job to query the Workers KV store for new sign-ups and get a daily digest in Telegram or Slack

## Why This is Nice

- Visitors don't need to fork over an email to use your site
- Auth runs entirely on Cloudflare Workers — no origin server, no Node.js
- Over 250 tests cover common attack vectors, so you're not shipping something flimsy
- Great starting point if you want to learn how auth actually works under the hood
- Agents can interact with your site as first-class users without needing a throwaway email
