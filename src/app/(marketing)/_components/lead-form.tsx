"use client";

import { useState } from "react";

interface LeadFormProps {
  source?: string;
  compact?: boolean;
}

export function LeadForm({ source = "homepage", compact = false }: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      business_name: (form.elements.namedItem("business_name") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      source,
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-8 text-center">
        <div className="text-amber-400 text-4xl mb-3">&#10003;</div>
        <h3 className="text-xl font-bold text-white mb-2">You&apos;re in!</h3>
        <p className="text-zinc-300">
          We&apos;ll be in touch within 24 hours to get you set up.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className={compact ? "space-y-3" : "grid grid-cols-1 md:grid-cols-2 gap-4"}>
        <input
          name="name"
          type="text"
          required
          placeholder="Your name"
          className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Email address"
          className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
        />
        <input
          name="business_name"
          type="text"
          required
          placeholder="Business name"
          className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
        />
        <input
          name="phone"
          type="tel"
          placeholder="Phone number (optional)"
          className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
        />
      </div>

      {status === "error" && (
        <p className="text-red-400 text-sm">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-amber-500 text-zinc-950 py-3 px-6 rounded-lg font-semibold hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/25 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        {status === "submitting" ? "Sending..." : "Get Your Kiosk"}
      </button>
      <p className="text-zinc-500 text-xs text-center">
        No commitment. We&apos;ll reach out to get you set up.
      </p>
    </form>
  );
}
