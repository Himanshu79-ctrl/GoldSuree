
import { motion, useReducedMotion } from 'framer-motion'
import './AboutGoldSuree.css'

const photos = [
  {
    number: '01',
    title: 'The Entrance',
    image:
      '/The Entrance.jpeg',
    className: 'gs-photo-main',
  },
  {
    number: '02',
    title: 'Inside GoldSuree',
    image:
      '/Gemini_Generated_Image_cclh2tcclh2tcclh.png',
    className: 'gs-photo-interior',
  },
  {
    number: '03',
    title: 'Our Space',
    image:
      '/Every detail.jpeg',
    className: 'gs-photo-space',
  },
  {
    number: '04',
    title: 'Precision & Care',
    image:
      '/precision & care.jpeg',
    className: 'gs-photo-care',
  },
  {
    number: '05',
    title: 'Every Detail',
    image:
      '/our space.jpeg',
    className: 'gs-photo-detail',
  },
  {
    number: '06',
    title: 'A Welcoming Space',
    image:
      '/Inside goldsuree.jpeg',
    className: 'gs-photo-welcome',
  },
]

function GalleryPhoto({ photo, index, reducedMotion }) {
  return (
    <motion.figure
      className={`gs-photo ${photo.className}`}
      initial={reducedMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reducedMotion ? 0 : 0.65,
        delay: reducedMotion ? 0 : index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="gs-photo-image">
        <img
          src={photo.image}
          alt={`${photo.title} — placeholder photograph`}
          loading="lazy"
        />

        <div className="gs-photo-overlay" />

        <span className="gs-photo-number">{photo.number}</span>

        <figcaption className="gs-photo-caption">
          <span>{photo.title}</span>
          <span className="gs-photo-arrow" aria-hidden="true">↗</span>
        </figcaption>
      </div>
    </motion.figure>
  )
}

export default function AboutGoldSuree() {
  const reducedMotion = useReducedMotion()

  return (
    <section id="about-goldsuree" className="gs-royal-gallery">
      <div className="gs-gallery-container">
        <motion.header
          className="gs-gallery-heading"
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: reducedMotion ? 0 : 0.7 }}
        >
          <div className="gs-gallery-eyebrow">
            <span />
            A CLOSER LOOK AT GOLDSUREE
            <span />
          </div>

          <h2>
            An experience built on
            <br />
            <em>trust & transparency.</em>
          </h2>

          <p>
            Take a glimpse into our space, where every detail is
            considered and every decision remains yours.
          </p>
        </motion.header>

        <motion.div
          className="gs-royal-frame"
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{
            duration: reducedMotion ? 0 : 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <span className="gs-frame-corner gs-corner-tl" />
          <span className="gs-frame-corner gs-corner-tr" />
          <span className="gs-frame-corner gs-corner-bl" />
          <span className="gs-frame-corner gs-corner-br" />

          <div className="gs-frame-topline">
            <span>GOLDSUREE</span>
            <span className="gs-frame-ornament">✦</span>
            <span>OUR WORLD, IN DETAIL</span>
          </div>

          <div className="gs-photo-grid">
            {photos.map((photo, index) => (
              <GalleryPhoto
                key={photo.number}
                photo={photo}
                index={index}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>

          <div className="gs-frame-bottomline">
            <span>CLARITY IN EVERY STEP</span>
            <span>✧</span>
            <span>YOUR GOLD. YOUR CHOICE.</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
