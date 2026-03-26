import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/db";
import { TABLES } from "@/lib/db/schema";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = getSupabase();
  const { data: business, error } = await supabase
    .from(TABLES.businesses)
    .select("*")
    .eq("id", session.businessId)
    .single();

  if (error || !business)
    return NextResponse.json({ error: "Business not found" }, { status: 404 });

  return NextResponse.json({
    name: business.name,
    googleReviewUrl: business.google_review_url,
    feedbackEmail: business.feedback_email,
    primaryColor: business.primary_color,
    logoUrl: business.logo_url,
    idleTimeoutMs: business.idle_timeout_ms,
    hash: business.hash,
    isActive: business.is_active,
    incentiveText: business.incentive_text || "",
    configVersion: business.config_version,
  });
}

export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const {
    name,
    googleReviewUrl,
    feedbackEmail,
    primaryColor,
    logoUrl,
    idleTimeoutMs,
    incentiveText,
  } = body;

  const supabase = getSupabase();

  // Get current config_version
  const { data: current } = await supabase
    .from(TABLES.businesses)
    .select("config_version")
    .eq("id", session.businessId)
    .single();

  const updates: Record<string, unknown> = {
    config_version: (current?.config_version || 0) + 1,
    updated_at: new Date().toISOString(),
  };
  if (name !== undefined) updates.name = name;
  if (googleReviewUrl !== undefined) updates.google_review_url = googleReviewUrl;
  if (feedbackEmail !== undefined) updates.feedback_email = feedbackEmail;
  if (primaryColor !== undefined) updates.primary_color = primaryColor;
  if (logoUrl !== undefined) updates.logo_url = logoUrl;
  if (idleTimeoutMs !== undefined) updates.idle_timeout_ms = idleTimeoutMs;
  if (incentiveText !== undefined) updates.incentive_text = incentiveText;

  const { error } = await supabase
    .from(TABLES.businesses)
    .update(updates)
    .eq("id", session.businessId);

  if (error)
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });

  return NextResponse.json({ ok: true });
}
