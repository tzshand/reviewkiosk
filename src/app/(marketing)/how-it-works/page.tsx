import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "See how ReviewKiosk turns a countertop tablet into a review-gathering machine. One tap from your customer, real Google reviews for your business.",
};

const flowSteps = [
  {
    title: "Set up the kiosk at your counter",
    desc: "We ship you a pre-configured tablet. Plug it in, connect to WiFi, and place it where customers check out.",
    detail: "The kiosk arrives ready to go. No apps to install, no software to configure. Connect to WiFi and it automatically loads your branded review screen with your business name and Google review link.",
  },
  {
    title: "Customer taps a star rating",
    desc: "After their visit, customers see a simple question: \"How was your visit?\" They tap 1-5 stars. The whole interaction takes 3 seconds.",
    detail: "The interface is designed for zero friction. Big, tappable stars. No sign-up, no account, no email address required. The screen resets automatically after 15 seconds of inactivity — ready for the next customer.",
  },
  {
    title: "Happy customers get routed to Google",
    desc: "4-5 star ratings trigger a QR code. The customer scans it with their phone and lands directly on your Google review page.",
    detail: "The QR code opens your exact Google review page — the customer just types their review and hits submit. They're doing it right there at your counter while the experience is fresh. No \"I'll do it later\" — it happens now.",
  },
  {
    title: "Unhappy customers give you private feedback",
    desc: "1-3 star ratings show a private feedback form instead. Their complaint goes to you, not to Google.",
    detail: "This is the key insight: unhappy customers want to be heard. Give them a private channel and most won't bother leaving a public negative review. You get actionable feedback, they feel listened to, and your Google rating stays protected.",
  },
];

const faqs = [
  {
    q: "What tablet does it come with?",
    a: "A Lenovo Tab — a reliable, commercial-grade Android tablet with an 8.7\" screen. Perfect size for a countertop. If it ever breaks, replacements are affordable and we'll configure the new one remotely.",
  },
  {
    q: "Does it need WiFi?",
    a: "Yes, the kiosk needs a standard WiFi connection to display QR codes and submit feedback. It's a lightweight web app — any basic connection works fine.",
  },
  {
    q: "How do I set my Google review link?",
    a: "We set it up for you during onboarding. Just tell us your business name and location, and we'll configure your kiosk with the correct Google review URL. Changes can be made anytime through the owner dashboard.",
  },
  {
    q: "Can I customize the look?",
    a: "Yes. You can set your business name, logo, and accent color through the dashboard. The kiosk displays your branding, not ours.",
  },
  {
    q: "What happens to the feedback from unhappy customers?",
    a: "It's sent to your email and stored in your dashboard. You can see ratings, read feedback, and track trends over time. Nothing is ever posted publicly.",
  },
  {
    q: "Is there a contract?",
    a: "No contracts. The $249 one-time purchase is yours forever. The $21.99/mo option is a 12-month payment plan — after 12 payments, you own it outright.",
  },
  {
    q: "How long does setup take?",
    a: "Under 5 minutes. Unbox, plug in, connect to WiFi. The kiosk is pre-configured before it ships. You'll be collecting reviews the same day it arrives.",
  },
  {
    q: "Can I use this at multiple locations?",
    a: "Yes. Each location gets its own kiosk with its own Google review link and dashboard. Order one per location.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-zinc-950 pt-16 pb-20 md:pt-24 md:pb-28 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            One tap from your customer.{" "}
            <span className="text-amber-400">Real Google reviews.</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            ReviewKiosk sits at your counter and turns happy customers into 5-star Google reviews — automatically. Here&apos;s exactly how it works.
          </p>
        </div>
      </section>

      {/* Flow Steps */}
      <section className="bg-zinc-900 py-20 md:py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {flowSteps.map((step, i) => (
              <div
                key={step.title}
                className="bg-zinc-950 border border-zinc-800 rounded-xl p-8 md:p-10"
              >
                <div className="flex items-start gap-5">
                  <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center font-bold text-zinc-950 text-lg shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-zinc-300 text-lg mb-4">{step.desc}</p>
                    <p className="text-zinc-500 leading-relaxed">
                      {step.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Customers See */}
      <section className="bg-zinc-950 py-20 md:py-28 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What your customers see
            </h2>
            <p className="text-zinc-400 text-lg">
              Simple, fast, and impossible to mess up.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Rating Screen */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center">
              <div className="bg-zinc-950 rounded-lg p-8 mb-4 border border-zinc-700">
                <div className="flex justify-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-8 h-8 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white font-semibold">How was your visit?</p>
                <p className="text-zinc-500 text-xs mt-1">Tap a star to rate</p>
              </div>
              <h4 className="font-semibold text-white mb-1">Welcome screen</h4>
              <p className="text-zinc-500 text-sm">Customer taps a star rating</p>
            </div>

            {/* QR Code Screen */}
            <div className="bg-zinc-900 border border-amber-500/30 rounded-xl p-6 text-center">
              <div className="bg-amber-950/30 rounded-lg p-8 mb-4 border border-amber-500/30">
                <div className="text-3xl mb-2">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <p className="text-amber-400 font-bold mb-2">Thank you!</p>
                <div className="w-20 h-20 bg-white rounded-lg mx-auto flex items-center justify-center">
                  <svg className="w-12 h-12 text-zinc-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zm0 9.75c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zm9.75-9.75c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5z" />
                  </svg>
                </div>
                <p className="text-amber-300/70 text-xs mt-2">Scan to review</p>
              </div>
              <h4 className="font-semibold text-white mb-1">Happy customer (4-5 stars)</h4>
              <p className="text-zinc-500 text-sm">QR code to Google Reviews</p>
            </div>

            {/* Feedback Screen */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center">
              <div className="bg-zinc-950 rounded-lg p-8 mb-4 border border-zinc-700">
                <p className="text-white font-semibold mb-2">We&apos;re sorry to hear that.</p>
                <div className="bg-zinc-800 rounded-lg p-3 mb-2 text-left">
                  <p className="text-zinc-500 text-xs">Tell us what went wrong...</p>
                </div>
                <div className="bg-zinc-700 rounded-lg py-2 px-4">
                  <p className="text-zinc-300 text-xs font-medium">Submit Feedback</p>
                </div>
              </div>
              <h4 className="font-semibold text-white mb-1">Unhappy customer (1-3 stars)</h4>
              <p className="text-zinc-500 text-sm">Private feedback form</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-zinc-900 py-20 md:py-28 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently asked questions
            </h2>
            <p className="text-zinc-400 text-lg">
              Everything you need to know before ordering your kiosk.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 md:p-8"
              >
                <h3 className="text-lg font-bold text-white mb-3">{faq.q}</h3>
                <p className="text-zinc-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-zinc-950 py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to start collecting reviews?
          </h2>
          <p className="text-zinc-400 text-lg mb-8">
            Get a pre-configured review kiosk shipped to your door. Plug it in and start gathering 5-star reviews on day one.
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
