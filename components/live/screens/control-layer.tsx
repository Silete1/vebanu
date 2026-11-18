import { LBand, LGlyph, LRow, LSheet } from "@/components/live/kit"
import { LiveScreen } from "@/components/live/live-screen"
import type { Locale } from "@/lib/i18n"

const t = {
  en: {
    label: "The ANU Control Layer on a sales list: the band counts what the search shows, statuses are glyphs, a right-click opens the record's own actions",
    app: "Sales · Quotations",
    band: "Quotations this month",
    figures: [
      { value: "IQD 412.6M", label: "in quotation" },
      { value: "18", label: "due this week" },
      { value: "3", label: "overdue" },
    ],
    rows: [
      ["SO/2026/0412", "Kitchen set, 4.2 m", "done", "IQD 18.4M"],
      ["SO/2026/0413", "Wardrobe, sliding", "due", "IQD 9.1M"],
      ["SO/2026/0414", "Office fit-out, floor 2", "progress", "IQD 64.0M"],
      ["SO/2026/0415", "Hotel rooms, 24 keys", "waiting", "IQD 212.5M"],
      ["SO/2026/0416", "Showroom display", "alarm", "IQD 7.8M"],
    ],
    menu: ["Confirm the quotation", "Send by WhatsApp", "Open in a new tab", "Copy the link"],
    toast: "Quotation SO/2026/0416 confirmed",
  },
  ar: {
    label: "طبقة التحكم من أنو على قائمة مبيعات: الشريط يعدّ ما يظهره البحث، والحالات علامات مربعة، والنقر بالزر الأيمن يفتح إجراءات السجل نفسه",
    app: "المبيعات · عروض الأسعار",
    band: "عروض أسعار هذا الشهر",
    figures: [
      { value: "IQD 412.6M", label: "قيد العرض" },
      { value: "18", label: "مستحقة هذا الأسبوع" },
      { value: "3", label: "متأخرة" },
    ],
    rows: [
      ["SO/2026/0412", "مطبخ، 4.2 م", "done", "IQD 18.4M"],
      ["SO/2026/0413", "خزانة بأبواب منزلقة", "due", "IQD 9.1M"],
      ["SO/2026/0414", "تجهيز مكتب، الطابق 2", "progress", "IQD 64.0M"],
      ["SO/2026/0415", "غرف فندق، 24 غرفة", "waiting", "IQD 212.5M"],
      ["SO/2026/0416", "عرض في صالة البيع", "alarm", "IQD 7.8M"],
    ],
    menu: ["اعتماد عرض السعر", "إرسال عبر واتساب", "فتح في تبويب جديد", "نسخ الرابط"],
    toast: "اعتُمد عرض السعر SO/2026/0416",
  },
} as const

/**
 * Steps: 0 the band, 1–2 its figures, 3–7 the rows arrive, 8 the cursor
 * right-clicks the overdue row, 9 the menu opens, 10 "Confirm" is pressed,
 * 11 the row turns done and a toast says so.
 */
export function Screen({ locale }: { locale: Locale }) {
  const c = t[locale]
  return (
    <LiveScreen label={c.label} title={c.app} steps={12} interval={1100}>
      <LBand title={c.band} at={0} figures={c.figures.map((f, i) => ({ ...f, at: i === 0 ? 0 : i }))} />
      <div className="live-grid" style={{ gap: 0 }}>
        {c.rows.map(([ref, label, state, value], i) => (
          <LRow
            key={ref}
            at={3 + i}
            cursorAt={i === 4 ? 8 : undefined}
            state={state as "done"}
            label={label}
            meta={ref}
            value={value}
          />
        ))}
      </div>
      {/* the overdue row, once confirmed */}
      <div className="live-row" data-at={11} style={{ position: "absolute", insetInline: 14, insetBlockEnd: 14 + 0 }}>
        <LGlyph state="done" />
        <span className="live-row__label">{c.rows[4][1]}</span>
      </div>
      <LSheet only={9} style={{ insetInlineEnd: "18%", insetBlockStart: "58%" }}>
        {c.menu.map((item, i) => (
          <span key={item} data-cursor-at={i === 0 ? 10 : undefined}>
            {item}
          </span>
        ))}
      </LSheet>
      <LSheet only={10} style={{ insetInlineEnd: "18%", insetBlockStart: "58%" }}>
        {c.menu.map((item, i) => (
          <span key={item} className={i === 0 ? "is-now" : undefined}>
            {item}
          </span>
        ))}
      </LSheet>
      <div className="live-toast" data-at={11}>
        <LGlyph state="done" />
        {c.toast}
      </div>
    </LiveScreen>
  )
}
