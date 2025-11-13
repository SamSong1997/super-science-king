'use client'

import Image from 'next/image'
import { Card } from '@/components/ui/card'

// Demo 静态数据 - 不依赖数据库
const DEMO_EBOOKS = [
  {
    id: '1',
    title: '初中物理实验指南',
    subject: '物理',
    grade: 8,
    coverImage: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&h=600&fit=crop',
  },
  {
    id: '2',
    title: '化学元素周期表',
    subject: '化学',
    grade: 9,
    coverImage: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=400&h=600&fit=crop',
  },
  {
    id: '3',
    title: '大自然的动物世界',
    subject: '生物',
    grade: 7,
    coverImage: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400&h=600&fit=crop',
  },
  {
    id: '4',
    title: '数学思维训练',
    subject: '数学',
    grade: 8,
    coverImage: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=600&fit=crop',
  },
  {
    id: '5',
    title: '地球科学探索',
    subject: '地理',
    grade: 7,
    coverImage: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=400&h=600&fit=crop',
  },
  {
    id: '6',
    title: '天文学入门',
    subject: '科学',
    grade: 9,
    coverImage: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=600&fit=crop',
  },
  {
    id: '7',
    title: '物理力学原理',
    subject: '物理',
    grade: 9,
    coverImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=600&fit=crop',
  },
  {
    id: '8',
    title: '有机化学基础',
    subject: '化学',
    grade: 9,
    coverImage: 'https://images.unsplash.com/photo-1554475901-4538ddfbccc2?w=400&h=600&fit=crop',
  },
]

export default function EbooksPage() {
  const ebooks = DEMO_EBOOKS

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-[#141413] mb-2 font-['Poppins','思源黑体']">
          电子书阅读器
        </h1>
        <p className="text-[#b0aea5] mb-8">电子书在线阅读，支持知识点划线、笔记</p>

        {/* Demo 提示 */}
        <div className="mb-6 p-4 bg-[#6a9bcc]/10 rounded-lg border border-[#6a9bcc]/20">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📚</span>
            <p className="text-sm text-[#141413]">
              <strong>Demo 展示</strong> - 电子书阅读功能即将上线，敬请期待
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {ebooks.map(ebook => (
            <div key={ebook.id} className="relative">
              <Card className="hover:shadow-xl transition-all border-[#e8e6dc] bg-[#faf9f5] overflow-hidden group p-0">
                <div className="relative w-full aspect-[3/4] bg-white">
                  <Image
                    src={ebook.coverImage}
                    alt={ebook.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* 敬请期待标签 */}
                  <div className="absolute top-2 right-2 bg-[#d97757] text-white text-xs px-2 py-1 rounded-full">
                    敬请期待
                  </div>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
