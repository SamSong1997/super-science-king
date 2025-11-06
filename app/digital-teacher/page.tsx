'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PlayCircle, User, MessageSquare, BookOpen, CheckCircle } from 'lucide-react'

// 添加卡片翻转样式
const cardFlipStyles = `
  .perspective-1000 {
    perspective: 1000px;
  }
  .transform-style-3d {
    transform-style: preserve-3d;
  }
  .backface-hidden {
    backface-visibility: hidden;
  }
  .rotate-y-180 {
    transform: rotateY(180deg);
  }
`

const VIDEO_LIST = [
  {
    id: 1,
    title: '电力是什么？电从哪里来？',
    duration: '15:30',
    videoId: 'Dx3RpXdJw2k',
    description: '探索电力的奥秘，了解电的来源、电的作用以及电在日常生活中的应用。',
    chapters: [
      { time: '00:00', title: '电力初探' },
      { time: '02:30', title: '电从哪里来' },
      { time: '06:00', title: '电力如何传输' },
      { time: '10:00', title: '生活中的电力应用' }
    ]
  },
  {
    id: 2,
    title: '认识磁铁：什么是磁铁？它是如何工作的？',
    duration: '16:20',
    videoId: '7HHs98PBgk0',
    description: '通过有趣的实验了解磁铁的特性，探索磁铁的工作原理和应用。',
    chapters: [
      { time: '00:00', title: '磁铁的魅力' },
      { time: '03:30', title: '磁铁的类型' },
      { time: '08:00', title: '磁力的作用' },
      { time: '12:00', title: '磁铁在生活中的应用' }
    ]
  },
  {
    id: 3,
    title: '认识时间线：适合K-6学生的时间线全面概览',
    duration: '20:00',
    videoId: 'o50HA6QTxj0',
    description: '学习如何理解和使用时间线，掌握时间顺序的概念，培养历史思维。',
    chapters: [
      { time: '00:00', title: '时间线的概念' },
      { time: '04:00', title: '时间线的组成' },
      { time: '09:00', title: '如何读时间线' },
      { time: '14:00', title: '制作个人时间线' },
      { time: '18:00', title: '时间线练习' }
    ]
  },
  {
    id: 4,
    title: '认识角度：有趣的角度世界入门',
    duration: '14:15',
    videoId: 'sajxuoq7QyQ',
    description: '在轻松愉快的氛围中学习角度的基础知识，发现角度在日常生活中的应用。',
    chapters: [
      { time: '00:00', title: '角度是什么' },
      { time: '03:30', title: '角的类型' },
      { time: '07:00', title: '用工具测量角度' },
      { time: '10:30', title: '生活中的角度' }
    ]
  }
]

// 闪卡数据 - 电力主题
const FLASHCARDS = [
  {
    id: 1,
    front: '什么是电力？',
    back: '电力是一种能量形式，由电荷的移动产生。它可以转化为光、热、动力等多种形式，是现代生活中不可或缺的能源。'
  },
  {
    id: 2,
    front: '电从哪里来？',
    back: '电主要来自发电厂。发电厂通过燃烧煤炭、利用水力、风力、太阳能或核能等方式，将其他形式的能量转化为电能。'
  },
  {
    id: 3,
    front: '电是如何传输到我们家里的？',
    back: '电通过高压输电线从发电厂传输到变电站，然后通过配电网降低电压，最后通过电线传输到每家每户。'
  },
  {
    id: 4,
    front: '为什么要节约用电？',
    back: '节约用电可以减少能源消耗，保护环境，降低碳排放。同时也能节省电费，培养良好的生活习惯。'
  },
  {
    id: 5,
    front: '生活中哪些电器最耗电？',
    back: '空调、电热水器、电暖器等大功率电器最耗电。合理使用这些电器，可以有效节约用电。'
  }
]

// Quiz 测验题目 - 电力主题
const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: '电力是一种什么形式的能量？',
    options: ['机械能', '化学能', '电能', '热能'],
    correctAnswer: 2,
    explanation: '电力是电能的一种表现形式，由电荷的移动产生。'
  },
  {
    id: 2,
    question: '以下哪种方式不能用来发电？',
    options: ['水力发电', '风力发电', '声音发电', '太阳能发电'],
    correctAnswer: 2,
    explanation: '声音的能量太小，无法有效地转化为电能。常见的发电方式包括水力、风力、太阳能、火力和核能发电。'
  },
  {
    id: 3,
    question: '家里的电是通过什么传输过来的？',
    options: ['水管', '电线', '空气', '光纤'],
    correctAnswer: 1,
    explanation: '电通过电线传输。电从发电厂经过高压输电线、变电站，最后通过配电网的电线传输到每家每户。'
  },
  {
    id: 4,
    question: '以下哪个行为可以节约用电？',
    options: ['长时间开着电视', '离开房间关灯', '空调温度调到最低', '电脑一直不关机'],
    correctAnswer: 1,
    explanation: '离开房间时关灯是节约用电的好习惯。其他选项都会造成不必要的电力浪费。'
  },
  {
    id: 5,
    question: '为什么触摸电源插座很危险？',
    options: ['会被电到', '插座会坏', '会着火', '没有危险'],
    correctAnswer: 0,
    explanation: '触摸电源插座非常危险，可能会触电。电流通过人体会造成伤害，严重时甚至危及生命。所以千万不要用手触摸电源插座！'
  }
]

export default function DigitalTeacherPage() {
  const [selectedVideo, setSelectedVideo] = useState(VIDEO_LIST[0])
  const [currentTime, setCurrentTime] = useState(0)
  const [currentMode, setCurrentMode] = useState<'flashcard' | 'quiz' | null>(null)
  const [teacherImage, setTeacherImage] = useState('/teacher.png')
  
  // 闪卡状态
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isCardFlipped, setIsCardFlipped] = useState(false)
  
  // Quiz 状态
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const handleChapterClick = (chapter: any) => {
    setCurrentTime(chapter.time)
  }

  const startFlashcard = () => {
    setCurrentMode('flashcard')
    setCurrentCardIndex(0)
    setIsCardFlipped(false)
  }

  const startQuiz = () => {
    setCurrentMode('quiz')
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
    setQuizCompleted(false)
  }

  const closeMode = () => {
    setCurrentMode(null)
  }

  // 闪卡功能
  const flipCard = () => {
    setIsCardFlipped(!isCardFlipped)
  }

  const nextCard = () => {
    if (currentCardIndex < FLASHCARDS.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
      setIsCardFlipped(false)
    }
  }

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1)
      setIsCardFlipped(false)
    }
  }

  // Quiz 功能
  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return
    setSelectedAnswer(answerIndex)
  }

  const submitAnswer = () => {
    if (selectedAnswer === null) return
    
    const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex]
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1)
    }
    setShowExplanation(true)
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setQuizCompleted(true)
    }
  }

  const restartQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
    setQuizCompleted(false)
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cardFlipStyles }} />
      <div className="min-h-screen p-6 md:p-12 bg-gradient-to-b from-[#faf9f5] to-white">
        <div className="max-w-7xl mx-auto">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#141413] mb-2 font-['Poppins','思源黑体']">
            数字人微课
          </h1>
          <p className="text-[#7a7770]">名师形象讲解，知识点交互学习</p>
        </div>

        {/* 课程列表 - 顶部横向滚动 */}
        <div className="mb-8">
          <div className="flex gap-3 mb-4">
            <PlayCircle className="w-5 h-5 text-[#788c5d] mt-1" />
            <h2 className="text-lg font-semibold text-[#141413]">课程列表</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-[#e8e6dc] scrollbar-track-transparent">
            {VIDEO_LIST.map((video) => (
              <div
                key={video.id}
                onClick={() => {
                  setSelectedVideo(video)
                  setCurrentTime(0)
                  setCurrentMode(null)
                }}
                className={`
                  flex-shrink-0 w-72 h-[280px] cursor-pointer transition-all hover:scale-105
                  ${selectedVideo.id === video.id ? 'ring-2 ring-[#788c5d]' : ''}
                `}
              >
                <div className="relative rounded-lg overflow-hidden border border-[#e8e6dc] h-full flex flex-col">
                  <div className="aspect-video bg-black flex items-center justify-center flex-shrink-0">
                    <img
                      src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                        target.nextElementSibling?.classList.remove('hidden')
                      }}
                    />
                    <div className="hidden absolute inset-0 bg-[#e8e6dc] flex items-center justify-center">
                      <PlayCircle className="w-16 h-16 text-[#7a7770]" />
                    </div>
                  </div>
                  <div className="p-4 bg-white flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-medium text-[#141413] text-sm mb-2 line-clamp-2 h-10">
                        {video.title}
                      </h4>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <Badge className="bg-[#d97757]/10 text-[#d97757] border-[#d97757]/20 text-xs">
                        {video.duration}
                      </Badge>
                      {selectedVideo.id === video.id && (
                        <CheckCircle className="w-5 h-5 text-[#788c5d]" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 主要内容区：视频 + 数字人展示 - 高度对齐 */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* 左侧：视频播放器 */}
          <div className="lg:col-span-2">
            <Card className="border-[#e8e6dc] overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-video bg-black">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${selectedVideo.videoId}?start=${Math.floor(currentTime * 60)}`}
                    title={selectedVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右侧：数字人展示 - 与视频容器高度对齐 */}
          <div className="lg:col-span-1">
            <Card className="border-[#e8e6dc] overflow-hidden h-full">
              <CardContent className="p-4 h-full flex flex-col">
                <div className="relative bg-white rounded-lg shadow-lg overflow-hidden flex-1">
                  <div className="absolute inset-0 flex items-center justify-center p-2">
                    <div className="w-full h-full overflow-hidden rounded-lg">
                      <img
                        src={teacherImage}
                        alt="数字老师"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-[#7a7770] text-center font-medium text-sm">
                    AI数字老师
                  </p>
                  <p className="text-[#141413] text-center text-xs mt-1">
                    正在为您讲解《{selectedVideo.title}》
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 视频信息和章节导航 - 左右布局 */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* 左侧：视频信息 */}
          <Card className="border-[#e8e6dc]">
            <CardHeader>
              <CardTitle className="text-xl text-[#141413] font-['Poppins','思源黑体']">
                {selectedVideo.title}
              </CardTitle>
              <p className="text-[#7a7770]">{selectedVideo.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* 学习目标 */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-[#141413] text-base flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#6a9bcc]" />
                    学习目标
                  </h4>
                  <ul className="space-y-3 text-sm text-[#7a7770]">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#788c5d] mt-0.5 flex-shrink-0" />
                      <span>掌握课程的核心概念和基础知识</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#788c5d] mt-0.5 flex-shrink-0" />
                      <span>能够运用所学知识解决实际问题</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#788c5d] mt-0.5 flex-shrink-0" />
                      <span>培养逻辑思维和分析能力</span>
                    </li>
                  </ul>
                </div>

                {/* 重点难点 */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-[#141413] text-base">重点难点</h4>
                  <ul className="space-y-3 text-sm text-[#7a7770]">
                    <li className="flex items-start gap-3">
                      <span className="text-[#d97757] font-bold">•</span>
                      <span>理解关键概念的定义和内涵</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#d97757] font-bold">•</span>
                      <span>掌握相关计算方法和技巧</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#d97757] font-bold">•</span>
                      <span>学会举一反三，解决类似问题</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 右侧：章节导航 */}
          <Card className="border-[#e8e6dc]">
            <CardHeader>
              <CardTitle className="text-lg text-[#141413] font-['Poppins','思源黑体'] flex items-center gap-2">
                <PlayCircle className="w-5 h-5 text-[#788c5d]" />
                章节导航
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {selectedVideo.chapters.map((chapter, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-[#faf9f5] cursor-pointer transition-colors border border-[#e8e6dc]"
                    onClick={() => handleChapterClick(chapter)}
                  >
                    <div className="w-12 h-12 rounded-lg bg-[#d97757]/10 flex items-center justify-center text-[#d97757] font-semibold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-[#141413]">{chapter.title}</h4>
                      <p className="text-sm text-[#7a7770]">{chapter.time}</p>
                    </div>
                    <PlayCircle className="w-5 h-5 text-[#7a7770]" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 测验与练习 - 底部全宽 */}
        <Card className="border-[#e8e6dc]">
          <CardHeader>
            <CardTitle className="text-lg text-[#141413] font-['Poppins','思源黑体'] flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#d97757]" />
              测验与练习
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* FlashCard 记忆卡片 */}
              <div className="p-6 bg-[#faf9f5] rounded-lg border border-[#e8e6dc] hover:shadow-md transition-all cursor-pointer"
                   onClick={startFlashcard}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-lg bg-[#788c5d]/10 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-[#788c5d]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#141413] text-base">FlashCard 记忆卡片</h4>
                    <p className="text-sm text-[#7a7770] mt-1">通过卡片记忆巩固知识点</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge className="bg-[#788c5d]/10 text-[#788c5d] border-[#788c5d]/20">
                    {FLASHCARDS.length} 张卡片
                  </Badge>
                  <span className="text-[#6a9bcc] text-sm font-medium">开始 →</span>
                </div>
              </div>

              {/* Quiz 快速测验 */}
              <div className="p-6 bg-[#faf9f5] rounded-lg border border-[#e8e6dc] hover:shadow-md transition-all cursor-pointer"
                   onClick={startQuiz}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-lg bg-[#6a9bcc]/10 flex items-center justify-center">
                    <PlayCircle className="w-8 h-8 text-[#6a9bcc]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#141413] text-base">Quiz 快速测验</h4>
                    <p className="text-sm text-[#7a7770] mt-1">快速测验检验学习效果</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge className="bg-[#6a9bcc]/10 text-[#6a9bcc] border-[#6a9bcc]/20">
                    {QUIZ_QUESTIONS.length} 道题目
                  </Badge>
                  <span className="text-[#6a9bcc] text-sm font-medium">开始 →</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FlashCard 模态框 */}
      {currentMode === 'flashcard' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#141413]">记忆卡片</h3>
              <Button variant="ghost" onClick={closeMode}>✕</Button>
            </div>

            <div className="mb-4 text-center text-sm text-[#7a7770]">
              卡片 {currentCardIndex + 1} / {FLASHCARDS.length}
            </div>

            {/* 卡片 */}
            <div 
              className="relative h-64 mb-6 cursor-pointer perspective-1000"
              onClick={flipCard}
            >
              <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isCardFlipped ? 'rotate-y-180' : ''}`}>
                {/* 正面 */}
                <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-[#788c5d] to-[#6a9bcc] rounded-lg p-8 flex items-center justify-center">
                  <p className="text-2xl font-bold text-white text-center">
                    {FLASHCARDS[currentCardIndex].front}
                  </p>
                </div>
                {/* 背面 */}
                <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-[#d97757] to-[#6a9bcc] rounded-lg p-8 flex items-center justify-center rotate-y-180">
                  <p className="text-lg text-white text-center leading-relaxed">
                    {FLASHCARDS[currentCardIndex].back}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-center text-sm text-[#7a7770] mb-6">
              点击卡片翻转查看答案
            </p>

            {/* 导航按钮 */}
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={prevCard}
                disabled={currentCardIndex === 0}
              >
                上一张
              </Button>
              <Button 
                onClick={nextCard}
                disabled={currentCardIndex === FLASHCARDS.length - 1}
                className="bg-[#6a9bcc] hover:bg-[#5a8bb4]"
              >
                下一张
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Quiz 模态框 */}
      {currentMode === 'quiz' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 my-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#141413]">快速测验</h3>
              <Button variant="ghost" onClick={closeMode}>✕</Button>
            </div>

            {!quizCompleted ? (
              <>
                <div className="mb-4 flex justify-between items-center">
                  <span className="text-sm text-[#7a7770]">
                    题目 {currentQuestionIndex + 1} / {QUIZ_QUESTIONS.length}
                  </span>
                  <Badge className="bg-[#6a9bcc]/10 text-[#6a9bcc]">
                    得分: {score}
                  </Badge>
                </div>

                {/* 题目 */}
                <div className="mb-6 p-6 bg-[#faf9f5] rounded-lg">
                  <p className="text-lg font-medium text-[#141413]">
                    {QUIZ_QUESTIONS[currentQuestionIndex].question}
                  </p>
                </div>

                {/* 选项 */}
                <div className="space-y-3 mb-6">
                  {QUIZ_QUESTIONS[currentQuestionIndex].options.map((option, index) => {
                    const isSelected = selectedAnswer === index
                    const isCorrect = index === QUIZ_QUESTIONS[currentQuestionIndex].correctAnswer
                    const showResult = showExplanation
                    
                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showExplanation}
                        className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                          showResult
                            ? isCorrect
                              ? 'border-[#788c5d] bg-[#788c5d]/10'
                              : isSelected
                              ? 'border-[#d97757] bg-[#d97757]/10'
                              : 'border-[#e8e6dc]'
                            : isSelected
                            ? 'border-[#6a9bcc] bg-[#6a9bcc]/10'
                            : 'border-[#e8e6dc] hover:border-[#6a9bcc]/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            showResult && isCorrect
                              ? 'border-[#788c5d] bg-[#788c5d] text-white'
                              : showResult && isSelected && !isCorrect
                              ? 'border-[#d97757] bg-[#d97757] text-white'
                              : isSelected
                              ? 'border-[#6a9bcc] bg-[#6a9bcc] text-white'
                              : 'border-[#e8e6dc]'
                          }`}>
                            {showResult && isCorrect && '✓'}
                            {showResult && isSelected && !isCorrect && '✕'}
                          </div>
                          <span className="text-[#141413]">{option}</span>
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* 解析 */}
                {showExplanation && (
                  <div className="mb-6 p-4 bg-[#788c5d]/10 rounded-lg border border-[#788c5d]/20">
                    <h4 className="font-semibold text-[#141413] mb-2">解析：</h4>
                    <p className="text-[#7a7770]">
                      {QUIZ_QUESTIONS[currentQuestionIndex].explanation}
                    </p>
                  </div>
                )}

                {/* 按钮 */}
                <div className="flex justify-end gap-3">
                  {!showExplanation ? (
                    <Button 
                      onClick={submitAnswer}
                      disabled={selectedAnswer === null}
                      className="bg-[#6a9bcc] hover:bg-[#5a8bb4]"
                    >
                      提交答案
                    </Button>
                  ) : (
                    <Button 
                      onClick={nextQuestion}
                      className="bg-[#6a9bcc] hover:bg-[#5a8bb4]"
                    >
                      {currentQuestionIndex < QUIZ_QUESTIONS.length - 1 ? '下一题' : '查看结果'}
                    </Button>
                  )}
                </div>
              </>
            ) : (
              /* 测验完成 */
              <div className="text-center py-8">
                <div className="text-6xl mb-4">
                  {score === QUIZ_QUESTIONS.length ? '🎉' : score >= QUIZ_QUESTIONS.length * 0.6 ? '👍' : '💪'}
                </div>
                <h3 className="text-2xl font-bold text-[#141413] mb-2">测验完成！</h3>
                <p className="text-lg text-[#7a7770] mb-6">
                  你答对了 {score} / {QUIZ_QUESTIONS.length} 题
                </p>
                <div className="mb-6">
                  <div className="text-4xl font-bold text-[#6a9bcc] mb-2">
                    {Math.round((score / QUIZ_QUESTIONS.length) * 100)}%
                  </div>
                  <p className="text-sm text-[#7a7770]">
                    {score === QUIZ_QUESTIONS.length 
                      ? '完美！你完全掌握了这些知识！' 
                      : score >= QUIZ_QUESTIONS.length * 0.6 
                      ? '不错！继续加油！' 
                      : '再接再厉，多复习一下吧！'}
                  </p>
                </div>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline" onClick={closeMode}>
                    关闭
                  </Button>
                  <Button onClick={restartQuiz} className="bg-[#6a9bcc] hover:bg-[#5a8bb4]">
                    重新测验
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      </div>
    </>
  )
}
