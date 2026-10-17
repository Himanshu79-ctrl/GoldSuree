
import { Link, useLocation, useNavigate } from 'react-router-dom'
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

const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Hello GoldSuree, I would like to enquire about old gold valuation.'
)}`

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [menuOpen])

  // Close the menu if the route changes.
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  function closeMenu() {
    setMenuOpen(false)
  }

  function handleSectionClick(event, href) {
    event.preventDefault()
    closeMenu()

    const scrollToSection = () => {
      const target = document.querySelector(href)

      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    if (location.pathname !== '/') {
      navigate('/')
      window.setTimeout(scrollToSection, 150)
    } else {
      scrollToSection()
    }
  }

  function renderNavLink(link, index, mobile = false) {
    const linkClass = mobile
      ? 'block w-full border-b border-[#b99a63]/20 py-5 font-editorial text-xl text-[#33281e] transition-colors hover:text-[#9b773e]'
      : 'group relative block whitespace-nowrap py-2 text-[9px] font-medium uppercase tracking-[0.09em] text-[#51483d] transition-colors hover:text-[#9b773e] 2xl:text-[10px] 2xl:tracking-[0.12em]'

    const content = (
      <>
        {link.label}
        {!mobile && (
          <span className="absolute bottom-0 left-0 h-px w-0 bg-[#a8874f] transition-all duration-300 group-hover:w-full" />
        )}
      </>
    )

    const animationProps = {
      initial: mobile ? { opacity: 0, x: -12 } : { opacity: 0, y: -6 },
      animate: { opacity: 1, x: 0, y: 0 },
      transition: { delay: index * 0.04, duration: 0.25 },
    }

    if (link.type === 'page') {
      return (
        <motion.div
          key={link.label}
          {...animationProps}
          className={mobile ? 'w-full' : 'shrink-0'}
        >
          <Link to={link.href} onClick={closeMenu} className={linkClass}>
            {content}
          </Link>
        </motion.div>
      )
    }

    return (
      <motion.a
        key={link.label}
        {...animationProps}
        href={link.href}
        onClick={(event) => handleSectionClick(event, link.href)}
        className={linkClass}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <>
      {/* Announcement bar */}
      <div className="relative z-[60] flex h-8 items-center justify-center bg-[#201a14] px-2 text-center text-[8px] tracking-[0.12em] text-[#e6d0a5] sm:px-3 sm:text-[10px] sm:tracking-[0.2em]">
        <span className="whitespace-nowrap">
          LUXURY IN EVERY DETAIL
          <span className="mx-2 text-[#9b7847]">|</span>
          DISCOVER GOLDSUREE
        </span>
      </div>

      {/* Main navbar */}
      <motion.header
        animate={{
          backgroundColor: scrolled
            ? 'rgba(248,245,239,0.98)'
            : 'rgba(248,245,239,0.94)',
          boxShadow: scrolled
            ? '0 4px 24px rgba(32,26,20,0.06)'
            : '0 0px 0px rgba(32,26,20,0)',
        }}
        transition={{ duration: 0.3 }}
        className="fixed left-0 right-0 top-8 z-50 border-b border-[#b99a63]/20 backdrop-blur-md"
      >
        <div className="mx-auto grid h-[68px] max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center px-3 sm:h-[76px] sm:px-6 lg:px-10 2xl:px-14">

          {/* Hamburger: mobile and tablet */}
          <div className="flex items-center justify-start min-[1200px]:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex h-10 w-10 items-center justify-center text-[#3b3023] hover:text-[#9b7847]"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>

          {/* Desktop links: one horizontal row */}
          <nav
            aria-label="Main navigation"
            className="hidden min-w-0 items-center justify-start gap-3 min-[1200px]:flex 2xl:gap-5"
          >
            {navLinks.map((link, index) =>
              renderNavLink(link, index)
            )}
          </nav>

          {/* Centered logo */}
          <Link
            to="/"
            onClick={closeMenu}
            aria-label="GoldSuree home"
            className="col-start-2 row-start-1 text-center"
          >
            <span className="block whitespace-nowrap font-editorial text-[22px] font-medium tracking-[0.02em] text-[#D4AF37] sm:text-[31px]">
              GoldSuree
            </span>
            <span className="mt-[-2px] block whitespace-nowrap text-[6px] uppercase tracking-[0.22em] text-[#786751] sm:text-[8px] sm:tracking-[0.36em]">
              WE BUY GOLD
            </span>
          </Link>

          {/* Contact button on the right */}
          <div className="col-start-3 row-start-1 flex justify-end">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact GoldSuree on WhatsApp"
              className="group inline-flex h-9 items-center justify-center gap-1 border border-[#a8874f] bg-[#e6d2ad] px-2 text-[8px] font-semibold uppercase tracking-[0.04em] text-[#302519] shadow-sm transition-all duration-300 hover:border-[#84602e] hover:bg-[#84602e] hover:text-white sm:h-10 sm:gap-2 sm:px-4 sm:text-[10px] sm:tracking-[0.12em] xl:px-5"
            >
              <span>Contact Us</span>
              <ArrowUpRight
                size={14}
                strokeWidth={1.5}
                className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>
      </motion.header>

      {/* Mobile and tablet slide-out menu */}
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
              className="fixed inset-0 z-[65] bg-black/35 min-[1200px]:hidden"
            />

            <motion.nav
              id="mobile-navigation"
              aria-label="Mobile navigation"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
              className="fixed bottom-0 left-0 top-[100px] z-[70] w-[82%] max-w-sm overflow-y-auto overscroll-contain bg-[#f8f5ef] px-6 py-7 shadow-2xl sm:top-[108px] sm:px-7 sm:py-8 min-[1200px]:hidden"
            >
              <p className="mb-5 text-[10px] uppercase tracking-[0.25em] text-[#9b773e]">
                Explore GoldSuree
              </p>

              <div className="flex flex-col">
                {navLinks.map((link, index) =>
                  renderNavLink(link, index, true)
                )}
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="mt-8 flex items-center justify-between gap-3 bg-[#302519] px-4 py-4 text-xs uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#84602e] sm:px-5"
              >
                <span>Contact Us on WhatsApp</span>
                <ArrowUpRight size={16} className="shrink-0" />
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
