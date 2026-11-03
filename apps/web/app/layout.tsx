import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png' },
      { url: '/logo.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  title: 'Thrinxs | Technology & Digital Solutions',
  description: 'We build websites, apps, and digital solutions for businesses in Nigeria and beyond.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased" style={{ background: '#05050a' }}>
        <Navbar />
        <main style={{ paddingTop: '90px' }}>{children}</main>
        <Footer />
      </body>
    </html>
  )
}