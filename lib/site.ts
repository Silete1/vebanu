import { defaultLocale, type Locale } from "@/lib/i18n"

export const siteUrl = "https://www.anu.ltd"

export type SiteContent = {
  name: string
  shortName: string
  description: string
  knowsAbout: string[]
}

export const siteContentByLocale: Record<Locale, SiteContent> = {
  en: {
    name: "ANU Software Solutions",
    shortName: "ANU",
    description:
      "ANU redesigns how Iraqi companies run, implements Odoo as ANU Brain, the control layer for operations, finance and stock, and builds complete industry systems: furniture workshops, digital twins, construction, retail, legal and government workflows.",
    knowsAbout: [
      "Odoo ERP implementation",
      "Business process redesign",
      "Inventory and financial control",
      "Furniture design to production software",
      "Operational digital twins",
      "Arabic-first enterprise software",
    ],
  },
  ar: {
    name: "أنو للحلول البرمجية",
    shortName: "أنو",
    description:
      "تعيد أنو تصميم طريقة عمل الشركات العراقية، وتطبّق Odoo باسم أنو برين طبقةً للرقابة على العمليات والمالية والمخزون، وتبني أنظمة قطاعية كاملة: ورش الأثاث، والتوائم الرقمية، والمقاولات، والتجزئة، والشؤون القانونية والحكومية.",
    knowsAbout: [
      "تطبيق نظام Odoo ERP",
      "إعادة تصميم العمليات",
      "الرقابة على المخزون والمالية",
      "برامج تصميم الأثاث وتصنيعه",
      "التوائم الرقمية التشغيلية",
      "أنظمة مؤسسية بالعربية أولاً",
    ],
  },
}

export function getSiteContent(locale: Locale = defaultLocale) {
  return siteContentByLocale[locale]
}
