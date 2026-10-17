import { useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Calculator, RotateCcw, Scale, ShieldCheck } from 'lucide-react'

const PURITY_OPTIONS = [
  { label: '24K', karat: 24, purity: '99.9%' },
  { label: '22K', karat: 22, purity: '91.6%' },
  { label: '18K', karat: 18, purity: '75.0%' },
  { label: '14K', karat: 14, purity: '58.3%' },
]

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
})

export default function GoldValueCalculator() {
  const reduceMotion = useReducedMotion()
  const sectionRef = useRef(null)

  // Gentle parallax for the 3D layer
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const sceneY = useTransform(scrollYProgress, [0, 1], [-30, 30])

  const [weight, setWeight] = useState('')
  const [purity, setPurity] = useState('22')
  const [rate, setRate] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const selectedPurity = PURITY_OPTIONS.find(
    (option) => option.karat === Number(purity)
  )

  const calculation = useMemo(() => {
    const goldWeight = Number(weight)
    const rate24K = Number(rate)

    if (
      weight.trim() === '' ||
      rate.trim() === '' ||
      !Number.isFinite(goldWeight) ||
      !Number.isFinite(rate24K) ||
      goldWeight <= 0 ||
      rate24K <= 0 ||
      !selectedPurity
    ) {
      return null
    }

    const pureGoldEquivalent = goldWeight * (selectedPurity.karat / 24)
    const estimatedValue = pureGoldEquivalent * rate24K

    return {
      pureGoldEquivalent,
      estimatedValue,
      ratePerGram: rate24K * (selectedPurity.karat / 24),
    }
  }, [weight, purity, rate, selectedPurity])

  const weightError =
    weight !== '' && (!Number.isFinite(Number(weight)) || Number(weight) <= 0)
      ? 'Enter a weight greater than 0 grams.'
      : ''

  const rateError =
    rate !== '' && (!Number.isFinite(Number(rate)) || Number(rate) <= 0)
      ? 'Enter a rate greater than ₹0.'
      : ''

  function handleCalculate(event) {
    event.preventDefault()
    setSubmitted(true)
  }

  function handleReset() {
    setWeight('')
    setPurity('22')
    setRate('')
    setSubmitted(false)
  }

  const showResult = submitted && calculation !== null

  const hoverLift = reduceMotion ? undefined : { y: -2 }
  const tapPress = reduceMotion ? undefined : { scale: 0.98 }

  return (
    <section
      ref={sectionRef}
      id="gold-calculator"
      className="relative isolate scroll-mt-24 overflow-hidden bg-[#eee7db] px-5 py-20 sm:px-8 sm:py-28 lg:px-16"
    >
      {/* 3D gold pieces: sits behind everything, with parallax */}
      <motion.div
        style={reduceMotion ? undefined : { y: sceneY }}
        className="absolute inset-x-0 -inset-y-12 z-0"
      >
        {/* <GoldScene /> */}
      </motion.div>

      {/* Soft veil keeps the intro text readable over the 3D layer */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_70%_45%_at_50%_16%,rgba(238,231,219,0.6),transparent_70%)] lg:bg-[radial-gradient(ellipse_42%_58%_at_22%_50%,rgba(238,231,219,0.7),transparent_72%)]" />

      <div className="relative z-10 mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* Introduction */}
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
              Know what your gold may be worth
            </p>
          </div>

          <h2 className="font-editorial text-4xl leading-tight tracking-tight text-[#292117] sm:text-5xl lg:text-6xl">
            Every Gram
            <br />
            <span className="italic text-[#a17b43]">Tells a Story.</span>
          </h2>

          <p className="mt-6 max-w-lg text-sm leading-7 text-[#786e60]">
            Get an estimated value for your old gold using its weight,
            purity and the 24K gold rate you enter. Understand the numbers
            before you decide to sell.
          </p>

          <div className="mt-9 space-y-5">
            <div className="group flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#cdbb9e] bg-[#eee7db]/70 text-[#967442] transition-colors duration-300 group-hover:border-[#967442] group-hover:bg-[#967442] group-hover:text-white">
                <Scale size={19} strokeWidth={1.4} />
              </div>
              <div>
                <h3 className="text-sm font-medium text-[#30261a]">
                  Weight-based estimate
                </h3>
                <p className="mt-1 text-xs leading-6 text-[#786e60]">
                  Enter the gold weight in grams.
                </p>
              </div>
            </div>

            <div className="group flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#cdbb9e] bg-[#eee7db]/70 text-[#967442] transition-colors duration-300 group-hover:border-[#967442] group-hover:bg-[#967442] group-hover:text-white">
                <ShieldCheck size={19} strokeWidth={1.4} />
              </div>
              <div>
                <h3 className="text-sm font-medium text-[#30261a]">
                  Purity-aware calculation
                </h3>
                <p className="mt-1 text-xs leading-6 text-[#786e60]">
                  Compare 24K, 22K, 18K and 14K gold estimates.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Calculator: layered card with a offset gold frame for depth */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-3 translate-y-3 border border-[#cdbb9e]/80 sm:translate-x-4 sm:translate-y-4"
          />

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: reduceMotion ? 0 : 0.1 }}
            className="relative border border-[#d8c8af] bg-[#fbf9f5]/80 p-5 shadow-[0_30px_80px_-30px_rgba(67,48,23,0.28)] backdrop-blur-sm sm:p-8 lg:p-10"
          >
            <div className="flex items-center justify-between border-b border-[#e5dbcb] pb-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#967442]">
                  GoldSuree
                </p>
                <h3 className="mt-2 font-editorial text-2xl text-[#30261a] sm:text-3xl">
                  Gold Value Calculator
                </h3>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eee5d5] text-[#967442]">
                <Calculator size={22} strokeWidth={1.4} />
              </div>
            </div>

            <form onSubmit={handleCalculate} className="mt-7 space-y-6">
              {/* Weight */}
              <div>
                <label
                  htmlFor="gold-weight"
                  className="mb-2 block text-xs font-medium text-[#4e4232]"
                >
                  Gold weight (grams)
                </label>

                <div className="flex items-center border border-[#d9cbb6] bg-white transition-colors focus-within:border-[#a17b43] hover:border-[#c8b690]">
                  <input
                    id="gold-weight"
                    type="number"
                    min="0.01"
                    step="any"
                    inputMode="decimal"
                    placeholder="e.g. 10"
                    value={weight}
                    onChange={(event) => {
                      setWeight(event.target.value)
                      setSubmitted(false)
                    }}
                    className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-sm text-[#30261a] outline-none placeholder:text-[#b4aa9a]"
                    aria-invalid={Boolean(weightError)}
                    aria-describedby={weightError ? 'weight-error' : undefined}
                  />
                  <span className="px-4 text-xs text-[#8b7e6b]">grams</span>
                </div>

                {weightError && (
                  <p id="weight-error" className="mt-2 text-xs text-red-700">
                    {weightError}
                  </p>
                )}
              </div>

              {/* Purity */}
              <fieldset>
                <legend className="mb-3 text-xs font-medium text-[#4e4232]">
                  Select gold purity
                </legend>

                <div className="grid grid-cols-4 gap-2">
                  {PURITY_OPTIONS.map((option) => {
                    const active = purity === String(option.karat)

                    return (
                      <motion.button
                        key={option.karat}
                        type="button"
                        whileHover={hoverLift}
                        whileTap={tapPress}
                        onClick={() => {
                          setPurity(String(option.karat))
                          setSubmitted(false)
                        }}
                        aria-pressed={active}
                        className={`border px-2 py-3 text-center transition-colors duration-200 ${
                          active
                            ? 'border-[#967442] bg-[#967442] text-white'
                            : 'border-[#d9cbb6] bg-white text-[#5e503d] hover:border-[#967442]'
                        }`}
                      >
                        <span className="block text-sm font-medium">
                          {option.label}
                        </span>
                        <span
                          className={`mt-1 block text-[10px] ${
                            active ? 'text-white/80' : 'text-[#948675]'
                          }`}
                        >
                          {option.purity}
                        </span>
                      </motion.button>
                    )
                  })}
                </div>
              </fieldset>

              {/* Rate */}
              <div>
                <label
                  htmlFor="gold-rate"
                  className="mb-2 block text-xs font-medium text-[#4e4232]"
                >
                  24K gold rate per gram (₹)
                </label>

                <div className="flex items-center border border-[#d9cbb6] bg-white transition-colors focus-within:border-[#a17b43] hover:border-[#c8b690]">
                  <span className="pl-4 text-sm text-[#8b7e6b]">₹</span>
                  <input
                    id="gold-rate"
                    type="number"
                    min="0.01"
                    step="any"
                    inputMode="decimal"
                    placeholder="Enter the rate you want to use"
                    value={rate}
                    onChange={(event) => {
                      setRate(event.target.value)
                      setSubmitted(false)
                    }}
                    className="min-w-0 flex-1 bg-transparent px-3 py-3.5 text-sm text-[#30261a] outline-none placeholder:text-[#b4aa9a]"
                    aria-invalid={Boolean(rateError)}
                    aria-describedby={rateError ? 'rate-error' : undefined}
                  />
                </div>

                {rateError && (
                  <p id="rate-error" className="mt-2 text-xs text-red-700">
                    {rateError}
                  </p>
                )}

                <p className="mt-2 text-[11px] leading-5 text-[#948675]">
                  Enter the 24K rate per gram from a source you trust. This
                  calculator does not fetch live gold prices.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-[1fr_auto]">
                <motion.button
                  type="submit"
                  whileHover={hoverLift}
                  whileTap={tapPress}
                  className="flex items-center justify-center gap-2 bg-[#30261a] px-5 py-4 text-xs uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#967442] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#967442]"
                >
                  <Calculator size={16} />
                  Calculate Gold Value
                </motion.button>

                <motion.button
                  type="button"
                  onClick={handleReset}
                  whileHover={hoverLift}
                  whileTap={tapPress}
                  className="flex items-center justify-center gap-2 border border-[#d9cbb6] px-5 py-4 text-xs text-[#6f604c] transition-colors hover:border-[#967442] hover:text-[#967442]"
                >
                  <RotateCcw size={15} />
                  Reset
                </motion.button>
              </div>
            </form>

            {/* Results */}
            {showResult && (
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                aria-live="polite"
                className="mt-8 border border-[#d8c8af] bg-[#f4eee4] p-5 sm:p-6"
              >
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#967442]">
                  Estimated gold value
                </p>

                <p className="mt-3 break-words font-editorial text-3xl text-[#30261a] sm:text-4xl">
                  {currencyFormatter.format(calculation.estimatedValue)}
                </p>

                <div className="mt-6 space-y-3 border-t border-[#dfd2bf] pt-5 text-xs">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[#786e60]">Gold weight</span>
                    <span className="text-right text-[#30261a]">
                      {Number(weight).toLocaleString('en-IN', {
                        maximumFractionDigits: 3,
                      })}{' '}
                      g
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[#786e60]">Selected purity</span>
                    <span className="text-right text-[#30261a]">
                      {selectedPurity.label} ({selectedPurity.purity})
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[#786e60]">Rate used per gram</span>
                    <span className="text-right text-[#30261a]">
                      {currencyFormatter.format(calculation.ratePerGram)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[#786e60]">Pure-gold equivalent</span>
                    <span className="text-right text-[#30261a]">
                      {calculation.pureGoldEquivalent.toLocaleString('en-IN', {
                        maximumFractionDigits: 3,
                      })}{' '}
                      g
                    </span>
                  </div>
                </div>

                <p className="mt-5 text-[11px] leading-6 text-[#786e60]">
                  This is an indicative estimate based on the values entered.
                  It is not a guaranteed selling price or final offer.
                  Actual valuation may differ after purity testing, verified
                  weighing and applicable deductions.
                </p>
              </motion.div>
            )}

            {submitted && !calculation && !weightError && !rateError && (
              <p className="mt-5 text-xs leading-6 text-red-700" role="alert">
                Please enter a valid weight and a valid 24K rate greater than zero.
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}