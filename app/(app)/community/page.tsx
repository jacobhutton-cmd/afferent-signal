import { createClient } from '../../../lib/supabase/server'
import { redirect } from 'next/navigation'
import AppShell from '../../../components/layout/AppShell'
import CampaignCard from '../../../components/campaigns/CampaignCard'

export default async function CommunityPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('users').select('zip_code').eq('id', user.id).single()

  const { data: campaigns } = await supabase
    .from('campaigns')
    .select('*, products(*)')
    .eq('status', 'active')
    .eq('location_zip', profile?.zip_code ?? '')
    .order('current_progress', { ascending: false })
    .limit(20)

  return (
    <AppShell>
      <div className="pt-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-slate-800">Campaigns Near You</h1>
          <button className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full font-medium">+ View All</button>
        </div>

        {campaigns && campaigns.length > 0 ? (
          <div className="space-y-3">
            {campaigns.map((campaign: any) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        ) : (
          <div className="card text-center py-12">
            <p className="text-4xl mb-3">&#128205;</p>
            <p className="text-slate-600 font-medium">No active campaigns near you yet.</p>
            <p className="text-slate-400 text-sm mt-1">Be the first to submit a product!</p>
          </div>
        )}

        <div className="card mt-6" style={{background: '#EFF6FF', borderColor: '#DBEAFE'}}>
          <p className="text-sm leading-relaxed" style={{color: '#1E40AF'}}>
            <strong>How it works:</strong> Start a campaign for a product you want at your local store.
            When enough community members join and pledge to buy it, retailers take notice.
            Together you have a stronger voice than one person alone.
          </p>
        </div>
      </div>
    </AppShell>
  )
}
