const marqueeItems = [
  'Transparent Gold Valuation',
  'Accurate Weighing',
  'Purity Assessment',
  'Your Gold, Your Decision',
]

export default function GoldMarquee() {
  return (
    <div
      className="gold-marquee"
      aria-label="Transparent gold valuation, accurate weighing, purity assessment, your decision"
    >
      <div className="gold-marquee__track" aria-hidden="true">
        {[0, 1, 2, 3].map((copy) => (
          <div className="gold-marquee__group" key={copy}>
            {marqueeItems.map((item) => (
              <span className="gold-marquee__item" key={item}>
                <span className="gold-marquee__star">✦</span>
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

