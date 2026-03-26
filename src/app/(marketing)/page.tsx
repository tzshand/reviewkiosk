import Link from "next/link";
import { LeadForm } from "./_components/lead-form";

const steps = [
  {
    num: "1",
    title: "Place the kiosk at your counter",
    desc: "A sleek tablet sits at your checkout counter or front desk. Customers see a simple prompt: \"How was your visit?\" No apps to download, no accounts to create.",
    icon: (
      <svg className="w-8 h-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5h3m-6.75 2.25h10.5a2.25 2.25 0 002.25-2.25v-15a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 4.5v15a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    num: "2",
    title: "Customer taps a star rating",
    desc: "One tap. That's it. Happy customers (4-5 stars) get a QR code to leave a Google review on their phone. Unhappy customers get a private feedback form instead.",
    icon: (
      <svg className="w-8 h-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    num: "3",
    title: "Reviews roll in automatically",
    desc: "Happy customers scan the QR code with their phone and leave a real Google review. Negative feedback goes straight to you privately — never public. You win either way.",
    icon: (
      <svg className="w-8 h-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const painPoints = [
  {
    title: "Only 1 in 10 happy customers leave reviews",
    desc: "Your happiest customers walk out the door every day without leaving a review. A simple prompt at the counter changes that — catch them while the experience is fresh.",
  },
  {
    title: "Bad reviews stick, good ones don't get written",
    desc: "Unhappy customers are 2-3x more likely to leave a review. ReviewKiosk flips the ratio by making it effortless for happy customers and redirecting unhappy ones to private feedback.",
  },
  {
    title: "\"Leave us a review\" signs don't work",
    desc: "A sign on the wall is invisible. A tablet on the counter with a single question is irresistible. The difference between asking and making it easy is the difference between 0 and 50 new reviews a month.",
  },
  {
    title: "You're flying blind on customer sentiment",
    desc: "Without data, you don't know what's working and what's not. ReviewKiosk captures every interaction — you see ratings, feedback, and trends over time.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-zinc-950 pt-16 pb-24 md:pt-28 md:pb-32 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-zinc-950 to-zinc-950" />
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <span className="text-amber-400 text-sm font-medium">
              Now available — ships within 5 business days
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
            Turn Every Happy Customer Into a{" "}
            <span className="text-amber-400">5-Star Review</span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            A countertop kiosk that captures customer sentiment in one tap. Happy customers get routed to Google Reviews. Unhappy ones give you private feedback. Starting at{" "}
            <strong className="text-white">$21.99/mo</strong> or{" "}
            <strong className="text-white">$249 one-time</strong>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link
              href="/contact"
              className="bg-amber-500 text-zinc-950 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/25"
            >
              Get Your Kiosk
            </Link>
            <Link
              href="/how-it-works"
              className="bg-zinc-800 text-zinc-100 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-zinc-700 border border-zinc-700 transition-colors"
            >
              See How It Works
            </Link>
          </div>
          <p className="text-zinc-500 text-sm">
            Pre-configured tablet. Plug in and go. No technical setup required.
          </p>
        </div>
      </section>

      {/* Device Preview */}
      <section className="bg-zinc-900 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-zinc-800 rounded-2xl border border-zinc-700 p-8 md:p-12 text-center">
            <div className="bg-zinc-950 rounded-xl p-6 max-w-xs mx-auto mb-6 border border-zinc-700">
              <div className="flex justify-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-10 h-10 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-white font-semibold text-lg mb-1">How was your visit?</p>
              <p className="text-zinc-500 text-sm">Tap a star to rate your experience</p>
            </div>
            <p className="text-zinc-400 text-sm">
              Sits on your counter. Customer taps a star. Done. The kiosk handles everything else.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-zinc-950 py-20 md:py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Three taps. Hundreds of reviews.
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              The entire experience takes under 10 seconds. No sign-ups, no apps, no friction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div
                key={step.num}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 hover:border-amber-500/30 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  {step.icon}
                  <span className="text-amber-400 text-sm font-bold uppercase tracking-wider">
                    Step {step.num}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/how-it-works"
              className="text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1 transition-colors"
            >
              Learn more about how it works
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="bg-zinc-900 py-20 md:py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for the problems you actually have
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              Every local business faces the same review problem. Here&apos;s what we hear every day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {painPoints.map((point) => (
              <div
                key={point.title}
                className="bg-zinc-950 border border-zinc-800 rounded-xl p-8"
              >
                <h3 className="text-lg font-bold text-white mb-3">
                  {point.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="bg-zinc-950 py-20 md:py-28 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple pricing. No surprises.
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-12">
            Choose how you want to pay. Same kiosk, same features, same results.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* One-Time */}
            <div className="bg-zinc-900 border-2 border-amber-500 rounded-2xl p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-zinc-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Best Value
              </div>
              <h3 className="text-xl font-bold text-white mb-2">One-Time Purchase</h3>
              <p className="text-zinc-400 text-sm mb-6">
                Pay once, own it forever
              </p>
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-white">$249</span>
                <span className="text-zinc-400"> one-time</span>
              </div>
              <ul className="text-left space-y-3 mb-8 text-sm">
                {[
                  "Pre-configured tablet included",
                  "Review gathering kiosk software",
                  "Google review QR code routing",
                  "Private feedback capture",
                  "Owner dashboard access",
                  "Free software updates",
                  "Lifetime access",
                ].map((item) => (
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
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-2">Monthly Plan</h3>
              <p className="text-zinc-400 text-sm mb-6">
                12 monthly payments, same kiosk
              </p>
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-white">$21.99</span>
                <span className="text-zinc-400">/mo for 12 months</span>
              </div>
              <ul className="text-left space-y-3 mb-8 text-sm">
                {[
                  "Pre-configured tablet included",
                  "Review gathering kiosk software",
                  "Google review QR code routing",
                  "Private feedback capture",
                  "Owner dashboard access",
                  "Free software updates",
                ].map((item) => (
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

          <div className="mt-8">
            <Link
              href="/pricing"
              className="text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1 transition-colors"
            >
              See full pricing details
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Sound Familiar? */}
      <section className="bg-zinc-900 py-20 md:py-28 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Sound familiar?
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              Local business owners across every industry face the same review challenge. Here&apos;s what they told us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Maria T.",
                role: "Restaurant Owner",
                venue: "Italian bistro, 80 covers",
                quote: "We get compliments every night but our Google rating is 3.8. The happy customers just leave. The unhappy ones go straight to Google.",
                initials: "MT",
              },
              {
                name: "James D.",
                role: "Salon Owner",
                venue: "3-chair barbershop",
                quote: "I asked clients to leave reviews for months. Got maybe two. Put the kiosk at the register and got 15 in the first week. It\u2019s the asking that matters.",
                initials: "JD",
              },
              {
                name: "Lisa P.",
                role: "Auto Shop Manager",
                venue: "Full-service auto repair",
                quote: "One bad review cost us three customers last month. If I could have caught that feedback privately first, I would have fixed it before it went public.",
                initials: "LP",
              },
            ].map((persona) => (
              <div
                key={persona.name}
                className="bg-zinc-950 border border-zinc-800 rounded-xl p-8 flex flex-col"
              >
                <blockquote className="text-zinc-200 text-lg leading-relaxed italic flex-1 mb-6">
                  &ldquo;{persona.quote}&rdquo;
                </blockquote>

                <div className="border-t border-zinc-800 pt-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-500/15 rounded-full flex items-center justify-center text-amber-400 text-sm font-bold">
                      {persona.initials}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{persona.name}</p>
                      <p className="text-zinc-500 text-xs">{persona.role} — {persona.venue}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Lead Capture */}
      <section className="bg-zinc-950 py-20 md:py-28 px-4">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to start collecting reviews?
            </h2>
            <p className="text-zinc-400 text-lg">
              Get a pre-configured review kiosk shipped to your door. Plug it in, set your Google review link, and start gathering 5-star reviews on day one.
            </p>
          </div>
          <LeadForm source="homepage-cta" />
        </div>
      </section>
    </>
  );
}
