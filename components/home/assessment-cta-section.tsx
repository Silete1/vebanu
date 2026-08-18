import Link from "next/link"
import { ArrowUpRightIcon, MessageCircleIcon, PhoneIcon } from "lucide-react"

import { AssessmentForm } from "@/components/home/assessment-form"
import { Container } from "@/components/layout/container"
import { anuContact } from "@/lib/contact"

type ContactChoiceProps = {
  href: string
  icon: typeof MessageCircleIcon
  label: string
  detail: string
  external?: boolean
}

function ContactChoice({
  href,
  icon: Icon,
  label,
  detail,
  external = false,
}: ContactChoiceProps) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group flex min-h-20 items-center gap-4 px-1 py-4 transition-colors duration-200 outline-none hover:text-blue-700 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4 focus-visible:ring-offset-white motion-reduce:transition-none"
    >
      <span className="grid size-10 shrink-0 place-items-center text-blue-700">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="text-lg tracking-[-0.02em]">{label}</span>
        <span className="text-sm text-slate-600">{detail}</span>
      </span>
      <ArrowUpRightIcon
        className="size-4 shrink-0 text-slate-500 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-700 motion-reduce:transform-none motion-reduce:transition-none"
        aria-hidden="true"
      />
    </Link>
  )
}

export function AssessmentCtaSection() {
  return (
    <section
      id="assessment"
      className="bg-[var(--color-bone-white)] py-16 sm:py-20 lg:py-28"
      data-header-theme="light"
      aria-labelledby="assessment-title"
    >
      <Container className="max-w-[1120px]">
        <header className="max-w-3xl">
          <h2
            id="assessment-title"
            className="text-[clamp(3rem,6vw,5.5rem)] leading-[0.94] tracking-[-0.04em]"
          >
            Start your assessment.
          </h2>
        </header>

        <div className="mt-10 grid overflow-hidden rounded-[20px] bg-white shadow-[0_30px_70px_-48px_rgba(9,11,17,0.28)] lg:grid-cols-[1.15fr_0.85fr]">
          <div
            className="bg-white p-6 sm:p-8 lg:p-10"
            data-assessment-contact-panel
          >
            <div className="mb-7 text-center">
              <h3 className="text-[clamp(1.75rem,3vw,2.5rem)] tracking-[-0.03em]">
                Start with ANU
              </h3>
            </div>
            <AssessmentForm />
          </div>

          <aside className="border-t border-[var(--color-lichen)] bg-white p-6 sm:p-8 lg:border-t-0 lg:border-l lg:p-10">
            <div>
              <h3 className="text-[clamp(1.75rem,3vw,2.5rem)] tracking-[-0.03em]">
                Talk now
              </h3>
            </div>

            <nav
              className="mt-7 divide-y divide-[var(--color-lichen)] border-y border-[var(--color-lichen)]"
              aria-label="Direct assessment contact options"
            >
              <ContactChoice
                href={anuContact.whatsappHref}
                icon={MessageCircleIcon}
                label="Start on WhatsApp"
                detail="Open a message"
                external
              />
              <ContactChoice
                href={anuContact.phoneHref}
                icon={PhoneIcon}
                label="Call ANU"
                detail={anuContact.phoneDisplay}
              />
            </nav>

            <p className="mt-7 max-w-sm text-sm leading-6 text-slate-600">
              Start with the operational challenge that matters most.
            </p>
          </aside>
        </div>
      </Container>
    </section>
  )
}
