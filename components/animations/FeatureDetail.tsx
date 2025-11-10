'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface FeatureDetailProps {
  title: string
  description: string
  imagePath: string
  index: number
  reverse?: boolean
}

export function FeatureDetail({ title, description, imagePath, index, reverse = false }: FeatureDetailProps) {
  return (
    <div className="relative py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className={`grid lg:grid-cols-2 gap-8 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>
          {/* 文案区域 */}
          <motion.div
            initial={{ opacity: 0, x: reverse ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`space-y-6 ${reverse ? 'lg:order-2' : ''}`}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-4xl sm:text-5xl text-[#141413] font-bold mb-6 leading-tight">
                {title}
              </h2>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-[#788c5d] leading-relaxed"
            >
              {description}
            </motion.p>
          </motion.div>

          {/* 图片区域 */}
          <motion.div
            initial={{ opacity: 0, x: reverse ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`relative ${reverse ? 'lg:order-1' : ''}`}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src={imagePath}
                alt={title}
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
