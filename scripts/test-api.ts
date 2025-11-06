// 简单的 API 测试脚本
// 注意：需要先启动开发服务器 (npm run dev)

async function testAPI() {
  const baseUrl = 'http://localhost:3000'

  console.log('测试火柴棍游戏 API...\n')

  try {
    // 测试获取所有火柴棍题目
    console.log('1. 测试获取火柴棍题目列表...')
    const response1 = await fetch(`${baseUrl}/api/puzzles?type=MATCHSTICK&includeCheckpoints=1`)
    const puzzles = await response1.json()
    console.log(`   ✓ 找到 ${puzzles.length} 个火柴棍题目`)
    
    if (puzzles.length > 0) {
      console.log(`   第一个题目: ${puzzles[0].title}`)
      console.log(`   题目ID: ${puzzles[0].id}\n`)

      // 测试获取单个题目详情
      console.log('2. 测试获取题目详情...')
      const response2 = await fetch(`${baseUrl}/api/puzzles/${puzzles[0].id}`)
      const puzzle = await response2.json()
      console.log(`   ✓ 题目: ${puzzle.title}`)
      console.log(`   初始状态: ${JSON.stringify(puzzle.initialState)}`)
      console.log(`   难度: ${puzzle.difficulty}\n`)
    }

    console.log('✅ API 测试通过！')
  } catch (error) {
    console.error('❌ API 测试失败:', error)
    console.log('\n请确保开发服务器正在运行: npm run dev')
  }
}

testAPI()
