'use client'

import AppShell from '../../../components/layout/AppShell'

export default function SubmitPage() {
  return (
    <AppShell>
      <div className="pt-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-1">Submit a Product</h1>
        <p className="text-slate-500 text-sm mb-8">
          Help your community by submitting products you would like to see in local stores.
        </p>

        <div className="card text-center py-10 mb-6">
          <div className="text-6xl mb-4">&#128269;</div>
          <p className="text-slate-600 text-sm leading-relaxed px-4">
            Search for products using our AI assistant and share where you would like to find them.
          </p>
        </div>

        <button className="btn-primary mb-8">Start Product Request</button>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { label: 'Policy', style: {background: '#EFF6FF', color: '#1D4ED8'} },
            { label: 'Support', style: {background: '#F0FDF4', color: '#15803D'} },
            { label: 'Terms', style: {background: '#F5F3FF', color: '#6D28D9'} },
            { label: 'Contact', style: {background: '#FFF7ED', color: '#C2410C'} },
          ].map(({ label, style }) => (
            <button key={label} style={style} className="font-medium py-3 rounded-xl text-sm">
              {label}
            </button>
          ))}
        </div>

        <p className="text-center text-xs text-slate-400">© 2026 Afferent Signal. All rights reserved.</p>
      </div>
    </AppShell>
  )
}
