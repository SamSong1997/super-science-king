'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useEffect, useState } from 'react'

const EXPERIMENT_URLS: Record<string, string> = {
  'cmhisjdqq000dfyn1wz8u7jbe': 'https://phet.colorado.edu/sims/html/pendulum-lab/latest/pendulum-lab_en.html',
  'cmhisjdqq000efyn1ixin7box': 'https://phet.colorado.edu/sims/html/acid-base-solutions/latest/acid-base-solutions_en.html'
}

export default function ExperimentDetailPage() {
  const params = useParams()
  const [experiment, setExperiment] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetch(`/api/experiments`)
        .then(res => res.json())
        .then(data => {
          const exp = data.find((e: any) => e.id === params.id)
          setExperiment(exp)
          setLoading(false)
        })
        .catch(err => {
          console.error('Failed to load experiment:', err)
          setLoading(false)
        })
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen p-6 md:p-12 flex items-center justify-center">
        <p className="text-[#b0aea5]">加载中...</p>
      </div>
    )
  }

  if (!experiment) {
    return (
      <div className="min-h-screen p-6 md:p-12 flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#b0aea5] mb-4">实验未找到</p>
          <Link href="/experiments">
            <Button variant="outline">返回实验列表</Button>
          </Link>
        </div>
      </div>
    )
  }

  const phetUrl = EXPERIMENT_URLS[experiment.id] || 'https://phet.colorado.edu'
  const instructions = typeof experiment.instructions === 'string'
    ? JSON.parse(experiment.instructions)
    : experiment.instructions || []

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link href="/experiments" className="text-[#6a9bcc] hover:underline">
            ← 返回实验列表
          </Link>
        </div>

        <Card className="border-[#e8e6dc]">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-[#141413] text-2xl font-['Poppins','思源黑体']">
                  {experiment.title}
                </CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className="bg-[#788c5d]/10 text-[#788c5d]">
                    {experiment.subject}
                  </Badge>
                  <Badge variant="outline" className="text-[#6a9bcc]">
                    PhET Interactive Simulations
                  </Badge>
                </div>
              </div>
              <Button
                onClick={() => window.open(phetUrl, '_blank')}
                className="bg-[#6a9bcc] hover:bg-[#5a8bb8]"
              >
                🔗 在新窗口打开
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="w-full h-[600px] bg-[#e8e6dc] rounded-md overflow-hidden border-2 border-[#b0aea5]">
                  <iframe
                    src={phetUrl}
                    className="w-full h-full"
                    title={experiment.title}
                    allowFullScreen
                  />
                </div>
                <div className="mt-4 p-4 bg-[#faf9f5] rounded-md border border-[#e8e6dc]">
                  <p className="text-sm text-[#b0aea5] flex items-center gap-2">
                    <span className="text-[#d97757]">💡</span>
                    如果实验没有正常加载，请尝试在新窗口中打开，或检查网络连接。
                  </p>
                </div>
              </div>

              <div>
                <Card className="border-[#e8e6dc] mb-6">
                  <CardHeader>
                    <CardTitle className="text-[#141413] font-['Poppins','思源黑体'] text-lg">
                      实验说明
                    </CardTitle>
                    <p className="text-sm text-[#b0aea5]">{experiment.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {instructions.map((instruction: string, index: number) => (
                      <div key={index} className="flex gap-3">
                        <div className="w-6 h-6 bg-[#d97757] text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-[#141413] text-sm">{instruction}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-[#e8e6dc]">
                  <CardHeader>
                    <CardTitle className="text-[#141413] font-['Poppins','思源黑体'] text-lg">
                      实验工具
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      onClick={() => window.open(phetUrl, '_blank')}
                      variant="outline"
                      className="w-full justify-start"
                    >
                      🌐 在新窗口中全屏体验
                    </Button>
                    <Button
                      onClick={() => {
                        const content = `
实验名称：${experiment.title}
学科：${experiment.subject}
实验时间：${new Date().toLocaleString('zh-CN')}

实验步骤：
${instructions.map((step: string, i: number) => `${i + 1}. ${step}`).join('\n')}

实验总结：
（请在此填写你的实验发现和心得）
                        `
                        navigator.clipboard.writeText(content)
                        alert('实验报告模板已复制到剪贴板！')
                      }}
                      variant="outline"
                      className="w-full justify-start"
                    >
                      📋 复制实验报告模板
                    </Button>
                  </CardContent>
                </Card>

                <div className="mt-6">
                  <Button
                    onClick={() => {
                      const reportWindow = window.open('', '_blank', 'width=600,height=800')
                      if (reportWindow) {
                        reportWindow.document.write(`
                          <html>
                            <head>
                              <title>实验报告 - ${experiment.title}</title>
                              <style>
                                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 40px; line-height: 1.6; }
                                h1 { color: #d97757; border-bottom: 2px solid #e8e6dc; padding-bottom: 10px; }
                                h2 { color: #6a9bcc; margin-top: 30px; }
                                .meta { color: #b0aea5; margin-bottom: 20px; }
                                .step { background: #faf9f5; padding: 10px; margin: 10px 0; border-left: 3px solid #d97757; }
                              </style>
                            </head>
                            <body>
                              <h1>实验报告</h1>
                              <div class="meta">
                                <strong>实验名称：</strong> ${experiment.title}<br>
                                <strong>学科：</strong> ${experiment.subject}<br>
                                <strong>实验时间：</strong> ${new Date().toLocaleString('zh-CN')}
                              </div>

                              <h2>实验目标</h2>
                              <p>${experiment.description}</p>

                              <h2>实验步骤</h2>
                              ${instructions.map((step: string, i: number) => `<div class="step"><strong>步骤 ${i + 1}：</strong> ${step}</div>`).join('')}

                              <h2>实验结果</h2>
                              <p>（请在此记录你的观察和测量数据）</p>

                              <h2>实验结论</h2>
                              <p>（请在此总结实验发现）</p>
                            </body>
                          </html>
                        `)
                      }
                    }}
                    className="w-full bg-[#d97757] hover:bg-[#c96847]"
                  >
                    📝 生成实验报告
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
