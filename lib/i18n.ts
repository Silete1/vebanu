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
    htmlLang: string
    hrefLang: string
    ogLocale: string
  }
> = {
  en: {
    code: "en",
    label: "English",
    nativeLabel: "English",
    dir: "ltr",
    htmlLang: "en-IQ",
    hrefLang: "en-IQ",
    ogLocale: "en_IQ",
  },
  ar: {
    code: "ar",
    label: "Arabic",
    nativeLabel: "العربية",
    dir: "rtl",
    htmlLang: "ar-IQ",
    hrefLang: "ar-IQ",
    ogLocale: "ar_IQ",
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
    lang: localeMeta[locale].htmlLang,
    dir: getLocaleDirection(locale),
  } as const
}

export function isRtlLocale(locale: Locale) {
  return getLocaleDirection(locale) === "rtl"
}

export function localizedPath(locale: Locale, path = "/") {
  if (path === "/") return `/${locale}`
  if (path.startsWith("/#")) return `/${locale}${path.slice(1)}`
  return `/${locale}${path.startsWith("/") ? path : `/${path}`}`
}

export function localizedAlternates(path = "/") {
  return {
    "en-IQ": localizedPath("en", path),
    "ar-IQ": localizedPath("ar", path),
    "x-default": localizedPath(defaultLocale, path),
  }
}

export function switchLocalePath(pathname: string, locale: Locale) {
  const segments = pathname.split("/")
  if (segments[1] && isLocale(segments[1])) segments[1] = locale
  else segments.splice(1, 0, locale)
  return segments.join("/") || `/${locale}`
}
