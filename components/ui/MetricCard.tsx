interface MetricCardProps {
  icon: string
  iconBg: string
  count: number | string
  label: string
  linkText?: string
  onLinkClick?: () => void
}

export default function MetricCard({ icon, iconBg, count, label, linkText, onLinkClick }: MetricCardProps) {
  return (
    <div className="card flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${iconBg}`}>
          {icon}
        </div>
        <div>
          <p className="text-xl font-bold text-slate-800">{count}</p>
          <p className="text-sm text-slate-500">{label}</p>
        </div>
      </div>
      {linkText && (
        <button
          onClick={onLinkClick}
          className="text-sm text-brand-blue font-medium hover:underline"
        >
          {linkText} &rarr;
        </button>
      )}
    </div>
  )
}
