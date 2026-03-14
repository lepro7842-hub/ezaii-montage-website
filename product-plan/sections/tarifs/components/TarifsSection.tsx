import type { TarifsProps, PricingTier } from '../types'
import { PricingCard } from './PricingCard'

export function TarifsSection({
  pricingTiers,
  conditions,
  discordLink,
  onOrder
}: TarifsProps) {
  const longFormTiers = pricingTiers.filter((t) => t.category === 'longForm')
  const shortTiers = pricingTiers.filter((t) => t.category === 'short')

  return (
    <section className="relative min-h-screen bg-slate-950 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Video editing "playhead" line */}
        <div className="absolute top-0 left-1/2 w-0.5 h-32 bg-gradient-to-b from-blue-500 to-transparent" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>
            <span className="text-sm font-medium text-blue-400 tracking-wide">
              Tarifs transparents
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4">
            Des prix{' '}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
                clairs
              </span>
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-blue-500/30"
                viewBox="0 0 100 12"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 6 Q 25 0, 50 6 T 100 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                />
              </svg>
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
            Pas de mauvaise surprise. Tu sais exactement ce que tu paies.
          </p>
        </div>

        {/* Long Form Videos Section */}
        <div className="mb-16 sm:mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Vidéos longues
              </h3>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-slate-700 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {longFormTiers.map((tier) => (
              <PricingCard
                key={tier.id}
                tier={tier}
                discordLink={discordLink}
                onOrder={() => onOrder?.(tier.id)}
              />
            ))}
          </div>
        </div>

        {/* Shorts Section */}
        <div className="mb-16 sm:mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Shorts
              </h3>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-slate-700 to-transparent" />
          </div>

          <div className="max-w-md">
            {shortTiers.map((tier) => (
              <PricingCard
                key={tier.id}
                tier={tier}
                discordLink={discordLink}
                onOrder={() => onOrder?.(tier.id)}
              />
            ))}
          </div>
        </div>

        {/* Conditions - Ticker tape style */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/80 backdrop-blur-sm">
          {/* Animated gradient border */}
          <div className="absolute inset-0 rounded-2xl opacity-50">
            <div className="absolute inset-[-2px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-[shimmer_3s_infinite]"
                 style={{
                   backgroundSize: '200% 100%',
                   animation: 'shimmer 3s infinite linear'
                 }}
            />
          </div>

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-16 h-16 overflow-hidden">
            <div className="absolute top-2 left-2 w-2 h-8 bg-gradient-to-b from-blue-500/60 to-transparent rounded-full" />
            <div className="absolute top-2 left-2 w-8 h-2 bg-gradient-to-r from-blue-500/60 to-transparent rounded-full" />
          </div>
          <div className="absolute bottom-0 right-0 w-16 h-16 overflow-hidden">
            <div className="absolute bottom-2 right-2 w-2 h-8 bg-gradient-to-t from-blue-500/60 to-transparent rounded-full" />
            <div className="absolute bottom-2 right-2 w-8 h-2 bg-gradient-to-l from-blue-500/60 to-transparent rounded-full" />
          </div>

          <div className="relative p-6 sm:p-8">
            {/* Header with "terminal" style */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 h-px bg-slate-700" />
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                // conditions
              </span>
            </div>

            {/* Conditions as "code blocks" */}
            <div className="space-y-3">
              {conditions.map((condition, idx) => (
                <div
                  key={idx}
                  className="group flex items-center gap-4 p-3 rounded-lg bg-slate-800/50 border border-slate-700/30 hover:border-blue-500/30 hover:bg-slate-800/80 transition-all duration-200"
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center font-mono text-sm text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                    {condition}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
