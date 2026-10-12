import {
  ArrowUpRight,
  MapPin,
  Navigation,
} from 'lucide-react'

const footerLinks = [
  { label: 'Home', href: '#home' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Gold Calculator', href: '#gold-calculator' },
  { label: 'Why GoldSuree', href: '#why-goldsuree' },
  { label: 'Contact', href: '#contact' },
]

const BUSINESS_ADDRESS =
  '1st Floor, SVS Arcade, Ananth Nagar Road, Electronic City Phase 2, Bangalore – 560100'

const BUSINESS_MAP_URL =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent(BUSINESS_ADDRESS)

export default function Footer() {
  return (
    <footer className="bg-[#211a12] px-5 text-[#f8f5ef] sm:px-8 lg:px-16">
      <div className="mx-auto max-w-[1400px]">

        {/* Main footer */}
        <div className="grid gap-10 border-b border-[#493b2a] py-12 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1.2fr_1fr] lg:gap-12 lg:py-16">

          {/* Brand */}
          <div>
            <a
              href="#home"
              className="inline-block font-editorial text-3xl tracking-wide"
            >
              Gold
              <span className="text-[#c5a16b]">Suree</span>
              <span className="ml-1 align-top text-xs text-[#c5a16b]">
                ®
              </span>
            </a>

            <p className="mt-4 max-w-sm text-sm leading-7 text-[#bdb09d]">
              A clearer way to understand the value of your old gold.
              Know the process before making your decision.
            </p>

            <a
              href="#gold-calculator"
              className="group mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-[#d9bd91] transition-colors duration-300 hover:text-white"
            >
              Estimate your gold value
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
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

          {/* Visit us */}
          <div>
            <h3 className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#c5a16b]">
              Visit Us
            </h3>

            <a
              href={BUSINESS_MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-5 flex items-start gap-3"
            >
              <MapPin
                size={19}
                strokeWidth={1.5}
                className="mt-1 shrink-0 text-[#c5a16b] transition-colors duration-300 group-hover:text-[#e4c48d]"
              />

              <span>
                <span className="block text-sm leading-7 text-[#d8cdbb] transition-colors duration-300 group-hover:text-white">
                  {BUSINESS_ADDRESS}
                </span>

                <span className="mt-3 inline-flex items-center gap-2 border-b border-[#8e7048] pb-1 text-xs uppercase tracking-[0.12em] text-[#d9bd91] transition-colors duration-300 group-hover:border-[#e4c48d] group-hover:text-white">
                  <Navigation size={13} />
                  Get Directions
                  <ArrowUpRight
                    size={13}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </span>
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
      Terms & Conditions
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

