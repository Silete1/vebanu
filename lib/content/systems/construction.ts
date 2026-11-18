import type { SystemStory } from "./types"

export const construction: SystemStory = {
  slug: "construction",
  group: "industry",
  status: "demo",
  order: 13,
  related: ["twins", "qalib", "brain"],
  visual: { poster: "/media/systems/construction" },
  copy: {
    en: {
      name: "ANU Construction",
      short: "Construction",
      pitch: "One system for developers who build, sell and operate: contractors, sites, units, cash.",
      summary:
        "ANU Construction is one ERP for a real-estate developer that builds, sells and operates. Contractor payment certificates, site stores, off-plan unit sales on instalments, after-handover services, hotel revenue and the cash forecast all live in ANU Brain, in Arabic, and every payment passes an approval matrix by amount. Management sees the cost of each tower, the cash for the coming weeks and what a change in the dinar rate would do to both.",
      audience: ["Real-estate developers", "Main contractors", "Developers who also run hotels", "Finance and project-control teams"],
      problem: {
        title: "Building, selling and cash live in different places",
        body: "Contractor certificates sit in spreadsheets, site stores in notebooks, instalments in a separate sales program, and the hotels' nightly revenue in a report nobody posts. When the board asks how much cash is left for the next tower, the answer takes a week.",
        symptoms: [
          "Contractors paid without measured quantities",
          "Materials issued to sites, never charged back",
          "Instalments due that nobody chased",
          "A cash forecast rebuilt by hand every month",
        ],
      },
      how: {
        title: "One record from the tender to the owners' association",
        steps: [
          {
            title: "Plan and award",
            body: "Bills of quantities with material standards, and costs split by project, building and cost element. Contractors are prequalified, tenders compared, and subcontracts awarded as materials and labour, or labour only.",
          },
          {
            title: "Run the sites",
            body: "Material requests pass approval and are issued to the project at cost, and contractor custody is tracked. The site engineer files the daily report from a phone: labour, plant, work done, photos, safety and concrete cube tests.",
          },
          {
            title: "Pay on measured work",
            body: "Interim payment certificates come from approved quantities, with developer-supplied materials charged back, variation orders, retention and guarantees. A failed cube test stops payment for that item.",
          },
          {
            title: "Sell the units",
            body: "Towers and units, reservations with a refundable deposit, instalment plans invoiced as they fall due, then handover. Buyers follow their apartment, instalments and receipts on a portal, with reminders on WhatsApp.",
          },
          {
            title: "Operate after handover",
            body: "Service charges per complex, shared by area, by unit value or equally; generator amperes; maintenance requests; the owners' association. Hotels post the night audit as a daily entry.",
          },
          {
            title: "Watch the cash",
            body: "Payment requests through the approval matrix, a weekly and monthly forecast in dinars and dollars, a dinar-shock view, and a monthly board pack in one click.",
          },
        ],
      },
      inside: {
        title: "How ANU builds it",
        body: "Standard ERP apps first: purchasing, sales, inventory, accounting, approvals and the portal. Contracting, Real Estate and Hotels are apps of their own only where the work needs them.",
        items: [
          { label: "Developer accounting", body: "Construction cost is capitalised per tower. Deposits and instalments are held as liabilities until handover, when revenue is recognised and the unit's cost comes from its area and the tower's cost." },
          { label: "An approval matrix for any document", body: "Multi-step approvals by amount and company, inside the standard Approvals app, with approvers notified as activities." },
          { label: "Dinars and dollars", body: "Rates typed per 100 dollars as the market quotes them, exchange-house settlements, and a dinar-shock view of cash, receivables, unit margins and thirteen weeks of cash flow." },
          { label: "Off-plan compliance", body: "An escrow account statement per project, the monthly report to the investment authority as an Arabic PDF and Excel file, contract filing deadlines and title transfer, set per complex." },
          { label: "Paper you can verify", body: "Receipts, instalment schedules and handover reports carry a QR code that opens a public check showing only the basics, with no personal data beyond initials." },
          { label: "Ready for the twin", body: "The same records can drive ANU's live 3D digital twin of the portfolio." },
        ],
        stack: ["ANU Brain (Odoo 20)", "Contracting, Real Estate and Hotels apps", "Approval matrix", "Spreadsheet dashboards", "Buyer portal", "WhatsApp templates"],
      },
      features: [
        { label: "BOQ and payment certificates", body: "Measured works, material reconciliation, variations and retention release." },
        { label: "Site stores", body: "Material requests, issue at cost, contractor custody and maintenance spares." },
        { label: "Daily site report", body: "From the engineer's phone, approved by the project manager, updating progress." },
        { label: "Instalment sales", body: "Deposits, payment plans, invoices as they fall due, handover and title transfer." },
        { label: "Buyer portal", body: "\"My apartment\": the unit, instalments, receipts, construction photos and maintenance requests." },
        { label: "Community services", body: "Service charges, generator amperes, fuel logs and the owners' association." },
        { label: "Hotel finance", body: "Daily revenue posted, occupancy, and departmental profit against budget." },
        { label: "Executive dashboards", body: "Cash, sales, construction and hotels, plus a monthly board pack." },
      ],
      facts: [
        { value: "13", label: "weeks of cash flow under a dinar-rate shock" },
        { value: "7 / 28", label: "day concrete cube tests, filed from the site" },
        { value: "1 click", label: "monthly board pack, Arabic PDF and Excel" },
      ],
      faq: [
        {
          q: "Can we start with contracting only?",
          a: "Yes. Contracting, site stores, unit sales, community services, hotels and the dashboards are separate modules. Start with the part that hurts most and add the rest in phases.",
        },
        {
          q: "Does it handle dinars and dollars together?",
          a: "Yes. Contracts, instalments and payments can be in either currency, rates are entered per 100 dollars, and the cash forecast shows both, with the effect of a rate change.",
        },
        {
          q: "Do site engineers need a computer?",
          a: "No. The daily site report and material requests work from a phone, with photos. The project manager approves them, and approved quantities feed the next payment certificate.",
        },
        {
          q: "Does it follow the rules for selling units off plan?",
          a: "It includes a compliance pack for the investment authority: an escrow statement per project, the monthly report, contract filing deadlines and title transfer tracking. Each complex is set as not covered, voluntary or bound.",
        },
        {
          q: "Is this our accounting system too?",
          a: "Yes. Certificates, instalments, hotel revenue and payments post standard entries in ANU Brain's accounting, so every report comes from the ledger, not from a copy.",
        },
        {
          q: "Is it running today?",
          a: "It runs as a complete demo with every module and a worked portfolio. ANU sets it up on your projects, contracts and units, and brings in your opening balances.",
        },
      ],
      metaTitle: "ANU Construction: ERP for real-estate developers",
      metaDescription:
        "Contractor certificates, site stores, off-plan instalment sales, a buyer portal, hotel revenue and cash forecasts in dinars and dollars, in one Arabic ERP.",
      keywords: ["construction ERP Iraq", "real estate developer software", "BOQ and IPC", "instalment sales system", "contractor payment certificates"],
    },
    ar: {
      name: "أنو للمقاولات والتطوير العقاري",
      short: "المقاولات والعقار",
      pitch: "نظام واحد للمطوّر الذي يبني ويبيع ويشغّل: المقاولون والمواقع والوحدات والنقد.",
      summary:
        "أنو للمقاولات والتطوير العقاري نظام واحد للمطوّر العقاري الذي يبني ويبيع ويشغّل. مستحقات المقاولين ومخازن المواقع وبيع الوحدات على المخطط بالأقساط وخدمات ما بعد التسليم وإيرادات الفنادق وتوقعات النقد كلها في أنو برين بالعربية، وكل صرف يمر بمصفوفة موافقات حسب المبلغ. وترى الإدارة كلفة كل برج والنقد للأسابيع القادمة وأثر تغيّر سعر الدينار عليهما.",
      audience: ["المطوّرون العقاريون", "المقاولون الرئيسيون", "مطوّرون يديرون فنادق أيضاً", "فرق المالية ومراقبة المشاريع"],
      problem: {
        title: "البناء في مكان، والبيع في آخر، والنقد في ثالث",
        body: "ذرعات المقاولين في جداول Excel، ومخازن المواقع في دفاتر، والأقساط في برنامج مبيعات منفصل، وإيراد الفنادق الليلي في تقرير لا يُرحَّل. وحين يسأل مجلس الإدارة كم بقي من النقد للبرج القادم، يستغرق الجواب أسبوعاً.",
        symptoms: [
          "مقاولون يُدفع لهم بلا كميات مذروعة",
          "مواد تُصرف للمواقع ولا تُحمَّل على المقاول",
          "أقساط مستحقة لم يتابعها أحد",
          "توقعات نقد تُعاد يدوياً كل شهر",
        ],
      },
      how: {
        title: "سجل واحد من المناقصة إلى اتحاد الملاك",
        steps: [
          {
            title: "خطّط وأحِل",
            body: "جداول كميات بمعايير المواد، والكلف موزعة على المشروع والمبنى وعنصر الكلفة. يُؤهَّل المقاولون وتُقارن العطاءات، وتُحال العقود الفرعية كرستة وعمل أو عملاً فقط.",
          },
          {
            title: "أدِر المواقع",
            body: "طلبات المواد تمر بالموافقة وتُصرف للمشروع بكلفتها، وعهد المقاولين متابَعة. ويقدّم مهندس الموقع التقرير اليومي من هاتفه: العمالة والآليات والأعمال المنجزة والصور والسلامة وفحوص مكعبات الخرسانة.",
          },
          {
            title: "ادفع على الذرعة",
            body: "تصدر المستحقات المرحلية من الكميات المعتمدة، مع تحميل المواد التي وفّرها المطوّر على المقاول، وأوامر الغيار والأمانات وخطابات الضمان. والمكعب الراسب يوقف صرف ذلك البند.",
          },
          {
            title: "بِع الوحدات",
            body: "الأبراج والوحدات، والحجز بعربون قابل للرد، وجداول أقساط تُفوتر عند استحقاقها، ثم التسليم. ويتابع المشتري شقته وأقساطه ووصولاته في بوابة، مع تذكيرات على WhatsApp.",
          },
          {
            title: "شغّل بعد التسليم",
            body: "رسوم الخدمات لكل مجمع، موزعة حسب المساحة أو قيمة الوحدة أو بالتساوي، وأمبيرات المولدات، وطلبات الصيانة، واتحاد الملاك. وترحّل الفنادق التدقيق الليلي قيداً يومياً.",
          },
          {
            title: "راقب النقد",
            body: "طلبات الصرف عبر مصفوفة الموافقات، وتوقعات أسبوعية وشهرية بالدينار والدولار، ولوحة صدمة الدينار، وحزمة شهرية لمجلس الإدارة بضغطة واحدة.",
          },
        ],
      },
      inside: {
        title: "كيف تبنيه أنو",
        body: "التطبيقات القياسية أولاً: المشتريات والمبيعات والمخزون والمحاسبة والموافقات والبوابة. أما المقاولات والعقارات والفنادق فتطبيقات مستقلة حيث يحتاجها العمل فقط.",
        items: [
          { label: "محاسبة المطوّر", body: "تُرسمَل كلف الإنشاء لكل برج، وتبقى العرابين والأقساط التزامات حتى التسليم، فيُعترف بالإيراد حينها وتأتي كلفة الوحدة من مساحتها وكلفة البرج." },
          { label: "مصفوفة موافقات لأي مستند", body: "موافقات متعددة المراحل حسب المبلغ والشركة، داخل تطبيق الموافقات القياسي، ويُنبَّه المعتمِدون بالأنشطة." },
          { label: "الدينار والدولار", body: "أسعار تُكتب لكل 100 دولار كما يسعّرها السوق، وتسويات مع مكاتب الصيرفة، ولوحة صدمة الدينار للنقد والذمم وهوامش الوحدات وتدفقات ثلاثة عشر أسبوعاً." },
          { label: "الامتثال في البيع على المخطط", body: "كشف حساب الضمان لكل مشروع، والتقرير الشهري لهيئة الاستثمار بملف PDF عربي وملف Excel، ومهل إيداع العقود ونقل الملكية، تُضبط لكل مجمع." },
          { label: "ورق يمكن التحقق منه", body: "الوصولات وجداول الأقساط ومحاضر التسليم تحمل رمز QR يفتح صفحة تحقق عامة بالأساسيات فقط، بلا بيانات شخصية سوى الأحرف الأولى." },
          { label: "جاهز للتوأم الرقمي", body: "السجلات نفسها يمكن أن تحرّك التوأم الرقمي الحي الثلاثي الأبعاد للمحفظة." },
        ],
        stack: ["أنو برين (Odoo 20)", "تطبيقات المقاولات والعقارات والفنادق", "مصفوفة الموافقات", "لوحات جداول البيانات", "بوابة المشتري", "قوالب WhatsApp"],
      },
      features: [
        { label: "جداول الكميات والمستحقات", body: "الذرعات وتسوية المواد وأوامر الغيار وإطلاق الأمانات." },
        { label: "مخازن المواقع", body: "طلبات المواد والصرف بالكلفة وعهد المقاولين وقطع غيار الصيانة." },
        { label: "التقرير اليومي للموقع", body: "من هاتف المهندس، يعتمده مدير المشروع، ويحدّث نسب الإنجاز." },
        { label: "البيع بالأقساط", body: "العرابين وجداول الدفع والفواتير عند الاستحقاق والتسليم ونقل الملكية." },
        { label: "بوابة المشتري", body: "«شقتي»: الوحدة والأقساط والوصولات وصور البناء وطلبات الصيانة." },
        { label: "خدمات المجمعات", body: "رسوم الخدمات وأمبيرات المولدات وسجل الوقود واتحاد الملاك." },
        { label: "مالية الفنادق", body: "ترحيل الإيراد اليومي والإشغال وأرباح الأقسام مقابل الموازنة." },
        { label: "لوحات الإدارة العليا", body: "النقد والمبيعات والإنشاء والفنادق، مع حزمة شهرية لمجلس الإدارة." },
      ],
      facts: [
        { value: "13", label: "أسبوعاً من التدفقات النقدية تحت صدمة سعر الدينار" },
        { value: "7 / 28", label: "يوماً: فحوص مكعبات الخرسانة من تقرير الموقع" },
        { value: "1", label: "ضغطة لحزمة مجلس الإدارة الشهرية، PDF عربي وExcel" },
      ],
      faq: [
        {
          q: "هل يمكن أن نبدأ بالمقاولات وحدها؟",
          a: "نعم. المقاولات ومخازن المواقع وبيع الوحدات وخدمات المجمعات والفنادق واللوحات وحدات منفصلة. ابدأ بالجزء الأكثر إيلاماً وأضف الباقي على مراحل.",
        },
        {
          q: "هل يتعامل مع الدينار والدولار معاً؟",
          a: "نعم. العقود والأقساط والدفعات بأي من العملتين، والأسعار تُدخل لكل 100 دولار، وتوقعات النقد تعرض العملتين مع أثر تغيّر السعر.",
        },
        {
          q: "هل يحتاج مهندسو المواقع إلى حاسوب؟",
          a: "لا. التقرير اليومي وطلبات المواد تعمل من الهاتف مع الصور. يعتمدها مدير المشروع، والكميات المعتمدة تغذّي الذرعة القادمة.",
        },
        {
          q: "هل يلتزم بتعليمات بيع الوحدات على المخطط؟",
          a: "يتضمن حزمة امتثال لهيئة الاستثمار: كشف حساب الضمان لكل مشروع، والتقرير الشهري، ومهل إيداع العقود، ومتابعة نقل الملكية. ويُضبط كل مجمع على أنه غير مشمول أو ملتزم طوعاً أو ملزم.",
        },
        {
          q: "هل هو نظامنا المحاسبي أيضاً؟",
          a: "نعم. المستحقات والأقساط وإيرادات الفنادق والدفعات ترحّل قيوداً قياسية في محاسبة أنو برين، فيأتي كل تقرير من دفتر الأستاذ لا من نسخة عنه.",
        },
        {
          q: "هل يعمل اليوم؟",
          a: "يعمل نسخةً تجريبية كاملة بكل وحداته ومحفظة مشاريع نموذجية. وتضبطه أنو على مشاريعك وعقودك ووحداتك، وتُدخل أرصدتك الافتتاحية.",
        },
      ],
      metaTitle: "أنو للمقاولات والتطوير العقاري: نظام ERP للمطوّرين",
      metaDescription:
        "مستحقات المقاولين ومخازن المواقع وبيع الوحدات بالأقساط وبوابة المشتري وإيرادات الفنادق وتوقعات النقد بالدينار والدولار، في نظام ERP عربي واحد للمطوّر العقاري.",
      keywords: ["نظام مقاولات العراق", "برنامج المطور العقاري", "جداول الكميات والذرعات", "نظام بيع الشقق بالأقساط", "مستحقات المقاولين"],
    },
  },
}
