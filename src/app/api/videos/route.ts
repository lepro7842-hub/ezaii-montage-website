import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { videos, testimonials } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { extractYoutubeId, buildThumbnailUrl } from "@/lib/youtube";
import { requireAdmin } from "@/lib/middleware";

export async function GET() {
  const allVideos = db.select().from(videos).orderBy(desc(videos.createdAt)).all();
  const allTestimonials = db.select().from(testimonials).all();

  const longVideos = allVideos
    .filter((v) => v.type === "long")
    .map((v) => {
      const testimonial = allTestimonials.find((t) => t.videoId === v.id);
      return {
        id: v.id,
        title: v.title,
        clientName: v.clientName,
        clientChannel: v.clientChannel,
        youtubeId: extractYoutubeId(v.youtubeUrl) || "",
        thumbnailUrl: v.thumbnailUrl,
        views: v.views,
        likes: v.likes,
        testimonial: testimonial
          ? { text: testimonial.text, avatarUrl: testimonial.avatarUrl }
          : null,
      };
    });

  const shorts = allVideos
    .filter((v) => v.type === "short")
    .map((v) => ({
      id: v.id,
      title: v.title,
      clientName: v.clientName,
      clientChannel: v.clientChannel,
      youtubeId: extractYoutubeId(v.youtubeUrl) || "",
      views: v.views,
      likes: v.likes,
    }));

  return NextResponse.json({ videos: longVideos, shorts });
}

export async function POST(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = await request.json();
  const { youtubeUrl, title, clientName, clientChannel, description, type } = body;

  if (!youtubeUrl || !title || !clientName || !type) {
    return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
  }

  const id = crypto.randomUUID();
  const youtubeId = extractYoutubeId(youtubeUrl);
  const thumbnailUrl = youtubeId ? buildThumbnailUrl(youtubeId) : "";

  db.insert(videos)
    .values({
      id,
      youtubeUrl,
      title,
      clientName,
      clientChannel: clientChannel || "",
      description: description || "",
      type,
      thumbnailUrl,
    })
    .run();

  return NextResponse.json({ id }, { status: 201 });
}
