import type { Locale } from "@/lib/i18n"

export const siteCopy = {
  en: {
    skipToContent: "Skip to content",
    primaryNavigation: "Primary navigation",
    mobileNavigation: "Mobile navigation",
    footerNavigation: "Footer navigation",
    openNavigation: "Open navigation menu",
    exploreTitle: "Explore ANU",
    exploreDescription: "Business control and Odoo implementation.",
    startAssessment: "Start assessment",
    navigate: "Navigate",
    connect: "Connect",
    footerTitle: "Redesign the operation before implementing the system.",
    footerDescription:
      "ANU works with Iraqi businesses that need clearer approvals, cleaner data, stronger reporting, and more control over daily execution.",
    footerNote: "© 2026 ANU Software Solutions. All rights reserved.",
    languageName: "العربية",
    languageLabel: "عرض الموقع بالعربية",
    links: {
      work: "Work",
      method: "Method",
      platform: "Platform",
      industries: "Industries",
      insights: "Insights",
      contact: "Contact",
      whatsapp: "WhatsApp",
      instagram: "Instagram",
      facebook: "Facebook",
      linkedin: "LinkedIn",
      odooPartner: "Odoo partner profile",
    },
  },
  ar: {
    skipToContent: "انتقل إلى المحتوى",
    primaryNavigation: "التنقل الرئيسي",
    mobileNavigation: "قائمة التنقل",
    footerNavigation: "روابط الموقع",
    openNavigation: "فتح قائمة التنقل",
    exploreTitle: "استكشف أنو",
    exploreDescription: "الرقابة التشغيلية وتطبيق نظام Odoo.",
    startAssessment: "ابدأ التقييم",
    navigate: "تصفح",
    connect: "تواصل",
    footerTitle: "أعد تصميم العمل قبل تطبيق النظام.",
    footerDescription:
      "تعمل أنو مع الشركات العراقية التي تحتاج إلى موافقات أوضح وبيانات أدق وتقارير أقوى ورقابة أفضل على التنفيذ اليومي.",
    footerNote: "© 2026 أنو للحلول البرمجية. جميع الحقوق محفوظة.",
    languageName: "English",
    languageLabel: "View the website in English",
    links: {
      work: "عملنا",
      method: "المنهج",
      platform: "المنصة",
      industries: "القطاعات",
      insights: "الرؤى",
      contact: "تواصل",
      whatsapp: "واتساب",
      instagram: "إنستغرام",
      facebook: "فيسبوك",
      linkedin: "لينكدإن",
      odooPartner: "صفحة شريك Odoo",
    },
  },
} satisfies Record<Locale, object>

export type SiteCopy = (typeof siteCopy)[Locale]

export const homePageCopy = {
  en: {
    hero: {
      titlePrimary: "Business control,",
      titleSecondary: "implemented.",
      primaryCta: "Start assessment",
      secondaryCta: "Discover the method",
    },
    workLabel: "What we do",
    workStory: [
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
    ],
    workCards: [
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
    ],
    method: {
      label: "02 / Method",
      headline: "From scattered work to governed execution.",
      description:
        "Each phase builds operational depth across the organization, ensuring controls are defined before software goes live.",
      methodName: "ANU / Operating control method",
      objective: "Phase objective",
      checkpoints: "Control checkpoints",
      handoff: "Phase handoff",
      steps: [
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
          controls: [
            "Roles and ownership",
            "Approval logic",
            "Reporting model",
          ],
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
      ],
    },
    platform: {
      label: "03 / Platform",
      headline: "Odoo becomes the operating layer.",
      description:
        "Sales, CRM, inventory, purchasing, accounting, manufacturing, projects, HR, approvals, and dashboards work as one control system when implemented around the company’s real operating model.",
      modules: [
        "Sales",
        "CRM",
        "Inventory",
        "Purchase",
        "Finance",
        "Approvals",
        "Reporting",
        "Manufacturing",
        "Projects",
        "HR",
        "Dashboards",
        "Integrations",
      ],
    },
    industries: {
      label: "04 / Industries",
      headline: "Built for companies where operational control matters.",
      description:
        "See how ANU structures operational control and Odoo around the work that matters in each industry.",
      viewAll: "View all industries",
    },
    insights: {
      headline: "Insights for better control.",
      viewAll: "View all insights",
      minRead: "min read",
    },
  },
  ar: {
    hero: {
      titlePrimary: "رقابة تشغيلية،",
      titleSecondary: "مطبّقة فعلياً.",
      primaryCta: "ابدأ التقييم",
      secondaryCta: "اكتشف المنهج",
    },
    workLabel: "ماذا نقدم",
    workStory: [
      {
        counter: "٠١ / ٠٣",
        title: "لا نبيع وحدات برمجية، بل نعيد بناء الرقابة التشغيلية.",
        text: "يبدأ كل تطبيق من فهم طريقة عمل الشركة فعلياً: من يطلب، ومن يوافق، ومن يستلم، ومن يبيع، ومن يحصّل، ومن يرفع التقارير، وأين تضعف الرقابة.",
      },
      {
        counter: "٠٢ / ٠٣",
        title: "نعيد تصميم نموذج التشغيل قبل تهيئة Odoo.",
        text: "تحدد أنو الأدوار والصلاحيات ومنطق الموافقات وقواعد المخزون والروابط المالية وهيكل التقارير ورؤية المالك قبل بدء إعداد النظام.",
      },
      {
        counter: "٠٣ / ٠٣",
        title: "يصبح Odoo منصة رقابة لتنفيذ منضبط.",
        text: "نهيئ الوحدات ولوحات المعلومات والتكاملات والأتمتة والتقارير والتدريب وفق الطريقة التي يجب أن تعمل بها الشركة كل يوم.",
      },
    ],
    workCards: [
      {
        title: "إعادة تصميم العمليات",
        text: "توثيق مسارات العمل والموافقات والأدوار والمستندات والتسليمات وفجوات البيانات والاختناقات التشغيلية.",
      },
      {
        title: "تطبيق نظام Odoo",
        text: "تهيئة وحدات Odoo والصلاحيات والأتمتة ولوحات المعلومات والتقارير والتكاملات المطلوبة.",
      },
      {
        title: "لوحات الرقابة",
        text: "منح المالكين والمديرين رؤية واضحة للمخزون والمبيعات والمشتريات والمالية والتحصيل والتنفيذ.",
      },
    ],
    method: {
      label: "٠٢ / المنهج",
      headline: "من عمل متفرق إلى تنفيذ منضبط.",
      description:
        "تبني كل مرحلة عمقاً تشغيلياً داخل المؤسسة، وتضمن تحديد الضوابط قبل تشغيل النظام.",
      methodName: "أنو / منهج الرقابة التشغيلية",
      objective: "هدف المرحلة",
      checkpoints: "نقاط الرقابة",
      handoff: "مخرج المرحلة",
      steps: [
        {
          phase: "التقييم",
          title: "تقييم العمليات الحالية",
          text: "توثيق مسارات العمل والفجوات والموافقات والمستندات والتقارير ومصادر البيانات ونقاط القرار.",
          controls: ["أدلة سير العمل", "فجوات الرقابة", "نقاط القرار"],
          output: "خريطة الرقابة للوضع الحالي",
        },
        {
          phase: "التصميم",
          title: "إعادة تصميم نموذج الرقابة",
          text: "تحديد الأدوار والصلاحيات والمراحل ومنطق الموافقات وقواعد المخزون والروابط المالية وهيكل التقارير.",
          controls: ["الأدوار والمسؤوليات", "منطق الموافقات", "نموذج التقارير"],
          output: "نموذج التشغيل المستهدف",
        },
        {
          phase: "التهيئة",
          title: "تهيئة Odoo",
          text: "تطبيق الوحدات ومسارات العمل ولوحات المعلومات والأتمتة والتكاملات والصلاحيات وتقارير الإدارة.",
          controls: ["مسارات Odoo", "صلاحيات الوصول", "تقارير الإدارة"],
          output: "منصة رقابة مهيأة",
        },
        {
          phase: "الاستقرار",
          title: "التدريب وتثبيت التشغيل",
          text: "تدريب المستخدمين الرئيسيين ودعم الإطلاق ومتابعة المشكلات وتحسين الإعداد واستقرار العمل اليومي.",
          controls: ["جاهزية المستخدمين", "ضوابط الإطلاق", "إغلاق المشكلات"],
          output: "تشغيل يومي منضبط",
        },
      ],
    },
    platform: {
      label: "٠٣ / المنصة",
      headline: "يصبح Odoo طبقة التشغيل الأساسية.",
      description:
        "تعمل المبيعات وإدارة العملاء والمخزون والمشتريات والمحاسبة والتصنيع والمشاريع والموارد البشرية والموافقات ولوحات المعلومات كنظام رقابة واحد عندما تُطبّق وفق نموذج التشغيل الفعلي للشركة.",
      modules: [
        "المبيعات",
        "إدارة العملاء",
        "المخزون",
        "المشتريات",
        "المالية",
        "الموافقات",
        "التقارير",
        "التصنيع",
        "المشاريع",
        "الموارد البشرية",
        "لوحات المعلومات",
        "التكاملات",
      ],
    },
    industries: {
      label: "٠٤ / القطاعات",
      headline: "مصمم للشركات التي تعتمد على الرقابة التشغيلية.",
      description:
        "اكتشف كيف تنظّم أنو الرقابة التشغيلية ونظام Odoo حول العمل الأهم في كل قطاع.",
      viewAll: "عرض جميع القطاعات",
    },
    insights: {
      headline: "رؤى لرقابة أفضل.",
      viewAll: "عرض جميع الرؤى",
      minRead: "دقائق للقراءة",
    },
  },
} satisfies Record<Locale, object>

export const assessmentCopy = {
  en: {
    title: "Start your assessment.",
    formTitle: "Start with ANU",
    talkTitle: "Talk now",
    whatsapp: "Start on WhatsApp",
    whatsappDetail: "Open a message",
    call: "Call ANU",
    directOptions: "Direct assessment contact options",
    note: "Start with the operational challenge that matters most.",
    name: "Name",
    phone: "Phone",
    website: "Website",
    sending: "Sending",
    submit: "Start assessment",
    successTitle: "Assessment request received.",
  },
  ar: {
    title: "ابدأ تقييم شركتك.",
    formTitle: "ابدأ مع أنو",
    talkTitle: "تحدث معنا الآن",
    whatsapp: "ابدأ عبر واتساب",
    whatsappDetail: "افتح رسالة مباشرة",
    call: "اتصل بـ أنو",
    directOptions: "خيارات التواصل المباشر للتقييم",
    note: "ابدأ بالتحدي التشغيلي الأكثر أهمية لشركتك.",
    name: "الاسم",
    phone: "الهاتف",
    website: "الموقع الإلكتروني",
    sending: "جارٍ الإرسال",
    submit: "ابدأ التقييم",
    successTitle: "تم استلام طلب التقييم.",
  },
} satisfies Record<Locale, object>

export const industriesPageCopy = {
  en: {
    index: {
      eyebrow: "Industries",
      title: "Odoo ERP for your industry.",
      description:
        "ANU maps the decisions, evidence and handoffs that matter in your sector, then implements them in Odoo.",
      chooseTitle: "Choose your industry.",
      chooseDescription:
        "Each page explains the operational risks, workflow and Odoo capabilities relevant to that industry.",
      fitLabel: "Industry fit",
      fitTitle: "One method. Different control priorities.",
      fitDescription:
        "ANU keeps one implementation discipline while changing the operating model, evidence and management questions for each sector.",
    },
    showcaseLabel: "Industries ANU serves",
    breadcrumb: "Industries",
    breadcrumbLabel: "Breadcrumb",
    startAssessment: "Start assessment",
    changesLabel: "What ANU changes",
    problemsTitle: "Where operational control breaks.",
    odooLabel: "Odoo implementation map",
    odooTitle: "Configure the platform around the work.",
    odooDescription:
      "Modules support the operating model. They do not replace the decisions, ownership and evidence the process requires.",
    questionsTitle: "Questions to settle before implementation.",
    relatedTitle: "Related insights",
    viewInsights: "View all insights",
    readInsight: "Read insight",
  },
  ar: {
    index: {
      eyebrow: "القطاعات",
      title: "نظام Odoo ERP لقطاعك.",
      description:
        "تحدد أنو القرارات والأدلة والتسليمات المهمة في قطاعك، ثم تطبّقها داخل Odoo.",
      chooseTitle: "اختر قطاعك.",
      chooseDescription:
        "تشرح كل صفحة المخاطر التشغيلية ومسار العمل وإمكانات Odoo المناسبة لذلك القطاع.",
      fitLabel: "ملاءمة القطاع",
      fitTitle: "منهج واحد وأولويات رقابة مختلفة.",
      fitDescription:
        "تحافظ أنو على منهج تطبيق واحد مع تكييف نموذج التشغيل والأدلة وأسئلة الإدارة لكل قطاع.",
    },
    showcaseLabel: "القطاعات التي تخدمها أنو",
    breadcrumb: "القطاعات",
    breadcrumbLabel: "مسار الصفحة",
    startAssessment: "ابدأ التقييم",
    changesLabel: "ما الذي تغيّره أنو",
    problemsTitle: "أين تضعف الرقابة التشغيلية؟",
    odooLabel: "خريطة تطبيق Odoo",
    odooTitle: "هيّئ المنصة حول العمل الفعلي.",
    odooDescription:
      "تدعم الوحدات نموذج التشغيل، لكنها لا تستبدل القرارات والمسؤولية والأدلة التي تحتاج إليها العملية.",
    questionsTitle: "أسئلة يجب حسمها قبل التطبيق.",
    relatedTitle: "رؤى مرتبطة",
    viewInsights: "عرض جميع الرؤى",
    readInsight: "اقرأ الرؤية",
  },
} satisfies Record<Locale, object>

export const servicesPageCopy = {
  en: {
    eyebrow: "Business control & Odoo ERP implementation",
    title: "We rebuild operating control.",
    description:
      "ANU assesses workflows, approvals, inventory, purchasing, sales, finance, reporting, data quality, permissions, and management visibility before configuring Odoo as the control platform.",
    directLabel: "What ANU delivers",
    directAnswer:
      "ANU combines process redesign with Odoo ERP implementation. We define how decisions, approvals, records and exceptions should work, then configure the modules, permissions, dashboards and integrations required to operate that model every day.",
    services: [
      {
        title: "Process redesign",
        text: "Map current work, remove unclear handoffs and define accountable future workflows.",
      },
      {
        title: "Odoo implementation",
        text: "Configure the right modules around the agreed operating model and business rules.",
      },
      {
        title: "Control dashboards",
        text: "Give owners and managers timely visibility over performance, risk and exceptions.",
      },
      {
        title: "Approval logic",
        text: "Set decision limits, evidence requirements, escalation and visible ownership.",
      },
      {
        title: "Inventory discipline",
        text: "Control receiving, movement, reservation, counting, adjustment and valuation.",
      },
      {
        title: "Finance visibility",
        text: "Connect operational activity to invoicing, collections, costs and reporting.",
      },
    ],
    processLabel: "Implementation method",
    processTitle: "Architecture before configuration.",
    process: [
      "Assess the current operation and its evidence.",
      "Design roles, workflows, controls and reporting.",
      "Configure and validate Odoo against real scenarios.",
      "Train key users, launch and stabilize daily work.",
    ],
    questionsTitle: "Common implementation questions.",
    questions: [
      {
        question: "Does ANU begin by selecting Odoo modules?",
        answer:
          "No. We begin with the operating problem, decisions, ownership and evidence, then select and configure the capabilities that support that model.",
      },
      {
        question: "Can ANU improve an existing Odoo implementation?",
        answer:
          "Yes. We can assess the current configuration, data, permissions, workflows and reports before defining a controlled improvement plan.",
      },
      {
        question: "How long does implementation take?",
        answer:
          "Timing depends on process scope, data readiness, integrations and decision speed. The assessment establishes a realistic phased plan before commitment.",
      },
      {
        question: "Do you provide training and go-live support?",
        answer:
          "Yes. Key-user training, scenario validation, launch support and stabilization are part of the delivery method.",
      },
    ],
    cta: "Start assessment",
  },
  ar: {
    eyebrow: "الرقابة التشغيلية وتطبيق نظام Odoo ERP",
    title: "نعيد بناء الرقابة التشغيلية.",
    description:
      "تقيّم أنو مسارات العمل والموافقات والمخزون والمشتريات والمبيعات والمالية والتقارير وجودة البيانات والصلاحيات ورؤية الإدارة قبل تهيئة Odoo كمنصة رقابة.",
    directLabel: "ما الذي تقدمه أنو",
    directAnswer:
      "تجمع أنو بين إعادة تصميم العمليات وتطبيق نظام Odoo ERP. نحدد طريقة عمل القرارات والموافقات والسجلات والاستثناءات، ثم نهيئ الوحدات والصلاحيات ولوحات المعلومات والتكاملات اللازمة لتشغيل هذا النموذج كل يوم.",
    services: [
      {
        title: "إعادة تصميم العمليات",
        text: "توثيق العمل الحالي وإزالة التسليمات غير الواضحة وتصميم مسارات مستقبلية مسؤولة.",
      },
      {
        title: "تطبيق نظام Odoo",
        text: "تهيئة الوحدات المناسبة حول نموذج التشغيل وقواعد العمل المتفق عليها.",
      },
      {
        title: "لوحات الرقابة",
        text: "منح المالكين والمديرين رؤية سريعة للأداء والمخاطر والاستثناءات.",
      },
      {
        title: "منطق الموافقات",
        text: "تحديد حدود القرار ومتطلبات الأدلة والتصعيد والمسؤولية الظاهرة.",
      },
      {
        title: "انضباط المخزون",
        text: "ضبط الاستلام والحركة والحجز والجرد والتسوية والتقييم.",
      },
      {
        title: "الرؤية المالية",
        text: "ربط النشاط التشغيلي بالفوترة والتحصيل والتكاليف والتقارير.",
      },
    ],
    processLabel: "منهج التطبيق",
    processTitle: "هندسة العمل قبل تهيئة النظام.",
    process: [
      "تقييم التشغيل الحالي والأدلة المستخدمة فيه.",
      "تصميم الأدوار والمسارات والضوابط والتقارير.",
      "تهيئة Odoo والتحقق منه باستخدام سيناريوهات حقيقية.",
      "تدريب المستخدمين الرئيسيين والإطلاق وتثبيت العمل اليومي.",
    ],
    questionsTitle: "أسئلة شائعة عن التطبيق.",
    questions: [
      {
        question: "هل تبدأ أنو باختيار وحدات Odoo؟",
        answer:
          "لا. نبدأ بالمشكلة التشغيلية والقرارات والمسؤولية والأدلة، ثم نختار ونهيئ الإمكانات التي تدعم النموذج المطلوب.",
      },
      {
        question: "هل تستطيع أنو تحسين تطبيق Odoo قائم؟",
        answer:
          "نعم. يمكننا تقييم الإعداد والبيانات والصلاحيات والمسارات والتقارير الحالية قبل تحديد خطة تحسين منضبطة.",
      },
      {
        question: "كم يستغرق التطبيق؟",
        answer:
          "تعتمد المدة على نطاق العمليات وجاهزية البيانات والتكاملات وسرعة القرارات. يحدد التقييم خطة مرحلية واقعية قبل الالتزام.",
      },
      {
        question: "هل تقدمون التدريب ودعم الإطلاق؟",
        answer:
          "نعم. يشمل منهج التنفيذ تدريب المستخدمين الرئيسيين والتحقق بالسيناريوهات ودعم الإطلاق وتثبيت التشغيل.",
      },
    ],
    cta: "ابدأ التقييم",
  },
} satisfies Record<Locale, object>
