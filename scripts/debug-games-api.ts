#!/usr/bin/env tsx

/**
 * 调试游戏API返回的数据
 */

console.log('🔍 调试游戏API数据')
console.log('='.repeat(50))

// 模拟API调用
async function testAPI() {
  try {
    console.log('📡 测试 /api/puzzles API...')
    
    // 这里我们直接查询数据库来模拟API响应
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
    
    console.log(`\n📊 API返回 ${puzzles.length} 个题目:`)
    puzzles.forEach((puzzle, index) => {
      console.log(`   ${index + 1}. ${puzzle.title} (${puzzle.type}) - ID: ${puzzle.id}`)
    })
    
    // 模拟前端过滤逻辑
    const allowedTypes = ['SLIDE_PUZZLE', 'LOGIC_PUZZLE']
    const filteredGames = puzzles.filter(game => allowedTypes.includes(game.type))
    
    console.log(`\n🎯 过滤后剩余 ${filteredGames.length} 个游戏:`)
    filteredGames.forEach((game, index) => {
      console.log(`   ${index + 1}. ${game.title} (${game.type})`)
    })
    
    console.log('\n✅ 预期结果: 显示2个游戏卡片（华容道+扫雷）')
    
    if (filteredGames.length !== 2) {
      console.log('⚠️  警告: 过滤后的游戏数量不是2个！')
    }
    
    await prisma.$disconnect()
    
  } catch (error) {
    console.error('❌ API测试失败:', error)
  }
}

testAPI()