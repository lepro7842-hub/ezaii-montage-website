# Hero

## Overview

Section d'accroche immersive qui transporte le visiteur dans les profondeurs de l'océan. Une vidéo cinématique plonge depuis le ciel jusqu'aux abysses, puis révèle le contenu dans un univers sous-marin mystérieux. Le nom "EZAII" apparaît en révélation bioluminescente lettre par lettre, tandis qu'un banc de poissons nage paisiblement en arrière-plan.

## User Flows

- Le visiteur arrive → la vidéo de plongée démarre automatiquement (autoplay, muted)
- À la fin de la vidéo, transition fluide vers le fond abyssal
- "EZAII" apparaît en révélation bioluminescente, lettre par lettre
- La tagline "Le montage qui fait la différence" apparaît en fondu
- Le CTA "Parcourir mes réalisations" apparaît
- Click sur le CTA → smooth scroll vers la section Portfolio

## Design Decisions

- Bioluminescent aesthetic with cyan/turquoise glow (#00D4FF)
- Deep ocean background color (#000833) matching last video frame
- Lottie animation for fish school (lightweight, smooth loop)
- Letter-by-letter reveal with staggered delays for dramatic effect
- GPU-accelerated animations for optimal performance
- Click-to-skip for development and impatient visitors

## Data Used

**Entities:** HeroContent, HeroAssets, AnimationConfig

## Components Provided

- `Hero` — Main hero section with video, text reveal, and CTA
- `BioluminescentLetter` — Individual letter with glow/shimmer/caustics effects
- `BioluminescentParticles` — Floating particle system for ambient bioluminescence
- `FlickerTagline` — Text with random letter flicker effect (unused in current Hero but available)

## Callback Props

| Callback | Description |
|----------|-------------|
| `onCtaClick` | Called when user clicks the CTA button |
| `onVideoEnd` | Called when the intro video finishes playing |
| `onAnimationComplete` | Called when all reveal animations are done |
