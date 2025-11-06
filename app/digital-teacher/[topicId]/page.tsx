'use client'

import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function DigitalTeacherTopicPage() {
  const params = useParams()
  const router = useRouter()

  const topics = {
    '1': { title: '认识数字1-10', content: '通过生活中的物品，让孩子认识数字1到10，理解数字的实际意义。' },
    '2': { title: '植物的生长', content: '了解植物从种子到开花结果的全过程，认识植物的各个部分及其功能。' },
    '3': { title: '什么是力', content: '认识力的概念，了解力的作用效果，知道生活中常见的力。' },
  }

  const topic = topics[params.topicId as keyof typeof topics] || topics['1']

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <Link href="/digital-teacher" className="text-[#6a9bcc] hover:underline">
            ← 返回课程列表
          </Link>
        </div>

        <Card className="border-[#e8e6dc]">
          <CardHeader>
            <CardTitle className="text-[#141413] text-2xl font-['Poppins','思源黑体']">
              {topic.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="order-2 md:order-1">
                <div className="space-y-4">
                  <Button
                    onClick={() => alert('数字人讲解模式')}
                    className="w-full bg-[#d97757] hover:bg-[#c96847]"
                  >
                    🎓 开始讲解
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => alert('数字人思考模式')}
                    className="w-full"
                  >
                    🤔 深度思考
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => alert('数字人互动模式')}
                    className="w-full"
                  >
                    💬 互动问答
                  </Button>
                </div>

                <div className="mt-6 p-4 bg-[#faf9f5] rounded-md">
                  <h4 className="font-medium text-[#141413] mb-2">知识点内容</h4>
                  <p className="text-[#b0aea5] text-sm">{topic.content}</p>
                </div>

                <div className="mt-4">
                  <Button
                    variant="outline"
                    onClick={() => router.push('/ebooks')}
                    className="w-full"
                  >
                    📚 查看相关电子书
                  </Button>
                </div>
              </div>

              <div className="order-1 md:order-2">
                <div className="w-full h-[400px] bg-gradient-to-br from-[#6a9bcc]/20 to-[#d97757]/20 rounded-md flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">👨‍🏫</div>
                    <p className="text-[#141413] font-medium mb-2">数字人老师</p>
                    <p className="text-[#b0aea5] text-sm">点击按钮查看不同状态</p>
                    <p className="text-[#b0aea5] text-xs mt-2">（讲解 / 思考 / 互动）</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
