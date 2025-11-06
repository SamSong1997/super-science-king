import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { prisma } from '@/lib/prisma'

// GET /api/ebooks - 获取所有电子书
export async function GET() {
  try {
    const ebooks = await prisma.ebook.findMany({
      include: {
        knowledgePoints: true,
        chapters: true,
        _count: {
          select: { readingProgress: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(ebooks)
  } catch (error) {
    console.error('Error fetching ebooks:', error)
    return NextResponse.json(
      { error: 'Failed to fetch ebooks' },
      { status: 500 }
    )
  }
}

// POST /api/ebooks - 创建新电子书
export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    const title = String(formData.get('title') ?? '').trim()
    const subject = String(formData.get('subject') ?? '').trim()
    const gradeValue = formData.get('grade')
    const pdfFile = formData.get('pdf')

    if (!title || !subject || !gradeValue || !(pdfFile instanceof File)) {
      return NextResponse.json(
        { error: '缺少必要字段或文件' },
        { status: 400 },
      )
    }

    const grade = Number(gradeValue)
    if (!Number.isInteger(grade) || grade < 1) {
      return NextResponse.json(
        { error: '年级格式不正确' },
        { status: 400 },
      )
    }

    const uploadDir = path.join(process.cwd(), 'public/uploads/ebooks')
    await fs.mkdir(uploadDir, { recursive: true })

    const originalName = pdfFile.name?.replace(/\s+/g, '-').toLowerCase() || 'ebook.pdf'
    const extension = path.extname(originalName) || '.pdf'
    const safeName = `${Date.now()}-${Math.random().toString(16).slice(2)}${extension}`
    const pdfPath = path.join(uploadDir, safeName)
    const pdfArrayBuffer = await pdfFile.arrayBuffer()
    await fs.writeFile(pdfPath, Buffer.from(pdfArrayBuffer))

    const pdfUrl = `/uploads/ebooks/${safeName}`
    const DEFAULT_COVER = '/images/default-ebook-cover.png'

    const description =
      (formData.get('description') && String(formData.get('description'))) || null

    const newEbook = await prisma.ebook.create({
      data: {
        title,
        subject,
        grade,
        pdfUrl,
        coverImage: DEFAULT_COVER,
        description,
        status: 'published',
      }
    })

    return NextResponse.json(newEbook, { status: 201 })
  } catch (error) {
    console.error('Error creating ebook:', error)
    return NextResponse.json(
      { error: 'Failed to create ebook' },
      { status: 500 }
    )
  }
}
