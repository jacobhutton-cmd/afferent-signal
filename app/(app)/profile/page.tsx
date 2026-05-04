'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AppShell from '@/components/layout/AppShell'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@/types/database'
import Link from 'next/link'

const AGE_RANGES = ['18-24', '25-34', '35-44', '45-54', '55-64', '65+']
const INCOME_RANGES = ['Under $25,000', '$25,000-$49,999', '$50,000-$74,999', '$75,000-$99,999', '$100,000+']
const HOUSEHOLD_SIZES = ['1', '2', '3', '4-5 people', '6+ people']
const SHOP_FREQ = ['Daily', 'A few times a week', 'Once a week', 'A few times a month', 'Once a month']

export default function ProfilePage() {
  const router = useRouter()
  const supabase = createClient()
  const [profile, setProfile] = useState<Partial<User>>({})
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { router.push('/login'); return }
      supabase.from('users').select('*').eq('id', user.id).single()
        .then(({ data }) => { if (data) setProfile(data) })
    })
  }, [])

  async function handlePasswordUpdate(e: React.FormEvent) {
    e.preventDefault()
    if (newPassword !== confirmPassword) { setMessage('Passwords do not match'); return }
    setSaving(true)
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    setMessage(error ? error.message : 'Password updated successfully!')
    setSaving(false)
  }

  async function handleDemographicsUpdate(field: string, value: string) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    setProfile(prev => ({ ...prev, [field]: value }))
    await supabase.from('users').update({ [field]: value }).eq('id', user.id)
  }

  return (
    <AppShell>
      <div className="pt-4">
        <Link href="/dashboard" className="text-sm text-brand-blue mb-4 inline-flex items-center gap-1">
          &larr; Back to Dashboard
        </Link>

        <h1 className="text-xl font-bold text-slate-800 mb-6">Profile Settings</h1>

        <div className="card mb-4">
          <h2 className="font-semibold text-slate-700 mb-3">Password Management</h2>
          <form onSubmit={handlePasswordUpdate} className="space-y-3">
            <input type="password" placeholder="Current Password" value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" />
            <input type="password" placeholder="New Password" value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" />
            <input type="password" placeholder="Confirm New Password" value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" />
            {message && <p className="text-sm text-slate-600">{message}</p>}
            <button type="submit" className="w-full bg-orange-500 text-white font-semibold py-3 rounded-xl hover:bg-orange-600 transition-colors" disabled={saving}>
              {saving ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>

        <div className="card mb-4">
          <h2 className="font-semibold text-slate-700 mb-3">Demographics</h2>
          <div className="space-y-3">
            {[{ field: 'age_range', label: 'Age Range', options: AGE_RANGES },
              { field: 'household_income', label: 'Household Income', options: INCOME_RANGES },
              { field: 'household_size', label: 'Household Size', options: HOUSEHOLD_SIZES }
            ].map(({ field, label, options }) => (
              <div key={field}>
                <label className="text-xs text-slate-500 mb-1 block">{label}</label>
                <select
                  value={(profile as Record<string, string>)[field] ?? ''}
                  onChange={e => handleDemographicsUpdate(field, e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white"
                >
                  <option value="">Select {label}</option>
                  {options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="font-semibold text-slate-700 mb-3">Shopping Preferences</h2>
          <div>
            <label className="text-xs text-slate-500 mb-1 block">Shopping Frequency</label>
            <select
              value={profile.shopping_frequency ?? ''}
              onChange={e => handleDemographicsUpdate('shopping_frequency', e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white"
            >
              <option value="">Select Frequency</option>
              {SHOP_FREQ.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
