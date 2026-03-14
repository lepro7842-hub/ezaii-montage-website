# Contact

## Overview

Section de contact immersive avec un message d'accroche engageant, suivie de liens directs vers Email et Discord. Le design s'intègre au style visuel sous-marin du site avec des animations pour maintenir l'effet "wow".

## User Flows

- Le visiteur arrive sur la section Contact en scrollant ou via la navigation
- Il lit le message d'accroche
- Il clique sur le bouton Email → son app email s'ouvre avec l'adresse pré-remplie
- Il clique sur le bouton Discord → il est redirigé vers le profil Discord

## Design Decisions

- Deep ocean gradient background continuing the underwater theme
- Light rays from below and floating bioluminescent particles
- Glass-morphism buttons with cinematic glow on hover
- Email button: cyan/sky glow, Discord button: indigo/purple glow
- Each button enlarges and intensifies glow on hover
- Space Grotesk for headline, Inter for subheadline

## Data Used

**Entities:** ContactInfo

## Components Provided

- `Contact` — Full-screen contact section with headline, subheadline, and two CTA buttons

## Callback Props

| Callback | Description |
|----------|-------------|
| `onEmailClick` | Called when user clicks the email button |
| `onDiscordClick` | Called when user clicks the Discord button |
