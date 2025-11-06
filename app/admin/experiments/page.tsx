'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Experiment } from '@/types'

export default function AdminExperimentsPage() {
  const [experiments, setExperiments] = useState<Experiment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/experiments.json')
      .then(res => res.json())
      .then(data => {
        setExperiments(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load experiments:', err)
        setLoading(false)
      })
  }, [])

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
            实验管理
          </h1>
          <p className="text-[#b0aea5]">管理系统中的所有实验</p>
        </div>
        <Button className="bg-[#d97757] hover:bg-[#c96847]">
          + 添加实验
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiments.map((exp) => (
          <Card key={exp.id} className="border-[#e8e6dc]">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <div className="w-12 h-12 bg-[#e8e6dc] rounded flex items-center justify-center">
                  <span className="text-2xl">🔬</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">编辑</Button>
                </div>
              </div>
              <CardTitle className="text-[#141413]">
                {exp.title}
              </CardTitle>
              <Badge className="bg-[#788c5d] w-fit">
                {exp.subject}
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[#b0aea5] mb-4">{exp.description}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  预览
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  编辑
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
