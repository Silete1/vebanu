import type { ReactNode } from "react"

import type { GlyphState } from "@/components/story/glyph"
import type { InsightVisual } from "@/lib/content/insights"

type NodeProps = { x: number; y: number; size?: number; state?: GlyphState }

/** A status glyph drawn in SVG: the square's fill says the state, as on the theme's screens. */
function Node({ x, y, size = 32, state = "neutral" }: NodeProps) {
  const half = size / 2
  return (
    <>
      <rect
        x={x - half}
        y={y - half}
        width={size}
        height={size}
        className="anu-figure__node"
        data-state={state === "neutral" ? undefined : state}
      />
      {state === "progress" ? <rect x={x - half} y={y} width={size} height={half} className="anu-figure__half" /> : null}
    </>
  )
}

const ledger: Record<number, GlyphState> = {
  0: "done",
  1: "done",
  3: "due",
  8: "done",
  9: "done",
  10: "done",
  12: "due",
  16: "done",
  18: "progress",
  21: "due",
  24: "done",
  25: "done",
  29: "waiting",
}

/** Each figure: the drawn lines (they draw themselves as the reader reaches them), then the glyphs on top. */
const figures: Record<InsightVisual, () => ReactNode> = {
  "control-loop": () => (
    <>
      <g className="anu-figure__lines">
        <line x1={320} y1={200} x2={160} y2={120} className="anu-figure__dash" />
        <line x1={320} y1={200} x2={480} y2={120} className="anu-figure__dash" />
        <line x1={320} y1={200} x2={480} y2={280} className="anu-figure__dash" />
        <line x1={320} y1={200} x2={160} y2={280} className="anu-figure__dash" />
      </g>
      <g className="anu-figure__lines anu-draw">
        <path d="M160 120 H480 V280 H160 Z" pathLength={1} className="anu-figure__signal" />
      </g>
      <Node x={160} y={120} state="done" />
      <Node x={480} y={120} state="done" />
      <Node x={480} y={280} state="progress" />
      <Node x={160} y={280} state="waiting" />
      <Node x={320} y={200} size={48} state="due" />
    </>
  ),
  "inventory-ledger": () => (
    <>
      <g className="anu-figure__lines anu-draw">
        {[0, 1, 2, 3].map((row) => (
          <line key={row} x1={129} x2={511} y1={154 + row * 46} y2={154 + row * 46} pathLength={1} />
        ))}
      </g>
      {Array.from({ length: 32 }, (_, index) => (
        <Node key={index} x={159 + (index % 8) * 46} y={131 + Math.floor(index / 8) * 46} state={ledger[index]} />
      ))}
    </>
  ),
  "management-dashboard": () => (
    <>
      <rect x={96} y={72} width={280} height={152} className="anu-figure__panel" />
      <rect x={392} y={72} width={152} height={152} className="anu-figure__panel" />
      <rect x={96} y={240} width={176} height={88} className="anu-figure__panel" />
      <rect x={288} y={240} width={256} height={88} className="anu-figure__panel" />
      {[48, 72, 56, 112, 80, 96].map((height, index) => (
        <rect
          key={index}
          x={122 + index * 40}
          y={208 - height}
          width={22}
          height={height}
          className="anu-figure__bar"
          data-state={index === 3 ? "due" : undefined}
        />
      ))}
      <rect x={120} y={280} width={128} height={8} className="anu-figure__bar" />
      <rect x={120} y={280} width={84} height={8} className="anu-figure__bar" data-state="due" />
      <g className="anu-figure__lines anu-draw">
        <line x1={440} x2={524} y1={108} y2={108} pathLength={1} />
        <line x1={440} x2={504} y1={148} y2={148} pathLength={1} />
        <line x1={440} x2={516} y1={188} y2={188} pathLength={1} />
        <polyline points="308,308 360,292 412,300 464,270 524,260" pathLength={1} className="anu-figure__signal" />
      </g>
      <Node x={420} y={108} size={14} state="done" />
      <Node x={420} y={148} size={14} state="due" />
      <Node x={420} y={188} size={14} state="progress" />
    </>
  ),
  "approval-flow": () => (
    <>
      <g className="anu-figure__lines">
        <path d="M390 170 C390 110 250 110 250 170" className="anu-figure__dash" />
      </g>
      <g className="anu-figure__lines anu-draw">
        <line x1={80} x2={560} y1={200} y2={200} pathLength={1} />
      </g>
      <Node x={110} y={200} size={44} state="done" />
      <Node x={250} y={200} size={44} state="done" />
      <Node x={390} y={200} size={44} state="due" />
      <Node x={530} y={200} size={44} />
    </>
  ),
  "process-map": () => (
    <>
      <g className="anu-figure__lines anu-draw">
        <line x1={80} x2={560} y1={160} y2={160} pathLength={1} />
        <line x1={320} x2={320} y1={160} y2={278} pathLength={1} />
      </g>
      <Node x={110} y={160} size={40} state="done" />
      <Node x={210} y={160} size={40} state="done" />
      <rect x={306} y={146} width={28} height={28} transform="rotate(45 320 160)" className="anu-figure__node" data-state="due" />
      <Node x={430} y={160} size={40} state="progress" />
      <Node x={530} y={160} size={40} />
      <rect x={268} y={278} width={104} height={44} className="anu-figure__node" data-state="waiting" />
    </>
  ),
  "module-map": () => (
    <>
      {[104, 256, 408].map((x) => (
        <rect key={x} x={x} y={88} width={128} height={224} className="anu-figure__panel" />
      ))}
      <rect x={120} y={108} width={48} height={10} className="anu-figure__bar" />
      <rect x={272} y={108} width={96} height={10} className="anu-figure__bar" data-state="due" />
      <rect x={424} y={108} width={48} height={10} className="anu-figure__bar" />
      <g className="anu-figure__lines anu-draw">
        <line x1={232} x2={256} y1={200} y2={200} pathLength={1} className="anu-figure__signal" />
        <line x1={384} x2={408} y1={200} y2={200} pathLength={1} />
      </g>
      <Node x={168} y={180} size={20} state="done" />
      <Node x={168} y={220} size={20} state="done" />
      <Node x={168} y={260} size={20} state="done" />
      <Node x={320} y={180} size={20} state="done" />
      <Node x={320} y={220} size={20} state="done" />
      <Node x={320} y={260} size={20} state="due" />
      <Node x={472} y={200} size={20} state="waiting" />
      <Node x={472} y={240} size={20} state="progress" />
    </>
  ),
  "single-source": () => (
    <>
      <g className="anu-figure__lines anu-draw">
        <path d="M134 104 C260 104 300 200 392 200" pathLength={1} />
        <path d="M134 200 H392" pathLength={1} />
        <path d="M134 296 C260 296 300 200 392 200" pathLength={1} />
        <line x1={488} x2={548} y1={200} y2={200} pathLength={1} className="anu-figure__signal" />
      </g>
      <Node x={120} y={104} size={28} state="waiting" />
      <Node x={120} y={200} size={28} state="progress" />
      <Node x={120} y={296} size={28} />
      <Node x={440} y={200} size={96} state="due" />
      <Node x={560} y={200} size={24} state="done" />
    </>
  ),
  "ownership-model": () => (
    <>
      <g className="anu-figure__lines anu-draw">
        <line x1={320} x2={320} y1={40} y2={360} pathLength={1} />
        <line x1={64} x2={576} y1={200} y2={200} pathLength={1} />
      </g>
      <g className="anu-figure__lines">
        <path d="M176 128 V172" className="anu-figure__dash" />
        <path d="M464 228 V272" className="anu-figure__dash" />
      </g>
      <rect x={96} y={72} width={160} height={56} className="anu-figure__node" />
      <rect x={240} y={172} width={160} height={56} className="anu-figure__node" data-state="due" />
      <rect x={384} y={272} width={160} height={56} className="anu-figure__node" data-state="done" />
    </>
  ),
}

/** A field note's picture: the idea drawn in the ANU language, its words in the label. */
export function NoteFigure({ variant, alt }: { variant: InsightVisual; alt: string }) {
  return (
    <figure className="anu-figure" role="img" aria-label={alt}>
      <svg viewBox="0 0 640 400" aria-hidden="true">
        {figures[variant]()}
      </svg>
    </figure>
  )
}
