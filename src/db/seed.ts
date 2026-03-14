import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";

const sqlite = new Database(process.env.DATABASE_URL || "./data/ezaii.db");
sqlite.pragma("journal_mode = WAL");
sqlite.pragma("foreign_keys = ON");

const db = drizzle(sqlite, { schema });

const sampleVideos = [
  {
    id: "vid-001",
    youtubeUrl: "https://youtu.be/5AkpAYeFoF4",
    title: "J'ai BRISÉ 50 MYTHES dans Rivals (Roblox)",
    clientName: "Anakin",
    clientChannel: "@Anakin",
    description: "Visibilité x3,2",
    type: "long" as const,
    thumbnailUrl: "https://i.ytimg.com/vi/5AkpAYeFoF4/maxresdefault.jpg",
    views: 1250000,
    likes: 89000,
    createdAt: "2024-01-15",
  },
  {
    id: "vid-002",
    youtubeUrl: "https://youtu.be/SP9fXW19oHg",
    title: "Cubi-Game vidéo",
    clientName: "Cubi-Game",
    clientChannel: "@Cubi-Game",
    description: "Montage gaming dynamique",
    type: "long" as const,
    thumbnailUrl: "https://i.ytimg.com/vi/SP9fXW19oHg/maxresdefault.jpg",
    views: 856000,
    likes: 52000,
    createdAt: "2024-02-08",
  },
  {
    id: "vid-003",
    youtubeUrl: "https://youtu.be/-YHoo65qVco",
    title: "Oncl3pick vidéo",
    clientName: "Oncl3pick",
    clientChannel: "@Oncl3pick",
    description: "Montage gaming",
    type: "long" as const,
    thumbnailUrl: "https://i.ytimg.com/vi/-YHoo65qVco/maxresdefault.jpg",
    views: 2800000,
    likes: 180000,
    createdAt: "2024-02-20",
  },
  {
    id: "vid-004",
    youtubeUrl: "https://youtu.be/tYpLi7L7AWA",
    title: "Neku vidéo",
    clientName: "Neku",
    clientChannel: "@Neku",
    description: "Montage gaming",
    type: "long" as const,
    thumbnailUrl: "https://i.ytimg.com/vi/tYpLi7L7AWA/maxresdefault.jpg",
    views: 500000,
    likes: 30000,
    createdAt: "2024-03-01",
  },
];

const sampleTestimonials = [
  {
    id: "testi-001",
    clientName: "LeMoove",
    channelName: "LeMoove",
    channelUrl: "",
    avatarUrl: null,
    text: "Ezai est un monteur passionné, et surtout l'un des rare avec autant de potentiel ! Très expérimenté en montage il a toujours su trouver une solution pour un meilleur rendu 😉",
    videoId: null,
    createdAt: "2024-03-01",
  },
  {
    id: "testi-002",
    clientName: "Gugu",
    channelName: "Gugu",
    channelUrl: "",
    avatarUrl: null,
    text: "Ezai est un monteur polyvalent",
    videoId: null,
    createdAt: "2024-03-05",
  },
];

const samplePricingTiers = [
  {
    id: "tier-001",
    name: "1 vidéo",
    category: "longForm" as const,
    price: 128,
    currency: "€",
    features: [
      "Montage complet de ta vidéo",
      "Jusqu'à 40 min de rush",
      "Corrections incluses",
      "Livraison sous 5 jours",
    ],
  },
  {
    id: "tier-002",
    name: "Pack 2 vidéos",
    category: "longForm" as const,
    price: 240,
    currency: "€",
    features: [
      "2 montages complets",
      "Jusqu'à 40 min de rush par vidéo",
      "Corrections incluses",
      "Livraison sous 7 jours",
      "Économise 16€",
    ],
  },
  {
    id: "tier-003",
    name: "Pack 3 vidéos",
    category: "longForm" as const,
    price: 345,
    currency: "€",
    features: [
      "3 montages complets",
      "Jusqu'à 40 min de rush par vidéo",
      "Corrections incluses",
      "Livraison sous 10 jours",
      "Économise 39€",
    ],
  },
  {
    id: "tier-004",
    name: "Short",
    category: "short" as const,
    price: 15,
    currency: "€",
    features: [
      "Montage format vertical",
      "Optimisé YouTube Shorts / TikTok",
      "Livraison sous 48h",
    ],
  },
];

async function seed() {
  console.log("Seeding database...");

  // Clear existing data
  db.delete(schema.testimonials).run();
  db.delete(schema.videos).run();
  db.delete(schema.pricingTiers).run();

  // Insert videos
  for (const video of sampleVideos) {
    db.insert(schema.videos).values(video).run();
  }
  console.log(`  Inserted ${sampleVideos.length} videos`);

  // Insert testimonials
  for (const testimonial of sampleTestimonials) {
    db.insert(schema.testimonials).values(testimonial).run();
  }
  console.log(`  Inserted ${sampleTestimonials.length} testimonials`);

  // Insert pricing tiers
  for (const tier of samplePricingTiers) {
    db.insert(schema.pricingTiers).values(tier).run();
  }
  console.log(`  Inserted ${samplePricingTiers.length} pricing tiers`);

  console.log("Seeding complete!");
}

seed();
