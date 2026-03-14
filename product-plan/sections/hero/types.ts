// =============================================================================
// Data Types
// =============================================================================

export interface HeroContent {
  /** Le nom de la marque affiché en grand (e.g., "EZAII") */
  brandName: string
  /** La tagline qui apparaît après le nom */
  tagline: string
  /** Le texte du bouton d'appel à l'action */
  ctaText: string
  /** La cible du CTA — ancre ou URL (e.g., "#portfolio") */
  ctaTarget: string
}

export interface HeroAssets {
  /** Chemin vers la vidéo de plongée océanique */
  videoSrc: string
  /** Chemin vers l'animation Lottie du banc de poissons */
  fishLottieSrc: string
  /** Couleur de fond correspondant à la dernière frame de la vidéo */
  backgroundColor: string
}

export interface AnimationConfig {
  /** Délai en ms entre chaque révélation de lettre */
  letterRevealDelay: number
  /** Délai en ms avant l'apparition de la tagline (après le nom) */
  taglineDelay: number
  /** Délai en ms avant l'apparition du CTA (après la tagline) */
  ctaDelay: number
  /** La couleur du glow bioluminescent (cyan/turquoise) */
  glowColor: string
}

// =============================================================================
// Component Props
// =============================================================================

export interface HeroProps {
  /** Le contenu textuel du Hero (nom, tagline, CTA) */
  content: HeroContent
  /** Les assets média (vidéo, animation Lottie) */
  assets: HeroAssets
  /** Configuration des timings d'animation */
  animationConfig: AnimationConfig
  /** Appelé quand l'utilisateur clique sur le CTA */
  onCtaClick?: () => void
  /** Appelé quand la vidéo d'intro se termine */
  onVideoEnd?: () => void
  /** Appelé quand toutes les animations de révélation sont terminées */
  onAnimationComplete?: () => void
}
