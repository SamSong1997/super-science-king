'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { User, Settings, Award, TrendingUp } from 'lucide-react'

const USER_DATA = {
  name: '小明',
  grade: 5,
  avatar: '👦',
  level: 12,
  points: 2580,
  streak: 15,
  badges: 8
}

export function UserProfile() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="fixed bottom-6 left-6 z-40">
      {/* 展开状态 */}
      {isExpanded ? (
        <Card className="w-80 border-[#e8e6dc] shadow-xl">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-[#141413] flex items-center gap-2">
                <User className="w-5 h-5 text-[#d97757]" />
                用户信息
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(false)}
                className="h-8 w-8 p-0"
              >
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 用户基本信息 */}
            <div className="flex items-center gap-4 p-3 bg-[#faf9f5] rounded-lg">
              <div className="text-4xl">{USER_DATA.avatar}</div>
              <div>
                <h3 className="font-medium text-[#141413]">{USER_DATA.name}</h3>
                <p className="text-sm text-[#b0aea5]">{USER_DATA.grade}年级学生</p>
                <Badge className="bg-[#788c5d]/10 text-[#788c5d] mt-1">
                  Lv.{USER_DATA.level}
                </Badge>
              </div>
            </div>

            {/* 学习数据 */}
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-[#faf9f5] rounded-lg">
                <div className="text-2xl font-bold text-[#d97757]">{USER_DATA.points}</div>
                <div className="text-xs text-[#b0aea5]">学习积分</div>
              </div>
              <div className="text-center p-3 bg-[#faf9f5] rounded-lg">
                <div className="text-2xl font-bold text-[#6a9bcc]">{USER_DATA.streak}</div>
                <div className="text-xs text-[#b0aea5]">连续学习</div>
              </div>
            </div>

            {/* 徽章 */}
            <div>
              <h4 className="text-sm font-medium text-[#141413] mb-2 flex items-center gap-1">
                <Award className="w-4 h-4 text-[#788c5d]" />
                获得徽章 ({USER_DATA.badges})
              </h4>
              <div className="flex gap-2">
                {['🏆', '⭐', '🎯', '🔥', '💎', '🎖️', '🌟', '👑'].map((badge, i) => (
                  <div key={i} className="w-8 h-8 bg-[#faf9f5] rounded-full flex items-center justify-center text-lg">
                    {badge}
                  </div>
                ))}
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="w-4 h-4 mr-2" />
                学习报告
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-2" />
                设置
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* 折叠状态 - 悬浮按钮 */
        <button
          onClick={() => setIsExpanded(true)}
          className="w-16 h-16 bg-gradient-to-br from-[#d97757] to-[#6a9bcc] rounded-full shadow-xl flex items-center justify-center text-3xl hover:scale-110 transition-all border-4 border-white"
        >
          {USER_DATA.avatar}
        </button>
      )}
    </div>
  )
}
