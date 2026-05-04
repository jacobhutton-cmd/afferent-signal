-- Afferent Signal — Initial Schema
-- Applied via Supabase MCP on 2026-05-04
-- See: https://supabase.com/dashboard/project/zvuxbdjhmhukmfikrkye

-- This file is for version control reference.
-- The migration has already been applied to the live database.
-- To re-apply on a new project, run this file in the Supabase SQL Editor.

create type public.request_status as enum ('pending', 'under_review', 'approved', 'rejected');
create type public.campaign_status as enum ('active', 'fulfilled', 'closed');
create type public.transaction_type as enum ('premium_donation', 'data_brokerage_payout', 'refund');
-- See full migration in Supabase dashboard migrations tab.
