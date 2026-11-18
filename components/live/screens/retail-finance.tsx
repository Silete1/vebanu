import type { CSSProperties } from "react"

import { LButton, LCard, LField, LGlyph, LRow } from "@/components/live/kit"
import { LiveScreen } from "@/components/live/live-screen"
import type { Locale } from "@/lib/i18n"

const t = {
  en: {
    label: "ANU Retail Finance at a retailer's treasury: today's dollar rate per 100 USD is recorded and moves, an exchange-house transfer is posted, the Main, Showroom and Driver cash boxes update, and a driver's delivery is confirmed in the portal and approved",
    app: "Accounting · Treasury",
    band: "Treasury · today",
    figures: ["IQD per 100 USD", "exchange house · USD", "cash boxes · IQD"],
    rate: "Today's rate · per 100 USD",
    missing: "No rate recorded today",
    yesterday: "yesterday 146,250",
    record: "Record",
    field: ["Recorded 08:12", "Updated 12:30"],
    transfer: "Exchange-house transfer · fund and convert",
    fields: [
      ["Exchange house", "Exchange house B"],
      ["From", "Main box"],
      ["Amount", "USD 50,000"],
      ["At rate", "146,400"],
    ],
    debit: "Debit",
    post: "Post",
    posted: ["Posted · EXH/2026/0118", "reserved, so the balance cannot be spent twice"],
    boxes: ["Main", "Showroom", "Driver"],
    guard: "never negative",
    portal: "Driver portal · today",
    delivery: "Delivery D-0912 · sofa set, 3 pieces · Zayouna",
    onWay: "On the way · driver 3",
    delivered: "Delivered · collected IQD 2,750,000 · receipt photo",
    approve: "Approve",
    toast: "Collection approved · Driver box IQD 2,750,000",
  },
  ar: {
    label: "المالية للتجزئة من أنو في خزينة متجر: يُسجَّل سعر الدولار لكل 100 دولار ويتحرك، ويُرحَّل تحويل عبر شركة صرافة، وتتحدث صناديق النقد الرئيسي والمعرض والسائق، ويؤكد السائق التسليم من البوابة ويُعتمد",
    app: "المحاسبة · الخزينة",
    band: "الخزينة · اليوم",
    figures: ["دينار لكل 100 دولار", "شركة الصرافة · دولار", "صناديق النقد · دينار"],
    rate: "سعر اليوم · لكل 100 دولار",
    missing: "لم يُسجَّل سعر اليوم",
    yesterday: "أمس 146,250",
    record: "تسجيل",
    field: ["سُجِّل 08:12", "حُدِّث 12:30"],
    transfer: "تحويل عبر شركة الصرافة · تمويل وتحويل",
    fields: [
      ["شركة الصرافة", "صرافة B"],
      ["من", "الصندوق الرئيسي"],
      ["المبلغ", "USD 50,000"],
      ["بسعر", "146,400"],
    ],
    debit: "المدين",
    post: "ترحيل",
    posted: ["رُحِّل · EXH/2026/0118", "الرصيد محجوز فلا يُصرف مرتين"],
    boxes: ["الرئيسي", "المعرض", "السائق"],
    guard: "لا رصيد سالب",
    portal: "بوابة السائقين · اليوم",
    delivery: "توصيل D-0912 · طقم كنب، 3 قطع · زيونة",
    onWay: "في الطريق · السائق 3",
    delivered: "سُلِّم · قُبض IQD 2,750,000 · صورة الوصل",
    approve: "اعتماد",
    toast: "اعتُمد القبض · صندوق السائق IQD 2,750,000",
  },
} as const

const ink = "var(--live-ink)"
const signal = "var(--live-signal)"
const faint = "var(--live-faint)"
const paper = "var(--live-paper)"
const still: CSSProperties = { outline: "none" }

/** Values that replace one another in place; each later one covers the one before. */
function Tick({ values, bg }: { values: readonly (readonly [number, string])[]; bg: string }) {
  return (
    <span style={{ display: "inline-grid" }}>
      {values.map(([at, value], i) => (
        <span key={at} data-at={i > 0 ? at : undefined} style={{ gridArea: "1 / 1", overflow: "hidden", background: bg }}>
          {value}
        </span>
      ))}
    </span>
  )
}

/* the week's rates per 100 USD, the last two recorded during the loop */
const rates = [145900, 146100, 146050, 146250, 146400, 146550]
const point = (v: number, i: number) => ({ x: 10 + i * 36, y: 45 - ((v - 145800) / 800) * 40 })
const points = rates.map(point)

const boxes: { values: [number, string][] }[] = [
  { values: [[0, "128.4M"], [6, "55.2M"]] },
  { values: [[0, "18.6M"], [7, "21.85M"]] },
  { values: [[0, "0"], [10, "2.75M"]] },
]

/**
 * Steps: 0 the band, no rate recorded today (amber), 1 the cursor presses
 * Record, 2 today's rate types in, 3–4 the exchange-house transfer fills,
 * 5 the cursor posts it, 6 the Main box pays out and the exchange house holds
 * the dollars, 7 the rate moves at noon and a showroom sale lands, 8 the
 * driver confirms the delivery in the portal, 9 the cursor approves the
 * collection, 10 the Driver box takes it in and the approval shows in the
 * portal, 11 hold.
 */
export function Screen({ locale }: { locale: Locale }) {
  const c = t[locale]
  return (
    <LiveScreen label={c.label} title={c.app} steps={12} interval={1100}>
      <div className="live-band" data-at={0}>
        <span className="live-band__title">{c.band}</span>
        <span className="live-band__figures" style={{ flexWrap: "wrap" }}>
          <span className="live-band__figure">
            <b className="live-num">
              <Tick bg={ink} values={[[0, "—"], [2, "146,400"], [7, "146,550"]]} />
            </b>
            <small>{c.figures[0]}</small>
          </span>
          <span className="live-band__figure">
            <b className="live-num">
              <Tick bg={ink} values={[[0, "12,400"], [6, "62,400"]]} />
            </b>
            <small>{c.figures[1]}</small>
          </span>
          <span className="live-band__figure">
            <b className="live-num">
              <Tick bg={ink} values={[[0, "147.0M"], [6, "73.8M"], [7, "77.05M"], [10, "79.8M"]]} />
            </b>
            <small>{c.figures[2]}</small>
          </span>
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "stretch" }}>
        <LCard style={{ flex: "1 1 14rem", minInlineSize: 0, alignContent: "start" }}>
          <small style={{ color: faint }}>{c.rate}</small>
          <div style={{ display: "grid" }}>
            <div style={{ gridArea: "1 / 1", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, padding: "6px 8px", background: "#fef3c7", border: "1px solid #f59e0b", color: "#92400e" }}>
              <span style={{ flex: 1, display: "grid" }}>
                {c.missing}
                <small style={{ fontSize: 10 }}>{c.yesterday}</small>
              </span>
              <span data-cursor-at={1}>
                <LButton>{c.record}</LButton>
              </span>
            </div>
            <div data-at={2} style={{ gridArea: "1 / 1", background: paper }}>
              <LField label={c.field[0]} value="146,400" />
            </div>
            <div data-at={7} style={{ gridArea: "1 / 1", background: paper }}>
              <LField label={c.field[1]} value="146,550" />
            </div>
          </div>
          {/* the week of rates; time runs left to right in both languages */}
          <svg viewBox="0 0 200 52" width="100%" style={{ display: "block", direction: "ltr" }} aria-hidden="true">
            <path d="M0 50H200" style={{ stroke: "var(--live-rule)", strokeWidth: 1 }} />
            <polyline points={points.slice(0, 4).map((p) => `${p.x},${p.y}`).join(" ")} style={{ fill: "none", stroke: faint, strokeWidth: 1.6 }} />
            {points.slice(0, 4).map((p) => (
              <rect key={p.x} x={p.x - 2} y={p.y - 2} width="4" height="4" style={{ fill: faint }} />
            ))}
            {[4, 5].map((i) => (
              <g key={i} data-at={i === 4 ? 2 : 7} style={still}>
                <line x1={points[i - 1].x} y1={points[i - 1].y} x2={points[i].x} y2={points[i].y} style={{ stroke: signal, strokeWidth: 2 }} />
                <rect x={points[i].x - 3} y={points[i].y - 3} width="6" height="6" style={{ fill: signal }} />
              </g>
            ))}
          </svg>
        </LCard>

        <LCard style={{ flex: "1.5 1 18rem", minInlineSize: 0, alignContent: "start" }}>
          <small style={{ color: faint }}>{c.transfer}</small>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 8 }}>
            {c.fields.map(([label, value], i) => (
              <LField key={label} at={i < 2 ? 3 : 4} label={label} value={value} />
            ))}
          </div>
          {/* the debit and Post, then the posted entry in their place */}
          <div style={{ display: "grid" }}>
            <div style={{ gridArea: "1 / 1", alignSelf: "center", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
              <span data-at={4} style={{ ...still, color: ink }}>
                {c.debit} <b className="live-num" style={{ fontWeight: 600 }}>IQD 73,200,000</b>
              </span>
              <span data-cursor-at={5}>
                <LButton>{c.post}</LButton>
              </span>
            </div>
            <div data-at={6} style={{ gridArea: "1 / 1" }}>
              <LRow state="done" label={c.posted[0]} meta={c.posted[1]} value="73,200,000" />
            </div>
          </div>
        </LCard>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 8 }}>
        {boxes.map((box, i) => (
          <LCard key={c.boxes[i]} style={{ gap: 2, padding: "10px 12px" }}>
            <small style={{ color: faint }}>{c.boxes[i]} · IQD</small>
            <b className="live-num" style={{ fontSize: 16, fontWeight: 400 }}>
              <Tick bg={paper} values={box.values} />
            </b>
            <small style={{ display: "flex", alignItems: "center", gap: 5, color: faint, fontSize: 10 }}>
              <LGlyph state="done" />
              {c.guard}
            </small>
          </LCard>
        ))}
      </div>

      <LCard style={{ gap: 0, padding: 0 }}>
        <span style={{ padding: "8px 12px", borderBlockEnd: "1px solid var(--live-rule)", color: faint }}>{c.portal}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: paper, paddingInlineEnd: 10 }}>
          <div style={{ display: "grid", flex: 1, minInlineSize: 0 }}>
            <div style={{ gridArea: "1 / 1" }}>
              <LRow state="progress" label={c.delivery} meta={c.onWay} />
            </div>
            <div data-at={8} style={{ gridArea: "1 / 1" }}>
              <LRow state="done" label={c.delivery} meta={c.delivered} />
            </div>
          </div>
          <span data-cursor-at={9}>
            <LButton ghost>{c.approve}</LButton>
          </span>
        </div>
        <div className="live-row" data-at={10} style={{ borderInlineStart: `3px solid ${signal}`, borderBlockEnd: 0, background: "#eff6ff" }}>
          <LGlyph state="done" />
          <span className="live-row__label">{c.toast}</span>
        </div>
      </LCard>
    </LiveScreen>
  )
}
