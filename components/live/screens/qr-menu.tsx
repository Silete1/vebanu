import type { CSSProperties } from "react"

import { LGlyph } from "@/components/live/kit"
import { LiveScreen } from "@/components/live/live-screen"
import type { Locale } from "@/lib/i18n"

const t = {
  en: {
    label:
      "ANU QR Menu on a guest's phone: the table's code is scanned, the menu switches between English, Arabic and Kurdish, two items are added and the order goes straight to a kitchen ticket that turns ready",
    app: "QR Menu",
    point: "Point the camera at the code on the table",
    found: "Table 12 · opening the menu",
    items: ["1 item", "2 items"],
    totals: ["IQD 9,000", "IQD 11,500"],
    send: "Send to kitchen",
    sent: "Order 0412 sent to the kitchen",
    ticket: "Kitchen ticket",
    table: "Table 12",
    lines: ["1 × Iraqi kebab", "1 × Lemon juice"],
    status: ["Waiting for the kitchen", "Preparing", "Ready to serve"],
  },
  ar: {
    label:
      "منيو أنو الرقمي على هاتف الضيف: يُمسح رمز الطاولة، ويتبدّل المنيو بين العربية والإنجليزية والكردية، ويُضاف صنفان، ويذهب الطلب مباشرة إلى تذكرة في المطبخ تصبح جاهزة",
    app: "منيو QR",
    point: "وجّه الكاميرا إلى الرمز على الطاولة",
    found: "طاولة 12 · يُفتح المنيو",
    items: ["صنف واحد", "صنفان"],
    totals: ["IQD 9,000", "IQD 11,500"],
    send: "أرسل إلى المطبخ",
    sent: "أُرسل الطلب 0412 إلى المطبخ",
    ticket: "تذكرة المطبخ",
    table: "طاولة 12",
    lines: ["1 × كباب عراقي", "1 × عصير ليمون"],
    status: ["بانتظار المطبخ", "قيد التحضير", "جاهز للتقديم"],
  },
} as const

type MenuLang = "en" | "ar" | "ku"

/** The guest menu in its three languages; prices are the same in every one. */
const menu: Record<MenuLang, { tag: string; dir: "ltr" | "rtl"; title: string; table: string; sections: [string, [string, string][]][] }> = {
  en: {
    tag: "en",
    dir: "ltr",
    title: "Menu",
    table: "Table 12",
    sections: [
      ["Grills", [["Iraqi kebab", "9,000"], ["Chicken tikka", "8,000"], ["Dolma", "7,500"]]],
      ["Drinks", [["Lemon juice", "2,500"], ["Tea", "750"]]],
    ],
  },
  ar: {
    tag: "ar",
    dir: "rtl",
    title: "قائمة الطعام",
    table: "طاولة 12",
    sections: [
      ["المشويات", [["كباب عراقي", "9,000"], ["تكة دجاج", "8,000"], ["دولمة", "7,500"]]],
      ["المشروبات", [["عصير ليمون", "2,500"], ["شاي", "750"]]],
    ],
  },
  ku: {
    tag: "ckb",
    dir: "rtl",
    title: "لیستی خواردن",
    table: "مێزی 12",
    sections: [
      ["برژاو", [["کەبابی عێراقی", "9,000"], ["تکەی مریشک", "8,000"], ["دۆڵمە", "7,500"]]],
      ["خواردنەوە", [["شەربەتی لیمۆ", "2,500"], ["چا", "750"]]],
    ],
  },
}
const switchLabels: [MenuLang, string][] = [
  ["en", "EN"],
  ["ar", "AR"],
  ["ku", "KU"],
]

const layer: CSSProperties = { position: "absolute", inset: 0, outline: "none" }
const cover: CSSProperties = { position: "absolute", inset: 0 }

/** A QR code drawn from its rules: three finder squares, the timing lines, and modules from a fixed pattern. */
function QrCode() {
  const n = 21
  const finder = (x: number, y: number) => {
    for (const [fx, fy] of [
      [0, 0],
      [n - 7, 0],
      [0, n - 7],
    ] as const) {
      const dx = x - fx
      const dy = y - fy
      if (dx >= 0 && dx < 7 && dy >= 0 && dy < 7) {
        const ring = Math.max(Math.abs(dx - 3), Math.abs(dy - 3))
        return ring !== 2
      }
      if (dx >= -1 && dx <= 7 && dy >= -1 && dy <= 7) return false
    }
    return null
  }
  let d = ""
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const f = finder(x, y)
      let h = (x * 374761393 + y * 668265263) | 0
      h = Math.imul(h ^ (h >>> 13), 1274126177)
      const dark = f ?? (x === 6 || y === 6 ? (x + y) % 2 === 0 : ((h ^ (h >>> 16)) & 7) < 4)
      if (dark) d += `M${x} ${y}h1v1h-1z`
    }
  }
  return (
    <svg viewBox="-2 -2 25 25" width="132" height="132" aria-hidden="true" shapeRendering="crispEdges" style={{ display: "block", background: "#fff" }}>
      <path d={d} fill="#090b11" />
    </svg>
  )
}

/** The four corners of the camera's viewfinder. */
function Corners({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 180 180" width="180" height="180" aria-hidden="true" style={{ display: "block" }}>
      <path d="M2 34V2h32M146 2h32v32M178 146v32h-32M34 178H2v-32" fill="none" style={{ stroke: color }} strokeWidth="4" />
    </svg>
  )
}

/** One language of the menu, as the guest's phone shows it. */
function Menu({ lang, at, cursorTo, adds }: { lang: MenuLang; at: number; cursorTo?: [MenuLang, number]; adds?: boolean }) {
  const m = menu[lang]
  return (
    <div data-at={at} dir={m.dir} lang={m.tag} style={{ ...layer, display: "flex", flexDirection: "column", background: "var(--live-desk)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", background: "var(--live-paper)", borderBlockEnd: "1px solid var(--live-rule)" }}>
        <span style={{ display: "grid", flex: 1, minInlineSize: 0 }}>
          <small style={{ fontSize: 11, color: "var(--live-faint)" }}>{m.title}</small>
          <b style={{ fontSize: 17, fontWeight: 500 }}>{m.table}</b>
        </span>
        <span dir="ltr" style={{ display: "flex", border: "1px solid #cbd5e1" }}>
          {switchLabels.map(([code, label]) => (
            <span
              key={code}
              className="live-num"
              data-cursor-at={cursorTo && cursorTo[0] === code ? cursorTo[1] : undefined}
              style={{
                display: "grid",
                placeItems: "center",
                inlineSize: 30,
                blockSize: 26,
                fontSize: 11,
                background: code === lang ? "var(--live-ink)" : "transparent",
                color: code === lang ? "#fff" : "var(--live-soft)",
              }}
            >
              {label}
            </span>
          ))}
        </span>
      </div>
      {m.sections.map(([section, items], s) => (
        <div key={section} style={{ display: "grid" }}>
          <small style={{ padding: "10px 14px 4px", fontSize: 11, color: "var(--live-signal)", letterSpacing: "0.02em" }}>{section}</small>
          {items.map(([name, price], i) => {
            // the kebab is added first, then the lemon juice
            const add = adds ? (s === 0 && i === 0 ? 6 : s === 1 && i === 0 ? 7 : undefined) : undefined
            return (
              <div key={name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 14px", background: "var(--live-paper)", borderBlockEnd: "1px solid var(--live-rule)" }}>
                <span style={{ display: "grid", flex: 1, minInlineSize: 0 }}>
                  {name}
                  <small className="live-num" style={{ justifySelf: "start", fontSize: 11, color: "var(--live-faint)" }}>
                    IQD {price}
                  </small>
                </span>
                <span
                  data-cursor-at={add}
                  style={{ position: "relative", display: "grid", placeItems: "center", inlineSize: 28, blockSize: 28, border: "1px solid #cbd5e1", color: "var(--live-signal)", fontSize: 17, lineHeight: 1 }}
                >
                  +
                  {add !== undefined ? (
                    <span data-at={add + 1} className="live-num" style={{ ...cover, inset: -1, display: "grid", placeItems: "center", background: "var(--live-signal)", color: "#fff", fontSize: 13 }}>
                      1
                    </span>
                  ) : null}
                </span>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

/** The order bar at the foot of the menu. */
function Cart({ at, items, total, send, cursorAt }: { at: number; items: string; total: string; send: string; cursorAt?: number }) {
  return (
    <div
      data-at={at}
      style={{
        position: "absolute",
        insetInline: 10,
        insetBlockEnd: 10,
        display: "flex",
        alignItems: "center",
        gap: 10,
        paddingBlock: 8,
        paddingInlineStart: 12,
        paddingInlineEnd: 8,
        background: "var(--live-ink)",
        color: "#f8fafc",
        borderBlockEnd: "3px solid var(--live-signal)",
        boxShadow: "0 14px 30px -12px rgb(9 11 17 / 0.6)",
      }}
    >
      <span style={{ display: "grid", flex: 1, minInlineSize: 0 }}>
        <small style={{ fontSize: 11, color: "#94a3b8" }}>{items}</small>
        <b className="live-num" style={{ justifySelf: "start", fontWeight: 400, color: "#93c5fd" }}>
          {total}
        </b>
      </span>
      <span className="live-btn" data-cursor-at={cursorAt}>
        {send}
      </span>
    </div>
  )
}

/**
 * Steps: 0 the camera finds the table's code, 1 it locks on table 12, 2 the
 * menu opens in the page's language, 3–6 the cursor switches it to the other
 * two languages and back (EN, AR, KU), 6–7 two items are added, 8 the order
 * bar sends it, 9 the order reaches the kitchen as a ticket, 10 the kitchen
 * starts it, 11 the ticket turns ready.
 */
export function Screen({ locale }: { locale: Locale }) {
  const c = t[locale]
  const own: MenuLang = locale
  const other: MenuLang = locale === "en" ? "ar" : "en"
  return (
    <LiveScreen label={c.label} title={c.app} steps={12} interval={1000} device="phone">
      {/* the camera, finding the code on the table */}
      <div
        style={{
          ...layer,
          display: "grid",
          placeItems: "center",
          alignContent: "center",
          gap: 18,
          padding: 20,
          background: "radial-gradient(circle at 50% 42%, #1e293b, #090b11 72%)",
          color: "#e2e8f0",
          textAlign: "center",
        }}
      >
        <div style={{ position: "relative", inlineSize: 180, blockSize: 180, display: "grid", placeItems: "center" }}>
          <span style={{ rotate: "-4deg", boxShadow: "0 18px 40px -10px rgb(0 0 0 / 0.7)" }}>
            <QrCode />
          </span>
          <span style={cover}>
            <Corners color="#f8fafc" />
          </span>
          <span data-at={1} style={{ ...cover, outline: "none" }}>
            <Corners color="var(--live-signal)" />
          </span>
          <span data-only={0} style={{ position: "absolute", insetInline: 10, insetBlockStart: "50%", blockSize: 2, background: "var(--live-signal)", boxShadow: "0 0 12px 2px rgb(37 99 235 / 0.8)" }} />
        </div>
        <small style={{ fontSize: 12, color: "#cbd5e1" }}>{c.point}</small>
        <span data-at={1} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 12px", background: "var(--live-signal)", color: "#fff" }}>
          <LGlyph state="done" />
          {c.found}
        </span>
      </div>

      {/* the menu: the page's language, the other two, then back */}
      <Menu lang={own} at={2} cursorTo={[other, 3]} />
      <Menu lang={other} at={4} cursorTo={["ku", 4]} />
      <Menu lang="ku" at={5} cursorTo={[own, 5]} />
      <Menu lang={own} at={6} adds />

      <Cart at={7} items={c.items[0]} total={c.totals[0]} send={c.send} />
      <Cart at={8} items={c.items[1]} total={c.totals[1]} send={c.send} cursorAt={8} />

      {/* the order, as the kitchen receives it */}
      <div
        data-at={9}
        style={{
          position: "absolute",
          insetInline: 0,
          insetBlockEnd: 0,
          display: "grid",
          gap: 12,
          padding: "16px 14px 18px",
          background: "var(--live-paper)",
          borderBlockStart: "3px solid var(--live-signal)",
          boxShadow: "0 -20px 40px -16px rgb(9 11 17 / 0.45)",
          outline: "none",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 500 }}>
          <LGlyph state="done" />
          {c.sent}
        </span>
        <div style={{ display: "grid", gap: 6, padding: "12px 14px", background: "#fffdf7", border: "1px dashed #94a3b8" }}>
          <span style={{ display: "flex", justifyContent: "space-between", gap: 8, fontSize: 11, color: "var(--live-faint)" }}>
            {c.ticket}
            <span>
              {c.table} · <span className="live-num">#0412</span>
            </span>
          </span>
          {c.lines.map((line) => (
            <span key={line}>{line}</span>
          ))}
          <span style={{ position: "relative", display: "flex", alignItems: "center", gap: 8, paddingBlockStart: 8, borderBlockStart: "1px dashed #cbd5e1" }}>
            <span style={{ position: "relative", display: "inline-flex" }}>
              <LGlyph state="waiting" />
              <span data-at={10} style={{ ...cover, display: "inline-flex" }}>
                <LGlyph state="progress" />
              </span>
              <span data-at={11} style={{ ...cover, display: "inline-flex" }}>
                <LGlyph state="done" />
              </span>
            </span>
            <span style={{ position: "relative", flex: 1 }}>
              {c.status[0]}
              {/* each later status covers the one before, descenders included */}
              <span data-at={10} style={{ ...cover, insetBlock: -4, paddingBlockStart: 4, background: "#fffdf7", outline: "none" }}>
                {c.status[1]}
              </span>
              <span data-at={11} style={{ ...cover, insetBlock: -4, paddingBlockStart: 4, background: "#fffdf7", outline: "none", fontWeight: 600 }}>
                {c.status[2]}
              </span>
            </span>
          </span>
        </div>
      </div>
    </LiveScreen>
  )
}
