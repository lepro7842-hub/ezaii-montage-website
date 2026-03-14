# Milestone 2: Hero

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

Implement the Hero section — an immersive landing experience with ocean video, bioluminescent text reveal, and CTA navigation.

## Overview

The Hero section transports visitors into the depths of the ocean. A cinematic video plays on arrival, then reveals content in a mysterious underwater universe. The brand name "EZAII" appears letter by letter with bioluminescent effects, followed by a tagline and a CTA button.

**Key Functionality:**
- Autoplay muted video that transitions to deep ocean background
- Bioluminescent letter-by-letter brand name reveal
- Staggered tagline and CTA appearance
- Lottie fish school animation in background
- Floating bioluminescent particles
- CTA smooth scroll to Portfolio section
- Click-to-skip video for impatient visitors

## Recommended Approach: Test-Driven Development

Before implementing this section, **write tests first** based on the test specifications provided.

See `product-plan/sections/hero/tests.md` for detailed test-writing instructions.

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy the section components from `product-plan/sections/hero/components/`:

- `Hero` — Main section with video, text reveal, and CTA
- `BioluminescentLetter` — Letter with glow/shimmer/caustics effects
- `BioluminescentParticles` — Floating particle system
- `FlickerTagline` — Text with random letter flicker (optional, available)

### Assets Required

The Hero requires two media assets:
- **ocean.mp4** — A cinematic video of diving from sky into ocean depths
- **shoal of fish.lottie** — A Lottie animation of a swimming fish school

You will need to provide these assets. The component uses `@lottiefiles/dotlottie-react` for the Lottie animation.

### Data Layer

The Hero content is mostly static. You can:
- Hardcode the content directly, or
- Store it in a configuration file/CMS for easy editing

Content to provide:
```typescript
{
  brandName: "ezaii",
  tagline: "Le montage qui fait la différence",
  ctaText: "Parcourir mes réalisations",
  ctaTarget: "#portfolio"
}
```

### Callbacks

Wire up these user actions:

| Callback | Action |
|----------|--------|
| `onCtaClick` | Smooth scroll to `#portfolio` section |
| `onVideoEnd` | (Optional) Analytics event |
| `onAnimationComplete` | (Optional) Analytics event |

## Files to Reference

- `product-plan/sections/hero/README.md` — Feature overview and design intent
- `product-plan/sections/hero/tests.md` — Test-writing instructions (use for TDD)
- `product-plan/sections/hero/components/` — React components
- `product-plan/sections/hero/types.ts` — TypeScript interfaces
- `product-plan/sections/hero/sample-data.json` — Test data

## Expected User Flows

### Flow 1: Full Hero Experience

1. User lands on the page
2. Ocean video plays automatically (muted)
3. Video ends → deep ocean background appears
4. "EZAII" letters reveal one by one with glow effects
5. Tagline fades in: "Le montage qui fait la différence"
6. CTA button appears: "Parcourir mes réalisations"
7. **Outcome:** User is immersed and ready to explore

### Flow 2: Skip Video

1. User clicks anywhere during video playback
2. Video jumps to end
3. Content reveal begins immediately
4. **Outcome:** Impatient users can skip to content

### Flow 3: Click CTA

1. User clicks "Parcourir mes réalisations"
2. Page smooth scrolls to Portfolio section
3. **Outcome:** User begins browsing portfolio

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Video plays on load and transitions to ocean background
- [ ] Brand name reveals with bioluminescent effect
- [ ] Tagline and CTA appear with staggered timing
- [ ] Fish Lottie animation loops in background
- [ ] Particles float in background
- [ ] CTA scrolls to portfolio
- [ ] Click-to-skip works during video
- [ ] Full screen layout, responsive on mobile
