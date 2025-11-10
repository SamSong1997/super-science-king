'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Star, Award, CheckCircle, Sparkles, TrendingUp } from 'lucide-react'
import { useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const highlights = [
  { icon: Award, text: '北京理工大学出版社官方出品' },
  { icon: CheckCircle, text: '对标千元级教育产品' },
  { icon: Sparkles, text: 'AI+多模态交互技术' },
  { icon: TrendingUp, text: '完整学习闭环体系' }
]

export function IntroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.3], [100, 0])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center py-20 bg-white"
    >
      <motion.div 
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{ opacity, y }}
      >
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border-2 border-[#e8e6dc] shadow-sm mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Star className="w-4 h-4 text-[#d97757] fill-[#d97757]" />
          <span className="text-sm text-[#788c5d]">北京理工大学出版社官方出品</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1 
          className="text-4xl sm:text-5xl lg:text-6xl text-[#141413] leading-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          让科学学习
          <br />
          <motion.span 
            className="bg-gradient-to-r from-[#d97757] via-[#6a9bcc] to-[#788c5d] bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              backgroundSize: '200% 200%',
            }}
          >
            更有趣更高效
          </motion.span>
        </motion.h1>

        <motion.p 
          className="text-xl text-[#b0aea5] leading-relaxed mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          专为1-6年级学生打造的数字化学习平台
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <Link href="/ebooks">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-[#d97757] hover:bg-[#d97757]/90 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all">
                <Sparkles className="mr-2 w-5 h-5" />
                立即开始学习
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {highlights.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div 
                key={index} 
                className="flex flex-col items-center gap-3"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <motion.div 
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-[#d97757]/10 to-[#6a9bcc]/10 flex items-center justify-center shadow-sm"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon className="w-7 h-7 text-[#d97757]" />
                </motion.div>
                <span className="text-sm text-[#141413] text-center leading-tight">
                  {item.text}
                </span>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
