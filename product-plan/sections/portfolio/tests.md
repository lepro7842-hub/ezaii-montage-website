# Test Instructions: Portfolio

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview

The Portfolio section displays Ezaii's video editing work in two formats: a shorts carousel and a video grid with modal viewer. Key functionality: carousel scrolling, thumbnail clicking, modal with YouTube embed and stats.

---

## User Flow Tests

### Flow 1: Browse Shorts Carousel

**Scenario:** User scrolls through the shorts carousel.

#### Success Path

**Setup:**
- Portfolio component rendered with shorts array (5 items)

**Steps:**
1. User sees "Shorts" section with count badge ("5 créations")
2. User clicks right arrow to scroll
3. User sees additional shorts

**Expected Results:**
- [ ] Shorts carousel displays all items
- [ ] Navigation arrows appear on hover
- [ ] Left arrow is hidden initially (start of scroll)
- [ ] Right arrow scrolls carousel by 320px
- [ ] Each short shows title, channel name, and view count
- [ ] Play button overlay visible on each short card

### Flow 2: View Video in Modal

**Scenario:** User clicks a video thumbnail to watch it.

#### Success Path

**Setup:**
- Portfolio component rendered with videos array (6 items)

**Steps:**
1. User sees "Vidéos" section with count ("6 réalisations")
2. User clicks on a video thumbnail
3. Modal opens with YouTube player

**Expected Results:**
- [ ] `onVideoSelect` callback called with video id
- [ ] Modal appears with fade-in animation
- [ ] YouTube iframe loads with autoplay=1
- [ ] Video title displayed correctly
- [ ] Client name and channel shown
- [ ] View count formatted (e.g., "1 250 000 vues")
- [ ] Like count formatted
- [ ] Body scroll is locked when modal is open

### Flow 3: Close Video Modal

**Scenario:** User closes the video modal.

**Steps:**
1. Modal is open with a video
2. User clicks the X button (or backdrop, or presses Escape)

**Expected Results:**
- [ ] Modal closes
- [ ] `onModalClose` callback called
- [ ] Body scroll is restored
- [ ] YouTube embed stops playing

### Flow 4: View Video with Testimonial

**Scenario:** User opens a video that has an associated testimonial.

**Setup:**
- Video has testimonial object (not null)

**Expected Results:**
- [ ] "Témoignage" badge visible on the thumbnail
- [ ] In modal: testimonial section appears with quote, client avatar, 5 stars
- [ ] If no avatar URL, initial letter avatar is shown

---

## Empty State Tests

### No Videos

**Setup:**
- videos array is empty (`[]`), shorts array has items

**Expected Results:**
- [ ] "Vidéos" section shows "0 réalisations"
- [ ] Grid area is empty but layout doesn't break

### No Shorts

**Setup:**
- shorts array is empty (`[]`), videos array has items

**Expected Results:**
- [ ] "Shorts" section shows "0 créations"
- [ ] Carousel area is empty

### Completely Empty

**Setup:**
- Both videos and shorts arrays are empty

**Expected Results:**
- [ ] Header badge shows "0 créations • 0.0M+ vues totales"
- [ ] No broken layout

---

## Component Interaction Tests

### ShortsCarousel

- [ ] Renders all short cards in horizontal scroll
- [ ] Each card shows YouTube play button overlay
- [ ] View count formatted with K/M suffixes
- [ ] Cards have fade-slide-up entry animation

### VideoGrid

- [ ] Renders 3-column grid on desktop
- [ ] Thumbnail zoom effect on hover
- [ ] Play button appears on hover
- [ ] "Témoignage" badge only on videos with testimonials
- [ ] View count shows on each card

### VideoModal

- [ ] Pressing Escape closes modal
- [ ] Clicking backdrop closes modal
- [ ] Numbers formatted in French locale (1 250 000)

---

## Edge Cases

- [ ] Handles very long video titles with line clamping
- [ ] Works with 1 video and 100+ videos
- [ ] Modal keyboard trap (Escape to close)
- [ ] Carousel arrows update correctly as scroll position changes

---

## Sample Test Data

```typescript
const mockVideo = {
  id: "vid-001",
  title: "J'ai survécu 100 jours dans Minecraft Hardcore",
  clientName: "GameZone",
  clientChannel: "@GameZoneFR",
  youtubeId: "dQw4w9WgXcQ",
  thumbnailUrl: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  views: 1250000,
  likes: 89000,
  testimonial: {
    text: "Ezaii a complètement transformé ma vidéo.",
    avatarUrl: "https://example.com/avatar.jpg"
  }
};

const mockShort = {
  id: "short-001",
  title: "Cette astuce va changer ta vie",
  clientName: "TesteurFou",
  clientChannel: "@TesteurFou",
  youtubeId: "short_abc123",
  views: 2800000,
  likes: 180000
};

const mockEmptyVideos = [];
const mockEmptyShorts = [];
```
