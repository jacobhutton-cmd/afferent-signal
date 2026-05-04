# 📈 Afferent Signal

> Consumer Intent Data — Shape what your local stores carry.

Afferent Signal is a mobile-first web platform that aggregates local consumer demand for unstocked products to influence independent retailers and regional chains. It is a strictly "Switzerland" neutral platform — it never sells products directly, but packages anonymized consumer intent data for retailers.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15 (App Router), React 19, Tailwind CSS 3 |
| Backend | Supabase (PostgreSQL, Auth, RLS, Edge Functions) |
| AI | Gemini AI (multi-agent Hub-and-Spoke) |
| Hosting | Vercel |

## Getting Started

```bash
npm install
cp .env.example .env.local
# Fill in your GEMINI_API_KEY in .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
  (auth)/login/       → Login & signup
  (app)/dashboard/    → Home screen
  (app)/submit/       → Submit Product (Concierge AI)
  (app)/community/    → Community Campaigns
  (app)/history/      → Your Requests
  (app)/premium/      → Premium Membership
  (app)/profile/      → Profile & Settings
components/
  layout/             → Header, AppShell
  ui/                 → MetricCard, StatusPill, FAB
  campaigns/          → CampaignCard
lib/supabase/         → Client & Server Supabase instances
types/                → TypeScript interfaces
supabase/migrations/  → SQL schema history
```

## Database Schema

6 tables: `users`, `products`, `product_requests`, `campaigns`, `campaign_supporters`, `transactions`

All tables have RLS enabled. See `supabase/migrations/` for full schema.

## Supabase Project

- **Project:** afferent-signal
- **URL:** https://zvuxbdjhmhukmfikrkye.supabase.co
- **Region:** us-east-1
- **Dashboard:** https://supabase.com/dashboard/project/zvuxbdjhmhukmfikrkye

## Vercel Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/jacobhutton-cmd/afferent-signal)

Set these environment variables in Vercel:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `GEMINI_API_KEY`
