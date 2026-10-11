
import { motion, useReducedMotion } from 'framer-motion'
import {
  ShieldCheck,
  Scale,
  BadgeIndianRupee,
  Handshake,
} from 'lucide-react'

const benefits = [
  {
    number: '01',
    icon: ShieldCheck,
    title: 'Purity Comes First',
    description:
      'Gold purity is assessed before valuation so you can understand how it affects the estimate.',
  },
  {
    number: '02',
    icon: Scale,
    title: 'Accurate Weighing',
    description:
      'Know the weight used for your valuation and ask questions at every step.',
  },
  {
    number: '03',
    icon: BadgeIndianRupee,
    title: 'Transparent Valuation',
    description:
      'Understand how weight, purity and the applicable gold rate contribute to your estimated value.',
  },
  {
    number: '04',
    icon: Handshake,
    title: 'Your Decision Matters',
    description:
      'Review the valuation and its details before deciding whether to proceed with the sale.',
  },
]

export default function WhyGoldSuree() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="why-goldsuree"
      className="scroll-mt-24 bg-[#292117] px-5 py-20 text-[#f8f5ef] sm:px-8 sm:py-28 lg:px-16"
    >
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-9 bg-[#c5a16b]" />
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#c5a16b]">
              A better way to value your gold
            </p>
            <span className="h-px w-9 bg-[#c5a16b]" />
          </div>

          <h2 className="font-editorial text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Selling Gold Should Feel
            <br />
            <span className="italic text-[#c5a16b]">
              Clear, Not Complicated.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#c4b9a7]">
            Your gold has value. Our goal is to make the valuation process
            easier to understand, from purity testing to the final decision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 border-l border-t border-[#594a36] sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon

            return (
              <motion.article
                key={benefit.number}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.55,
                  delay: reduceMotion ? 0 : index * 0.1,
                }}
                className="group border-b border-r border-[#594a36] p-6 transition-colors duration-300 hover:bg-[#342a1e] sm:p-8 lg:p-7 xl:p-9"
              >
                <div className="mb-12 flex items-center justify-between">
                  <span className="font-editorial text-2xl text-[#c5a16b]">
                    {benefit.number}
                  </span>

                  <Icon
                    size={25}
                    strokeWidth={1.3}
                    className="text-[#c5a16b] transition-transform duration-300 group-hover:-translate-y-1"
                  />
                </div>

                <h3 className="font-editorial text-2xl">
                  {benefit.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#c4b9a7]">
                  {benefit.description}
                </p>

                <div className="mt-8 h-px w-9 bg-[#c5a16b] transition-all duration-500 group-hover:w-full" />
              </motion.article>
            )
          })}
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-[#594a36] pt-8 sm:flex-row sm:items-center"
        >
          <p className="max-w-xl text-sm leading-7 text-[#c4b9a7]">
            Have old jewellery you are thinking of selling? Start by
            understanding its estimated value.
          </p>

          <a
            href="#gold-calculator"
            className="inline-flex items-center gap-3 border border-[#c5a16b] px-6 py-4 text-xs uppercase tracking-[0.16em] text-[#e4c99e] transition-colors hover:bg-[#c5a16b] hover:text-[#292117]"
          >
            Estimate Your Gold Value
            <span aria-hidden="true">↗</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
