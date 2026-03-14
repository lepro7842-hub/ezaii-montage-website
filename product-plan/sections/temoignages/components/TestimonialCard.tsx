import type { Testimonial } from '../types'

interface TestimonialCardProps {
  testimonial: Testimonial
  isActive: boolean
  stackIndex: number
  totalCards: number
  onChannelClick?: () => void
  style?: React.CSSProperties
}

export function TestimonialCard({
  testimonial,
  isActive,
  stackIndex,
  totalCards,
  onChannelClick,
  style
}: TestimonialCardProps) {
  // Calculate visual depth based on position in stack
  const scale = 1 - stackIndex * 0.05
  const translateY = stackIndex * 8
  const opacity = Math.max(0.4, 1 - stackIndex * 0.2)
  const blur = stackIndex > 0 ? stackIndex * 0.5 : 0

  return (
    <div
      className="absolute inset-0 touch-pan-y"
      style={{
        transform: `translateY(${translateY}px) scale(${scale})`,
        opacity,
        filter: blur > 0 ? `blur(${blur}px)` : undefined,
        zIndex: totalCards - stackIndex,
        transition: isActive ? 'none' : 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
        ...style
      }}
    >
      <div
        className={`
          relative h-full w-full overflow-hidden rounded-3xl
          bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900
          dark:from-slate-950 dark:via-slate-900 dark:to-slate-950
          border border-slate-700/50 dark:border-slate-600/30
          shadow-2xl shadow-blue-500/10
        `}
      >
        {/* Decorative quote mark - large and atmospheric */}
        <div className="absolute -top-8 -left-4 text-[180px] font-serif leading-none text-blue-500/10 dark:text-blue-400/10 select-none pointer-events-none">
          "
        </div>

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 via-transparent to-transparent pointer-events-none" />

        {/* Content container */}
        <div className="relative z-10 flex h-full flex-col justify-between p-8 sm:p-10">
          {/* Testimonial text */}
          <div className="flex-1 flex items-center">
            <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-slate-100 dark:text-slate-50 font-light tracking-wide">
              {testimonial.text}
            </p>
          </div>

          {/* Author info */}
          <div className="mt-8 flex items-center gap-4">
            {/* Avatar placeholder with initial */}
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30">
              <span className="text-lg font-bold text-white">
                {testimonial.clientName.charAt(0)}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-semibold text-slate-100 dark:text-white tracking-wide">
                {testimonial.clientName}
              </span>
              <a
                href={testimonial.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation()
                  onChannelClick?.()
                }}
                className="group inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                <svg
                  className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span className="group-hover:underline underline-offset-2">
                  {testimonial.channelName}
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Edge highlight for depth */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-400/20 to-transparent" />
      </div>
    </div>
  )
}
