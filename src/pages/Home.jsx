import Navbar from '../components/Navbar'
import SectionTransition from '../components/SectionTransition'
import HeroSection from '../components/HeroSection'
import GoldMarquee from '../components/GoldMarquee'
import GoldSellingSteps from '../components/GoldSellingSteps'
import AboutGoldSuree from '../components/AboutGoldSuree'
import WhyGoldSuree from '../components/WhyGoldSuree'
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
      {/* <SectionTransition from="#f8f5ef" to="#f8f5ef" /> */}
      <AboutGoldSuree />
      <SectionTransition from="#eee7db" to="#292117" />
      <WhyGoldSuree />
      <SectionTransition from="#292117" to="#f8f5ef" />
      <FAQSection />
      <SectionTransition from="#f8f5ef" to="#f8f5ef" />
      <ContactSection />
      <SectionTransition from="#f8f5ef" to="#211a12" />
      <Footer />
    </main>
  )
}