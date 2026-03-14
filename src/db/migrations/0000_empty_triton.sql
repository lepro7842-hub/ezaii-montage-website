CREATE TABLE `pricing_tiers` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`category` text NOT NULL,
	`price` real NOT NULL,
	`currency` text DEFAULT '€' NOT NULL,
	`features` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `testimonials` (
	`id` text PRIMARY KEY NOT NULL,
	`client_name` text NOT NULL,
	`channel_name` text NOT NULL,
	`channel_url` text NOT NULL,
	`avatar_url` text,
	`text` text NOT NULL,
	`video_id` text,
	`created_at` text DEFAULT (datetime('now')) NOT NULL,
	FOREIGN KEY (`video_id`) REFERENCES `videos`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `videos` (
	`id` text PRIMARY KEY NOT NULL,
	`youtube_url` text NOT NULL,
	`title` text NOT NULL,
	`client_name` text NOT NULL,
	`client_channel` text DEFAULT '' NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`type` text NOT NULL,
	`thumbnail_url` text DEFAULT '' NOT NULL,
	`views` integer DEFAULT 0 NOT NULL,
	`likes` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT (datetime('now')) NOT NULL
);
