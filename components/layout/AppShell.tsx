import Header from './Header'

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="pt-16 pb-24 max-w-lg mx-auto px-4">
        {children}
      </main>
    </div>
  )
}
