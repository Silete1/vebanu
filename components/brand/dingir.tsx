/**
 * The dingir sign 𒀭 — cuneiform for An, the sky, and for "god" — drawn as four
 * wedges pressed across one centre, the way a scribe made it in clay. A motif,
 * never a logo: it marks the sky in ANU's story. Each wedge is a path with
 * pathLength 1 so it can be drawn in.
 */
const WEDGES = [0, 45, 90, 135]

export function Dingir({ className, title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="-50 -50 100 100" className={className} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      {WEDGES.map((angle, index) => (
        <g key={angle} transform={`rotate(${angle})`} className="anu-dingir__wedge" style={{ "--i": index } as React.CSSProperties}>
          {/* the head: a triangle pressed by the stylus corner; the tail: a fine line */}
          <path d={index % 2 ? "M46 0 L30 -7 L30 7 Z" : "M-46 0 L-30 -7 L-30 7 Z"} className="anu-dingir__head" pathLength={1} />
          <path d={index % 2 ? "M31 0 L-44 0" : "M-31 0 L44 0"} className="anu-dingir__tail" pathLength={1} />
        </g>
      ))}
    </svg>
  )
}
