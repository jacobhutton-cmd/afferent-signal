'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../../lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { first_name: firstName, zip_code: zipCode } },
      })
      if (error) { setError(error.message); setLoading(false); return }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) { setError(error.message); setLoading(false); return }
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-slate-50">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-2xl">&#128200;</span>
            <h1 className="text-2xl font-bold" style={{background: 'linear-gradient(to right, #2563EB, #16A34A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
              Afferent Signal
            </h1>
          </div>
          <p className="text-slate-500 text-sm">Consumer Intent Data Platform</p>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            {isSignUp && (
              <>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Zip Code"
                  value={zipCode}
                  onChange={e => setZipCode(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </>
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Loading...' : isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="w-full text-center text-sm text-slate-500 mt-4 hover:text-blue-600 transition-colors"
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  )
}
