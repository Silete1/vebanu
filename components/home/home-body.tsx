import { ArrowUpRightIcon } from "lucide-react"

import { HomeScrollMotion } from "@/components/home/home-scroll-motion"
import { Container } from "@/components/layout/container"
import { MethodCardStack } from "@/components/method/method-card-stack"
import { PlatformMacbookShowcase } from "@/components/platform/platform-macbook-showcase"
import { IndustriesAccordionShowcase } from "@/components/industries/industries-accordion-showcase"
import { Button } from "@/components/ui/button"

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
    title: "Assess current operations",
    text: "Map workflows, gaps, approvals, documents, reports, data sources, and decision points.",
  },
  {
    title: "Redesign the control model",
    text: "Define roles, permissions, stages, approval logic, inventory rules, finance links, and reporting structure.",
  },
  {
    title: "Configure Odoo",
    text: "Implement modules, workflows, dashboards, automations, integrations, access rights, and management reports.",
  },
  {
    title: "Train and stabilize",
    text: "Train key users, support go-live, monitor issues, refine configuration, and stabilize daily operation.",
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

const assessmentPoints = [
  "Workflow and approval review",
  "Inventory and warehouse control review",
  "Sales, purchasing, and collections review",
  "Finance and reporting visibility review",
  "Data quality and access-rights review",
  "Odoo readiness and implementation roadmap",
]

export function HomeBody() {
  return (
    <>
      <HomeScrollMotion />
      <IntroSection />
      <WorkCardsSection />
      <MethodSection />
      <PlatformSection />
      <IndustriesSection />
      <AssessmentSection />
      <InsightSection />
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

function IntroSection() {
  return (
    <section
      id="work"
      className="relative h-[250svh] bg-[var(--color-abyssal-ink)] text-white"
      data-motion-story
      data-header-theme="dark"
    >
      <div
        className="hero-lab-visual sticky top-0 flex h-svh overflow-hidden"
        data-lab-visual
      >
        <div className="hero-bg-motion" data-hero-bg aria-hidden="true" />
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
                    <h2 className="max-w-4xl text-[clamp(2.4rem,4.1vw,4rem)] leading-[1.06] tracking-[-0.03em] text-white/76">
                      {step.title}
                    </h2>
                    <p className="mt-10 max-w-3xl text-[clamp(1.1rem,1.55vw,1.45rem)] leading-[1.22] tracking-[-0.02em] text-white/88">
                      {step.text}
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
      className="bg-[var(--color-abyssal-ink)] py-24 text-white lg:py-32"
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
      className="bg-[var(--color-bone-white)] py-24 lg:py-32 overflow-hidden"
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
            system when implemented around the company&apos;s real operating model.
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
      className="bg-[var(--color-bone-white)] py-24 lg:py-32 overflow-hidden"
      data-reveal-section
      data-header-theme="light"
    >
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <SectionLabel>04 / INDUSTRIES</SectionLabel>
          <h2 className="section-headline mt-6">
            Built for companies where operational control matters.
          </h2>
          <p className="body-copy mx-auto mt-6 max-w-2xl text-[var(--color-graphite)]">
            We scope, design, and govern Odoo implementations specifically tailored to complex operational sectors with physical inventory, multi-location execution, and strict financial compliance.
          </p>
        </div>

        <IndustriesAccordionShowcase />
      </Container>
    </section>
  )
}

function AssessmentSection() {
  return (
    <section
      id="assessment"
      className="bg-[var(--color-tissue)] py-24 lg:py-32"
      data-reveal-section
      data-header-theme="light"
    >
      <Container>
        <div className="rounded-[40px] border border-[var(--color-lichen)] bg-white p-8 md:p-12">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_420px]">
            <div>
              <SectionLabel>05 / ASSESSMENT</SectionLabel>
              <h2 className="section-headline mt-10 max-w-3xl">
                Before implementation, we identify where control breaks.
              </h2>
              <p className="body-copy mt-8 max-w-3xl text-[var(--color-graphite)]">
                ANU starts with a Business Control Assessment. The assessment
                reviews how work moves through the company, where approvals
                fail, where stock becomes unclear, where finance loses
                visibility, and where management depends on manual follow-up
                instead of system evidence.
              </p>
              <Button className="mt-10" size="lg">
                START ASSESSMENT
              </Button>
            </div>
            <div className="grid gap-3">
              {assessmentPoints.map((point, index) => (
                <div
                  key={point}
                  className="flex items-center gap-4 rounded-xl border border-[var(--color-lichen)] px-4 py-4"
                >
                  <span className="mono-label text-[var(--color-graphite)]">
                    0{index + 1}
                  </span>
                  <p className="text-lg leading-6">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function InsightSection() {
  return (
    <section
      id="insights"
      className="bg-[var(--color-bone-white)] py-24 lg:py-32"
      data-reveal-section
      data-header-theme="light"
    >
      <Container>
        <article className="flat-card grid gap-8 rounded-[40px] p-6 md:grid-cols-[0.95fr_1.05fr] md:p-10">
          <InsightDiagram />
          <div className="flex flex-col justify-center py-4">
            <p className="mono-label tag-dot flex items-center gap-2 text-[var(--color-graphite)]">
              OPERATING MODEL / 2026
            </p>
            <h2 className="section-headline mt-10 max-w-3xl">
              Your ERP fails when the process is not designed first.
            </h2>
            <p className="body-copy mt-8 text-[var(--color-graphite)]">
              Software does not fix unclear approvals, weak inventory
              discipline, disconnected accounting, manual reporting, or
              undocumented responsibility. ERP works when the business control
              model is defined before configuration starts.
            </p>
            <a
              href="#work"
              className="mono-label mt-10 inline-flex items-center gap-3 text-[var(--color-abyssal-ink)]"
            >
              READ INSIGHT
              <span className="arrow-cta">
                <ArrowUpRightIcon className="size-4" />
              </span>
            </a>
          </div>
        </article>
      </Container>
    </section>
  )
}

function InsightDiagram() {
  return (
    <div
      className="min-h-[420px] rounded-2xl border border-[var(--color-graphite)] bg-[var(--color-abyssal-ink)] p-5"
      data-insight-image
    >
      <div className="grid h-full grid-cols-6 grid-rows-6 gap-3">
        {Array.from({ length: 36 }).map((_, index) => (
          <span
            key={index}
            className={`rounded-md border border-[var(--color-graphite)] ${
              [7, 8, 14, 21, 27, 28].includes(index)
                ? "bg-[var(--color-bioluminescent-lime)]"
                : [2, 12, 18, 25, 32].includes(index)
                  ? "bg-white/10"
                  : "bg-transparent"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
