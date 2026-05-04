# Afferent Signal

Consumer intent data capture at the retail shelf.

## Tech Stack
- React + Vite frontend
- Supabase (Postgres, Auth, Edge Functions)
- Gemini Multimodal Live API (voice intent)
- UPCitemdb API (manual product lookup)

## Setup

### 1. Clone & install
```bash
git clone https://github.com/jacobhutton-cmd/afferent-signal.git
cd afferent-signal
npm install
```

### 2. Environment variables
Copy `.env.example` to `.env` and fill in your keys:
```bash
cp .env.example .env
```

### 3. Supabase schema
Run the SQL in `supabase/schema.sql` in your Supabase SQL editor.

### 4. Deploy Edge Function
```bash
npx supabase functions deploy process-voice-intent
```

### 5. Run locally
```bash
npm run dev
```

## QR Code Flow
Each cooler/shelf QR code encodes a URL like:
```
https://your-domain.com/?placement_id=<uuid>
```
The app automatically reads `placement_id` from the URL query string.
