
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, ShieldCheck } from 'lucide-react'
import './HeroSection.css'
import GoldJewelleryScene from './GoldJewelleryScene'

export default function HeroSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="home"
      className="gold-hero relative overflow-hidden bg-[#f8f5ef] px-5 pb-16 pt-12 sm:px-8 sm:pb-24 sm:pt-16 lg:px-16 lg:pb-28 lg:pt-20"
    >
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full border border-[#e5d8c4] sm:h-96 sm:w-96"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 top-24 h-56 w-56 rounded-full border border-[#e5d8c4] sm:h-72 sm:w-72"
      />

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* Left content */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-10"
        >
          <div className="mb-7 flex items-center gap-3">
            <span className="h-px w-10 bg-[#a17b43]" />
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#967442] sm:text-xs">
              A thoughtful way to sell old gold
            </p>
          </div>

          <h1 className="max-w-3xl font-editorial text-5xl leading-[1.08] tracking-[-0.04em] text-[#292117] sm:text-6xl lg:text-7xl xl:text-[88px]">
            Your Gold.
            <br />
            <span className="italic text-[#a17b43]">
              Your True Worth.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-sm leading-7 text-[#786e60] sm:text-base sm:leading-8">
            Ready to part with old jewellery? Understand how purity,
            weight and the applicable gold rate shape its estimated value
            before you make your decision.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#gold-calculator"
              className="group inline-flex min-h-14 items-center justify-center gap-2 border border-[#a8874f] bg-[#e6d2ad] px-3 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#302519] shadow-sm transition-all duration-300 hover:border-[#84602e] hover:bg-[#84602e] hover:text-white hover:shadow-md sm:px-5 sm:text-[10px] sm:tracking-[0.16em]"
            >
              Calculate Gold Value
              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>

            <a
              href="#how-it-works"
              className="inline-flex min-h-14 items-center justify-center gap-3 border border-[#d8c8af] px-6 py-4 text-xs uppercase tracking-[0.15em] text-[#493b2a] transition-colors duration-300 hover:border-[#967442] hover:text-[#967442]"
            >
              How It Works
              <ArrowDown size={15} />
            </a>
          </div>

          <div className="mt-10 flex items-start gap-3 border-t border-[#e2d7c7] pt-6">
            <ShieldCheck
              size={20}
              strokeWidth={1.4}
              className="mt-0.5 shrink-0 text-[#967442]"
            />
            <p className="max-w-md text-xs leading-6 text-[#786e60]">
              Know the valuation process. Review the details. Make your
              decision with clarity.
            </p>
          </div>
        </motion.div>

        {/* Right image */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: reduceMotion ? 0 : 0.15 }}
          className="relative mx-auto w-full max-w-[620px] lg:ml-auto"
        >
          <div className="gold-hero-image-frame relative aspect-[4/5] overflow-hidden bg-[#e4d7c3] sm:aspect-[5/4] lg:aspect-[4/5]">
            <div className="gold-hero-visual">
                <GoldJewelleryScene />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#211a12]/60 via-transparent to-[#211a12]/5" />

            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-9">
              <p className="text-[10px] uppercase tracking-[0.23em] text-[#f1d9b2]">
                Understand the value
              </p>

              <p className="mt-3 max-w-sm font-editorial text-3xl leading-tight text-white sm:text-4xl">
                Every piece has a story.
              </p>

              <p className="mt-3 max-w-sm text-xs leading-6 text-white/80">
                Start with weight, purity and a gold rate you can verify.
              </p>
            </div>
          </div>

          {/* Floating detail card */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: reduceMotion ? 0 : 0.6 }}
            className="absolute -bottom-5 left-3 border border-[#e1d4c0] bg-[#fbf9f5] p-4 shadow-[0_12px_35px_rgba(41,33,23,0.10)] sm:-left-7 sm:bottom-10 sm:p-5"
          >
            <p className="text-[9px] uppercase tracking-[0.2em] text-[#967442]">
              The process
            </p>
            <p className="mt-2 font-editorial text-xl text-[#30261a]">
              Test. Weigh. Value.
            </p>
          </motion.div>
        </motion.div>
      </div>

      <div className="mx-auto mt-20 flex max-w-[1400px] items-center justify-between border-t border-[#e2d7c7] pt-5 text-[9px] uppercase tracking-[0.18em] text-[#968875] sm:mt-24">
        <span>Old gold valuation</span>
        <span>Clarity at every step</span>
      </div>
    </section>
  )
}
