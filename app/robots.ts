import type { MetadataRoute } from "next"

import { siteUrl } from "@/lib/site"

/**
 * Everyone may read the site. AI search and answer crawlers are named so the
 * welcome is explicit; the plain-text map for them is /llms.txt.
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

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }, ...answerEngines.map((userAgent) => ({ userAgent, allow: "/" }))],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
