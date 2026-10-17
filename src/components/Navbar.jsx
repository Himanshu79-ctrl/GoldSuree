import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'

const WHATSAPP_NUMBER = '918981298596'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Gold Calculator', href: '#gold-calculator' },
  { label: 'Why GoldSuree', href: '#why-goldsuree' },
  { label: 'About Us', href: '/about-us', type: 'page' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const whatsappUrl =
    `https://wa.me/${918981298596}?text=${encodeURIComponent(
      'Hello GoldSuree, I would like to enquire about old gold valuation.'
    )}`

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <>
      {/* Announcement bar */}
      <div className="relative z-[60] flex h-8 items-center justify-center bg-[#201a14] px-3 text-center text-[8px] tracking-[0.15em] text-[#e6d0a5] sm:text-[10px] sm:tracking-[0.2em]">
        <span>
          LUXURY IN EVERY DETAIL
          <span className="mx-2 text-[#9b7847]">|</span>
          DISCOVER GOLDSUREE
        </span>
      </div>

      {/* Main navigation */}
      <motion.header
        animate={{
          backgroundColor: scrolled
            ? 'rgba(248,245,239,0.97)'
            : 'rgba(248,245,239,0)',
          boxShadow: scrolled
            ? '0 4px 24px rgba(32,26,20,0.06)'
            : '0 0px 0px rgba(32,26,20,0)',
        }}
        transition={{ duration: 0.3 }}
        className="fixed left-0 right-0 top-8 z-50 border-b border-[#b99a63]/20 backdrop-blur-md"
      >
        <div className="mx-auto flex h-[76px] max-w-[1600px] items-center justify-between px-4 sm:px-8 lg:px-14">

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center text-[#3b3023] transition-colors hover:text-[#9b7847] lg:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>

          {/* Desktop links */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-5 lg:flex xl:gap-7"
          >
            {navLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.06,
                  duration: 0.4,
                }}
                className="group relative py-2 text-[9px] font-medium uppercase tracking-[0.13em] text-[#51483d] transition-colors hover:text-[#9b773e] xl:text-[10px]"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 h-px w-0 bg-[#a8874f] transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </nav>

          {/* Center logo */}
          <a
            href="#home"
            onClick={closeMenu}
            aria-label="GoldSuree home"
            className="absolute left-1/2 -translate-x-1/2 text-center"
          >
            <span className="block whitespace-nowrap font-editorial text-[25px] font-medium tracking-[0.02em] text-[#D4AF37] sm:text-[31px]">
              GoldSuree
            </span>
            <span className="mt-[-2px] block whitespace-nowrap text-[7px] uppercase tracking-[0.3em] text-[#786751] sm:text-[8px] sm:tracking-[0.36em]">
              WE BUY GOLD
            </span>
          </a>

          {/* Right-side Contact Us button */}
          <div className="ml-auto">
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact GoldSuree on WhatsApp"
                className="group inline-flex h-10 items-center justify-center gap-2 border border-[#a8874f] bg-[#e6d2ad] px-3 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#302519] shadow-sm transition-all duration-300 hover:border-[#84602e] hover:bg-[#84602e] hover:text-white hover:shadow-md sm:px-5 sm:text-[10px] sm:tracking-[0.16em]"

            >
              <span>Contact Us</span>
              <ArrowUpRight
                size={15}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>
      </motion.header>

      {/* Mobile navigation overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close navigation overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 z-40 bg-black/35 lg:hidden"
            />

            <motion.nav
              aria-label="Mobile navigation"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut',
              }}
              className="fixed bottom-0 left-0 top-[108px] z-50 w-[82%] max-w-sm overflow-y-auto bg-[#f8f5ef] px-7 py-8 shadow-2xl lg:hidden"
            >
              <p className="mb-7 text-[10px] uppercase tracking-[0.25em] text-[#9b773e]">
                Explore GoldSuree
              </p>

              <div className="flex flex-col">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.06 }}
                    onClick={closeMenu}
                    className="border-b border-[#b99a63]/20 py-5 font-editorial text-xl text-[#33281e]"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>

              {/* WhatsApp contact in mobile menu */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="mt-8 flex items-center justify-between bg-[#302519] px-5 py-4 text-xs uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#84602e]"
              >
                Contact Us on WhatsApp
                <ArrowUpRight size={16} />
              </a>

              <p className="mt-10 text-xs leading-6 text-[#817361]">
                Crafted with tradition.
                <br />
                Designed for tomorrow.
              </p>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

