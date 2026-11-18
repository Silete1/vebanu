import type { MetadataRoute } from "next"
import { headers } from "next/headers"

import { siteUrl } from "@/lib/site"

/**
 * On anu.ltd everyone may read the site, and AI search and answer crawlers are
 * named so the welcome is explicit (their plain-text map is /llms.txt). Every
 * other host (staging, previews) disallows everything; next.config adds
 * X-Robots-Tag noindex there too. Reading the host makes only this file
 * dynamic; the pages stay static.
 */
const answerEngines = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
]

const productionHost = new URL(siteUrl).hostname
const indexableHosts = new Set([productionHost, productionHost.replace(/^www\./, "")])

export default async function robots(): Promise<MetadataRoute.Robots> {
  const requestHeaders = await headers()
  const host = (requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host"))
    ?.split(",")[0]
    ?.trim()
    .split(":")[0]
    ?.toLowerCase()

  if (!host || !indexableHosts.has(host)) {
    return { rules: { userAgent: "*", disallow: "/" } }
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }, ...answerEngines.map((userAgent) => ({ userAgent, allow: "/" }))],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
