import { Inter_Tight, Roboto_Mono, Tajawal } from "next/font/google"

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

// Only Arabic pages render Tajawal (via [lang^="ar"] in globals.css), and the
// browser downloads it only there, so it is not preloaded on every page.
// Weights match what the CSS uses: 400 body, 500 medium, 700 bold/semibold.
const fontArabic = Tajawal({
  subsets: ["arabic"],
  variable: "--font-arabic",
  weight: ["400", "500", "700"],
  preload: false,
})

/** Font CSS variables for the <html> element. */
export const fontVariables = cn(
  fontDisplay.variable,
  fontMono.variable,
  fontArabic.variable
)
