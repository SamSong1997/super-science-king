#!/usr/bin/env tsx

/**
 * 清理数据库中的火柴棍数据
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🔥 开始清理火柴棍数据...')
  
  try {
    // 删除所有火柴棍类型的题目
    const deletedPuzzles = await prisma.interactivePuzzle.deleteMany({
      where: {
        type: 'MATCHSTICK' as any // 强制类型转换，因为我们已经从枚举中删除了
      }
    })
    
    console.log(`✅ 删除了 ${deletedPuzzles.count} 个火柴棍题目`)
    
    // 查看剩余的题目
    const remainingPuzzles = await prisma.interactivePuzzle.findMany({
      select: {
        id: true,
        title: true,
        type: true
      }
    })
    
    console.log('\n📊 剩余题目:')
    remainingPuzzles.forEach((puzzle, index) => {
      console.log(`   ${index + 1}. ${puzzle.title} (${puzzle.type})`)
    })
    
    console.log(`\n✅ 总计剩余 ${remainingPuzzles.length} 个题目`)
    
  } catch (error) {
    console.error('❌ 清理失败:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main().catch(console.error)