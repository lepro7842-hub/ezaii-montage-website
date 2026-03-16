'use client'

import { PricingCard, type PricingTierData } from './PricingCard'
import { SplitTextReveal } from '@/components/ui/SplitTextReveal'
import { FadeIn } from '@/components/ui/FadeIn'

export interface TarifsSectionProps {
  pricingTiers: PricingTierData[]
  conditions?: string[]
  discordLink: string
}

export function TarifsSection({ pricingTiers, discordLink }: TarifsSectionProps) {
  const shortTiers = pricingTiers.filter((t) => t.category === 'short')

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #0a1628 0%, #020617 100%)',
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-10 sm:mb-12">
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <SplitTextReveal text="Estimation rapide" />
          </h2>
          <FadeIn>
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
              Reçois un Devis adapté à tes besoins réels en MP
            </p>
          </FadeIn>
        </div>

        <FadeIn>
        <div className="mb-10 sm:mb-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                Devis
              </h3>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-slate-700 to-transparent" />
          </div>

          <div className="max-w-2xl">
            {shortTiers.map((tier) => (
              <PricingCard key={tier.id} tier={tier} discordLink={discordLink} />
            ))}
          </div>
        </div>
        </FadeIn>

      </div>
    </section>
  )
}
