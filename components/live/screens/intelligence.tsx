import type { CSSProperties } from "react"

import { LBand, LButton, LGlyph, LSheet } from "@/components/live/kit"
import { LiveScreen } from "@/components/live/live-screen"
import type { Locale } from "@/lib/i18n"

const t = {
  en: {
    label:
      "ANU Intelligence researching Iraqi companies: evidence from registers, exhibitor lists and job channels attaches to each account, matching catches a company already in the CRM, each account is graded A, B or C, and the best one is handed to sales, ready for outreach",
    app: "CRM · Prospecting",
    band: "Hotels, clinics and contractors",
    figures: [
      { value: "15", label: "sources", at: 0 },
      { value: "212", label: "found", at: 1 },
      { value: "38", label: "new this week", at: 1 },
    ],
    search: "Saved search · 4 cities · re-runs weekly, new results only",
    research: "Research",
    accounts: "4 accounts",
    ready: "Ready for outreach",
    companies: [
      ["Dijla Hospitality Group", "Baghdad · hotels", "A"],
      ["Shatt Al-Arab Contracting", "Basra · fit-out contractor", "B"],
      ["Al-Waha Medical Centres", "Najaf · clinics", "C"],
      ["Zagros Trading Co.", "Erbil · distributor", ""],
    ],
    evidence: [
      ["Company register", "Exhibitor list 2026", "Job ad: procurement officer", "Map: 2 sites"],
      ["Contractors' union roll", "Tender notice, Oct"],
      ["Chamber of commerce", "Social page"],
      [],
    ],
    match: "In your CRM as «زاغروس للتجارة» · not added twice",
    empty: "Accounts handed to sales land here",
    why: "Why call now",
    reasons: ["Second hotel opening in 2027 · exhibitor list", "Hiring a procurement officer · job ad, 12 Nov"],
    factors: "6 factors · score 84",
    hand: "Hand to sales",
    handed: "Handed to sales · lead L-0217",
    leadMeta: "Hotels · Baghdad · owner: Sales, Baghdad",
    playbook: ["Sector card: hotels", "3 likely pains", "4 discovery questions"],
    chat: "WhatsApp",
    toast: "Lead L-0217 is ready. A person writes and sends.",
  },
  ar: {
    label:
      "أنو لذكاء السوق يبحث في شركات عراقية: أدلة من سجلات الشركات وقوائم العارضين وقنوات الوظائف تُرفق بكل حساب، والمطابقة تكشف شركة موجودة أصلاً في نظام العملاء، ويُصنَّف كل حساب A أو B أو C، ثم يُسلَّم أفضلها إلى المبيعات جاهزاً للتواصل",
    app: "إدارة العملاء · التنقيب",
    band: "فنادق وعيادات ومقاولون",
    figures: [
      { value: "15", label: "مصدراً", at: 0 },
      { value: "212", label: "نتيجة", at: 1 },
      { value: "38", label: "جديدة هذا الأسبوع", at: 1 },
    ],
    search: "بحث محفوظ · 4 مدن · يُعاد أسبوعياً بالنتائج الجديدة فقط",
    research: "قيد البحث",
    accounts: "4 حسابات",
    ready: "جاهزة للتواصل",
    companies: [
      ["مجموعة دجلة للضيافة", "بغداد · فنادق", "A"],
      ["شط العرب للمقاولات", "البصرة · مقاول تجهيز داخلي", "B"],
      ["مراكز الواحة الطبية", "النجف · عيادات", "C"],
      ["زاغروس للتجارة", "أربيل · موزّع", ""],
    ],
    evidence: [
      ["سجل الشركات", "قائمة العارضين 2026", "إعلان وظيفة: مسؤول مشتريات", "الخريطة: موقعان"],
      ["سجل نقابة المقاولين", "إعلان مناقصة، تشرين الأول"],
      ["غرفة التجارة", "صفحة على مواقع التواصل"],
      [],
    ],
    match: "في نظام العملاء باسم Zagros Trading LLC · لم تُضف مرتين",
    empty: "تصل هنا الحسابات المسلّمة إلى المبيعات",
    why: "لماذا الاتصال الآن",
    reasons: ["فندق ثانٍ يُفتتح في 2027 · قائمة العارضين", "توظيف مسؤول مشتريات · إعلان وظيفة، 12 تشرين الثاني"],
    factors: "6 عوامل · الدرجة 84",
    hand: "سلّم إلى المبيعات",
    handed: "سُلّمت إلى المبيعات · الفرصة L-0217",
    leadMeta: "فنادق · بغداد · المسؤول: مبيعات بغداد",
    playbook: ["بطاقة القطاع: الفنادق", "3 مشكلات محتملة", "4 أسئلة استكشافية"],
    chat: "WhatsApp",
    toast: "الفرصة L-0217 جاهزة، ويكتب الرسالة ويرسلها إنسان.",
  },
} as const

const ink = "#090b11"
const signal = "#2563eb"
const cover: CSSProperties = { position: "absolute", inset: 0 }
const still: CSSProperties = { outline: "none" }
const chip: CSSProperties = { padding: "1px 6px", border: "1px solid #bfdbfe", background: "#eff6ff", color: "#1e3a8a", fontSize: 10.5, whiteSpace: "nowrap" }

/** A grade square: A solid, B outlined, C faint; an empty dashed square until graded. */
function Grade({ letter, at, cursorAt }: { letter: string; at?: number; cursorAt?: number }) {
  const look: Record<string, CSSProperties> = {
    A: { background: signal, color: "#fff", border: `1.5px solid ${signal}` },
    B: { background: "#fff", color: signal, border: `1.5px solid ${signal}` },
    C: { background: "#fff", color: "var(--live-faint)", border: "1.5px solid #94a3b8" },
  }
  return (
    <span data-cursor-at={cursorAt} style={{ position: "relative", flex: "none", inlineSize: 24, blockSize: 24, border: "1.5px dashed #cbd5e1" }}>
      {letter ? (
        <b className="live-num" data-at={at} style={{ ...cover, ...still, ...look[letter], inset: -1.5, display: "grid", placeItems: "center", fontSize: 13, fontWeight: 600 }}>
          {letter}
        </b>
      ) : null}
    </span>
  )
}

/**
 * Steps: 0 the saved search with its figures and the two columns; 1–2 four
 * companies arrive, being researched; 3–4 evidence attaches to each, source
 * by source; 5 matching finds one is already a customer; 6 each account is
 * graded A, B or C; 7 the cursor opens the A account; 8 its profile says why
 * to call now, the six factors, and the cursor hands it to sales; 9 it moves
 * to Ready for outreach; 10 the playbook lands in the lead; 11 a toast says
 * it is ready, and that a person sends.
 */
export function Screen({ locale }: { locale: Locale }) {
  const c = t[locale]
  const rowAt = [1, 1, 2, 2]
  const chipsAt = [3, 4, 4, 5]
  return (
    <LiveScreen label={c.label} title={c.app} steps={12} interval={1200}>
      <LBand title={c.band} at={0} figures={c.figures.map((f) => ({ ...f }))} />
      <span style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--live-soft)", fontSize: 11.5 }}>
        <LGlyph state="waiting" />
        {c.search}
      </span>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "start" }}>
        {/* research: accounts with their evidence and grade */}
        <div style={{ flex: "2 1 22rem", minInlineSize: 0, display: "grid", border: "1px solid var(--live-rule)" }}>
          <span style={{ display: "flex", justifyContent: "space-between", gap: 8, padding: "8px 12px", background: "var(--live-paper)", borderBlockEnd: "1px solid var(--live-rule)" }}>
            <b style={{ fontWeight: 500 }}>{c.research}</b>
            <small style={{ color: "var(--live-faint)" }}>{c.accounts}</small>
          </span>
          {c.companies.map(([name, meta, grade], i) => {
            const evidence = c.evidence[i]
            const matched = !grade
            return (
              <div key={name} className="live-row" data-at={rowAt[i]} style={{ position: "relative", alignItems: "start" }}>
                <span style={{ position: "relative", display: "inline-flex", marginBlockStart: 4 }}>
                  <LGlyph state="progress" />
                  <span data-at={matched ? 5 : 6} style={{ ...cover, ...still, display: "inline-flex", background: "var(--live-paper)" }}>
                    <LGlyph state={matched ? "neutral" : "done"} />
                  </span>
                </span>
                <span className="live-row__label" style={{ gap: 4, opacity: matched ? 0.92 : 1 }}>
                  <span>
                    {name}
                    <small style={{ display: "block" }}>{meta}</small>
                  </span>
                  <span style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {matched ? (
                      <small data-at={chipsAt[i]} style={{ ...still, ...chip, whiteSpace: "normal", border: "1px dashed #94a3b8", background: "var(--live-desk)", color: "var(--live-soft)" }}>
                        {c.match}
                      </small>
                    ) : (
                      evidence.map((source) => (
                        <small key={source} data-at={chipsAt[i]} style={{ ...still, ...chip }}>
                          {source}
                        </small>
                      ))
                    )}
                  </span>
                </span>
                {matched ? null : <Grade letter={grade} at={6} cursorAt={i === 0 ? 7 : undefined} />}
                {i === 0 ? (
                  <span className="live-row" data-at={9} style={{ ...cover, ...still, alignItems: "center", background: "#f8fafc" }}>
                    <LGlyph state="done" />
                    <span className="live-row__label" style={{ color: "var(--live-soft)" }}>
                      {name}
                      <small style={{ color: signal }}>{c.handed}</small>
                    </span>
                    <Grade letter="A" />
                  </span>
                ) : null}
              </div>
            )
          })}
        </div>

        {/* ready accounts, with the playbook inside the lead */}
        <div style={{ flex: "1 1 14rem", minInlineSize: 0, display: "grid", gap: 8 }}>
          <span style={{ display: "flex", justifyContent: "space-between", gap: 8, padding: "8px 12px", background: ink, color: "#f8fafc", borderBlockEnd: `3px solid ${signal}` }}>
            <b style={{ fontWeight: 500 }}>{c.ready}</b>
            <span style={{ position: "relative" }}>
              <span className="live-num" style={{ color: "#93c5fd" }}>
                0
              </span>
              <span className="live-num" data-at={9} style={{ ...cover, ...still, color: "#93c5fd", background: ink }}>
                1
              </span>
            </span>
          </span>
          <div style={{ position: "relative", display: "grid" }}>
            <span style={{ ...cover, display: "grid", placeItems: "center", padding: 12, border: "1px dashed #cbd5e1", color: "var(--live-faint)", fontSize: 11, textAlign: "center" }}>
              {c.empty}
            </span>
            <div className="live-card" data-at={9} style={{ ...still, position: "relative", borderInlineStart: `3px solid ${signal}`, boxShadow: "0 14px 30px -18px rgb(37 99 235 / 0.6)" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <LGlyph state="due" />
                <span className="live-row__label">
                  {c.companies[0][0]}
                  <small>{c.leadMeta}</small>
                </span>
                <Grade letter="A" />
              </span>
              <span data-at={10} style={{ ...still, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 4 }}>
                {c.playbook.map((item) => (
                  <small key={item} style={chip}>
                    {item}
                  </small>
                ))}
                <span style={{ marginInlineStart: "auto" }}>
                  <LButton ghost>{c.chat}</LButton>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* the A account's profile */}
      <LSheet only={8} style={{ ...still, insetInlineEnd: 14, insetBlockStart: "30%", inlineSize: "min(17rem, calc(100% - 28px))" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <b style={{ fontWeight: 500 }}>{c.companies[0][0]}</b>
          <b className="live-num" style={{ marginInlineStart: "auto", padding: "0 6px", background: signal, color: "#fff" }}>
            A
          </b>
        </span>
        <small style={{ color: "#93c5fd" }}>{c.why}</small>
        {c.reasons.map((reason) => (
          <span key={reason} style={{ display: "flex", gap: 8, color: "#e2e8f0" }}>
            <span style={{ color: "#93c5fd" }}>›</span>
            {reason}
          </span>
        ))}
        <span>
          <span className="live-bars" data-at={8} style={{ ...still, blockSize: 40 }}>
            {[92, 78, 86, 70, 64, 90].map((v, i) => (
              <i key={i} style={{ "--v": v, "--i": i } as CSSProperties} />
            ))}
          </span>
        </span>
        <small style={{ color: "#94a3b8" }}>{c.factors}</small>
        <span style={{ display: "flex", justifyContent: "end" }}>
          <LButton cursorAt={8}>{c.hand}</LButton>
        </span>
      </LSheet>

      <div className="live-toast" data-at={11}>
        <LGlyph state="done" />
        {c.toast}
      </div>
    </LiveScreen>
  )
}
