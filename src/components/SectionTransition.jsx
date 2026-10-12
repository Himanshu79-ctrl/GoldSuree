
export default function SectionTransition({
  from = '#f8f5ef',
  to = '#302519',
}) {
  return (
    <div
      aria-hidden="true"
      className="relative z-10 -mt-px w-full overflow-hidden leading-[0]"
      style={{ backgroundColor: from }}
    >
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="block h-[45px] w-full align-bottom sm:h-[65px] lg:h-[85px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Inverted organic curve */}
        <path
          d="M0,70 C220,10 430,95 720,52 C1000,10 1200,15 1440,70 L1440,100 H0 Z"
          fill={to}
        />

        {/* Subtle gold curve */}
        <path
          d="M0,70 C220,10 430,95 720,52 C1000,10 1200,15 1440,70"
          fill="none"
          stroke="#c5a16b"
          strokeOpacity="0.65"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  )
}

