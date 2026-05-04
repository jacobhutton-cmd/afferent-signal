import AppShell from '@/components/layout/AppShell'

export default function PremiumPage() {
  return (
    <AppShell>
      <div className="pt-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-1">Premium Membership</h1>
        <p className="text-slate-500 text-sm mb-6">
          Your support helps Afferent Signal grow! As we launch our app, we’re giving our
          community an opportunity to directly contribute to our mission.
        </p>

        <div className="relative mt-6 mb-4">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
            <span className="brand-gradient text-white text-xs font-bold px-3 py-1 rounded-full shadow">
              Most Popular
            </span>
          </div>
          <div className="card border-2 border-brand-blue pt-6">
            <div className="text-center mb-4">
              <p className="text-3xl font-bold text-slate-800">$10</p>
              <p className="text-slate-500 text-sm">Annual Donation</p>
            </div>
            <ul className="space-y-2 text-sm text-slate-600 mb-6">
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Support the Afferent Signal mission</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Early access to new features</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Premium badge on your profile</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Priority campaign visibility</li>
            </ul>
            <button className="btn-primary">Select &mdash; $10/year</button>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
