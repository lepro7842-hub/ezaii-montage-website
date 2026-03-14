# Tarifs

## Overview

Section présentant les offres tarifaires d'Ezaii sous forme de cartes, organisées en deux groupes : vidéos longues (avec packs) et shorts. Chaque carte affiche le prix et une liste des inclus, avec un bouton d'action vers Discord.

## User Flows

- L'utilisateur visualise les tarifs organisés en deux catégories (Vidéos longues et Shorts)
- L'utilisateur compare les différentes offres grâce aux listes de features
- L'utilisateur clique sur "Commander" pour ouvrir Discord

## Design Decisions

- Cards with hover glow effect (blue gradient border)
- Prices displayed as hero element (large, gradient text)
- Features with checkmark icons, savings highlighted in green
- Conditions displayed in a terminal-inspired card (dots, code style numbering)
- Grid pattern and gradient orbs for atmospheric background

## Data Used

**Entities:** PricingTier

## Components Provided

- `TarifsSection` — Main section with header, grouped pricing cards, and conditions
- `PricingCard` — Individual pricing card with tier name, price, features, and CTA

## Callback Props

| Callback | Description |
|----------|-------------|
| `onOrder` | Called when user clicks Commander button (receives tier id) |
