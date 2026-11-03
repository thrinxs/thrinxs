import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { collectionSlug: string } }
) {
  const apiKey    = req.headers.get('authorization')?.replace('Bearer ', '')
  const projectId = req.headers.get('x-project-id')

  if (!apiKey || !projectId) {
    return NextResponse.json(
      { success: false, message: 'Missing API key or Project ID' },
      { status: 401 }
    )
  }

  // TODO: verify API key + fetch from DB
  return NextResponse.json({
    success:    true,
    data:       [],
    total:      0,
    page:       1,
    pageSize:   20,
    totalPages: 0,
    collection: params.collectionSlug,
  })
}
