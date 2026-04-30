'use server';

import { revalidatePath } from 'next/cache';
import { requireUser } from '@/lib/auth';

export async function joinCampaignAction(formData: FormData) {
  const { supabase } = await requireUser();
  const campaignId = String(formData.get('campaignId') ?? '').trim();
  const comment = String(formData.get('comment') ?? '').trim();
  if (!campaignId) return { error: 'Campaign ID is required.' };
  const { data, error } = await supabase.rpc('join_campaign', { p_campaign_id: campaignId, p_comment: comment || null });
  if (error) return { error: error.message };
  revalidatePath('/campaigns');
  return { success: true, result: data, message: 'You joined the campaign.' };
}
