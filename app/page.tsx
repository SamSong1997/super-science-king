'use client'

import { BookOpen, FlaskConical, Gamepad2, GraduationCap, MessageSquare, ScrollText } from 'lucide-react'
import { FeatureCard } from '@/components/animations/FeatureCard'
import { HeroSection } from '@/components/animations/HeroSection'
import { FeatureDetail } from '@/components/animations/FeatureDetail'
import { Footer } from '@/components/Footer'
import { useEffect, useState } from 'react'

const features = [
  {
    id: 'ebooks',
    title: '电子书阅读器',
    description: '浏览精选科普图书，支持标注和笔记功能',
    href: '/ebooks',
    icon: BookOpen,
    color: 'from-[#d97757] to-[#d97757]/80',
    bgColor: 'bg-[#ffd4c4]',
    numberImage: '/images/numbers/1.png'
  },
  {
    id: 'digital-teacher',
    title: '数字人微课',
    description: '名师视频讲解，互动式学习体验',
    href: '/digital-teacher',
    icon: GraduationCap,
    color: 'from-[#6a9bcc] to-[#6a9bcc]/80',
    bgColor: 'bg-[#cce5f7]',
    numberImage: '/images/numbers/2.png'
  },
  {
    id: 'experiments',
    title: '互动实验室',
    description: '在线物理、化学、生物实验，安全又有趣',
    href: '/experiments',
    icon: FlaskConical,
    color: 'from-[#788c5d] to-[#788c5d]/80',
    bgColor: 'bg-[#d9e5c7]',
    numberImage: '/images/numbers/3.png'
  },
  {
    id: 'assessment',
    title: '科学素养测评',
    description: '9大维度能力测评，生成个性化学习报告',
    href: '/assessment',
    icon: ScrollText,
    color: 'from-[#e8a87c] to-[#e8a87c]/80',
    bgColor: 'bg-[#ffe4cc]',
    numberImage: '/images/numbers/4.png'
  },
  {
    id: 'games',
    title: '知识闯关游戏',
    description: '火柴人、找不同、华容道等趣味挑战',
    href: '/games',
    icon: Gamepad2,
    color: 'from-[#8fb3d5] to-[#8fb3d5]/80',
    bgColor: 'bg-[#f5e6ff]',
    numberImage: '/images/numbers/5.png'
  },
  {
    id: 'ai-assistant',
    title: 'AI智能助教',
    description: '24小时在线答疑，个性化学习建议',
    href: '/ai-assistant',
    icon: MessageSquare,
    color: 'from-[#9ba87a] to-[#9ba87a]/80',
    bgColor: 'bg-[#fff0f0]',
    numberImage: '/images/numbers/6.png'
  },
]

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(0)

  useEffect(() => {
    // 设置视口高度
    setViewportHeight(window.innerHeight)

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative">
      {/* 背景层 - 慢速滚动 */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#faf9f5] via-[#f5f3eb] to-[#faf9f5] opacity-50" />
        <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 bg-[#d97757]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 bg-[#6a9bcc]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 bg-[#788c5d]/5 rounded-full blur-3xl" />
      </div>

      {/* 前景层 - 正常滚动 */}
      <div className="relative z-10">
        {/* Hero Section - Logo with floating icons */}
        <div className="h-screen">
          <HeroSection />
        </div>

        {/* Features Grid */}
        <section className="min-h-screen flex items-center relative overflow-hidden bg-[#faf9f5]">


          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 w-full relative z-10">
          {/* 标题区域 */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#141413] font-bold mb-3 md:mb-4">
              六大核心功能
            </h2>
            <p className="text-base sm:text-lg text-[#788c5d] max-w-2xl mx-auto px-4">
              全方位提升科学素养，让学习更有趣更高效
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative">
          {features.map((feature, index) => (
            <div key={feature.id} className="relative" style={{ transformStyle: 'preserve-3d' }}>
              <FeatureCard
                {...feature}
                index={index}
              />
            </div>
          ))}
          </div>
        </div>
        </section>

        {/* Feature Details - 6个功能详情连续排列 */}
        <section className="min-h-screen relative bg-transparent overflow-hidden py-12">
        <div className="space-y-16">
          <FeatureDetail
            index={1}
            title="电子书阅读器"
            description="海量精选科普图书，涵盖物理、化学、生物等多个学科领域。支持智能标注、笔记记录和知识点收藏功能，让阅读更高效。配备护眼模式和夜间模式，保护孩子视力健康。"
            imagePath="/images/features/1.png"
          />

          <FeatureDetail
            index={2}
            title="数字人微课"
            description="名师真人出镜讲解，生动有趣的教学方式让知识点更易理解。每节微课5-10分钟，适合碎片化学习。支持倍速播放、重点回看，学习进度自由掌控。"
            imagePath="/images/features/2.png"
            reverse
          />

          <FeatureDetail
            index={3}
            title="互动实验室"
            description="虚拟实验环境，安全探索物理、化学、生物实验。3D可视化操作，直观展示实验过程和原理。配备详细的实验报告模板，培养科学探究能力。"
            imagePath="/images/features/3.png"
          />

          <FeatureDetail
            index={4}
            title="科学素养测评"
            description="9大维度全面评估科学素养，包括观察能力、推理能力、实验设计等。智能生成个性化学习报告，精准定位薄弱环节。定期测评追踪进步轨迹，见证成长每一步。"
            imagePath="/images/features/4.png"
            reverse
          />

          <FeatureDetail
            index={5}
            title="知识闯关游戏"
            description="趣味游戏化学习，包含火柴棒谜题、找不同、华容道等经典益智游戏。每个关卡融入科学知识点，寓教于乐。积分排行榜激发学习动力，与小伙伴一起进步。"
            imagePath="/images/features/5.png"
          />

          <FeatureDetail
            index={6}
            title="AI智能助教"
            description="24小时在线答疑，即问即答。AI根据学习数据提供个性化学习建议和复习计划。支持语音对话和图片识别，多种交互方式让学习更便捷。"
            imagePath="/images/features/6.png"
            reverse
          />
        </div>
      </section>

        {/* Footer - 最后一屏 */}
        <div>
          <Footer />
        </div>
      </div>
    </div>
  )
}
