'use client'

import { useEffect, useState, useCallback } from 'react'

interface FlickerTaglineProps {
  text: string
  visible: boolean
}

export function FlickerTagline({ text, visible }: FlickerTaglineProps) {
  const letters = text.split('')
  const [flickerStates, setFlickerStates] = useState<number[]>(
    () => letters.map(() => 1)
  )

  const triggerFlicker = useCallback(() => {
    if (!visible) return

    const numToFlicker = Math.floor(Math.random() * 3) + 1
    const indices: number[] = []

    for (let i = 0; i < numToFlicker; i++) {
      const idx = Math.floor(Math.random() * letters.length)
      if (!indices.includes(idx)) {
        indices.push(idx)
      }
    }

    setFlickerStates(prev => {
      const newStates = [...prev]
      indices.forEach(idx => {
        newStates[idx] = 0.3 + Math.random() * 0.3
      })
      return newStates
    })

    setTimeout(() => {
      setFlickerStates(prev => {
        const newStates = [...prev]
        indices.forEach(idx => {
          newStates[idx] = 1
        })
        return newStates
      })
    }, 80 + Math.random() * 120)
  }, [visible, letters.length])

  useEffect(() => {
    if (!visible) return

    const startDelay = setTimeout(() => {
      const scheduleNext = () => {
        const delay = 200 + Math.random() * 800
        return setTimeout(() => {
          triggerFlicker()
          scheduleNext()
        }, delay)
      }

      const intervalId = scheduleNext()
      return () => clearTimeout(intervalId)
    }, 1000)

    return () => clearTimeout(startDelay)
  }, [visible, triggerFlicker])

  return (
    <span className="relative inline-block">
      <span
        aria-hidden="true"
        className="absolute inset-0 select-none"
        style={{
          fontFamily: "var(--font-body)",
          WebkitTextStroke: '1px rgba(125, 211, 252, 0.6)',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {text}
      </span>

      <span className="relative">
        {letters.map((letter, index) => (
          <span
            key={index}
            className="inline-block transition-opacity"
            style={{
              transitionDuration: '50ms',
              opacity: flickerStates[index],
              color: 'rgba(186, 230, 253, 0.95)',
              textShadow: flickerStates[index] === 1
                ? '0 0 20px rgba(56, 189, 248, 0.3)'
                : '0 0 10px rgba(56, 189, 248, 0.15)',
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
      </span>
    </span>
  )
}
