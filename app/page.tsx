import { HomeBody } from "@/components/home/home-body"
import { HomeHero } from "@/components/home/home-hero"
import { PageShell } from "@/components/layout/page-shell"

export default function Page() {
  return (
    <PageShell>
      <HomeHero />
      <HomeBody />
    </PageShell>
  )
}
