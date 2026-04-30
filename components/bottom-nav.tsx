import Link from 'next/link';
import { Home, Search, History, User } from 'lucide-react';

const items = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/submit', label: 'Submit', icon: Search },
  { href: '/history', label: 'History', icon: History },
  { href: '/settings', label: 'Profile', icon: User }
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
      <div className="mx-auto grid max-w-md grid-cols-4 px-2 py-2 text-xs text-slate-600 dark:text-slate-300">
        {items.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className="flex flex-col items-center gap-1 rounded-2xl py-2">
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
