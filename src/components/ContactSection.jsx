
import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowUpRight,
  MapPin,
  Phone,
  MessageCircle,
  ShieldCheck,
  Send,
  CheckCircle2,
} from 'lucide-react'

const WHATSAPP_NUMBER = '918981298596'
const PHONE_NUMBER = '8981298596'

const ADDRESS =
  '1st Floor, SVS Arcade, Ananth Nagar Road, Electronic City Phase 2, Bangalore - 560100'

const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`

const GOLD_GRADIENT =
  'bg-gradient-to-b from-[#E8BD50] via-[#C99525] to-[#80520C]'

const inputClass =
  'w-full rounded-sm border border-[#ded3c1] bg-[#fbf9f4] px-4 py-3.5 text-sm text-[#30261a] outline-none transition-all duration-300 placeholder:text-[#a69a87] hover:border-[#b99a63] focus:border-[#a17b43] focus:ring-2 focus:ring-[#c5a16b]/15'

export default function ContactSection() {
  const reduceMotion = useReducedMotion()

  const [form, setForm] = useState({
    name: '',
    phone: '',
    goldType: 'Gold jewellery',
    message: '',
  })

  const [error, setError] = useState('')

  const reveal = {
    initial: reduceMotion ? false : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: {
      duration: reduceMotion ? 0 : 0.65,
      ease: 'easeOut',
    },
  }

  function handleChange(event) {
    const { name, value } = event.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))

    setError('')
  }

  function handleSubmit(event) {
    event.preventDefault()

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

    const whatsappLink =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

    window.open(whatsappLink, '_blank', 'noopener,noreferrer')
  }

  const contactItems = [
    {
      icon: MapPin,
      label: 'Visit Our Store',
      value: 'SVS Arcade, Electronic City Phase 2, Bangalore',
      detail: 'Get directions to our store',
      href: MAPS_URL,
      external: true,
    },
    {
      icon: Phone,
      label: 'Call Our Team',
      value: PHONE_NUMBER,
      detail: 'Speak with us directly',
      href: `tel:+91${PHONE_NUMBER}`,
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp Enquiry',
      value: 'Start a conversation',
      detail: 'Discuss your gold with us',
      href: `https://wa.me/${WHATSAPP_NUMBER}`,
      external: true,
    },
  ]

  return (
    <section
      id="contact"
      className="relative isolate scroll-mt-24 overflow-hidden bg-[#f8f5ef] px-4 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28"
    >
      {/* Restrained architectural backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-100px] top-20 -z-10 h-[360px] w-[360px] rounded-full border border-[#b58b4a]/10 sm:right-[-140px] sm:h-[480px] sm:w-[480px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-55px] top-[65px] -z-10 h-[270px] w-[270px] rounded-full border border-[#b58b4a]/10 sm:right-[-95px] sm:h-[390px] sm:w-[390px]"
      />

      <div className="mx-auto max-w-[1400px]">
        {/* Heading */}
        <motion.div
          {...reveal}
          className="mb-10 flex flex-col justify-between gap-5 md:mb-14 md:flex-row md:items-end"
        >
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-9 bg-[#b58b4a]" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#8c692f]">
                Let's Connect
              </p>
              <span className="h-px w-9 bg-[#b58b4a]/45" />
            </div>

            <h2 className="max-w-2xl font-editorial text-4xl leading-[1.12] tracking-tight text-[#292117] sm:text-5xl lg:text-6xl">
              Your next step
              <br />
              starts with a{' '}
              <span className="bg-gradient-to-b from-[#E8BD50] via-[#C99525] to-[#80520C] bg-clip-text italic text-transparent">
                conversation.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-[#786e60] md:pb-1">
            Have old gold you would like to sell? Get in touch with our team
            to discuss your items and arrange your visit.
          </p>
        </motion.div>

        {/* Contact panels */}
        <div className="grid items-stretch gap-5 lg:grid-cols-[0.83fr_1.17fr] lg:gap-7">
          {/* Contact information */}
          <motion.div
            {...reveal}
            className="relative isolate flex flex-col overflow-hidden border border-[#8e7047] bg-[#292117] p-6 text-[#f8f5ef] sm:p-9 lg:p-10"
          >
            {/* Fine inner architectural frame */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-[7px] -z-10 border border-[#c5a16b]/20 sm:inset-[10px]"
            />

            {/* Subtle arch motif */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-8 top-10 h-48 w-36 rounded-t-full border border-[#c5a16b]/15 sm:right-2 sm:top-8 sm:h-64 sm:w-48"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-4 top-14 h-40 w-28 rounded-t-full border border-[#c5a16b]/10 sm:right-6 sm:top-12 sm:h-56 sm:w-40"
            />

            <div className="relative">
              <div className="mb-7 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center border border-[#c5a16b]/45 text-[#dfbd7c]">
                  <MessageCircle size={19} strokeWidth={1.4} />
                </span>

                <div>
                  <p className="text-sm font-medium text-[#f8f5ef]">
                    We're here to help
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-[#bca989]">
                    Connect with GoldSuree
                  </p>
                </div>
              </div>

              <h3 className="max-w-md font-editorial text-3xl leading-tight sm:text-4xl">
                Let's talk about
                <br />
                your gold.
              </h3>

              <p className="mt-4 max-w-md text-sm leading-7 text-[#c8bcaa]">
                Whether you have a question or are planning a visit, choose
                the way that works best for you.
              </p>
            </div>

            {/* Contact methods */}
            <div className="relative mt-8 divide-y divide-[#a17b43]/25 border-y border-[#a17b43]/25">
              {contactItems.map((item) => {
                const Icon = item.icon

                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    whileHover={reduceMotion ? undefined : { x: 3 }}
                    className="group flex items-start gap-4 py-5 transition-colors"
                  >
                    <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center border border-[#a17b43]/35 text-[#d7b879] transition-colors duration-300 group-hover:border-[#d7b879] group-hover:bg-[#c5a16b]/10">
                      <Icon size={18} strokeWidth={1.4} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-[10px] uppercase tracking-[0.17em] text-[#c5a16b]">
                        {item.label}
                      </span>

                      <span className="mt-2 block text-sm leading-6 text-[#f5eee2]">
                        {item.value}
                      </span>

                      <span className="mt-1.5 block text-xs text-[#bcae98]">
                        {item.detail}
                      </span>
                    </span>

                    <ArrowUpRight
                      size={16}
                      strokeWidth={1.4}
                      className="mt-1 shrink-0 text-[#a17b43] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#f0d49b]"
                    />
                  </motion.a>
                )
              })}
            </div>

            {/* Trust note */}
            <div className="relative mt-auto pt-8">
              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={19}
                  strokeWidth={1.4}
                  className="mt-0.5 shrink-0 text-[#d7b879]"
                />
                <div>
                  <p className="text-sm text-[#f5eee2]">
                    Your choice, your decision.
                  </p>
                  <p className="mt-2 text-xs leading-6 text-[#bcae98]">
                    Ask questions, review the valuation and decide whether
                    you wish to proceed.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Enquiry form */}
          <motion.div
            {...reveal}
            className="relative border border-[#d7c4a4] bg-[#fffdf8] p-5 sm:p-8 lg:p-10"
          >
            {/* Double-line frame */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-[5px] border border-[#e8dfd2] sm:inset-[7px]"
            />

            <div
              aria-hidden="true"
              className={`absolute inset-x-0 top-0 h-[3px] ${GOLD_GRADIENT}`}
            />

            <div className="relative flex items-start justify-between gap-4 border-b border-[#e8dfd2] pb-6 sm:pb-8">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-px w-5 bg-[#b58b4a]" />
                  <p className="text-[10px] font-semibold uppercase tracking-[0.23em] text-[#967442]">
                    GoldSuree Enquiry
                  </p>
                </div>

                <h3 className="mt-3 font-editorial text-3xl leading-tight text-[#292117] sm:text-4xl">
                  Tell us a little
                  <br className="hidden sm:block" /> about your gold.
                </h3>

                <p className="mt-3 max-w-md text-sm leading-6 text-[#786e60]">
                  Fill in the details below and continue directly to WhatsApp.
                </p>
              </div>

              <span className="hidden h-12 w-12 shrink-0 place-items-center border border-[#e5d4b6] bg-[#faf6ed] text-[#967442] sm:grid">
                <Send size={19} strokeWidth={1.4} />
              </span>
            </div>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="relative mt-7 space-y-5 sm:mt-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-xs font-medium text-[#45392a]"
                  >
                    Full Name <span className="text-[#a17b43]">*</span>
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
                    placeholder="Enter your name"
                    aria-invalid={Boolean(error && form.name.trim().length < 2)}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-phone"
                    className="mb-2 block text-xs font-medium text-[#45392a]"
                  >
                    Phone Number <span className="text-[#a17b43]">*</span>
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
                    placeholder="Enter your phone number"
                    aria-invalid={Boolean(
                      error &&
                      (form.phone.replace(/\D/g, '').length < 10 ||
                        form.phone.replace(/\D/g, '').length > 15),
                    )}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-gold-type"
                  className="mb-2 block text-xs font-medium text-[#45392a]"
                >
                  What would you like to sell?
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
                  className="mb-2 block text-xs font-medium text-[#45392a]"
                >
                  Anything you'd like us to know?{' '}
                  <span className="font-normal text-[#998c79]">
                    (Optional)
                  </span>
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  maxLength={1000}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Share your question or any details about your gold..."
                  className={`${inputClass} resize-y leading-6`}
                />
              </div>

              {error && (
                <p
                  role="alert"
                  className="flex items-start gap-2 text-xs leading-5 text-red-700"
                >
                  <span aria-hidden="true">!</span>
                  {error}
                </p>
              )}

              <button
                type="submit"
                className={`group flex min-h-[54px] w-full items-center justify-center gap-3 rounded-sm ${GOLD_GRADIENT} px-5 py-4 text-xs font-semibold uppercase tracking-[0.13em] text-[#fffaf1] shadow-[0_6px_18px_rgba(139,101,36,0.13)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(139,101,36,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#a17b43]`}
              >
                Continue to WhatsApp
                <ArrowUpRight
                  size={17}
                  strokeWidth={1.7}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </button>

              <div className="flex items-start gap-2 pt-1">
                <CheckCircle2
                  size={15}
                  strokeWidth={1.5}
                  className="mt-0.5 shrink-0 text-[#967442]"
                />
                <p className="text-[10px] leading-5 text-[#887b68]">
                  Your details will be included in a WhatsApp message for you
                  to review and send. This form does not store your information
                  in a database.
                </p>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Architectural location strip */}
        <motion.a
          {...reveal}
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative mt-5 flex flex-col gap-4 border border-[#d7c4a4] bg-[#f1eadf] p-5 transition-colors duration-300 hover:border-[#b58b4a] sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-6"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-[4px] border border-[#d7c4a4]/50"
          />

          <div className="relative flex items-start gap-3">
            <MapPin
              size={19}
              strokeWidth={1.4}
              className="mt-0.5 shrink-0 text-[#967442]"
            />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#967442]">
                Find GoldSuree
              </p>
              <p className="mt-1.5 text-xs leading-6 text-[#554837] sm:text-sm">
                {ADDRESS}
              </p>
            </div>
          </div>

          <span className="relative inline-flex shrink-0 items-center gap-2 pl-8 text-xs font-medium text-[#795a2c] transition-colors group-hover:text-[#302117] sm:pl-0">
            Open in Google Maps
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </motion.a>
      </div>
    </section>
  )
}
