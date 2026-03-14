'use client'

import { useState, useRef } from 'react'
import type { PortfolioShort } from './Portfolio'
import { formatNumber } from '@/lib/utils'
import { motion } from 'framer-motion'

interface ShortsCarouselProps {
  shorts: PortfolioShort[]
}

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 150,
      damping: 20,
      delay: i * 0.08,
    },
  }),
}

export function ShortsCarousel({ shorts }: ShortsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const checkScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const scrollAmount = 320
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    })
  }

  return (
    <div className="relative group">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-gradient-to-b from-red-500 to-red-600 rounded-full" />
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            Shorts
          </h2>
        </div>
        <span className="text-slate-500 text-sm font-medium">
          {shorts.length} créations
        </span>
      </div>

      <button
        onClick={() => scroll('left')}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-slate-900/90 backdrop-blur border border-slate-700/50 flex items-center justify-center transition-all duration-300 ${
          canScrollLeft
            ? 'opacity-0 group-hover:opacity-100 hover:bg-slate-800 hover:border-blue-500/50 hover:scale-110'
            : 'opacity-0 pointer-events-none'
        }`}
        aria-label="Précédent"
      >
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => scroll('right')}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-slate-900/90 backdrop-blur border border-slate-700/50 flex items-center justify-center transition-all duration-300 ${
          canScrollRight
            ? 'opacity-0 group-hover:opacity-100 hover:bg-slate-800 hover:border-blue-500/50 hover:scale-110'
            : 'opacity-0 pointer-events-none'
        }`}
        aria-label="Suivant"
      >
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-4 -mx-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {shorts.map((short, index) => (
            <motion.div
              key={short.id}
              className="flex-shrink-0 w-[180px] md:w-[200px]"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              custom={index}
            >
              <div className="relative rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-300">
                <div className="group/card relative aspect-[9/16] rounded-2xl overflow-hidden bg-slate-800 border border-slate-700/50 transition-colors duration-500 group-hover/card:border-blue-500/30">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/30 transition-transform duration-300 group-hover/card:scale-110">
                        <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  </div>

                  <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-medium">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                    </svg>
                    {formatNumber(short.views)}
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="text-white font-semibold text-sm leading-snug line-clamp-2 mb-2">
                      {short.title}
                    </p>
                    <p className="text-slate-400 text-xs">
                      {short.clientChannel}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
    </div>
  )
}
