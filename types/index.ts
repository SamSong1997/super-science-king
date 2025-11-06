// 电子书类型
export interface Ebook {
  id: string
  title: string
  grade: number
  subject: '数学' | '物理' | '化学' | '生物' | '地理' | '信息技术'
  pdfUrl: string
  coverImage: string
  knowledgePoints: KnowledgePoint[]
  chapters: Chapter[]
}

// 知识点类型
export interface KnowledgePoint {
  id: string
  title: string
  content: string
  pageNumber: number
  digitalTeacherContent?: {
    avatarState: 'explain' | 'think' | 'interact'
    text: string
    illustration?: string
  }
}

// 章节类型
export interface Chapter {
  id: string
  title: string
  pageNumber: number
}

// 实验类型
export interface Experiment {
  id: string
  title: string
  subject: string
  phetUrl: string
  description: string
  instructions: string[]
}

// 测评问题类型
export interface Question {
  id: string
  type: 'single' | 'multiple' | 'fill' | 'open'
  question: string
  options?: string[]
  answer: any
  dimension: string
}

// 测评类型
export interface Assessment {
  id: string
  title: string
  questions: Question[]
  dimensions: {
    [key: string]: number
  }
}

// 游戏关卡类型
export interface GameLevel {
  id: string
  title: string
  type: PuzzleType
  difficulty: string
  prompt: string
  previewImage?: string | null
  gradeBand?: string
  knowledgeTags?: string[]
}

// AI 消息类型
export interface AIMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

// 题库题目类型
export interface ExamQuestion {
  id: string
  type: 'choice' | 'fill' | 'open'
  subject: string
  grade: number
  question: string
  options?: string[]
  answer: string
  explanation: string
}

// 互动题类型
export type PuzzleType =
  | 'SLIDE_PUZZLE'
  | 'ARITHMETIC'
  | 'FUNCTION_GRAPH'
  | 'LOGIC_PUZZLE'

export interface InteractivePuzzle {
  id: string
  title: string
  prompt: string
  type: PuzzleType
  gradeBand: string
  knowledgeTags?: string[]
  initialState: any
  targetState?: any
  solution?: any
  explanation?: string
  difficulty: string
  previewImage?: string | null
}

export interface Checkpoint {
  id: string
  title: string
  slug: string
  description?: string
  grade?: number
  sequence: number
  badgeImage?: string
  puzzles: CheckpointPuzzle[]
}

export interface CheckpointPuzzle {
  id: string
  checkpointId: string
  puzzleId: string
  order: number
  minScore?: number | null
  puzzle: InteractivePuzzle
}

export interface PuzzleAttempt {
  id: string
  userId: string
  puzzleId: string
  checkpointId?: string | null
  status: 'in_progress' | 'completed' | 'abandoned'
  isSolved: boolean
  moves?: number | null
  elapsedSeconds?: number | null
  snapshot?: any
  startedAt: string
  completedAt?: string | null
}

export interface CheckpointProgress {
  id: string
  userId: string
  checkpointId: string
  stars: number
  score: number
  bestTime?: number | null
  status: 'locked' | 'unlocked' | 'completed'
  unlockedAt: string
  completedAt?: string | null
}
