# Milestone 4: Tarifs

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

---

## About These Instructions

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Data model definitions (TypeScript types and sample data)
- UI/UX specifications (user flows, requirements, screenshots)
- Design system tokens (colors, typography, spacing)
- Test-writing instructions for each section (for TDD approach)

**What you need to build:**
- Backend API endpoints and database schema
- Authentication and authorization
- Data fetching and state management
- Business logic and validation
- Integration of the provided UI components with real data

**Important guidelines:**
- **DO NOT** redesign or restyle the provided components — use them as-is
- **DO** wire up the callback props to your routing and API calls
- **DO** replace sample data with real data from your backend
- **DO** implement proper error handling and loading states
- **DO** implement empty states when no records exist (first-time users, after deletions)
- **DO** use test-driven development — write tests first using `tests.md` instructions
- The components are props-based and ready to integrate — focus on the backend and data layer

---

## Goal

Implement the Tarifs section — a clear pricing display grouped by category with Discord CTA.

## Overview

The Tarifs section presents Ezaii's pricing options in card format, organized into two groups: long-form videos (3 tiers with packs) and shorts (1 tier). Each card shows the price, included features, and a "Commander" button linking to Discord.

**Key Functionality:**
- Pricing cards grouped by category (Vidéos longues / Shorts)
- Price displayed prominently with currency
- Feature lists with checkmarks, savings highlighted in green
- "Commander" button linking to Discord
- Conditions displayed in a terminal-style card

## Recommended Approach: Test-Driven Development

See `product-plan/sections/tarifs/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/tarifs/components/`:

- `TarifsSection` — Main section with grouped cards and conditions
- `PricingCard` — Individual pricing card

### Data Layer

```typescript
interface PricingTier {
  id: string
  name: string
  category: 'longForm' | 'short'
  price: number
  currency: string
  features: string[]
}
```

Pricing data can be:
- Stored in the database (editable via a future admin feature), or
- Hardcoded/config file (since pricing changes infrequently)

### Callbacks

| Callback | Action |
|----------|--------|
| `onOrder` | Track which tier was clicked (analytics), Discord link handles navigation |

### Props to Provide

```typescript
{
  pricingTiers: PricingTier[],
  conditions: string[],
  discordLink: "https://discord.gg/ezaii"
}
```

## Files to Reference

- `product-plan/sections/tarifs/README.md` — Feature overview
- `product-plan/sections/tarifs/tests.md` — Test-writing instructions
- `product-plan/sections/tarifs/components/` — React components
- `product-plan/sections/tarifs/types.ts` — TypeScript interfaces
- `product-plan/sections/tarifs/sample-data.json` — Test data

## Expected User Flows

### Flow 1: Compare Pricing

1. User scrolls to Tarifs section
2. User sees "Vidéos longues" with 3 cards (1 vidéo, Pack 2, Pack 3)
3. User sees "Shorts" with 1 card
4. User compares features and prices
5. **Outcome:** User understands pricing options clearly

### Flow 2: Order via Discord

1. User clicks "Commander" on a pricing card
2. Discord opens in new tab
3. **Outcome:** User contacts Ezaii to order

### Flow 3: Review Conditions

1. User scrolls to conditions section
2. User reads payment terms and rush pricing
3. **Outcome:** User has full transparency on terms

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Long-form tiers displayed in 3-column grid
- [ ] Short tier displayed separately
- [ ] Prices and features render correctly
- [ ] "Commander" buttons link to Discord
- [ ] Conditions displayed with numbering
- [ ] Card hover effects work (glow, lift)
- [ ] Responsive on mobile (stacks to 1 column)
