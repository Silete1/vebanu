import type { MetadataRoute } from "next"

import { industries } from "@/lib/content/industries"
import { insights } from "@/lib/content/insights"
import { siteUrl } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const pageUpdatedAt = new Date("2026-08-18")

  return [
    {
      url: siteUrl,
      lastModified: pageUpdatedAt,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: pageUpdatedAt,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/industries`,
      lastModified: pageUpdatedAt,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...industries.map((industry) => ({
      url: `${siteUrl}${industry.href}`,
      lastModified: pageUpdatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    {
      url: `${siteUrl}/insights`,
      lastModified: pageUpdatedAt,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...insights.map((insight) => ({
      url: `${siteUrl}/insights/${insight.slug}`,
      lastModified: new Date(insight.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]
}
