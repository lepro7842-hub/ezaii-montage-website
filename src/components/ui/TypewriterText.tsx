'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface HandwrittenRevealProps {
  text: string
  className?: string
  duration?: number
}

export function HandwrittenReveal({
  text,
  className,
  duration = 2000,
}: HandwrittenRevealProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const hasTriggered = useRef(false)
  const [progress, setProgress] = useState(-1) // -1 = not yet triggered

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          hasTriggered.current = true
          observer.disconnect()
          setProgress(0)

          const start = performance.now()

          const tick = (now: number) => {
            const elapsed = now - start
            const t = Math.min(elapsed / duration, 1)
            // ease-out quart: fast start, graceful deceleration
            const eased = 1 - Math.pow(1 - t, 4)
            setProgress(eased)
            if (t < 1) requestAnimationFrame(tick)
          }

          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [duration])

  const chars = text.split('')
  const total = chars.length
  // Soft wave: how many characters fade in simultaneously
  const wave = 4

  const getCharOpacity = useCallback(
    (index: number) => {
      if (progress < 0) return 0
      if (progress >= 1) return 1
      const cursor = progress * (total + wave)
      const charProgress = (cursor - index) / wave
      return Math.max(0, Math.min(1, charProgress))
    },
    [progress, total]
  )

  return (
    <span
      ref={ref}
      className={className}
      style={{ fontFamily: 'var(--font-heading)', display: 'inline-block' }}
      aria-label={text}
    >
      {chars.map((char, i) => (
        <span
          key={i}
          style={{
            opacity: progress < 0 ? 0 : getCharOpacity(i),
            display: 'inline-block',
            minWidth: char === ' ' ? '0.25em' : undefined,
            willChange: progress >= 0 && progress < 1 ? 'opacity' : undefined,
          }}
          aria-hidden
        >
          {char}
        </span>
      ))}
    </span>
  )
}
