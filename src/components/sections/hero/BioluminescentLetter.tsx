'use client'

import { useEffect, useState } from 'react'

interface BioluminescentLetterProps {
  letter: string
  revealed: boolean
  glowColor: string
  delay: number
}

export function BioluminescentLetter({
  letter,
  revealed,
  delay,
}: BioluminescentLetterProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (revealed) {
      const timer = setTimeout(() => setIsAnimating(true), delay + 500)
      return () => clearTimeout(timer)
    }
  }, [revealed, delay])

  return (
    <span
      className="relative inline-block transition-all"
      style={{
        transitionDuration: '1000ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: `${delay}ms`,
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
        filter: revealed ? 'blur(0px)' : 'blur(4px)',
      }}
    >
      {/* Subtle ambient glow */}
      <span
        aria-hidden="true"
        className="absolute inset-0 text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-light tracking-tight select-none"
        style={{
          fontFamily: "var(--font-brand)",
          color: 'transparent',
          textShadow: `
            0 0 60px rgba(56, 189, 248, 0.2),
            0 0 100px rgba(34, 211, 238, 0.1)
          `,
          opacity: revealed ? 1 : 0,
          transition: 'opacity 1500ms ease-out',
          transitionDelay: `${delay + 300}ms`,
        }}
      >
        {letter}
      </span>

      {/* Main letter with underwater gradient */}
      <span
        className="relative text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-light tracking-tight"
        style={{
          fontFamily: "var(--font-brand)",
          background: `linear-gradient(170deg,
            rgba(224, 242, 254, 1) 0%,
            rgba(186, 230, 253, 1) 25%,
            rgba(125, 211, 252, 1) 50%,
            rgba(56, 189, 248, 0.95) 75%,
            rgba(14, 165, 233, 0.9) 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {letter}
      </span>

      {/* Caustics overlay */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-light tracking-tight select-none ${isAnimating ? 'animate-caustics' : ''}`}
        style={{
          fontFamily: "var(--font-brand)",
          background: `linear-gradient(
            45deg,
            transparent 0%,
            rgba(255, 255, 255, 0.15) 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.1) 75%,
            transparent 100%
          )`,
          backgroundSize: '200% 200%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          opacity: revealed ? 1 : 0,
          transition: 'opacity 800ms ease-out',
          transitionDelay: `${delay + 200}ms`,
          mixBlendMode: 'overlay',
        }}
      >
        {letter}
      </span>

      {/* Shimmer highlight */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-light tracking-tight select-none ${isAnimating ? 'animate-shimmer' : ''}`}
        style={{
          fontFamily: "var(--font-brand)",
          background: `linear-gradient(
            110deg,
            transparent 0%,
            transparent 40%,
            rgba(255, 255, 255, 0.4) 50%,
            transparent 60%,
            transparent 100%
          )`,
          backgroundSize: '200% 100%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          opacity: revealed ? 0.6 : 0,
          transition: 'opacity 1000ms ease-out',
          transitionDelay: `${delay + 400}ms`,
        }}
      >
        {letter}
      </span>

      {/* Soft edge glow */}
      <span
        aria-hidden="true"
        className="absolute inset-0 text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-light tracking-tight select-none"
        style={{
          fontFamily: "var(--font-brand)",
          color: 'transparent',
          textShadow: `
            0 2px 4px rgba(14, 165, 233, 0.3),
            0 4px 8px rgba(6, 182, 212, 0.2)
          `,
          opacity: revealed ? 1 : 0,
          transition: 'opacity 1200ms ease-out',
          transitionDelay: `${delay + 100}ms`,
        }}
      >
        {letter}
      </span>

      <style>{`
        @keyframes caustics {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .animate-caustics { animation: caustics 8s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 6s ease-in-out infinite; animation-delay: 2s; }
      `}</style>
    </span>
  )
}
