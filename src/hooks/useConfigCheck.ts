"use client";

import { useEffect, useRef } from "react";

export function useConfigCheck(hash: string, initialVersion: number) {
  const currentVersion = useRef(initialVersion);

  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch(`/api/kiosk/${hash}/config`, {
          cache: "no-store",
        });
        if (!res.ok) return;
        const data = await res.json();

        if (data.configVersion > currentVersion.current) {
          console.log(
            `Config updated: v${currentVersion.current} -> v${data.configVersion}. Reloading.`
          );
          window.location.reload();
        }
      } catch {
        // Network error — ignore, try again next interval
      }
    };

    const interval = setInterval(check, 30000);
    return () => clearInterval(interval);
  }, [hash, initialVersion]);
}
