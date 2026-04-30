import type { ReactNode } from 'react';

export function SectionShell({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-slate-50 dark:bg-slate-950">{children}</div>;
}
