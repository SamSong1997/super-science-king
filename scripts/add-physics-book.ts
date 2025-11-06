import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function addPhysicsBook() {
  console.log('开始添加《趣味物理学》...')

  // 创建电子书
  const ebook = await prisma.ebook.create({
    data: {
      title: '趣味物理学',
      subject: '物理',
      grade: 8,
      pdfUrl: '/sample/趣味物理学.pdf',
      coverImage: '/images/趣味物理学封面.jpg',
      description: '探索物理世界的奇妙现象，激发学生对物理学的兴趣和好奇心',
      status: 'published',
    },
  })

  console.log('电子书创建完成:', ebook.title)

  // 创建知识点
  const knowledgePoints = [
    {
      title: '运动和速度',
      content: '了解物体运动的基本概念，学习速度的计算方法和物理意义。',
      pageNumber: 5,
      ebookId: ebook.id,
    },
    {
      title: '重力与引力',
      content: '探索重力现象，理解万有引力定律在日常生活中的应用。',
      pageNumber: 15,
      ebookId: ebook.id,
    },
    {
      title: '光的传播',
      content: '学习光的直线传播、反射和折射现象，探索光学的奥秘。',
      pageNumber: 25,
      ebookId: ebook.id,
    },
    {
      title: '热现象',
      content: '了解热传导、对流和辐射三种热传递方式及其实际应用。',
      pageNumber: 35,
      ebookId: ebook.id,
    },
    {
      title: '电流与电路',
      content: '学习电路的基本组成，理解电流、电压和电阻的关系。',
      pageNumber: 45,
      ebookId: ebook.id,
    },
  ]

  await prisma.knowledgePoint.createMany({
    data: knowledgePoints,
  })

  console.log('知识点创建完成:', knowledgePoints.length, '个')

  // 创建章节
  const chapters = [
    {
      title: '第一章：奇妙的运动',
      pageNumber: 1,
      ebookId: ebook.id,
    },
    {
      title: '第二章：重力的故事',
      pageNumber: 10,
      ebookId: ebook.id,
    },
    {
      title: '第三章：光的魔法',
      pageNumber: 20,
      ebookId: ebook.id,
    },
    {
      title: '第四章：热的世界',
      pageNumber: 30,
      ebookId: ebook.id,
    },
    {
      title: '第五章：电的奥秘',
      pageNumber: 40,
      ebookId: ebook.id,
    },
  ]

  await prisma.chapter.createMany({
    data: chapters,
  })

  console.log('章节创建完成:', chapters.length, '个')
  console.log('《趣味物理学》添加完成！')
}

addPhysicsBook()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
