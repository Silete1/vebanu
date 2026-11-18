import type { Metadata, Viewport } from "next"
import { notFound } from "next/navigation"

import "../globals.css"
import { JsonLd } from "@/components/seo/json-ld"
import { SiteFooter } from "@/components/shell/site-footer"
import { SiteHeader } from "@/components/shell/site-header"
import { organizationGraph } from "@/lib/seo"
import { getLocaleAttributes, isLocale, localeMeta, locales } from "@/lib/i18n"
import { getSiteContent, siteUrl } from "@/lib/site"
import { tierScript } from "@/lib/tier"

export const ensureStatic = "navigation"

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export const viewport: Viewport = {
  themeColor: "#090b11",
  colorScheme: "light dark",
}

type LocaleLayoutProps = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({
  params,
}: Pick<LocaleLayoutProps, "params">): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}

  const site = getSiteContent(locale)

  return {
    metadataBase: new URL(siteUrl),
    title: { default: site.name, template: `%s | ${site.name}` },
    description: site.description,
    icons: {
      icon: [
        { url: "/brand/anu-mark.svg", type: "image/svg+xml" },
        { url: "/icon.png", type: "image/png" },
      ],
      apple: [{ url: "/apple-icon.png", type: "image/png" }],
    },
    openGraph: {
      type: "website",
      locale: localeMeta[locale].ogLocale,
      alternateLocale: localeMeta[locale === "ar" ? "en" : "ar"].ogLocale,
      siteName: site.name,
      title: site.name,
      description: site.description,
      images: [{ url: "/media/og.png", width: 1200, height: 630, alt: site.name }],
    },
    twitter: { card: "summary_large_image", title: site.name, description: site.description },
    alternates: { types: { "text/plain": "/llms.txt" } },
  }
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <html {...getLocaleAttributes(locale)} data-locale={locale} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: tierScript }} />
        <link
          rel="preload"
          href={locale === "ar" ? "/fonts/tajawal-arabic-400.woff2" : "/fonts/inter-tight-latin-wght.woff2"}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <JsonLd data={organizationGraph(locale)} />
        <SiteHeader locale={locale} />
        <main id="main">{children}</main>
        <SiteFooter locale={locale} />
      </body>
    </html>
  )
}
