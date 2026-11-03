import { NextResponse }             from 'next/server'
import { COOKIE_NAME, cookieOptions } from '@/lib/auth'

export async function POST() {
  const res = NextResponse.json({ success: true, message: 'Logged out' })
  res.cookies.set(COOKIE_NAME, '', cookieOptions(0))
  return res
}
