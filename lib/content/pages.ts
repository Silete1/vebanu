import type { Locale } from "@/lib/i18n"

/** Copy for the pages that are not one system: contact, services, method, about. */

type Item = { title: string; body: string }

export const contactCopy: Record<
  Locale,
  { kicker: string; title: string; lede: string; steps: string[]; formTitle: string; formNote: string }
> = {
  en: {
    kicker: "Business Control Assessment",
    title: "Start with how your company runs today.",
    lede: "Leave a name and a number. We call within one working day, in Arabic or English, to book a short assessment: how the work flows, where control breaks, and what a first phase should hold.",
    steps: ["A call to understand the company", "A visit or a session to map the work", "A written assessment with phase one, scope and risks"],
    formTitle: "Request an assessment",
    formNote: "Two fields. No spam, no list, no sharing.",
  },
  ar: {
    kicker: "تقييم الرقابة على العمل",
    title: "ابدأ من طريقة عمل شركتك اليوم.",
    lede: "اترك اسمك ورقمك. نتصل خلال يوم عمل واحد، بالعربية أو الإنجليزية، لنحجز تقييماً قصيراً: كيف يجري العمل، وأين تنكسر الرقابة، وما الذي يجب أن تحمله المرحلة الأولى.",
    steps: ["اتصال لفهم الشركة", "زيارة أو جلسة لرسم خريطة العمل", "تقييم مكتوب بالمرحلة الأولى ونطاقها ومخاطرها"],
    formTitle: "اطلب تقييماً",
    formNote: "حقلان فقط. بلا رسائل مزعجة، ولا قوائم، ولا مشاركة لبياناتك.",
  },
}

export type ServicesCopy = {
  meta: { title: string; description: string }
  kicker: string
  title: string
  lede: string
  groups: { title: string; lede: string; items: Item[] }[]
  packages: { kicker: string; title: string; lede: string; items: Item[] }
}

export const servicesCopy: Record<Locale, ServicesCopy> = {
  en: {
    meta: {
      title: "Services: process redesign, ANU Brain on Odoo, migration, support",
      description:
        "Business control assessment, process and policy design, Odoo implementation as ANU Brain, data migration and opening balances, custom modules, integrations, training, support and hosting in Iraq.",
    },
    kicker: "Services",
    title: "From the first conversation to a system your team owns.",
    lede: "ANU works in a fixed order: understand, design, implement, prove, run. Every service below has a written deliverable and a gate before the next one starts.",
    groups: [
      {
        title: "Understand and design",
        lede: "Before any software, the work itself.",
        items: [
          { title: "Business Control Assessment", body: "A paid diagnostic: the current processes, the control gaps, a phase-one scope, a module map and the risks, in writing." },
          { title: "Process redesign", body: "As-is and to-be processes, who does what (RACI), a procedure per process, and how each maps to the system." },
          { title: "Policy design", body: "Written policies turned into controls the system enforces: approval rules, limits, access and segregation of duties." },
          { title: "Transformation roadmap", body: "For groups with many companies: an architecture and a phased plan, governed as a programme." },
        ],
      },
      {
        title: "Implement",
        lede: "ANU Brain, built on Odoo, configured to the design.",
        items: [
          { title: "ANU Brain implementation", body: "Sales, purchasing, stock, manufacturing, accounting, HR and reporting, configured to the approved design, in Arabic first." },
          { title: "Data migration and cutover", body: "Import templates, cleansing and deduplication, two full rehearsals, opening stock by location, open receivables and payables, opening trial balance." },
          { title: "Custom modules", body: "Where standard is not enough: estimated, built, tested and shipped with a walkthrough for every feature." },
          { title: "Integrations", body: "WhatsApp, mail, scales, GPS trackers, exchange-rate feeds and the systems you already run." },
        ],
      },
      {
        title: "Run",
        lede: "After go-live, the system stays yours and keeps working.",
        items: [
          { title: "Training", body: "Live sessions per process, key-user training and walkthroughs on the real screens at first sign-in." },
          { title: "Support plans", body: "Report from any screen, response times in writing, monthly change hours, a fix note for every fix." },
          { title: "Hosting and backups", body: "ANU Cloud with backups every six hours, or Odoo.sh sized for you; development, staging and production." },
          { title: "Upgrades", body: "Version upgrades and the move of existing modules, rehearsed on a copy before production." },
        ],
      },
    ],
    packages: {
      kicker: "Ways to start",
      title: "Three sizes of first project.",
      lede: "Each starts with the assessment and grows in phases. Prices follow the assessment, never before it.",
      items: [
        { title: "Starter Control Stack", body: "The core controls for a single company: sales, purchasing, stock and accounting, with approvals." },
        { title: "Operational Core Rollout", body: "The whole operation of one company, with migration, training and hypercare after go-live." },
        { title: "Phased Transformation Program", body: "Several companies or sites, rolled out in governed phases with an architecture and a roadmap." },
      ],
    },
  },
  ar: {
    meta: {
      title: "الخدمات: إعادة تصميم العمليات، أنو برين على Odoo، نقل البيانات، الدعم",
      description:
        "تقييم الرقابة على العمل، وتصميم العمليات والسياسات، وتطبيق Odoo باسم أنو برين، ونقل البيانات والأرصدة الافتتاحية، والوحدات الخاصة، والربط، والتدريب، والدعم والاستضافة في العراق.",
    },
    kicker: "الخدمات",
    title: "من أول حديث إلى نظام يملكه فريقك.",
    lede: "تعمل أنو بترتيب ثابت: نفهم، ثم نصمم، ثم نطبّق، ثم نثبت، ثم نشغّل. لكل خدمة أدناه مُخرَج مكتوب وبوابة قبل أن تبدأ التي تليها.",
    groups: [
      {
        title: "الفهم والتصميم",
        lede: "قبل أي برنامج، العمل نفسه.",
        items: [
          { title: "تقييم الرقابة على العمل", body: "تشخيص مدفوع: العمليات الحالية وثغرات الرقابة ونطاق المرحلة الأولى وخريطة الوحدات والمخاطر، مكتوبة." },
          { title: "إعادة تصميم العمليات", body: "العمليات الحالية والمستهدفة، ومن يفعل ماذا، وإجراء مكتوب لكل عملية، وكيف تُطابق النظام." },
          { title: "تصميم السياسات", body: "سياسات مكتوبة تتحول إلى ضوابط يفرضها النظام: قواعد الموافقة والحدود والصلاحيات والفصل بين المهام." },
          { title: "خارطة التحول", body: "للمجموعات متعددة الشركات: بنية وخطة مرحلية تُدار كبرنامج." },
        ],
      },
      {
        title: "التطبيق",
        lede: "أنو برين المبني على Odoo، مضبوطاً على التصميم.",
        items: [
          { title: "تطبيق أنو برين", body: "المبيعات والمشتريات والمخزون والتصنيع والمحاسبة والموارد البشرية والتقارير، مضبوطة على التصميم المعتمد، بالعربية أولاً." },
          { title: "نقل البيانات والانتقال", body: "قوالب استيراد وتنظيف وإزالة التكرار وتجربتان كاملتان، والمخزون الافتتاحي حسب الموقع، والذمم المفتوحة، وميزان المراجعة الافتتاحي." },
          { title: "وحدات خاصة", body: "حين لا يكفي القياسي: تقدير وبناء واختبار وتسليم مع جولة إرشادية لكل ميزة." },
          { title: "الربط", body: "واتساب والبريد والموازين وأجهزة تتبع GPS وأسعار الصرف والأنظمة التي تعمل بها اليوم." },
        ],
      },
      {
        title: "التشغيل",
        lede: "بعد الإطلاق، يبقى النظام لك ويبقى يعمل.",
        items: [
          { title: "التدريب", body: "جلسات حية لكل عملية، وتدريب المستخدمين الرئيسيين، وجولات إرشادية على الشاشات الحقيقية عند أول دخول." },
          { title: "خطط الدعم", body: "بلاغ من أي شاشة، وأوقات استجابة مكتوبة، وساعات تعديل شهرية، وملاحظة إصلاح لكل إصلاح." },
          { title: "الاستضافة والنسخ الاحتياطي", body: "سحابة أنو مع نسخ احتياطي كل ست ساعات، أو Odoo.sh بحجم مناسب لك؛ بيئات تطوير واختبار وإنتاج." },
          { title: "الترقيات", body: "ترقية الإصدارات ونقل الوحدات القائمة، بتجربة على نسخة قبل الإنتاج." },
        ],
      },
    ],
    packages: {
      kicker: "طرق البدء",
      title: "ثلاثة أحجام للمشروع الأول.",
      lede: "كل منها يبدأ بالتقييم ويكبر على مراحل. الأسعار تأتي بعد التقييم، لا قبله.",
      items: [
        { title: "حزمة الرقابة الأساسية", body: "الضوابط الأساسية لشركة واحدة: المبيعات والمشتريات والمخزون والمحاسبة مع الموافقات." },
        { title: "إطلاق النواة التشغيلية", body: "تشغيل شركة واحدة بالكامل، مع نقل البيانات والتدريب ورعاية مكثفة بعد الإطلاق." },
        { title: "برنامج التحول المرحلي", body: "عدة شركات أو مواقع، تُطلق على مراحل مُدارة ضمن بنية وخارطة طريق." },
      ],
    },
  },
}

export type MethodCopy = {
  meta: { title: string; description: string }
  kicker: string
  title: string
  lede: string
  road: { title: string; lede: string; steps: Item[] }
  gates: { title: string; lede: string; items: string[] }
  rules: { title: string; lede: string; items: Item[] }
  agents: { title: string; body: string; items: Item[] }
  fit: { title: string; lede: string; items: string[] }
}

export const methodCopy: Record<Locale, MethodCopy> = {
  en: {
    meta: {
      title: "The ANU method: engineer the business before configuring the system",
      description:
        "Assess, design, configure, stabilize: the gated ANU delivery method, the rules ANU builds by, and how people and AI agents work together under proof.",
    },
    kicker: "The method",
    title: "Engineer the business before configuring the system.",
    lede: "The system holds whatever process you give it. So we design the process first, prove each step, and only then move on.",
    road: {
      title: "Four stages, one road",
      lede: "Every project, small or large, walks the same road.",
      steps: [
        { title: "Assess", body: "How the company runs, where control breaks, and what phase one must hold. A written assessment, not a sales deck." },
        { title: "Design", body: "To-be processes, roles, approvals and policies, signed off by the people who will live with them." },
        { title: "Configure", body: "ANU Brain set up to the design. Data migrated twice in rehearsal. Opening balances proven against the old books." },
        { title: "Stabilize", body: "Go-live with hypercare, walkthroughs on every screen, support from any screen, and the first month-end closed together." },
      ],
    },
    gates: {
      title: "Gates, not promises",
      lede: "Nothing moves to the next stage until its gate is passed and signed.",
      items: [
        "Scope and phase one agreed in writing",
        "Every process designed and owned by a named person",
        "Master data cleaned and loaded in rehearsal",
        "Opening balances matching the old books",
        "Key users trained on their own data",
        "First month-end closed in the new system",
      ],
    },
    rules: {
      title: "The rules we build by",
      lede: "They are written in every one of our repositories and checked on every change.",
      items: [
        { title: "Proof, not claims", body: "Tests green, types clean, and every screen captured in light and dark, Arabic and English, before anything is called done." },
        { title: "Modular, never patchwork", body: "One source of truth per concern. We extend what exists; we don't stack special cases." },
        { title: "Production-ready, no hard-coding", body: "Business and physical parameters are data, never constants in code." },
        { title: "Standard first", body: "Standard Odoo before custom code. The core is never edited." },
        { title: "Arabic first", body: "Right to left by design, logical layout, numbers and codes that stay readable." },
        { title: "Client separation", body: "One client's names and data never appear in another's system, enforced by automatic scans." },
      ],
    },
    agents: {
      title: "People and AI agents, under the same proof",
      body: "ANU builds with parallel AI agents that each work in their own lane, with a coordination board, an orchestrator and independent reviewers on top. People set the direction and approve every release; the agents bring speed; the proof rules apply to both.",
      items: [
        { title: "Lanes", body: "Each piece of work has its own branch, its own files and its own tests." },
        { title: "Review", body: "Finished work is checked by an independent reviewer before it merges." },
        { title: "Owner gates", body: "Nothing reaches a client's production without a person's yes." },
      ],
    },
    fit: {
      title: "When we are not the right partner",
      lede: "We say no when a project would fail. These are the reasons we write down.",
      items: [
        "You want to automate the chaos without changing how work is done",
        "You need a fixed price before anyone has looked at the business",
        "You want heavy customisation before trying the standard system",
        "No one can be named as a key user, or the data can't be prepared",
      ],
    },
  },
  ar: {
    meta: {
      title: "منهج أنو: هندسة العمل قبل تهيئة النظام",
      description:
        "التقييم والتصميم والتهيئة والتثبيت: منهج أنو المرحلي ببواباته، والقواعد التي نبني بها، وكيف يعمل الناس ووكلاء الذكاء الاصطناعي معاً تحت شرط الدليل.",
    },
    kicker: "المنهج",
    title: "هندسة العمل قبل تهيئة النظام.",
    lede: "النظام يحفظ أي عملية تعطيه إياها. لذلك نصمم العملية أولاً، ونثبت كل خطوة، ثم ننتقل.",
    road: {
      title: "أربع مراحل، طريق واحد",
      lede: "كل مشروع، صغيراً كان أو كبيراً، يسير على الطريق نفسه.",
      steps: [
        { title: "التقييم", body: "كيف تعمل الشركة، وأين تنكسر الرقابة، وما الذي يجب أن تحمله المرحلة الأولى. تقييم مكتوب، لا عرض مبيعات." },
        { title: "التصميم", body: "العمليات المستهدفة والأدوار والموافقات والسياسات، يعتمدها من سيعمل بها." },
        { title: "التهيئة", body: "يُضبط أنو برين على التصميم، وتُنقل البيانات مرتين تجريبياً، وتُثبت الأرصدة الافتتاحية مقابل الدفاتر القديمة." },
        { title: "التثبيت", body: "الإطلاق مع رعاية مكثفة، وجولات إرشادية على كل شاشة، ودعم من أي شاشة، وإغلاق أول شهر معاً." },
      ],
    },
    gates: {
      title: "بوابات لا وعود",
      lede: "لا شيء ينتقل إلى المرحلة التالية حتى تُجتاز بوابته ويوقَّع عليها.",
      items: [
        "النطاق والمرحلة الأولى متفق عليهما كتابةً",
        "كل عملية مصممة ولها مالك مُسمّى",
        "البيانات الأساسية منظفة ومحمّلة تجريبياً",
        "الأرصدة الافتتاحية مطابقة للدفاتر القديمة",
        "المستخدمون الرئيسيون مدرّبون على بياناتهم",
        "أول إغلاق شهري منجز في النظام الجديد",
      ],
    },
    rules: {
      title: "القواعد التي نبني بها",
      lede: "مكتوبة في كل مستودع من مستودعاتنا، وتُفحص مع كل تغيير.",
      items: [
        { title: "الدليل لا الادعاء", body: "اختبارات ناجحة، وأنواع سليمة، وكل شاشة ملتقطة بالوضعين الفاتح والداكن وبالعربية والإنجليزية قبل أن نقول إن شيئاً انتهى." },
        { title: "وحدات لا ترقيع", body: "مصدر واحد للحقيقة لكل شأن. نوسّع الموجود ولا نكدّس الاستثناءات." },
        { title: "جاهز للإنتاج بلا قيم مثبتة", body: "معايير العمل والمعايير المادية بيانات، لا ثوابت في الشيفرة." },
        { title: "القياسي أولاً", body: "Odoo القياسي قبل الشيفرة الخاصة. النواة لا تُعدَّل أبداً." },
        { title: "العربية أولاً", body: "من اليمين إلى اليسار بالتصميم، وتخطيط منطقي، وأرقام ورموز تبقى مقروءة." },
        { title: "فصل العملاء", body: "أسماء عميل وبياناته لا تظهر أبداً في نظام عميل آخر، بفحص آلي." },
      ],
    },
    agents: {
      title: "الناس ووكلاء الذكاء الاصطناعي، تحت الدليل نفسه",
      body: "تبني أنو بوكلاء ذكاء اصطناعي يعملون بالتوازي، لكل منهم مساره، وفوقهم لوحة تنسيق ومنسق ومراجعون مستقلون. الناس يحددون الاتجاه ويعتمدون كل إصدار، والوكلاء يمنحون السرعة، وقواعد الدليل تسري على الطرفين.",
      items: [
        { title: "المسارات", body: "لكل عمل فرعه وملفاته واختباراته." },
        { title: "المراجعة", body: "يفحص مراجع مستقل العمل المنجز قبل دمجه." },
        { title: "بوابات المالك", body: "لا شيء يصل إلى إنتاج عميل دون موافقة إنسان." },
      ],
    },
    fit: {
      title: "حين لا نكون الشريك المناسب",
      lede: "نقول لا حين يكون المشروع محكوماً بالفشل. هذه أسباب نكتبها.",
      items: [
        "تريد أتمتة الفوضى دون تغيير طريقة العمل",
        "تحتاج سعراً ثابتاً قبل أن ينظر أحد في عملك",
        "تريد تخصيصاً ثقيلاً قبل تجربة النظام القياسي",
        "لا يمكن تسمية مستخدم رئيسي، أو لا يمكن تجهيز البيانات",
      ],
    },
  },
}

export type AboutCopy = {
  meta: { title: string; description: string }
  kicker: string
  title: string
  lede: string
  name: { title: string; body: string }
  story: Item[]
  facts: { value: string; label: string }[]
}

export const aboutCopy: Record<Locale, AboutCopy> = {
  en: {
    meta: {
      title: "About ANU Software Solutions",
      description:
        "ANU is a Baghdad software company named for Anu, the Sumerian god of the sky. It redesigns how Iraqi companies run and builds the systems that hold the work.",
    },
    kicker: "About ANU",
    title: "Named for the sky. Built for the ground.",
    lede: "ANU Software Solutions is a Baghdad company that redesigns how businesses run and builds the systems that hold the work, in Arabic and English, for Iraq.",
    name: {
      title: "Why ANU",
      body: "In Sumer, Anu was the god of the sky, the one who sees everything below. Writing itself was born in the cities of southern Iraq to keep accounts: grain, livestock, labour, recorded on clay. Five thousand years later we do the same work with different tools: one clear record, seen from above.",
    },
    story: [
      { title: "Iraqi, and proud of it", body: "We build for how Iraqi companies really work: dinars and dollars, Iraqi months, approvals over WhatsApp that need a home, Arabic first." },
      { title: "Process before software", body: "We started as process people. The system only holds what the design gives it, so the design comes first." },
      { title: "Products, not only projects", body: "What we learn in one company becomes a product for the next: the control layer, walkthroughs, support, and complete industry systems." },
      { title: "One team, people and agents", body: "Engineers and AI agents build in parallel lanes under the same proof rules; people decide and approve." },
    ],
    facts: [
      { value: "17", label: "systems and layers built on one platform" },
      { value: "2", label: "languages as peers, Arabic first" },
      { value: "6 h", label: "between backups on ANU Cloud" },
      { value: "1", label: "source of truth per concern" },
    ],
  },
  ar: {
    meta: {
      title: "عن أنو للحلول البرمجية",
      description:
        "أنو شركة برمجيات في بغداد، اسمها من آنو، إله السماء عند السومريين. تعيد تصميم طريقة عمل الشركات العراقية وتبني الأنظمة التي تحفظ العمل.",
    },
    kicker: "عن أنو",
    title: "اسمنا من السماء، وعملنا على الأرض.",
    lede: "أنو للحلول البرمجية شركة في بغداد تعيد تصميم طريقة عمل الشركات وتبني الأنظمة التي تحفظ العمل، بالعربية والإنجليزية، للعراق.",
    name: {
      title: "لماذا أنو",
      body: "في سومر كان آنو إله السماء، الذي يرى كل ما تحته. والكتابة نفسها وُلدت في مدن جنوب العراق لتسجيل الحسابات: الحبوب والماشية والعمل، مدوّنة على الطين. وبعد خمسة آلاف عام نقوم بالعمل نفسه بأدوات مختلفة: سجل واحد واضح، يُرى من الأعلى.",
    },
    story: [
      { title: "عراقيون، ونفخر بذلك", body: "نبني لطريقة عمل الشركات العراقية فعلاً: الدينار والدولار، والأشهر العراقية، وموافقات واتساب التي تحتاج بيتاً، والعربية أولاً." },
      { title: "العملية قبل البرنامج", body: "بدأنا أهلَ عمليات. النظام لا يحفظ إلا ما يعطيه التصميم، فالتصميم أولاً." },
      { title: "منتجات، لا مشاريع فقط", body: "ما نتعلمه في شركة يصبح منتجاً للتي تليها: طبقة الرقابة والجولات الإرشادية والدعم وأنظمة قطاعية كاملة." },
      { title: "فريق واحد، ناس ووكلاء", body: "مهندسون ووكلاء ذكاء اصطناعي يبنون في مسارات متوازية تحت قواعد الدليل نفسها، والقرار والاعتماد للناس." },
    ],
    facts: [
      { value: "17", label: "نظاماً وطبقة على منصة واحدة" },
      { value: "2", label: "لغتان متساويتان، والعربية أولاً" },
      { value: "6 س", label: "بين نسخة احتياطية وأخرى على سحابة أنو" },
      { value: "1", label: "مصدر واحد للحقيقة لكل شأن" },
    ],
  },
}
