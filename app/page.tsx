import { MetricCard } from '@/components/metric-card';

export default function HomePage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Welcome back, Jacob!</h1>
        <p className="text-sm text-slate-600">Discover campaigns near your area.</p>
      </div>
      <div className="space-y-3">
        <MetricCard title="People in your area" value="1,248" tone="blue" />
        <MetricCard title="Active Afferent Signal users in your area" value="214" tone="purple" />
        <MetricCard title="Active campaigns" value="12" tone="green" />
        <MetricCard title="Badges earned" value="7" tone="bluegreen" />
      </div>
      <a
        href="/submit"
        className="fixed bottom-20 left-1/2 z-40 w-[min(100%-2rem,390px)] -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-blue to-brand-green px-5 py-4 text-center font-semibold text-white shadow-soft"
      >
        Submit a Product
      </a>
    </div>
  );
}
