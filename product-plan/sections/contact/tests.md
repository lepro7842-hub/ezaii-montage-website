# Test Instructions: Contact

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview

The Contact section provides two ways to reach Ezaii: email and Discord. Key functionality: mailto link, Discord external link, hover effects.

---

## User Flow Tests

### Flow 1: Contact via Email

**Scenario:** User clicks the email button to send an email.

#### Success Path

**Setup:**
- Contact component rendered with contactInfo

**Steps:**
1. User sees headline "Prêt à donner vie à tes vidéos ?"
2. User sees subheadline text
3. User clicks on the email button showing "hello@ezaii-montage.com"

**Expected Results:**
- [ ] Email button has href `mailto:hello@ezaii-montage.com`
- [ ] `onEmailClick` callback is called (if provided, prevents default)
- [ ] If no callback, mailto opens native email client
- [ ] Email icon (envelope) visible on button

#### With Callback Override

**Setup:**
- onEmailClick callback provided

**Expected Results:**
- [ ] Default mailto behavior is prevented
- [ ] `onEmailClick` callback called instead

### Flow 2: Contact via Discord

**Scenario:** User clicks the Discord button.

**Steps:**
1. User clicks on Discord button showing "eliott4943"

**Expected Results:**
- [ ] Discord button has href pointing to Discord URL
- [ ] Link opens in new tab (target="_blank", rel="noopener noreferrer")
- [ ] `onDiscordClick` callback called (if provided, prevents default)
- [ ] Discord icon visible on button

---

## Component Interaction Tests

### Contact

**Renders correctly:**
- [ ] Headline text matches contactInfo.headline
- [ ] Subheadline text matches contactInfo.subheadline
- [ ] Email button shows contactInfo.email
- [ ] Discord button shows contactInfo.discordLabel
- [ ] Background has deep ocean gradient

**Hover behavior:**
- [ ] Email button: cyan glow intensifies, border brightens, button lifts (-2px)
- [ ] Discord button: indigo glow intensifies, border brightens, button lifts (-2px)

---

## Edge Cases

- [ ] Long email addresses don't break layout
- [ ] Buttons stack vertically on mobile (flex-col on small screens)
- [ ] Floating particles don't affect performance on mobile
- [ ] Both buttons work without callback props (default link behavior)

---

## Accessibility Checks

- [ ] Email and Discord links are keyboard accessible
- [ ] Buttons have sufficient color contrast
- [ ] Interactive elements have focus indicators

---

## Sample Test Data

```typescript
const mockContactInfo = {
  headline: "Prêt à donner vie à tes vidéos ?",
  subheadline: "Discutons de ton projet et créons ensemble du contenu qui claque.",
  email: "hello@ezaii-montage.com",
  discordUrl: "https://discord.com/users/eliott4943",
  discordLabel: "eliott4943"
};
```
