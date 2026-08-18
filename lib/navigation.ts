import type { Locale } from "@/lib/i18n"
import { localizedPath } from "@/lib/i18n"
import { siteCopy } from "@/lib/content/site-copy"

export type NavigationItem = {
  title: string
  href: string
  available: boolean
}

export function getNavigationItems(locale: Locale): NavigationItem[] {
  const copy = siteCopy[locale].links

  return [
    {
      title: copy.work,
      href: localizedPath(locale, "/#work"),
      available: true,
    },
    {
      title: copy.method,
      href: localizedPath(locale, "/#method"),
      available: true,
    },
    {
      title: copy.platform,
      href: localizedPath(locale, "/#platform"),
      available: true,
    },
    {
      title: copy.industries,
      href: localizedPath(locale, "/industries"),
      available: true,
    },
    {
      title: copy.insights,
      href: localizedPath(locale, "/insights"),
      available: true,
    },
    {
      title: copy.contact,
      href: localizedPath(locale, "/contact"),
      available: false,
    },
  ]
}
