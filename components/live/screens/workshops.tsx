import type { CSSProperties, ReactNode } from "react"

import { LBand, LGlyph } from "@/components/live/kit"
import { LiveScreen } from "@/components/live/live-screen"
import type { Locale } from "@/lib/i18n"

const t = {
  en: {
    label:
      "ANU Workshops from the drawing to the shop floor: a wardrobe is drawn to size, the engine breaks it into panels with their sizes in millimetres and edge banding, the panels are nested on a board with the offcuts kept, and the order is released to the shop floor with a printed part label",
    app: "Workshops · Designer",
    band: "Wardrobe W-160 · Bedroom 2",
    figures: [
      { value: "14", label: "panels", at: 5 },
      { value: "4", label: "boards", at: 9 },
      { value: "IQD 1.84M", label: "price", at: 7 },
    ],
    stages: ["Design", "Parts", "Nesting", "Shop floor"],
    template: "Template · Wardrobe, 2 bays",
    props: [
      ["Width", "1600", "mm"],
      ["Height", "2400", "mm"],
      ["Depth", "600", "mm"],
      ["Doors", "2", "· oak"],
    ],
    list: "Cut list",
    legend: "edge band",
    hint: "The parts appear when the engine runs",
    running: "The engine is building the parts",
    signed: "Built on the server · signed",
    parts: [
      ["P01", "Side", "MFC white 18", "2400 × 580", "2", "front"],
      ["P02", "Top and bottom", "MFC white 18", "1564 × 580", "2", "front"],
      ["P03", "Divider", "MFC white 18", "2264 × 560", "1", "front"],
      ["P04", "Shelf", "MFC white 18", "772 × 540", "4", "front"],
      ["P05", "Plinth", "MFC white 18", "1564 × 100", "2", "front"],
      ["P06", "Door", "MFC oak 18", "2296 × 797", "2", "all"],
      ["P07", "Back", "HDF 3", "1596 × 2296", "1", "none"],
      ["H01", "Hinge 110°, soft-close", "placed by rule · 4 per door", "", "8", "none"],
    ],
    board: "Board 1 of 4 · MFC white 18 mm",
    usage: [
      ["75.3 %", "used"],
      ["20.3 %", "offcuts kept"],
      ["4.4 %", "waste"],
    ],
    released: "Released to the shop floor",
    releasedMeta: "MO/2026/0157 · 14 panels, 14 labels",
    labelName: "Shelf",
    labelMeta: "Board 2 · edge: front",
  },
  ar: {
    label:
      "أنو للورش من الرسم إلى أرضية الورشة: تُرسم خزانة بمقاساتها، ويفكّكها المحرك إلى ألواح بمقاساتها بالمليمتر وشريط حوافها، وتُرتَّب الألواح على لوح الخام مع حفظ البقايا، ثم يُطلق أمر التصنيع إلى الورشة ويُطبع ملصق القطعة",
    app: "الورش · المصمّم",
    band: "خزانة W-160 · غرفة النوم 2",
    figures: [
      { value: "14", label: "قطعة", at: 5 },
      { value: "4", label: "ألواح خام", at: 9 },
      { value: "IQD 1.84M", label: "السعر", at: 7 },
    ],
    stages: ["التصميم", "القطع", "ترتيب القص", "الورشة"],
    template: "قالب · خزانة بقسمين",
    props: [
      ["العرض", "1600", "مم"],
      ["الارتفاع", "2400", "مم"],
      ["العمق", "600", "مم"],
      ["الأبواب", "2", "· بلوط"],
    ],
    list: "قائمة القطع",
    legend: "شريط حافة",
    hint: "تظهر القطع حين يعمل المحرك",
    running: "المحرك يبني القطع",
    signed: "بُنيت على الخادم · موقّعة",
    parts: [
      ["P01", "جانب", "ميلامين أبيض 18", "2400 × 580", "2", "front"],
      ["P02", "سقف وأرضية", "ميلامين أبيض 18", "1564 × 580", "2", "front"],
      ["P03", "فاصل", "ميلامين أبيض 18", "2264 × 560", "1", "front"],
      ["P04", "رف", "ميلامين أبيض 18", "772 × 540", "4", "front"],
      ["P05", "قاعدة", "ميلامين أبيض 18", "1564 × 100", "2", "front"],
      ["P06", "باب", "ميلامين بلوط 18", "2296 × 797", "2", "all"],
      ["P07", "ظهر", "HDF 3", "1596 × 2296", "1", "none"],
      ["H01", "مفصلة 110° بإغلاق هادئ", "توضع بقاعدة · 4 لكل باب", "", "8", "none"],
    ],
    board: "اللوح 1 من 4 · ميلامين أبيض 18 مم",
    usage: [
      ["75.3 %", "مستغَل"],
      ["20.3 %", "بقايا محفوظة"],
      ["4.4 %", "هدر"],
    ],
    released: "أُطلق إلى أرضية الورشة",
    releasedMeta: "MO/2026/0157 · 14 قطعة، 14 ملصقاً",
    labelName: "رف",
    labelMeta: "اللوح 2 · الحافة: الأمامية",
  },
} as const

const ink = "#090b11"
const signal = "#2563eb"
const cover: CSSProperties = { position: "absolute", inset: 0 }
const mono: CSSProperties = { fontFamily: "var(--anu-mono)" }
/** technical drawings read the same way in both languages */
const drawing: CSSProperties = { display: "block", inlineSize: "100%", blockSize: "100%", direction: "ltr", outline: "none" }
const still: CSSProperties = { outline: "none" }

/** A road stage that stays visible: solid from `now`, tinted once the next stage starts. */
function Stage({ label, now, past, cursorAt }: { label: string; now: number; past?: number; cursorAt?: number }) {
  const lit: CSSProperties = { ...cover, ...still, background: signal, borderColor: signal, color: "#fff" }
  const passed: CSSProperties = { ...cover, ...still, background: "#eff6ff", color: ink }
  return (
    <span data-cursor-at={cursorAt} style={{ position: "relative", display: "grid", flex: 1, minInlineSize: 0 }}>
      <span className="live-road__stage">{label}</span>
      <span className="live-road__stage" data-at={now} style={lit}>
        {label}
      </span>
      {past !== undefined ? (
        <span className="live-road__stage" data-at={past} style={passed}>
          {label}
        </span>
      ) : null}
    </span>
  )
}

/** A value box that is empty until step `at`, then types itself in. */
function Typed({ value, at, cursorAt }: { value: ReactNode; at: number; cursorAt?: number }) {
  const box: CSSProperties = { minBlockSize: 0, padding: "2px 6px" }
  return (
    <span style={{ position: "relative", display: "block" }}>
      <span className="live-field__value" style={box}>
        {" "}
      </span>
      <span className="live-field" data-at={at} data-cursor-at={cursorAt} style={{ ...cover, ...still }}>
        <span className="live-field__value" style={box}>
          {value}
        </span>
      </span>
    </span>
  )
}

/** Which edges carry edge band: the front edge, all four, or none. */
function EdgeMark({ edge }: { edge: string }) {
  return (
    <svg viewBox="0 0 20 13" width="20" height="13" aria-hidden="true" style={{ flex: "none", direction: "ltr" }}>
      <rect x="1.5" y="1.5" width="17" height="10" fill="#fff" stroke="#cbd5e1" />
      {edge === "all" ? <rect x="1.5" y="1.5" width="17" height="10" fill="none" stroke={signal} strokeWidth="2.5" /> : null}
      {edge === "front" ? <line x1="1.5" x2="18.5" y1="11.5" y2="11.5" stroke={signal} strokeWidth="2.5" /> : null}
    </svg>
  )
}

/** A deterministic barcode for the part label. */
const bars = [2, 1, 1, 3, 1, 2, 2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 1, 3, 1, 2, 2, 1, 1, 3, 2, 1]
const barcode = bars.reduce<{ x: number; rects: { x: number; w: number }[] }>(
  (acc, w, i) => ({ x: acc.x + w, rects: i % 2 === 0 ? [...acc.rects, { x: acc.x, w }] : acc.rects }),
  { x: 0, rects: [] },
)

/** The wardrobe in elevation, millimetres as user units. */
function Elevation() {
  const panel = { fill: "#cbd5e1", stroke: ink, strokeWidth: 6 }
  const shelf = { fill: "#e2e8f0", stroke: ink, strokeWidth: 6 }
  return (
    <svg viewBox="0 0 4480 2800" preserveAspectRatio="xMidYMid meet" style={drawing} aria-hidden="true">
      <defs>
        <pattern id="ws-grid" width="200" height="200" patternUnits="userSpaceOnUse">
          <path d="M200 0H0V200" fill="none" stroke="#e2e8f0" strokeWidth="5" />
        </pattern>
      </defs>
      <rect width="4480" height="2800" fill="url(#ws-grid)" />
      <line x1="180" x2="2380" y1="2640" y2="2640" stroke="#94a3b8" strokeWidth="12" />

      {/* step 1: the carcass */}
      <g data-at={1} style={still}>
        <rect x="480" y="240" width="1600" height="2400" fill="#fff" stroke={ink} strokeWidth="14" />
        <rect x="480" y="240" width="18" height="2400" {...panel} />
        <rect x="2062" y="240" width="18" height="2400" {...panel} />
        <rect x="498" y="240" width="1564" height="18" {...panel} />
        <rect x="498" y="2522" width="1564" height="18" {...panel} />
        <rect x="518" y="2540" width="1524" height="100" fill="#e2e8f0" stroke={ink} strokeWidth="6" />
      </g>

      {/* step 2: the divider, shelves, a rail with clothes */}
      <g data-at={2} style={still}>
        <rect x="1271" y="258" width="18" height="2264" {...panel} />
        <rect x="498" y="520" width="773" height="18" {...shelf} />
        {[840, 1400, 1960].map((y) => (
          <rect key={y} x="1289" y={y} width="773" height="18" {...shelf} />
        ))}
        <line x1="540" x2="1230" y1="660" y2="660" stroke={ink} strokeWidth="14" strokeLinecap="round" />
        {[650, 860, 1070].map((x, i) => (
          <g key={x}>
            <path d={`M${x} 660 l-110 120 h220 z`} fill="none" stroke="#64748b" strokeWidth="8" />
            <rect x={x - 100} y="780" width="200" height={i === 1 ? 1100 : 860} fill="#eff6ff" stroke="#bfdbfe" strokeWidth="8" />
          </g>
        ))}
        {[1400, 1960].map((y) => (
          <rect key={y} x="1380" y={y - 150} width="590" height="150" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="6" />
        ))}
      </g>

      {/* step 3: the doors with their hinges, and the dimensions */}
      <g data-at={3} style={still}>
        <rect x="484" y="244" width="791" height="2290" fill={signal} fillOpacity="0.07" stroke={signal} strokeWidth="10" />
        <rect x="1285" y="244" width="791" height="2290" fill={signal} fillOpacity="0.07" stroke={signal} strokeWidth="10" />
        <line x1="1215" x2="1215" y1="1240" y2="1560" stroke={ink} strokeWidth="18" strokeLinecap="round" />
        <line x1="1345" x2="1345" y1="1240" y2="1560" stroke={ink} strokeWidth="18" strokeLinecap="round" />
        {[420, 1000, 1760, 2380].map((y) => (
          <g key={y}>
            <circle cx="532" cy={y} r="24" fill={signal} />
            <circle cx="2028" cy={y} r="24" fill={signal} />
          </g>
        ))}
        <g stroke="#64748b" strokeWidth="6">
          <line x1="480" x2="2080" y1="120" y2="120" />
          <line x1="480" x2="480" y1="70" y2="200" />
          <line x1="2080" x2="2080" y1="70" y2="200" />
          <line x1="330" x2="330" y1="240" y2="2640" />
          <line x1="260" x2="400" y1="240" y2="240" />
          <line x1="260" x2="400" y1="2640" y2="2640" />
        </g>
        <g fill="#334155" fontSize="130" textAnchor="middle" style={mono}>
          <text x="1280" y="90">
            1600
          </text>
          <text x="270" y="1440" transform="rotate(-90 270 1440)">
            2400
          </text>
        </g>
      </g>
    </svg>
  )
}

/** Board 1 nested: parts in blue with their banded edge, offcuts hatched and kept. */
function Nest() {
  const part = { fill: "#dbeafe", stroke: signal, strokeWidth: 8 }
  const offcut = { fill: "url(#ws-hatch)", stroke: "#94a3b8", strokeWidth: 6, strokeDasharray: "30 20" }
  const band = { stroke: "#1e3a8a", strokeWidth: 22 }
  return (
    <svg viewBox="-40 -40 2880 2150" preserveAspectRatio="xMidYMid meet" style={drawing} aria-hidden="true">
      <defs>
        <pattern id="ws-hatch" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" x2="0" y1="0" y2="60" stroke="#cbd5e1" strokeWidth="14" />
        </pattern>
      </defs>
      <rect width="2800" height="2070" fill="#fff" stroke="#64748b" strokeWidth="10" />

      <g data-at={9} style={still}>
        <rect x="0" y="0" width="2400" height="580" {...part} />
        <rect x="0" y="584" width="2400" height="580" {...part} />
        <rect x="0" y="1168" width="2264" height="560" {...part} />
        <line x1="0" x2="2400" y1="569" y2="569" {...band} />
        <line x1="0" x2="2400" y1="1153" y2="1153" {...band} />
        <line x1="0" x2="2264" y1="1717" y2="1717" {...band} />
        <g fill="#1e3a8a" fontSize="120" textAnchor="middle" style={mono}>
          <text x="1200" y="330">
            P01 · 2400 × 580
          </text>
          <text x="1200" y="914">
            P01 · 2400 × 580
          </text>
          <text x="1132" y="1488">
            P03 · 2264 × 560
          </text>
        </g>
      </g>

      <g data-at={10} style={still}>
        <rect x="0" y="1732" width="1564" height="100" {...part} />
        <rect x="0" y="1836" width="1564" height="100" {...part} />
        <line x1="0" x2="1564" y1="1826" y2="1826" stroke="#1e3a8a" strokeWidth="12" />
        <line x1="0" x2="1564" y1="1930" y2="1930" stroke="#1e3a8a" strokeWidth="12" />
        <g fill="#1e3a8a" fontSize="70" textAnchor="middle" style={mono}>
          <text x="782" y="1806">
            P05 · 1564 × 100
          </text>
          <text x="782" y="1910">
            P05 · 1564 × 100
          </text>
        </g>
        <rect x="2404" y="0" width="396" height="580" {...offcut} />
        <rect x="2404" y="584" width="396" height="580" {...offcut} />
        <rect x="2268" y="1168" width="532" height="560" {...offcut} />
        <rect x="1568" y="1732" width="1232" height="338" {...offcut} />
        <g fill="#475569" fontSize="80" textAnchor="middle" style={mono}>
          <text x="2184" y="1928">
            1232 × 338
          </text>
        </g>
      </g>
    </svg>
  )
}

/**
 * Steps: 0 the band, the stages, an empty drawing and the template card;
 * 1 the cursor sets width, height and depth and the carcass is drawn;
 * 2 the divider, shelves and rail; 3 the cursor sets the doors: doors,
 * hinges and dimensions; 4 the cursor runs Parts and the engine works;
 * 5–7 the cut list fills with sizes in mm, edge banding and hinges placed by
 * rule, the figures land; 8 the cursor opens Nesting and board 1 is laid out;
 * 9–10 the panels pack onto it, offcuts kept, waste measured; 11 the cursor
 * releases to the shop floor; 12 released; 13 the part label prints.
 */
export function Screen({ locale }: { locale: Locale }) {
  const c = t[locale]
  const rowAt = [5, 5, 5, 6, 6, 7, 7, 7]
  return (
    <LiveScreen label={c.label} title={c.app} steps={14} interval={1150}>
      <LBand title={c.band} at={0} figures={c.figures.map((f) => ({ ...f }))} />

      <div className="live-road">
        <Stage label={c.stages[0]} now={0} past={4} />
        <Stage label={c.stages[1]} now={4} past={8} cursorAt={4} />
        <Stage label={c.stages[2]} now={8} past={11} cursorAt={8} />
        <Stage label={c.stages[3]} now={11} cursorAt={11} />
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {/* the canvas: the designer, then the nesting of board 1 over it */}
        <div
          style={{
            position: "relative",
            flex: "1.25 1 20rem",
            minInlineSize: 0,
            aspectRatio: "16 / 10",
            background: "#fff",
            border: "1px solid var(--live-rule)",
            overflow: "hidden",
          }}
        >
          <Elevation />
          <div
            style={{
              position: "absolute",
              insetBlockStart: 8,
              right: 8,
              inlineSize: "44%",
              display: "grid",
              gap: 5,
              padding: 8,
              background: "rgb(255 255 255 / 0.94)",
              border: "1px solid var(--live-rule)",
              boxShadow: "0 10px 24px -14px rgb(9 11 17 / 0.4)",
              fontSize: 11,
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 500 }}>
              <LGlyph state="progress" />
              {c.template}
            </span>
            {c.props.map(([name, value, unit], i) => (
              <span key={name} style={{ display: "grid", gridTemplateColumns: "minmax(0, 0.8fr) minmax(0, 1fr)", alignItems: "center", gap: 6 }}>
                <small style={{ color: "var(--live-faint)", fontSize: 10.5 }}>{name}</small>
                <Typed
                  at={i === 3 ? 3 : 1}
                  cursorAt={i === 0 ? 1 : i === 3 ? 3 : undefined}
                  value={
                    <>
                      <span className="live-num">{value}</span> {unit}
                    </>
                  }
                />
              </span>
            ))}
          </div>

          <div data-at={8} style={{ ...cover, ...still, display: "grid", gridTemplateRows: "auto minmax(0, 1fr) auto", background: "#f8fafc" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", fontSize: 11, borderBlockEnd: "1px solid var(--live-rule)" }}>
              <LGlyph state="progress" />
              {c.board}
              <span className="live-num" style={{ marginInlineStart: "auto", color: "var(--live-faint)" }}>
                2800 × 2070
              </span>
            </span>
            <Nest />
            <span data-at={10} style={{ ...still, display: "flex", flexWrap: "wrap", gap: "2px 14px", padding: "6px 10px", fontSize: 11, borderBlockStart: "1px solid var(--live-rule)" }}>
              {c.usage.map(([value, name], i) => (
                <span key={name} style={{ display: "inline-flex", gap: 5, alignItems: "baseline" }}>
                  <b className="live-num" style={{ fontWeight: 500, color: i === 0 ? signal : ink }}>
                    {value}
                  </b>
                  <small style={{ color: "var(--live-faint)" }}>{name}</small>
                </span>
              ))}
            </span>
          </div>
        </div>

        {/* the cut list the engine builds from the same model */}
        <div style={{ flex: "1 1 17rem", minInlineSize: 0, display: "grid", background: "var(--live-paper)", border: "1px solid var(--live-rule)" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 10px", padding: "8px 10px", borderBlockEnd: "1px solid var(--live-rule)" }}>
            <b style={{ fontWeight: 500 }}>{c.list}</b>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, color: "var(--live-faint)", fontSize: 11 }}>
              <EdgeMark edge="front" />
              {c.legend}
            </span>
            <span style={{ position: "relative", marginInlineStart: "auto", fontSize: 11 }}>
              <span data-only={4} style={{ ...still, display: "inline-flex", alignItems: "center", gap: 6, color: signal, whiteSpace: "nowrap" }}>
                <LGlyph state="progress" />
                {c.running}
              </span>
              <span data-at={5} style={{ ...cover, ...still, display: "inline-flex", alignItems: "center", justifyContent: "end", gap: 6, background: "var(--live-paper)", whiteSpace: "nowrap" }}>
                <LGlyph state="done" />
                {c.signed}
              </span>
            </span>
          </div>
          <div style={{ position: "relative", display: "grid" }}>
            <span
              style={{
                position: "absolute",
                insetInline: 10,
                insetBlockStart: 10,
                padding: "14px 10px",
                border: "1px dashed #cbd5e1",
                color: "var(--live-faint)",
                fontSize: 11,
                textAlign: "center",
              }}
            >
              {c.hint}
            </span>
            {c.parts.map(([code, name, meta, size, qty, edge], i) => (
              <div key={code} className="live-row" data-at={rowAt[i]} style={{ position: "relative", gap: 8, padding: "6px 10px" }}>
                <span className="live-num" style={{ color: "var(--live-faint)", fontSize: 11 }}>
                  {code}
                </span>
                <span className="live-row__label">
                  {name}
                  <small>{meta}</small>
                </span>
                {size ? (
                  <span className="live-num" style={{ whiteSpace: "nowrap" }}>
                    {size}
                  </span>
                ) : null}
                <span className="live-num" style={{ minInlineSize: "2.2em", textAlign: "end", color: "var(--live-soft)" }}>
                  ×{qty}
                </span>
                {code.startsWith("P") ? <EdgeMark edge={edge} /> : <span style={{ inlineSize: 20, flex: "none" }} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* released: the toast, then the part label printing above it */}
      <div className="live-toast" data-at={12}>
        <LGlyph state="done" />
        <span style={{ display: "grid" }}>
          {c.released}
          <small style={{ color: "var(--live-faint)", fontSize: 11 }}>{c.releasedMeta}</small>
        </span>
      </div>
      <span
        className="live-field"
        data-at={13}
        style={{ ...still, position: "absolute", zIndex: 4, insetInlineEnd: 14, insetBlockEnd: 84, inlineSize: "min(14.5rem, calc(100% - 28px))" }}
      >
        <span
          className="live-field__value"
          style={{ display: "grid", gap: 4, padding: "8px 10px", whiteSpace: "normal", boxShadow: "0 18px 40px -16px rgb(9 11 17 / 0.45)" }}
        >
          <span style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <b className="live-num" style={{ fontSize: 20, fontWeight: 500 }}>
              P04
            </b>
            <span>{c.labelName}</span>
            <span style={{ marginInlineStart: "auto" }}>
              <EdgeMark edge="front" />
            </span>
          </span>
          <span className="live-num" style={{ fontSize: 13 }}>
            772 × 540 × 18
          </span>
          <svg viewBox={`0 0 ${barcode.x} 10`} preserveAspectRatio="none" style={{ inlineSize: "100%", blockSize: 26, direction: "ltr" }} aria-hidden="true">
            {barcode.rects.map((r) => (
              <rect key={r.x} x={r.x} y="0" width={r.w} height="10" fill={ink} />
            ))}
          </svg>
          <span style={{ display: "grid", fontSize: 10.5, color: "var(--live-soft)" }}>
            <span className="live-num">MO/2026/0157 · 07/14</span>
            <span>{c.labelMeta}</span>
          </span>
        </span>
      </span>
    </LiveScreen>
  )
}
