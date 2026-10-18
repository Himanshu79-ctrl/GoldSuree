import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Menu, X, ArrowUpRight, Calculator , Phone} from 'lucide-react'

const WHATSAPP_NUMBER = '918981298596'
const LOGO_PATH = '/images/goldsuree-logo.jpeg'
const ANNOUNCEMENT_HEIGHT = 32 // px, matches h-8 on the announcement bar

const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Hello GoldSuree, I would like to enquire about old gold valuation.'
)}`

const NAV_LINKS = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'How It Works', href: '#how-it-works', id: 'how-it-works' },
  { label: 'Gold Calculator', href: '#gold-calculator', id: 'gold-calculator', icon: Calculator },
  { label: 'Why GoldSuree', href: '#why-goldsuree', id: 'why-goldsuree' },
  { label: 'About Us', href: '/about-us', type: 'page' },
]

// Split navigation: 3 links left of the logo, 2 links + CTA right of it.
const LEFT_LINKS = NAV_LINKS.slice(0, 3)
const RIGHT_LINKS = NAV_LINKS.slice(3)
const SECTION_IDS = NAV_LINKS.filter((link) => link.id).map((link) => link.id)

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8f6414] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8f5ef]'

/* ------------------------------------------------------------------ */
/* Single nav link (desktop pill or mobile row)                        */
/* ------------------------------------------------------------------ */
function NavItem({ link, active, mobile, onSectionClick, onPageClick }) {
  const Icon = link.icon
  const current = active ? (link.type === 'page' ? 'page' : 'location') : undefined

  const desktopClass = `inline-flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-2.5 text-[11px] uppercase tracking-[0.1em] transition-colors 2xl:px-4 2xl:text-xs ${focusRing} ${
    active
      ? 'bg-[#f0e3bf] font-bold text-[#6f4c0e]'
      : 'font-medium text-[#2b2418] hover:bg-[#a97f12]/[0.12]'
  }`

  const mobileClass = `flex min-h-[56px] w-full items-center justify-between gap-3 border-b border-[#b99a63]/25 py-4 font-editorial text-xl transition-colors ${focusRing} ${
    active ? 'text-[#8f6414]' : 'text-[#33281e] hover:text-[#9b773e]'
  }`

  const className = mobile ? mobileClass : desktopClass

  const content = mobile ? (
    <>
      <span className="flex items-center gap-3">
        {Icon && <Icon size={18} strokeWidth={1.6} className="text-[#a97f12]" aria-hidden="true" />}
        {link.label}
      </span>
      {active && <span className="h-2 w-2 rounded-full bg-[#a97f12]" aria-hidden="true" />}
    </>
  ) : (
    <>
      {Icon && <Icon size={15} strokeWidth={1.7} className="shrink-0 text-[#a97f12]" aria-hidden="true" />}
      {link.label}
    </>
  )

  if (link.type === 'page') {
    return (
      <Link to={link.href} onClick={onPageClick} aria-current={current} className={className}>
        {content}
      </Link>
    )
  }

  return (
    <a
      href={link.href}
      onClick={(event) => onSectionClick(event, link.href)}
      aria-current={current}
      className={className}
    >
      {content}
    </a>
  )
}

/* ------------------------------------------------------------------ */
/* Navbar                                                              */
/* ------------------------------------------------------------------ */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeId, setActiveId] = useState('home')

  const location = useLocation()
  const navigate = useNavigate()
  const reduceMotion = useReducedMotion()

  const headerRef = useRef(null)
  const hamburgerRef = useRef(null)
  const closeButtonRef = useRef(null)
  const pendingHash = useRef(null)
  const wasOpen = useRef(false)

  const isHome = location.pathname === '/'

  /* Scroll: compact state + header follows the announcement bar as it scrolls away */
  useEffect(() => {
    let ticking = false

    const update = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      if (headerRef.current) {
        headerRef.current.style.top = `${Math.max(0, ANNOUNCEMENT_HEIGHT - y)}px`
      }
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        window.requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Scroll spy: highlight the section currently in view on the home page */
  useEffect(() => {
    if (!isHome) return

    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean)
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-35% 0px -55% 0px' }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [isHome])

  /* Mobile drawer: lock body scroll + Escape to close */
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

  /* Keyboard focus: into the drawer on open, back to the hamburger on close */
  useEffect(() => {
    if (menuOpen) {
      wasOpen.current = true
      closeButtonRef.current?.focus()
    } else if (wasOpen.current) {
      wasOpen.current = false
      hamburgerRef.current?.focus()
    }
  }, [menuOpen])

  /* Close the drawer on route change and when the viewport becomes desktop */
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1200px)')
    const handleChange = (event) => {
      if (event.matches) setMenuOpen(false)
    }
    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [])

  /* Scroll to a section after navigating back to "/" from another page */
  useEffect(() => {
    if (isHome && pendingHash.current) {
      const hash = pendingHash.current
      pendingHash.current = null
      window.requestAnimationFrame(() => window.requestAnimationFrame(() => scrollToHash(hash)))
    }
  }, [isHome]) // eslint-disable-line react-hooks/exhaustive-deps

  function scrollToHash(hash) {
    const behavior = reduceMotion ? 'auto' : 'smooth'
    const target = document.querySelector(hash)

    if (target) {
      target.scrollIntoView({ behavior, block: 'start' })
    } else if (hash === '#home') {
      window.scrollTo({ top: 0, behavior })
    }
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  function handleSectionClick(event, href) {
    event.preventDefault()
    closeMenu()

    if (!isHome) {
      pendingHash.current = href
      navigate('/')
    } else {
      scrollToHash(href)
    }
  }

  const isActive = (link) =>
    link.type === 'page' ? location.pathname === link.href : isHome && activeId === link.id

  const renderDesktopLink = (link) => (
    <NavItem
      key={link.label}
      link={link}
      active={isActive(link)}
      onSectionClick={handleSectionClick}
      onPageClick={closeMenu}
    />
  )

  return (
    <>
      {/* Announcement bar (scrolls away with the page) */}
      <div className="relative z-[60] grid h-8 grid-cols-[1fr_auto_1fr] items-center bg-[#302519] px-3 text-[#e6d0a5] sm:px-6 min-[1200px]:px-10">
        
        {/* LEFT: Phone contact */}
        <a
          href="tel:+918981298596"
          aria-label="Call GoldSuree at 8981298596"
          className="inline-flex w-fit items-center gap-1.5 justify-self-start whitespace-nowrap rounded-sm text-[10px] font-medium tracking-normal transition-colors hover:text-[#fff0b5] sm:gap-2 sm:text-[11px]"
        >
          <Phone
            size={12}
            strokeWidth={2}
            aria-hidden="true"
          />
          <span>8981298596</span>
        </a>
        
        {/* CENTER: Existing announcement — unchanged */}
        <span className="whitespace-nowrap text-center text-[8px] tracking-[0.08em] sm:text-[10px] sm:tracking-[0.2em]">
          LUXURY IN EVERY DETAIL
          <span className="mx-1.5 text-[#9b7847] sm:mx-2" aria-hidden="true">|</span>
          DISCOVER GOLDSUREE
        </span>
        
        {/* RIGHT: Balancing space */}
        <span aria-hidden="true" />
      </div>


      {/* Main navbar */}
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-8 z-50 border-b backdrop-blur-xl transition-[background-color,box-shadow,border-color] duration-300 ${
          scrolled
            ? 'border-[#a97f12]/25 bg-[#f8f5ef]/85 shadow-[0_8px_28px_rgba(111,76,14,0.10)]'
            : 'border-[#b99a63]/20 bg-[#f8f5ef]/95'
        }`}
      >
        <div
          className={`mx-auto grid max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center gap-2 px-3 transition-[height] duration-300 sm:gap-4 sm:px-6 min-[1200px]:gap-6 min-[1200px]:px-10 2xl:px-14 ${
            scrolled
              ? 'h-16 sm:h-[68px] min-[1200px]:h-[76px]'
              : 'h-[68px] sm:h-[76px] min-[1200px]:h-[116px]'
          }`}
        >
          {/* LEFT: hamburger (mobile/tablet) or first 3 links (desktop) */}
          <div className="col-start-1 flex min-w-0 items-center justify-start">
            <button
              ref={hamburgerRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className={`-ml-1 flex h-11 w-11 items-center justify-center rounded-full text-[#3b3023] transition-colors hover:bg-[#f0e3bf] min-[1200px]:hidden ${focusRing}`}
            >
              <Menu size={22} />
            </button>

            <nav
              aria-label="Main navigation"
              className="hidden items-center gap-0.5 min-[1200px]:flex 2xl:gap-1"
            >
              {LEFT_LINKS.map(renderDesktopLink)}
            </nav>
          </div>

          {/* CENTER: logo. Stacked on desktop at the top, inline once scrolled. */}
          <Link
            to="/"
            onClick={closeMenu}
            aria-label="GoldSuree home"
            className={`col-start-2 flex min-w-0 items-center justify-center gap-2.5 rounded-md text-center ${focusRing} ${
              scrolled ? '' : 'min-[1200px]:flex-col min-[1200px]:gap-1'
            }`}
          >
            <span
              className={`hidden shrink-0 overflow-hidden rounded-full border border-[#c7a24e]/60 bg-[#fffaf0] shadow-sm transition-all duration-300 min-[1200px]:block ${
                scrolled ? 'h-8 w-8' : 'h-[42px] w-[42px]'
              }`}
            >
              <img
                src={LOGO_PATH}
                alt=""
                aria-hidden="true"
                className="h-full w-full object-contain"
              />
            </span>

            <span className="flex flex-col items-center">
              
            <span
              className={`block whitespace-nowrap font-editorial font-medium leading-none tracking-[0.02em] bg-gradient-to-b from-[#E8BD50] via-[#C99525] to-[#80520C] bg-clip-text text-transparent transition-[font-size] duration-300 text-[22px] sm:text-[28px] ${
                scrolled ? 'min-[1200px]:text-[26px]' : 'min-[1200px]:text-[34px]'
              }`}
            >
              GoldSuree
            </span>

              {/* <span
                className={`mt-1 block whitespace-nowrap pl-[0.3em] text-[8px] font-semibold uppercase tracking-[0.3em] text-[#6b5a3a] sm:text-[9px] min-[1200px]:text-[10px] min-[1200px]:tracking-[0.36em] ${
                  scrolled ? 'min-[1200px]:hidden' : ''
                }`}
              >
                We Buy Gold
              </span> */}
            </span>
          </Link>

          {/* RIGHT: last 2 links (desktop) + WhatsApp CTA */}
          <div className="col-start-3 flex min-w-0 items-center justify-end gap-1 min-[1200px]:gap-3">
            <nav
              aria-label="Secondary navigation"
              className="hidden items-center gap-0.5 min-[1200px]:flex 2xl:gap-1"
            >
              {RIGHT_LINKS.map(renderDesktopLink)}
            </nav>

            
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact GoldSuree on WhatsApp"
              className={`group inline-flex h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-[#C99525] bg-gradient-to-b from-[#E8BD50] via-[#C99525] to-[#80520C] pl-3.5 pr-3.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#fffaf1] shadow-[0_7px_18px_#8b65241c] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#E8BD50] hover:from-[#F0CC70] hover:via-[#B88620] hover:to-[#684008] hover:shadow-[0_10px_24px_#8b652442] sm:pl-5 sm:pr-1.5 sm:text-[11px] sm:tracking-[0.12em] min-[1200px]:pl-6 2xl:text-xs ${focusRing} ${
                scrolled ? '' : 'min-[1200px]:h-12'
              }`}
            >
              <span className="sm:hidden">Contact</span>
              <span className="hidden sm:inline">Contact Us</span>
              <span className="hidden h-8 w-8 place-items-center rounded-full bg-white/20 sm:grid">
                <ArrowUpRight
                  size={15}
                  strokeWidth={1.8}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            </a>

          </div>
        </div>
      </header>

      {/* Mobile / tablet drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="overlay"
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
              onClick={closeMenu}
              className="fixed inset-0 z-[65] bg-[#201a14]/45 min-[1200px]:hidden"
            />

            <motion.aside
              key="drawer"
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: reduceMotion ? 0 : 0.28, ease: 'easeInOut' }}
              className="fixed inset-y-0 left-0 z-[70] flex w-[86%] max-w-sm flex-col bg-[#f8f5ef] shadow-2xl min-[1200px]:hidden"
            >
              {/* Drawer header: brand + close */}
              <div className="flex h-[68px] shrink-0 items-center justify-between border-b border-[#b99a63]/25 px-5 sm:h-[76px]">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-[#c7a24e]/50 bg-[#fffaf0] shadow-sm">
                    <img
                      src={LOGO_PATH}
                      alt="GoldSuree, we buy gold"
                      className="h-full w-full object-contain"
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-editorial text-xl leading-none text-[#a97f12]">
                      GoldSuree
                    </span>
                    <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.28em] text-[#6b5a3a]">
                      We Buy Gold
                    </span>
                  </span>
                </div>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeMenu}
                  aria-label="Close menu"
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f0e3bf] text-[#6f4c0e] transition-colors hover:bg-[#e6d2ad] ${focusRing}`}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Links */}
              <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto overscroll-contain px-6 py-3">
                {NAV_LINKS.map((link, index) => (
                  <motion.div
                    key={link.label}
                    initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: reduceMotion ? 0 : 0.08 + index * 0.04, duration: 0.25 }}
                  >
                    <NavItem
                      link={link}
                      mobile
                      active={isActive(link)}
                      onSectionClick={handleSectionClick}
                      onPageClick={closeMenu}
                    />
                  </motion.div>
                ))}
              </nav>

              {/* CTA pinned to the bottom, respects the iPhone home-indicator area */}
              <div className="shrink-0 px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4">
                
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className={`group flex min-h-[52px] items-center justify-center gap-3 rounded-full border border-[#C99525] bg-gradient-to-b from-[#E8BD50] via-[#C99525] to-[#80520C] px-5 text-xs font-semibold uppercase tracking-[0.12em] text-[#fffaf1] shadow-[0_7px_18px_#8b65241c] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#E8BD50] hover:from-[#F0CC70] hover:via-[#B88620] hover:to-[#684008] hover:shadow-[0_10px_24px_#8b652442] ${focusRing}`}
                >
                  Contact Us on WhatsApp
                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.8}
                    aria-hidden="true"
                    className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>

              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}