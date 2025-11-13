'use client'

import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Demo 静态数据 - 不依赖数据库
const DEMO_GAMES = [
  {
    id: '1',
    title: '华容道 - 初级挑战',
    type: 'SLIDE_PUZZLE',
    difficulty: 1,
    gradeBand: '小学3-4年级',
    knowledgeTags: ['空间思维', '策略规划', '逻辑推理'],
    previewImage: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400&h=300&fit=crop',
  },
  {
    id: '2',
    title: '华容道 - 中级挑战',
    type: 'SLIDE_PUZZLE',
    difficulty: 2,
    gradeBand: '小学5-6年级',
    knowledgeTags: ['空间思维', '策略规划', '问题解决'],
    previewImage: 'https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=400&h=300&fit=crop',
  },
  {
    id: '3',
    title: '华容道 - 高级挑战',
    type: 'SLIDE_PUZZLE',
    difficulty: 3,
    gradeBand: '初中7-9年级',
    knowledgeTags: ['空间思维', '算法思维', '优化策略'],
    previewImage: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=400&h=300&fit=crop',
  },
  {
    id: '4',
    title: '扫雷大师 - 入门关',
    type: 'LOGIC_PUZZLE',
    difficulty: 1,
    gradeBand: '小学3-4年级',
    knowledgeTags: ['逻辑推理', '数字分析', '概率思维'],
    previewImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop',
  },
  {
    id: '5',
    title: '扫雷大师 - 进阶关',
    type: 'LOGIC_PUZZLE',
    difficulty: 2,
    gradeBand: '小学5-6年级',
    knowledgeTags: ['逻辑推理', '模式识别', '风险评估'],
    previewImage: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=300&fit=crop',
  },
  {
    id: '6',
    title: '扫雷大师 - 专家关',
    type: 'LOGIC_PUZZLE',
    difficulty: 3,
    gradeBand: '初中7-9年级',
    knowledgeTags: ['逻辑推理', '概率计算', '决策分析'],
    previewImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop',
  },
]

export default function GamesPage() {
  const games = DEMO_GAMES

  const gameTypes: Record<string, { name: string; icon: string; color: string }> = {
    SLIDE_PUZZLE: { name: '华容道智力挑战', icon: '🧩', color: 'bg-[#6a9bcc]/10' },
    LOGIC_PUZZLE: { name: '扫雷大师', icon: '💣', color: 'bg-[#d97757]/10' },
  }

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-[#141413] mb-2 font-['Poppins','思源黑体']">
          知识闯关游戏
        </h1>
        <p className="text-[#b0aea5] mb-8">华容道智力挑战、扫雷大师，训练逻辑推理和策略规划能力</p>

        {/* Demo 提示 */}
        <div className="mb-6 p-4 bg-[#788c5d]/10 rounded-lg border border-[#788c5d]/20">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎮</span>
            <p className="text-sm text-[#141413]">
              <strong>Demo 展示</strong> - 互动游戏功能即将上线，敬请期待
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map(game => {
            const typeInfo = gameTypes[game.type] ?? {
              name: '互动挑战',
              icon: '🎮',
              color: 'bg-[#e8e6dc]',
            }

            return (
              <div key={game.id} className="relative">
                <Card className="h-full hover:shadow-lg transition-all border-[#e8e6dc]">
                  <CardHeader>
                    <div className="w-full h-48 rounded-md mb-4 overflow-hidden relative">
                      <img
                        src={game.previewImage}
                        alt={game.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      {/* 敬请期待标签 */}
                      <div className="absolute top-2 right-2 bg-[#d97757] text-white text-xs px-2 py-1 rounded-full">
                        敬请期待
                      </div>
                    </div>
                    <CardTitle className="text-[#141413] font-['Poppins','思源黑体']">
                      {game.title}
                    </CardTitle>
                    <div className="flex gap-2 mt-2 flex-wrap">
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
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
