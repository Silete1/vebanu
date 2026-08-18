import type { Metadata } from "next"
import Link from "next/link"

import { Container } from "@/components/layout/container"
import { PageShell } from "@/components/layout/page-shell"
import { buttonVariants } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Business Control & Odoo ERP Implementation | ANU Software Solutions",
  description:
    "ANU redesigns operating control, then implements Odoo ERP around workflows, approvals, inventory, finance, reporting, and management visibility.",
}

const services = [
  "Process redesign",
  "Odoo implementation",
  "Control dashboards",
  "Approval logic",
  "Inventory discipline",
  "Finance visibility",
]

export default function ServicesPage() {
  return (
    <PageShell>
      <section className="bg-[var(--color-abyssal-ink)] py-24 text-white lg:py-32">
        <Container>
          <p className="mono-label tag-dot flex items-center gap-2 text-white/64">
            Business Control & Odoo ERP Implementation
          </p>
          <h1 className="display-headline mt-10 max-w-[10ch]">
            We rebuild operating control.
          </h1>
          <p className="body-copy mt-10 max-w-3xl text-white/68">
            ANU assesses workflows, approvals, inventory, purchasing, sales,
            finance, reporting, operational gaps, data quality, permissions, and
            management visibility before configuring Odoo as the control
            platform.
          </p>
        </Container>
      </section>
      <section className="bg-[var(--color-bone-white)] py-24 lg:py-32">
        <Container>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article key={service} className="flat-card rounded-2xl p-10">
                <p className="mono-label tag-dot flex items-center gap-2 text-[var(--color-graphite)]">
                  SERVICE
                </p>
                <h2 className="mt-10 text-3xl leading-tight tracking-[-0.015em]">
                  {service}
                </h2>
              </article>
            ))}
          </div>
          <Link
            href="/#assessment"
            className={`${buttonVariants({ variant: "accent", size: "lg" })} mt-12`}
          >
            START ASSESSMENT
          </Link>
        </Container>
      </section>
    </PageShell>
  )
}
