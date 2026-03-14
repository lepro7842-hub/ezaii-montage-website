// =============================================================================
// Data Types
// =============================================================================

export type VideoType = 'long' | 'short'

export interface Video {
  id: string
  youtubeUrl: string
  title: string
  clientName: string
  description: string
  type: VideoType
  createdAt: string
}

export interface Testimonial {
  id: string
  clientName: string
  channelName: string
  avatarUrl: string | null
  quote: string
  videoId: string | null
  createdAt: string
}

// =============================================================================
// Component Props
// =============================================================================

export interface AdministrationProps {
  /** List of portfolio videos to manage */
  videos: Video[]
  /** List of client testimonials to manage */
  testimonials: Testimonial[]

  // Video actions
  /** Called when user wants to add a new video */
  onAddVideo?: () => void
  /** Called when user wants to edit a video */
  onEditVideo?: (id: string) => void
  /** Called when user wants to delete a video */
  onDeleteVideo?: (id: string) => void

  // Testimonial actions
  /** Called when user wants to add a new testimonial */
  onAddTestimonial?: () => void
  /** Called when user wants to edit a testimonial */
  onEditTestimonial?: (id: string) => void
  /** Called when user wants to delete a testimonial */
  onDeleteTestimonial?: (id: string) => void

  // Auth actions
  /** Called when user wants to log out */
  onLogout?: () => void
}

export interface LoginProps {
  /** Called when user submits the login form */
  onLogin?: (password: string, rememberMe: boolean) => void
  /** Error message to display (e.g., "Mot de passe incorrect") */
  error?: string | null
  /** Whether the login is currently being processed */
  isLoading?: boolean
}
