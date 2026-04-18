import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/db";
import { SessionChatTable } from "@/config/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const { sessionId } = await req.json();

  await db
    .delete(SessionChatTable)
    .where(eq(SessionChatTable.sessionId, sessionId));

  return NextResponse.json({ success: true });
}