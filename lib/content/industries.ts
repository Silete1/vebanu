export const industrySlugs = [
  "distribution",
  "manufacturing",
  "retail",
  "logistics",
  "healthcare",
] as const

export type IndustrySlug = (typeof industrySlugs)[number]

export type RelatedInsightSlug =
  | "why-business-problems-persist-after-erp-implementation"
  | "inventory-accuracy-is-an-operating-discipline"
  | "what-owners-should-see-in-a-management-dashboard"
  | "from-whatsapp-approvals-to-controlled-business-processes"
  | "when-odoo-customization-solves-the-wrong-problem"
  | "how-process-mapping-reduces-erp-implementation-risk"
  | "the-cost-of-running-without-a-single-source-of-truth"
  | "why-digital-transformation-fails-without-operational-ownership"

type FourItems<T> = readonly [T, T, T, T]

export type IndustryProblem = {
  title: string
  description: string
}

export type IndustryWorkflowStage = {
  name: string
  description: string
}

export type OdooCapabilityMapping = {
  need: string
  capabilities: readonly string[]
  application: string
}

export type IndustryBuyerQuestion = {
  question: string
  answer: string
}

export type Industry = {
  slug: IndustrySlug
  href: `/industries/${IndustrySlug}`
  name: string
  shortName: string
  cardDescription: string
  metadata: {
    title: string
    description: string
    canonicalPath: `/industries/${IndustrySlug}`
    primaryKeyword: string
    secondaryKeywords: readonly string[]
  }
  hero: {
    eyebrow: string
    title: string
    description: string
  }
  directAnswer: string
  problems: FourItems<IndustryProblem>
  workflow: {
    title: string
    description: string
    stages: readonly IndustryWorkflowStage[]
  }
  odooCapabilities: readonly OdooCapabilityMapping[]
  buyerQuestions: FourItems<IndustryBuyerQuestion>
  relatedInsightSlugs: readonly RelatedInsightSlug[]
  visual: {
    imageUrl: string
    description: string
    alt: string
  }
}

export const industries: readonly Industry[] = [
  {
    slug: "distribution",
    href: "/industries/distribution",
    name: "Distribution and Wholesale",
    shortName: "Distribution & wholesale",
    cardDescription:
      "Connect purchasing, warehouse movement, fulfilment, margins and collections.",
    metadata: {
      title: "Distribution ERP and Odoo in Iraq | ANU",
      description:
        "ANU designs distribution workflows and implements Odoo ERP for purchasing, warehouse control, sales, fulfilment, margins and collections in Iraq.",
      canonicalPath: "/industries/distribution",
      primaryKeyword: "distribution ERP Iraq",
      secondaryKeywords: [
        "Odoo for distributors",
        "wholesale ERP Iraq",
        "warehouse management system Iraq",
      ],
    },
    hero: {
      eyebrow: "Distribution and wholesale",
      title: "Control every movement from purchase order to collection.",
      description:
        "ANU connects procurement, stock, pricing, fulfilment and finance so teams work from the same operational record.",
    },
    directAnswer:
      "ANU helps distribution and wholesale companies define accountable order-to-cash and procure-to-stock workflows, then implements those controls in Odoo. The goal is reliable stock evidence, governed commercial decisions and clearer visibility across warehouses and finance.",
    problems: [
      {
        title: "Purchasing reacts too late",
        description:
          "Demand signals, supplier lead times and available stock are reviewed in separate files or conversations.",
      },
      {
        title: "Stock movement lacks evidence",
        description:
          "Receipts, transfers, reservations and adjustments do not consistently identify what moved, when and who approved it.",
      },
      {
        title: "Commercial exceptions are informal",
        description:
          "Price changes, discounts and credit decisions happen outside a visible approval path.",
      },
      {
        title: "Delivery and finance lose the handoff",
        description:
          "Delivered quantities, invoices, returns and collection follow-up are difficult to reconcile as one flow.",
      },
    ],
    workflow: {
      title: "A controlled distribution flow",
      description:
        "The workflow links demand, physical movement and financial evidence without adding unnecessary approvals.",
      stages: [
        {
          name: "Plan demand",
          description:
            "Review sales demand, available stock, committed quantities and supplier lead times.",
        },
        {
          name: "Procure",
          description:
            "Raise and approve purchase requirements against defined supplier and budget rules.",
        },
        {
          name: "Receive",
          description:
            "Verify quantities and exceptions before stock becomes available for allocation.",
        },
        {
          name: "Allocate and pick",
          description:
            "Reserve confirmed stock and record accountable warehouse preparation.",
        },
        {
          name: "Deliver and invoice",
          description:
            "Connect fulfilment evidence, returns and customer invoicing.",
        },
        {
          name: "Collect and review",
          description:
            "Track receivables, credit exposure, margin exceptions and unresolved orders.",
        },
      ],
    },
    odooCapabilities: [
      {
        need: "Purchasing and replenishment",
        capabilities: ["Purchase", "Inventory"],
        application:
          "Connect approved requirements, supplier orders, expected receipts and stock availability.",
      },
      {
        need: "Warehouse control",
        capabilities: ["Inventory", "Barcode"],
        application:
          "Structure locations, receipts, transfers, reservations, counts and governed adjustments.",
      },
      {
        need: "Pricing and order control",
        capabilities: ["Sales", "Approvals"],
        application:
          "Apply defined price lists and route material commercial exceptions for review.",
      },
      {
        need: "Invoicing and collections",
        capabilities: ["Invoicing", "Accounting"],
        application:
          "Link delivered orders to invoices, credit notes and receivables follow-up.",
      },
    ],
    buyerQuestions: [
      {
        question: "Can Odoo manage more than one warehouse?",
        answer:
          "Yes. The design can represent multiple warehouses, internal locations and transfer rules, provided the physical process and ownership are defined first.",
      },
      {
        question: "Will an ERP fix inaccurate inventory?",
        answer:
          "Software alone will not. Accuracy depends on controlled receiving, movement, counting and adjustment practices implemented with the system.",
      },
      {
        question: "Can discounts and credit limits require approval?",
        answer:
          "They can be governed through roles, thresholds and exception workflows matched to the company policy.",
      },
      {
        question: "Where should a distribution implementation begin?",
        answer:
          "Begin with the highest-risk flow, usually purchasing and inventory or order-to-cash, then expand from stable master data and controls.",
      },
    ],
    relatedInsightSlugs: [
      "inventory-accuracy-is-an-operating-discipline",
      "the-cost-of-running-without-a-single-source-of-truth",
      "from-whatsapp-approvals-to-controlled-business-processes",
    ],
    visual: {
      imageUrl:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=82",
      description:
        "A working warehouse aisle with stored goods and material-handling equipment, used to ground the page in physical distribution operations.",
      alt: "Warehouse aisle with palletized goods prepared for distribution",
    },
  },
  {
    slug: "manufacturing",
    href: "/industries/manufacturing",
    name: "Light Manufacturing",
    shortName: "Light manufacturing",
    cardDescription:
      "Connect materials, production work, quality evidence and actual cost.",
    metadata: {
      title: "Manufacturing ERP and Odoo in Iraq | ANU",
      description:
        "ANU designs light manufacturing workflows and implements Odoo for planning, materials, production, quality, maintenance and cost visibility in Iraq.",
      canonicalPath: "/industries/manufacturing",
      primaryKeyword: "manufacturing ERP Iraq",
      secondaryKeywords: [
        "Odoo manufacturing Iraq",
        "production planning system",
        "manufacturing inventory management",
      ],
    },
    hero: {
      eyebrow: "Light manufacturing",
      title: "Make materials, production and cost tell the same story.",
      description:
        "ANU turns production rules into a traceable operating flow from demand and material planning through completion and financial review.",
    },
    directAnswer:
      "ANU helps light manufacturers define how products, materials, work orders, quality checks and costs should move together, then configures Odoo around that operating model. The implementation creates a clearer record of what was planned, consumed, produced and reviewed.",
    problems: [
      {
        title: "Planning is disconnected from demand",
        description:
          "Production priorities are set without one dependable view of orders, available materials and capacity constraints.",
      },
      {
        title: "Product definitions drift",
        description:
          "Bills of materials, routings and revisions differ between spreadsheets, supervisors and the shop floor.",
      },
      {
        title: "Consumption and work remain unclear",
        description:
          "Material usage, scrap, work progress and completed quantities are recorded late or without sufficient evidence.",
      },
      {
        title: "Cost cannot be traced to operations",
        description:
          "Managers struggle to connect purchasing, consumption, labour assumptions and production exceptions to financial review.",
      },
    ],
    workflow: {
      title: "A controlled manufacturing flow",
      description:
        "The sequence establishes stable product data before production transactions and reporting are automated.",
      stages: [
        {
          name: "Confirm demand",
          description:
            "Translate confirmed requirements into a visible production and material plan.",
        },
        {
          name: "Define the product",
          description:
            "Govern bills of materials, routings, units and approved revisions.",
        },
        {
          name: "Plan materials",
          description:
            "Check availability, expected receipts and procurement needs before release.",
        },
        {
          name: "Schedule work",
          description:
            "Release accountable work orders against available resources and priorities.",
        },
        {
          name: "Consume and produce",
          description:
            "Record material consumption, output, scrap and operational exceptions when they occur.",
        },
        {
          name: "Check and release",
          description:
            "Capture required quality evidence before finished goods become available.",
        },
        {
          name: "Review cost",
          description:
            "Reconcile production activity with inventory value and financial reporting.",
        },
      ],
    },
    odooCapabilities: [
      {
        need: "Product and production control",
        capabilities: ["Manufacturing", "PLM"],
        application:
          "Govern bills of materials, routings, work orders and product changes where revision control is required.",
      },
      {
        need: "Material availability",
        capabilities: ["Inventory", "Purchase"],
        application:
          "Connect component demand with on-hand stock, expected receipts and approved purchasing.",
      },
      {
        need: "Quality and equipment support",
        capabilities: ["Quality", "Maintenance"],
        application:
          "Record defined checks and maintenance activity when these controls are part of the operating scope.",
      },
      {
        need: "Cost and financial review",
        capabilities: ["Manufacturing", "Inventory", "Accounting"],
        application:
          "Connect production transactions and inventory valuation to financial review based on the agreed costing method.",
      },
    ],
    buyerQuestions: [
      {
        question: "Is Odoo suitable for light manufacturing?",
        answer:
          "It can support bills of materials, work orders, material movement and related controls when the production model fits the agreed implementation scope.",
      },
      {
        question: "Do we need perfect production data before starting?",
        answer:
          "No, but product, unit, bill-of-material and routing decisions must be cleaned and governed before reliable transactions can follow.",
      },
      {
        question: "Can the system show actual production cost?",
        answer:
          "It can provide cost evidence from configured material, inventory and production transactions; the result depends on disciplined recording and the chosen costing method.",
      },
      {
        question: "Should manufacturing be implemented all at once?",
        answer:
          "Usually not. A controlled product family or production flow is safer for validating data, roles and shop-floor practices before broader rollout.",
      },
    ],
    relatedInsightSlugs: [
      "how-process-mapping-reduces-erp-implementation-risk",
      "inventory-accuracy-is-an-operating-discipline",
      "when-odoo-customization-solves-the-wrong-problem",
    ],
    visual: {
      imageUrl:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=82",
      description:
        "A technician working with production equipment, representing accountable work, material use and operational evidence in light manufacturing.",
      alt: "Technician operating equipment in a light manufacturing facility",
    },
  },
  {
    slug: "retail",
    href: "/industries/retail",
    name: "Multi-Branch Retail",
    shortName: "Multi-branch retail",
    cardDescription:
      "Unify branch sales, inventory, transfers, closing and financial visibility.",
    metadata: {
      title: "Multi-Branch Retail ERP and Odoo in Iraq | ANU",
      description:
        "ANU designs multi-branch retail workflows and implements Odoo for POS, purchasing, stock, transfers, returns, reconciliation and finance in Iraq.",
      canonicalPath: "/industries/retail",
      primaryKeyword: "retail ERP Iraq",
      secondaryKeywords: [
        "Odoo POS Iraq",
        "multi-branch retail system",
        "retail inventory management Iraq",
      ],
    },
    hero: {
      eyebrow: "Multi-branch retail",
      title: "Run every branch from one accountable operating model.",
      description:
        "ANU connects purchasing, stock, transfers, point of sale, returns and finance without removing the practical autonomy each branch needs.",
    },
    directAnswer:
      "ANU helps multi-branch retailers standardize how products, stock, prices, sales, returns and daily closing are controlled, then implements those rules in Odoo. Owners gain a consistent operational record across locations without relying on separate branch files.",
    problems: [
      {
        title: "Each branch keeps a different truth",
        description:
          "Product records, counts and daily reports vary by location, making comparison and consolidation difficult.",
      },
      {
        title: "Transfers hide availability",
        description:
          "Stock moves between branches without timely dispatch, receipt or exception evidence.",
      },
      {
        title: "Price and return exceptions spread",
        description:
          "Discounts, refunds and adjustments are applied without consistent thresholds or review.",
      },
      {
        title: "Closing reaches finance late",
        description:
          "Sales, payment methods, cash differences and stock effects require manual reconciliation after the day ends.",
      },
    ],
    workflow: {
      title: "A controlled retail flow",
      description:
        "The workflow keeps product and stock decisions connected to each sale and its financial evidence.",
      stages: [
        {
          name: "Plan the range",
          description:
            "Govern products, units, prices and branch availability rules from shared master data.",
        },
        {
          name: "Buy and receive",
          description:
            "Approve purchasing and verify receipts before stock is available to branches.",
        },
        {
          name: "Replenish and transfer",
          description:
            "Move stock between central and branch locations with dispatch and receipt evidence.",
        },
        {
          name: "Sell",
          description:
            "Record products, prices, discounts and payment methods at the point of sale.",
        },
        {
          name: "Return or adjust",
          description:
            "Apply defined reasons, permissions and stock treatment to returns and corrections.",
        },
        {
          name: "Close and review",
          description:
            "Reconcile sessions, payments, stock exceptions and branch performance for finance and management.",
        },
      ],
    },
    odooCapabilities: [
      {
        need: "Branch sales",
        capabilities: ["Point of Sale", "Sales"],
        application:
          "Apply shared product and price rules while preserving a clear transaction record for each branch.",
      },
      {
        need: "Stock and transfers",
        capabilities: ["Inventory", "Barcode"],
        application:
          "Structure central and branch locations, transfers, receipts, counts and controlled adjustments.",
      },
      {
        need: "Purchasing and replenishment",
        capabilities: ["Purchase", "Inventory"],
        application:
          "Connect approved orders and incoming stock with replenishment decisions across locations.",
      },
      {
        need: "Closing and finance",
        capabilities: ["Point of Sale", "Accounting"],
        application:
          "Connect sales sessions, payment evidence, invoices where required and financial reconciliation.",
      },
    ],
    buyerQuestions: [
      {
        question: "Can Odoo manage multiple retail branches?",
        answer:
          "Yes. Branch locations, points of sale, stock and permissions can be structured within one operating model or a suitable multi-company design.",
      },
      {
        question: "Can each branch have different prices?",
        answer:
          "Price lists and controlled commercial rules can be configured by the agreed customer, product, channel or location policy.",
      },
      {
        question: "How are branch transfers controlled?",
        answer:
          "A transfer should record the source, destination, dispatched quantity, received quantity, responsible roles and any exception.",
      },
      {
        question: "Does a POS implementation replace daily closing controls?",
        answer:
          "No. The system supports closing, but management must still define session ownership, cash handling, variance review and escalation.",
      },
    ],
    relatedInsightSlugs: [
      "inventory-accuracy-is-an-operating-discipline",
      "what-owners-should-see-in-a-management-dashboard",
      "the-cost-of-running-without-a-single-source-of-truth",
    ],
    visual: {
      imageUrl:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=82",
      description:
        "A modern retail interior with visible merchandise and aisles, representing the branch environment where sales and stock records meet.",
      alt: "Organized retail store interior with merchandise on display",
    },
  },
  {
    slug: "logistics",
    href: "/industries/logistics",
    name: "Logistics and Service Operations",
    shortName: "Logistics & service ops",
    cardDescription:
      "Connect service intake, planning, dispatch, execution evidence and billing.",
    metadata: {
      title: "Logistics Operations ERP and Odoo in Iraq | ANU",
      description:
        "ANU designs logistics and service workflows and implements Odoo for requests, planning, dispatch, execution evidence, invoicing and reporting in Iraq.",
      canonicalPath: "/industries/logistics",
      primaryKeyword: "logistics ERP Iraq",
      secondaryKeywords: [
        "Odoo logistics Iraq",
        "service operations management",
        "dispatch workflow system",
      ],
    },
    hero: {
      eyebrow: "Logistics and service operations",
      title: "Keep every request visible from intake to invoice.",
      description:
        "ANU connects commercial commitments, planning, assignments, execution evidence and billing in one accountable flow.",
    },
    directAnswer:
      "ANU helps logistics and service organizations define how requests are accepted, planned, assigned, completed, evidenced and billed, then implements the agreed controls in Odoo. The scope is shaped around the actual service model rather than a generic dispatch screen.",
    problems: [
      {
        title: "Requests enter through many channels",
        description:
          "Calls, messages and spreadsheets create duplicate work and leave service commitments unclear.",
      },
      {
        title: "Planning depends on personal follow-up",
        description:
          "Assignments, capacity, deadlines and changes are coordinated by individuals without one visible queue.",
      },
      {
        title: "Completion lacks evidence",
        description:
          "Teams cannot consistently connect completed work to time, responsible staff, documents or customer confirmation.",
      },
      {
        title: "Billing waits for reconstruction",
        description:
          "Finance must chase operational details before an invoice can be prepared, checked or explained.",
      },
    ],
    workflow: {
      title: "A controlled service flow",
      description:
        "The workflow preserves speed while making commitments, handoffs and exceptions traceable.",
      stages: [
        {
          name: "Capture the request",
          description:
            "Create one accountable record of the customer need, location, timing and source.",
        },
        {
          name: "Qualify the commitment",
          description:
            "Confirm scope, commercial terms, required evidence and service conditions.",
        },
        {
          name: "Plan and assign",
          description:
            "Allocate responsible people, resources and time against visible capacity and priority.",
        },
        {
          name: "Execute",
          description:
            "Record progress, changes, consumed items and operational exceptions as work occurs.",
        },
        {
          name: "Confirm completion",
          description:
            "Attach the agreed evidence and route unresolved issues before closure.",
        },
        {
          name: "Invoice and review",
          description:
            "Generate billing from approved work and review delays, exceptions and service performance.",
        },
      ],
    },
    odooCapabilities: [
      {
        need: "Request and commercial control",
        capabilities: ["CRM", "Sales"],
        application:
          "Connect customer needs, quotations, commitments and handoff to operational planning.",
      },
      {
        need: "Planning and execution",
        capabilities: ["Planning", "Field Service", "Project"],
        application:
          "Select and configure the capabilities that match the actual assignment and delivery model.",
      },
      {
        need: "Completion evidence",
        capabilities: ["Field Service", "Documents", "Sign"],
        application:
          "Capture the documents, confirmations and exceptions required before a job is closed.",
      },
      {
        need: "Billing and review",
        capabilities: ["Invoicing", "Accounting"],
        application:
          "Connect approved services and chargeable items to invoicing and financial follow-up.",
      },
    ],
    buyerQuestions: [
      {
        question: "Is this a transport management system?",
        answer:
          "Not necessarily. The design focuses on service and logistics workflows; specialized fleet, routing or carrier needs must be assessed before selecting the final architecture.",
      },
      {
        question: "Can field teams update work from mobile devices?",
        answer:
          "Relevant Odoo workflows can be accessed through supported mobile or browser experiences, subject to connectivity, role and process requirements.",
      },
      {
        question: "Can billing start from completed work?",
        answer:
          "Yes, when the commercial rule and completion evidence are clearly defined and configured as part of the workflow.",
      },
      {
        question: "What should be mapped before implementation?",
        answer:
          "Map request sources, service promises, assignment rules, evidence, exceptions, chargeable events and financial handoffs.",
      },
    ],
    relatedInsightSlugs: [
      "from-whatsapp-approvals-to-controlled-business-processes",
      "how-process-mapping-reduces-erp-implementation-risk",
      "why-digital-transformation-fails-without-operational-ownership",
    ],
    visual: {
      imageUrl:
        "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1600&q=82",
      description:
        "A container and freight operation, representing the coordinated handoffs, evidence and timing required in logistics work.",
      alt: "Freight containers and handling equipment in a logistics terminal",
    },
  },
  {
    slug: "healthcare",
    href: "/industries/healthcare",
    name: "Healthcare Service Groups",
    shortName: "Healthcare service groups",
    cardDescription:
      "Control non-clinical purchasing, stock, maintenance, approvals and finance.",
    metadata: {
      title: "Healthcare Operations ERP and Odoo in Iraq | ANU",
      description:
        "ANU designs non-clinical healthcare workflows and implements Odoo for purchasing, inventory, maintenance, approvals and financial control in Iraq.",
      canonicalPath: "/industries/healthcare",
      primaryKeyword: "healthcare operations ERP Iraq",
      secondaryKeywords: [
        "Odoo for clinics Iraq",
        "clinic inventory management",
        "healthcare back-office system",
      ],
    },
    hero: {
      eyebrow: "Healthcare service groups",
      title: "Bring discipline to the operations behind patient service.",
      description:
        "ANU connects non-clinical purchasing, inventory, equipment support, approvals and finance across clinics and healthcare service locations.",
    },
    directAnswer:
      "ANU helps healthcare service groups improve non-clinical operational control, then implements appropriate back-office workflows in Odoo. The scope can include procurement, consumable stock, equipment maintenance, approvals and finance; it does not claim to replace clinical records, diagnostic or treatment systems.",
    problems: [
      {
        title: "Purchasing begins outside policy",
        description:
          "Urgent and routine requirements arrive through informal channels without consistent specification, budget or approval evidence.",
      },
      {
        title: "Consumable stock is hard to trust",
        description:
          "Receipts, issues, transfers and adjustments do not consistently show where non-clinical supplies moved.",
      },
      {
        title: "Equipment support is reactive",
        description:
          "Service history, planned maintenance and responsible follow-up are separated from the operational record.",
      },
      {
        title: "Management consolidates locations manually",
        description:
          "Approvals, purchasing, expenses and financial reporting are assembled after the fact across branches or clinics.",
      },
    ],
    workflow: {
      title: "A controlled non-clinical operations flow",
      description:
        "The workflow supports the administrative and resource processes around care without representing clinical decision-making.",
      stages: [
        {
          name: "Capture the requirement",
          description:
            "Record the requesting location, need, specification, priority and responsible role.",
        },
        {
          name: "Approve and procure",
          description:
            "Apply purchasing, budget and supplier rules appropriate to the requirement.",
        },
        {
          name: "Receive and store",
          description:
            "Verify non-clinical supplies and place them in controlled locations.",
        },
        {
          name: "Issue and replenish",
          description:
            "Record accountable movement to service locations and respond to defined replenishment signals.",
        },
        {
          name: "Maintain operational assets",
          description:
            "Plan and document approved maintenance activity for in-scope equipment and facilities.",
        },
        {
          name: "Reconcile and review",
          description:
            "Connect purchasing, stock, expenses and exceptions to financial and management review.",
        },
      ],
    },
    odooCapabilities: [
      {
        need: "Requests and purchasing",
        capabilities: ["Approvals", "Purchase"],
        application:
          "Route non-clinical requirements through defined approval and supplier processes.",
      },
      {
        need: "Consumable inventory",
        capabilities: ["Inventory", "Barcode"],
        application:
          "Control in-scope locations, receipts, issues, transfers, counts and adjustments.",
      },
      {
        need: "Equipment and facility support",
        capabilities: ["Maintenance", "Documents"],
        application:
          "Plan approved maintenance work and retain supporting operational records where appropriate.",
      },
      {
        need: "Back-office finance",
        capabilities: ["Invoicing", "Accounting"],
        application:
          "Connect in-scope purchasing and expenses to the agreed accounting and management reporting model.",
      },
    ],
    buyerQuestions: [
      {
        question: "Does ANU implement electronic medical records?",
        answer:
          "This industry offer is limited to non-clinical operational and back-office workflows unless a separate, validated clinical system scope is explicitly agreed.",
      },
      {
        question: "Can Odoo manage clinic supplies?",
        answer:
          "It can support controlled purchasing and inventory for agreed non-clinical or operational items. Regulatory and clinical traceability needs require separate assessment.",
      },
      {
        question: "Can several clinics share one operating view?",
        answer:
          "Locations can be structured for shared control and reporting, subject to the legal entities, permissions and accounting model involved.",
      },
      {
        question: "How is sensitive information handled?",
        answer:
          "Data scope, access, hosting, retention and compliance requirements must be defined before design. Unnecessary clinical or personal data should not enter a back-office workflow.",
      },
    ],
    relatedInsightSlugs: [
      "from-whatsapp-approvals-to-controlled-business-processes",
      "why-digital-transformation-fails-without-operational-ownership",
      "what-owners-should-see-in-a-management-dashboard",
    ],
    visual: {
      imageUrl:
        "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1600&q=82",
      description:
        "A clean healthcare service environment, used to represent the operational setting while avoiding clinical claims or identifiable patient imagery.",
      alt: "Clean healthcare service interior prepared for daily operations",
    },
  },
]

function localizeIndustry(industry: Industry, locale: Locale): Industry {
  if (locale === "en") return industry

  const translation = industriesAr[industry.slug]
  return {
    ...industry,
    ...translation,
    metadata: {
      ...industry.metadata,
      ...translation.metadata,
    },
    visual: {
      ...industry.visual,
      ...translation.visual,
    },
  }
}

export function getIndustry(
  slug: string,
  locale: Locale = "en"
): Industry | undefined {
  const industry = industries.find((item) => item.slug === slug)
  return industry ? localizeIndustry(industry, locale) : undefined
}

export function getIndustries(locale: Locale = "en"): readonly Industry[] {
  return industries.map((industry) => localizeIndustry(industry, locale))
}
import { industriesAr } from "@/lib/content/industries-ar"
import type { Locale } from "@/lib/i18n"
