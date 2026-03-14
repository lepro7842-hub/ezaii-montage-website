'use client'

import { useEffect } from 'react'
import { cn } from '@/lib/utils'

export interface NavigationItem {
  label: string
  href: string
  isActive?: boolean
}

export interface MenuOverlayProps {
  isOpen: boolean
  navigationItems: NavigationItem[]
  onNavigate: (href: string) => void
  onClose: () => void
}

export function MenuOverlay({
  isOpen,
  navigationItems,
  onNavigate,
  onClose,
}: MenuOverlayProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  return (
    <div
      className={cn(
        'fixed inset-0 z-40 flex items-center justify-center bg-slate-950 transition-all duration-500',
        isOpen
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0'
      )}
      aria-hidden={!isOpen}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            'absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-blue-600/10 blur-3xl transition-transform duration-1000',
            isOpen ? 'scale-100' : 'scale-0'
          )}
        />
        <div
          className={cn(
            'absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-blue-500/5 blur-3xl transition-transform delay-100 duration-1000',
            isOpen ? 'scale-100' : 'scale-0'
          )}
        />
      </div>

      <nav className="relative z-10">
        <ul className="flex flex-col items-center gap-6 sm:gap-8">
          {navigationItems.map((item, index) => (
            <li
              key={item.href}
              className={cn(
                'transform transition-all duration-500',
                isOpen
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              )}
              style={{
                transitionDelay: isOpen ? `${150 + index * 75}ms` : '0ms',
              }}
            >
              <a
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  onNavigate(item.href)
                }}
                className="group relative block text-4xl font-bold text-slate-50 transition-colors hover:text-blue-400 sm:text-5xl md:text-6xl"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute bottom-0 left-0 h-1 w-0 bg-blue-500 transition-all duration-300 group-hover:w-full" />
                <span className="absolute inset-0 -z-10 scale-110 bg-blue-500/0 blur-2xl transition-all duration-300 group-hover:bg-blue-500/20" />
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div
        className={cn(
          'absolute bottom-12 left-0 right-0 flex justify-center transition-all duration-500 sm:hidden',
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        )}
        style={{ transitionDelay: isOpen ? '400ms' : '0ms' }}
      >
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault()
            onNavigate('#contact')
          }}
          className="rounded-full bg-blue-600 px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/25"
        >
          Me contacter
        </a>
      </div>
    </div>
  )
}
