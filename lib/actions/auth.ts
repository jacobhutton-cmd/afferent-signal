'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

function normalizeEmail(value: FormDataEntryValue | null) {
  return String(value ?? '').trim().toLowerCase();
}

export async function signInAction(formData: FormData) {
  const email = normalizeEmail(formData.get('email'));
  const password = String(formData.get('password') ?? '');
  const supabase = await createClient();
  if (!email || !password) return { error: 'Email and password are required.' };
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };
  revalidatePath('/');
  redirect('/');
}

export async function signUpAction(formData: FormData) {
  const firstName = String(formData.get('firstName') ?? '').trim();
  const email = normalizeEmail(formData.get('email'));
  const password = String(formData.get('password') ?? '');
  const zipCode = String(formData.get('zipCode') ?? '').trim();
  const supabase = await createClient();
  if (!firstName || !email || !password || !zipCode) return { error: 'All fields are required.' };
  const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { first_name: firstName, zip_code: zipCode } } });
  if (error) return { error: error.message };
  const userId = data.user?.id;
  if (userId) {
    const { error: profileError } = await supabase.from('users').upsert({ id: userId, first_name: firstName, zip_code: zipCode, demographics: {}, premium_status: false, badges_count: 0 });
    if (profileError) return { error: profileError.message };
  }
  revalidatePath('/');
  redirect('/');
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
}
