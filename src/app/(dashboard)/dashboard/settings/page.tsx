"use client";

import { useState, useEffect } from "react";

interface Settings {
  name: string;
  incentiveText: string;
  googleReviewUrl: string;
  feedbackEmail: string;
  primaryColor: string;
  logoUrl: string;
  idleTimeoutMs: number;
  hash: string;
  isActive: boolean;
  configVersion: number;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard/settings")
      .then((r) => r.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    setStatus("idle");

    try {
      const res = await fetch("/api/dashboard/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: settings.name,
          incentiveText: settings.incentiveText,
          googleReviewUrl: settings.googleReviewUrl,
          feedbackEmail: settings.feedbackEmail,
          primaryColor: settings.primaryColor,
          logoUrl: settings.logoUrl,
          idleTimeoutMs: settings.idleTimeoutMs,
        }),
      });

      if (res.ok) {
        setStatus("saved");
        setSettings((s) =>
          s ? { ...s, configVersion: s.configVersion + 1 } : s
        );
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
    setSaving(false);
  };

  const update = (field: keyof Settings, value: string | number) => {
    setSettings((s) => (s ? { ...s, [field]: value } : s));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        Loading settings...
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="flex items-center justify-center h-64 text-red-500">
        Failed to load settings.
      </div>
    );
  }

  const kioskUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/k/${settings.hash}`;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-1">Kiosk Settings</h1>
      <p className="text-gray-500 mb-8">
        Configure your kiosk. Changes are pushed to your tablet when you save.
      </p>

      <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
        {/* Business Name */}
        <div className="p-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Business Name
          </label>
          <input
            type="text"
            value={settings.name}
            onChange={(e) => update("name", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-400 mt-1">
            Shown on the kiosk welcome screen
          </p>
        </div>

        {/* Incentive Text */}
        <div className="p-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Incentive Text
          </label>
          <input
            type="text"
            value={settings.incentiveText}
            onChange={(e) => update("incentiveText", e.target.value)}
            placeholder="Review us for 50% off your next order!"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-400 mt-1">
            Shown below the heading to encourage reviews (e.g. &quot;Review us
            for 50% off your next order!&quot;)
          </p>
        </div>

        {/* Google Review URL */}
        <div className="p-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Google Review URL
          </label>
          <input
            type="url"
            value={settings.googleReviewUrl}
            onChange={(e) => update("googleReviewUrl", e.target.value)}
            placeholder="https://search.google.com/local/writereview?placeid=..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-400 mt-1">
            Happy customers (4-5 stars) will see a QR code linking here. Leave
            empty to show a thank-you message instead.
          </p>
        </div>

        {/* Feedback Email */}
        <div className="p-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Feedback Email
          </label>
          <input
            type="email"
            value={settings.feedbackEmail}
            onChange={(e) => update("feedbackEmail", e.target.value)}
            placeholder="you@yourbusiness.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-400 mt-1">
            Where negative feedback gets sent (optional — also viewable in
            dashboard)
          </p>
        </div>

        {/* Accent Color */}
        <div className="p-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Accent Color
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={settings.primaryColor}
              onChange={(e) => update("primaryColor", e.target.value)}
              className="w-10 h-10 rounded cursor-pointer border border-gray-300"
            />
            <input
              type="text"
              value={settings.primaryColor}
              onChange={(e) => update("primaryColor", e.target.value)}
              className="w-28 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Star color and accent on the kiosk
          </p>
        </div>

        {/* Logo URL */}
        <div className="p-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Logo URL
          </label>
          <input
            type="url"
            value={settings.logoUrl}
            onChange={(e) => update("logoUrl", e.target.value)}
            placeholder="https://yourbusiness.com/logo.png"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-400 mt-1">
            Displayed above the rating screen (optional)
          </p>
        </div>

        {/* Idle Timeout */}
        <div className="p-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Idle Timeout (seconds)
          </label>
          <input
            type="number"
            min={5}
            max={120}
            value={Math.round(settings.idleTimeoutMs / 1000)}
            onChange={(e) =>
              update("idleTimeoutMs", Number(e.target.value) * 1000)
            }
            className="w-28 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-400 mt-1">
            Screen resets to welcome after this many seconds of inactivity
          </p>
        </div>
      </div>

      {/* Kiosk URL */}
      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-5">
        <p className="text-sm font-medium text-amber-800 mb-1">
          Your Kiosk URL
        </p>
        <p className="text-sm font-mono text-amber-700 break-all">
          {kioskUrl}
        </p>
        <p className="text-xs text-amber-600 mt-1">
          This is the URL loaded on your tablet
        </p>
      </div>

      {/* Save Button */}
      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-amber-500 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-amber-600 transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save & Push to Tablet"}
        </button>

        {status === "saved" && (
          <span className="text-sm text-green-600 font-medium">
            Saved! Your kiosk will update within 30 seconds.
          </span>
        )}
        {status === "error" && (
          <span className="text-sm text-red-600 font-medium">
            Failed to save. Please try again.
          </span>
        )}
      </div>
    </div>
  );
}
