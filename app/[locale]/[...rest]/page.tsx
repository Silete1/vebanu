import { notFound } from "next/navigation"

// Unknown paths under /en and /ar render app/[locale]/not-found.tsx inside
// the locale layout (header, footer, lang/dir).
export default function UnknownLocalePath() {
  notFound()
}
