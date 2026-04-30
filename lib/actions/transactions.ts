'use server';

import { revalidatePath } from 'next/cache';
import { requireUser } from '@/lib/auth';

export async function createDonationAction(formData: FormData) {
  const { supabase } = await requireUser();
  const amount = Number(formData.get('amount') ?? 0);
  if (!amount || amount <= 0) return { error: 'A valid donation amount is required.' };
  const amountCents = Math.round(amount * 100);
  const { data, error } = await supabase.rpc('create_premium_donation', { p_amount_cents: amountCents });
  if (error) return { error: error.message };
  revalidatePath('/premium');
  revalidatePath('/history');
  return { success: true, transactionId: data, message: 'Donation recorded successfully.' };
}
