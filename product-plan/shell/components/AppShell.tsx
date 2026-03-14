import { useState, useEffect } from 'react'
import { MainNav } from './MainNav'
import { MenuOverlay } from './MenuOverlay'

export interface NavigationItem {
  label: string
  href: string
  isActive?: boolean
}

export interface AppShellProps {
  children: React.ReactNode
  navigationItems: NavigationItem[]
  siteTitle?: string
  ctaLabel?: string
  ctaHref?: string
  onNavigate?: (href: string) => void
}

export function AppShell({
  children,
  navigationItems,
  siteTitle = 'Ezaii Montage',
  ctaLabel = 'Me contacter',
  ctaHref = '#contact',
  onNavigate,
}: AppShellProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavigation = (href: string) => {
    setIsMenuOpen(false)
    onNavigate?.(href)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <MainNav
        siteTitle={siteTitle}
        ctaLabel={ctaLabel}
        ctaHref={ctaHref}
        isScrolled={isScrolled}
        isMenuOpen={isMenuOpen}
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
        onCtaClick={() => handleNavigation(ctaHref)}
      />

      <MenuOverlay
        isOpen={isMenuOpen}
        navigationItems={navigationItems}
        onNavigate={handleNavigation}
        onClose={() => setIsMenuOpen(false)}
      />

      <main>{children}</main>
    </div>
  )
}
