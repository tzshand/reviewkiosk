"use client";

import { useState, useEffect } from "react";

interface AdminPanelProps {
  onClose: () => void;
}

export function AdminPanel({ onClose }: AdminPanelProps) {
  const [versionInfo, setVersionInfo] = useState<{
    version: string;
    deployedAt: string;
  } | null>(null);

  useEffect(() => {
    fetch("/api/version")
      .then((r) => r.json())
      .then(setVersionInfo)
      .catch(() => {});
  }, []);

  const handleReload = () => window.location.reload();

  const handleWifiSettings = () => {
    // Works in Android WebView with intent support
    window.location.href = "intent:#Intent;action=android.settings.WIFI_SETTINGS;end";
  };

  const handleDisplaySettings = () => {
    window.location.href = "intent:#Intent;action=android.settings.DISPLAY_SETTINGS;end";
  };

  const handleSoundSettings = () => {
    window.location.href = "intent:#Intent;action=android.settings.SOUND_SETTINGS;end";
  };

  const handleAndroidSettings = () => {
    window.location.href = "intent:#Intent;action=android.settings.SETTINGS;end";
  };

  const buttons = [
    { label: "WiFi Settings", icon: "📶", action: handleWifiSettings },
    { label: "Volume / Sound", icon: "🔊", action: handleSoundSettings },
    { label: "Brightness", icon: "☀️", action: handleDisplaySettings },
    { label: "Android Settings", icon: "⚙️", action: handleAndroidSettings },
    { label: "Reload App", icon: "🔄", action: handleReload },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[var(--color-admin-bg)] text-[var(--color-admin-text)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[var(--color-admin-card)]">
        <h1 className="text-xl font-semibold">Admin Panel</h1>
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg bg-[var(--color-admin-card)] text-sm font-medium"
        >
          Close
        </button>
      </div>

      {/* Controls */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {buttons.map(({ label, icon, action }) => (
          <button
            key={label}
            onClick={action}
            className="w-full flex items-center gap-4 p-4 rounded-xl
                       bg-[var(--color-admin-card)] hover:bg-[#3F3F46]
                       transition-colors text-left"
          >
            <span className="text-2xl">{icon}</span>
            <span className="text-lg">{label}</span>
          </button>
        ))}
      </div>

      {/* Version info */}
      <div className="p-4 border-t border-[var(--color-admin-card)] text-sm text-[var(--color-admin-muted)]">
        <p>Version: {versionInfo?.version?.slice(0, 8) || "dev"}</p>
        <p>Commit: {versionInfo?.deployedAt || "local"}</p>
        <p className="mt-1 text-xs">Tap bottom-left corner 5x to open this panel</p>
      </div>
    </div>
  );
}
