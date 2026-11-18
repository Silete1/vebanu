import type { SystemStory } from "./types"

export const intelligence: SystemStory = {
  slug: "intelligence",
  group: "layer",
  status: "demo",
  order: 5,
  related: ["brain", "support", "walkthroughs"],
  visual: { poster: "/media/systems/intelligence" },
  copy: {
    en: {
      name: "ANU Intelligence",
      short: "Intelligence",
      pitch: "Find the right Iraqi companies, know why to call them, hand sales a researched account.",
      summary:
        "ANU Intelligence is prospecting and account research for companies that sell to other businesses in Iraq, built into the CRM of ANU Brain. It searches 15 sources from one screen, most of them Iraqi registers and directories, matches names across Arabic and English spellings, builds a company profile with its evidence, scores each account A, B or C, and puts the sales playbook inside the lead. It stops at ready for outreach: nothing is sent without a person.",
      audience: ["Business-development researchers", "Sales coordinators", "B2B sales teams", "Distributors and service companies selling to companies"],
      problem: {
        title: "Iraqi company data is scattered, and research dies in spreadsheets",
        body: "Official registers, chamber and syndicate rolls, exhibitor lists, job channels and social pages each hold a piece of the picture. The same company is spelled five ways, half the leads are already customers, and the reasons to call them stay in one researcher's Excel file until the handover.",
        symptoms: [
          "The same company in the CRM three times",
          "Lead lists bought or copied with no source",
          "Sales calls with no reason to call",
          "Research lost when a researcher leaves",
        ],
      },
      how: {
        title: "From scattered sources to a ready account",
        steps: [
          {
            title: "Search where Iraqi companies are listed",
            body: "One grid searches 15 sources: official company registers, a national trade directory, chamber and syndicate rolls, exhibitor catalogues, job channels, open map data and your own CRM.",
          },
          {
            title: "Add what's behind a login",
            body: "Social and map pages are searched in the researcher's own browser, as a person would, and a Save to ANU helper sends the list back to the same grid.",
          },
          {
            title: "Match before you add",
            body: "Every row is matched against the accounts you already hold, across Arabic and English spellings and phone formats, so nothing is added twice.",
          },
          {
            title: "Research with evidence",
            body: "Each account gets a profile: a summary, its sources and evidence, the questions that matter for its industry, and an initial fit.",
          },
          {
            title: "Score and qualify",
            body: "Accounts are graded A, B or C on six factors, with written rules for qualifying and disqualifying them.",
          },
          {
            title: "Hand over, ready for outreach",
            body: "The lead carries the sector card, likely pains, discovery questions, scripts, objections and demo flow. A WhatsApp button opens the chat; a person writes and sends.",
          },
        ],
      },
      inside: {
        title: "How ANU builds it",
        body: "Everything lives in the CRM, not beside it: lists, accounts, evidence and scores are records with a history. And nothing is claimed that is not known: a source that refused or asked for a login says so on its own line.",
        items: [
          { label: "Arabic-aware matching", body: "Generic words such as company or general trading are removed before names are compared, and each source is trusted only for the trades it actually covers." },
          { label: "Signals and score history", body: "Raw signals, reviewed events and score snapshots are kept, so you can see why an account moved from C to A." },
          { label: "Learns from your team", body: "A relevance score learns from the researchers' own verdicts on what was a good find." },
          { label: "Playbook from your procedures", body: "The sales playbook is rendered live in each lead from your written procedures, filtered by industry, grade and size. Edit the procedure once and every lead updates." },
          { label: "AI research on your own account", body: "A researcher can send an account to an AI research job through their own AI connection; the findings come back with their sources." },
        ],
        stack: ["ANU Brain CRM (Odoo 19)", "Fuzzy name matching", "BM25 ranking", "scikit-learn", "AI research agents", "Self-hosted search option"],
      },
      features: [
        { label: "15 sources, one grid", body: "Registers, directories, rolls, catalogues, job channels, map data and your CRM." },
        { label: "Saved searches", body: "Re-run every week and show only what is new." },
        { label: "Company profiles", body: "Summary, sources, evidence, industry questions and initial fit on one record." },
        { label: "A, B, C grading", body: "Six factors, plus written qualification and disqualification rules." },
        { label: "Playbook in the lead", body: "Pains, questions, scripts and objections for this sector, grade and size." },
        { label: "WhatsApp click-to-chat", body: "Opens a chat with the contact; no messaging contract, no bulk sending." },
        { label: "Mail add-in", body: "Save a company or contact to the CRM straight from your email." },
        { label: "Comments become leads", body: "Comments on your own social posts arrive in the research inbox." },
      ],
      facts: [
        { value: "15", label: "sources searched from one screen" },
        { value: "6", label: "factors in every A, B or C grade" },
        { value: "Weekly", label: "saved searches re-run, new results only" },
        { value: "0", label: "messages sent without a person" },
      ],
      faq: [
        {
          q: "Where does the company data come from?",
          a: "From public Iraqi sources: official company registers, a national trade directory, chamber and syndicate rolls, exhibitor catalogues, job channels and open map data, plus your own CRM. Every fact keeps its source, and pages that need a login are searched in the researcher's own browser.",
        },
        {
          q: "Does it send messages for us?",
          a: "No. It stops at ready for outreach. The WhatsApp button opens a chat, and a person decides what to write and whether to send.",
        },
        {
          q: "Does it handle Arabic names spelled many ways?",
          a: "Yes. Names are compared across Arabic and English spellings and phone formats, after generic words such as company and general trading are removed.",
        },
        {
          q: "Will it duplicate the customers we already have?",
          a: "No. Every new row is matched against the accounts already in your CRM before it is added, and a match is shown as an existing account.",
        },
        {
          q: "Is it only for one industry?",
          a: "No. It suits any company that sells to other businesses in Iraq. The industry questions, sector cards and scripts are yours to write, and ANU runs its own business development on it.",
        },
        {
          q: "Does it use AI?",
          a: "Optionally. A researcher can send an account to an AI research job through their own connection. The findings come back with their sources, and a source that could not be read says so.",
        },
      ],
      metaTitle: "ANU Intelligence: B2B prospecting and account research in Iraq",
      metaDescription:
        "Search 15 sources from the CRM, match Arabic and English names, research accounts with evidence, grade them A, B or C and hand sales a ready lead.",
      keywords: ["Iraqi company database", "B2B prospecting Iraq", "lead generation Iraq", "CRM Iraq Arabic", "sales intelligence Baghdad"],
    },
    ar: {
      name: "أنو لذكاء السوق",
      short: "ذكاء السوق",
      pitch: "اعثر على الشركات العراقية المناسبة، واعرف لماذا تتصل بها، وسلّم المبيعات حساباً مدروساً.",
      summary:
        "أنو لذكاء السوق نظام للبحث عن العملاء المحتملين ودراسة حساباتهم، للشركات التي تبيع إلى شركات أخرى في العراق، مبني داخل نظام إدارة العملاء في أنو برين. يبحث في 15 مصدراً من شاشة واحدة، أغلبها سجلات وأدلة عراقية، ويطابق الأسماء بين تهجئاتها العربية والإنجليزية، ويبني ملفاً لكل شركة مع أدلته، ويصنّف كل حساب A أو B أو C، ويضع دليل المبيعات داخل الفرصة. ويتوقف عند «جاهز للتواصل»، فلا يُرسَل شيء دون إنسان.",
      audience: ["باحثو تطوير الأعمال", "منسقو المبيعات", "فرق المبيعات بين الشركات", "الموزعون وشركات الخدمات التي تبيع للشركات"],
      problem: {
        title: "بيانات الشركات العراقية مبعثرة، والبحث يموت في الجداول",
        body: "السجلات الرسمية، وقوائم الغرف والنقابات، وقوائم العارضين، وقنوات الوظائف، وصفحات التواصل الاجتماعي، كلٌّ منها يحمل جزءاً من الصورة. والشركة نفسها تُكتب بخمس طرق، ونصف الأسماء زبائن لديك أصلاً، وأسباب الاتصال بها تبقى في ملف Excel عند باحث واحد حتى يوم التسليم.",
        symptoms: [
          "الشركة نفسها مكررة ثلاث مرات في النظام",
          "قوائم أسماء مشتراة أو منسوخة بلا مصدر",
          "اتصالات مبيعات بلا سبب للاتصال",
          "بحث يضيع حين يغادر الباحث",
        ],
      },
      how: {
        title: "من مصادر مبعثرة إلى حساب جاهز",
        steps: [
          {
            title: "ابحث حيث تُدرَج الشركات العراقية",
            body: "جدول واحد يبحث في 15 مصدراً: سجلات الشركات الرسمية، ودليل تجاري وطني، وقوائم الغرف والنقابات، وكتالوجات العارضين، وقنوات الوظائف، وبيانات الخرائط المفتوحة، ونظام العملاء لديك.",
          },
          {
            title: "أضف ما وراء تسجيل الدخول",
            body: "صفحات التواصل الاجتماعي والخرائط يُبحث فيها من متصفح الباحث نفسه كما يفعل أي شخص، وأداة «احفظ في أنو» تعيد القائمة إلى الجدول نفسه.",
          },
          {
            title: "طابِق قبل أن تضيف",
            body: "يُطابَق كل سطر مع الحسابات الموجودة لديك، بين التهجئات العربية والإنجليزية وصيغ أرقام الهواتف، فلا يُضاف شيء مرتين.",
          },
          {
            title: "ابحث مع الأدلة",
            body: "يحصل كل حساب على ملف: ملخص، ومصادره وأدلته، والأسئلة المهمة لقطاعه، وتقدير أولي للملاءمة.",
          },
          {
            title: "صنّف وأهّل",
            body: "تُصنَّف الحسابات A أو B أو C على ستة عوامل، مع قواعد مكتوبة لتأهيلها أو استبعادها.",
          },
          {
            title: "سلّم الحساب جاهزاً للتواصل",
            body: "تحمل الفرصة بطاقة القطاع، والمشكلات المرجّحة، وأسئلة الاستكشاف، والنصوص، والاعتراضات، ومسار العرض. وزر WhatsApp يفتح المحادثة، ويكتب الإنسان ويرسل.",
          },
        ],
      },
      inside: {
        title: "كيف تبنيه أنو",
        body: "كل شيء يعيش داخل نظام إدارة العملاء لا بجانبه: القوائم والحسابات والأدلة والتصنيفات سجلات لها تاريخ. ولا يُدّعى شيء غير معروف: المصدر الذي رفض أو طلب تسجيل الدخول يقول ذلك في سطر خاص به.",
        items: [
          { label: "مطابقة تفهم العربية", body: "تُحذف الكلمات العامة مثل «شركة» و«للتجارة العامة» قبل مقارنة الأسماء، ولا يُعتمد كل مصدر إلا في القطاعات التي يغطيها فعلاً." },
          { label: "إشارات وتاريخ للتصنيف", body: "تُحفظ الإشارات الخام والأحداث المراجَعة ولقطات التصنيف، فترى لماذا انتقل حساب من C إلى A." },
          { label: "يتعلم من فريقك", body: "مقياس للصلة يتعلم من أحكام الباحثين أنفسهم على ما كان اكتشافاً جيداً." },
          { label: "دليل المبيعات من إجراءاتك", body: "يُعرض دليل المبيعات حياً داخل كل فرصة من إجراءاتك المكتوبة، مصفّى حسب القطاع والتصنيف والحجم. عدّل الإجراء مرة واحدة فتتحدث كل الفرص." },
          { label: "بحث بالذكاء الاصطناعي من حسابك", body: "يستطيع الباحث إرسال حساب إلى مهمة بحث بالذكاء الاصطناعي عبر اتصاله الخاص، فتعود النتائج ومعها مصادرها." },
        ],
        stack: ["نظام العملاء في أنو برين (Odoo 19)", "مطابقة تقريبية للأسماء", "ترتيب BM25", "scikit-learn", "وكلاء بحث بالذكاء الاصطناعي", "خيار بحث مستضاف ذاتياً"],
      },
      features: [
        { label: "15 مصدراً في جدول واحد", body: "السجلات والأدلة والقوائم والكتالوجات وقنوات الوظائف وبيانات الخرائط ونظام العملاء لديك." },
        { label: "عمليات بحث محفوظة", body: "تُعاد كل أسبوع ولا تعرض إلا الجديد." },
        { label: "ملفات الشركات", body: "الملخص والمصادر والأدلة وأسئلة القطاع وتقدير الملاءمة في سجل واحد." },
        { label: "تصنيف A وB وC", body: "ستة عوامل، مع قواعد مكتوبة للتأهيل والاستبعاد." },
        { label: "دليل المبيعات في الفرصة", body: "المشكلات والأسئلة والنصوص والاعتراضات لهذا القطاع والتصنيف والحجم." },
        { label: "محادثة WhatsApp بنقرة", body: "يفتح محادثة مع جهة الاتصال، دون عقد مراسلة ودون إرسال جماعي." },
        { label: "إضافة للبريد", body: "احفظ الشركة أو جهة الاتصال في نظام العملاء من بريدك مباشرة." },
        { label: "التعليقات تصبح فرصاً", body: "التعليقات على منشوراتك في التواصل الاجتماعي تصل إلى صندوق البحث." },
      ],
      facts: [
        { value: "15", label: "مصدراً يُبحث فيها من شاشة واحدة" },
        { value: "6", label: "عوامل في كل تصنيف A أو B أو C" },
        { value: "أسبوعياً", label: "تُعاد عمليات البحث المحفوظة، بالنتائج الجديدة فقط" },
        { value: "0", label: "رسائل تُرسل دون إنسان" },
      ],
      faq: [
        {
          q: "من أين تأتي بيانات الشركات؟",
          a: "من مصادر عراقية عامة: سجلات الشركات الرسمية، ودليل تجاري وطني، وقوائم الغرف والنقابات، وكتالوجات العارضين، وقنوات الوظائف، وبيانات الخرائط المفتوحة، إضافة إلى نظام العملاء لديك. وكل معلومة تحتفظ بمصدرها، والصفحات التي تحتاج تسجيل دخول يُبحث فيها من متصفح الباحث نفسه.",
        },
        {
          q: "هل يرسل الرسائل نيابة عنا؟",
          a: "لا. يتوقف عند «جاهز للتواصل». زر WhatsApp يفتح المحادثة، والإنسان يقرر ماذا يكتب وهل يرسل.",
        },
        {
          q: "هل يتعامل مع الأسماء العربية المكتوبة بطرق مختلفة؟",
          a: "نعم. تُقارن الأسماء بين التهجئات العربية والإنجليزية وصيغ أرقام الهواتف، بعد حذف الكلمات العامة مثل «شركة» و«للتجارة العامة».",
        },
        {
          q: "هل سيكرر الزبائن الموجودين لدينا؟",
          a: "لا. يُطابَق كل سطر جديد مع الحسابات الموجودة في نظامك قبل إضافته، ويظهر التطابق حساباً قائماً.",
        },
        {
          q: "هل هو لقطاع واحد فقط؟",
          a: "لا. يناسب أي شركة تبيع إلى شركات أخرى في العراق. أسئلة القطاع وبطاقاته ونصوص المبيعات تكتبها أنت، وأنو نفسها تدير تطوير أعمالها عليه.",
        },
        {
          q: "هل يستخدم الذكاء الاصطناعي؟",
          a: "اختيارياً. يستطيع الباحث إرسال حساب إلى مهمة بحث بالذكاء الاصطناعي عبر اتصاله الخاص، فتعود النتائج مع مصادرها، والمصدر الذي تعذّرت قراءته يقول ذلك.",
        },
      ],
      metaTitle: "أنو لذكاء السوق: البحث عن العملاء ودراسة الحسابات في العراق",
      metaDescription:
        "ابحث في 15 مصدراً من نظام العملاء، وطابِق الأسماء العربية والإنجليزية، وادرس الحسابات بالأدلة، وصنّفها A أو B أو C، وسلّم المبيعات فرصة جاهزة.",
      keywords: ["دليل الشركات العراقية", "البحث عن عملاء العراق", "توليد الفرص التجارية", "نظام CRM عربي", "ذكاء السوق بغداد"],
    },
  },
}
