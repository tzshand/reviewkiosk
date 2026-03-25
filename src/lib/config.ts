export const config = {
  businessName: process.env.NEXT_PUBLIC_BUSINESS_NAME || "Our Business",
  googleReviewUrl: process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL || "",
  feedbackEmail: process.env.NEXT_PUBLIC_FEEDBACK_EMAIL || "",
  primaryColor: process.env.NEXT_PUBLIC_PRIMARY_COLOR || "#F59E0B",
  logoUrl: process.env.NEXT_PUBLIC_LOGO_URL || "",
  idleTimeoutMs: Number(process.env.NEXT_PUBLIC_IDLE_TIMEOUT_MS) || 15000,
  adminTapCount: 5,
  adminTapWindowMs: 3000,
  versionPollIntervalMs: 60000,
};
