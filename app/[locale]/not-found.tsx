"use client"

import Link from "next/link"
import { useParams } from "next/navigation"

import { Dingir } from "@/components/brand/dingir"
import { defaultLocale, isLocale, localizedPath, type Locale } from "@/lib/i18n"

const copy: Record<Locale, { kicker: string; title: string; body: string; home: string; systems: string }> = {
  en: {
    kicker: "404",
    title: "This page is not in the ledger.",
    body: "The address may have changed, or it never existed. Everything ANU builds is one step away.",
    home: "Back to the start",
    systems: "See the systems",
  },
  ar: {
    kicker: "404",
    title: "هذه الصفحة ليست في السجل.",
    body: "ربما تغيّر العنوان، أو لم يكن موجوداً. كل ما تبنيه أنو على بُعد خطوة.",
    home: "العودة إلى البداية",
    systems: "شاهد الأنظمة",
  },
}

// not-found receives no params; the locale is read from the URL on the client.
export default function LocaleNotFound() {
  const { locale: param } = useParams<{ locale?: string }>()
  const locale = param && isLocale(param) ? param : defaultLocale
  const text = copy[locale]

  return (
    <section className="anu-band anu-sky anu-hero anu-page-hero" aria-labelledby="missing-title">
      <div className="anu-wrap anu-hero__text">
        <Dingir className="anu-dingir anu-cta__star" />
        <p className="anu-kicker anu-num">{text.kicker}</p>
        <h1 id="missing-title" className="anu-display anu-page-hero__title">
          {text.title}
        </h1>
        <p className="anu-lede">{text.body}</p>
        <div className="anu-hero__actions">
          <Link href={localizedPath(locale)} className="anu-action">
            {text.home}
          </Link>
          <Link href={localizedPath(locale, "/systems")} className="anu-action anu-action--ghost">
            {text.systems}
          </Link>
        </div>
      </div>
    </section>
  )
}
