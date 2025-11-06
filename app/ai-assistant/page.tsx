'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

const SYSTEM_PROMPT = `你是一位专为1-6年级学生设计的AI智能助教。请遵循以下规则：
1. 使用简单易懂的语言，适合小学生理解
2. 多用比喻和生活中的例子来解释抽象概念
3. 鼓励学生思考，引导而非直接给答案
4. 保持耐心和友好的语气
5. 可以使用emoji增加趣味性
6. 回答要准确、有趣、有教育意义
7. 擅长数学、科学、物理、化学、生物等学科
请始终保持积极正面的态度，帮助学生建立学习兴趣。`

const QUICK_QUESTIONS = [
  {
    icon: '🧮',
    title: '数学问题',
    content: '一个数的平方等于16，这个数是多少？',
    tag: '数学'
  },
  {
    icon: '🔬',
    title: '物理现象',
    content: '为什么苹果会落地，而月亮不会掉到地球上？',
    tag: '物理'
  },
  {
    icon: '🌱',
    title: '生物问题',
    content: '植物是怎么进行光合作用的？',
    tag: '生物'
  }
]

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: '你好！我是AI智能助教 🤖 很高兴为你答疑解惑！我擅长数学、科学、物理等科目。有什么问题可以帮助你吗？ 😊',
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [input, setInput] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [isConfigured, setIsConfigured] = useState(false)

  const handleQuickQuestion = (question: string) => {
    setInput(question)
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = {
      id: messages.length + 1,
      role: 'user' as const,
      content: input,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMessage])
    const currentInput = input
    setInput('')

    // 模拟AI回复（实际应用中这里应该调用API）
    setTimeout(() => {
      const responses = [
        `这是一个很有趣的问题！让我来为你分析一下。${currentInput} 这个问题的关键在于...`,
        `你问得很好！这个问题涉及到很多知识点。我建议你可以这样思考...`,
        `让我们一起来解决这个问题！首先，我们需要了解...然后...`,
        `很好的问题！让我用生活中的例子来解释：就像...一样，这个问题也是类似的情况。`,
        `这个问题很有意思！我们可以分步骤来解决：第一...第二...`
      ]

      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      const assistantMessage = {
        id: messages.length + 2,
        role: 'assistant' as const,
        content: randomResponse,
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
      }

      setMessages(prev => [...prev, assistantMessage])
    }, 1500)
  }

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-[#141413] mb-2 font-['Poppins','思源黑体']">
            AI智能助教
          </h1>
          <p className="text-[#b0aea5]">名师对话答疑，个性化学习建议 ✨</p>
        </div>

        {/* 对话区域 */}
        <Card className="border-[#e8-6dc]">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#6a9bcc]/20 to-[#d97757]/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div>
              <div>
                <CardTitle className="text-[#141413] font-['Poppins','思源黑体']">
                  AI智能助教
                </CardTitle>
                <p className="text-sm text-[#788c5d] flex items-center gap-1">
                  <span className="w-2 h-2 bg-[#788c5d] rounded-full"></span>
                  在线服务中
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[500px] overflow-y-auto border border-[#e8e6dc] rounded-md p-4 mb-4 space-y-4">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-lg ${
                      msg.role === 'user'
                        ? 'bg-[#d97757] text-white rounded-br-none'
                        : msg.isSystem
                        ? 'bg-[#6a9bcc]/10 text-[#141413] border-2 border-[#6a9bcc]/30 rounded-bl-none'
                        : 'bg-[#faf9f5] text-[#141413] border border-[#e8e6dc] rounded-bl-none'
                    }`}
                  >
                    {msg.isSystem && (
                      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-[#6a9bcc]/20">
                        <span className="text-sm">📋</span>
                        <span className="text-xs font-medium text-[#6a9bcc]">系统提示词</span>
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    <p className={`text-xs mt-2 ${msg.role === 'user' ? 'text-white/70' : 'text-[#b0aea5]'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="输入你的问题，我会耐心解答..."
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <Button
                onClick={handleSend}
                className="bg-[#d97757] hover:bg-[#c96847] px-6"
                disabled={!input.trim()}
              >
                发送 🚀
              </Button>
            </div>

            <p className="text-xs text-[#b0aea5] mt-3 text-center">
              💡 提示：你可以问我关于数学、科学、物理、化学、生物等学科的问题
            </p>
          </CardContent>
        </Card>

        {/* 快速开始 */}
        <Card className="border-[#e8e6dc] mt-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-[#141413]">
              💡 快速开始
            </CardTitle>
            <p className="text-sm text-[#b0aea5]">点击下面的问题开始对话</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {QUICK_QUESTIONS.map((q, index) => (
                <Card
                  key={index}
                  className="cursor-pointer hover:shadow-lg transition-all border-[#e8e6dc] hover:border-[#d97757] bg-[#faf9f5]"
                  onClick={() => handleQuickQuestion(q.content)}
                >
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-3xl mb-2">{q.icon}</div>
                      <h4 className="font-medium text-[#141413] mb-1">{q.title}</h4>
                      <p className="text-xs text-[#b0aea5] mb-2 line-clamp-2">{q.content}</p>
                      <Badge variant="outline" className="text-xs">{q.tag}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
