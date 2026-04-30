'use server';

import { revalidatePath } from 'next/cache';
import { requireUser } from '@/lib/auth';

export async function updateDemographicsAction(formData: FormData) {
  const { supabase } = await requireUser();
  const ageRange = String(formData.get('ageRange') ?? '');
  const householdIncome = String(formData.get('householdIncome') ?? '');
  const householdSize = String(formData.get('householdSize') ?? '');
  const shoppingFrequency = String(formData.get('shoppingFrequency') ?? '');
  const { error } = await supabase.rpc('update_my_demographics', { p_age_range: ageRange, p_household_income: householdIncome, p_household_size: householdSize, p_shopping_frequency: shoppingFrequency });
  if (error) return { error: error.message };
  revalidatePath('/settings');
  return { success: true, message: 'Demographics saved.' };
}

export async function updatePasswordAction(formData: FormData) {
  const { supabase } = await requireUser();
  const newPassword = String(formData.get('newPassword') ?? '');
  const confirmPassword = String(formData.get('confirmPassword') ?? '');
  if (!newPassword || !confirmPassword) return { error: 'New password and confirm password are required.' };
  if (newPassword !== confirmPassword) return { error: 'New password fields do not match.' };
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) return { error: error.message };
  return { success: true, message: 'Password updated.' };
}
