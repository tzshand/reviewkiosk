import Link from "next/link";

const footerLinks = {
  product: [
    { href: "/how-it-works", label: "How It Works" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Get Started" },
  ],
  support: [
    { href: "/contact", label: "Contact Us" },
    { href: "/how-it-works#faq", label: "FAQ" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800/50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center font-bold text-zinc-950 text-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <span className="font-bold text-lg text-white">ReviewKiosk</span>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              The countertop review kiosk that turns happy customers into 5-star
              Google reviews. One-time purchase or easy monthly payments.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Support
            </h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-zinc-400 text-sm mt-4">
              hello@reviewkiosk.com
            </p>
          </div>
        </div>

        <div className="border-t border-zinc-800/50 mt-12 pt-8 text-center">
          <p className="text-zinc-500 text-sm">
            &copy; {new Date().getFullYear()} ReviewKiosk. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
