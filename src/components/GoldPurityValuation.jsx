
import { motion, useReducedMotion } from 'framer-motion'
import {
  ScanSearch,
  Scale,
  Calculator,
  ClipboardCheck,
  Wallet,
  ArrowRight,
} from 'lucide-react'
import './GoldPurityValuation.css'

const steps = [
  {
    number: '01',
    title: 'Purity Testing',
    description:
      'Your gold item is assessed to determine its purity. Appropriate testing methods may be used depending on the item.',
    Icon: ScanSearch,
  },
  {
    number: '02',
    title: 'Weight Verification',
    description:
      'The item is weighed carefully. Stones, beads, threads and other non-gold components may be considered separately.',
    Icon: Scale,
  },
  {
    number: '03',
    title: 'Valuation',
    description:
      'The valuation is worked out using the assessed gold content, verified weight and applicable gold rate, with relevant adjustments where applicable.',
    Icon: Calculator,
  },
  {
    number: '04',
    title: 'Clear Explanation',
    description:
      'Our team explains the assessment and valuation so you can understand the offer before making a decision.',
    Icon: ClipboardCheck,
  },
  {
    number: '05',
    title: 'Your Decision',
    description:
      'Review the offer and decide whether you want to proceed. You are not obligated to sell after valuation.',
    Icon: Wallet,
  },
]

export default function GoldPurityValuation() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="gold-purity-valuation"
      className="gpv-section"
    >
      <div className="gpv-container">
        <motion.div
          className="gpv-heading-block"
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
        >
          <div className="gpv-eyebrow">
            <span />
            GOLD PURITY &amp; VALUATION
            <span />
          </div>

          <h2 className="gpv-heading">
            Know what your gold
            <br />
            <em>is worth.</em>
          </h2>

          <p className="gpv-intro">
            Every item is different. We follow a clear evaluation process
            and explain how the valuation is determined, helping you make
            an informed decision with confidence.
          </p>
        </motion.div>

        <div className="gpv-process">
          <div className="gpv-process-line" aria-hidden="true" />

          {steps.map(({ number, title, description, Icon }, index) => (
            <motion.article
              className={`gpv-step ${index % 2 ? 'gpv-step-alt' : ''}`}
              key={number}
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: 30 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{
                duration: 0.6,
                delay: reduceMotion ? 0 : index * 0.07,
              }}
            >
              <div className="gpv-step-number">{number}</div>

              <div className="gpv-step-icon">
                <Icon size={24} strokeWidth={1.5} />
              </div>

              <div className="gpv-step-copy">
                <span className="gpv-step-label">
                  STEP {number}
                </span>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="gpv-note"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65 }}
        >
          <div className="gpv-note-icon">
            <ScanSearch size={25} strokeWidth={1.5} />
          </div>

          <div className="gpv-note-copy">
            <h3>Clarity at every step.</h3>
            <p>
              Non-hallmarked items can also be brought for evaluation,
              subject to suitable testing and applicable requirements.
              The testing method and final valuation depend on the item
              and assessment.
            </p>
          </div>

          <a
            href="https://wa.me/918981298596?text=Hello%20GoldSuree%2C%20I%20would%20like%20to%20know%20about%20gold%20purity%20testing%20and%20valuation."
            target="_blank"
            rel="noreferrer"
            className="gpv-contact-link"
          >
            Ask us <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
