import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"

import { homePageCopy } from "@/lib/content/site-copy"
import { isLocale, type Locale, locales } from "@/lib/i18n"
import { getSiteContent } from "@/lib/site"

export const alt = "ANU Software Solutions: Odoo ERP implementation in Iraq"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const ink = "#090b11"
const blue = "#2563eb"

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

/**
 * Satori shapes Arabic glyphs but lays words out left to right, so Arabic
 * lines are split into words (keeping Latin runs such as "Odoo ERP" whole)
 * and placed with row-reverse.
 */
function TextLine({
  text,
  locale,
  style,
}: {
  text: string
  locale: Locale
  style: React.CSSProperties
}) {
  if (locale !== "ar") return <div style={{ display: "flex", ...style }}>{text}</div>

  const words = text.split(" ").reduce<string[]>((runs, word) => {
    const previous = runs.at(-1)
    if (previous && /^[\x20-\x7e—]+$/.test(previous + word)) {
      runs[runs.length - 1] = `${previous} ${word}`
    } else {
      runs.push(word)
    }
    return runs
  }, [])

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row-reverse",
        flexWrap: "wrap",
        columnGap: "0.28em",
        ...style,
      }}
    >
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>{word}</span>
      ))}
    </div>
  )
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: param } = await params
  const locale: Locale = isLocale(param) ? param : "en"
  const isArabic = locale === "ar"
  const hero = homePageCopy[locale].hero
  const site = getSiteContent(locale)

  const [logoMark, latinFont, arabicFont] = await Promise.all([
    readFile(join(process.cwd(), "public/anulogopng-.png")),
    readFile(join(process.cwd(), "lib/seo/fonts/InterTight-Regular-latin.woff")),
    readFile(join(process.cwd(), "lib/seo/fonts/Tajawal-Medium.ttf")),
  ])
  const logoSrc = `data:image/png;base64,${logoMark.toString("base64")}`

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: isArabic ? "flex-end" : "flex-start",
        width: "100%",
        height: "100%",
        padding: "64px 72px",
        color: "white",
        fontFamily: isArabic ? "Tajawal" : "Inter Tight",
        backgroundColor: ink,
        backgroundImage: [
          "radial-gradient(ellipse 68% 60% at 88% 12%, rgba(37, 99, 235, 0.45), rgba(9, 11, 17, 0) 60%)",
          "radial-gradient(ellipse 58% 50% at 72% 96%, rgba(99, 102, 241, 0.36), rgba(9, 11, 17, 0) 60%)",
          "radial-gradient(ellipse 46% 70% at 8% 40%, rgba(124, 58, 237, 0.24), rgba(9, 11, 17, 0) 62%)",
        ].join(", "),
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain <img> */}
        <img src={logoSrc} width={64} height={64} alt="" />
        <div
          style={{
            display: "flex",
            fontFamily: "Inter Tight",
            fontSize: 52,
            letterSpacing: "0.04em",
          }}
        >
          ANU
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: isArabic ? "flex-end" : "flex-start",
          gap: 28,
        }}
      >
        <TextLine
          text={`${hero.titlePrimary} ${hero.titleSecondary}`}
          locale={locale}
          style={{
            fontSize: isArabic ? 76 : 84,
            lineHeight: isArabic ? 1.2 : 1,
            letterSpacing: isArabic ? 0 : "-0.03em",
            maxWidth: 1000,
          }}
        />
        <TextLine
          text={hero.subline}
          locale={locale}
          style={{
            fontSize: 32,
            lineHeight: 1.35,
            color: "rgba(255, 255, 255, 0.8)",
            maxWidth: 960,
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          flexDirection: isArabic ? "row-reverse" : "row",
          borderTop: "1px solid rgba(255, 255, 255, 0.18)",
          paddingTop: 22,
          fontSize: 24,
          color: "rgba(255, 255, 255, 0.8)",
        }}
      >
        <TextLine text={site.name} locale={locale} style={{}} />
        <div style={{ display: "flex", fontFamily: "Inter Tight", color: blue }}>
          anu.ltd
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Inter Tight", data: latinFont, weight: 400, style: "normal" },
        { name: "Tajawal", data: arabicFont, weight: 500, style: "normal" },
      ],
    }
  )
}
