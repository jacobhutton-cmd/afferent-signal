-- =========================================
-- Afferent Signal - Supabase Schema
-- Run this in your Supabase SQL editor
-- =========================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Retailers
create table if not exists retailers (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  address text,
  city text,
  state text,
  zip text,
  created_at timestamptz default now()
);

-- 2. Placements (QR code locations)
create table if not exists placements (
  id uuid primary key default uuid_generate_v4(),
  retailer_id uuid references retailers(id) on delete cascade,
  label text not null,           -- e.g. "Cooler Door 3 - Aisle 5"
  section text,                  -- e.g. "Beverages", "Dairy"
  qr_code_url text,
  created_at timestamptz default now()
);

-- 3. Intent Logs
create table if not exists intent_logs (
  id uuid primary key default uuid_generate_v4(),
  placement_id uuid references placements(id) on delete set null,
  raw_transcript text,           -- Raw voice/text input
  processed_intent text,         -- Structured output from Gemini
  captured_at timestamptz default now()
);

-- 4. Product Matches
create table if not exists product_matches (
  id uuid primary key default uuid_generate_v4(),
  intent_log_id uuid references intent_logs(id) on delete cascade,
  upc text,
  product_name text,
  brand text,
  image_url text,
  matched_at timestamptz default now()
);

-- Row Level Security (RLS)
alter table retailers enable row level security;
alter table placements enable row level security;
alter table intent_logs enable row level security;
alter table product_matches enable row level security;

-- Allow anonymous inserts for intent_logs and product_matches
-- (consumers scan without logging in)
create policy "anon can insert intent_logs"
  on intent_logs for insert
  to anon
  with check (true);

create policy "anon can insert product_matches"
  on product_matches for insert
  to anon
  with check (true);

-- Only authenticated users (admins) can read all data
create policy "auth can read all"
  on intent_logs for select
  to authenticated
  using (true);

create policy "auth can read product_matches"
  on product_matches for select
  to authenticated
  using (true);

create policy "auth can read placements"
  on placements for select
  to authenticated
  using (true);

create policy "auth can read retailers"
  on retailers for select
  to authenticated
  using (true);
