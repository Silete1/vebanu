import type { SystemStory } from "./types"

export const legal: SystemStory = {
  slug: "legal",
  group: "industry",
  status: "live",
  order: 16,
  related: ["government-hr", "brain", "walkthroughs"],
  visual: { poster: "/media/systems/legal" },
  copy: {
    en: {
      name: "ANU Legal",
      short: "Legal",
      pitch: "Matters, Iraqi deadlines and government transactions for legal teams and law offices.",
      summary:
        "ANU Legal runs an in-house legal department or a law office: every matter, court session, power of attorney and government transaction, with Iraqi statutory deadlines counted for you. Each person starts the day with what is overdue, due today and due this week, and one action for each. It runs inside ANU Brain, so fees, client money and invoices sit in the same books.",
      audience: ["In-house legal departments", "Law offices", "Clerks who follow government transactions", "Holding groups with many companies"],
      problem: {
        title: "Deadlines live in a diary, files sit at a counter",
        body: "A legal team keeps its deadlines in a diary, its powers of attorney in a cabinet and its government files with a runner who reports by phone. When an appeal period ends on a holiday, someone has to remember. When a client asks what they owe, someone opens a spreadsheet.",
        symptoms: [
          "Appeal periods missed or counted wrongly",
          "Government files with no record of the last visit",
          "Powers of attorney that expired before the hearing",
          "Fees and client money tracked by hand",
        ],
      },
      how: {
        title: "From the new matter to the judgment and the invoice",
        steps: [
          {
            title: "Open a matter in one step",
            body: "Pick a matter type: the steps, the documents to collect and the target date are created with it, and the matter goes to the right lawyer or runner.",
          },
          {
            title: "Follow it at the counter",
            body: "Government transactions record each visit to the department, what was submitted and what is still missing, so a file never disappears at a counter.",
          },
          {
            title: "Take it through the courts",
            body: "Lawsuits move through court stages, sessions and judgments. Appeal and objection periods are counted in calendar days, and an end date that falls on a holiday moves to the next working day.",
          },
          {
            title: "Watch every clock on one board",
            body: "My Day and the deadline board show what is overdue, due today and due this week, each with its reason and one action; the agenda lists every session by court and lawyer.",
          },
          {
            title: "Bill and account",
            body: "A law office records fee agreements, instalments and retainers, client money held, invoices and statements, with a conflict check before a new client is taken on.",
          },
        ],
      },
      inside: {
        title: "How ANU builds it",
        body: "A modular suite on ANU Brain: a procedure engine underneath, then registers, contracts, litigation, opinions and money as separate modules, switched on by what the team actually does.",
        items: [
          {
            label: "Iraqi procedures as data",
            body: "Company registration, tax, social security, chamber of commerce and residency procedures ship as data packs. When a circular changes a step, ANU updates the data, not the software.",
          },
          {
            label: "A register true to the paper book",
            body: "The electronic incoming and outgoing register keeps the paper book's own numbers, so the two never disagree.",
          },
          {
            label: "Checks built into the work",
            body: "Court work is checked against the power of attorney it relies on, contracts keep approval apart from drafting, and an issued legal opinion is frozen.",
          },
          {
            label: "Seven roles",
            body: "Runner, lawyer, approver, legal manager, billing, read-only auditor and requester from another department, each seeing what is theirs; confidential matters stay with the people assigned.",
          },
          {
            label: "Upgrade in place",
            body: "An existing legal module can be upgraded where it stands, keeping its matters and history, instead of being migrated by hand.",
          },
        ],
        stack: ["ANU Brain (Odoo 19)", "Python", "OWL screens", "QWeb PDF reports"],
      },
      features: [
        { label: "My Day", body: "Overdue, today and this week for each person, with the reason and one action." },
        { label: "Statutory deadline counting", body: "Calendar days on the Iraqi working calendar, with holidays rolled forward." },
        { label: "Powers of attorney", body: "Scope, validity and expiry, checked before anyone files on them." },
        { label: "Correspondence register", body: "Incoming and outgoing letters numbered like the paper book, with the official letter printed." },
        { label: "Requests from other departments", body: "Departments ask the legal team through the system and follow their own requests." },
        { label: "Contracts and legal opinions", body: "Drafted, approved and issued, with the issued version frozen." },
        { label: "Follow-up sheet", body: "A printed sheet for the runner with steps, documents, visits and a QR code back to the matter." },
        { label: "Law-office money", body: "Fee agreements, instalments, retainers, client money held, invoices and client statements." },
      ],
      facts: [
        { value: "2", label: "modes: legal department and law office, alone or together" },
        { value: "7", label: "roles, from runner to partner" },
        { value: "5", label: "Iraqi procedure packs, kept as data" },
      ],
      faq: [
        {
          q: "Does it count Iraqi legal deadlines correctly?",
          a: "It counts statutory periods in calendar days on the working calendar you keep, and a period that ends on an official holiday moves to the next working day, as Iraqi civil procedure law provides. The rule for each kind of period is a setting your legal manager can see and adjust.",
        },
        {
          q: "Is it for a company's legal department or a law office?",
          a: "Both. A setting chooses the legal department, the law office or both together; the law office adds fee agreements, client money, invoicing, statements and conflict checks.",
        },
        {
          q: "What happens when a government procedure changes?",
          a: "Procedures for company registration, tax, social security, the chamber of commerce and residency are kept as data. A new circular means updating the steps and documents, not waiting for a new version of the software.",
        },
        {
          q: "We already use a legal module. Do we lose our data?",
          a: "No. ANU upgrades an existing legal module in place, keeping its matters and history, and checks every screen before and after the upgrade.",
        },
        {
          q: "Who can see a confidential matter?",
          a: "Only the lawyers assigned to it and those allowed to see every matter, such as the legal manager. A read-only auditor can review everything without changing anything.",
        },
        {
          q: "Is it available in Arabic?",
          a: "Arabic is the main language, right to left, and English is complete. Letters, follow-up sheets and statements print in the reader's language.",
        },
      ],
      metaTitle: "ANU Legal: legal department and law office system",
      metaDescription:
        "Matters, Iraqi deadlines, government transactions, lawsuits, powers of attorney, fees and client money for legal departments and law offices, in Arabic.",
      keywords: [
        "legal department software Iraq",
        "law office management system",
        "Iraqi statutory deadlines",
        "power of attorney register",
        "legal case management Arabic",
      ],
    },
    ar: {
      name: "أنو للشؤون القانونية",
      short: "الشؤون القانونية",
      pitch: "الملفات والمدد القانونية العراقية والمعاملات الحكومية للأقسام القانونية ومكاتب المحاماة.",
      summary:
        "يدير نظام أنو للشؤون القانونية قسماً قانونياً داخل الشركة أو مكتب محاماة: كل ملف وجلسة ووكالة ومعاملة حكومية، مع احتساب المدد القانونية العراقية تلقائياً. يبدأ كل موظف يومه بما تأخر وما يستحق اليوم وهذا الأسبوع، مع إجراء واحد لكل بند. ويعمل داخل أنو برين، فتكون الأتعاب وأموال الموكلين والفواتير في الحسابات نفسها.",
      audience: ["الأقسام القانونية في الشركات", "مكاتب المحاماة", "المعقّبون ومتابعو المعاملات الحكومية", "المجموعات القابضة متعددة الشركات"],
      problem: {
        title: "المدد في مفكرة، والمعاملات عند الشبّاك",
        body: "يحفظ الفريق القانوني مدده في مفكرة، ووكالاته في خزانة، ومعاملاته الحكومية مع معقّب يبلّغ عنها بالهاتف. فإذا انتهت مدة الطعن في يوم عطلة فعلى أحدهم أن يتذكر، وإذا سأل الموكل عمّا عليه فتح أحدهم جدولاً في Excel.",
        symptoms: [
          "مدد طعن تفوت أو تُحسب خطأً",
          "معاملات حكومية بلا سجل لآخر مراجعة",
          "وكالات انتهت قبل موعد الجلسة",
          "أتعاب وأموال موكلين تُتابع يدوياً",
        ],
      },
      how: {
        title: "من فتح الملف إلى الحكم والفاتورة",
        steps: [
          {
            title: "افتح الملف بخطوة واحدة",
            body: "اختر نوع الملف، فتُنشأ معه الخطوات والمستمسكات المطلوبة والموعد المستهدف، ويذهب إلى المحامي أو المعقّب المسؤول.",
          },
          {
            title: "تابعه عند الدائرة",
            body: "تسجّل المعاملات الحكومية كل مراجعة للدائرة، وما قُدّم وما بقي ناقصاً، فلا تضيع معاملة عند شبّاك.",
          },
          {
            title: "امضِ به في المحاكم",
            body: "تمر الدعاوى بمراحل التقاضي والجلسات والأحكام. وتُحسب مدد الطعن والاعتراض بالأيام التقويمية، وإذا وقع آخر يوم في عطلة رسمية انتقل إلى أول يوم عمل بعدها.",
          },
          {
            title: "كل المدد على لوحة واحدة",
            body: "تعرض شاشة «مكتبي» ولوحة المدد ما تأخر وما يستحق اليوم وهذا الأسبوع، لكل بند سببه وإجراء واحد، وتجمع الأجندة الجلسات حسب المحكمة والمحامي.",
          },
          {
            title: "فوتر وحاسب",
            body: "يسجّل مكتب المحاماة اتفاقات الأتعاب والأقساط والأتعاب الدورية وأموال الموكلين المودعة والفواتير وكشوف الحساب، مع فحص تعارض المصالح قبل قبول موكل جديد.",
          },
        ],
      },
      inside: {
        title: "كيف تبنيه أنو",
        body: "مجموعة وحدات على أنو برين: محرك للإجراءات في الأساس، ثم السجلات والعقود والتقاضي والآراء القانونية والمالية وحدات مستقلة، تُفعَّل بحسب ما يعمله الفريق فعلاً.",
        items: [
          {
            label: "الإجراءات العراقية بيانات",
            body: "إجراءات تسجيل الشركات والضريبة والضمان الاجتماعي وغرفة التجارة والإقامة تأتي حزمَ بيانات. وإذا غيّر تعميمٌ خطوةً، تحدّث أنو البيانات لا البرنامج.",
          },
          {
            label: "سجل مطابق للدفتر الورقي",
            body: "يحتفظ سجل الوارد والصادر الإلكتروني بأرقام الدفتر الورقي نفسها، فلا يختلف الاثنان أبداً.",
          },
          {
            label: "ضوابط داخل العمل نفسه",
            body: "يُفحص العمل أمام المحاكم مقابل الوكالة التي يستند إليها، وتُفصل صلاحية اعتماد العقد عن صياغته، ويُجمَّد الرأي القانوني بعد إصداره.",
          },
          {
            label: "سبعة أدوار",
            body: "المعقّب والمحامي والمعتمِد والمدير القانوني والمحاسبة القانونية والمدقق للقراءة فقط وطالب الخدمة من قسم آخر، ولكلٍّ ما يخصه، والملفات السرية تبقى مع المكلّفين بها.",
          },
          {
            label: "ترقية في المكان",
            body: "يمكن ترقية وحدة قانونية قائمة في مكانها مع الحفاظ على ملفاتها وتاريخها، بدل نقلها يدوياً.",
          },
        ],
        stack: ["أنو برين (Odoo 19)", "Python", "شاشات OWL", "تقارير QWeb PDF"],
      },
      features: [
        { label: "مكتبي", body: "ما تأخر وما يستحق اليوم وهذا الأسبوع لكل موظف، مع السبب وإجراء واحد." },
        { label: "احتساب المدد القانونية", body: "بالأيام التقويمية على تقويم العمل العراقي، مع ترحيل العطل إلى أول يوم عمل." },
        { label: "الوكالات", body: "نطاقها وصلاحيتها وتاريخ انتهائها، تُفحص قبل أن يُقام عليها أي إجراء." },
        { label: "سجل الوارد والصادر", body: "الكتب الواردة والصادرة بترقيم الدفتر الورقي، مع طباعة الكتاب الرسمي." },
        { label: "طلبات الأقسام الأخرى", body: "ترفع الأقسام طلباتها إلى الشؤون القانونية عبر النظام وتتابعها بنفسها." },
        { label: "العقود والآراء القانونية", body: "تُصاغ وتُعتمد وتُصدر، وتُجمَّد النسخة الصادرة." },
        { label: "استمارة المتابعة", body: "ورقة مطبوعة للمعقّب فيها الخطوات والمستمسكات والمراجعات ورمز QR يعيد إلى الملف." },
        { label: "مالية مكتب المحاماة", body: "اتفاقات الأتعاب والأقساط والأتعاب الدورية وأموال الموكلين والفواتير وكشوف الحساب." },
      ],
      facts: [
        { value: "2", label: "نمطان: قسم قانوني ومكتب محاماة، كلٌّ وحده أو معاً" },
        { value: "7", label: "أدوار، من المعقّب إلى الشريك" },
        { value: "5", label: "حزم إجراءات عراقية محفوظة بيانات" },
      ],
      faq: [
        {
          q: "هل يحتسب المدد القانونية العراقية بشكل صحيح؟",
          a: "يحتسب المدد القانونية بالأيام التقويمية وفق تقويم العمل الذي تعتمده الجهة، وإذا انتهت المدة في عطلة رسمية امتدت إلى أول يوم عمل بعدها كما ينص قانون المرافعات المدنية. وقاعدة كل نوع من المدد إعداد يراه المدير القانوني ويعدّله.",
        },
        {
          q: "هل هو لقسم قانوني في شركة أم لمكتب محاماة؟",
          a: "للاثنين. يختار إعداد واحد القسم القانوني أو مكتب المحاماة أو كليهما معاً، ويضيف مكتب المحاماة اتفاقات الأتعاب وأموال الموكلين والفوترة وكشوف الحساب وفحص تعارض المصالح.",
        },
        {
          q: "ماذا يحدث إذا تغيّر إجراء حكومي؟",
          a: "إجراءات تسجيل الشركات والضريبة والضمان الاجتماعي وغرفة التجارة والإقامة محفوظة بيانات. فالتعميم الجديد يعني تحديث الخطوات والمستمسكات، لا انتظار إصدار جديد من البرنامج.",
        },
        {
          q: "نستخدم وحدة قانونية حالياً، فهل نفقد بياناتنا؟",
          a: "لا. ترقّي أنو الوحدة القانونية القائمة في مكانها مع الحفاظ على ملفاتها وتاريخها، وتدقّق كل شاشة قبل الترقية وبعدها.",
        },
        {
          q: "من يرى الملف السري؟",
          a: "المحامون المكلّفون به ومن له صلاحية رؤية كل الملفات كالمدير القانوني فقط. أما المدقق فيطّلع على كل شيء دون أن يستطيع تغيير شيء.",
        },
        {
          q: "هل يتوفر بالعربية؟",
          a: "العربية هي اللغة الأساسية من اليمين إلى اليسار، والإنجليزية كاملة. وتُطبع الكتب واستمارات المتابعة وكشوف الحساب بلغة القارئ.",
        },
      ],
      metaTitle: "أنو للشؤون القانونية: نظام القسم القانوني ومكتب المحاماة",
      metaDescription:
        "الملفات والمدد القانونية العراقية والمعاملات الحكومية والدعاوى والوكالات والأتعاب وأموال الموكلين للأقسام القانونية ومكاتب المحاماة، بالعربية.",
      keywords: [
        "نظام الشؤون القانونية العراق",
        "برنامج إدارة مكتب محاماة",
        "احتساب المدد القانونية",
        "سجل الوكالات",
        "إدارة الدعاوى بالعربية",
      ],
    },
  },
}
