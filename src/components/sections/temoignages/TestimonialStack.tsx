'use client'

import { useState, useEffect, useCallback } from 'react'
import { TestimonialCard, type TestimonialData } from './TestimonialCard'
import { SplitTextReveal } from '@/components/ui/SplitTextReveal'
import { FadeIn } from '@/components/ui/FadeIn'

export interface TestimonialStackProps {
  testimonials: TestimonialData[]
}

export function TestimonialStack({ testimonials }: TestimonialStackProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const count = testimonials.length

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setActiveIndex(((index % count) + count) % count)
    setTimeout(() => setIsTransitioning(false), 700)
  }, [isTransitioning, count])

  // Auto-advance every 5s
  useEffect(() => {
    if (count <= 1) return
    const timer = setInterval(() => goTo(activeIndex + 1), 5000)
    return () => clearInterval(timer)
  }, [activeIndex, count, goTo])

  if (testimonials.length === 0) {
    return (
      <section className="min-h-[400px] flex items-center justify-center py-12 px-4">
        <div className="text-center">
          <svg className="w-16 h-16 text-slate-700 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <p className="text-slate-500 text-lg">Aucun témoignage pour le moment</p>
        </div>
      </section>
    )
  }

  const getCardStyle = (index: number): React.CSSProperties => {
    let offset = index - activeIndex
    if (offset > Math.floor(count / 2)) offset -= count
    if (offset < -Math.floor(count / 2)) offset += count

    const isCenter = offset === 0
    const absOffset = Math.abs(offset)

    // Hide cards beyond ±2
    if (absOffset > 2) {
      return {
        opacity: 0,
        transform: `translateX(${offset > 0 ? 500 : -500}px) scale(0.5) rotateY(${offset > 0 ? -40 : 40}deg)`,
        zIndex: 0,
        pointerEvents: 'none',
      }
    }

    // More spacing to avoid overlap
    const translateX = isCenter ? 0 : offset * 360
    const scale = isCenter ? 1 : absOffset === 1 ? 0.78 : 0.6
    const rotateY = isCenter ? 0 : offset > 0 ? -10 : 10
    const opacity = isCenter ? 1 : absOffset === 1 ? 0.5 : 0.25
    const zIndex = isCenter ? 30 : absOffset === 1 ? 20 : 10
    const blur = isCenter ? 0 : absOffset === 1 ? 3 : 6
    const translateZ = isCenter ? 0 : absOffset === 1 ? -120 : -220

    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) scale(${scale}) rotateY(${rotateY}deg)`,
      opacity,
      zIndex,
      filter: blur > 0 ? `blur(${blur}px)` : 'none',
      pointerEvents: isCenter ? 'auto' : 'auto',
    }
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black tracking-tight text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            <SplitTextReveal text="Ce qu'ils en pensent" />
          </h2>
          <FadeIn>
            <p className="text-slate-400 text-lg">
              Les retours de YouTubeurs satisfaits
            </p>
          </FadeIn>
        </div>

        {/* 3D Carousel */}
        <div className="relative h-[360px]" style={{ perspective: '1000px' }}>
          <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => goTo(i)}
                className="absolute w-[320px] sm:w-[380px] cursor-pointer"
                style={{
                  ...getCardStyle(i),
                  transformStyle: 'preserve-3d',
                  transitionProperty: 'transform, opacity, filter',
                  transitionDuration: '700ms',
                  transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                <TestimonialCard testimonial={t} />
              </button>
            ))}
          </div>
        </div>

        {/* Navigation dots */}
        {count > 1 && (
          <div className="flex justify-center gap-2.5 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="rounded-full transition-all duration-500"
                style={{
                  width: i === activeIndex ? '24px' : '8px',
                  height: '8px',
                  background: i === activeIndex
                    ? 'linear-gradient(90deg, #3b82f6, #6366f1)'
                    : 'rgba(100, 116, 139, 0.5)',
                  boxShadow: i === activeIndex ? '0 0 10px rgba(59,130,246,0.4)' : 'none',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
