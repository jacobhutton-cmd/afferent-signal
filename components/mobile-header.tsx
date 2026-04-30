import Link from 'next/link';
import { ChartNoAxesCombined, Search, Users, Crown, Settings, Clock3, FileText } from 'lucide-react';

export function MobileHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-gradient-to-r from-brand-blue to-brand-green text-white shadow-soft">
      <div className="mx-auto flex max-w-md items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <ChartNoAxesCombined className="h-5 w-5" />
          <span>Afferent Signal</span>
        </Link>
        <nav className="flex items-center gap-3">
          <Link href="/submit"><Search className="h-4 w-4" /></Link>
          <Link href="/campaigns"><Users className="h-4 w-4" /></Link>
          <Link href="/premium"><Crown className="h-4 w-4" /></Link>
          <Link href="/settings"><Settings className="h-4 w-4" /></Link>
          <Link href="/history"><Clock3 className="h-4 w-4" /></Link>
          <FileText className="h-4 w-4" />
        </nav>
      </div>
    </header>
  );
}
