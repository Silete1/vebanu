import type { Locale } from "@/lib/i18n"

/**
 * The stars of Anu. MUL.APIN, the Babylonian star list (compiled c. 1000 BCE),
 * names the stars in "the Way of Anu", the middle band of the sky. Where one of
 * them honestly fits a system, the system carries its name. Readings after
 * Hunger & Steele (2018); the lines on the site are drawn by ANU, not copied.
 */
export type SystemStar = {
  /** transliteration as written in MUL.APIN */
  sign: string
  name: Record<Locale, string>
  /** the same stars in today's sky */
  modern: Record<Locale, string>
}

export const systemStars: Record<string, SystemStar> = {
  brain: { sign: "AN", name: { en: "the sky", ar: "السماء" }, modern: { en: "the whole sky", ar: "السماء كلها" } },
  "control-layer": { sign: "AGA ANIM", name: { en: "the crown of Anu", ar: "تاج آنو" }, modern: { en: "Hyades, Taurus", ar: "القلائص، الثور" } },
  support: { sign: "MUL.MUL", name: { en: "the Stars", ar: "النجوم" }, modern: { en: "Pleiades", ar: "الثريا" } },
  workshops: { sign: "ŠE.ER'U", name: { en: "the Furrow", ar: "الأخدود" }, modern: { en: "Spica, Virgo", ar: "السماك الأعزل" } },
  construction: { sign: "IKU", name: { en: "the Field", ar: "الحقل" }, modern: { en: "Square of Pegasus", ar: "مربع الفرس الأعظم" } },
  qalib: { sign: "GU₄.AN.NA", name: { en: "the Bull of Heaven", ar: "ثور السماء" }, modern: { en: "Taurus", ar: "الثور" } },
  twins: { sign: "GAG.SI.SÁ", name: { en: "the Arrow", ar: "السهم" }, modern: { en: "Sirius", ar: "الشعرى اليمانية" } },
  legal: { sign: "ZIBĀNĪTU", name: { en: "the Scales", ar: "الميزان" }, modern: { en: "Libra", ar: "الميزان" } },
  "government-hr": { sign: "LÚ.ḪUN.GÁ", name: { en: "the Hired Worker", ar: "الأجير" }, modern: { en: "Aries", ar: "الحمل" } },
  "field-operations": {
    sign: "SIPA.ZI.AN.NA",
    name: { en: "the True Shepherd of Anu", ar: "راعي آنو الأمين" },
    modern: { en: "Orion", ar: "الجبّار" },
  },
  "retail-finance": { sign: "UDU.IDIM", name: { en: "the wandering stars", ar: "الكواكب السيّارة" }, modern: { en: "the planets", ar: "الكواكب" } },
}
