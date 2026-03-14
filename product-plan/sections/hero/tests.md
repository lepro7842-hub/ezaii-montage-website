# Test Instructions: Hero

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview

The Hero section is an immersive landing experience with a video intro, bioluminescent text reveal, and a CTA button. Key functionality: video autoplay, sequential animation reveal, and CTA navigation.

---

## User Flow Tests

### Flow 1: Full Hero Experience

**Scenario:** User lands on the page and experiences the complete hero animation sequence.

#### Success Path

**Setup:**
- Hero component rendered with content, assets, and animationConfig props
- Video element available and ready to play

**Steps:**
1. Page loads, video starts playing automatically (autoplay, muted)
2. Video ends
3. Brand name letters appear one by one
4. Tagline appears after all letters revealed
5. CTA button appears after tagline

**Expected Results:**
- [ ] Video plays automatically on load (muted, playsInline)
- [ ] After video ends, background transitions to deep ocean (#000833)
- [ ] Brand letters reveal sequentially with configured delay (150ms each)
- [ ] Tagline appears after configured delay (800ms after last letter)
- [ ] CTA appears after configured delay (1200ms after tagline)
- [ ] `onVideoEnd` callback fires when video finishes
- [ ] `onAnimationComplete` callback fires when CTA appears

### Flow 2: Click CTA

**Scenario:** User clicks the "Parcourir mes réalisations" button.

#### Success Path

**Steps:**
1. Wait for CTA to appear
2. User clicks "Parcourir mes réalisations"

**Expected Results:**
- [ ] `onCtaClick` callback is called
- [ ] Button has hover effect (scale increase)

### Flow 3: Skip Video

**Scenario:** User clicks anywhere during video to skip to content.

**Steps:**
1. During video playback, user clicks on the hero area
2. Video jumps to end

**Expected Results:**
- [ ] Video ends immediately
- [ ] Content reveal sequence begins
- [ ] "Cliquez pour passer" hint disappears

---

## Component Interaction Tests

### Hero

**Renders correctly:**
- [ ] Video element present with autoPlay, muted, playsInline attributes
- [ ] Background color matches assets.backgroundColor
- [ ] Brand name text matches content.brandName

### BioluminescentLetter

**Renders correctly:**
- [ ] Letter text is displayed
- [ ] When revealed=false, letter is hidden (opacity 0)
- [ ] When revealed=true, letter fades in with glow effects

### BioluminescentParticles

**Renders correctly:**
- [ ] Particles are invisible when visible=false
- [ ] Particles appear when visible=true
- [ ] Default count is 15 particles

---

## Edge Cases

- [ ] Handles video load failure gracefully (still shows content after timeout)
- [ ] Works on mobile (touch events, no autoplay issues)
- [ ] Respects reduced motion preferences
- [ ] CTA button stops propagation (clicking CTA doesn't trigger skip)

---

## Sample Test Data

```typescript
const mockContent = {
  brandName: "ezaii",
  tagline: "Le montage qui fait la différence",
  ctaText: "Parcourir mes réalisations",
  ctaTarget: "#portfolio"
};

const mockAssets = {
  videoSrc: "/assets/ocean.mp4",
  fishLottieSrc: "/assets/fish.lottie",
  backgroundColor: "#000833"
};

const mockAnimationConfig = {
  letterRevealDelay: 150,
  taglineDelay: 800,
  ctaDelay: 1200,
  glowColor: "#00D4FF"
};
```
