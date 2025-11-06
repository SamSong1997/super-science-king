'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigationItems = [
  { href: '/admin', label: '仪表板', icon: '📊' },
  { href: '/admin/ebooks', label: '电子书管理', icon: '📚' },
  { href: '/admin/users', label: '用户管理', icon: '👥' },
  { href: '/admin/questions', label: '题库管理', icon: '📝' },
  { href: '/admin/experiments', label: '实验管理', icon: '🔬' },
  { href: '/admin/reports', label: '数据报表', icon: '📈' },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-[#faf9f5] flex">
      {/* 侧边栏 */}
      <aside className="w-64 bg-white border-r border-[#e8e6dc] p-6 fixed h-screen overflow-y-auto">
        <div className="mb-8">
          <Link href="/admin">
            <h1 className="text-xl font-bold text-[#141413] font-['Poppins','思源黑体']">
              超级理科王
            </h1>
            <p className="text-sm text-[#b0aea5]">后台管理系统</p>
          </Link>
        </div>

        <nav>
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>
                  <div
                    className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                      pathname === item.href
                        ? 'bg-[#d97757] text-white'
                        : 'text-[#141413] hover:bg-[#faf9f5]'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-8 pt-6 border-t border-[#e8e6dc]">
          <Link href="/" className="text-sm text-[#6a9bcc] hover:underline">
            ← 返回前端首页
          </Link>
        </div>
      </aside>

      {/* 主内容区 */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  )
}
