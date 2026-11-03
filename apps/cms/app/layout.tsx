import type { Metadata } from 'next'
import { AuthProvider }  from '@/context/auth'
import './globals.css'

export const metadata: Metadata = {
  title:       'Thrinxs CMS',
  description: 'Manage your website content with Thrinxs CMS',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 font-sans antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
