#!/usr/bin/env tsx

/**
 * 直接测试API端点
 */

console.log('🔗 直接测试API端点')
console.log('='.repeat(50))

async function testAPI() {
  try {
    console.log('📡 正在调用 /api/puzzles...')
    
    // 模拟fetch调用
    const { PrismaClient } = require('@prisma/client')
    const prisma = new PrismaClient()
    
    const puzzles = await prisma.interactivePuzzle.findMany({
      take: 30,
      orderBy: { updatedAt: 'desc' },
      include: {
        checkpointLinks: {
          include: {
            checkpoint: true,
          },
        },
      },
    })
    
    // 转换为API格式
    const payload = puzzles.map(puzzle => ({
      id: puzzle.id,
      title: puzzle.title,
      prompt: puzzle.prompt,
      type: puzzle.type,
      gradeBand: puzzle.gradeBand,
      difficulty: puzzle.difficulty,
      previewImage: puzzle.previewImage,
      knowledgeTags: Array.isArray(puzzle.knowledgeTags) ? puzzle.knowledgeTags : [],
    }))
    
    console.log('\n📊 API响应数据:')
    payload.forEach((item, index) => {
      console.log(`   ${index + 1}. ${item.title} (${item.type})`)
      console.log(`      ID: ${item.id}`)
      console.log(`      难度: ${item.difficulty}`)
      console.log(`      标签: ${item.knowledgeTags.join(', ')}`)
      console.log('')
    })
    
    // 前端过滤逻辑
    const allowedTypes = ['SLIDE_PUZZLE', 'LOGIC_PUZZLE']
    const filtered = payload.filter(game => allowedTypes.includes(game.type))
    
    console.log('🎯 前端过滤结果:')
    filtered.forEach((item, index) => {
      console.log(`   ${index + 1}. ${item.title} (${item.type})`)
    })
    
    console.log(`\n✅ 应该显示 ${filtered.length} 个游戏卡片`)
    
    await prisma.$disconnect()
    
  } catch (error) {
    console.error('❌ 测试失败:', error)
  }
}

testAPI()