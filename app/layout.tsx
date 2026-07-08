import type { Metadata } from "next"
import {
  Inter_Tight,
  Roboto_Mono,
  Noto_Sans_Arabic,
} from "next/font/google"

import "./globals.css"
import { defaultLocale, getLocaleAttributes } from "@/lib/i18n"
import { cn } from "@/lib/utils"

const fontDisplay = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400"],
})

const fontMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400"],
})

const fontArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  weight: ["400"],
})

export const metadata: Metadata = {
  title: "ANU Software Solutions",
  description:
    "ERP implementation and business process improvement for companies in Iraq.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const localeAttributes = getLocaleAttributes(defaultLocale)

  return (
    <html
      lang={localeAttributes.lang}
      dir={localeAttributes.dir}
      suppressHydrationWarning
      className={cn(
        "scroll-smooth antialiased",
        fontDisplay.variable,
        fontMono.variable,
        fontArabic.variable
      )}
    >
      <body>{children}</body>
    </html>
  )
}
