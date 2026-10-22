import { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  Gem,
  MapPin,
  Phone,
  Scale,
  ShieldCheck,
  Sparkles,
  Wallet,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './SellYourGold.css'

const PHONE_NUMBER = '8981298596'
const PAGE_PATH = '/sell-old-gold-electronic-city'
const PAGE_TITLE = 'Sell Old Gold in Electronic City, Bangalore | GoldSuree'
const PAGE_DESCRIPTION =
  'Sell old gold in Electronic City, Bangalore. GoldSuree assesses eligible gold jewellery, verifies its weight and explains the valuation so you can make an informed decision.'

const WHATSAPP_URL =
  'https://wa.me/91' + PHONE_NUMBER + '?text=' +
  encodeURIComponent(
    'Hello GoldSuree, I would like to enquire about selling my old gold in Electronic City.'
  )

const goldItems = [
  {
    number: '01',
    title: 'Gold chains',
    description: 'Old chains and everyday gold jewellery.',
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=85',
  },
  {
    number: '02',
    title: 'Bangles & bracelets',
    description: 'Traditional bangles and gold bracelets.',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=85',
  },
  {
    number: '03',
    title: 'Rings & earrings',
    description: 'Gold rings, studs and other eligible pieces.',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85',
  },
  {
    number: '04',
    title: 'Broken or unwanted gold',
    description: 'Damaged, mismatched or unused jewellery.',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85',
  },
]

const processSteps = [
  {
    number: '01',
    icon: ShieldCheck,
    title: 'Purity assessment',
    description: 'Your gold is assessed to understand its purity. The testing method can depend on the item and assessment required.',
  },
  {
    number: '02',
    icon: Scale,
    title: 'Weight verification',
    description: 'The relevant gold weight is checked. Stones and non-gold components may be excluded from the gold valuation.',
  },
  {
    number: '03',
    icon: Gem,
    title: 'Valuation explained',
    description: 'Understand how purity, eligible gold weight and the applicable gold rate contribute to the valuation.',
  },
  {
    number: '04',
    icon: Wallet,
    title: 'You decide',
    description: 'Review the valuation, ask questions and decide whether you want to proceed with the sale.',
  },
]

const faqs = [
  {
    question: 'Does GoldSuree buy old gold jewellery?',
    answer: 'GoldSuree evaluates old, used and unwanted gold jewellery. Acceptance of individual items is subject to verification and applicable requirements.',
  },
  {
    question: 'Can I sell broken or damaged gold?',
    answer: 'Broken, damaged or mismatched gold jewellery can be brought for assessment. Whether an item is eligible will be confirmed after evaluation.',
  },
  {
    question: 'Can I sell non-hallmarked gold?',
    answer: 'You can enquire about non-hallmarked gold. The item must be assessed to determine its purity and eligibility.',
  },
  {
    question: 'How is the value of my gold calculated?',
    answer: 'The valuation generally considers assessed purity, eligible gold weight and the applicable gold rate. Stones and non-gold parts may not be included in the gold weight.',
  },
  {
    question: 'Do I have to sell after getting a valuation?',
    answer: 'No. You can review the valuation, ask questions and decide whether you wish to proceed.',
  },
  {
    question: 'Do I need an appointment?',
    answer: 'Contact GoldSuree before visiting to confirm current availability and whether an appointment or specific documents are needed.',
  },
]

const nearbyAreas = [
  'Electronic City Phase 1',
  'Electronic City Phase 2',
  'Ananth Nagar',
  'Doddathoguru',
  'Neeladri Road',
  'Bommasandra',
  'Hulimangala',
]

export default function SellYourGold() {
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    document.title = PAGE_TITLE
    const pageUrl = `${window.location.origin}${PAGE_PATH}`

    const setMeta = (selector, attribute, value) => {
      let element = document.head.querySelector(selector)
      if (!element) {
        element = document.createElement('meta')
        const [key, keyValue] = selector.match(/\[(name|property)="([^"]+)"\]/)?.slice(1) ?? []
        if (key && keyValue) element.setAttribute(key, keyValue)
        document.head.appendChild(element)
      }
      element.setAttribute(attribute, value)
    }

    setMeta('meta[name="description"]', 'content', PAGE_DESCRIPTION)
    setMeta('meta[property="og:title"]', 'content', PAGE_TITLE)
    setMeta('meta[property="og:description"]', 'content', PAGE_DESCRIPTION)
    setMeta('meta[property="og:type"]', 'content', 'website')
    setMeta('meta[property="og:url"]', 'content', pageUrl)
    setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image')
    setMeta('meta[name="twitter:title"]', 'content', PAGE_TITLE)
    setMeta('meta[name="twitter:description"]', 'content', PAGE_DESCRIPTION)

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', pageUrl)

    const schemaId = 'sell-gold-page-schema'
    let schema = document.getElementById(schemaId)
    if (!schema) {
      schema = document.createElement('script')
      schema.id = schemaId
      schema.type = 'application/ld+json'
      document.head.appendChild(schema)
    }
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      url: pageUrl,
      about: {
        '@type': 'LocalBusiness',
        name: 'GoldSuree',
        telephone: '+91' + PHONE_NUMBER,
        address: {
          '@type': 'PostalAddress',
          streetAddress: '1st Floor, SVS Arcade, Ananth Nagar Road, Electronic City Phase 2',
          addressLocality: 'Bengaluru',
          postalCode: '560100',
          addressCountry: 'IN',
        },
      },
    })

    return () => {
      // Keep global page metadata intact when navigating away; the next route can update it.
    }
  }, [])

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.16 },
    transition: {
      duration: reduceMotion ? 0 : 0.65,
      delay: reduceMotion ? 0 : delay,
      ease: [0.22, 1, 0.36, 1],
    },
  })

  return (
    <>
      <Navbar />
      <main className="sell-gold-page">
        <section className="sell-gold-hero">
          <div className="sell-gold-hero__texture" aria-hidden="true" />
          <div className="sell-gold-container sell-gold-hero__layout">
            <div className="sell-gold-hero__copy">
              <motion.div className="sell-gold-eyebrow" {...reveal()}>
                <span className="sell-gold-eyebrow__line" /> YOUR GOLD, YOUR CHOICE
              </motion.div>
              <motion.h1 {...reveal(0.08)}>
                Ready to sell<br />your <em>old gold?</em>
              </motion.h1>
              <motion.p className="sell-gold-hero__description" {...reveal(0.15)}>
                Bring your old, broken or unwanted gold jewellery to our Electronic City showroom. We’ll assess eligible items, verify the gold weight and explain the valuation before you decide.
              </motion.p>
              <motion.div className="sell-gold-hero__actions" {...reveal(0.22)}>
                <a className="sell-gold-button sell-gold-button--gold" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                  Enquire on WhatsApp <ArrowUpRight size={17} />
                </a>
                <a className="sell-gold-button sell-gold-button--outline" href="#visit-us">
                  View location <MapPin size={16} />
                </a>
              </motion.div>
              <motion.div className="sell-gold-hero__note" {...reveal(0.28)}>
                <span className="sell-gold-hero__note-icon"><ShieldCheck size={17} /></span>
                <span>
                  <strong>Your decision always comes first.</strong>
                  <small>Ask questions. Understand the process. Decide at your pace.</small>
                </span>
              </motion.div>
            </div>
            <motion.div
              className="sell-gold-hero__visual"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.9, ease: 'easeOut' }}
            >
              <div className="sell-gold-hero__image-wrap">
                <img src={goldItems[0].image.replace('w=900', 'w=1400')} alt="Gold jewellery arranged in a refined display" fetchPriority="high" />
                <div className="sell-gold-hero__image-shade" />
                <div className="sell-gold-hero__image-caption">
                  <span>THE GOLDSUREE PROCESS</span>
                  <p>A clear assessment. An informed choice.</p>
                </div>
              </div>
              <div className="sell-gold-hero__seal" aria-label="Transparent valuation">
                <Sparkles size={20} strokeWidth={1.4} />
                <span>CLEAR VALUATION</span>
                <span className="sell-gold-hero__seal-rule" />
                <span>STEP BY STEP</span>
              </div>
              <span className="sell-gold-hero__vertical-label">OLD GOLD ASSESSMENT</span>
            </motion.div>
          </div>
          <a className="sell-gold-hero__scroll" href="#what-we-buy">DISCOVER MORE <ArrowDown size={14} /></a>
        </section>

        <section className="sell-gold-trust-strip" aria-label="Our approach">
          <div className="sell-gold-container sell-gold-trust-strip__inner">
            <span><BadgeCheck size={17} /> Purity assessment</span>
            <span><Scale size={17} /> Weight verification</span>
            <span><ShieldCheck size={17} /> Transparent explanation</span>
            <span><Check size={17} /> Your choice, always</span>
          </div>
        </section>

        <section className="sell-gold-section sell-gold-items" id="what-we-buy">
          <div className="sell-gold-container">
            <motion.div className="sell-gold-section-heading" {...reveal()}>
              <span className="sell-gold-kicker">WHAT CAN YOU BRING?</span>
              <h2>Old gold jewellery?<br /><em>Let’s assess it.</em></h2>
              <p>Bring jewellery you no longer wear to GoldSuree for an assessment. We’ll check the item and explain whether it can be accepted.</p>
            </motion.div>
            <div className="sell-gold-items__grid">
              {goldItems.map((item, index) => (
                <motion.article className="sell-gold-item" key={item.number} {...reveal(index * 0.07)}>
                  <div className="sell-gold-item__image">
                    <img src={item.image} alt={item.title} loading="lazy" />
                    <span className="sell-gold-item__number">{item.number}</span>
                    <span className="sell-gold-item__arrow" aria-hidden="true"><ArrowUpRight size={19} /></span>
                  </div>
                  <div className="sell-gold-item__content"><h3>{item.title}</h3><p>{item.description}</p></div>
                </motion.article>
              ))}
            </div>
            <motion.p className="sell-gold-items__footnote" {...reveal()}>
              Have gold coins or an item other than jewellery? Contact us before visiting to confirm whether it is eligible for assessment.
            </motion.p>
          </div>
        </section>

        <section className="sell-gold-valuation">
          <div className="sell-gold-container sell-gold-valuation__layout">
            <motion.div className="sell-gold-valuation__visual" {...reveal()}>
              <div className="sell-gold-valuation__image">
                <img src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1100&q=85" alt="Close-up details of gold jewellery" loading="lazy" />
              </div>
              <div className="sell-gold-valuation__stamp"><span>THE VALUE</span><span>IS IN</span><span>THE DETAILS</span></div>
            </motion.div>
            <motion.div className="sell-gold-valuation__copy" {...reveal(0.08)}>
              <span className="sell-gold-kicker">UNDERSTAND YOUR VALUATION</span>
              <h2>Know what<br />shapes the <em>value.</em></h2>
              <p>The offer depends on the gold itself and the assessment. Ask our team to explain how the purity, eligible weight and applicable rate affect the valuation.</p>
              <div className="sell-gold-valuation__factors">
                <div><span className="sell-gold-valuation__factor-icon"><Gem size={19} /></span><span><strong>Purity</strong><small>The assessed gold purity.</small></span></div>
                <div><span className="sell-gold-valuation__factor-icon"><Scale size={19} /></span><span><strong>Eligible gold weight</strong><small>Non-gold parts and stones may be excluded.</small></span></div>
                <div><span className="sell-gold-valuation__factor-icon"><Wallet size={19} /></span><span><strong>Applicable gold rate</strong><small>The rate used for the valuation.</small></span></div>
              </div>
              <p className="sell-gold-valuation__disclaimer">The final valuation depends on the item assessment and applicable transaction terms. Ask our team to explain the calculation before making a decision.</p>
              <a className="sell-gold-text-link" href="#sell-gold-process">Explore the process <ArrowRight size={17} /></a>
            </motion.div>
          </div>
        </section>

        <section className="sell-gold-process" id="sell-gold-process">
          <div className="sell-gold-container">
            <motion.div className="sell-gold-section-heading sell-gold-section-heading--center" {...reveal()}>
              <span className="sell-gold-kicker">WHAT TO EXPECT</span>
              <h2>From assessment<br /><em>to your decision.</em></h2>
              <p>We explain each step before you decide whether to sell.</p>
            </motion.div>
            <div className="sell-gold-process__grid">
              {processSteps.map((step, index) => {
                const Icon = step.icon
                return (
                  <motion.article className="sell-gold-process-card" key={step.number} {...reveal(index * 0.07)}>
                    <div className="sell-gold-process-card__top"><span>{step.number}</span><Icon size={22} strokeWidth={1.5} /></div>
                    <h3>{step.title}</h3><p>{step.description}</p>
                  </motion.article>
                )
              })}
            </div>
            <motion.div className="sell-gold-process__note" {...reveal()}>
              <CircleHelp size={20} />
              <p><strong>Not sure about your jewellery?</strong> Ask us about hallmarked or non-hallmarked items and the testing method suitable for your gold.</p>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="Ask GoldSuree on WhatsApp"><ArrowUpRight size={19} /></a>
            </motion.div>
          </div>
        </section>

        <section className="sell-gold-visit" id="visit-us">
          <div className="sell-gold-container sell-gold-visit__layout">
            <motion.div className="sell-gold-visit__copy" {...reveal()}>
              <span className="sell-gold-kicker">VISIT GOLDSUREE</span>
              <h2>Find us in<br /><em>Electronic City.</em></h2>
              <p>Our showroom is at SVS Arcade on Ananth Nagar Road, Electronic City Phase 2, Bengaluru. Use the map to explore the area before visiting.</p>
              <div className="sell-gold-visit__address">
                <span className="sell-gold-visit__pin"><MapPin size={20} /></span>
                <div><strong>GoldSuree</strong><p>1st Floor, SVS Arcade,<br />Ananth Nagar Road,<br />Electronic City Phase 2,<br />Bangalore – 560100</p></div>
              </div>
              <div className="sell-gold-visit__actions">
                <a className="sell-gold-button sell-gold-button--gold" href="#sell-gold-map">View map <MapPin size={17} /></a>
                <a className="sell-gold-button sell-gold-button--light" href={`tel:${PHONE_NUMBER}`}><Phone size={16} /> {PHONE_NUMBER}</a>
              </div>
            </motion.div>
            
<motion.div className="sell-gold-visit__visual" {...reveal(0.1)}>
  <div className="sell-gold-visit__map-card">
    <div className="sell-gold-visit__map-embed" id="sell-gold-map">
      <iframe
        title="Google Maps - GoldSuree, SVS Arcade, Electronic City Phase 2, Bengaluru"
        src="https://www.google.com/maps?q=SVS%20Arcade%2C%20Ananth%20Nagar%20Road%2C%20Electronic%20City%20Phase%202%2C%20Bengaluru%20560100&z=16&output=embed"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          border: 0,
        }}
      />
    </div>

    <div className="sell-gold-visit__map-footer">
      <div>
        <span>GOLDSUREE LOCATION</span>
        <strong>SVS Arcade, Electronic City Phase 2</strong>
        <small>Ananth Nagar Road, Bengaluru – 560100</small>
      </div>
      <a
        href="https://www.google.com/maps/search/?api=1&query=SVS+Arcade+Ananth+Nagar+Road+Electronic+City+Phase+2+Bengaluru+560100"
        target="_blank"
        rel="noreferrer"
        aria-label="Open GoldSuree location in Google Maps"
      >
        <MapPin size={20} />
      </a>
    </div>
  </div>

  <p className="sell-gold-visit__visual-note">
    <Clock3 size={15} />
    Contact us to confirm availability before your visit.
  </p>
</motion.div>

          </div>
          <div className="sell-gold-container sell-gold-nearby">
            <span className="sell-gold-kicker">NEARBY AREAS</span>
            <p>You can contact us about visiting from Electronic City and nearby neighbourhoods:</p>
            <div className="sell-gold-nearby__tags">{nearbyAreas.map((area) => <span key={area}>{area}</span>)}</div>
          </div>
        </section>

        <section className="sell-gold-faq" id="sell-gold-faq">
          <div className="sell-gold-container sell-gold-faq__layout">
            <motion.div className="sell-gold-faq__intro" {...reveal()}>
              <span className="sell-gold-kicker">GOOD TO KNOW</span>
              <h2>Questions about<br /><em>selling old gold?</em></h2>
              <p>If you’re unsure about an item or the assessment process, contact us before visiting.</p>
              <a className="sell-gold-text-link" href={WHATSAPP_URL} target="_blank" rel="noreferrer">Ask us directly <ArrowUpRight size={17} /></a>
            </motion.div>
            <div className="sell-gold-faq__list">
              {faqs.map((faq, index) => (
                <motion.details className="sell-gold-faq-item" key={faq.question} {...reveal(index * 0.035)}>
                  <summary><span className="sell-gold-faq-item__number">{String(index + 1).padStart(2, '0')}</span><span>{faq.question}</span><ChevronDown className="sell-gold-faq-item__chevron" size={18} /></summary>
                  <p>{faq.answer}</p>
                </motion.details>
              ))}
            </div>
          </div>
        </section>

        <section className="sell-gold-final-cta">
          <span className="sell-gold-final-cta__ornament" aria-hidden="true">✳</span>
          <div className="sell-gold-container sell-gold-final-cta__inner">
            <span className="sell-gold-kicker">READY TO MAKE AN ENQUIRY?</span>
            <h2>Thinking of selling<br /><em>your old gold?</em></h2>
            <p>Message or call GoldSuree to ask about your old gold jewellery and what to bring for an assessment.</p>
            <div className="sell-gold-final-cta__actions">
              <a className="sell-gold-button sell-gold-button--gold" href={WHATSAPP_URL} target="_blank" rel="noreferrer">Start a WhatsApp enquiry <ArrowUpRight size={17} /></a>
              <a className="sell-gold-button sell-gold-button--light" href={`tel:${PHONE_NUMBER}`}><Phone size={16} /> Call {PHONE_NUMBER}</a>
            </div>
            <p className="sell-gold-final-cta__footnote">You can review the valuation and decide whether to proceed.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
