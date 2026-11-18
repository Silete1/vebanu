import type { SystemStory } from "./types"

export const maps: SystemStory = {
  slug: "maps",
  group: "industry",
  status: "building",
  order: 21,
  related: ["field-operations", "brain", "twins"],
  visual: { poster: "/media/systems/maps" },
  copy: {
    en: {
      name: "ANU Maps",
      short: "Maps",
      pitch: "Offline maps and navigation for teams that work beyond the signal, in ANU's design.",
      summary:
        "ANU Maps is an offline maps and navigation app for Android and iPhone, in ANU's design and in Arabic and English. It is built on an open-source offline maps engine and OpenStreetMap data, so a downloaded region keeps working with no signal. It is in progress and not yet released.",
      audience: ["Field teams", "Drivers and delivery staff", "Organisations that work outside the cities"],
      problem: {
        title: "The map stops where the signal stops",
        body: "Online maps go blank at the edge of coverage, and field staff fall back to screenshots and coordinates sent by message. A map that needs a connection fails exactly where field work happens.",
        symptoms: ["Blank maps outside coverage", "Locations passed around as screenshots", "Routes that cannot be planned offline"],
      },
      how: {
        title: "Download once, then work offline",
        steps: [
          {
            title: "Download a region",
            body: "Choose the regions you need while you are connected; the maps are stored on the phone.",
          },
          {
            title: "Search and route offline",
            body: "Find places and addresses and plan routes by car, on foot or by bicycle, with no connection.",
          },
          {
            title: "Share a place",
            body: "Send a place as a link with its coordinates, so the other person can open it in the app or on a map.",
          },
        ],
      },
      inside: {
        title: "How ANU builds it",
        body: "ANU keeps the open-source engine as it is and adds its own layer on top, so improvements from the open-source project can still be merged.",
        items: [
          {
            label: "Built on open source",
            body: "An open-source offline maps engine and OpenStreetMap data, with the original licence and credits kept and the map data credited to OpenStreetMap contributors on the map itself.",
          },
          {
            label: "ANU's work kept apart",
            body: "ANU's changes live in their own files, and every edit to an engine file is logged with its risk, so each new release of the engine can be merged safely.",
          },
          {
            label: "ANU's design",
            body: "An ink toolbar with a blue edge, square corners, ANU's colours in light and dark, and the app's name in Arabic and English.",
          },
          {
            label: "No outside accounts",
            body: "Map editing and donation screens are off, and no servers or credentials of the original project are used.",
          },
        ],
        stack: ["C++ map engine", "Android", "iOS", "OpenStreetMap data"],
      },
      features: [
        { label: "Offline maps", body: "Downloaded regions work with no signal." },
        { label: "Offline search and routes", body: "Places, addresses and routes without a connection." },
        { label: "Bookmarks and tracks", body: "Saved places and recorded tracks, kept on the phone." },
        { label: "Light and dark", body: "ANU's look by day and by night." },
      ],
      faq: [
        {
          q: "Can we use ANU Maps today?",
          a: "Not yet. The Android version is in testing and the iPhone version is being prepared. ANU will announce the app when it is released.",
        },
        {
          q: "Does it work without the internet?",
          a: "Yes, once a region is downloaded: maps, search and routes all work offline.",
        },
        {
          q: "Where does the map data come from?",
          a: "From OpenStreetMap, the open map made by its contributors, who are credited on the map. The app is built on an open-source offline maps engine, and ANU follows its licence.",
        },
      ],
      metaTitle: "ANU Maps: offline maps and navigation",
      metaDescription:
        "Offline maps, search and routes for Android and iPhone in ANU's design, built on an open-source offline maps engine and OpenStreetMap data. In progress.",
      keywords: ["offline maps app Iraq", "offline navigation Arabic", "OpenStreetMap app", "maps for field teams"],
    },
    ar: {
      name: "خرائط أنو",
      short: "الخرائط",
      pitch: "خرائط وملاحة دون اتصال للفرق التي تعمل خارج التغطية، بتصميم أنو.",
      summary:
        "خرائط أنو تطبيق خرائط وملاحة يعمل دون اتصال على Android وiPhone، بتصميم أنو وبالعربية والإنجليزية. وهو مبني على محرك خرائط مفتوح المصدر يعمل دون اتصال وعلى بيانات OpenStreetMap، فتبقى المنطقة المنزّلة تعمل دون أي إشارة. والتطبيق قيد البناء ولم يُطرح بعد.",
      audience: ["الفرق الميدانية", "السائقون وموظفو التوصيل", "الجهات التي تعمل خارج المدن"],
      problem: {
        title: "الخريطة تتوقف حيث تتوقف الإشارة",
        body: "تفرغ الخرائط المتصلة عند حافة التغطية، فيعود الموظفون الميدانيون إلى لقطات الشاشة والإحداثيات المرسلة في الرسائل. والخريطة التي تحتاج اتصالاً تتعطل في المكان الذي يجري فيه العمل الميداني بالضبط.",
        symptoms: ["خرائط فارغة خارج التغطية", "مواقع تُتداول لقطاتِ شاشة", "مسارات لا يمكن تخطيطها دون اتصال"],
      },
      how: {
        title: "نزّل مرة، ثم اعمل دون اتصال",
        steps: [
          {
            title: "نزّل المنطقة",
            body: "اختر المناطق التي تحتاجها وأنت متصل، فتُحفظ الخرائط على الهاتف.",
          },
          {
            title: "ابحث وخطّط المسار دون اتصال",
            body: "اعثر على الأماكن والعناوين وخطّط المسار بالسيارة أو سيراً أو بالدراجة، دون أي اتصال.",
          },
          {
            title: "شارك مكاناً",
            body: "أرسل المكان رابطاً مع إحداثياته، ليفتحه الطرف الآخر في التطبيق أو على خريطة.",
          },
        ],
      },
      inside: {
        title: "كيف تبنيه أنو",
        body: "تحافظ أنو على المحرك المفتوح المصدر كما هو وتضيف طبقتها فوقه، فيبقى ممكناً دمج تحسينات المشروع المفتوح المصدر.",
        items: [
          {
            label: "مبني على المصدر المفتوح",
            body: "محرك خرائط مفتوح المصدر يعمل دون اتصال وبيانات OpenStreetMap، مع الحفاظ على الرخصة الأصلية وحقوق المصدر، ونسبة بيانات الخريطة إلى المساهمين في OpenStreetMap على الخريطة نفسها.",
          },
          {
            label: "عمل أنو منفصل",
            body: "تعيش تعديلات أنو في ملفاتها الخاصة، ويُسجَّل كل تعديل على ملف من ملفات المحرك مع درجة خطورته، فيُدمج كل إصدار جديد من المحرك بأمان.",
          },
          {
            label: "تصميم أنو",
            body: "شريط أدوات بلون الحبر بحافة زرقاء، وزوايا حادة، وألوان أنو في الوضعين الفاتح والداكن، واسم التطبيق بالعربية والإنجليزية.",
          },
          {
            label: "دون حسابات خارجية",
            body: "شاشات تحرير الخريطة والتبرع معطلة، ولا تُستخدم خوادم المشروع الأصلي ولا بيانات اعتماده.",
          },
        ],
        stack: ["محرك خرائط بلغة C++", "Android", "iOS", "بيانات OpenStreetMap"],
      },
      features: [
        { label: "خرائط دون اتصال", body: "المناطق المنزّلة تعمل دون إشارة." },
        { label: "بحث ومسارات دون اتصال", body: "الأماكن والعناوين والمسارات دون اتصال." },
        { label: "الأماكن المحفوظة والمسارات المسجّلة", body: "محفوظة على الهاتف نفسه." },
        { label: "فاتح وداكن", body: "مظهر أنو في النهار والليل." },
      ],
      faq: [
        {
          q: "هل يمكن استخدام خرائط أنو اليوم؟",
          a: "ليس بعد. نسخة Android قيد الاختبار، ونسخة iPhone قيد الإعداد. وستعلن أنو عن التطبيق عند طرحه.",
        },
        {
          q: "هل يعمل دون إنترنت؟",
          a: "نعم، بعد تنزيل المنطقة: الخرائط والبحث والمسارات كلها تعمل دون اتصال.",
        },
        {
          q: "من أين تأتي بيانات الخريطة؟",
          a: "من OpenStreetMap، الخريطة المفتوحة التي يصنعها مساهموها، وتُنسب إليهم على الخريطة. والتطبيق مبني على محرك خرائط مفتوح المصدر يعمل دون اتصال، وتلتزم أنو برخصته.",
        },
      ],
      metaTitle: "خرائط أنو: خرائط وملاحة دون اتصال",
      metaDescription:
        "خرائط وبحث ومسارات دون اتصال على Android وiPhone بتصميم أنو، مبنية على محرك خرائط مفتوح المصدر وبيانات OpenStreetMap. قيد البناء.",
      keywords: ["خرائط دون إنترنت", "تطبيق ملاحة بالعربية", "خرائط OpenStreetMap", "خرائط للفرق الميدانية"],
    },
  },
}
