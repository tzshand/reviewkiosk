/**
 * Seed script — creates tables and test account via Supabase REST API.
 *
 * Usage:
 *   SUPABASE_URL="https://xxx.supabase.co" SUPABASE_SERVICE_ROLE_KEY="sb_secret_..." pnpm db:seed
 */

import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

const SUPABASE_URL =
  process.env.SUPABASE_URL || "https://szdmhwtfxikzgicvqqhf.supabase.co";
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY || "";

if (!SUPABASE_KEY) {
  console.error("SUPABASE_SERVICE_ROLE_KEY is required");
  process.exit(1);
}

const TEST_EMAIL = "colin@reviewkiosk.com";
const TEST_PASSWORD = "reviewkiosk123";
const TEST_BUSINESS_NAME = "Demo Business";
const TEST_HASH = "35968d04";

async function seed() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  console.log("Seeding database...\n");

  // Check if user already exists
  const { data: existing } = await supabase
    .from("reviewkiosk_users")
    .select("id")
    .eq("email", TEST_EMAIL)
    .single();

  if (existing) {
    console.log(`User ${TEST_EMAIL} already exists (id: ${existing.id}).`);

    // Check if business exists
    const { data: existingBiz } = await supabase
      .from("reviewkiosk_businesses")
      .select("id, hash")
      .eq("user_id", existing.id)
      .single();

    if (existingBiz) {
      console.log(
        `Business already exists (hash: ${existingBiz.hash}). Skipping.\n`
      );
    } else {
      const { data: business, error } = await supabase
        .from("reviewkiosk_businesses")
        .insert({
          user_id: existing.id,
          hash: TEST_HASH,
          name: TEST_BUSINESS_NAME,
          feedback_email: TEST_EMAIL,
          primary_color: "#F59E0B",
          google_review_url: "https://g.page/r/CZ_hvEoD4KL-EBM/review",
          logo_url: "/logo.svg",
          incentive_text: "Review us for 50% off your next order!",
        })
        .select()
        .single();

      if (error) {
        console.error("Failed to create business:", error.message);
      } else {
        console.log(
          `Created business: ${business.name} (hash: ${business.hash})`
        );
      }
    }
  } else {
    // Create user
    const passwordHash = await bcrypt.hash(TEST_PASSWORD, 10);
    const { data: user, error: userError } = await supabase
      .from("reviewkiosk_users")
      .insert({
        email: TEST_EMAIL,
        password_hash: passwordHash,
        name: "Colin",
      })
      .select()
      .single();

    if (userError) {
      console.error("Failed to create user:", userError.message);
      process.exit(1);
    }

    console.log(`Created user: ${user.email} (id: ${user.id})`);

    // Create business
    const { data: business, error: bizError } = await supabase
      .from("reviewkiosk_businesses")
      .insert({
        user_id: user.id,
        hash: TEST_HASH,
        name: TEST_BUSINESS_NAME,
        feedback_email: TEST_EMAIL,
        primary_color: "#F59E0B",
        google_review_url: "https://g.page/r/CZ_hvEoD4KL-EBM/review",
        logo_url: "/logo.svg",
        incentive_text: "Review us for 50% off your next order!",
      })
      .select()
      .single();

    if (bizError) {
      console.error("Failed to create business:", bizError.message);
      process.exit(1);
    }

    console.log(`Created business: ${business.name} (hash: ${business.hash})`);
  }

  console.log(`\nKiosk URL: /k/${TEST_HASH}`);
  console.log(`\nLogin credentials:`);
  console.log(`  Email:    ${TEST_EMAIL}`);
  console.log(`  Password: ${TEST_PASSWORD}`);
  console.log("\nDone!");

  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
