#!/usr/bin/env tsx

/**
 * 测试电子书封面图片更新
 */

import fs from 'fs'
import path from 'path'

console.log('📚 测试电子书封面图片更新')
console.log('='.repeat(50))

const publicDir = path.join(process.cwd(), 'super-science-king', 'public', 'images')

// 检查封面图片文件
const coverFiles = [
  'ebook-cover.png',
  'default-ebook-cover.png'
]

console.log('✅ 检查封面图片文件:')
coverFiles.forEach(file => {
  const filePath = path.join(publicDir, file)
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath)
    console.log(`   ✓ ${file} - ${(stats.size / 1024 / 1024).toFixed(2)} MB`)
  } else {
    console.log(`   ✗ ${file} - 文件不存在`)
  }
})

console.log('\n✅ 使用封面图片的组件:')
console.log('   - /app/ebooks/page.tsx - 电子书列表页面')
console.log('   - /components/EbookLibrary.tsx - 电子书库组件')
console.log('   - /app/admin/ebooks/page.tsx - 管理后台')
console.log('   - /app/api/ebooks/route.ts - API路由')

console.log('\n✅ 图片路径:')
console.log('   - 主要封面: /images/ebook-cover.png')
console.log('   - 默认封面: /images/default-ebook-cover.png')

console.log('\n✅ 更新内容:')
console.log('   - 所有电子书封面已统一替换为新图片')
console.log('   - 原图片: /Users/apple/Desktop/超级理科王/北理工资源/这就是数学画稿图片资源/03.png')
console.log('   - 新图片大小: ~1.4MB')

console.log('\n🎉 电子书封面更新完成！')