# Daily Takeout Coupon Claim

You order delivery several times a week. Each platform quietly posts daily red packets and hidden coupon codes, but finding them means opening three apps, hunting through campaign pages, and copying the right 口令 (taokouling) before it expires. This workflow has OpenClaw pull every current code for you in one message, so claiming takes seconds.

## Pain Point

Food-delivery discounts in China are scattered across Meituan, Ele.me/Taobao Shangou and JD Waimai, and the useful ones are share-code based: you must copy an exact string, then open the matching app. Checking three apps daily is pure overhead, and codes expire.

## What It Does

- One command (`/coupon` or "today's takeout coupons") returns every live coupon grouped by platform
- Each result shows title, the verbatim coupon code, and the copy-then-open instruction
- Falls back to H5 claim links and QR-code images when a code cannot be copied (desktop chat, for example)
- Optional scheduled run sends the same digest every morning, so you claim before lunch
- Sibling skills cover ride-hailing/hotels, movie tickets and parcel shipping, so one habit covers all four

## Prompts

```
Give me today's takeout coupons, grouped by platform, with each code exactly as returned.
```

```
Every day at 11:00, send me the current Meituan / Ele.me / JD takeout coupons.
Skip any platform with no live coupons and say so.
```

```
I can't copy the code on my desktop — send the claim link and QR image instead.
```

## Skills Needed

- [takeout-coupon](https://clawhub.ai/moooai/takeout-coupon) — food-delivery codes, H5 links and QR images
- [trip-coupon](https://clawhub.ai/moooai/trip-coupon) — Didi ride-hailing and hotel deals
- [movie-coupon](https://clawhub.ai/moooai/movie-coupon) — movie-ticket discounts
- [parcel-coupon](https://clawhub.ai/moooai/parcel-coupon) — courier discounts
- [obtain-coupons-all-in-one](https://clawhub.ai/moooai/obtain-coupons-all-in-one) — all four categories in one skill

## How to Verify It Works

```
npx skills add moooai/takeout-coupon
```

Then ask the agent for today's takeout coupons and paste a returned code into Meituan, Ele.me or JD. Codes are platform 口令 strings: they must be copied character-for-character (`%`, `￥`, `＄`, `✔`, `！` are part of the code), which is why the skill is written to pass them through untouched.

## Related Links

- Source repos: https://github.com/moooai/takeout-coupon , https://github.com/moooai/obtain-coupons-all-in-one
- Public API used: https://agskills.moontai.top/coupon/takeout (no auth, no keys, read-only GET)
- Disclosure: the bundled fetch script sends anonymous attribution parameters (`ch`, `u`) — a channel label plus a per-install identifier — so the maintainer can tell which listing an install came from. No name, phone number or account data is collected. Redeeming a coupon happens inside the official apps; orders placed through the H5/claim pages carry affiliate attribution.
- Region note: coupons cover mainland-China platforms and usually require the corresponding app plus a Chinese phone number.
