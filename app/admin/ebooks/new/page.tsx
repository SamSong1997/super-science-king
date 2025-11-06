'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function NewEbookPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    grade: '',
    subject: '',
    pdfFile: null as File | null,
    description: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!formData.pdfFile) {
      setError('请上传 PDF 文件')
      return
    }

    setSubmitting(true)
    try {
      const body = new FormData()
      body.append('title', formData.title)
      body.append('grade', formData.grade)
      body.append('subject', formData.subject)
      body.append('pdf', formData.pdfFile)
      if (formData.description) {
        body.append('description', formData.description)
      }

      const response = await fetch('/api/ebooks', {
        method: 'POST',
        body,
      })

      if (!response.ok) {
        const message = await response.json().catch(() => ({}))
        throw new Error(message.error ?? '创建电子书失败')
      }

      router.push('/admin/ebooks')
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : '创建电子书失败')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="pb-16">
      <div className="mb-8">
        <Link href="/admin/ebooks" className="text-[#6a9bcc] hover:underline">
          ← 返回电子书管理
        </Link>
        <h1 className="text-3xl font-bold text-[#141413] font-['Poppins','思源黑体'] mt-2 mb-2">
          添加新电子书
        </h1>
        <p className="text-[#b0aea5]">上传 PDF 文件，封面将自动使用平台默认样式</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <Card className="border-[#e8e6dc]">
          <CardHeader>
            <CardTitle className="text-[#141413] font-['Poppins','思源黑体']">
              基本信息
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">书名 *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="例如：一年级数学趣味学习"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="grade">年级 *</Label>
                <select
                  id="grade"
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  className="w-full px-3 py-2 border border-[#e8e6dc] rounded-md"
                  required
                >
                  <option value="">请选择</option>
                  <option value="1">一年级</option>
                  <option value="2">二年级</option>
                  <option value="3">三年级</option>
                  <option value="4">四年级</option>
                  <option value="5">五年级</option>
                  <option value="6">六年级</option>
                </select>
              </div>

              <div>
                <Label htmlFor="subject">学科 *</Label>
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 border border-[#e8e6dc] rounded-md"
                  required
                >
                  <option value="">请选择</option>
                  <option value="数学">数学</option>
                  <option value="物理">物理</option>
                  <option value="化学">化学</option>
                  <option value="生物">生物</option>
                  <option value="地理">地理</option>
                  <option value="信息技术">信息技术</option>
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">简介</Label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="可选：简要介绍电子书内容"
                className="min-h-[120px] w-full rounded-md border border-[#e8e6dc] bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6a9bcc]"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#e8e6dc]">
          <CardHeader>
            <CardTitle className="text-[#141413] font-['Poppins','思源黑体']">
              文件上传
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="pdf">PDF 文件 *</Label>
              <Input
                id="pdf"
                type="file"
                accept=".pdf"
                onChange={(e) => setFormData({ ...formData, pdfFile: e.target.files?.[0] || null })}
                required
              />
              <p className="text-xs text-[#b0aea5] mt-1">支持 PDF 格式，文件大小不超过 50MB</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#e8e6dc]">
          <CardHeader>
            <CardTitle className="text-[#141413] font-['Poppins','思源黑体']">
              后续步骤
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-[#faf9f5] p-4 rounded-md space-y-3">
              <div>
                <p className="text-sm text-[#141413] mb-2">创建成功后，您可以：</p>
                <ul className="text-sm text-[#b0aea5] space-y-1 list-disc list-inside">
                  <li>添加知识点和页码映射</li>
                  <li>创建章节目录</li>
                  <li>编辑电子书详细信息</li>
                  <li>发布电子书供学生使用</li>
                </ul>
              </div>
              <div className="rounded-md border border-dashed border-[#e8e6dc] bg-white px-4 py-3 text-sm text-[#6a9bcc]">
                系统将统一使用默认封面 <code className="rounded bg-[#f2f0e6] px-1">/images/default-ebook-cover.png</code>
              </div>
            </div>
          </CardContent>
        </Card>

        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="flex gap-4">
          <Button
            type="submit"
            className="bg-[#d97757] hover:bg-[#c96847]"
            disabled={submitting}
          >
            {submitting ? '创建中…' : '创建电子书'}
          </Button>
          <Link href="/admin/ebooks">
            <Button variant="outline">取消</Button>
          </Link>
        </div>
      </form>
    </div>
  )
}
