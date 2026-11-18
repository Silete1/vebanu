import type { CSSProperties } from "react"

import { LBars, LButton, LCard, LGlyph, LRow, LSheet } from "@/components/live/kit"
import { LiveScreen } from "@/components/live/live-screen"
import type { Locale } from "@/lib/i18n"

const t = {
  en: {
    label: "ANU Construction on a residential tower: an available unit is reserved and then sold, its instalment schedule appears, and the thirteen-week cash forecast updates",
    app: "Construction · Unit sales · Tower B",
    band: "Tower B · Dijla Gardens",
    figures: ["sold of 28", "reserved", "collected"],
    units: "Units · 7 floors",
    desk: ["Sales desk · Tower B", "6 units available · 2 and 3 bedrooms", "from IQD 1.5M per m²"],
    legend: ["available", "reserved", "sold"],
    sheet: ["B-0703 · 3 bedrooms · 142 m²", "IQD 213,000,000", "Reserve · deposit IQD 5,000,000"],
    reserved: ["B-0703 · reserved", "Deposit IQD 5,000,000 received · refundable"],
    sign: "Sign the contract · 20% + 16 quarterly",
    plan: "Instalment schedule · B-0703",
    down: ["Down payment 20%", "paid on signing"],
    quarterly: ["16 quarterly instalments", "first due 15 Apr · WhatsApp reminder"],
    forecast: "Cash forecast · 13 weeks",
    weeks: ["W1", "W13"],
    toast: "Contract B-0703 signed · instalments invoiced as they fall due",
  },
  ar: {
    label: "أنو للإنشاءات على برج سكني: وحدة متاحة تُحجز ثم تُباع، ويظهر جدول أقساطها، ويتحدث توقع النقد لثلاثة عشر أسبوعًا",
    app: "الإنشاءات · بيع الوحدات · البرج B",
    band: "البرج B · حدائق دجلة",
    figures: ["مباعة من 28", "محجوزة", "المحصَّل"],
    units: "الوحدات · 7 طوابق",
    desk: ["مكتب المبيعات · البرج B", "6 وحدات متاحة · غرفتان وثلاث غرف", "من IQD 1.5M للمتر المربع"],
    legend: ["متاحة", "محجوزة", "مباعة"],
    sheet: ["B-0703 · 3 غرف نوم · 142 م²", "IQD 213,000,000", "حجز · عربون IQD 5,000,000"],
    reserved: ["B-0703 · محجوزة", "استُلم عربون IQD 5,000,000 · قابل للاسترداد"],
    sign: "توقيع العقد · 20% و16 قسطًا فصليًا",
    plan: "جدول الأقساط · B-0703",
    down: ["الدفعة المقدمة 20%", "دُفعت عند التوقيع"],
    quarterly: ["16 قسطًا فصليًا", "الأول يستحق 15 نيسان · تذكير عبر واتساب"],
    forecast: "توقع النقد · 13 أسبوعًا",
    weeks: ["الأسبوع 1", "الأسبوع 13"],
    toast: "وُقِّع عقد B-0703 · تصدر فواتير الأقساط عند استحقاقها",
  },
} as const

const ink = "var(--live-ink)"
const signal = "var(--live-signal)"
const faint = "var(--live-faint)"

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

type Unit = "a" | "r" | "s"
const look: Record<Unit, CSSProperties> = {
  a: { background: "var(--live-paper)", border: "1px solid #cbd5e1", color: faint },
  r: { background: "#eff6ff", border: `1.5px dashed ${signal}`, color: signal },
  s: { background: ink, border: `1px solid ${ink}`, color: "#f8fafc" },
}

/* seven floors of four units, top floor first; B-0703 and B-0502 change hands in the loop */
const floors: [string, Unit[]][] = [
  ["07", ["a", "s", "a", "a"]],
  ["06", ["s", "a", "s", "r"]],
  ["05", ["s", "a", "s", "s"]],
  ["04", ["s", "s", "r", "s"]],
  ["03", ["s", "s", "s", "a"]],
  ["02", ["s", "s", "s", "s"]],
  ["01", ["s", "r", "s", "s"]],
]
const changes: Record<string, { at: number; state: Unit }[]> = {
  "0703": [{ at: 3, state: "r" }, { at: 5, state: "s" }],
  "0502": [{ at: 8, state: "r" }],
}

const before = [46, 58, 40, 63, 50, 54, 68, 42, 60, 51, 65, 47, 55]
const after = [80, 58, 40, 63, 50, 54, 68, 42, 60, 51, 65, 47, 64]

/**
 * Steps: 0 the tower and the forecast, 1 the cursor opens available unit
 * B-0703, 2 its sheet and Reserve, 3 the unit turns reserved with the deposit,
 * 4 the cursor signs the contract, 5 the unit is sold and the instalment
 * schedule replaces the reservation, 6 the down payment is paid, 7 the
 * thirteen-week forecast redraws with the new cash, 8 a buyer reserves B-0502
 * from the portal, 9 the signed contract is confirmed under the tower.
 */
export function Screen({ locale }: { locale: Locale }) {
  const c = t[locale]
  return (
    <LiveScreen label={c.label} title={c.app} steps={10} interval={1200}>
      <div className="live-band" data-at={0}>
        <span className="live-band__title">{c.band}</span>
        <span className="live-band__figures" style={{ flexWrap: "wrap" }}>
          <span className="live-band__figure">
            <b className="live-num">
              <Tick bg={ink} values={[[0, "19"], [5, "20"]]} />
            </b>
            <small>{c.figures[0]}</small>
          </span>
          <span className="live-band__figure">
            <b className="live-num">
              <Tick bg={ink} values={[[0, "3"], [3, "4"], [5, "3"], [8, "4"]]} />
            </b>
            <small>{c.figures[1]}</small>
          </span>
          <span className="live-band__figure">
            <b className="live-num">
              <Tick bg={ink} values={[[0, "IQD 3,861.4M"], [3, "IQD 3,866.4M"], [6, "IQD 3,904.0M"]]} />
            </b>
            <small>{c.figures[2]}</small>
          </span>
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "start" }}>
        <LCard style={{ flex: "1 1 17rem", minInlineSize: 0, position: "relative" }}>
          <small style={{ color: faint }}>{c.units}</small>
          <div style={{ display: "grid", gap: 3 }}>
            {floors.map(([floor, units]) => (
              <div key={floor} style={{ display: "grid", gridTemplateColumns: "1.6rem repeat(4, minmax(0, 1fr))", gap: 3, alignItems: "center" }}>
                <span className="live-num" style={{ fontSize: 10, color: faint }}>
                  {floor}
                </span>
                {units.map((state, i) => {
                  const code = `${floor}0${i + 1}`
                  const cell: CSSProperties = { gridArea: "1 / 1", display: "grid", placeItems: "center", blockSize: 22, fontSize: 10 }
                  return (
                    <span key={code} className="live-num" style={{ display: "grid" }}>
                      <span data-cursor-at={code === "0703" ? 1 : undefined} style={{ ...cell, ...look[state] }}>
                        {code}
                      </span>
                      {(changes[code] ?? []).map((change) => (
                        <span key={change.at} data-at={change.at} style={{ ...cell, ...look[change.state] }}>
                          {code}
                        </span>
                      ))}
                    </span>
                  )
                })}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 12px", fontSize: 10, color: faint }}>
            {c.legend.map((label, i) => (
              <span key={label} style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                <i style={{ inlineSize: 10, blockSize: 10, ...look[(["a", "r", "s"] as const)[i]] }} />
                {label}
              </span>
            ))}
          </div>
          <div className="live-row" data-at={9} style={{ borderInlineStart: `3px solid ${signal}`, borderBlockEnd: 0, background: "#eff6ff" }}>
            <LGlyph state="done" />
            <span className="live-row__label">{c.toast}</span>
          </div>
          <LSheet only={2} style={{ insetInlineStart: "18%", insetBlockStart: "22%" }}>
            <span>{c.sheet[0]}</span>
            <span className="live-num" style={{ color: "#93c5fd" }}>
              {c.sheet[1]}
            </span>
            <span data-cursor-at={2} style={{ background: signal, color: "#fff" }}>
              {c.sheet[2]}
            </span>
          </LSheet>
        </LCard>

        <div style={{ flex: "1 1 17rem", minInlineSize: 0, display: "grid", gap: 10 }}>
          {/* the sales desk, then the reservation, then the instalment schedule in its place */}
          <div style={{ display: "grid" }}>
            <LCard style={{ gridArea: "1 / 1", alignContent: "start" }}>
              <small style={{ color: faint }}>{c.desk[0]}</small>
              <LRow state="neutral" label={c.desk[1]} meta={c.desk[2]} />
            </LCard>
            <LCard at={3} style={{ gridArea: "1 / 1", alignContent: "start" }}>
              <LRow state="waiting" label={c.reserved[0]} meta={c.reserved[1]} />
              <span data-cursor-at={4} style={{ justifySelf: "start" }}>
                <LButton>{c.sign}</LButton>
              </span>
            </LCard>
            <LCard at={5} style={{ gridArea: "1 / 1", alignContent: "start" }}>
              <small style={{ color: faint }}>{c.plan}</small>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(17, minmax(0, 1fr))", gap: 2 }}>
                {Array.from({ length: 17 }, (_, i) => (
                  <span key={i} style={{ display: "grid", blockSize: 12 }}>
                    <i style={{ gridArea: "1 / 1", border: `1px ${i === 0 ? "solid" : "dashed"} ${signal}`, background: i === 1 ? signal : "transparent", opacity: i === 0 ? 1 : 0.8 }} />
                    {i === 0 ? <i data-at={6} style={{ gridArea: "1 / 1", background: ink }} /> : null}
                  </span>
                ))}
              </div>
              <div style={{ display: "grid" }}>
                <div style={{ gridArea: "1 / 1" }}>
                  <LRow state="due" label={c.down[0]} meta={c.down[1]} value="IQD 42,600,000" />
                </div>
                <div data-at={6} style={{ gridArea: "1 / 1" }}>
                  <LRow state="done" label={c.down[0]} meta={c.down[1]} value="IQD 42,600,000" />
                </div>
              </div>
              <LRow state="waiting" label={c.quarterly[0]} meta={c.quarterly[1]} value="16 × 10,650,000" />
            </LCard>
          </div>

          <LCard>
            <span style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 8 }}>
              <small style={{ color: faint }}>{c.forecast}</small>
              <b className="live-num" style={{ fontWeight: 400 }}>
                <Tick bg="var(--live-paper)" values={[[0, "IQD 873.8M"], [7, "IQD 927.0M"]]} />
              </b>
            </span>
            <div style={{ display: "grid" }}>
              <div style={{ gridArea: "1 / 1", background: "var(--live-paper)" }}>
                <LBars values={before} />
              </div>
              <div data-at={7} style={{ gridArea: "1 / 1", background: "var(--live-paper)", outline: "none" }}>
                <LBars at={7} values={after} />
              </div>
            </div>
            <span style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: faint }}>
              <span>{c.weeks[0]}</span>
              <span>{c.weeks[1]}</span>
            </span>
          </LCard>
        </div>
      </div>

    </LiveScreen>
  )
}
