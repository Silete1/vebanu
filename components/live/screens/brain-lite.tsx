import type { CSSProperties } from "react"

import { LButton, LGlyph, LRow, type LiveState } from "@/components/live/kit"
import { LiveScreen } from "@/components/live/live-screen"
import type { Locale } from "@/lib/i18n"

const t = {
  en: {
    label: "ANU Brain Lite on a phone: the camera scans a product into the basket, the total adds up in dinars, the sale is paid in cash and kept on the phone while offline, the queue syncs when the line returns, and the receipt goes by WhatsApp",
    app: "Brain Lite · Sale",
    shop: "Corner mini-market",
    status: ["Offline · 2 queued", "Offline · 3 queued", "Back online · sending 3", "Synced · nothing queued"],
    items: [
      { name: "Sunflower oil 1.8 L", qty: "1 × 4,250", sum: "4,250" },
      { name: "Basmati rice 5 kg", qty: "1 × 12,500", sum: "12,500" },
      { name: "Black tea 500 g", qty: "2 × 3,500", sum: "7,000" },
    ],
    total: "Total",
    buttons: ["Cash", "Credit", "Park"],
    paid: ["Paid cash", "received 25,000 · change 1,250"],
    receipt: "Receipt on WhatsApp",
    whatsapp: "WhatsApp · customer",
    toast: ["Receipt #0187", "3 items · paid cash", "IQD 23,750"],
  },
  ar: {
    label: "أنو برين لايت على هاتف: الكاميرا تمسح المنتج إلى السلة، ويُجمع المبلغ بالدينار، ويُدفع نقدًا ويُحفظ البيع على الهاتف دون إنترنت، ثم تُرسَل القائمة عند عودة الاتصال، ويذهب الإيصال عبر واتساب",
    app: "برين لايت · بيع",
    shop: "ميني ماركت الحي",
    status: ["غير متصل · 2 بالانتظار", "غير متصل · 3 بالانتظار", "عاد الاتصال · إرسال 3", "تمت المزامنة · لا شيء بالانتظار"],
    items: [
      { name: "زيت زهرة الشمس 1.8 لتر", qty: "1 × 4,250", sum: "4,250" },
      { name: "رز بسمتي 5 كغم", qty: "1 × 12,500", sum: "12,500" },
      { name: "شاي أسود 500 غم", qty: "2 × 3,500", sum: "7,000" },
    ],
    total: "المجموع",
    buttons: ["نقدًا", "آجل", "تعليق"],
    paid: ["دُفع نقدًا", "استُلم 25,000 · الباقي 1,250"],
    receipt: "الإيصال عبر واتساب",
    whatsapp: "واتساب · الزبون",
    toast: ["إيصال #0187", "3 مواد · دُفع نقدًا", "IQD 23,750"],
  },
} as const

const ink = "var(--live-ink)"
const signal = "var(--live-signal)"
const faint = "var(--live-faint)"
const still: CSSProperties = { outline: "none" }

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

/** The phone's connection: arcs, and a red slash while offline. */
function Signal({ on }: { on: boolean }) {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true" style={{ flex: "none" }}>
      <path d="M1.5 6.5a9.5 9.5 0 0 1 13 0M4 9.2a6 6 0 0 1 8 0M6.4 11.8a2.4 2.4 0 0 1 3.2 0" style={{ fill: "none", stroke: on ? signal : faint, strokeWidth: 1.6, strokeLinecap: "round" }} />
      <circle cx="8" cy="14" r="1.1" style={{ fill: on ? signal : faint }} />
      {on ? null : <path d="M2.5 2l11 12" style={{ stroke: "var(--live-danger)", strokeWidth: 1.6, strokeLinecap: "round" }} />}
    </svg>
  )
}

/** EAN bars drawn from a fixed rhythm, centred on x. */
function Bars({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  const rhythm = [2, 1, 1, 3, 1, 2, 2, 1, 1, 1, 3, 2, 1, 2, 1, 1, 2, 3, 1, 1, 2, 1, 1, 2]
  const unit = w / rhythm.reduce((a, b) => a + b + 1, 0)
  let cx = x - w / 2
  return (
    <g>
      <rect x={x - w / 2 - 4} y={y - 3} width={w + 8} height={h + 6} style={{ fill: "#fff" }} />
      {rhythm.map((bar, i) => {
        const rect = <rect key={i} x={cx} y={y} width={bar * unit} height={h} style={{ fill: "#111" }} />
        cx += (bar + 1) * unit
        return rect
      })}
    </g>
  )
}

/* three products in front of the camera, each drawn over a dark frame so it covers the one before */
function Oil() {
  return (
    <g>
      <rect x="140" y="14" width="20" height="12" style={{ fill: "#b91c1c" }} />
      <path d="M142 26h16v12c10 4 18 12 18 22v84a6 6 0 0 1-6 6h-40a6 6 0 0 1-6-6V60c0-10 8-18 18-22Z" style={{ fill: "#f2c94c", stroke: "#a16207", strokeWidth: 1.5 }} />
      <rect x="128" y="76" width="44" height="34" style={{ fill: "#fffbeb" }} />
      <Bars x={150} y={116} w={36} h={18} />
    </g>
  )
}

function Rice() {
  return (
    <g>
      <rect width="300" height="160" style={{ fill: "#111827" }} />
      <path d="M104 22h92l8 12-4 112H100l-4-112Z" style={{ fill: "#e9dfc9", stroke: "#a8a29e", strokeWidth: 1.5 }} />
      <rect x="112" y="48" width="76" height="30" style={{ fill: "#166534" }} />
      <Bars x={150} y={104} w={48} h={22} />
    </g>
  )
}

function Tea() {
  return (
    <g>
      <rect width="300" height="160" style={{ fill: "#111827" }} />
      <path d="M108 34l14-14h74l-14 14Z" style={{ fill: "#9a3412" }} />
      <path d="M182 34l14-14v108l-14 14Z" style={{ fill: "#7c2d12" }} />
      <rect x="108" y="34" width="74" height="108" style={{ fill: "#c2410c", stroke: "#7c2d12", strokeWidth: 1.5 }} />
      <rect x="116" y="50" width="58" height="22" style={{ fill: "#fff7ed" }} />
      <Bars x={145} y={98} w={44} h={22} />
    </g>
  )
}

/* offline with two sales queued → three after this sale → sending → synced; each chip covers the one before */
const statuses: [number, boolean, LiveState][] = [
  [0, false, "waiting"],
  [6, false, "waiting"],
  [7, true, "progress"],
  [8, true, "done"],
]

/**
 * Steps: 0 the shop offline with two sales queued and a bottle in the camera,
 * 1 the scan locks, 2 the oil drops into the basket, 3 the rice is scanned in,
 * 4 two teas, 5 the cursor presses Cash, 6 the sale is paid and kept on the
 * phone (three queued), 7 the line returns and the queue is sent, 8 synced,
 * 9 the cursor sends the receipt, 10 the camera gives way to the WhatsApp chat
 * with the delivered receipt, 11 hold.
 */
export function Screen({ locale }: { locale: Locale }) {
  const c = t[locale]
  const codes = ["6260012418273", "6260034907715", "6260051226048"]
  return (
    <LiveScreen label={c.label} title={c.app} steps={12} interval={1000} device="phone">
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 6 }}>
        <b style={{ fontWeight: 600 }}>{c.shop}</b>
        <span style={{ display: "inline-grid" }}>
          {statuses.map(([at, on, state], i) => (
            <span
              key={at}
              data-at={at > 0 ? at : undefined}
              style={{ gridArea: "1 / 1", display: "flex", alignItems: "center", gap: 6, padding: "3px 8px", fontSize: 11, background: "var(--live-paper)", border: "1px solid var(--live-rule)" }}
            >
              <Signal on={on} />
              <LGlyph state={state} />
              {c.status[i]}
            </span>
          ))}
        </span>
      </div>

      {/* the camera: a viewfinder, the product, the scan line */}
      <div style={{ position: "relative" }}>
        <svg viewBox="0 0 300 160" width="100%" style={{ display: "block", direction: "ltr", background: "#111827" }} aria-hidden="true">
          <Oil />
          <g data-at={3} style={still}>
            <Rice />
          </g>
          <g data-at={4} style={still}>
            <Tea />
          </g>
          <path d="M56 40V18h26M218 18h26v22M244 120v22h-26M82 142H56v-22" style={{ fill: "none", stroke: "rgb(255 255 255 / 0.85)", strokeWidth: 3 }} />
          {[1, 3, 4].map((step) => (
            <path key={step} data-only={step} d="M56 40V18h26M218 18h26v22M244 120v22h-26M82 142H56v-22" style={{ ...still, fill: "none", stroke: "#60a5fa", strokeWidth: 4.5 }} />
          ))}
          <rect x="60" y="79" width="180" height="2" style={{ fill: "#60a5fa", opacity: 0.9 }} />
        </svg>
        {[1, 3, 4].map((step, i) => (
          <span
            key={step}
            data-only={step}
            className="live-num"
            style={{ ...still, position: "absolute", insetInline: 0, insetBlockEnd: 6, marginInline: "auto", inlineSize: "fit-content", padding: "2px 8px", background: "rgb(37 99 235 / 0.9)", color: "#fff", fontSize: 10 }}
          >
            {codes[i]}
          </span>
        ))}
        {/* once the sale is done, the camera gives way to the WhatsApp chat with the receipt */}
        <div data-at={10} style={{ position: "absolute", inset: 0, display: "grid", alignContent: "space-between", padding: 10, background: "#efeae2", color: "#0b141a" }}>
          <small style={{ color: "#1f7a4d", fontSize: 10 }}>
            {c.whatsapp} <span className="live-num">07xx xxx 4417</span>
          </small>
          <div style={{ justifySelf: "end", display: "grid", gap: 2, minInlineSize: "60%", padding: "8px 10px", background: "#dcf8c6", borderRadius: 8, borderStartEndRadius: 0, boxShadow: "0 1px 1px rgb(0 0 0 / 0.12)" }}>
            <b style={{ fontWeight: 600 }}>{c.toast[0]}</b>
            <small style={{ color: "#3b4a54" }}>{c.toast[1]}</small>
            <span style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <span className="live-num">{c.toast[2]}</span>
              <small className="live-num" style={{ color: "#53bdeb" }}>
                10:42 ✓✓
              </small>
            </span>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", alignContent: "start", minBlockSize: 112 }}>
        {c.items.map((item, i) => (
          <LRow key={item.name} at={2 + i} label={item.name} meta={item.qty} value={item.sum} />
        ))}
      </div>

      <div className="live-row" style={{ background: ink, color: "#f8fafc", borderBlockEnd: 0 }}>
        <span className="live-row__label">{c.total}</span>
        <b className="live-num" style={{ fontSize: 17, fontWeight: 400, color: "#93c5fd" }}>
          <Tick bg={ink} values={[[0, "IQD 0"], [2, "IQD 4,250"], [3, "IQD 16,750"], [4, "IQD 23,750"]]} />
        </b>
      </div>

      {/* the buttons, then the paid sale in their place */}
      <div style={{ display: "grid" }}>
        <div style={{ gridArea: "1 / 1", alignSelf: "start", display: "flex", gap: 6 }}>
          <span data-cursor-at={5} style={{ flex: 2, display: "grid" }}>
            <LButton>{c.buttons[0]}</LButton>
          </span>
          <span style={{ flex: 1, display: "grid" }}>
            <LButton ghost>{c.buttons[1]}</LButton>
          </span>
          <span style={{ flex: 1, display: "grid" }}>
            <LButton ghost>{c.buttons[2]}</LButton>
          </span>
        </div>
        <div data-at={6} style={{ gridArea: "1 / 1", display: "grid", gap: 6, background: "var(--live-desk)" }}>
          <div className="live-row" style={{ padding: "6px 10px" }}>
            <LGlyph state="done" />
            <span className="live-row__label">
              {c.paid[0]}
              <small>{c.paid[1]}</small>
            </span>
          </div>
          <span data-cursor-at={9} style={{ display: "grid" }}>
            <LButton ghost>{c.receipt}</LButton>
          </span>
        </div>
      </div>
    </LiveScreen>
  )
}
