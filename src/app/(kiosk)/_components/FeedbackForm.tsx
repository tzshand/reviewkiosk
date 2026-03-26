"use client";

import { useState } from "react";

interface FeedbackFormProps {
  rating: number;
  onSubmit: () => void;
}

export function FeedbackForm({ rating, onSubmit }: FeedbackFormProps) {
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, feedback }),
      });
    } catch {
      // Silently fail — we don't want to show errors to customers
    }
    onSubmit();
  };

  return (
    <div className="fade-in flex flex-col items-center gap-6 w-full max-w-md px-4">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-[var(--color-kiosk-text)]">
          We&apos;re sorry to hear that.
        </h2>
        <p className="text-lg text-[var(--color-kiosk-muted)] mt-2">
          Your feedback helps us improve.
        </p>
      </div>

      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Tell us what went wrong..."
        rows={4}
        autoFocus
        className="w-full rounded-xl border-2 border-[var(--color-kiosk-star-empty)]
                   bg-white p-4 text-lg resize-none
                   focus:border-[var(--color-kiosk-accent)] focus:outline-none
                   placeholder:text-[var(--color-kiosk-muted)]"
      />

      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="w-full py-4 rounded-xl text-lg font-semibold text-white
                   bg-[var(--color-kiosk-negative)] hover:bg-[#4B5563]
                   disabled:opacity-50 transition-colors"
      >
        {submitting ? "Sending..." : "Submit Feedback"}
      </button>

      <p className="text-sm text-[var(--color-kiosk-muted)]">
        This feedback is sent privately to the owner.
      </p>
    </div>
  );
}
