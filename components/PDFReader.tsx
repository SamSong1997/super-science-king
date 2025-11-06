'use client'

import React, { useState } from 'react'
import { Worker, Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import { highlightPlugin, MessageIcon, Trigger } from '@react-pdf-viewer/highlight'
import type { RenderHighlightsProps, RenderHighlightTargetProps } from '@react-pdf-viewer/highlight'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import '@react-pdf-viewer/highlight/lib/styles/index.css'

interface PDFReaderProps {
  fileUrl: string
  ebookId: string
  onPageChange?: (page: number, totalPages: number) => void
}

interface Note {
  id: number
  content: string
  highlightAreas: Array<{
    height: number
    left: number
    pageIndex: number
    top: number
    width: number
  }>
  quote: string
  color: string
  type: 'highlight' | 'underline'
}

interface Bookmark {
  id: number
  pageIndex: number
  title: string
  createdAt: number
}

export function PDFReader({ fileUrl, ebookId, onPageChange }: PDFReaderProps) {
  const [notes, setNotes] = useState<Note[]>([])
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [currentColor, setCurrentColor] = useState('#ffeb3b')
  const [currentType, setCurrentType] = useState<'highlight' | 'underline'>('highlight')
  const [showNoteInput, setShowNoteInput] = useState(false)
  const [noteText, setNoteText] = useState('')
  const [pendingNote, setPendingNote] = useState<Partial<Note> | null>(null)
  const [currentPage, setCurrentPage] = useState(0)

  const colors = [
    { name: '黄色', value: '#ffeb3b' },
    { name: '绿色', value: '#4caf50' },
    { name: '蓝色', value: '#2196f3' },
    { name: '粉色', value: '#e91e63' },
  ]

  const noteEls: Map<number, HTMLElement> = new Map()

  const renderHighlightTarget = (props: RenderHighlightTargetProps) => (
    <div
      className="selection-menu"
      style={{
        background: '#fff',
        border: '1px solid rgba(0, 0, 0, .3)',
        borderRadius: '8px',
        padding: '8px',
        position: 'absolute',
        left: `${props.selectionRegion.left}%`,
        top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
        transform: 'translate(0, 8px)',
        zIndex: 1000,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      }}
    >
      <div className="flex items-center gap-1">
        {/* 高亮颜色按钮 */}
        {colors.map((color) => (
          <button
            key={color.value}
            className={`p-2 hover:bg-gray-100 rounded transition-colors relative group ${
              currentColor === color.value && currentType === 'highlight' ? 'ring-2 ring-gray-400' : ''
            }`}
            onClick={() => {
              setCurrentColor(color.value)
              setCurrentType('highlight')
              const note: Note = {
                id: Date.now(),
                content: '',
                highlightAreas: props.highlightAreas,
                quote: props.selectedText,
                color: color.value,
                type: 'highlight',
              }
              setNotes([...notes, note])
              props.cancel()
            }}
            title={`${color.name}高亮`}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill={color.value}>
              <rect x="4" y="8" width="16" height="8" rx="1" />
            </svg>
            <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {color.name}
            </span>
          </button>
        ))}

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* 画线按钮 */}
        <button
          className={`p-2 hover:bg-gray-100 rounded transition-colors ${
            currentType === 'underline' ? 'ring-2 ring-gray-400' : ''
          }`}
          onClick={() => {
            setCurrentType('underline')
            const note: Note = {
              id: Date.now(),
              content: '',
              highlightAreas: props.highlightAreas,
              quote: props.selectedText,
              color: currentColor,
              type: 'underline',
            }
            setNotes([...notes, note])
            props.cancel()
          }}
          title="画线"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 17h18" />
          </svg>
        </button>

        {/* 笔记按钮 */}
        <button
          className="px-3 py-2 bg-[#6a9bcc] text-white rounded hover:bg-[#5a8bbc] transition-colors flex items-center gap-1"
          onClick={() => {
            setPendingNote({
              highlightAreas: props.highlightAreas,
              quote: props.selectedText,
              color: currentColor,
              type: 'highlight',
            })
            setShowNoteInput(true)
            props.cancel()
          }}
          title="添加笔记"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          <span className="text-sm">笔记</span>
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* 分享按钮 */}
        <button
          className="p-2 hover:bg-gray-100 rounded transition-colors"
          onClick={() => {
            // 生成分享卡片
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            if (ctx) {
              canvas.width = 600
              canvas.height = 400
              
              // 背景
              ctx.fillStyle = '#faf9f5'
              ctx.fillRect(0, 0, 600, 400)
              
              // 文字
              ctx.fillStyle = '#141413'
              ctx.font = '24px sans-serif'
              const lines = props.selectedText.match(/.{1,20}/g) || []
              lines.forEach((line, i) => {
                ctx.fillText(line, 40, 100 + i * 40)
              })
              
              // 下载
              canvas.toBlob((blob) => {
                if (blob) {
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement('a')
                  a.href = url
                  a.download = '阅读卡片.png'
                  a.click()
                  URL.revokeObjectURL(url)
                }
              })
            }
            props.cancel()
          }}
          title="生成分享卡片"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
        </button>
      </div>
    </div>
  )

  const renderHighlights = (props: RenderHighlightsProps) => (
    <div>
      {notes.map((note) => (
        <React.Fragment key={note.id}>
          {note.highlightAreas
            .filter((area) => area.pageIndex === props.pageIndex)
            .map((area, idx) => (
              <div
                key={idx}
                style={{
                  background: note.type === 'highlight' ? note.color : 'transparent',
                  borderBottom: note.type === 'underline' ? `2px solid ${note.color}` : 'none',
                  opacity: note.type === 'highlight' ? 0.4 : 1,
                  position: 'absolute',
                  left: `${area.left}%`,
                  top: `${area.top}%`,
                  height: `${area.height}%`,
                  width: `${area.width}%`,
                  cursor: 'pointer',
                }}
                onClick={() => {
                  const shouldDelete = window.confirm(
                    note.content
                      ? `"${note.quote}"\n\n笔记: ${note.content}\n\n是否删除？`
                      : `"${note.quote}"\n\n是否删除？`
                  )
                  if (shouldDelete) {
                    setNotes(notes.filter((n) => n.id !== note.id))
                  }
                }}
              />
            ))}
        </React.Fragment>
      ))}
    </div>
  )

  const highlightPluginInstance = highlightPlugin({
    renderHighlightTarget,
    renderHighlights,
    trigger: Trigger.TextSelection,
  })

  const { jumpToHighlightArea } = highlightPluginInstance

  const saveNote = () => {
    if (pendingNote) {
      const newNote: Note = {
        ...pendingNote,
        id: Date.now(),
        content: noteText,
      } as Note
      setNotes([...notes, newNote])
    }
    setShowNoteInput(false)
    setNoteText('')
    setPendingNote(null)
  }

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: (defaultTabs) => [
      {
        content: defaultTabs[0].content,
        icon: defaultTabs[0].icon,
        title: '缩略图',
      },
      {
        content: (
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-[#141413]">书签 ({bookmarks.length})</h3>
              <button
                className="px-3 py-1 text-sm bg-[#6a9bcc] text-white rounded hover:bg-[#5a8bbc] transition-colors"
                onClick={() => {
                  const title = prompt('书签名称:', `第 ${currentPage + 1} 页`)
                  if (title) {
                    const newBookmark: Bookmark = {
                      id: Date.now(),
                      pageIndex: currentPage,
                      title,
                      createdAt: Date.now(),
                    }
                    setBookmarks([...bookmarks, newBookmark])
                  }
                }}
              >
                + 添加书签
              </button>
            </div>
            <div className="space-y-2">
              {bookmarks.map((bookmark) => (
                <div
                  key={bookmark.id}
                  className="p-3 border border-[#e8e6dc] rounded-md hover:bg-[#faf9f5] transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#141413] mb-1">
                        {bookmark.title}
                      </p>
                      <p className="text-xs text-[#b0aea5]">
                        第 {bookmark.pageIndex + 1} 页
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setBookmarks(bookmarks.filter((b) => b.id !== bookmark.id))
                      }}
                      className="text-xs text-red-500 hover:text-red-700 ml-2"
                    >
                      删除
                    </button>
                  </div>
                </div>
              ))}
              {bookmarks.length === 0 && (
                <p className="text-sm text-[#b0aea5] text-center py-8">
                  暂无书签
                  <br />
                  <span className="text-xs">点击上方按钮添加书签</span>
                </p>
              )}
            </div>
          </div>
        ),
        icon: defaultTabs[1].icon,
        title: '书签',
      },
      {
        content: (
          <div className="p-4">
            <h3 className="font-medium mb-4 text-[#141413]">我的标注 ({notes.length})</h3>
            <div className="space-y-3">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="p-3 border border-[#e8e6dc] rounded-md hover:bg-[#faf9f5] transition-colors cursor-pointer"
                  onClick={() => jumpToHighlightArea(note.highlightAreas[0])}
                >
                  <div className="flex items-start gap-2 mb-2">
                    <div
                      className="w-4 h-4 rounded flex-shrink-0 mt-0.5"
                      style={{ background: note.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#141413] line-clamp-3 mb-1">
                        {note.quote}
                      </p>
                      {note.content && (
                        <p className="text-xs text-[#b0aea5] bg-[#faf9f5] p-2 rounded mt-2">
                          💭 {note.content}
                        </p>
                      )}
                      <p className="text-xs text-[#b0aea5] mt-2">
                        第 {note.highlightAreas[0].pageIndex + 1} 页
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setNotes(notes.filter((n) => n.id !== note.id))
                    }}
                    className="text-xs text-red-500 hover:text-red-700"
                  >
                    删除
                  </button>
                </div>
              ))}
              {notes.length === 0 && (
                <p className="text-sm text-[#b0aea5] text-center py-8">
                  暂无标注
                  <br />
                  <span className="text-xs">选中文字即可添加高亮或笔记</span>
                </p>
              )}
            </div>
          </div>
        ),
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
        ),
        title: '标注',
      },
    ],
    renderToolbar: (Toolbar) => (
      <Toolbar>
        {(slots) => {
          const {
            CurrentPageInput,
            EnterFullScreen,
            GoToNextPage,
            GoToPreviousPage,
            NumberOfPages,
            ShowSearchPopover,
            Zoom,
            ZoomIn,
            ZoomOut,
          } = slots
          return (
            <div className="flex items-center justify-between w-full px-2">
              <div className="flex items-center gap-1">
                <ShowSearchPopover />
                <ZoomOut />
                <Zoom />
                <ZoomIn />
              </div>
              <div className="flex items-center gap-1">
                <GoToPreviousPage />
                <CurrentPageInput />
                <span className="px-1">/</span>
                <NumberOfPages />
                <GoToNextPage />
              </div>
              <div className="flex items-center gap-1">
                <EnterFullScreen />
              </div>
            </div>
          )
        }}
      </Toolbar>
    ),
  })

  if (!fileUrl) {
    return (
      <div className="relative w-full h-[calc(100vh-120px)] border border-[#e8e6dc] rounded-lg bg-white flex items-center justify-center text-sm text-[#b0aea5]">
        当前电子书尚未配置 PDF 文件
      </div>
    )
  }

  return (
    <>
      <div className="relative w-full h-[calc(100vh-120px)] border border-[#e8e6dc] rounded-lg overflow-hidden bg-white">
        <Worker workerUrl="/pdf.worker.min.js">
          <Viewer
            fileUrl={fileUrl}
            plugins={[defaultLayoutPluginInstance, highlightPluginInstance]}
            defaultScale={SpecialZoomLevel.PageFit}
            onPageChange={(e) => {
              setCurrentPage(e.currentPage)
              if (onPageChange) {
                onPageChange(e.currentPage + 1, e.doc.numPages)
              }
            }}
          />
        </Worker>
      </div>

      {/* 笔记对话框 */}
      {showNoteInput && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg p-6 w-[500px] max-w-[90vw]">
            <h3 className="text-lg font-medium mb-4 text-[#141413]">添加笔记</h3>
            <div className="mb-4 p-3 bg-[#faf9f5] rounded text-sm text-[#141413]">
              {pendingNote?.quote}
            </div>
            <textarea
              className="w-full border border-[#e8e6dc] rounded p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#6a9bcc]"
              rows={4}
              placeholder="输入你的想法..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              autoFocus
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 text-sm text-[#b0aea5] hover:text-[#141413] transition-colors"
                onClick={() => {
                  setShowNoteInput(false)
                  setNoteText('')
                  setPendingNote(null)
                }}
              >
                取消
              </button>
              <button
                className="px-4 py-2 text-sm bg-[#6a9bcc] text-white rounded hover:bg-[#5a8bbc] transition-colors"
                onClick={saveNote}
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
