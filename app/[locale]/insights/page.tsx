import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { InsightsPage } from "@/components/insights/insights-page"
import { PageShell } from "@/components/layout/page-shell"
import { getInsights } from "@/lib/cms/insights"
import { isLocale } from "@/lib/i18n"
import { pageMetadata } from "@/lib/seo/metadata"

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/insights">): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}

  const description =
    locale === "ar"
      ? "رؤى عملية من أنو حول الرقابة التشغيلية والمالية والمخزون وتطبيق Odoo ERP والتحول الرقمي."
      : "Practical thinking from ANU on business control, operations, finance, inventory, Odoo ERP and digital transformation."

  return pageMetadata({
    locale,
    path: "/insights",
    title: locale === "ar" ? "الرؤى" : "Insights",
    description,
  })
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
