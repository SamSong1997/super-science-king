import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('开始填充数据库...')

  // 创建电子书
  const ebook1 = await prisma.ebook.create({
    data: {
      title: '一年级数学趣味学习',
      subject: '数学',
      grade: 1,
      pdfUrl: '/sample/book-1.pdf',
      coverImage: '/images/cover-1.png',
      description: '适合一年级学生的数学启蒙读物',
      status: 'published',
    },
  })

  const ebook2 = await prisma.ebook.create({
    data: {
      title: '三年级科学探索',
      subject: '科学',
      grade: 3,
      pdfUrl: '/sample/book-2.pdf',
      coverImage: '/images/cover-2.png',
      description: '激发学生对科学的好奇心',
      status: 'published',
    },
  })

  console.log('创建电子书完成')

  // 创建知识点
  await prisma.knowledgePoint.createMany({
    data: [
      {
        title: '认识数字1-10',
        content: '通过生活中的物品，让孩子认识数字1到10，理解数字的实际意义。',
        pageNumber: 3,
        ebookId: ebook1.id,
      },
      {
        title: '数数的方法',
        content: '学习如何正确地数数，理解数与量的对应关系。',
        pageNumber: 5,
        ebookId: ebook1.id,
      },
      {
        title: '植物的生长',
        content: '了解植物从种子到开花结果的全过程，认识植物的各个部分及其功能。',
        pageNumber: 5,
        ebookId: ebook2.id,
      },
    ],
  })

  console.log('创建知识点完成')

  // 创建章节
  await prisma.chapter.createMany({
    data: [
      {
        title: '数字的认识',
        pageNumber: 1,
        ebookId: ebook1.id,
      },
      {
        title: '数数的方法',
        pageNumber: 5,
        ebookId: ebook1.id,
      },
      {
        title: '认识植物',
        pageNumber: 1,
        ebookId: ebook2.id,
      },
    ],
  })

  console.log('创建章节完成')

  // 创建用户
  await prisma.user.createMany({
    data: [
      {
        name: '张小明',
        email: 'zhang@example.com',
        grade: 3,
        role: 'student',
        status: 'active',
      },
      {
        name: '李小红',
        email: 'li@example.com',
        grade: 5,
        role: 'student',
        status: 'active',
      },
      {
        name: '管理员',
        email: 'admin@example.com',
        grade: 6,
        role: 'admin',
        status: 'active',
      },
    ],
  })

  console.log('创建用户完成')

  // 创建题目
  await prisma.question.createMany({
    data: [
      {
        subject: '数学',
        grade: 6,
        type: 'single',
        question: '一个数的平方等于16，这个数是多少？',
        options: JSON.stringify(['2', '4', '8', '±4']),
        answer: '±4',
        explanation: '因为(±4)² = 16，所以答案是±4。',
        difficulty: 'medium',
      },
      {
        subject: '科学',
        grade: 6,
        type: 'single',
        question: '地球围绕太阳运动的轨道形状是？',
        options: JSON.stringify(['圆形', '椭圆形', '抛物线', '双曲线']),
        answer: '椭圆形',
        explanation: '地球围绕太阳的轨道是一个椭圆形，太阳位于其中一个焦点上。',
        difficulty: 'easy',
      },
    ],
  })

  console.log('创建题目完成')

  // 创建实验
  await prisma.experiment.createMany({
    data: [
      {
        title: '单摆实验',
        subject: '物理',
        phetUrl: 'https://phet.colorado.edu/sims/html/pendulum-lab/latest/pendulum-lab_zh-CN.html',
        description: '探索单摆周期与摆长的关系，理解重力对摆动的影响',
        instructions: JSON.stringify([
          '拖动摆球改变摆长',
          '点击播放按钮观察摆动',
          '记录不同摆长下的周期',
          '分析周期与摆长的关系'
        ]),
      },
      {
        title: '酸碱指示剂',
        subject: '化学',
        phetUrl: 'https://phet.colorado.edu/sims/html/acid-base-solutions/latest/acid-base-solutions_zh-CN.html',
        description: '观察酸碱溶液的颜色变化，理解pH值的概念',
        instructions: JSON.stringify([
          '选择不同的溶液',
          '观察颜色变化',
          '使用pH试纸测试',
          '记录pH值'
        ]),
      },
    ],
  })

  console.log('创建实验完成')
  console.log('数据库填充完成！')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
