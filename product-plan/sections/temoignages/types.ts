// =============================================================================
// Data Types
// =============================================================================

export interface Testimonial {
  id: string
  clientName: string
  channelName: string
  channelUrl: string
  text: string
}

// =============================================================================
// Component Props
// =============================================================================

export interface TemoignagesProps {
  /** Liste des témoignages à afficher dans la pile de cartes */
  testimonials: Testimonial[]
  /** Called when user clicks on a channel link (for analytics tracking) */
  onChannelClick?: (testimonial: Testimonial) => void
}
