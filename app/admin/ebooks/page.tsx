'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Ebook } from '@/types'

export default function AdminEbooksPage() {
  const [ebooks, setEbooks] = useState<Ebook[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

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

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这本电子书吗？此操作不可撤销。')) {
      return
    }

    try {
      const response = await fetch(`/api/ebooks/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok && response.status !== 404) {
        const message = await response.json().catch(() => ({}))
        throw new Error(message.error ?? '删除电子书失败，请稍后再试')
      }

      setEbooks(prev => prev.filter(ebook => ebook.id !== id))
    } catch (error) {
      console.error(error)
      alert(error instanceof Error ? error.message : '删除电子书失败，请稍后再试')
    }
  }

  const filteredEbooks = ebooks.filter(ebook =>
    ebook.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ebook.subject.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-[#b0aea5]">加载中...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#141413] font-['Poppins','思源黑体'] mb-2">
            电子书管理
          </h1>
          <p className="text-[#b0aea5]">管理系统中的所有电子书</p>
        </div>
        <Link href="/admin/ebooks/new">
          <Button className="bg-[#d97757] hover:bg-[#c96847]">
            + 添加新书
          </Button>
        </Link>
      </div>

      {/* 搜索和筛选 */}
      <Card className="border-[#e8e6dc] mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <Input
              placeholder="搜索书名或学科..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button variant="outline">筛选</Button>
          </div>
        </CardContent>
      </Card>

      {/* 电子书列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEbooks.map((ebook) => (
          <Card key={ebook.id} className="border-[#e8e6dc]">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <div className="relative w-16 h-20 overflow-hidden rounded border border-[#e8e6dc] bg-white">
                  <Image
                    src={ebook.coverImage || '/images/default-ebook-cover.png'}
                    alt={ebook.title}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/ebooks/${ebook.id}/edit`}>
                    <Button variant="outline" size="sm">编辑</Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(ebook.id)}
                    className="text-red-500 hover:bg-red-50"
                  >
                    删除
                  </Button>
                </div>
              </div>
              <CardTitle className="text-[#141413] text-lg">
                {ebook.title}
              </CardTitle>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary" className="bg-[#6a9bcc]/10 text-[#6a9bcc]">
                  {ebook.subject}
                </Badge>
                <Badge variant="secondary" className="bg-[#d97757]/10 text-[#d97757]">
                  {ebook.grade}年级
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#b0aea5]">知识点</span>
                  <span className="text-[#141413]">{ebook.knowledgePoints?.length ?? 0} 个</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#b0aea5]">章节</span>
                  <span className="text-[#141413]">{ebook.chapters?.length ?? 0} 个</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#b0aea5]">状态</span>
                  <Badge className="bg-[#788c5d]">已发布</Badge>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Link href={`/ebooks/${ebook.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    预览
                  </Button>
                </Link>
                <Button variant="outline" size="sm" className="flex-1">
                  数据
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEbooks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#b0aea5]">暂无电子书</p>
          <Link href="/admin/ebooks/new">
            <Button className="mt-4 bg-[#d97757] hover:bg-[#c96847]">
              添加第一本书
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
