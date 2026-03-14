# Ezaii — Product Overview

## Summary

Portfolio professionnel d'Ezaii, monteur vidéo spécialisé dans le contenu gaming pour les YouTubeurs francophones. Le site impressionne dès la première seconde grâce à des animations uniques et soignées, reflétant le savoir-faire créatif d'Ezaii. Il présente ses réalisations, ses tarifs clairs et permet aux créateurs de le contacter facilement via e-mail ou Discord.

## Planned Sections

1. **Hero** — Section d'accroche avec le nom Ezaii, une phrase d'impact et les animations "wow effect" qui captent immédiatement l'attention.
2. **Portfolio** — Galerie de vidéos YouTube intégrées présentant les réalisations d'Ezaii (vidéos longues et shorts).
3. **Tarifs** — Grille tarifaire claire avec les prix pour vidéos longues (128€, packs 2 et 3 vidéos) et shorts (15€), avec les conditions.
4. **Témoignages** — Avis et retours des YouTubeurs clients pour rassurer les prospects.
5. **Contact** — Liens directs vers e-mail et Discord pour une prise de contact rapide.
6. **Administration** — Panneau protégé pour gérer le portfolio et les témoignages.

## Data Model

**Entities:**
- **Video** — A portfolio item representing a video edited by Ezaii (long-form or short), with YouTube embed URL, title, client name, and type.
- **Testimonial** — A client review with client name, channel name, avatar, quote text, and optional link to a portfolio video.
- **PricingTier** — A pricing option with tier name, price, features list, and category (longForm/short).

**Relationships:**
- A Testimonial can optionally reference a Video
- Video and PricingTier are independent entities

## Design System

**Colors:**
- Primary: `blue`
- Secondary: `slate`
- Neutral: `slate`

**Typography:**
- Heading: Space Grotesk
- Body: Inter
- Mono: JetBrains Mono

## Implementation Sequence

Build this product in milestones:

1. **Foundation** — Set up design tokens, data model types, routing structure, and application shell
2. **Hero** — Immersive landing section with ocean video, bioluminescent text reveal, and Lottie fish animation
3. **Portfolio** — Shorts carousel and video grid with modal player, stats, and testimonials
4. **Tarifs** — Pricing cards grouped by category (vidéos longues / shorts) with Discord CTA
5. **Témoignages** — Swipeable card stack with client reviews and YouTube channel links
6. **Contact** — Immersive contact section with email and Discord buttons
7. **Administration** — Password-protected admin panel for managing videos and testimonials

Each milestone has a dedicated instruction document in `product-plan/instructions/`.
