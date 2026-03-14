'use client'

import { type ReactNode } from 'react'
import { motion } from 'framer-motion'

interface SectionRevealProps {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  mode?: 'circle' | 'diagonal' | 'wipe'
}

const clipPaths: Record<string, { hidden: string; visible: string }> = {
  circle: {
    hidden: 'circle(0% at 50% 50%)',
    visible: 'circle(150% at 50% 50%)',
  },
  diagonal: {
    hidden: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
    visible: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
  },
  wipe: {
    hidden: 'inset(0 100% 0 0)',
    visible: 'inset(0 0% 0 0)',
  },
}

export function SectionReveal({ children, className, style, mode = 'circle' }: SectionRevealProps) {
  const paths = clipPaths[mode]

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ clipPath: paths.hidden }}
      whileInView={{ clipPath: paths.visible }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
