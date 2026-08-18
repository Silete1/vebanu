import type { Metadata } from "next"

import { HomeBody, HomeIntroSection } from "@/components/home/home-body"
import { HomeHero } from "@/components/home/home-hero"
import { HomeSharedVideo } from "@/components/home/home-shared-video"
import { PageShell } from "@/components/layout/page-shell"

export const metadata: Metadata = {
  title: "Odoo ERP Implementation in Iraq | ANU Software Solutions",
  description:
    "ANU redesigns business processes and implements Odoo ERP for operations, inventory, finance, approvals, and management reporting in Iraq.",
  alternates: {
    canonical: "/",
  },
}

export default function Page() {
  return (
    <PageShell>
      <HomeSharedVideo>
        <HomeHero />
        <HomeIntroSection />
      </HomeSharedVideo>
      <HomeBody />
    </PageShell>
  )
}
