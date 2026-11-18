import type { CSSProperties } from "react"

import { LBand, LButton, LCard, LField, LGlyph, type LiveState } from "@/components/live/kit"
import { LiveScreen } from "@/components/live/live-screen"
import type { Locale } from "@/lib/i18n"

const t = {
  en: {
    label:
      "ANU Legal on a lawsuit: the matter moves along its status road, the cassation deadline is counted and moved past an official holiday, the government transaction steps are checked and the deadlines turn done",
    app: "Legal · Matters",
    band: "Commercial lease dispute",
    figures: [
      { value: "LGL/2026/0148", label: "matter" },
      { value: "7 Jan 2027", label: "last day to file" },
    ],
    road: ["Intake", "Filed", "Hearings", "Judgment", "Cassation"],
    clock: "Statutory deadline",
    notified: "Judgment notified on",
    notifiedValue: "7 Dec 2026",
    period: "Period",
    periodValue: "Cassation · 30 days",
    count: "Count the deadline",
    month: "January 2027",
    days: [
      ["Tue", "5", "working day"],
      ["Wed", "6", "Army Day"],
      ["Thu", "7", "working day"],
    ],
    lastDay: "last day",
    note: "Day 30 is Army Day, an official holiday, so the period ends on the next working day.",
    tx: "Government transaction",
    txName: "Cassation petition",
    txSteps: ["Certified copy of the judgment", "Cassation fee paid at the court cashier", "Petition registered at the court"],
    fee: "Fee paid",
    feeValue: "IQD 25,000",
    file: "File the petition",
    filed: "Filed within the period",
    timeline: "Deadlines on this matter",
    events: [
      ["Lawsuit filed", "3 Aug 2026"],
      ["Hearing", "12 Oct 2026"],
      ["Judgment notified", "7 Dec 2026"],
      ["Certified copy", "14 Dec 2026"],
      ["Cassation petition", "7 Jan 2027"],
      ["Cassation decision", "awaited"],
    ],
  },
  ar: {
    label:
      "نظام أنو للشؤون القانونية على دعوى: يتقدم الملف على مسار حالته، وتُحسب مدة الطعن تمييزاً وتنتقل بعد عطلة رسمية، وتُؤشَّر خطوات المعاملة الحكومية، وتكتمل المدد واحدة بعد أخرى",
    app: "الشؤون القانونية · الملفات",
    band: "دعوى إيجار تجاري",
    figures: [
      { value: "LGL/2026/0148", label: "رقم الملف" },
      { value: "7/1/2027", label: "آخر يوم للطعن" },
    ],
    road: ["الاستلام", "إقامة الدعوى", "الجلسات", "الحكم", "التمييز"],
    clock: "المدة القانونية",
    notified: "تاريخ التبلّغ بالحكم",
    notifiedValue: "7 كانون الأول 2026",
    period: "المدة",
    periodValue: "الطعن تمييزاً · 30 يوماً",
    count: "احسب المدة",
    month: "كانون الثاني 2027",
    days: [
      ["الثلاثاء", "5", "يوم عمل"],
      ["الأربعاء", "6", "عيد الجيش"],
      ["الخميس", "7", "يوم عمل"],
    ],
    lastDay: "آخر يوم",
    note: "اليوم الثلاثون يصادف عيد الجيش، وهو عطلة رسمية، فتنتهي المدة في أول يوم عمل بعده.",
    tx: "معاملة حكومية",
    txName: "لائحة التمييز",
    txSteps: ["استخراج صورة مصدّقة من الحكم", "دفع رسم التمييز في صندوق المحكمة", "تسجيل اللائحة لدى المحكمة"],
    fee: "الرسم المدفوع",
    feeValue: "IQD 25,000",
    file: "تقديم اللائحة",
    filed: "قُدّمت اللائحة ضمن المدة",
    timeline: "مدد هذا الملف",
    events: [
      ["إقامة الدعوى", "3 آب 2026"],
      ["جلسة المرافعة", "12 تشرين الأول 2026"],
      ["التبلّغ بالحكم", "7 كانون الأول 2026"],
      ["صورة مصدّقة", "14 كانون الأول 2026"],
      ["لائحة التمييز", "7 كانون الثاني 2027"],
      ["قرار التمييز", "بالانتظار"],
    ],
  },
} as const

/** When each stage of the road is reached: the history replays, cassation comes with the filing. */
const roadAt = [0, 1, 2, 3, 12]
/** Each deadline: the step it appears, its state, and the step it turns done. */
const events: { at: number; state: LiveState; done?: number }[] = [
  { at: 1, state: "done" },
  { at: 2, state: "done" },
  { at: 3, state: "done" },
  { at: 7, state: "due", done: 9 },
  { at: 7, state: "due", done: 12 },
  { at: 12, state: "waiting" },
]

const head: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, fontSize: 11, color: "var(--live-faint)" }
const cols: CSSProperties = {
  display: "grid",
  gap: 10,
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 15.5rem), 1fr))",
  alignItems: "start",
}
const pair: CSSProperties = { display: "grid", gap: 8, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 8.5rem), 1fr))" }
const cover: CSSProperties = { position: "absolute", inset: 0 }

/** A status glyph that turns into another at step `at`. */
function Flip({ from, to, at }: { from: LiveState; to: LiveState; at: number }) {
  return (
    <span style={{ position: "relative", display: "inline-flex", flex: "none" }}>
      <LGlyph state={from} />
      <span data-at={at} style={{ ...cover, display: "inline-flex" }}>
        <LGlyph state={to} />
      </span>
    </span>
  )
}

/** A square checkbox that fills at step `at`. */
function Check({ at, cursorAt }: { at: number; cursorAt?: number }) {
  return (
    <span
      data-cursor-at={cursorAt}
      style={{ position: "relative", flex: "none", inlineSize: 16, blockSize: 16, border: "1.5px solid #94a3b8", background: "var(--live-paper)" }}
    >
      <span data-at={at} style={{ position: "absolute", inset: -1.5, display: "grid", placeItems: "center", background: "var(--live-signal)" }}>
        <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
          <path d="M2 6.4 4.8 9 10 3" fill="none" stroke="#fff" strokeWidth="2" />
        </svg>
      </span>
    </span>
  )
}

/**
 * Steps: 0–3 the matter's road replays (intake, filed, hearings, judgment)
 * while past deadlines fill the timeline, 3–4 the notification date and the
 * period type in, 5 the cursor counts the deadline, 6 day 30 lands on Army
 * Day, 7 the period moves to Thursday and two deadlines fall due, 8–10 the
 * transaction steps are checked and the fee is entered, 11 the petition is
 * filed, 12 the road reaches cassation and the deadlines turn done.
 */
export function Screen({ locale }: { locale: Locale }) {
  const c = t[locale]
  return (
    <LiveScreen label={c.label} title={c.app} steps={13} interval={1150}>
      <LBand title={c.band} at={0} figures={c.figures.map((f, i) => ({ ...f, at: i === 0 ? 0 : 7 }))} />

      {/* the status road: plain stages ahead, tinted once reached, solid on the step it is reached */}
      <div className="live-road">
        {c.road.map((stage, i) => (
          <span key={stage} className="live-road__stage" style={{ position: "relative", minInlineSize: 0, overflow: "hidden", textOverflow: "ellipsis" }}>
            {stage}
            <span
              className="live-road__stage"
              data-at={roadAt[i]}
              data-road={i < 4 ? "past" : "now"}
              style={{ position: "absolute", inset: -1, overflow: "hidden", textOverflow: "ellipsis" }}
            >
              {stage}
            </span>
          </span>
        ))}
      </div>

      <div style={cols}>
        {/* the deadline, counted */}
        <LCard>
          <span style={head}>{c.clock}</span>
          <div style={pair}>
            <LField label={c.notified} value={c.notifiedValue} at={3} />
            <LField label={c.period} value={c.periodValue} at={4} />
          </div>
          <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
            <LButton cursorAt={5}>{c.count}</LButton>
            <small data-at={6} style={{ fontSize: 11, color: "var(--live-soft)" }}>
              {c.month}
            </small>
          </span>
          <div data-at={6} style={{ display: "grid", gap: 6 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 2 }}>
              {c.days.map(([weekday, day, kind], i) => (
                <span
                  key={day}
                  style={{
                    position: "relative",
                    display: "grid",
                    justifyItems: "center",
                    padding: "5px 2px",
                    border: "1px solid var(--live-rule)",
                    background:
                      i === 1
                        ? "repeating-linear-gradient(135deg, #fee2e2 0 4px, var(--live-paper) 4px 8px)"
                        : "var(--live-paper)",
                  }}
                >
                  <small style={{ fontSize: 10, color: "var(--live-faint)" }}>{weekday}</small>
                  <b className="live-num" style={{ fontSize: 16, fontWeight: 500, textDecoration: i === 1 ? "line-through" : undefined }}>
                    {day}
                  </b>
                  <small style={{ fontSize: 10, color: i === 1 ? "var(--live-danger)" : "var(--live-faint)", whiteSpace: "nowrap" }}>{kind}</small>
                  {i === 2 ? (
                    <span
                      data-at={7}
                      style={{
                        position: "absolute",
                        inset: -1,
                        display: "grid",
                        justifyItems: "center",
                        alignContent: "center",
                        background: "var(--live-signal)",
                        color: "#fff",
                      }}
                    >
                      <small style={{ fontSize: 10 }}>{weekday}</small>
                      <b className="live-num" style={{ fontSize: 16, fontWeight: 500 }}>
                        {day}
                      </b>
                      <small style={{ fontSize: 10 }}>{c.lastDay}</small>
                    </span>
                  ) : null}
                </span>
              ))}
            </div>
            <small style={{ fontSize: 11, color: "var(--live-soft)" }}>{c.note}</small>
          </div>
        </LCard>

        {/* the government transaction behind the petition */}
        <LCard>
          <span style={head}>
            {c.tx}
            <b style={{ fontWeight: 500, color: "var(--live-ink)" }}>{c.txName}</b>
          </span>
          {c.txSteps.map((step, i) => (
            <span key={step} style={{ display: "flex", alignItems: "center", gap: 8, paddingBlock: 3 }}>
              <Check at={[9, 10, 12][i]!} cursorAt={[8, 9, undefined][i]} />
              {step}
            </span>
          ))}
          <span style={{ display: "flex", flexWrap: "wrap", alignItems: "end", gap: 8 }}>
            <span style={{ flex: "1 1 8rem" }}>
              <LField label={c.fee} value={c.feeValue} at={10} />
            </span>
            <LButton cursorAt={11}>{c.file}</LButton>
          </span>
          <span data-at={12} style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--live-ink)" }}>
            <LGlyph state="done" />
            {c.filed}
          </span>
        </LCard>

        {/* every clock on the matter */}
        <LCard style={{ gap: 0, padding: 0 }}>
          <span style={{ ...head, padding: "10px 12px 6px" }}>{c.timeline}</span>
          {c.events.map(([label, date], i) => {
            const e = events[i]!
            return (
              <div key={label} className="live-row" data-at={e.at} style={{ padding: "7px 12px" }}>
                {e.done !== undefined ? <Flip from={e.state} to="done" at={e.done} /> : <LGlyph state={e.state} />}
                <span className="live-row__label" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {label}
                </span>
                <small style={{ flex: "none", fontSize: 11, color: "var(--live-faint)" }}>{date}</small>
              </div>
            )
          })}
        </LCard>
      </div>
    </LiveScreen>
  )
}
