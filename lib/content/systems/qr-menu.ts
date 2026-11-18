import type { SystemStory } from "./types"

export const qrMenu: SystemStory = {
  slug: "qr-menu",
  group: "industry",
  status: "demo",
  order: 20,
  related: ["brain-lite", "retail-finance", "brain"],
  visual: { poster: "/media/systems/qr-menu" },
  copy: {
    en: {
      name: "ANU QR Menu",
      short: "QR Menu",
      pitch: "Scan the table, read the menu in three languages, and order straight to the kitchen.",
      summary:
        "ANU QR Menu is the menu a guest opens by scanning the sticker on the table: Arabic, English or Kurdish, prices in dinars, nothing to install. Orders reach a live console and kitchen tickets, while staff change prices and mark items sold out from a phone and publish only when ready. It works on its own, with ANU Brain as an optional back office.",
      audience: ["Restaurants", "Cafés", "Multi-branch food chains", "Pickup and delivery kitchens"],
      problem: {
        title: "The printed menu is out of date by lunchtime",
        body: "Prices change, dishes run out mid-service and a new season brings a new menu, but the printed card and the PDF behind a link can't keep up. Orders travel from the table to the kitchen by memory, and a menu in one language turns some guests away.",
        symptoms: [
          "Reprinting the menu for every price change",
          "Guests ordering dishes that ran out an hour ago",
          "Orders lost between the table and the kitchen",
          "No Kurdish, and Arabic as an afterthought",
        ],
      },
      how: {
        title: "From the sticker on the table to the kitchen ticket",
        steps: [
          {
            title: "Build the menu once",
            body: "Sections and items, with a shared library of choices and add-ons: size, milk or extras are built once and attached wherever they apply. Translations sit side by side.",
          },
          {
            title: "Publish when ready",
            body: "Edits stay in draft and guests see nothing until you publish. Every published version is kept, so a Ramadan menu can be prepared in advance.",
          },
          {
            title: "Print the tables",
            body: "QR codes are created for a range of tables and printed on one sheet. Each code points to a destination that can change without reprinting.",
          },
          {
            title: "The guest scans and orders",
            body: "The guest lands at their own table, picks size, extras and a note for the kitchen, and orders for dine-in, pickup or delivery without creating an account.",
          },
          {
            title: "The floor follows it live",
            body: "Orders appear on a live console with their state and elapsed time, kitchen tickets print, and every cancellation records its reason.",
          },
        ],
      },
      inside: {
        title: "How ANU builds it",
        body: "A standalone web service: the merchant app and the guest menu on the web, with an API and a background worker behind them. ANU Brain can be switched on as the back office; without it, every menu, order and report works the same.",
        items: [
          {
            label: "The server sets every price",
            body: "The guest's phone sends only items and quantities. Every price, extra, fee and total is calculated on the server from the published menu.",
          },
          {
            label: "A frozen menu per publish",
            body: "Publishing writes a copy of the menu that never changes, and orders are priced against it, so a later edit never alters an order already placed.",
          },
          {
            label: "Built for Iraq",
            body: "Arabic by default, Kurdish Sorani as a full language that falls back to Arabic, prices in dinars, Iraqi phone numbers checked, and the restaurant words Iraqis actually use.",
          },
          {
            label: "Honest on a weak connection",
            body: "The guest sees the menu saved a minute ago, clearly marked as saved; ordering pauses rather than pretending to work.",
          },
          {
            label: "Roles per branch",
            body: "Owner, branch manager, menu editor, floor staff and viewer; floor staff see only their own branch's orders and tables.",
          },
          {
            label: "Optional ANU Brain link",
            body: "Imports products and categories, marks items sold out when stock runs out and sends accepted orders across; every sync run is logged with its counts.",
          },
        ],
        stack: ["Next.js", "NestJS on Fastify", "PostgreSQL 17", "Redis 8", "BullMQ", "Zod", "ANU Brain (Odoo 19), optional"],
      },
      features: [
        { label: "Sold out in two taps", body: "From a phone, in the middle of service." },
        { label: "Choices and add-ons library", body: "Built once, attached to every item that uses them." },
        { label: "Drafts and versions", body: "Nothing changes for guests until you publish, and every version is kept." },
        { label: "Table QR sheets", body: "Codes for a range of tables, printed together, re-pointed without reprinting." },
        { label: "Live order console", body: "States, elapsed times, kitchen tickets and a reason for every cancellation." },
        { label: "Three languages", body: "Arabic, English and Kurdish, translated side by side." },
        { label: "Branch hours", body: "Each branch opens and closes ordering on its own hours." },
        { label: "Tested where guests are", body: "Automated checks on desktop and on Android and iPhone browsers." },
      ],
      facts: [
        { value: "3", label: "menu languages: Arabic, English, Kurdish" },
        { value: "0", label: "apps for the guest to install" },
        { value: "2", label: "taps to mark an item sold out" },
      ],
      faq: [
        {
          q: "Does the guest need to install an app?",
          a: "No. The guest scans the code on the table and the menu opens in the phone's browser, already at that table.",
        },
        {
          q: "Does it support Kurdish?",
          a: "Yes. Kurdish Sorani is a full menu language next to Arabic and English. An item not yet translated shows in Arabic rather than English.",
        },
        {
          q: "Can guests pay online?",
          a: "Not in this version. Orders are paid at the restaurant; online payment needs a local payment provider and is not part of this version.",
        },
        {
          q: "What happens when the internet is weak?",
          a: "Guests can still read the menu they last loaded, clearly marked as saved. Ordering pauses until the connection returns, so no order is lost without anyone knowing.",
        },
        {
          q: "Do we need ANU Brain?",
          a: "No. QR Menu works fully on its own. If you run ANU Brain, it can import your products and stock and receive your orders.",
        },
        {
          q: "Can it serve several branches?",
          a: "Yes. Each branch has its own tables, hours and staff, and a branch manager can oversee more than one.",
        },
      ],
      metaTitle: "ANU QR Menu: QR menus and table ordering in Iraq",
      metaDescription:
        "A menu guests open by scanning the table, in Arabic, English or Kurdish with prices in dinars, and orders that reach the kitchen. No app to install.",
      keywords: [
        "QR menu Iraq",
        "restaurant table ordering",
        "digital menu Arabic Kurdish",
        "QR code menu for cafés",
        "restaurant ordering system Baghdad",
      ],
    },
    ar: {
      name: "أنو للمنيو الرقمي",
      short: "منيو QR",
      pitch: "امسح رمز الطاولة، واقرأ المنيو بثلاث لغات، واطلب مباشرة إلى المطبخ.",
      summary:
        "أنو للمنيو الرقمي هو المنيو الذي يفتحه الزبون بمسح الملصق على الطاولة: بالعربية أو الإنجليزية أو الكردية، والأسعار بالدينار، ودون تثبيت أي تطبيق. تصل الطلبات إلى شاشة مباشرة وتذاكر للمطبخ، ويغيّر الموظفون الأسعار ويعلّمون الأصناف التي نفدت كميتها من الهاتف، ولا يُنشر التعديل إلا حين يكون جاهزاً. ويعمل مستقلاً، مع أنو برين خياراً للإدارة الخلفية.",
      audience: ["المطاعم", "المقاهي", "سلاسل المطاعم متعددة الفروع", "مطابخ الاستلام والتوصيل"],
      problem: {
        title: "المنيو المطبوع يتقادم قبل الظهر",
        body: "تتغير الأسعار وتنفد الأصناف في منتصف الخدمة ويأتي موسم جديد بمنيو جديد، لكن البطاقة المطبوعة وملف PDF خلف رابط لا يلحقان بذلك. وتنتقل الطلبات من الطاولة إلى المطبخ بالذاكرة، والمنيو بلغة واحدة يخسر بعض الزبائن.",
        symptoms: [
          "إعادة طباعة المنيو مع كل تغيير في السعر",
          "زبائن يطلبون أصنافاً نفدت قبل ساعة",
          "طلبات تضيع بين الطاولة والمطبخ",
          "لا كردية، والعربية مضافة على عجل",
        ],
      },
      how: {
        title: "من الملصق على الطاولة إلى تذكرة المطبخ",
        steps: [
          {
            title: "ابنِ القائمة مرة واحدة",
            body: "أقسام وأصناف، مع مكتبة مشتركة للخيارات والإضافات: الحجم والحليب والإضافات تُبنى مرة وتُربط بكل صنف يحتاجها. والترجمات جنباً إلى جنب.",
          },
          {
            title: "انشر حين تكون جاهزاً",
            body: "تبقى التعديلات مسودة، ولا يرى الزبائن شيئاً حتى تنشر. وتُحفظ كل نسخة منشورة، فيمكن تحضير منيو رمضان مسبقاً.",
          },
          {
            title: "اطبع رموز الطاولات",
            body: "تُنشأ رموز QR لمجموعة من الطاولات وتُطبع على ورقة واحدة، ويشير كل رمز إلى وجهة يمكن تغييرها دون إعادة الطباعة.",
          },
          {
            title: "يمسح الزبون ويطلب",
            body: "يصل الزبون إلى طاولته مباشرة، ويختار الحجم والإضافات وملاحظة للمطبخ، ويطلب من الطاولة أو للاستلام أو للتوصيل دون إنشاء حساب.",
          },
          {
            title: "الصالة تتابع مباشرة",
            body: "تظهر الطلبات على شاشة مباشرة بحالتها والوقت المنقضي، وتُطبع تذاكر المطبخ، ويُسجَّل سبب كل إلغاء.",
          },
        ],
      },
      inside: {
        title: "كيف تبنيه أنو",
        body: "خدمة ويب مستقلة: تطبيق المطعم ومنيو الزبون على الويب، وخلفهما واجهة برمجية وعامل يعمل في الخلفية. ويمكن تفعيل أنو برين للإدارة الخلفية، ودونه يعمل كل منيو وطلب وتقرير كما هو.",
        items: [
          {
            label: "الخادم يحدد كل سعر",
            body: "لا يرسل هاتف الزبون إلا الأصناف والكميات، ويُحسب كل سعر وإضافة ورسم ومجموع على الخادم من المنيو المنشور.",
          },
          {
            label: "منيو مجمّد لكل نشر",
            body: "يكتب النشر نسخة من المنيو لا تتغير، وتُسعَّر الطلبات عليها، فلا يغيّر تعديل لاحق طلباً سبق تقديمه.",
          },
          {
            label: "مبني للعراق",
            body: "العربية افتراضياً، والكردية السورانية لغة كاملة تعود إلى العربية عند غياب الترجمة، والأسعار بالدينار، وأرقام الهواتف العراقية مدقّقة، وكلمات المطاعم التي يقولها العراقيون فعلاً.",
          },
          {
            label: "صادق عند ضعف الاتصال",
            body: "يرى الزبون المنيو المحفوظ قبل دقيقة مع إشارة واضحة إلى أنه محفوظ، ويتوقف الطلب بدل التظاهر بأنه يعمل.",
          },
          {
            label: "أدوار لكل فرع",
            body: "المالك ومدير الفرع ومحرر القائمة وموظف الصالة والمطّلع، ولا يرى موظف الصالة إلا طلبات فرعه وطاولاته.",
          },
          {
            label: "ربط اختياري مع أنو برين",
            body: "يستورد الأصناف والأقسام، ويعلّم الصنف بنفاد الكمية حين ينتهي المخزون، ويرسل الطلبات المقبولة، ويُسجَّل كل تشغيل للمزامنة مع أعداده.",
          },
        ],
        stack: ["Next.js", "NestJS على Fastify", "PostgreSQL 17", "Redis 8", "BullMQ", "Zod", "أنو برين (Odoo 19)، اختياري"],
      },
      features: [
        { label: "نفدت الكمية بلمستين", body: "من الهاتف، في منتصف الخدمة." },
        { label: "مكتبة الخيارات والإضافات", body: "تُبنى مرة وتُربط بكل صنف يستخدمها." },
        { label: "مسودات ونسخ", body: "لا يتغير شيء أمام الزبائن حتى تنشر، وتُحفظ كل نسخة." },
        { label: "أوراق رموز الطاولات", body: "رموز لمجموعة طاولات تُطبع معاً، وتتغير وجهتها دون إعادة طباعة." },
        { label: "شاشة الطلبات المباشرة", body: "الحالات والوقت المنقضي وتذاكر المطبخ وسبب كل إلغاء." },
        { label: "ثلاث لغات", body: "العربية والإنجليزية والكردية، مترجمة جنباً إلى جنب." },
        { label: "ساعات كل فرع", body: "يفتح كل فرع الطلب ويغلقه بحسب ساعات عمله." },
        { label: "مختبر حيث يكون الزبائن", body: "فحوص آلية على الحاسوب وعلى متصفحات Android وiPhone." },
      ],
      facts: [
        { value: "3", label: "لغات للمنيو: العربية والإنجليزية والكردية" },
        { value: "0", label: "تطبيقات على الزبون تثبيتها" },
        { value: "2", label: "لمستان لتعليم الصنف بنفاد الكمية" },
      ],
      faq: [
        {
          q: "هل يحتاج الزبون إلى تثبيت تطبيق؟",
          a: "لا. يمسح الزبون الرمز على الطاولة فيُفتح المنيو في متصفح الهاتف، وهو في طاولته مباشرة.",
        },
        {
          q: "هل يدعم اللغة الكردية؟",
          a: "نعم. الكردية السورانية لغة منيو كاملة إلى جانب العربية والإنجليزية، والصنف غير المترجم بعد يظهر بالعربية لا بالإنجليزية.",
        },
        {
          q: "هل يستطيع الزبائن الدفع إلكترونياً؟",
          a: "ليس في هذا الإصدار. تُدفع الطلبات في المطعم، فالدفع الإلكتروني يحتاج إلى ربط بمزوّد دفع محلي، وهو ليس جزءاً من هذا الإصدار.",
        },
        {
          q: "ماذا يحدث إذا ضعف الإنترنت؟",
          a: "يبقى الزبون قادراً على قراءة آخر منيو حمّله مع إشارة واضحة إلى أنه محفوظ، ويتوقف الطلب حتى يعود الاتصال، فلا يضيع طلب دون أن يعلم أحد.",
        },
        {
          q: "هل نحتاج إلى أنو برين؟",
          a: "لا. يعمل المنيو الرقمي مستقلاً بالكامل. وإن كان لديكم أنو برين فيمكنه استيراد أصنافكم ومخزونكم واستلام طلباتكم.",
        },
        {
          q: "هل يخدم عدة فروع؟",
          a: "نعم. لكل فرع طاولاته وساعات عمله وموظفوه، ويمكن لمدير الفروع الإشراف على أكثر من فرع.",
        },
      ],
      metaTitle: "أنو للمنيو الرقمي: منيو QR وطلبات من الطاولة",
      metaDescription:
        "منيو يفتحه الزبون بمسح رمز الطاولة، بالعربية والإنجليزية والكردية وبالدينار، مع طلبات تصل إلى المطبخ ودون تطبيق، للمطاعم والمقاهي في العراق.",
      keywords: ["منيو QR للمطاعم", "منيو إلكتروني العراق", "الطلب من الطاولة", "منيو رقمي بالكردية", "نظام طلبات المقاهي"],
    },
  },
}
