import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/db";
import { TABLES } from "@/lib/db/schema";

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

    console.log("Lead received:", {
      name,
      email,
      business_name,
      phone: phone || null,
      source: source || "unknown",
      timestamp: new Date().toISOString(),
    });

    try {
      const supabase = getSupabase();
      await supabase.from(TABLES.leads).insert({
        name,
        email,
        business_name,
        phone: phone || null,
        source: source || "unknown",
      });
    } catch {
      // DB not configured — log only
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
