import type { Locale } from "@/lib/i18n"

/** Copy for the frame every page shares: the band at the top, the menu, the footer. */

export type NavKey = "systems" | "services" | "method" | "industries" | "insights" | "about"

export type ShellCopy = {
  skip: string
  home: string
  nav: Record<NavKey, string>
  navLabel: string
  menu: string
  close: string
  assessment: string
  language: { name: string; label: string }
  chapters: string
  footer: {
    title: string
    body: string
    explore: string
    systems: string
    contact: string
    follow: string
    partner: string
    address: string
    rights: string
    machine: string
  }
}

export const shellCopy: Record<Locale, ShellCopy> = {
  en: {
    skip: "Skip to content",
    home: "ANU Software Solutions, home",
    nav: {
      systems: "Systems",
      services: "Services",
      method: "Method",
      industries: "Industries",
      insights: "Field notes",
      about: "About",
    },
    navLabel: "Main",
    menu: "Menu",
    close: "Close menu",
    assessment: "Book an assessment",
    language: { name: "العربية", label: "اقرأ الموقع بالعربية" },
    chapters: "On this page",
    footer: {
      title: "Redesign how the company runs. Then make the system hold it.",
      body: "ANU maps the work, implements Odoo as the control layer, and builds the products a business is missing, in Arabic and English, from Baghdad.",
      explore: "Explore",
      systems: "Systems",
      contact: "Contact",
      follow: "Follow",
      partner: "Odoo partner profile",
      address: "Baghdad, Iraq",
      rights: "© 2026 ANU Software Solutions",
      machine: "For AI readers: llms.txt",
    },
  },
  ar: {
    skip: "انتقل إلى المحتوى",
    home: "أنو للحلول البرمجية، الصفحة الرئيسية",
    nav: {
      systems: "الأنظمة",
      services: "الخدمات",
      method: "المنهج",
      industries: "القطاعات",
      insights: "ملاحظات ميدانية",
      about: "من نحن",
    },
    navLabel: "الرئيسية",
    menu: "القائمة",
    close: "إغلاق القائمة",
    assessment: "احجز تقييماً",
    language: { name: "English", label: "Read the site in English" },
    chapters: "في هذه الصفحة",
    footer: {
      title: "أعد تصميم طريقة عمل الشركة، ثم اجعل النظام يحفظها.",
      body: "ترسم أنو خريطة العمل، وتطبّق Odoo طبقةً للرقابة، وتبني المنتجات التي تنقص الشركة، بالعربية والإنجليزية، من بغداد.",
      explore: "استكشف",
      systems: "الأنظمة",
      contact: "تواصل",
      follow: "تابعنا",
      partner: "صفحة شريك Odoo",
      address: "بغداد، العراق",
      rights: "© 2026 أنو للحلول البرمجية",
      machine: "لقرّاء الذكاء الاصطناعي: llms.txt",
    },
  },
}

export const navOrder: { key: NavKey; path: string }[] = [
  { key: "systems", path: "/systems" },
  { key: "services", path: "/services" },
  { key: "method", path: "/method" },
  { key: "industries", path: "/industries" },
  { key: "insights", path: "/insights" },
  { key: "about", path: "/about" },
]
