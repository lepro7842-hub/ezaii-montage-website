# Data Model

## Entities

### Video
A portfolio item representing a video edited by Ezaii. Can be either a long-form video or a short. Contains the YouTube embed URL, a title, the client's name/channel, and the video type.

### Testimonial
A client review from a YouTuber who has worked with Ezaii. Contains the client's name, their channel name, an optional avatar, the testimonial text, and an optional link to a related portfolio video.

### PricingTier
A pricing option for Ezaii's services. Contains the tier name (e.g., "1 vidéo", "Pack 2 vidéos", "Short"), the price, a description, and any conditions or notes.

## Relationships

- A **Testimonial** can optionally reference a **Video** (to link the review to a specific portfolio item)
- **Video** and **PricingTier** are independent entities
