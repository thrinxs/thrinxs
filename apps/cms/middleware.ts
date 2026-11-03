import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, COOKIE_NAME }  from '@/lib/auth'

const PUBLIC_PATHS = ['/login', '/signup', '/forgot-password', '/api/auth/login', '/api/auth/signup']

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isPublic     = PUBLIC_PATHS.some(p => pathname.startsWith(p))

  const token   = req.cookies.get(COOKIE_NAME)?.value
  const payload = token ? await verifyToken(token) : null

  // Already logged in → redirect away from auth pages
  if (payload && isPublic && !pathname.startsWith('/api')) {
    return NextResponse.redirect(new URL('/overview', req.url))
  }

  // Not logged in → redirect to login
  if (!payload && !isPublic) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|logo.png).*)'],
}
