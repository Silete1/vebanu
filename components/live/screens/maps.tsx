import type { CSSProperties } from "react"

import { LGlyph } from "@/components/live/kit"
import { LiveScreen } from "@/components/live/live-screen"
import type { Locale } from "@/lib/i18n"

const t = {
  en: {
    label:
      "ANU Maps on a phone with no signal: the downloaded region still shows the streets, a destination is picked, the route draws between the two pins, turn instructions follow and the driver arrives, all offline",
    app: "ANU Maps",
    search: "Search places offline",
    offline: "Offline",
    region: "Basra region · saved on this phone",
    place: "Central market",
    placeMeta: "2.4 km · Basra",
    route: "Route",
    eta: "8 min",
    etaMeta: "2.4 km by car · offline route",
    start: "Start",
    river: "River Street",
    market: "Market Street",
    turns: [
      ["150 m", "Turn right onto River Street"],
      ["200 m", "Turn left onto Market Street"],
    ],
    arrived: "You have arrived",
    trip: "8 min · 2.4 km",
    tripMeta: "No signal the whole way, nothing missed",
    credit: "© OpenStreetMap contributors",
  },
  ar: {
    label:
      "خرائط أنو على هاتف بلا تغطية: تبقى شوارع المنطقة المنزّلة ظاهرة، ويُختار مكان الوصول، ويُرسم المسار بين الدبوسين، وتتوالى تعليمات الانعطاف حتى الوصول، والكل دون اتصال",
    app: "خرائط أنو",
    search: "ابحث عن الأماكن دون اتصال",
    offline: "دون اتصال",
    region: "منطقة البصرة · محفوظة على هذا الهاتف",
    place: "السوق المركزي",
    placeMeta: "2.4 كم · البصرة",
    route: "المسار",
    eta: "8 دقائق",
    etaMeta: "2.4 كم بالسيارة · مسار دون اتصال",
    start: "ابدأ",
    river: "شارع النهر",
    market: "شارع السوق",
    turns: [
      ["150 م", "انعطف يميناً إلى شارع النهر"],
      ["200 م", "انعطف يساراً إلى شارع السوق"],
    ],
    arrived: "وصلت",
    trip: "8 دقائق · 2.4 كم",
    tripMeta: "بلا تغطية طوال الطريق، ولم يفتك شيء",
    credit: "© OpenStreetMap contributors",
  },
} as const

// the town: streets on a grid, a river on the east side; the route runs from A north, right onto
// River Street (y 260), then left onto Market Street (x 200) to B, between the toolbar and the card
const xs = [-20, 30, 110, 200, 270, 300]
const ys = [-20, 40, 120, 260, 420, 500]
const A = { x: 110, y: 360 }
const B = { x: 200, y: 196 }
const segments = [
  { d: `M${A.x} ${A.y}V260`, at: 6 },
  { d: "M110 260H200", at: 7 },
  { d: `M200 260V${B.y}`, at: 8 },
]

const still: CSSProperties = { translate: "none", outline: "none" }
const card: CSSProperties = {
  position: "absolute",
  insetInline: 10,
  insetBlockEnd: 18,
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "12px 14px",
  background: "var(--live-paper)",
  boxShadow: "0 14px 30px -12px rgb(9 11 17 / 0.5)",
  outline: "none",
}
const bar: CSSProperties = {
  position: "absolute",
  insetInline: 0,
  insetBlockStart: 0,
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "10px 12px",
  background: "var(--live-ink)",
  color: "#f8fafc",
  borderBlockEnd: "3px solid var(--live-signal)",
  outline: "none",
}

function TurnArrow({ to }: { to: "left" | "right" }) {
  const d = to === "right" ? "M7 22V13a4 4 0 0 1 4-4h8M15 5l4 4-4 4" : "M17 22V13a4 4 0 0 0-4-4H5M9 5 5 9l4 4"
  return (
    <svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true" style={{ flex: "none" }}>
      <path d={d} fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="square" />
    </svg>
  )
}

/**
 * Steps: 0 the map and its offline mark, 1 the downloaded region is named,
 * 2 the position dot, 3 the cursor taps a place, 4 its pin and card,
 * 5 the cursor asks for a route, 6–8 the route draws itself street by street,
 * 9 the first turn (right), 10 the second (left) as the dot moves on,
 * 11 arrival at the market.
 */
export function Screen({ locale }: { locale: Locale }) {
  const c = t[locale]
  return (
    <LiveScreen label={c.label} title={c.app} steps={12} interval={1100} device="phone">
      {/* the map itself: a drawing, never mirrored */}
      <svg
        viewBox="0 0 336 480"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, inlineSize: "100%", blockSize: "100%", background: "#eef2f6" }}
      >
        {xs.slice(0, -1).flatMap((x, i) =>
          ys.slice(0, -1).map((y, j) => {
            const park = i === 2 && j === 1
            return (
              <rect
                key={`${i}-${j}`}
                x={x + 7}
                y={y + 7}
                width={xs[i + 1]! - x - 14}
                height={ys[j + 1]! - y - 14}
                style={{ fill: park ? "#dcebdf" : (i + j) % 3 === 0 ? "#dde3ea" : "#e4e9ef" }}
              />
            )
          }),
        )}
        <path d="M322 -10C350 130 296 300 352 490" fill="none" style={{ stroke: "#cfe0f7" }} strokeWidth="34" />
        {/* streets: casing, then the white road */}
        <g fill="none" style={{ stroke: "#cbd5e1" }} strokeWidth="11">
          {xs.slice(1, -1).map((x) => (
            <path key={`cx${x}`} d={`M${x} -10V490`} />
          ))}
          {ys.slice(1, -1).map((y) => (
            <path key={`cy${y}`} d={`M-10 ${y}H346`} />
          ))}
        </g>
        <g fill="none" stroke="#fff" strokeWidth="8">
          {xs.slice(1, -1).map((x) => (
            <path key={`x${x}`} d={`M${x} -10V490`} />
          ))}
          {ys.slice(1, -1).map((y) => (
            <path key={`y${y}`} d={`M-10 ${y}H346`} />
          ))}
        </g>
        <text x="155" y="252" textAnchor="middle" fontSize="9" style={{ fill: "#64748b" }}>
          {c.river}
        </text>
        <text x="0" y="0" textAnchor="middle" fontSize="9" transform="translate(212 232) rotate(90)" style={{ fill: "#64748b" }}>
          {c.market}
        </text>

        {/* the route, street by street */}
        {segments.map((s) => (
          <g key={s.d} data-at={s.at} style={still} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d={s.d} stroke="#fff" strokeWidth="10" />
            <path d={s.d} style={{ stroke: "var(--live-signal)" }} strokeWidth="6" />
          </g>
        ))}

        {/* where the phone is: the start, then the dot moving on */}
        <g data-at={2} style={still}>
          <circle cx={A.x} cy={A.y} r="16" style={{ fill: "rgb(37 99 235 / 0.18)" }} />
          <circle cx={A.x} cy={A.y} r="7.5" stroke="#fff" strokeWidth="3" style={{ fill: "var(--live-signal)" }} />
        </g>
        <g data-at={9} style={still}>
          <circle cx={A.x} cy={A.y} r="17" fill="#fff" />
          <circle cx={A.x} cy={A.y} r="6" fill="#fff" strokeWidth="3" style={{ stroke: "var(--live-signal)" }} />
        </g>
        {[
          { x: 110, y: 300, only: 9 },
          { x: 170, y: 260, only: 10 },
        ].map((p) => (
          <g key={p.only} data-only={p.only} style={still}>
            <circle cx={p.x} cy={p.y} r="15" style={{ fill: "rgb(37 99 235 / 0.2)" }} />
            <circle cx={p.x} cy={p.y} r="7.5" stroke="#fff" strokeWidth="3" style={{ fill: "var(--live-signal)" }} />
          </g>
        ))}

        {/* the destination: tapped, then pinned */}
        <rect data-cursor-at={3} x={B.x - 18} y={B.y - 30} width="36" height="36" fill="transparent" />
        <g data-at={4} style={still}>
          <path d={`M${B.x} ${B.y}l-6-8h-8v-22h28v22h-8z`} style={{ fill: "var(--live-ink)" }} />
          <rect x={B.x - 14} y={B.y - 10} width="28" height="2.5" style={{ fill: "var(--live-signal)" }} />
          <path d={`M${B.x} ${B.y - 26}l2.2 5.6 5.8.4-4.4 3.8 1.4 5.6-5-3-5 3 1.4-5.6-4.4-3.8 5.8-.4z`} fill="#fff" />
          <text x={B.x} y={B.y - 36} textAnchor="middle" fontSize="10" fontWeight="600" stroke="#fff" strokeWidth="3" paintOrder="stroke" style={{ fill: "var(--live-ink)" }}>
            {c.place}
          </text>
        </g>
        <g data-at={11} style={still}>
          <circle cx={B.x} cy={B.y + 8} r="15" style={{ fill: "rgb(37 99 235 / 0.2)" }} />
          <circle cx={B.x} cy={B.y + 8} r="7.5" stroke="#fff" strokeWidth="3" style={{ fill: "var(--live-signal)" }} />
        </g>
      </svg>

      <small style={{ position: "absolute", insetInlineEnd: 6, insetBlockEnd: 2, fontSize: 8, color: "#64748b" }} dir="ltr">
        {c.credit}
      </small>

      {/* the toolbar: ink with the blue edge, and the offline mark */}
      <div style={{ ...bar, minBlockSize: 56 }}>
        <span style={{ flex: 1, minInlineSize: 0, padding: "8px 10px", background: "rgb(255 255 255 / 0.08)", border: "1px solid rgb(148 163 184 / 0.3)", color: "#94a3b8", fontSize: 12, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {c.search}
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, flex: "none", fontSize: 11, color: "#e2e8f0" }}>
          <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
            <path d="M2 11h2.4v3H2zM6.8 8h2.4v6H6.8zM11.6 5H14v9h-2.4z" fill="#94a3b8" />
            <path d="M1.5 2.5 14.5 15" stroke="#f87171" strokeWidth="1.8" />
          </svg>
          {c.offline}
        </span>
      </div>
      <span
        data-at={1}
        style={{ position: "absolute", insetInlineStart: 10, insetBlockStart: 66, display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", background: "var(--live-paper)", fontSize: 11, boxShadow: "0 6px 16px -8px rgb(9 11 17 / 0.5)" }}
      >
        <LGlyph state="done" />
        {c.region}
      </span>

      {/* the place, then the route found for it */}
      <div data-at={4} style={card}>
        <span style={{ display: "grid", flex: 1, minInlineSize: 0 }}>
          <b style={{ fontSize: 15, fontWeight: 500 }}>{c.place}</b>
          <small style={{ color: "var(--live-faint)" }}>{c.placeMeta}</small>
        </span>
        <span className="live-btn" data-cursor-at={5}>
          {c.route}
        </span>
      </div>
      <div data-at={6} style={card}>
        <span style={{ display: "grid", flex: 1, minInlineSize: 0 }}>
          <b style={{ fontSize: 17, fontWeight: 500, color: "var(--live-signal)" }}>{c.eta}</b>
          <small style={{ color: "var(--live-faint)" }}>{c.etaMeta}</small>
        </span>
        <span className="live-btn live-btn--ghost">{c.start}</span>
      </div>

      {/* turn by turn */}
      {c.turns.map(([distance, instruction], i) => (
        <div key={distance} data-at={9 + i} style={{ ...bar, minBlockSize: 96 }}>
          <TurnArrow to={i === 0 ? "right" : "left"} />
          <span style={{ display: "grid", minInlineSize: 0 }}>
            <b style={{ fontSize: 22, fontWeight: 400, color: "#93c5fd" }}>{distance}</b>
            <span style={{ fontSize: 13 }}>{instruction}</span>
          </span>
        </div>
      ))}

      {/* arrival: the destination on top, the trip below */}
      <div data-at={11} style={{ ...bar, minBlockSize: 96 }}>
        <svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true" style={{ flex: "none" }}>
          <path d="M5 21V4h13l-3 4.5 3 4.5H5" fill="none" stroke="#fff" strokeWidth="2.2" />
        </svg>
        <span style={{ display: "grid", minInlineSize: 0 }}>
          <b style={{ fontSize: 22, fontWeight: 400, color: "#93c5fd" }}>{c.arrived}</b>
          <span style={{ fontSize: 13 }}>{c.place}</span>
        </span>
      </div>
      <div data-at={11} style={{ ...card, borderInlineStart: "3px solid var(--live-signal)" }}>
        <LGlyph state="done" />
        <span style={{ display: "grid", flex: 1, minInlineSize: 0 }}>
          <b style={{ fontSize: 15, fontWeight: 500 }}>{c.trip}</b>
          <small style={{ color: "var(--live-faint)" }}>{c.tripMeta}</small>
        </span>
      </div>
    </LiveScreen>
  )
}
