import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  req: NextRequest,
  { params }: { params: { formId: string } }
) {
  try {
    const data = await req.json()
    // TODO: save to DB + send email notification
    console.log('Form submission:', params.formId, data)
    return NextResponse.json({ success: true, message: 'Form submitted successfully' })
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request body' },
      { status: 400 }
    )
  }
}
