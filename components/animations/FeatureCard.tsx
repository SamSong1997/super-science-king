'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, LucideIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface FeatureCardProps {
  id: string
  title: string
  description: string
  href: string
  icon: LucideIcon
  color: string
  bgColor: string
  numberImage: string
  index: number
}

export function FeatureCard({
  title,
  description,
  href,
  icon: Icon,
  color,
  bgColor,
  numberImage,
  index
}: FeatureCardProps) {
  const router = useRouter()
  const [isClicked, setIsClicked] = useState(false)

  const handleTap = () => {
    if (!isClicked) {
      setIsClicked(true)
      // 动画时长 150ms，跳转后重置
      setTimeout(() => {
        router.push(href)
        setTimeout(() => setIsClicked(false), 500)
      }, 150)
    }
  }

  return (
    <motion.div
      className="relative h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <motion.div
        className="block h-full cursor-pointer"
        onTap={handleTap}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <Card className={`group cursor-pointer border-0 ${bgColor} overflow-visible h-full shadow-[0_4px_20px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative z-10`}>
          <div className="relative p-6">
            {/* 数字图标 */}
            <div className="relative mb-8 flex items-center justify-center">
              <div className="w-40 h-40 flex items-center justify-center border-0">
                <img
                  src={numberImage}
                  alt={title}
                  className="w-full h-full object-contain drop-shadow-2xl pointer-events-none border-0"
                  loading="eager"
                />
              </div>
            </div>

            <CardHeader className="pb-4 px-0">
              <CardTitle className="text-3xl text-[#141413] text-center min-h-[3rem] font-bold leading-tight">
                {title}
              </CardTitle>
              <CardDescription className="text-lg text-[#788c5d] leading-relaxed text-center min-h-[4rem] flex items-center justify-center pt-2">
                {description}
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6 px-0">
              <div className="flex items-center justify-center text-[#d97757] text-lg font-medium">
                <span>了解更多</span>
                <div className="ml-2">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}
