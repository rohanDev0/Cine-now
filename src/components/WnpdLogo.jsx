export default function WnpdLogo() {
  return (
    <div className="wnpd-logo" aria-label="WNPD">
      <svg
        viewBox="0 0 150 90"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
      >
        {/* Antennas */}
        <path
          d="M75 14 L61 3 M75 14 L89 3"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* Antenna tips */}
        <circle cx="60" cy="3" r="3" fill="currentColor" />
        <circle cx="90" cy="3" r="3" fill="currentColor" />

        {/* TV body */}
        <rect
          x="18"
          y="13"
          width="114"
          height="68"
          rx="13"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
        />

        {/* Screen */}
        <rect
          x="27"
          y="23"
          width="91"
          height="50"
          rx="7"
          fill="currentColor"
          opacity="0.08"
        />

        {/* WNPD lettering */}
        <text
          x="73"
          y="53"
          textAnchor="middle"
          fontFamily="Arial Black, Arial, sans-serif"
          fontSize="22"
          fontWeight="900"
          letterSpacing="1"
          fill="currentColor"
        >
          WNPD
        </text>

        {/* Play button */}
        <path
          d="M103 40 L103 51 L112 45.5 Z"
          fill="#19e6c1"
        />

        {/* TV controls */}
        <circle cx="123" cy="38" r="2.5" fill="currentColor" />
        <circle cx="123" cy="48" r="2.5" fill="currentColor" />
      </svg>
    </div>
  );
}
