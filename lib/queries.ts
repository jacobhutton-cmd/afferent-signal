import { createClient } from '@/lib/supabase/server';

export async function getCampaigns() {
  const supabase = await createClient();
  return supabase.from('campaigns').select('id,target_store,location,target_goal,current_progress,status').order('created_at', { ascending: false });
}

export async function getMyRequests() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { data: [], error: null };
  return supabase.from('product_requests').select('id,location_zip,status,created_at,products(name,brand,upc)').eq('user_id', user.id).order('created_at', { ascending: false });
}

export async function getMyTransactions() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { data: [], error: null };
  return supabase.from('transactions').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
}
