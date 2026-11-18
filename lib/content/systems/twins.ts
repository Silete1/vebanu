import type { SystemStory } from "./types"

export const twins: SystemStory = {
  slug: "twins",
  group: "industry",
  status: "demo",
  order: 12,
  related: ["construction", "brain", "intelligence"],
  visual: { poster: "/media/systems/twins", scene: "twin" },
  copy: {
    en: {
      name: "ANU Twin",
      short: "Digital twins",
      pitch: "Live 3D twins of sites, quarries and ports that move when your ERP records the work.",
      summary:
        "ANU Twin is a live 3D copy of an operation, driven by the work staff already record in ANU Brain: a delivery received, a floor completed, a container moved. Every object on screen is a real record you can click, follow and act on, and an approval given in the twin is given in the ERP. It runs in the browser on computers, tablets and phones.",
      audience: ["Real-estate developers", "Container terminals and ports", "Quarries and building-materials plants", "Executives and operations rooms"],
      problem: {
        title: "The operation is real; the picture of it is not",
        body: "Managers see the site through tables, weekly photos and phone calls. A late delivery, an idle crane or a floor behind schedule reaches them in a report, after it has already cost a day. The ERP knows, but nobody can see where things are.",
        symptoms: [
          "Progress known from photos and phone calls",
          "Equipment status known only by asking",
          "Stock that is in the system but not on the shelf",
          "Dashboards that show numbers, never places",
        ],
      },
      how: {
        title: "From a saved record to a moving scene",
        steps: [
          {
            title: "Work is recorded as usual",
            body: "Staff do their jobs in ANU Brain: the store receives a delivery, a checker confirms a crane move on a tablet, an engineer closes a floor task, people check in. GPS, ship positions and weather are optional layers.",
          },
          {
            title: "The change reaches the screen",
            body: "Each saved change goes into an outbox; the twin is signalled and pushes it to every open browser in about a second.",
          },
          {
            title: "The scene shows what happened",
            body: "Cranes slew and hoist within their real limits, trucks drive real roads, floors rise and containers land in their slots. Nothing passes through anything, and nothing floats.",
          },
          {
            title: "Click, follow and decide",
            body: "Every object opens its record: a unit, a machine, a container, a stock item. Approval pins wait where the work is, and approving in the twin approves in the ERP, as you.",
          },
          {
            title: "Replay and compare",
            body: "Motion is computed from time, so a shift can be paused, replayed or run at 60×. Construction replays month by month, against the plan, or with the finished design laid over today.",
          },
        ],
      },
      inside: {
        title: "How ANU builds it",
        body: "ANU's twin platform is one engine and one asset system; each client's twin is a thin application on top, described by its own profile. The ERP stays the master: the twin reads from it and writes back to it.",
        items: [
          { label: "Reads as the signed-in user", body: "A one-time launch code from ANU Brain opens the twin, and every read runs with that person's rights. People's names appear only to users with HR rights." },
          { label: "A kit at real dimensions", body: "Cranes, vessels, plant, people, interiors and city blocks are parametric models built to real sizes, with motion limits taken from equipment datasheets." },
          { label: "Deterministic motion", body: "Every movement is computed from time, with jerk-limited axes and rope sway from the load's acceleration, so the same shift replays identically." },
          { label: "Edits go back to the ERP", body: "Moving a tower, a store or a machine in the editor saves its position in ANU Brain." },
          { label: "Proven against photographs", body: "Visual changes are checked from the same camera against real photographs, and scenes stay within budgets that low-end tablets can carry." },
          { label: "No client leaks into another", body: "Shared code is client-neutral, and an automatic scan fails the build if any client's name gets into it." },
        ],
        stack: ["ANU Brain (Odoo 20)", "TypeScript", "three.js", "React Three Fiber", "MapLibre", "Fastify API with server-sent events"],
      },
      features: [
        { label: "Portfolio map", body: "Every project on the city map, opening into its 3D site scene." },
        { label: "Construction in 4D", body: "Floor by floor from the ERP, with a month replay and planned against actual." },
        { label: "Today, Ghost and Design views", body: "Real progress, the finished design over it, or the finished project alone." },
        { label: "Stores in 3D", body: "Every stock item an object that changes with stock, cold-room temperatures included." },
        { label: "Equipment and deliveries", body: "Machines follow GPS where a tracker exists; trucks drive real roads, with arrival times from lead times." },
        { label: "Containers you can follow", body: "Each box a clickable record, from the ship to the yard to the gate." },
        { label: "People from attendance", body: "Who is on site and where, with names shown only to HR." },
        { label: "Decisions in place", body: "Approval pins on the scene: approve without leaving it." },
      ],
      facts: [
        { value: "3", label: "twins built: real estate, quarry and port" },
        { value: "≈ 1 s", label: "from a saved ERP change to the 3D scene" },
        { value: "60×", label: "replay speed, or pause at any moment" },
        { value: "300k", label: "triangle budget per scene, for low-end tablets" },
      ],
      faq: [
        {
          q: "Is it a 3D render of our project?",
          a: "No. A render is a picture; the twin is your ERP drawn in 3D. Every object is a record, and the scene changes when the record changes.",
        },
        {
          q: "Which twins has ANU built?",
          a: "Three. The portfolio twin of a residential and hospitality developer is live: sites in their real city streets, construction floor by floor, stores, equipment, deliveries and people. The twin of a stone quarry and building-materials group is a pilot, with quarry, stone-yard and saw-hall scenes, weigh tickets and rail dispatch. The twin of a multipurpose container terminal in southern Iraq is a working demo, kept moving by a demo engine that does the terminal's jobs through the ERP, and labelled as demo.",
        },
        {
          q: "Do we need sensors or trackers?",
          a: "No. The twin is driven by the records your staff already make. GPS trackers, ship positions, telematics and weather stations add precision when you have them; without them, nothing breaks.",
        },
        {
          q: "Who sees what?",
          a: "Each person sees only what their ERP rights allow, because every read runs as them. People's names appear only to users with HR rights.",
        },
        {
          q: "What devices does it need?",
          a: "A current browser on a computer, tablet or phone. Scenes are kept within budgets that low-end tablets can carry, and the twin follows each user's language, with Arabic right to left.",
        },
        {
          q: "Does our ERP have to be ANU Brain?",
          a: "The twin connects to ANU Brain through its own connector module. If you run something else today, ANU implements the ERP side first, so the twin has real records to show.",
        },
      ],
      metaTitle: "ANU Twin: live 3D digital twins driven by your ERP",
      metaDescription:
        "Live 3D twins of construction sites, quarries and container terminals, driven by ERP events: every object a record, approvals in place, replay and plan vs actual.",
      keywords: ["digital twin Iraq", "construction digital twin", "port digital twin", "3D operations dashboard", "ERP digital twin"],
    },
    ar: {
      name: "أنو للتوأم الرقمي",
      short: "التوأم الرقمي",
      pitch: "توائم ثلاثية الأبعاد حيّة للمواقع والمقالع والموانئ، تتحرك حين يسجّل نظامك العمل.",
      summary:
        "التوأم الرقمي من أنو نسخة حيّة ثلاثية الأبعاد من العمل، تحرّكها الأعمال التي يسجّلها الموظفون أصلاً في أنو برين: شحنة استُلمت، وطابق أُنجز، وحاوية نُقلت. كل ما على الشاشة سجل حقيقي تضغط عليه وتتابعه وتتخذ فيه قراراً، والموافقة في التوأم موافقة في النظام نفسه. ويعمل في المتصفح على الحاسوب واللوحي والهاتف.",
      audience: ["المطوّرون العقاريون", "محطات الحاويات والموانئ", "المقالع ومعامل مواد البناء", "الإدارات العليا وغرف العمليات"],
      problem: {
        title: "العمل حقيقي، أما صورته فلا",
        body: "يرى المدراء الموقع عبر الجداول وصور أسبوعية ومكالمات هاتفية. الشحنة المتأخرة والرافعة المتوقفة والطابق المتأخر عن جدوله تصلهم في تقرير، بعد أن كلّفت يوماً كاملاً. النظام يعرف، لكن لا أحد يرى أين تقع الأشياء.",
        symptoms: [
          "إنجاز يُعرف من الصور والمكالمات",
          "حالة المعدات لا تُعرف إلا بالسؤال",
          "مخزون موجود في النظام وغائب عن الرف",
          "لوحات تعرض أرقاماً ولا تعرض أماكن",
        ],
      },
      how: {
        title: "من سجل محفوظ إلى مشهد يتحرك",
        steps: [
          {
            title: "العمل يُسجَّل كالمعتاد",
            body: "يؤدي الموظفون أعمالهم في أنو برين: المخزن يستلم شحنة، ومدقق الرافعة يؤكد حركة على اللوحي، والمهندس يغلق مهمة طابق، والعاملون يسجّلون حضورهم. أما الـGPS ومواقع السفن والطقس فطبقات اختيارية.",
          },
          {
            title: "التغيير يصل إلى الشاشة",
            body: "كل تغيير محفوظ يدخل صندوق الصادر، فيُنبَّه التوأم ويدفعه إلى كل متصفح مفتوح في نحو ثانية.",
          },
          {
            title: "المشهد يُظهر ما حدث",
            body: "الرافعات تدور وترفع ضمن حدودها الحقيقية، والشاحنات تسير على طرق حقيقية، والطوابق ترتفع، والحاويات تستقر في أماكنها. لا شيء يخترق شيئاً، ولا شيء يطفو.",
          },
          {
            title: "اضغط وتابع وقرّر",
            body: "كل جسم يفتح سجله: وحدة سكنية أو آلية أو حاوية أو مادة مخزنية. ودبابيس الموافقات تنتظر حيث العمل، والموافقة في التوأم موافقة في النظام، باسمك.",
          },
          {
            title: "أعِد وقارن",
            body: "الحركة تُحسب من الزمن، فيمكن إيقاف الوردية أو إعادتها أو تشغيلها بسرعة 60 ضعفاً. ويُعاد الإنشاء شهراً بشهر، أو يُقارن بالمخطط، أو يُعرض التصميم النهائي فوق واقع اليوم.",
          },
        ],
      },
      inside: {
        title: "كيف تبنيه أنو",
        body: "منصة التوائم في أنو محرك واحد ونظام أصول واحد، وتوأم كل عميل تطبيق خفيف فوقهما يصفه ملفه الخاص. ويبقى النظام هو المرجع: التوأم يقرأ منه ويكتب إليه.",
        items: [
          { label: "القراءة بصلاحيات المستخدم", body: "رمز تشغيل لمرة واحدة من أنو برين يفتح التوأم، وكل قراءة تجري بصلاحيات ذلك الشخص. ولا تظهر أسماء العاملين إلا لمن يملك صلاحيات الموارد البشرية." },
          { label: "مكتبة بأبعاد حقيقية", body: "الرافعات والسفن والآليات والأشخاص والمساحات الداخلية وكتل المدينة نماذج متغيّرة بقياسات حقيقية، وحدود حركتها مأخوذة من النشرات الفنية للمعدات." },
          { label: "حركة حتمية", body: "كل حركة تُحسب من الزمن، بمحاور تتسارع بنعومة ضمن حدودها، وتأرجح للحبل يُحسب من تسارع الحمل، فتُعاد الوردية نفسها كما هي تماماً." },
          { label: "التعديلات تعود إلى النظام", body: "تحريك برج أو مخزن أو آلية في المحرر يحفظ موقعه في أنو برين." },
          { label: "مُثبَت بالصور", body: "كل تغيير بصري يُقارن من زاوية الكاميرا نفسها بصور حقيقية، وتبقى المشاهد ضمن حدود تتحملها الأجهزة اللوحية البسيطة." },
          { label: "لا يتسرب عميل إلى آخر", body: "الشيفرة المشتركة محايدة، وفحص آلي يوقف البناء إن دخلها اسم أي عميل." },
        ],
        stack: ["أنو برين (Odoo 20)", "TypeScript", "three.js", "React Three Fiber", "MapLibre", "واجهة Fastify مع أحداث الخادم (SSE)"],
      },
      features: [
        { label: "خريطة المحفظة", body: "كل المشاريع على خريطة المدينة، وكل مشروع ينفتح على مشهد موقعه الثلاثي الأبعاد." },
        { label: "الإنشاء بالبعد الرابع", body: "طابقاً بطابق من النظام، مع إعادة شهرية ومقارنة المخطط بالمنفَّذ." },
        { label: "عروض اليوم والطيف والتصميم", body: "الإنجاز الحقيقي، أو التصميم النهائي فوقه، أو المشروع المكتمل وحده." },
        { label: "المخازن بثلاثة أبعاد", body: "كل مادة جسم يتغير مع المخزون، ومعها حرارة غرف التبريد." },
        { label: "المعدات والشحنات", body: "آليات تتبع الـGPS حيث يوجد جهاز تتبع، وشاحنات على طرق حقيقية بمواعيد وصول من مدد التوريد." },
        { label: "حاويات تتابعها", body: "كل حاوية سجل تضغط عليه، من السفينة إلى الساحة إلى البوابة." },
        { label: "العاملون من الحضور", body: "من في الموقع وأين، والأسماء للموارد البشرية فقط." },
        { label: "القرار في مكانه", body: "دبابيس الموافقات على المشهد: وافِق دون أن تغادره." },
      ],
      facts: [
        { value: "3", label: "توائم مبنية: عقارات ومقلع وميناء" },
        { value: "≈ 1", label: "ثانية: من حفظ التغيير في النظام إلى المشهد الثلاثي الأبعاد" },
        { value: "60×", label: "سرعة الإعادة، أو الإيقاف عند أي لحظة" },
        { value: "300k", label: "مثلث كحد أقصى للمشهد، لتتحمله الأجهزة اللوحية البسيطة" },
      ],
      faq: [
        {
          q: "هل هو صورة ثلاثية الأبعاد لمشروعنا؟",
          a: "لا. الصورة لقطة ثابتة، أما التوأم فهو نظامك مرسوماً بثلاثة أبعاد. كل جسم سجل، والمشهد يتغير حين يتغير السجل.",
        },
        {
          q: "ما التوائم التي بنتها أنو؟",
          a: "ثلاثة. توأم محفظة مطوّر عقاري سكني وفندقي يعمل فعلياً: المواقع في شوارع مدينتها الحقيقية، والإنشاء طابقاً بطابق، والمخازن والمعدات والشحنات والعاملون. وتوأم مجموعة مقالع حجر ومواد بناء تجربة أولية، فيها مشاهد المقلع وساحة الحجر وقاعة النشر، وتذاكر الوزن والشحن بعربات القطار. وتوأم محطة حاويات متعددة الأغراض في جنوب العراق نسخة تجريبية عاملة، يحرّكها محرك تجريبي يؤدي أعمال المحطة عبر النظام، وهي موسومة بأنها تجريبية.",
        },
        {
          q: "هل نحتاج إلى حساسات أو أجهزة تتبع؟",
          a: "لا. التوأم تحرّكه السجلات التي يدخلها موظفوك أصلاً. أجهزة الـGPS ومواقع السفن وبيانات المركبات ومحطات الطقس تزيد الدقة حين تتوفر، ولا يتعطل شيء في غيابها.",
        },
        {
          q: "من يرى ماذا؟",
          a: "يرى كل شخص ما تسمح به صلاحياته في النظام فقط، لأن كل قراءة تجري باسمه. ولا تظهر أسماء العاملين إلا لمن يملك صلاحيات الموارد البشرية.",
        },
        {
          q: "ما الأجهزة التي يحتاجها؟",
          a: "متصفح حديث على الحاسوب أو اللوحي أو الهاتف. تبقى المشاهد ضمن حدود تتحملها الأجهزة اللوحية البسيطة، ويتبع التوأم لغة كل مستخدم، والعربية من اليمين إلى اليسار.",
        },
        {
          q: "هل يجب أن يكون نظامنا أنو برين؟",
          a: "يتصل التوأم بأنو برين عبر وحدة ربط خاصة به. وإن كنت تعمل اليوم على نظام آخر، تطبّق أنو جانب النظام أولاً، ليجد التوأم سجلات حقيقية يعرضها.",
        },
      ],
      metaTitle: "أنو للتوأم الرقمي: توائم ثلاثية الأبعاد حيّة يحرّكها نظامك",
      metaDescription:
        "توائم رقمية حيّة ثلاثية الأبعاد لمواقع البناء والمقالع ومحطات الحاويات، تحرّكها أحداث النظام: كل جسم سجل، والموافقات في مكانها، والإعادة ومقارنة المخطط بالمنفَّذ.",
      keywords: ["التوأم الرقمي العراق", "توأم رقمي لمواقع البناء", "توأم رقمي للموانئ", "لوحة عمليات ثلاثية الأبعاد", "ربط التوأم الرقمي بنظام ERP"],
    },
  },
}
