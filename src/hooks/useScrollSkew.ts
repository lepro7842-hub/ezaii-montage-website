'use client'

import { useEffect } from 'react'
import { useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion'

export function useScrollSkew(): MotionValue<string> {
  const scrollVelocity = useMotionValue(0)
  const smoothVelocity = useSpring(scrollVelocity, {
    stiffness: 150,
    damping: 20,
  })
  const skewY = useTransform(smoothVelocity, [-1500, 0, 1500], [-3, 0, 3])
  const skewTransform = useTransform(skewY, (v) => `skewY(${v}deg)`)

  useEffect(() => {
    let lastScrollY = window.scrollY
    let lastTime = performance.now()
    let rafId: number

    const tick = () => {
      const now = performance.now()
      const dt = now - lastTime
      if (dt > 0) {
        const velocity = ((window.scrollY - lastScrollY) / dt) * 1000
        scrollVelocity.set(velocity)
        lastScrollY = window.scrollY
        lastTime = now
      }
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [scrollVelocity])

  return skewTransform
}
