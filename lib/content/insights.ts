import type { Locale } from "@/lib/i18n"

export type LocalizedText = Record<Locale, string>

export const insightCategories = [
  "All",
  "Business Control",
  "Odoo ERP",
  "Operations",
  "Finance",
  "Inventory",
  "Digital Transformation",
] as const

export type InsightCategory = Exclude<(typeof insightCategories)[number], "All">

export type InsightContentType =
  "Field Note" | "Analysis" | "Guide" | "Video Insight"

export type InsightVisual =
  | "control-loop"
  | "inventory-ledger"
  | "management-dashboard"
  | "approval-flow"
  | "module-map"
  | "process-map"
  | "single-source"
  | "ownership-model"

export type InsightBodySection = {
  heading: LocalizedText
  body: LocalizedText
}

export type Insight = {
  title: LocalizedText
  slug: string
  summary: LocalizedText
  category: InsightCategory
  contentType: InsightContentType
  date: string
  readingTime: number
  visual: InsightVisual
  visualAlt: LocalizedText
  featured?: boolean
  author?: LocalizedText
  body: InsightBodySection[]
}

const localize = (en: string, ar: string): LocalizedText => ({ en, ar })

export const categoryLabels: Record<
  (typeof insightCategories)[number],
  LocalizedText
> = {
  All: localize("All", "الكل"),
  "Business Control": localize("Business Control", "ضبط الأعمال"),
  "Odoo ERP": localize("Odoo ERP", "نظام Odoo ERP"),
  Operations: localize("Operations", "العمليات"),
  Finance: localize("Finance", "المالية"),
  Inventory: localize("Inventory", "المخزون"),
  "Digital Transformation": localize("Digital Transformation", "التحول الرقمي"),
}

export const contentTypeLabels: Record<InsightContentType, LocalizedText> = {
  "Field Note": localize("Field Note", "ملاحظة ميدانية"),
  Analysis: localize("Analysis", "تحليل"),
  Guide: localize("Guide", "دليل"),
  "Video Insight": localize("Video Insight", "رؤية مرئية"),
}

export const insights: Insight[] = [
  {
    title: localize(
      "Why Business Problems Persist After ERP Implementation",
      "لماذا تستمر مشكلات الأعمال بعد تطبيق نظام ERP"
    ),
    slug: "why-business-problems-persist-after-erp-implementation",
    summary: localize(
      "ERP can make weak processes faster without making them controlled. The real work is defining ownership, evidence, approvals and exception handling before configuration begins.",
      "قد يجعل نظام ERP العمليات الضعيفة أسرع من دون أن يجعلها منضبطة. يبدأ العمل الحقيقي بتحديد المسؤولية والأدلة والموافقات ومعالجة الاستثناءات قبل التهيئة."
    ),
    category: "Business Control",
    contentType: "Analysis",
    date: "2026-07-02",
    readingTime: 8,
    visual: "control-loop",
    visualAlt: localize(
      "A control loop diagram connecting process, evidence, approval and management visibility",
      "مخطط حلقة ضبط يربط العملية بالأدلة والموافقة ورؤية الإدارة"
    ),
    featured: true,
    author: localize("ANU Advisory", "فريق أنو الاستشاري"),
    body: [
      {
        heading: localize(
          "The system inherits the operating model",
          "النظام يرث نموذج التشغيل"
        ),
        body: localize(
          "A platform cannot decide who owns a decision, what evidence is acceptable or when an exception should be escalated. If those rules remain informal, the implementation simply digitizes uncertainty.",
          "لا تستطيع المنصة أن تقرر من يملك القرار أو ما الدليل المقبول أو متى يجب تصعيد الاستثناء. إذا بقيت هذه القواعد غير رسمية فإن التطبيق يرقمن حالة عدم الوضوح فقط."
        ),
      },
      {
        heading: localize(
          "Control is designed before it is configured",
          "يُصمم الضبط قبل التهيئة"
        ),
        body: localize(
          "The durable sequence is to map the current work, expose control gaps, define the future process and only then configure roles, permissions, approvals and reports in the ERP.",
          "التسلسل المستدام هو رسم العمل الحالي وكشف فجوات الضبط وتحديد العملية المستقبلية ثم تهيئة الأدوار والصلاحيات والموافقات والتقارير داخل النظام."
        ),
      },
    ],
  },
  {
    title: localize(
      "Inventory Accuracy Is an Operating Discipline, Not a Software Feature",
      "دقة المخزون انضباط تشغيلي وليست ميزة برمجية"
    ),
    slug: "inventory-accuracy-is-an-operating-discipline",
    summary: localize(
      "Reliable stock depends on disciplined receiving, movement, counting and adjustment—not on installing an inventory module and hoping the numbers reconcile.",
      "تعتمد موثوقية المخزون على انضباط الاستلام والحركة والجرد والتسوية، لا على تثبيت وحدة مخزون وانتظار أن تتطابق الأرقام."
    ),
    category: "Inventory",
    contentType: "Guide",
    date: "2026-06-18",
    readingTime: 7,
    visual: "inventory-ledger",
    visualAlt: localize(
      "An inventory ledger visual showing controlled stock movements and exceptions",
      "تصور لسجل مخزون يوضح الحركات المنضبطة والاستثناءات"
    ),
    author: localize("ANU Operations Practice", "فريق العمليات في أنو"),
    body: [
      {
        heading: localize(
          "Accuracy is created at every movement",
          "الدقة تُبنى مع كل حركة"
        ),
        body: localize(
          "The stock balance is the result of dozens of daily actions. Receiving without verification, undocumented transfers and delayed consumption entries all weaken the number managers rely on.",
          "رصيد المخزون هو نتيجة عشرات الإجراءات اليومية. الاستلام من دون تحقق والتحويلات غير الموثقة وتأخير تسجيل الاستهلاك كلها تضعف الرقم الذي تعتمد عليه الإدارة."
        ),
      },
      {
        heading: localize(
          "Design the discipline into the workflow",
          "ادمج الانضباط في سير العمل"
        ),
        body: localize(
          "Clear locations, accountable roles, scan or document evidence, cycle counts and governed adjustments turn inventory accuracy into a repeatable operating capability.",
          "المواقع الواضحة والأدوار المسؤولة وأدلة المسح أو المستندات والجرد الدوري والتسويات المنضبطة تحول دقة المخزون إلى قدرة تشغيلية قابلة للتكرار."
        ),
      },
    ],
  },
  {
    title: localize(
      "What Owners Should See in a Management Dashboard",
      "ما الذي يجب أن يراه المالك في لوحة الإدارة"
    ),
    slug: "what-owners-should-see-in-a-management-dashboard",
    summary: localize(
      "A useful dashboard reveals exceptions, ageing decisions and operating pressure. It does not overwhelm owners with every metric the system can produce.",
      "تكشف لوحة الإدارة المفيدة الاستثناءات والقرارات المتأخرة وضغط التشغيل، ولا تغرق المالك بكل مؤشر يستطيع النظام إنتاجه."
    ),
    category: "Finance",
    contentType: "Guide",
    date: "2026-06-05",
    readingTime: 6,
    visual: "management-dashboard",
    visualAlt: localize(
      "A restrained management dashboard highlighting exceptions, ageing and cash visibility",
      "لوحة إدارة منضبطة تبرز الاستثناءات والتأخير ورؤية التدفقات النقدية"
    ),
    body: [
      {
        heading: localize(
          "Start with decisions, not charts",
          "ابدأ بالقرارات لا بالرسوم"
        ),
        body: localize(
          "Every dashboard element should answer a management question: what is late, what is blocked, where is cash tied up and which exception requires an owner decision.",
          "يجب أن يجيب كل عنصر في اللوحة عن سؤال إداري: ما المتأخر وما المتعطل وأين تتجمد السيولة وأي استثناء يحتاج قرار المالك."
        ),
      },
      {
        heading: localize(
          "Show evidence behind the signal",
          "أظهر الدليل خلف الإشارة"
        ),
        body: localize(
          "A signal is useful only when the manager can trace it to responsible people, source transactions and the next required action.",
          "لا تصبح الإشارة مفيدة إلا عندما يستطيع المدير تتبعها إلى المسؤولين والمعاملات المصدرية والإجراء التالي المطلوب."
        ),
      },
    ],
  },
  {
    title: localize(
      "From WhatsApp Approvals to Controlled Business Processes",
      "من موافقات واتساب إلى عمليات أعمال منضبطة"
    ),
    slug: "from-whatsapp-approvals-to-controlled-business-processes",
    summary: localize(
      "Informal messages feel fast until decisions cannot be traced. This video explains how to preserve speed while moving approvals into an accountable workflow.",
      "تبدو الرسائل غير الرسمية سريعة حتى يتعذر تتبع القرارات. يشرح هذا الفيديو كيفية الحفاظ على السرعة مع نقل الموافقات إلى سير عمل خاضع للمساءلة."
    ),
    category: "Operations",
    contentType: "Video Insight",
    date: "2026-05-21",
    readingTime: 5,
    visual: "approval-flow",
    visualAlt: localize(
      "A sequence of approval messages becoming a governed process flow",
      "تسلسل رسائل موافقة يتحول إلى سير عملية منضبط"
    ),
    body: [
      {
        heading: localize(
          "Speed without evidence creates rework",
          "السرعة من دون دليل تخلق إعادة عمل"
        ),
        body: localize(
          "Chat approvals are separated from the transaction, the budget and the final outcome. Teams later reconstruct the decision from screenshots and memory.",
          "تنفصل موافقات المحادثة عن المعاملة والميزانية والنتيجة النهائية، ثم تعيد الفرق بناء القرار لاحقاً من لقطات الشاشة والذاكرة."
        ),
      },
      {
        heading: localize(
          "Keep the path simple and accountable",
          "حافظ على مسار بسيط وخاضع للمساءلة"
        ),
        body: localize(
          "A controlled workflow should show the request, threshold, approver, timestamp, evidence and escalation path without adding unnecessary steps.",
          "يجب أن يوضح سير العمل المنضبط الطلب والحد المالي والموافق والوقت والدليل ومسار التصعيد من دون إضافة خطوات غير ضرورية."
        ),
      },
    ],
  },
  {
    title: localize(
      "When Odoo Customization Solves the Wrong Problem",
      "عندما يحل تخصيص Odoo المشكلة الخطأ"
    ),
    slug: "when-odoo-customization-solves-the-wrong-problem",
    summary: localize(
      "Customization is sometimes justified. But code often becomes a costly substitute for a missing policy, unclear responsibility or an undisciplined exception.",
      "قد يكون التخصيص مبرراً أحياناً، لكن الكود كثيراً ما يصبح بديلاً مكلفاً عن سياسة مفقودة أو مسؤولية غير واضحة أو استثناء غير منضبط."
    ),
    category: "Odoo ERP",
    contentType: "Analysis",
    date: "2026-05-07",
    readingTime: 7,
    visual: "module-map",
    visualAlt: localize(
      "An Odoo module map separating standard process needs from unnecessary custom code",
      "خريطة لوحدات Odoo تفصل احتياجات العملية القياسية عن الكود المخصص غير الضروري"
    ),
    body: [
      {
        heading: localize(
          "Diagnose the request behind the request",
          "شخّص الطلب خلف الطلب"
        ),
        body: localize(
          "A customization request often describes a symptom. Before estimating code, identify the decision, role or process rule the request is trying to protect.",
          "يصف طلب التخصيص غالباً عرضاً للمشكلة. قبل تقدير الكود حدد القرار أو الدور أو قاعدة العملية التي يحاول الطلب حمايتها."
        ),
      },
      {
        heading: localize(
          "Use code for durable differentiation",
          "استخدم الكود للاختلاف المستدام"
        ),
        body: localize(
          "Customize when a stable business requirement cannot be met reliably through configuration. Avoid encoding temporary workarounds that increase upgrade and support risk.",
          "خصص عندما لا يمكن تلبية متطلب أعمال ثابت بشكل موثوق عبر التهيئة، وتجنب ترميز الحلول المؤقتة التي تزيد مخاطر الترقية والدعم."
        ),
      },
    ],
  },
  {
    title: localize(
      "How Process Mapping Reduces ERP Implementation Risk",
      "كيف يقلل رسم العمليات من مخاطر تطبيق ERP"
    ),
    slug: "how-process-mapping-reduces-erp-implementation-risk",
    summary: localize(
      "A process map makes handoffs, decisions and missing controls visible early—when they are still inexpensive to resolve and easy to test with users.",
      "يجعل رسم العمليات نقاط التسليم والقرارات والضوابط المفقودة مرئية مبكراً، حين يكون حلها أقل تكلفة وأسهل للاختبار مع المستخدمين."
    ),
    category: "Operations",
    contentType: "Field Note",
    date: "2026-04-24",
    readingTime: 9,
    visual: "process-map",
    visualAlt: localize(
      "A cross-functional process map showing handoffs, decisions and control gaps",
      "خريطة عملية متعددة الوظائف توضح نقاط التسليم والقرارات وفجوات الضبط"
    ),
    body: [
      {
        heading: localize(
          "Handoffs are where risk hides",
          "تختبئ المخاطر في نقاط التسليم"
        ),
        body: localize(
          "Departments usually understand their own tasks but not the evidence the next team needs. Mapping exposes these gaps before they become configuration changes during testing.",
          "تفهم الأقسام مهامها عادة لكنها لا تفهم دائماً الدليل الذي يحتاجه الفريق التالي. يكشف الرسم هذه الفجوات قبل أن تتحول إلى تغييرات في التهيئة أثناء الاختبار."
        ),
      },
      {
        heading: localize(
          "Map the future state at decision level",
          "ارسم الحالة المستقبلية عند مستوى القرار"
        ),
        body: localize(
          "Useful maps show triggers, accountable roles, approvals, exceptions, system evidence and completion criteria—not just a sequence of departmental boxes.",
          "تُظهر الخرائط المفيدة المحفزات والأدوار المسؤولة والموافقات والاستثناءات وأدلة النظام ومعايير الإكمال، لا مجرد تسلسل مربعات الأقسام."
        ),
      },
    ],
  },
  {
    title: localize(
      "The Cost of Running a Company Without a Single Source of Truth",
      "تكلفة إدارة شركة من دون مصدر واحد للحقيقة"
    ),
    slug: "the-cost-of-running-without-a-single-source-of-truth",
    summary: localize(
      "When sales, stock and finance maintain different versions of reality, managers pay through slower decisions, duplicate work and avoidable reconciliation.",
      "عندما تحتفظ المبيعات والمخزون والمالية بنسخ مختلفة من الواقع، تدفع الإدارة الثمن في قرارات أبطأ وعمل مكرر وتسويات كان يمكن تجنبها."
    ),
    category: "Business Control",
    contentType: "Analysis",
    date: "2026-04-10",
    readingTime: 12,
    visual: "single-source",
    visualAlt: localize(
      "Several disconnected data records converging into one governed source of truth",
      "عدة سجلات بيانات منفصلة تتجمع في مصدر حقيقة واحد ومنضبط"
    ),
    body: [
      {
        heading: localize(
          "Conflicting numbers consume management time",
          "الأرقام المتضاربة تستهلك وقت الإدارة"
        ),
        body: localize(
          "The cost is not limited to spreadsheet maintenance. Leaders delay decisions while teams debate definitions, timing and which file represents the latest position.",
          "لا تقتصر التكلفة على صيانة الجداول. يؤخر القادة القرارات بينما تناقش الفرق التعريفات والتوقيت وأي ملف يمثل أحدث موقف."
        ),
      },
      {
        heading: localize(
          "One source requires one governance model",
          "المصدر الواحد يحتاج نموذج حوكمة واحداً"
        ),
        body: localize(
          "Integration helps, but ownership matters more. Each critical record needs a clear creator, approval rule, correction path and reporting definition.",
          "يساعد التكامل، لكن الملكية أهم. يحتاج كل سجل حرج إلى منشئ واضح وقاعدة موافقة ومسار تصحيح وتعريف موحد للتقارير."
        ),
      },
    ],
  },
  {
    title: localize(
      "Why Digital Transformation Fails Without Operational Ownership",
      "لماذا يفشل التحول الرقمي من دون ملكية تشغيلية"
    ),
    slug: "why-digital-transformation-fails-without-operational-ownership",
    summary: localize(
      "Technology teams can deliver a platform, but only operating leaders can own the rules, adoption and daily evidence that make transformation durable.",
      "تستطيع فرق التقنية تسليم المنصة، لكن قادة التشغيل وحدهم يملكون القواعد والتبني والأدلة اليومية التي تجعل التحول مستداماً."
    ),
    category: "Digital Transformation",
    contentType: "Field Note",
    date: "2026-03-27",
    readingTime: 8,
    visual: "ownership-model",
    visualAlt: localize(
      "An ownership model connecting operational leaders, process stewards and the ERP platform",
      "نموذج ملكية يربط قادة التشغيل ومسؤولي العمليات ومنصة ERP"
    ),
    body: [
      {
        heading: localize(
          "Adoption is an operating responsibility",
          "التبني مسؤولية تشغيلية"
        ),
        body: localize(
          "A project team can train users, but line leaders must enforce the new process, review exceptions and remove parallel ways of working.",
          "يمكن لفريق المشروع تدريب المستخدمين، لكن على قادة العمل فرض العملية الجديدة ومراجعة الاستثناءات وإيقاف أساليب العمل الموازية."
        ),
      },
      {
        heading: localize(
          "Name owners before go-live",
          "حدد المالكين قبل الإطلاق"
        ),
        body: localize(
          "Every end-to-end process needs an owner with authority to resolve conflicts, approve rule changes and measure whether the process is producing controlled outcomes.",
          "تحتاج كل عملية متكاملة إلى مالك لديه صلاحية حل التعارضات واعتماد تغييرات القواعد وقياس ما إذا كانت العملية تنتج نتائج منضبطة."
        ),
      },
    ],
  },
]

export const featuredInsight =
  insights.find((insight) => insight.featured) ?? insights[0]

export function getInsightBySlug(slug: string) {
  return insights.find((insight) => insight.slug === slug)
}

export function getLocalizedText(value: LocalizedText, locale: Locale) {
  return value[locale]
}
