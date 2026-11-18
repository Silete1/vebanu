import type { SystemStory } from "./types"

export const workshops: SystemStory = {
  slug: "workshops",
  group: "industry",
  status: "live",
  order: 10,
  related: ["brain", "walkthroughs", "qalib"],
  visual: { poster: "/media/systems/workshops", scene: "furniture" },
  copy: {
    en: {
      name: "ANU Workshops",
      short: "Workshops",
      pitch: "Furniture and interiors, from the drawing to the cut parts and the shop floor.",
      summary:
        "ANU Workshops turns a furniture design into what the workshop needs. Draw a kitchen, a wardrobe or a whole room in the browser, in Arabic or English; the same model gives the cut list, edge banding, drilling, CNC programs, the fittings to buy and the price. It runs inside ANU Brain, so the quotation, the order and the stock are one system.",
      audience: ["Kitchen and wardrobe workshops", "Furniture makers", "Joinery and fit-out companies", "Interior designers who manufacture"],
      problem: {
        title: "The design and the workshop speak two languages",
        body: "A designer draws a beautiful room in one program. Someone retypes it into a cut list in Excel, another guesses the hinges, a third prices it from memory. Errors surface on the saw or on site, when they cost the most.",
        symptoms: [
          "Cut lists retyped by hand from the drawing",
          "Hardware forgotten until installation day",
          "Quotes that don't match what was built",
          "Offcuts and boards nobody can account for",
        ],
      },
      how: {
        title: "One model, from the room to the machine",
        steps: [
          {
            title: "Draw the room",
            body: "Walls, openings and ceilings in 2D and 3D, then cabinets and furniture from a template library or from scratch, with finishes and photo-real pictures for the customer.",
          },
          {
            title: "The engine builds every part",
            body: "Each piece is broken into boards with edge banding, drilling and fittings, following the shop's own construction standards.",
          },
          {
            title: "Cut, nest and machine",
            body: "Parts are nested on the boards the shop has, with saw lists and CNC programs ready for the machines.",
          },
          {
            title: "Quote, order and produce",
            body: "The same design prices itself, becomes a sales order and a manufacturing order, and reaches the shop-floor station with part labels and packages.",
          },
          {
            title: "Install and close",
            body: "Every revision is kept; the actual cost is compared with the quote, and the customer signs off the finished room.",
          },
        ],
      },
      inside: {
        title: "How ANU builds it",
        body: "The browser draws and previews; the server decides. Nothing is approved, priced or released until the same engine has run on the server and signed the result.",
        items: [
          { label: "A deterministic engine", body: "The same design always gives the same parts, to the micrometre, in the browser and on the server." },
          { label: "The shop described once", body: "Boards with thickness, grain and kerf; hardware roles mapped to real products; what the saw and the CNC expect." },
          { label: "Honest warnings", body: "Shelf sag, unmapped hardware and machine limits are flagged, never guessed." },
          { label: "Inside ANU Brain", body: "Customers, quotes, stock, purchasing and manufacturing are the ERP's own records, not a parallel database." },
          { label: "Arabic and English as peers", body: "Every screen, label and printout in both languages, right to left included." },
        ],
        stack: ["ANU Brain (Odoo 19)", "TypeScript engine", "React", "three.js", "Path-traced renders", "2.5D CAM"],
      },
      features: [
        { label: "Template library", body: "Kitchens, wardrobes and furniture that adapt to width, height and depth." },
        { label: "Cut lists and edge banding", body: "Generated from the model, never retyped." },
        { label: "Drilling and fittings rules", body: "Hinges, slides and connectors placed by rule, with the parts to buy." },
        { label: "Nesting", body: "Boards and offcuts used first, waste measured." },
        { label: "CNC output", body: "Programs for the machines, straight from the design." },
        { label: "Shop-floor station", body: "Part labels, scans, packages and remnants on a screen beside the saw." },
      ],
      faq: [
        {
          q: "Can it design any furniture shape?",
          a: "Kitchens, wardrobes and box furniture are live today, including parametric widths. Curves, carving, solid wood and full rooms with lighting are in the next release.",
        },
        {
          q: "Does it work with our machines?",
          a: "Workshops produces saw lists and CNC programs from the design. ANU sets it up to what your saw and CNC expect during implementation.",
        },
        {
          q: "Is it a separate program?",
          a: "No. It runs inside ANU Brain, so the design, the quote, the order, the stock and the workshop are one system.",
        },
        {
          q: "Is it available in Arabic?",
          a: "Yes. Arabic and English are equal, on screen and on every printout.",
        },
      ],
      metaTitle: "ANU Workshops: furniture design to production",
      metaDescription:
        "Design kitchens, wardrobes and furniture in the browser and get cut lists, edge banding, drilling, CNC programs, fittings and the price, inside one ERP.",
      keywords: ["furniture design software Iraq", "kitchen design to CNC", "cut list", "nesting", "furniture ERP"],
    },
    ar: {
      name: "أنو للورش",
      short: "الورش",
      pitch: "الأثاث والديكور، من الرسم إلى القطع المقصوصة وأرض الورشة.",
      summary:
        "يحوّل نظام أنو للورش تصميم الأثاث إلى ما تحتاجه الورشة. ارسم مطبخاً أو خزانة أو غرفة كاملة في المتصفح بالعربية أو الإنجليزية، ومن النموذج نفسه تحصل على قائمة القطع وشريط الحواف والتثقيب وبرامج الـCNC والإكسسوارات المطلوب شراؤها والسعر. ويعمل داخل أنو برين، فيكون عرض السعر والطلب والمخزون نظاماً واحداً.",
      audience: ["ورش المطابخ والخزانات", "مصانع الأثاث", "شركات النجارة والتشطيب", "المصممون الذين يصنّعون"],
      problem: {
        title: "التصميم والورشة يتكلمان لغتين مختلفتين",
        body: "يرسم المصمم غرفة جميلة في برنامج، ثم يعيد شخص آخر كتابتها قائمة قطع في Excel، ويخمّن ثالث المفصلات، ويسعّرها رابع من الذاكرة. فتظهر الأخطاء على المنشار أو في موقع التركيب، حيث تكلّف أكثر.",
        symptoms: [
          "قوائم قطع تُكتب يدوياً من الرسم",
          "إكسسوارات تُنسى حتى يوم التركيب",
          "عروض أسعار لا تطابق ما صُنع",
          "ألواح وبقايا لا يعرف أحد أين ذهبت",
        ],
      },
      how: {
        title: "نموذج واحد، من الغرفة إلى الماكنة",
        steps: [
          {
            title: "ارسم الغرفة",
            body: "الجدران والفتحات والسقوف بالبعدين والثلاثة أبعاد، ثم الخزائن والأثاث من مكتبة القوالب أو من الصفر، مع التشطيبات وصور واقعية للزبون.",
          },
          {
            title: "المحرك يبني كل قطعة",
            body: "تُفكَّك كل قطعة إلى ألواح مع شريط الحواف والتثقيب والإكسسوارات، وفق معايير التصنيع الخاصة بالورشة.",
          },
          {
            title: "قص وترتيب وتشغيل",
            body: "تُرتَّب القطع على الألواح المتوفرة في الورشة، مع قوائم المنشار وبرامج الـCNC جاهزة للماكنات.",
          },
          {
            title: "سعّر واطلب واصنع",
            body: "يسعّر التصميم نفسه، ويصبح أمر بيع وأمر تصنيع، ويصل إلى محطة الورشة مع ملصقات القطع والطرود.",
          },
          {
            title: "ركّب وأغلق",
            body: "تُحفظ كل نسخة من التصميم، وتُقارن الكلفة الفعلية بعرض السعر، ويوقّع الزبون على الغرفة المنجزة.",
          },
        ],
      },
      inside: {
        title: "كيف تبنيه أنو",
        body: "المتصفح يرسم ويعرض، والخادم يقرّر. لا يُعتمد شيء ولا يُسعّر ولا يُطلق للإنتاج حتى يعمل المحرك نفسه على الخادم ويوقّع النتيجة.",
        items: [
          { label: "محرك حتمي", body: "التصميم نفسه يعطي القطع نفسها دائماً، حتى الميكرومتر، في المتصفح وعلى الخادم." },
          { label: "الورشة تُوصف مرة واحدة", body: "الألواح بسماكتها واتجاه أليافها وعرض القص، والإكسسوارات مربوطة بمنتجات حقيقية، وما يتوقعه المنشار والـCNC." },
          { label: "تحذيرات صادقة", body: "انحناء الرفوف والإكسسوارات غير المربوطة وحدود الماكنات تُنبَّه، ولا تُخمَّن أبداً." },
          { label: "داخل أنو برين", body: "الزبائن وعروض الأسعار والمخزون والمشتريات والتصنيع سجلات النظام نفسه، لا قاعدة بيانات موازية." },
          { label: "العربية والإنجليزية متساويتان", body: "كل شاشة وتسمية ومطبوع باللغتين، مع الاتجاه من اليمين إلى اليسار." },
        ],
        stack: ["أنو برين (Odoo 19)", "محرك TypeScript", "React", "three.js", "صور بتتبع المسارات", "تشغيل CAM ثنائي ونصف البعد"],
      },
      features: [
        { label: "مكتبة قوالب", body: "مطابخ وخزانات وأثاث تتكيّف مع العرض والارتفاع والعمق." },
        { label: "قوائم القطع وشريط الحواف", body: "تُولَّد من النموذج ولا تُكتب يدوياً." },
        { label: "قواعد التثقيب والإكسسوارات", body: "المفصلات والسكك والوصلات توضع بقاعدة، مع القطع المطلوب شراؤها." },
        { label: "ترتيب القص", body: "الألواح والبقايا أولاً، والهدر محسوب." },
        { label: "مخرجات الـCNC", body: "برامج للماكنات مباشرة من التصميم." },
        { label: "محطة الورشة", body: "ملصقات القطع والمسح والطرود والبقايا على شاشة بجانب المنشار." },
      ],
      faq: [
        {
          q: "هل يصمم أي شكل من الأثاث؟",
          a: "المطابخ والخزانات والأثاث الصندوقي متاحة اليوم مع العرض المتغيّر. أما المنحنيات والحفر والخشب الصلب والغرف الكاملة مع الإضاءة ففي الإصدار القادم.",
        },
        {
          q: "هل يعمل مع ماكناتنا؟",
          a: "ينتج النظام قوائم المنشار وبرامج الـCNC من التصميم، وتضبطه أنو على ما يتوقعه منشارك وماكنة الـCNC أثناء التطبيق.",
        },
        {
          q: "هل هو برنامج منفصل؟",
          a: "لا. يعمل داخل أنو برين، فيكون التصميم وعرض السعر والطلب والمخزون والورشة نظاماً واحداً.",
        },
        {
          q: "هل يتوفر بالعربية؟",
          a: "نعم. العربية والإنجليزية متساويتان على الشاشة وفي كل مطبوع.",
        },
      ],
      metaTitle: "أنو للورش: من تصميم الأثاث إلى الإنتاج",
      metaDescription:
        "صمّم المطابخ والخزانات والأثاث في المتصفح واحصل على قوائم القطع وشريط الحواف والتثقيب وبرامج الـCNC والإكسسوارات والسعر داخل نظام واحد.",
      keywords: ["برنامج تصميم أثاث العراق", "تصميم مطابخ CNC", "قائمة القطع", "نظام ورش النجارة", "ERP للأثاث"],
    },
  },
}
