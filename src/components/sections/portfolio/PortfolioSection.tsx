'use client'

import { Portfolio, type PortfolioVideo } from './Portfolio'

const videos: PortfolioVideo[] = [
  {
    id: 'vid-001',
    title: "J'ai BRISÉ 50 MYTHES dans Rivals (Roblox)",
    clientName: 'Anakin',
    clientChannel: '@Anakin',
    youtubeId: '5AkpAYeFoF4',
    thumbnailUrl: 'https://i.ytimg.com/vi/5AkpAYeFoF4/maxresdefault.jpg',
    views: 1250000,
    likes: 89000,
    testimonial: null,
  },
  {
    id: 'vid-002',
    title: 'Cubi-Game vidéo',
    clientName: 'Cubi-Game',
    clientChannel: '@Cubi-Game',
    youtubeId: 'SP9fXW19oHg',
    thumbnailUrl: 'https://i.ytimg.com/vi/SP9fXW19oHg/maxresdefault.jpg',
    views: 856000,
    likes: 52000,
    testimonial: null,
  },
  {
    id: 'vid-003',
    title: 'Oncl3pick vidéo',
    clientName: 'Oncl3pick',
    clientChannel: '@Oncl3pick',
    youtubeId: '-YHoo65qVco',
    thumbnailUrl: 'https://i.ytimg.com/vi/-YHoo65qVco/maxresdefault.jpg',
    views: 2800000,
    likes: 180000,
    testimonial: null,
  },
  {
    id: 'vid-004',
    title: 'Neku vidéo',
    clientName: 'Neku',
    clientChannel: '@Neku',
    youtubeId: 'tYpLi7L7AWA',
    thumbnailUrl: 'https://i.ytimg.com/vi/tYpLi7L7AWA/maxresdefault.jpg',
    views: 500000,
    likes: 30000,
    testimonial: null,
  },
]

export function PortfolioSection({ onScrollToContact }: { onScrollToContact?: () => void }) {
  return <Portfolio videos={videos} shorts={[]} onScrollToContact={onScrollToContact} />
}
