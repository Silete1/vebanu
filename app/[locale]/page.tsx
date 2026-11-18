import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { HomeBody, HomeIntroSection } from "@/components/home/home-body"
import { HomeHero } from "@/components/home/home-hero"
import { HomeSharedVideo } from "@/components/home/home-shared-video"
import { PageShell } from "@/components/layout/page-shell"
import { isLocale } from "@/lib/i18n"
import { pageMetadata } from "@/lib/seo/metadata"

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}

  return pageMetadata({
    locale,
    path: "/",
    title:
      locale === "ar"
        ? "تطبيق نظام Odoo ERP في العراق"
        : "Odoo ERP Implementation in Iraq",
    description:
      locale === "ar"
        ? "تعيد أنو تصميم عمليات الشركات وتطبّق نظام Odoo ERP للمخزون والمالية والموافقات والتقارير والرقابة الإدارية في العراق."
        : "ANU redesigns business processes and implements Odoo ERP for operations, inventory, finance, approvals, and management reporting in Iraq.",
  })
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <PageShell locale={locale}>
      <HomeSharedVideo>
        <HomeHero locale={locale} />
        <HomeIntroSection locale={locale} />
      </HomeSharedVideo>
      <HomeBody locale={locale} />
    </PageShell>
  )
}
