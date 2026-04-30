# Afferent Signal

Next.js 15 + Supabase SSR frontend for Afferent Signal.

## Setup

1. Clone this repo
2. Run `npm install`
3. Copy `.env.example` to `.env.local` and fill in your Supabase credentials
4. Apply the SQL migration in `supabase-rls-and-functions.sql` to your Supabase project
5. Run `npm run dev`

## Deploy

Connect this repo to Vercel and add the two env vars from `.env.example`.
