'use client'

import AppShell from '@/components/layout/AppShell'

export default function SubmitPage() {
  return (
    <AppShell>
      <div className="pt-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-1">Submit a Product</h1>
        <p className="text-slate-500 text-sm mb-8">
          Help your community by submitting products you’d like to see in local stores.
        </p>

        <div className="card text-center py-10 mb-6">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-slate-600 text-sm leading-relaxed px-4">
            Search for products using our AI assistant and share where you’d like to find them.
          </p>
        </div>

        <button className="btn-primary mb-8">
          Start Product Request
        </button>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { label: 'Policy', bg: 'bg-blue-50 text-blue-700' },
            { label: 'Support', bg: 'bg-green-50 text-green-700' },
            { label: 'Terms', bg: 'bg-purple-50 text-purple-700' },
            { label: 'Contact', bg: 'bg-orange-50 text-orange-700' },
          ].map(({ label, bg }) => (
            <button key={label} className={`${bg} font-medium py-3 rounded-xl text-sm`}>
              {label}
            </button>
          ))}
        </div>

        <p className="text-center text-xs text-slate-400">© 2026 Afferent Signal. All rights reserved.</p>
      </div>
    </AppShell>
  )
}
