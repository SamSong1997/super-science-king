'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

const mockUsers = [
  { id: '1', name: '张小明', email: 'zhang@example.com', grade: 3, lastLogin: '2小时前', status: 'active' },
  { id: '2', name: '李小红', email: 'li@example.com', grade: 5, lastLogin: '1天前', status: 'active' },
  { id: '3', name: '王小刚', email: 'wang@example.com', grade: 2, lastLogin: '3天前', status: 'inactive' },
]

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const users = mockUsers

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#141413] font-['Poppins','思源黑体'] mb-2">
            用户管理
          </h1>
          <p className="text-[#b0aea5]">管理系统中的所有用户</p>
        </div>
        <Button className="bg-[#d97757] hover:bg-[#c96847]">
          + 添加用户
        </Button>
      </div>

      <Card className="border-[#e8e6dc] mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <Input
              placeholder="搜索用户名或邮箱..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button variant="outline">筛选</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#e8e6dc]">
        <CardHeader>
          <CardTitle className="text-[#141413] font-['Poppins','思源黑体']">
            用户列表
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border border-[#e8e6dc] rounded-md">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#6a9bcc]/10 rounded-full flex items-center justify-center">
                    <span className="text-xl">👤</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-[#141413]">{user.name}</h3>
                    <p className="text-sm text-[#b0aea5]">{user.email}</p>
                    <p className="text-xs text-[#b0aea5]">年级：{user.grade} | 上次登录：{user.lastLogin}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge className={user.status === 'active' ? 'bg-[#788c5d]' : 'bg-[#b0aea5]'}>
                    {user.status === 'active' ? '活跃' : '未活跃'}
                  </Badge>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">查看</Button>
                    <Button variant="outline" size="sm">编辑</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
