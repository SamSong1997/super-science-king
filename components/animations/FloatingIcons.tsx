'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface FloatingIcon {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  icon: string
}

export function FloatingIcons() {
  const [icons, setIcons] = useState<FloatingIcon[]>([])

  useEffect(() => {
    // 随机选择15个科学图标
    const iconNumbers = Array.from({ length: 15 }, () => 
      Math.floor(Math.random() * 60) + 2
    )

    const generatedIcons: FloatingIcon[] = iconNumbers.map((num, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 40 + Math.random() * 40,
      duration: 15 + Math.random() * 10,
      delay: Math.random() * 5,
      icon: `/images/science-icons/画板 ${num}.png`
    }))

    setIcons(generatedIcons)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((icon) => (
        <motion.div
          key={icon.id}
          className="absolute"
          style={{
            left: `${icon.x}%`,
            top: `${icon.y}%`,
            width: icon.size,
            height: icon.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            rotate: [0, Math.random() * 10 - 5, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: icon.duration,
            repeat: Infinity,
            delay: icon.delay,
            ease: "easeInOut"
          }}
        >
          <img 
            src={icon.icon} 
            alt="" 
            className="w-full h-full object-contain opacity-40"
          />
        </motion.div>
      ))}
    </div>
  )
}
