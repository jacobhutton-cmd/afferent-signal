'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/submit', icon: '\uD83D\uDD0D', label: 'Search' },
  { href: '/community', icon: '\uD83D\uDC65', label: 'Community' },
  { href: '/premium', icon: '\uD83D\uDC51', label: 'Premium' },
  { href: '/profile', icon: '\u2699\uFE0F', label: 'Settings' },
  { href: '/history', icon: '\uD83D\uDD52', label: 'History' },
]

export default function Header() {
  const pathname = usePathname()
  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-md" style={{background: 'linear-gradient(to right, #2563EB, #16A34A)'}}>
      <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-white text-lg">&#128200;</span>
          <span className="text-white font-bold text-base tracking-tight">Afferent Signal</span>
        </Link>
        <nav className="flex items-center gap-3">
          {navItems.map(item => (
            <Link key={item.href} href={item.href}
              className={`text-base transition-opacity ${pathname.startsWith(item.href) ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
              title={item.label}>
              {item.icon}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
