'use client'

import { useRouter } from 'next/navigation'

export default function FAB() {
  const router = useRouter()
  return (
    <button
      onClick={() => router.push('/submit')}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 brand-gradient text-white font-semibold py-4 px-8 rounded-2xl shadow-lg text-base hover:opacity-90 active:scale-95 transition-all z-40"
    >
      + Submit a Product
    </button>
  )
}
