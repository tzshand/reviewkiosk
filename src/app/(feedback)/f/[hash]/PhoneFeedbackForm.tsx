"use client";

import { useState } from "react";

interface Props {
  hash: string;
  rating: number;
  businessName: string;
  googleReviewUrl: string;
}

export function PhoneFeedbackForm({
  hash,
  rating,
  businessName,
  googleReviewUrl,
}: Props) {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, feedback, hash }),
      });
    } catch {
      // Silently fail
    }
    setSubmitted(true);
  };

  const stars = Array.from({ length: 5 }, (_, i) => i < rating);

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="text-5xl mb-4">&#x1F64F;</div>
        <h1 className="text-2xl font-bold mb-2">Thank you!</h1>
        <p className="text-gray-600 mb-6">
          Your feedback has been sent to {businessName}.
        </p>
        {googleReviewUrl && (
          <a
            href={googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-amber-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-amber-600 transition-colors"
          >
            Leave us a Google review
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-1">
          Share your feedback
        </h1>
        <p className="text-gray-500 text-center mb-6">with {businessName}</p>

        <div className="flex justify-center gap-1 mb-6">
          {stars.map((filled, i) => (
            <svg
              key={i}
              className={`w-8 h-8 ${filled ? "text-amber-400" : "text-gray-200"}`}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>

        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Tell us what could be better..."
          rows={4}
          autoFocus
          className="w-full rounded-xl border-2 border-gray-200 p-4 text-base resize-none focus:border-amber-500 focus:outline-none"
        />

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full mt-4 py-3 rounded-xl text-base font-semibold text-white bg-gray-700 hover:bg-gray-800 disabled:opacity-50 transition-colors"
        >
          {submitting ? "Sending..." : "Submit Feedback"}
        </button>

        <p className="text-xs text-gray-400 text-center mt-3">
          This feedback is sent privately to the business owner.
        </p>
      </div>
    </div>
  );
}
