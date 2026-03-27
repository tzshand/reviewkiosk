"use client";

interface FeedbackFormProps {
  rating: number;
  hash: string;
  onSubmit: () => void;
}

export function FeedbackForm({ rating, hash }: FeedbackFormProps) {
  const feedbackUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/f/${hash}?r=${rating}`;

  return (
    <div className="fade-in flex flex-col items-center gap-8 text-center px-6">
      <h2
        className="text-4xl font-bold text-[var(--color-kiosk-text)]"
        style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
      >
        We appreciate your honesty
      </h2>

      <p className="text-2xl text-[var(--color-kiosk-muted)] max-w-lg">
        Scan the code below to share your feedback privately on your phone.
      </p>

      <div className="bg-white p-5 rounded-3xl shadow-lg">
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(feedbackUrl)}`}
          alt="Scan to share feedback"
          width={280}
          height={280}
        />
      </div>

      <p className="text-xl text-[var(--color-kiosk-muted)]">
        Your feedback is sent privately to the owner
      </p>
    </div>
  );
}
