// =============================================================================
// Data Types
// =============================================================================

export interface Testimonial {
  text: string
  avatarUrl: string | null
}

export interface Video {
  id: string
  title: string
  clientName: string
  clientChannel: string
  youtubeId: string
  thumbnailUrl: string
  views: number
  likes: number
  testimonial: Testimonial | null
}

export interface Short {
  id: string
  title: string
  clientName: string
  clientChannel: string
  youtubeId: string
  views: number
  likes: number
}

// =============================================================================
// Component Props
// =============================================================================

export interface PortfolioProps {
  /** Liste des vidéos longues à afficher en grille */
  videos: Video[]
  /** Liste des shorts à afficher dans le carousel */
  shorts: Short[]
  /** Called when user clicks on a video thumbnail to open the modal */
  onVideoSelect?: (id: string) => void
  /** Called when user closes the video modal */
  onModalClose?: () => void
}
