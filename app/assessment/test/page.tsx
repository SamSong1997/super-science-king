'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const questions = [
  {
    id: 1,
    type: 'choice',
    category: '坐标几何',
    text: '平面图上，点A和点B（5,3）在同一行上，点A又与点C（3,4）在同一列，那么点A的位置是（　　）。',
    options: ['A. (5,3)', 'B. (5,4)', 'C. (3,3)', 'D. (3,4)'],
    correctAnswer: 'C. (3,3)'
  },
  // 分数加减运算题
  {
    id: 2,
    type: 'judgment',
    category: '分数运算',
    text: '12.5×1.5+6.5=12.5×（1.5+6.5）=100',
    correctAnswer: false
  },
  {
    id: 3,
    type: 'fill',
    category: '分数运算',
    text: '根据32.5÷26=1.25，直接写出下面各题的得数。',
    subQuestions: [
      { text: '32.5÷2.6=（　　）', correctAnswer: '12.5' },
      { text: '3.25÷2.6=（　　）', correctAnswer: '1.25' },
      { text: '2.6×12.5=（　　）', correctAnswer: '32.5' }
    ]
  },
  // 添加更多基础测评题目
  {
    id: 4,
    type: 'choice',
    category: '逻辑推理',
    text: '观察规律：○△○△○△？下一个图形应该是什么？',
    options: ['○', '△', '◇', '□'],
    correctAnswer: '○'
  },
  {
    id: 5,
    type: 'choice',
    category: '几何图形',
    text: '一个正方体有几个面？',
    options: ['4个', '6个', '8个', '12个'],
    correctAnswer: '6个'
  },
  {
    id: 6,
    type: 'judgment',
    category: '数学概念',
    text: '所有的偶数都能被2整除。',
    correctAnswer: true
  },
  {
    id: 7,
    type: 'choice',
    category: '计算能力',
    text: '计算：25×4×8=？',
    options: ['800', '900', '1000', '1200'],
    correctAnswer: '800'
  },
  {
    id: 8,
    type: 'judgment',
    category: '分数概念',
    text: '1/2 大于 1/3。',
    correctAnswer: true
  },
  {
    id: 9,
    type: 'choice',
    category: '应用题',
    text: '小明有15个苹果，吃了3个，又买了8个，现在有多少个苹果？',
    options: ['18个', '20个', '23个', '26个'],
    correctAnswer: '20个'
  },
  {
    id: 10,
    type: 'judgment',
    category: '几何概念',
    text: '三角形的内角和等于180度。',
    correctAnswer: true
  },
  {
    id: 11,
    type: 'choice',
    category: '数字规律',
    text: '找规律：2, 4, 8, 16, ？',
    options: ['24', '28', '32', '36'],
    correctAnswer: '32'
  },
  {
    id: 12,
    type: 'judgment',
    category: '运算法则',
    text: '乘法交换律：a×b = b×a',
    correctAnswer: true
  },
  {
    id: 13,
    type: 'choice',
    category: '单位换算',
    text: '1米等于多少厘米？',
    options: ['10厘米', '100厘米', '1000厘米', '10000厘米'],
    correctAnswer: '100厘米'
  },
  {
    id: 14,
    type: 'judgment',
    category: '比较大小',
    text: '0.5 = 1/2',
    correctAnswer: true
  },
  {
    id: 15,
    type: 'choice',
    category: '图形面积',
    text: '边长为4厘米的正方形，面积是多少？',
    options: ['8平方厘米', '12平方厘米', '16平方厘米', '20平方厘米'],
    correctAnswer: '16平方厘米'
  },
  {
    id: 16,
    type: 'judgment',
    category: '数学运算',
    text: '5 + 3 × 2 = 16',
    correctAnswer: false
  },
  {
    id: 17,
    type: 'choice',
    category: '时间计算',
    text: '从上午9:30到下午2:15，经过了多少时间？',
    options: ['4小时15分钟', '4小时45分钟', '5小时15分钟', '5小时45分钟'],
    correctAnswer: '4小时45分钟'
  },
  {
    id: 18,
    type: 'judgment',
    category: '分数运算',
    text: '1/4 + 1/4 = 1/2',
    correctAnswer: true
  },
  {
    id: 19,
    type: 'choice',
    category: '百分数',
    text: '50%等于多少？',
    options: ['0.5', '5', '50', '500'],
    correctAnswer: '0.5'
  },
  {
    id: 20,
    type: 'choice',
    category: '概率统计',
    text: '从装有99个红球、5个蓝球和1个白球的袋子中任意摸出一个球，下列说法错误的是（　　）。',
    options: ['A. 不一定是红球', 'B. 可能是蓝球', 'C. 不可能是白球'],
    correctAnswer: 'C. 不可能是白球'
  },
  {
    id: 21,
    type: 'choice',
    category: '逻辑思维',
    text: '小华、小明、小红三人比赛跑步。已知小华比小明跑得快，小明比小红跑得快，那么跑得最快的是（　　）。',
    options: ['A. 小华', 'B. 小明', 'C. 小红', 'D. 无法确定'],
    correctAnswer: 'A. 小华'
  }
]

export default function TestPage() {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<any[]>([])

  const handleAnswer = (answer: any) => {
    const newAnswers = [...answers]
    newAnswers[current] = answer
    setAnswers(newAnswers)
  }



  const handleFillAnswer = (index: number, value: string) => {
    const newAnswers = [...answers]
    if (!newAnswers[current]) {
      newAnswers[current] = {}
    }
    newAnswers[current][index] = value
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1)
    }
  }

  const handleSubmit = () => {
    alert(`测评完成！您已完成 ${questions.length} 道题`)
  }

  const isAnswered = () => {
    const currentQuestion = questions[current]
    const currentAnswer = answers[current]
    
    if (currentQuestion.type === 'choice') {
      return typeof currentAnswer === 'string' && currentAnswer.length > 0
    }
    
    if (currentQuestion.type === 'judgment') {
      // 判断题：只要选择了true或false就算已回答
      return currentAnswer === true || currentAnswer === false
    }
    
    if (currentQuestion.type === 'fill' && currentQuestion.subQuestions) {
      return currentQuestion.subQuestions.every((_: any, index: number) => 
        currentAnswer && currentAnswer[index] && currentAnswer[index].trim().length > 0
      )
    }
    
    return false
  }

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/assessment" className="text-[#6a9bcc] hover:underline">
            ← 返回测评首页
          </Link>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[#b0aea5] text-sm">测评进度</span>
            <span className="text-[#b0aea5] text-sm">{current + 1} / {questions.length} 题</span>
          </div>
          <div className="w-full bg-[#e8e6dc] rounded-full h-2">
            <div className="bg-[#d97757] h-2 rounded-full transition-all" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
          </div>
          <div className="flex justify-between items-center mt-2 text-xs text-[#b0aea5]">
            <span>已答题：{answers.filter(a => a !== undefined).length} 题</span>
            <span>剩余：{questions.length - current - 1} 题</span>
          </div>
        </div>

        <Card className="border-[#e8e6dc]">
          <CardHeader>
            <CardTitle className="text-[#141413] font-['Poppins','思源黑体'] flex items-center gap-2">
              <span className="text-2xl">
                {questions[current].type === 'choice' ? '📝' : 
                 questions[current].type === 'judgment' ? '⚖️' : '✏️'}
              </span>
              第 {current + 1} 题
              <span className="text-sm font-normal text-[#b0aea5]">
                [{questions[current].category}]
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#141413] mb-6 leading-relaxed">{questions[current].text}</p>

            {/* 选择题 */}
            {questions[current].type === 'choice' && (
              <div className="space-y-3">
                {questions[current].options?.map((option, index) => (
                  <Button
                    key={index}
                    variant={answers[current] === option ? 'default' : 'outline'}
                    className="w-full justify-start text-left h-auto py-3 px-4"
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            )}

            {/* 判断题 */}
            {questions[current].type === 'judgment' && (
              <div className="space-y-3">
                <Button
                  variant={answers[current] === true ? 'default' : 'outline'}
                  className={`w-full justify-start ${
                    answers[current] === true 
                      ? 'bg-[#788c5d] hover:bg-[#6b7d52] text-white' 
                      : 'bg-[#788c5d]/10 hover:bg-[#788c5d]/20 text-[#788c5d]'
                  }`}
                  onClick={() => handleAnswer(true)}
                >
                  ✓ 正确
                </Button>
                <Button
                  variant={answers[current] === false ? 'default' : 'outline'}
                  className={`w-full justify-start ${
                    answers[current] === false 
                      ? 'bg-[#d97757] hover:bg-[#c96847] text-white' 
                      : 'bg-[#d97757]/10 hover:bg-[#d97757]/20 text-[#d97757]'
                  }`}
                  onClick={() => handleAnswer(false)}
                >
                  ✗ 错误
                </Button>
              </div>
            )}

            {/* 填空题 */}
            {questions[current].type === 'fill' && questions[current].subQuestions && (
              <div className="space-y-4">
                {questions[current].subQuestions.map((subQ: any, index: number) => (
                  <div key={index} className="p-4 bg-[#faf9f5] rounded-lg border border-[#e8e6dc]">
                    <p className="text-[#141413] mb-2">{subQ.text}</p>
                    <input
                      type="text"
                      className="w-full p-2 border border-[#e8e6dc] rounded-md focus:outline-none focus:ring-2 focus:ring-[#d97757]/20"
                      placeholder="请输入答案"
                      value={answers[current]?.[index] || ''}
                      onChange={(e) => handleFillAnswer(index, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-4 mt-6">
              <Button
                variant="outline"
                onClick={() => setCurrent(Math.max(0, current - 1))}
                disabled={current === 0}
              >
                上一题
              </Button>
              {current < questions.length - 1 ? (
                <Button
                  onClick={handleNext}
                  className="bg-[#d97757] hover:bg-[#c96847]"
                  disabled={!isAnswered()}
                >
                  下一题
                </Button>
              ) : (
                <Link href="/assessment/report" className="flex-1">
                  <Button
                    onClick={handleSubmit}
                    className="w-full bg-[#d97757] hover:bg-[#c96847]"
                    disabled={!isAnswered()}
                  >
                    提交测评
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
