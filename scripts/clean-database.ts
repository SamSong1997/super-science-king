#!/usr/bin/env tsx

/**
 * 清理数据库，只保留华容道游戏
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🧹 开始清理数据库...')
  
  try {
    // 删除所有题目
    const deletedPuzzles = await prisma.interactivePuzzle.deleteMany({})
    console.log(`✅ 删除了 ${deletedPuzzles.count} 个旧题目`)
    
    // 删除所有关卡
    const deletedCheckpoints = await prisma.checkpoint.deleteMany({})
    console.log(`✅ 删除了 ${deletedCheckpoints.count} 个旧关卡`)
    
    // 删除所有关卡链接（如果存在）
    try {
      const deletedLinks = await prisma.checkpointPuzzle.deleteMany({})
      console.log(`✅ 删除了 ${deletedLinks.count} 个旧关卡链接`)
    } catch (e) {
      console.log('ℹ️  关卡链接表不存在，跳过')
    }
    
    console.log('\n🎯 数据库已清理完成')
    
  } catch (error) {
    console.error('❌ 清理失败:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main().catch(console.error)