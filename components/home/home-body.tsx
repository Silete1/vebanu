import { ArrowUpRightIcon } from "lucide-react"
import Link from "next/link"
import { Fragment } from "react"

import { AssessmentCtaSection } from "@/components/home/assessment-cta-section"
import { HomeScrollMotion } from "@/components/home/home-scroll-motion"
import { InsightVisual } from "@/components/insights/insight-visual"
import { Container } from "@/components/layout/container"
import { MethodCardStack } from "@/components/method/method-card-stack"
import { PlatformMacbookShowcase } from "@/components/platform/platform-macbook-showcase"
import { IndustriesAccordionShowcase } from "@/components/industries/industries-accordion-showcase"
import { insights } from "@/lib/content/insights"

const featuredInsight =
  insights.find((insight) => insight.featured) ?? insights[0]!
const supportingInsights = insights
  .filter((insight) => insight.slug !== featuredInsight.slug)
  .slice(0, 2)

const workCards = [
  {
    title: "Process redesign",
    text: "Map workflows, approvals, roles, documents, handoffs, data gaps, and operational bottlenecks.",
  },
  {
    title: "Odoo implementation",
    text: "Configure the required Odoo modules, permissions, automations, dashboards, reports, and integrations.",
  },
  {
    title: "Control dashboards",
    text: "Give owners and managers visibility over inventory, sales, purchasing, finance, collections, and execution.",
  },
]

const workStory = [
  {
    counter: "01 / 03",
    title: "We do not sell modules. We rebuild operating control.",
    text: "Every implementation starts with how the company actually works: who requests, who approves, who receives, who sells, who collects, who reports, and where control breaks.",
  },
  {
    counter: "02 / 03",
    title: "The operating model is redesigned before Odoo is configured.",
    text: "ANU defines roles, permissions, approval logic, inventory rules, finance links, reporting structure, and owner visibility before system setup begins.",
  },
  {
    counter: "03 / 03",
    title: "Odoo becomes the control platform for governed execution.",
    text: "Modules, dashboards, integrations, automations, reports, and training are configured around how the business needs to run every day.",
  },
]

const methodSteps = [
  {
    phase: "Assess",
    title: "Assess current operations",
    text: "Map workflows, gaps, approvals, documents, reports, data sources, and decision points.",
    controls: ["Workflow evidence", "Control gaps", "Decision points"],
    output: "Current-state control map",
  },
  {
    phase: "Design",
    title: "Redesign the control model",
    text: "Define roles, permissions, stages, approval logic, inventory rules, finance links, and reporting structure.",
    controls: ["Roles and ownership", "Approval logic", "Reporting model"],
    output: "Target operating model",
  },
  {
    phase: "Configure",
    title: "Configure Odoo",
    text: "Implement modules, workflows, dashboards, automations, integrations, access rights, and management reports.",
    controls: ["Odoo workflows", "Access rights", "Management reports"],
    output: "Configured control platform",
  },
  {
    phase: "Stabilize",
    title: "Train and stabilize",
    text: "Train key users, support go-live, monitor issues, refine configuration, and stabilize daily operation.",
    controls: ["Key-user readiness", "Go-live controls", "Issue closure"],
    output: "Controlled daily operation",
  },
]

const modules = [
  "SALES",
  "CRM",
  "INVENTORY",
  "PURCHASE",
  "FINANCE",
  "APPROVALS",
  "REPORTING",
  "MANUFACTURING",
  "PROJECTS",
  "HR",
  "DASHBOARDS",
  "INTEGRATIONS",
]

export function HomeBody() {
  return (
    <>
      <HomeScrollMotion />
      <WorkCardsSection />
      <MethodSection />
      <PlatformSection />
      <IndustriesSection />
      <InsightSection />
      <AssessmentCtaSection />
    </>
  )
}

function SectionLabel({
  children,
  dark = false,
}: {
  children: string
  dark?: boolean
}) {
  return (
    <p
      className={`mono-label tag-dot flex items-center gap-2 ${
        dark ? "text-white/64" : "text-[var(--color-graphite)]"
      }`}
    >
      {children}
    </p>
  )
}

function StoryLetters({ text }: { text: string }) {
  const words = text.split(" ")

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, wordIndex) => (
          <Fragment key={`${word}-${wordIndex}`}>
            <span className="inline-block">
              {Array.from(word).map((letter, letterIndex) => (
                <span
                  key={`${letter}-${letterIndex}`}
                  data-story-letter
                  className="inline"
                >
                  {letter}
                </span>
              ))}
            </span>
            {wordIndex < words.length - 1 ? " " : ""}
          </Fragment>
        ))}
      </span>
    </>
  )
}

export function HomeIntroSection() {
  return (
    <section
      id="work"
      className="relative h-[250svh] text-white"
      data-motion-story
      data-header-theme="dark"
    >
      <div className="sticky top-0 flex h-svh overflow-hidden" data-lab-visual>
        <Container className="relative z-10 flex h-full flex-col justify-center">
          <div className="story-progress" aria-hidden="true">
            <span className="story-progress-fill" />
          </div>
          <div className="grid gap-12 pt-10 lg:grid-cols-[0.34fr_0.66fr]">
            <div className="space-y-20">
              <SectionLabel dark>WHAT WE DO</SectionLabel>
              <div className="story-counter-mask">
                <div className="story-counter-track">
                  {workStory.map((step) => (
                    <span
                      key={step.counter}
                      className="mono-label story-counter inline-flex rounded-full border border-[var(--color-graphite)] px-5 py-3 text-white/76"
                    >
                      {step.counter}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="story-mask">
              <div className="story-track">
                {workStory.map((step) => (
                  <article key={step.counter} className="story-panel">
                    <h2
                      data-story-highlight
                      className="max-w-4xl text-[clamp(2.4rem,4.1vw,4rem)] leading-[1.06] tracking-[-0.03em] text-white/76"
                    >
                      <StoryLetters text={step.title} />
                    </h2>
                    <p
                      data-story-highlight
                      className="mt-10 max-w-3xl text-[clamp(1.1rem,1.55vw,1.45rem)] leading-[1.22] tracking-[-0.02em] text-white/88"
                    >
                      <StoryLetters text={step.text} />
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}

function WorkCardsSection() {
  return (
    <section
      className="bg-[var(--color-abyssal-ink)] pb-28 text-white lg:pb-40"
      data-reveal-section
      data-header-theme="dark"
    >
      <Container>
        <div className="grid gap-0 border-t border-[var(--color-graphite)] md:grid-cols-3">
          {workCards.map((card) => (
            <article
              key={card.title}
              className="border-b border-[var(--color-graphite)] py-10 md:border-r md:border-b-0 md:pr-10 md:last:border-r-0 md:[&+article]:pl-10"
            >
              <h3 className="text-[24px] leading-[1.2] tracking-[-0.006em] text-white">
                {card.title}
              </h3>
              <p className="mt-8 text-[18px] leading-[1.3] tracking-[-0.001em] text-white/68">
                {card.text}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}

function MethodSection() {
  return (
    <section
      id="method"
      className="bg-[var(--color-abyssal-ink)] pt-24 text-white lg:pt-32"
      data-reveal-section
      data-header-theme="dark"
    >
      <MethodCardStack
        label="02 / METHOD"
        headline="From scattered work to governed execution."
        steps={methodSteps}
      />
    </section>
  )
}

function PlatformSection() {
  return (
    <section
      id="platform"
      className="overflow-hidden bg-[var(--color-bone-white)] py-16 sm:py-20 lg:py-32"
      data-reveal-section
      data-header-theme="light"
    >
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <SectionLabel>03 / PLATFORM</SectionLabel>
          <h2 className="section-headline mt-6">
            Odoo becomes the operating layer.
          </h2>
          <p className="body-copy mx-auto mt-6 max-w-2xl text-[var(--color-graphite)]">
            Sales, CRM, inventory, purchasing, accounting, manufacturing,
            projects, HR, approvals, and dashboards work as one single control
            system when implemented around the company&apos;s real operating
            model.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {modules.map((module) => (
              <span
                key={module}
                className="mono-label rounded-xl border border-[var(--color-lichen)] bg-white px-3.5 py-2 text-[11px] text-[var(--color-graphite)] shadow-2xs"
              >
                {module}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <PlatformMacbookShowcase />
        </div>
      </Container>
    </section>
  )
}

function IndustriesSection() {
  return (
    <section
      id="industries"
      className="overflow-hidden bg-[var(--color-bone-white)] py-16 sm:py-20 lg:py-32"
      data-reveal-section
      data-header-theme="light"
    >
      <Container>
        <div className="mx-auto max-w-4xl text-left sm:text-center">
          <SectionLabel>04 / INDUSTRIES</SectionLabel>
          <h2 className="mt-5 max-w-[12ch] text-[clamp(2.5rem,11vw,3.625rem)] leading-[1.02] tracking-[-0.025em] text-balance sm:mx-auto sm:mt-6 sm:leading-[1.1] sm:tracking-[-0.006em]">
            Built for companies where operational control matters.
          </h2>
          <p className="body-copy mt-5 max-w-[34ch] text-[var(--color-graphite)] sm:mx-auto sm:mt-6 sm:max-w-2xl">
            See how ANU structures operational control and Odoo around the work
            that matters in each industry.
          </p>
        </div>

        <IndustriesAccordionShowcase
          compactMobile
          className="mt-10 sm:mt-12 lg:mt-14"
        />

        <div className="mt-6 flex justify-center sm:mt-8">
          <Link
            href="/industries"
            className="mono-label group inline-flex min-h-11 items-center gap-3 rounded-lg px-3 text-[var(--color-abyssal-ink)] transition-colors outline-none hover:text-blue-700 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-bone-white)]"
          >
            View all industries
            <ArrowUpRightIcon
              className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
              aria-hidden="true"
            />
          </Link>
        </div>
      </Container>
    </section>
  )
}

function InsightSection() {
  return (
    <section
      id="insights"
      className="bg-[var(--color-bone-white)] py-12 sm:py-14 lg:py-16"
      data-header-theme="light"
      aria-labelledby="home-insights-title"
    >
      <Container>
        <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2
            id="home-insights-title"
            className="max-w-[15ch] text-[clamp(2.75rem,4.2vw,4rem)] leading-[0.96] tracking-[-0.035em]"
          >
            Insights for better control.
          </h2>
          <Link
            href="/insights"
            className="mono-label inline-flex w-fit items-center gap-3 rounded-sm text-[var(--color-abyssal-ink)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-bioluminescent-lime)] focus-visible:ring-offset-4"
          >
            View all insights
            <span className="arrow-cta">
              <ArrowUpRightIcon className="size-4" />
            </span>
          </Link>
        </header>

        <div className="mt-8 grid border-y border-[var(--color-abyssal-ink)] lg:h-[470px] lg:grid-cols-[7fr_5fr]">
          <article className="border-b border-[var(--color-abyssal-ink)] lg:border-r lg:border-b-0">
            <Link
              href={`/insights/${featuredInsight.slug}`}
              className="group flex h-full flex-col py-6 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-bioluminescent-lime)] focus-visible:ring-inset lg:pr-8"
            >
              <div className="h-52 overflow-hidden lg:h-56" data-insight-image>
                <InsightVisual
                  variant={featuredInsight.visual}
                  alt={featuredInsight.visualAlt.en}
                  dark
                  className="h-full min-h-0 border-0 transition-transform duration-700 ease-out group-hover:scale-[1.012] motion-reduce:transform-none motion-reduce:transition-none [&>span]:hidden"
                />
              </div>

              <div className="mt-5 grid grid-cols-[minmax(0,1fr)_2.75rem] items-end gap-5">
                <div>
                  <p className="mono-label text-[var(--color-graphite)]">
                    {featuredInsight.category} / {featuredInsight.readingTime}{" "}
                    min read
                  </p>
                  <h3 className="mt-3 max-w-[19ch] text-[clamp(2rem,3vw,3.25rem)] leading-[1] tracking-[-0.03em] transition-colors group-hover:text-blue-700">
                    {featuredInsight.title.en}
                  </h3>
                </div>
                <span className="arrow-cta transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none">
                  <ArrowUpRightIcon className="size-4" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </article>

          <div className="grid lg:grid-rows-2">
            {supportingInsights.map((insight, index) => (
              <article
                key={insight.slug}
                className={
                  index === 0
                    ? "border-b border-[var(--color-abyssal-ink)]"
                    : undefined
                }
              >
                <Link
                  href={`/insights/${insight.slug}`}
                  className="group grid h-full min-h-40 grid-cols-[minmax(0,1fr)_2.75rem] items-end gap-5 py-6 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-bioluminescent-lime)] focus-visible:ring-inset lg:px-8"
                >
                  <div>
                    <p className="mono-label text-[var(--color-graphite)]">
                      {insight.category} / {insight.readingTime} min read
                    </p>
                    <h3 className="mt-3 max-w-[23ch] text-[clamp(1.55rem,2vw,2.15rem)] leading-[1.04] tracking-[-0.025em] transition-colors group-hover:text-blue-700">
                      {insight.title.en}
                    </h3>
                  </div>
                  <span className="grid size-11 place-items-center text-[var(--color-graphite)] transition-colors group-hover:text-blue-700">
                    <ArrowUpRightIcon
                      className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
