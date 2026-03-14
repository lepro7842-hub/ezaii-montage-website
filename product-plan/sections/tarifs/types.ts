// =============================================================================
// Data Types
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
// Component Props
// =============================================================================

export interface TarifsProps {
  /** Liste des tarifs à afficher */
  pricingTiers: PricingTier[]
  /** Conditions générales affichées sous les cartes */
  conditions: string[]
  /** Lien Discord pour le bouton Commander */
  discordLink: string
  /** Appelé quand l'utilisateur clique sur Commander */
  onOrder?: (tierId: string) => void
}
