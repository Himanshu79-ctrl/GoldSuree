import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, ArrowUpRight, Phone } from "lucide-react";

const WHATSAPP_NUMBER = "8981298596";
const LOGO_PATH = "/images/goldsuree-logo.jpeg";
const ANNOUNCEMENT_HEIGHT = 32;

const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hello GoldSuree, I would like to enquire about old gold valuation.",
)}`;

const NAV_LINKS = [
  { label: "Home", href: "#home", id: "home" },
  { label: "How It Works", href: "#how-it-works", id: "how-it-works" },
  { label: "What Gold We Buy", href: "#what-we-buy", id: "what-we-buy" },
  {
    label: "Gold Purity & Valuation",
    href: "#gold-purity-valuation",
    id: "gold-purity-valuation",
  },
  { label: "About Us", href: "/about-us", type: "page" },
  { label: "Our Showroom", href: "#about-goldsuree", id: "about-goldsuree" },
  { label: "FAQs", href: "#faqs", id: "faqs" },
  { label: "Contact Us", href: "#contact", id: "contact" },
];

// Keep desktop navigation short and spacious.
const DESKTOP_NAV_LINKS = [
  NAV_LINKS[0],
  NAV_LINKS[1],
  NAV_LINKS[5],
  NAV_LINKS[4],
];

const SECTION_IDS = NAV_LINKS.filter((link) => link.id).map((link) => link.id);

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8f6414] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8f5ef]";

function NavItem({
  link,
  active,
  mobile = false,
  onSectionClick,
  onPageClick,
}) {
  const current = active
    ? link.type === "page"
      ? "page"
      : "location"
    : undefined;

  const className = mobile
    ? `flex min-h-[52px] w-full items-center justify-between gap-3 border-b border-[#b99a63]/25 py-3 font-editorial text-lg transition-colors ${focusRing} ${
        active ? "text-[#8f6414]" : "text-[#33281e] hover:text-[#9b773e]"
      }`
    : `inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full px-3 py-2.5 text-[10px] uppercase tracking-[0.09em] transition-colors 2xl:px-4 2xl:text-[11px] ${focusRing} ${
        active
          ? "bg-[#f0e3bf] font-bold text-[#6f4c0e]"
          : "font-medium text-[#2b2418] hover:bg-[#a97f12]/[0.12]"
      }`;

  const content = mobile ? (
    <>
      <span>{link.label}</span>
      {active && (
        <span
          className="h-2 w-2 shrink-0 rounded-full bg-[#a97f12]"
          aria-hidden="true"
        />
      )}
    </>
  ) : (
    link.label
  );

  if (link.type === "page") {
    return (
      <Link
        to={link.href}
        onClick={onPageClick}
        aria-current={current}
        className={className}
      >
        {content}
      </Link>
    );
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
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");

  const location = useLocation();
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  const headerRef = useRef(null);
  const hamburgerRef = useRef(null);
  const closeButtonRef = useRef(null);
  const pendingHash = useRef(null);
  const wasOpen = useRef(false);

  const isHome = location.pathname === "/";

  // Announcement bar scrolls away; navbar follows it and then sticks at top.
  // Desktop: navbar announcement bar ke neeche.
  // Mobile: announcement bar hidden hai, isliye navbar top par rahega.
  useEffect(() => {
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const isSmallScreen = window.matchMedia("(max-width: 639px)").matches;

      setScrolled(y > 40);

      if (headerRef.current) {
        headerRef.current.style.top = isSmallScreen
          ? "0px"
          : `${Math.max(0, ANNOUNCEMENT_HEIGHT - y)}px`;
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Track the active homepage section.
  useEffect(() => {
    if (!isHome) return;

    const sections = SECTION_IDS.map((id) =>
      document.getElementById(id),
    ).filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isHome, location.pathname]);

  // Lock page scrolling while the mobile drawer is open.
  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  // Manage focus when opening and closing the mobile drawer.
  useEffect(() => {
    if (menuOpen) {
      wasOpen.current = true;
      closeButtonRef.current?.focus();
    } else if (wasOpen.current) {
      wasOpen.current = false;
      hamburgerRef.current?.focus();
    }
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Return to a homepage section after navigating from another page.
  useEffect(() => {
    if (!isHome || !pendingHash.current) return;

    const hash = pendingHash.current;
    pendingHash.current = null;

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => scrollToHash(hash));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHome]);

  // Close drawer when entering desktop breakpoint.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1200px)");

    const handleChange = (event) => {
      if (event.matches) setMenuOpen(false);
    };

    query.addEventListener("change", handleChange);

    return () => query.removeEventListener("change", handleChange);
  }, []);

  function scrollToHash(hash) {
    const behavior = reduceMotion ? "auto" : "smooth";
    const target = document.querySelector(hash);

    if (target) {
      target.scrollIntoView({ behavior, block: "start" });
    } else if (hash === "#home") {
      window.scrollTo({ top: 0, behavior });
    }
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  function handleSectionClick(event, href) {
    event.preventDefault();
    closeMenu();

    if (!isHome) {
      pendingHash.current = href;
      navigate("/");
    } else {
      scrollToHash(href);
    }
  }

  function isActive(link) {
    if (link.type === "page") {
      return location.pathname === link.href;
    }

    return isHome && activeId === link.id;
  }

  return (
    <>
      {/* Announcement bar */}
      <div className="relative z-[60] hidden h-8 grid-cols-[1fr_auto_1fr] items-center bg-[#302519] px-3 text-[#e6d0a5] sm:grid sm:px-6 min-[1200px]:px-10">
        <a
          href="tel:+918981298596"
          aria-label="Call GoldSuree at 8981298596"
          className="inline-flex w-fit items-center gap-2 justify-self-start whitespace-nowrap rounded-sm text-[10px] font-medium transition-colors hover:text-[#fff0b5] sm:text-[11px]"
        >
          <Phone size={12} strokeWidth={2} aria-hidden="true" />
          <span>8981298596</span>
        </a>

        <span className="whitespace-nowrap text-center text-[8px] tracking-[0.08em] sm:text-[10px] sm:tracking-[0.2em]">
          LUXURY IN EVERY DETAIL
          <span className="mx-1.5 text-[#9b7847] sm:mx-2" aria-hidden="true">
            |
          </span>
          DISCOVER GOLDSUREE
        </span>

        <span aria-hidden="true" />
      </div>

      {/* Main navbar: logo always left, navigation always right */}
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-8 z-50 border-b backdrop-blur-xl transition-[background-color,box-shadow,border-color] duration-300 ${
          scrolled
            ? "border-[#a97f12]/25 bg-[#f8f5ef]/90 shadow-[0_8px_28px_rgba(111,76,14,0.10)]"
            : "border-[#b99a63]/20 bg-[#f8f5ef]/95"
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1600px] items-center justify-between gap-3 px-4 transition-[height] duration-300 sm:px-6 min-[1200px]:gap-6 min-[1200px]:px-10 2xl:px-14 ${
            scrolled
              ? "h-16 sm:h-[68px] min-[1200px]:h-[76px]"
              : "h-[68px] sm:h-[76px] min-[1200px]:h-[88px]"
          }`}
        >
          {/* Left: complete logo and brand name, always horizontal */}
          <Link
            to="/"
            onClick={closeMenu}
            aria-label="GoldSuree home"
            className={`flex min-w-0 shrink items-center gap-2 rounded-md ${focusRing}`}
          >
            <span className="block h-9 w-9 shrink-0 overflow-hidden rounded-full border border-[#c7a24e]/60 bg-[#fffaf0] shadow-sm sm:h-10 sm:w-10">
              <img
                src={LOGO_PATH}
                alt=""
                aria-hidden="true"
                className="h-full w-full object-contain"
              />
            </span>

            <span className="flex flex-col items-center">
  <span className="whitespace-nowrap bg-gradient-to-b from-[#E8BD50] via-[#C99525] to-[#80520C] bg-clip-text font-editorial text-[22px] font-medium leading-none tracking-[0.01em] text-transparent sm:text-[27px] min-[1200px]:text-[30px]">
    GoldSuree
  </span>

  <span className="mt-1 text-[7px] font-semibold uppercase tracking-[0.28em] text-[#80602c] sm:text-[8px]">
    WE BUY GOLD
  </span>
</span>
          </Link>

          {/* Right: desktop links and WhatsApp CTA */}
          <div className="flex min-w-0 shrink-0 items-center justify-end gap-2 sm:gap-3 min-[1200px]:gap-4">
            <nav
              aria-label="Main navigation"
              className="hidden items-center gap-0.5 min-[1200px]:flex 2xl:gap-1"
            >
              {DESKTOP_NAV_LINKS.map((link) => (
                <NavItem
                  key={link.label}
                  link={link}
                  active={isActive(link)}
                  onSectionClick={handleSectionClick}
                  onPageClick={closeMenu}
                />
              ))}
            </nav>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact GoldSuree on WhatsApp"
              className={`group hidden h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-[#C99525] bg-gradient-to-b from-[#E8BD50] via-[#C99525] to-[#80520C] px-3.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#fffaf1] shadow-[0_7px_18px_#8b65241c] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#E8BD50] hover:from-[#F0CC70] hover:via-[#B88620] hover:to-[#684008] hover:shadow-[0_10px_24px_#8b652442] sm:px-4 sm:text-[11px] min-[1200px]:h-11 min-[1200px]:px-5 min-[1200px]:inline-flex ${focusRing} `}
            >
              <span className="sm:hidden">Contact</span>
              <span className="hidden sm:inline">Contact Us</span>
              <span className="hidden h-7 w-7 place-items-center rounded-full bg-white/20 sm:grid">
                <ArrowUpRight
                  size={15}
                  strokeWidth={1.8}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            </a>

            {/* Hamburger for mobile and tablet */}
            <button
              ref={hamburgerRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className={`flex h-11 w-11 shrink-0 items-center justify-center
    rounded-full text-[#302519] hover:bg-[#f0e3bf]
    min-[1200px]:hidden ${focusRing}`}
            >
              {menuOpen ? (
                <X size={25} strokeWidth={2} />
              ) : (
                <Menu size={25} strokeWidth={2} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile navigation drawer */}
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
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                duration: reduceMotion ? 0 : 0.28,
                ease: "easeInOut",
              }}
              className="fixed inset-y-0 left-0 z-[70] flex w-[86%] max-w-sm flex-col bg-[#f8f5ef] shadow-2xl min-[1200px]:hidden"
            >
              {/* Drawer brand */}
              <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-[#b99a63]/25 px-5">
                <Link
                  to="/"
                  onClick={closeMenu}
                  aria-label="GoldSuree Home"
                  className={`flex min-w-0 shrink-0 items-center gap-2 rounded-md ${focusRing}`}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#c7a24e]/50 bg-[#fffaf0] sm:h-10 sm:w-10">
                    <img
                      src={LOGO_PATH}
                      alt="GoldSuree"
                      className="h-full w-full object-contain"
                    />
                  </span>

                  <span className="whitespace-nowrap bg-gradient-to-b from-[#E8BD50] via-[#C99525] to-[#80520C] bg-clip-text font-editorial text-[22px] font-medium leading-none tracking-[0.01em] text-transparent sm:text-[27px]">
                      GoldSuree
                  </span>
                </Link>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeMenu}
                  aria-label="Close menu"
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f0e3bf] text-[#6f4c0e] transition-colors hover:bg-[#e6d2ad] ${focusRing}`}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Requested mobile links, in the exact order */}
              <nav
                aria-label="Mobile navigation"
                className="flex-1 overflow-y-auto overscroll-contain px-6 py-3"
              >
                {NAV_LINKS.map((link, index) => (
                  <motion.div
                    key={link.label}
                    initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: reduceMotion ? 0 : 0.05 + index * 0.035,
                      duration: 0.22,
                    }}
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

              {/* WhatsApp CTA pinned to the bottom */}
              <div className="shrink-0 border-t border-[#b99a63]/20 px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className={`group flex min-h-[52px] items-center justify-center gap-3 rounded-full border border-[#C99525] bg-gradient-to-b from-[#E8BD50] via-[#C99525] to-[#80520C] px-5 text-xs font-semibold uppercase tracking-[0.1em] text-[#fffaf1] shadow-[0_7px_18px_#8b65241c] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#E8BD50] hover:from-[#F0CC70] hover:via-[#B88620] hover:to-[#684008] ${focusRing}`}
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
  );
}
