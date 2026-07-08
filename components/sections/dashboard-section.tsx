import { homeContent } from "@/lib/content/home"
import { defaultLocale, type Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"

type DashboardSectionProps = {
  locale?: Locale
}

export function DashboardSection({
  locale = defaultLocale,
}: DashboardSectionProps) {
  const content = homeContent[locale].dashboard

  return (
    <Section
      id="dashboard"
      className="overflow-hidden bg-[var(--surface-inverted)] text-white"
    >
      <Container className="grid gap-10">
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-end">
            <div className="max-w-[16ch]">
              <p className="eyebrow text-white/70">{content.badge}</p>
              <h2 className="section-title mt-5 text-white">{content.title}</h2>
            </div>
            <p className="max-w-[62ch] text-base leading-8 text-white/68">
              {content.description}
            </p>
          </div>
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-12">
          {content.cards.map((card, index) => (
            <Reveal
              key={card.key}
              delay={index * 40}
              className={cn(
                "h-full",
                index === 0 || index === 3 ? "lg:col-span-6" : "lg:col-span-3"
              )}
            >
              <article className="card-surface h-full rounded-[2rem] border border-white/12 bg-[var(--surface-inverted-soft)] p-5">
                <p className="eyebrow text-[#93c5fd]">{card.eyebrow}</p>
                <h3 className="mt-4 font-heading text-[2rem] leading-[0.92] tracking-[-0.03em] text-white uppercase">
                  {card.title}
                </h3>
                <p className="mt-4 max-w-[34ch] text-sm leading-7 text-white/68">
                  {card.description}
                </p>

                <div className="mt-6 grid gap-2">
                  {card.rows.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between gap-4 border-t border-white/10 py-3"
                    >
                      <span className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-white/48">
                        {row.label}
                      </span>
                      <span className="rounded-full border border-[var(--color-graphite)] bg-transparent px-3 py-1 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-white/70">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
