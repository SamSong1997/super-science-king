import { promises as fs } from 'fs'
import path from 'path'
import { PrismaClient, PuzzleType } from '@prisma/client'

const prisma = new PrismaClient()

interface SeedPuzzle {
  id: string
  title: string
  type: PuzzleType
  gradeBand: string
  knowledgeTags?: string[]
  prompt: string
  initialState: unknown
  targetState?: unknown
  solution?: unknown
  explanation?: string
  difficulty: string
  previewImage?: string
}

interface CheckpointConfig {
  slug: string
  title: string
  description?: string
  grade?: number
  sequence: number
  badgeImage?: string
  puzzleIds: string[]
}

async function loadPuzzleSeed(): Promise<SeedPuzzle[]> {
  const filePath = path.join(process.cwd(), 'scripts', 'data', 'interactive-math.json')
  const raw = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(raw) as SeedPuzzle[]
}

async function upsertPuzzles(puzzles: SeedPuzzle[]) {
  console.log(`🔁 正在写入 ${puzzles.length} 道互动数学题...`)

  for (const puzzle of puzzles) {
    await prisma.interactivePuzzle.upsert({
      where: { id: puzzle.id },
      create: {
        id: puzzle.id,
        title: puzzle.title,
        prompt: puzzle.prompt,
        type: puzzle.type,
        gradeBand: puzzle.gradeBand,
        knowledgeTags: puzzle.knowledgeTags ?? undefined,
        initialState: puzzle.initialState,
        targetState: puzzle.targetState ?? undefined,
        solution: puzzle.solution ?? undefined,
        explanation: puzzle.explanation ?? undefined,
        difficulty: puzzle.difficulty,
        previewImage: puzzle.previewImage ?? undefined,
      },
      update: {
        title: puzzle.title,
        prompt: puzzle.prompt,
        type: puzzle.type,
        gradeBand: puzzle.gradeBand,
        knowledgeTags: puzzle.knowledgeTags ?? undefined,
        initialState: puzzle.initialState,
        targetState: puzzle.targetState ?? undefined,
        solution: puzzle.solution ?? undefined,
        explanation: puzzle.explanation ?? undefined,
        difficulty: puzzle.difficulty,
        previewImage: puzzle.previewImage ?? undefined,
      },
    })
  }

  console.log('✅ 互动数学题写入完成')
}

async function upsertCheckpoints(puzzles: SeedPuzzle[]) {
  const configs: CheckpointConfig[] = [

    {
      slug: 'logic-strategy-lab',
      title: '逻辑策略实验室',
      description: '从华容道到空间推理，练习规划与最优策略',
      grade: 7,
      sequence: 2,
      badgeImage: '/images/puzzles/badge-logic.png',
      puzzleIds: puzzles.filter(p => p.type === 'SLIDE_PUZZLE').map(p => p.id),
    },
    {
      slug: 'math-sprint',
      title: '数学运算冲刺',
      description: '分数、函数、代数综合闯关，夯实运算基础',
      grade: 7,
      sequence: 3,
      badgeImage: '/images/puzzles/badge-math.png',
      puzzleIds: puzzles
        .filter(p => p.type === 'ARITHMETIC' || p.type === 'FUNCTION_GRAPH')
        .map(p => p.id),
    },
  ]

  console.log(`🔁 正在同步 ${configs.length} 个互动闯关...`)

  for (const config of configs) {
    const checkpoint = await prisma.checkpoint.upsert({
      where: { slug: config.slug },
      create: {
        slug: config.slug,
        title: config.title,
        description: config.description ?? undefined,
        grade: config.grade ?? undefined,
        sequence: config.sequence,
        badgeImage: config.badgeImage ?? undefined,
        isActive: true,
      },
      update: {
        title: config.title,
        description: config.description ?? undefined,
        grade: config.grade ?? undefined,
        sequence: config.sequence,
        badgeImage: config.badgeImage ?? undefined,
        isActive: true,
      },
    })

    await prisma.checkpointPuzzle.deleteMany({
      where: { checkpointId: checkpoint.id },
    })

    if (config.puzzleIds.length === 0) continue

    await prisma.checkpointPuzzle.createMany({
      data: config.puzzleIds.map((puzzleId, index) => ({
        checkpointId: checkpoint.id,
        puzzleId,
        order: index + 1,
        minScore: 0,
      })),
    })
  }

  console.log('✅ 互动闯关同步完成')
}

async function seedDemoUserProgress() {
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo.student@example.com' },
    create: {
      name: '演示学生',
      email: 'demo.student@example.com',
      grade: 6,
      role: 'student',
      status: 'active',
    },
    update: {
      name: '演示学生',
      grade: 6,
      status: 'active',
    },
  })

  const checkpoints = await prisma.checkpoint.findMany({
    orderBy: { sequence: 'asc' },
  })

  for (const [index, checkpoint] of checkpoints.entries()) {
    await prisma.checkpointProgress.upsert({
      where: {
        userId_checkpointId: {
          userId: demoUser.id,
          checkpointId: checkpoint.id,
        },
      },
      create: {
        userId: demoUser.id,
        checkpointId: checkpoint.id,
        status: index === 0 ? 'unlocked' : 'locked',
        stars: index === 0 ? 2 : 0,
        score: index === 0 ? 68 : 0,
      },
      update: {
        status: index === 0 ? 'unlocked' : 'locked',
      },
    })
  }

  console.log('✅ 演示学生闯关进度已准备就绪')
}

async function main() {
  try {
    const puzzles = await loadPuzzleSeed()
    if (puzzles.length === 0) {
      console.warn('⚠️ 没有读取到互动数学题数据，跳过写入')
      return
    }

    await upsertPuzzles(puzzles)
    await upsertCheckpoints(puzzles)
    await seedDemoUserProgress()

    console.log('🎉 互动数学题与闯关数据准备完成')
  } catch (error) {
    console.error('❌ 互动题数据准备失败:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
