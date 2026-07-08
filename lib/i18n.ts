export const locales = ["en", "ar"] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "en"

export const localeMeta: Record<
  Locale,
  {
    code: Locale
    label: string
    nativeLabel: string
    dir: "ltr" | "rtl"
  }
> = {
  en: {
    code: "en",
    label: "English",
    nativeLabel: "English",
    dir: "ltr",
  },
  ar: {
    code: "ar",
    label: "Arabic",
    nativeLabel: "العربية",
    dir: "rtl",
  },
}

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

export function getLocaleDirection(locale: Locale) {
  return localeMeta[locale].dir
}

export function getLocaleAttributes(locale: Locale) {
  return {
    lang: locale,
    dir: getLocaleDirection(locale),
  } as const
}

export function isRtlLocale(locale: Locale) {
  return getLocaleDirection(locale) === "rtl"
}
