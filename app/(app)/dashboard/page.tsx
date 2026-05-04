import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AppShell from '@/components/layout/AppShell'
import MetricCard from '@/components/ui/MetricCard'
import FAB from '@/components/ui/FAB'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('users')
    .select('first_name, zip_code, badges_count')
    .eq('id', user.id)
    .single()

  const [{ count: areaCount }, { count: activeUsers }, { count: campaignCount }] = await Promise.all([
    supabase.from('users').select('*', { count: 'exact', head: true })
      .eq('zip_code', profile?.zip_code ?? ''),
    supabase.from('users').select('*', { count: 'exact', head: true })
      .eq('zip_code', profile?.zip_code ?? '').eq('premium_status', false),
    supabase.from('campaigns').select('*', { count: 'exact', head: true })
      .eq('status', 'active'),
  ])

  return (
    <AppShell>
      <div className="pt-4">
        <h1 className="text-xl font-bold text-slate-800">
          Welcome back, {profile?.first_name ?? 'Friend'}!
        </h1>
        <p className="text-slate-500 text-sm mt-1 mb-6">
          Discover campaigns near {profile?.zip_code ?? 'your area'}
        </p>

        <div className="space-y-3 mb-8">
          <MetricCard icon="👥" iconBg="bg-blue-50" count={areaCount ?? 0} label="People in your area" />
          <MetricCard icon="👫" iconBg="bg-purple-50" count={activeUsers ?? 0} label="Active Afferent Signal users in your area" />
          <MetricCard icon="📍" iconBg="bg-green-50" count={campaignCount ?? 0} label="Active campaigns" />
          <MetricCard
            icon="🏅"
            iconBg="bg-gradient-to-br from-blue-50 to-green-50"
            count={profile?.badges_count ?? 0}
            label="Badges earned"
            linkText="View & rank"
          />
        </div>

        <div className="flex gap-2 mb-6">
          <Link href="/submit" className="flex-1 py-2.5 text-center text-sm font-semibold rounded-xl brand-gradient text-white">
            Submit Product
          </Link>
          <Link href="/community" className="flex-1 py-2.5 text-center text-sm font-semibold rounded-xl bg-white border border-slate-200 text-slate-700">
            Community Campaigns
          </Link>
        </div>
      </div>
      <FAB />
    </AppShell>
  )
}
