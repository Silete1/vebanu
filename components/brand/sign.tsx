import { cn } from "@/lib/utils"

/** The cuneiform signs ANU uses, with their readings; never as body text, never invented. */
export const signs = {
  AN: { char: "𒀭", reading: { en: "AN, sky", ar: "آن، السماء" } },
  MUL: { char: "𒀯", reading: { en: "MUL, star", ar: "مُل، نجم" } },
  KI: { char: "𒆠", reading: { en: "KI, earth", ar: "كي، الأرض" } },
  ŠE: { char: "𒊺", reading: { en: "ŠE, barley", ar: "شي، الشعير" } },
  DIŠ: { char: "𒁹", reading: { en: "DIŠ, one", ar: "دِش، واحد" } },
  U: { char: "𒌋", reading: { en: "U, ten", ar: "أُو، عشرة" } },
  GEŠ: { char: "𒐕", reading: { en: "sixty", ar: "ستون" } },
} as const

export type SignName = keyof typeof signs

/** One sign, left to right inside any line, its reading spoken and shown on hover. */
export function Sign({ name, locale, className }: { name: SignName; locale: "en" | "ar"; className?: string }) {
  const sign = signs[name]
  return (
    <span lang="sux-Xsux" dir="ltr" className={cn("anu-sign", className)} title={sign.reading[locale]} aria-label={sign.reading[locale]} role="img">
      {sign.char}
    </span>
  )
}
