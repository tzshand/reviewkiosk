"use client";

interface PositiveFlowProps {
  rating: number;
  googleReviewUrl: string;
}

export function PositiveFlow({ rating, googleReviewUrl }: PositiveFlowProps) {
  const stars = "\u2605".repeat(rating);

  return (
    <div className="fade-in flex flex-col items-center gap-8 text-center px-6">
      <div className="text-7xl tracking-wider">{stars}</div>

      <h2
        className="text-5xl font-bold text-[var(--color-kiosk-text)]"
        style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
      >
        Thank you!
      </h2>

      <p className="text-2xl text-[var(--color-kiosk-muted)] max-w-lg">
        We&apos;re glad you had a great experience. If you have a moment, we&apos;d
        love a Google review!
      </p>

      {googleReviewUrl ? (
        <div className="flex flex-col items-center gap-5 mt-2">
          <div className="bg-white p-5 rounded-3xl shadow-lg">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(googleReviewUrl)}`}
              alt="Scan to review"
              width={280}
              height={280}
            />
          </div>
          <p className="text-xl text-[var(--color-kiosk-muted)]">
            Scan with your phone to leave a review
          </p>
        </div>
      ) : (
        <div className="bg-[var(--color-kiosk-positive)] text-white
                        rounded-2xl px-10 py-5 text-2xl font-bold">
          We appreciate your support!
        </div>
      )}
    </div>
  );
}
