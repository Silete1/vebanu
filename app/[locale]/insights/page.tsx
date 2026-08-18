import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { InsightsPage } from "@/components/insights/insights-page"
import { PageShell } from "@/components/layout/page-shell"
import { getInsights } from "@/lib/cms/insights"
import { isLocale, localizedAlternates, localizedPath } from "@/lib/i18n"

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/insights">): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}

  const title =
    locale === "ar"
      ? "الرؤى | ANU للحلول البرمجية"
      : "Insights | ANU Software Solutions"
  const description =
    locale === "ar"
      ? "رؤى عملية من ANU حول الرقابة التشغيلية والمالية والمخزون وتطبيق Odoo ERP والتحول الرقمي."
      : "Practical thinking from ANU on business control, operations, finance, inventory, Odoo ERP and digital transformation."

  return {
    title,
    description,
    alternates: {
      canonical: localizedPath(locale, "/insights"),
      languages: localizedAlternates("/insights"),
    },
    openGraph: { url: localizedPath(locale, "/insights"), title, description },
  }
}

export default async function InsightsRoute({
  params,
}: PageProps<"/[locale]/insights">) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const insights = await getInsights()

  return (
    <PageShell locale={locale}>
      <InsightsPage initialInsights={insights} locale={locale} />
    </PageShell>
  )
}
