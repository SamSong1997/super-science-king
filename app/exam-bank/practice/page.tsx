'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ExamQuestion } from '@/types'

function PracticeContent() {
  const searchParams = useSearchParams()
  const [questions, setQuestions] = useState<ExamQuestion[]>([])
  const [current, setCurrent] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [showAnswer, setShowAnswer] = useState(false)
  const [loading, setLoading] = useState(true)

  const subject = searchParams.get('subject') || '数学'
  const grade = searchParams.get('grade') || '6'

  useEffect(() => {
    fetch('/data/exam-bank.json')
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter((q: ExamQuestion) => q.subject === subject && q.grade === parseInt(grade))
        setQuestions(filtered)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load questions:', err)
        setLoading(false)
      })
  }, [subject, grade])

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer)
  }

  const handleCheck = () => {
    setShowAnswer(true)
  }

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1)
      setSelectedAnswer('')
      setShowAnswer(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen p-6 md:p-12 flex items-center justify-center">
        <p className="text-[#b0aea5]">加载中...</p>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen p-6 md:p-12 flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#b0aea5] mb-4">暂无题目</p>
          <Link href="/exam-bank">
            <Button variant="outline">返回题库</Button>
          </Link>
        </div>
      </div>
    )
  }

  const question = questions[current]

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/exam-bank" className="text-[#6a9bcc] hover:underline">
            ← 返回题库
          </Link>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <div className="flex gap-2">
              <Badge className="bg-[#6a9bcc]">{subject}</Badge>
              <Badge className="bg-[#d97757]">{grade}年级</Badge>
            </div>
            <span className="text-[#b0aea5] text-sm">{current + 1} / {questions.length}</span>
          </div>
          <div className="w-full bg-[#e8e6dc] rounded-full h-2">
            <div className="bg-[#d97757] h-2 rounded-full transition-all" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
          </div>
        </div>

        <Card className="border-[#e8-6dc]">
          <CardHeader>
            <CardTitle className="text-[#141413] font-['Poppins','思源黑体']">
              第 {current + 1} 题
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#141413] mb-6">{question.question}</p>

            {question.type === 'choice' && question.options && (
              <div className="space-y-3 mb-6">
                {question.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedAnswer === option ? 'default' : 'outline'}
                    className="w-full justify-start"
                    onClick={() => !showAnswer && handleAnswer(option)}
                    disabled={showAnswer}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            )}

            {showAnswer && (
              <div className="mb-6 p-4 bg-[#faf9f5] rounded-md border border-[#e8e6dc]">
                <p className="text-[#141413] font-medium mb-2">正确答案：{question.answer}</p>
                <p className="text-[#b0aea5] text-sm">{question.explanation}</p>
              </div>
            )}

            <div className="flex gap-4">
              {!showAnswer ? (
                <Button
                  onClick={handleCheck}
                  disabled={!selectedAnswer}
                  className="bg-[#d97757] hover:bg-[#c96847]"
                >
                  检查答案
                </Button>
              ) : (
                <>
                  {current < questions.length - 1 ? (
                    <Button onClick={handleNext} className="bg-[#d97757] hover:bg-[#c96847]">
                      下一题
                    </Button>
                  ) : (
                    <Link href="/exam-bank">
                      <Button className="bg-[#d97757] hover:bg-[#c96847]">
                        完成练习
                      </Button>
                    </Link>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => alert('AI智能批改功能')}
                  >
                    AI智能批改
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function PracticePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen p-6 md:p-12 flex items-center justify-center">
        <p className="text-[#b0aea5]">加载中...</p>
      </div>
    }>
      <PracticeContent />
    </Suspense>
  )
}
