# Milestone 6: Contact

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

Implement the Contact section — an immersive contact page with email and Discord links.

## Overview

The Contact section provides two ways to reach Ezaii: email and Discord. The design continues the underwater theme with deep ocean gradients, light rays, and floating particles. Glass-morphism buttons with cinematic glow effects make the contact methods visually appealing.

**Key Functionality:**
- Headline and subheadline with engaging copy
- Email button opening native mail client (mailto:)
- Discord button opening Discord profile in new tab
- Cinematic hover effects on both buttons

## Recommended Approach: Test-Driven Development

See `product-plan/sections/contact/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/contact/components/`:

- `Contact` — Full-screen section with headline, subheadline, and two CTA buttons

### Data Layer

Contact info is static content:

```typescript
{
  headline: "Prêt à donner vie à tes vidéos ?",
  subheadline: "Discutons de ton projet et créons ensemble du contenu qui claque.",
  email: "hello@ezaii-montage.com",
  discordUrl: "https://discord.com/users/eliott4943",
  discordLabel: "eliott4943"
}
```

This can be hardcoded or stored in config.

### Callbacks

| Callback | Action |
|----------|--------|
| `onEmailClick` | (Optional) Analytics tracking — if not provided, default mailto behavior |
| `onDiscordClick` | (Optional) Analytics tracking — if not provided, default link behavior |

## Files to Reference

- `product-plan/sections/contact/README.md` — Feature overview
- `product-plan/sections/contact/tests.md` — Test-writing instructions
- `product-plan/sections/contact/components/` — React components
- `product-plan/sections/contact/types.ts` — TypeScript interfaces
- `product-plan/sections/contact/sample-data.json` — Test data

## Expected User Flows

### Flow 1: Contact via Email

1. User scrolls to Contact section
2. User sees "Prêt à donner vie à tes vidéos ?"
3. User clicks email button showing "hello@ezaii-montage.com"
4. **Outcome:** Native email client opens with address pre-filled

### Flow 2: Contact via Discord

1. User clicks Discord button showing "eliott4943"
2. Discord profile opens in new tab
3. **Outcome:** User can message Ezaii on Discord

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Headline and subheadline render correctly
- [ ] Email button has correct mailto: link
- [ ] Discord button opens in new tab
- [ ] Hover glow effects work on both buttons
- [ ] Background particles and light rays animate
- [ ] Responsive on mobile (buttons stack vertically)
