'use client'

import { useState } from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface PDFViewerProps {
  fileUrl: string
  chapter?: { id: string; title: string; pageNumber: number }
  onPageChange?: (page: number) => void
}

export function PDFViewer({ fileUrl, chapter, onPageChange }: PDFViewerProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: (defaultTabs) => [
      {
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16">
            <path d="M2 3h12v2H2V3zm0 4h12v2H2V7zm0 4h12v2H2v-2z" fill="currentColor" />
          </svg>
        ),
        title: '目录',
        label: '目录',
        content: (
          <div className="p-4">
            <h3 className="font-semibold mb-4">章节导航</h3>
            {/* 这里渲染章节列表 */}
            <div className="space-y-2">
              {/* 示例章节 */}
              <Button
                variant="ghost"
                className="w-full justify-start text-left h-auto p-3"
                onClick={() => {/* 跳转到章节 */}}
              >
                <div>
                  <p className="text-sm font-medium">第1章 认识数字</p>
                  <p className="text-xs text-muted-foreground">第3页</p>
                </div>
              </Button>
            </div>
          </div>
        ),
      },
      {
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16">
            <path d="M2 2h12v12H2V2zm2 2v8h8V4H4z" fill="currentColor" />
          </svg>
        ),
        title: '书签',
        label: '书签',
        content: (
          <div className="p-4">
            <h3 className="font-semibold mb-4">我的书签</h3>
            <p className="text-sm text-muted-foreground">暂无书签</p>
          </div>
        ),
      },
    ],
  })

  const handlePageChange = (e: { currentPage: number }) => {
    setCurrentPage(e.currentPage)
    onPageChange?.(e.currentPage)
  }

  return (
    <Card className="w-full">
      <div className="h-[80vh] overflow-hidden">
        <Worker workerUrl="/pdf.worker.min.js">
          <Viewer
            fileUrl={fileUrl}
            plugins={[defaultLayoutPluginInstance]}
            onPageChange={handlePageChange}
            initialPage={chapter?.pageNumber || 1}
          />
        </Worker>
      </div>
    </Card>
  )
}
