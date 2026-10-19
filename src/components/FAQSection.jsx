
import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  Plus,
  Minus,
  ArrowUpRight,
  MessageCircle,
  MapPin,
  Sparkles,
} from 'lucide-react'

const WHATSAPP_URL = 'https://wa.me/918981298596'
const PHONE_NUMBER = '8981298596'

const faqGroups = [
  {
    number: '01',
    title: 'Selling your gold',
    subtitle: 'Everything to know before you sell.',
    questions: [
      {
        q: 'Does GoldSuree buy old gold jewellery?',
        a: 'Yes. GoldSuree evaluates old, used and unwanted gold jewellery. Other eligible gold items may also be assessed, subject to verification and applicable requirements.',
      },
      {
        q: 'Can I sell broken or damaged gold jewellery?',
        a: 'Yes. Broken, damaged or unused gold jewellery can be brought in for evaluation. Its value depends on the gold content, purity and relevant weight.',
      },
      {
        q: 'Can I sell non-hallmarked gold?',
        a: 'Yes. Non-hallmarked jewellery can be assessed through purity testing. The final evaluation depends on the results of the assessment.',
      },
      {
        q: 'Do you buy gold coins?',
        a: 'Eligible gold coins can be brought in for assessment. Acceptance and valuation depend on verification and applicable requirements.',
      },
      {
        q: 'Do you buy jewellery with stones?',
        a: 'Jewellery with stones can be assessed. The valuation considers the relevant gold content and weight, while non-gold components may be treated separately.',
      },
    ],
  },
  {
    number: '02',
    title: 'Purity & valuation',
    subtitle: 'Know how your gold is assessed.',
    questions: [
      {
        q: 'How is gold purity checked?',
        a: 'Gold purity is assessed using appropriate testing methods. XRF testing may be used where suitable as part of the evaluation.',
      },
      {
        q: 'How is the value of my gold calculated?',
        a: 'The assessment considers gold purity, relevant gold weight and the applicable gold rate. The valuation is explained so you can understand the basis of the estimate.',
      },
      {
        q: 'Do I have to sell after getting a valuation?',
        a: 'No. You can review the valuation, ask questions and decide whether you want to proceed. The decision to sell is yours.',
      },
    ],
  },
  {
    number: '03',
    title: 'Visit & contact',
    subtitle: 'A few details before you visit.',
    questions: [
      {
        q: 'Where is GoldSuree located?',
        a: 'Visit us at 1st Floor, SVS Arcade, Ananth Nagar Road, Electronic City Phase 2, Bangalore – 560100.',
      },
      {
        q: 'Do I need an appointment?',
        a: 'We recommend contacting us before visiting to confirm current business hours and any requirements for your gold assessment.',
      },
      {
        q: 'What should I bring when visiting?',
        a: 'Bring the gold items you would like assessed. If you have questions about a particular item or its eligibility, contact us before your visit.',
      },
      {
        q: 'How can I contact GoldSuree?',
        a: 'Call us or send a WhatsApp message to enquire about old gold evaluation and plan your visit.',
      },
    ],
  },
]

function FAQItem({ item, index, isOpen, onToggle, reducedMotion }) {
  const answerId = `faq-answer-${index}`
  const buttonId = `faq-question-${index}`

  return (
    <article
      className={`relative border-b transition-colors duration-200 ${
        isOpen
          ? 'border-[#c99525]/50 bg-[#fffdf8]'
          : 'border-[#ddd5c8] bg-transparent'
      }`}
    >
      {isOpen && (
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-[#E8BD50] via-[#C99525] to-[#80520C]"
        />
      )}

      <button
        id={buttonId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={answerId}
        onClick={onToggle}
        className="group flex min-h-[68px] w-full items-center gap-3 px-3 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#9b701e] sm:min-h-[76px] sm:gap-5 sm:px-6 sm:py-5"
      >
        <span
          aria-hidden="true"
          className={`shrink-0 font-mono text-[10px] tabular-nums sm:text-[11px] ${
            isOpen ? 'text-[#946819]' : 'text-[#8b8173]'
          }`}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <span
          className={`min-w-0 flex-1 break-words text-[13px] font-semibold leading-6 sm:text-[15px] ${
            isOpen ? 'text-[#30271e]' : 'text-[#3d352c]'
          }`}
        >
          {item.q}
        </span>

        <span
          aria-hidden="true"
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 sm:h-9 sm:w-9 ${
            isOpen
              ? 'border-[#c99525] bg-[#c99525] text-white'
              : 'border-[#d8cebe] bg-[#faf7f0] text-[#554735] group-hover:border-[#b58b4a] group-hover:bg-[#f3ead8]'
          }`}
        >
          {isOpen ? <Minus size={15} /> : <Plus size={15} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={answerId}
            key="answer"
            role="region"
            aria-labelledby={buttonId}
            initial={reducedMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={
              reducedMotion
                ? undefined
                : { height: 0, opacity: 0 }
            }
            transition={{ duration: reducedMotion ? 0 : 0.22 }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl break-words pb-5 pl-9 pr-4 text-[12px] leading-6 text-[#6a6053] sm:pb-6 sm:pl-[4.6rem] sm:pr-8 sm:text-sm sm:leading-7">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  )
}

export default function FAQSection() {
  const reducedMotion = useReducedMotion()
  const [openItem, setOpenItem] = useState('0-0')

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-clip bg-[#f4f0e8] text-[#30271e]"
    >
      <div className="h-[3px] w-full bg-gradient-to-r from-[#80520C] via-[#E8BD50] to-[#C99525]" />

      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:px-12 lg:py-24">
        {/* Heading */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="mb-9 grid min-w-0 gap-5 border-b border-[#d8cdbb] pb-7 sm:mb-12 sm:gap-7 sm:pb-9 md:grid-cols-[1.2fr_0.8fr] md:items-end lg:mb-16 lg:pb-12"
        >
          <div className="min-w-0">
            <div className="mb-4 flex items-center gap-2.5 sm:mb-5">
              <Sparkles size={15} className="shrink-0 text-[#a77820]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#766650] sm:tracking-[0.25em]">
                Here to help
              </span>
            </div>

            <h2
              id="faq-title"
              className="font-editorial text-[2.35rem] font-normal leading-[1.12] tracking-[-0.035em] sm:text-5xl lg:text-[4.25rem]"
            >
              Frequently Asked
              <br />
              <span className="bg-gradient-to-r from-[#E8BD50] via-[#C99525] to-[#80520C] bg-clip-text italic text-transparent">
                Questions
              </span>
            </h2>
          </div>

          <div className="min-w-0 md:justify-self-end">
            <p className="max-w-md text-sm leading-7 text-[#6e6253] sm:text-base sm:leading-8">
              Have questions about selling your old gold? Find clear answers
              about our assessment process, purity testing and how to visit us.
            </p>
            <p className="mt-3 text-xs font-medium tracking-wide text-[#8b7655] sm:mt-4">
              Browse the topics below to learn more.
            </p>
          </div>
        </motion.div>

        {/* Mobile: topics first, then all questions. Desktop: two columns. */}
        <div className="grid min-w-0 grid-cols-1 items-start gap-8 sm:gap-10 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-12 xl:gap-16">
          <aside className="min-w-0 lg:pt-1">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8a7659] sm:mb-4">
              Explore by topic
            </p>

            <nav
              aria-label="FAQ topics"
              className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-1"
            >
              {faqGroups.map((group, i) => (
                <a
                  key={group.title}
                  href={`#faq-group-${i}`}
                  className="flex min-h-12 min-w-0 items-center justify-between gap-3 border border-[#ded4c4] bg-[#faf7f0] px-4 py-3 text-sm font-medium text-[#43382b] transition-colors hover:border-[#b58b4a] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#9b701e]"
                >
                  <span className="min-w-0 break-words">{group.title}</span>
                  <ArrowUpRight
                    size={15}
                    className="shrink-0 text-[#9a752e]"
                  />
                </a>
              ))}
            </nav>

            <div className="mt-5 bg-[#292219] p-5 text-[#f7f1e7] sm:mt-7 sm:p-6">
              <p className="font-editorial text-2xl leading-tight sm:text-[1.75rem]">
                Need a little more clarity?
              </p>
              <p className="mt-3 text-sm leading-6 text-[#d0c3b0]">
                Our team can help you with questions before your visit.
              </p>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 bg-gradient-to-r from-[#E8BD50] via-[#C99525] to-[#80520C] px-3 py-2 text-center text-xs font-semibold text-[#241d15] transition-[filter] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E8BD50] sm:px-4 sm:text-sm"
              >
                <MessageCircle size={16} className="shrink-0" />
                Chat on WhatsApp
                <ArrowUpRight size={15} className="shrink-0" />
              </a>

              <a
                href={`tel:${PHONE_NUMBER}`}
                className="mt-3 flex min-h-11 items-center justify-center gap-2 border border-white/20 px-3 py-2 text-sm text-[#f7f1e7] transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E8BD50]"
              >
                Call {PHONE_NUMBER}
              </a>
            </div>

            <div className="mt-5 flex min-w-0 gap-3 text-sm leading-6 text-[#716454] sm:mt-6">
              <MapPin
                size={17}
                className="mt-1 shrink-0 text-[#9a752e]"
              />
              <address className="min-w-0 break-words not-italic">
                1st Floor, SVS Arcade,
                <br />
                Ananth Nagar Road,
                <br />
                Electronic City Phase 2,
                <br />
                Bangalore – 560100
              </address>
            </div>
          </aside>

          <div className="min-w-0">
            {faqGroups.map((group, groupIndex) => {
              const firstQuestionIndex = faqGroups
                .slice(0, groupIndex)
                .reduce((total, currentGroup) => total + currentGroup.questions.length, 0)

              return (
                <motion.div
                  id={`faq-group-${groupIndex}`}
                  key={group.title}
                  initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ duration: 0.35 }}
                  className="mb-9 min-w-0 scroll-mt-24 last:mb-0 sm:mb-12"
                >
                  <div className="mb-3 flex min-w-0 items-end justify-between gap-3 border-b-2 border-[#b58b4a] pb-3 sm:pb-4">
                    <div className="min-w-0">
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#9a752e] sm:tracking-[0.18em]">
                        Section {group.number}
                      </p>
                      <h3 className="break-words font-editorial text-2xl font-normal leading-tight text-[#30271e] sm:text-[1.8rem]">
                        {group.title}
                      </h3>
                      <p className="mt-1 text-xs leading-5 text-[#796d5e] sm:text-sm">
                        {group.subtitle}
                      </p>
                    </div>

                    <span className="shrink-0 pb-1 text-[10px] tabular-nums text-[#897b68] sm:text-xs">
                      {String(group.questions.length).padStart(2, '0')} topics
                    </span>
                  </div>

                  <div className="border-t border-[#ddd5c8]">
                    {group.questions.map((item, itemIndex) => {
                      const itemId = `${groupIndex}-${itemIndex}`
                      const globalIndex = firstQuestionIndex + itemIndex

                      return (
                        <FAQItem
                          key={item.q}
                          item={item}
                          index={globalIndex}
                          isOpen={openItem === itemId}
                          reducedMotion={reducedMotion}
                          onToggle={() =>
                            setOpenItem(openItem === itemId ? null : itemId)
                          }
                        />
                      )
                    })}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
