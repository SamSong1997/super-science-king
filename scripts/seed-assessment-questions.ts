import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

const difficultyMap: Record<number, string> = {
  1: 'easy',
  2: 'easy',
  3: 'medium',
  4: 'hard',
  5: 'hard'
}

const subjectMap: Record<string, string> = {
  '抽象能力': '数学',
  '几何直观': '数学',
  '空间观念': '数学',
  '创新意识': '科学',
  '运算能力': '数学',
  '推理意识': '数学',
  '数据意识': '数学',
  '模型意识': '数学',
  '应用意识': '科学'
}

async function main() {
  console.log('开始插入测评题目...')

  // 读取JSON文件
  const jsonPath = '/Users/apple/Desktop/Sam Daily/Work/资源/Mock数据/assessment-questions.json'
  const rawData = fs.readFileSync(jsonPath, 'utf-8')
  const data = JSON.parse(rawData)

  // 清除现有题目
  await prisma.testResult.deleteMany()
  await prisma.question.deleteMany()
  console.log('已清除现有题目')

  // 插入新题目
  for (const q of data.questions) {
    const subject = subjectMap[q.dimension] || '科学'
    const grade = 6 // 假设都是6年级
    const difficulty = difficultyMap[q.difficulty] || 'medium'
    const type = q.type === 'single' ? 'single' : 'single'

    const question = await prisma.question.create({
      data: {
        subject,
        grade,
        type,
        question: q.question,
        options: JSON.stringify(q.options),
        answer: q.answer,
        explanation: q.explanation,
        difficulty
      }
    })
    console.log(`插入题目: ${q.id} - ${q.dimension}`)
  }

  console.log(`成功插入 ${data.questions.length} 道题目！`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
