import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/experiments - 获取所有实验
export async function GET() {
  try {
    const experiments = await prisma.experiment.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(experiments)
  } catch (error) {
    console.error('Error fetching experiments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch experiments' },
      { status: 500 }
    )
  }
}
