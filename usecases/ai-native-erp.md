# AI-Native ERP with erpclaw

Running a business means juggling accounting, payroll, inventory, sales, purchasing, and HR, usually across multiple disconnected apps. Traditional ERP software (SAP, QuickBooks, Odoo) demands expensive per-seat licenses, weeks of implementation, dedicated IT staff, and constant upgrades. Small and mid-size businesses end up trapped in costly subscriptions and still can't get their own data without hiring a consultant.

## Pain Point

ERP software is priced and built for enterprises, but SMBs need it just as much. Typical pain points:

- Per-seat licensing that scales against you as you grow
- Multi-week implementation projects before you can do anything useful
- Separate tools for accounting, inventory, HR, and CRM that never talk to each other
- Data locked inside SaaS platforms you don't control
- Staff needs training before they can use it, then forgets how

## What It Does

- **One command installs everything.** `clawhub install erpclaw` sets up the full ERP: accounting, inventory, HR, payroll, CRM, purchasing, and sales, all accessible through natural language conversation.
- **Industry auto-detection.** Say "I run a school" and erpclaw automatically pulls and installs educlaw (student records, grades, tuition billing). Say "I run a clinic" and healthclaw installs (patient records, billing, HIPAA tracking). No extra commands, no module hunting.
- **Conversational accounting.** Ask "show me overdue invoices", "post this journal entry", or "what is my gross margin this quarter" and erpclaw queries your books and responds with structured data.
- **Stripe integration.** Payment sync, automatic reconciliation against your books, refund and dispute handling, and ASC 606 revenue recognition, all from chat.
- **Shopify integration.** E-commerce sync: orders, inventory, customers, and fulfillment reconciled against your books automatically.
- **Payroll from conversation.** Attach a CSV of hours worked and say "run payroll for April", and erpclaw calculates gross pay, deductions, and posts the journal entries.
- **Runs locally.** Single shared local database (SQLite by default, PostgreSQL supported), no cloud subscription, no per-seat fees. You own your data.

## How to Set It Up

**Step 1: Install erpclaw (one command, installs everything)**

```text
clawhub install erpclaw
```

**Step 2: Set up your company**

```text
Set up my company. Name: Sunrise Bakery, industry: food & beverage, fiscal year starts January
```

erpclaw auto-detects the industry, pulls the food & beverage vertical from GitHub, and creates the relevant tables.

**Step 3: Connect Stripe**

```text
I process payments through Stripe. Here is my API key: <YOUR_STRIPE_RESTRICTED_KEY>
```

> `<YOUR_STRIPE_RESTRICTED_KEY>` is a placeholder, not a key. Use a Stripe restricted key scoped to only what erpclaw needs (never your full secret key), and rotate any key that is ever exposed.

**Step 4: Sync and reconcile payments**

```text
Sync my Stripe transactions from the last 90 days and reconcile against the general ledger
```

**Step 5: Start using it conversationally**

```text
Show me all open invoices over 30 days past due
```

```text
Run payroll for April. Here are the hours worked: [attach CSV]
```

```text
What were my top 10 customers by revenue last quarter?
```

```text
What is my current cash position across all accounts?
```

## Skills Needed

Just erpclaw from ClawHub:

```text
clawhub install erpclaw
```

That is it. erpclaw handles everything else automatically. Industry verticals, integrations, and additional modules all pull from GitHub on first mention, and the user never needs to run another install command.

## Key Insights

- **Natural language as the UI** means zero training required; staff interact with it like a chat app, not a database form
- **Industry modules pull automatically from GitHub** on first mention; the user never knows modules exist, they just describe their business
- **Local-first storage means zero cloud subscription cost** and full data ownership; your books stay on your machine
- **One install command replaces weeks of ERP implementation**; the core system and every industry vertical are wired together from day one

## Related Links

- [erpclaw GitHub](https://github.com/avansaber/erpclaw)
- [erpclaw-addons](https://github.com/avansaber/erpclaw-addons) (Stripe, Shopify, and more)
- [erpclaw on ClawHub](https://www.clawhub.ai/avansaber/erpclaw)
