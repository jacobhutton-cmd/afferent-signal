export function MetricCard({
  title,
  value,
  tone
}: {
  title: string;
  value: string;
  tone: 'blue' | 'purple' | 'green' | 'bluegreen';
}) {
  const tones = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-fuchsia-500 to-pink-500',
    green: 'from-emerald-500 to-green-500',
    bluegreen: 'from-blue-500 to-emerald-500'
  };
  return (
    <div className="rounded-3xl bg-white p-5 shadow-soft dark:bg-slate-900">
      <div className={`mb-3 h-2 w-16 rounded-full bg-gradient-to-r ${tones[tone]}`} />
      <div className="text-3xl font-bold text-slate-900 dark:text-white">{value}</div>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{title}</p>
    </div>
  );
}
