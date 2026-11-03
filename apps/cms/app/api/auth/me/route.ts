import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, COOKIE_NAME }  from '@/lib/auth'
import { db }                        from '@thrinxs/database'

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get(COOKIE_NAME)?.value
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      )
    }

    const payload = await verifyToken(token)
    if (!payload) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired session' },
        { status: 401 }
      )
    }

    const user = await db.user.findUnique({
      where:   { id: payload.userId },
      include: {
        orgs: {
          include: { org: true },
          take:    1,
        },
      },
    })

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      )
    }

    const org = user.orgs[0]?.org ?? null

    return NextResponse.json({
      success: true,
      user: {
        id:      user.id,
        name:    user.name,
        email:   user.email,
        role:    user.platformRole,
        plan:    user.plan,
        orgId:   org?.id,
        orgSlug: org?.slug,
        orgName: org?.name,
      },
    })

  } catch (err) {
    console.error('[AUTH] Me error:', err)
    return NextResponse.json(
      { success: false, message: 'Something went wrong' },
      { status: 500 }
    )
  }
}
