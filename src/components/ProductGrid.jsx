
import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import products from '../data/products'
import ProductCard from './ProductCard'
import './ProductGrid.css'
import GoldScene from './GoldScene'

gsap.registerPlugin(ScrollTrigger)

const categories = [
  'All Pieces',
  'Necklaces',
  'Earrings',
  'Rings',
  'Bracelets',
]

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState('All Pieces')
  const sectionRef = useRef(null)

  const filteredProducts =
    activeCategory === 'All Pieces'
      ? products
      : products.filter((product) => product.category === activeCategory)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.product-grid-heading',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            once: true,
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.product-card',
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.07,
          ease: 'power2.out',
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [activeCategory])

  return (
    <section
      id="jewellery"
      ref={sectionRef}
      className="product-section scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24 lg:px-16 lg:py-28"
    >
     
      <div className="mx-auto max-w-[1440px]">
        <div className="product-grid-heading mb-9 flex flex-col justify-between gap-6 sm:mb-12 md:flex-row md:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-9 bg-[#b38a4a]" />
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#9a7847]">
                The GoldSuree Edit
              </p>
            </div>
 
            <h2 className="font-editorial text-4xl tracking-[-0.04em] text-[#292117] sm:text-5xl lg:text-6xl">
              Signature Jewellery
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-7 text-[#817565]">
              Thoughtfully selected pieces that celebrate the beauty
              of every occasion.
            </p>
          </div>

          <a
            href="#collections"
            className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.16em] text-[#8d6837] hover:text-[#332313]"
          >
            Explore Collections <ArrowRight size={15} />
          </a>
        </div>

        {/* Category filters */}
        <div
          className="mb-8 flex gap-6 overflow-x-auto border-b border-[#d9cdbb] sm:mb-10 sm:gap-8"
          aria-label="Filter jewellery by category"
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
              className={`relative shrink-0 pb-4 text-[10px] uppercase tracking-[0.12em] transition-colors ${
                activeCategory === category
                  ? 'font-semibold text-[#79572f]'
                  : 'text-[#938675] hover:text-[#473522]'
              }`}
            >
              {category}

              {activeCategory === category && (
                <span className="absolute inset-x-0 bottom-0 h-[2px] bg-[#a7834b]" />
              )}
            </button>
          ))}
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center sm:mt-16">
          <a
            href="#collections"
            className="inline-flex min-h-12 items-center justify-center gap-4 border border-[#a7834b] px-7 py-4 text-[10px] uppercase tracking-[0.18em] text-[#77582f] transition-colors hover:bg-[#a7834b] hover:text-white"
          >
            Discover All Pieces <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  )
}
