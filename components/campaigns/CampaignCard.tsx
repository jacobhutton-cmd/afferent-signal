import Link from 'next/link'
import StatusPill from '../ui/StatusPill'

interface Product {
  name?: string
  brand?: string
}

interface Campaign {
  id: string
  target_store: string
  location_zip: string
  target_goal: number
  current_progress: number
  status: 'active' | 'fulfilled' | 'closed'
  products?: Product
}

export default function CampaignCard({ campaign }: { campaign: Campaign }) {
  const progressPct = Math.min(Math.round((campaign.current_progress / campaign.target_goal) * 100), 100)

  return (
    <Link href={`/community/${campaign.id}`}>
      <div className="card hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-slate-800 text-sm flex-1 pr-2">
            {campaign.products?.name ?? 'Unknown Product'}
          </h3>
          <StatusPill status={campaign.status} />
        </div>
        <div className="mb-3">
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>Progress to Goal</span>
            <span>{campaign.current_progress} / {campaign.target_goal}</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all" style={{width: `${progressPct}%`, background: 'linear-gradient(to right, #2563EB, #16A34A)'}} />
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-500">
          <span>&#128205;</span>
          <span>{campaign.location_zip}</span>
        </div>
      </div>
    </Link>
  )
}
