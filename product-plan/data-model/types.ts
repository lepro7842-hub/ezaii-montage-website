// =============================================================================
// Video (Portfolio)
// =============================================================================

export type VideoType = 'long' | 'short'

export interface Video {
  id: string
  youtubeUrl: string
  title: string
  clientName: string
  clientChannel: string
  description: string
  type: VideoType
  thumbnailUrl: string
  views: number
  likes: number
  createdAt: string
}

// =============================================================================
// Testimonial
// =============================================================================

export interface Testimonial {
  id: string
  clientName: string
  channelName: string
  channelUrl: string
  avatarUrl: string | null
  text: string
  videoId: string | null
  createdAt: string
}

// =============================================================================
// PricingTier
// =============================================================================

export interface PricingTier {
  id: string
  name: string
  category: 'longForm' | 'short'
  price: number
  currency: string
  features: string[]
}

// =============================================================================
// Hero Content
// =============================================================================

export interface HeroContent {
  brandName: string
  tagline: string
  ctaText: string
  ctaTarget: string
}

export interface HeroAssets {
  videoSrc: string
  fishLottieSrc: string
  backgroundColor: string
}

export interface AnimationConfig {
  letterRevealDelay: number
  taglineDelay: number
  ctaDelay: number
  glowColor: string
}

// =============================================================================
// Contact
// =============================================================================

export interface ContactInfo {
  headline: string
  subheadline: string
  email: string
  discordUrl: string
  discordLabel: string
}
