import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/db";
import { TABLES } from "@/lib/db/schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { rating, feedback, hash } = body;

    console.log("Feedback received:", {
      rating,
      feedback,
      hash,
      timestamp: new Date().toISOString(),
    });

    if (hash) {
      try {
        const supabase = getSupabase();

        const { data: business } = await supabase
          .from(TABLES.businesses)
          .select("id")
          .eq("hash", hash)
          .single();

        if (business) {
          await supabase.from(TABLES.feedback).insert({
            business_id: business.id,
            rating,
            feedback: feedback || null,
          });
        }
      } catch {
        // DB not configured — log only
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
