'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

const navigationItems = [
  { href: '/', label: '首页' },
  { href: '/ebooks', label: '电子书' },
  { href: '/digital-teacher', label: '数字人' },
  { href: '/experiments', label: '实验' },
  { href: '/assessment', label: '测评' },
]

export function MobileNavigation() {
  const pathname = usePathname()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#e8e6dc] p-2 z-50">
      <div className="flex justify-around">
        {navigationItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center gap-1 h-auto py-2 ${
                pathname === item.href
                  ? 'text-[#d97757]'
                  : 'text-[#b0aea5]'
              }`}
            >
              <span className="text-xs">{item.label}</span>
            </Button>
          </Link>
        ))}
      </div>
    </nav>
  )
}
