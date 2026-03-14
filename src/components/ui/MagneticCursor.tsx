'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface MagneticCursorProps {
  label?: string
}

export function MagneticCursor({ label = 'PLAY' }: MagneticCursorProps) {
  const [visible, setVisible] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, { stiffness: 150, damping: 20 })
  const springY = useSpring(cursorY, { stiffness: 150, damping: 20 })
  const targetsRef = useRef<HTMLElement[]>([])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX)
    cursorY.set(e.clientY)

    const target = (e.target as HTMLElement)?.closest('[data-magnetic-cursor]') as HTMLElement | null
    if (target) {
      if (!visible) setVisible(true)
    } else {
      if (visible) setVisible(false)
    }
  }, [visible, cursorX, cursorY])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  // Only show on desktop (pointer: fine)
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    setIsDesktop(window.matchMedia('(pointer: fine)').matches)
  }, [])

  if (!isDesktop) return null

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      style={{
        x: springX,
        y: springY,
      }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full bg-blue-500 text-white font-bold text-xs tracking-widest"
        style={{ fontFamily: 'var(--font-heading)' }}
        initial={{ width: 0, height: 0, opacity: 0 }}
        animate={{
          width: visible ? 72 : 0,
          height: visible ? 72 : 0,
          opacity: visible ? 1 : 0,
          x: -36,
          y: -36,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 25,
        }}
      >
        {visible && label}
      </motion.div>
    </motion.div>
  )
}
