'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function ReportPage() {
  const scores = {
    '抽象能力': 75,
    '几何直观': 82,
    '空间观念': 68,
    '逻辑推理': 79,
    '运算能力': 85,
    '数据分析': 72,
    '模型认知': 76,
    '应用意识': 80,
    '创新意识': 73,
  }

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link href="/assessment" className="text-[#6a9bcc] hover:underline">
            ← 返回测评首页
          </Link>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-[#141413] mb-8 font-['Poppins','思源黑体'] text-center">
          测评报告
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="border-[#e8e6dc]">
            <CardHeader>
              <CardTitle className="text-[#141413] font-['Poppins','思源黑体']">
                雷达图分析
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-[400px] bg-[#faf9f5] rounded-md flex items-center justify-center">
                <div className="text-center">
                  <p className="text-4xl mb-4">📊</p>
                  <p className="text-[#b0aea5]">雷达图组件</p>
                  <p className="text-sm text-[#b0aea5] mt-2">使用 Recharts 实现</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#e8e6dc]">
            <CardHeader>
              <CardTitle className="text-[#141413] font-['Poppins','思源黑体']">
                各维度得分
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(scores).map(([dimension, score]) => (
                <div key={dimension}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-[#141413]">{dimension}</span>
                    <span className="text-sm text-[#b0aea5]">{score}分</span>
                  </div>
                  <div className="w-full bg-[#e8e6dc] rounded-full h-2">
                    <div
                      className="bg-[#d97757] h-2 rounded-full transition-all"
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="border-[#e8e6dc] mt-8">
          <CardHeader>
            <CardTitle className="text-[#141413] font-['Poppins','思源黑体']">
              学习建议
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-[#141413]">
              <p>✓ 您的逻辑推理能力表现优秀，可以尝试更有挑战性的题目</p>
              <p>✓ 几何直观和运算能力较强，建议继续保持</p>
              <p>⚠ 空间观念方面需要加强练习，建议多做立体几何相关的题目</p>
              <p>💡 推荐学习路径：加强空间想象力训练 → 多做几何应用题 → 提升创新意识</p>
            </div>
            <div className="flex gap-4 mt-6">
              <Link href="/ebooks">
                <Button variant="outline">去电子书学习</Button>
              </Link>
              <Link href="/games">
                <Button className="bg-[#d97757] hover:bg-[#c96847]">去知识闯关</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
