import { NextResponse } from 'next/server'
import type { PuzzleType } from '@prisma/client'
import { prisma } from '@/lib/prisma'

const ALLOWED_TYPES = new Set([
  'SLIDE_PUZZLE',
  'ARITHMETIC',
  'FUNCTION_GRAPH',
  'LOGIC_PUZZLE',
])

function toKnowledgeTags(value: unknown): string[] {
  if (Array.isArray(value) && value.every(item => typeof item === 'string')) {
    return value as string[]
  }
  return []
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const typeParam = searchParams.get('type')
  const gradeBand = searchParams.get('gradeBand')
  const limit = Number.parseInt(searchParams.get('limit') ?? '0', 10)
  const includeCheckpoints = searchParams.get('includeCheckpoints') === '1'

  try {
    const where: { type?: PuzzleType; gradeBand?: string } = {}
    if (typeParam && ALLOWED_TYPES.has(typeParam)) {
      where.type = typeParam as PuzzleType
    }
    if (gradeBand) {
      where.gradeBand = gradeBand
    }

    const puzzles = await prisma.interactivePuzzle.findMany({
      where,
      take: Number.isFinite(limit) && limit > 0 ? limit : undefined,
      orderBy: { updatedAt: 'desc' },
      include: includeCheckpoints
        ? {
            checkpointLinks: {
              include: {
                checkpoint: true,
              },
            },
          }
        : undefined,
    })

    const payload = puzzles.map(puzzle => {
      const puzzleWithLinks = puzzle as typeof puzzle & { 
        checkpointLinks?: Array<{ 
          checkpointId: string; 
          order: number; 
          checkpoint: { title: string; slug: string } 
        }> 
      }
      return {
        id: puzzle.id,
        title: puzzle.title,
        prompt: puzzle.prompt,
        type: puzzle.type,
        gradeBand: puzzle.gradeBand,
        difficulty: puzzle.difficulty,
        previewImage: puzzle.previewImage,
        knowledgeTags: toKnowledgeTags(puzzle.knowledgeTags as unknown),
        checkpoints: includeCheckpoints && puzzleWithLinks.checkpointLinks
          ? puzzleWithLinks.checkpointLinks.map(link => ({
              id: link.checkpointId,
              title: link.checkpoint.title,
              slug: link.checkpoint.slug,
              order: link.order,
            }))
          : undefined,
      }
    })

    return NextResponse.json(payload)
  } catch (error) {
    console.error('Error fetching interactive puzzles:', error)
    return NextResponse.json(
      { error: 'Failed to fetch interactive puzzles' },
      { status: 500 },
    )
  }
}
