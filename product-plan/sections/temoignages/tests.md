# Test Instructions: Témoignages

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview

The Témoignages section displays client reviews in a swipeable card stack. Key functionality: swipe navigation, pagination dots, YouTube channel links.

---

## User Flow Tests

### Flow 1: Swipe Through Testimonials

**Scenario:** User swipes to read different testimonials.

#### Success Path

**Setup:**
- TestimonialStack rendered with 5 testimonials

**Steps:**
1. User sees first testimonial card
2. User swipes left (drag > 100px threshold)
3. Card exits with throw animation
4. Next testimonial appears

**Expected Results:**
- [ ] Section title "Ce qu'ils en pensent" visible
- [ ] Subtitle "Les retours de YouTubeurs satisfaits" visible
- [ ] First testimonial text displayed
- [ ] After swipe, next card becomes active
- [ ] Pagination dot updates (active dot is wider, blue)
- [ ] Swipe hint "Glissez pour découvrir" visible

### Flow 2: Click YouTube Channel Link

**Scenario:** User clicks a channel name to visit the YouTuber's page.

**Steps:**
1. User sees testimonial from "Lucas" with channel "LucasMusic"
2. User clicks on "LucasMusic" link

**Expected Results:**
- [ ] `onChannelClick` callback called with testimonial object
- [ ] Link has href pointing to channelUrl
- [ ] Link opens in new tab (target="_blank")
- [ ] YouTube icon visible next to channel name

### Flow 3: Navigate via Pagination Dots

**Scenario:** User clicks a pagination dot to jump to a specific testimonial.

**Steps:**
1. User clicks the 3rd dot
2. Card transitions to 3rd testimonial

**Expected Results:**
- [ ] Current card exits with animation
- [ ] 3rd testimonial appears
- [ ] 3rd dot becomes active (wider, blue)

---

## Empty State Tests

### No Testimonials

**Setup:**
- testimonials array is empty (`[]`)

**Expected Results:**
- [ ] Section renders without crashing
- [ ] No pagination dots shown
- [ ] Card area is empty

### Single Testimonial

**Setup:**
- Only 1 testimonial

**Expected Results:**
- [ ] Card displays without stack effect
- [ ] Swipe still works (loops back to same card)
- [ ] Single pagination dot shown

---

## Component Interaction Tests

### TestimonialStack

- [ ] Maximum 3 cards visible in stack
- [ ] Back cards have reduced scale (0.95, 0.90)
- [ ] Back cards have increased translateY (8px, 16px)
- [ ] Back cards have reduced opacity and blur
- [ ] Mouse drag and touch swipe both work

### TestimonialCard

- [ ] Testimonial text displayed in large, light font
- [ ] Client name and initial avatar visible
- [ ] Channel link with YouTube icon
- [ ] Decorative quote mark visible
- [ ] Gradient border highlight at top

---

## Edge Cases

- [ ] Swipe threshold not met (< 100px) — card snaps back
- [ ] Rapid successive swipes don't break state
- [ ] Works with touch on mobile and mouse on desktop
- [ ] Card loops after last testimonial (returns to first)

---

## Sample Test Data

```typescript
const mockTestimonial = {
  id: "testi-001",
  clientName: "Lucas",
  channelName: "LucasMusic",
  channelUrl: "https://www.youtube.com/@lucasmusic",
  text: "Ezaii a transformé mes vlogs musicaux en véritables clips !"
};

const mockTestimonials = [mockTestimonial, /* ... more */];
const mockEmptyTestimonials = [];
const mockSingleTestimonial = [mockTestimonial];
```
