import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function addUploadedEbooks() {
  console.log('开始添加上传的电子书...')

  const ebooks = [
    {
      title: '天堂女人蚂蚱',
      subject: '文学',
      grade: 6,
      pdfUrl: '/uploads/ebooks/天堂女人蚂蚱20230329.pdf',
      coverImage: '/images/ebook-cover.png',
      description: '文学作品阅读',
      status: 'published'
    },
    {
      title: '科学探索',
      subject: '科学',
      grade: 5,
      pdfUrl: '/uploads/ebooks/1762347687223-d5b2ed5da081f.pdf',
      coverImage: '/images/ebook-cover.png',
      description: '探索科学的奥秘',
      status: 'published'
    },
    {
      title: '知识百科',
      subject: '综合',
      grade: 5,
      pdfUrl: '/uploads/ebooks/1762347791522-7d83570d26d158.pdf',
      coverImage: '/images/ebook-cover.png',
      description: '综合知识学习',
      status: 'published'
    }
  ]

  for (const ebookData of ebooks) {
    const ebook = await prisma.ebook.create({
      data: ebookData
    })
    console.log(`✅ 已添加电子书: ${ebook.title}`)
  }

  console.log('\n上传的电子书添加完成！')
  console.log(`总共添加了 ${ebooks.length} 本电子书`)
}

addUploadedEbooks()
  .catch((e) => {
    console.error('错误:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
