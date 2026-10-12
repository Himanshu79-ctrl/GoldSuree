
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowDown,
  ArrowUpRight,
  Gem,
  ShieldCheck,
  Star,
  CircleCheck,
} from 'lucide-react'
import GoldJewelleryScene from './GoldJewelleryScene'
import './HeroSection.css'

const trustItems = [
  { icon: Gem, title: '100% Transparent', sub: 'Process' },
  { icon: ShieldCheck, title: 'Secure & Trusted', sub: 'Transactions' },
  { icon: Star, title: 'Fair Value', sub: 'Guarantee' },
]

export default function HeroSection() {
  const reduceMotion = useReducedMotion()

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.75,
      delay: reduceMotion ? 0 : delay,
      ease: 'easeOut',
    },
  })

  return (
    <section id="home" className="gs-hero">
      <div className="gs-hero-glow" aria-hidden="true" />
      <div className="gs-hero-orbit gs-orbit-one" aria-hidden="true" />
      <div className="gs-hero-orbit gs-orbit-two" aria-hidden="true" />

      <div className="gs-hero-inner">
        {/* LEFT: Main content */}
        <div className="gs-hero-copy">
          <motion.div {...reveal(0)} className="gs-eyebrow">
            <span />
            A thoughtful way to sell old gold
          </motion.div>

          <motion.h1 {...reveal(0.1)} className="gs-hero-title">
            Your Gold.
            <span>Your True Worth.</span>
          </motion.h1>

          <motion.div
            {...reveal(0.18)}
            className="gs-title-underline"
            aria-hidden="true"
          />

          <motion.p {...reveal(0.25)} className="gs-hero-description">
            Ready to part with old jewellery? Understand how purity,
            weight and the applicable gold rate shape its estimated
            value before you make your decision.
          </motion.p>

          <motion.div {...reveal(0.32)} className="gs-hero-actions">
            <a href="#gold-calculator" className="gs-btn-primary">
              Calculate Gold Value
              <ArrowUpRight size={17} />
            </a>

            <a href="#how-it-works" className="gs-btn-secondary">
              How It Works
              <ArrowDown size={16} />
            </a>
          </motion.div>

          <motion.div {...reveal(0.4)} className="gs-hero-assurance">
            <ShieldCheck size={31} strokeWidth={1.35} />
            <p>
              Know the valuation process. Review the details.
              <br />
              Make your decision with clarity.
            </p>
          </motion.div>

          <motion.div {...reveal(0.5)} className="gs-trust-row">
            {trustItems.map(({ icon: Icon, title, sub }) => (
              <div className="gs-trust-item" key={title}>
                <Icon size={27} strokeWidth={1.4} />
                <div>
                  <span>{title}</span>
                  <span>{sub}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT: Animated 3D jewellery display */}
        <motion.div
          className="gs-hero-art"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: 'easeOut', delay: 0.15 }}
        >
          <div className="gs-art-backdrop" aria-hidden="true" />

          <div className="gs-silk gs-silk-top" aria-hidden="true" />
          <div className="gs-silk gs-silk-bottom" aria-hidden="true" />

          <div className="gs-jewellery-stage">
            <GoldJewelleryScene />
          </div>

          {/* Process card stays away from the bottom caption */}
          <motion.aside
            className="gs-process-card"
            {...reveal(0.65)}
          >
            <div className="gs-process-icon">
              <CircleCheck size={21} strokeWidth={1.4} />
              <Gem size={28} strokeWidth={1.2} />
            </div>

            <div className="gs-process-copy">
              <span>The process</span>
              <h2>Test. Weigh. Value.</h2>
              <p>Know what shapes your gold’s estimated value.</p>
            </div>
          </motion.aside>

          <div className="gs-art-caption">
            <span>Gold, in a new light</span>
            <h2>Every piece has a story.</h2>
            <div className="gs-caption-rule" />
          </div>

          {/* <div className="gs-scroll-mark">
            <span>01 / 03</span>
            <div />
            <span>Scroll</span>
            <ArrowDown size={17} />
          </div> */}

          <span className="gs-art-index" aria-hidden="true">GS / 01</span>
        </motion.div>
      </div>

      {/* Curved transition into the next dark section */}
      <div className="gs-hero-transition" aria-hidden="true">
        <svg
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 28 C230 85 410 90 650 63 C910 35 1120 -8 1440 72 L1440 90 L0 90 Z"
            fill="#302519"
          />
          <path
            d="M0 28 C230 85 410 90 650 63 C910 35 1120 -8 1440 72"
            fill="none"
            stroke="#b78a3e"
            strokeWidth="2"
          />
        </svg>
      </div>
    </section>
  )
}
