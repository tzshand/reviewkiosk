import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "ReviewKiosk pricing: $249 one-time or $21.99/mo for 12 months. Pre-configured tablet, review-gathering software, and owner dashboard included.",
};

const features = [
  "Pre-configured Android tablet",
  "Review gathering kiosk software",
  "Star rating capture (1-5)",
  "Google review QR code routing",
  "Private feedback form for low ratings",
  "Auto-reset between customers",
  "Owner dashboard",
  "Feedback history & analytics",
  "Business branding (name, logo, colors)",
  "Remote software updates",
  "Device management (WiFi, volume)",
  "Lifetime software access",
];

const comparisons = [
  {
    feature: "Hardware included",
    reviewKiosk: true,
    podium: false,
    birdeye: false,
    manual: false,
  },
  {
    feature: "One-time purchase option",
    reviewKiosk: true,
    podium: false,
    birdeye: false,
    manual: true,
  },
  {
    feature: "No monthly fees",
    reviewKiosk: "$249 one-time option",
    podium: false,
    birdeye: false,
    manual: true,
  },
  {
    feature: "Physical kiosk at counter",
    reviewKiosk: true,
    podium: false,
    birdeye: false,
    manual: false,
  },
  {
    feature: "Negative review interception",
    reviewKiosk: true,
    podium: true,
    birdeye: true,
    manual: false,
  },
  {
    feature: "No customer account needed",
    reviewKiosk: true,
    podium: false,
    birdeye: false,
    manual: true,
  },
  {
    feature: "Setup time",
    reviewKiosk: "5 min",
    podium: "Weeks",
    birdeye: "Weeks",
    manual: "None",
  },
  {
    feature: "Monthly cost",
    reviewKiosk: "$0-22",
    podium: "$399+",
    birdeye: "$299+",
    manual: "$0",
  },
];

function Check() {
  return (
    <svg className="w-5 h-5 text-amber-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function Cross() {
  return (
    <svg className="w-5 h-5 text-zinc-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-zinc-950 pt-16 pb-20 md:pt-24 md:pb-28 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            One kiosk.{" "}
            <span className="text-amber-400">Two ways to pay.</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Same device, same features, same results. Choose the payment option that works for you.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="bg-zinc-900 py-20 md:py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
            {/* One-Time */}
            <div className="bg-zinc-950 border-2 border-amber-500 rounded-2xl p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-zinc-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Best Value
              </div>
              <h3 className="text-xl font-bold text-white mb-2">One-Time Purchase</h3>
              <p className="text-zinc-400 text-sm mb-6">
                Pay once, own it forever. No recurring fees.
              </p>
              <div className="mb-6">
                <span className="text-5xl font-extrabold text-white">$249</span>
                <span className="text-zinc-400 ml-1">one-time</span>
              </div>
              <ul className="text-left space-y-3 mb-8 text-sm">
                {features.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-zinc-300">
                    <svg className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="block w-full bg-amber-500 text-zinc-950 py-3 rounded-lg font-semibold text-center hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/25"
              >
                Get Your Kiosk
              </Link>
            </div>

            {/* Monthly */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-2">Monthly Plan</h3>
              <p className="text-zinc-400 text-sm mb-6">
                12 easy payments. Same kiosk, same features.
              </p>
              <div className="mb-6">
                <span className="text-5xl font-extrabold text-white">$21.99</span>
                <span className="text-zinc-400 ml-1">/mo &times; 12</span>
              </div>
              <p className="text-zinc-500 text-sm mb-6">
                Total: ~$264 over 12 months. You own it after.
              </p>
              <ul className="text-left space-y-3 mb-8 text-sm">
                {features.slice(0, -1).map((item) => (
                  <li key={item} className="flex items-start gap-2 text-zinc-300">
                    <svg className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="block w-full bg-zinc-800 text-white py-3 rounded-lg font-semibold text-center hover:bg-zinc-700 border border-zinc-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* What's Included */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-8 text-center">
              <h3 className="text-xl font-bold text-white mb-3">What&apos;s in the box?</h3>
              <p className="text-zinc-400 mb-6">Everything you need to start collecting reviews.</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-zinc-900 rounded-lg p-4">
                  <p className="text-white font-semibold mb-1">Lenovo Tablet</p>
                  <p className="text-zinc-500">Pre-configured, kiosk-locked</p>
                </div>
                <div className="bg-zinc-900 rounded-lg p-4">
                  <p className="text-white font-semibold mb-1">Charging Cable</p>
                  <p className="text-zinc-500">USB-C with wall adapter</p>
                </div>
                <div className="bg-zinc-900 rounded-lg p-4">
                  <p className="text-white font-semibold mb-1">Quick Start Guide</p>
                  <p className="text-zinc-500">WiFi setup in 5 minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-zinc-950 py-20 md:py-28 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How we compare
            </h2>
            <p className="text-zinc-400 text-lg">
              ReviewKiosk vs. enterprise review platforms vs. doing nothing.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-4 px-4 text-zinc-400 font-medium w-1/3">Feature</th>
                  <th className="text-center py-4 px-4 text-amber-400 font-bold">ReviewKiosk</th>
                  <th className="text-center py-4 px-4 text-zinc-400 font-medium">Podium</th>
                  <th className="text-center py-4 px-4 text-zinc-400 font-medium">Birdeye</th>
                  <th className="text-center py-4 px-4 text-zinc-400 font-medium">Manual</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row) => (
                  <tr key={row.feature} className="border-b border-zinc-800/50">
                    <td className="py-4 px-4 text-zinc-300">{row.feature}</td>
                    {[row.reviewKiosk, row.podium, row.birdeye, row.manual].map((val, i) => (
                      <td key={i} className="text-center py-4 px-4">
                        {val === true ? <Check /> : val === false ? <Cross /> : (
                          <span className="text-zinc-300 text-xs">{val}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-zinc-900 py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start collecting reviews today
          </h2>
          <p className="text-zinc-400 text-lg mb-8">
            Pre-configured and shipped to your door. Plug in, connect to WiFi, done.
          </p>
          <Link
            href="/contact"
            className="inline-flex bg-amber-500 text-zinc-950 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/25"
          >
            Get Your Kiosk
          </Link>
        </div>
      </section>
    </>
  );
}
