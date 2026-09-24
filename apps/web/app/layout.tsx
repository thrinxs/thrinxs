import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title:       'Thrinxs | Technology & Digital Solutions',
  description: 'We build websites, apps, and digital solutions for businesses in Nigeria and beyond.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white font-sans antialiased">{children}</body>
    </html>
  )
}
