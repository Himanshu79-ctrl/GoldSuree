import Navbar from '../components/Navbar'
import SectionTransition from '../components/SectionTransition'
import HeroSection from '../components/HeroSection'
import WhatGoldWeBuy from '../components/WhatGoldWeBuy'
import GoldPurityValuation from '../components/GoldPurityValuation'
import GoldMarquee from '../components/GoldMarquee'
import GoldSellingSteps from '../components/GoldSellingSteps'
import AboutGoldSuree from '../components/AboutGoldSuree'
// import WhyGoldSuree from '../components/WhyGoldSuree'
import FAQSection from '../components/FAQSection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <GoldMarquee />
      <GoldSellingSteps />
      <WhatGoldWeBuy />
      <GoldPurityValuation />
      <AboutGoldSuree />
      <FAQSection />
      <ContactSection />
      <SectionTransition from="#f8f5ef" to="#211a12" />
      <Footer />
    </main>
  )
}