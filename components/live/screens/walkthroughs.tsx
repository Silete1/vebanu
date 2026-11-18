import type { CSSProperties, ReactNode } from "react"

import { LButton, LGlyph } from "@/components/live/kit"
import { LiveScreen } from "@/components/live/live-screen"
import type { Locale } from "@/lib/i18n"

const t = {
  en: {
    label:
      "ANU Walkthroughs on a real sales order form: Show me plays a how-to, numbered cards step across the customer, date, product, quantity and confirm while the ghost cursor fills each field, and the walkthrough ends done with the order confirmed",
    app: "Sales · New quotation",
    howto: "How-to · Create a sales order",
    howtoMeta: "5 steps · plays on this screen",
    showMe: "Show me",
    playing: "Playing · Create a sales order",
    playingMeta: "Show me steps click and type for you",
    done: "Done · 5 of 5",
    doneMeta: "The order is confirmed. Control is back with you.",
    replay: "Replay",
    ref: "SO/2026/0417",
    stages: ["Quotation", "Sales order", "Invoiced"],
    customer: ["Customer", "Al-Noor Trading"],
    date: ["Delivery date", "25 Nov 2026"],
    terms: ["Payment terms", "30 days"],
    warehouse: ["Warehouse", "Baghdad · main"],
    product: ["Product", "MDF board 18 mm"],
    qty: "Quantity",
    price: "Unit price",
    total: "Total",
    save: "Save",
    confirm: "Confirm",
    bubbles: [
      ["Customer", "Pick the customer. Their payment terms fill in by themselves."],
      ["Delivery date", "Set the day the goods leave the warehouse."],
      ["Product", "Add a line. The price comes from the customer's price list."],
      ["Quantity", "Enter the quantity, and the total follows."],
      ["Confirm", "Confirm, and the quotation becomes a sales order."],
    ],
    confirmed: "Confirmed",
  },
  ar: {
    label:
      "جولات أنو الإرشادية على نموذج أمر بيع حقيقي: زر «أرِني» يشغّل الشرح، وبطاقات مرقّمة تنتقل بين الزبون والتاريخ والمنتج والكمية والاعتماد والمؤشر يملأ كل حقل، وتنتهي الجولة باعتماد الطلب",
    app: "المبيعات · عرض سعر جديد",
    howto: "شرح · إنشاء أمر بيع",
    howtoMeta: "5 خطوات · تعمل على هذه الشاشة",
    showMe: "أرِني",
    playing: "قيد التشغيل · إنشاء أمر بيع",
    playingMeta: "خطوات «أرِني» تنقر وتكتب عنك",
    done: "تمّت · 5 من 5",
    doneMeta: "اعتُمد الطلب، وعاد التحكم إليك.",
    replay: "إعادة",
    ref: "SO/2026/0417",
    stages: ["عرض سعر", "أمر بيع", "مفوتر"],
    customer: ["الزبون", "النور للتجارة"],
    date: ["تاريخ التسليم", "25 تشرين الثاني 2026"],
    terms: ["شروط الدفع", "30 يوماً"],
    warehouse: ["المخزن", "بغداد · الرئيسي"],
    product: ["المنتج", "لوح MDF ‏18 مم"],
    qty: "الكمية",
    price: "سعر الوحدة",
    total: "المجموع",
    save: "حفظ",
    confirm: "اعتماد",
    bubbles: [
      ["الزبون", "اختر الزبون، فتُملأ شروط الدفع الخاصة به تلقائياً."],
      ["تاريخ التسليم", "حدّد يوم خروج البضاعة من المخزن."],
      ["المنتج", "أضف سطراً، والسعر يأتي من قائمة أسعار الزبون."],
      ["الكمية", "أدخل الكمية، فيُحسب المجموع فوراً."],
      ["الاعتماد", "اعتمد الطلب، فيتحول عرض السعر إلى أمر بيع."],
    ],
    confirmed: "اعتُمد",
  },
} as const

const ink = "#090b11"
const signal = "#2563eb"
const cover: CSSProperties = { position: "absolute", inset: 0 }
const still: CSSProperties = { outline: "none" }

/** A road stage that stays visible: solid from `now`, tinted from `past`. */
function Stage({ label, now, past, solid = false }: { label: string; now?: number; past?: number; solid?: boolean }) {
  const lit: CSSProperties = { background: signal, borderColor: signal, color: "#fff" }
  return (
    <span style={{ position: "relative", display: "grid", flex: 1, minInlineSize: 0 }}>
      <span className="live-road__stage" style={solid ? lit : undefined}>
        {label}
      </span>
      {now !== undefined ? (
        <span className="live-road__stage" data-at={now} style={{ ...cover, ...still, ...lit }}>
          {label}
        </span>
      ) : null}
      {past !== undefined ? (
        <span className="live-road__stage" data-at={past} style={{ ...cover, ...still, background: "#eff6ff", color: ink }}>
          {label}
        </span>
      ) : null}
    </span>
  )
}

/** A value box that is empty until step `at`, then types itself in. */
function Typed({ value, at, cursorAt }: { value: ReactNode; at: number; cursorAt?: number }) {
  return (
    <span style={{ position: "relative", display: "block" }}>
      <span className="live-field__value">{" "}</span>
      <span className="live-field" data-at={at} data-cursor-at={cursorAt} style={{ ...cover, ...still }}>
        <span className="live-field__value">{value}</span>
      </span>
    </span>
  )
}

/** A form field: filled already, or typed in at step `at`; a walkthrough card may hang from it. */
function Field({ label, value, at, cursorAt, style, children }: { label: string; value: ReactNode; at?: number; cursorAt?: number; style?: CSSProperties; children?: ReactNode }) {
  return (
    <div className="live-field" style={{ position: "relative", minInlineSize: 0, ...style }}>
      <small>{label}</small>
      {at === undefined ? <span className="live-field__value">{value}</span> : <Typed value={value} at={at} cursorAt={cursorAt} />}
      {children}
    </div>
  )
}

/** The walkthrough card: number, title, what to do, and the five-step progress. */
function Bubble({ n, title, body, only, end = false, above = false }: { n: number; title: string; body: string; only: number; end?: boolean; above?: boolean }) {
  const glass = "rgb(9 11 17 / 0.95)"
  return (
    <span
      data-only={only}
      style={{
        ...still,
        position: "absolute",
        zIndex: 4,
        [above ? "insetBlockEnd" : "insetBlockStart"]: "calc(100% + 10px)",
        [end ? "insetInlineEnd" : "insetInlineStart"]: 0,
        inlineSize: "min(15rem, 80vw)",
        display: "grid",
        gap: 5,
        padding: "9px 11px",
        background: glass,
        color: "#f1f5f9",
        fontSize: 12,
        boxShadow: "0 18px 40px -12px rgb(0 0 0 / 0.6)",
      }}
    >
      <span
        style={{
          position: "absolute",
          [above ? "insetBlockEnd" : "insetBlockStart"]: -5,
          [end ? "insetInlineEnd" : "insetInlineStart"]: 16,
          inlineSize: 10,
          blockSize: 10,
          background: glass,
          rotate: "45deg",
        }}
      />
      <span style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
        <b className="live-num" style={{ color: "#93c5fd", fontWeight: 500 }}>
          {n} / 5
        </b>
        <b style={{ fontWeight: 500 }}>{title}</b>
      </span>
      <span style={{ color: "#cbd5e1" }}>{body}</span>
      <span style={{ display: "flex", gap: 3 }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <i key={i} style={{ flex: 1, blockSize: 3, background: i <= n ? signal : "#334155" }} />
        ))}
      </span>
    </span>
  )
}

function PathIcon() {
  return (
    <span style={{ display: "grid", placeItems: "center", flex: "none", inlineSize: 32, blockSize: 32, background: signal }}>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <path d="M4 19c5 0 4-7 8-7s3-7 8-7 M4 19h.5 M12 12h.5 M20 5h.5" />
      </svg>
    </span>
  )
}

/**
 * Steps: 0 the quotation form and the how-to card; 1 the cursor presses
 * Show me; 2 the walkthrough plays: card 1/5 on the customer, which types
 * itself in with its payment terms; 3 card 2/5 on the delivery date; 4 card
 * 3/5 on the product, its price from the price list; 5 card 4/5 on the
 * quantity, the total follows; 6 card 5/5 and the cursor confirms; 7 the
 * road moves to Sales order; 8 the walkthrough is done.
 */
export function Screen({ locale }: { locale: Locale }) {
  const c = t[locale]
  const b = c.bubbles
  return (
    <LiveScreen label={c.label} title={c.app} steps={9} interval={1300}>
      {/* the how-to, then playing, then done */}
      <div style={{ position: "relative" }}>
        <div className="live-card" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px 12px" }}>
          <PathIcon />
          <span style={{ display: "grid", flex: "1 1 12rem" }}>
            <b style={{ fontWeight: 500 }}>{c.howto}</b>
            <small style={{ color: "var(--live-faint)" }}>{c.howtoMeta}</small>
          </span>
          <LButton cursorAt={1}>▶ {c.showMe}</LButton>
        </div>
        <div
          data-at={2}
          style={{ ...cover, ...still, display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 12px", padding: 12, background: ink, color: "#f8fafc" }}
        >
          <PathIcon />
          <span style={{ display: "grid", flex: "1 1 12rem" }}>
            <b style={{ fontWeight: 500 }}>{c.playing}</b>
            <small style={{ color: "#94a3b8" }}>{c.playingMeta}</small>
          </span>
          <span style={{ display: "flex", gap: 4 }}>
            {[2, 3, 4, 5, 6].map((at) => (
              <span key={at} style={{ position: "relative", inlineSize: 18, blockSize: 8, border: "1px solid #475569" }}>
                <span data-at={at} style={{ ...cover, ...still, background: signal }} />
              </span>
            ))}
          </span>
        </div>
        <div
          data-at={8}
          style={{
            ...cover,
            ...still,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "6px 12px",
            padding: 12,
            background: "var(--live-paper)",
            border: "1px solid var(--live-rule)",
            borderInlineStart: `3px solid ${signal}`,
          }}
        >
          <span style={{ display: "grid", placeItems: "center", flex: "none", inlineSize: 32, blockSize: 32, background: ink }}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="square" aria-hidden="true">
              <path d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
          </span>
          <span style={{ display: "grid", flex: "1 1 12rem" }}>
            <b style={{ fontWeight: 500 }}>{c.done}</b>
            <small style={{ color: "var(--live-faint)" }}>{c.doneMeta}</small>
          </span>
          <LButton ghost>↺ {c.replay}</LButton>
        </div>
      </div>

      {/* the real form the walkthrough plays on */}
      <div className="live-card" style={{ gap: 12 }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px 16px" }}>
          <b className="live-num" style={{ fontSize: 16, fontWeight: 500 }}>
            {c.ref}
          </b>
          <div className="live-road" style={{ flex: "1 1 16rem", maxInlineSize: "26rem", marginInlineStart: "auto" }}>
            <Stage label={c.stages[0]} solid past={7} />
            <Stage label={c.stages[1]} now={7} />
            <Stage label={c.stages[2]} />
          </div>
        </div>

        <div className="live-grid live-cols-2" style={{ gap: "10px 12px" }}>
          <Field label={c.customer[0]} value={c.customer[1]} at={2} cursorAt={2}>
            <Bubble n={1} title={b[0][0]} body={b[0][1]} only={2} />
          </Field>
          <Field label={c.date[0]} value={c.date[1]} at={3} cursorAt={3}>
            <Bubble n={2} title={b[1][0]} body={b[1][1]} only={3} end />
          </Field>
          <Field label={c.terms[0]} value={c.terms[1]} at={2} />
          <Field label={c.warehouse[0]} value={c.warehouse[1]} />
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 12px", paddingBlockStart: 10, borderBlockStart: "1px solid var(--live-rule)" }}>
          <Field label={c.product[0]} value={c.product[1]} at={4} cursorAt={4} style={{ flex: "2 1 14rem" }}>
            <Bubble n={3} title={b[2][0]} body={b[2][1]} only={4} />
          </Field>
          <Field label={c.qty} value={<span className="live-num">40</span>} at={5} cursorAt={5} style={{ flex: "1 1 5rem" }}>
            <Bubble n={4} title={b[3][0]} body={b[3][1]} only={5} above />
          </Field>
          <Field label={c.price} value={<span className="live-num">IQD 32,000</span>} at={4} style={{ flex: "1 1 7rem" }} />
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "end", gap: "10px 12px" }}>
          <Field label={c.total} value={<span className="live-num">IQD 1,280,000</span>} at={5} style={{ flex: "1 1 9rem", maxInlineSize: "14rem" }} />
          <span style={{ position: "relative", display: "flex", gap: 8, marginInlineStart: "auto" }}>
            <LButton ghost>{c.save}</LButton>
            <span style={{ position: "relative", display: "inline-flex" }}>
              <LButton cursorAt={6}>{c.confirm}</LButton>
              <Bubble n={5} title={b[4][0]} body={b[4][1]} only={6} end above />
            </span>
            <span
              data-at={7}
              style={{ ...cover, ...still, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#eff6ff", border: `1px solid ${signal}`, color: ink }}
            >
              <LGlyph state="done" />
              {c.confirmed}
            </span>
          </span>
        </div>
      </div>

    </LiveScreen>
  )
}
