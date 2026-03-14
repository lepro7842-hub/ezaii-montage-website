import { NextResponse } from "next/server";
import { db } from "@/db";
import { videos } from "@/db/schema";
import { desc } from "drizzle-orm";
import { requireAdmin } from "@/lib/middleware";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const allVideos = db.select().from(videos).orderBy(desc(videos.createdAt)).all();

  return NextResponse.json(
    allVideos.map((v) => ({
      id: v.id,
      youtubeUrl: v.youtubeUrl,
      title: v.title,
      clientName: v.clientName,
      clientChannel: v.clientChannel,
      description: v.description,
      type: v.type,
      createdAt: v.createdAt,
    }))
  );
}
