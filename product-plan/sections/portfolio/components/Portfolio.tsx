import { useState, useMemo } from 'react'
import type { PortfolioProps, Video } from '../types'
import { ShortsCarousel } from './ShortsCarousel'
import { VideoGrid } from './VideoGrid'
import { VideoModal } from './VideoModal'

export function Portfolio({
  videos,
  shorts,
  onVideoSelect,
  onModalClose
}: PortfolioProps) {
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null)

  const selectedVideo = useMemo<Video | null>(() => {
    if (!selectedVideoId) return null
    return videos.find(v => v.id === selectedVideoId) ?? null
  }, [selectedVideoId, videos])

  const handleVideoSelect = (id: string) => {
    setSelectedVideoId(id)
    onVideoSelect?.(id)
  }

  const handleModalClose = () => {
    setSelectedVideoId(null)
    onModalClose?.()
  }

  // Calculate total stats
  const totalViews = videos.reduce((acc, v) => acc + v.views, 0) + shorts.reduce((acc, s) => acc + s.views, 0)
  const totalVideos = videos.length + shorts.length

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Header */}
        <div className="relative py-16 md:py-24 px-4 overflow-hidden">
          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}
          />

          <div className="max-w-6xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 7l-7 5 7 5V7z"/>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
              </svg>
              {totalVideos} créations • {(totalViews / 1_000_000).toFixed(1)}M+ vues totales
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight">
              Mes{' '}
              <span className="relative">
                <span className="relative z-10 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                  Réalisations
                </span>
                <span className="absolute inset-x-0 -bottom-2 h-3 bg-blue-500/20 blur-lg" />
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Découvrez les montages qui ont généré des millions de vues pour mes clients YouTubeurs.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 pb-24 space-y-16">
          {/* Shorts Carousel */}
          <section>
            <ShortsCarousel shorts={shorts} />
          </section>

          {/* Video Grid */}
          <section>
            <VideoGrid
              videos={videos}
              onVideoSelect={handleVideoSelect}
            />
          </section>
        </div>

        {/* CTA Section */}
        <div className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950/50 to-transparent" />

          <div className="relative max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Prêt à booster ta chaîne ?
            </h2>
            <p className="text-slate-400 mb-8 text-lg">
              Rejoins les YouTubeurs qui font confiance à Ezaii pour leurs montages.
            </p>
            <button className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300">
              <span>Voir les tarifs</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        video={selectedVideo}
        onClose={handleModalClose}
      />
    </div>
  )
}
