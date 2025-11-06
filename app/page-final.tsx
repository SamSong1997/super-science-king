'use client'

import Link from 'next/link'
import { BookOpen, FlaskConical, Gamepad2, GraduationCap, MessageSquare, ScrollText, ArrowRight, Star, CheckCircle, Sparkles, Award, TrendingUp, Users } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const FEATURE_IMAGES = {
  ebooks: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=300&q=80',
  'digital-teacher': 'https://images.unsplash.com/photo-1588072432836-e10032774350?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=300&q=80',
  experiments: 'https://images.unsplash.com/photo-1532634896-26909d0d4b6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=300&q=80',
  assessment: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=300&q=80',
  games: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=300&q=80',
  'ai-assistant': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=300&q=80'
}

const features = [
  {
    id: 'ebooks',
    title: '电子书阅读器',
    description: '浏览精选科普图书，支持标注和笔记功能',
    href: '/ebooks',
    icon: BookOpen,
    color: 'from-[#d97757] to-[#d97757]/80',
    bgColor: 'bg-[#d97757]/10'
  },
  {
    id: 'digital-teacher',
    title: '数字人微课',
    description: '名师视频讲解，互动式学习体验',
    href: '/digital-teacher',
    icon: GraduationCap,
    color: 'from-[#6a9bcc] to-[#6a9bcc]/80',
    bgColor: 'bg-[#6a9bcc]/10'
  },
  {
    id: 'experiments',
    title: '互动实验室',
    description: '在线物理、化学、生物实验，安全又有趣',
    href: '/experiments',
    icon: FlaskConical,
    color: 'from-[#788c5d] to-[#788c5d]/80',
    bgColor: 'bg-[#788c5d]/10'
  },
  {
    id: 'assessment',
    title: '科学素养测评',
    description: '9大维度能力测评，生成个性化学习报告',
    href: '/assessment',
    icon: ScrollText,
    color: 'from-[#d97757] to-[#d97757]/80',
    bgColor: 'bg-[#d97757]/10'
  },
  {
    id: 'games',
    title: '知识闯关游戏',
    description: '火柴人、找不同、华容道等趣味挑战',
    href: '/games',
    icon: Gamepad2,
    color: 'from-[#6a9bcc] to-[#6a9bcc]/80',
    bgColor: 'bg-[#6a9bcc]/10'
  },
  {
    id: 'ai-assistant',
    title: 'AI智能助教',
    description: '24小时在线答疑，个性化学习建议',
    href: '/ai-assistant',
    icon: MessageSquare,
    color: 'from-[#788c5d] to-[#788c5d]/80',
    bgColor: 'bg-[#788c5d]/10'
  },
]

const highlights = [
  { icon: Award, text: '北京理工大学出版社官方出品' },
  { icon: CheckCircle, text: '对标千元级教育产品' },
  { icon: Sparkles, text: 'AI+多模态交互技术' },
  { icon: TrendingUp, text: '完整学习闭环体系' }
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf9f5] to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#d97757]/5 via-[#6a9bcc]/5 to-[#788c5d]/5">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #141413 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border-2 border-[#e8e6dc] shadow-sm">
                <Star className="w-4 h-4 text-[#d97757] fill-[#d97757]" />
                <span className="text-sm text-[#788c5d]">北京理工大学出版社官方出品</span>
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl text-[#141413] leading-tight">
                  让科学学习
                  <br />
                  <span className="bg-gradient-to-r from-[#d97757] via-[#6a9bcc] to-[#788c5d] bg-clip-text text-transparent">
                    更有趣更高效
                  </span>
                </h1>
                <p className="text-lg text-[#b0aea5] leading-relaxed max-w-xl">
                  专为1-6年级学生打造的数字化学习平台
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link href="/ebooks">
                  <Button className="bg-[#d97757] hover:bg-[#d97757]/90 text-white px-8 py-6 shadow-lg hover:shadow-xl transition-all">
                    <Sparkles className="mr-2 w-5 h-5" />
                    立即开始学习
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-4 pt-8">
                {highlights.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                        <Icon className="w-5 h-5 text-[#d97757]" />
                      </div>
                      <span className="text-sm text-[#141413]">{item.text}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative lg:block hidden">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1613271752699-ede48a285196?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGxlYXJuaW5nJTIwc2NpZW5jZSUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NjIxNDAwMjB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Children learning science"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <Badge className="bg-[#6a9bcc]/10 text-[#6a9bcc] border-[#6a9bcc]/20 mb-4">
            六大核心模块
          </Badge>
          <h2 className="text-3xl sm:text-4xl text-[#141413] mb-4">
            完整的科学学习体系
          </h2>
          <p className="text-lg text-[#b0aea5] max-w-2xl mx-auto">
            从阅读到实验，从测评到游戏，全方位提升科学素养
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Link key={feature.id} href={feature.href}>
                <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-[#e8e6dc] hover:border-[#d97757] bg-white hover:-translate-y-1 overflow-hidden">
                  <div className="relative h-48">
                    <img
                      src={FEATURE_IMAGES[feature.id as keyof typeof FEATURE_IMAGES]}
                      alt={feature.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${feature.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
                    <div className="absolute top-4 left-4">
                      <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-6 h-6 text-[#141413]" />
                      </div>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl text-[#141413]">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-[#b0aea5] leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center text-[#d97757] group-hover:gap-2 transition-all">
                      <span>了解更多</span>
                      <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-[#d97757]/10 via-[#6a9bcc]/10 to-[#788c5d]/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: '优质电子书', value: '100+', icon: BookOpen, color: 'text-[#d97757]' },
              { label: '互动实验', value: '50+', icon: FlaskConical, color: 'text-[#6a9bcc]' },
              { label: '知识点', value: '1000+', icon: Sparkles, color: 'text-[#788c5d]' },
              { label: '学习用户', value: '10000+', icon: Users, color: 'text-[#d97757]' },
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center group">
                  <Icon className={`w-8 h-8 mx-auto mb-3 ${stat.color} group-hover:scale-110 transition-transform`} />
                  <div className="text-3xl sm:text-4xl text-[#141413] mb-2">
                    {stat.value}
                  </div>
                  <div className="text-[#b0aea5]">
                    {stat.label}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-br from-[#d97757] to-[#6a9bcc] rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            开始你的科学探索之旅
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            立即注册，获得专属学习路径和AI助教指导
          </p>
          <Link href="/ebooks">
            <Button size="lg" variant="secondary" className="bg-white text-[#d97757] hover:bg-[#faf9f5] px-8 py-6 shadow-lg">
              立即体验
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
