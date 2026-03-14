'use client'

import { useState, useCallback, type ReactNode, type MouseEvent } from 'react'

interface RippleButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
}

interface Ripple {
  id: number
  x: number
  y: number
}

let rippleId = 0

export function RippleButton({ children, onClick, className = '' }: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([])

  const handleClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = ++rippleId

    setRipples(prev => [...prev, { id, x, y }])
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 800)

    onClick?.()
  }, [onClick])

  return (
    <button
      onClick={handleClick}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 0,
            height: 0,
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(34, 211, 238, 0.4) 0%, rgba(99, 102, 241, 0.15) 50%, transparent 70%)',
            animation: 'rippleExpand 800ms ease-out forwards',
          }}
        />
      ))}
      <style jsx>{`
        @keyframes rippleExpand {
          to {
            width: 500px;
            height: 500px;
            opacity: 0;
          }
        }
      `}</style>
    </button>
  )
}
