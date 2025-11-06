'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { GameLevel } from '@/types'

export default function GamesPage() {
  const [games, setGames] = useState<GameLevel[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPuzzles() {
      try {
        const response = await fetch('/api/puzzles?limit=30&includeCheckpoints=1')
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data?.error ?? '加载互动题失败')
        }
        // 显示华容道和扫雷游戏
        const allowedTypes = ['SLIDE_PUZZLE', 'LOGIC_PUZZLE']
        const filteredGames = Array.isArray(data) 
          ? data.filter((game: GameLevel) => allowedTypes.includes(game.type))
          : []

        setGames(filteredGames)
      } catch (error) {
        console.error('Failed to load interactive puzzles:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPuzzles()
  }, [])

  const gameTypes = {
    SLIDE_PUZZLE: { name: '华容道智力挑战', icon: '🧩', color: 'bg-[#6a9bcc]/10' },
    LOGIC_PUZZLE: { name: '扫雷大师', icon: '💣', color: 'bg-[#d97757]/10' },
  }

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
          知识闯关游戏
        </h1>
        <p className="text-[#b0aea5] mb-8">华容道智力挑战、扫雷大师，训练逻辑推理和策略规划能力</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map(game => {
            const typeInfo = gameTypes[game.type] ?? {
              name: '互动挑战',
              icon: '🎮',
              color: 'bg-[#e8e6dc]',
            }

            return (
              <Link key={game.id} href={`/games/interactive/${game.id}`}>
                <Card className="h-full hover:shadow-lg transition-all cursor-pointer border-[#e8e6dc]">
                  <CardHeader>
                    <div className="w-full h-48 rounded-md mb-4 overflow-hidden">
                      <img
                        src={
                          game.previewImage ??
                          'https://images.unsplash.com/photo-1542751110-97427bbecf20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=300&q=80'
                        }
                        alt={game.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardTitle className="text-[#141413] font-['Poppins','思源黑体']">
                      {game.title}
                    </CardTitle>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="secondary" className={typeInfo.color}>
                        {typeInfo.name}
                      </Badge>
                      <Badge variant="secondary" className="bg-[#b0aea5]/10 text-[#141413]">
                        难度 {game.difficulty}
                      </Badge>
                      {game.gradeBand && (
                        <Badge variant="outline" className="border-[#e8e6dc] text-[#141413]">
                          {game.gradeBand}
                        </Badge>
                      )}
                    </div>
                    {game.knowledgeTags && game.knowledgeTags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {game.knowledgeTags.slice(0, 3).map(tag => (
                          <Badge key={`${game.id}-${tag}`} variant="outline" className="border-[#e8e6dc] text-[#141413]">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardHeader>
                </Card>
              </Link>
            )
          })}
        </div>
        {games.length === 0 && (
          <Card className="border-[#e8e6dc] mt-6">
            <CardContent className="py-10 text-center text-[#b0aea5]">
              暂无互动关卡可用，请稍后刷新。
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
