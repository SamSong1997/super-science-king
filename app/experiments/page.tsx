'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Experiment } from '@/types'

const getExperimentImage = (subject: string, id: string) => {
  const imageMap: Record<string, Record<string, string>> = {
    '物理': {
      'exp1': 'https://images.unsplash.com/photo-1603796846097-bee99e4a601f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=300&q=80',
      'exp2': 'https://images.unsplash.com/photo-1470790376778-a9fbc86d70e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=300&q=80',
      'exp3': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=300&q=80'
    },
    '数学': {
      'exp4': 'https://images.unsplash.com/photo-1509228468518-180dd4864904?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=300&q=80',
      'exp5': 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=300&q=80'
    },
    '生物': {
      'exp6': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=300&q=80'
    }
  }
  return imageMap[subject]?.[id] || 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=300&q=80'
}

export default function ExperimentsPage() {
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
      <div className="min-h-screen p-6 md:p-12 flex items-center justify-center">
        <p className="text-[#b0aea5]">加载中...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-[#141413] mb-2 font-['Poppins','思源黑体']">
          互动实验室
        </h1>
        <p className="text-[#b0aea5] mb-8">PhET 互动实验，物理化学生物地理</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiments.map(exp => (
            <Link key={exp.id} href={`/experiments/${exp.id}`}>
              <Card className="h-full hover:shadow-lg transition-all cursor-pointer border-[#e8e6dc]">
                <CardHeader>
                  <div className="w-full h-48 rounded-md mb-4 overflow-hidden">
                    <img
                      src={getExperimentImage(exp.subject, exp.id)}
                      alt={exp.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardTitle className="text-[#141413] font-['Poppins','思源黑体']">
                    {exp.title}
                  </CardTitle>
                  <Badge variant="secondary" className="bg-[#788c5d]/10 text-[#788c5d] w-fit">
                    {exp.subject}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-[#b0aea5] text-sm">{exp.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
