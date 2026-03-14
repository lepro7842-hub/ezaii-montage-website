import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const videos = sqliteTable("videos", {
  id: text("id").primaryKey(),
  youtubeUrl: text("youtube_url").notNull(),
  title: text("title").notNull(),
  clientName: text("client_name").notNull(),
  clientChannel: text("client_channel").notNull().default(""),
  description: text("description").notNull().default(""),
  type: text("type", { enum: ["long", "short"] }).notNull(),
  thumbnailUrl: text("thumbnail_url").notNull().default(""),
  views: integer("views").notNull().default(0),
  likes: integer("likes").notNull().default(0),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(datetime('now'))`),
});

export const testimonials = sqliteTable("testimonials", {
  id: text("id").primaryKey(),
  clientName: text("client_name").notNull(),
  channelName: text("channel_name").notNull(),
  channelUrl: text("channel_url").notNull(),
  avatarUrl: text("avatar_url"),
  text: text("text").notNull(),
  videoId: text("video_id").references(() => videos.id, {
    onDelete: "set null",
  }),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(datetime('now'))`),
});

export const pricingTiers = sqliteTable("pricing_tiers", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category", { enum: ["longForm", "short"] }).notNull(),
  price: real("price").notNull(),
  currency: text("currency").notNull().default("€"),
  features: text("features", { mode: "json" }).notNull().$type<string[]>(),
});
