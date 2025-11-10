'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { useRef, useState } from 'react'

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
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30, mass: 0.5 })
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30, mass: 0.5 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <Link href={href} className="block h-full">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ 
          duration: 0.5, 
          delay: index * 0.1,
          type: "spring",
          stiffness: 100
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full"
      >
        <Card className="group cursor-pointer border-[#e8e6dc] hover:border-[#d97757] bg-[#faf9f5]/95 backdrop-blur-sm overflow-visible h-full transition-all duration-300 hover:shadow-2xl will-change-transform relative z-10">
          {/* 光泽扫过效果 */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: '-100%' }}
            animate={isHovered ? { x: '100%' } : { x: '-100%' }}
            transition={{ duration: 0.6 }}
            style={{ zIndex: 10 }}
          />

          <div className="relative p-6">
            {/* 数字图标 - 统一容器尺寸 */}
            <motion.div
              className="relative mb-6 flex items-center justify-center"
              animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="w-20 h-20 flex items-center justify-center">
                <img
                  src={numberImage}
                  alt={title}
                  className="max-w-full max-h-full object-contain drop-shadow-lg"
                />
              </div>
              
              {/* 环绕的小图标 */}
              {isHovered && (
                <>
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-8 h-8 rounded-full ${bgColor} flex items-center justify-center`}
                      initial={{ scale: 0, x: 0, y: 0 }}
                      animate={{
                        scale: [0, 1, 1],
                        x: [0, Math.cos((i * 120 * Math.PI) / 180) * 60],
                        y: [0, Math.sin((i * 120 * Math.PI) / 180) * 60],
                        opacity: [0, 1, 0]
                      }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      style={{ top: '50%', left: '50%' }}
                    >
                      <Icon className="w-4 h-4 text-[#141413]" />
                    </motion.div>
                  ))}
                </>
              )}
            </motion.div>

            <CardHeader className="pb-2 px-0">
              <CardTitle className="text-xl text-[#141413] text-center min-h-[2rem]">
                {title}
              </CardTitle>
              <CardDescription className="text-[#b0aea5] leading-relaxed text-center min-h-[3rem] flex items-center justify-center">
                {description}
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-4 px-0">
              <motion.div 
                className="flex items-center justify-center text-[#d97757] gap-2"
                animate={isHovered ? { gap: '0.75rem' } : { gap: '0.5rem' }}
              >
                <span>了解更多</span>
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </CardContent>
          </div>
        </Card>
      </motion.div>
    </Link>
  )
}
