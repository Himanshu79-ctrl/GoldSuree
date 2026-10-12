
import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowUpRight,
  MapPin,
  Phone,
  MessageCircle,
  ShieldCheck,
  Navigation,
} from 'lucide-react'

const WHATSAPP_NUMBER = '918981298596'
const PHONE_NUMBER = '8981298596'

const ADDRESS =
  '1st Floor, SVS Arcade, Ananth Nagar Road, Electronic City Phase 2, Bangalore - 560100'

const MAPS_URL =
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`

export default function ContactSection() {
  const reduceMotion = useReducedMotion()

  const [form, setForm] = useState({
    name: '',
    phone: '',
    goldType: 'Gold jewellery',
    message: '',
  })

  const [error, setError] = useState('')

  function handleChange(e) {
    setForm((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }))
    setError('')
  }

  function handleSubmit(e) {
    e.preventDefault()

    const phone = form.phone.replace(/\D/g, '')

    if (form.name.trim().length < 2) {
      setError('Please enter your name.')
      return
    }

    if (phone.length < 10 || phone.length > 15) {
      setError('Please enter a valid phone number.')
      return
    }

    const message = [
      'Hello GoldSuree, I would like to enquire about selling my old gold.',
      '',
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      `Gold type: ${form.goldType}`,
      `Message: ${form.message.trim() || 'Not provided'}`,
    ].join('\n')

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  const reveal = {
    initial: reduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.55 },
  }

  const inputClass =
    'w-full border border-[#d9cbb6] bg-[#fdfcf9] px-4 py-3.5 text-sm text-[#30261a] outline-none transition-colors placeholder:text-[#b4aa9a] focus:border-[#a17b43]'

  return (
    <section
      id="contact"
      className="scroll-mt-24 bg-[#f8f5ef] px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1400px]">

        {/* Compact editorial header */}
        <motion.div
          {...reveal}
          className="flex flex-col gap-5 border-b border-[#dfd2bf] pb-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[#a17b43]" />
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#967442]">
                Visit GoldSuree Today
              </p>
            </div>

            <h2 className="font-editorial text-3xl leading-tight text-[#292117] sm:text-4xl lg:text-5xl">
              Ready for a clearer
              <br className="hidden sm:block" /> gold valuation?
            </h2>
          </div>

          <div className="max-w-sm sm:pb-1">
            <p className="text-sm leading-7 text-[#786e60]">
              Every gold item has a story. Let's help you understand
              its value with professional testing and transparent
              valuation.
            </p>
          </div>
        </motion.div>

        {/* Contact information cards */}
        <motion.div
          {...reveal}
          className="grid grid-cols-1 border-b border-[#dfd2bf] sm:grid-cols-3"
        >
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-4 border-b border-[#dfd2bf] py-6 sm:border-b-0 sm:border-r sm:pr-5 lg:py-8"
          >
            <MapPin
              size={20}
              strokeWidth={1.4}
              className="mt-1 shrink-0 text-[#967442]"
            />
            <div>
              <p className="text-[10px] uppercase tracking-[0.17em] text-[#967442]">
                Visit Our Store
              </p>
              <p className="mt-2 text-sm leading-6 text-[#30261a]">
                SVS Arcade, Electronic City Phase 2, Bangalore
              </p>
              <span className="mt-3 inline-flex items-center gap-2 text-xs text-[#786e60] transition-colors group-hover:text-[#967442]">
                Get directions <ArrowUpRight size={13} />
              </span>
            </div>
          </a>

          <a
            href={`tel:${PHONE_NUMBER}`}
            className="group flex items-start gap-4 border-b border-[#dfd2bf] py-6 sm:border-b-0 sm:border-r sm:px-5 lg:py-8"
          >
            <Phone
              size={19}
              strokeWidth={1.4}
              className="mt-1 shrink-0 text-[#967442]"
            />
            <div>
              <p className="text-[10px] uppercase tracking-[0.17em] text-[#967442]">
                Call Us
              </p>
              <p className="mt-2 text-sm text-[#30261a]">
                {PHONE_NUMBER}
              </p>
              <p className="mt-3 text-xs text-[#786e60] transition-colors group-hover:text-[#967442]">
                Speak with our team
              </p>
            </div>
          </a>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-4 py-6 sm:pl-5 lg:py-8"
          >
            <MessageCircle
              size={20}
              strokeWidth={1.4}
              className="mt-1 shrink-0 text-[#967442]"
            />
            <div>
              <p className="text-[10px] uppercase tracking-[0.17em] text-[#967442]">
                WhatsApp
              </p>
              <p className="mt-2 text-sm text-[#30261a]">
                Start a conversation
              </p>
              <p className="mt-3 text-xs text-[#786e60] transition-colors group-hover:text-[#967442]">
                Enquire about your gold
              </p>
            </div>
          </a>
        </motion.div>

        {/* Form + brand promise */}
        <div className="grid gap-8 pt-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:pt-14">

          {/* Enquiry form */}
          <motion.div
            {...reveal}
            className="border border-[#e1d5c3] bg-white p-5 sm:p-8 lg:p-10"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#967442]">
                  GoldSuree Enquiry
                </p>
                <h3 className="mt-3 font-editorial text-3xl leading-snug text-[#30261a]">
                  Tell us about your gold.
                </h3>
                <p className="mt-3 text-xs leading-6 text-[#786e60]">
                  Share a few details to begin your enquiry.
                </p>
              </div>

              <MessageCircle
                size={22}
                strokeWidth={1.3}
                className="mt-1 shrink-0 text-[#a17b43]"
              />
            </div>

            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-xs font-medium text-[#4e4232]"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    minLength={2}
                    maxLength={100}
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-phone"
                    className="mb-2 block text-xs font-medium text-[#4e4232]"
                  >
                    Phone Number
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    maxLength={20}
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Your contact number"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-gold-type"
                  className="mb-2 block text-xs font-medium text-[#4e4232]"
                >
                  What Would You Like to Sell?
                </label>
                <select
                  id="contact-gold-type"
                  name="goldType"
                  value={form.goldType}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option>Gold jewellery</option>
                  <option>Gold coins</option>
                  <option>Gold bars</option>
                  <option>Broken or damaged gold</option>
                  <option>Other gold items</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-xs font-medium text-[#4e4232]"
                >
                  Additional Details (Optional)
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={3}
                  maxLength={1000}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Questions or details you'd like to share..."
                  className={`${inputClass} resize-y leading-6`}
                />
              </div>

              {error && (
                <p role="alert" className="text-xs text-red-700">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-3 bg-[#30261a] px-6 py-4 text-xs uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#967442] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a17b43]"
              >
                Continue with WhatsApp
                <ArrowUpRight size={16} />
              </button>

              <p className="text-[10px] leading-5 text-[#948675]">
                Your enquiry opens in WhatsApp for you to review and send.
                This form does not save your details to a database.
              </p>
            </form>
          </motion.div>

          {/* Distinctive brand promise panel */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.55,
              delay: reduceMotion ? 0 : 0.1,
            }}
            className="relative flex min-h-[340px] flex-col justify-between overflow-hidden bg-[#292117] p-6 text-[#f8f5ef] sm:p-9 lg:min-h-full lg:p-10"
          >
            <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full border border-[#a17b43]/30" />
            <div className="pointer-events-none absolute -right-5 -top-5 h-32 w-32 rounded-full border border-[#a17b43]/20" />

            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#a17b43]/60 text-[#c4a16b]">
                <ShieldCheck size={23} strokeWidth={1.2} />
              </div>

              <p className="mt-8 text-[10px] uppercase tracking-[0.23em] text-[#c4a16b]">
                Our Promise
              </p>

              <h3 className="mt-4 max-w-sm font-editorial text-3xl leading-tight sm:text-4xl">
                Selling Gold Should Feel
                <br />
                <span className="italic text-[#c4a16b]">
                  Clear, Not Complicated.
                </span>
              </h3>

              <p className="mt-5 max-w-sm text-sm leading-7 text-[#d0c5b4]">
                We don't want you to simply hear a price. We want you
                to understand why that price has been arrived at,
                so you can make an informed choice.
              </p>
            </div>

            <div className="relative mt-10 border-t border-[#a17b43]/40 pt-6">
              <div className="space-y-4">
                {[
                  'Professional Testing',
                  'Transparent Valuation',
                  'Clear Decisions',
                ].map((item, index) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="text-[10px] text-[#c4a16b]">
                      0{index + 1}
                    </span>
                    <span className="text-xs tracking-wide text-[#f0e8db]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-3 border-b border-[#a17b43] pb-2 text-[10px] uppercase tracking-[0.14em] text-[#c4a16b] transition-colors hover:text-white"
              >
                Visit Our Store
                <Navigation size={14} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
