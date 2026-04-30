import './globals.css';
import type { ReactNode } from 'react';
import { MobileHeader } from '@/components/mobile-header';
import { BottomNav } from '@/components/bottom-nav';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
        <MobileHeader />
        <main className="mx-auto max-w-md px-4 py-5 pb-28">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
