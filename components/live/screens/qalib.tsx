import type { CSSProperties } from "react"

import { LButton, LCard, LGlyph, LRow } from "@/components/live/kit"
import { LiveScreen } from "@/components/live/live-screen"
import type { Locale } from "@/lib/i18n"

const t = {
  en: {
    label: "ANU Qalib on one wall panel: openings are drawn into the panel, the reinforcement follows, the casting schedule fills day by day, the 7- and 28-day cube tests arrive, and the panel is delivered",
    app: "Qalib · Pieces · WP-07",
    band: "Wall panel WP-07",
    concrete: "concrete",
    weight: "weight",
    draft: "draft revision",
    locked: "locked revision",
    elevation: "Elevation · 1:50",
    release: "Release to the moulds",
    crane: ["Crane check", "4.7 t at 14 m · chart allows 6.1 t"],
    schedule: "Casting schedule · mould M-2",
    legend: ["cast", "curing", "cube test"],
    pending: "awaiting result",
    cube7: ["Cube test · 7 days", "3 cubes · needs ≥ 21 MPa"],
    cube28: ["Cube test · 28 days", "3 cubes · C30 · needs ≥ 30 MPa"],
    road: ["Designed", "Cast", "Tested", "Delivered"],
    dispatch: "Dispatch · truck 3 of 5",
    stamp: "DELIVERED",
    date: "11 Jan",
    toast: "WP-07 delivered and installed · signed on the crew's phone",
  },
  ar: {
    label: "قالب من أنو على لوح جداري واحد: تُرسم الفتحات في اللوح ويتبعها حديد التسليح، ويمتلئ جدول الصب يومًا بعد يوم، وتصل نتائج فحص المكعبات لسبعة أيام وثمانية وعشرين يومًا، ثم يُسلَّم اللوح",
    app: "قالب · القطع · WP-07",
    band: "لوح جداري WP-07",
    concrete: "خرسانة",
    weight: "الوزن",
    draft: "مراجعة مسودة",
    locked: "مراجعة مقفلة",
    elevation: "واجهة · 1:50",
    release: "إطلاق إلى القوالب",
    crane: ["فحص الرافعة", "4.7 طن على بعد 14 م · الجدول يسمح بـ 6.1 طن"],
    schedule: "جدول الصب · القالب M-2",
    legend: ["صب", "معالجة", "فحص مكعبات"],
    pending: "بانتظار النتيجة",
    cube7: ["فحص المكعبات · 7 أيام", "3 مكعبات · المطلوب 21 MPa فأكثر"],
    cube28: ["فحص المكعبات · 28 يومًا", "3 مكعبات · C30 · المطلوب 30 MPa فأكثر"],
    road: ["التصميم", "الصب", "الفحص", "التسليم"],
    dispatch: "إرسال · الشاحنة 3 من 5",
    stamp: "سُلِّم",
    date: "11 كانون الثاني",
    toast: "سُلِّم اللوح WP-07 ورُكِّب · بتوقيع الفريق على الهاتف",
  },
} as const

const ink = "var(--live-ink)"
const signal = "var(--live-signal)"
const faint = "var(--live-faint)"
const paper = "var(--live-paper)"
const tint = "#dbeafe"
/** an SVG element that may be pressed by the cursor scales about its own centre */
const pressable: CSSProperties = { transformBox: "fill-box", transformOrigin: "center", outline: "none" }

/** Values that replace one another in place; each later one covers the one before. */
function Tick({ values, bg }: { values: readonly (readonly [number, string])[]; bg: string }) {
  return (
    <span style={{ display: "inline-grid" }}>
      {values.map(([at, value], i) => (
        <span key={at} data-at={i > 0 ? at : undefined} style={{ gridArea: "1 / 1", background: bg }}>
          {value}
        </span>
      ))}
    </span>
  )
}

/* the panel at 1:50 — 6.00 × 3.00 m drawn 560 × 280; openings in metres from the panel's corner */
const openings = [
  { x: 100, y: 115, w: 93, h: 205, dims: "1.00×2.20" },
  { x: 260, y: 124, w: 140, h: 112, dims: "1.50×1.20" },
  { x: 450, y: 124, w: 112, h: 112, dims: "1.20×1.20" },
]

/* the 28 days after the cast, and the step at which each one fills */
const days = Array.from({ length: 28 }, (_, i) => {
  const day = i + 1
  const at = day === 1 ? 7 : day <= 7 ? 8 : 10
  const kind = day === 1 ? "cast" : day === 7 || day === 28 ? "test" : "curing"
  return { day, at, kind, delay: day === 1 ? 0 : ((day - 2) % 21) * 35 }
})

/**
 * Steps: 0 the band and the blank panel, 1–3 the cursor places a door and two
 * windows (the band's concrete and weight fall with each), 4 the mesh, 5 trim
 * bars, lifting anchors and the crane check, 6 the cursor releases the locked
 * revision to the moulds, 7 day 1 is cast and both cube tests wait, 8 the first
 * week cures, 9 the 7-day result arrives, 10 the rest of the 28 days fill,
 * 11 the 28-day result, 12 the cursor dispatches the truck, 13 the panel is
 * stamped delivered and the crew's signature replaces the dispatch button.
 */
export function Screen({ locale }: { locale: Locale }) {
  const c = t[locale]
  return (
    <LiveScreen label={c.label} title={c.app} steps={14} interval={1000}>
      <div className="live-band" data-at={0}>
        <span className="live-band__title">{c.band}</span>
        <span className="live-band__figures" style={{ flexWrap: "wrap" }}>
          <span className="live-band__figure">
            <b className="live-num">
              <Tick bg={ink} values={[[0, "2.70 m³"], [1, "2.37 m³"], [2, "2.10 m³"], [3, "1.88 m³"]]} />
            </b>
            <small>{c.concrete}</small>
          </span>
          <span className="live-band__figure">
            <b className="live-num">
              <Tick bg={ink} values={[[0, "6.75 t"], [1, "5.93 t"], [2, "5.25 t"], [3, "4.71 t"]]} />
            </b>
            <small>{c.weight}</small>
          </span>
          <span className="live-band__figure">
            <b className="live-num">Rev C</b>
            <small>
              <Tick bg={ink} values={[[0, c.draft], [6, c.locked]]} />
            </small>
          </span>
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "start" }}>
        <LCard style={{ flex: "3 1 20rem", minInlineSize: 0 }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
            <small style={{ color: faint }}>{c.elevation}</small>
            <span data-cursor-at={6}>
              <LButton>{c.release}</LButton>
            </span>
          </div>
          {/* a drawing: it keeps its own orientation in Arabic too */}
          <svg viewBox="0 0 660 350" width="100%" style={{ display: "block", direction: "ltr" }} aria-hidden="true">
            <defs>
              <pattern id="qalib-mesh" width="18.7" height="18.7" patternUnits="userSpaceOnUse" x="40" y="40">
                <path d="M0 0V18.7M0 0H18.7" style={{ stroke: faint, strokeWidth: 1, fill: "none" }} />
              </pattern>
            </defs>
            {/* dimensions */}
            <g style={{ stroke: faint, strokeWidth: 1, fill: "none" }}>
              <path d="M40 24H600M40 18V30M600 18V30" />
              <path d="M622 40V320M616 40H628M616 320H628" />
            </g>
            <g style={{ fill: faint, fontFamily: "var(--anu-mono)", fontSize: 20 }}>
              <text x="320" y="16" textAnchor="middle">6.00</text>
              <text x="0" y="0" textAnchor="middle" transform="translate(648 180) rotate(-90)">3.00</text>
            </g>
            {/* the panel */}
            <rect x="40" y="40" width="560" height="280" style={{ fill: "#eef2f7", stroke: ink, strokeWidth: 2.5 }} />
            {/* reinforcement mesh */}
            <rect data-at={4} x="40" y="40" width="560" height="280" style={{ fill: "url(#qalib-mesh)", outline: "none" }} />
            {/* openings, cut through the mesh */}
            {openings.map((o, i) => (
              <g key={o.dims} data-at={1 + i} data-cursor-at={1 + i} style={pressable}>
                <rect x={o.x} y={o.y} width={o.w} height={o.h} style={{ fill: paper, stroke: ink, strokeWidth: 2 }} />
                <path d={`M${o.x} ${o.y}L${o.x + o.w} ${o.y + o.h}M${o.x + o.w} ${o.y}L${o.x} ${o.y + o.h}`} style={{ stroke: "#cbd5e1", strokeWidth: 1 }} />
                <text x={o.x + o.w / 2} y={o.y + o.h / 2 - 8} textAnchor="middle" style={{ fill: ink, fontFamily: "var(--anu-mono)", fontSize: 15, paintOrder: "stroke", stroke: paper, strokeWidth: 5 }}>
                  {o.dims}
                </text>
              </g>
            ))}
            {/* trim bars round each opening, diagonal bars at the corners, lifting anchors */}
            <g data-at={5} style={{ stroke: signal, strokeWidth: 2.5, fill: "none", outline: "none" }}>
              {openings.map((o) => (
                <g key={o.dims}>
                  <path d={`M${o.x - 10} ${o.y - 10}H${o.x + o.w + 10}M${o.x - 10} ${o.y - 10}V${Math.min(o.y + o.h + 10, 312)}M${o.x + o.w + 10} ${o.y - 10}V${Math.min(o.y + o.h + 10, 312)}`} />
                  {o.y + o.h < 312 ? <path d={`M${o.x - 10} ${o.y + o.h + 10}H${o.x + o.w + 10}`} /> : null}
                  <path d={`M${o.x - 26} ${o.y - 2}L${o.x - 2} ${o.y - 26}M${o.x + o.w + 2} ${o.y - 26}L${o.x + o.w + 26} ${o.y - 2}`} />
                </g>
              ))}
              <circle cx="180" cy="52" r="6" style={{ fill: signal }} />
              <circle cx="480" cy="52" r="6" style={{ fill: signal }} />
            </g>
            {/* delivered */}
            <g data-at={13} transform="rotate(-6 320 180)" style={{ outline: "none" }}>
              <rect x="190" y="146" width="260" height="72" style={{ fill: "rgb(255 255 255 / 0.92)", stroke: signal, strokeWidth: 4 }} />
              <text x="320" y="186" textAnchor="middle" style={{ fill: signal, fontSize: 30, fontWeight: 600, letterSpacing: locale === "ar" ? 0 : 4 }}>
                {c.stamp}
              </text>
              <text x="320" y="208" textAnchor="middle" style={{ fill: signal, fontSize: 16, fontFamily: "var(--anu-mono)" }}>
                {c.date}
              </text>
            </g>
          </svg>
          <LRow at={5} state="done" label={c.crane[0]} meta={c.crane[1]} />
        </LCard>

        <div style={{ flex: "2 1 15rem", minInlineSize: 0, display: "grid", gap: 8 }}>
          <LCard>
            <small style={{ color: faint }}>{c.schedule}</small>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))", gap: 3 }}>
              {days.map((d) => (
                <span key={d.day} className="live-num" style={{ position: "relative", display: "grid", placeItems: "center", blockSize: 22, border: "1px solid var(--live-rule)", fontSize: 10, color: faint }}>
                  {d.day}
                  <span
                    data-at={d.at}
                    style={{
                      position: "absolute",
                      inset: -1,
                      display: "grid",
                      placeItems: "center",
                      background: d.kind === "cast" ? ink : d.kind === "test" ? signal : tint,
                      color: d.kind === "curing" ? ink : "#fff",
                      transitionDelay: `${d.delay}ms`,
                      outline: "none",
                    }}
                  >
                    {d.day}
                  </span>
                </span>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 12px", fontSize: 10, color: faint }}>
              {c.legend.map((label, i) => (
                <span key={label} style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                  <i style={{ inlineSize: 9, blockSize: 9, background: [ink, tint, signal][i], border: i === 1 ? "1px solid #93c5fd" : undefined }} />
                  {label}
                </span>
              ))}
            </div>
          </LCard>
          <div style={{ display: "grid" }}>
            <div data-at={7} style={{ gridArea: "1 / 1" }}>
              <LRow state="waiting" label={c.cube7[0]} meta={c.cube7[1]} value={c.pending} />
            </div>
            <div data-at={9} style={{ gridArea: "1 / 1" }}>
              <LRow state="done" label={c.cube7[0]} meta={c.cube7[1]} value="24.6 MPa" />
            </div>
          </div>
          <div style={{ display: "grid" }}>
            <div data-at={7} style={{ gridArea: "1 / 1" }}>
              <LRow state="waiting" label={c.cube28[0]} meta={c.cube28[1]} value={c.pending} />
            </div>
            <div data-at={11} style={{ gridArea: "1 / 1" }}>
              <LRow state="done" label={c.cube28[0]} meta={c.cube28[1]} value="37.2 MPa" />
            </div>
          </div>
          <div className="live-road">
            {c.road.map((stage, i) => (
              <span key={stage} className="live-road__stage" data-at={[0, 7, 11, 13][i]} data-road={i < 3 ? "past" : "now"}>
                {stage}
              </span>
            ))}
          </div>
          {/* the dispatch, then the signed delivery in its place */}
          <div style={{ display: "grid" }}>
            <span data-cursor-at={12} style={{ gridArea: "1 / 1", display: "grid" }}>
              <LButton ghost>{c.dispatch}</LButton>
            </span>
            <div className="live-row" data-at={13} style={{ gridArea: "1 / 1", borderInlineStart: `3px solid ${signal}`, borderBlockEnd: 0 }}>
              <LGlyph state="done" />
              <span className="live-row__label">{c.toast}</span>
            </div>
          </div>
        </div>
      </div>
    </LiveScreen>
  )
}
