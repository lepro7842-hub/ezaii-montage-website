import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { desc } from "drizzle-orm";
import { requireAdmin } from "@/lib/middleware";

export async function GET() {
  const allTestimonials = db
    .select({
      id: testimonials.id,
      clientName: testimonials.clientName,
      channelName: testimonials.channelName,
      channelUrl: testimonials.channelUrl,
      text: testimonials.text,
    })
    .from(testimonials)
    .orderBy(desc(testimonials.createdAt))
    .all();

  return NextResponse.json(allTestimonials);
}

export async function POST(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = await request.json();
  const { clientName, channelName, channelUrl, avatarUrl, text, videoId } = body;

  if (!clientName || !channelName || !channelUrl || !text) {
    return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
  }

  const id = crypto.randomUUID();

  db.insert(testimonials)
    .values({
      id,
      clientName,
      channelName,
      channelUrl,
      avatarUrl: avatarUrl || null,
      text,
      videoId: videoId || null,
    })
    .run();

  return NextResponse.json({ id }, { status: 201 });
}
