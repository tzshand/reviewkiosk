import { getSupabase } from "@/lib/db";
import { TABLES } from "@/lib/db/schema";
import { PhoneFeedbackForm } from "./PhoneFeedbackForm";

export const dynamic = "force-dynamic";

export default async function PhoneFeedbackPage({
  params,
  searchParams,
}: {
  params: Promise<{ hash: string }>;
  searchParams: Promise<{ r?: string }>;
}) {
  const { hash } = await params;
  const { r } = await searchParams;
  const rating = Math.min(5, Math.max(1, parseInt(r || "3", 10)));

  let businessName = "the business";
  let googleReviewUrl = "";

  try {
    const supabase = getSupabase();
    const { data: business } = await supabase
      .from(TABLES.businesses)
      .select("name, google_review_url")
      .eq("hash", hash)
      .eq("is_active", true)
      .single();

    if (business) {
      businessName = business.name;
      googleReviewUrl = business.google_review_url || "";
    }
  } catch {
    // DB not available
  }

  return (
    <PhoneFeedbackForm
      hash={hash}
      rating={rating}
      businessName={businessName}
      googleReviewUrl={googleReviewUrl}
    />
  );
}
