
import { useRef } from 'react'
import { motion, useReducedMotion, useInView } from 'framer-motion'
import {
  ShieldCheck,
  Scale,
  BadgeIndianRupee,
  Handshake,
  Sparkles,
} from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: ShieldCheck,
    title: 'Purity Testing',
    description:
      'We assess your gold to understand its purity and explain the evaluation process clearly.',
  },
  {
    number: '02',
    icon: Scale,
    title: 'Accurate Weighing',
    description:
      'Your gold is weighed carefully, so you can see how its weight contributes to the valuation.',
  },
  {
    number: '03',
    icon: BadgeIndianRupee,
    title: 'Transparent Valuation',
    description:
      'We explain the value based on purity, weight and the applicable gold rate before you decide.',
  },
  {
    number: '04',
    icon: Handshake,
    title: 'Your Decision',
    description:
      'Review the offer at your own pace. You are free to decide whether you want to sell.',
  },
]

const goldGradient =
  'linear-gradient(180deg, #E8BD50 0%, #C99525 52%, #80520C 100%)'

function StepCard({ step, index, reducedMotion, opened }) {
  const Icon = step.icon

  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, y: 18 }}
      animate={opened || reducedMotion ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: reducedMotion ? 0 : 0.55,
        delay: reducedMotion ? 0 : 0.22 + index * 0.13,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative grid grid-cols-[48px_minmax(0,1fr)] gap-4 sm:grid-cols-[58px_minmax(0,1fr)] sm:gap-5"
    >
      <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[#c69a48]/70 bg-[#f8f5ef] shadow-[0_3px_12px_rgba(66,44,19,0.09)] sm:h-14 sm:w-14">
        <Icon
          size={22}
          strokeWidth={1.5}
          className="text-[#8b6325]"
          aria-hidden="true"
        />
      </div>

      <div className="min-w-0 border-b border-[#bca77f]/35 pb-6 pt-1 sm:pb-7">
        <div className="mb-1.5 flex flex-wrap items-center gap-3">
          <span
            className="text-[11px] font-semibold tracking-[0.22em]"
            style={{
              background: goldGradient,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {step.number}
          </span>
          <span className="h-px w-7 bg-[#c69a48]/60" />
          <span className="text-[10px] uppercase tracking-[0.18em] text-[#88765c]">
            Step {index + 1}
          </span>
        </div>

        <h3
          className="font-editorial text-[23px] leading-tight text-[#302519] sm:text-[27px]"
        >
          {step.title}
        </h3>

        <p className="mt-2 max-w-lg text-[13px] leading-6 text-[#746754] sm:text-sm sm:leading-7">
          {step.description}
        </p>
      </div>
    </motion.article>
  )
}

export default function GoldSellingSteps() {
  const sectionRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const opened = useInView(sectionRef, {
    once: true,
    amount: 0.18,
  })

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#eee7db] px-4 py-16 sm:px-8 sm:py-24"
    >
      {/* Subtle background detailing keeps the section connected to the site */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.32]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(139,99,37,.15) 1px, transparent 0)',
          backgroundSize: '24px 24px',
          maskImage:
            'linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)',
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Section heading */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: reducedMotion ? 0 : 0.55 }}
          className="mx-auto mb-11 max-w-2xl text-center sm:mb-14"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-9 bg-[#b58b4a]/70" />
            <Sparkles size={14} className="text-[#a77b32]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#806744]">
              The GoldSuree Process
            </span>
            <span className="h-px w-9 bg-[#b58b4a]/70" />
          </div>

          <h2 className="font-editorial text-4xl leading-[1.12] tracking-[-0.035em] text-[#302519] sm:text-5xl md:text-6xl">
            A clear process.
            <br />
            <span
              style={{
                background: goldGradient,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              A confident decision.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#756754] sm:text-base">
            Selling your gold should feel simple, transparent and entirely
            your choice. Here is what to expect at every step.
          </p>
        </motion.div>

        {/* Animated parchment */}
        <div className="relative mx-auto max-w-5xl">
          {/* Top roller */}
          <motion.div
            initial={reducedMotion ? false : { scaleX: 0.12, opacity: 0.5 }}
            animate={opened || reducedMotion ? { scaleX: 1, opacity: 1 } : {}}
            transition={{
              duration: reducedMotion ? 0 : 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-20 mx-2 h-4 origin-center rounded-full border border-[#a77c37]/70 sm:mx-4 sm:h-5"
            style={{
              background:
                'linear-gradient(180deg, #f9edcf 0%, #d5b16b 28%, #f1dba8 52%, #a87b32 100%)',
              boxShadow: '0 4px 7px rgba(62,43,19,.14)',
            }}
          >
            <span className="absolute left-2 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#80520c]/65 sm:left-3" />
            <span className="absolute right-2 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#80520c]/65 sm:right-3" />
          </motion.div>

          {/* Paper unfolds downwards */}
          <motion.div
            initial={
              reducedMotion
                ? false
                : { clipPath: 'inset(0 0 98% 0)', opacity: 0.8 }
            }
            animate={
              opened || reducedMotion
                ? { clipPath: 'inset(0 0 0% 0)', opacity: 1 }
                : {}
            }
            transition={{
              duration: reducedMotion ? 0 : 1.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative -mt-1 overflow-hidden border-x border-[#bda16e]/65"
            style={{
              background:
                'linear-gradient(110deg, #f8f5ef 0%, #f4eee2 48%, #f8f5ef 100%)',
              boxShadow: '0 15px 38px rgba(57,39,19,.08)',
            }}
          >
            {/* Fine inner border */}
            <div className="pointer-events-none absolute inset-2 border border-[#c5a56c]/40 sm:inset-3" />

            {/* Restrained corner ornaments */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-3 h-8 w-8 border-l border-t border-[#bd9149]/60 sm:left-5 sm:top-5 sm:h-10 sm:w-10"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-3 top-3 h-8 w-8 border-r border-t border-[#bd9149]/60 sm:right-5 sm:top-5 sm:h-10 sm:w-10"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-3 left-3 h-8 w-8 border-b border-l border-[#bd9149]/45 sm:bottom-5 sm:left-5 sm:h-10 sm:w-10"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-3 right-3 h-8 w-8 border-b border-r border-[#bd9149]/45 sm:bottom-5 sm:right-5 sm:h-10 sm:w-10"
            />

            <div className="relative grid gap-8 px-6 py-10 sm:gap-10 sm:px-12 sm:py-14 md:grid-cols-[0.75fr_1.25fr] md:gap-12 md:px-14 md:py-16 lg:px-20">
              {/* Left editorial panel */}
              <div className="flex flex-col justify-between gap-8 md:sticky md:top-24 md:self-start">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.23em] text-[#8c6b39]">
                    Your gold. Your choice.
                  </p>

                  <h3 className="mt-4 font-editorial text-3xl leading-tight tracking-[-0.025em] text-[#302519] sm:text-4xl">
                    Every step,
                    <br />
                    <span
                      style={{
                        background: goldGradient,
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                      }}
                    >
                      explained.
                    </span>
                  </h3>

                  <p className="mt-4 max-w-xs text-sm leading-7 text-[#756754]">
                    No pressure. No confusing process. Just a clear
                    understanding of your gold's value before you make a
                    decision.
                  </p>
                </div>

                <div className="hidden border-t border-[#c8b38d]/60 pt-5 md:block">
                  <span className="block font-editorial text-lg italic text-[#806744]">
                    Clarity builds confidence.
                  </span>
                  <span className="mt-2 block text-[10px] uppercase tracking-[0.18em] text-[#95836b]">
                    The GoldSuree promise
                  </span>
                </div>
              </div>

              {/* Process timeline */}
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute bottom-10 left-[23px] top-6 w-px bg-gradient-to-b from-[#c49a4a]/20 via-[#b38b43]/70 to-[#c49a4a]/20 sm:left-[27px]"
                />

                <div className="relative flex flex-col gap-6 sm:gap-7">
                  {steps.map((step, index) => (
                    <StepCard
                      key={step.number}
                      step={step}
                      index={index}
                      reducedMotion={reducedMotion}
                      opened={opened}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom roller */}
          <motion.div
            initial={reducedMotion ? false : { scaleX: 0.12, opacity: 0.5 }}
            animate={opened || reducedMotion ? { scaleX: 1, opacity: 1 } : {}}
            transition={{
              duration: reducedMotion ? 0 : 0.75,
              delay: reducedMotion ? 0 : 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-20 mx-2 -mt-1 h-4 origin-center rounded-full border border-[#a77c37]/70 sm:mx-4 sm:h-5"
            style={{
              background:
                'linear-gradient(180deg, #a87b32 0%, #f1dba8 48%, #d5b16b 72%, #f9edcf 100%)',
              boxShadow: '0 5px 9px rgba(62,43,19,.12)',
            }}
          >
            <span className="absolute left-2 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#80520c]/65 sm:left-3" />
            <span className="absolute right-2 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#80520c]/65 sm:right-3" />
          </motion.div>
        </div>

        <motion.p
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={opened || reducedMotion ? { opacity: 1 } : {}}
          transition={{ duration: reducedMotion ? 0 : 0.6, delay: 0.5 }}
          className="mt-8 text-center text-xs tracking-wide text-[#806f58]"
        >
          Your gold, evaluated with care. Your decision, always respected.
        </motion.p>
      </div>
    </section>
  )
}
