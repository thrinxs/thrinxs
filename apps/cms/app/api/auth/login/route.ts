import { NextRequest, NextResponse } from 'next/server'
import { loginSchema }               from '@/lib/validations'
import { verifyPassword, signToken, cookieOptions, COOKIE_NAME } from '@/lib/auth'
import { db }                        from '@thrinxs/database'

export async function POST(req: NextRequest) {
  try {
    const body   = await req.json()
    const parsed = loginSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: parsed.error.errors[0].message },
        { status: 400 }
      )
    }

    const { email, password } = parsed.data

    // Find user
    const user = await db.user.findUnique({
      where:   { email },
      include: {
        orgs: {
          include: { org: true },
          take:    1,
        },
      },
    })

    if (!user || !user.passwordHash) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Verify password
    const valid = await verifyPassword(password, user.passwordHash)
    if (!valid) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      )
    }

    const org = user.orgs[0]?.org ?? null

    // Sign JWT
    const token = await signToken({
      userId: user.id,
      email:  user.email,
      name:   user.name,
      role:   user.platformRole,
      orgId:  org?.id,
    })

    const res = NextResponse.json({
      success: true,
      message: 'Logged in successfully',
      user: {
        id:      user.id,
        name:    user.name,
        email:   user.email,
        role:    user.platformRole,
        plan:    user.plan,
        orgId:   org?.id,
        orgSlug: org?.slug,
      },
    })

    res.cookies.set(COOKIE_NAME, token, cookieOptions(60 * 60 * 24 * 7))

    return res

  } catch (err) {
    console.error('[AUTH] Login error:', err)
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
