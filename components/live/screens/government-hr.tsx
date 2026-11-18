import type { CSSProperties } from "react"

import { LBand, LButton, LCard, LField, LGlyph } from "@/components/live/kit"
import { LiveScreen } from "@/components/live/live-screen"
import type { Locale } from "@/lib/i18n"

const t = {
  en: {
    label:
      "ANU Government HR on a deputation: the request is entered once, the memo is approved by three managers in turn, the outgoing number is recorded and the stamped order is issued once as an archived PDF",
    app: "Government HR · Deputations",
    band: "Deputation request",
    figures: [
      { value: "DEP/2026/0073", label: "case" },
      { value: "5", label: "days" },
    ],
    request: "Request",
    fields: [
      ["Employee", "Hassan Ali Jaber"],
      ["Destination", "Erbil"],
      ["Period", "6–10 Dec 2026"],
      ["Subject", "Archiving workshop"],
    ],
    send: "Send the memo",
    memo: "Memorandum",
    memoLine: "Deputation of one employee to Erbil for five days",
    approvals: "Approvals",
    approvers: ["Department manager", "Director General", "Administrative manager"],
    approved: "Approved",
    times: ["09:12", "10:40", "11:05"],
    docs: "Supporting documents checked",
    order: "Administrative order",
    number: "Outgoing No. and date",
    numberValue: "1482 · 24/11/2026",
    issue: "Register and issue",
    pdf: {
      kind: "Official letter · PDF",
      title: "Administrative order",
      no: "No.",
      date: "Date",
      body: "Hassan Ali Jaber, Engineer, is deputed to Erbil from 6 to 10 December 2026 to attend a training workshop on electronic archiving.",
      sign: "Director General",
      seal: "STAMP",
      draft: "Draft",
    },
    issued: "Stamped once and archived. Every reprint is this copy.",
  },
  ar: {
    label:
      "نظام أنو للموارد البشرية الحكومية على إيفاد: يُدخل الطلب مرة واحدة، وتعتمد المذكرةَ ثلاثةُ مدراء بالتتابع، ويُسجَّل رقم الصادر، ويصدر الأمر الإداري المختوم مرة واحدة كتاباً رسمياً مؤرشفاً بصيغة PDF",
    app: "الموارد البشرية · الإيفادات",
    band: "طلب إيفاد",
    figures: [
      { value: "DEP/2026/0073", label: "رقم المعاملة" },
      { value: "5", label: "أيام الإيفاد" },
    ],
    request: "الطلب",
    fields: [
      ["الموظف", "حسن علي جابر"],
      ["جهة الإيفاد", "أربيل"],
      ["مدة الإيفاد", "6–10 كانون الأول 2026"],
      ["الموضوع", "ورشة في الأرشفة"],
    ],
    send: "رفع المذكرة",
    memo: "المذكرة",
    memoLine: "إيفاد موظف واحد إلى أربيل لمدة خمسة أيام",
    approvals: "الموافقات",
    approvers: ["مدير القسم المعني", "المدير العام", "مدير القسم الإداري"],
    approved: "موافقة",
    times: ["09:12", "10:40", "11:05"],
    docs: "دُقّقت الأوليات المطلوبة",
    order: "الأمر الإداري",
    number: "رقم الصادر وتاريخه",
    numberValue: "1482 في 24/11/2026",
    issue: "تسجيل وإصدار",
    pdf: {
      kind: "كتاب رسمي · PDF",
      title: "أمر إداري",
      no: "العدد",
      date: "التاريخ",
      body: "استناداً إلى الصلاحيات المخوّلة لنا، تقرّر إيفاد الموظف حسن علي جابر (مهندس) إلى أربيل للمدة من 6 إلى 10 كانون الأول 2026، للمشاركة في ورشة تدريبية في الأرشفة الإلكترونية.",
      sign: "المدير العام",
      seal: "الختم",
      draft: "مسودة",
    },
    issued: "خُتم الكتاب مرة واحدة وأُرشف، وكل طبعة لاحقة هي هذه النسخة.",
  },
} as const

const head: CSSProperties = { fontSize: 11, color: "var(--live-faint)" }
const cols: CSSProperties = {
  display: "grid",
  gap: 10,
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 15.5rem), 1fr))",
  alignItems: "start",
}
const pair: CSSProperties = { display: "grid", gap: 8, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 8.5rem), 1fr))" }
const cover: CSSProperties = { position: "absolute", inset: 0 }

/** A round approval stamp: a dashed ring while waiting, inked at step `at`. */
function Stamp({ at }: { at: number }) {
  return (
    <span style={{ position: "relative", flex: "none", inlineSize: 26, blockSize: 26 }}>
      <svg viewBox="0 0 26 26" width="26" height="26" aria-hidden="true">
        <circle cx="13" cy="13" r="11" fill="none" style={{ stroke: "#94a3b8" }} strokeDasharray="3 3" />
      </svg>
      <svg data-at={at} viewBox="0 0 26 26" width="26" height="26" aria-hidden="true" style={{ ...cover, rotate: "-14deg", borderRadius: "50%" }}>
        <circle cx="13" cy="13" r="11.5" fill="none" style={{ stroke: "var(--live-signal)" }} strokeWidth="1.6" />
        <circle cx="13" cy="13" r="8.2" fill="none" style={{ stroke: "var(--live-signal)" }} strokeWidth="0.8" />
        <path d="M8.6 13.2 11.6 16 17.6 9.8" fill="none" style={{ stroke: "var(--live-signal)" }} strokeWidth="2" />
      </svg>
    </span>
  )
}

/** The institution's seal: double ring, the mark in the middle, its word below. */
function Seal({ word }: { word: string }) {
  return (
    <svg viewBox="0 0 100 100" width="64" height="64" aria-hidden="true" style={{ display: "block", rotate: "-12deg", opacity: 0.88 }}>
      <circle cx="50" cy="50" r="46" fill="none" style={{ stroke: "var(--live-signal)" }} strokeWidth="3" />
      <circle cx="50" cy="50" r="38" fill="none" style={{ stroke: "var(--live-signal)" }} strokeWidth="1.2" />
      <circle cx="50" cy="50" r="42" fill="none" style={{ stroke: "var(--live-signal)" }} strokeWidth="1.4" strokeDasharray="1.5 3.2" />
      <path d="M50 24 54.6 41.5 72 46 54.6 50.5 50 68 45.4 50.5 28 46 45.4 41.5Z" style={{ fill: "var(--live-signal)" }} />
      <text x="50" y="84" textAnchor="middle" fontSize="10" fontWeight="700" style={{ fill: "var(--live-signal)" }}>
        {word}
      </text>
    </svg>
  )
}

/** A grey line of letter text, for the parts of the page that are not the point. */
function Line({ w }: { w: string }) {
  return <i style={{ display: "block", blockSize: 4, inlineSize: w, background: "#e2e8f0" }} />
}

/**
 * Steps: 0 the case opens, 1–4 the request types in once (employee,
 * destination, period, subject), 5 the cursor sends the memo, 6 the memo goes
 * up its route, 7–9 three approvals stamp in turn and the documents are
 * checked, 10 the order is drafted from the same case, 11 the outgoing
 * number types in, 12 the cursor registers and issues, 13 the seal lands on
 * the PDF and it is archived.
 */
export function Screen({ locale }: { locale: Locale }) {
  const c = t[locale]
  return (
    <LiveScreen label={c.label} title={c.app} steps={14} interval={1100}>
      <LBand title={c.band} at={0} figures={c.figures.map((f, i) => ({ ...f, at: i === 0 ? 0 : 3 }))} />

      <div style={cols}>
        {/* the request, entered once */}
        <LCard>
          <span style={head}>{c.request}</span>
          <div style={pair}>
            {c.fields.map(([label, value], i) => (
              <LField key={label} label={label} value={value} at={1 + i} />
            ))}
          </div>
          <span>
            <LButton cursorAt={5}>{c.send}</LButton>
          </span>
        </LCard>

        {/* the memo and its route through the organisation chart */}
        <LCard>
          <span style={head}>{c.memo}</span>
          <span data-at={6} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <LGlyph state="done" />
            {c.memoLine}
          </span>
          <span style={{ ...head, marginBlockStart: 6 }}>{c.approvals}</span>
          {c.approvers.map((role, i) => (
            <span key={role} style={{ display: "flex", alignItems: "center", gap: 10, paddingBlock: 2, borderBlockEnd: "1px solid var(--live-rule)" }}>
              <Stamp at={7 + i} />
              <span style={{ display: "grid", flex: 1, minInlineSize: 0 }}>
                {role}
                <small data-at={7 + i} style={{ fontSize: 11, color: "var(--live-signal)" }}>
                  {c.approved} · <span className="live-num">{c.times[i]}</span>
                </small>
              </span>
            </span>
          ))}
          <span data-at={9} style={{ display: "flex", alignItems: "center", gap: 8, marginBlockStart: 4 }}>
            <LGlyph state="done" />
            {c.docs}
          </span>
        </LCard>

        {/* the administrative order and its one stamped render */}
        <LCard>
          <span style={head}>{c.order}</span>
          <span style={{ display: "flex", flexWrap: "wrap", alignItems: "end", gap: 8 }}>
            <span style={{ flex: "1 1 8rem" }}>
              <LField label={c.number} value={c.numberValue} at={11} cursorAt={10} />
            </span>
            <LButton cursorAt={12}>{c.issue}</LButton>
          </span>

          <div style={{ position: "relative", display: "grid", gap: 6, padding: "12px 14px 14px", marginBlockStart: 4, background: "#fff", border: "1px solid #cbd5e1", boxShadow: "0 10px 24px -14px rgb(9 11 17 / 0.45)" }}>
            <span style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 8 }}>
              <span style={{ display: "grid" }}>
                <small style={{ fontSize: 10, color: "var(--live-faint)" }}>{c.pdf.kind}</small>
                <b style={{ fontSize: 13, fontWeight: 600 }}>{c.pdf.title}</b>
              </span>
              <span style={{ display: "grid", fontSize: 10, color: "var(--live-soft)", textAlign: "end" }}>
                <span>
                  {c.pdf.no}:{" "}
                  <span style={{ position: "relative", display: "inline-block", minInlineSize: "2.6em" }}>
                    <span className="live-num" style={{ color: "#94a3b8" }}>
                      ····
                    </span>
                    <span className="live-num" data-at={11} style={{ ...cover, background: "#fff", color: "var(--live-ink)" }}>
                      1482
                    </span>
                  </span>
                </span>
                <span>
                  {c.pdf.date}: <span className="live-num">24/11/2026</span>
                </span>
              </span>
            </span>
            {/* the body is drafted from the case when the order is prepared */}
            <span style={{ position: "relative", display: "block" }}>
              <span style={{ ...cover, display: "grid", alignContent: "start", gap: 9, paddingBlockStart: 5 }}>
                <Line w="96%" />
                <Line w="88%" />
                <Line w="92%" />
                <Line w="54%" />
              </span>
              <span data-at={10} style={{ position: "relative", display: "block", fontSize: 11, lineHeight: 1.55, color: "var(--live-ink)", background: "#fff" }}>
                {c.pdf.body}
              </span>
            </span>
            <span style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 10, minBlockSize: 64 }}>
              <span style={{ display: "grid", justifyItems: "center", gap: 2, fontSize: 11 }}>
                {/* signed and stamped together, on the one authorised render */}
                <svg data-at={13} viewBox="0 0 80 22" width="80" height="22" aria-hidden="true" style={{ outline: "none" }}>
                  <path d="M4 16c6-9 10-12 12-9s-4 10 1 9 7-12 11-11-2 9 3 8 6-7 9-6 0 6 4 5 8-5 12-6 8 2 16-1" fill="none" style={{ stroke: "var(--live-ink)" }} strokeWidth="1.3" strokeLinecap="round" />
                </svg>
                <i style={{ display: "block", inlineSize: 80, blockSize: 1, background: "var(--live-ink)" }} />
                {c.pdf.sign}
              </span>
              <span style={{ position: "relative", inlineSize: 64, blockSize: 64 }}>
                <span
                  style={{
                    ...cover,
                    display: "grid",
                    placeItems: "center",
                    border: "1.5px dashed #cbd5e1",
                    borderRadius: "50%",
                    fontSize: 10,
                    color: "#94a3b8",
                  }}
                >
                  {c.pdf.draft}
                </span>
                <span data-at={13} style={{ ...cover, outline: "none", background: "#fff", borderRadius: "50%" }}>
                  <Seal word={c.pdf.seal} />
                </span>
              </span>
            </span>
          </div>

          <span data-at={13} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <LGlyph state="done" />
            {c.issued}
          </span>
        </LCard>
      </div>
    </LiveScreen>
  )
}
