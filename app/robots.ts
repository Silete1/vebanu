import type { MetadataRoute } from "next"
import { headers } from "next/headers"

import { siteUrl } from "@/lib/site"

const productionHost = new URL(siteUrl).hostname
const indexableHosts = new Set([
  productionHost,
  productionHost.replace(/^www\./, ""),
])

// Reading the request host makes only /robots.txt dynamic, so staging and
// preview hosts stay out of search indexes while pages remain static.
export default async function robots(): Promise<MetadataRoute.Robots> {
  const requestHeaders = await headers()
  const host = (
    requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host")
  )
    ?.split(",")[0]
    ?.trim()
    .split(":")[0]
    ?.toLowerCase()

  if (!host || !indexableHosts.has(host)) {
    return { rules: { userAgent: "*", disallow: "/" } }
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
