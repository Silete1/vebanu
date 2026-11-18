import type { SystemStory } from "./types"

export const brain: SystemStory = {
  slug: "brain",
  group: "core",
  status: "live",
  order: 1,
  related: ["control-layer", "walkthroughs", "support"],
  visual: { poster: "/media/systems/brain", scene: "network" },
  copy: {
    en: {
      name: "ANU Brain",
      short: "ANU Brain",
      pitch: "Your company's system, Arabic first and under your brand, hosted and run by ANU.",
      summary:
        "ANU Brain is the business system ANU delivers to every client: built on Odoo, Arabic first, and carrying your own name and colours. ANU shapes it around how your company works, brings in your data and hosts it on ANU Cloud, with its own address, staged environments and backups every six hours. Sales, stock, accounting and every ANU industry system run inside it as one system.",
      audience: [
        "Companies outgrowing Excel and paper",
        "Trading and distribution",
        "Manufacturers and workshops",
        "Groups with several branches",
        "Teams that work in Arabic",
      ],
      problem: {
        title: "Spreadsheets, chat groups and a server nobody owns",
        body: "Sales live in one file, stock in another, and the accounts only come together at month end. Ready-made systems speak English first and carry someone else's name, and whoever installed the server has moved on. Nobody can say which number is true today.",
        symptoms: [
          "Every branch keeps its own spreadsheet",
          "Approvals given in a WhatsApp chat, then lost",
          "Arabic bolted on as an afterthought",
          "No one knows when the last backup ran",
        ],
      },
      how: {
        title: "From the way you work to a running system",
        steps: [
          {
            title: "Map the work first",
            body: "ANU studies how orders, stock, money and approvals really move, then agrees what the first phase covers. The business is engineered before the system is configured.",
          },
          {
            title: "Set up your Brain",
            body: "Your company gets its own project on ANU Cloud: its own address, the apps you need, the ANU layer, and your logo and colours.",
          },
          {
            title: "Bring your data in",
            body: "Customers, suppliers, products and the chart of accounts are imported, cleaned and de-duplicated; opening balances and opening stock are loaded after a full rehearsal.",
          },
          {
            title: "Go live in stages",
            body: "Every change is built in development and checked in staging, and reaches production only with a two-factor confirmation.",
          },
          {
            title: "Run it with ANU",
            body: "Backups every six hours, help from inside the system, and upgrades to new versions carried over your own data.",
          },
        ],
      },
      inside: {
        title: "How ANU builds it",
        body: "ANU Brain is Odoo, configured and extended by ANU and delivered as one product. Standard features come first; ANU writes code only where the work must be blocked, combined, secured or orchestrated, and never edits the core, so upgrades stay open.",
        items: [
          { label: "One company, one project", body: "Each client runs separately, with its own address, apps and backups. One client's names and files never appear in another client's system." },
          { label: "Your brand, no rebuild", body: "Logo and colours go through the theme. Browser tabs, the sign-in page, emails and printouts carry ANU's name or yours, never another vendor's." },
          { label: "The ANU layer on every Brain", body: "The Control Band, the right-click menu, walkthroughs and in-app support come with every system." },
          { label: "Staged environments", body: "Development, staging and production, built from source control. Promoting a change to production needs a second factor." },
          { label: "Backups you can use", body: "Automatic backups every six hours, ready to download or restore." },
          { label: "One printed layout", body: "Reports and invoices print in one clean layout, in the language of the customer." },
        ],
        stack: ["ANU Brain (Odoo 19)", "Odoo 20", "Community and Enterprise editions", "PostgreSQL", "Docker", "Git-based builds"],
      },
      features: [
        { label: "Arabic first", body: "Right to left by default, English as an equal, numbers and phone numbers kept left to right." },
        { label: "White-label", body: "Your name, logo and colours on the screens, the sign-in page and every document." },
        { label: "Hosted by ANU", body: "ANU Cloud runs the servers, certificates and updates. Your team needs only a browser." },
        { label: "Backups every six hours", body: "Taken automatically, and restorable when you need them." },
        { label: "Dinars and dollars", body: "Each transaction keeps its own currency and rate; reports come out in your company currency." },
        { label: "Industry systems inside", body: "ANU's systems for workshops and other sectors install as apps of the same Brain, not as separate programs." },
        { label: "Any screen", body: "Computers, tablets and phones, with nothing to install." },
      ],
      facts: [
        { value: "6 h", label: "between automatic backups" },
        { value: "3", label: "environments: development, staging, production" },
        { value: "2", label: "languages as equals, Arabic first" },
        { value: "19 · 20", label: "Odoo versions ANU builds on" },
      ],
      faq: [
        {
          q: "What is ANU Brain built on?",
          a: "On Odoo, configured and extended by ANU. Your team sees ANU Brain, or your own brand, on every screen and printout.",
        },
        {
          q: "Can you bring in our existing data?",
          a: "Yes. ANU imports customers, suppliers, products and the chart of accounts from Excel or your old system, cleans and de-duplicates them, and loads opening balances, open receivables and payables and opening stock by location before go-live.",
        },
        {
          q: "Where is our system hosted?",
          a: "On ANU Cloud, ANU's own hosting, where each company is a separate project with its own address and backups every six hours. ANU can also run it on Odoo's official cloud. Either way ANU keeps it running; you never manage a server.",
        },
        {
          q: "Does it work on phones, and without internet?",
          a: "It runs in the browser on computers, tablets and phones, with nothing to install. It needs a connection to work in, but your data stays safe on the server whatever happens at the office. Where field staff must work offline, ANU adds screens that sync when the connection returns.",
        },
        {
          q: "Is it in Arabic? What about Kurdish?",
          a: "Arabic is the default and English is an equal, on screen and on every printout. Kurdish Sorani is in preparation and will be released after review by native speakers.",
        },
        {
          q: "What happens when a new version comes out?",
          a: "ANU ports its modules and upgrades your system in place, over your own data, after testing on a copy in staging. Because the core is never edited, the upgrade path stays open.",
        },
      ],
      metaTitle: "ANU Brain: your company system, built on Odoo",
      metaDescription:
        "ANU Brain is a white-label business system built on Odoo, Arabic first, hosted on ANU Cloud with staged environments and backups every six hours.",
      keywords: ["Odoo Iraq", "Arabic ERP Iraq", "Odoo hosting Iraq", "white-label ERP", "ERP Baghdad"],
    },
    ar: {
      name: "أنو برين",
      short: "أنو برين",
      pitch: "نظام شركتك، بالعربية أولاً وتحت علامتك، تستضيفه أنو وتديره.",
      summary:
        "أنو برين هو نظام الأعمال الذي تسلّمه أنو لكل عملائها: مبني على Odoo، والعربية فيه أولاً، ويحمل اسمك وألوانك. تبنيه أنو حول طريقة عمل شركتك، وتنقل إليه بياناتك، وتستضيفه على أنو كلاود بعنوان خاص وبيئات متدرجة ونسخ احتياطية كل ست ساعات. والمبيعات والمخزون والحسابات وكل أنظمة أنو القطاعية تعمل داخله نظاماً واحداً.",
      audience: ["شركات تجاوزت Excel والورق", "التجارة والتوزيع", "المصانع والورش", "المجموعات متعددة الفروع", "فرق تعمل بالعربية"],
      problem: {
        title: "جداول ومجموعات محادثة وخادم لا يملكه أحد",
        body: "المبيعات في ملف والمخزون في ملف آخر، والحسابات لا تجتمع إلا آخر الشهر. والأنظمة الجاهزة إنجليزية أولاً وتحمل اسم غيرك، ومن ركّب الخادم رحل منذ زمن. ولا أحد يستطيع أن يقول أي رقم هو الصحيح اليوم.",
        symptoms: [
          "كل فرع يحتفظ بجدوله الخاص",
          "موافقات تُعطى في محادثة WhatsApp ثم تضيع",
          "العربية مضافة إلى البرنامج في آخر لحظة",
          "لا أحد يعرف متى أُخذت آخر نسخة احتياطية",
        ],
      },
      how: {
        title: "من طريقة عملك إلى نظام يعمل",
        steps: [
          {
            title: "ارسم العمل أولاً",
            body: "تدرس أنو كيف تتحرك الطلبات والمخزون والأموال والموافقات فعلاً، ثم تتفق معك على ما تغطيه المرحلة الأولى. هندسة العمل قبل تهيئة النظام.",
          },
          {
            title: "جهّز نظامك",
            body: "تحصل شركتك على مشروع خاص بها على أنو كلاود: عنوانها الخاص، والتطبيقات التي تحتاجها، وطبقة أنو، وشعارك وألوانك.",
          },
          {
            title: "انقل بياناتك",
            body: "يُستورد الزبائن والموردون والمنتجات ودليل الحسابات، وتُنظَّف البيانات وتُحذف المكررات، ثم تُحمَّل الأرصدة الافتتاحية والمخزون الافتتاحي بعد تجربة كاملة.",
          },
          {
            title: "انطلق على مراحل",
            body: "كل تغيير يُبنى في بيئة التطوير ويُفحص في بيئة الاختبار، ولا يصل إلى بيئة التشغيل إلا بتأكيد عبر المصادقة الثنائية.",
          },
          {
            title: "شغّله مع أنو",
            body: "نسخ احتياطية كل ست ساعات، ودعم من داخل النظام، وترقيات إلى الإصدارات الجديدة تُنقل فوق بياناتك نفسها.",
          },
        ],
      },
      inside: {
        title: "كيف تبنيه أنو",
        body: "أنو برين هو Odoo بعد أن تهيّئه أنو وتوسّعه وتسلّمه منتجاً واحداً. الميزات القياسية أولاً، ولا تكتب أنو شيفرة إلا حيث يجب أن يُمنع العمل أو يُجمَع أو يُؤمَّن أو يُنسَّق، ولا تمسّ النواة أبداً، فيبقى طريق الترقية مفتوحاً.",
        items: [
          { label: "شركة واحدة، مشروع واحد", body: "كل عميل يعمل منفصلاً بعنوانه وتطبيقاته ونسخه الاحتياطية. ولا يظهر اسم عميل أو ملفاته في نظام عميل آخر." },
          { label: "علامتك دون إعادة بناء", body: "الشعار والألوان تمر عبر الثيم. وتبويبات المتصفح وصفحة الدخول والرسائل والمطبوعات تحمل اسم أنو أو اسمك، لا اسم أي مورّد آخر." },
          { label: "طبقة أنو في كل نظام", body: "شريط التحكم وقائمة النقر الأيمن والجولات الإرشادية والدعم من داخل النظام تأتي مع كل أنو برين." },
          { label: "بيئات متدرجة", body: "التطوير والاختبار والتشغيل، تُبنى من نظام إدارة الشيفرة. وترقية أي تغيير إلى بيئة التشغيل تحتاج عامل تحقق ثانياً." },
          { label: "نسخ احتياطية قابلة للاستخدام", body: "نسخ تلقائية كل ست ساعات، جاهزة للتنزيل أو الاستعادة." },
          { label: "تصميم طباعة واحد", body: "التقارير والفواتير تُطبع بتصميم واحد نظيف، بلغة الزبون." },
        ],
        stack: ["أنو برين (Odoo 19)", "Odoo 20", "إصدارا Community وEnterprise", "PostgreSQL", "Docker", "بناء من Git"],
      },
      features: [
        { label: "العربية أولاً", body: "من اليمين إلى اليسار افتراضياً، والإنجليزية مساوية لها، والأرقام وأرقام الهواتف تبقى من اليسار إلى اليمين." },
        { label: "علامتك الخاصة", body: "اسمك وشعارك وألوانك على الشاشات وصفحة الدخول وكل مستند." },
        { label: "استضافة من أنو", body: "أنو كلاود يدير الخوادم والشهادات والتحديثات، ولا يحتاج فريقك إلا متصفحاً." },
        { label: "نسخ احتياطية كل ست ساعات", body: "تُؤخذ تلقائياً، ويمكن استعادتها عند الحاجة." },
        { label: "الدينار والدولار", body: "كل معاملة تحتفظ بعملتها وسعر صرفها، والتقارير تخرج بعملة شركتك." },
        { label: "الأنظمة القطاعية في الداخل", body: "أنظمة أنو للورش ولقطاعات أخرى تُثبَّت تطبيقاتٍ في النظام نفسه، لا برامجَ منفصلة." },
        { label: "على أي شاشة", body: "الحاسوب والجهاز اللوحي والهاتف، دون تثبيت أي برنامج." },
      ],
      facts: [
        { value: "6 ساعات", label: "بين نسختين احتياطيتين تلقائيتين" },
        { value: "3", label: "بيئات: التطوير والاختبار والتشغيل" },
        { value: "2", label: "لغتان متساويتان، والعربية أولاً" },
        { value: "19 · 20", label: "إصدارا Odoo اللذان تبني عليهما أنو" },
      ],
      faq: [
        {
          q: "على ماذا بُني أنو برين؟",
          a: "على Odoo، بعد أن تهيّئه أنو وتوسّعه. ويرى فريقك اسم أنو برين، أو علامتك أنت، على كل شاشة وكل مطبوع.",
        },
        {
          q: "هل تنقلون بياناتنا الحالية؟",
          a: "نعم. تستورد أنو الزبائن والموردين والمنتجات ودليل الحسابات من Excel أو من نظامك القديم، وتنظّفها وتحذف المكرر منها، ثم تحمّل الأرصدة الافتتاحية والذمم المدينة والدائنة المفتوحة والمخزون الافتتاحي لكل موقع قبل الانطلاق.",
        },
        {
          q: "أين يُستضاف نظامنا؟",
          a: "على أنو كلاود، استضافة أنو الخاصة، حيث تكون كل شركة مشروعاً منفصلاً بعنوانه الخاص ونسخه الاحتياطية كل ست ساعات. ويمكن لأنو أيضاً تشغيله على سحابة Odoo الرسمية. وفي الحالتين تُبقيه أنو يعمل، ولن تحتاج إلى إدارة أي خادم.",
        },
        {
          q: "هل يعمل على الهاتف، ومن دون إنترنت؟",
          a: "يعمل في المتصفح على الحاسوب والجهاز اللوحي والهاتف دون تثبيت شيء. ويحتاج إلى اتصال للعمل فيه، لكن بياناتك تبقى آمنة على الخادم مهما حدث في المكتب. وحيث يجب أن يعمل موظفو الميدان دون إنترنت، تضيف أنو شاشات تُزامَن عند عودة الاتصال.",
        },
        {
          q: "هل هو بالعربية؟ وماذا عن الكردية؟",
          a: "العربية هي اللغة الافتراضية والإنجليزية مساوية لها، على الشاشة وفي كل مطبوع. أما الكردية السورانية فقيد الإعداد، وتصدر بعد مراجعتها من متحدثين أصليين.",
        },
        {
          q: "ماذا يحدث عند صدور إصدار جديد؟",
          a: "تنقل أنو وحداتها إلى الإصدار الجديد وترقّي نظامك في مكانه فوق بياناتك نفسها، بعد تجربة الترقية على نسخة في بيئة الاختبار. ولأن النواة لا تُمسّ أبداً، يبقى طريق الترقية مفتوحاً.",
        },
      ],
      metaTitle: "أنو برين: نظام شركتك، مبني على Odoo",
      metaDescription:
        "أنو برين نظام أعمال بعلامتك الخاصة مبني على Odoo، بالعربية أولاً، مستضاف على أنو كلاود ببيئات متدرجة ونسخ احتياطية كل ست ساعات.",
      keywords: ["Odoo العراق", "نظام ERP عربي", "استضافة Odoo العراق", "نظام محاسبة ومخزون بغداد", "أنو برين"],
    },
  },
}
