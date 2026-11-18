import type { CSSProperties } from "react"

import { LCard, LGlyph, type LiveState } from "@/components/live/kit"
import { LiveScreen } from "@/components/live/live-screen"
import type { Locale } from "@/lib/i18n"

const t = {
  en: {
    label: "ANU Bureau for a scientific office: the expiry radar counts down and one registration turns red, a WhatsApp reminder goes out, the rep's visits check in along the day's route, and the renewal procedure is opened",
    app: "Bureau · Today",
    band: "Field and registrations",
    figures: ["visits today", "A-class coverage", "expiring ≤ 90 days"],
    route: "Rep route · Baghdad, Karkh to Rusafa",
    stops: ["Yarmouk", "Mansour", "Harthiya", "Adhamiya", "Karrada", "Jadriya"],
    visits: [
      { at: 0, state: "neutral", text: "6 visits planned · first at 09:00" },
      { at: 3, state: "done", text: "Visit 1 · cardiology clinic · met · 2 samples" },
      { at: 4, state: "done", text: "Visit 2 · pharmacy · order for 40 packs" },
      { at: 5, state: "done", text: "Visit 3 · internal medicine · met · objection noted" },
      { at: 8, state: "done", text: "Visit 4 · hospital pharmacy · met · next visit booked" },
    ],
    radar: "Expiry radar · 90 / 60 / 30",
    digest: ["yesterday", "07:30 digest"],
    days: "d",
    regs: [
      { label: "Agency letter · renewal", from: 215 },
      { label: "Amoxicillin 500 mg · registration", from: 91 },
      { label: "Omeprazole 20 mg · free-sale certificate", from: 61 },
      { label: "Metformin 850 mg · registration", from: 31 },
    ],
    renewal: "Metformin 850 mg · renewal opened · dossier 4 of 7",
    whatsapp: "WhatsApp · 07:30",
    message: "Reminder: Metformin 850 mg registration expires in 30 days. The renewal dossier has 4 of 7 documents.",
  },
  ar: {
    label: "أنو للمكاتب العلمية: رادار الصلاحية يعدّ تنازليًا وتتحول إحدى التسجيلات إلى الأحمر، ويُرسَل تذكير عبر واتساب، وتُسجَّل زيارات المندوب على مسار اليوم، ثم يُفتح إجراء التجديد",
    app: "المكتب العلمي · اليوم",
    band: "الميدان والتسجيلات",
    figures: ["زيارات اليوم", "تغطية الفئة A", "تنتهي خلال 90 يومًا"],
    route: "مسار المندوب · بغداد، من الكرخ إلى الرصافة",
    stops: ["اليرموك", "المنصور", "الحارثية", "الأعظمية", "الكرادة", "الجادرية"],
    visits: [
      { at: 0, state: "neutral", text: "6 زيارات مخططة · الأولى 09:00" },
      { at: 3, state: "done", text: "الزيارة 1 · عيادة قلبية · تمت المقابلة · عيّنتان" },
      { at: 4, state: "done", text: "الزيارة 2 · صيدلية · طلبية 40 علبة" },
      { at: 5, state: "done", text: "الزيارة 3 · باطنية · تمت المقابلة · سُجّل اعتراض" },
      { at: 8, state: "done", text: "الزيارة 4 · صيدلية مستشفى · تمت المقابلة · حُجزت الزيارة القادمة" },
    ],
    radar: "رادار الصلاحية · 90 / 60 / 30",
    digest: ["أمس", "ملخص 07:30"],
    days: "يومًا",
    regs: [
      { label: "كتاب الوكالة · تجديد", from: 215 },
      { label: "أموكسيسيلين 500 ملغ · تسجيل", from: 91 },
      { label: "أوميبرازول 20 ملغ · شهادة بيع حر", from: 61 },
      { label: "ميتفورمين 850 ملغ · تسجيل", from: 31 },
    ],
    renewal: "ميتفورمين 850 ملغ · فُتح التجديد · الملف 4 من 7",
    whatsapp: "واتساب · 07:30",
    message: "تذكير: ينتهي تسجيل ميتفورمين 850 ملغ خلال 30 يومًا. ملف التجديد فيه 4 من 7 مستندات.",
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

/* the route in a 480 × 250 sketch of Baghdad: the Tigris, six stops, Karkh on the left, Rusafa on the right */
const stops = [
  { x: 60, y: 190, at: 3 },
  { x: 110, y: 100, at: 4 },
  { x: 190, y: 60, at: 5 },
  { x: 330, y: 70, at: 8 },
  { x: 360, y: 150, at: 99 },
  { x: 330, y: 215, at: 99 },
]

/** The radar's reading of a countdown: 30 days or less is red, the 90 and 60-day windows blue. */
const radar = (days: number): LiveState => (days <= 30 ? "alarm" : days <= 90 ? "due" : "neutral")

function RegRow({ label, days, unit, state }: { label: string; days: number; unit: string; state?: LiveState }) {
  const s = state ?? radar(days)
  return (
    <div className="live-row">
      <span className="live-glyph" data-state={s} />
      <span className="live-row__label">
        {label}
        {/* the countdown: what is left of a year */}
        <i style={{ display: "block", blockSize: 3, marginBlockStart: 4, background: "var(--live-rule)" }}>
          <i style={{ display: "block", blockSize: 3, inlineSize: `${Math.min(100, (days / 365) * 100)}%`, background: s === "alarm" ? "var(--live-danger)" : s === "neutral" ? "#94a3b8" : signal }} />
        </i>
      </span>
      <span className="live-row__value" style={{ whiteSpace: "nowrap", ...(s === "alarm" ? { color: "var(--live-danger)" } : {}) }}>
        <span className="live-num">{days}</span> {unit}
      </span>
    </div>
  )
}

/**
 * Steps: 0 the band, the planned route and the radar as of yesterday, 1 the
 * 07:30 digest counts every expiry down a day and Metformin crosses into the
 * 30-day window in red, 2 the WhatsApp reminder arrives, 3–5 the rep checks in
 * at the first three stops, 6 the cursor opens the red registration, 7 it
 * becomes a running renewal procedure, 8 the fourth visit checks in, 9 hold.
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
              <Tick bg={ink} values={[[0, "0 / 6"], [3, "1 / 6"], [4, "2 / 6"], [5, "3 / 6"], [8, "4 / 6"]]} />
            </b>
            <small>{c.figures[0]}</small>
          </span>
          <span className="live-band__figure">
            <b className="live-num">
              <Tick bg={ink} values={[[0, "78%"], [5, "81%"], [8, "83%"]]} />
            </b>
            <small>{c.figures[1]}</small>
          </span>
          <span className="live-band__figure">
            <b className="live-num">
              <Tick bg={ink} values={[[0, "2"], [1, "3"]]} />
            </b>
            <small>{c.figures[2]}</small>
          </span>
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "start" }}>
        <LCard style={{ flex: "3 1 20rem", minInlineSize: 0 }}>
          <small style={{ color: faint }}>{c.route}</small>
          {/* a map keeps its orientation in Arabic */}
          <svg viewBox="0 0 480 250" width="100%" style={{ display: "block", direction: "ltr" }} aria-hidden="true">
            <rect width="480" height="250" style={{ fill: "var(--live-desk)" }} />
            <g style={{ stroke: "#e2e8f0", strokeWidth: 1, fill: "none" }}>
              <path d="M0 60H480M0 130H480M0 200H480M80 0V250M160 0V250M320 0V250M400 0V250" />
            </g>
            {/* the Tigris */}
            <path d="M232 0C200 50 300 90 262 135S214 205 268 250" style={{ fill: "none", stroke: "#bfdbfe", strokeWidth: 16, strokeLinecap: "round" }} />
            {/* the planned route, then each leg drawn as it is walked */}
            <polyline points={stops.map((s) => `${s.x},${s.y}`).join(" ")} style={{ fill: "none", stroke: "#94a3b8", strokeWidth: 2, strokeDasharray: "6 5" }} />
            {stops.slice(1).map((s, i) =>
              s.at < 99 ? (
                <line key={i} data-at={s.at} x1={stops[i].x} y1={stops[i].y} x2={s.x} y2={s.y} style={{ ...still, stroke: ink, strokeWidth: 3 }} />
              ) : null,
            )}
            {stops.map((s, i) => (
              <g key={i}>
                <rect x={s.x - 9} y={s.y - 9} width="18" height="18" style={{ fill: "var(--live-paper)", stroke: faint, strokeWidth: 2 }} />
                {s.at < 99 ? (
                  <g data-at={s.at} style={still}>
                    <rect x={s.x - 9} y={s.y - 9} width="18" height="18" style={{ fill: ink, stroke: ink, strokeWidth: 2 }} />
                    <path d={`M${s.x - 5} ${s.y}l3.5 4 6.5-8`} style={{ fill: "none", stroke: "#fff", strokeWidth: 2.2 }} />
                  </g>
                ) : null}
                <text x={s.x} y={s.y + 27} textAnchor="middle" style={{ fill: ink, fontSize: 15, paintOrder: "stroke", stroke: "var(--live-desk)", strokeWidth: 4 }}>
                  {c.stops[i]}
                </text>
              </g>
            ))}
          </svg>
          <div style={{ display: "grid" }}>
            {c.visits.map((v) => (
              <div
                key={v.at}
                className="live-row"
                data-at={v.at > 0 ? v.at : undefined}
                style={{ gridArea: "1 / 1", padding: "6px 2px", borderBlockEnd: 0 }}
              >
                <LGlyph state={v.state} />
                <span className="live-row__label">{v.text}</span>
              </div>
            ))}
          </div>
        </LCard>

        <div style={{ flex: "2 1 16rem", minInlineSize: 0, display: "grid", gap: 10 }}>
          <LCard style={{ gap: 0, padding: 0 }}>
            <span style={{ display: "flex", justifyContent: "space-between", gap: 8, padding: "10px 12px", borderBlockEnd: "1px solid var(--live-rule)", color: faint }}>
              {c.radar}
              <Tick bg="var(--live-paper)" values={[[0, c.digest[0]], [1, c.digest[1]]]} />
            </span>
            {c.regs.map((r, i) => (
              <div key={r.label} style={{ display: "grid" }} data-cursor-at={i === 3 ? 6 : undefined}>
                <div style={{ gridArea: "1 / 1" }}>
                  <RegRow label={r.label} days={r.from} unit={c.days} />
                </div>
                <div data-at={1} style={{ gridArea: "1 / 1", outline: i === 3 ? undefined : "none" }}>
                  <RegRow label={r.label} days={r.from - 1} unit={c.days} />
                </div>
                {i === 3 ? (
                  <div data-at={7} style={{ gridArea: "1 / 1" }}>
                    <RegRow label={c.renewal} days={r.from - 1} unit={c.days} state="progress" />
                  </div>
                ) : null}
              </div>
            ))}
          </LCard>

          {/* the reminder, as it lands in WhatsApp */}
          <div
            data-at={2}
            style={{
              justifySelf: "end",
              display: "grid",
              gap: 4,
              maxInlineSize: "22rem",
              padding: "8px 10px",
              background: "#dcf8c6",
              color: "#0b141a",
              borderRadius: 8,
              borderStartEndRadius: 0,
              boxShadow: "0 1px 1px rgb(0 0 0 / 0.12)",
            }}
          >
            <small style={{ display: "flex", alignItems: "center", gap: 6, color: "#1f7a4d", fontSize: 10 }}>
              <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
                <path d="M8 1.5a6.5 6.5 0 0 0-5.6 9.8L1.5 14.5l3.3-.9A6.5 6.5 0 1 0 8 1.5Z" style={{ fill: "none", stroke: "#1f7a4d", strokeWidth: 1.4 }} />
              </svg>
              {c.whatsapp}
            </small>
            <span>{c.message}</span>
            <span className="live-num" style={{ justifySelf: "end", fontSize: 10, color: "#53bdeb" }}>
              ✓✓
            </span>
          </div>
        </div>
      </div>
    </LiveScreen>
  )
}
