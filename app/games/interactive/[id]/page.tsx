'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Loader2, ArrowLeft, RefreshCw, Sparkles } from 'lucide-react'

import type { InteractivePuzzle } from '@/types'


interface PuzzleDetail extends InteractivePuzzle {
  checkpoints?: Array<{
    id: string
    title: string
    slug: string
    order: number
  }>
  targetState?: any
  solution?: any
}

const DEMO_EMAIL = 'demo.student@example.com'

// 简单的数学公式渲染组件
function MathRenderer({ text }: { text: string }) {
  // 替换常见的LaTeX格式为HTML
  const renderedText = text
    // 处理 \frac{a}{b} 格式
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '<span class="fraction"><span class="numerator">$1</span><span class="denominator">$2</span></span>')
    // 移除其他LaTeX包装符
    .replace(/\\\(|\\\)/g, '')
    .replace(/\$|\$|\\\(|\\\)|\\\[|\\\]/g, '')

  return (
    <span dangerouslySetInnerHTML={{ __html: renderedText }} />
  )
}

function arraysEqual(a: string[][], b: string[][]): boolean {
  return JSON.stringify(a) === JSON.stringify(b)
}

function FractionInput({
  expectedAnswer,
  explanation,
  onComplete,
}: {
  expectedAnswer: string
  explanation?: string
  onComplete: (solved: boolean) => void
}) {
  const [value, setValue] = useState('')
  const [feedback, setFeedback] = useState<string | null>(null)
  const [attempts, setAttempts] = useState(0)

  function normalizeFraction(input: string) {
    const trimmed = input.trim()
    if (!trimmed) return null

    if (trimmed.includes('/')) {
      const [numerator, denominator] = trimmed.split('/').map(part => Number(part.trim()))
      if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator === 0) {
        return null
      }
      return numerator / denominator
    }

    const numeric = Number(trimmed)
    if (!Number.isFinite(numeric)) return null
    return numeric
  }

  const expectedValue = useMemo(() => normalizeFraction(expectedAnswer), [expectedAnswer])

  function handleSubmit() {
    setAttempts(prev => prev + 1)
    const parsed = normalizeFraction(value)
    if (parsed === null || expectedValue === null) {
      setFeedback('请填写合法的分数或小数格式，例如 29/24')
      return
    }

    const isCorrect = Math.abs(parsed - expectedValue) < 1e-6
    if (isCorrect) {
      setFeedback('回答正确，继续保持！')
      onComplete(true)
    } else {
      setFeedback('还差一点点，再检查一次通分与计算步骤。')
      onComplete(false)
    }
  }

  return (
    <Card className="border-[#e8e6dc]">
      <CardHeader>
        <CardTitle className="text-[#141413]">请输入最终结果</CardTitle>
        <p className="text-sm text-[#b0aea5]">
          支持分数（如 29/24）或小数（保留三位以内），计算完成后点击提交。
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <input
          value={value}
          onChange={event => setValue(event.target.value)}
          placeholder="29/24"
          className="w-full border border-[#e8e6dc] rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#6a9bcc]"
        />
        <Button className="w-full bg-[#6a9bcc] hover:bg-[#5a8bb4]" onClick={handleSubmit}>
          提交答案
        </Button>
        {feedback && (
          <p className="text-sm text-[#d97757] bg-[#d97757]/10 border border-[#d97757]/20 rounded-md px-4 py-3">
            {feedback}
          </p>
        )}
        {attempts > 0 && explanation && (
          <div className="text-sm text-[#141413] bg-[#faf9f5] border border-[#e8e6dc] rounded-md px-4 py-3">
            <p className="font-medium mb-1">解题提示：</p>
            <p className="text-[#6a9bcc] whitespace-pre-line">{explanation}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}



function SlidePuzzleRunner({
  puzzle,
  onComplete,
  onResetStart,
}: {
  puzzle: PuzzleDetail
  onComplete: (payload: { solved: boolean; moves: number; snapshot?: unknown }) => void
  onResetStart: () => void
}) {
  const initialBoard =
    (puzzle.initialState?.board as string[][] | undefined) ??
    []

  const targetBoard =
    (puzzle.targetState?.board as string[][] | undefined) ??
    []

  const [board, setBoard] = useState(initialBoard)
  const [moves, setMoves] = useState(0)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy')
  
  // 根据难度设置最大步数
  const maxSteps = {
    easy: 20,
    medium: 15,
    hard: 12
  }[difficulty]
  
  const currentMaxSteps = maxSteps

  useEffect(() => {
    setBoard(initialBoard)
    setMoves(0)
    setFeedback(null)
  }, [puzzle.id])

  function findHolePosition(current: string[][]) {
    for (let row = 0; row < current.length; row += 1) {
      for (let col = 0; col < current[row].length; col += 1) {
        if (current[row][col] === 'hole') {
          return { row, col }
        }
      }
    }
    return { row: 2, col: 2 }
  }

  function handleMove(row: number, col: number) {
    const { row: holeRow, col: holeCol } = findHolePosition(board)
    const isAdjacent =
      (row === holeRow && Math.abs(col - holeCol) === 1) ||
      (col === holeCol && Math.abs(row - holeRow) === 1)

    if (!isAdjacent) {
      setFeedback('只能移动与空格相邻的武将哦。')
      return
    }

    const newMoves = moves + 1
    
    // 检查是否超过最大步数
    if (newMoves > currentMaxSteps) {
      setFeedback(`超过${difficulty}难度的最大步数限制(${currentMaxSteps}步)！请重置游戏或选择更简单的难度。`)
      return
    }

    const nextBoard = board.map(rowItems => [...rowItems])
    nextBoard[holeRow][holeCol] = board[row][col]
    nextBoard[row][col] = 'hole'
    setBoard(nextBoard)
    setMoves(newMoves)
    setFeedback(null)

    // 检查是否达成目标
    if (arraysEqual(nextBoard, targetBoard)) {
      const isOptimal = newMoves <= (puzzle.solution?.optimalSteps || 1)
      setFeedback(`🎉 恭喜通关！用了${newMoves}步完成${difficulty}难度挑战！${isOptimal ? '达到最优步数！' : ''}`)
      onComplete({
        solved: true,
        moves: newMoves,
        snapshot: {
          board: nextBoard,
          difficulty,
          isOptimal
        },
      })
    } else if (newMoves >= currentMaxSteps * 0.8) {
      setFeedback(`提醒：还剩${currentMaxSteps - newMoves}步，请仔细规划路线！`)
    }
  }

  function resetPuzzle() {
    setBoard(initialBoard)
    setMoves(0)
    setFeedback(null)
    onResetStart()
  }
  
  function changeDifficulty(newDifficulty: 'easy' | 'medium' | 'hard') {
    setDifficulty(newDifficulty)
    resetPuzzle()
  }

  return (
    <Card className="border-[#e8e6dc]">
      <CardHeader>
        <CardTitle className="text-[#141413]">华容道 - 三国名将</CardTitle>
        <p className="text-sm text-[#b0aea5]">
          点击与空格相邻的三国名将移动。目标：将所有武将按正确顺序排列，曹操在中间位置，空格在右下角！
        </p>
        
        {/* 难度选择 */}
        <div className="flex gap-2 mt-4">
          <span className="text-sm text-[#b0aea5] self-center">难度：</span>
          {(['easy', 'medium', 'hard'] as const).map((level) => (
            <Button
              key={level}
              variant={difficulty === level ? 'default' : 'outline'}
              size="sm"
              onClick={() => changeDifficulty(level)}
              className={difficulty === level ? 'bg-[#6a9bcc]' : ''}
            >
              {level === 'easy' ? '简单(20步)' : level === 'medium' ? '中等(15步)' : '困难(12步)'}
            </Button>
          ))}
        </div>
        
        {/* 目标状态显示 */}
        <div className="mt-4 p-3 bg-[#faf9f5] rounded-lg border border-[#e8e6dc]">
          <p className="text-sm text-[#b0aea5] mb-2">目标布局：</p>
          <div className="grid grid-cols-3 gap-1 max-w-32 mx-auto">
            {targetBoard.map((row, rowIndex) =>
              row.map((value, colIndex) => (
                <div
                  key={`target-${rowIndex}-${colIndex}`}
                  className={`h-8 text-xs rounded flex items-center justify-center ${
                    value === 'hole' 
                      ? 'border border-dashed border-[#e8e6dc] bg-white' 
                      : 'bg-[#6a9bcc]/20 text-[#6a9bcc] border border-[#6a9bcc]/30'
                  }`}
                >
                  {value === 'hole' ? '' : value}
                </div>
              ))
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
          {board.map((row, rowIndex) =>
            row.map((value, colIndex) => {
              if (value === 'hole') {
                return (
                  <div
                    key={`cell-${rowIndex}-${colIndex}`}
                    className="h-20 rounded-lg border-2 border-dashed border-[#e8e6dc] bg-[#faf9f5]"
                  />
                )
              }

              return (
                <button
                  key={`cell-${rowIndex}-${colIndex}`}
                  onClick={() => handleMove(rowIndex, colIndex)}
                  className="h-20 rounded-lg bg-[#6a9bcc] text-white text-2xl font-semibold shadow-sm hover:bg-[#5a8bb4] transition-colors"
                >
                  {value}
                </button>
              )
            }),
          )}
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-[#141413]">已移动：{moves}/{currentMaxSteps} 步</span>
        </div>
        
        {/* 进度条 */}
        <div className="w-full bg-[#e8e6dc] rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all ${
              moves > currentMaxSteps * 0.8 ? 'bg-[#d97757]' : 'bg-[#6a9bcc]'
            }`}
            style={{ width: `${Math.min((moves / currentMaxSteps) * 100, 100)}%` }}
          />
        </div>

        {feedback && (
          <div className="rounded-md border border-[#d97757]/30 bg-[#d97757]/10 px-4 py-3 text-[#d97757] text-sm">
            {feedback}
          </div>
        )}

        <div className="flex justify-end">
          <Button variant="outline" className="border-[#b0aea5] text-[#b0aea5]" onClick={resetPuzzle}>
            <RefreshCw className="w-4 h-4 mr-2" />
            重置关卡
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function FunctionGraphRunner({
  puzzle,
  onComplete,
}: {
  puzzle: PuzzleDetail
  onComplete: (payload: { solved: boolean; moves: number; snapshot?: unknown }) => void
}) {
  const points =
    (puzzle.initialState?.points as Array<{ x: number; y: number }> | undefined) ?? []
  const expected =
    (puzzle.targetState?.answer as boolean[] | undefined) ??
    (puzzle.solution?.answer as boolean[] | undefined) ??
    []

  const [answers, setAnswers] = useState<(boolean | null)[]>(points.map(() => null))
  const [feedback, setFeedback] = useState<string | null>(null)

  useEffect(() => {
    setAnswers(points.map(() => null))
    setFeedback(null)
  }, [puzzle.id])

  function submit() {
    if (answers.includes(null)) {
      setFeedback('所有点都需要选择“在”或“不在”才能提交。')
      return
    }

    const solved = answers.every((value, index) => value === expected[index])
    if (solved) {
      setFeedback('全部判断正确！')
    } else {
      setFeedback('还有点位判断错误，再检查一次函数解析式。')
    }
    onComplete({
      solved,
      moves: answers.filter(value => value !== null).length,
      snapshot: { answers },
    })
  }

  return (
    <Card className="border-[#e8e6dc]">
      <CardHeader>
        <CardTitle className="text-[#141413]">点与一次函数图像的关系</CardTitle>
        <p className="text-sm text-[#b0aea5]">
          判断给定的点是否落在函数 y = 2x + 1 的图像上，注意代入检验。
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {points.map((point, index) => (
            <div
              key={`${point.x}-${point.y}`}
              className="flex flex-col md:flex-row md:items-center md:justify-between border border-[#e8e6dc] rounded-md px-4 py-3"
            >
              <span className="text-[#141413] text-lg font-medium">
                点 P{index + 1} ({point.x}, {point.y})
              </span>
              <div className="mt-3 flex gap-2 md:mt-0">
                <Button
                  variant={answers[index] === true ? 'default' : 'outline'}
                  className={
                    answers[index] === true
                      ? 'bg-[#6a9bcc] border-[#6a9bcc]'
                      : 'border-[#e8e6dc] text-[#141413]'
                  }
                  onClick={() =>
                    setAnswers(prev => {
                      const next = [...prev]
                      next[index] = true
                      return next
                    })
                  }
                >
                  在图像上
                </Button>
                <Button
                  variant={answers[index] === false ? 'default' : 'outline'}
                  className={
                    answers[index] === false
                      ? 'bg-[#d97757] border-[#d97757]'
                      : 'border-[#e8e6dc] text-[#141413]'
                  }
                  onClick={() =>
                    setAnswers(prev => {
                      const next = [...prev]
                      next[index] = false
                      return next
                    })
                  }
                >
                  不在图像上
                </Button>
              </div>
            </div>
          ))}
        </div>

        {feedback && (
          <div
            className={`rounded-md px-4 py-3 text-sm ${
              feedback.includes('正确')
                ? 'border border-[#788c5d]/40 bg-[#788c5d]/10 text-[#4f5f3c]'
                : 'border border-[#d97757]/30 bg-[#d97757]/10 text-[#d97757]'
            }`}
          >
            {feedback}
          </div>
        )}

        <div className="flex justify-end">
          <Button className="bg-[#6a9bcc] hover:bg-[#5a8bb4]" onClick={submit}>
            提交判断结果
          </Button>
        </div>

        {puzzle.solution?.reason && (
          <div className="rounded-md bg-[#faf9f5] border border-[#e8e6dc] px-4 py-3 text-sm text-[#6a9bcc] space-y-1">
            {puzzle.solution.reason.map((line: string, index: number) => (
              <p key={`reason-${index}`}>• {line}</p>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function MinesweeperRunner({
  puzzle,
  onComplete,
  onResetStart,
}: {
  puzzle: PuzzleDetail
  onComplete: (payload: { solved: boolean; moves: number; snapshot?: unknown }) => void
  onResetStart: () => void
}) {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy')
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing')
  const [board, setBoard] = useState<Cell[][]>([])
  const [mineCount, setMineCount] = useState(0)
  const [flagCount, setFlagCount] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)

  // 难度配置
  const difficultyConfig = {
    easy: { rows: 9, cols: 9, mines: 10 },
    medium: { rows: 16, cols: 16, mines: 40 },
    hard: { rows: 16, cols: 30, mines: 99 }
  }

  const config = difficultyConfig[difficulty]

  // 格子类型定义
  interface Cell {
    isMine: boolean
    isRevealed: boolean
    isFlagged: boolean
    neighborMines: number
    row: number
    col: number
  }

  // 初始化游戏板
  const initializeBoard = () => {
    const newBoard: Cell[][] = []
    for (let row = 0; row < config.rows; row++) {
      newBoard[row] = []
      for (let col = 0; col < config.cols; col++) {
        newBoard[row][col] = {
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          neighborMines: 0,
          row,
          col
        }
      }
    }
    setBoard(newBoard)
    setMineCount(config.mines)
    setFlagCount(0)
    setTimeElapsed(0)
    setGameState('playing')
    setGameStarted(false)
  }



  // 计算周围地雷数量
  const countNeighborMines = (board: Cell[][], row: number, col: number): number => {
    let count = 0
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const newRow = row + i
        const newCol = col + j
        if (newRow >= 0 && newRow < config.rows && newCol >= 0 && newCol < config.cols) {
          if (board[newRow][newCol].isMine) count++
        }
      }
    }
    return count
  }

  // 左键点击处理
  const handleCellClick = (row: number, col: number) => {
    // 边界检查
    if (row < 0 || row >= config.rows || col < 0 || col >= config.cols) {
      return
    }
    
    if (gameState !== 'playing' || !board[row] || !board[row][col] || board[row][col].isFlagged || board[row][col].isRevealed) {
      return
    }

    const newBoard = board.map(row => [...row])

    // 第一次点击时放置地雷
    if (!gameStarted) {
      // 先在临时board上放置地雷
      let minesPlaced = 0
      
      while (minesPlaced < config.mines) {
        const mineRow = Math.floor(Math.random() * config.rows)
        const mineCol = Math.floor(Math.random() * config.cols)
        
        // 边界检查
        if (mineRow >= config.rows || mineCol >= config.cols || mineRow < 0 || mineCol < 0) {
          continue
        }
        
        // 避免在第一次点击位置和周围放置地雷
        const isFirstClickArea = Math.abs(mineRow - row) <= 1 && Math.abs(mineCol - col) <= 1
        
        if (!newBoard[mineRow][mineCol].isMine && !isFirstClickArea) {
          newBoard[mineRow][mineCol].isMine = true
          minesPlaced++
        }
      }

      // 计算每个格子周围的地雷数量
      for (let r = 0; r < config.rows; r++) {
        for (let c = 0; c < config.cols; c++) {
          if (!newBoard[r][c].isMine) {
            newBoard[r][c].neighborMines = countNeighborMines(newBoard, r, c)
          }
        }
      }
      
      setGameStarted(true)
    }
    
    if (newBoard[row][col].isMine) {
      // 踩到地雷，游戏结束
      setGameState('lost')
      // 显示所有地雷
      for (let r = 0; r < config.rows; r++) {
        for (let c = 0; c < config.cols; c++) {
          if (newBoard[r][c].isMine) {
            newBoard[r][c].isRevealed = true
          }
        }
      }
    } else {
      // 安全格子，使用递归翻开
      revealCell(newBoard, row, col)
      
      // 检查是否获胜
      if (checkWinCondition(newBoard)) {
        setGameState('won')
        onComplete({
          solved: true,
          moves: timeElapsed,
          snapshot: { difficulty, time: timeElapsed }
        })
      }
    }

    setBoard(newBoard)
  }

  // 递归翻开格子
  const revealCell = (board: Cell[][], row: number, col: number) => {
    if (row < 0 || row >= config.rows || col < 0 || col >= config.cols) return
    if (board[row][col].isRevealed || board[row][col].isFlagged || board[row][col].isMine) return

    board[row][col].isRevealed = true

    // 如果是空格子（周围没有地雷），递归翻开周围格子
    if (board[row][col].neighborMines === 0) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          revealCell(board, row + i, col + j)
        }
      }
    }
  }

  // 右键标记处理
  const handleCellRightClick = (e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault()
    
    // 边界检查
    if (row < 0 || row >= config.rows || col < 0 || col >= config.cols) {
      return
    }
    
    if (gameState !== 'playing' || !board[row] || !board[row][col] || board[row][col].isRevealed) return

    const newBoard = board.map(row => [...row])
    if (newBoard[row][col].isFlagged) {
      newBoard[row][col].isFlagged = false
      setFlagCount(flagCount - 1)
    } else {
      newBoard[row][col].isFlagged = true
      setFlagCount(flagCount + 1)
    }
    setBoard(newBoard)
  }

  // 检查获胜条件
  const checkWinCondition = (board: Cell[][]): boolean => {
    for (let row = 0; row < config.rows; row++) {
      for (let col = 0; col < config.cols; col++) {
        const cell = board[row][col]
        if (!cell.isMine && !cell.isRevealed) {
          return false
        }
      }
    }
    return true
  }

  // 重置游戏
  const resetGame = () => {
    initializeBoard()
    onResetStart()
  }

  // 切换难度
  const changeDifficulty = (newDifficulty: 'easy' | 'medium' | 'hard') => {
    setDifficulty(newDifficulty)
    // initializeBoard() 会在 useEffect 中自动调用
  }

  // 计时器
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (gameStarted && gameState === 'playing') {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [gameStarted, gameState])

  // 初始化
  useEffect(() => {
    initializeBoard()
  }, [difficulty])

  // 获取格子显示内容
  const getCellContent = (cell: Cell) => {
    if (cell.isFlagged) return '🚩'
    if (!cell.isRevealed) return ''
    if (cell.isMine) return '💣'
    if (cell.neighborMines === 0) return ''
    return cell.neighborMines.toString()
  }

  // 获取格子样式
  const getCellStyle = (cell: Cell) => {
    let baseStyle = 'w-8 h-8 border border-gray-400 flex items-center justify-center text-sm font-bold cursor-pointer select-none '
    
    if (!cell.isRevealed) {
      baseStyle += 'bg-gray-300 hover:bg-gray-200 '
    } else {
      baseStyle += 'bg-gray-100 '
      if (cell.isMine) {
        baseStyle += 'bg-red-500 '
      } else {
        // 数字颜色
        const colors = ['', 'text-blue-600', 'text-green-600', 'text-red-600', 'text-purple-600', 'text-yellow-600', 'text-pink-600', 'text-black', 'text-gray-600']
        baseStyle += colors[cell.neighborMines] || 'text-black '
      }
    }
    
    return baseStyle
  }

  return (
    <Card className="border-[#e8e6dc]">
      <CardHeader>
        <CardTitle className="text-[#141413] flex items-center gap-2">
          💣 扫雷大师
        </CardTitle>
        <p className="text-sm text-[#b0aea5]">
          左键翻开格子，右键标记地雷。数字表示周围8个格子中地雷的数量。
        </p>
        
        {/* 难度选择 */}
        <div className="flex gap-2 mt-4">
          <span className="text-sm text-[#b0aea5] self-center">难度：</span>
          {(['easy', 'medium', 'hard'] as const).map((level) => (
            <Button
              key={level}
              variant={difficulty === level ? 'default' : 'outline'}
              size="sm"
              onClick={() => changeDifficulty(level)}
              className={difficulty === level ? 'bg-[#d97757]' : ''}
            >
              {level === 'easy' ? '初级(9×9)' : level === 'medium' ? '中级(16×16)' : '高级(16×30)'}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 游戏信息 */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-[#141413]">地雷：{mineCount - flagCount}</span>
          <span className="text-[#141413]">时间：{timeElapsed}s</span>
          <span className={`font-bold ${
            gameState === 'won' ? 'text-green-600' : 
            gameState === 'lost' ? 'text-red-600' : 'text-[#141413]'
          }`}>
            {gameState === 'won' ? '🎉 胜利!' : 
             gameState === 'lost' ? '💥 失败!' : '🎮 游戏中'}
          </span>
        </div>

        {/* 游戏板 */}
        <div className="flex justify-center">
          <div 
            className="inline-block border-2 border-gray-600 bg-gray-200 p-2"
            style={{ 
              display: 'grid', 
              gridTemplateColumns: `repeat(${config.cols}, 1fr)`,
              gap: '1px'
            }}
          >
            {board.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  className={getCellStyle(cell)}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  onContextMenu={(e) => handleCellRightClick(e, rowIndex, colIndex)}
                  disabled={gameState !== 'playing'}
                >
                  {getCellContent(cell)}
                </button>
              ))
            )}
          </div>
        </div>

        {/* 控制按钮 */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={resetGame}
            className="bg-[#6a9bcc] hover:bg-[#5a8bb4]"
          >
            🔄 重新开始
          </Button>
        </div>

        {/* 游戏说明 */}
        <div className="text-xs text-[#b0aea5] space-y-1">
          <p>• 左键点击翻开格子，右键点击标记/取消标记地雷</p>
          <p>• 数字表示该格子周围8个方向地雷的总数</p>
          <p>• 翻开所有非地雷格子即可获胜</p>
          <p>• 初级：9×9网格10个地雷，中级：16×16网格40个地雷，高级：16×30网格99个地雷</p>
        </div>
      </CardContent>
    </Card>
  )
}

function UnsupportedPuzzle({
  puzzle,
  onResetStart,
}: {
  puzzle: PuzzleDetail
  onResetStart: () => void
}) {
  return (
    <Card className="border-[#e8e6dc]">
      <CardHeader>
        <CardTitle className="text-[#141413]">即将上线</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-[#b0aea5]">
          题型 {puzzle.type} 正在开发交互玩法，当前仅展示题干与解析。
        </p>
        <div className="rounded-md bg-[#faf9f5] border border-[#e8e6dc] px-4 py-3">
          <p className="text-[#141413] text-sm whitespace-pre-line">{puzzle.explanation}</p>
        </div>
        <Button variant="outline" className="border-[#b0aea5] text-[#b0aea5]" onClick={onResetStart}>
          <RefreshCw className="w-4 h-4 mr-2" />
          返回重新选择
        </Button>
      </CardContent>
    </Card>
  )
}

export default function InteractivePuzzlePage() {
  const router = useRouter()
  const params = useParams<{ id?: string | string[] }>()
  const rawId = params?.id
  const puzzleId = Array.isArray(rawId) ? rawId[0] : rawId
  const [loading, setLoading] = useState(true)
  const [puzzle, setPuzzle] = useState<PuzzleDetail | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<{ solved: boolean; stars: number; score: number } | null>(
    null,
  )
  const [startTime, setStartTime] = useState(() => Date.now())
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!puzzleId || typeof puzzleId !== 'string') {
      setError('找不到对应的互动题')
      setLoading(false)
      return
    }

    async function loadPuzzle(currentId: string) {
      try {
        setLoading(true)
        const response = await fetch(`/api/puzzles/${currentId}`)
        if (!response.ok) {
          const message = await response.json()
          throw new Error(message.error ?? '加载互动题失败')
        }
        const data = (await response.json()) as PuzzleDetail
        setPuzzle(data)
        setStartTime(Date.now())
        setResult(null)
        setError(null)
      } catch (err) {
        console.error(err)
        setError(err instanceof Error ? err.message : '加载互动题失败')
      } finally {
        setLoading(false)
      }
    }

    loadPuzzle(puzzleId)
  }, [puzzleId])

  async function handleComplete(payload: {
    solved: boolean
    moves: number
    snapshot?: unknown
  }) {
    const elapsedSeconds = Math.max(1, Math.round((Date.now() - startTime) / 1000))

    setSubmitting(true)
    try {
      if (!puzzleId || typeof puzzleId !== 'string') {
        throw new Error('缺少互动题编号')
      }

      const response = await fetch(`/api/puzzles/${puzzleId}/attempts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: DEMO_EMAIL,
          checkpointId: puzzle?.checkpoints?.[0]?.id,
          isSolved: payload.solved,
          moves: payload.moves,
          elapsedSeconds,
          snapshot: payload.snapshot,
        }),
      })

      if (!response.ok) {
        const message = await response.json()
        throw new Error(message.error ?? '记录闯关结果失败')
      }

      const data = await response.json()
      setResult({
        solved: payload.solved,
        stars: data.stars ?? 0,
        score: data.score ?? 0,
      })
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : '记录闯关结果失败')
    } finally {
      setSubmitting(false)
    }
  }

  function resetAttempt() {
    setResult(null)
    setStartTime(Date.now())
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-[#6a9bcc]" />
      </div>
    )
  }

  if (error || !puzzle) {
    return (
      <div className="min-h-screen p-6 md:p-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button variant="ghost" onClick={() => router.back()} className="text-[#6a9bcc] px-0">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回关卡
            </Button>
          </div>
          <Card className="border-[#e8e6dc]">
            <CardContent className="py-12 text-center">
              <p className="text-[#d97757]">{error ?? '暂时无法加载该互动题'}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <Link href="/games" className="text-[#6a9bcc] hover:underline flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              返回互动闯关
            </Link>
            <h1 className="text-3xl font-semibold text-[#141413] mt-2">{puzzle.title}</h1>
            <div className="text-xl text-[#141413] leading-relaxed bg-[#faf9f5] border border-[#e8e6dc] rounded-lg px-6 py-4 mt-3">
              <MathRenderer text={puzzle.prompt} />
            </div>
          </div>
        </div>

        {result && (
          <div className="rounded-lg border border-[#788c5d]/30 bg-[#788c5d]/10 px-6 py-4 flex flex-wrap items-center gap-3 text-[#4f5f3c]">
            <Sparkles className="w-5 h-5" />
            <div>
              <p className="font-medium">
                {result.solved ? '闯关成功！' : '记录已保存，继续挑战更佳解法。'}
              </p>
              <p className="text-sm">
                获得星级 {result.stars}，积分 {result.score}。再次尝试可刷新最佳成绩。
              </p>
            </div>
            <Button variant="outline" size="sm" className="border-[#4f5f3c] text-[#4f5f3c]" onClick={resetAttempt}>
              再闯一次
            </Button>
          </div>
        )}



        {puzzle.type === 'SLIDE_PUZZLE' && (
          <SlidePuzzleRunner puzzle={puzzle} onComplete={handleComplete} onResetStart={resetAttempt} />
        )}

        {puzzle.type === 'LOGIC_PUZZLE' && (
          <MinesweeperRunner puzzle={puzzle} onComplete={handleComplete} onResetStart={resetAttempt} />
        )}

        {puzzle.type === 'ARITHMETIC' && (
          <FractionInput
            expectedAnswer={(puzzle.targetState?.answer as string) ?? (puzzle.solution?.answer as string)}
            explanation={puzzle.solution?.steps?.join?.('\n')}
            onComplete={solved =>
              handleComplete({
                solved,
                moves: 1,
                snapshot: { answer: solved },
              })
            }
          />
        )}

        {puzzle.type === 'FUNCTION_GRAPH' && (
          <FunctionGraphRunner puzzle={puzzle} onComplete={handleComplete} />
        )}

        {puzzle.explanation && puzzle.type !== 'LOGIC_PUZZLE' && (
          <div className="rounded-lg border border-[#e8e6dc] bg-[#faf9f5] px-6 py-4">
            <h2 className="text-lg font-semibold text-[#141413] mb-2">解析思路</h2>
            <p className="text-sm text-[#6a9bcc] whitespace-pre-line">{puzzle.explanation}</p>
          </div>
        )}
      </div>
      {submitting && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center">
          <div className="rounded-lg bg-white px-6 py-4 shadow-lg flex items-center gap-3">
            <Loader2 className="w-5 h-5 animate-spin text-[#6a9bcc]" />
            <span className="text-sm text-[#6a9bcc]">正在记录闯关结果...</span>
          </div>
        </div>
      )}
    </div>
  )
}
