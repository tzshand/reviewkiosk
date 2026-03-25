"use client";

import { config } from "@/lib/config";

interface PositiveFlowProps {
  rating: number;
}

export function PositiveFlow({ rating }: PositiveFlowProps) {
  const reviewUrl = config.googleReviewUrl;
  const stars = "★".repeat(rating);

  return (
    <div className="fade-in flex flex-col items-center gap-6 text-center px-4">
      <div className="text-5xl">{stars}</div>

      <h2 className="text-2xl font-semibold text-[var(--color-kiosk-text)]">
        Thank you!
      </h2>

      <p className="text-lg text-[var(--color-kiosk-muted)] max-w-sm">
        We&apos;re glad you had a great experience. If you have a moment, we&apos;d
        love a Google review!
      </p>

      {reviewUrl ? (
        <div className="flex flex-col items-center gap-4 mt-2">
          {/* QR code - we'll generate this dynamically */}
          <div className="bg-white p-4 rounded-2xl shadow-md">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(reviewUrl)}`}
              alt="Scan to review"
              width={200}
              height={200}
            />
          </div>
          <p className="text-base text-[var(--color-kiosk-muted)]">
            Scan with your phone to leave a review
          </p>
        </div>
      ) : (
        <div className="bg-[var(--color-kiosk-positive)] text-white
                        rounded-2xl px-8 py-4 text-xl font-semibold">
          We appreciate your support!
        </div>
      )}
    </div>
  );
}
