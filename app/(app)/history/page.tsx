import { createClient } from '../../../lib/supabase/server'
import { redirect } from 'next/navigation'
import AppShell from '../../../components/layout/AppShell'
import StatusPill from '../../../components/ui/StatusPill'
import Link from 'next/link'

export default async function HistoryPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: requests } = await supabase
    .from('product_requests')
    .select('*, products(*)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <AppShell>
      <div className="pt-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-slate-800">Your Requests</h1>
            <p className="text-slate-500 text-sm">{requests?.length ?? 0} product requests submitted</p>
          </div>
          <Link href="/submit" className="text-sm font-medium" style={{color: '#2563EB'}}>New Request</Link>
        </div>

        {requests && requests.length > 0 ? (
          <div className="space-y-3">
            {requests.map((req: any) => (
              <div key={req.id} className="card overflow-hidden">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">&#128230;</span>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{req.products?.name ?? 'Unknown Product'}</p>
                      <p className="text-xs text-slate-500">{req.products?.brand}</p>
                    </div>
                  </div>
                  <StatusPill status={req.status} />
                </div>
                <div className="text-xs text-slate-500 space-y-0.5 mb-3">
                  <p>&#128205; {req.location_zip}</p>
                  <p>&#128197; {new Date(req.created_at).toLocaleDateString()}</p>
                  {req.products?.upc && <p>UPC: {req.products.upc}</p>}
                </div>
                {(req.status === 'pending' || req.status === 'under_review') && (
                  <div className="-mx-4 -mb-4 px-4 py-2 border-t" style={{background: '#FEFCE8', borderColor: '#FEF08A'}}>
                    <p className="text-xs" style={{color: '#A16207'}}>
                      {req.status === 'pending' ? 'Under review — we will update the status soon.' : 'Currently under review by our team.'}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="card text-center py-12">
            <p className="text-4xl mb-3">&#128230;</p>
            <p className="text-slate-600 font-medium">No requests yet.</p>
            <Link href="/submit" className="text-sm mt-1 inline-block" style={{color: '#2563EB'}}>Submit your first product</Link>
          </div>
        )}
      </div>
    </AppShell>
  )
}
