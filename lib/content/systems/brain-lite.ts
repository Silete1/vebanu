import type { SystemStory } from "./types"

export const brainLite: SystemStory = {
  slug: "brain-lite",
  group: "industry",
  status: "building",
  order: 15,
  related: ["brain", "retail-finance", "qr-menu"],
  visual: { poster: "/media/systems/brain-lite" },
  copy: {
    en: {
      name: "ANU Brain Lite",
      short: "Brain Lite",
      pitch: "A whole shop system on one phone: camera scanning, WhatsApp receipts, selling offline.",
      summary:
        "ANU Brain Lite is a point of sale for the smallest Iraqi shops, from groceries and mini-markets to clothing and general retail run by one or two people, and it needs nothing but a phone. The camera is the barcode scanner, receipts and debt statements go by WhatsApp, and selling continues with no internet, syncing when the connection returns. It is being built now on ANU Brain, Arabic first, with Kurdish and English.",
      audience: ["Supermarkets and mini-markets", "Groceries", "Clothing shops", "Accessories, cosmetics and household shops", "Shops run by one or two people"],
      problem: {
        title: "A notebook, a calculator and an internet line that drops",
        body: "The smallest shops have no computer and no scanner, the power and the internet come and go, customer debts live in a notebook, and prices move between dinars and dollars. Software built for bigger stores asks for all of that, and stops the sale when the line drops.",
        symptoms: [
          "Customer debts written in a notebook",
          "No idea of today's profit",
          "Stock counted by eye",
          "Sales stopped when the internet cuts",
        ],
      },
      how: {
        title: "Scan, sell, sync",
        steps: [
          {
            title: "Set up the shop",
            body: "The shop is created from a template for its sector, with a starter product list. A short setup takes the logo, the rounding and a cashier with a PIN; a second phone joins by scanning a code on the owner's phone.",
          },
          {
            title: "Scan and sell",
            body: "Point the camera and items drop into the cart with a beep. A cash sale finishes in two taps after the last scan; a sale can be parked, discounted within the owner's limit, or sold on credit to a named customer.",
          },
          {
            title: "Keep selling offline",
            body: "Every sale is saved on the phone in an encrypted database and queued. When the connection returns the queue is sent; sending twice never duplicates, and two phones selling the same item both count.",
          },
          {
            title: "Buy and count by scanning",
            body: "Purchase orders go to suppliers as Arabic PDFs on WhatsApp. Goods are received and counted by scanning, average cost is updated, and expiry and dead-stock alerts come up on their own.",
          },
          {
            title: "Close the day",
            body: "Customer debts with credit limits and WhatsApp statements, shop expenses including the generator subscription, a separate dollar drawer, and a shift close that compares expected and counted cash.",
          },
        ],
      },
      inside: {
        title: "How ANU builds it",
        body: "One app, and one ANU Brain database per shop behind it. The phone is where the shop works; the server keeps the books correct and never stands between the cashier and the customer.",
        items: [
          { label: "A sale is never refused or lost", body: "The server never refuses a sale for a business reason. Each record gets its own ID on the device, so a batch sent twice lands once." },
          { label: "Real books behind the counter", body: "Synced sales arrive as proper point-of-sale orders with their stock moves and journal entries, through the ERP's own path, never hand-written entries." },
          { label: "One database per shop", body: "Each shop is isolated at its own address, and a device token from one shop cannot read or write another." },
          { label: "An Iraqi product catalogue", body: "An unknown barcode is looked up in a shared catalogue in Arabic, Kurdish and English to pre-fill the product; the shop's own prices are never overwritten." },
          { label: "Made for low-cost phones", body: "It targets Android phones with 2 GB of memory, Huawei phones without Google services, and iPhone; the same app runs on a tablet, in a browser or on a Windows PC." },
          { label: "Owner and cashier", body: "A cashier signs in with a PIN and cannot see cost or profit, edit a finished sale or exceed the discount limit; the owner reads a log of voids, discounts and drawer openings." },
        ],
        stack: ["ANU Brain (Odoo 20)", "React Native (Expo)", "Encrypted SQLite on the device", "Versioned sync API", "Product catalogue service (FastAPI)"],
      },
      features: [
        { label: "The camera as scanner", body: "Retail barcodes, QR codes and weighed-item labels, with a torch and a half-screen view that keeps the cart visible." },
        { label: "WhatsApp receipts", body: "Arabic receipts and statements as an image or PDF; a Bluetooth printer is optional." },
        { label: "Dinars and dollars", body: "Dinar rounding, a dollar price list at the owner's daily rate, a separate dollar drawer." },
        { label: "Customer debts", body: "Credit limits, aged balances and a statement in one tap." },
        { label: "Reports offline", body: "Sales, profit, stock, debts and cash, shared as PDF, Excel or a WhatsApp image." },
        { label: "Sector profiles", body: "Weighed items and cartons for supermarkets, sizes and colours for clothing, serials and warranties for general retail." },
        { label: "Plain words", body: "\"Money customers owe you\", not accounting jargon; Arabic-Indic or Western digits." },
        { label: "Daily summary", body: "One card each evening: sales, profit, cash, new debts and low stock." },
      ],
      faq: [
        {
          q: "Do I need a computer, a scanner or a printer?",
          a: "No. The phone's camera scans, receipts go by WhatsApp, and a Bluetooth receipt printer is optional. If the shop has a computer or a tablet, the same app runs there too.",
        },
        {
          q: "What happens when the internet cuts?",
          a: "Selling doesn't stop. The app is designed to sell, take returns, sell on credit and count stock for at least a week offline, then sync without duplicates. It shows when it last synced and warns after three days.",
        },
        {
          q: "Will it work on my phone?",
          a: "It is being built for Android phones, including low-cost ones and Huawei phones without Google services, and for iPhone.",
        },
        {
          q: "Is it in Arabic, with dinars?",
          a: "Arabic first, right to left, with Kurdish Sorani and English. Prices are in dinars with rounding, with an optional dollar price list and the owner's choice of Arabic-Indic or Western digits.",
        },
        {
          q: "Can my cashier hide sales or give discounts?",
          a: "A cashier works under a PIN and cannot edit a finished sale, see cost or profit, or go over the discount limit you set. Every void, discount, price change and drawer opening is in your activity log.",
        },
        {
          q: "Can I use it today?",
          a: "Not yet. Brain Lite is in development: the first working slice, from a scan to a correct entry in the books, is being built now. Contact ANU to see the design and to hear when it opens to shops.",
        },
      ],
      metaTitle: "ANU Brain Lite: a phone point of sale for small shops",
      metaDescription:
        "A point of sale on one phone for small Iraqi shops: camera scanning, WhatsApp receipts and debt statements, dinars and dollars, and selling that works offline.",
      keywords: ["POS app Iraq", "offline point of sale", "mobile POS for small shops", "phone camera barcode scanner", "customer debt tracking app"],
    },
    ar: {
      name: "أنو برين لايت",
      short: "برين لايت",
      pitch: "نظام المحل كله على هاتف واحد: مسح بالكاميرا، ووصل على WhatsApp، وبيع بلا إنترنت.",
      summary:
        "أنو برين لايت نظام نقاط بيع لأصغر المحلات العراقية، من البقالات والأسواق الصغيرة إلى محلات الملابس والمفرد العام التي يديرها شخص أو اثنان، ولا يحتاج إلا إلى هاتف. الكاميرا هي ماسح الباركود، والوصولات وكشوف الديون تُرسل على WhatsApp، والبيع يستمر بلا إنترنت ثم يُزامَن حين يعود الاتصال. ويُبنى الآن على أنو برين، بالعربية أولاً مع الكوردية والإنجليزية.",
      audience: ["الأسواق المركزية والصغيرة", "البقالات", "محلات الملابس", "محلات الإكسسوارات والتجميل والمنزليات", "محلات يديرها شخص أو اثنان"],
      problem: {
        title: "دفتر وحاسبة وإنترنت ينقطع",
        body: "أصغر المحلات بلا حاسوب ولا ماسح، والكهرباء والإنترنت يأتيان ويذهبان، وديون الزبائن في دفتر، والأسعار تتنقل بين الدينار والدولار. والبرامج المصممة للمتاجر الكبيرة تطلب ذلك كله، وتوقف البيع حين ينقطع الخط.",
        symptoms: [
          "ديون الزبائن مكتوبة في دفتر",
          "لا أحد يعرف ربح اليوم",
          "المخزون يُعدّ بالنظر",
          "البيع يتوقف حين ينقطع الإنترنت",
        ],
      },
      how: {
        title: "امسح، بِع، زامِن",
        steps: [
          {
            title: "جهّز المحل",
            body: "يُنشأ المحل من قالب قطاعه مع قائمة منتجات أولية. وإعداد قصير يأخذ الشعار والتقريب وكاشيراً برمز PIN، وينضم هاتف ثانٍ بمسح رمز على هاتف المالك.",
          },
          {
            title: "امسح وبِع",
            body: "وجّه الكاميرا فتنزل المواد في السلة مع صفارة. البيع النقدي ينتهي بلمستين بعد آخر مسح، ويمكن تعليق البيع، أو الخصم ضمن حد المالك، أو البيع بالدين لزبون مسمّى.",
          },
          {
            title: "واصل البيع بلا إنترنت",
            body: "كل بيعة تُحفظ على الهاتف في قاعدة بيانات مشفّرة وتنتظر دورها. وحين يعود الاتصال تُرسل، وإعادة الإرسال لا تكرر شيئاً، وإذا باع هاتفان المادة نفسها تُحسب البيعتان.",
          },
          {
            title: "اشترِ واجرد بالمسح",
            body: "أوامر الشراء تصل إلى المجهّز ملف PDF عربياً على WhatsApp. والبضاعة تُستلم وتُجرد بالمسح، ويُحدَّث متوسط الكلفة، وتظهر تنبيهات انتهاء الصلاحية والمواد الراكدة وحدها.",
          },
          {
            title: "أغلق اليوم",
            body: "ديون الزبائن بسقف ائتمان وكشوف على WhatsApp، ومصاريف المحل ومنها اشتراك المولدة، ودرج منفصل للدولار، وإغلاق الوردية بمقارنة النقد المتوقع بالمعدود.",
          },
        ],
      },
      inside: {
        title: "كيف تبنيه أنو",
        body: "تطبيق واحد، ووراءه قاعدة بيانات أنو برين خاصة بكل محل. الهاتف هو مكان عمل المحل، والخادم يُبقي الدفاتر صحيحة ولا يقف أبداً بين الكاشير والزبون.",
        items: [
          { label: "البيعة لا تُرفض ولا تضيع", body: "الخادم لا يرفض بيعة لسبب تجاري أبداً. ولكل سجل معرّفه الخاص على الجهاز، فالدفعة المرسلة مرتين تُسجَّل مرة واحدة." },
          { label: "دفاتر حقيقية خلف الكاونتر", body: "المبيعات المزامنة تصل طلبات نقاط بيع سليمة مع حركات مخزونها وقيودها المحاسبية، عبر مسار النظام نفسه، لا قيوداً مكتوبة يدوياً." },
          { label: "قاعدة بيانات لكل محل", body: "كل محل معزول على عنوانه الخاص، ورمز جهاز من محل لا يقرأ محلاً آخر ولا يكتب فيه." },
          { label: "كتالوج منتجات عراقي", body: "الباركود غير المعروف يُبحث عنه في كتالوج مشترك بالعربية والكوردية والإنجليزية ليملأ بيانات المنتج، ولا تُستبدل أسعار المحل الخاصة أبداً." },
          { label: "مصمم للهواتف الرخيصة", body: "يستهدف هواتف Android بذاكرة 2 GB، وهواتف Huawei بلا خدمات Google، وiPhone، ويعمل التطبيق نفسه على اللوحي والمتصفح وحاسوب Windows." },
          { label: "المالك والكاشير", body: "يدخل الكاشير برمز PIN ولا يرى الكلفة أو الربح، ولا يعدّل بيعة منتهية، ولا يتجاوز حد الخصم، ويقرأ المالك سجلاً بالإلغاءات والخصومات وفتحات الدرج." },
        ],
        stack: ["أنو برين (Odoo 20)", "React Native (Expo)", "SQLite مشفّرة على الجهاز", "واجهة مزامنة بإصدارات", "خدمة كتالوج المنتجات (FastAPI)"],
      },
      features: [
        { label: "الكاميرا ماسحاً", body: "باركود المتاجر ورموز QR وملصقات المواد الموزونة، مع ضوء وعرض بنصف الشاشة يُبقي السلة ظاهرة." },
        { label: "الوصل على WhatsApp", body: "وصولات وكشوف عربية صورةً أو PDF، والطابعة عبر Bluetooth اختيارية." },
        { label: "الدينار والدولار", body: "تقريب بالدينار، وقائمة أسعار بالدولار بسعر يحدده المالك يومياً، ودرج منفصل للدولار." },
        { label: "ديون الزبائن", body: "سقوف ائتمان وأعمار الديون وكشف حساب بلمسة واحدة." },
        { label: "تقارير بلا إنترنت", body: "المبيعات والربح والمخزون والديون والنقد، تُشارك PDF أو Excel أو صورة على WhatsApp." },
        { label: "ملفات حسب القطاع", body: "المواد الموزونة والكارتون للأسواق، والمقاسات والألوان للملابس، والأرقام التسلسلية والضمان للمفرد العام." },
        { label: "كلمات بسيطة", body: "«فلوس إلك عند الزبائن» بدل مصطلحات المحاسبة، وأرقام عربية مشرقية أو غربية." },
        { label: "ملخص اليوم", body: "بطاقة واحدة كل مساء: المبيعات والربح والنقد والديون الجديدة والمواد الناقصة." },
      ],
      faq: [
        {
          q: "هل أحتاج إلى حاسوب أو ماسح أو طابعة؟",
          a: "لا. كاميرا الهاتف تمسح، والوصل يُرسل على WhatsApp، وطابعة الوصولات عبر Bluetooth اختيارية. وإن كان في المحل حاسوب أو لوحي فالتطبيق نفسه يعمل عليه.",
        },
        {
          q: "ماذا يحدث حين ينقطع الإنترنت؟",
          a: "البيع لا يتوقف. التطبيق مصمم ليبيع ويستقبل المرتجعات ويبيع بالدين ويجرد المخزون أسبوعاً على الأقل بلا اتصال، ثم يزامن دون تكرار. ويعرض متى زامن آخر مرة، وينبّه بعد ثلاثة أيام.",
        },
        {
          q: "هل يعمل على هاتفي؟",
          a: "يُبنى لهواتف Android، ومنها الهواتف الرخيصة وهواتف Huawei بلا خدمات Google، ولهواتف iPhone.",
        },
        {
          q: "هل هو بالعربية وبالدينار؟",
          a: "بالعربية أولاً ومن اليمين إلى اليسار، مع الكوردية السورانية والإنجليزية. والأسعار بالدينار مع التقريب، مع قائمة أسعار اختيارية بالدولار، ويختار المالك الأرقام العربية المشرقية أو الغربية.",
        },
        {
          q: "هل يستطيع الكاشير إخفاء مبيعات أو منح خصومات؟",
          a: "يعمل الكاشير برمز PIN، ولا يستطيع تعديل بيعة منتهية أو رؤية الكلفة والربح أو تجاوز حد الخصم الذي تضعه. وكل إلغاء وخصم وتغيير سعر وفتح للدرج يظهر في سجل نشاطك.",
        },
        {
          q: "هل أستطيع استخدامه اليوم؟",
          a: "ليس بعد. برين لايت قيد التطوير، وأول شريحة عاملة منه، من المسح إلى قيد صحيح في الدفاتر، تُبنى الآن. تواصل مع أنو لترى التصميم وتعرف متى يُفتح للمحلات.",
        },
      ],
      metaTitle: "أنو برين لايت: نقطة بيع على الهاتف للمحلات الصغيرة",
      metaDescription:
        "نقطة بيع على هاتف واحد للمحلات العراقية الصغيرة: مسح الباركود بالكاميرا، ووصولات وكشوف ديون على WhatsApp، والدينار والدولار، وبيع يستمر بلا إنترنت.",
      keywords: ["برنامج كاشير العراق", "نقطة بيع بدون إنترنت", "برنامج محاسبة للمحلات الصغيرة", "مسح الباركود بكاميرا الهاتف", "تطبيق ديون الزبائن"],
    },
  },
}
