#!/usr/bin/env tsx

/**
 * 检查数据库中的题目
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('📊 检查数据库中的题目...')
  
  try {
    // 查看所有题目
    const allPuzzles = await prisma.interactivePuzzle.findMany({
      select: {
        id: true,
        title: true,
        type: true
      }
    })
    
    console.log('\n📋 数据库中的所有题目:')
    allPuzzles.forEach((puzzle, index) => {
      console.log(`   ${index + 1}. ${puzzle.title} (${puzzle.type}) - ID: ${puzzle.id}`)
    })
    
    console.log(`\n✅ 总计 ${allPuzzles.length} 个题目`)
    
    // 按类型分组
    const typeGroups = allPuzzles.reduce((acc, puzzle) => {
      if (!acc[puzzle.type]) {
        acc[puzzle.type] = []
      }
      acc[puzzle.type].push(puzzle)
      return acc
    }, {} as Record<string, typeof allPuzzles>)
    
    console.log('\n📊 按类型分组:')
    Object.entries(typeGroups).forEach(([type, puzzles]) => {
      console.log(`   ${type}: ${puzzles.length} 个题目`)
      puzzles.forEach(puzzle => {
        console.log(`     - ${puzzle.title}`)
      })
    })
    
  } catch (error) {
    console.error('❌ 检查失败:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main().catch(console.error)