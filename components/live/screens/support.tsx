import type { CSSProperties, ReactNode } from "react"

import { LBand, LButton, LGlyph, LSheet } from "@/components/live/kit"
import { LiveScreen } from "@/components/live/live-screen"
import type { Locale } from "@/lib/i18n"

const t = {
  en: {
    label:
      "ANU Support from inside the system: a right-click on an invoice opens Report this screen, the captured screen is marked up with a box and a numbered arrow, the report is described and reviewed before it is sent, and ANU's answer comes back in the system with a fix note",
    app: "Accounting · Customer invoices",
    ref: "INV/2026/0388",
    kind: "Customer invoice",
    stages: ["Draft", "Posted", "Paid"],
    fields: [
      ["Customer", "Al-Furat Building Materials"],
      ["Price list", "Contractors · 5 % off"],
      ["Invoice date", "16 Nov 2026"],
      ["Due date", "16 Dec 2026"],
    ],
    lines: [
      ["Ceramic tile 60 × 60", "120 m² × IQD 18,000", "IQD 2,160,000"],
      ["Tile adhesive, 25 kg", "40 bags × IQD 9,500", "IQD 380,000"],
    ],
    totals: [
      ["Untaxed", "IQD 2,540,000"],
      ["Discount 5 %", "IQD 0"],
      ["Total", "IQD 2,540,000"],
    ],
    menu: ["Open in a new tab", "Copy the link", "Duplicate", "Report this screen"],
    captured: "Captured 10:42",
    tools: ["Box", "Arrow", "Draw", "Highlight", "Blur", "Number"],
    report: "Report this screen",
    what: "What went wrong?",
    typed: "The contractors' 5 % discount is missing. The total should be IQD 2,413,000.",
    shared: "Shared with ANU",
    blocks: ["Screenshot, marked up", "Accounting › Invoices › INV/2026/0388", "ANU Brain 19 · build 2026.11.12", "Errors on this page: none"],
    blur: "Blur a part",
    send: "Send",
    request: "SUP-0042",
    requestFigures: [
      { value: "INV/2026/0388", label: "record" },
    ],
    road: ["Sent", "In progress", "Answered"],
    you: "You · Accounts, Baghdad · 10:43",
    reply: "ANU Support · 10:51",
    replyText: "We can see it on INV/2026/0388: the contractors' price list was skipped when the invoice was posted. A fix is on its way.",
    answer: "SUP-0042 answered · fixed in today's update",
    fixNote: "Fix note: the price-list discount now applies to every posted invoice.",
    showMe: "Show me what changed",
  },
  ar: {
    label:
      "دعم أنو من داخل النظام: النقر بالزر الأيمن على فاتورة يفتح «أبلغ عن هذه الشاشة»، وتُحدَّد اللقطة بمربع وسهم مرقّم، ويُكتب البلاغ ويُراجَع قبل إرساله، ثم يعود جواب أنو داخل النظام مع ملاحظة الإصلاح",
    app: "المحاسبة · فواتير الزبائن",
    ref: "INV/2026/0388",
    kind: "فاتورة زبون",
    stages: ["مسودة", "مرحَّلة", "مدفوعة"],
    fields: [
      ["الزبون", "الفرات لمواد البناء"],
      ["قائمة الأسعار", "المقاولون · خصم 5 %"],
      ["تاريخ الفاتورة", "16 تشرين الثاني 2026"],
      ["تاريخ الاستحقاق", "16 كانون الأول 2026"],
    ],
    lines: [
      ["سيراميك 60 × 60", "120 م² × IQD 18,000", "IQD 2,160,000"],
      ["لاصق سيراميك، 25 كغم", "40 كيساً × IQD 9,500", "IQD 380,000"],
    ],
    totals: [
      ["قبل الضريبة", "IQD 2,540,000"],
      ["خصم 5 %", "IQD 0"],
      ["المجموع", "IQD 2,540,000"],
    ],
    menu: ["فتح في تبويب جديد", "نسخ الرابط", "تكرار", "أبلغ عن هذه الشاشة"],
    captured: "التُقطت 10:42",
    tools: ["مربع", "سهم", "رسم", "تظليل", "تمويه", "رقم"],
    report: "أبلغ عن هذه الشاشة",
    what: "ما المشكلة؟",
    typed: "خصم المقاولين 5 % غير مطبَّق، والمجموع الصحيح 2,413,000 دينار.",
    shared: "ما سيُشارَك مع أنو",
    blocks: ["لقطة الشاشة مع التحديد", "المحاسبة › الفواتير › INV/2026/0388", "أنو برين 19 · إصدار 2026.11.12", "أخطاء هذه الصفحة: لا شيء"],
    blur: "تمويه جزء",
    send: "إرسال",
    request: "SUP-0042",
    requestFigures: [
      { value: "INV/2026/0388", label: "السجل" },
    ],
    road: ["أُرسل", "قيد المعالجة", "أُجيب"],
    you: "أنت · الحسابات، بغداد · 10:43",
    reply: "دعم أنو · 10:51",
    replyText: "نرى المشكلة على INV/2026/0388: قائمة أسعار المقاولين لم تُطبَّق عند ترحيل الفاتورة. الإصلاح في الطريق.",
    answer: "أُجيب على SUP-0042 · أُصلح في تحديث اليوم",
    fixNote: "ملاحظة الإصلاح: خصم قائمة الأسعار يُطبَّق الآن على كل فاتورة مرحَّلة.",
    showMe: "أرِني ما تغيّر",
  },
} as const

const ink = "#090b11"
const signal = "#2563eb"
const cover: CSSProperties = { position: "absolute", inset: 0 }
const still: CSSProperties = { outline: "none" }

const toolIcons = [
  "M4 6h16v12H4z",
  "M5 19 19 5 M11 5h8v8",
  "M3 17c3-6 5 2 8-4s5 2 10-6",
  "M9 4l6 6-8 8H3v-4z M13 19h8",
  "M6 8h.5 M12 6h.5 M18 8h.5 M5 13h.5 M12 12h.5 M19 13h.5 M8 18h.5 M16 18h.5",
  "M12 4a8 8 0 1 0 0 16a8 8 0 1 0 0-16z M10.5 9.5 12.5 8v8",
]

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
function Typed({ value, at, cursorAt, box }: { value: ReactNode; at: number; cursorAt?: number; box?: CSSProperties }) {
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

/** The marked-up capture in miniature, attached to the request. */
function Thumb() {
  return (
    <svg viewBox="0 0 120 80" width="96" height="64" aria-hidden="true" style={{ flex: "none", direction: "ltr", background: "#fff", border: "1px solid var(--live-rule)" }}>
      <rect x="0" y="0" width="120" height="9" fill={ink} />
      <g fill="#e2e8f0">
        <rect x="8" y="16" width="44" height="6" />
        <rect x="64" y="16" width="44" height="6" />
        <rect x="8" y="28" width="44" height="6" />
        <rect x="64" y="28" width="44" height="6" />
        <rect x="8" y="42" width="100" height="5" />
        <rect x="8" y="51" width="100" height="5" />
        <rect x="70" y="62" width="38" height="12" />
      </g>
      <rect x="66" y="59" width="46" height="18" fill="none" stroke={signal} strokeWidth="2" />
      <path d="M44 54 63 63 M57 63h6v-6" fill="none" stroke={signal} strokeWidth="2" />
    </svg>
  )
}

/**
 * Steps: 0 a posted invoice; 1 the cursor right-clicks the totals; 2 the
 * record's menu opens and the cursor picks Report this screen; 3 the screen
 * is captured and the mark-up tools appear; 4 the cursor picks Box; 5 a box
 * is drawn round the totals; 6 a numbered arrow points at it; 7 the problem
 * is described; 8 the review shows every block that will be shared; 9 the
 * cursor sends it; 10 the request SUP-0042 opens in the system; 11 ANU's
 * reply, in progress; 12 answered: the fix arrives with its fix note.
 */
export function Screen({ locale }: { locale: Locale }) {
  const c = t[locale]
  const rtl = locale === "ar"
  return (
    <LiveScreen label={c.label} title={c.app} steps={13} interval={1100}>
      {/* the invoice the user is looking at */}
      <div className="live-card" style={{ gap: 12 }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px 16px" }}>
          <span style={{ display: "grid" }}>
            <b className="live-num" style={{ fontSize: 16, fontWeight: 500 }}>
              {c.ref}
            </b>
            <small style={{ color: "var(--live-faint)" }}>{c.kind}</small>
          </span>
          <div className="live-road" style={{ flex: "1 1 15rem", maxInlineSize: "24rem", marginInlineStart: "auto" }}>
            <Stage label={c.stages[0]} past={0} />
            <Stage label={c.stages[1]} solid />
            <Stage label={c.stages[2]} />
          </div>
        </div>

        <div className="live-grid live-cols-2" style={{ gap: "10px 12px" }}>
          {c.fields.map(([name, value]) => (
            <label key={name} className="live-field" style={{ minInlineSize: 0 }}>
              <small>{name}</small>
              <span className="live-field__value" style={{ textOverflow: "ellipsis" }}>
                {value}
              </span>
            </label>
          ))}
        </div>

        <div style={{ display: "grid", borderBlockStart: "1px solid var(--live-rule)" }}>
          {c.lines.map(([name, meta, value]) => (
            <div key={name} className="live-row" style={{ paddingInline: 0 }}>
              <span className="live-row__label">
                {name}
                <small>{meta}</small>
              </span>
              <span className="live-num live-row__value">{value}</span>
            </div>
          ))}
        </div>

        {/* the totals: right-clicked, then boxed and pointed at */}
        <div
          data-cursor-at={1}
          style={{ position: "relative", display: "grid", gap: 4, inlineSize: "min(100%, 17rem)", marginInlineStart: "auto", padding: "8px 10px", background: "var(--live-desk)" }}
        >
          {c.totals.map(([name, value], i) => (
            <span key={name} style={{ display: "flex", justifyContent: "space-between", gap: 12, fontWeight: i === 2 ? 500 : 400, color: i === 1 ? "var(--live-danger)" : undefined }}>
              {name}
              <span className="live-num">{value}</span>
            </span>
          ))}
          <LSheet only={2} style={{ ...still, insetBlockEnd: "calc(100% + 6px)", insetInlineEnd: 0 }}>
            {c.menu.map((item, i) => (
              <span key={item} className={i === 3 ? "is-now" : undefined} data-cursor-at={i === 3 ? 2 : undefined}>
                {i === 3 ? "◎ " : ""}
                {item}
              </span>
            ))}
          </LSheet>
          <span data-at={5} data-cursor-at={5} style={{ position: "absolute", inset: -6, zIndex: 3, border: `2.5px solid ${signal}`, outline: "none" }} />
          <span data-at={6} style={{ ...still, position: "absolute", zIndex: 3, insetBlockEnd: "calc(100% + 2px)", insetInlineStart: -14, display: "flex", alignItems: "start", gap: 2 }}>
            <span className="live-num" style={{ display: "grid", placeItems: "center", inlineSize: 20, blockSize: 20, background: signal, color: "#fff", fontSize: 12 }}>
              1
            </span>
            <svg viewBox="0 0 48 36" width="48" height="36" aria-hidden="true" style={{ transform: rtl ? "scaleX(-1)" : undefined, marginBlockStart: 8 }}>
              <path d="M2 4 C 22 4, 34 12, 42 30 M33 27 42 31 44 21" fill="none" stroke={signal} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>

      {/* the capture: a frame round the screen and the mark-up tools */}
      <span data-at={3} style={{ ...still, position: "absolute", inset: 4, zIndex: 2, border: `2px dashed ${signal}`, background: "rgb(37 99 235 / 0.05)", pointerEvents: "none" }} />
      <LSheet
        at={3}
        style={{ ...still, insetBlockStart: 10, insetInlineEnd: 12, minInlineSize: 0, display: "flex", alignItems: "center", gap: 2, padding: 4 }}
      >
        <small style={{ paddingInline: 6, color: "#93c5fd", whiteSpace: "nowrap" }}>{c.captured}</small>
        {toolIcons.map((d, i) => (
          <span key={d} title={c.tools[i]} data-cursor-at={i === 0 ? 4 : undefined} style={{ position: "relative", display: "grid", placeItems: "center", padding: 5 }}>
            {i === 0 ? <span data-at={4} style={{ ...cover, ...still, background: signal }} /> : null}
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#e2e8f0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ position: "relative" }}>
              <path d={d} />
            </svg>
          </span>
        ))}
      </LSheet>

      {/* describe, review what will be shared, send */}
      <div
        className="live-card"
        data-at={7}
        style={{
          ...still,
          position: "absolute",
          zIndex: 4,
          insetInlineStart: 14,
          insetBlockEnd: 14,
          inlineSize: "min(20rem, calc(100% - 28px))",
          gap: 8,
          boxShadow: "0 24px 50px -20px rgb(9 11 17 / 0.55)",
          borderBlockStart: `3px solid ${signal}`,
        }}
      >
        <span style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
          <b style={{ fontWeight: 500 }}>{c.report}</b>
          <small className="live-num" style={{ color: "var(--live-faint)" }}>
            {c.ref}
          </small>
        </span>
        <span className="live-field">
          <small>{c.what}</small>
          <Typed value={c.typed} at={7} cursorAt={7} box={{ whiteSpace: "normal", minBlockSize: 52 }} />
        </span>
        <span data-at={8} style={{ ...still, display: "grid", gap: 3 }}>
          <small style={{ color: "var(--live-faint)", fontSize: 10 }}>{c.shared}</small>
          {c.blocks.map((block) => (
            <span key={block} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 11.5 }}>
              <LGlyph state="done" />
              {block}
            </span>
          ))}
        </span>
        <span data-at={8} style={{ ...still, display: "flex", justifyContent: "end", gap: 8 }}>
          <LButton ghost>{c.blur}</LButton>
          <LButton cursorAt={9}>{c.send}</LButton>
        </span>
      </div>

      {/* the request, inside the client's own system */}
      <div data-at={10} style={{ ...cover, ...still, zIndex: 4, display: "grid", alignContent: "start", gap: 10, padding: 14, background: "var(--live-desk)" }}>
        <LBand title={c.request} figures={c.requestFigures.map((f) => ({ ...f }))} />
        <div className="live-road">
          <Stage label={c.road[0]} now={10} past={11} />
          <Stage label={c.road[1]} now={11} past={12} />
          <Stage label={c.road[2]} now={12} />
        </div>
        <div className="live-card" style={{ display: "flex", gap: 12, alignItems: "start" }}>
          <span style={{ display: "grid", gap: 4, flex: 1, minInlineSize: 0 }}>
            <small style={{ color: "var(--live-faint)" }}>{c.you}</small>
            <span>{c.typed}</span>
            <span style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {c.blocks.slice(0, 2).map((block) => (
                <small key={block} style={{ padding: "1px 6px", border: "1px solid var(--live-rule)", background: "var(--live-desk)", color: "var(--live-soft)" }}>
                  {block}
                </small>
              ))}
            </span>
          </span>
          <Thumb />
        </div>
        <div data-at={11} className="live-card" style={{ ...still, borderInlineStart: `3px solid ${signal}` }}>
          <small style={{ color: signal }}>{c.reply}</small>
          <span>{c.replyText}</span>
        </div>
      </div>

      <div className="live-toast" data-at={12} style={{ zIndex: 5, alignItems: "start", maxInlineSize: "min(23rem, calc(100% - 28px))" }}>
        <LGlyph state="done" />
        <span style={{ display: "grid", gap: 4 }}>
          <b style={{ fontWeight: 500 }}>{c.answer}</b>
          <span style={{ color: "var(--live-soft)" }}>{c.fixNote}</span>
          <span data-cursor-at={12} style={{ color: signal, justifySelf: "start" }}>▶ {c.showMe}</span>
        </span>
      </div>
    </LiveScreen>
  )
}
