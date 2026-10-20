import { useId } from 'react'

// Lens centers on the island: two stacked on the left, one to the right, like the Pro triple camera.
const LENSES: [number, number][] = [
  [66, 64],
  [66, 140],
  [142, 102],
]

/**
 * Back of a Pro-style iPhone with a full-width camera plateau, drawn as a vector so it stays sharp at any size
 * (4K included) for ~3 KB and no image request. No Apple logo: the trademark stays out of decorative art.
 * The sheen and float are CSS transforms on the wrapper (home.css), so they run on the compositor.
 */
export function PhoneArt({ className = '' }: { className?: string }) {
  const id = useId().replace(/:/g, '')
  const g = (name: string) => `${name}-${id}`

  return (
    <svg className={`phone-art ${className}`} viewBox="0 0 300 620" role="img" aria-label="iPhone" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={g('body')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffb27a" />
          <stop offset="0.38" stopColor="#f08a3c" />
          <stop offset="0.72" stopColor="#d9692a" />
          <stop offset="1" stopColor="#a94b17" />
        </linearGradient>
        <linearGradient id={g('frame')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffd2ad" />
          <stop offset="0.5" stopColor="#c45d22" />
          <stop offset="1" stopColor="#ffc699" />
        </linearGradient>
        <linearGradient id={g('plateau')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffc08f" />
          <stop offset="1" stopColor="#e5783a" />
        </linearGradient>
        <radialGradient id={g('ring')} cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#5a5a5e" />
          <stop offset="0.6" stopColor="#232326" />
          <stop offset="1" stopColor="#0d0d0f" />
        </radialGradient>
        <radialGradient id={g('glass')} cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#2b3a5c" />
          <stop offset="0.45" stopColor="#0c1120" />
          <stop offset="1" stopColor="#020205" />
        </radialGradient>
        <linearGradient id={g('sheen')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.28" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id={g('clip')}>
          <rect x="6" y="6" width="288" height="608" rx="52" />
        </clipPath>
      </defs>

      {/* frame and back glass */}
      <rect x="2" y="2" width="296" height="616" rx="56" fill={`url(#${g('frame')})`} />
      <rect x="6" y="6" width="288" height="608" rx="52" fill={`url(#${g('body')})`} />
      <rect x="7.5" y="7.5" width="285" height="605" rx="50.5" fill="none" stroke="#fff" strokeOpacity="0.22" />

      <g clipPath={`url(#${g('clip')})`}>
        {/* camera plateau across the top */}
        <rect x="6" y="6" width="288" height="190" fill={`url(#${g('plateau')})`} />
        <rect x="6" y="195" width="288" height="2" fill="#000" fillOpacity="0.18" />

        {/* light sweep, moved by CSS */}
        <rect className="phone-art__sheen" x="-160" y="-40" width="120" height="720" fill={`url(#${g('sheen')})`} transform="rotate(18 150 310)" />
      </g>

      {/* lens island */}
      <rect x="22" y="22" width="170" height="160" rx="44" fill="#000" fillOpacity="0.16" />
      <rect x="22.5" y="22.5" width="169" height="159" rx="43.5" fill="none" stroke="#fff" strokeOpacity="0.3" />

      {LENSES.map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r="34" fill={`url(#${g('ring')})`} />
          <circle cx={cx} cy={cy} r="33.5" fill="none" stroke="#fff" strokeOpacity="0.25" />
          <circle cx={cx} cy={cy} r="22" fill={`url(#${g('glass')})`} />
          <circle cx={cx} cy={cy} r="11" fill="#000" />
          <circle cx={cx} cy={cy} r="11" fill="none" stroke="#3b4a75" strokeOpacity="0.6" strokeWidth="1.5" />
          <ellipse cx={cx - 7} cy={cy - 8} rx="6" ry="4" fill="#fff" fillOpacity="0.35" transform={`rotate(-30 ${cx - 7} ${cy - 8})`} />
        </g>
      ))}

      {/* flash, LiDAR, microphone */}
      <circle cx="232" cy="58" r="14" fill="#fff4e0" />
      <circle cx="232" cy="58" r="14" fill="none" stroke="#000" strokeOpacity="0.2" />
      <circle cx="232" cy="146" r="11" fill="#141416" />
      <circle cx="232" cy="146" r="5" fill="#2a2a2e" />
      <circle cx="268" cy="102" r="3" fill="#000" fillOpacity="0.45" />

      {/* side buttons */}
      <rect x="0" y="150" width="3" height="34" rx="1.5" fill="#b8541c" />
      <rect x="0" y="200" width="3" height="56" rx="1.5" fill="#b8541c" />
      <rect x="0" y="266" width="3" height="56" rx="1.5" fill="#b8541c" />
      <rect x="297" y="210" width="3" height="88" rx="1.5" fill="#b8541c" />
    </svg>
  )
}
