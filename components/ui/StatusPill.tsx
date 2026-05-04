type Status = 'pending' | 'under_review' | 'approved' | 'rejected' | 'active' | 'fulfilled' | 'closed'

const statusConfig: Record<Status, { label: string; classes: string }> = {
  pending: { label: 'Pending', classes: 'bg-yellow-100 text-yellow-700' },
  under_review: { label: 'Under Review', classes: 'bg-blue-100 text-blue-700' },
  approved: { label: 'Approved', classes: 'bg-green-100 text-green-700' },
  rejected: { label: 'Rejected', classes: 'bg-red-100 text-red-700' },
  active: { label: 'Active', classes: 'bg-green-100 text-green-700' },
  fulfilled: { label: 'Fulfilled', classes: 'bg-purple-100 text-purple-700' },
  closed: { label: 'Closed', classes: 'bg-slate-100 text-slate-600' },
}

export default function StatusPill({ status }: { status: Status }) {
  const config = statusConfig[status]
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.classes}`}>{config.label}</span>
}
