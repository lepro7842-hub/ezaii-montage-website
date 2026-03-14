'use client'

import { useEffect, useState } from 'react'
import { Portfolio, type PortfolioVideo, type PortfolioShort } from './Portfolio'

export function PortfolioSection({ onScrollToContact }: { onScrollToContact?: () => void }) {
  const [videos, setVideos] = useState<PortfolioVideo[]>([])
  const [shorts, setShorts] = useState<PortfolioShort[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/videos')
      .then(res => res.json())
      .then(data => {
        setVideos(data.videos)
        setShorts(data.shorts)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return <Portfolio videos={videos} shorts={shorts} onScrollToContact={onScrollToContact} />
}
