import { useState } from 'react'
import type { AdministrationProps, Video } from '../types'
import { VideoCard } from './VideoCard'
import { TestimonialCard } from './TestimonialCard'

type TabType = 'portfolio' | 'testimonials'

export function AdminDashboard({
  videos,
  testimonials,
  onAddVideo,
  onEditVideo,
  onDeleteVideo,
  onAddTestimonial,
  onEditTestimonial,
  onDeleteTestimonial,
  onLogout
}: AdministrationProps) {
  const [activeTab, setActiveTab] = useState<TabType>('portfolio')

  // Helper to find linked video for testimonial
  const getLinkedVideo = (videoId: string | null): Video | undefined => {
    if (!videoId) return undefined
    return videos.find(v => v.id === videoId)
  }

  // Stats
  const longVideos = videos.filter(v => v.type === 'long').length
  const shortVideos = videos.filter(v => v.type === 'short').length

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-white font-bold text-lg" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Ezaii Admin
                </h1>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-sm"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
            <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Total vidéos</p>
            <p className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{videos.length}</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
            <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Vidéos longues</p>
            <p className="text-2xl font-bold text-blue-400" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{longVideos}</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
            <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Shorts</p>
            <p className="text-2xl font-bold text-rose-400" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{shortVideos}</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
            <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Témoignages</p>
            <p className="text-2xl font-bold text-emerald-400" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{testimonials.length}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-900/50 border border-slate-800 rounded-xl w-fit mb-8">
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'portfolio'
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Portfolio
            <span className={`px-1.5 py-0.5 rounded text-xs ${
              activeTab === 'portfolio' ? 'bg-blue-400/30' : 'bg-slate-700'
            }`}>
              {videos.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('testimonials')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'testimonials'
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Témoignages
            <span className={`px-1.5 py-0.5 rounded text-xs ${
              activeTab === 'testimonials' ? 'bg-blue-400/30' : 'bg-slate-700'
            }`}>
              {testimonials.length}
            </span>
          </button>
        </div>

        {/* Portfolio Tab */}
        {activeTab === 'portfolio' && (
          <div>
            {/* Header with Add button */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Portfolio
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Gérez vos réalisations vidéo
                </p>
              </div>
              <button
                onClick={onAddVideo}
                className="flex items-center gap-2 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-colors shadow-lg shadow-blue-500/25"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <span className="hidden sm:inline">Ajouter une vidéo</span>
                <span className="sm:hidden">Ajouter</span>
              </button>
            </div>

            {/* Video Grid */}
            {videos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {videos.map(video => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    onEdit={() => onEditVideo?.(video.id)}
                    onDelete={() => onDeleteVideo?.(video.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-slate-900/30 border border-slate-800 border-dashed rounded-xl">
                <svg className="w-12 h-12 text-slate-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <p className="text-slate-400 mb-4">Aucune vidéo dans le portfolio</p>
                <button
                  onClick={onAddVideo}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Ajouter votre première vidéo
                </button>
              </div>
            )}
          </div>
        )}

        {/* Testimonials Tab */}
        {activeTab === 'testimonials' && (
          <div>
            {/* Header with Add button */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Témoignages
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Gérez les avis de vos clients
                </p>
              </div>
              <button
                onClick={onAddTestimonial}
                className="flex items-center gap-2 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-colors shadow-lg shadow-blue-500/25"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <span className="hidden sm:inline">Ajouter un témoignage</span>
                <span className="sm:hidden">Ajouter</span>
              </button>
            </div>

            {/* Testimonials List */}
            {testimonials.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {testimonials.map(testimonial => (
                  <TestimonialCard
                    key={testimonial.id}
                    testimonial={testimonial}
                    linkedVideo={getLinkedVideo(testimonial.videoId)}
                    onEdit={() => onEditTestimonial?.(testimonial.id)}
                    onDelete={() => onDeleteTestimonial?.(testimonial.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-slate-900/30 border border-slate-800 border-dashed rounded-xl">
                <svg className="w-12 h-12 text-slate-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p className="text-slate-400 mb-4">Aucun témoignage pour le moment</p>
                <button
                  onClick={onAddTestimonial}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Ajouter votre premier témoignage
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
