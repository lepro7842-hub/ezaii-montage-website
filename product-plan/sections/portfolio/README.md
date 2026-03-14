# Portfolio

## Overview

Section portfolio publique présentant les réalisations d'Ezaii. Les shorts YouTube sont affichés en premier dans un carousel horizontal, suivis d'une grille de 6 thumbnails pour les vidéos longues. Au clic sur une thumbnail, une modale s'ouvre avec le player YouTube, le titre, le nom du client, les statistiques et l'éventuel témoignage.

## User Flows

- Parcourir les shorts via le carousel (swipe/flèches)
- Consulter les thumbnails des vidéos longues
- Cliquer sur une thumbnail → ouverture de la modale avec player, infos et témoignage
- Fermer la modale pour revenir à la galerie

## Design Decisions

- Dark immersive background (slate-950) with ambient blue gradient orbs
- Shorts carousel with horizontal scroll and navigation arrows (appear on hover)
- Video grid with thumbnail zoom on hover and play button overlay
- Modal with YouTube embed autoplay, client stats, and optional testimonial
- Testimonial badge on thumbnails that have linked reviews
- Total views/videos count displayed in header badge

## Data Used

**Entities:** Video, Short, Testimonial (embedded in Video)

## Components Provided

- `Portfolio` — Main section with header, carousel, grid, CTA, and modal
- `ShortsCarousel` — Horizontal scroll carousel for shorts
- `VideoGrid` — Responsive 3-column grid for long-form videos
- `VideoModal` — Full-screen modal with YouTube player and stats

## Callback Props

| Callback | Description |
|----------|-------------|
| `onVideoSelect` | Called when user clicks a video thumbnail (receives video id) |
| `onModalClose` | Called when user closes the video modal |
