import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

function toKnowledgeTags(value: unknown): string[] {
  if (Array.isArray(value) && value.every(item => typeof item === 'string')) {
    return value as string[]
  }
  return []
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const includePuzzles = searchParams.get('includePuzzles') !== '0'
  const userId = searchParams.get('userId')
  const email = searchParams.get('email')

  try {
    let targetUserId: string | undefined

    if (userId) {
      const user = await prisma.user.findUnique({ where: { id: userId } })
      targetUserId = user?.id
    } else if (email) {
      const user = await prisma.user.findUnique({ where: { email } })
      targetUserId = user?.id
    }

    const checkpoints = await prisma.checkpoint.findMany({
      where: { isActive: true },
      orderBy: { sequence: 'asc' },
      include: {
        puzzles: includePuzzles
          ? {
              include: {
                puzzle: true,
              },
              orderBy: { order: 'asc' },
            }
          : false,
        progress: targetUserId
          ? {
              where: { userId: targetUserId },
            }
          : false,
      },
    })

    const payload = checkpoints.map(checkpoint => ({
      id: checkpoint.id,
      title: checkpoint.title,
      slug: checkpoint.slug,
      description: checkpoint.description,
      grade: checkpoint.grade,
      sequence: checkpoint.sequence,
      badgeImage: checkpoint.badgeImage,
      puzzles: includePuzzles
        ? checkpoint.puzzles.map(link => ({
            id: link.puzzleId,
            order: link.order,
            minScore: link.minScore,
            title: link.puzzle.title,
            type: link.puzzle.type,
            difficulty: link.puzzle.difficulty,
            prompt: link.puzzle.prompt,
            previewImage: link.puzzle.previewImage,
            knowledgeTags: toKnowledgeTags(link.puzzle.knowledgeTags as unknown),
          }))
        : undefined,
      progress:
        Array.isArray(checkpoint.progress) && checkpoint.progress.length > 0
          ? {
              status: checkpoint.progress[0].status,
              stars: checkpoint.progress[0].stars,
              score: checkpoint.progress[0].score,
              bestTime: checkpoint.progress[0].bestTime,
              unlockedAt: checkpoint.progress[0].unlockedAt,
              completedAt: checkpoint.progress[0].completedAt,
            }
          : undefined,
    }))

    return NextResponse.json(payload)
  } catch (error) {
    console.error('Error fetching checkpoints:', error)
    return NextResponse.json(
      { error: 'Failed to fetch checkpoints' },
      { status: 500 },
    )
  }
}
