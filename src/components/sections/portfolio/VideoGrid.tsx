'use client'

import { useState } from 'react'
import type { PortfolioVideo } from './Portfolio'
import { StaggerContainer, StaggerItem } from '@/components/ui/MotionWrappers'

interface VideoGridProps {
  videos: PortfolioVideo[]
  onVideoSelect?: (id: string) => void
}

function VideoCard({ video, onSelect }: { video: PortfolioVideo; onSelect?: (id: string) => void }) {
  const [isHovered, setIsHovered] = useState(false)

  const embedUrl = `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${video.youtubeId}&modestbranding=1&showinfo=0&rel=0&start=0&end=15`

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative rounded-2xl overflow-hidden h-full"
    >
      <button
        onClick={() => onSelect?.(video.id)}
        className="group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded-2xl w-full h-full"
      >
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-800 border border-slate-700/50 transition-all duration-500">
          {/* Thumbnail */}
          <div
            className={`absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-110 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
            style={{
              backgroundImage: `url(${video.thumbnailUrl})`,
              backgroundColor: '#1e293b'
            }}
          />

          {/* Video preview on hover */}
          {isHovered && (
            <iframe
              src={embedUrl}
              className="absolute inset-0 w-full h-full"
              allow="autoplay; encrypted-media"
              style={{ border: 'none', pointerEvents: 'none' }}
              tabIndex={-1}
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

          {/* Play button — spins on hover */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isHovered ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}>
            <div className="w-16 h-16 rounded-full bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-600/40 scale-75 group-hover:scale-100 group-hover:rotate-[360deg] transition-all duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)]">
              <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {video.testimonial && (
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500/90 to-orange-500/90 text-white text-xs font-semibold shadow-lg">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
              Témoignage
            </div>
          )}

          {/* Bottom info — fixed height for consistency */}
          <div className="absolute inset-x-0 bottom-0 p-4">
            <div className="h-[3.25rem] flex items-end mb-2">
              <h3 className="text-white font-bold text-sm leading-tight line-clamp-2 flex items-start gap-2">
                <span className="flex-1">{video.title}</span>
                <span className="inline-flex items-center flex-shrink-0 mt-0.5 animate-growth-glow">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                    <polyline points="16 7 22 7 22 13" />
                  </svg>
                </span>
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                {video.clientName.charAt(0)}
              </div>
              <span className="text-slate-400 text-xs font-medium truncate">
                {video.clientChannel}
              </span>
            </div>
          </div>
        </div>
      </button>
    </div>
  )
}

export function VideoGrid({ videos, onVideoSelect }: VideoGridProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-full" />
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            Vidéos
          </h2>
        </div>
        <span className="text-slate-500 text-sm font-medium">
          {videos.length} réalisations
        </span>
      </div>

      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {videos.map((video) => (
          <StaggerItem key={video.id} className="h-full">
            <VideoCard video={video} onSelect={onVideoSelect} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  )
}
