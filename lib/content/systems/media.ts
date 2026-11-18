import type { Locale } from "@/lib/i18n"

/**
 * Real material from ANU's own systems (Forgejo anu-web-assets, client: no),
 * encoded for the web under public/media/real/<slug>/. Stills are AVIF/WebP at
 * 640 and 1280; clips are 8 s, 960×600, MP4 + WebM + a JPG first frame.
 */
export type RealStill = { file: string; alt: Record<Locale, string>; localized?: boolean }
export type RealClip = { file: string; alt: Record<Locale, string> }

export const realMedia: Record<string, { stills: RealStill[]; clips: RealClip[] }> = {
  workshops: {
    clips: [
      { file: "kitchen", alt: { en: "The Workshops designer turning a kitchen in 3D", ar: "مصمم أنو للورش يدير مطبخاً بالأبعاد الثلاثة" } },
      { file: "bedroom", alt: { en: "The Workshops designer turning a bedroom in 3D", ar: "مصمم أنو للورش يدير غرفة نوم بالأبعاد الثلاثة" } },
    ],
    stills: [
      { file: "designer", localized: true, alt: { en: "The designer's Present view, with the design's facts beside it", ar: "واجهة العرض في المصمم مع تفاصيل التصميم بجانبها" } },
      { file: "wall-evening", alt: { en: "A fluted bed wall lit for the evening, rendered by the designer", ar: "جدار سرير مضلّع بإضاءة مسائية، من رسم المصمم" } },
      { file: "wall-corner", alt: { en: "The same wall from the corner", ar: "الجدار نفسه من الزاوية" } },
      { file: "wall-niche", alt: { en: "The lit niche of the bed wall", ar: "التجويف المضاء في جدار السرير" } },
      { file: "wall-ceiling", alt: { en: "The ceiling light line above the wall", ar: "خط الإضاءة في السقف فوق الجدار" } },
    ],
  },
}
