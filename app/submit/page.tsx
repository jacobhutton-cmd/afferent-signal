import { SectionShell } from '@/components/section-shell';
import { createProductRequestAction } from '@/lib/actions/product-requests';

export default function SubmitPage() {
  return (
    <SectionShell>
      <form action={createProductRequestAction} className="space-y-4 rounded-3xl bg-white p-5 shadow-soft dark:bg-slate-900">
        <h1 className="text-xl font-bold">Submit Product</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">Help your community by submitting products you'd like to see in local stores.</p>
        <input name="productName" placeholder="Product name" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800" />
        <input name="brand" placeholder="Brand" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800" />
        <input name="upc" placeholder="UPC" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800" />
        <input name="locationZip" placeholder="ZIP code" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800" />
        <textarea name="context" placeholder="Search context or notes" className="min-h-28 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800" />
        <button className="w-full rounded-2xl bg-gradient-to-r from-brand-blue to-brand-green px-4 py-3 text-sm font-semibold text-white shadow-soft">Start Product Request</button>
      </form>
    </SectionShell>
  );
}
