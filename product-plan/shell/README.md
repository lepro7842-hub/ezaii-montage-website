# Application Shell

## Overview

Le shell d'Ezaii est minimaliste et conçu pour maximiser l'impact visuel du contenu. Un header fixe discret avec un menu overlay plein écran permet une navigation fluide tout en préservant le "wow effect" des animations.

## Layout Pattern

**One-page scroll:** Toutes les sections publiques sont empilées sur une seule page, navigation par ancres avec smooth scroll, header fixe en position sticky.

**Admin:** Route séparée (/admin) avec son propre layout et un header simplifié.

## Navigation Structure

**Header fixe:**
- "Ezaii Montage" (titre, lien vers #hero)
- Bouton "Me contacter" (lien vers #contact)
- Menu burger (ouvre l'overlay)

**Menu Overlay:**
- Hero → #hero
- Portfolio → #portfolio
- Tarifs → #tarifs
- Témoignages → #temoignages
- Contact → #contact

## Components Provided

- `AppShell` — Main layout wrapper with scroll detection and menu state
- `MainNav` — Fixed header with site title, CTA button, and burger menu
- `MenuOverlay` — Full-screen navigation overlay with animated links

## Callback Props

| Callback | Description |
|----------|-------------|
| `onNavigate` | Called when user clicks a navigation link (receives href string) |
| `onMenuToggle` | Called when user opens/closes the menu |
| `onCtaClick` | Called when user clicks the CTA button |

## Design Tokens Applied

- **Primary (blue):** CTA button, active links, accents
- **Neutral (slate):** Backgrounds, text, borders
- **Heading font (Space Grotesk):** Site title, menu links
- **Body font (Inter):** Secondary text
