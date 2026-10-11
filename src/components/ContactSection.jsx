
import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowUpRight,
  MessageCircle,
  Phone,
  ShieldCheck,
} from 'lucide-react'

const WHATSAPP_NUMBER = '918981298596' // Add your WhatsApp number with country code, without +

export default function ContactSection() {
  const reduceMotion = useReducedMotion()

  const [form, setForm] = useState({
    name: '',
    phone: '',
    goldType: 'Gold jewellery',
    message: '',
  })

  const [error, setError] = useState('')

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

    const cleanPhone = form.phone.replace(/\D/g, '')

    if (form.name.trim().length < 2) {
      setError('Please enter your name.')
      return
    }

    if (cleanPhone.length < 10 || cleanPhone.length > 15) {
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

    if (!WHATSAPP_NUMBER) {
      setError(
        'The WhatsApp number is not configured yet. Add your business number in ContactSection.jsx.'
      )
      return
    }

    const whatsappUrl =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <section
      id="contact"
      className="scroll-mt-24 bg-[#f8f5ef] px-5 py-20 sm:px-8 sm:py-28 lg:px-16"
    >
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* Contact introduction */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65 }}
          className="flex flex-col justify-center"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-9 bg-[#a17b43]" />
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#967442]">
              Let's talk about your gold
            </p>
          </div>

          <h2 className="font-editorial text-4xl leading-tight tracking-tight text-[#292117] sm:text-5xl lg:text-6xl">
            Your Gold.
            <br />
            <span className="italic text-[#a17b43]">
              Your Next Step.
            </span>
          </h2>

          <p className="mt-6 max-w-lg text-sm leading-7 text-[#786e60]">
            Thinking of selling old jewellery? Send us an enquiry to start
            a conversation about the valuation process.
          </p>

          <div className="mt-9 space-y-5">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#d9cbb6] text-[#967442]">
                <MessageCircle size={19} strokeWidth={1.4} />
              </div>
              <div>
                <h3 className="text-sm font-medium text-[#30261a]">
                  Start a conversation
                </h3>
                <p className="mt-1 text-xs leading-6 text-[#786e60]">
                  Share what kind of gold you would like to sell.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#d9cbb6] text-[#967442]">
                <ShieldCheck size={19} strokeWidth={1.4} />
              </div>
              <div>
                <h3 className="text-sm font-medium text-[#30261a]">
                  Understand the process
                </h3>
                <p className="mt-1 text-xs leading-6 text-[#786e60]">
                  Ask questions before making a selling decision.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#d9cbb6] text-[#967442]">
                <Phone size={19} strokeWidth={1.4} />
              </div>
              <div>
                <h3 className="text-sm font-medium text-[#30261a]">
                  Share your contact details
                </h3>
                <p className="mt-1 text-xs leading-6 text-[#786e60]">
                  Include a phone number so the enquiry recipient can
                  respond.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enquiry form */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, delay: reduceMotion ? 0 : 0.1 }}
          className="border border-[#e1d5c3] bg-white p-5 sm:p-8 lg:p-10"
        >
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#967442]">
            GoldSuree Enquiry
          </p>

          <h3 className="mt-3 font-editorial text-3xl text-[#30261a]">
            Tell us a little about your gold.
          </h3>

          <p className="mt-3 text-xs leading-6 text-[#786e60]">
            Fill in the details below to prepare your enquiry.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="contact-name"
                className="mb-2 block text-xs font-medium text-[#4e4232]"
              >
                Your name
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
                className="w-full border border-[#d9cbb6] bg-[#fdfcf9] px-4 py-3.5 text-sm text-[#30261a] outline-none transition-colors placeholder:text-[#b4aa9a] focus:border-[#a17b43]"
              />
            </div>

            <div>
              <label
                htmlFor="contact-phone"
                className="mb-2 block text-xs font-medium text-[#4e4232]"
              >
                Phone number
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
                placeholder="Enter your contact number"
                className="w-full border border-[#d9cbb6] bg-[#fdfcf9] px-4 py-3.5 text-sm text-[#30261a] outline-none transition-colors placeholder:text-[#b4aa9a] focus:border-[#a17b43]"
              />
            </div>

            <div>
              <label
                htmlFor="contact-gold-type"
                className="mb-2 block text-xs font-medium text-[#4e4232]"
              >
                What would you like to sell?
              </label>
              <select
                id="contact-gold-type"
                name="goldType"
                value={form.goldType}
                onChange={handleChange}
                className="w-full border border-[#d9cbb6] bg-[#fdfcf9] px-4 py-3.5 text-sm text-[#30261a] outline-none focus:border-[#a17b43]"
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
                Additional details (optional)
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                maxLength={1000}
                value={form.message}
                onChange={handleChange}
                placeholder="Approximate weight, questions or anything else..."
                className="w-full resize-y border border-[#d9cbb6] bg-[#fdfcf9] px-4 py-3.5 text-sm leading-6 text-[#30261a] outline-none transition-colors placeholder:text-[#b4aa9a] focus:border-[#a17b43]"
              />
            </div>

            {error && (
              <p role="alert" className="text-xs leading-6 text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-3 bg-[#30261a] px-6 py-4 text-xs uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#967442]"
            >
              Continue with WhatsApp
              <ArrowUpRight size={16} />
            </button>

            <p className="text-[10px] leading-5 text-[#948675]">
              Your enquiry will open in WhatsApp for you to review and send.
              This form does not save your details to a database.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
