'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const stats = [
  { title: '用户总数', value: '1,234', icon: '👥', color: 'bg-[#6a9bcc]' },
  { title: '电子书', value: '45', icon: '📚', color: 'bg-[#d97757]' },
  { title: '题库数量', value: '1,568', icon: '📝', color: 'bg-[#788c5d]' },
  { title: '实验项目', value: '23', icon: '🔬', color: 'bg-[#6a9bcc]' },
]

const quickActions = [
  { title: '添加新书', description: '上传PDF并添加电子书', href: '/admin/ebooks/new', icon: '📚' },
  { title: '添加用户', description: '创建新的用户账号', href: '/admin/users/new', icon: '👤' },
  { title: '添加题目', description: '向题库添加新题目', href: '/admin/questions/new', icon: '✏️' },
  { title: '查看报表', description: '分析学习数据', href: '/admin/reports', icon: '📊' },
]

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#141413] font-['Poppins','思源黑体'] mb-2">
          仪表板
        </h1>
        <p className="text-[#b0aea5]">欢迎使用超级理科王后台管理系统</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-[#e8e6dc]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#b0aea5]">
                {stat.title}
              </CardTitle>
              <span className="text-2xl">{stat.icon}</span>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold text-white inline-block px-3 py-1 rounded ${stat.color}`}>
                {stat.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 快捷操作 */}
      <Card className="border-[#e8e6dc]">
        <CardHeader>
          <CardTitle className="text-[#141413] font-['Poppins','思源黑体']">
            快捷操作
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link key={action.href} href={action.href}>
                <div className="p-4 border border-[#e8e6dc] rounded-md hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{action.icon}</span>
                    <h3 className="font-medium text-[#141413]">{action.title}</h3>
                  </div>
                  <p className="text-sm text-[#b0aea5]">{action.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 最近活动 */}
      <Card className="border-[#e8-6dc] mt-8">
        <CardHeader>
          <CardTitle className="text-[#141413] font-['Poppins','思源黑体']">
            最近活动
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 pb-4 border-b border-[#e8e6dc]">
              <div className="w-2 h-2 bg-[#d97757] rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-[#141413]">新增电子书《五年级数学》</p>
                <p className="text-xs text-[#b0aea5]">2小时前</p>
              </div>
            </div>
            <div className="flex items-start gap-3 pb-4 border-b border-[#e8e6dc]">
              <div className="w-2 h-2 bg-[#6a9bcc] rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-[#141413]">用户"小明"完成了科学测评</p>
                <p className="text-xs text-[#b0aea5]">4小时前</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-[#788c5d] rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-[#141413]">添加了50道新题到题库</p>
                <p className="text-xs text-[#b0aea5]">昨天</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
