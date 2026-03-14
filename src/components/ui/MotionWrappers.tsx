'use client'

import { type ReactNode } from 'react'
import { motion, type Variants } from 'framer-motion'

// --- Stagger Container for grids ---

const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 20,
    },
  },
}

interface StaggerContainerProps {
  children: ReactNode
  className?: string
}

export function StaggerContainer({ children, className }: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={staggerItemVariants}>
      {children}
    </motion.div>
  )
}

// --- Hover Card with glow ---

interface HoverCardProps {
  children: ReactNode
  className?: string
  glowColor?: string
}

export function HoverCard({ children, className, glowColor = 'rgba(59, 130, 246, 0.4)' }: HoverCardProps) {
  return (
    <motion.div
      className={className}
      whileHover={{
        scale: 1.03,
        boxShadow: `0 0 30px ${glowColor}, 0 0 60px ${glowColor}`,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  )
}

// --- Hover Button with glow ---

interface HoverButtonProps {
  children: ReactNode
  className?: string
  glowColor?: string
  onClick?: (e: React.MouseEvent) => void
}

export function HoverButton({ children, className, glowColor = 'rgba(59, 130, 246, 0.5)', onClick }: HoverButtonProps) {
  return (
    <motion.button
      className={className}
      onClick={onClick}
      whileHover={{
        scale: 1.05,
        boxShadow: `0 0 25px ${glowColor}, 0 10px 40px ${glowColor}`,
      }}
      whileTap={{ scale: 0.97 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
    >
      {children}
    </motion.button>
  )
}

// --- Floating Animation (infinite vertical oscillation) ---

interface FloatingProps {
  children: ReactNode
  className?: string
  amplitude?: number
  duration?: number
}

export function Floating({ children, className, amplitude = 8, duration = 4 }: FloatingProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-amplitude / 2, amplitude / 2, -amplitude / 2],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  )
}
