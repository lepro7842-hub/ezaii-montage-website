import type { videos, testimonials, pricingTiers } from "@/db/schema";

// Drizzle inferred types
export type Video = typeof videos.$inferSelect;
export type NewVideo = typeof videos.$inferInsert;

export type Testimonial = typeof testimonials.$inferSelect;
export type NewTestimonial = typeof testimonials.$inferInsert;

export type PricingTier = typeof pricingTiers.$inferSelect;
export type NewPricingTier = typeof pricingTiers.$inferInsert;

// Contact info (static, not in DB)
export interface ContactInfo {
  headline: string;
  subheadline: string;
  email: string;
  discordUrl: string;
  discordLabel: string;
}
