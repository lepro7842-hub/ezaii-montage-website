import type { Video } from '../types'

interface VideoGridProps {
  videos: Video[]
  onVideoSelect?: (id: string) => void
}

function formatViews(views: number): string {
  if (views >= 1_000_000) {
    return `${(views / 1_000_000).toFixed(1)}M vues`
  }
  if (views >= 1_000) {
    return `${(views / 1_000).toFixed(0)}K vues`
  }
  return `${views} vues`
}

export function VideoGrid({ videos, onVideoSelect }: VideoGridProps) {
  return (
    <div className="space-y-6">
      {/* Section Title */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full" />
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Vidéos
          </h2>
        </div>
        <span className="text-slate-500 text-sm font-medium">
          {videos.length} réalisations
        </span>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {videos.map((video, index) => (
          <button
            key={video.id}
            onClick={() => onVideoSelect?.(video.id)}
            className="group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded-2xl"
            style={{
              animationDelay: `${index * 100}ms`,
              animation: 'fadeSlideUp 0.6s ease-out forwards'
            }}
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-800 border border-slate-700/50 transition-all duration-500 group-hover:border-blue-500/40 group-hover:shadow-[0_0_50px_rgba(59,130,246,0.2)]">
              {/* Thumbnail */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{
                  backgroundImage: `url(${video.thumbnailUrl})`,
                  backgroundColor: '#1e293b'
                }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/40 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                  <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* Testimonial Badge */}
              {video.testimonial && (
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500/90 to-orange-500/90 text-white text-xs font-semibold shadow-lg">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                  Témoignage
                </div>
              )}

              {/* Stats */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-medium">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
                {formatViews(video.views)}
              </div>

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="text-white font-bold text-base leading-snug line-clamp-2 mb-2 group-hover:text-blue-100 transition-colors">
                  {video.title}
                </h3>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-white text-xs font-bold">
                    {video.clientName.charAt(0)}
                  </div>
                  <span className="text-slate-400 text-sm font-medium">
                    {video.clientChannel}
                  </span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
