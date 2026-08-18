import type { MetadataRoute } from "next"

import { industries } from "@/lib/content/industries"
import { insights } from "@/lib/content/insights"
import { siteUrl } from "@/lib/site"
import { locales, localizedPath } from "@/lib/i18n"

export default function sitemap(): MetadataRoute.Sitemap {
  const pageUpdatedAt = new Date("2026-08-18")
  const pages = [
    {
      path: "/",
      lastModified: pageUpdatedAt,
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      path: "/services",
      lastModified: pageUpdatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      path: "/industries",
      lastModified: pageUpdatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    ...industries.map((industry) => ({
      path: industry.href,
      lastModified: pageUpdatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    {
      path: "/insights",
      lastModified: pageUpdatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...insights.map((insight) => ({
      path: `/insights/${insight.slug}`,
      lastModified: new Date(insight.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]

  return pages.flatMap((page) => {
    const languages = {
      "en-IQ": `${siteUrl}${localizedPath("en", page.path)}`,
      "ar-IQ": `${siteUrl}${localizedPath("ar", page.path)}`,
      "x-default": `${siteUrl}${localizedPath("en", page.path)}`,
    }

    return locales.map((locale) => ({
      url: `${siteUrl}${localizedPath(locale, page.path)}`,
      lastModified: page.lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: { languages },
    }))
  })
}
