import type { Metadata } from "next"

import { InsightsPage } from "@/components/insights/insights-page"
import { PageShell } from "@/components/layout/page-shell"
import { getInsights } from "@/lib/cms/insights"
import type { Locale } from "@/lib/i18n"

export const metadata: Metadata = {
  title: "Insights | ANU Software Solutions",
  description:
    "Practical thinking from ANU on business control, operations, finance, inventory, Odoo ERP and digital transformation.",
}

type InsightsRouteProps = {
  searchParams: Promise<{ locale?: string }>
}

export default async function InsightsRoute({
  searchParams,
}: InsightsRouteProps) {
  const [insights, query] = await Promise.all([getInsights(), searchParams])
  const initialLocale: Locale = query.locale === "ar" ? "ar" : "en"

  return (
    <PageShell>
      <InsightsPage initialInsights={insights} initialLocale={initialLocale} />
    </PageShell>
  )
}
