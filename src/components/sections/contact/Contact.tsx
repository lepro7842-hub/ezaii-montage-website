'use client'

import { useState } from 'react'
import { SplitTextReveal } from '@/components/ui/SplitTextReveal'
import { FadeIn } from '@/components/ui/FadeIn'

export interface ContactInfo {
  headline: string
  subheadline: string
  email: string
  discordUrl: string
  discordLabel: string
}

export interface ContactProps {
  contactInfo: ContactInfo
}

function ContactCard({
  href,
  label,
  icon,
  accentColor,
  external,
  size = 'default',
}: {
  href: string
  label: string
  icon: React.ReactNode
  accentColor: string
  external?: boolean
  size?: 'default' | 'large'
}) {
  const isLarge = size === 'large'
  const [spins, setSpins] = useState(0)

  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="group relative w-full sm:w-auto block active:scale-[0.97] transition-transform"
      onMouseEnter={() => setSpins(s => s + 1)}
    >
      <div
        className={`relative ${isLarge ? 'px-10 sm:px-16 py-8 sm:py-10' : 'px-8 sm:px-12 py-6 sm:py-7'} rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1`}
        style={{
          background: `linear-gradient(145deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)`,
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: `1px solid rgba(255, 255, 255, 0.12)`,
          boxShadow: `inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.3), 0 0 40px rgba(${accentColor}, 0.06)`,
        }}
      >
        {/* Top highlight */}
        <div
          className="absolute inset-x-0 top-0 h-px pointer-events-none"
          style={{ background: `linear-gradient(90deg, transparent, rgba(${accentColor}, 0.25), transparent)` }}
        />

        {/* Content */}
        <div className={`relative flex items-center justify-center ${isLarge ? 'gap-4 sm:gap-6' : 'gap-3 sm:gap-4'}`}>
          <div
            style={{
              color: `rgba(${accentColor}, 0.9)`,
              transform: `rotate(${spins * 360}deg)`,
              transition: 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            {icon}
          </div>

          <span
            className={`${isLarge ? 'text-xl sm:text-3xl lg:text-4xl' : 'text-lg sm:text-xl lg:text-2xl'} font-semibold tracking-wide transition-all duration-500 group-hover:tracking-wider`}
            style={{
              fontFamily: 'var(--font-heading)',
              color: 'rgba(255, 255, 255, 0.9)',
            }}
          >
            {label}
          </span>

          <svg
            className={`${isLarge ? 'w-6 h-6 sm:w-7 sm:h-7' : 'w-5 h-5 sm:w-6 sm:h-6'} flex-shrink-0 opacity-0 -translate-x-2 group-hover:opacity-70 group-hover:translate-x-0 transition-all duration-300`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            style={{ color: 'rgba(255, 255, 255, 0.7)' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </div>
    </a>
  )
}

export function Contact({ contactInfo }: ContactProps) {
  return (
    <section className="relative w-full overflow-hidden flex items-center justify-center py-20 sm:py-28 px-4 sm:px-6 bg-slate-950 pb-52">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/[0.04] rounded-full blur-[120px]" />
      </div>

      <div className="relative text-center max-w-3xl mx-auto">
        <h2
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-4 text-white"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          <SplitTextReveal text={contactInfo.headline} />
        </h2>

        <FadeIn>
          <p className="text-slate-400 text-base sm:text-lg mb-12 max-w-lg mx-auto">
            {contactInfo.subheadline}
          </p>
        </FadeIn>

        <FadeIn delay={300}>
          <div className="flex flex-col items-center justify-center gap-5 sm:gap-6">
            <ContactCard
              href={contactInfo.discordUrl}
              label={contactInfo.discordLabel}
              accentColor="88, 101, 242"
              external
              size="large"
              icon={
                <svg className="w-8 h-8 sm:w-11 sm:h-11" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                </svg>
              }
            />

            <ContactCard
              href={`mailto:${contactInfo.email}`}
              label={contactInfo.email}
              accentColor="56, 189, 248"
              icon={
                <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              }
            />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
