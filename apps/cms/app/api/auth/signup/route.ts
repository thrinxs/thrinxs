import { NextRequest, NextResponse } from 'next/server'
import { signupSchema }              from '@/lib/validations'
import { hashPassword, signToken, cookieOptions, COOKIE_NAME } from '@/lib/auth'
import { db }                        from '@thrinxs/database'

export async function POST(req: NextRequest) {
  try {
    const body   = await req.json()
    const parsed = signupSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: parsed.error.errors[0].message },
        { status: 400 }
      )
    }

    const {
      firstName, lastName, email, phone, country,
      password, orgName, orgSlug, orgWebsite,
      orgIndustry, orgSize, plan,
    } = parsed.data

    // Check if email already exists
    const existing = await db.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json(
        { success: false, message: 'An account with this email already exists' },
        { status: 409 }
      )
    }

    // Check if org slug already exists
    const existingOrg = await db.organization.findUnique({ where: { slug: orgSlug } })
    if (existingOrg) {
      return NextResponse.json(
        { success: false, message: 'This workspace URL is already taken' },
        { status: 409 }
      )
    }

    // Hash password
    const passwordHash = await hashPassword(password)

    // Create user + org in a transaction
    const { user, org } = await db.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name:         `${firstName} ${lastName}`.trim(),
          email,
          passwordHash,
          platformRole: 'CLIENT',
          plan:         plan.toUpperCase() as any,
        },
      })

      const org = await tx.organization.create({
        data: {
          name: orgName,
          slug: orgSlug,
          plan: plan.toUpperCase() as any,
          members: {
            create: {
              userId: user.id,
              role:   'OWNER',
            },
          },
        },
      })

      return { user, org }
    })

    // Sign JWT token
    const token = await signToken({
      userId: user.id,
      email:  user.email,
      name:   user.name,
      role:   user.platformRole,
      orgId:  org.id,
    })

    // Set session cookie
    const res = NextResponse.json({
      success: true,
      message: 'Account created successfully',
      user: {
        id:    user.id,
        name:  user.name,
        email: user.email,
        role:  user.platformRole,
        plan:  user.plan,
        orgId: org.id,
        orgSlug: org.slug,
      },
    })

    res.cookies.set(COOKIE_NAME, token, cookieOptions(60 * 60 * 24 * 7)) // 7 days

    return res

  } catch (err) {
    console.error('[AUTH] Signup error:', err)
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
