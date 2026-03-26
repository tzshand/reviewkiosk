import type { Metadata } from "next";
import { LeadForm } from "../_components/lead-form";

export const metadata: Metadata = {
  title: "Get Started",
  description:
    "Order your ReviewKiosk. Fill out the form and we'll ship a pre-configured review kiosk to your business.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-zinc-950 pt-16 pb-20 md:pt-24 md:pb-28 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
            {/* Left: Info */}
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
                Get your review kiosk
              </h1>
              <p className="text-lg text-zinc-400 leading-relaxed mb-8">
                Fill out the form and we&apos;ll be in touch within 24 hours. We&apos;ll ship a pre-configured review kiosk to your business — ready to plug in and start collecting reviews.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H18.75M4.5 9.75v6h15V9.75M4.5 9.75H18.75M4.5 9.75l1.875-5.625A1.125 1.125 0 017.44 3h9.12a1.125 1.125 0 011.065.775L19.5 9.75" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Ships in 5 business days</h3>
                    <p className="text-zinc-400 text-sm">
                      Pre-configured tablet arrives ready to use. No setup fees.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">$249 or $21.99/mo</h3>
                    <p className="text-zinc-400 text-sm">
                      Pay once or spread it over 12 months. Same kiosk either way.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Plug and play</h3>
                    <p className="text-zinc-400 text-sm">
                      Connect to WiFi, place at your counter. Collecting reviews in under 5 minutes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
                <h3 className="text-white font-semibold mb-3">Prefer to talk?</h3>
                <p className="text-zinc-400 text-sm mb-3">
                  Email us directly and we&apos;ll set up a call.
                </p>
                <a
                  href="mailto:hello@reviewkiosk.com"
                  className="text-amber-400 hover:text-amber-300 font-medium text-sm transition-colors"
                >
                  hello@reviewkiosk.com
                </a>
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white mb-2">
                Order your kiosk
              </h2>
              <p className="text-zinc-400 text-sm mb-6">
                Tell us about your business and we&apos;ll get your kiosk shipped.
              </p>
              <LeadForm source="contact-page" compact />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
