import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const apiKey    = req.headers.get('authorization')?.replace('Bearer ', '')
  const projectId = req.headers.get('x-project-id')

  if (!apiKey || !projectId) {
    return NextResponse.json(
      { success: false, message: 'Missing API key or Project ID' },
      { status: 401 }
    )
  }

  return NextResponse.json({ success: true, data: [], total: 0 })
}
