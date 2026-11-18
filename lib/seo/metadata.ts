import type { Metadata } from "next"

import {
  type Locale,
  localeMeta,
  localizedAlternates,
  localizedPath,
} from "@/lib/i18n"
import { getSiteContent } from "@/lib/site"

type PageMetadataInput = {
  locale: Locale
  /** Locale-free path such as "/services". Omit for layout-level defaults. */
  path?: string
  /** Page title without the brand; the brand is appended once. */
  title?: string
  /** Defaults to the site description. */
  description?: string
  type?: "website" | "article"
  keywords?: string[]
  /** Page-specific share images; defaults to the locale's generated card. */
  images?: { url: string; alt: string }[]
}

/** The card rendered by app/[locale]/opengraph-image.tsx. */
function defaultShareImage(locale: Locale) {
  return {
    url: localizedPath(locale, "/opengraph-image"),
    width: 1200,
    height: 630,
    alt: getSiteContent(locale).name,
  }
}

/** "Page | Brand", or the brand alone. The only place the brand is added. */
function brandedTitle(locale: Locale, title?: string) {
  const { name } = getSiteContent(locale)
  return title ? `${title} | ${name}` : name
}

/**
 * The one metadata builder for every route. Next replaces (does not merge)
 * nested `openGraph`/`twitter` objects, and a page's `openGraph` also hides
 * the file-based image, so each page gets the full set, image included.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  type = "website",
  keywords,
  images = [defaultShareImage(locale)],
}: PageMetadataInput): Metadata {
  const site = getSiteContent(locale)
  const fullTitle = brandedTitle(locale, title)
  const pageDescription = description ?? site.description
  const url = path === undefined ? undefined : localizedPath(locale, path)
  const otherLocale: Locale = locale === "ar" ? "en" : "ar"

  return {
    title: { absolute: fullTitle },
    description: pageDescription,
    keywords,
    alternates:
      path === undefined
        ? undefined
        : { canonical: url, languages: localizedAlternates(path) },
    openGraph: {
      type,
      url,
      siteName: site.name,
      locale: localeMeta[locale].ogLocale,
      alternateLocale: localeMeta[otherLocale].ogLocale,
      title: fullTitle,
      description: pageDescription,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: pageDescription,
      images: images.map((image) => image.url),
    },
  }
}
