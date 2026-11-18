import type { SystemStory } from "./types"

export const controlLayer: SystemStory = {
  slug: "control-layer",
  group: "layer",
  status: "live",
  order: 2,
  related: ["brain", "walkthroughs", "support"],
  visual: { poster: "/media/systems/control-layer" },
  copy: {
    en: {
      name: "ANU Control Layer",
      short: "Control Layer",
      pitch: "A calm design, clear status signs and a band that shows what needs you, on every screen.",
      summary:
        "ANU Control Layer is the design and control surface ANU puts on every ANU Brain. Each status becomes a square sign with a word, each screen gets a band with its live figures, exceptions and next actions, and a right-click on any record offers only what can be done to it now. Users see at a glance where they are and what is waiting for them, in Arabic or English, light or dark.",
      audience: ["Every ANU Brain user", "Managers who need the numbers", "Operations and back-office teams", "Companies that want their own look"],
      problem: {
        title: "Every screen looks the same, and nothing says what's next",
        body: "A standard business system shows long lists in many colours and buttons in many places. Users can't tell at a glance which orders are late or what they are supposed to do with the record in front of them, so they ask a colleague, export to Excel, or wait.",
        symptoms: [
          "Coloured labels nobody can read the same way",
          "Totals that need a report or an export",
          "The right button hidden in a menu",
          "A system that looks like nobody's",
        ],
      },
      how: {
        title: "Where you are, what's waiting, what to do",
        steps: [
          {
            title: "Open any screen",
            body: "The band at the top names the screen and shows up to four live figures, up to two exceptions and up to four actions for what you're looking at.",
          },
          {
            title: "Search, and the figures follow",
            body: "Narrow the list and the figures recount for it. Click a figure and the list filters to those records.",
          },
          {
            title: "Pick records, the band turns to them",
            body: "Select a few orders or invoices and the band shows their totals and the actions that apply to them.",
          },
          {
            title: "Read the state at a glance",
            body: "Every status is one of six square signs with its word: neutral, in progress, waiting on someone, due, done or alarm.",
          },
          {
            title: "Right-click the record",
            body: "The menu offers the record's own buttons that are valid right now, then print, open in a new tab, copy link, duplicate, archive and delete, each checked against your rights.",
          },
        ],
      },
      inside: {
        title: "How ANU builds it",
        body: "The identity is compiled into the system, not painted over it, and every figure is counted on the server. It installs as one module family on any ANU Brain, Community or Enterprise edition.",
        items: [
          { label: "Tokens, not paint", body: "ANU's colours, type and spacing are fed into the system's own style variables, so every standard and custom screen is built in the identity and stays that way after updates." },
          { label: "Counted as the user", body: "Band figures are counted on the server with the user's own access rights, in one call per screen." },
          { label: "A provider per app", body: "CRM, sales, invoicing, purchase, inventory, manufacturing, HR and helpdesk have their own figures; a generic provider covers every other record, custom ones included." },
          { label: "A menu other modules extend", body: "ANU's products add their own right-click entries, such as Report this screen from ANU Support." },
          { label: "Checked in four combinations", body: "Every screen is captured automatically in light and dark, Arabic and English, and audited for off-brand colours, rounded corners and low contrast." },
        ],
        stack: ["ANU Brain (Odoo 19)", "SCSS design tokens", "OWL components", "Logical CSS for right to left", "Anu Sans and Anu Mono", "Automated screen capture"],
      },
      features: [
        { label: "Six status signs", body: "Square signs with a word replace coloured labels, the same on every app." },
        { label: "Live figures that filter", body: "Up to four counts per screen that follow the search and filter on click." },
        { label: "Exceptions up front", body: "What's late or blocked shows in the band before you scroll." },
        { label: "Right-click on the record", body: "Only the actions valid for this record now, each rights-checked." },
        { label: "Long-press on touch", body: "On tablets and phones the same menu opens as a sheet from the bottom." },
        { label: "Your own skin", body: "Your colours and logo on top of the ANU design, with no rebuild." },
        { label: "A menu you arrange", body: "Each user drags their apps into the order they work in." },
        { label: "Focus that follows you", body: "A soft light tracks the pointer; the card you point at comes forward and the rest recede." },
      ],
      facts: [
        { value: "6", label: "status signs, one meaning each" },
        { value: "4", label: "live figures per screen" },
        { value: "1", label: "server call per screen for the band" },
        { value: "2 × 2", label: "light and dark, Arabic and English, every screen checked" },
      ],
      faq: [
        {
          q: "Does it change our data or workflows?",
          a: "No. It changes how screens look and what they put in front of you. Records, approvals and access rights stay exactly as they are.",
        },
        {
          q: "Can it carry our brand?",
          a: "Yes. Your colours and logo go on top of the ANU design through the theme, on screens, the sign-in page and printouts, with no rebuild.",
        },
        {
          q: "Does it work in Arabic?",
          a: "Yes. It is built right to left from the start, with numbers and phone numbers kept left to right, and every screen is checked in Arabic and English.",
        },
        {
          q: "Can the band show figures someone shouldn't see?",
          a: "No. Figures are counted on the server as the user who is looking, so they only include records that person is allowed to see.",
        },
        {
          q: "Does it work on tablets and phones?",
          a: "Yes. On touch screens a long press opens the record menu as a sheet from the bottom, and the design follows the screen size.",
        },
        {
          q: "We already run Odoo 19. Can we add it?",
          a: "Yes. It installs as a module on Community or Enterprise, and ANU sets up your skin and the figures for the apps you use.",
        },
      ],
      metaTitle: "ANU Control Layer: status, figures and actions on every screen",
      metaDescription:
        "A design and control layer for ANU Brain: six status signs, a band of live figures and actions, and a rights-checked right-click menu, in Arabic and English.",
      keywords: ["Odoo theme Arabic", "Odoo right-click menu", "ERP dashboard band", "Odoo RTL theme", "Odoo UX Iraq"],
    },
    ar: {
      name: "طبقة التحكم من أنو",
      short: "طبقة التحكم",
      pitch: "تصميم هادئ وعلامات حالة واضحة وشريط يُريك ما ينتظرك، على كل شاشة.",
      summary:
        "طبقة التحكم من أنو هي واجهة التصميم والتحكم التي تضعها أنو على كل أنو برين. كل حالة تصبح علامة مربعة مع كلمة، وكل شاشة تحصل على شريط بأرقامها الحية واستثناءاتها والإجراءات التالية، والنقر الأيمن على أي سجل لا يعرض إلا ما يمكن فعله به الآن. فيرى المستخدم من النظرة الأولى أين هو وما الذي ينتظره، بالعربية أو الإنجليزية، في الوضع الفاتح أو الداكن.",
      audience: ["كل مستخدمي أنو برين", "المدراء الذين يحتاجون الأرقام", "فرق العمليات والمكاتب الخلفية", "الشركات التي تريد هويتها الخاصة"],
      problem: {
        title: "كل الشاشات متشابهة، ولا شيء يقول ما التالي",
        body: "يعرض نظام الأعمال المعتاد قوائم طويلة بألوان كثيرة، وأزراراً في أماكن متفرقة. فلا يعرف المستخدم من النظرة الأولى أي الطلبات متأخرة ولا ما المطلوب منه في السجل الذي أمامه، فيسأل زميله أو يصدّر إلى Excel أو ينتظر.",
        symptoms: [
          "تسميات ملوّنة يقرؤها كل شخص بطريقة",
          "مجاميع لا تظهر إلا بتقرير أو تصدير",
          "الزر الصحيح مخفي داخل قائمة",
          "نظام لا يشبه أحداً",
        ],
      },
      how: {
        title: "أين أنت، وما الذي ينتظرك، وماذا تفعل",
        steps: [
          {
            title: "افتح أي شاشة",
            body: "الشريط في الأعلى يسمّي الشاشة ويعرض حتى أربعة أرقام حية، وحتى استثناءين، وحتى أربعة إجراءات لما تنظر إليه.",
          },
          {
            title: "ابحث، فتتبعك الأرقام",
            body: "ضيّق القائمة فيُعاد حساب الأرقام لها. وانقر على رقم فتُصفّى القائمة إلى سجلاته.",
          },
          {
            title: "اختر سجلات، فيتحول الشريط إليها",
            body: "حدّد بضعة طلبات أو فواتير فيعرض الشريط مجاميعها والإجراءات التي تنطبق عليها.",
          },
          {
            title: "اقرأ الحالة من النظرة الأولى",
            body: "كل حالة واحدة من ست علامات مربعة مع كلمتها: محايد، قيد التنفيذ، بانتظار شخص آخر، مستحق، منجز، أو إنذار.",
          },
          {
            title: "انقر بالزر الأيمن على السجل",
            body: "تعرض القائمة أزرار السجل الصالحة الآن، ثم الطباعة والفتح في تبويب جديد ونسخ الرابط والتكرار والأرشفة والحذف، وكلها مقيدة بصلاحياتك.",
          },
        ],
      },
      inside: {
        title: "كيف تبنيها أنو",
        body: "الهوية تُبنى داخل النظام ولا تُطلى فوقه، وكل رقم يُحسب على الخادم. وتُثبَّت مجموعةَ وحدات واحدة على أي أنو برين، بإصدار Community أو Enterprise.",
        items: [
          { label: "متغيرات لا طلاء", body: "ألوان أنو وخطوطها ومسافاتها تُغذّى في متغيرات التنسيق الخاصة بالنظام نفسه، فتُبنى كل شاشة قياسية أو مخصصة بالهوية وتبقى كذلك بعد التحديثات." },
          { label: "يُحسب بصلاحيات المستخدم", body: "أرقام الشريط تُحسب على الخادم بصلاحيات المستخدم نفسه، باستدعاء واحد لكل شاشة." },
          { label: "مزوّد لكل تطبيق", body: "لإدارة العملاء والمبيعات والفوترة والمشتريات والمخزون والتصنيع والموارد البشرية والدعم أرقامها الخاصة، ومزوّد عام يغطي كل سجل آخر بما فيها السجلات المخصصة." },
          { label: "قائمة توسّعها الوحدات الأخرى", body: "تضيف منتجات أنو مداخلها الخاصة إلى قائمة النقر الأيمن، مثل «أبلغ عن هذه الشاشة» من دعم أنو." },
          { label: "فحص بأربع حالات", body: "كل شاشة تُلتقط آلياً بالوضعين الفاتح والداكن وباللغتين العربية والإنجليزية، وتُدقَّق بحثاً عن ألوان خارج الهوية وزوايا مدوّرة وتباين ضعيف." },
        ],
        stack: ["أنو برين (Odoo 19)", "متغيرات تصميم SCSS", "مكوّنات OWL", "CSS منطقي للاتجاه من اليمين", "خطا Anu Sans وAnu Mono", "التقاط آلي للشاشات"],
      },
      features: [
        { label: "ست علامات للحالة", body: "علامات مربعة مع كلمة بدل التسميات الملوّنة، وهي نفسها في كل تطبيق." },
        { label: "أرقام حية تُصفّي", body: "حتى أربعة أرقام لكل شاشة، تتبع البحث وتُصفّي القائمة بنقرة." },
        { label: "الاستثناءات في المقدمة", body: "المتأخر أو المتوقف يظهر في الشريط قبل أن تمرّر الصفحة." },
        { label: "النقر الأيمن على السجل", body: "الإجراءات الصالحة لهذا السجل الآن فقط، وكلها مقيدة بالصلاحيات." },
        { label: "ضغطة مطوّلة على اللمس", body: "على الأجهزة اللوحية والهواتف تفتح القائمة نفسها لوحاً من أسفل الشاشة." },
        { label: "هويتك الخاصة", body: "ألوانك وشعارك فوق تصميم أنو، دون إعادة بناء." },
        { label: "قائمة ترتّبها بنفسك", body: "كل مستخدم يسحب تطبيقاته إلى الترتيب الذي يعمل به." },
        { label: "تركيز يتبعك", body: "ضوء خفيف يتبع المؤشر، فتتقدم البطاقة التي تشير إليها ويتراجع ما حولها." },
      ],
      facts: [
        { value: "6", label: "علامات حالة، لكل منها معنى واحد" },
        { value: "4", label: "أرقام حية لكل شاشة" },
        { value: "1", label: "استدعاء واحد للخادم لكل شاشة" },
        { value: "2 × 2", label: "فاتح وداكن، عربي وإنجليزي، كل شاشة مفحوصة" },
      ],
      faq: [
        {
          q: "هل تغيّر بياناتنا أو مسارات عملنا؟",
          a: "لا. تغيّر شكل الشاشات وما تضعه أمامك فقط. السجلات والموافقات وصلاحيات الوصول تبقى كما هي تماماً.",
        },
        {
          q: "هل يمكن أن تحمل علامتنا التجارية؟",
          a: "نعم. ألوانك وشعارك توضع فوق تصميم أنو عبر الثيم، على الشاشات وصفحة الدخول والمطبوعات، دون إعادة بناء.",
        },
        {
          q: "هل تعمل بالعربية؟",
          a: "نعم. بُنيت من البداية للاتجاه من اليمين إلى اليسار، مع بقاء الأرقام وأرقام الهواتف من اليسار إلى اليمين، وكل شاشة مفحوصة بالعربية والإنجليزية.",
        },
        {
          q: "هل قد يعرض الشريط أرقاماً لا يحق لشخص رؤيتها؟",
          a: "لا. الأرقام تُحسب على الخادم باسم المستخدم الذي ينظر إليها، فلا تشمل إلا السجلات المسموح له برؤيتها.",
        },
        {
          q: "هل تعمل على الأجهزة اللوحية والهواتف؟",
          a: "نعم. على شاشات اللمس تفتح الضغطة المطوّلة قائمة السجل لوحاً من أسفل الشاشة، ويتكيّف التصميم مع حجم الشاشة.",
        },
        {
          q: "نستخدم Odoo 19 حالياً، هل يمكن إضافتها؟",
          a: "نعم. تُثبَّت وحدةً على إصدار Community أو Enterprise، وتضبط أنو هويتك والأرقام الخاصة بالتطبيقات التي تستخدمها.",
        },
      ],
      metaTitle: "طبقة التحكم من أنو: الحالة والأرقام والإجراءات على كل شاشة",
      metaDescription:
        "طبقة تصميم وتحكم لأنو برين: ست علامات للحالة، وشريط بالأرقام الحية والاستثناءات والإجراءات، وقائمة نقر أيمن مقيدة بالصلاحيات، بالعربية والإنجليزية.",
      keywords: ["ثيم Odoo عربي", "واجهة Odoo بالعربية", "لوحة مؤشرات ERP", "تخصيص Odoo العراق", "طبقة التحكم من أنو"],
    },
  },
}
