import { useState, useRef, useCallback } from 'react'
import type { TemoignagesProps, Testimonial } from '../types'
import { TestimonialCard } from './TestimonialCard'

export function TestimonialStack({ testimonials, onChannelClick }: TemoignagesProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)
  const startX = useRef(0)
  const startY = useRef(0)
  const isHorizontalSwipe = useRef<boolean | null>(null)

  const SWIPE_THRESHOLD = 100
  const MAX_VISIBLE_CARDS = 3

  const handleDragStart = useCallback((clientX: number, clientY: number) => {
    startX.current = clientX
    startY.current = clientY
    isHorizontalSwipe.current = null
    setIsDragging(true)
    setExitDirection(null)
  }, [])

  const handleDragMove = useCallback((clientX: number, clientY: number) => {
    if (!isDragging) return

    const deltaX = clientX - startX.current
    const deltaY = clientY - startY.current

    // Determine swipe direction on first significant movement
    if (isHorizontalSwipe.current === null && (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10)) {
      isHorizontalSwipe.current = Math.abs(deltaX) > Math.abs(deltaY)
    }

    // Only process horizontal swipes
    if (isHorizontalSwipe.current) {
      setDragOffset(deltaX)
    }
  }, [isDragging])

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return

    const shouldSwipe = Math.abs(dragOffset) > SWIPE_THRESHOLD

    if (shouldSwipe && isHorizontalSwipe.current) {
      const direction = dragOffset > 0 ? 'right' : 'left'
      setExitDirection(direction)

      // After animation, move to next card
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
        setExitDirection(null)
        setDragOffset(0)
      }, 300)
    } else {
      setDragOffset(0)
    }

    setIsDragging(false)
    isHorizontalSwipe.current = null
  }, [isDragging, dragOffset, testimonials.length])

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    handleDragStart(e.clientX, e.clientY)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX, e.clientY)
  }

  const handleMouseUp = () => {
    handleDragEnd()
  }

  const handleMouseLeave = () => {
    if (isDragging) {
      handleDragEnd()
    }
  }

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    handleDragStart(touch.clientX, touch.clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    handleDragMove(touch.clientX, touch.clientY)
  }

  const handleTouchEnd = () => {
    handleDragEnd()
  }

  // Navigate via dots
  const goToIndex = (index: number) => {
    if (index !== currentIndex) {
      setExitDirection(index > currentIndex ? 'left' : 'right')
      setTimeout(() => {
        setCurrentIndex(index)
        setExitDirection(null)
      }, 300)
    }
  }

  // Get visible testimonials (current + next few for stack effect)
  const getVisibleTestimonials = () => {
    const visible: { testimonial: Testimonial; stackIndex: number }[] = []
    for (let i = 0; i < Math.min(MAX_VISIBLE_CARDS, testimonials.length); i++) {
      const index = (currentIndex + i) % testimonials.length
      visible.push({ testimonial: testimonials[index], stackIndex: i })
    }
    return visible.reverse() // Reverse so we render back-to-front
  }

  const visibleTestimonials = getVisibleTestimonials()

  // Calculate active card transform
  const getActiveCardStyle = (): React.CSSProperties => {
    if (exitDirection) {
      return {
        transform: `translateX(${exitDirection === 'left' ? '-120%' : '120%'}) rotate(${exitDirection === 'left' ? '-15deg' : '15deg'})`,
        opacity: 0,
        transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)'
      }
    }
    if (isDragging && isHorizontalSwipe.current) {
      const rotation = dragOffset * 0.05
      return {
        transform: `translateX(${dragOffset}px) rotate(${rotation}deg)`,
        transition: 'none'
      }
    }
    return {}
  }

  return (
    <section className="relative w-full min-h-[500px] sm:min-h-[550px] md:min-h-[500px] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Section title */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
          Ce qu'ils en pensent
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-lg">
          Les retours de YouTubeurs satisfaits
        </p>
      </div>

      {/* Card stack container */}
      <div
        ref={containerRef}
        className="relative w-full max-w-lg h-[300px] sm:h-[320px] cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {visibleTestimonials.map(({ testimonial, stackIndex }) => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            isActive={stackIndex === 0}
            stackIndex={stackIndex}
            totalCards={MAX_VISIBLE_CARDS}
            onChannelClick={() => onChannelClick?.(testimonial)}
            style={stackIndex === 0 ? getActiveCardStyle() : undefined}
          />
        ))}
      </div>

      {/* Swipe hint */}
      <p className="mt-6 text-sm text-slate-500 dark:text-slate-500 flex items-center gap-2">
        <svg className="w-5 h-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
        </svg>
        Glissez pour découvrir
      </p>

      {/* Pagination dots */}
      <div className="mt-6 flex items-center gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToIndex(index)}
            className={`
              h-2.5 rounded-full transition-all duration-300 ease-out
              ${index === currentIndex
                ? 'w-8 bg-blue-500 dark:bg-blue-400'
                : 'w-2.5 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'
              }
            `}
            aria-label={`Témoignage ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
