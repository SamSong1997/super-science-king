'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Clock, Target, TrendingUp } from 'lucide-react'

const ASSESSMENT_TYPES = [
  {
    title: '基础测评',
    description: '包含函数图像判断、分数加减运算等基础题目',
    questions: 21,
    duration: '25分钟',
    difficulty: '简单',
    color: 'from-[#788c5d] to-[#788c5d]/80',
    bgColor: 'bg-[#788c5d]/10',
    icon: '🌱',
    dimensions: 6,
    href: '/assessment/test'
  },
  {
    title: '标准测评',
    description: '全面测评科学素养，50道综合题目',
    questions: 50,
    duration: '45分钟',
    difficulty: '中等',
    color: 'from-[#6a9bcc] to-[#6a9bcc]/80',
    bgColor: 'bg-[#6a9bcc]/10',
    icon: '📊',
    dimensions: 9,
    href: '/assessment/test'
  },
  {
    title: '进阶测评',
    description: '挑战性测评，80道深度题目',
    questions: 80,
    duration: '75分钟',
    difficulty: '困难',
    color: 'from-[#d97757] to-[#d97757]/80',
    bgColor: 'bg-[#d97757]/10',
    icon: '🏆',
    dimensions: 12,
    href: '/assessment/test'
  }
]

const SCIENCE_DIMENSIONS = [
  { name: '物质科学', desc: '物质的状态、性质和变化', color: 'text-[#d97757]' },
  { name: '生命科学', desc: '生物与环境、生长发育', color: 'text-[#6a9bcc]' },
  { name: '地球与宇宙', desc: '地球结构、天体运动', color: 'text-[#788c5d]' },
  { name: '技术与工程', desc: '工具使用、工程设计', color: 'text-[#d97757]' },
  { name: '科学探究', desc: '观察、实验、分析能力', color: 'text-[#6a9bcc]' },
  { name: '科学思维', desc: '逻辑推理、抽象概括', color: 'text-[#788c5d]' },
  { name: '科学态度', desc: '好奇心、批判性思维', color: 'text-[#d97757]' },
  { name: '科学与社会', desc: '科技发展、社会影响', color: 'text-[#6a9bcc]' },
  { name: '跨学科能力', desc: '学科融合、解决问题', color: 'text-[#788c5d]' }
]

const RADAR_DATA = {
  labels: SCIENCE_DIMENSIONS.map(d => d.name),
  values: [85, 78, 82, 75, 88, 80, 92, 76, 85]
}

export default function AssessmentPage() {
  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#141413] mb-2 font-['Poppins','思源黑体']">
              科学素养测评
            </h1>
            <p className="text-[#b0aea5]">全面测评科学素养，个性化学习报告 ✨</p>
          </div>
          <Badge className="bg-[#788c5d]/10 text-[#788c5d] border-[#788c5d]/20">
            <TrendingUp className="w-3 h-3 mr-1" />
            AI 智能分析
          </Badge>
        </div>

        {/* 新增题目说明 */}
        <div className="mb-6 p-4 bg-[#788c5d]/10 rounded-lg border border-[#788c5d]/20">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">✨</span>
            <h3 className="font-medium text-[#141413]">新增基础测评题目</h3>
          </div>
          <p className="text-sm text-[#141413]">
            基础测评现已包含<strong>函数图像判断</strong>、<strong>分数加减运算</strong>、<strong>概率统计</strong>和<strong>逻辑思维</strong>等题型，
            帮助全面评估学生的数学基础能力。
          </p>
        </div>

        {/* 测评类型选择 */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {ASSESSMENT_TYPES.map((type, index) => (
            <Card key={index} className="border-[#e8e6dc] hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 ${type.bgColor} rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform`}>
                    {type.icon}
                  </div>
                  <div>
                    <CardTitle className="text-xl text-[#141413]">{type.title}</CardTitle>
                    <p className="text-sm text-[#b0aea5]">{type.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#b0aea5]">题目数量</span>
                    <span className="font-medium text-[#141413]">{type.questions} 题</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#b0aea5]">用时</span>
                    <span className="font-medium text-[#141413]">{type.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#b0aea5]">测评维度</span>
                    <span className="font-medium text-[#141413]">{type.dimensions} 个</span>
                  </div>
                  <Badge variant="outline" className="w-fit">
                    {type.difficulty}
                  </Badge>
                  <div className="pt-2">
                    <Link href={type.href || '/assessment/test'}>
                      <Button
                        className={`w-full bg-gradient-to-r ${type.color} text-white hover:opacity-90`}
                      >
                        开始测评
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 科学素养维度说明 */}
        <Card className="border-[#e8e6dc] mb-8">
          <CardHeader>
            <CardTitle className="text-[#141413] font-['Poppins','思源黑体'] flex items-center gap-2">
              <Target className="w-5 h-5 text-[#d97757]" />
              科学素养测评维度
            </CardTitle>
            <p className="text-sm text-[#b0aea5]">全面评估学生的科学素养水平</p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {SCIENCE_DIMENSIONS.map((dim, index) => (
                <div key={index} className="p-4 bg-[#faf9f5] rounded-lg border border-[#e8e6dc] hover:shadow-md transition-all">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <CheckCircle className={`w-4 h-4 ${dim.color}`} />
                    </div>
                    <div>
                      <h4 className="font-medium text-[#141413] mb-1">{dim.name}</h4>
                      <p className="text-xs text-[#b0aea5]">{dim.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 报告示例 */}
        <Card className="border-[#e8e6dc] mb-8">
          <CardHeader>
            <CardTitle className="text-[#141413] font-['Poppins','思源黑体'] flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#6a9bcc]" />
              测评报告示例
            </CardTitle>
            <p className="text-sm text-[#b0aea5]">完成测评后获得详细的分析报告</p>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-2 gap-6">
              {/* 雷达图 */}
              <div className="p-6 bg-[#faf9f5] rounded-lg border border-[#e8e6dc]">
                <h4 className="font-medium text-[#141413] mb-4 text-center">科学素养雷达图</h4>
                <div className="w-full overflow-hidden">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📊</div>
                    <p className="text-sm text-[#b0aea5] mb-2">已完成测评</p>
                    <div className="space-y-2 text-sm overflow-x-auto">
                      {RADAR_DATA.labels.map((label, i) => (
                        <div key={i} className="flex items-center justify-between gap-4 bg-white p-2 rounded border border-[#e8e6dc]">
                          <span className="text-[#141413] whitespace-nowrap">{label}</span>
                          <span className="text-[#d97757] font-medium">{RADAR_DATA.values[i]}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 文字分析 */}
              <div className="space-y-4">
                <div className="p-4 bg-[#faf9f5] rounded-lg border border-[#e8e6dc]">
                  <h4 className="font-medium text-[#141413] mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#788c5d]" />
                    优势分析
                  </h4>
                  <ul className="space-y-2 text-sm text-[#141413]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#788c5d]">•</span>
                      <span>科学态度和探究能力表现突出，得分92分</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#788c5d]">•</span>
                      <span>物质科学领域掌握扎实，得分85分</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#788c5d]">•</span>
                      <span>跨学科应用能力良好，得分85分</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-[#faf9f5] rounded-lg border border-[#e8e6dc]">
                  <h4 className="font-medium text-[#141413] mb-2 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#6a9bcc]" />
                    提升建议
                  </h4>
                  <ul className="space-y-2 text-sm text-[#141413]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#6a9bcc]">•</span>
                      <span>加强技术与工程领域学习，建议多做实践项目</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#6a9bcc]">•</span>
                      <span>科学与社会维度需要关注，了解科技发展动态</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#6a9bcc]">•</span>
                      <span>继续发挥科学探究优势，保持好奇心</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-[#faf9f5] rounded-lg border border-[#e8e6dc]">
                  <h4 className="font-medium text-[#141413] mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#d97757]" />
                    学习计划
                  </h4>
                  <p className="text-sm text-[#141413]">
                    建议每周完成2-3个科学实验，每月阅读1本科普读物，定期进行知识点复习。
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 历史记录 */}
        <Card className="border-[#e8e6dc]">
          <CardHeader>
            <CardTitle className="text-[#141413] font-['Poppins','思源黑体']">
              最近测评记录
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { date: '2025-11-01', type: '标准测评', score: 82, dimensions: 9 },
                { date: '2025-10-15', type: '基础测评', score: 78, dimensions: 6 },
                { date: '2025-09-20', type: '基础测评', score: 75, dimensions: 6 }
              ].map((record, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-[#faf9f5] rounded-lg border border-[#e8e6dc]">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                      <span className="text-2xl">📝</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-[#141413]">{record.type}</h4>
                      <p className="text-sm text-[#b0aea5]">{record.date} · {record.dimensions}个维度</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#d97757]">{record.score}</div>
                    <div className="text-xs text-[#b0aea5]">总分</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
