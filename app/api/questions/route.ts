import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/questions - 获取所有题目
export async function GET() {
  try {
    const questions = await prisma.question.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(questions)
  } catch (error) {
    console.error('Error fetching questions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch questions' },
      { status: 500 }
    )
  }
}
