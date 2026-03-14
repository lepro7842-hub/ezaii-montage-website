import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/middleware";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  const body = await request.json();
  const { clientName, channelName, channelUrl, avatarUrl, text, videoId } = body;

  const existing = db.select().from(testimonials).where(eq(testimonials.id, id)).get();
  if (!existing) {
    return NextResponse.json({ error: "Témoignage non trouvé" }, { status: 404 });
  }

  db.update(testimonials)
    .set({
      clientName: clientName ?? existing.clientName,
      channelName: channelName ?? existing.channelName,
      channelUrl: channelUrl ?? existing.channelUrl,
      avatarUrl: avatarUrl !== undefined ? avatarUrl : existing.avatarUrl,
      text: text ?? existing.text,
      videoId: videoId !== undefined ? videoId : existing.videoId,
    })
    .where(eq(testimonials.id, id))
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

  const existing = db.select().from(testimonials).where(eq(testimonials.id, id)).get();
  if (!existing) {
    return NextResponse.json({ error: "Témoignage non trouvé" }, { status: 404 });
  }

  db.delete(testimonials).where(eq(testimonials.id, id)).run();
  return NextResponse.json({ success: true });
}
