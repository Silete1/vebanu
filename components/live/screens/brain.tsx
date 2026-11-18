import type { CSSProperties } from "react"

import { LBand, LButton, LGlyph, LSheet, type LiveState } from "@/components/live/kit"
import { LiveScreen } from "@/components/live/live-screen"
import type { Locale } from "@/lib/i18n"

const t = {
  en: {
    label:
      "ANU Brain opened: the company's own main menu on the ink band, the finder typing Inventory, the stock list opening with its figures, and a purchase request raised for a product below its minimum, on a system with three environments and a backup every six hours",
    app: "ANU Brain · Al-Noor Trading",
    company: "Al-Noor Trading",
    mark: "N",
    date: "Wednesday 18 November · Baghdad",
    finder: "Find an app, a record or a report",
    query: "Inventory",
    results: [
      ["Inventory", "App"],
      ["Inventory › Stock on hand", "Report"],
      ["Inventory › Transfers", "List"],
    ],
    apps: ["Sales", "Inventory", "Purchase", "Accounting", "Manufacturing", "Workshops", "CRM", "Employees", "Documents", "Walkthroughs", "Support", "Settings"],
    today: [
      ["4", "approvals waiting", "due"],
      ["2", "deliveries today", "progress"],
      ["1", "invoice overdue", "alarm"],
    ],
    envs: ["Development", "Staging", "Production"],
    backup: "Backed up 12:00 · every 6 h",
    band: "Inventory · Stock on hand",
    figures: [
      { value: "IQD 1.86B", label: "stock value", at: 6 },
      { value: "1,204", label: "products", at: 7 },
      { value: "7", label: "below minimum", at: 7 },
    ],
    rows: [
      ["Portland cement, 50 kg", "Baghdad main · CEM-50", "done", "3,400", "bags"],
      ["Rebar 12 mm, 12 m", "Basra yard · 40 t arriving", "progress", "18.6", "t"],
      ["Ceramic tile 60 × 60, beige", "Baghdad main · reorder point 2,000", "due", "2,150", "m²"],
      ["Gypsum board 12.5 mm", "Erbil branch · in quality check", "waiting", "920", "sheets"],
      ["PVC pipe 110 mm, 6 m", "Baghdad main · minimum 200", "alarm", "64", "pcs"],
    ],
    replenish: "Reorder",
    requested: "PR/2026/0188 · 300 pcs requested",
    toast: "Purchase request PR/2026/0188 created",
  },
  ar: {
    label:
      "أنو برين مفتوحاً: القائمة الرئيسية للشركة باسمها على الشريط الداكن، والباحث يكتب «المخزون»، ثم تُفتح قائمة المخزون بأرقامها، ويُنشأ طلب شراء لمادة نزلت دون حدها الأدنى، في نظام ببيئات ثلاث ونسخة احتياطية كل ست ساعات",
    app: "أنو برين · النور للتجارة",
    company: "النور للتجارة",
    mark: "ن",
    date: "الأربعاء 18 تشرين الثاني · بغداد",
    finder: "ابحث عن تطبيق أو سجل أو تقرير",
    query: "المخزون",
    results: [
      ["المخزون", "تطبيق"],
      ["المخزون › الكميات المتوفرة", "تقرير"],
      ["المخزون › التحويلات", "قائمة"],
    ],
    apps: ["المبيعات", "المخزون", "المشتريات", "المحاسبة", "التصنيع", "الورش", "إدارة العملاء", "الموظفون", "المستندات", "الجولات الإرشادية", "الدعم", "الإعدادات"],
    today: [
      ["4", "موافقات بانتظارك", "due"],
      ["2", "توصيلات اليوم", "progress"],
      ["1", "فاتورة متأخرة", "alarm"],
    ],
    envs: ["التطوير", "الاختبار", "التشغيل"],
    backup: "نسخة احتياطية 12:00 · كل 6 ساعات",
    band: "المخزون · الكميات المتوفرة",
    figures: [
      { value: "IQD 1.86B", label: "قيمة المخزون", at: 6 },
      { value: "1,204", label: "مادة", at: 7 },
      { value: "7", label: "دون الحد الأدنى", at: 7 },
    ],
    rows: [
      ["إسمنت بورتلاندي، 50 كغم", "مخزن بغداد الرئيسي · CEM-50", "done", "3,400", "كيس"],
      ["حديد تسليح 12 مم، 12 م", "ساحة البصرة · 40 طناً في الطريق", "progress", "18.6", "طن"],
      ["سيراميك 60 × 60، بيج", "مخزن بغداد الرئيسي · حد إعادة الطلب 2,000", "due", "2,150", "م²"],
      ["ألواح جبس 12.5 مم", "فرع أربيل · قيد فحص الجودة", "waiting", "920", "لوح"],
      ["أنابيب PVC ‏110 مم، 6 م", "مخزن بغداد الرئيسي · الحد الأدنى 200", "alarm", "64", "قطعة"],
    ],
    replenish: "إعادة الطلب",
    requested: "PR/2026/0188 · طُلبت 300 قطعة",
    toast: "أُنشئ طلب الشراء PR/2026/0188",
  },
} as const

/** App icons, drawn on a 24-unit grid with one stroke. */
const icons = [
  "M3 3h8l10 10-8 8L3 11z M7 7h.5",
  "M3 7.5 12 3l9 4.5v9L12 21l-9-4.5z M3 7.5 12 12l9-4.5 M12 12v9",
  "M2 3h3l2.5 12h11L21 7H6 M9 20h.5 M17 20h.5",
  "M5 3h14v18H5z M8 7h8 M8 11h2 M14 11h2 M8 15h2 M14 15h2",
  "M3 21V11l5 3v-3l5 3v-3l5 3V4h3v17z",
  "M5 3h14v18H5z M12 3v18 M10 11v2 M14 11v2",
  "M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18z M12 8a4 4 0 1 0 0 8a4 4 0 1 0 0-8z M12 12h.5",
  "M12 3a4 4 0 1 0 0 8a4 4 0 1 0 0-8z M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7",
  "M6 3h8l4 4v14H6z M14 3v4h4 M9 12h6 M9 16h6",
  "M4 19c5 0 4-7 8-7s3-7 8-7 M4 19h.5 M12 12h.5 M20 5h.5",
  "M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18z M12 8a4 4 0 1 0 0 8a4 4 0 1 0 0-8z M5.6 5.6l3.6 3.6 M14.8 14.8l3.6 3.6 M18.4 5.6l-3.6 3.6 M9.2 14.8l-3.6 3.6",
  "M4 6h10 M18 6h2 M4 12h4 M12 12h8 M4 18h12 M20 18h.5 M16 4v4 M10 10v4 M18 16v4",
]

const signal = "#2563eb"
const cover: CSSProperties = { position: "absolute", inset: 0 }
const still: CSSProperties = { outline: "none" }

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#93c5fd" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  )
}

/**
 * Steps: 0 the company's home on the ink band with the finder and the
 * environments; 1–3 the app tiles arrive; 4 the cursor types "Inventory"
 * in the finder; 5 the results open, the tile lights and the cursor picks
 * the app; 6 Inventory opens on its band; 7–9 the figures and the stock
 * rows; 10 the cursor reorders the product below its minimum; 11 the row
 * shows the purchase request and a toast confirms it.
 */
export function Screen({ locale }: { locale: Locale }) {
  const c = t[locale]
  const tile: CSSProperties = {
    position: "relative",
    display: "grid",
    justifyItems: "center",
    alignContent: "start",
    gap: 6,
    padding: "13px 4px",
    border: "1px solid rgb(148 163 184 / 0.22)",
    background: "rgb(255 255 255 / 0.03)",
    color: "#e2e8f0",
    fontSize: 11.5,
    textAlign: "center",
  }
  return (
    <LiveScreen label={c.label} title={c.app} steps={12} interval={1050}>
      <div style={{ position: "relative", display: "grid", minBlockSize: "21rem" }}>
        {/* home: the company's own main menu */}
        <div className="live-band" style={{ display: "grid", gridTemplateRows: "auto auto minmax(0, 1fr)", alignContent: "stretch", justifyContent: "normal", alignItems: "stretch", gap: 12, padding: "12px 14px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px 16px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 10, flex: "1 1 12rem" }}>
              <span
                style={{ display: "grid", placeItems: "center", inlineSize: 28, blockSize: 28, background: signal, color: "#fff", fontWeight: 600, fontSize: 15 }}
              >
                {c.mark}
              </span>
              <span style={{ display: "grid" }}>
                <span className="live-band__title" style={{ fontSize: 17 }}>
                  {c.company}
                </span>
                <small style={{ color: "#94a3b8", fontSize: 10.5 }}>{c.date}</small>
              </span>
            </span>
            <span style={{ position: "relative", display: "block", flex: "1 1 15rem", maxInlineSize: "24rem" }}>
              <span className="live-field__value" style={{ color: "var(--live-faint)" }}>
                {c.finder}
              </span>
              <span className="live-field" data-at={4} data-cursor-at={4} style={{ ...cover, ...still }}>
                <span className="live-field__value" style={{ color: "var(--live-ink)" }}>
                  {c.query}
                </span>
              </span>
              <LSheet only={5} style={{ ...still, insetBlockStart: "calc(100% + 4px)", insetInline: 0 }}>
                {c.results.map(([name, kind], i) => (
                  <span key={name} className={i === 0 ? "is-now" : undefined} data-cursor-at={i === 0 ? 5 : undefined} style={{ display: "flex", gap: 8 }}>
                    {name}
                    <small style={{ marginInlineStart: "auto", color: "#94a3b8" }}>{kind}</small>
                  </span>
                ))}
              </LSheet>
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(max(4.75rem, 14%), 1fr))", gap: 8 }}>
            {c.apps.map((app, i) => (
              <span key={app} data-at={1 + Math.floor(i / 4)} style={tile}>
                <Icon d={icons[i]} />
                {app}
                {i === 1 ? <span data-at={5} style={{ ...cover, ...still, border: `2px solid ${signal}`, background: "rgb(37 99 235 / 0.16)" }} /> : null}
              </span>
            ))}
          </div>

          <div data-at={3} style={{ ...still, alignSelf: "end", display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 8 }}>
            {c.today.map(([value, name, state]) => (
              <span key={name} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderBlockStart: "1px solid rgb(148 163 184 / 0.3)" }}>
                <LGlyph state={state as LiveState} />
                <b className="live-num" style={{ fontWeight: 400, fontSize: 16, color: "#93c5fd" }}>
                  {value}
                </b>
                <small style={{ color: "#94a3b8", fontSize: 10.5, lineHeight: 1.25 }}>{name}</small>
              </span>
            ))}
          </div>
        </div>

        {/* the Inventory app, opened over the home */}
        <div data-at={6} style={{ ...cover, ...still, zIndex: 4, display: "grid", alignContent: "start", gap: 10, background: "var(--live-desk)" }}>
          <LBand title={c.band} at={6} figures={c.figures.map((f) => ({ ...f }))} />
          <div style={{ display: "grid" }}>
            {c.rows.map(([name, meta, state, qty, unit], i) => (
              <div key={name} className="live-row" data-at={7 + Math.floor(i / 2)} style={{ position: "relative", paddingBlock: 7 }}>
                <LGlyph state={state as LiveState} />
                <span className="live-row__label">
                  {name}
                  <small>{meta}</small>
                </span>
                <span className="live-row__value" style={{ whiteSpace: "nowrap" }}>
                  <span className="live-num">{qty}</span> <small style={{ color: "var(--live-faint)" }}>{unit}</small>
                </span>
                {state === "alarm" ? (
                  <>
                    <LButton cursorAt={10}>{c.replenish}</LButton>
                    <span className="live-row" data-at={11} style={{ ...cover, ...still }}>
                      <LGlyph state="progress" />
                      <span className="live-row__label">
                        {name}
                        <small style={{ color: signal }}>{c.requested}</small>
                      </span>
                      <span className="live-row__value" style={{ whiteSpace: "nowrap" }}>
                        <span className="live-num">{qty}</span> <small style={{ color: "var(--live-faint)" }}>{unit}</small>
                      </span>
                    </span>
                  </>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* one company, three environments, a backup every six hours */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 12px", fontSize: 11, color: "var(--live-soft)" }}>
        <span style={{ display: "inline-flex", gap: 2 }}>
          {c.envs.map((env, i) => (
            <span
              key={env}
              style={{
                padding: "3px 8px",
                border: `1px solid ${i === 2 ? "var(--live-ink)" : "#cbd5e1"}`,
                background: i === 2 ? "var(--live-ink)" : "transparent",
                color: i === 2 ? "#fff" : "var(--live-soft)",
              }}
            >
              {env}
            </span>
          ))}
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, marginInlineStart: "auto" }}>
          <LGlyph state="done" />
          {c.backup}
        </span>
      </div>

      <div className="live-toast" data-at={11}>
        <LGlyph state="done" />
        {c.toast}
      </div>
    </LiveScreen>
  )
}
