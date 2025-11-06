import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { prisma } from '@/lib/prisma'

interface Params {
  params: Promise<{
    id: string
  }>
}

function resolvePublicPath(url?: string | null) {
  if (!url || !url.startsWith('/uploads/ebooks/')) {
    return null
  }

  return path.join(process.cwd(), 'public', url)
}

// GET /api/ebooks/[id] - 获取单个电子书
export async function GET(request: Request, { params }: Params) {
  try {
    const { id } = await params
    const ebook = await prisma.ebook.findUnique({
      where: { id },
      include: {
        knowledgePoints: true,
        chapters: true,
      },
    })

    if (!ebook) {
      return NextResponse.json({ error: '电子书不存在' }, { status: 404 })
    }

    return NextResponse.json(ebook)
  } catch (error) {
    console.error('Error fetching ebook:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: 'Failed to fetch ebook', detail: message }, { status: 500 })
  }
}

// PUT /api/ebooks/[id] - 更新电子书基础信息
export async function PUT(request: Request, { params }: Params) {
  try {
    const { id } = await params
    const payload = await request.json()

    const ebook = await prisma.ebook.update({
      where: { id },
      data: {
        title: payload.title,
        subject: payload.subject,
        grade: payload.grade,
        description: payload.description,
      },
    })

    return NextResponse.json(ebook)
  } catch (error) {
    console.error('Error updating ebook:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: 'Failed to update ebook', detail: message }, { status: 500 })
  }
}

// DELETE /api/ebooks/[id] - 删除电子书及 PDF
export async function DELETE(request: Request, { params }: Params) {
  const { id } = await params

  try {
    const ebook = await prisma.ebook.delete({
      where: { id },
    })

    const filePath = resolvePublicPath(ebook.pdfUrl)
    if (filePath) {
      fs.unlink(filePath).catch(() => {
        // ignore removal errors
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code: string }).code === 'P2025'
    ) {
      return NextResponse.json({ error: '电子书不存在或已删除' }, { status: 404 })
    }

    console.error('Error deleting ebook:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: 'Failed to delete ebook', detail: message }, { status: 500 })
  }
}
