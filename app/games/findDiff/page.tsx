'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Gamepad2, RotateCcw, Trophy } from 'lucide-react'

interface DiffPoint {
  x: number
  y: number
}

interface GameLevel {
  id: string
  difficulty: number
  question: string
  answer: DiffPoint[]
  illustration: string
}

export default function FindDiffGamePage() {
  const [games, setGames] = useState<GameLevel[]>([])
  const [currentLevel, setCurrentLevel] = useState(0)
  const [foundDiffs, setFoundDiffs] = useState<DiffPoint[]>([])
  const [gameComplete, setGameComplete] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/games.json')
      .then(res => res.json())
      .then(data => {
        const findDiffGames = data.filter((g: any) => g.type === 'findDiff')
        setGames(findDiffGames)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load games:', err)
        setLoading(false)
      })
  }, [])

  const handleImageClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const currentGame = games[currentLevel]
    if (!currentGame || foundDiffs.length >= currentGame.answer.length) return

    const tolerance = 30
    const isCorrect = currentGame.answer.some(point => {
      const distance = Math.sqrt(Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2))
      return distance <= tolerance && !foundDiffs.some(found =>
        Math.sqrt(Math.pow(found.x - point.x, 2) + Math.pow(found.y - point.y, 2)) <= tolerance
      )
    })

    if (isCorrect) {
      const clickedPoint = currentGame.answer.find(point => {
        const distance = Math.sqrt(Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2))
        return distance <= tolerance
      })

      if (clickedPoint) {
        setFoundDiffs([...foundDiffs, clickedPoint])

        if (foundDiffs.length + 1 >= currentGame.answer.length) {
          setTimeout(() => {
            setGameComplete(true)
          }, 500)
        }
      }
    }
  }

  const resetGame = () => {
    setFoundDiffs([])
    setGameComplete(false)
  }

  const nextLevel = () => {
    if (currentLevel < games.length - 1) {
      setCurrentLevel(currentLevel + 1)
      setFoundDiffs([])
      setGameComplete(false)
    }
  }

  const prevLevel = () => {
    if (currentLevel > 0) {
      setCurrentLevel(currentLevel - 1)
      setFoundDiffs([])
      setGameComplete(false)
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

  const currentGame = games[currentLevel]

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link href="/games" className="text-[#6a9bcc] hover:underline mb-4 inline-block">
            ← 返回游戏列表
          </Link>
        </div>

        <Card className="border-[#e8e6dc]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Gamepad2 className="w-6 h-6 text-[#6a9bcc]" />
                <div>
                  <CardTitle className="text-[#141413] font-['Poppins','思源黑体'] text-2xl">
                    找不同游戏
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary" className="bg-[#6a9bcc]/10 text-[#6a9bcc]">
                      关卡 {currentLevel + 1} / {games.length}
                    </Badge>
                    <Badge variant="secondary" className="bg-[#d97757]/10 text-[#d97757]">
                      难度 {currentGame.difficulty}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-[#b0aea5]">已找到</div>
                <div className="text-2xl font-bold text-[#d97757]">
                  {foundDiffs.length} / {currentGame.answer.length}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-[#141413] font-medium">{currentGame.question}</p>
            </div>

            {gameComplete ? (
              <div className="text-center py-12">
                <div className="text-8xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-[#141413] mb-4">恭喜通关！</h3>
                <p className="text-[#b0aea5] mb-6">
                  你成功找到了所有 {currentGame.answer.length} 个差异点！
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
                    className="border-[#6a9bcc] text-[#6a9bcc]"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    重新开始
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-sm text-[#b0aea5] mb-2 text-center">原图</p>
                    <div
                      className="relative w-full h-80 bg-[#e8e6dc] rounded-lg overflow-hidden cursor-crosshair border-2 border-[#b0aea5]"
                      onClick={handleImageClick}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#faf9f5] to-white flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-6xl mb-4">🖼️</div>
                          <p className="text-[#b0aea5] text-sm">点击图片查找差异</p>
                          <p className="text-[#b0aea5] text-xs mt-2">
                            提示：点击位置需要准确
                          </p>
                        </div>
                      </div>
                      {foundDiffs.map((diff, index) => (
                        <div
                          key={index}
                          className="absolute w-8 h-8 border-4 border-[#d97757] rounded-full animate-pulse"
                          style={{
                            left: `${diff.x - 16}px`,
                            top: `${diff.y - 16}px`,
                          }}
                        >
                          <div className="absolute inset-0 bg-[#d97757]/20 rounded-full animate-ping"></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-[#b0aea5] mb-2 text-center">对比图</p>
                    <div className="relative w-full h-80 bg-[#e8e6dc] rounded-lg overflow-hidden border-2 border-[#b0aea5]">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#faf9f5] to-white flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-6xl mb-4">🔍</div>
                          <p className="text-[#b0aea5] text-sm">仔细观察差异</p>
                        </div>
                      </div>
                      {currentGame.answer.map((diff, index) => (
                        <div
                          key={index}
                          className={`absolute w-8 h-8 rounded-full ${
                            foundDiffs.some(f =>
                              Math.sqrt(Math.pow(f.x - diff.x, 2) + Math.pow(f.y - diff.y, 2)) <= 30
                            )
                              ? 'border-4 border-[#788c5d]'
                              : 'border-2 border-[#b0aea5] border-dashed'
                          }`}
                          style={{
                            left: `${diff.x - 16}px`,
                            top: `${diff.y - 16}px`,
                          }}
                        >
                          {foundDiffs.some(f =>
                            Math.sqrt(Math.pow(f.x - diff.x, 2) + Math.pow(f.y - diff.y, 2)) <= 30
                          ) && (
                            <div className="absolute inset-0 bg-[#788c5d]/20 rounded-full"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
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
      </div>
    </div>
  )
}
