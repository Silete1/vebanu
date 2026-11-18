import type { SystemStory } from "./types"

export const retailFinance: SystemStory = {
  slug: "retail-finance",
  group: "industry",
  status: "live",
  order: 19,
  related: ["brain-lite", "workshops", "brain"],
  visual: { poster: "/media/systems/retail-finance" },
  copy: {
    en: {
      name: "ANU Retail and Finance",
      short: "Retail and finance",
      pitch: "Dollar rates, exchange houses, cash boxes and drivers: the Iraqi side of retail.",
      summary:
        "ANU Retail and Finance adds what a standard ERP misses in Iraqi trade: dollar rates typed per 100 as exchange houses quote them, exchange-house balances, cash boxes that cannot go negative, drivers who collect cash, and bedroom and sofa sets sold as rooms. Each piece is a separate module inside ANU Brain, so a business takes only what it needs. It runs in production at a multi-branch furniture retailer.",
      audience: ["Multi-branch retailers", "Furniture and home stores", "Distributors and wholesalers", "Finance and cash teams"],
      problem: {
        title: "The books are in dinars, the business is in dollars",
        body: "Suppliers and many prices are in dollars, the books are in dinars, and the rate moves every day, quoted per 100. Cash sits in the shop's boxes, with the drivers and at the exchange house. A standard system sees little of this, so the real position lives in notebooks and phone messages.",
        symptoms: [
          "Rates entered per dollar when everyone quotes per 100",
          "Exchange-house balances kept on paper",
          "Cash boxes that show money that isn't there",
          "Drivers' collections reconciled days later",
          "Room sets the stock can't split into pieces",
        ],
      },
      how: {
        title: "From today's rate to the driver's cash",
        steps: [
          {
            title: "Record today's rate",
            body: "Rates are typed per 100 dollars, the way exchange houses quote them. Today's rate sits in the top bar and turns amber when it is out of date, and a payment can carry its own settlement rate.",
          },
          {
            title: "Pay through the exchange house",
            body: "Fund an exchange house, convert, settle a dollar supplier bill and withdraw, each as its own operation. Balances per currency are read from posted entries, and a reservation stops the same balance being used twice.",
          },
          {
            title: "Guard every cash box",
            body: "A cash box can refuse to go negative, and an authorised finance user may override it with a recorded reason. Transfers between bank and cash take one step, and a payout can be made straight from an invoice.",
          },
          {
            title: "Sell rooms, deliver pieces",
            body: "A bedroom or sofa set is a kit of named pieces. Sell it whole or with pieces changed at the point of sale: the customer sees the room and its price, while stock, delivery and cost follow the pieces actually sold.",
          },
          {
            title: "Close the loop with drivers",
            body: "Drivers and installers see their jobs and the salesperson's notes on their phones, record the cash they collect and their expenses with photos, and finance approves each one.",
          },
        ],
      },
      inside: {
        title: "How ANU builds it",
        body: "Separate modules on standard accounting, sales, stock and point of sale. Nothing keeps a parallel ledger: every rate, settlement and payout ends as the ERP's own entries, reconciled by the ERP itself.",
        items: [
          {
            label: "Native entries only",
            body: "Supplier bills keep their original currency; the settlement cost and the exchange difference are booked by the ERP's own reconciliation.",
          },
          {
            label: "Point-of-sale guards",
            body: "Cashiers see only their own points of sale, a payment cannot exceed what is due, and ship-later orders post their cost of goods on delivery.",
          },
          {
            label: "Payouts from the invoice",
            body: "Delivery, carpentry or transport costs tied to the invoice, a partial refund as a one-line credit note, and dollar expenses at the day's rate.",
          },
          {
            label: "Month-safe numbering",
            body: "An entry moved to another month gives up its old number, so it never blocks the new month's sequence.",
          },
          {
            label: "Built once, reused",
            body: "Made for a furniture retailer, then rebuilt as client-neutral modules for any retailer or distributor, under the client's own brand on the ANU theme.",
          },
        ],
        stack: ["ANU Brain (Odoo 19 and 20)", "Python", "OWL", "ANU Theme"],
      },
      features: [
        { label: "Today's rate in the top bar", body: "Amber when no rate was recorded today, with a quick way to record it." },
        { label: "Exchange-house statements", body: "Balances per currency, matched to the exchange house's statement." },
        { label: "Cash-box control", body: "No negative balance without an authorised override and a reason." },
        { label: "One-step transfers", body: "Bank to cash and cash to bank, from the accounting dashboard." },
        { label: "Rooms as kits", body: "Pricing, stock split, shortage notices and delivery slips that show the room." },
        { label: "Driver and installer portal", body: "Jobs, notes, cash collection, expenses and hand-over, on a phone." },
        { label: "Threshold commissions", body: "A fixed commission once sales pass a threshold, in sales and at the point of sale." },
        { label: "Invoices to the customer's phone", body: "Point-of-sale invoices sent as a PDF instead of a photo of the receipt." },
      ],
      facts: [
        { value: "100 USD", label: "the unit every rate is typed in, as at the exchange house" },
        { value: "0", label: "negative cash-box balances without a recorded reason" },
        { value: "1", label: "step to move money between bank and cash" },
      ],
      faq: [
        {
          q: "Do we have to change how we quote the dollar?",
          a: "No. Rates are typed per 100, as the exchange house quotes them; the quote unit is a company setting.",
        },
        {
          q: "Can we settle a dollar supplier through an exchange house?",
          a: "Yes. Funding the exchange house, converting and settling the bill are separate, approved operations; the bill keeps its dollar value and the difference is booked automatically.",
        },
        {
          q: "Do drivers need the full system?",
          a: "No. They use a simple portal on their phone that shows only their jobs, the notes for each delivery and the cash they hold.",
        },
        {
          q: "Is it only for furniture?",
          a: "No. Rooms as kits suit any business that sells sets. The exchange, cash-box, driver and point-of-sale modules are general, and other ANU systems already reuse them.",
        },
        {
          q: "Is it running anywhere?",
          a: "Yes. It runs the daily sales, cash and deliveries of a multi-branch furniture retailer.",
        },
        {
          q: "Can we take only some of the modules?",
          a: "Yes. Each piece is its own module, so a business can start with exchange rates and cash boxes and add the rest later.",
        },
      ],
      metaTitle: "ANU Retail and Finance: Iraqi FX, cash and retail",
      metaDescription:
        "Dollar rates per 100, exchange-house settlement, cash-box control, a driver and installer portal, room sets as kits and point-of-sale guards, inside one ERP.",
      keywords: [
        "retail ERP Iraq",
        "USD IQD exchange rate accounting",
        "exchange house settlement",
        "cash box control",
        "furniture retail ERP",
      ],
    },
    ar: {
      name: "أنو للتجزئة والمالية",
      short: "التجزئة والمالية",
      pitch: "سعر الدولار والصيرفة والقاصات والسائقون: الجانب العراقي من البيع بالتجزئة.",
      summary:
        "يضيف نظام أنو للتجزئة والمالية ما يفوت أنظمة ERP القياسية في التجارة العراقية: سعر الدولار يُدخل لكل 100 كما تسعّره الصيرفات، وأرصدة الصيرفة، وقاصات لا تنزل تحت الصفر، وسائقون يستلمون النقد، وغرف نوم وأطقم كنب تُباع غرفاً كاملة. كل جزء وحدة مستقلة داخل أنو برين، فتأخذ الشركة ما تحتاجه فقط. ويعمل فعلياً لدى شركة أثاث متعددة الفروع.",
      audience: ["متاجر التجزئة متعددة الفروع", "معارض الأثاث والمستلزمات المنزلية", "الموزعون وتجار الجملة", "فرق المالية والقاصة"],
      problem: {
        title: "الحسابات بالدينار، والعمل بالدولار",
        body: "الموردون وكثير من الأسعار بالدولار، والحسابات بالدينار، والسعر يتغير كل يوم ويُسعَّر لكل 100. والنقد موزع بين قاصات المتجر والسائقين والصيرفة. والنظام القياسي لا يرى معظم ذلك، فيبقى الوضع الحقيقي في الدفاتر ورسائل الهاتف.",
        symptoms: [
          "أسعار صرف تُدخل للدولار الواحد والكل يسعّر لكل 100",
          "أرصدة الصيرفة على الورق",
          "قاصات تُظهر نقداً غير موجود",
          "مقبوضات السائقين تُطابق بعد أيام",
          "أطقم غرف لا يستطيع المخزون تفكيكها إلى قطع",
        ],
      },
      how: {
        title: "من سعر اليوم إلى نقد السائق",
        steps: [
          {
            title: "سجّل سعر اليوم",
            body: "يُدخل السعر لكل 100 دولار كما تسعّره الصيرفات. ويظهر سعر اليوم في الشريط العلوي ويتحول إلى اللون الكهرماني إذا لم يُحدَّث، ويمكن أن تحمل الدفعة سعر تسوية خاصاً بها.",
          },
          {
            title: "ادفع عبر الصيرفة",
            body: "تمويل الصيرفة والتحويل بين العملات وتسوية فاتورة مورد بالدولار والسحب، كلٌّ عملية مستقلة. وتُقرأ الأرصدة لكل عملة من القيود المرحّلة، ويمنع الحجز استخدام الرصيد نفسه مرتين.",
          },
          {
            title: "اضبط كل قاصة",
            body: "يمكن للقاصة أن ترفض الرصيد السالب، ويستطيع المستخدم المالي المخوّل تجاوز ذلك مع تسجيل السبب. والتحويل بين المصرف والقاصة بخطوة واحدة، والصرف ممكن مباشرة من الفاتورة.",
          },
          {
            title: "بِع الغرفة وسلّم القطع",
            body: "غرفة النوم أو طقم الكنب مجموعة من قطع مسمّاة، تُباع كاملة أو مع تبديل قطع في نقطة البيع. فيرى الزبون الغرفة وسعرها، بينما يتبع المخزون والتسليم والكلفة القطعَ المباعة فعلاً.",
          },
          {
            title: "أغلق الحلقة مع السائقين",
            body: "يرى السائقون وفنيو التركيب مهامهم وملاحظات البائع على هواتفهم، ويسجلون النقد المستلم ومصاريفهم مع الصور، وتعتمد المالية كلاً منها.",
          },
        ],
      },
      inside: {
        title: "كيف تبنيه أنو",
        body: "وحدات مستقلة فوق المحاسبة والمبيعات والمخزون ونقطة البيع القياسية. لا دفتر موازياً: كل سعر وتسوية وصرف ينتهي قيوداً في النظام نفسه، ويطابقها النظام بنفسه.",
        items: [
          {
            label: "قيود أصلية فقط",
            body: "تحتفظ فواتير الموردين بعملتها الأصلية، وتُقيَّد كلفة التسوية وفرق الصرف عبر المطابقة الأصلية في النظام.",
          },
          {
            label: "ضوابط نقطة البيع",
            body: "لا يرى أمين الصندوق إلا نقاط البيع الخاصة به، ولا تتجاوز الدفعة المبلغ المستحق، وتُرحَّل كلفة البضاعة للطلبات مؤجلة التسليم عند تسليمها.",
          },
          {
            label: "الصرف من الفاتورة",
            body: "كلف التوصيل والنجارة والنقل المرتبطة بالفاتورة، والاسترداد الجزئي بإشعار دائن من سطر واحد، والمصاريف بالدولار بسعر اليوم.",
          },
          {
            label: "ترقيم آمن بين الأشهر",
            body: "القيد المنقول إلى شهر آخر يتخلى عن رقمه القديم، فلا يعطّل تسلسل الشهر الجديد.",
          },
          {
            label: "بُني مرة ويُعاد استخدامه",
            body: "صُنع لشركة أثاث، ثم أُعيد بناؤه وحدات محايدة تصلح لأي متجر أو موزع، تحت هوية الزبون فوق ثيم أنو.",
          },
        ],
        stack: ["أنو برين (Odoo 19 و20)", "Python", "OWL", "ثيم أنو"],
      },
      features: [
        { label: "سعر اليوم في الشريط العلوي", body: "يتحول إلى الكهرماني إذا لم يُسجَّل سعر اليوم، مع طريقة سريعة لتسجيله." },
        { label: "كشوف الصيرفة", body: "الأرصدة لكل عملة، مطابَقة مع كشف الصيرفة." },
        { label: "ضبط القاصة", body: "لا رصيد سالباً دون تجاوز مخوّل وسبب مسجّل." },
        { label: "تحويلات بخطوة واحدة", body: "من المصرف إلى القاصة وبالعكس، من لوحة المحاسبة." },
        { label: "الغرف أطقماً", body: "التسعير وتفكيك المخزون وإشعارات النقص ووصولات تسليم تُظهر الغرفة." },
        { label: "بوابة السائقين وفنيي التركيب", body: "المهام والملاحظات واستلام النقد والمصاريف وتسليم النقد، على الهاتف." },
        { label: "عمولات بحسب الحد", body: "عمولة ثابتة عندما تتجاوز المبيعات حداً معيناً، في المبيعات ونقطة البيع." },
        { label: "الفاتورة إلى هاتف الزبون", body: "فواتير نقطة البيع تُرسل بصيغة PDF بدل صورة الوصل." },
      ],
      facts: [
        { value: "100", label: "دولار هي وحدة إدخال كل سعر صرف، كما في الصيرفة" },
        { value: "0", label: "رصيد سالب في القاصة دون سبب مسجّل" },
        { value: "1", label: "خطوة لتحويل المال بين المصرف والقاصة" },
      ],
      faq: [
        {
          q: "هل علينا تغيير طريقة تسعير الدولار؟",
          a: "لا. يُدخل السعر لكل 100 كما تسعّره الصيرفة، ووحدة التسعير إعداد على مستوى الشركة.",
        },
        {
          q: "هل يمكن تسوية مورد بالدولار عبر الصيرفة؟",
          a: "نعم. تمويل الصيرفة والتحويل وتسوية الفاتورة عمليات مستقلة ومعتمدة، وتحتفظ الفاتورة بقيمتها بالدولار ويُقيَّد الفرق تلقائياً.",
        },
        {
          q: "هل يحتاج السائقون إلى النظام كاملاً؟",
          a: "لا. يستخدمون بوابة بسيطة على الهاتف لا تُظهر إلا مهامهم وملاحظات كل توصيلة والنقد الذي بحوزتهم.",
        },
        {
          q: "هل هو للأثاث فقط؟",
          a: "لا. بيع الغرف أطقماً يناسب كل من يبيع مجموعات، أما وحدات الصرف والقاصات والسائقين ونقطة البيع فعامة، وتعيد أنظمة أخرى من أنو استخدامها.",
        },
        {
          q: "هل يعمل فعلياً في مكان ما؟",
          a: "نعم. يدير المبيعات والنقد والتوصيل اليومي لشركة أثاث متعددة الفروع.",
        },
        {
          q: "هل يمكن أخذ بعض الوحدات فقط؟",
          a: "نعم. كل جزء وحدة مستقلة، فيمكن البدء بسعر الصرف والقاصات وإضافة الباقي لاحقاً.",
        },
      ],
      metaTitle: "أنو للتجزئة والمالية: الصرف والقاصات والبيع في العراق",
      metaDescription:
        "سعر الدولار لكل 100 وتسوية الصيرفة وضبط القاصات وبوابة السائقين وفنيي التركيب وبيع الغرف أطقماً وضوابط نقطة البيع، داخل نظام واحد.",
      keywords: [
        "نظام محاسبة بالدولار والدينار",
        "برنامج تسوية الصيرفة",
        "ضبط القاصة",
        "نظام معارض الأثاث",
        "نظام ERP للتجزئة في العراق",
      ],
    },
  },
}
