import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

function toKnowledgeTags(value: unknown): string[] {
  if (Array.isArray(value) && value.every(item => typeof item === 'string')) {
    return value as string[]
  }
  return []
}

interface Params {
  params: Promise<{
    id: string
  }>
}

export async function GET(_: Request, { params }: Params) {
  try {
    const { id } = await params
    const puzzle = await prisma.interactivePuzzle.findUnique({
      where: { id },
      include: {
        checkpointLinks: {
          include: {
            checkpoint: true,
          },
          orderBy: { order: 'asc' },
        },
      },
    })

    if (!puzzle) {
      return NextResponse.json({ error: 'Puzzle not found' }, { status: 404 })
    }

    return NextResponse.json({
      id: puzzle.id,
      title: puzzle.title,
      prompt: puzzle.prompt,
      type: puzzle.type,
      gradeBand: puzzle.gradeBand,
      difficulty: puzzle.difficulty,
      previewImage: puzzle.previewImage,
      knowledgeTags: toKnowledgeTags(puzzle.knowledgeTags as unknown),
      initialState: puzzle.initialState,
      targetState: puzzle.targetState,
      solution: puzzle.solution,
      explanation: puzzle.explanation,
      checkpoints: puzzle.checkpointLinks.map(link => ({
        id: link.checkpointId,
        title: link.checkpoint.title,
        slug: link.checkpoint.slug,
        order: link.order,
      })),
    })
  } catch (error) {
    console.error('Error fetching puzzle detail:', error)
    return NextResponse.json(
      { error: 'Failed to fetch puzzle detail' },
      { status: 500 },
    )
  }
}
