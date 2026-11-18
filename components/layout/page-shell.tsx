import type { ReactNode } from "react"

import type { Locale } from "@/lib/i18n"

/** The header and footer now live in the locale layout; older pages keep this wrapper until they move to the story blocks. */
export function PageShell({ children }: { children: ReactNode; locale: Locale }) {
  return <>{children}</>
}
