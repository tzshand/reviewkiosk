"use client";

import { useState, useCallback, useRef } from "react";
import { StarRating } from "./StarRating";
import { PositiveFlow } from "./PositiveFlow";
import { FeedbackForm } from "./FeedbackForm";
import { AdminPanel } from "./AdminPanel";
import { useIdleReset } from "@/hooks/useIdleReset";
import { useVersionCheck } from "@/hooks/useVersionCheck";
import { useConfigCheck } from "@/hooks/useConfigCheck";

export interface KioskConfig {
  businessName: string;
  googleReviewUrl: string;
  primaryColor: string;
  logoUrl: string;
  idleTimeoutMs: number;
  incentiveText: string;
  hash: string;
  configVersion: number;
}

type Screen = "welcome" | "positive" | "feedback" | "thankyou";

export function KioskApp({ config }: { config: KioskConfig }) {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [rating, setRating] = useState(0);
  const [showAdmin, setShowAdmin] = useState(false);

  const adminTaps = useRef<number[]>([]);

  useVersionCheck();
  useConfigCheck(config.hash, config.configVersion);

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
      .filter((t) => now - t < 3000)
      .concat(now);

    if (adminTaps.current.length >= 5) {
      adminTaps.current = [];
      setShowAdmin(true);
    }
  };

  if (showAdmin) {
    return <AdminPanel onClose={() => setShowAdmin(false)} />;
  }

  return (
    <div className="h-full flex flex-col items-center justify-center relative">
      <div
        className="fixed bottom-0 left-0 w-16 h-16 z-40"
        onClick={handleAdminTap}
      />

      {screen === "welcome" && (
        <div className="fade-in flex flex-col items-center gap-10 px-6">
          {config.logoUrl && (
            <img
              src={config.logoUrl}
              alt={config.businessName}
              className="h-28 object-contain"
            />
          )}

          <div className="text-center flex flex-col items-center gap-4">
            <h1
              className="text-5xl font-bold text-[var(--color-kiosk-text)] leading-tight"
              style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
            >
              We&apos;d love to know what you think!
            </h1>
            {config.incentiveText && (
              <p
                className="text-6xl font-extrabold tracking-tight text-[var(--color-kiosk-accent)] leading-none mt-2 incentive-text"
                style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
              >
                {config.incentiveText}
              </p>
            )}
            {config.businessName !== "Our Business" && (
              <p className="text-xl text-[var(--color-kiosk-muted)] mt-1">
                at {config.businessName}
              </p>
            )}
          </div>

          <StarRating onRate={handleRate} />

          <p className="text-lg text-[var(--color-kiosk-muted)]">
            Tap a star to rate your experience
          </p>
        </div>
      )}

      {screen === "positive" && (
        <PositiveFlow
          rating={rating}
          googleReviewUrl={config.googleReviewUrl}
        />
      )}

      {screen === "feedback" && (
        <FeedbackForm
          rating={rating}
          hash={config.hash}
          onSubmit={handleFeedbackSubmit}
        />
      )}

      {screen === "thankyou" && (
        <div className="fade-in flex flex-col items-center gap-6 text-center px-6">
          <div className="text-8xl">{"\uD83D\uDE4F"}</div>
          <h2 className="text-4xl font-bold text-[var(--color-kiosk-text)]"
              style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}>
            Thank you for your feedback
          </h2>
          <p className="text-xl text-[var(--color-kiosk-muted)]">
            We&apos;ll use it to improve your next visit.
          </p>
        </div>
      )}
    </div>
  );
}
