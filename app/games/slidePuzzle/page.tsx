'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Gamepad2, RotateCcw, Trophy, Shuffle } from 'lucide-react'

export default function SlidePuzzleGamePage() {
  const [puzzle, setPuzzle] = useState<number[]>([])
  const [gameComplete, setGameComplete] = useState(false)
  const [moveCount, setMoveCount] = useState(0)
  const [loading, setLoading] = useState(true)

  const initializePuzzle = () => {
    const newPuzzle = [1, 2, 3, 4, 5, 6, 7, 8, 0]
    shuffleArray(newPuzzle)
    setPuzzle(newPuzzle)
    setGameComplete(false)
    setMoveCount(0)
  }

  const shuffleArray = (array: number[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    if (!isSolvable(array)) {
      [array[0], array[1]] = [array[1], array[0]]
    }
  }

  const isSolvable = (puzzle: number[]) => {
    let inversions = 0
    for (let i = 0; i < puzzle.length - 1; i++) {
      for (let j = i + 1; j < puzzle.length; j++) {
        if (puzzle[i] !== 0 && puzzle[j] !== 0 && puzzle[i] > puzzle[j]) {
          inversions++
        }
      }
    }
    return inversions % 2 === 0
  }

  const isSolved = (puzzle: number[]) => {
    const solved = [1, 2, 3, 4, 5, 6, 7, 8, 0]
    return JSON.stringify(puzzle) === JSON.stringify(solved)
  }

  const getValidMoves = (emptyIndex: number) => {
    const row = Math.floor(emptyIndex / 3)
    const col = emptyIndex % 3
    const moves: number[] = []

    if (row > 0) moves.push(emptyIndex - 3)
    if (row < 2) moves.push(emptyIndex + 3)
    if (col > 0) moves.push(emptyIndex - 1)
    if (col < 2) moves.push(emptyIndex + 1)

    return moves
  }

  const moveTile = (index: number) => {
    const emptyIndex = puzzle.indexOf(0)
    const validMoves = getValidMoves(emptyIndex)

    if (validMoves.includes(index)) {
      const newPuzzle = [...puzzle]
      ;[newPuzzle[emptyIndex], newPuzzle[index]] = [newPuzzle[index], newPuzzle[emptyIndex]]
      setPuzzle(newPuzzle)
      setMoveCount(moveCount + 1)

      if (isSolved(newPuzzle)) {
        setTimeout(() => {
          setGameComplete(true)
        }, 300)
      }
    }
  }

  useEffect(() => {
    initializePuzzle()
    setLoading(false)
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
                <Gamepad2 className="w-6 h-6 text-[#788c5d]" />
                <div>
                  <CardTitle className="text-[#141413] font-['Poppins','思源黑体'] text-2xl">
                    华容道（3×3 滑块拼图）
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary" className="bg-[#788c5d]/10 text-[#788c5d]">
                      经典益智游戏
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-[#b0aea5]">移动次数</div>
                <div className="text-2xl font-bold text-[#d97757]">{moveCount}</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {gameComplete ? (
              <div className="text-center py-12">
                <div className="text-8xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-[#141413] mb-4">恭喜通关！</h3>
                <p className="text-[#b0aea5] mb-2">
                  你成功完成了华容道拼图！
                </p>
                <p className="text-[#b0aea5] mb-6">
                  总共用了 <span className="text-[#d97757] font-bold">{moveCount}</span> 步
                </p>
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={initializePuzzle}
                    className="bg-[#788c5d] hover:bg-[#697a51]"
                  >
                    <Shuffle className="w-4 h-4 mr-2" />
                    再玩一次
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <p className="text-[#141413] font-medium mb-4">
                    将数字1-8按顺序排列，空格留在右下角
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 max-w-md mx-auto mb-6">
                  {puzzle.map((value, index) => (
                    <div
                      key={index}
                      onClick={() => value !== 0 && moveTile(index)}
                      className={`
                        aspect-square rounded-lg flex items-center justify-center text-2xl font-bold cursor-pointer
                        transition-all duration-200 hover:scale-105
                        ${value === 0
                          ? 'bg-transparent cursor-default'
                          : 'bg-[#788c5d] text-white shadow-lg hover:bg-[#697a51]'
                        }
                      `}
                    >
                      {value !== 0 && value}
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={initializePuzzle}
                    variant="outline"
                    className="border-[#b0aea5] text-[#b0aea5]"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    重新洗牌
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 p-4 bg-[#faf9f5] rounded-lg border border-[#e8e6dc]">
          <h4 className="font-medium text-[#141413] mb-2">🎯 游戏规则</h4>
          <ul className="text-sm text-[#b0aea5] space-y-1">
            <li>• 点击数字方块，让它移动到空格位置</li>
            <li>• 只能移动与空格相邻的方块</li>
            <li>• 将所有数字按1-8的顺序排列即可获胜</li>
            <li>• 空位必须保持在右下角</li>
            <li>• 尽量用最少的步数完成！</li>
          </ul>
        </div>

        <div className="mt-4 p-4 bg-[#e8f4f8] rounded-lg border border-[#6a9bcc]">
          <h4 className="font-medium text-[#141413] mb-2">💡 游戏技巧</h4>
          <ul className="text-sm text-[#b0aea5] space-y-1">
            <li>• 先完成第一行和第一列</li>
            <li>• 保持最后一行和最后一列暂时不管</li>
            <li>• 逐步调整剩余的2×2区域</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
