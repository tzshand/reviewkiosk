import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { rating, feedback, name } = body;

    // For now, log it. We'll add email delivery later (Resend, SendGrid, etc.)
    console.log("Feedback received:", { rating, feedback, name, timestamp: new Date().toISOString() });

    // TODO: Send email to business owner
    // TODO: Store in database if needed

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
