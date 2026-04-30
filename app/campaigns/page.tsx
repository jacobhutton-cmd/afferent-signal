import { SectionShell } from '@/components/section-shell';
import { joinCampaignAction } from '@/lib/actions/campaigns';
import { getCampaigns } from '@/lib/queries';

export default async function CampaignsPage() {
  const { data: campaigns = [] } = await getCampaigns();
  return (
    <SectionShell>
      <div className="space-y-4">
        <h1 className="text-xl font-bold">Campaigns Near You</h1>
        {campaigns.length === 0 ? (
          <div className="rounded-3xl bg-white p-5 text-sm text-slate-600 shadow-soft dark:bg-slate-900">No campaigns yet in your area.</div>
        ) : (
          campaigns.map((campaign) => (
            <div key={campaign.id} className="space-y-3 rounded-3xl bg-white p-5 shadow-soft dark:bg-slate-900">
              <h2 className="font-semibold">{campaign.target_store}</h2>
              <p className="text-sm text-slate-600">{campaign.location}</p>
              <p className="text-sm text-slate-600">Progress: {campaign.current_progress} / {campaign.target_goal}</p>
              <form action={joinCampaignAction} className="space-y-2">
                <input type="hidden" name="campaignId" value={campaign.id} />
                <textarea name="comment" placeholder="Share why this matters to you" className="min-h-20 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800" />
                <button className="w-full rounded-2xl bg-brand-blue px-4 py-3 text-sm font-semibold text-white">Join</button>
              </form>
            </div>
          ))
        )}
      </div>
    </SectionShell>
  );
}
