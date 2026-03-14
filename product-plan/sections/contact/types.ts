// =============================================================================
// Data Types
// =============================================================================

export interface ContactInfo {
  headline: string
  subheadline: string
  email: string
  discordUrl: string
  discordLabel: string
}

// =============================================================================
// Component Props
// =============================================================================

export interface ContactProps {
  /** Les informations de contact à afficher */
  contactInfo: ContactInfo
  /** Called when user clicks the email button */
  onEmailClick?: () => void
  /** Called when user clicks the Discord button */
  onDiscordClick?: () => void
}
