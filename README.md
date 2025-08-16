# Quick Stack (Drizzle Edition)

Monorepo with **Next.js (App Router)**, **Drizzle ORM (Postgres)**, **Stripe billing**, and shared modules.

## Quick start
```bash
pnpm i
pnpm dev          # start the app(s) (configure in apps/quick-legal-biz)
```
Set envs from `.env.example` locally, and mirror them in Vercel project settings.

### Deploy flow (Vercel)
- Each directory in `apps/*` can be a separate Vercel project.
- In Vercel, set the root directory to the app (e.g., `apps/quick-legal-biz`).
- Add env vars, deploy, then hit `/api/health`.

### Drizzle
- Edit schema in `packages/data/src/schema.ts`.
- Configure DB via `DATABASE_URL` (Neon/PG recommended).
- Migrations:
```bash
cd packages/data
pnpm drizzle:generate
pnpm drizzle:migrate
```

### Stripe
- Webhook path: `/api/webhook`
- Add events: `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`
- Paste `STRIPE_WEBHOOK_SECRET` in Vercel envs.

---

This stack is modular: apps import `@repo/*` packages. Upgrade modules once, reap benefits across apps.

## Added now
- **Generators**: `pnpm gen` → `page` or `module` (API route + repo)
- **Email (Resend)**: `@repo/email` with welcome/receipt templates
- **Products & Prices**: Drizzle tables + Stripe sync
- **Stripe Sync**: `pnpm sync:stripe` pulls Stripe catalog into DB
- **Products Page**: `/products` lists items and lets you buy via Checkout
- **Checkout API**: `/api/checkout` → creates a Stripe Checkout session

### Quick usage
1. Set envs (`DATABASE_URL`, Stripe keys, `NEXT_PUBLIC_APP_URL`, optional `RESEND_API_KEY`)
2. Migrate + seed:
   ```bash
   cd packages/data
   pnpm drizzle:generate && pnpm drizzle:migrate && pnpm seed
   ```
3. Sync Stripe catalog:
   ```bash
   pnpm sync:stripe
   ```
4. Run app:
   ```bash
   pnpm dev
   ```
5. Visit `http://localhost:3000/products`

### Deploy
- Point Vercel project root at `apps/quick-legal-biz`
- Paste envs in Vercel (Production + Preview)
- After deploy, run `pnpm sync:stripe` locally or add a CI step/cron job to keep catalog fresh.


### Admin & Billing Portal
- **Admin panel** at `/admin/products` (requires header `x-admin-token: $ADMIN_TOKEN` for create actions).
- Set `ADMIN_TOKEN` in env (both local and Vercel).
- **Customer Portal** at `/account` opens Stripe Billing Portal. In production you should attach a real `customer` ID tied to the logged-in user.

#### Using Admin panel (locally)
- Create product/price forms post to `/api/admin/*`; add header in a REST client or use a browser extension to set `x-admin-token`.
- In production, sit this behind real auth (NextAuth/Clerk) and check roles server-side.
