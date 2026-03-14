import { useEffect, useCallback } from 'react'
import type { Video } from '../types'

interface VideoModalProps {
  video: Video | null
  onClose?: () => void
}

function formatNumber(num: number): string {
  return num.toLocaleString('fr-FR')
}

export function VideoModal({ video, onClose }: VideoModalProps) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose?.()
    }
  }, [onClose])

  useEffect(() => {
    if (video) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [video, handleKeyDown])

  if (!video) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ animation: 'fadeIn 0.3s ease-out' }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-slate-900/95 backdrop-blur-sm rounded-3xl border border-slate-700/50 shadow-2xl"
        style={{ animation: 'slideUp 0.4s ease-out' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-slate-800/80 backdrop-blur border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 hover:border-blue-500/50 transition-all duration-200"
          aria-label="Fermer"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Video Player */}
        <div className="relative aspect-video bg-black rounded-t-3xl overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={video.title}
          />
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              {video.title}
            </h2>

            <div className="flex flex-wrap items-center gap-4">
              {/* Client Info */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20">
                  {video.clientName.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-semibold">{video.clientName}</p>
                  <p className="text-slate-400 text-sm">{video.clientChannel}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 ml-auto">
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700/50">
                  <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                  </svg>
                  <span className="text-white font-semibold">{formatNumber(video.views)}</span>
                  <span className="text-slate-500 text-sm">vues</span>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700/50">
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  <span className="text-white font-semibold">{formatNumber(video.likes)}</span>
                  <span className="text-slate-500 text-sm">likes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          {video.testimonial && (
            <div className="relative p-6 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-800/40 border border-slate-700/50 overflow-hidden">
              {/* Decorative Quote */}
              <svg
                className="absolute top-4 left-4 w-12 h-12 text-blue-500/20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 17h3l2-4V7H5v6h3l-2 4zm8 0h3l2-4V7h-6v6h3l-2 4z"/>
              </svg>

              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  {video.testimonial.avatarUrl ? (
                    <img
                      src={video.testimonial.avatarUrl}
                      alt={video.clientName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-blue-500/30"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold text-lg">
                      {video.clientName.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="text-white font-semibold">{video.clientName}</p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>

                <blockquote className="text-slate-300 text-lg leading-relaxed italic">
                  "{video.testimonial.text}"
                </blockquote>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  )
}
