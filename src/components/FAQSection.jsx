
import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Plus, Minus, ArrowUpRight } from 'lucide-react'

const faqGroups = [
  {
    category: 'Selling Your Gold',
    number: '01',
    questions: [
      {
        question: 'Does GoldSuree buy old gold jewellery?',
        answer:
          'Yes. GoldSuree evaluates old, unwanted and used gold jewellery, along with other eligible gold items. Acceptance is subject to evaluation and applicable requirements.',
      },
      {
        question: 'Can I sell broken or damaged gold jewellery?',
        answer:
          'Yes. You can bring broken or damaged gold jewellery for evaluation. Its value depends on factors such as gold content, purity and weight.',
      },
      {
        question: 'Can I sell non-hallmarked gold?',
        answer:
          'Yes, you can bring non-hallmarked gold for evaluation. The gold can be tested and its purity verified as part of the assessment.',
      },
      {
        question: 'Do you buy gold coins?',
        answer:
          'Eligible gold coins can be brought in for evaluation. Acceptance and valuation depend on verification and the applicable requirements.',
      },
      {
        question: 'Do you buy jewellery with stones?',
        answer:
          'Jewellery containing stones can be assessed. The relevant gold weight and value are determined during the evaluation, taking the non-gold components into account.',
      },
    ],
  },
  {
    category: 'Purity & Valuation',
    number: '02',
    questions: [
      {
        question: 'How is gold purity checked?',
        answer:
          'Gold purity is assessed using professional testing methods. XRF testing may be used where appropriate to help evaluate the gold.',
      },
      {
        question: 'How is the value of my gold calculated?',
        answer:
          'The valuation considers the assessed purity, relevant gold weight and applicable gold rate. The resulting estimate reflects these factors and the applicable transaction calculations.',
      },
      {
        question: 'Do I have to sell my gold after valuation?',
        answer:
          'No. You can review the valuation, ask questions and decide whether you want to proceed. The decision to sell is yours.',
      },
    ],
  },
  {
    category: 'Visit & Contact',
    number: '03',
    questions: [
      {
        question: 'Where is GoldSuree located in Electronic City?',
        answer:
          'GoldSuree is located on the 1st Floor of SVS Arcade, Ananth Nagar Road, Electronic City Phase 2, Bangalore – 560100.',
      },
      {
        question: 'Do I need an appointment before visiting?',
        answer:
          'We recommend contacting GoldSuree before your visit to confirm the current business hours and any requirements for your evaluation.',
      },
      {
        question: 'Where can I find GoldSuree?',
        answer:
          'Visit us at the 1st Floor, SVS Arcade, Ananth Nagar Road, Electronic City Phase 2, Bangalore – 560100.',
      },
      {
        question: 'How can I contact GoldSuree?',
        answer:
          'Call or WhatsApp us at 8981298596 for enquiries before your visit.',
        contact: true,
      },
    ],
  },
]

export default function FAQSection() {
  const reduceMotion = useReducedMotion()
  const [openQuestion, setOpenQuestion] = useState(null)

  return (
    <section
      id="faq"
      className="scroll-mt-24 bg-[#f8f5ef] px-5 py-20 text-[#292117] sm:px-8 sm:py-28 lg:px-16"
    >
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65 }}
          className="mb-14 max-w-3xl"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-9 bg-[#c5a16b]" />
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#987544]">
              Everything you need to know
            </p>
          </div>

          <h2 className="font-editorial text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Frequently Asked
            <br />
            <span className="italic text-[#b18b52]">Questions.</span>
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-7 text-[#756a5b]">
            From gold purity and valuation to planning your visit, find answers
            to common questions about selling your gold with GoldSuree.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div className="h-fit border border-[#e3d8c6] bg-[#eee7db] p-7 sm:p-9 lg:sticky lg:top-28">
            <span className="font-editorial text-5xl text-[#c5a16b]">
              12
            </span>

            <h3 className="mt-4 font-editorial text-2xl">
              Questions, answered.
            </h3>

            <p className="mt-3 text-sm leading-7 text-[#756a5b]">
              Selling gold should feel straightforward. Understand the process,
              get your questions answered and make a decision that feels right
              for you.
            </p>

            <div className="mt-7 h-px w-full bg-[#d9cbb5]" />

            <p className="mt-6 text-xs uppercase tracking-[0.16em] text-[#8c6a3e]">
              Need more information?
            </p>

            <a
              href="https://wa.me/918981298596"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 border border-[#c5a16b] px-5 py-3 text-xs uppercase tracking-[0.12em] transition-colors duration-300 hover:bg-[#c5a16b] hover:text-[#292117]"
            >
              Contact GoldSuree
              <ArrowUpRight size={15} strokeWidth={1.5} />
            </a>
          </div>

          <div>
            {faqGroups.map((group, groupIndex) => (
              <motion.div
                key={group.number}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.5,
                  delay: reduceMotion ? 0 : groupIndex * 0.08,
                }}
                className="mb-10 last:mb-0"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="font-editorial text-sm text-[#b18b52]">
                    {group.number}
                  </span>
                  <h3 className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#8c6a3e]">
                    {group.category}
                  </h3>
                </div>

                <div className="border-t border-[#d9cbb5]">
                  {group.questions.map((item, questionIndex) => {
                    const id = `${group.number}-${questionIndex}`
                    const isOpen = openQuestion === id

                    return (
                      <div
                        key={id}
                        className="border-b border-[#d9cbb5]"
                      >
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={`faq-answer-${id}`}
                          onClick={() =>
                            setOpenQuestion(isOpen ? null : id)
                          }
                          className="group flex w-full items-center justify-between gap-5 py-5 text-left sm:py-6"
                        >
                          <span className="font-editorial text-lg leading-snug transition-colors duration-300 group-hover:text-[#987544] sm:text-xl">
                            {item.question}
                          </span>

                          <span
                            className={`flex h-8 w-8 shrink-0 items-center justify-center border transition-colors duration-300 ${
                              isOpen
                                ? 'border-[#c5a16b] bg-[#c5a16b] text-[#292117]'
                                : 'border-[#d9cbb5] text-[#987544] group-hover:border-[#c5a16b]'
                            }`}
                          >
                            {isOpen ? (
                              <Minus size={16} strokeWidth={1.5} />
                            ) : (
                              <Plus size={16} strokeWidth={1.5} />
                            )}
                          </span>
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              id={`faq-answer-${id}`}
                              initial={
                                reduceMotion
                                  ? false
                                  : { height: 0, opacity: 0 }
                              }
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={
                                reduceMotion
                                  ? { opacity: 0 }
                                  : { height: 0, opacity: 0 }
                              }
                              transition={{ duration: reduceMotion ? 0 : 0.25 }}
                              className="overflow-hidden"
                            >
                              <div className="max-w-2xl pb-6 pr-8 text-sm leading-7 text-[#756a5b]">
                                {item.answer}

                                {item.contact && (
                                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3">
                                    <a
                                      href="tel:8981298596"
                                      className="text-xs uppercase tracking-[0.12em] text-[#987544] underline decoration-[#c5a16b] underline-offset-4"
                                    >
                                      Call us
                                    </a>
                                    <a
                                      href="https://wa.me/918981298596"
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-xs uppercase tracking-[0.12em] text-[#987544] underline decoration-[#c5a16b] underline-offset-4"
                                    >
                                      WhatsApp us
                                    </a>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}