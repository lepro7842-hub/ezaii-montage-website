# Milestone 3: Portfolio

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

Implement the Portfolio section — a showcase of Ezaii's video editing work with a shorts carousel and video grid with modal viewer.

## Overview

The Portfolio section displays Ezaii's editing work in two formats: shorts in a horizontal carousel, and long-form videos in a responsive grid. Clicking a video opens a modal with the YouTube player, stats, and optional client testimonial.

**Key Functionality:**
- Shorts carousel with horizontal scroll and navigation arrows
- Video grid (3 columns) with thumbnails, play overlay, and testimonial badges
- Modal with YouTube embed (autoplay), client info, view/like counts, and testimonial
- Total views and video count in header badge

## Recommended Approach: Test-Driven Development

See `product-plan/sections/portfolio/tests.md` for detailed test-writing instructions.

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy from `product-plan/sections/portfolio/components/`:

- `Portfolio` — Main section with header, carousel, grid, CTA, and modal
- `ShortsCarousel` — Horizontal scroll carousel for shorts
- `VideoGrid` — Responsive grid for long-form videos
- `VideoModal` — Modal with YouTube player and stats

### Data Layer

The components expect these data shapes:

```typescript
interface Video {
  id: string
  title: string
  clientName: string
  clientChannel: string
  youtubeId: string
  thumbnailUrl: string
  views: number
  likes: number
  testimonial: { text: string; avatarUrl: string | null } | null
}

interface Short {
  id: string
  title: string
  clientName: string
  clientChannel: string
  youtubeId: string
  views: number
  likes: number
}
```

You'll need to:
- Create API endpoints to fetch videos and shorts from the database
- Videos and shorts are managed via the Admin panel (Milestone 7)
- The `youtubeId` is used to construct embed URLs and thumbnail URLs

### Callbacks

| Callback | Action |
|----------|--------|
| `onVideoSelect` | Track which video was opened (analytics) |
| `onModalClose` | (Optional) Analytics event |

### Empty States

- If no videos exist yet, the grid should be empty but not break
- If no shorts exist, carousel should be empty
- These are edge cases for when the admin hasn't added any content yet

## Files to Reference

- `product-plan/sections/portfolio/README.md` — Feature overview
- `product-plan/sections/portfolio/tests.md` — Test-writing instructions
- `product-plan/sections/portfolio/components/` — React components
- `product-plan/sections/portfolio/types.ts` — TypeScript interfaces
- `product-plan/sections/portfolio/sample-data.json` — Test data

## Expected User Flows

### Flow 1: Browse Shorts

1. User sees "Shorts" section with carousel
2. User clicks right arrow or swipes to scroll
3. User sees more shorts with titles and view counts
4. **Outcome:** User discovers Ezaii's short-form work

### Flow 2: Watch a Video

1. User sees video grid with thumbnails
2. User clicks on a thumbnail
3. Modal opens with YouTube player (autoplay), title, client info, stats
4. If video has a testimonial, it's displayed below
5. User closes modal (X, backdrop click, or Escape)
6. **Outcome:** User has watched a sample video with full context

### Flow 3: Navigate to Pricing

1. User scrolls past portfolio to CTA section
2. User clicks "Voir les tarifs"
3. **Outcome:** User navigates to pricing section

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Shorts carousel renders and scrolls
- [ ] Video grid displays thumbnails in 3-column layout
- [ ] Clicking thumbnail opens modal with YouTube embed
- [ ] Modal shows video title, client info, view/like counts
- [ ] Testimonial displays when available
- [ ] Modal closes via X, backdrop, or Escape
- [ ] Empty states handled gracefully
- [ ] Responsive on mobile
