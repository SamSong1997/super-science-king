'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Ebook } from '@/types'

export default function EbooksPage() {
  const [ebooks, setEbooks] = useState<Ebook[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/ebooks')
      .then(res => res.json())
      .then(data => {
        setEbooks(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load ebooks:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen p-6 md:p-12 flex items-center justify-center">
        <p className="text-[#b0aea5]">加载中...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-[#141413] mb-2 font-['Poppins','思源黑体']">
          电子书阅读器
        </h1>
        <p className="text-[#b0aea5] mb-8">电子书在线阅读，支持知识点划线、笔记</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {ebooks.map(ebook => (
            <Link key={ebook.id} href={`/ebooks/${ebook.id}`}>
              <Card className="hover:shadow-xl transition-all cursor-pointer border-[#e8e6dc] bg-[#faf9f5] overflow-hidden group p-0">
                <div className="relative w-full aspect-[3/4] bg-white">
                  <Image
                    src={ebook.coverImage || '/images/ebook-cover.png'}
                    alt={ebook.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-[#141413] font-['Poppins','思源黑体'] text-base leading-tight text-center line-clamp-2">
                    《{ebook.title}》
                  </h3>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="text-xs text-[#b0aea5]">{ebook.subject}</span>
                    <span className="text-xs text-[#b0aea5]">•</span>
                    <span className="text-xs text-[#b0aea5]">{ebook.grade}年级</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
        
        {ebooks.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-[#b0aea5]">暂无电子书</p>
          </div>
        )}
      </div>
    </div>
  )
}
