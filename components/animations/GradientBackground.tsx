'use client'

import { motion } from 'framer-motion'

export function GradientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* 流动的渐变球 */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(217, 119, 87, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          x: ['-10%', '110%'],
          y: ['20%', '80%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(106, 155, 204, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          x: ['110%', '-10%'],
          y: ['80%', '20%'],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(120, 140, 93, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          x: ['50%', '50%'],
          y: ['-10%', '110%'],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}
