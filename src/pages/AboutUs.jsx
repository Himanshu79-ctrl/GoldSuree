
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { MapPin, ArrowUpRight } from 'lucide-react'
import './AboutUs.css'

export default function AboutUs() {
  return (
    <>
      <Navbar />

      <main className="about-page">
        <section className="about-hero">
          <span className="about-eyebrow">ABOUT US</span>
          <h1>About GoldSuree</h1>
          <p>
            Helping you understand the value of your old gold,
            with a straightforward and transparent approach.
          </p>
        </section>

        <section className="about-content">
          <div className="about-content-label">WHO WE ARE</div>

          <div className="about-content-main">
            <h2>A simpler way to sell your old gold.</h2>

            <p>
              GoldSuree is an old-gold buying business based in
              Electronic City, Bengaluru. We help people sell
              their old, unused, unwanted or broken gold jewellery.
            </p>

            <p>
              We understand that knowing the value of your jewellery
              matters when deciding whether to sell it. Our aim is to
              make the process easier to understand by considering
              gold purity, weight and the applicable gold rate.
            </p>

            <p>
              We want every customer to have a clear understanding
              of the valuation before deciding whether to proceed
              with a sale.
            </p>

            <div className="about-content-divider" />

            <h2>Our approach</h2>

            <p>
              We believe selling gold should be a well-informed
              decision. We aim to explain the valuation clearly,
              answer your questions and give you the information
              you need to make your own choice.
            </p>
          </div>
        </section>

        <section className="about-location">
          <MapPin size={21} strokeWidth={1.6} />

          <div className="about-location-info">
            <h3>Visit GoldSuree</h3>
            <p>
              1st Floor, SVS Arcade, Ananth Nagar Road,
              Electronic City Phase 2, Bengaluru – 560100
            </p>
          </div>

          <a
            href="https://www.google.com/maps/search/?api=1&query=GoldSuree%2C%20SVS%20Arcade%2C%20Ananth%20Nagar%20Road%2C%20Electronic%20City%20Phase%202%2C%20Bengaluru%20560100"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Find GoldSuree on Google Maps"
          >
            Directions <ArrowUpRight size={16} />
          </a>
        </section>
      </main>

      <Footer />
    </>
  )
}
