import type { Locale } from "@/lib/i18n"

type HeroCta = {
  primary: string
  secondary: string
}

type HeroContent = {
  badge: string
  headline: string
  subheadline: string
  ctas: HeroCta
  trustItems: string[]
  architectureStack: string[]
}

type HomeVisualComparison = {
  title: string
  items: string[]
}

type ProblemContent = {
  badge: string
  title: string
  description: string
  manual: HomeVisualComparison
  controlled: HomeVisualComparison
}

export type MethodStep = {
  title: string
  description: string
}

export type MethodPhase = {
  key: "assess" | "design" | "activate"
  title: string
  subtitle: string
  steps: MethodStep[]
}

export type MethodContent = {
  badge: string
  title: string
  description: string
  principles: string[]
  phases?: MethodPhase[]
  steps?: MethodStep[]
}

export type ServiceKey =
  | "odoo"
  | "process"
  | "architecture"
  | "inventory"
  | "finance"
  | "sales"
  | "dashboard"
  | "integration"
  | "training"

export type ServiceItem = {
  key: ServiceKey
  title: string
  description: string
}

type ServicesContent = {
  badge: string
  title: string
  description: string
  items: ServiceItem[]
}

type IndustryKey =
  | "distribution"
  | "manufacturing"
  | "retail"
  | "logistics"
  | "healthcare"
  | "commerce"

type IndustryItem = {
  key: IndustryKey
  title: string
  description: string
}

type IndustriesContent = {
  badge: string
  title: string
  description: string
  items: IndustryItem[]
}

type DashboardKey =
  | "inventory"
  | "approvals"
  | "receivables"
  | "purchasing"
  | "sales"
  | "bottlenecks"

type DashboardRow = {
  label: string
  value: string
}

type DashboardCard = {
  key: DashboardKey
  title: string
  eyebrow: string
  description: string
  rows: DashboardRow[]
}

type DashboardContent = {
  badge: string
  title: string
  description: string
  cards: DashboardCard[]
}

type ResultItem = {
  title: string
  description: string
}

type ResultsContent = {
  badge: string
  title: string
  description: string
  items: ResultItem[]
}

type FinalCtaContent = {
  badge: string
  title: string
  description: string
  primaryCta: string
}

type HomeContent = {
  hero: HeroContent
  problem: ProblemContent
  method: MethodContent
  services: ServicesContent
  industries: IndustriesContent
  dashboard: DashboardContent
  results: ResultsContent
  finalCta: FinalCtaContent
}

export const homeContent: Record<Locale, HomeContent> = {
  en: {
    hero: {
      badge: "Enterprise Architecture + Odoo ERP",
      headline: "ERP implementation built on process architecture.",
      subheadline:
        "ANU Software Solutions redesigns how your company runs, then implements Odoo as the control platform for operations, finance, inventory, sales, and reporting.",
      ctas: {
        primary: "Request a Business Control Assessment",
        secondary: "See Our Method",
      },
      trustItems: [
        "Process redesign",
        "Workflow control",
        "Owner visibility",
      ],
      architectureStack: [
        "Business Capabilities",
        "Processes",
        "Controls",
        "Odoo Modules",
        "Dashboards",
        "Improvement Loop",
      ],
    },
    problem: {
      badge: "Why ERP programs stall",
      title: "Most ERP projects fail because the process was never designed.",
      description:
        "Companies do not only need software. They need clear workflows, approval rules, reliable data, and dashboards that show what is actually happening across operations.",
      manual: {
        title: "Manual follow-up",
        items: [
          "Requests move through calls, chats, and personal judgment.",
          "Approvals depend on who remembers to follow up.",
          "Inventory, finance, and sales do not share the same evidence.",
        ],
      },
      controlled: {
        title: "Controlled ERP workflow",
        items: [
          "Approvals move through defined steps with visible ownership.",
          "Odoo becomes the operating system for operational control.",
          "Dashboards show evidence instead of assumptions.",
        ],
      },
    },
    method: {
      badge: "Architecture before software",
      title: "Our method: Architecture before implementation.",
      description:
        "ANU assembles the operating model before system setup. We assess how the company runs, design the right control structure, and activate Odoo around that architecture.",
      principles: [
        "Enterprise Architecture defines what the business must control.",
        "Process redesign removes handoff confusion before system setup.",
        "Evidence keeps improvement measurable after go-live.",
      ],
      phases: [
        {
          key: "assess",
          title: "Assess",
          subtitle: "Understand how the company actually runs.",
          steps: [
            {
              title: "Discover how the company works",
              description:
                "Interview owners and operating teams to understand the current control model.",
            },
            {
              title: "Map capabilities and processes",
              description:
                "Translate daily work into business capabilities, workflows, roles, and handoffs.",
            },
            {
              title: "Identify control gaps",
              description:
                "Find missing approvals, weak reporting points, unreliable data sources, and unclear ownership.",
            },
          ],
        },
        {
          key: "design",
          title: "Design",
          subtitle: "Turn process evidence into a better operating model.",
          steps: [
            {
              title: "Redesign workflows",
              description:
                "Define future-state approval paths, roles, responsibilities, and operating rules.",
            },
            {
              title: "Configure Odoo",
              description:
                "Implement modules and structures that support the designed process instead of automating chaos.",
            },
          ],
        },
        {
          key: "activate",
          title: "Activate",
          subtitle: "Train, measure, and improve after go-live.",
          steps: [
            {
              title: "Train key users",
              description:
                "Prepare functional owners to run the system with confidence and discipline.",
            },
            {
              title: "Measure and improve",
              description:
                "Use dashboards and process evidence to refine control after launch.",
            },
          ],
        },
      ],
    },
    services: {
      badge: "Service scope",
      title: "Operational services built around business control.",
      description:
        "ANU does not start from modules alone. Each service is tied to control, visibility, approvals, and owner oversight.",
      items: [
        {
          key: "odoo",
          title: "Odoo ERP Implementation",
          description:
            "Configure Odoo around the process architecture the business actually needs.",
        },
        {
          key: "process",
          title: "Business Process Redesign",
          description:
            "Rebuild workflows, approvals, and handoffs before system automation hardens the wrong behavior.",
        },
        {
          key: "architecture",
          title: "Enterprise Architecture Assessment",
          description:
            "Map capabilities, ownership, and control dependencies across the company.",
        },
        {
          key: "inventory",
          title: "Inventory and Purchasing Control",
          description:
            "Set disciplined replenishment, warehouse visibility, and purchasing approvals.",
        },
        {
          key: "finance",
          title: "Accounting and Finance Workflows",
          description:
            "Align finance entries, receivables, payables, and approvals with operational evidence.",
        },
        {
          key: "sales",
          title: "Sales and CRM Automation",
          description:
            "Connect pipeline activity, quotations, and customer follow-up to accountable process steps.",
        },
        {
          key: "dashboard",
          title: "Operational Dashboards",
          description:
            "Build reporting views that help owners and managers see issues early.",
        },
        {
          key: "integration",
          title: "Integration and Automation",
          description:
            "Reduce duplicate entry and connect critical systems where evidence must flow cleanly.",
        },
        {
          key: "training",
          title: "Training and Support",
          description:
            "Develop internal confidence so teams can sustain the operating model after launch.",
        },
      ],
    },
    industries: {
      badge: "Industry fit",
      title: "Built for companies that need tighter operational control.",
      description:
        "The method is cross-functional, but the control priorities differ by industry. ANU structures the implementation around those realities.",
      items: [
        {
          key: "distribution",
          title: "Distribution and Wholesale",
          description:
            "Purchasing, warehouse movement, stock visibility, and margin control across fast-moving operations.",
        },
        {
          key: "manufacturing",
          title: "Light Manufacturing",
          description:
            "Production planning, material consumption, routing discipline, and costing visibility.",
        },
        {
          key: "retail",
          title: "Multi-Branch Retail",
          description:
            "Branch-level inventory, transfers, approvals, and owner-level visibility across locations.",
        },
        {
          key: "logistics",
          title: "Logistics and Service Operations",
          description:
            "Service requests, dispatch visibility, handoff control, and operational reporting.",
        },
        {
          key: "healthcare",
          title: "Healthcare and Clinics",
          description:
            "Controlled workflows, patient-facing operations, inventory discipline, and financial visibility.",
        },
        {
          key: "commerce",
          title: "E-commerce and Trading",
          description:
            "Order flow, fulfillment coordination, inventory reliability, and exception reporting.",
        },
      ],
    },
    dashboard: {
      badge: "Control dashboard",
      title: "A control surface for operations, finance, and reporting.",
      description:
        "The system should help managers detect delays, approval bottlenecks, and inventory risks without waiting for manual follow-up. The cards below use demo labels only.",
      cards: [
        {
          key: "inventory",
          eyebrow: "Demo inventory view",
          title: "Inventory visibility",
          description:
            "Monitor stock posture before late purchasing or branch shortages become operational problems.",
          rows: [
            { label: "Warehouse status", value: "Live view" },
            { label: "Reserved stock", value: "Flagged" },
            { label: "Delayed receipts", value: "Attention" },
          ],
        },
        {
          key: "approvals",
          eyebrow: "Demo workflow queue",
          title: "Approval status",
          description:
            "See which decisions are waiting, who owns them, and where the workflow slows down.",
          rows: [
            { label: "Purchase approvals", value: "Pending" },
            { label: "Finance review", value: "In queue" },
            { label: "Escalation path", value: "Defined" },
          ],
        },
        {
          key: "receivables",
          eyebrow: "Demo finance monitor",
          title: "Receivables",
          description:
            "Give finance and owners a clearer view of collection pressure and overdue follow-up.",
          rows: [
            { label: "Aging summary", value: "Tracked" },
            { label: "Collection owner", value: "Assigned" },
            { label: "Exception notes", value: "Recorded" },
          ],
        },
        {
          key: "purchasing",
          eyebrow: "Demo purchasing flow",
          title: "Purchase requests",
          description:
            "Track request status from need identification through approval and supplier action.",
          rows: [
            { label: "Open requests", value: "Visible" },
            { label: "Budget check", value: "Routed" },
            { label: "Supplier follow-up", value: "Scheduled" },
          ],
        },
        {
          key: "sales",
          eyebrow: "Demo pipeline board",
          title: "Sales pipeline",
          description:
            "Connect sales activity to measurable process stages rather than personal spreadsheets.",
          rows: [
            { label: "Quoted deals", value: "Tracked" },
            { label: "Approval-needed deals", value: "Tagged" },
            { label: "Forecast notes", value: "Updated" },
          ],
        },
        {
          key: "bottlenecks",
          eyebrow: "Demo exception map",
          title: "Operational bottlenecks",
          description:
            "Surface recurring delays so the business can act on evidence instead of anecdote.",
          rows: [
            { label: "Blocked handoffs", value: "Highlighted" },
            { label: "Repeat exceptions", value: "Logged" },
            { label: "Owner escalation", value: "Available" },
          ],
        },
      ],
    },
    results: {
      badge: "Expected outcomes",
      title: "Results framed around control, not marketing claims.",
      description:
        "ANU does not publish invented case studies. The value is communicated through realistic operational outcomes that a better-designed control system can support.",
      items: [
        {
          title: "Improved operational visibility",
          description:
            "Owners and managers can see what is delayed, blocked, or missing without chasing updates manually.",
        },
        {
          title: "Reduced manual follow-up",
          description:
            "Approvals and handoffs move through defined workflow instead of personal reminders.",
        },
        {
          title: "Faster reporting cycles",
          description:
            "Reporting depends less on spreadsheet assembly and more on process evidence in the system.",
        },
        {
          title: "Cleaner inventory and purchasing control",
          description:
            "Requests, stock decisions, and supplier actions become more visible and more accountable.",
        },
        {
          title: "Better owner-level oversight",
          description:
            "Leadership sees exceptions, approvals, and operating pressure earlier.",
        },
      ],
    },
    finalCta: {
      badge: "Assessment",
      title: "Want to know where your operations are losing control?",
      description:
        "Start with a business control assessment focused on process, approvals, inventory, finance, and reporting visibility.",
      primaryCta: "Request a Business Control Assessment",
    },
  },
  ar: {
    hero: {
      badge: "معمارية مؤسسية + Odoo ERP",
      headline: "تنفيذ ERP مبني على معمارية العمليات",
      subheadline:
        "ANU Software Solutions تعيد تصميم طريقة عمل شركتك، ثم تطبّق Odoo كمنصة سيطرة للعمليات، المالية، المخزون، المبيعات، والتقارير.",
      ctas: {
        primary: "اطلب تقييم السيطرة التشغيلية",
        secondary: "شاهد منهجيتنا",
      },
      trustItems: ["إعادة تصميم العمليات", "ضبط سير العمل", "رؤية المالك"],
      architectureStack: [
        "القدرات المؤسسية",
        "العمليات",
        "الضوابط",
        "وحدات Odoo",
        "لوحات القيادة",
        "حلقة التحسين",
      ],
    },
    problem: {
      badge: "لماذا تتعثر مشاريع ERP",
      title: "معظم مشاريع ERP تفشل لأن العملية لم تُصمَّم من الأساس.",
      description:
        "الشركات لا تحتاج إلى برنامج فقط. هي تحتاج إلى سير عمل واضح، وضوابط اعتماد، وبيانات موثوقة، ولوحات قيادة تُظهر ما يحدث فعلاً داخل العمليات.",
      manual: {
        title: "متابعة يدوية",
        items: [
          "الطلبات تتحرك عبر الاتصالات والرسائل والاجتهاد الشخصي.",
          "الموافقات تعتمد على التذكير والمتابعة الفردية.",
          "المخزون والمالية والمبيعات لا تعتمد على نفس الدليل التشغيلي.",
        ],
      },
      controlled: {
        title: "سير عمل مضبوط داخل ERP",
        items: [
          "الموافقات تمر عبر خطوات محددة ومسؤولية واضحة.",
          "يصبح Odoo منصة التشغيل والسيطرة على العمل.",
          "تعرض لوحات القيادة الأدلة بدل الافتراضات.",
        ],
      },
    },
    method: {
      badge: "المعمارية قبل النظام",
      title: "منهجيتنا: المعمارية قبل التنفيذ.",
      description:
        "تجمع ANU بين المعمارية المؤسسية، وتفكير النضج على أسلوب CMMI، وتهيئة Odoo، وتدريب المستخدمين، وأدلة العمليات حتى لا يتوقف التحسين عند لحظة الإطلاق.",
      principles: [
        "المعمارية المؤسسية تحدد ما يجب على الشركة أن تسيطر عليه.",
        "إعادة تصميم العمليات تزيل ارتباك التسليم قبل ضبط النظام.",
        "لوحات القيادة وأدلة العمليات تجعل التحسين قابلاً للقياس.",
      ],
      steps: [
        {
          title: "نفهم كيف تعمل الشركة",
          description:
            "نقابل الملاك والفرق التشغيلية لفهم نموذج السيطرة الحالي في العمل.",
        },
        {
          title: "نرسم القدرات والعمليات",
          description:
            "نحوّل العمل اليومي إلى قدرات مؤسسية وتدفقات عمل ونقاط تسليم واضحة.",
        },
        {
          title: "نحدد فجوات السيطرة",
          description:
            "نكتشف الموافقات الناقصة، وضعف التقارير، ومصادر البيانات غير الموثوقة.",
        },
        {
          title: "نعيد تصميم سير العمل",
          description:
            "نضع مسارات الموافقة المستقبلية والأدوار والقواعد التشغيلية المناسبة.",
        },
        {
          title: "نهيئ Odoo",
          description:
            "ننّفذ الوحدات والبُنى التي تدعم العملية المصممة فعلاً.",
        },
        {
          title: "ندرب المستخدمين الرئيسيين",
          description:
            "نجهز المسؤولين الوظيفيين لإدارة النظام بثقة وانضباط.",
        },
        {
          title: "نقيس ونحسن",
          description:
            "نستخدم لوحات القيادة وأدلة العمليات لتحسين السيطرة بعد الإطلاق.",
        },
      ],
    },
    services: {
      badge: "نطاق الخدمات",
      title: "خدمات تشغيلية مبنية حول السيطرة على العمل.",
      description:
        "ANU لا تبدأ من الوحدات فقط. كل خدمة ترتبط بالسيطرة، والرؤية، والموافقات، وإشراف المالك.",
      items: [
        {
          key: "odoo",
          title: "تنفيذ Odoo ERP",
          description:
            "تهيئة Odoo حول معمارية العمليات التي يحتاجها العمل فعلاً.",
        },
        {
          key: "process",
          title: "إعادة تصميم العمليات",
          description:
            "إعادة بناء التدفقات والموافقات ونقاط التسليم قبل أن يثبت النظام سلوكاً غير صحيح.",
        },
        {
          key: "architecture",
          title: "تقييم المعمارية المؤسسية",
          description:
            "رسم القدرات والمسؤوليات واعتمادات السيطرة عبر الشركة.",
        },
        {
          key: "inventory",
          title: "ضبط المخزون والمشتريات",
          description:
            "بناء إعادة تزويد منضبطة، ورؤية للمخزون، وموافقات واضحة للمشتريات.",
        },
        {
          key: "finance",
          title: "سير عمل المحاسبة والمالية",
          description:
            "ربط القيود، والذمم، والمدفوعات، والموافقات بأدلة تشغيلية واضحة.",
        },
        {
          key: "sales",
          title: "أتمتة المبيعات وCRM",
          description:
            "ربط نشاط المبيعات والعروض والمتابعة بمراحل عملية قابلة للمساءلة.",
        },
        {
          key: "dashboard",
          title: "لوحات القيادة التشغيلية",
          description:
            "بناء تقارير تساعد الملاك والمديرين على رؤية المشكلة مبكراً.",
        },
        {
          key: "integration",
          title: "التكامل والأتمتة",
          description:
            "تقليل الإدخال المكرر وربط الأنظمة الحرجة حيث يجب أن يتدفق الدليل التشغيلي.",
        },
        {
          key: "training",
          title: "التدريب والدعم",
          description:
            "تطوير قدرة داخلية تمكّن الفريق من الاستمرار بعد الإطلاق.",
        },
      ],
    },
    industries: {
      badge: "ملاءمة القطاعات",
      title: "مصمم للشركات التي تحتاج إلى سيطرة تشغيلية أدق.",
      description:
        "المنهجية عابرة للوظائف، لكن أولويات السيطرة تختلف من قطاع لآخر. ANU تبني التنفيذ حول هذه الفروق.",
      items: [
        {
          key: "distribution",
          title: "التوزيع والجملة",
          description:
            "المشتريات، وحركة المخزون، والرؤية داخل المستودعات، وضبط الهوامش في عمليات سريعة.",
        },
        {
          key: "manufacturing",
          title: "التصنيع الخفيف",
          description:
            "تخطيط الإنتاج، واستهلاك المواد، وانضباط المسارات، ورؤية التكلفة.",
        },
        {
          key: "retail",
          title: "التجزئة متعددة الفروع",
          description:
            "مخزون الفروع، والتحويلات، والموافقات، ورؤية المالك عبر المواقع.",
        },
        {
          key: "logistics",
          title: "اللوجستيات والخدمات",
          description:
            "طلبات الخدمة، ورؤية التنفيذ، وضبط التسليم، والتقارير التشغيلية.",
        },
        {
          key: "healthcare",
          title: "الرعاية الصحية والعيادات",
          description:
            "سير عمل مضبوط، وعمليات أمامية، وانضباط للمخزون، ورؤية مالية أوضح.",
        },
        {
          key: "commerce",
          title: "التجارة والتجارة الإلكترونية",
          description:
            "تدفق الطلبات، والتجهيز، وموثوقية المخزون، وتقارير الاستثناءات.",
        },
      ],
    },
    dashboard: {
      badge: "لوحة السيطرة",
      title: "سطح سيطرة للعمليات والمالية والتقارير.",
      description:
        "يجب أن يساعد النظام المديرين على اكتشاف التأخير واختناقات الموافقة ومخاطر المخزون من دون انتظار المتابعة اليدوية. البطاقات أدناه تستخدم مؤشرات تجريبية فقط.",
      cards: [
        {
          key: "inventory",
          eyebrow: "عرض تجريبي للمخزون",
          title: "رؤية المخزون",
          description:
            "راقب وضع المخزون قبل أن تتحول المشتريات المتأخرة أو نقص الفروع إلى مشكلة تشغيلية.",
          rows: [
            { label: "حالة المستودع", value: "عرض مباشر" },
            { label: "المخزون المحجوز", value: "معلَّم" },
            { label: "الواردات المتأخرة", value: "تحتاج انتباه" },
          ],
        },
        {
          key: "approvals",
          eyebrow: "طابور سير عمل تجريبي",
          title: "حالة الموافقات",
          description:
            "اعرف ما الذي ينتظر القرار، ومن المسؤول عنه، وأين يتباطأ التدفق.",
          rows: [
            { label: "موافقات المشتريات", value: "معلقة" },
            { label: "المراجعة المالية", value: "في الطابور" },
            { label: "مسار التصعيد", value: "محدد" },
          ],
        },
        {
          key: "receivables",
          eyebrow: "مؤشر مالي تجريبي",
          title: "الذمم المدينة",
          description:
            "أعطِ المالية والملاك رؤية أوضح لضغط التحصيل والمتابعة المتأخرة.",
          rows: [
            { label: "ملخص الأعمار", value: "متابع" },
            { label: "مسؤول التحصيل", value: "محدد" },
            { label: "ملاحظات الاستثناء", value: "مسجلة" },
          ],
        },
        {
          key: "purchasing",
          eyebrow: "مسار مشتريات تجريبي",
          title: "طلبات الشراء",
          description:
            "تابع حالة الطلب من تحديد الحاجة حتى الموافقة والتعامل مع المورد.",
          rows: [
            { label: "الطلبات المفتوحة", value: "مرئية" },
            { label: "فحص الميزانية", value: "محوّل" },
            { label: "متابعة المورد", value: "مجدولة" },
          ],
        },
        {
          key: "sales",
          eyebrow: "لوحة فرص تجريبية",
          title: "قمع المبيعات",
          description:
            "اربط نشاط المبيعات بمراحل عملية قابلة للقياس بدلاً من الجداول الشخصية.",
          rows: [
            { label: "العروض المرسلة", value: "متابعة" },
            { label: "الصفقات المحتاجة موافقة", value: "معلَّمة" },
            { label: "ملاحظات التوقع", value: "محدّثة" },
          ],
        },
        {
          key: "bottlenecks",
          eyebrow: "خريطة استثناءات تجريبية",
          title: "الاختناقات التشغيلية",
          description:
            "أظهر التأخيرات المتكررة حتى يتصرف العمل على أساس الدليل لا الانطباع.",
          rows: [
            { label: "التسليمات المعطلة", value: "مظللة" },
            { label: "الاستثناءات المتكررة", value: "مسجلة" },
            { label: "تصعيد للمالك", value: "متاح" },
          ],
        },
      ],
    },
    results: {
      badge: "نتائج متوقعة",
      title: "نتائج تُعرض بصياغة تشغيلية لا ادعاءات تسويقية.",
      description:
        "ANU لا تنشر قصص نجاح مختلقة. القيمة تُعرض من خلال نتائج تشغيلية واقعية يمكن لنظام سيطرة أفضل أن يدعمها.",
      items: [
        {
          title: "رؤية تشغيلية أفضل",
          description:
            "يستطيع الملاك والمديرون رؤية ما هو متأخر أو معطّل من دون مطاردة التحديثات يدوياً.",
        },
        {
          title: "متابعة يدوية أقل",
          description:
            "تتحرك الموافقات ونقاط التسليم عبر سير عمل واضح بدل التذكير الشخصي.",
        },
        {
          title: "دورات تقرير أسرع",
          description:
            "تصبح التقارير أقل اعتماداً على تجميع الجداول وأكثر اعتماداً على أدلة النظام.",
        },
        {
          title: "ضبط أنظف للمخزون والمشتريات",
          description:
            "تصبح الطلبات وقرارات المخزون وتحركات الموردين أكثر وضوحاً ومساءلة.",
        },
        {
          title: "إشراف أفضل على مستوى المالك",
          description:
            "ترى الإدارة الاستثناءات والموافقات وضغط العمليات في وقت أبكر.",
        },
      ],
    },
    finalCta: {
      badge: "تقييم",
      title: "هل تريد أن تعرف أين تخسر عملياتك السيطرة؟",
      description:
        "ابدأ بتقييم للسيطرة التشغيلية يركز على العمليات، والموافقات، والمخزون، والمالية، ورؤية التقارير.",
      primaryCta: "اطلب تقييم السيطرة التشغيلية",
    },
  },
}
