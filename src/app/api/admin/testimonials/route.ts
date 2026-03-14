import { NextResponse } from "next/server";
import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { desc } from "drizzle-orm";
import { requireAdmin } from "@/lib/middleware";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const allTestimonials = db.select().from(testimonials).orderBy(desc(testimonials.createdAt)).all();

  return NextResponse.json(
    allTestimonials.map((t) => ({
      id: t.id,
      clientName: t.clientName,
      channelName: t.channelName,
      channelUrl: t.channelUrl,
      avatarUrl: t.avatarUrl,
      text: t.text,
      videoId: t.videoId,
      createdAt: t.createdAt,
    }))
  );
}
