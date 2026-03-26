import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/db";
import { TABLES } from "@/lib/db/schema";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const supabase = getSupabase();

    const { data: user, error: userError } = await supabase
      .from(TABLES.users)
      .select("*")
      .eq("email", email.toLowerCase())
      .single();

    if (userError || !user || !(await bcrypt.compare(password, user.password_hash))) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const { data: business, error: bizError } = await supabase
      .from(TABLES.businesses)
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (bizError || !business) {
      return NextResponse.json(
        { error: "No business found for this account" },
        { status: 404 }
      );
    }

    await createSession({
      userId: user.id,
      email: user.email,
      businessId: business.id,
      businessHash: business.hash,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
