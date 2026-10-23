
import {
  ArrowUpRight,
  MapPin,
  Navigation,
  MessageCircle,
} from 'lucide-react'

const footerLinks = [
  { label: 'Home', href: '#home' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Why GoldSuree', href: '#why-goldsuree' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Contact', href: '#contact' },
]

const BUSINESS_ADDRESS =
  '1st floor, SVS Arcade, Kammasandra - Ananth Nagar Main Rd, near Vishal Mega Mart, Ananth Nagar, Phase 1, Phase II, Electronic City, Bengaluru, Hebbagodi, Karnataka 560100'

const MAP_SEARCH_URL =
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS_ADDRESS)}`

const DIRECTIONS_URL =
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(BUSINESS_ADDRESS)}`

const MAP_EMBED_URL =
  `https://maps.google.com/maps?q=${encodeURIComponent(BUSINESS_ADDRESS)}&z=16&output=embed`

export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative isolate overflow-hidden bg-[#211a12] px-5 text-[#f8f5ef] sm:px-8 lg:px-16"
    >
      
{/* Top-left smooth circular arcs */}
<div
  aria-hidden="true"
  className="pointer-events-none absolute left-[-190px] top-[-285px] -z-10 h-[480px] w-[480px] rounded-full border border-[#c99525]/25 shadow-[0_0_0_32px_rgba(201,149,37,0.025),0_0_0_64px_rgba(201,149,37,0.018)]"
/>

{/* Bottom-right smooth circular arcs */}
<div
  aria-hidden="true"
  className="pointer-events-none absolute bottom-[-320px] right-[-190px] -z-10 h-[480px] w-[480px] rounded-full border border-[#c99525]/25 shadow-[0_0_0_32px_rgba(201,149,37,0.025),0_0_0_64px_rgba(201,149,37,0.018)]"
/>


      <div className="relative mx-auto max-w-[1400px]">
        {/* Main footer */}
        <div className="grid gap-10 border-b border-[#493b2a] py-12 sm:grid-cols-2 lg:grid-cols-[1.05fr_0.75fr_1.5fr_0.9fr] lg:gap-10 lg:py-16">

          {/* Brand */}
          <div>
            <a
              href="/"
              className="inline-block font-editorial text-3xl tracking-wide"
            >
              Gold
              <span className="bg-gradient-to-r from-[#E8BD50] via-[#C99525] to-[#80520C] bg-clip-text text-transparent">
                Suree
              </span>
              <span className="ml-1 align-top text-xs text-[#c5a16b]">
                ®
              </span>
            </a>

            <p className="mt-4 max-w-sm text-sm leading-7 text-[#bdb09d]">
              A clearer way to understand the value of your old gold.
              Know the process before making your decision.
            </p>

            <a
              href="https://wa.me/918981298596"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-11 items-center gap-2 border border-[#8e7048] px-4 text-xs uppercase tracking-[0.12em] text-[#e4c48d] transition-colors duration-300 hover:bg-[#c99525] hover:text-[#211a12]"
            >
              <MessageCircle size={15} />
              WhatsApp Us
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#c5a16b]">
              Explore
            </h3>

            <nav aria-label="Footer navigation" className="mt-5">
              <ul className="space-y-3">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-[#bdb09d] transition-colors duration-300 hover:text-[#e4c48d]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Visit us and Google Maps */}
          <div className="min-w-0">
            <h3 className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#c5a16b]">
              Find Our Store
            </h3>

            <div className="mt-5 flex items-start gap-3">
              <MapPin
                size={19}
                strokeWidth={1.5}
                className="mt-1 shrink-0 text-[#c5a16b]"
              />

              <p className="text-sm leading-7 text-[#d8cdbb]">
                1st Floor, SVS Arcade,
                <br />
                Ananth Nagar Road,
                <br />
                Electronic City Phase 2,
                <br />
                Bangalore – 560100
              </p>
            </div>

            {/* Embedded Google Map */}
            <div className="group relative mt-5 overflow-hidden border border-[#8e7048]/60 bg-[#30271e] p-1">
              <div className="relative h-48 overflow-hidden sm:h-52">
                <iframe
                  title="GoldSuree store location on Google Maps"
                  src={MAP_EMBED_URL}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />

                <a
                  href={MAP_SEARCH_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open GoldSuree location in Google Maps"
                  className="absolute inset-0"
                />
              </div>
            </div>

            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 bg-gradient-to-r from-[#E8BD50] via-[#C99525] to-[#80520C] px-4 text-xs font-semibold uppercase tracking-[0.13em] text-[#211a12] transition-[filter,transform] duration-300 hover:brightness-110 active:scale-[0.99]"
            >
              <Navigation size={15} />
              Get Directions
              <ArrowUpRight size={15} />
            </a>
          </div>

          {/* Our approach */}
          <div>
            <h3 className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#c5a16b]">
              Our Approach
            </h3>

            <p className="mt-5 text-sm leading-7 text-[#bdb09d]">
              Understand the purity, weight and rate used in an
              estimate. Ask questions, review the valuation and
              decide whether to proceed.
            </p>

            <a
              href="#contact"
              className="group mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-[#d9bd91] transition-colors duration-300 hover:text-white"
            >
              Talk to us
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 py-6 text-[11px] text-[#a99a84] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} GoldSuree. All rights reserved.
          </p>

          <nav
            aria-label="Legal navigation"
            className="flex flex-wrap items-center gap-x-5 gap-y-3"
          >
            <a
              href="/terms-and-conditions"
              className="transition-colors duration-300 hover:text-[#e4c48d]"
            >
              Terms &amp; Conditions
            </a>

            <a
              href="/privacy-policy"
              className="transition-colors duration-300 hover:text-[#e4c48d]"
            >
              Privacy Policy
            </a>

            <a
              href="#home"
              className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-[#e4c48d]"
            >
              Back to top
              <span aria-hidden="true">↑</span>
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
