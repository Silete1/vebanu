import { navigationItems } from "@/lib/navigation"
import { AnuLogo } from "@/components/brand/anu-logo"
import { Container } from "@/components/layout/container"
import { MainNav } from "@/components/navigation/main-nav"
import { MobileNavSheet } from "@/components/navigation/mobile-nav-sheet"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 pt-7 text-[var(--color-abyssal-ink)]" data-intro-header>
      <Container className="flex items-center gap-6">
        <AnuLogo />
        <div className="ml-auto hidden lg:block">
          <MainNav items={navigationItems} />
        </div>
        <div className="ml-auto flex items-center gap-3 lg:ml-0">
          <Button variant="default" size="lg" className="pointer-events-auto hidden lg:inline-flex">
            WORK WITH ANU
          </Button>
          <MobileNavSheet items={navigationItems} />
        </div>
      </Container>
    </header>
  )
}
