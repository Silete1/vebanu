import type { Locale } from "@/lib/i18n"

/** The home page, told as one story: noise → control → the system → the way ANU works. */
export type HomeStory = {
  meta: { title: string; description: string }
  hero: { kicker: string; title: [string, string]; lede: string; primary: string; secondary: string; visualAlt: string }
  noise: {
    kicker: string
    title: string
    lede: string
    messages: string[]
    after: { title: string; body: string }
  }
  does: { kicker: string; title: string; items: { title: string; body: string }[] }
  map: { kicker: string; title: string; lede: string; label: string; all: string }
  featured: { kicker: string; title: string; slugs: string[] }
  method: { kicker: string; title: string; lede: string; steps: { title: string; body: string }[]; more: string }
  rules: { kicker: string; title: string; items: { title: string; body: string }[] }
  notes: { kicker: string; title: string; all: string }
}

export const homeStory: Record<Locale, HomeStory> = {
  en: {
    meta: {
      title: "ANU Software Solutions: business control, implemented",
      description:
        "ANU redesigns how Iraqi companies run, implements ANU Brain on Odoo as the control layer, and builds complete systems for furniture workshops, construction, retail, legal and government work. Arabic first.",
    },
    hero: {
      kicker: "ANU Software Solutions · Baghdad",
      title: ["Business control,", "implemented."],
      lede: "We redesign how your company runs, put ANU Brain at its centre, and build the systems your industry is missing. In Arabic and English.",
      primary: "Book an assessment",
      secondary: "See the systems",
      visualAlt: "The ANU line network settling into an ordered grid of square status glyphs",
    },
    noise: {
      kicker: "The noise",
      title: "Most companies run on WhatsApp, Excel and memory.",
      lede: "Approvals live in chats, stock lives in spreadsheets, and the truth lives in one person's head. It works until the company grows.",
      messages: [
        "Approved? Send me the photo",
        "Which price did we give him?",
        "Stock says 40, the shelf says 12",
        "Who changed the invoice?",
        "Call the accountant, he knows",
        "Excel v7 final FINAL",
        "The driver took cash, how much?",
        "Waiting on the manager since Sunday",
      ],
      after: {
        title: "ANU turns that noise into one system of record.",
        body: "Every request has an owner, every approval a trace, every figure one source. The manager sees the company, not the chat.",
      },
    },
    does: {
      kicker: "What ANU does",
      title: "Four jobs, one outcome: control you can see.",
      items: [
        {
          title: "Redesign the work",
          body: "We map how the company really runs, who asks, who approves, who receives, and design the process before touching software.",
        },
        {
          title: "Implement ANU Brain",
          body: "Our system, built on Odoo, becomes the control layer for sales, stock, purchasing, finance and reporting, in Arabic first.",
        },
        {
          title: "Build what is missing",
          body: "Where an industry needs more, we build it: furniture design to CNC, digital twins, construction, legal, government workflows.",
        },
        {
          title: "Run it with you",
          body: "Hosting, backups, support from any screen, walkthroughs on the real screens, and training until your team owns it.",
        },
      ],
    },
    map: {
      kicker: "The ANU system",
      title: "One brain, the layers every client gets, and systems for each industry.",
      lede: "ANU Brain sits at the centre. Around it, what every client receives: the control layer, walkthroughs, support and intelligence. On the outer ring, complete systems built for one kind of business.",
      label: "Map of ANU systems",
      all: "Explore every system",
    },
    featured: {
      kicker: "Systems",
      title: "Built in Iraq, for the way Iraqi companies work.",
      slugs: ["workshops", "twins", "walkthroughs", "control-layer", "construction", "legal"],
    },
    method: {
      kicker: "The method",
      title: "Engineer the business before configuring the system.",
      lede: "Every project walks the same road, with a gate at each stage. Nothing moves forward on a promise.",
      steps: [
        { title: "Assess", body: "A short diagnostic of how the company runs, where control breaks and what phase one should hold." },
        { title: "Design", body: "The to-be processes, roles, approvals and policies, signed off before configuration." },
        { title: "Configure", body: "ANU Brain set up to the design, data migrated and opening balances proven." },
        { title: "Stabilize", body: "Go-live with hypercare, walkthroughs on every screen and support from any screen." },
      ],
      more: "Read the method",
    },
    rules: {
      kicker: "How we build",
      title: "Rules we hold ourselves to.",
      items: [
        { title: "Proof, not claims", body: "Tests, screenshots in light and dark, Arabic and English, and real data before anything is called done." },
        { title: "Modular, never patchwork", body: "One source of truth per concern. We extend what exists instead of stacking special cases." },
        { title: "Arabic first", body: "Right to left by design, Iraqi months, numbers that stay readable. English is a peer, not the default." },
        { title: "Honest systems", body: "Our software says when it cannot do something. It never guesses a price, a stock level or a deadline." },
      ],
    },
    notes: { kicker: "Field notes", title: "What we learn on the ground.", all: "All field notes" },
  },
  ar: {
    meta: {
      title: "أنو للحلول البرمجية: الرقابة على العمل، مطبّقة",
      description:
        "تعيد أنو تصميم طريقة عمل الشركات العراقية، وتطبّق أنو برين المبني على Odoo طبقةً للرقابة، وتبني أنظمة كاملة لورش الأثاث والمقاولات والتجزئة والشؤون القانونية والحكومية. بالعربية أولاً.",
    },
    hero: {
      kicker: "أنو للحلول البرمجية · بغداد",
      title: ["الرقابة على العمل،", "مطبّقة."],
      lede: "نعيد تصميم طريقة عمل شركتك، ونضع أنو برين في قلبها، ونبني الأنظمة التي يفتقدها قطاعك. بالعربية والإنجليزية.",
      primary: "احجز تقييماً",
      secondary: "شاهد الأنظمة",
      visualAlt: "شبكة خطوط أنو تستقر في شبكة منتظمة من مربعات الحالة",
    },
    noise: {
      kicker: "الفوضى",
      title: "معظم الشركات تُدار عبر واتساب وExcel والذاكرة.",
      lede: "الموافقات في المحادثات، والمخزون في جداول، والحقيقة في رأس شخص واحد. ينجح ذلك حتى تكبر الشركة.",
      messages: [
        "وافقت؟ دزلي الصورة",
        "بيا سعر عطيناه؟",
        "المخزون يكول 40 والرف بي 12",
        "منو غيّر الفاتورة؟",
        "اتصل بالمحاسب، هو يعرف",
        "Excel نسخة 7 نهائي النهائي",
        "السايق استلم كاش، شكد؟",
        "ننتظر المدير من الأحد",
      ],
      after: {
        title: "تحوّل أنو هذه الفوضى إلى نظام سجلات واحد.",
        body: "لكل طلب صاحب، ولكل موافقة أثر، ولكل رقم مصدر واحد. يرى المدير الشركة، لا المحادثة.",
      },
    },
    does: {
      kicker: "ماذا تفعل أنو",
      title: "أربع مهام، ونتيجة واحدة: رقابة تراها.",
      items: [
        {
          title: "نعيد تصميم العمل",
          body: "نرسم كيف تعمل الشركة فعلاً: من يطلب، ومن يوافق، ومن يستلم، ونصمم العملية قبل أن نلمس البرنامج.",
        },
        {
          title: "نطبّق أنو برين",
          body: "نظامنا المبني على Odoo يصبح طبقة الرقابة على المبيعات والمخزون والمشتريات والمالية والتقارير، بالعربية أولاً.",
        },
        {
          title: "نبني ما ينقص",
          body: "حين يحتاج القطاع أكثر نبنيه: من تصميم الأثاث إلى الـCNC، والتوائم الرقمية، والمقاولات، والقانون، والمعاملات الحكومية.",
        },
        {
          title: "نشغّله معك",
          body: "الاستضافة والنسخ الاحتياطي والدعم من أي شاشة والجولات الإرشادية على الشاشات الحقيقية والتدريب حتى يملك فريقك النظام.",
        },
      ],
    },
    map: {
      kicker: "منظومة أنو",
      title: "عقل واحد، وطبقات يحصل عليها كل عميل، وأنظمة لكل قطاع.",
      lede: "في المركز أنو برين. حوله ما يحصل عليه كل عميل: طبقة الرقابة والجولات الإرشادية والدعم والاستخبارات. وفي الحلقة الخارجية أنظمة كاملة لكل نوع من الأعمال.",
      label: "خريطة أنظمة أنو",
      all: "استكشف كل الأنظمة",
    },
    featured: {
      kicker: "الأنظمة",
      title: "صُنعت في العراق، لطريقة عمل الشركات العراقية.",
      slugs: ["workshops", "twins", "walkthroughs", "control-layer", "construction", "legal"],
    },
    method: {
      kicker: "المنهج",
      title: "هندسة العمل قبل تهيئة النظام.",
      lede: "كل مشروع يسير على الطريق نفسه، وعند كل مرحلة بوابة. لا شيء يتقدم على وعد.",
      steps: [
        { title: "التقييم", body: "تشخيص قصير لطريقة عمل الشركة وأين تنكسر الرقابة وما يجب أن تحمله المرحلة الأولى." },
        { title: "التصميم", body: "العمليات المستهدفة والأدوار والموافقات والسياسات، تُعتمد قبل التهيئة." },
        { title: "التهيئة", body: "يُضبط أنو برين على التصميم، وتُنقل البيانات، وتُثبت الأرصدة الافتتاحية." },
        { title: "التثبيت", body: "الإطلاق مع رعاية مكثفة، وجولات إرشادية على كل شاشة، ودعم من أي شاشة." },
      ],
      more: "اقرأ المنهج",
    },
    rules: {
      kicker: "كيف نبني",
      title: "قواعد نلتزم بها.",
      items: [
        { title: "الدليل لا الادعاء", body: "اختبارات، ولقطات بالوضعين الفاتح والداكن، بالعربية والإنجليزية، وبيانات حقيقية قبل أن نقول إن شيئاً انتهى." },
        { title: "وحدات لا ترقيع", body: "مصدر واحد للحقيقة لكل شأن. نوسّع الموجود بدل تكديس الاستثناءات." },
        { title: "العربية أولاً", body: "من اليمين إلى اليسار بالتصميم، والأشهر العراقية، وأرقام تبقى مقروءة. الإنجليزية شريكة لا أصل." },
        { title: "أنظمة صادقة", body: "برامجنا تقول حين لا تستطيع شيئاً، ولا تخمّن سعراً ولا مخزوناً ولا موعداً." },
      ],
    },
    notes: { kicker: "ملاحظات ميدانية", title: "ما نتعلمه على الأرض.", all: "كل الملاحظات" },
  },
}
