import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({
    version: process.env.VERCEL_GIT_COMMIT_SHA || "dev",
    deployedAt: process.env.VERCEL_GIT_COMMIT_MESSAGE || "",
    timestamp: Date.now(),
  });
}
