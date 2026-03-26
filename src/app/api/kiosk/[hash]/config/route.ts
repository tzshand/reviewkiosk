import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/db";
import { TABLES } from "@/lib/db/schema";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ hash: string }> }
) {
  const { hash } = await params;

  try {
    const supabase = getSupabase();
    const { data: business, error } = await supabase
      .from(TABLES.businesses)
      .select("*")
      .eq("hash", hash)
      .eq("is_active", true)
      .single();

    if (error || !business) {
      return NextResponse.json({ error: "Kiosk not found" }, { status: 404 });
    }

    return NextResponse.json({
      businessName: business.name,
      googleReviewUrl: business.google_review_url || "",
      feedbackEmail: business.feedback_email || "",
      primaryColor: business.primary_color || "#F59E0B",
      logoUrl: business.logo_url || "",
      idleTimeoutMs: business.idle_timeout_ms || 15000,
      incentiveText: business.incentive_text || "",
      configVersion: business.config_version || 1,
    });
  } catch {
    return NextResponse.json(
      { error: "Config unavailable" },
      { status: 503 }
    );
  }
}
