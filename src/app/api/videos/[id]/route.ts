import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { videos } from "@/db/schema";
import { eq } from "drizzle-orm";
import { extractYoutubeId, buildThumbnailUrl } from "@/lib/youtube";
import { requireAdmin } from "@/lib/middleware";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  const body = await request.json();
  const { youtubeUrl, title, clientName, clientChannel, description, type } = body;

  const existing = db.select().from(videos).where(eq(videos.id, id)).get();
  if (!existing) {
    return NextResponse.json({ error: "Vidéo non trouvée" }, { status: 404 });
  }

  const youtubeId = youtubeUrl ? extractYoutubeId(youtubeUrl) : null;
  const thumbnailUrl = youtubeId ? buildThumbnailUrl(youtubeId) : existing.thumbnailUrl;

  db.update(videos)
    .set({
      youtubeUrl: youtubeUrl ?? existing.youtubeUrl,
      title: title ?? existing.title,
      clientName: clientName ?? existing.clientName,
      clientChannel: clientChannel ?? existing.clientChannel,
      description: description ?? existing.description,
      type: type ?? existing.type,
      thumbnailUrl,
    })
    .where(eq(videos.id, id))
    .run();

  return NextResponse.json({ success: true });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;

  const existing = db.select().from(videos).where(eq(videos.id, id)).get();
  if (!existing) {
    return NextResponse.json({ error: "Vidéo non trouvée" }, { status: 404 });
  }

  db.delete(videos).where(eq(videos.id, id)).run();
  return NextResponse.json({ success: true });
}
