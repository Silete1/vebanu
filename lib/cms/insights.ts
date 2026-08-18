import { cache } from "react"

import {
  insights as localInsights,
  type Insight,
  type InsightCategory,
  type InsightContentType,
  type InsightVisual,
  type LocalizedText,
} from "@/lib/content/insights"

const categories = new Set<InsightCategory>([
  "Business Control",
  "Odoo ERP",
  "Operations",
  "Finance",
  "Inventory",
  "Digital Transformation",
])

const contentTypes = new Set<InsightContentType>([
  "Field Note",
  "Analysis",
  "Guide",
  "Video Insight",
])

const visuals = new Set<InsightVisual>([
  "control-loop",
  "inventory-ledger",
  "management-dashboard",
  "approval-flow",
  "module-map",
  "process-map",
  "single-source",
  "ownership-model",
])

const insightQuery = `*[
  _type == "insight" &&
  defined(slug.current)
] | order(date desc) {
  "slug": slug.current,
  title,
  summary,
  category,
  contentType,
  date,
  readingTime,
  visual,
  visualAlt,
  featured,
  author,
  body[]{ heading, body }
}`

function localizedText(value: unknown): LocalizedText | null {
  if (!value || typeof value !== "object") return null

  const candidate = value as Record<string, unknown>
  if (typeof candidate.en !== "string" || candidate.en.trim() === "") {
    return null
  }

  return {
    en: candidate.en,
    ar:
      typeof candidate.ar === "string" && candidate.ar.trim() !== ""
        ? candidate.ar
        : candidate.en,
  }
}

function normalizeInsight(value: unknown): Insight | null {
  if (!value || typeof value !== "object") return null

  const candidate = value as Record<string, unknown>
  const title = localizedText(candidate.title)
  const summary = localizedText(candidate.summary)
  const visualAlt = localizedText(candidate.visualAlt)
  const author = localizedText(candidate.author)
  const body = Array.isArray(candidate.body)
    ? candidate.body.flatMap((section) => {
        if (!section || typeof section !== "object") return []
        const item = section as Record<string, unknown>
        const heading = localizedText(item.heading)
        const text = localizedText(item.body)
        return heading && text ? [{ heading, body: text }] : []
      })
    : []

  if (
    !title ||
    !summary ||
    !visualAlt ||
    typeof candidate.slug !== "string" ||
    !categories.has(candidate.category as InsightCategory) ||
    !contentTypes.has(candidate.contentType as InsightContentType) ||
    !visuals.has(candidate.visual as InsightVisual) ||
    typeof candidate.date !== "string" ||
    typeof candidate.readingTime !== "number" ||
    candidate.readingTime <= 0 ||
    body.length === 0
  ) {
    return null
  }

  return {
    title,
    slug: candidate.slug,
    summary,
    category: candidate.category as InsightCategory,
    contentType: candidate.contentType as InsightContentType,
    date: candidate.date,
    readingTime: candidate.readingTime,
    visual: candidate.visual as InsightVisual,
    visualAlt,
    featured: candidate.featured === true,
    ...(author ? { author } : {}),
    body,
  }
}

export const getInsights = cache(async (): Promise<Insight[]> => {
  const projectId = process.env.SANITY_PROJECT_ID
  const dataset = process.env.SANITY_DATASET

  if (!projectId || !dataset) return localInsights

  try {
    const endpoint = new URL(
      `https://${projectId}.api.sanity.io/v2026-07-01/data/query/${dataset}`
    )
    endpoint.searchParams.set("query", insightQuery)
    endpoint.searchParams.set("perspective", "published")

    const response = await fetch(endpoint, {
      next: { revalidate: 300, tags: ["insights"] },
    })

    if (!response.ok) return localInsights

    const payload = (await response.json()) as { result?: unknown }
    if (!Array.isArray(payload.result)) return localInsights

    const publishedInsights = payload.result.flatMap((item) => {
      const insight = normalizeInsight(item)
      return insight ? [insight] : []
    })

    return publishedInsights.length > 0 ? publishedInsights : localInsights
  } catch {
    return localInsights
  }
})

export async function getInsightBySlug(slug: string) {
  const entries = await getInsights()
  return entries.find((insight) => insight.slug === slug)
}
