# Milestone 1: Foundation

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** None

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

Set up the foundational elements: design tokens, data model types, routing structure, and application shell.

## What to Implement

### 1. Design Tokens

Configure your styling system with these tokens:

- See `product-plan/design-system/tokens.css` for CSS custom properties
- See `product-plan/design-system/tailwind-colors.md` for Tailwind configuration
- See `product-plan/design-system/fonts.md` for Google Fonts setup

**Colors:**
- Primary: `blue` — buttons, links, accents
- Neutral: `slate` — backgrounds, text, borders

**Fonts:**
- Heading: Space Grotesk
- Body: Inter
- Mono: JetBrains Mono
- Brand display: Righteous (for "EZAII" in Hero)

### 2. Data Model Types

Create TypeScript interfaces for your core entities:

- See `product-plan/data-model/types.ts` for interface definitions
- See `product-plan/data-model/README.md` for entity relationships

**Core entities:** Video, Testimonial, PricingTier, HeroContent, ContactInfo

### 3. Routing Structure

Create routes for the application:

- `/` — Main one-page site (Hero, Portfolio, Tarifs, Témoignages, Contact stacked vertically)
- `/admin` — Administration panel (separate route, not in public navigation)

Sections on the main page use anchor navigation:
- `#hero`, `#portfolio`, `#tarifs`, `#temoignages`, `#contact`

### 4. Application Shell

Copy the shell components from `product-plan/shell/components/` to your project:

- `AppShell.tsx` — Main layout wrapper with scroll detection
- `MainNav.tsx` — Fixed header with site title, CTA button, and burger menu
- `MenuOverlay.tsx` — Full-screen navigation overlay

**Wire Up Navigation:**

Connect navigation to smooth scrolling for anchors:

| Nav Item | Target |
|----------|--------|
| Hero | `#hero` |
| Portfolio | `#portfolio` |
| Tarifs | `#tarifs` |
| Témoignages | `#temoignages` |
| Contact | `#contact` |

**Header behavior:**
- Initially transparent
- On scroll: `slate-900/95` background with backdrop blur
- CTA button "Me contacter" links to `#contact`

**Note:** The shell is only used for the public site. The `/admin` route has its own layout (built into the AdminDashboard component).

## Files to Reference

- `product-plan/design-system/` — Design tokens
- `product-plan/data-model/` — Type definitions and sample data
- `product-plan/shell/README.md` — Shell design intent
- `product-plan/shell/components/` — Shell React components

## Done When

- [ ] Design tokens are configured (colors, fonts loaded)
- [ ] Data model types are defined
- [ ] Routes exist for `/` and `/admin`
- [ ] Shell renders with fixed header and menu overlay
- [ ] Navigation links scroll to correct anchors
- [ ] CTA button navigates to contact section
- [ ] Menu overlay opens/closes with animation
- [ ] Responsive on mobile
