'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Logo } from './Logo'
import { BookOpen, FlaskConical, Gamepad2, GraduationCap, MessageSquare, ScrollText, Home, BarChart3, User } from 'lucide-react'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const USER_DATA = {
  name: '小明',
  grade: 5,
  avatar: '👦',
  level: 12,
  points: 2580,
  streak: 15,
  badges: 8
}

const navigationItems = [
  { href: '/', label: '首页', icon: Home },
  { href: '/ebooks', label: '电子书', icon: BookOpen },
  { href: '/digital-teacher', label: '数字人微课', icon: GraduationCap },
  { href: '/experiments', label: '互动实验室', icon: FlaskConical },
  { href: '/assessment', label: '素养测评', icon: ScrollText },
  { href: '/games', label: '知识闯关', icon: Gamepad2 },
  { href: '/ai-assistant', label: 'AI助教', icon: MessageSquare },
  { href: '/admin', label: '后台管理', icon: BarChart3 },
]

export function TopNavigation() {
  const pathname = usePathname()
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-[#faf9f5]/95 backdrop-blur-sm border-b border-[#e8e6dc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 布局调整：让导航菜单左对齐，不靠右 */}
        <div className="flex h-16">
          {/* 左侧：Logo 区域 */}
          <div className="flex items-center">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Logo size="sm" />
            </Link>
          </div>

          {/* 中间：导航菜单区域 - 左对齐 */}
          <div className="hidden md:flex items-center flex-1 px-8">
            <div className="flex items-center gap-3">
              {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant="ghost"
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors h-9 ${
                        isActive
                          ? 'bg-[#d97757] text-white'
                          : 'text-[#141413] hover:bg-[#e8e6dc] hover:text-[#d97757]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{item.label}</span>
                    </Button>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* 右侧：用户信息区域 */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#e8e6dc] transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-[#d97757] to-[#6a9bcc] rounded-full flex items-center justify-center text-lg">
                  {USER_DATA.avatar}
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-[#141413]">
                    {USER_DATA.name}
                  </div>
                  <div className="text-xs text-[#b0aea5]">Lv.{USER_DATA.level}</div>
                </div>
              </button>

              {showUserMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowUserMenu(false)}
                  />
                  <Card className="absolute right-0 mt-2 w-80 border-[#e8e6dc] shadow-xl z-20">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-[#141413] flex items-center gap-2">
                          <User className="w-5 h-5 text-[#d97757]" />
                          用户信息
                        </CardTitle>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowUserMenu(false)}
                          className="h-8 w-8 p-0"
                        >
                          ✕
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
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

                      <div>
                        <h4 className="text-sm font-medium text-[#141413] mb-2">获得徽章 ({USER_DATA.badges})</h4>
                        <div className="flex gap-2 flex-wrap">
                          {['🏆', '⭐', '🎯', '🔥', '💎', '🎖️', '🌟', '👑'].map((badge, i) => (
                            <div key={i} className="w-8 h-8 bg-[#faf9f5] rounded-full flex items-center justify-center text-lg">
                              {badge}
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Placeholder */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
