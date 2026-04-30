import { SectionShell } from '@/components/section-shell';
import { createDonationAction } from '@/lib/actions/transactions';

export default function PremiumPage() {
  return (
    <SectionShell>
      <div className="space-y-4 rounded-3xl bg-white p-5 shadow-soft dark:bg-slate-900">
        <h1 className="text-xl font-bold">Premium Membership</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">Your support helps Afferent Signal grow.</p>
        <form action={createDonationAction} className="space-y-3 rounded-3xl border border-slate-200 p-4 dark:border-slate-800">
          <div className="text-lg font-semibold">$10 Annual Donation</div>
          <input type="number" name="amount" defaultValue={10} min={1} step={1} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800" />
          <button className="w-full rounded-2xl bg-brand-blue px-4 py-3 text-sm font-semibold text-white">Select</button>
        </form>
      </div>
    </SectionShell>
  );
}
