import { SectionShell } from '@/components/section-shell';
import { getMyRequests } from '@/lib/queries';

export default async function HistoryPage() {
  const { data: requests = [] } = await getMyRequests();
  return (
    <SectionShell>
      <div className="space-y-4">
        <div>
          <h1 className="text-xl font-bold">Your Requests</h1>
          <p className="text-sm text-slate-600">{requests.length} product requests submitted</p>
        </div>
        {requests.length === 0 ? (
          <div className="rounded-3xl bg-white p-5 text-sm text-slate-600 shadow-soft dark:bg-slate-900">No requests submitted yet.</div>
        ) : (
          requests.map((request) => (
            <div key={request.id} className="space-y-2 rounded-3xl bg-white p-5 shadow-soft dark:bg-slate-900">
              <h2 className="font-semibold">{request.products?.name ?? 'Product request'}</h2>
              <p className="text-sm text-slate-600">{request.location_zip}</p>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">{request.status}</span>
              <p className="text-xs text-slate-500">Submitted {new Date(request.created_at).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </div>
    </SectionShell>
  );
}
