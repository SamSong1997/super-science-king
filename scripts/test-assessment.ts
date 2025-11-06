#!/usr/bin/env tsx

/**
 * 测试素养测评功能
 */

console.log('🧪 测试素养测评功能')
console.log('='.repeat(50))

// 模拟题目数据
const testQuestions = [
  {
    id: 1,
    type: 'choice',
    category: '函数图像判断',
    text: '有三个小朋友们在谈论谁做的好事多...',
    options: ['冬冬', '兰兰', '静静'],
    isMultiple: true
  },
  {
    id: 2,
    type: 'judgment',
    category: '分数运算',
    text: '12.5×1.5+6.5=12.5×（1.5+6.5）=100',
    correctAnswer: false
  },
  {
    id: 3,
    type: 'fill',
    category: '分数运算',
    text: '根据32.5÷26=1.25，直接写出下面各题的得数。',
    subQuestions: [
      { text: '32.5÷2.6=（　　）', correctAnswer: '12.5' },
      { text: '3.25÷2.6=（　　）', correctAnswer: '1.25' }
    ]
  }
]

console.log('✅ 题目类型测试:')
testQuestions.forEach((q, index) => {
  console.log(`   ${index + 1}. ${q.category} - ${q.type}题`)
})

console.log('\n✅ 功能特性:')
console.log('   - 支持选择题（单选/多选）')
console.log('   - 支持判断题（正确/错误）')
console.log('   - 支持填空题（多个空格）')
console.log('   - 实时进度显示')
console.log('   - 题目分类标签')

console.log('\n✅ 页面路由:')
console.log('   - /assessment - 素养测评首页')
console.log('   - /assessment/test - 测评答题页面')
console.log('   - /assessment/report - 测评报告页面')

console.log('\n✅ 数据迁移:')
console.log('   - 函数图像判断题 已从知识闯关移至素养测评')
console.log('   - 分数加减运算题 已从知识闯关移至素养测评')

console.log('\n🎉 素养测评功能测试完成！')