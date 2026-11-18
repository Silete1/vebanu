import type { Locale } from "@/lib/i18n"

import type { SystemGroup, SystemStatus } from "./systems/types"

/** Labels the story blocks share across every system page. */
export const storyCopy: Record<
  Locale,
  {
    group: Record<SystemGroup, string>
    status: Record<SystemStatus, string>
    chapters: { problem: string; how: string; inside: string; features: string; faq: string }
    forWhom: string
    stack: string
    related: string
    allSystems: string
    talk: string
    whatsapp: string
    ctaTitle: string
    ctaBody: string
    systems: string
    step: string
    live: { kicker: string; title: string; note: string }
  }
> = {
  en: {
    group: { core: "The platform", layer: "On every ANU Brain", industry: "Industry system" },
    status: { live: "Live", demo: "Demo ready", building: "In build" },
    chapters: {
      problem: "The noise",
      how: "How it works",
      inside: "How ANU builds it",
      features: "What it does",
      faq: "Questions",
    },
    forWhom: "For",
    stack: "Built with",
    related: "Told next to it",
    allSystems: "All systems",
    talk: "Book an assessment",
    whatsapp: "Ask on WhatsApp",
    ctaTitle: "See it on your own work.",
    ctaBody: "A short assessment maps how your company runs today and which parts of ANU would hold it. In Arabic or English, in Baghdad or online.",
    systems: "Systems",
    step: "Step",
    live: { kicker: "Live", title: "See it working.", note: "A drawing of the real screens, running on demo data." },
  },
  ar: {
    group: { core: "المنصة", layer: "في كل أنو برين", industry: "نظام قطاعي" },
    status: { live: "يعمل الآن", demo: "جاهز للعرض", building: "قيد البناء" },
    chapters: {
      problem: "الفوضى",
      how: "كيف يعمل",
      inside: "كيف تبنيه أنو",
      features: "ماذا يفعل",
      faq: "أسئلة",
    },
    forWhom: "لمن",
    stack: "مبني بـ",
    related: "يُروى بجانبه",
    allSystems: "كل الأنظمة",
    talk: "احجز تقييماً",
    whatsapp: "اسأل على واتساب",
    ctaTitle: "شاهده على عملك أنت.",
    ctaBody: "تقييم قصير يرسم كيف تعمل شركتك اليوم وأي أجزاء من أنو ستحفظ عملها. بالعربية أو الإنجليزية، في بغداد أو عن بُعد.",
    systems: "الأنظمة",
    step: "الخطوة",
    live: { kicker: "مباشر", title: "شاهده وهو يعمل.", note: "رسم للشاشات الحقيقية، يعمل على بيانات تجريبية." },
  },
}
