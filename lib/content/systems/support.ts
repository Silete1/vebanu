import type { SystemStory } from "./types"

export const support: SystemStory = {
  slug: "support",
  group: "layer",
  status: "live",
  order: 4,
  related: ["walkthroughs", "control-layer", "brain"],
  visual: { poster: "/media/systems/support" },
  copy: {
    en: {
      name: "ANU Support",
      short: "Support",
      pitch: "Report the exact screen and record with a right-click, and get the answer in your system.",
      summary:
        "ANU Support puts a Report this screen command in every ANU Brain. The user marks up a capture of the screen, describes the problem and sends it; the request reaches ANU with the app, screen, record, version and recent errors already attached. ANU's answer and every status change come back inside the client's own system, and a fix comes with a walkthrough of what changed.",
      audience: ["Every user of an ANU system", "Key users and system owners", "IT and operations managers"],
      problem: {
        title: "Support by phone and WhatsApp loses the context",
        body: "A user sends a blurry photo of the screen and writes “it's not working”. Support asks which screen, which invoice, what the error said. The answer arrives in a chat thread nobody can find a week later, and nobody records whether it was fixed.",
        symptoms: [
          "Photos of the monitor taken with a phone",
          "Ten messages before anyone knows which record",
          "Answers lost in personal chats",
          "No number to follow, no history to search",
        ],
      },
      how: {
        title: "From the problem on screen to the fix",
        steps: [
          {
            title: "Open a report",
            body: "Right-click and choose Report this screen, press the lifebuoy in the top bar, use Shift+Alt+H, or find it in the command palette.",
          },
          {
            title: "Mark it up",
            body: "The screen is captured. Box, arrow, draw, highlight, blur and add numbered labels, then describe the problem in your own words.",
          },
          {
            title: "Review and send",
            body: "See every block that will be shared before it leaves, then send. The request gets its own number, such as SUP-0001.",
          },
          {
            title: "ANU answers in your system",
            body: "ANU's team works the request from its support desk. Replies and status changes appear on the request inside your system.",
          },
          {
            title: "Fix and show",
            body: "When a fix is needed, the request becomes a development task, and the fix comes back with a walkthrough showing what changed.",
          },
        ],
      },
      inside: {
        title: "How ANU builds it",
        body: "Three parts: a capture tool and request record inside every client system, a central hub that routes requests, and ANU's own desk where the team answers. The report is about the record under the pointer, not just the page.",
        items: [
          { label: "Context captured for you", body: "The request keeps the screenshot, the app, screen, view and record it came from, the system version, the installed ANU modules and the page's recent errors." },
          { label: "A capture tool that fits any screen", body: "Built without a framework and isolated from the page, in Arabic and English, and usable with touch." },
          { label: "A central hub", body: "Requests travel from each client system to ANU's hub, and replies travel back, over a connection whose key never leaves the server." },
          { label: "Sign in through your own system", body: "The support site has no separate password: you enter your system's address, sign in there, and come back." },
          { label: "Access only for the task", body: "When ANU needs access to fix something, it is scoped to that one task, limited to a few hours and approved by a second person." },
        ],
        stack: ["ANU Brain (Odoo 19 and 20)", "Shadow DOM capture", "Fastify", "PostgreSQL", "React 19", "Playwright end-to-end tests"],
      },
      features: [
        { label: "Report this screen", body: "On the right-click menu of every record." },
        { label: "Mark-up tools", body: "Box, arrow, draw, highlight, blur and numbered labels." },
        { label: "Review before sending", body: "You see each block that will be shared, and blur what shouldn't be." },
        { label: "Numbered requests", body: "Every report has a number and a history you can search." },
        { label: "Answers inside your system", body: "Replies and status changes on the request, not in a chat." },
        { label: "Fix notes", body: "Each fix returns with a walkthrough for the person who reported it." },
        { label: "Help centre and status", body: "A support site with guides, service status and a way to report an issue." },
      ],
      facts: [
        { value: "4", label: "ways to open a report" },
        { value: "6", label: "mark-up tools, blur included" },
        { value: "0", label: "extra passwords for the support site" },
      ],
      faq: [
        {
          q: "What does ANU see when we send a report?",
          a: "Only what you send: the screenshot with your mark-up and blurring, your description, the screen and record it came from, the system version and the page's recent errors. You review each block before it leaves.",
        },
        {
          q: "Can we still call or message on WhatsApp?",
          a: "Yes. The phone and WhatsApp stay open. A report from the screen simply arrives with everything ANU needs, so the answer comes faster.",
        },
        {
          q: "Can we write the report in Arabic?",
          a: "Yes. The capture tool and the support site are in Arabic and English, and you describe the problem in whichever you prefer.",
        },
        {
          q: "Does ANU get access to our live system?",
          a: "Only for a specific task, for a few hours, and approved by a second person. Access is not left open.",
        },
        {
          q: "Where do we follow up on a request?",
          a: "Inside your own system, on the request itself, or on the support site after signing in through your system.",
        },
        {
          q: "Does it work on phones and tablets?",
          a: "Yes. The capture and mark-up work with touch, so a report can be sent from a tablet or a phone.",
        },
      ],
      metaTitle: "ANU Support: report the exact screen, get the answer in-app",
      metaDescription:
        "Report the exact screen and record from inside ANU Brain, marked up and reviewed, and get ANU's answer, status and fix walkthrough back in your own system.",
      keywords: ["Odoo support Iraq", "ERP support Arabic", "in-app support", "report a bug screenshot", "Odoo helpdesk Baghdad"],
    },
    ar: {
      name: "دعم أنو",
      short: "الدعم",
      pitch: "المساعدة على بُعد نقرة: أبلغ عن الشاشة والسجل بالضبط، واستلم الجواب داخل نظامك.",
      summary:
        "يضع دعم أنو أمر «أبلغ عن هذه الشاشة» في كل أنو برين. يحدّد المستخدم ما يريد على لقطة الشاشة، ويصف المشكلة ويرسلها، فيصل الطلب إلى أنو ومعه التطبيق والشاشة والسجل والإصدار والأخطاء الأخيرة. ويعود جواب أنو وكل تغيير في الحالة إلى داخل نظام العميل نفسه، ويأتي الإصلاح مع جولة إرشادية تُظهر ما الذي تغيّر.",
      audience: ["كل مستخدمي أنظمة أنو", "المستخدمون الرئيسيون ومسؤولو النظام", "مدراء تقنية المعلومات والعمليات"],
      problem: {
        title: "الدعم عبر الهاتف وWhatsApp يضيّع السياق",
        body: "يرسل المستخدم صورة غير واضحة للشاشة ويكتب «لا يعمل». فيسأل الدعم: أي شاشة؟ أي فاتورة؟ ماذا قالت رسالة الخطأ؟ ويصل الجواب في محادثة لا يجدها أحد بعد أسبوع، ولا يسجّل أحد إن كانت المشكلة قد حُلّت.",
        symptoms: [
          "صور للشاشة ملتقطة بالهاتف",
          "عشر رسائل قبل أن يُعرف أي سجل",
          "أجوبة ضائعة في محادثات شخصية",
          "لا رقم للمتابعة ولا سجل للبحث فيه",
        ],
      },
      how: {
        title: "من المشكلة على الشاشة إلى الإصلاح",
        steps: [
          {
            title: "افتح بلاغاً",
            body: "انقر بالزر الأيمن واختر «أبلغ عن هذه الشاشة»، أو اضغط أيقونة طوق النجاة في الشريط العلوي، أو Shift+Alt+H، أو ابحث عنه في لوحة الأوامر.",
          },
          {
            title: "حدّد على اللقطة",
            body: "تُلتقط الشاشة، فترسم مربعاً أو سهماً أو خطاً حراً، وتظلّل وتموّه وتضيف أرقاماً، ثم تصف المشكلة بكلماتك.",
          },
          {
            title: "راجع وأرسل",
            body: "ترى كل جزء سيُشارك قبل أن يخرج، ثم ترسل. ويحصل الطلب على رقمه الخاص، مثل SUP-0001.",
          },
          {
            title: "أنو تجيب داخل نظامك",
            body: "يعالج فريق أنو الطلب من مكتب الدعم، وتظهر الردود وتغييرات الحالة على الطلب داخل نظامك.",
          },
          {
            title: "أصلِح واعرض ما تغيّر",
            body: "حين يحتاج الأمر إلى إصلاح يتحول الطلب إلى مهمة تطوير، ويعود الإصلاح مع جولة إرشادية تُظهر ما الذي تغيّر.",
          },
        ],
      },
      inside: {
        title: "كيف تبنيه أنو",
        body: "ثلاثة أجزاء: أداة التقاط وسجل طلب داخل كل نظام عميل، ومركز يوجّه الطلبات، ومكتب أنو الذي يجيب منه الفريق. والبلاغ يخص السجل الذي تحت المؤشر، لا الصفحة فقط.",
        items: [
          { label: "السياق يُلتقط عنك", body: "يحتفظ الطلب بلقطة الشاشة والتطبيق والشاشة والعرض والسجل الذي جاء منه، وإصدار النظام، ووحدات أنو المثبّتة، والأخطاء الأخيرة في الصفحة." },
          { label: "أداة التقاط تناسب أي شاشة", body: "مبنية دون أي إطار عمل ومعزولة عن الصفحة، بالعربية والإنجليزية، وتعمل باللمس." },
          { label: "مركز واحد", body: "تنتقل الطلبات من نظام كل عميل إلى مركز أنو، وتعود الردود، عبر اتصال لا يغادر مفتاحه الخادم أبداً." },
          { label: "الدخول عبر نظامك", body: "لا كلمة مرور منفصلة لموقع الدعم: تكتب عنوان نظامك، وتدخل إليه، ثم تعود." },
          { label: "وصول للمهمة فقط", body: "حين تحتاج أنو إلى الوصول لإصلاح شيء، يكون الوصول محصوراً بتلك المهمة وحدها، ولبضع ساعات، وبموافقة شخص ثانٍ." },
        ],
        stack: ["أنو برين (Odoo 19 و20)", "التقاط بـShadow DOM", "Fastify", "PostgreSQL", "React 19", "اختبارات شاملة بـPlaywright"],
      },
      features: [
        { label: "أبلغ عن هذه الشاشة", body: "في قائمة النقر الأيمن لكل سجل." },
        { label: "أدوات التحديد", body: "مربع وسهم ورسم حر وتظليل وتمويه وأرقام." },
        { label: "مراجعة قبل الإرسال", body: "ترى كل جزء سيُشارك، وتموّه ما لا يجب أن يظهر." },
        { label: "طلبات مرقّمة", body: "لكل بلاغ رقم وسجل يمكن البحث فيه." },
        { label: "الأجوبة داخل نظامك", body: "الردود وتغييرات الحالة على الطلب نفسه، لا في محادثة." },
        { label: "ملاحظات الإصلاح", body: "كل إصلاح يعود مع جولة إرشادية للشخص الذي أبلغ عنه." },
        { label: "مركز المساعدة والحالة", body: "موقع دعم فيه شروحات وحالة الخدمة وطريقة للإبلاغ عن مشكلة." },
      ],
      facts: [
        { value: "4", label: "طرق لفتح بلاغ" },
        { value: "6", label: "أدوات تحديد، منها التمويه" },
        { value: "0", label: "كلمات مرور إضافية لموقع الدعم" },
      ],
      faq: [
        {
          q: "ماذا ترى أنو حين نرسل بلاغاً؟",
          a: "ما ترسله فقط: لقطة الشاشة بتحديداتك وتمويهك، ووصفك، والشاشة والسجل الذي جاء منه، وإصدار النظام، والأخطاء الأخيرة في الصفحة. وتراجع كل جزء قبل أن يخرج.",
        },
        {
          q: "هل ما زال بإمكاننا الاتصال أو المراسلة على WhatsApp؟",
          a: "نعم. الهاتف وWhatsApp يبقيان متاحين. لكن البلاغ من الشاشة يصل ومعه كل ما تحتاجه أنو، فيأتي الجواب أسرع.",
        },
        {
          q: "هل نستطيع كتابة البلاغ بالعربية؟",
          a: "نعم. أداة الالتقاط وموقع الدعم بالعربية والإنجليزية، وتصف المشكلة باللغة التي تفضّلها.",
        },
        {
          q: "هل تحصل أنو على وصول إلى نظامنا الحي؟",
          a: "لمهمة محددة فقط، ولبضع ساعات، وبموافقة شخص ثانٍ. ولا يبقى الوصول مفتوحاً.",
        },
        {
          q: "أين نتابع الطلب؟",
          a: "داخل نظامك، على الطلب نفسه، أو في موقع الدعم بعد الدخول عبر نظامك.",
        },
        {
          q: "هل يعمل على الهواتف والأجهزة اللوحية؟",
          a: "نعم. الالتقاط والتحديد يعملان باللمس، فيمكن إرسال البلاغ من جهاز لوحي أو هاتف.",
        },
      ],
      metaTitle: "دعم أنو: أبلغ عن الشاشة بالضبط واستلم الجواب داخل النظام",
      metaDescription:
        "أبلغ عن الشاشة والسجل بالضبط من داخل أنو برين، مع التحديد والمراجعة، واستلم جواب أنو وحالة الطلب وجولة الإصلاح داخل نظامك.",
      keywords: ["دعم Odoo العراق", "دعم فني ERP بالعربية", "الدعم من داخل النظام", "الإبلاغ عن مشكلة بلقطة شاشة", "دعم أنظمة بغداد"],
    },
  },
}
