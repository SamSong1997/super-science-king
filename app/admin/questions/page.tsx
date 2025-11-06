'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

const mockQuestions = [
  { id: '1', subject: '数学', grade: 6, type: '选择', question: '一个数的平方等于16，这个数是多少？', difficulty: '简单' },
  { id: '2', subject: '科学', grade: 5, type: '填空', question: '植物进行光合作用需要哪些条件？', difficulty: '中等' },
  { id: '3', subject: '数学', grade: 6, type: '解答', question: '请计算圆的周长和面积', difficulty: '困难' },
]

export default function AdminQuestionsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const questions = mockQuestions

  const filteredQuestions = questions.filter(q =>
    q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.subject.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#141413] font-['Poppins','思源黑体'] mb-2">
            题库管理
          </h1>
          <p className="text-[#b0aea5]">管理系统中的所有题目</p>
        </div>
        <Button className="bg-[#d97757] hover:bg-[#c96847]">
          + 添加题目
        </Button>
      </div>

      <Card className="border-[#e8e6dc] mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <Input
              placeholder="搜索题目或学科..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button variant="outline">筛选</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {filteredQuestions.map((question) => (
          <Card key={question.id} className="border-[#e8e6dc]">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex gap-2 mb-3">
                    <Badge className="bg-[#6a9bcc]">{question.subject}</Badge>
                    <Badge className="bg-[#d97757]">{question.grade}年级</Badge>
                    <Badge variant="outline">{question.type}</Badge>
                    <Badge variant="outline">{question.difficulty}</Badge>
                  </div>
                  <p className="text-[#141413] mb-2">{question.question}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button variant="outline" size="sm">查看</Button>
                  <Button variant="outline" size="sm">编辑</Button>
                  <Button variant="outline" size="sm" className="text-red-500">删除</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredQuestions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#b0aea5]">暂无题目</p>
          <Button className="mt-4 bg-[#d97757] hover:bg-[#c96847]">
            添加第一道题
          </Button>
        </div>
      )}
    </div>
  )
}
