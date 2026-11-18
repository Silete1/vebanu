import type { SystemStory } from "./types"

export const walkthroughs: SystemStory = {
  slug: "walkthroughs",
  group: "layer",
  status: "live",
  order: 3,
  related: ["support", "control-layer", "brain"],
  visual: { poster: "/media/systems/walkthroughs" },
  copy: {
    en: {
      name: "ANU Walkthroughs",
      short: "Walkthroughs",
      pitch: "Demos, how-tos, training and fix notes that play on your real screens, not in a manual.",
      summary:
        "ANU Walkthroughs are guided tours that run inside ANU Brain, on the real screens: each step opens the page, points at the actual field or button and explains it in a card. ANU uses them for onboarding, training, sales demos and to show each user what changed after a fix, and your own team can record new ones without code. A checker replays every walkthrough after each update, so the guidance stays true.",
      audience: ["New users learning the system", "Key users who train their teams", "Managers rolling out a new process", "Anyone who reported a problem"],
      problem: {
        title: "Manuals go stale, and screenshots lie",
        body: "A training PDF describes last year's screens. A video shows a button that has since moved. After a fix, the person who reported the problem never learns what changed, so they keep the old workaround and call support again.",
        symptoms: [
          "Training that starts again with every new hire",
          "Guides that no longer match the screen",
          "The same question asked every week",
          "Fixes nobody notices",
        ],
      },
      how: {
        title: "Show, don't tell",
        steps: [
          {
            title: "Pick the kind",
            body: "A fix note for what changed, a demo that drives itself, a how-to for one task, or a training for a whole process with checks along the way.",
          },
          {
            title: "Point at the real screen",
            body: "In the designer, pick a field, button, tab or column, draw arrows, boxes and notes, and type the explanation. Or press Record a flow and click through the task; each click becomes a step.",
          },
          {
            title: "Play it where the work happens",
            body: "The walkthrough opens each screen, lights up the real element, dims the rest and explains the step. Show me steps click and type for the user.",
          },
          {
            title: "Tell people what changed",
            body: "Fix notes show a before and now line per step and appear under What's new, with a count on the walkthroughs icon.",
          },
          {
            title: "Keep it true",
            body: "After every update a checker replays every walkthrough and reports the ones that broke; a coverage list shows the menus nobody has explained yet.",
          },
        ],
      },
      inside: {
        title: "How ANU builds it",
        body: "A walkthrough is data, not a recording: one documented format describes every step and what it points at, so it is replayed on the live screens, checked automatically and written the same way by people and by AI assistants.",
        items: [
          { label: "One format for people and AI", body: "Every walkthrough is one versioned JSON format, with a command-line tool and an API, so consultants and AI assistants author the same way." },
          { label: "Anchored to the live screen", body: "Steps point at the real field, button, tab or column, so the tour follows the system as it is today." },
          { label: "Demo data that cleans up", body: "On test copies of a system, a walkthrough creates the records it needs and removes them after the run." },
          { label: "Ready-made libraries", body: "Accounting, purchase from request to payment, sales from order to cash, and inventory, installed automatically with their app." },
          { label: "Tied to support", body: "When ANU fixes a reported problem, a fix note goes back to the person who reported it." },
        ],
        stack: ["ANU Brain (Odoo 19 and 20)", "OWL", "Versioned JSON schema", "JSON-RPC API", "Command-line tools", "Replay checker"],
      },
      features: [
        { label: "Four kinds", body: "Fix notes, demos, how-tos and trainings, each with its own player." },
        { label: "Show me steps", body: "The walkthrough clicks and types for the user, then hands back control." },
        { label: "Record a flow", body: "Click through a task once and the clicks become steps." },
        { label: "Record a video", body: "Save a walkthrough as a narrated video to share outside the system." },
        { label: "What's new", body: "Fix notes collected in one list, with a count until they're seen." },
        { label: "Self-playing demos", body: "A sector demo that drives itself through a meeting, with autoplay." },
        { label: "Coverage", body: "A list of the menus that no walkthrough explains yet." },
        { label: "Demo sign-in links", body: "One-time links that sign a visitor into a demo system." },
      ],
      facts: [
        { value: "4", label: "kinds: fix note, demo, how-to, training" },
        { value: "4", label: "ready-made process libraries" },
        { value: "1", label: "format for people and AI assistants" },
      ],
      faq: [
        {
          q: "Is this a video?",
          a: "No. A walkthrough plays on your live system, on the real screens and with your own data. You can also save one as a video when you need to share it outside the system.",
        },
        {
          q: "Who writes the walkthroughs?",
          a: "ANU writes them for each process it implements and for each fix. Your key users can write their own in the designer, by pointing and typing or by recording a flow, without code.",
        },
        {
          q: "What happens when the screens change after an update?",
          a: "A checker replays every walkthrough after each update and reports the ones that no longer match, so they are fixed before your users meet them.",
        },
        {
          q: "Do demos touch our real data?",
          a: "Demos that create records run on test copies of your system: they create what they need and remove it afterwards. On your live system, a walkthrough only points and explains unless a user chooses Show me.",
        },
        {
          q: "Are walkthroughs available in Arabic?",
          a: "Yes. The player works right to left, and ANU writes the steps in Arabic and English for the people who use them.",
        },
      ],
      metaTitle: "ANU Walkthroughs: training and demos on your real screens",
      metaDescription:
        "Guided demos, how-tos, training and fix notes that play inside ANU Brain on the live screens, with a designer, flow recording and a replay checker.",
      keywords: ["Odoo training Arabic", "in-app walkthrough", "ERP onboarding", "Odoo guided tour", "user training Iraq"],
    },
    ar: {
      name: "جولات أنو الإرشادية",
      short: "الجولات الإرشادية",
      pitch: "عروض وشروحات وتدريب وملاحظات إصلاح تعمل على شاشاتك الحقيقية، لا في دليل ورقي.",
      summary:
        "جولات أنو الإرشادية جولات موجَّهة تعمل داخل أنو برين على الشاشات الحقيقية: كل خطوة تفتح الصفحة وتشير إلى الحقل أو الزر الفعلي وتشرحه في بطاقة. تستخدمها أنو للتعريف بالنظام والتدريب وعروض المبيعات، ولتُري كل مستخدم ما الذي تغيّر بعد الإصلاح، ويستطيع فريقك تسجيل جولات جديدة دون برمجة. ويعيد مدقّق تشغيل كل جولة بعد كل تحديث، فيبقى الشرح صحيحاً.",
      audience: ["المستخدمون الجدد", "المستخدمون الرئيسيون الذين يدرّبون فرقهم", "المدراء الذين يطلقون إجراءً جديداً", "كل من أبلغ عن مشكلة"],
      problem: {
        title: "الأدلة تتقادم، والصور تكذب",
        body: "ملف التدريب يصف شاشات العام الماضي، والفيديو يُظهر زراً انتقل من مكانه. وبعد الإصلاح لا يعرف من أبلغ عن المشكلة ما الذي تغيّر، فيستمر على الحل الالتفافي القديم ويتصل بالدعم من جديد.",
        symptoms: [
          "تدريب يبدأ من الصفر مع كل موظف جديد",
          "شروحات لم تعد تطابق الشاشة",
          "السؤال نفسه يتكرر كل أسبوع",
          "إصلاحات لا يلاحظها أحد",
        ],
      },
      how: {
        title: "أرِهم بدل أن تخبرهم",
        steps: [
          {
            title: "اختر النوع",
            body: "ملاحظة إصلاح لما تغيّر، أو عرض يسير وحده، أو شرح لمهمة واحدة، أو تدريب على إجراء كامل مع اختبارات على الطريق.",
          },
          {
            title: "أشِر إلى الشاشة الحقيقية",
            body: "في المصمم اختر حقلاً أو زراً أو تبويباً أو عموداً، وارسم الأسهم والمربعات والملاحظات، واكتب الشرح. أو اضغط «سجّل المسار» ونفّذ المهمة، فتصبح كل نقرة خطوة.",
          },
          {
            title: "شغّلها حيث يجري العمل",
            body: "تفتح الجولة كل شاشة، وتضيء العنصر الحقيقي، وتعتّم ما حوله، وتشرح الخطوة. وخطوات «أرِني» تنقر وتكتب بدلاً من المستخدم.",
          },
          {
            title: "أخبر الناس بما تغيّر",
            body: "ملاحظات الإصلاح تعرض سطراً «قبل» و«الآن» لكل خطوة، وتظهر تحت «ما الجديد» مع عدّاد على أيقونة الجولات.",
          },
          {
            title: "أبقِها صحيحة",
            body: "بعد كل تحديث يعيد مدقّق تشغيل كل الجولات ويبلّغ عمّا تعطّل منها، وقائمة التغطية تُظهر القوائم التي لم يشرحها أحد بعد.",
          },
        ],
      },
      inside: {
        title: "كيف تبنيها أنو",
        body: "الجولة بيانات لا تسجيل: صيغة واحدة موثّقة تصف كل خطوة وما تشير إليه، فتُعاد على الشاشات الحية وتُفحص آلياً، ويكتبها البشر ومساعدو الذكاء الاصطناعي بالطريقة نفسها.",
        items: [
          { label: "صيغة واحدة للبشر والذكاء الاصطناعي", body: "كل جولة بصيغة JSON واحدة ذات إصدار، مع أداة سطر أوامر وواجهة برمجية، فيكتب المستشارون ومساعدو الذكاء الاصطناعي بالطريقة نفسها." },
          { label: "مرتبطة بالشاشة الحية", body: "الخطوات تشير إلى الحقل أو الزر أو التبويب أو العمود الحقيقي، فتتبع الجولة النظام كما هو اليوم." },
          { label: "بيانات عرض تنظّف نفسها", body: "على النسخ التجريبية من النظام تُنشئ الجولة السجلات التي تحتاجها وتحذفها بعد انتهاء التشغيل." },
          { label: "مكتبات جاهزة", body: "المحاسبة، والمشتريات من الطلب إلى الدفع، والمبيعات من الطلب إلى التحصيل، والمخزون، تُثبَّت تلقائياً مع تطبيقها." },
          { label: "مرتبطة بالدعم", body: "حين تصلح أنو مشكلة مُبلَّغاً عنها، تعود ملاحظة إصلاح إلى الشخص الذي أبلغ عنها." },
        ],
        stack: ["أنو برين (Odoo 19 و20)", "OWL", "مخطط JSON بإصدارات", "واجهة JSON-RPC", "أدوات سطر الأوامر", "مدقّق إعادة التشغيل"],
      },
      features: [
        { label: "أربعة أنواع", body: "ملاحظات الإصلاح والعروض والشروحات والتدريب، لكل منها مشغّله." },
        { label: "خطوات «أرِني»", body: "تنقر الجولة وتكتب بدلاً من المستخدم، ثم تعيد إليه التحكم." },
        { label: "سجّل المسار", body: "نفّذ المهمة مرة واحدة فتتحول النقرات إلى خطوات." },
        { label: "سجّل فيديو", body: "احفظ الجولة فيديو مع تعليق صوتي لمشاركته خارج النظام." },
        { label: "ما الجديد", body: "ملاحظات الإصلاح في قائمة واحدة، مع عدّاد حتى تُقرأ." },
        { label: "عروض تعمل وحدها", body: "عرض قطاعي يسير وحده خلال الاجتماع بالتشغيل التلقائي." },
        { label: "التغطية", body: "قائمة بالقوائم التي لا تشرحها أي جولة بعد." },
        { label: "روابط دخول للعروض", body: "روابط تُستخدم مرة واحدة تُدخل الزائر إلى نظام تجريبي." },
      ],
      facts: [
        { value: "4", label: "أنواع: ملاحظة إصلاح، عرض، شرح، تدريب" },
        { value: "4", label: "مكتبات جاهزة للإجراءات" },
        { value: "1", label: "صيغة واحدة للبشر ومساعدي الذكاء الاصطناعي" },
      ],
      faq: [
        {
          q: "هل هي فيديو؟",
          a: "لا. الجولة تعمل على نظامك الحي، على الشاشات الحقيقية وببياناتك أنت. ويمكنك أيضاً حفظها فيديو حين تحتاج إلى مشاركتها خارج النظام.",
        },
        {
          q: "من يكتب الجولات؟",
          a: "تكتبها أنو لكل إجراء تطبّقه ولكل إصلاح. ويستطيع المستخدمون الرئيسيون لديك كتابة جولاتهم في المصمم، بالإشارة والكتابة أو بتسجيل المسار، دون برمجة.",
        },
        {
          q: "ماذا يحدث حين تتغير الشاشات بعد تحديث؟",
          a: "يعيد مدقّق تشغيل كل جولة بعد كل تحديث ويبلّغ عمّا لم يعد يطابق، فتُصلح قبل أن يصادفها مستخدموك.",
        },
        {
          q: "هل تمسّ العروض بياناتنا الحقيقية؟",
          a: "العروض التي تُنشئ سجلات تعمل على نسخ تجريبية من نظامك: تُنشئ ما تحتاجه وتحذفه بعد ذلك. أما على نظامك الحي فالجولة تشير وتشرح فقط، إلا إذا اختار المستخدم «أرِني».",
        },
        {
          q: "هل الجولات متوفرة بالعربية؟",
          a: "نعم. المشغّل يعمل من اليمين إلى اليسار، وتكتب أنو الخطوات بالعربية والإنجليزية بحسب من يستخدمها.",
        },
      ],
      metaTitle: "جولات أنو الإرشادية: التدريب والعروض على شاشاتك الحقيقية",
      metaDescription:
        "عروض وشروحات وتدريب وملاحظات إصلاح تعمل داخل أنو برين على الشاشات الحية، مع مصمم وتسجيل للمسار ومدقّق يعيد تشغيل كل جولة.",
      keywords: ["تدريب Odoo بالعربية", "جولة إرشادية داخل النظام", "تدريب مستخدمي ERP", "شرح Odoo", "تدريب الموظفين العراق"],
    },
  },
}
