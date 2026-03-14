'use client'

export interface TestimonialData {
  id: string
  clientName: string
  channelName: string
  channelUrl: string
  text: string
}

export function TestimonialCard({ testimonial }: { testimonial: TestimonialData }) {
  return (
    <div
      className="relative rounded-2xl p-7 sm:p-8 flex flex-col justify-between min-h-[280px]"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(148, 163, 184, 0.15)',
        boxShadow: '0 8px 40px rgba(15, 23, 42, 0.5), 0 2px 12px rgba(59, 130, 246, 0.06), inset 0 1px 0 rgba(255,255,255,0.1)',
      }}
    >
      {/* Top: quote + text */}
      <div className="flex-1 flex flex-col justify-center">
        <svg className="w-7 h-7 text-blue-400/40 mb-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6 17h3l2-4V7H5v6h3l-2 4zm8 0h3l2-4V7h-6v6h3l-2 4z" />
        </svg>

        <p className="text-slate-100 text-base sm:text-lg leading-relaxed font-medium">
          {testimonial.text}
        </p>
      </div>

      {/* Bottom: stars + author */}
      <div className="mt-6">
        {/* Stars */}
        <div className="flex items-center gap-0.5 mb-4">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
        </div>

        {/* Author */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/10">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/25">
            {testimonial.clientName.charAt(0)}
          </div>
          <div>
            <p className="text-white font-semibold text-sm">{testimonial.clientName}</p>
            <p className="text-slate-400 text-xs">Créateur YouTube</p>
          </div>
        </div>
      </div>
    </div>
  )
}
