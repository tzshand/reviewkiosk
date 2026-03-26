"use client";

interface FeedbackFormProps {
  rating: number;
  hash: string;
  onSubmit: () => void;
}

export function FeedbackForm({ rating, hash }: FeedbackFormProps) {
  const feedbackUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/f/${hash}?r=${rating}`;

  return (
    <div className="fade-in flex flex-col items-center gap-6 text-center px-4">
      <h2 className="text-2xl font-semibold text-[var(--color-kiosk-text)]">
        We appreciate your honesty
      </h2>

      <p className="text-lg text-[var(--color-kiosk-muted)] max-w-sm">
        Scan the code below to share your feedback privately on your phone.
      </p>

      <div className="bg-white p-4 rounded-2xl shadow-md">
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(feedbackUrl)}`}
          alt="Scan to share feedback"
          width={200}
          height={200}
        />
      </div>

      <p className="text-base text-[var(--color-kiosk-muted)]">
        Your feedback is sent privately to the owner
      </p>
    </div>
  );
}
