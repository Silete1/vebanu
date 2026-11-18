import type { CSSProperties } from "react"

import { statusGlyph } from "@/components/story/glyph"
import { storyCopy } from "@/lib/content/story-copy"
import type { LocalizedSystem } from "@/lib/content/systems"
import { type Locale, localizedPath } from "@/lib/i18n"

const W = 1480
const H = 760
const CX = W / 2
const CY = H / 2

type Placed = { system: LocalizedSystem; x: number; y: number; end: boolean }

function ring(systems: LocalizedSystem[], rx: number, ry: number, turn: number): Placed[] {
  return systems.map((system, index) => {
    const angle = turn + (index / systems.length) * Math.PI * 2
    const x = CX + Math.cos(angle) * rx
    const y = CY + Math.sin(angle) * ry
    return { system, x, y, end: x < CX - 4 }
  })
}

/**
 * The ANU system map: ANU Brain at the core, the layers every client gets on
 * the inner ring, the industry systems on the outer one. Every node is a link
 * with its name in the DOM; pulses run along the lines on capable screens.
 */
export function SystemMap({
  systems,
  locale,
  label,
}: {
  systems: LocalizedSystem[]
  locale: Locale
  label: string
}) {
  const status = storyCopy[locale].status
  const core = systems.find((s) => s.group === "core")
  const layer = ring(systems.filter((s) => s.group === "layer"), 250, 150, -Math.PI / 2)
  const industry = ring(systems.filter((s) => s.group === "industry"), 520, 318, -Math.PI / 2 + 0.18)
  const rtl = locale === "ar"

  const node = ({ system, x, y, end }: Placed, size: number) => {
    // labels sit outside the ring, on the side away from the core
    const anchorEnd = rtl ? !end : end
    const dx = end ? -size - 10 : size + 10
    return (
      <a key={system.slug} href={localizedPath(locale, `/systems/${system.slug}`)} className="anu-map__node" data-slug={system.slug}>
        <rect
          x={x - size / 2}
          y={y - size / 2}
          width={size}
          height={size}
          className="anu-map__glyph"
          data-state={statusGlyph(system.status)}
        />
        <text x={x + dx} y={y} dominantBaseline="middle" textAnchor={anchorEnd ? "end" : "start"} direction={rtl ? "rtl" : "ltr"}>
          {system.copy.short}
        </text>
      </a>
    )
  }

  return (
    <figure className="anu-map" aria-label={label}>
      <svg viewBox={`0 0 ${W} ${H}`} role="group" className="anu-map__svg">
        <g className="anu-map__lines anu-draw" aria-hidden="true">
          {layer.map(({ system, x, y }) => (
            <line key={system.slug} x1={CX} y1={CY} x2={x} y2={y} pathLength={1} />
          ))}
          {industry.map(({ system, x, y }) => (
            <path
              key={system.slug}
              d={`M${CX} ${CY} Q${CX + (x - CX) * 0.35} ${CY + (y - CY) * 0.9} ${x} ${y}`}
              pathLength={1}
            />
          ))}
        </g>
        <g className="anu-map__pulses" aria-hidden="true">
          {industry.map(({ system, x, y }, index) => (
            <path
              key={system.slug}
              d={`M${CX} ${CY} Q${CX + (x - CX) * 0.35} ${CY + (y - CY) * 0.9} ${x} ${y}`}
              pathLength={1}
              style={{ "--d": `${(index * 0.37) % 4}s` } as CSSProperties}
            />
          ))}
        </g>
        <ellipse cx={CX} cy={CY} rx={250} ry={150} className="anu-map__orbit" />
        <ellipse cx={CX} cy={CY} rx={520} ry={318} className="anu-map__orbit" />
        {core ? (
          <a href={localizedPath(locale, `/systems/${core.slug}`)} className="anu-map__core anu-map__node" data-slug={core.slug}>
            <rect x={CX - 70} y={CY - 46} width={140} height={92} />
            <line x1={CX - 70} x2={CX + 70} y1={CY + 46} y2={CY + 46} className="anu-map__edge" />
            <text x={CX} y={CY} dominantBaseline="middle" textAnchor="middle">
              {core.copy.short}
            </text>
          </a>
        ) : null}
        {layer.map((placed) => node(placed, 16))}
        {industry.map((placed) => node(placed, 14))}
      </svg>
      {/* the card of the node under the pointer or focus (pure CSS, one rule per system); the core's by default */}
      <style>
        {systems
          .map(
            (system) =>
              `.anu-map:has(.anu-map__node[data-slug="${system.slug}"]:is(:hover,:focus-visible)) .anu-map__card[data-slug="${system.slug}"]{opacity:1;translate:0 0;visibility:visible}`
          )
          .join("")}
      </style>
      <div className="anu-map__cards" aria-hidden="true">
        {systems.map((system) => (
          <div key={system.slug} className="anu-map__card" data-slug={system.slug} data-default={system.group === "core" ? "" : undefined}>
            <p className="anu-kicker">
              <span className="anu-glyph" data-state={statusGlyph(system.status)} />
              {status[system.status]}
              {system.star ? <span className="anu-num anu-map__star">{system.star.sign}</span> : null}
            </p>
            <p className="anu-map__card-name">{system.copy.name}</p>
            <p className="anu-map__card-pitch">{system.copy.pitch}</p>
          </div>
        ))}
      </div>
      {/* on phones the map is a picture; this list is how you open a system */}
      <ul className="anu-map__list">
        {systems.map((system) => (
          <li key={system.slug}>
            <a href={localizedPath(locale, `/systems/${system.slug}`)}>
              <span className="anu-glyph" data-state={statusGlyph(system.status)} aria-hidden="true" />
              <span>
                <b>{system.copy.name}</b>
                <small>{system.copy.pitch}</small>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </figure>
  )
}
