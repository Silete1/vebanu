import type { CSSProperties } from "react"

import { LCard, LGlyph, LRow, LSheet } from "@/components/live/kit"
import { LiveScreen } from "@/components/live/live-screen"
import type { Locale } from "@/lib/i18n"

const t = {
  en: {
    label: "ANU Twins on a container berth, with demo data: an ERP move event arrives in the event list, the container travels from the ship by crane and truck to its yard slot, and the shift figures tick in the band",
    app: "Twins · Port · Berth 2",
    band: "Berth 2 · shift B",
    demo: "demo data",
    figures: ["moves this shift", "moves / hour", "yard full"],
    events: "ERP events · live",
    rows: [
      { at: 1, state: "done", label: "load · DEMU 300415", meta: "QC-3 · bay 22", time: "10:41:07" },
      { at: 4, state: "progress", label: "discharge · ANUU 482117", meta: "QC-1 · bay 14", time: "10:41:52" },
      { at: 5, state: "progress", label: "truck T-11 · to C-03", meta: "quay lane", time: "10:42:03" },
      { at: 8, state: "done", label: "receive · ANUU 482117", meta: "yard C-03 · tier 2", time: "10:42:18" },
    ],
    onShip: ["ANUU 482117", "40' HC · 26.4 t", "Bay 14 → yard C-03", "Discharge with QC-1"],
    inYard: ["ANUU 482117", "Yard C-03 · tier 2", "Received 10:42:18", "Open the record"],
    toast: "ANUU 482117 in yard C-03 · on screen 0.9 s after the ERP saved it",
  },
  ar: {
    label: "التوائم الرقمية من أنو على رصيف حاويات، ببيانات تجريبية: يصل حدث نقل من نظام ERP إلى قائمة الأحداث، وتنتقل الحاوية من السفينة بالرافعة والشاحنة إلى موقعها في الساحة، وتتحدث أرقام الوردية في الشريط",
    app: "التوائم الرقمية · الميناء · الرصيف 2",
    band: "الرصيف 2 · الوردية B",
    demo: "بيانات تجريبية",
    figures: ["حركة في الوردية", "حركة في الساعة", "امتلاء الساحة"],
    events: "أحداث ERP · مباشرة",
    rows: [
      { at: 1, state: "done", label: "تحميل · DEMU 300415", meta: "QC-3 · الخانة 22", time: "10:41:07" },
      { at: 4, state: "progress", label: "تفريغ · ANUU 482117", meta: "QC-1 · الخانة 14", time: "10:41:52" },
      { at: 5, state: "progress", label: "الشاحنة T-11 · إلى C-03", meta: "ممر الرصيف", time: "10:42:03" },
      { at: 8, state: "done", label: "استلام · ANUU 482117", meta: "الساحة C-03 · الطبقة 2", time: "10:42:18" },
    ],
    onShip: ["ANUU 482117", "40 قدم · 26.4 طن", "الخانة 14 ← الساحة C-03", "تفريغ بالرافعة QC-1"],
    inYard: ["ANUU 482117", "الساحة C-03 · الطبقة 2", "استُلمت 10:42:18", "فتح السجل"],
    toast: "ANUU 482117 في الساحة C-03 · ظهرت بعد 0.9 ثانية من حفظها في النظام",
  },
} as const

const ink = "var(--live-ink)"
const signal = "var(--live-signal)"
const faint = "var(--live-faint)"
const rule = "var(--live-rule)"
const still: CSSProperties = { outline: "none" }
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

/* the scene, top-down, in a 640 × 380 drawing: sea, ship, quay, three cranes, the truck lane, three yard blocks */
const bays = Array.from({ length: 36 }, (_, i) => ({ col: i % 12, row: Math.floor(i / 12) }))
const cranes = [{ x: 153, name: "QC-1" }, { x: 313, name: "QC-2" }, { x: 473, name: "QC-3" }]
const blocks = [{ x: 40, name: "A" }, { x: 240, name: "B" }, { x: 440, name: "C" }]
const slots = blocks.flatMap((b, bi) =>
  Array.from({ length: 24 }, (_, i) => ({ x: b.x + (i % 6) * 26, y: 256 + Math.floor(i / 6) * 26, fill: (i * 7 + bi * 3) % 5, key: `${b.name}${i}` })),
)
/* the box's path: ship bay 14 → under QC-1 → truck → along the lane → slot C-03 */
const box = { w: 26, h: 18 }
const target = { x: 492, y: 256 }

function Truck({ x, loaded }: { x: number; loaded: boolean }) {
  return (
    <>
      <rect x={x - 26} y={214} width={44} height={18} style={{ fill: "#cbd5e1", stroke: ink, strokeWidth: 1.5 }} />
      <rect x={x + 18} y={215} width={12} height={16} style={{ fill: ink }} />
      {loaded ? <rect x={x - 22} y={214} width={box.w + 10} height={box.h} style={{ fill: signal, stroke: ink, strokeWidth: 1.5 }} /> : null}
    </>
  )
}

/**
 * Steps: 0 the berth and the band (demo data), 1 a load event from QC-3 ticks
 * the moves, 2 the cursor opens container ANUU 482117 on the ship, 3 its
 * record, 4 QC-1 lifts it to the quay as the discharge event arrives, 5 it is
 * set on truck T-11, 6–7 the truck runs the lane, 8 the box lands in C-03, the
 * receive event arrives and the band ticks, 9 the cursor opens it in the yard,
 * 10 its yard record, 11 the round trip is confirmed under the events.
 */
export function Screen({ locale }: { locale: Locale }) {
  const c = t[locale]
  return (
    <LiveScreen label={c.label} title={c.app} steps={12} interval={1100}>
      <div className="live-band" data-at={0}>
        <span style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 12px" }}>
          <span className="live-band__title">{c.band}</span>
          <span style={{ padding: "2px 7px", border: "1px solid #93c5fd", color: "#93c5fd", fontSize: 10, letterSpacing: locale === "ar" ? 0 : "0.08em", textTransform: "uppercase" }}>
            {c.demo}
          </span>
        </span>
        <span className="live-band__figures" style={{ flexWrap: "wrap" }}>
          <span className="live-band__figure">
            <b className="live-num">
              <Tick bg={ink} values={[[0, "186"], [1, "187"], [8, "188"]]} />
            </b>
            <small>{c.figures[0]}</small>
          </span>
          <span className="live-band__figure">
            <b className="live-num">
              <Tick bg={ink} values={[[0, "24.6"], [8, "24.8"]]} />
            </b>
            <small>{c.figures[1]}</small>
          </span>
          <span className="live-band__figure">
            <b className="live-num">
              <Tick bg={ink} values={[[0, "71%"], [8, "72%"]]} />
            </b>
            <small>{c.figures[2]}</small>
          </span>
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "start" }}>
        <LCard style={{ flex: "3 1 22rem", minInlineSize: 0, padding: 8 }}>
          {/* a plan of the berth: it keeps its orientation in Arabic, so overlays on it use physical offsets */}
          <div style={{ position: "relative" }}>
            <svg viewBox="0 0 640 380" width="100%" style={{ display: "block", direction: "ltr" }} aria-hidden="true">
              <rect x="0" y="0" width="640" height="122" style={{ fill: "#e3edfb" }} />
              <rect x="0" y="122" width="640" height="258" style={{ fill: "var(--live-desk)" }} />
              {/* ship */}
              <path d="M30 26H540Q606 26 622 68Q606 112 540 112H30Z" style={{ fill: "#f8fafc", stroke: ink, strokeWidth: 2 }} />
              {bays.map(({ col, row }) => {
                const empty = (col + row * 5) % 7 === 3
                return (
                  <rect
                    key={`${col}-${row}`}
                    x={44 + col * 40}
                    y={34 + row * 25}
                    width={34}
                    height={20}
                    style={empty ? { fill: "none", stroke: "#cbd5e1", strokeDasharray: "3 3" } : { fill: row === 1 ? "#64748b" : "#334155" }}
                  />
                )
              })}
              {/* bay 14: the box we follow, then the empty slot it leaves */}
              <rect data-cursor-at={2} x="124" y="84" width="34" height="20" style={{ ...pressable, fill: signal, stroke: ink, strokeWidth: 1.5 }} />
              <rect data-at={4} x="124" y="84" width="34" height="20" style={{ ...still, fill: "#f8fafc", stroke: "#cbd5e1", strokeDasharray: "3 3" }} />
              {/* quay edge, crane rails, the lane */}
              <path d="M0 122H640" style={{ stroke: ink, strokeWidth: 3 }} />
              <path d="M0 134H640M0 192H640" style={{ stroke: rule, strokeWidth: 2 }} />
              <path d="M0 223H640" style={{ stroke: "#94a3b8", strokeWidth: 1.5, strokeDasharray: "10 8" }} />
              {/* cranes: portal on the quay, boom over the ship, trolley */}
              {cranes.map((cr) => (
                <g key={cr.name} style={{ fill: "none", stroke: ink, strokeWidth: 2 }}>
                  <rect x={cr.x - 30} y={128} width={60} height={70} />
                  <rect x={cr.x - 7} y={12} width={14} height={186} style={{ fill: "rgb(255 255 255 / 0.55)" }} />
                  <rect x={cr.x - 11} y={54} width={22} height={14} style={{ fill: ink }} />
                  <text x={cr.x} y={210} textAnchor="middle" style={{ fill: faint, stroke: "none", fontFamily: "var(--anu-mono)", fontSize: 13 }}>
                    {cr.name}
                  </text>
                </g>
              ))}
              {/* QC-1 at work */}
              <g data-only={4} style={still}>
                <rect x={146} y={12} width={14} height={186} style={{ fill: "rgb(37 99 235 / 0.18)", stroke: signal, strokeWidth: 2.5 }} />
                <rect x={140} y={148} width={box.w} height={box.h} style={{ fill: signal, stroke: ink, strokeWidth: 1.5 }} />
              </g>
              {/* yard blocks */}
              {blocks.map((b) => (
                <text key={b.name} x={b.x - 14} y={276} textAnchor="middle" style={{ fill: faint, fontFamily: "var(--anu-mono)", fontSize: 15 }}>
                  {b.name}
                </text>
              ))}
              {slots.map((s) =>
                s.x === target.x && s.y === target.y ? (
                  <rect key={s.key} x={s.x} y={s.y} width={22} height={22} style={{ fill: "none", stroke: signal, strokeDasharray: "3 2" }} />
                ) : (
                  <rect key={s.key} x={s.x} y={s.y} width={22} height={22} style={s.fill === 0 ? { fill: "none", stroke: "#cbd5e1" } : { fill: s.fill > 2 ? "#334155" : "#94a3b8" }} />
                ),
              )}
              {/* the truck's run */}
              <g data-only={4} style={still}>
                <Truck x={153} loaded={false} />
              </g>
              <g data-only={5} style={still}>
                <Truck x={153} loaded />
              </g>
              <g data-only={6} style={still}>
                <Truck x={320} loaded />
              </g>
              <g data-only={7} style={still}>
                <Truck x={497} loaded />
              </g>
              <g data-at={8} style={still}>
                <rect data-cursor-at={9} x={target.x} y={target.y} width={22} height={22} style={{ ...pressable, fill: signal, stroke: ink, strokeWidth: 1.5 }} />
              </g>
              <g data-only={8} style={still}>
                <Truck x={590} loaded={false} />
              </g>
            </svg>
            <LSheet only={3} style={{ left: "26%", top: "4%", insetInlineEnd: "auto" }}>
              {c.onShip.map((line, i) => (
                <span key={line} className={i === 0 ? "live-num" : undefined} style={i === 0 ? { color: "#93c5fd" } : undefined}>
                  {line}
                </span>
              ))}
            </LSheet>
            <LSheet only={10} style={{ left: "34%", top: "30%", insetInlineEnd: "auto" }}>
              {c.inYard.map((line, i) => (
                <span key={line} className={i === 0 ? "live-num" : undefined} style={i === 0 ? { color: "#93c5fd" } : undefined}>
                  {line}
                </span>
              ))}
            </LSheet>
          </div>
        </LCard>

        <LCard style={{ flex: "2 1 15rem", minInlineSize: 0, gap: 0, padding: 0 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", borderBlockEnd: "1px solid var(--live-rule)", color: faint }}>
            <LGlyph state="progress" />
            {c.events}
          </span>
          {c.rows.map((row) => (
            <LRow key={row.time} at={row.at} state={row.state} label={row.label} meta={row.meta} value={row.time} />
          ))}
          <div className="live-row" data-at={11} style={{ borderInlineStart: `3px solid ${signal}`, borderBlockEnd: 0, background: "#eff6ff" }}>
            <LGlyph state="done" />
            <span className="live-row__label">{c.toast}</span>
          </div>
        </LCard>
      </div>
    </LiveScreen>
  )
}
