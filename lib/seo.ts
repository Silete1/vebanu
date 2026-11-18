import { anuContact } from "@/lib/contact"
import { type Locale, localeMeta, localizedPath } from "@/lib/i18n"
import { getSiteContent, siteUrl } from "@/lib/site"

/**
 * JSON-LD, one @graph per page with stable @ids, so answer engines can join
 * the organisation, the site, the page and what it describes.
 */

export const orgId = `${siteUrl}/#organization`

const websiteId = (locale: Locale) => `${siteUrl}/#website-${locale}`

export function organizationGraph(locale: Locale) {
  const site = getSiteContent(locale)

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: site.name,
        alternateName: site.shortName,
        url: siteUrl,
        logo: `${siteUrl}/brand/anu-logo.svg`,
        description: site.description,
        email: anuContact.email,
        telephone: anuContact.phoneInternational,
        address: { "@type": "PostalAddress", addressLocality: locale === "ar" ? "بغداد" : "Baghdad", addressCountry: "IQ" },
        areaServed: { "@type": "Country", name: locale === "ar" ? "العراق" : "Iraq" },
        sameAs: [anuContact.linkedinHref, anuContact.instagramHref, anuContact.facebookHref, anuContact.odooPartnerHref],
        knowsAbout: site.knowsAbout,
      },
      {
        "@type": "WebSite",
        "@id": websiteId(locale),
        url: `${siteUrl}${localizedPath(locale)}`,
        name: site.name,
        inLanguage: localeMeta[locale].htmlLang,
        publisher: { "@id": orgId },
      },
    ],
  }
}

export type Crumb = { name: string; path: string }

/** A page's own nodes: the WebPage, its breadcrumb, and what it is about. */
export function pageGraph(
  locale: Locale,
  page: { path: string; name: string; description: string; crumbs: Crumb[]; about?: Record<string, unknown>[] }
) {
  const url = `${siteUrl}${localizedPath(locale, page.path)}`

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#page`,
        url,
        name: page.name,
        description: page.description,
        inLanguage: localeMeta[locale].htmlLang,
        isPartOf: { "@id": websiteId(locale) },
        about: page.about?.map((node) => ({ "@id": node["@id"] })),
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: page.crumbs.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          item: `${siteUrl}${localizedPath(locale, crumb.path)}`,
        })),
      },
      ...(page.about ?? []),
    ],
  }
}
