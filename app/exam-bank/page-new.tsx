'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Star, TrendingUp, Award } from 'lucide-react'

const PRACTICE_RESOURCES = [
  {
    subject: '数学',
    grade: 6,
    title: '六年级数学专项训练',
    description: '包含分数运算、比例应用、几何图形等核心知识点',
    questionCount: 150,
    difficulty: '中等',
    color: 'from-[#d97757] to-[#d97757]/80',
    bgColor: 'bg-[#d97757]/10',
    icon: '📐'
  },
  {
    subject: '科学',
    grade: 6,
    title: '六年级科学综合',
    description: '涵盖物质科学、生命科学、地球与宇宙科学',
    questionCount: 120,
    difficulty: '中等',
    color: 'from-[#6a9bcc] to-[#6a9bcc]/80',
    bgColor: 'bg-[#6a9bcc]/10',
    icon: '🔬'
  },
  {
    subject: '数学',
    grade: 5,
    title: '五年级数学提升',
    description: '小数运算、简易方程、多边形面积专项练习',
    questionCount: 180,
    difficulty: '简单',
    color: 'from-[#788c5d] to-[#788c5d]/80',
    bgColor: 'bg-[#788c5d]/10',
    icon: '📊'
  },
  {
    subject: '科学',
    grade: 5,
    title: '五年级科学探索',
    description: '生物与环境、天气与气候、简单机械原理',
    questionCount: 140,
    difficulty: '简单',
    color: 'from-[#6a9bcc] to-[#6a9bcc]/80',
    bgColor: 'bg-[#6a9bcc]/10',
    icon: '🌿'
  }
]

const SIMULATIONS = [
  {
    title: '小升初模拟考试',
    description: '全真模拟小升初考试，包含语文、数学、英语、科学',
    questions: 200,
    duration: '120分钟',
    icon: '🎯',
    color: 'bg-[#d97757]'
  },
  {
    title: '错题集管理',
    description: '自动收集错题，智能推荐复习内容',
    questions: '动态',
    duration: '个性化',
    icon: '📚',
    color: 'bg-[#6a9bcc]'
  },
  {
    title: '学习报告生成',
    description: '多维度分析学习数据，生成个性化报告',
    questions: 'AI分析',
    duration: '即时',
    icon: '📊',
    color: 'bg-[#788c5d]'
  }
]

export default function ExamBankPage() {
  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#141413] mb-2 font-['Poppins','思源黑体']">
              小升初题库
            </h1>
            <p className="text-[#b0aea5]">数学科学真题，AI智能批改 ✨</p>
          </div>
          <Badge className="bg-[#788c5d]/10 text-[#788c5d] border-[#788c5d]/20">
            <Star className="w-3 h-3 mr-1 fill-[#788c5d]" />
            10000+ 题目
          </Badge>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* 专项练习 */}
          <Card className="border-[#e8e6dc] hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle className="text-[#141413] font-['Poppins','思源黑体'] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#d97757]" />
                专项练习
              </CardTitle>
              <p className="text-sm text-[#b0aea5]">分年级分科目，精准练习</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {PRACTICE_RESOURCES.map((resource, index) => (
                <Link key={index} href={`/exam-bank/practice?subject=${resource.subject}&grade=${resource.grade}`}>
                  <div className="p-4 border border-[#e8e6dc] rounded-lg hover:border-[#d97757] hover:shadow-md transition-all cursor-pointer group">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 ${resource.bgColor} rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                        {resource.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-[#141413]">{resource.title}</h4>
                          <Badge variant="outline" className="text-xs">{resource.difficulty}</Badge>
                        </div>
                        <p className="text-xs text-[#b0aea5] mb-2">{resource.description}</p>
                        <div className="flex items-center gap-3 text-xs text-[#788c5d]">
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-3 h-3" />
                            {resource.questionCount}题
                          </span>
                          <span className="flex items-center gap-1">
                            <Award className="w-3 h-3" />
                            {resource.grade}年级
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* 真题模拟 */}
          <Card className="border-[#e8-6dc] hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle className="text-[#141413] font-['Poppins','思源黑体'] flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#6a9bcc]" />
                真题模拟
              </CardTitle>
              <p className="text-sm text-[#b0aea5]">全真模拟，提升应试能力</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {SIMULATIONS.map((sim, index) => (
                <div key={index} className="p-4 border border-[#e8e6dc] rounded-lg hover:border-[#6a9bcc] hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#faf9f5] rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      {sim.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-[#141413] mb-1">{sim.title}</h4>
                      <p className="text-xs text-[#b0aea5] mb-2">{sim.description}</p>
                      <div className="flex items-center gap-3 text-xs text-[#788c5d]">
                        <span>📝 {sim.questions}题</span>
                        <span>⏱️ {sim.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* 题库特色 */}
        <Card className="border-[#e8e6dc]">
          <CardHeader>
            <CardTitle className="text-[#141413] font-['Poppins','思源黑体']">
              题库特色
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-[#faf9f5] to-white rounded-lg border border-[#e8e6dc] hover:shadow-md transition-all">
                <div className="text-4xl mb-3">🤖</div>
                <h4 className="font-medium text-[#141413] mb-2">AI智能批改</h4>
                <p className="text-sm text-[#b0aea5]">自动批改客观题，智能分析主观题，提供个性化建议</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-[#faf9f5] to-white rounded-lg border border-[#e8e6dc] hover:shadow-md transition-all">
                <div className="text-4xl mb-3">📝</div>
                <h4 className="font-medium text-[#141413] mb-2">详细解析</h4>
                <p className="text-sm text-[#b0aea5]">每道题都有详细的解题思路和步骤，易懂易学</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-[#faf9f5] to-white rounded-lg border border-[#e8e6dc] hover:shadow-md transition-all">
                <div className="text-4xl mb-3">📈</div>
                <h4 className="font-medium text-[#141413] mb-2">进步追踪</h4>
                <p className="text-sm text-[#b0aea5]">记录学习轨迹，可视化学习进步，见证成长</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 学习数据展示 */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: '已练习题目', value: '2,580', icon: '📚', color: 'text-[#d97757]' },
            { label: '错题数量', value: '156', icon: '❌', color: 'text-[#6a9bcc]' },
            { label: '正确率', value: '85%', icon: '✅', color: 'text-[#788c5d]' },
            { label: '连续学习', value: '15天', icon: '🔥', color: 'text-[#d97757]' },
          ].map((stat, index) => (
            <Card key={index} className="border-[#e8e6dc] hover:shadow-md transition-all">
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                <div className="text-xs text-[#b0aea5]">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
