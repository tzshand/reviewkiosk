import { getSupabase } from "@/lib/db";
import { TABLES } from "@/lib/db/schema";
import { KioskApp } from "../../_components/KioskApp";
import type { KioskConfig } from "../../_components/KioskApp";
import { config as envConfig } from "@/lib/config";

export const dynamic = "force-dynamic";

export default async function KioskPage({
  params,
}: {
  params: Promise<{ hash: string }>;
}) {
  const { hash } = await params;

  let kioskConfig: KioskConfig | null = null;

  try {
    const supabase = getSupabase();
    const { data: business, error } = await supabase
      .from(TABLES.businesses)
      .select("*")
      .eq("hash", hash)
      .eq("is_active", true)
      .single();

    if (!error && business) {
      kioskConfig = {
        businessName: business.name,
        googleReviewUrl: business.google_review_url || "",
        primaryColor: business.primary_color || "#F59E0B",
        logoUrl: business.logo_url || "",
        idleTimeoutMs: business.idle_timeout_ms || 15000,
        incentiveText: business.incentive_text || "",
        hash: business.hash,
        configVersion: business.config_version || 1,
      };
    }
  } catch {
    // DB not configured — fall back to env vars
  }

  if (!kioskConfig) {
    kioskConfig = {
      businessName: envConfig.businessName,
      googleReviewUrl: envConfig.googleReviewUrl,
      primaryColor: envConfig.primaryColor,
      logoUrl: envConfig.logoUrl,
      idleTimeoutMs: envConfig.idleTimeoutMs,
      incentiveText: envConfig.incentiveText,
      hash,
      configVersion: 0,
    };
  }

  return <KioskApp config={kioskConfig} />;
}
