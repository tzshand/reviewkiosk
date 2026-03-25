"use client";

import { useEffect, useRef, useCallback } from "react";

export function useIdleReset(onReset: () => void, timeoutMs: number, enabled: boolean) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (enabled) {
      timerRef.current = setTimeout(onReset, timeoutMs);
    }
  }, [onReset, timeoutMs, enabled]);

  useEffect(() => {
    if (!enabled) return;

    resetTimer();

    const events = ["pointerdown", "pointermove", "keydown"];
    events.forEach((e) => window.addEventListener(e, resetTimer));

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((e) => window.removeEventListener(e, resetTimer));
    };
  }, [resetTimer, enabled]);
}
