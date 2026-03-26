import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/db";
import { TABLES } from "@/lib/db/schema";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = getSupabase();
  const { data: entries, error } = await supabase
    .from(TABLES.feedback)
    .select("*")
    .eq("business_id", session.businessId)
    .order("created_at", { ascending: false })
    .limit(100);

  if (error)
    return NextResponse.json({ error: "Failed to load" }, { status: 500 });

  return NextResponse.json({ feedback: entries || [] });
}
