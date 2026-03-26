import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, business_name, phone, source } = body;

    if (!name || !email || !business_name) {
      return NextResponse.json(
        { error: "Name, email, and business name are required" },
        { status: 400 }
      );
    }

    // For now, log it. Database storage comes in Phase 2.
    console.log("Lead received:", {
      name,
      email,
      business_name,
      phone: phone || null,
      source: source || "unknown",
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
