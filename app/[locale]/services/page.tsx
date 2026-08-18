import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Container } from "@/components/layout/container"
import { PageShell } from "@/components/layout/page-shell"
import { JsonLd } from "@/components/seo/json-ld"
import { buttonVariants } from "@/components/ui/button"
import { servicesPageCopy } from "@/lib/content/site-copy"
import { isLocale, localizedAlternates, localizedPath } from "@/lib/i18n"
import { siteUrl } from "@/lib/site"

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/services">): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}

  const title =
    locale === "ar"
      ? "الخدمات | ANU للحلول البرمجية"
      : "Services | ANU Software Solutions"
  const description =
    locale === "ar"
      ? "تعيد ANU تصميم العمليات والموافقات والمخزون والمالية والتقارير ثم تطبّق نظام Odoo ERP للشركات في العراق."
      : "ANU redesigns operating control, then implements Odoo ERP around workflows, approvals, inventory, finance, reporting, and management visibility."

  return {
    title,
    description,
    alternates: {
      canonical: localizedPath(locale, "/services"),
      languages: localizedAlternates("/services"),
    },
    openGraph: {
      url: localizedPath(locale, "/services"),
      title,
      description,
    },
  }
}

export default async function ServicesPage({
  params,
}: PageProps<"/[locale]/services">) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const copy = servicesPageCopy[locale]
  const url = `${siteUrl}${localizedPath(locale, "/services")}`
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}#service`,
      name: copy.eyebrow,
      description: copy.directAnswer,
      url,
      inLanguage: locale === "ar" ? "ar-IQ" : "en-IQ",
      areaServed: {
        "@type": "Country",
        name: locale === "ar" ? "العراق" : "Iraq",
      },
      provider: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: locale === "ar" ? "ar-IQ" : "en-IQ",
      mainEntity: copy.questions.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ]

  return (
    <PageShell locale={locale}>
      <JsonLd data={schemas} />
      <section
        className="bg-[var(--color-abyssal-ink)] py-24 text-white lg:py-32"
        data-header-theme="dark"
      >
        <Container>
          <p className="mono-label tag-dot flex items-center gap-2 text-white/64">
            {copy.eyebrow}
          </p>
          <h1 className="display-headline mt-10 max-w-[10ch]">{copy.title}</h1>
          <p className="body-copy mt-10 max-w-3xl text-white/68">
            {copy.description}
          </p>
        </Container>
      </section>

      <section
        className="bg-white py-16 sm:py-20 lg:py-24"
        data-header-theme="light"
      >
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.28fr_0.72fr] lg:gap-14">
            <p className="mono-label pt-1 text-[var(--color-graphite)]">
              {copy.directLabel}
            </p>
            <p className="max-w-4xl text-[clamp(1.45rem,2.35vw,2.35rem)] leading-[1.24] tracking-[-0.025em]">
              {copy.directAnswer}
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-[var(--color-bone-white)] py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {copy.services.map((service) => (
              <article
                key={service.title}
                className="flat-card rounded-2xl p-8 sm:p-10"
              >
                <p className="mono-label tag-dot flex items-center gap-2 text-[var(--color-graphite)]">
                  {locale === "ar" ? "خدمة" : "Service"}
                </p>
                <h2 className="mt-8 text-3xl leading-tight tracking-[-0.015em]">
                  {service.title}
                </h2>
                <p className="mt-5 text-base leading-7 text-[var(--color-graphite)]">
                  {service.text}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.36fr_0.64fr] lg:gap-16">
            <div>
              <p className="mono-label text-blue-700">{copy.processLabel}</p>
              <h2 className="mt-5 text-[clamp(2.7rem,4.6vw,4.8rem)] leading-[0.98] tracking-[-0.04em]">
                {copy.processTitle}
              </h2>
            </div>
            <ol className="border-t border-[var(--color-abyssal-ink)]">
              {copy.process.map((step, index) => (
                <li
                  key={step}
                  className="grid grid-cols-[48px_1fr] gap-4 border-b border-[var(--color-lichen)] py-7"
                >
                  <span className="mono-label text-blue-700">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-xl leading-7">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className="bg-[var(--color-bone-white)] py-16 sm:py-20 lg:py-24">
        <Container>
          <h2 className="max-w-[12ch] text-[clamp(2.7rem,5vw,5rem)] leading-[0.98] tracking-[-0.04em]">
            {copy.questionsTitle}
          </h2>
          <div className="mt-12 grid border-t border-[var(--color-abyssal-ink)] md:grid-cols-2">
            {copy.questions.map((item) => (
              <article
                key={item.question}
                className="border-b border-[var(--color-lichen)] py-7 md:px-7 md:odd:border-e md:odd:ps-0 md:even:pe-0"
              >
                <h3 className="text-[clamp(1.45rem,2.2vw,2rem)] leading-[1.1] tracking-[-0.025em]">
                  {item.question}
                </h3>
                <p className="mt-4 max-w-[58ch] text-base leading-7 text-[var(--color-graphite)]">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
          <Link
            href={localizedPath(locale, "/#assessment")}
            className={`${buttonVariants({ variant: "accent", size: "lg" })} mt-12`}
          >
            {copy.cta}
          </Link>
        </Container>
      </section>
    </PageShell>
  )
}
