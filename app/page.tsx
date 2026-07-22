import {
  HomeBody,
  HomeIntroSection,
} from "@/components/home/home-body"
import { HomeHero } from "@/components/home/home-hero"
import { HomeSharedVideo } from "@/components/home/home-shared-video"
import { PageShell } from "@/components/layout/page-shell"

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
