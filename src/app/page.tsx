'use client'

import { AppShell } from '@/components/shell/AppShell'
import { Hero } from '@/components/sections/hero/Hero'
import { PortfolioSection } from '@/components/sections/portfolio/PortfolioSection'
import { TarifsSection } from '@/components/sections/tarifs/TarifsSection'
import { TemoignagesSection } from '@/components/sections/temoignages/TemoignagesSection'
import { Contact } from '@/components/sections/contact/Contact'

import { SectionDivider } from '@/components/ui/SectionDivider'

const navigationItems = [
  { label: 'Accueil', href: '#hero' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Tarifs', href: '#tarifs' },
  { label: 'Témoignages', href: '#temoignages' },
  { label: 'Contact', href: '#contact' },
]

const heroContent = {
  brandName: 'ezaii',
  tagline: 'Je propulse les vidéos des créateurs avec un montage rythmé à haute rétention.',
  ctaText: 'Me contacter',
  ctaTarget: '#contact',
}

const heroAssets = {
  videoSrc: '/assets/ocean.mp4',
  fishLottieSrc: '/assets/shoal of fish.lottie',
  backgroundColor: '#000000',
}

const heroAnimationConfig = {
  letterRevealDelay: 120,
  taglineDelay: 400,
  ctaDelay: 600,
  glowColor: '#6366f1',
}

const pricingTiers = [
  { id: 'tier-001', name: '1 vidéo', category: 'longForm' as const, price: 128, currency: '€', features: ['Montage complet de ta vidéo', "Jusqu'à 40 min de rush", 'Corrections incluses', 'Livraison sous 5 jours'] },
  { id: 'tier-002', name: 'Pack 2 vidéos', category: 'longForm' as const, price: 240, currency: '€', features: ['2 montages complets', "Jusqu'à 40 min de rush par vidéo", 'Corrections incluses', 'Livraison sous 7 jours', 'Économise 16€'] },
  { id: 'tier-003', name: 'Pack 3 vidéos', category: 'longForm' as const, price: 345, currency: '€', features: ['3 montages complets', "Jusqu'à 40 min de rush par vidéo", 'Corrections incluses', 'Livraison sous 10 jours', 'Économise 39€'] },
  { id: 'tier-004', name: 'Montage Vidéo-Short', category: 'short' as const, price: 15, currency: '€', features: ['Format vertical ou horizontal', 'Réponse sous 48h', 'Montage dynamique & captivant'] },
]

const conditions = [
  'Envoi des rushs',
  'Montage & Feedback',
  'Livraison sous 48h',
]

const contactInfo = {
  headline: 'Prêt à donner vie à tes vidéos ?',
  subheadline: 'Discutons de ton projet et créons ensemble du contenu qui claque.',
  email: 'hello@ezaii-montage.com',
  discordUrl: 'https://discord.com/users/eliott4943',
  discordLabel: 'eliott4943',
}

export default function HomePage() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <AppShell navigationItems={navigationItems}>
      <div data-page-content>
      <section id="hero">
        <Hero
          content={heroContent}
          assets={heroAssets}
          animationConfig={heroAnimationConfig}
          onCtaClick={() => scrollTo('#contact')}
        />
      </section>


      <section id="portfolio">
        <PortfolioSection onScrollToContact={() => scrollTo('#contact')} />
      </section>

      <SectionDivider />

      <section id="tarifs">
        <TarifsSection
          pricingTiers={pricingTiers}
          conditions={conditions}
          discordLink="https://discord.gg/ezaii"
        />
      </section>

      <SectionDivider />

      <section id="temoignages">
        <TemoignagesSection />
      </section>

      <SectionDivider />

      <section id="contact">
        <Contact contactInfo={contactInfo} />
      </section>

      </div>
      {/* Bottom blur veil – progressive fade with raised edges */}
      <div
        className="fixed bottom-0 left-0 right-0 h-44 z-50 pointer-events-none"
        style={{
          backdropFilter: 'blur(40px) saturate(1.4) brightness(0.6)',
          WebkitBackdropFilter: 'blur(40px) saturate(1.4) brightness(0.6)',
          maskImage: 'radial-gradient(ellipse 120% 100% at 50% 120%, black 40%, transparent 70%), linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 30%, rgba(0,0,0,0.6) 55%, black 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 120% 100% at 50% 120%, black 40%, transparent 70%), linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 30%, rgba(0,0,0,0.6) 55%, black 100%)',
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in' as string,
        } as React.CSSProperties}
      />
    </AppShell>
  )
}
