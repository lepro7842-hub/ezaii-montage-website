'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

export interface MainNavProps {
  siteTitle: string
  ctaLabel: string
  ctaHref: string
  isScrolled: boolean
  isMenuOpen: boolean
  onMenuToggle: () => void
  onCtaClick: () => void
}

export function MainNav({
  siteTitle,
  ctaLabel,
  ctaHref,
  isScrolled,
  isMenuOpen,
  onMenuToggle,
  onCtaClick,
}: MainNavProps) {
  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-slate-900/95 backdrop-blur-md shadow-lg shadow-slate-950/50'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between sm:h-20">
          {/* Site Title */}
          <motion.a
            href="#hero"
            className="group relative text-xl font-bold tracking-tight text-white sm:text-2xl"
            style={{ fontFamily: 'var(--font-heading)' }}
            animate={{ y: [-3, 3, -3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="relative z-10">{siteTitle}</span>
            <span className="absolute inset-0 -z-0 scale-x-0 bg-blue-500/20 transition-transform duration-300 group-hover:scale-x-100" />
          </motion.a>

          {/* Right side: CTA + Burger */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* CTA Button */}
            <div className="relative hidden sm:block">
              <motion.div
                className="absolute -inset-1 rounded-full bg-blue-500/40 blur-md"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.a
                href={ctaHref}
                onClick={(e) => {
                  e.preventDefault()
                  onCtaClick()
                }}
                className="relative rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-blue-500"
                whileHover={{
                  scale: 1.08,
                  boxShadow: '0 0 25px rgba(59, 130, 246, 0.6), 0 5px 30px rgba(59, 130, 246, 0.4)',
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {ctaLabel}
              </motion.a>
            </div>

            {/* Burger Menu Button */}
            <button
              type="button"
              onClick={onMenuToggle}
              className="relative flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-slate-800/50"
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isMenuOpen}
            >
              <div className="flex h-5 w-6 flex-col justify-between">
                <span
                  className={cn(
                    'block h-0.5 w-full rounded-full bg-white transition-all duration-300 origin-center',
                    isMenuOpen && 'translate-y-[9px] rotate-45'
                  )}
                />
                <span
                  className={cn(
                    'block h-0.5 w-full rounded-full bg-white transition-all duration-300',
                    isMenuOpen && 'scale-x-0 opacity-0'
                  )}
                />
                <span
                  className={cn(
                    'block h-0.5 w-full rounded-full bg-white transition-all duration-300 origin-center',
                    isMenuOpen && '-translate-y-[9px] -rotate-45'
                  )}
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
