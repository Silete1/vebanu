import { defaultLocale, type Locale } from "@/lib/i18n"

export const siteUrl = "https://www.anu.ltd"

export const siteContentByLocale: Record<
  Locale,
  {
    name: string
    shortName: string
    description: string
    footerNote: string
  }
> = {
  en: {
    name: "ANU Software Solutions",
    shortName: "ANU",
    description:
      "ANU Software Solutions redesigns how companies run, then implements Odoo as the control platform for operations, finance, inventory, sales, and reporting.",
    footerNote:
      "© 2026 ANU Software Solutions. All rights reserved.",
  },
  ar: {
    name: "أنو للحلول البرمجية",
    shortName: "أنو",
    description:
      "تعيد أنو للحلول البرمجية تصميم طريقة عمل الشركات، ثم تطبّق Odoo كمنصة سيطرة للعمليات، المالية، المخزون، المبيعات، والتقارير.",
    footerNote: "© 2026 أنو للحلول البرمجية. جميع الحقوق محفوظة.",
  },
}

export const siteConfig = siteContentByLocale[defaultLocale]

export function getSiteContent(locale: Locale = defaultLocale) {
  return siteContentByLocale[locale]
}
