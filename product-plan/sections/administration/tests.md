# Test Instructions: Administration

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview

The Administration section provides a password-protected panel for managing portfolio videos and testimonials. Key functionality: login authentication, CRUD operations for videos and testimonials, tab navigation.

---

## User Flow Tests

### Flow 1: Login

**Scenario:** Admin accesses /admin and logs in.

#### Success Path

**Setup:**
- Login component rendered

**Steps:**
1. User sees login page with password field
2. User enters password
3. User clicks "Accéder au panneau"

**Expected Results:**
- [ ] Password field has label "Mot de passe"
- [ ] Placeholder text: "Entrez le mot de passe"
- [ ] `onLogin` callback called with (password, rememberMe)
- [ ] Button shows "Accéder au panneau" with arrow icon
- [ ] Footer text: "Accès réservé aux GOAT"

#### Failure Path: Wrong Password

**Setup:**
- error prop set to "Mot de passe incorrect"

**Expected Results:**
- [ ] Error message displayed with red styling and warning icon
- [ ] Password field is not cleared
- [ ] Submit button still enabled

#### Failure Path: Empty Password

**Steps:**
1. User leaves password field empty

**Expected Results:**
- [ ] Submit button has disabled state (gray, cursor-not-allowed)

#### Loading State

**Setup:**
- isLoading prop set to true

**Expected Results:**
- [ ] Button shows spinner icon and "Connexion..."
- [ ] Password field is disabled
- [ ] Button is disabled

### Flow 2: Manage Videos

**Scenario:** Admin views and manages portfolio videos.

#### View Videos

**Setup:**
- AdminDashboard rendered with 6 videos, Portfolio tab active

**Expected Results:**
- [ ] Stats show: Total vidéos (6), Vidéos longues (4), Shorts (2), Témoignages count
- [ ] Portfolio tab is active (blue highlight)
- [ ] Heading "Portfolio" with subtitle "Gérez vos réalisations vidéo"
- [ ] "Ajouter une vidéo" button visible
- [ ] 6 video cards displayed in grid

#### Add Video

**Steps:**
1. User clicks "Ajouter une vidéo"

**Expected Results:**
- [ ] `onAddVideo` callback called

#### Edit Video

**Steps:**
1. User hovers over a video card
2. Action overlay appears
3. User clicks edit button (pencil icon)

**Expected Results:**
- [ ] `onEditVideo` callback called with video id

#### Delete Video

**Steps:**
1. User hovers over a video card
2. User clicks delete button (trash icon)

**Expected Results:**
- [ ] `onDeleteVideo` callback called with video id

### Flow 3: Manage Testimonials

**Scenario:** Admin switches to Testimonials tab.

**Steps:**
1. User clicks "Témoignages" tab
2. Tab becomes active

**Expected Results:**
- [ ] Testimonials tab highlighted (blue)
- [ ] Heading "Témoignages" with subtitle "Gérez les avis de vos clients"
- [ ] "Ajouter un témoignage" button visible
- [ ] Testimonial cards displayed in 2-column grid

#### Add/Edit/Delete testimonials follow same pattern as videos.

### Flow 4: Logout

**Steps:**
1. User clicks "Déconnexion" in header

**Expected Results:**
- [ ] `onLogout` callback called

---

## Empty State Tests

### No Videos (Portfolio Tab)

**Setup:**
- videos array is empty, Portfolio tab active

**Expected Results:**
- [ ] Shows empty state with video icon
- [ ] Message: "Aucune vidéo dans le portfolio"
- [ ] CTA button: "Ajouter votre première vidéo"
- [ ] Clicking CTA calls `onAddVideo`

### No Testimonials (Testimonials Tab)

**Setup:**
- testimonials array is empty, Testimonials tab active

**Expected Results:**
- [ ] Shows empty state with chat icon
- [ ] Message: "Aucun témoignage pour le moment"
- [ ] CTA button: "Ajouter votre premier témoignage"
- [ ] Clicking CTA calls `onAddTestimonial`

---

## Component Interaction Tests

### VideoCard

- [ ] Shows YouTube thumbnail (extracted from URL)
- [ ] Type badge: "Vidéo longue" (blue) or "Short" (rose)
- [ ] Client name with user icon
- [ ] Date formatted in French (e.g., "15 janv. 2024")
- [ ] Edit/delete buttons appear on hover

### TestimonialCard (Admin)

- [ ] Avatar image if avatarUrl provided, otherwise initial letter
- [ ] Client name and channel name with YouTube icon
- [ ] Quote text in bordered blockquote
- [ ] Linked video name shown if videoId matches a video
- [ ] "Aucune vidéo liée" if no linked video
- [ ] Edit/delete buttons appear on hover

---

## Edge Cases

- [ ] Very long testimonial text doesn't break card layout
- [ ] Video with invalid YouTube URL shows placeholder thumbnail
- [ ] Tab counts update when items are added/removed
- [ ] Stats cards update reactively
- [ ] Responsive: single column on mobile

---

## Sample Test Data

```typescript
const mockVideo = {
  id: "vid-001",
  youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  title: "Mon Setup Gaming 2024",
  clientName: "TechVibe",
  description: "Setup gaming review",
  type: "long" as const,
  createdAt: "2024-01-15"
};

const mockTestimonial = {
  id: "test-001",
  clientName: "Lucas",
  channelName: "TechVibe",
  avatarUrl: "https://example.com/avatar.jpg",
  quote: "Ezaii a complètement transformé mes vidéos.",
  videoId: "vid-001",
  createdAt: "2024-01-20"
};

const mockEmptyVideos: Video[] = [];
const mockEmptyTestimonials: Testimonial[] = [];
```
