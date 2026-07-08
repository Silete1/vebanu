import { homeContent } from "@/lib/content/home"
import { defaultLocale, type Locale } from "@/lib/i18n"
import { MethodScrollStory } from "@/components/method/method-scroll-story"
import { Section } from "@/components/layout/section"

type MethodSectionProps = {
  locale?: Locale
}

export function MethodSection({ locale = defaultLocale }: MethodSectionProps) {
  return (
    <Section id="method" className="overflow-hidden">
      <MethodScrollStory content={homeContent[locale].method} locale={locale} />
    </Section>
  )
}
