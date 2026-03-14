import type { PricingTier } from '../types'

interface PricingCardProps {
  tier: PricingTier
  onOrder?: () => void
  discordLink: string
}

export function PricingCard({ tier, onOrder, discordLink }: PricingCardProps) {
  const isShort = tier.category === 'short'

  return (
    <div className="group relative">
      {/* Glow effect on hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-75 blur transition-all duration-500 group-hover:duration-200" />

      {/* Card */}
      <div className="relative flex flex-col h-full bg-slate-900 border border-slate-700/50 rounded-2xl p-6 sm:p-8 transition-all duration-300 group-hover:border-blue-500/50 group-hover:translate-y-[-4px]">
        {/* Tier name */}
        <div className="mb-6">
          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {tier.name}
          </h3>
        </div>

        {/* Price - the "hero" element */}
        <div className="mb-8">
          <div className="flex items-baseline gap-1">
            <span className="text-5xl sm:text-6xl font-black bg-gradient-to-br from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
              {tier.price}
            </span>
            <span className="text-2xl font-bold text-slate-400">{tier.currency}</span>
          </div>
        </div>

        {/* Features list */}
        <ul className="flex-1 space-y-3 mb-8">
          {tier.features.map((feature, idx) => {
            const isHighlight = feature.toLowerCase().includes('économise')
            return (
              <li
                key={idx}
                className={`flex items-start gap-3 text-sm ${isHighlight ? 'text-emerald-400 font-semibold' : 'text-slate-300'}`}
              >
                <span className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${isHighlight ? 'bg-emerald-500/20' : 'bg-blue-500/20'}`}>
                  {isHighlight ? (
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg className="w-3 h-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  )}
                </span>
                {feature}
              </li>
            )
          })}
        </ul>

        {/* CTA Button */}
        <a
          href={discordLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onOrder?.()}
          className="relative group/btn w-full"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl blur-sm opacity-75 group-hover/btn:opacity-100 transition-opacity" />
          <button className="relative w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 active:scale-[0.98]">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            Commander
          </button>
        </a>
      </div>
    </div>
  )
}
