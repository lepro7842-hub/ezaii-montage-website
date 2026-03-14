# Administration

## Overview

A password-protected admin panel accessible via hidden URL (/admin) where Ezaii can manage portfolio videos and client testimonials. Authentication uses a single shared password with session persistence.

## User Flows

- **Login:** Access /admin → Enter password → Access admin dashboard
- **Manage portfolio:** View videos → Add/Edit/Delete videos
- **Manage testimonials:** View testimonials → Add/Edit/Delete testimonials
- **Logout:** Clear session and return to login page

## Design Decisions

- Dark immersive admin UI matching the site's aesthetic (slate-950)
- Stats cards at top showing counts (total videos, long, shorts, testimonials)
- Tab navigation between Portfolio and Testimonials
- Video cards with YouTube thumbnail, type badge, hover actions (edit/delete)
- Testimonial cards with avatar, quote, linked video indicator
- Empty states with CTA to add first item
- Login page with atmospheric background (gradient orbs, grid pattern)

## Data Used

**Entities:** Video, Testimonial

## Components Provided

- `Login` — Password login page with error handling and loading state
- `AdminDashboard` — Main admin layout with tabs, stats, and content management
- `VideoCard` — Card for displaying a portfolio video with edit/delete actions
- `TestimonialCard` — Card for displaying a client testimonial with edit/delete actions

## Callback Props

### LoginProps

| Callback | Description |
|----------|-------------|
| `onLogin` | Called with (password, rememberMe) when form is submitted |

### AdministrationProps

| Callback | Description |
|----------|-------------|
| `onAddVideo` | Called when user clicks "Ajouter une vidéo" |
| `onEditVideo` | Called with video id when user clicks edit |
| `onDeleteVideo` | Called with video id when user clicks delete |
| `onAddTestimonial` | Called when user clicks "Ajouter un témoignage" |
| `onEditTestimonial` | Called with testimonial id when user clicks edit |
| `onDeleteTestimonial` | Called with testimonial id when user clicks delete |
| `onLogout` | Called when user clicks "Déconnexion" |
