import type { SystemStory } from "./types"

export const bureau: SystemStory = {
  slug: "bureau",
  group: "industry",
  status: "building",
  order: 14,
  related: ["brain", "support", "intelligence"],
  visual: { poster: "/media/systems/bureau" },
  copy: {
    en: {
      name: "ANU Bureau",
      short: "Bureau",
      pitch: "The scientific bureau's system: rep visits, registration, imports and every expiry date.",
      summary:
        "ANU Bureau is the whole system of an Iraqi scientific bureau that imports, registers and promotes pharmaceutical, aesthetic and dermo-cosmetic products for foreign principals. Reps file visits from their phones even without a signal, while registrations with the federal and Kurdistan ministries of health, import shipments and every expiring licence are walked step by step, with reminders. It runs on ANU Brain in Arabic, Kurdish and English.",
      audience: ["Pharmaceutical scientific bureaux", "Aesthetics and medical-device agents", "Dermo-cosmetics importers", "Rep teams and their supervisors"],
      problem: {
        title: "The bureau runs on memory and phone calls",
        body: "A rep's visit can't be checked. A registration or an agency letter expires, and nobody notices until a shipment is held. Every follow-up with a ministry, customs or a broker lives in one person's head, and the monthly report to the principal is put together by hand.",
        symptoms: [
          "Visit reports nobody can verify",
          "Licences and agency letters that expire unseen",
          "Shipments stuck between authorities",
          "Samples handed out with no reconciliation",
        ],
      },
      how: {
        title: "From the rep's day to the management pack",
        steps: [
          {
            title: "The rep's day",
            body: "On the phone, \"My day\" shows the plan and the doctors. A visit is one tap per screen: met or not, products and the doctor's response, samples, objections and the next step. Without a signal, visits wait on the phone and are sent once, with the time they were really filed.",
          },
          {
            title: "Supervisors see the field",
            body: "Weekly plans with a suggested route by area, joint visits with ratings, and coverage of A-class doctors. Visits filed long after the fact, from the same GPS point or after impossible travel speeds are flagged.",
          },
          {
            title: "Registration as a procedure",
            body: "Each registration with the federal or the Kurdistan Ministry of Health walks its steps with target days: the dossier checklist, lab samples, committee queries and pricing approval, through to the certificate and its expiry.",
          },
          {
            title: "Imports by port of entry",
            body: "Each shipment follows the procedure of its route, from the purchase order and proforma through permits, quality control, customs and batch release, to the receipt with batch and expiry. Months of cover show the stock-out risk early.",
          },
          {
            title: "Nothing expires unseen",
            body: "The expiry radar reminds the responsible person at 90, 60 and 30 days. Switchable email and WhatsApp rules, a 07:30 daily digest and a monthly management pack keep everyone in step.",
          },
        ],
      },
      inside: {
        title: "How ANU builds it",
        body: "Everything the bureau does outside accounting, on ANU Brain's standard apps plus a procedure engine. Nothing in the code names a client: each bureau sets its own brand, procedures and rules.",
        items: [
          { label: "A procedure engine", body: "Registrations, shipments, tenders and government follow-ups are procedures with steps and target days, set up by each team for its own files." },
          { label: "A field app that forgives the network", body: "The rep app installs from the browser, works offline, and has a practice mode where test visits never count." },
          { label: "Who sees what", body: "Reps see their own visits, doctors and samples, never a colleague's doctors. Only executives and app managers can export, so the doctor book stays in the system, and every change is in the audit log." },
          { label: "Quality that can't be skipped", body: "Complaints and adverse events are linked to the batch, and a serious adverse event cannot be closed without the Ministry's reference." },
          { label: "Clean dealings", body: "Broker and expediter costs are recorded as service-fee notes with their invoice, next to an anti-bribery policy every new employee acknowledges." },
          { label: "WhatsApp two ways", body: "Free click-to-send from the to-do list, or automatic sending through the official business API, both behind one outbox." },
        ],
        stack: ["ANU Brain (Odoo 20)", "Procedure engine", "Installable offline rep app", "WhatsApp Business API", "Arabic, Kurdish Sorani, English"],
      },
      features: [
        { label: "Offline rep app", body: "Visits, samples and orders without a signal, sent once with the true time." },
        { label: "Anti-fraud flags", body: "Late filing, the same GPS point, impossible travel speed." },
        { label: "Expiry radar", body: "Licences, certificates, agency letters, permits and bid bonds at 90, 60 and 30 days." },
        { label: "Registration tracking", body: "Federal and Kurdistan procedures, dossiers, committees and pricing." },
        { label: "Import procedures", body: "By port of entry, with batch and expiry on receipt and a stock-out forecast." },
        { label: "Tenders", body: "From announcement to award, with the bid bond on the radar." },
        { label: "Marketing and KOLs", body: "Events and workshops with cost per lead, invitations and field feedback." },
        { label: "Management pack", body: "A monthly PDF to management, and a 07:30 digest every working day." },
      ],
      facts: [
        { value: "90 / 60 / 30", label: "day reminders before anything expires" },
        { value: "32", label: "switchable email and WhatsApp rules" },
        { value: "3", label: "languages: Arabic, Kurdish and English" },
        { value: "07:30", label: "daily digest on working days" },
      ],
      faq: [
        {
          q: "Does the rep app work without a signal?",
          a: "Yes. Visits, samples and orders wait on the phone and are sent once when the connection returns, with the time they were really filed.",
        },
        {
          q: "Does it cover the Kurdistan Region?",
          a: "Yes. Registrations walk either the federal or the Kurdistan Ministry of Health procedure, and the system works in Arabic, Kurdish Sorani and English. The Kurdish texts get a native speaker's review before Kurdish-speaking staff start.",
        },
        {
          q: "Does it do our accounting?",
          a: "No, by design. Bureau tracks quantities: stock, samples, orders and shipments. Prices, invoices and the books stay in your accounting system.",
        },
        {
          q: "Can a rep take the doctor list when leaving?",
          a: "Reps see only their own doctors and cannot export. Only executives and each app's manager can export, from the lists they manage.",
        },
        {
          q: "Do we need a WhatsApp Business account?",
          a: "No. Click-to-send prepares each message for one tap and needs no account. Automatic sending, with replies and read receipts back in the system, needs a verified business account and the provider's message fees. You switch with one setting.",
        },
        {
          q: "Is it ready, and where does it run?",
          a: "Bureau is built and in final hardening before its first go-live. It runs on ANU Cloud with backups every six hours, under your bureau's own logo and colours.",
        },
      ],
      metaTitle: "ANU Bureau: the system for scientific bureaux in Iraq",
      metaDescription:
        "Medical rep visits that work offline, Ministry of Health registration, import procedures, an expiry radar, tenders and quality, in Arabic, Kurdish and English.",
      keywords: ["scientific bureau system Iraq", "medical rep app offline", "pharmaceutical CRM Iraq", "product registration tracking", "import and expiry tracking"],
    },
    ar: {
      name: "أنو للمكاتب العلمية",
      short: "المكاتب العلمية",
      pitch: "نظام المكتب العلمي: زيارات المندوبين والتسجيل والاستيراد وكل تاريخ انتهاء.",
      summary:
        "أنو للمكاتب العلمية هو النظام الكامل للمكتب العلمي العراقي الذي يستورد ويسجّل ويروّج المنتجات الدوائية والتجميلية ومستحضرات العناية بالبشرة لصالح شركات أجنبية. يسجّل المندوبون زياراتهم من هواتفهم حتى بلا تغطية، وتسير تسجيلات وزارة الصحة الاتحادية ووزارة صحة إقليم كوردستان وشحنات الاستيراد وكل ترخيص يقترب انتهاؤه خطوةً بخطوة مع التذكيرات. ويعمل على أنو برين بالعربية والكوردية والإنجليزية.",
      audience: ["المكاتب العلمية الدوائية", "وكلاء التجميل والأجهزة الطبية", "مستوردو مستحضرات العناية بالبشرة", "فرق المندوبين ومشرفوها"],
      problem: {
        title: "المكتب يعمل بالذاكرة والمكالمات",
        body: "زيارة المندوب لا يمكن التحقق منها. ينتهي تسجيل أو كتاب وكالة ولا ينتبه أحد حتى تُحتجز شحنة. كل متابعة مع وزارة أو جمارك أو مخلّص تعيش في رأس شخص واحد، والتقرير الشهري للشركة الأجنبية يُجمع يدوياً.",
        symptoms: [
          "تقارير زيارات لا يمكن التحقق منها",
          "تراخيص وكتب وكالة تنتهي دون أن يراها أحد",
          "شحنات عالقة بين الجهات",
          "عيّنات تُوزَّع بلا مطابقة",
        ],
      },
      how: {
        title: "من يوم المندوب إلى حزمة الإدارة",
        steps: [
          {
            title: "يوم المندوب",
            body: "على الهاتف تعرض شاشة «يومي» الخطة والأطباء. الزيارة لمسة واحدة في كل شاشة: هل التقى الطبيب، والمنتجات وردّ الطبيب، والعيّنات، والاعتراضات، والخطوة التالية. وبلا تغطية تنتظر الزيارات على الهاتف وتُرسل مرة واحدة بالوقت الذي سُجّلت فيه فعلاً.",
          },
          {
            title: "المشرفون يرون الميدان",
            body: "خطط أسبوعية بمسار مقترح حسب المنطقة، وزيارات مشتركة بتقييم، وتغطية أطباء الفئة A. وتُعلَّم الزيارات المرسلة بعد وقت طويل، أو من نقطة GPS نفسها، أو بسرعة تنقل مستحيلة.",
          },
          {
            title: "التسجيل إجراءً",
            body: "كل تسجيل في وزارة الصحة الاتحادية أو وزارة صحة الإقليم يسير بخطواته مع أيام مستهدفة: قائمة مستندات الملف، وعيّنات المختبر، واستفسارات اللجان، وموافقة التسعير، حتى الشهادة وتاريخ انتهائها.",
          },
          {
            title: "الاستيراد حسب منفذ الدخول",
            body: "كل شحنة تتبع إجراء منفذها، من أمر الشراء والفاتورة المبدئية مروراً بالموافقات والسيطرة النوعية والجمارك وإطلاق الوجبة، حتى الاستلام برقم الوجبة وتاريخ الانتهاء. وأشهر التغطية تكشف خطر نفاد المخزون مبكراً.",
          },
          {
            title: "لا شيء ينتهي دون أن يُرى",
            body: "رادار الانتهاء يذكّر المسؤول قبل 90 و60 و30 يوماً. وقواعد البريد وWhatsApp القابلة للتشغيل والإيقاف، والملخص اليومي في 07:30، والحزمة الشهرية للإدارة، تُبقي الجميع على اطلاع.",
          },
        ],
      },
      inside: {
        title: "كيف تبنيه أنو",
        body: "كل ما يعمله المكتب خارج المحاسبة، على تطبيقات أنو برين القياسية مع محرك للإجراءات. ولا تذكر الشيفرة اسم أي عميل: كل مكتب يضبط علامته وإجراءاته وقواعده.",
        items: [
          { label: "محرك إجراءات", body: "التسجيلات والشحنات والمناقصات والمتابعات الحكومية إجراءات بخطوات وأيام مستهدفة، يضبطها كل فريق لملفاته." },
          { label: "تطبيق ميداني يتسامح مع الشبكة", body: "تطبيق المندوب يُثبَّت من المتصفح، ويعمل دون اتصال، وفيه وضع تدريب لا تُحتسب زياراته." },
          { label: "من يرى ماذا", body: "يرى المندوب زياراته وأطباءه وعيّناته، ولا يفتح أطباء زميله. ولا يصدّر البيانات إلا المدراء التنفيذيون ومدراء التطبيقات، فيبقى دفتر الأطباء في النظام، وكل تغيير مسجّل في سجل التدقيق." },
          { label: "جودة لا يمكن تجاوزها", body: "الشكاوى والآثار الجانبية مربوطة بالوجبة، والأثر الجانبي الخطير لا يُغلق دون رقم كتاب الوزارة." },
          { label: "تعامل نظيف", body: "تكاليف المخلّصين والمعقّبين تُسجّل ملاحظات أجور خدمة مع فاتورتها، بجانب سياسة مكافحة الرشوة التي يقرّ بها كل موظف جديد." },
          { label: "WhatsApp بطريقتين", body: "إرسال مجاني بلمسة من قائمة المهام، أو إرسال آلي عبر واجهة الأعمال الرسمية، وكلاهما من صندوق صادر واحد." },
        ],
        stack: ["أنو برين (Odoo 20)", "محرك الإجراءات", "تطبيق مندوب قابل للتثبيت يعمل دون اتصال", "WhatsApp Business API", "العربية والكوردية السورانية والإنجليزية"],
      },
      features: [
        { label: "تطبيق المندوب دون اتصال", body: "الزيارات والعيّنات والطلبات بلا تغطية، تُرسل مرة واحدة بالوقت الحقيقي." },
        { label: "علامات التلاعب", body: "التسجيل المتأخر، ونقطة GPS نفسها، وسرعة التنقل المستحيلة." },
        { label: "رادار الانتهاء", body: "التراخيص والشهادات وكتب الوكالة والموافقات وتأمينات العطاءات قبل 90 و60 و30 يوماً." },
        { label: "متابعة التسجيل", body: "إجراءات الوزارة الاتحادية والإقليم، والملفات، واللجان، والتسعير." },
        { label: "إجراءات الاستيراد", body: "حسب منفذ الدخول، مع الوجبة وتاريخ الانتهاء عند الاستلام وتوقع نفاد المخزون." },
        { label: "المناقصات", body: "من الإعلان إلى الإحالة، وتأمينات العطاء على الرادار." },
        { label: "التسويق وقادة الرأي", body: "الفعاليات وورش العمل بكلفة كل عميل محتمل، والدعوات، وملاحظات الميدان." },
        { label: "حزمة الإدارة", body: "ملف PDF شهري للإدارة، وملخص في 07:30 كل يوم عمل." },
      ],
      facts: [
        { value: "90 / 60 / 30", label: "يوماً: تذكيرات قبل انتهاء أي شيء" },
        { value: "32", label: "قاعدة بريد وWhatsApp قابلة للإيقاف" },
        { value: "3", label: "لغات: العربية والكوردية والإنجليزية" },
        { value: "07:30", label: "ملخص يومي في أيام العمل" },
      ],
      faq: [
        {
          q: "هل يعمل تطبيق المندوب بلا تغطية؟",
          a: "نعم. الزيارات والعيّنات والطلبات تنتظر على الهاتف وتُرسل مرة واحدة حين يعود الاتصال، بالوقت الذي سُجّلت فيه فعلاً.",
        },
        {
          q: "هل يشمل إقليم كوردستان؟",
          a: "نعم. تسير التسجيلات وفق إجراء وزارة الصحة الاتحادية أو وزارة صحة الإقليم، ويعمل النظام بالعربية والكوردية السورانية والإنجليزية. وتُراجع النصوص الكوردية على يد متحدث أصلي قبل أن يبدأ الموظفون الناطقون بالكوردية.",
        },
        {
          q: "هل يقوم بمحاسبتنا؟",
          a: "لا، وهذا مقصود. يتابع النظام الكميات: المخزون والعيّنات والطلبات والشحنات. أما الأسعار والفواتير والدفاتر فتبقى في نظامك المحاسبي.",
        },
        {
          q: "هل يأخذ المندوب قائمة الأطباء حين يغادر؟",
          a: "لا يرى المندوب إلا أطباءه ولا يستطيع التصدير. التصدير للمدراء التنفيذيين ومدير كل تطبيق فقط، من القوائم التي يديرونها.",
        },
        {
          q: "هل نحتاج إلى حساب WhatsApp للأعمال؟",
          a: "لا. الإرسال بلمسة يجهّز كل رسالة لتُرسل بضغطة ولا يحتاج إلى حساب. أما الإرسال الآلي، مع عودة الردود وإشعارات القراءة إلى النظام، فيحتاج إلى حساب أعمال موثّق ورسوم الرسائل لدى المزوّد. والتحويل بينهما إعداد واحد.",
        },
        {
          q: "هل هو جاهز، وأين يعمل؟",
          a: "النظام مبني وفي مرحلة التحصين النهائية قبل أول تشغيل فعلي. ويعمل على أنو كلاود مع نسخ احتياطية كل ست ساعات، بشعار مكتبك وألوانه.",
        },
      ],
      metaTitle: "أنو للمكاتب العلمية: نظام المكتب العلمي في العراق",
      metaDescription:
        "زيارات مندوبين تعمل دون اتصال، وتسجيل المنتجات في وزارة الصحة، وإجراءات الاستيراد، ورادار الانتهاء، والمناقصات والجودة، بالعربية والكوردية والإنجليزية.",
      keywords: ["نظام المكتب العلمي العراق", "تطبيق المندوب الطبي", "نظام إدارة المندوبين", "متابعة تسجيل الأدوية", "متابعة الاستيراد وتواريخ الانتهاء"],
    },
  },
}
