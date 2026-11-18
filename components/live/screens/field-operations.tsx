import type { CSSProperties } from "react"

import { LBand, LButton, LCard, LGlyph, type LiveState } from "@/components/live/kit"
import { LiveScreen } from "@/components/live/live-screen"
import type { Locale } from "@/lib/i18n"

const t = {
  en: {
    label:
      "ANU Field Operations on an operator's Excel file: every row is checked at once, problems are flagged with their reasons, each problem is fixed once for every matching row, and the file is exported in the standard exchange format",
    app: "Field operations · Field reports",
    band: "Operator file check",
    figures: [
      { value: "600", label: "rows read" },
      { value: "3", label: "problems found" },
    ],
    file: "field_reports_oct.xlsx",
    columns: ["#", "Location", "Date", "Lat, lon"],
    rows: [
      ["Nasiriyah", "04/10/2026", "31.05,46.26"],
      ["Samawa", "05/10/2026", "31.31,45.28"],
      ["Diwaniyah", "06/10/2026", "31.99,44.92"],
      ["Kut", "10/14/2026", "32.51,45.82"],
      ["Samawa", "15/10/2026", "31.32,45.29"],
      ["Amarah", "16/10/2026", "31.84,47.14"],
    ],
    fixedLocation: "Samawah",
    fixedDate: "14/10/2026",
    reasons: { location: "Not in the national list", date: "No month 14" },
    problems: "Problems, by column",
    location: { title: "Location", count: "2 rows", body: "“Samawa” is not in the national list. Nearest known by coordinates:" },
    nearest: [
      ["Samawah", "0.3", "km"],
      ["Al-Khidr", "31", "km"],
    ],
    fixRows: "Fix 2 rows",
    remember: "Remember for future files",
    date: { title: "Date", count: "1 row", body: "“10/14/2026”: day and month are swapped." },
    swap: "Swap day and month",
    fixed: "Fixed",
    left: "Problems left",
    export: "Export",
    exportName: "reports_2026-10.zip",
    exportMeta: "Standard exchange format · 600 reports · attachments · manifest",
    ready: "Export ready",
  },
  ar: {
    label:
      "نظام أنو للعمليات الميدانية على ملف Excel من منظمة ميدانية: تُدقَّق الأسطر كلها دفعة واحدة، وتُعلَّم المشكلات مع أسبابها، وتُصلَح كل مشكلة مرة واحدة لكل الأسطر المطابقة، ثم يُصدَّر الملف بصيغة التبادل القياسية",
    app: "العمليات الميدانية · التقارير الميدانية",
    band: "تدقيق ملف المنظمة",
    figures: [
      { value: "600", label: "سطر مقروء" },
      { value: "3", label: "مشكلات وُجدت" },
    ],
    file: "field_reports_oct.xlsx",
    columns: ["#", "الموقع", "التاريخ", "الإحداثيات"],
    rows: [
      ["الناصرية", "04/10/2026", "31.05,46.26"],
      ["السماوه", "05/10/2026", "31.31,45.28"],
      ["الديوانية", "06/10/2026", "31.99,44.92"],
      ["الكوت", "10/14/2026", "32.51,45.82"],
      ["السماوه", "15/10/2026", "31.32,45.29"],
      ["العمارة", "16/10/2026", "31.84,47.14"],
    ],
    fixedLocation: "السماوة",
    fixedDate: "14/10/2026",
    reasons: { location: "غير موجود في القائمة الوطنية", date: "لا يوجد شهر 14" },
    problems: "المشكلات حسب العمود",
    location: { title: "الموقع", count: "سطران", body: "«السماوه» غير موجودة في القائمة الوطنية. الأقرب حسب الإحداثيات:" },
    nearest: [
      ["السماوة", "0.3", "كم"],
      ["الخضر", "31", "كم"],
    ],
    fixRows: "إصلاح السطرين",
    remember: "تذكّر الإصلاح للملفات القادمة",
    date: { title: "التاريخ", count: "سطر واحد", body: "«10/14/2026»: اليوم والشهر متبادلان." },
    swap: "تبديل اليوم والشهر",
    fixed: "أُصلح",
    left: "المشكلات المتبقية",
    export: "تصدير",
    exportName: "reports_2026-10.zip",
    exportMeta: "صيغة التبادل القياسية · 600 تقرير · المرفقات · قائمة المحتويات",
    ready: "التصدير جاهز",
  },
} as const

/** Per row: the step it arrives, which cell is wrong (if any), and the step it is fixed. */
const plan: { at: number; wrong?: "location" | "date"; fixed?: number }[] = [
  { at: 1 },
  { at: 1, wrong: "location", fixed: 7 },
  { at: 1 },
  { at: 2, wrong: "date", fixed: 9 },
  { at: 2, wrong: "location", fixed: 7 },
  { at: 2 },
]

// row number, location, date (10 mono characters), coordinates (11 at 0.85em), status
const sheet = "1.9em minmax(0, 1fr) calc(6.7em + 12px) calc(6.4em + 12px) 20px"
const cell: CSSProperties = { position: "relative", padding: "6px", borderInlineStart: "1px solid var(--live-rule)", minInlineSize: 0, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }
const cover: CSSProperties = { position: "absolute", inset: 0 }
const head: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, fontSize: 11, color: "var(--live-faint)" }

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

/** The file being checked, as its own little chip. */
function FileChip({ name, meta, kind }: { name: string; meta?: string; kind: string }) {
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 10, minInlineSize: 0 }}>
      <span
        className="live-num"
        style={{ flex: "none", display: "grid", placeItems: "center", inlineSize: 30, blockSize: 36, background: "var(--live-ink)", color: "#93c5fd", fontSize: 9, borderBlockEnd: "3px solid var(--live-signal)" }}
      >
        {kind}
      </span>
      <span style={{ display: "grid", minInlineSize: 0 }}>
        <b className="live-num" style={{ fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {name}
        </b>
        {meta ? <small style={{ fontSize: 11, color: "var(--live-faint)" }}>{meta}</small> : null}
      </span>
    </span>
  )
}

/**
 * Steps: 0 the file is read, 1–2 its rows fill the sheet, 3 one pass flags
 * three problems in red with their reasons, 4 they are grouped by column,
 * 5 the cursor picks the nearest known location, 6 it is chosen and one fix
 * is applied to both rows, 7 both rows turn done, 8 the cursor swaps day and month, 9 the
 * last row turns done and the count falls to zero, 10 the cursor exports,
 * 11 the archive in the standard format is ready.
 */
export function Screen({ locale }: { locale: Locale }) {
  const c = t[locale]
  return (
    <LiveScreen label={c.label} title={c.app} steps={12} interval={1050}>
      <LBand title={c.band} at={0} figures={c.figures.map((f, i) => ({ ...f, at: i === 0 ? 0 : 3 }))} />

      <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 19rem), 1fr))", alignItems: "start" }}>
        {/* the sheet, as the operator sent it */}
        <div style={{ display: "grid", gap: 8, minInlineSize: 0 }}>
          <FileChip name={c.file} kind="XLSX" />
          <div style={{ background: "var(--live-paper)", border: "1px solid var(--live-rule)", borderInlineStart: 0 }}>
            <div style={{ display: "grid", gridTemplateColumns: sheet, background: "#f1f5f9", color: "var(--live-soft)", fontSize: 11, borderBlockEnd: "1px solid #cbd5e1" }}>
              {c.columns.map((col) => (
                <span key={col} style={cell}>
                  {col}
                </span>
              ))}
              <span style={cell} />
            </div>
            {c.rows.map(([place, date, coords], i) => {
              const p = plan[i]!
              const bad = p.wrong
              return (
                <div key={i} data-at={p.at} style={{ outline: "none", display: "grid", gridTemplateColumns: sheet, alignItems: "stretch", borderBlockEnd: "1px solid var(--live-rule)" }}>
                  <span className="live-num" style={{ ...cell, background: "#f8fafc", color: "var(--live-faint)", fontSize: 11 }}>
                    {i + 2}
                  </span>
                  <span style={cell}>
                    {place}
                    {bad === "location" ? <BadCell at={3} fixedAt={p.fixed!} value={place} reason={c.reasons.location} fix={c.fixedLocation} /> : null}
                  </span>
                  <span className="live-num" style={cell}>
                    {date}
                    {bad === "date" ? <BadCell at={3} fixedAt={p.fixed!} value={date} reason={c.reasons.date} fix={c.fixedDate} num /> : null}
                  </span>
                  <span className="live-num" style={{ ...cell, fontSize: "0.85em", color: "var(--live-soft)" }}>
                    {coords}
                  </span>
                  <span style={{ ...cell, display: "grid", placeItems: "center", padding: 0 }}>
                    {bad ? (
                      <span style={{ position: "relative", display: "inline-flex" }}>
                        <Flip from="neutral" to="alarm" at={3} />
                        <span data-at={p.fixed} style={{ ...cover, display: "inline-flex" }}>
                          <LGlyph state="done" />
                        </span>
                      </span>
                    ) : (
                      <Flip from="neutral" to="done" at={3} />
                    )}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* every problem at once, grouped by column, each fixed once */}
        <div style={{ display: "grid", gap: 8, minInlineSize: 0 }}>
          <span data-at={4} style={head}>
            {c.problems}
          </span>
          <LCard at={4}>
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Flip from="alarm" to="done" at={7} />
              <b style={{ fontWeight: 500 }}>{c.location.title}</b>
              <small style={{ color: "var(--live-faint)" }}>{c.location.count}</small>
              <small data-at={7} style={{ marginInlineStart: "auto", color: "var(--live-signal)" }}>
                {c.fixed}
              </small>
            </span>
            <small style={{ fontSize: 11, color: "var(--live-soft)" }}>{c.location.body}</small>
            <span style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {c.nearest.map(([name, dist, unit], i) => (
                <span
                  key={name}
                  data-cursor-at={i === 0 ? 5 : undefined}
                  style={{ position: "relative", display: "inline-flex", gap: 6, padding: "4px 8px", border: "1px solid #cbd5e1", background: "var(--live-paper)" }}
                >
                  {name}
                  <span style={{ color: "var(--live-faint)" }}>
                    <span className="live-num">{dist}</span> {unit}
                  </span>
                  {i === 0 ? (
                    <span data-at={6} style={{ ...cover, inset: -1, display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 8px", background: "var(--live-signal)", color: "#fff" }}>
                      {name}
                      <span>
                        <span className="live-num">{dist}</span> {unit}
                      </span>
                    </span>
                  ) : null}
                </span>
              ))}
            </span>
            <span style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10 }}>
              <LButton cursorAt={6}>{c.fixRows}</LButton>
              <small style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--live-soft)" }}>
                <LGlyph state="done" />
                {c.remember}
              </small>
            </span>
          </LCard>
          <LCard at={4}>
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Flip from="alarm" to="done" at={9} />
              <b style={{ fontWeight: 500 }}>{c.date.title}</b>
              <small style={{ color: "var(--live-faint)" }}>{c.date.count}</small>
              <small data-at={9} style={{ marginInlineStart: "auto", color: "var(--live-signal)" }}>
                {c.fixed}
              </small>
            </span>
            <small style={{ fontSize: 11, color: "var(--live-soft)" }}>{c.date.body}</small>
            <span>
              <LButton ghost cursorAt={8}>
                {c.swap}
              </LButton>
            </span>
          </LCard>
          <span data-at={9} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <LGlyph state="done" />
              {c.left}: <span className="live-num">0</span>
            </span>
            <LButton cursorAt={10}>{c.export}</LButton>
          </span>
          <LCard at={11} style={{ borderInlineStart: "3px solid var(--live-signal)" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--live-signal)" }}>
              <LGlyph state="done" />
              {c.ready}
            </span>
            <FileChip name={c.exportName} meta={c.exportMeta} kind="ZIP" />
          </LCard>
        </div>
      </div>
    </LiveScreen>
  )
}

/** A wrong cell: red with its reason from step `at`, corrected in place at `fixedAt`. */
function BadCell({ at, fixedAt, value, reason, fix, num = false }: { at: number; fixedAt: number; value: string; reason: string; fix: string; num?: boolean }) {
  const fill: CSSProperties = { ...cover, display: "grid", alignContent: "center", padding: "0 6px", overflow: "hidden" }
  return (
    <>
      <span data-at={at} style={{ ...fill, background: "#fef2f2", color: "var(--live-danger)", boxShadow: "inset 0 0 0 1px rgb(200 30 30 / 0.45)" }}>
        <span className={num ? "live-num" : undefined} style={{ lineHeight: 1.1 }}>
          {value}
        </span>
        <small style={{ fontSize: 9, lineHeight: 1.1, overflow: "hidden", textOverflow: "ellipsis" }}>{reason}</small>
      </span>
      <span data-at={fixedAt} style={{ ...fill, background: "#eff6ff", color: "var(--live-ink)" }}>
        <span className={num ? "live-num" : undefined}>{fix}</span>
      </span>
    </>
  )
}
