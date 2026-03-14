# Milestone 7: Administration

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete, plus Portfolio and Témoignages milestones recommended

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

Implement the Administration section — a password-protected panel for managing portfolio videos and client testimonials.

## Overview

The Administration panel is accessible at `/admin` and allows Ezaii to manage the content displayed on the public site. It uses simple password authentication (single shared password) and provides CRUD operations for videos and testimonials.

**Key Functionality:**
- Password login with error handling and loading state
- Dashboard with stats overview (video counts, testimonial count)
- Tab navigation between Portfolio and Testimonials management
- Video management: view list, add new, edit, delete (with YouTube thumbnail extraction)
- Testimonial management: view list, add new, edit, delete (with optional video link)
- Empty states with helpful CTAs for first-time setup
- Logout functionality

## Recommended Approach: Test-Driven Development

See `product-plan/sections/administration/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/administration/components/`:

- `Login` — Password login page with error/loading states
- `AdminDashboard` — Main admin layout with tabs, stats, and content grids
- `VideoCard` — Card for a portfolio video with thumbnail, type badge, and actions
- `TestimonialCard` — Card for a testimonial with avatar, quote, and linked video

### Data Layer

**Video:**
```typescript
interface Video {
  id: string
  youtubeUrl: string
  title: string
  clientName: string
  description: string
  type: 'long' | 'short'
  createdAt: string
}
```

**Testimonial:**
```typescript
interface Testimonial {
  id: string
  clientName: string
  channelName: string
  avatarUrl: string | null
  quote: string
  videoId: string | null
  createdAt: string
}
```

You'll need to:
- Create API endpoints for CRUD operations on videos and testimonials
- Implement password authentication (single shared password)
- Handle session persistence (remember me)
- The VideoCard extracts YouTube thumbnails from the URL automatically

### Callbacks

#### Login
| Callback | Action |
|----------|--------|
| `onLogin` | Verify password against stored hash, create session |

#### AdminDashboard
| Callback | Action |
|----------|--------|
| `onAddVideo` | Open form/modal to create a new video |
| `onEditVideo` | Open form/modal pre-filled with video data |
| `onDeleteVideo` | Show confirmation, then delete video |
| `onAddTestimonial` | Open form/modal to create a new testimonial |
| `onEditTestimonial` | Open form/modal pre-filled with testimonial data |
| `onDeleteTestimonial` | Show confirmation, then delete testimonial |
| `onLogout` | Clear session, redirect to login |

**Note:** The provided components handle display only. You need to build:
- Add/Edit forms (modal or separate page)
- Confirmation dialogs for deletion
- API integration for all CRUD operations

### Empty States

The components include built-in empty states:
- **No videos:** Shows "Aucune vidéo dans le portfolio" with "Ajouter votre première vidéo" CTA
- **No testimonials:** Shows "Aucun témoignage pour le moment" with "Ajouter votre premier témoignage" CTA

## Files to Reference

- `product-plan/sections/administration/README.md` — Feature overview
- `product-plan/sections/administration/tests.md` — Test-writing instructions
- `product-plan/sections/administration/components/` — React components
- `product-plan/sections/administration/types.ts` — TypeScript interfaces
- `product-plan/sections/administration/sample-data.json` — Test data

## Expected User Flows

### Flow 1: Login

1. User navigates to `/admin`
2. User enters password
3. User clicks "Accéder au panneau"
4. **Outcome:** Dashboard loads with videos and testimonials

### Flow 2: Add a Video

1. Admin clicks "Ajouter une vidéo"
2. Form opens with fields: YouTube URL, title, client name, description, type (long/short)
3. Admin fills in details and submits
4. **Outcome:** New video appears in the portfolio grid and on the public site

### Flow 3: Edit a Video

1. Admin hovers over a video card
2. Action overlay appears with edit/delete buttons
3. Admin clicks edit (pencil icon)
4. Form opens pre-filled with video data
5. Admin modifies and saves
6. **Outcome:** Video updated in portfolio

### Flow 4: Delete a Video

1. Admin hovers over a video card
2. Admin clicks delete (trash icon)
3. Confirmation dialog appears
4. Admin confirms deletion
5. **Outcome:** Video removed, empty state shown if last item

### Flow 5: Manage Testimonials

1. Admin clicks "Témoignages" tab
2. Same CRUD flows as videos (add, edit, delete)
3. **Outcome:** Testimonials managed

### Flow 6: Logout

1. Admin clicks "Déconnexion" in header
2. Session cleared, redirected to login
3. **Outcome:** Admin securely logged out

## Done When

- [ ] Tests written for key user flows (login, CRUD, empty states)
- [ ] All tests pass
- [ ] Login works with password verification
- [ ] Dashboard renders with stats and tabs
- [ ] Video CRUD operations work end-to-end
- [ ] Testimonial CRUD operations work end-to-end
- [ ] Empty states display properly
- [ ] YouTube thumbnails extract automatically
- [ ] Linked video indicator works for testimonials
- [ ] Session persistence works (remember me)
- [ ] Logout clears session
- [ ] Responsive on mobile
