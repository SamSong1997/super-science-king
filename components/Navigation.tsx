'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const navigationItems = [
  { href: '/', label: '首页', icon: 'home' },
  { href: '/ebooks', label: '电子书', icon: 'book' },
  { href: '/digital-teacher', label: '数字人微课', icon: 'teacher' },
  { href: '/experiments', label: '实验室', icon: 'flask' },
  { href: '/assessment', label: '科学测评', icon: 'chart' },
  { href: '/games', label: '知识闯关', icon: 'game' },
  { href: '/ai-assistant', label: 'AI助教', icon: 'assistant' },
  { href: '/exam-bank', label: '小升初题库', icon: 'exam' },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex h-screen w-64 flex-col fixed left-0 top-0 bg-[#faf9f5] border-r border-[#e8e6dc] p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#141413] font-['Poppins','思源黑体']">
          超级理科王
        </h1>
        <p className="text-sm text-[#b0aea5] mt-1">数字化学习平台</p>
      </div>

      <Separator className="bg-[#e8e6dc]" />

      <div className="flex-1 py-6">
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>
                <Button
                  variant={pathname === item.href ? 'default' : 'ghost'}
                  className={`w-full justify-start font-medium ${
                    pathname === item.href
                      ? 'bg-[#d97757] hover:bg-[#c96847] text-white'
                      : 'text-[#141413] hover:bg-[#e8e6dc]'
                  }`}
                >
                  {item.label}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto text-xs text-[#b0aea5]">
        <p>© 2024 超级理科王</p>
      </div>
    </nav>
  )
}
