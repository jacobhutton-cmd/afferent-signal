'use server';

import { revalidatePath } from 'next/cache';
import { requireUser } from '@/lib/auth';

export async function createProductRequestAction(formData: FormData) {
  const { supabase } = await requireUser();
  const productName = String(formData.get('productName') ?? '').trim();
  const brand = String(formData.get('brand') ?? '').trim();
  const upc = String(formData.get('upc') ?? '').trim();
  const locationZip = String(formData.get('locationZip') ?? '').trim();
  const context = String(formData.get('context') ?? '').trim();
  if (!productName || !locationZip) return { error: 'Product name and location ZIP are required.' };
  const { data, error } = await supabase.rpc('submit_product_request', { p_product_name: productName, p_brand: brand || null, p_upc: upc || null, p_location_zip: locationZip, p_context: context || null });
  if (error) return { error: error.message };
  revalidatePath('/submit');
  revalidatePath('/history');
  return { success: true, requestId: data, message: 'Product request submitted successfully.' };
}
