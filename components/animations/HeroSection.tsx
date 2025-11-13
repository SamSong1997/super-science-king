'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

// 更新后的布局 - 9个图标，按要求调整位置和大小
const heroIcons = [
  // 中间上方 - 放大一倍，居中
  { name: '画板 14.png', size: 200, position: { left: 'calc(50% - 100px)', top: '8%' } },

  // 中间下方 - 放大一倍
  { name: '画板 7.png', size: 240, position: { left: 'calc(50% - 120px)', bottom: '10%' } },

  // 左侧上方 - 放大一倍，往左上移动
  { name: '画板 39.png', size: 220, position: { left: '5%', top: '10%' } },

  // 右侧上方 - 放大一倍
  { name: '画板 49.png', size: 170, position: { right: '5%', top: '12%' } },

  // 右侧中间 - 放大一倍
  { name: '画板 48.png', size: 190, position: { right: '3%', top: '45%' } },

  // 左侧中间
  { name: '画板 29.png', size: 130, position: { left: '5%', top: '50%' } },

  // 左下
  { name: '画板 40.png', size: 140, position: { left: '2%', bottom: '12%' } },

  // 右下
  { name: '画板 51.png', size: 150, position: { right: '3%', bottom: '8%' } },
]

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [vh, setVh] = useState(800)

  // 获取视口高度
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setVh(window.innerHeight)
      const handleResize = () => setVh(window.innerHeight)
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  // 监听整个页面的滚动
  const { scrollY } = useScroll()

  // 背景图标在滚动到视口高度的 50% 时开始淡出，80% 时完全消失
  const iconOpacity = useTransform(
    scrollY,
    [0, vh * 0.5, vh * 0.8],
    [0.85, 0.2, 0]
  )

  // Logo 的变换 - 滚动到第二屏时淡出
  const logoOpacity = useTransform(scrollY, [0, vh * 0.5, vh * 0.8], [1, 0.5, 0])
  const logoScale = useTransform(scrollY, [0, vh * 0.5, vh * 0.8], [1, 0.9, 0.8])
  const logoY = useTransform(scrollY, [0, vh * 0.5, vh * 0.8], [0, -50, -100])

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex items-center justify-center pb-20 overflow-hidden bg-gradient-to-b from-[#faf9f5] to-white"
    >
      {/* 背景渐变 */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#d97757]/5 via-[#6a9bcc]/5 to-[#788c5d]/5" />

      {/* 背景网格 */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #141413 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* 背景图标 - 使用 absolute 定位，随滚动淡出 */}
      {heroIcons.map((icon, index) => {
        return (
          <motion.div
            key={icon.name}
            className="absolute pointer-events-none"
            style={{
              ...icon.position,
              width: icon.size,
              height: icon.size,
              zIndex: 0,
              opacity: iconOpacity,
            }}
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: 0.85,
              scale: [0, 1.1, 1],
            }}
            transition={{
              duration: 1.2,
              delay: 0.3 + index * 0.08,
            }}
          >
            <motion.img
              src={`/images/hero-icons/${icon.name}`}
              alt=""
              className="w-full h-full object-contain drop-shadow-lg"
              animate={{ y: [0, -20, 0] }}
              transition={{
                duration: 3 + index * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2
              }}
            />
          </motion.div>
        )
      })}

      {/* Logo 中心 */}
      <motion.div
        className="relative z-10 flex items-center justify-center"
        style={{ opacity: logoOpacity, scale: logoScale, y: logoY }}
      >
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            type: "spring" as const,
            stiffness: 100
          }}
        >
          <motion.img
            src="/images/logo@1x.png"
            alt="超级理科王"
            className="w-[750px] md:w-[900px] h-auto drop-shadow-2xl"
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>

      {/* 滚动提示 - 在屏幕底部 */}
      <motion.div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-3 z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        style={{ opacity: logoOpacity }}
      >
        <span className="text-base text-[#788c5d] font-medium">向下滚动探索</span>
        {/* 画板 60 在右侧，一起淡出 */}
        <motion.img
          src="/images/hero-icons/画板 60.png"
          alt=""
          className="w-12 h-12 object-contain drop-shadow-lg"
        />
      </motion.div>
    </section>
  )
}
