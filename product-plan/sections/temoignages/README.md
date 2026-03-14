# Témoignages

## Overview

Section présentant les avis des YouTubeurs clients sous forme d'une pile de cartes interactive. Les visiteurs peuvent faire glisser horizontalement les cartes pour découvrir les différents témoignages, créant une expérience engageante.

## User Flows

- Le visiteur arrive sur la section et voit la première carte de témoignage
- Il fait glisser horizontalement (swipe) pour voir le témoignage suivant
- Il peut cliquer sur le nom de la chaîne YouTube pour visiter la chaîne
- Les dots de pagination indiquent sa position dans la pile

## Design Decisions

- Stacked card effect with visual depth (scale, translateY, blur for back cards)
- Horizontal swipe/drag with rotation physics (card tilts in drag direction)
- Cards exit with throw animation (translateX + rotation)
- YouTube channel link opens in new tab
- Quote mark decorative element for visual polish
- Pagination dots with active state indicator (wider bar)

## Data Used

**Entities:** Testimonial

## Components Provided

- `TestimonialStack` — Main section with swipeable card stack, title, swipe hint, and pagination
- `TestimonialCard` — Individual testimonial card with quote, author info, and channel link

## Callback Props

| Callback | Description |
|----------|-------------|
| `onChannelClick` | Called when user clicks a YouTube channel link (receives testimonial object) |
