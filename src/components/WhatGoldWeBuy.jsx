
import { useRef, useState } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import './WhatGoldWeBuy.css'

const jewellery = [
  {
    title: 'Gold Jewellery',
    image:
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1400&q=85',
    alt: 'Gold jewellery displayed elegantly',
  },
  {
    title: 'Broken Gold Jewellery',
    image:
      'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1400&q=85',
    alt: 'Detailed gold jewellery pieces',
  },
  {
    title: 'Old Gold Jewellery',
    image:
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1400&q=85',
    alt: 'Classic gold jewellery',
  },
  {
    title: 'Gold Chains',
    image:
      'https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=1400&q=85',
    alt: 'Gold chain jewellery',
  },
  {
    title: 'Gold Bangles',
    image:
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1400&q=85',
    alt: 'Gold bangles and bracelets',
  },
  {
    title: 'Gold Rings',
    image:
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1400&q=85',
    alt: 'Gold ring jewellery',
  },
  {
    title: 'Gold Earrings',
    image:
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1400&q=85',
    alt: 'Gold earrings',
  },
  {
    title: 'Gold Necklaces',
    image:
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1400&q=85',
    alt: 'Gold necklace jewellery',
  },
  {
    title: 'Gold Bracelets',
    image:
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1400&q=85&sat=-15',
    alt: 'Gold bracelet jewellery',
  },
  {
    title: 'Gold Coins',
    image:
      'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=1400&q=85',
    alt: 'Gold coins',
  },
]

const VISIBLE_CARDS = 4
const STACK_STEP = 19

export default function WhatGoldWeBuy() {
  const sectionRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const reduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const nextIndex = Math.min(
      jewellery.length - 1,
      Math.floor(progress * jewellery.length),
    )

    setActiveIndex((current) =>
      current === nextIndex ? current : nextIndex,
    )
  })

  const firstVisibleIndex = Math.max(
    0,
    activeIndex - VISIBLE_CARDS + 1,
  )

  const visibleCards = jewellery
    .slice(firstVisibleIndex, activeIndex + 1)
    .map((item, index, list) => ({
      ...item,
      index: firstVisibleIndex + index,
      depth: list.length - 1 - index,
    }))

  return (
    <section
      ref={sectionRef}
      className="wgb-section"
      id="what-we-buy"
      style={{ '--wgb-scenes': jewellery.length }}
      aria-label="What gold we buy"
    >
      <div className="wgb-stage">
        <header className="wgb-heading">
          <span className="wgb-eyebrow">
            <span className="wgb-eyebrow-line" />
            WHAT GOLD WE BUY
            <span className="wgb-eyebrow-line" />
          </span>

          <h2 className="wgb-main-heading">
            Every piece has
            <br />
            <span>its own story.</span>
          </h2>

          <p className="wgb-intro">
            From cherished jewellery to broken gold, every eligible
            piece deserves a careful evaluation.
          </p>
        </header>

        <div className="wgb-deck" aria-live="polite">
          {visibleCards.map((item) => {
            const isActive = item.index === activeIndex
            const offset = item.depth * STACK_STEP
            const horizontalOffset =
              item.depth === 0
                ? 0
                : (item.depth % 2 === 0 ? 1 : -1) *
                  Math.ceil(item.depth / 2) *
                  8

            return (
              <motion.article
                key={item.title}
                className={`wgb-stack-card ${
                  isActive ? 'is-active' : 'is-stacked'
                }`}
                initial={
                  reduceMotion
                    ? { opacity: 0 }
                    : { y: '75%', opacity: 0, scale: 0.96 }
                }
                animate={{
                  x: horizontalOffset,
                  y: -offset,
                  opacity: 1,
                  scale: 1 - item.depth * 0.012,
                }}
                transition={{
                  duration: reduceMotion ? 0.15 : 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  zIndex: item.index + 1,
                  '--wgb-depth': item.depth,
                }}
                aria-current={isActive ? 'step' : undefined}
              >
                <div className="wgb-card-image">
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading={item.index < 2 ? 'eager' : 'lazy'}
                    decoding="async"
                  />

                  {/* <span className="wgb-image-caption">
                    GOLDSUREE ·{' '}
                    {String(item.index + 1).padStart(2, '0')}
                  </span> */}
                </div>

                <div className="wgb-card-label">
                  <span className="wgb-card-number">
                    {String(item.index + 1).padStart(2, '0')}
                  </span>
                  <h3>{item.title}</h3>
                  <span className="wgb-card-mark" aria-hidden="true">
                    ↗
                  </span>
                </div>
              </motion.article>
            )
          })}
        </div>

        {/* <div className="wgb-scroll-note" aria-hidden="true">
          <span>SCROLL TO DISCOVER</span>
          <ArrowDown size={14} strokeWidth={1.5} />
        </div> */}

        <div className="wgb-bottom-row">
          <div
            className="wgb-progress"
            role="progressbar"
            aria-label="Jewellery categories"
            aria-valuemin={1}
            aria-valuemax={jewellery.length}
            aria-valuenow={activeIndex + 1}
          >
            {jewellery.map((item, index) => (
              <span
                key={item.title}
                className={`wgb-progress-segment ${
                  index === activeIndex
                    ? 'is-active'
                    : index < activeIndex
                      ? 'is-complete'
                      : ''
                }`}
              />
            ))}
          </div>

          <span className="wgb-counter">
            {String(activeIndex + 1).padStart(2, '0')}
            <span>/</span>
            {String(jewellery.length).padStart(2, '0')}
          </span>

          <a
            className="wgb-next-link"
            href="#gold-purity-valuation"
          >
            <span>Our evaluation process</span>
            <ArrowRight size={15} strokeWidth={1.6} />
          </a>
        </div>
      </div>
    </section>
  )
}
