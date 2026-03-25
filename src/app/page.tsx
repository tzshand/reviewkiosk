"use client";

import { useState, useCallback, useRef } from "react";
import { StarRating } from "@/components/StarRating";
import { PositiveFlow } from "@/components/PositiveFlow";
import { FeedbackForm } from "@/components/FeedbackForm";
import { AdminPanel } from "@/components/AdminPanel";
import { useIdleReset } from "@/hooks/useIdleReset";
import { useVersionCheck } from "@/hooks/useVersionCheck";
import { config } from "@/lib/config";

type Screen = "welcome" | "positive" | "feedback" | "thankyou";

export default function KioskPage() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [rating, setRating] = useState(0);
  const [showAdmin, setShowAdmin] = useState(false);

  // Admin panel: 5 taps in bottom-left corner within 3 seconds
  const adminTaps = useRef<number[]>([]);

  // Auto-reload on new deployment
  useVersionCheck();

  // Reset to welcome after idle (only on result screens)
  const resetToWelcome = useCallback(() => {
    setScreen("welcome");
    setRating(0);
  }, []);

  useIdleReset(resetToWelcome, config.idleTimeoutMs, screen !== "welcome");

  const handleRate = (stars: number) => {
    setRating(stars);
    if (stars >= 4) {
      setScreen("positive");
    } else {
      setScreen("feedback");
    }
  };

  const handleFeedbackSubmit = () => {
    setScreen("thankyou");
  };

  const handleAdminTap = () => {
    const now = Date.now();
    adminTaps.current = adminTaps.current
      .filter((t) => now - t < config.adminTapWindowMs)
      .concat(now);

    if (adminTaps.current.length >= config.adminTapCount) {
      adminTaps.current = [];
      setShowAdmin(true);
    }
  };

  if (showAdmin) {
    return <AdminPanel onClose={() => setShowAdmin(false)} />;
  }

  return (
    <div className="h-full flex flex-col items-center justify-center relative">
      {/* Admin trigger zone — bottom-left corner, invisible */}
      <div
        className="fixed bottom-0 left-0 w-16 h-16 z-40"
        onClick={handleAdminTap}
      />

      {screen === "welcome" && (
        <div className="fade-in flex flex-col items-center gap-8 px-6">
          {config.logoUrl && (
            <img
              src={config.logoUrl}
              alt={config.businessName}
              className="h-16 object-contain"
            />
          )}

          <div className="text-center">
            <h1 className="text-3xl font-bold text-[var(--color-kiosk-text)]">
              How was your visit?
            </h1>
            {config.businessName !== "Our Business" && (
              <p className="text-lg text-[var(--color-kiosk-muted)] mt-2">
                at {config.businessName}
              </p>
            )}
          </div>

          <StarRating onRate={handleRate} />

          <p className="text-base text-[var(--color-kiosk-muted)]">
            Tap a star to rate your experience
          </p>
        </div>
      )}

      {screen === "positive" && <PositiveFlow rating={rating} />}

      {screen === "feedback" && (
        <FeedbackForm rating={rating} onSubmit={handleFeedbackSubmit} />
      )}

      {screen === "thankyou" && (
        <div className="fade-in flex flex-col items-center gap-4 text-center px-6">
          <div className="text-6xl">🙏</div>
          <h2 className="text-2xl font-semibold text-[var(--color-kiosk-text)]">
            Thank you for your feedback
          </h2>
          <p className="text-lg text-[var(--color-kiosk-muted)]">
            We&apos;ll use it to improve your next visit.
          </p>
        </div>
      )}
    </div>
  );
}
