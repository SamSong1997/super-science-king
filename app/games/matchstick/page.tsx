'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Gamepad2, RotateCcw, Trophy, Lightbulb } from 'lucide-react'

interface MatchstickGame {
  id: string
  difficulty: number
  question: string
  answer: {
    move: number[]
    action: 'add' | 'remove'
  }
  illustration: string
}

export default function MatchstickGamePage() {
  const [games, setGames] = useState<MatchstickGame[]>([])
  const [currentLevel, setCurrentLevel] = useState(0)
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null)
  const [showHint, setShowHint] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/games.json')
      .then(res => res.json())
      .then(data => {
        const matchstickGames = data.filter((g: any) => g.type === 'matchstick')
        setGames(matchstickGames)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load games:', err)
        setLoading(false)
      })
  }, [])

  const currentGame = games[currentLevel]

  const handleNumberClick = (number: number) => {
    setSelectedNumber(number)
  }

  const handleAction = (action: 'add' | 'remove') => {
    if (!selectedNumber || !currentGame) return

    const correct = currentGame.answer.action === action &&
                    currentGame.answer.move.includes(selectedNumber)

    if (correct) {
      setTimeout(() => {
        setGameComplete(true)
      }, 500)
    } else {
      setShowHint(true)
      setTimeout(() => {
        setShowHint(false)
      }, 3000)
    }
  }

  const resetGame = () => {
    setSelectedNumber(null)
    setGameComplete(false)
    setShowHint(false)
  }

  const nextLevel = () => {
    if (currentLevel < games.length - 1) {
      setCurrentLevel(currentLevel + 1)
      setSelectedNumber(null)
      setGameComplete(false)
      setShowHint(false)
    }
  }

  const prevLevel = () => {
    if (currentLevel > 0) {
      setCurrentLevel(currentLevel - 1)
      setSelectedNumber(null)
      setGameComplete(false)
      setShowHint(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen p-6 md:p-12 flex items-center justify-center">
        <p className="text-[#b0aea5]">加载中...</p>
      </div>
    )
  }

  if (games.length === 0) {
    return (
      <div className="min-h-screen p-6 md:p-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/games" className="text-[#6a9bcc] hover:underline mb-4 inline-block">
              ← 返回游戏列表
            </Link>
          </div>
          <Card className="border-[#e8e6dc]">
            <CardContent className="text-center py-12">
              <p className="text-[#b0aea5]">暂无游戏关卡</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/games" className="text-[#6a9bcc] hover:underline mb-4 inline-block">
            ← 返回游戏列表
          </Link>
        </div>

        <Card className="border-[#e8e6dc]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Gamepad2 className="w-6 h-6 text-[#d97757]" />
                <div>
                  <CardTitle className="text-[#141413] font-['Poppins','思源黑体'] text-2xl">
                    火柴棒游戏
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary" className="bg-[#d97757]/10 text-[#d97757]">
                      关卡 {currentLevel + 1} / {games.length}
                    </Badge>
                    <Badge variant="secondary" className="bg-[#788c5d]/10 text-[#788c5d]">
                      难度 {currentGame.difficulty}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <p className="text-[#141413] font-medium text-lg mb-4">{currentGame.question}</p>

              {showHint && (
                <div className="p-4 bg-[#fff3cd] border border-[#d97757] rounded-lg mb-4">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-[#d97757] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-[#141413] mb-1">💡 提示</p>
                      <p className="text-sm text-[#b0aea5]">
                        {currentGame.answer.action === 'add'
                          ? '这个等式需要添加火柴棒才能成立。仔细观察哪个数字可以添加火柴棒变成另一个数字。'
                          : '这个等式需要移除火柴棒才能成立。仔细观察哪个数字可以移除火柴棒变成另一个数字。'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {gameComplete ? (
              <div className="text-center py-12">
                <div className="text-8xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-[#141413] mb-4">恭喜通关！</h3>
                <p className="text-[#b0aea5] mb-6">
                  你成功解开了这个火柴棒谜题！
                </p>
                <div className="flex gap-4 justify-center">
                  {currentLevel < games.length - 1 && (
                    <Button
                      onClick={nextLevel}
                      className="bg-[#788c5d] hover:bg-[#697a51]"
                    >
                      <Trophy className="w-4 h-4 mr-2" />
                      下一关
                    </Button>
                  )}
                  <Button
                    onClick={resetGame}
                    variant="outline"
                    className="border-[#d97757] text-[#d97757]"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    重新挑战
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <div className="text-center mb-6">
                    <div className="text-6xl font-mono font-bold text-[#141413] mb-4 tracking-wider">
                      3 + 5 = 8
                    </div>
                    <div className="text-sm text-[#b0aea5]">
                      原始等式
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-8 mb-6">
                    <div className="text-center">
                      <div className="w-24 h-24 border-4 border-[#6a9bcc] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#6a9bcc]/5 transition-colors"
                           onClick={() => handleNumberClick(3)}>
                        <span className={`text-4xl font-bold ${selectedNumber === 3 ? 'text-[#d97757]' : 'text-[#141413]'}`}>
                          3
                        </span>
                      </div>
                      <p className="text-xs text-[#b0aea5] mt-2">左操作数</p>
                    </div>

                    <div className="text-[#141413] text-3xl font-bold">+</div>

                    <div className="text-center">
                      <div className="w-24 h-24 border-4 border-[#6a9bcc] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#6a9bcc]/5 transition-colors"
                           onClick={() => handleNumberClick(5)}>
                        <span className={`text-4xl font-bold ${selectedNumber === 5 ? 'text-[#d97757]' : 'text-[#141413]'}`}>
                          5
                        </span>
                      </div>
                      <p className="text-xs text-[#b0aea5] mt-2">右操作数</p>
                    </div>

                    <div className="text-[#141413] text-3xl font-bold">=</div>

                    <div className="text-center">
                      <div className="w-24 h-24 border-4 border-[#6a9bcc] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#6a9bcc]/5 transition-colors"
                           onClick={() => handleNumberClick(8)}>
                        <span className={`text-4xl font-bold ${selectedNumber === 8 ? 'text-[#d97757]' : 'text-[#141413]'}`}>
                          8
                        </span>
                      </div>
                      <p className="text-xs text-[#b0aea5] mt-2">结果</p>
                    </div>
                  </div>

                  {selectedNumber && (
                    <div className="text-center mb-6">
                      <p className="text-[#141413] font-medium mb-3">
                        你选择了数字 <span className="text-[#d97757] font-bold text-xl">{selectedNumber}</span>
                      </p>
                      <p className="text-sm text-[#b0aea5] mb-4">现在选择操作方式：</p>
                      <div className="flex gap-4 justify-center">
                        <Button
                          onClick={() => handleAction('add')}
                          className="bg-[#788c5d] hover:bg-[#697a51] px-8"
                        >
                          <span className="mr-2">➕</span> 添加火柴棒
                        </Button>
                        <Button
                          onClick={() => handleAction('remove')}
                          className="bg-[#d97757] hover:bg-[#c96847] px-8"
                        >
                          <span className="mr-2">➖</span> 移除火柴棒
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-[#e8e6dc] pt-6">
                  <Button
                    onClick={prevLevel}
                    disabled={currentLevel === 0}
                    variant="outline"
                    className="disabled:opacity-50"
                  >
                    上一关
                  </Button>

                  <div className="flex gap-4">
                    <Button
                      onClick={resetGame}
                      variant="outline"
                      className="border-[#b0aea5] text-[#b0aea5]"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      重置
                    </Button>
                  </div>

                  <Button
                    onClick={nextLevel}
                    disabled={currentLevel === games.length - 1}
                    variant="outline"
                    className="disabled:opacity-50"
                  >
                    下一关
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 p-4 bg-[#faf9f5] rounded-lg border border-[#e8e6dc]">
          <h4 className="font-medium text-[#141413] mb-2">🎯 游戏规则</h4>
          <ul className="text-sm text-[#b0aea5] space-y-1">
            <li>• 点击等式中的数字，选择你要操作的数字</li>
            <li>• 选择后点击"添加火柴棒"或"移除火柴棒"</li>
            <li>• 正确操作后等式将成立，游戏通关</li>
            <li>• 提示：观察数字如何通过添加或移除火柴棒变成其他数字</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
