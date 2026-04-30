import { SectionShell } from '@/components/section-shell';
import { updateDemographicsAction, updatePasswordAction } from '@/lib/actions/profile';

export default function SettingsPage() {
  return (
    <SectionShell>
      <div className="space-y-4">
        <h1 className="text-xl font-bold">Profile Settings</h1>
        <form action={updatePasswordAction} className="space-y-3 rounded-3xl bg-white p-5 shadow-soft dark:bg-slate-900">
          <h2 className="font-semibold">Change Password</h2>
          <input name="newPassword" type="password" placeholder="New Password" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800" />
          <input name="confirmPassword" type="password" placeholder="Confirm New Password" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800" />
          <button className="w-full rounded-2xl bg-brand-blue px-4 py-3 text-sm font-semibold text-white">Update Password</button>
        </form>
        <form action={updateDemographicsAction} className="space-y-3 rounded-3xl bg-white p-5 shadow-soft dark:bg-slate-900">
          <h2 className="font-semibold">Demographics</h2>
          <select name="ageRange" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800"><option>25-34</option><option>35-44</option></select>
          <select name="householdIncome" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800"><option>$100,000+</option><option>$75,000-$99,999</option></select>
          <select name="householdSize" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800"><option>4-5 people</option><option>1-2 people</option></select>
          <select name="shoppingFrequency" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800"><option>Once a week</option><option>Several times a week</option></select>
          <button className="w-full rounded-2xl bg-brand-blue px-4 py-3 text-sm font-semibold text-white">Save Demographics</button>
        </form>
      </div>
    </SectionShell>
  );
}
