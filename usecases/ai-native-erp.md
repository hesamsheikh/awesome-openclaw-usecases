# AI-Native ERP with erpclaw

Running a business means juggling accounting, payroll, inventory, sales, purchasing, and HR — usually across multiple disconnected apps. Traditional ERP software (SAP, QuickBooks, Odoo) demands expensive per-seat licenses, weeks of implementation, dedicated IT staff, and constant upgrades. Small and mid-size businesses end up trapped in costly subscriptions and still can't get their own data without hiring a consultant.

## Pain Point

ERP software is priced and built for enterprises, but SMBs need it just as much. Typical pain points:

- Per-seat licensing that scales against you as you grow
- Multi-week implementation projects before you can do anything useful
- Separate tools for accounting, inventory, HR, and CRM that never talk to each other
- Data locked inside SaaS platforms you don't control
- Staff needs training before they can use it — then forgets how

## What It Does

- **One command installs everything.** `clawhub install erpclaw` sets up the full ERP: accounting, inventory, HR, payroll, CRM, purchasing, sales, and 789 tables of structured business data — all accessible via natural language conversation.
- **Industry auto-detection.** Say "I run a school" and erpclaw automatically pulls and installs educlaw (student records, grades, tuition billing). Say "I run a clinic" and healthclaw installs (patient records, billing, HIPAA tracking). No extra commands, no module hunting.
- **Conversational accounting.** Ask "show me overdue invoices", "post this journal entry", or "what is my gross margin this quarter" — erpclaw queries the GL and responds with structured data.
- **Stripe integration.** 67 actions for payment sync, auto-reconciliation against the general ledger, refund and dispute handling, and ASC 606 revenue recognition — all from chat.
- **Shopify integration.** 58 actions for e-commerce sync: orders, inventory, customers, and fulfillment reconciled against your books automatically.
- **Payroll from conversation.** Attach a CSV of hours worked and say "run payroll for April" — erpclaw calculates gross pay, deductions, and posts the journal entries.
- **Runs locally.** Single shared SQLite database, no cloud subscription, no per-seat fees. You own your data.

## How to Set It Up

**Step 1: Install erpclaw (one command, installs everything)**

```
clawhub install erpclaw
```

**Step 2: Set up your company**

```
Set up my company. Name: Sunrise Bakery, industry: food & beverage, fiscal year starts January
```

erpclaw auto-detects the industry, pulls the food & beverage vertical from GitHub, and creates the relevant tables.

**Step 3: Connect Stripe**

```
I process payments through Stripe. Here is my API key: rk_live_...
```

**Step 4: Sync and reconcile payments**

```
Sync my Stripe transactions from the last 90 days and reconcile against the general ledger
```

**Step 5: Start using it conversationally**

```
Show me all open invoices over 30 days past due
```

```
Run payroll for April. Here are the hours worked: [attach CSV]
```

```
What were my top 10 customers by revenue last quarter?
```

```
What is my current cash position across all accounts?
```

## Skills Needed

Just erpclaw from ClawHub:

```
clawhub install erpclaw
```

That is it. erpclaw handles everything else automatically — industry verticals, integrations, and additional modules all pull from GitHub on first mention. The user never needs to run another install command.

## Key Insights

- **Natural language as the UI** means zero training required — staff interact with it like a chat app, not a database form
- **Industry modules pull automatically from GitHub** on first mention — the user never knows modules exist, they just describe their business
- **Local SQLite means zero cloud subscription cost** and full data ownership — your books stay on your machine
- **One install command replaces weeks of ERP implementation** — the 191 core tables and 43 additional modules are all wired together from day one

## Related Links

- [erpclaw GitHub](https://github.com/avansaber/erpclaw)
- [erpclaw-addons](https://github.com/avansaber/erpclaw-addons) (Stripe, Shopify, and more)
- [erpclaw on ClawHub](https://www.clawhub.ai/avansaber/erpclaw)
