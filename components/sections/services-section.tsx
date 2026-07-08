import { homeContent } from "@/lib/content/home"
import { defaultLocale, type Locale } from "@/lib/i18n"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { ServiceBentoStory } from "@/components/services/service-bento-story"

type ServicesSectionProps = {
  locale?: Locale
}

export function ServicesSection({
  locale = defaultLocale,
}: ServicesSectionProps) {
  return (
    <Section id="services" className="overflow-hidden">
      <Container>
        <ServiceBentoStory content={homeContent[locale].services} locale={locale} />
      </Container>
    </Section>
  )
}
