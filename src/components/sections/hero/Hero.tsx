'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

export interface HeroContent {
  brandName: string
  tagline: string
  ctaText: string
  ctaTarget: string
}

export interface HeroAssets {
  videoSrc: string
  fishLottieSrc: string
  backgroundColor: string
}

export interface AnimationConfig {
  letterRevealDelay: number
  taglineDelay: number
  ctaDelay: number
  glowColor: string
}

export interface HeroProps {
  content: HeroContent
  assets: HeroAssets
  animationConfig: AnimationConfig
  onCtaClick?: () => void
  onVideoEnd?: () => void
  onAnimationComplete?: () => void
}

const NAV_LINKS = [
  { label: 'EZAII', href: '#hero' },
  { label: 'PORTFOLIO', href: '#portfolio' },
  { label: 'TARIFS', href: '#tarifs' },
  { label: 'AVIS', href: '#temoignages' },
  { label: 'CONTACT', href: '#contact' },
]

const BAR_COUNT = 7

export function Hero({
  content,
  onCtaClick,
  onAnimationComplete,
}: HeroProps) {
  const [curtainPhase, setCurtainPhase] = useState<'closed' | 'opening' | 'open'>('closed')
  const [showContent, setShowContent] = useState(false)
  const [showTagline, setShowTagline] = useState(false)
  const [showNav, setShowNav] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const mousePos = useRef({ x: 0.5, y: 0.5 })
  const currentPos = useRef({ x: 0.5, y: 0.5 })

  const letters = content.brandName.toUpperCase().split('')

  // Animation timeline
  useEffect(() => {
    const t1 = setTimeout(() => setCurtainPhase('opening'), 100)
    const t2 = setTimeout(() => setShowContent(true), 750)
    const t3 = setTimeout(() => setCurtainPhase('open'), 1300)
    const t4 = setTimeout(() => setShowNav(true), 1500)
    const t5 = setTimeout(() => {
      setShowTagline(true)
      onAnimationComplete?.()
    }, 1800)

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5) }
  }, [onAnimationComplete])

  // Smooth cursor glow
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    mousePos.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    }
  }, [])

  useEffect(() => {
    const animate = () => {
      const lerp = 0.06
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * lerp
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * lerp

      if (glowRef.current) {
        const x = currentPos.current.x * 100
        const y = currentPos.current.y * 100
        glowRef.current.style.background = `radial-gradient(600px circle at ${x}% ${y}%, rgba(59, 130, 246, 0.12), rgba(99, 102, 241, 0.06), transparent 60%)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  // Track scroll for sticky nav
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isTransitioning = useRef(false)
  const navRef = useRef<HTMLDivElement>(null)

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href)
    if (!el || isTransitioning.current) return
    isTransitioning.current = true

    const nav = navRef.current

    // Pull nav up
    if (nav) {
      nav.style.transition = 'transform 0.2s cubic-bezier(0.7, 0, 1, 0.7)'
      nav.style.transform = 'translateY(-100%)'
    }

    // Scroll to section
    el.scrollIntoView({ behavior: 'smooth' })

    // Drop nav back down with bounce after scroll starts
    setTimeout(() => {
      if (nav) {
        nav.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
        nav.style.transform = 'translateY(0)'
      }

      setTimeout(() => {
        if (nav) {
          nav.style.transition = ''
          nav.style.transform = ''
        }
        isTransitioning.current = false
      }, 550)
    }, 400)
  }


  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full overflow-hidden bg-black"
    >
      {/* === CURTAIN BARS === */}
      <div
        className="absolute inset-0 z-30 flex pointer-events-none"
        style={{
          opacity: curtainPhase === 'open' ? 0 : 1,
          transition: 'opacity 0.4s ease-out 0.5s',
        }}
      >
        {Array.from({ length: BAR_COUNT }).map((_, i) => {
          const center = (BAR_COUNT - 1) / 2
          const distFromCenter = Math.abs(i - center)
          const delay = distFromCenter * 0.08
          const isOpening = curtainPhase === 'opening' || curtainPhase === 'open'

          return (
            <div
              key={i}
              className="flex-1 origin-top"
              style={{
                backgroundColor: '#ffffff',
                transform: isOpening ? 'scaleY(0)' : 'scaleY(1)',
                transition: `transform 1.2s cubic-bezier(0.76, 0, 0.24, 1)`,
                transitionDelay: `${delay}s`,
              }}
            />
          )
        })}
      </div>

      {/* === BLUE ELECTRIC GLOW (bottom, like reference red/orange) === */}
      <div
        className="absolute pointer-events-none z-[1]"
        style={{
          bottom: '-20%',
          left: '-10%',
          width: '120%',
          height: '70%',
          background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(29, 78, 216, 0.3) 0%, rgba(59, 130, 246, 0.15) 25%, rgba(99, 102, 241, 0.08) 45%, transparent 65%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Cursor-following glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none z-[2]"
      />

      {/* === OCEAN BUBBLES === */}
      <div className="absolute inset-0 pointer-events-none z-[3] overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-bubble"
            style={{
              width: `${3 + (i % 4) * 2}px`,
              height: `${3 + (i % 4) * 2}px`,
              left: `${8 + i * 7.5}%`,
              bottom: '-10px',
              background: `radial-gradient(circle at 30% 30%, rgba(147, 197, 253, ${0.15 + (i % 3) * 0.05}), rgba(59, 130, 246, ${0.06 + (i % 3) * 0.03}))`,
              boxShadow: `0 0 ${4 + i % 3}px rgba(147, 197, 253, 0.1)`,
              animationDelay: `${i * 1.8}s`,
              animationDuration: `${8 + (i % 5) * 3}s`,
            }}
          />
        ))}
      </div>

      {/* === NAV ROW (fixed, stays on top when scrolling) === */}
      <div
        ref={navRef}
        className="fixed top-0 inset-x-0 z-[60]"
        style={{
          opacity: showNav ? 1 : 0,
          transform: showNav ? 'translateY(0)' : 'translateY(-30px)',
          transition: 'all 0.5s cubic-bezier(0.34, 1.6, 0.64, 1)',
        }}
      >
        <div
          className="mx-auto"
          style={{
            background: 'rgba(30, 30, 40, 0.45)',
            backdropFilter: 'blur(40px) saturate(1.8)',
            WebkitBackdropFilter: 'blur(40px) saturate(1.8)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 1px 0 rgba(255,255,255,0.05) inset, 0 4px 20px rgba(0,0,0,0.3)',
          }}
        >
          <div className="flex items-stretch">
            {NAV_LINKS.map((link, i) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="flex-1 py-4 sm:py-5 text-[10px] sm:text-xs tracking-[0.2em] uppercase text-white/60 hover:text-white hover:bg-white/[0.06] transition-all duration-300 text-center"
                style={{
                  fontFamily: 'var(--font-heading)',
                  borderRight: i < NAV_LINKS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                }}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
        {/* Magnetic distortion field below nav */}
        <div
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            top: '100%',
            height: '28px',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 40%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 40%, transparent 100%)',
          }}
        />
      </div>

      {/* === GIANT BRAND NAME — revealed by curtain bars === */}
      <div className="absolute inset-x-0 top-[10vh] sm:top-[12vh] z-10 overflow-hidden">
        <h1
          className="flex justify-center items-baseline"
          style={{ fontFamily: 'var(--font-brand)' }}
        >
          {letters.map((letter, index) => (
            <span
              key={index}
              className="inline-block"
              style={{
                fontSize: 'clamp(5rem, 18vw, 16rem)',
                fontWeight: 400,
                letterSpacing: '0.08em',
                lineHeight: 0.9,
                color: 'white',
                opacity: showContent ? 1 : 0,
                transform: showContent ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.97)',
                transition: 'all 0.9s cubic-bezier(0.25, 0.1, 0.25, 1)',
                transitionDelay: `${index * 0.1}s`,
              }}
            >
              {letter}
            </span>
          ))}
        </h1>
      </div>

      {/* === TAGLINE (centered, below brand name) === */}
      <div
        className="absolute inset-x-0 top-[calc(10vh+clamp(5rem,18vw,16rem)+1.5rem)] sm:top-[calc(12vh+clamp(5rem,18vw,16rem)+2rem)] z-10 flex justify-center px-6"
        style={{
          opacity: showTagline ? 1 : 0,
          transform: showTagline ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <p
          className="text-sm sm:text-base md:text-lg leading-relaxed text-center max-w-lg sm:max-w-xl"
          style={{
            fontFamily: 'var(--font-body)',
            color: 'rgba(255, 255, 255, 0.5)',
          }}
        >
          {content.tagline}
        </p>
      </div>

      {/* === SUBTLE WAVE LINE === */}
      <div className="absolute bottom-0 inset-x-0 z-[4] pointer-events-none overflow-hidden" style={{ height: '2px' }}>
        <div className="animate-wave-line" style={{
          width: '200%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent 0%, rgba(147, 197, 253, 0.3) 25%, rgba(59, 130, 246, 0.5) 50%, rgba(147, 197, 253, 0.3) 75%, transparent 100%)',
        }} />
      </div>

      {/* === BOTTOM METADATA (like reference: ©2025 / ROLE / LOCATION) === */}
      <div
        className="absolute bottom-4 sm:bottom-6 inset-x-0 z-10 px-6 sm:px-12 md:px-16"
        style={{
          opacity: showTagline ? 1 : 0,
          transition: 'opacity 0.8s ease-out 0.3s',
        }}
      >
        <div
          className="flex items-center gap-8 sm:gap-16 text-[10px] sm:text-xs tracking-[0.15em] uppercase text-white/20"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <span>&copy;Ezaii</span>
          <span>MONTEUR YOUTUBE</span>
          <span>Belgique</span>
        </div>
      </div>

    </div>
  )
}
