'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Ebook } from '@/types'
import { PDFReader } from '@/components/PDFReader'
import Link from 'next/link'

export default function EbookDetailPage() {
  const params = useParams<{ id?: string | string[] }>()
  const rawId = params?.id
  const ebookId = useMemo(() => (Array.isArray(rawId) ? rawId[0] : rawId) ?? '', [rawId])
  const [ebook, setEbook] = useState<Ebook | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentChapter, setCurrentChapter] = useState(0)

  useEffect(() => {
    if (!ebookId) {
      setLoading(false)
      return
    }

    const load = async () => {
      try {
        const res = await fetch(`/api/ebooks/${ebookId}`)
        if (!res.ok) {
          const message = await res.json().catch(() => ({}))
          throw new Error(message?.error ?? '电子书数据加载失败')
        }
        const data = await res.json()
        setEbook(data)
      } catch (err) {
        console.error('Failed to load ebook:', err)
        setEbook(null)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [ebookId])

  if (loading) {
    return (
      <div className="min-h-screen p-6 md:p-12 flex items-center justify-center">
        <p className="text-[#b0aea5]">加载中...</p>
      </div>
    )
  }

  if (!ebook || !ebookId) {
    return (
      <div className="min-h-screen p-6 md:p-12 flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#b0aea5] mb-4">电子书未找到</p>
          <Link href="/ebooks">
            <Button variant="outline">返回电子书列表</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-4 flex items-center justify-between">
          <Link href="/ebooks" className="text-[#6a9bcc] hover:underline">
            ← 返回电子书列表
          </Link>
          <h1 className="text-xl font-['Poppins','思源黑体'] text-[#141413]">
            {ebook.title}
          </h1>
        </div>

        <div className="w-full">
          <PDFReader
            fileUrl={ebook.pdfUrl}
            ebookId={ebook.id}
            onPageChange={(page, total) => {
              console.log('页面变化:', page, '/', total)
            }}
          />
        </div>
      </div>
    </div>
  )
}
