# Test Instructions: Tarifs

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview

The Tarifs section displays Ezaii's pricing in grouped cards (vidéos longues and shorts) with a CTA to Discord. Key functionality: card display, grouping by category, Discord link, conditions display.

---

## User Flow Tests

### Flow 1: View Pricing Options

**Scenario:** User browses the pricing section to compare offers.

#### Success Path

**Setup:**
- TarifsSection rendered with 4 pricingTiers (3 longForm, 1 short)

**Steps:**
1. User scrolls to Tarifs section
2. User sees "Vidéos longues" group with 3 cards
3. User sees "Shorts" group with 1 card

**Expected Results:**
- [ ] Section header shows "Des prix clairs"
- [ ] "Vidéos longues" heading with video icon visible
- [ ] 3 cards in the long-form section: "1 vidéo" (128€), "Pack 2 vidéos" (240€), "Pack 3 vidéos" (345€)
- [ ] "Shorts" heading visible
- [ ] 1 card in shorts section: "Short" (15€)
- [ ] Each card shows price, features list, and "Commander" button

### Flow 2: Order via Discord

**Scenario:** User clicks Commander on a pricing card.

**Steps:**
1. User clicks "Commander" on "Pack 2 vidéos" card
2. Discord link opens

**Expected Results:**
- [ ] `onOrder` callback called with tier id ("tier-002")
- [ ] Link has href pointing to discordLink
- [ ] Link opens in new tab (target="_blank", rel="noopener noreferrer")
- [ ] Discord icon visible on button

### Flow 3: Review Conditions

**Scenario:** User reads the conditions at the bottom.

**Expected Results:**
- [ ] All 3 conditions displayed with numbered badges (01, 02, 03)
- [ ] Condition text: "Paiement à la livraison via PayPal ou virement"
- [ ] Condition text: "Rush supplémentaire : +20€ par tranche de 20 min"
- [ ] Condition text: "Délais indicatifs, peuvent varier selon la charge"

---

## Empty State Tests

### No Pricing Tiers

**Setup:**
- pricingTiers is empty (`[]`)

**Expected Results:**
- [ ] "Vidéos longues" section renders with empty grid (no crash)
- [ ] "Shorts" section renders with empty area
- [ ] Conditions still display if provided

---

## Component Interaction Tests

### PricingCard

**Renders correctly:**
- [ ] Tier name displayed (e.g., "Pack 2 vidéos")
- [ ] Price displayed large (e.g., "240" + "€")
- [ ] All features listed with checkmark icons
- [ ] Features with "économise" keyword highlighted in green with money icon
- [ ] "Commander" button with Discord icon

**Hover behavior:**
- [ ] Card lifts up (-4px translateY)
- [ ] Blue glow border appears
- [ ] CTA button glow intensifies

---

## Edge Cases

- [ ] Handles missing features array gracefully
- [ ] Very long feature text wraps properly
- [ ] Cards maintain equal height in grid
- [ ] Responsive: stacks to 1 column on mobile

---

## Sample Test Data

```typescript
const mockTier = {
  id: "tier-001",
  name: "1 vidéo",
  category: "longForm" as const,
  price: 128,
  currency: "€",
  features: [
    "Montage complet de ta vidéo",
    "Jusqu'à 40 min de rush",
    "Corrections incluses",
    "Livraison sous 5 jours"
  ]
};

const mockShortTier = {
  id: "tier-004",
  name: "Short",
  category: "short" as const,
  price: 15,
  currency: "€",
  features: [
    "Montage format vertical",
    "Optimisé YouTube Shorts / TikTok",
    "Livraison sous 48h"
  ]
};

const mockConditions = [
  "Paiement à la livraison via PayPal ou virement",
  "Rush supplémentaire : +20€ par tranche de 20 min",
  "Délais indicatifs, peuvent varier selon la charge"
];

const mockEmptyTiers = [];
```
