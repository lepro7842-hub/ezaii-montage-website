'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { SplitTextReveal } from '@/components/ui/SplitTextReveal'
import { FadeIn } from '@/components/ui/FadeIn'
import { useParallax } from '@/hooks/useParallax'
import { RippleButton } from '@/components/ui/RippleButton'

export interface PortfolioTestimonial {
  text: string
  avatarUrl: string | null
}

export interface PortfolioVideo {
  id: string
  title: string
  clientName: string
  clientChannel: string
  youtubeId: string
  thumbnailUrl: string
  views: number
  likes: number
  testimonial: PortfolioTestimonial | null
}

export interface PortfolioShort {
  id: string
  title: string
  clientName: string
  clientChannel: string
  youtubeId: string
  views: number
  likes: number
}

export interface PortfolioProps {
  videos: PortfolioVideo[]
  shorts: PortfolioShort[]
  onScrollToContact?: () => void
}

const gridClients = [
  { name: 'Cubi-Game', avatar: '/assets/youtubeurs/profile-4.jpg', videoClient: 'Cubi-Game' },
  { name: 'Neku', avatar: '/assets/youtubeurs/profile-2.jpg', videoClient: 'Neku' },
  { name: 'Anakin', avatar: '/assets/youtubeurs/profile-5.jpeg', videoClient: 'Anakin' },
  { name: 'Oncl3pick', avatar: '/assets/youtubeurs/profile-3.jpg', videoClient: 'Oncl3pick' },
  { name: 'Jojo', avatar: '/assets/youtubeurs/profile-6.jpeg', videoClient: null },
  { name: 'LeMoove', avatar: '/assets/youtubeurs/profile-1.jpg', videoClient: null },
  { name: 'Gugu', avatar: '/assets/youtubeurs/profile-7.jpg', videoClient: null },
]

const CLIP = 'polygon(0% 0%, 97% 0%, 100% 5%, 100% 100%, 3% 100%, 0% 95%)'

function AvatarButton({ client, isSelected, onClick }: {
  client: typeof gridClients[0]
  isSelected: boolean
  onClick: () => void
}) {
  return (
    <button onClick={onClick} className="group flex flex-col items-center gap-1.5 flex-shrink-0">
      <div className={`relative w-16 h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden transition-all duration-300 ${
        isSelected
          ? 'ring-[3px] ring-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.35)] scale-110'
          : 'ring-2 ring-slate-600/40 brightness-[0.6] group-hover:brightness-100 group-hover:ring-slate-400/60 group-hover:scale-105'
      }`}>
        <Image src={client.avatar} alt={client.name} width={80} height={80} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${isSelected ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}`}>{client.name}</span>
    </button>
  )
}

export function Portfolio({ videos, shorts, onScrollToContact }: PortfolioProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedClient = gridClients[selectedIndex]
  const selectedVideo = selectedClient?.videoClient
    ? videos.find(v => v.clientName === selectedClient.videoClient) ?? null
    : null

  if (videos.length === 0) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <svg className="w-16 h-16 text-slate-700 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <p className="text-slate-500 text-lg">Aucune réalisation pour le moment</p>
        </div>
      </div>
    )
  }

  const parallax = useParallax(0.15)

  return (
    <div className="relative bg-slate-950 overflow-hidden">
      {/* Ambient bg with parallax */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-cyan-500/[0.03] rounded-full blur-[120px] transition-transform duration-100" style={{ transform: `translateY(${parallax * -0.5}px)` }} />
        <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-purple-500/[0.04] rounded-full blur-[100px] transition-transform duration-100" style={{ transform: `translateY(${parallax * 0.3}px)` }} />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="py-10 md:py-14 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              <SplitTextReveal text="Mes Réalisations" />
            </h2>
            <FadeIn>
              <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Découvrez les montages qui ont généré des millions de vues pour mes clients YouTubeurs.
              </p>
            </FadeIn>
          </div>
        </div>

        <FadeIn>
          <div className="max-w-6xl mx-auto px-4 pb-16">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch">

              {/* Avatars: horizontal scroll on mobile, honeycomb on desktop */}
              <div className="w-full lg:w-[300px] flex-shrink-0 flex items-center">
                {/* Mobile: wrap grid so all avatars are visible */}
                <div className="flex lg:hidden gap-3 w-full flex-wrap justify-center px-2">
                  {gridClients.map((client, i) => (
                    <AvatarButton
                      key={client.name}
                      client={client}
                      isSelected={i === selectedIndex}
                      onClick={() => setSelectedIndex(i)}
                    />
                  ))}
                </div>

                {/* Desktop: honeycomb layout */}
                <div className="hidden lg:flex flex-col items-center gap-3 w-full">
                  <div className="flex gap-4">
                    {gridClients.slice(0, 3).map((client, i) => (
                      <AvatarButton key={client.name} client={client} isSelected={i === selectedIndex} onClick={() => setSelectedIndex(i)} />
                    ))}
                  </div>
                  <div className="flex gap-4 -mt-1">
                    {gridClients.slice(3, 5).map((client, i) => (
                      <AvatarButton key={client.name} client={client} isSelected={i + 3 === selectedIndex} onClick={() => setSelectedIndex(i + 3)} />
                    ))}
                  </div>
                  <div className="flex gap-4 -mt-1">
                    {gridClients.slice(5, 7).map((client, i) => (
                      <AvatarButton key={client.name} client={client} isSelected={i + 5 === selectedIndex} onClick={() => setSelectedIndex(i + 5)} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: detail panel */}
              <div className="flex-1 min-w-0 relative">
                <AnimatePresence mode="wait">
                {selectedVideo ? (
                  <motion.div
                    key={selectedVideo.youtubeId}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    {/* Video — clip-path on desktop only via CSS class */}
                    <div className="relative rounded-2xl lg:rounded-none overflow-hidden video-clip-frame">
                      <div className="absolute inset-0 video-clip-border" style={{ background: 'linear-gradient(135deg, #22d3ee, #6366f1)' }} />
                      <div className="relative m-[2px] aspect-video overflow-hidden bg-black rounded-2xl lg:rounded-none video-clip-inner">
                        <iframe
                          src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?rel=0&modestbranding=1`}
                          className="absolute inset-0 w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={selectedVideo.title}
                        />
                      </div>
                    </div>

                    {/* Info bar */}
                    <div className="mt-4 lg:mt-5 flex items-center gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-700/30">
                      <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-cyan-500/30">
                        <Image src={selectedClient.avatar} alt="" width={40} height={40} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-bold text-sm leading-snug truncate" style={{ fontFamily: 'var(--font-heading)' }}>
                          {selectedVideo.title}
                        </h3>
                        <span className="text-cyan-400 text-xs font-semibold">{selectedClient.name}</span>
                      </div>
                    </div>

                    <RippleButton
                      onClick={() => onScrollToContact?.()}
                      className="mt-4 w-full py-3 rounded-xl text-white font-semibold text-sm transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] border border-cyan-500/30 hover:border-cyan-400/60"
                    >
                      <span className="relative z-10">Me contacter pour ce type de montage</span>
                      <div className="absolute inset-0 rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.1) 0%, rgba(99,102,241,0.1) 100%)' }} />
                    </RippleButton>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`profile-${selectedClient.name}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="relative rounded-2xl lg:rounded-none overflow-hidden video-clip-frame"
                  >
                    <div className="absolute inset-0 video-clip-border" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.3), rgba(99,102,241,0.3))' }} />
                    <div className="relative m-[2px] aspect-video overflow-hidden bg-slate-900 flex items-center justify-center rounded-2xl lg:rounded-none video-clip-inner">
                      <Image src={selectedClient.avatar} alt="" fill className="object-cover opacity-15 blur-xl scale-125" />
                      <div className="relative z-10 flex flex-col items-center gap-4">
                        <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden border-2 border-cyan-400/50 shadow-lg shadow-cyan-500/20">
                          <Image src={selectedClient.avatar} alt={selectedClient.name} width={96} height={96} className="w-full h-full object-cover" />
                        </div>
                        <div className="text-center">
                          <h3 className="text-xl lg:text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                            {selectedClient.name}
                          </h3>
                          <span className="text-cyan-400/60 text-sm">Créateur YouTube</span>
                        </div>
                      </div>
                    </div>
                    <RippleButton
                      onClick={() => onScrollToContact?.()}
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-6 py-2.5 rounded-xl text-white font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-[0.98] border border-cyan-500/30 hover:border-cyan-400/60"
                    >
                      <span className="relative z-10">Me contacter</span>
                      <div className="absolute inset-0 rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.15) 0%, rgba(99,102,241,0.15) 100%)', backdropFilter: 'blur(8px)' }} />
                    </RippleButton>
                  </motion.div>
                )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
