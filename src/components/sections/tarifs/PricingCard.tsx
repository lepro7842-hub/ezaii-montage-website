'use client'

import { useState } from 'react'

export interface PricingTierData {
  id: string
  name: string
  category: 'longForm' | 'short'
  price: number
  currency: string
  features: string[]
}

interface PricingCardProps {
  tier: PricingTierData
  onOrder?: () => void
  discordLink: string
}

export function PricingCard({ tier, onOrder, discordLink }: PricingCardProps) {
  const [spins, setSpins] = useState(0)

  return (
    <div className="group relative">
      <div
        className="relative flex flex-col h-full rounded-3xl p-6 sm:p-8"
        style={{
          background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 100%)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Top highlight */}
        <div className="absolute inset-x-0 top-0 h-px pointer-events-none rounded-t-3xl" style={{ background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)' }} />

        <div className="mb-6">
          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            {tier.name}
          </h3>
        </div>

        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
            Devis sur mesure
          </p>
        </div>

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

        <a
          href={discordLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onOrder?.()}
          className="group/btn relative block w-full"
          onMouseEnter={() => setSpins(s => s + 1)}
        >
          <div
            className="relative w-full flex items-center justify-center gap-2 text-white font-bold py-4 px-6 rounded-2xl"
            style={{
              background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 8px 32px rgba(0, 0, 0, 0.3)',
            }}
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{
                transform: `rotate(${spins * 360}deg)`,
                transition: 'transform 0.7s cubic-bezier(0.2, 0, 0.1, 1)',
              }}
            >
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            Devis en MP
          </div>
        </a>
      </div>
    </div>
  )
}
