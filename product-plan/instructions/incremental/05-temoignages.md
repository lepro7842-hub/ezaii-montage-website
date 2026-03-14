# Milestone 5: Témoignages

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

Implement the Témoignages section — a swipeable card stack of client reviews.

## Overview

The Témoignages section displays client reviews from YouTubers in an interactive card stack. Visitors can swipe cards horizontally to browse testimonials, and click channel links to visit the YouTuber's page.

**Key Functionality:**
- Stacked card effect with visual depth (scale, blur for back cards)
- Horizontal swipe/drag navigation with rotation physics
- YouTube channel links opening in new tab
- Pagination dots for position indication
- Click-on-dot to jump to specific testimonial

## Recommended Approach: Test-Driven Development

See `product-plan/sections/temoignages/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/temoignages/components/`:

- `TestimonialStack` — Main section with swipeable card stack and pagination
- `TestimonialCard` — Individual card with quote, author, and channel link

### Data Layer

```typescript
interface Testimonial {
  id: string
  clientName: string
  channelName: string
  channelUrl: string
  text: string
}
```

You'll need to:
- Fetch testimonials from the database
- Testimonials are managed via the Admin panel (Milestone 7)

### Callbacks

| Callback | Action |
|----------|--------|
| `onChannelClick` | Track channel click (analytics), link handles navigation |

### Empty States

- If no testimonials exist yet, section should render without crashing
- Single testimonial should work (no stack effect needed)

## Files to Reference

- `product-plan/sections/temoignages/README.md` — Feature overview
- `product-plan/sections/temoignages/tests.md` — Test-writing instructions
- `product-plan/sections/temoignages/components/` — React components
- `product-plan/sections/temoignages/types.ts` — TypeScript interfaces
- `product-plan/sections/temoignages/sample-data.json` — Test data

## Expected User Flows

### Flow 1: Swipe Through Testimonials

1. User sees first testimonial card with client name and quote
2. User swipes left (drag > 100px threshold)
3. Card exits with throw animation
4. Next card appears from the stack
5. Pagination dot updates
6. **Outcome:** User reads multiple client reviews

### Flow 2: Visit YouTube Channel

1. User reads a testimonial
2. User clicks the channel name link (e.g., "LucasMusic")
3. YouTube channel opens in new tab
4. **Outcome:** User can verify the client is real

### Flow 3: Navigate via Dots

1. User clicks a specific pagination dot
2. Cards transition to that testimonial
3. **Outcome:** User jumps to a specific review

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Card stack renders with depth effect (3 visible cards max)
- [ ] Swipe/drag navigation works (mouse and touch)
- [ ] Cards exit with rotation animation
- [ ] Pagination dots update on navigation
- [ ] Click-on-dot jumps to specific testimonial
- [ ] YouTube channel links work (new tab)
- [ ] Empty state handled (no testimonials)
- [ ] Responsive on mobile
