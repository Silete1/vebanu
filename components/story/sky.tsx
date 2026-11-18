import type { CSSProperties } from "react"

import { Dingir } from "@/components/brand/dingir"

/**
 * The sky of Anu, the ANU way: pieces drawn in SVG and moved by the reader's
 * own scroll (CSS scroll-driven animations), so they cost no script and stay
 * still for anyone who asked for less motion.
 */

/** "The way of Anu": the band of sky the Babylonians tracked, here the page's progress, under the header. */
export function WayOfAnu() {
  return (
    <div className="anu-way" aria-hidden="true">
      <span className="anu-way__band" />
      <span className="anu-way__star">
        <Dingir />
      </span>
    </div>
  )
}

/**
 * A ziggurat whose terraces are laid one by one as the reader comes down the
 * page; each terrace carries one of the given words, the shrine on top holds
 * the Signal light.
 */
export function Ziggurat({ terraces, label }: { terraces: string[]; label: string }) {
  const count = terraces.length
  const H = 64
  return (
    <figure className="anu-ziggurat" aria-label={label}>
      <svg viewBox={`0 0 600 ${count * H + 150}`} className="anu-ziggurat__svg">
        <g className="anu-ziggurat__sky anu-draw" aria-hidden="true">
          <path d="M300 70 L180 18 M300 70 L420 10 M300 70 L300 0 M180 18 L96 46 M420 10 L520 40" pathLength={1} />
        </g>
        <rect x="282" y="70" width="36" height="36" className="anu-ziggurat__shrine" />
        <rect x="294" y="82" width="12" height="12" className="anu-ziggurat__light" />
        {terraces.map((word, index) => {
          // index 0 is the base: widest, lowest, laid first
          const level = count - 1 - index
          const width = 132 + (level + 1) * 104
          const x = 300 - width / 2
          const y = 106 + level * H
          return (
            <g
              key={word}
              className="anu-ziggurat__terrace"
              style={{ "--i": count - 1 - level } as CSSProperties}
            >
              <rect x={x} y={y} width={width} height={H - 6} />
              <line x1={x} x2={x + width} y1={y + H - 6} y2={y + H - 6} className="anu-ziggurat__edge" />
              <text x={300} y={y + (H - 6) / 2} dominantBaseline="middle" textAnchor="middle">
                {word}
              </text>
            </g>
          )
        })}
      </svg>
    </figure>
  )
}

/**
 * A cylinder-seal rollout: a frieze of ANU's signs (wedges, glyphs, the
 * network, terraces, the star) rolled across the band as the page scrolls.
 */
export function SealFrieze({ tone = "ink" }: { tone?: "ink" | "paper" }) {
  const unit = (
    <>
      <path d="M0 40 L12 34 L12 46 Z M12 40 L44 40" />
      <path d="M60 22 L68 30 L60 38 Z M68 30 L68 66" />
      <rect x="84" y="28" width="16" height="16" className="anu-seal__solid" />
      <rect x="110" y="28" width="16" height="16" />
      <rect x="136" y="28" width="16" height="16" className="anu-seal__half" />
      <path d="M170 64 L170 50 L184 50 L184 38 L198 38 L198 26 L226 26 L226 38 L240 38 L240 50 L254 50 L254 64" />
      <path d="M276 20 L300 44 L324 28 L348 56 L372 24" className="anu-seal__net" />
      <circle cx="276" cy="20" r="2.5" />
      <circle cx="300" cy="44" r="2.5" />
      <circle cx="324" cy="28" r="2.5" />
      <circle cx="348" cy="56" r="2.5" />
      <circle cx="372" cy="24" r="2.5" />
      <g transform="translate(410 40) scale(0.32)">
        <path d="M-46 0 L-30 -7 L-30 7 Z M-31 0 L44 0" />
        <path d="M46 0 L30 -7 L30 7 Z M31 0 L-44 0" transform="rotate(45)" />
        <path d="M-46 0 L-30 -7 L-30 7 Z M-31 0 L44 0" transform="rotate(90)" />
        <path d="M46 0 L30 -7 L30 7 Z M31 0 L-44 0" transform="rotate(135)" />
      </g>
      <path d="M454 52 L466 46 L466 58 Z M466 52 L490 52 M454 30 L466 24 L466 36 Z M466 30 L490 30" />
    </>
  )
  return (
    <div className={`anu-seal anu-seal--${tone}`} aria-hidden="true">
      <svg viewBox="0 0 2000 80" preserveAspectRatio="xMinYMid slice" className="anu-seal__strip">
        <defs>
          <g id="anu-seal-unit">{unit}</g>
        </defs>
        {[0, 1, 2, 3].map((n) => (
          <use key={n} href="#anu-seal-unit" x={n * 500} />
        ))}
      </svg>
    </div>
  )
}
