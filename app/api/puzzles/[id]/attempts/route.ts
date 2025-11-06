import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

interface Params {
  params: Promise<{
    id: string
  }>
}

interface AttemptPayload {
  userId?: string
  email?: string
  checkpointId?: string
  isSolved?: boolean
  moves?: number
  elapsedSeconds?: number
  snapshot?: unknown
}

function calcStars(isSolved: boolean, moves?: number, elapsedSeconds?: number): number {
  if (!isSolved) return 0

  if (typeof moves === 'number' && moves > 0) {
    if (moves <= 20) return 3
    if (moves <= 50) return 2
    return 1
  }

  if (typeof elapsedSeconds === 'number' && elapsedSeconds > 0) {
    if (elapsedSeconds <= 90) return 3
    if (elapsedSeconds <= 180) return 2
    return 1
  }

  return 1
}

export async function POST(request: Request, { params }: Params) {
  let payload: AttemptPayload
  try {
    payload = (await request.json()) as AttemptPayload
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  if (!payload.userId && !payload.email) {
    return NextResponse.json(
      { error: 'userId 或 email 至少提供一个' },
      { status: 400 },
    )
  }

  try {
    const { id } = await params
    const user = payload.userId
      ? await prisma.user.findUnique({ where: { id: payload.userId } })
      : await prisma.user.findUnique({ where: { email: payload.email! } })

    if (!user) {
      return NextResponse.json({ error: '用户不存在' }, { status: 404 })
    }

    const puzzle = await prisma.interactivePuzzle.findUnique({
      where: { id },
    })

    if (!puzzle) {
      return NextResponse.json({ error: '互动题不存在' }, { status: 404 })
    }

    const isSolved = Boolean(payload.isSolved)
    const stars = calcStars(isSolved, payload.moves, payload.elapsedSeconds)
    const score = stars * 25

    const attempt = await prisma.puzzleAttempt.create({
      data: {
        userId: user.id,
        puzzleId: puzzle.id,
        checkpointId: payload.checkpointId ?? null,
        status: isSolved ? 'completed' : 'in_progress',
        isSolved,
        moves: payload.moves ?? null,
        elapsedSeconds: payload.elapsedSeconds ?? null,
        snapshot: payload.snapshot ? (payload.snapshot as Prisma.InputJsonValue) : Prisma.JsonNull,
        completedAt: isSolved ? new Date() : null,
      },
    })

    let progressUpdate: { stars: number; score: number } | undefined

    if (payload.checkpointId) {
      const compositeKey = {
        userId_checkpointId: {
          userId: user.id,
          checkpointId: payload.checkpointId,
        },
      }

      const existingProgress = await prisma.checkpointProgress.findUnique({
        where: compositeKey,
      })

      const bestTime =
        typeof payload.elapsedSeconds === 'number' && payload.elapsedSeconds > 0
          ? payload.elapsedSeconds
          : null

      if (!existingProgress) {
        await prisma.checkpointProgress.create({
          data: {
            userId: user.id,
            checkpointId: payload.checkpointId,
            status: isSolved ? 'completed' : 'unlocked',
            stars,
            score,
            bestTime,
            completedAt: isSolved ? new Date() : null,
          },
        })
      } else {
        await prisma.checkpointProgress.update({
          where: compositeKey,
          data: {
            status: isSolved ? 'completed' : existingProgress.status === 'locked' ? 'unlocked' : existingProgress.status,
            stars: Math.max(existingProgress.stars, stars),
            score: Math.max(existingProgress.score, score),
            bestTime:
              bestTime === null
                ? existingProgress.bestTime
                : existingProgress.bestTime === null
                ? bestTime
                : Math.min(existingProgress.bestTime, bestTime),
            completedAt: isSolved ? new Date() : existingProgress.completedAt,
          },
        })
      }

      progressUpdate = { stars, score }
    }

    return NextResponse.json({
      attemptId: attempt.id,
      status: attempt.status,
      isSolved,
      stars,
      score,
      progress: progressUpdate,
    })
  } catch (error) {
    console.error('Failed to log puzzle attempt:', error)
    return NextResponse.json(
      { error: 'Failed to log puzzle attempt' },
      { status: 500 },
    )
  }
}
