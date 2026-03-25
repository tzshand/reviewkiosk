"use client";

import { useEffect, useRef } from "react";
import { config } from "@/lib/config";

export function useVersionCheck() {
  const currentVersion = useRef<string | null>(null);

  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch("/api/version", { cache: "no-store" });
        const data = await res.json();

        if (currentVersion.current === null) {
          // First check — just store the version
          currentVersion.current = data.version;
        } else if (data.version !== currentVersion.current) {
          // Version changed — new deployment. Reload silently.
          console.log(`Version changed: ${currentVersion.current} -> ${data.version}. Reloading.`);
          window.location.reload();
        }
      } catch {
        // Network error — ignore, try again next interval
      }
    };

    // Initial check
    check();

    // Poll
    const interval = setInterval(check, config.versionPollIntervalMs);
    return () => clearInterval(interval);
  }, []);
}
