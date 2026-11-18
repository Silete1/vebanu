"use client"

import { useParams } from "next/navigation"

import { NotFoundView } from "@/components/layout/not-found-view"
import { defaultLocale, isLocale } from "@/lib/i18n"

// not-found.tsx receives no params; the URL's locale is read on the client.
// As a client boundary it is only a reference in each page's payload.
export default function LocaleNotFound() {
  const { locale } = useParams<{ locale?: string }>()
  return (
    <NotFoundView
      locale={locale && isLocale(locale) ? locale : defaultLocale}
    />
  )
}
