
import { motion, useReducedMotion } from 'framer-motion'
import { ShieldCheck, Scale, Calculator, Wallet } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Purity Testing',
    description:
      'Understand your gold purity through a transparent testing process before valuation.',
    icon: ShieldCheck,
  },
  {
    number: '02',
    title: 'Accurate Weighing',
    description:
      'Weigh your gold to establish the weight used in the valuation estimate.',
    icon: Scale,
  },
  {
    number: '03',
    title: 'Transparent Valuation',
    description:
      'Estimate your gold value using its weight, purity and the applicable gold rate.',
    icon: Calculator,
  },
  {
    number: '04',
    title: 'Your Decision',
    description:
      'Review the valuation and decide whether you want to proceed with the sale.',
    icon: Wallet,
  },
]

export default function GoldSellingSteps() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 bg-[#f8f5ef] px-5 py-20 sm:px-8 sm:py-28 lg:px-16"
    >
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-14 max-w-2xl"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-9 bg-[#b38a4a]" />
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#967442]">
              A clear and simple process
            </p>
          </div>

          <h2 className="font-editorial text-4xl leading-tight tracking-tight text-[#292117] sm:text-5xl lg:text-6xl">
            Your Gold, Valued
            <br />
            <span className="italic text-[#a17b43]">
              with Transparency.
            </span>
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-7 text-[#786e60]">
            From purity testing to valuation, understand each step
            before making your decision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon

            return (
              <motion.article
                key={step.number}
                initial={reduceMotion ? false : { opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: reduceMotion ? 0 : index * 0.12,
                }}
                className="group border-t border-[#d9cbb6] py-8 sm:px-5 lg:px-7"
              >
                <div className="mb-9 flex items-center justify-between">
                  <span className="font-editorial text-2xl text-[#b18c53]">
                    {step.number}
                  </span>

                  <Icon
                    size={24}
                    strokeWidth={1.2}
                    className="text-[#967442] transition-transform duration-300 group-hover:-translate-y-1"
                  />
                </div>

                <h3 className="font-editorial text-2xl text-[#30261a]">
                  {step.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#786e60]">
                  {step.description}
                </p>

                <div className="mt-7 h-px w-10 bg-[#b18c53] transition-all duration-500 group-hover:w-full" />
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
