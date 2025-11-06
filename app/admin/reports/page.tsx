'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function AdminReportsPage() {
  const reportData = {
    totalUsers: 1234,
    activeUsers: 856,
    totalEbooks: 45,
    totalQuestions: 1568,
    totalExperiments: 23,
    completionRate: 68,
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#141413] font-['Poppins','思源黑体'] mb-2">
            数据报表
          </h1>
          <p className="text-[#b0aea5]">查看系统使用数据和统计分析</p>
        </div>
        <Button variant="outline">
          导出报表
        </Button>
      </div>

      {/* 关键指标 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="border-[#e8e6dc]">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-[#b0aea5]">
              总用户数
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#141413] mb-2">
              {reportData.totalUsers.toLocaleString()}
            </div>
            <p className="text-xs text-[#788c5d]">↑ 12% 较上月</p>
          </CardContent>
        </Card>

        <Card className="border-[#e8-6dc]">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-[#b0aea5]">
              活跃用户
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#141413] mb-2">
              {reportData.activeUsers.toLocaleString()}
            </div>
            <p className="text-xs text-[#788c5d]">↑ 8% 较上月</p>
          </CardContent>
        </Card>

        <Card className="border-[#e8e6dc]">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-[#b0aea5]">
              完成率
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#141413] mb-2">
              {reportData.completionRate}%
            </div>
            <p className="text-xs text-[#788c5d]">↑ 5% 较上月</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-[#e8e6dc]">
          <CardHeader>
            <CardTitle className="text-[#141413] font-['Poppins','思源黑体']">
              学习进度分布
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] bg-[#faf9f5] rounded-md flex items-center justify-center">
              <div className="text-center">
                <p className="text-4xl mb-2">📊</p>
                <p className="text-[#b0aea5]">图表组件</p>
                <p className="text-sm text-[#b0aea5] mt-2">使用 Recharts 实现</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#e8e6dc]">
          <CardHeader>
            <CardTitle className="text-[#141413] font-['Poppins','思源黑体']">
              学科热度排行
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { subject: '数学', count: 450, color: 'bg-[#d97757]' },
                { subject: '科学', count: 380, color: 'bg-[#6a9bcc]' },
                { subject: '物理', count: 320, color: 'bg-[#788c5d]' },
                { subject: '化学', count: 280, color: 'bg-[#d97757]' },
                { subject: '生物', count: 220, color: 'bg-[#6a9bcc]' },
              ].map((item) => (
                <div key={item.subject}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[#141413]">{item.subject}</span>
                    <span className="text-[#b0aea5]">{item.count} 人次</span>
                  </div>
                  <div className="w-full bg-[#e8e6dc] rounded-full h-2">
                    <div
                      className={`${item.color} h-2 rounded-full`}
                      style={{ width: `${(item.count / 450) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-[#e8e6dc] mt-6">
        <CardHeader>
          <CardTitle className="text-[#141413] font-['Poppins','思源黑体']">
            详细数据统计
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-[#faf9f5] rounded-md">
              <div className="text-2xl font-bold text-[#141413] mb-1">
                {reportData.totalEbooks}
              </div>
              <p className="text-sm text-[#b0aea5]">电子书总数</p>
            </div>
            <div className="text-center p-4 bg-[#faf9f5] rounded-md">
              <div className="text-2xl font-bold text-[#141413] mb-1">
                {reportData.totalQuestions}
              </div>
              <p className="text-sm text-[#b0aea5]">题库总数</p>
            </div>
            <div className="text-center p-4 bg-[#faf9f5] rounded-md">
              <div className="text-2xl font-bold text-[#141413] mb-1">
                {reportData.totalExperiments}
              </div>
              <p className="text-sm text-[#b0aea5]">实验项目数</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
