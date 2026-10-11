
import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import collections from '../data/collections'
import './CollectionGrid.css'

gsap.registerPlugin(ScrollTrigger)

export default function CollectionGrid() {
  const sectionRef = useRef(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.collection-heading',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        },
      )

      gsap.fromTo(
        '.collection-card',
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.collection-grid',
            start: 'top 85%',
            once: true,
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [reduceMotion])

  return (
    <section
      id="collections"
      ref={sectionRef}
      className="collection-section scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Section heading */}
        <div className="collection-heading mb-10 flex flex-col justify-between gap-6 md:mb-14 md:flex-row md:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-9 bg-[#b38a4a]" />
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#9a7847]">
                Curated for you
              </p>
            </div>

            <h2 className="font-editorial text-4xl font-normal leading-tight tracking-[-0.04em] text-[#292117] sm:text-5xl lg:text-6xl">
              Find Your Perfect
              <br className="hidden sm:block" />{' '}
              <span className="italic text-[#9b7846]">Piece</span>
            </h2>
          </div>

          <div className="max-w-sm">
            <p className="text-sm leading-7 text-[#817565]">
              From timeless classics to contemporary designs,
              discover jewellery that becomes part of your story.
            </p>

            <a
              href="#jewellery"
              className="mt-5 inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.17em] text-[#8d6837] transition-colors hover:text-[#3e2b16]"
            >
              View All Collections
              <ArrowRight size={15} />
            </a>
          </div>
        </div>

        {/* Collection cards */}
        <div className="collection-grid grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {collections.map((collection, index) => (
            <motion.a
              key={collection.id}
              href={collection.href}
              className="collection-card group block"
              whileHover={reduceMotion ? undefined : { y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="collection-image-wrap relative aspect-[3/4] overflow-hidden bg-[#e9dfce]">
                <img
                  src={collection.image}
                  alt={collection.title}
                  loading="lazy"
                  className="collection-image h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />

                <span className="absolute left-5 top-5 border border-white/40 px-3 py-2 text-[9px] tracking-[0.17em] text-white">
                  {collection.category}
                </span>

                <div className="absolute inset-x-5 bottom-6 text-white sm:bottom-7">
                  <p className="mb-2 text-[10px] tracking-[0.08em] text-white/75">
                    {collection.subtitle}
                  </p>

                  <h3 className="font-editorial text-2xl font-normal sm:text-[27px]">
                    {collection.title}
                  </h3>

                  <div className="mt-5 flex items-center justify-between border-t border-white/40 pt-4">
                    <span className="text-[9px] uppercase tracking-[0.2em]">
                      Discover
                    </span>

                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/50 transition-all duration-300 group-hover:border-[#d8ba80] group-hover:bg-[#d8ba80] group-hover:text-[#21180e]">
                      <ArrowRight size={15} />
                    </span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
