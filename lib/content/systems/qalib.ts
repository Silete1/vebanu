import type { SystemStory } from "./types"

export const qalib: SystemStory = {
  slug: "qalib",
  group: "industry",
  status: "demo",
  order: 11,
  related: ["workshops", "construction", "brain"],
  visual: { poster: "/media/systems/qalib" },
  copy: {
    en: {
      name: "ANU Qalib",
      short: "Qalib",
      pitch: "Precast concrete and prefab, from the first sketch to the signed installation.",
      summary:
        "ANU Qalib takes a precast project from the first sketch to the handover in one record. A sales engineer draws a house, a portal-frame hall or a fence, and the server engine returns the pieces, quantities, crane check, truckloads, setting-out points and price; the approved revision then drives the moulds, curing, cube tests, dispatch and the crew's installation. It runs inside ANU Brain, Arabic first, with prices in dollars and dinars.",
      audience: ["Precast concrete plants", "Sandwich-panel and prefab makers", "Portal-frame hall and fence builders", "Factory, sales and site teams"],
      problem: {
        title: "One mould, many projects, and nobody holds the whole job",
        body: "The contract fixes the dimensions, then someone counts the pieces by hand. Projects take turns on a shared mould while the concrete cures at its own pace, the site has no yard for what arrives early, and the crew learns the day's work by phone. The cost of each project is known only after it ends.",
        symptoms: [
          "Piece lists counted by hand from the contract",
          "A mould booked twice, or standing idle",
          "Pieces shipped before the concrete is strong enough",
          "Crews on site without a day list",
        ],
      },
      how: {
        title: "One revision, from the sketch to the site",
        steps: [
          {
            title: "Design from the opportunity",
            body: "From the sales opportunity, open the designer and sketch the plot, the building and the fence. Pieces, quantities, crane check, truckloads, setting-out points and the price come back from the server engine as you draw.",
          },
          {
            title: "Check, lock and quote",
            body: "The design is checked against the plant's engineering rules. An approved revision is locked and fingerprinted, and the quotation comes from it, with the scope exclusions and a staged payment plan with retention.",
          },
          {
            title: "Release to the moulds",
            body: "Releasing the revision creates one record for every piece. Manufacturing orders book the moulds, and no mould work starts before the release, so a shared mould is planned rather than argued over.",
          },
          {
            title: "Cast, cure and test",
            body: "Every concrete batch gets its 7- and 28-day cube tests. Measured strength releases pieces for demoulding and lifting; a failed batch holds its pieces wherever they are until a non-conformance decision.",
          },
          {
            title: "Dispatch and install",
            body: "Deliveries are split one per truck, in installation order, and cannot leave before the strength and the site are ready. The crew's phone shows the day list, takes the receipt signature and confirms each installed piece, checked by the server.",
          },
        ],
      },
      inside: {
        title: "How ANU builds it",
        body: "The browser draws; the server calculates. One engine is the only authority for every quantity, and the ERP's standard apps carry the record from the contract to the retention.",
        items: [
          { label: "One calculation authority", body: "A pure-Python engine computes the project on the server. The designer shows its results and never runs a second calculation of its own." },
          { label: "The plant described as data", body: "Catalogue, moulds, cranes with their load charts and the engineering rule set are records the plant maintains, never constants in code." },
          { label: "Locked, fingerprinted revisions", body: "Each approved revision carries a hash, so the quote, the manufacturing orders and the setting-out all point to the same version." },
          { label: "Traced piece by piece", body: "Every cast piece is a record, followed from the mould through curing, the yard and the truck to installation." },
          { label: "Inside ANU Brain", body: "Sales, purchasing, manufacturing, quality, fleet and field service are the ERP's standard apps, so the project's stock and money are not in a side system." },
          { label: "Arabic first", body: "Formal Arabic on every screen, Iraqi month names with Western digits, and quotations in dollars and dinars." },
        ],
        stack: ["ANU Brain (Odoo 20)", "Python calculation engine", "JavaScript designer", "three.js", "Manufacturing, quality and field service apps"],
      },
      features: [
        { label: "A designer for sales engineers", body: "Sketch, or type the dimensions. No CAD skills needed." },
        { label: "Quantities as you draw", body: "Pieces, concrete, crane check and truckloads with every change." },
        { label: "Shared-mould planning", body: "Mould bookings feed the schedule, with curing time and site readiness." },
        { label: "Cube tests and holds", body: "7- and 28-day results release or hold a whole batch." },
        { label: "Truck-by-truck dispatch", body: "One delivery per truck, in the order the crew installs." },
        { label: "The crew's phone", body: "Day list, receipt with name and signature, installation confirmed piece by piece." },
        { label: "Quotes with payment steps", body: "Scope exclusions printed, staged payments with retention, in USD and IQD." },
      ],
      facts: [
        { value: "7 / 28", label: "day cube tests on every concrete batch" },
        { value: "1", label: "locked revision behind the quote, the moulds and the site" },
        { value: "USD + IQD", label: "on every quotation" },
      ],
      faq: [
        {
          q: "Does Qalib do the structural design?",
          a: "No. It gives pieces, quantities and rule checks. Your engineer signs the plant's rule set, and every design is checked against it before it can be released.",
        },
        {
          q: "What can it design?",
          a: "Precast houses, portal-frame halls and warehouses, and boundary fences with gates. ANU adds your own product families to the catalogue during implementation.",
        },
        {
          q: "We have only one mould. Does it help?",
          a: "That is the case Qalib was built for. Projects take turns on the mould through ordinary manufacturing orders, and curing, test results and site readiness decide when pieces move.",
        },
        {
          q: "What do installation crews need?",
          a: "A phone with a browser. Each crew sees its day list, records the receipt with a name and signature, and confirms the pieces it installs.",
        },
        {
          q: "Will it run on our office computers?",
          a: "It runs in a current web browser on a computer, tablet or phone. Very old computers that can no longer update their browser cannot run it, so ANU checks your devices before go-live.",
        },
        {
          q: "Is it running today?",
          a: "Qalib runs as a complete demo on ANU Brain, telling one order from the first sketch to the signed installation. ANU sets it up on your catalogue, moulds, cranes and rules.",
        },
      ],
      metaTitle: "ANU Qalib: precast concrete from design to handover",
      metaDescription:
        "Draw precast houses, halls and fences; get pieces, crane check, truckloads and price; then run moulds, curing, cube tests, dispatch and installation in one ERP.",
      keywords: ["precast concrete software Iraq", "precast ERP", "mould scheduling", "concrete cube test tracking", "prefab manufacturing system"],
    },
    ar: {
      name: "أنو قالب",
      short: "قالب",
      pitch: "الخرسانة مسبقة الصب والأبنية الجاهزة، من أول رسم إلى محضر التركيب الموقّع.",
      summary:
        "يأخذ نظام أنو قالب مشروع الخرسانة مسبقة الصب من أول رسم إلى التسليم في سجل واحد. يرسم مهندس المبيعات منزلاً أو مبنى جملونياً أو سياجاً، فيعيد المحرك على الخادم القطع والكميات وفحص الرافعة والشحنات ونقاط التخطيط والسعر، ثم تقود النسخة المعتمدة القوالب والمعالجة وفحص المكعبات والشحن وتركيب الفريق. ويعمل داخل أنو برين بالعربية أولاً، والأسعار بالدولار والدينار.",
      audience: ["معامل الخرسانة مسبقة الصب", "مصانع الألواح العازلة والأبنية الجاهزة", "منفّذو المباني الجملونية والأسيجة", "فرق المعمل والمبيعات والموقع"],
      problem: {
        title: "قالب واحد ومشاريع كثيرة، ولا أحد يمسك العمل كله",
        body: "يحدد العقد الأبعاد، ثم يعدّ أحدهم القطع يدوياً. تتناوب المشاريع على قالب مشترك والخرسانة تُعالَج على مهلها، والموقع بلا ساحة لما يصل مبكراً، والفريق يعرف عمل يومه بالهاتف. أما كلفة كل مشروع فلا تُعرف إلا بعد انتهائه.",
        symptoms: [
          "قوائم قطع تُعدّ يدوياً من العقد",
          "قالب محجوز مرتين أو واقف بلا عمل",
          "قطع تُشحن قبل أن تبلغ الخرسانة مقاومتها",
          "فرق تركيب في الموقع بلا قائمة يومية",
        ],
      },
      how: {
        title: "نسخة واحدة، من الرسم إلى الموقع",
        steps: [
          {
            title: "صمّم من الفرصة البيعية",
            body: "من الفرصة البيعية افتح المصمِّم وارسم الأرض والمبنى والسياج. وتعود القطع والكميات وفحص الرافعة والشحنات ونقاط التخطيط والسعر من محرك الخادم أثناء الرسم.",
          },
          {
            title: "افحص واعتمد وسعّر",
            body: "يُفحص التصميم وفق القواعد الهندسية للمعمل. وتُقفل النسخة المعتمدة وتُختم ببصمة رقمية، ومنها يصدر عرض السعر مع ما يستثنيه العقد وجدول دفعات على مراحل مع المحتجزات.",
          },
          {
            title: "أطلق إلى القوالب",
            body: "إطلاق النسخة ينشئ سجلاً لكل قطعة، وأوامر التصنيع تحجز القوالب، ولا يبدأ عمل على قالب قبل الإطلاق، فيُخطَّط للقالب المشترك بدل أن يُتنازع عليه.",
          },
          {
            title: "اصبب وعالج وافحص",
            body: "لكل وجبة خرسانة فحص مكعبات بعمر 7 و28 يوماً. المقاومة المقاسة تسمح بفك القالب ورفع القطع، والوجبة الراسبة توقف قطعها أينما كانت حتى يُتخذ قرار عدم المطابقة.",
          },
          {
            title: "اشحن وركّب",
            body: "تُقسَّم التسليمات شحنةً لكل شاحنة بترتيب التركيب، ولا تخرج قبل أن تجهز المقاومة والموقع. وعلى هاتف الفريق قائمة اليوم وتوقيع الاستلام وتأكيد كل قطعة مركّبة بعد تحقق الخادم.",
          },
        ],
      },
      inside: {
        title: "كيف تبنيه أنو",
        body: "المتصفح يرسم والخادم يحسب. محرك واحد هو المرجع الوحيد لكل كمية، وتطبيقات النظام القياسية تحمل السجل من العقد إلى المحتجزات.",
        items: [
          { label: "مرجع حسابي واحد", body: "محرك مكتوب بلغة Python يحسب المشروع على الخادم، والمصمِّم يعرض نتائجه ولا يجري حساباً ثانياً خاصاً به." },
          { label: "المعمل يُوصف بالبيانات", body: "الكتالوج والقوالب والرافعات بجداول أحمالها والقواعد الهندسية سجلات يديرها المعمل، لا أرقام ثابتة في الشيفرة." },
          { label: "نسخ مقفلة ومختومة", body: "لكل نسخة معتمدة بصمة رقمية، فيشير عرض السعر وأوامر التصنيع والتخطيط كلها إلى النسخة نفسها." },
          { label: "تتبّع قطعةً بقطعة", body: "كل قطعة مصبوبة سجل يُتابَع من القالب إلى المعالجة فالساحة فالشاحنة حتى التركيب." },
          { label: "داخل أنو برين", body: "المبيعات والمشتريات والتصنيع والجودة والأسطول والخدمة الميدانية تطبيقات النظام القياسية، فلا يكون مخزون المشروع وأمواله في نظام جانبي." },
          { label: "العربية أولاً", body: "عربية فصحى على كل شاشة، وأسماء الأشهر العراقية بأرقام غربية، وعروض أسعار بالدولار والدينار." },
        ],
        stack: ["أنو برين (Odoo 20)", "محرك حساب Python", "مصمِّم JavaScript", "three.js", "تطبيقات التصنيع والجودة والخدمة الميدانية"],
      },
      features: [
        { label: "مصمِّم لمهندس المبيعات", body: "ارسم أو اكتب الأبعاد، بلا حاجة إلى مهارات CAD." },
        { label: "الكميات أثناء الرسم", body: "القطع والخرسانة وفحص الرافعة والشحنات مع كل تعديل." },
        { label: "تخطيط القالب المشترك", body: "حجوزات القوالب تغذّي الجدول، مع زمن المعالجة وجاهزية الموقع." },
        { label: "فحص المكعبات والإيقاف", body: "نتائج 7 و28 يوماً تُطلق الوجبة كاملة أو توقفها." },
        { label: "الشحن شاحنةً بشاحنة", body: "تسليم لكل شاحنة، بالترتيب الذي يركّب به الفريق." },
        { label: "هاتف الفريق", body: "قائمة اليوم، والاستلام باسم وتوقيع، وتأكيد التركيب قطعةً قطعة." },
        { label: "عروض أسعار بمراحل دفع", body: "المستثنيات مطبوعة، والدفع على مراحل مع المحتجزات، بالدولار والدينار." },
      ],
      facts: [
        { value: "7 / 28", label: "يوماً: فحص المكعبات لكل وجبة خرسانة" },
        { value: "1", label: "نسخة مقفلة وراء عرض السعر والقوالب والموقع" },
        { value: "USD + IQD", label: "في كل عرض سعر" },
      ],
      faq: [
        {
          q: "هل يقوم قالب بالتصميم الإنشائي؟",
          a: "لا. يعطي القطع والكميات وفحوص القواعد. ويعتمد مهندسك مجموعة القواعد الهندسية للمعمل، ويُفحص كل تصميم وفقها قبل أن يُطلق.",
        },
        {
          q: "ماذا يصمّم؟",
          a: "المنازل مسبقة الصب، والمباني الجملونية والمخازن، والأسيجة الخارجية مع البوابات. وتضيف أنو عائلات منتجاتك الخاصة إلى الكتالوج أثناء التطبيق.",
        },
        {
          q: "لدينا قالب واحد فقط، هل يفيدنا؟",
          a: "هذه هي الحالة التي بُني قالب من أجلها. تتناوب المشاريع على القالب عبر أوامر تصنيع اعتيادية، وتحدد المعالجة ونتائج الفحص وجاهزية الموقع متى تتحرك القطع.",
        },
        {
          q: "ماذا تحتاج فرق التركيب؟",
          a: "هاتفاً فيه متصفح. يرى كل فريق قائمة يومه، ويسجّل الاستلام باسم وتوقيع، ويؤكد القطع التي ركّبها.",
        },
        {
          q: "هل يعمل على حواسيب مكتبنا؟",
          a: "يعمل في أي متصفح حديث على الحاسوب أو اللوحي أو الهاتف. أما الحواسيب القديمة جداً التي لم تعد تحدّث متصفحها فلا تشغّله، لذلك تفحص أنو أجهزتك قبل الانطلاق.",
        },
        {
          q: "هل يعمل اليوم؟",
          a: "يعمل قالب نسخةً تجريبية كاملة على أنو برين، تروي طلبية واحدة من أول رسم إلى محضر التركيب الموقّع. وتضبطه أنو على كتالوجك وقوالبك ورافعاتك وقواعدك.",
        },
      ],
      metaTitle: "أنو قالب: الخرسانة مسبقة الصب من التصميم إلى التسليم",
      metaDescription:
        "ارسم المنازل والمباني الجملونية والأسيجة مسبقة الصب واحصل على القطع والشحنات والسعر، ثم خطّط القوالب والمعالجة وفحص المكعبات والشحن والتركيب في نظام واحد.",
      keywords: ["برنامج خرسانة مسبقة الصب العراق", "نظام معامل البريكاست", "جدولة القوالب", "فحص مكعبات الخرسانة", "نظام ERP للأبنية الجاهزة"],
    },
  },
}
