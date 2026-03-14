# Ezaii — Complete Implementation Instructions

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

## Test-Driven Development

Each section includes a `tests.md` file with detailed test-writing instructions. For best results:

1. Read `product-plan/sections/[section-id]/tests.md` before implementing
2. Write failing tests based on the instructions
3. Implement the feature to make tests pass
4. Refactor while keeping tests green

The test instructions are **framework-agnostic** — they describe WHAT to test, not HOW. Adapt to your testing setup (Jest, Vitest, Playwright, Cypress, RSpec, Minitest, PHPUnit, etc.).

---

## Product Overview

Portfolio professionnel d'Ezaii, monteur vidéo spécialisé dans le contenu gaming pour les YouTubeurs francophones. Le site impressionne dès la première seconde grâce à des animations uniques et soignées, reflétant le savoir-faire créatif d'Ezaii. Il présente ses réalisations, ses tarifs clairs et permet aux créateurs de le contacter facilement via e-mail ou Discord.

**Sections:**
1. Hero — Immersive landing with ocean video and bioluminescent text reveal
2. Portfolio — Shorts carousel and video grid with modal player
3. Tarifs — Pricing cards grouped by category with Discord CTA
4. Témoignages — Swipeable testimonial card stack
5. Contact — Email and Discord contact buttons
6. Administration — Password-protected admin panel for content management

**Data Model:**
- Video (portfolio items: long-form and shorts)
- Testimonial (client reviews with optional video link)
- PricingTier (pricing options by category)

**Design System:**
- Colors: blue (primary), slate (neutral)
- Fonts: Space Grotesk (headings), Inter (body), JetBrains Mono (code), Righteous (brand)

---

# Milestone 1: Foundation

## Goal

Set up design tokens, data model types, routing structure, and application shell.

## What to Implement

### 1. Design Tokens

- See `product-plan/design-system/tokens.css` for CSS custom properties
- See `product-plan/design-system/tailwind-colors.md` for Tailwind configuration
- See `product-plan/design-system/fonts.md` for Google Fonts setup

### 2. Data Model Types

- See `product-plan/data-model/types.ts` for interface definitions
- See `product-plan/data-model/README.md` for entity relationships
- Core entities: Video, Testimonial, PricingTier, HeroContent, ContactInfo

### 3. Routing Structure

- `/` — Main one-page site (all public sections stacked with anchor navigation)
- `/admin` — Administration panel (separate route)
- Anchors: `#hero`, `#portfolio`, `#tarifs`, `#temoignages`, `#contact`

### 4. Application Shell

Copy shell components from `product-plan/shell/components/`:
- `AppShell.tsx` — Layout wrapper with scroll detection
- `MainNav.tsx` — Fixed header with title, CTA, burger menu
- `MenuOverlay.tsx` — Full-screen navigation overlay

Wire navigation to smooth scroll for anchors. Header: transparent initially, `slate-900/95` with backdrop blur on scroll.

## Done When

- [ ] Design tokens configured
- [ ] Data model types defined
- [ ] Routes exist for `/` and `/admin`
- [ ] Shell renders with navigation
- [ ] Responsive on mobile

---

# Milestone 2: Hero

## Goal

Immersive landing with ocean video, bioluminescent text reveal, and CTA.

## Components

`product-plan/sections/hero/components/`: Hero, BioluminescentLetter, BioluminescentParticles, FlickerTagline

## Key Details

- Video autoplays (muted), transitions to deep ocean background (#000833) on end
- "EZAII" letters reveal one by one with glow effects (150ms delay each)
- Tagline appears after 800ms, CTA after 1200ms
- Requires: ocean.mp4 video, fish Lottie animation, `@lottiefiles/dotlottie-react`
- CTA "Parcourir mes réalisations" → smooth scroll to #portfolio
- Click anywhere during video to skip

## Tests

See `product-plan/sections/hero/tests.md`

## Done When

- [ ] Video plays and transitions to ocean background
- [ ] Brand name reveals with bioluminescent effect
- [ ] Tagline and CTA appear with staggered timing
- [ ] CTA scrolls to portfolio
- [ ] Responsive on mobile

---

# Milestone 3: Portfolio

## Goal

Showcase of video editing work with shorts carousel and video grid with modal.

## Components

`product-plan/sections/portfolio/components/`: Portfolio, ShortsCarousel, VideoGrid, VideoModal

## Key Details

- Shorts: horizontal carousel with navigation arrows
- Videos: 3-column grid with thumbnails, play overlay, testimonial badges
- Modal: YouTube embed (autoplay), client info, view/like counts, testimonial
- Data fetched from database (managed via Admin panel)
- Videos and shorts are separate arrays with different shapes

## Tests

See `product-plan/sections/portfolio/tests.md`

## Done When

- [ ] Shorts carousel renders and scrolls
- [ ] Video grid with thumbnails
- [ ] Modal with YouTube player, stats, testimonial
- [ ] Empty states handled
- [ ] Responsive on mobile

---

# Milestone 4: Tarifs

## Goal

Clear pricing display grouped by category with Discord CTA.

## Components

`product-plan/sections/tarifs/components/`: TarifsSection, PricingCard

## Key Details

- 3 long-form tiers: 1 vidéo (128€), Pack 2 (240€), Pack 3 (345€)
- 1 short tier: 15€
- Each card: price, features, "Commander" button → Discord
- Conditions displayed below in terminal-style card
- Pricing data can be hardcoded or stored in DB

## Tests

See `product-plan/sections/tarifs/tests.md`

## Done When

- [ ] Pricing cards grouped correctly
- [ ] Prices and features render
- [ ] Discord links work
- [ ] Conditions displayed
- [ ] Responsive on mobile

---

# Milestone 5: Témoignages

## Goal

Swipeable card stack of client reviews.

## Components

`product-plan/sections/temoignages/components/`: TestimonialStack, TestimonialCard

## Key Details

- Stacked cards with depth effect (scale, blur for back cards)
- Swipe/drag navigation (100px threshold), cards exit with rotation
- YouTube channel links open in new tab
- Pagination dots with click-to-jump
- Data fetched from database (managed via Admin panel)

## Tests

See `product-plan/sections/temoignages/tests.md`

## Done When

- [ ] Card stack with depth effect
- [ ] Swipe navigation works (mouse + touch)
- [ ] Pagination dots update
- [ ] Channel links work
- [ ] Empty state handled
- [ ] Responsive on mobile

---

# Milestone 6: Contact

## Goal

Immersive contact section with email and Discord links.

## Components

`product-plan/sections/contact/components/`: Contact

## Key Details

- Headline: "Prêt à donner vie à tes vidéos ?"
- Email: hello@ezaii-montage.com (mailto: link)
- Discord: eliott4943 (opens profile in new tab)
- Glass-morphism buttons with cinematic glow on hover
- Deep ocean gradient background with particles and light rays
- Contact info can be hardcoded or stored in config

## Tests

See `product-plan/sections/contact/tests.md`

## Done When

- [ ] Headline and subheadline render
- [ ] Email button opens mailto:
- [ ] Discord button opens in new tab
- [ ] Hover effects work
- [ ] Responsive on mobile

---

# Milestone 7: Administration

## Goal

Password-protected admin panel for managing videos and testimonials.

## Components

`product-plan/sections/administration/components/`: Login, AdminDashboard, VideoCard, TestimonialCard

## Key Details

- Accessible at `/admin` (hidden URL, not in public navigation)
- Single shared password authentication with session persistence
- Dashboard: stats cards, tabs (Portfolio/Testimonials)
- Video CRUD: add (YouTube URL, title, client, type), edit, delete
- Testimonial CRUD: add (client name, channel, quote, optional avatar/video link), edit, delete
- Empty states with "add first item" CTAs
- **You need to build:** add/edit forms, confirmation dialogs, API endpoints

## Tests

See `product-plan/sections/administration/tests.md`

## Done When

- [ ] Login with password verification
- [ ] Dashboard with stats and tabs
- [ ] Video CRUD operations
- [ ] Testimonial CRUD operations
- [ ] Empty states work
- [ ] Session persistence
- [ ] Logout
- [ ] Responsive on mobile
