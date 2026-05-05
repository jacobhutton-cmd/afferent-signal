import type { Metadata } from "next"
import './globals.css'

export const metadata: Metadata = {
  title: 'Afferent Signal',
  description: 'Consumer Intent Data — Shape what your local stores carry.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 min-h-screen">
        {children}
      </body>
    </html>
  )
}
