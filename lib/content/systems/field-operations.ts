import type { SystemStory } from "./types"

export const fieldOperations: SystemStory = {
  slug: "field-operations",
  group: "industry",
  status: "demo",
  order: 18,
  related: ["government-hr", "brain", "intelligence"],
  visual: { poster: "/media/systems/field-operations" },
  copy: {
    en: {
      name: "ANU Field Operations",
      short: "Field operations",
      pitch: "Accreditation of field organisations and checked field reports for public authorities.",
      summary:
        "ANU Field Operations gives a national authority two tools for the organisations that work in the field under its oversight. Accreditation takes an organisation from its first application to a certificate, with every step logged, timed and escalated when it stalls. Field reports turns each operator's Excel file into checked reports in the national database's own exchange format, without retyping.",
      audience: [
        "National and regional authorities",
        "Accreditation and quality units",
        "Information management teams",
        "Field organisations that report to an authority",
      ],
      problem: {
        title: "Files on paper, reports in a hundred spellings",
        body: "Accreditation files travel between offices on paper, and nobody can say which document is holding one up. Field reports arrive as Excel files written in each operator's own way, and staff correct them row by row in an old desktop tool before they reach the national database.",
        symptoms: [
          "Accreditation files stuck, and no one can say where",
          "Documents found expired after the decision",
          "The same village spelled five ways in one file",
          "Reports corrected by hand, one row at a time",
        ],
      },
      how: {
        title: "From the application to the national database",
        steps: [
          {
            title: "Accredit the office",
            body: "Reception, the director's initial acceptance, legal review and a prerequisites checklist lead to the office accreditation letter.",
          },
          {
            title: "Accredit the operations",
            body: "The organisation submits its standard operating procedures; fees are recorded, finance and operations sign off in parallel, a field demonstration follows, and the committee's decision becomes the certificate.",
          },
          {
            title: "Upload the operator's file",
            body: "Staff choose the form and the office, upload the Excel file with its attachments, and see every problem in the file at once.",
          },
          {
            title: "Fix each problem once",
            body: "Problems are grouped by column. One fix corrects every row with the same value and can be remembered for future files; an unknown village shows the known locations nearest its coordinates.",
          },
          {
            title: "Export to the national database",
            body: "New locations go out first for approval. Then one archive of standard reports, their attachments and a manifest is ready for the database's own import.",
          },
        ],
      },
      inside: {
        title: "How ANU builds it",
        body: "Two modules on ANU Brain. The national database stays the system of record: ANU reads its reference lists and prepares files for its import, and never writes to it.",
        items: [
          {
            label: "An approval log that cannot be edited",
            body: "Every transition is recorded, posted to the file's history and sent to the next responsible group as a task.",
          },
          {
            label: "Service levels read from the log",
            body: "Each step has a target measured from the moment the file reached it, with reminders and escalation to the accreditation manager. Median and 90th-percentile waits, bottlenecks, workload and rework come from the same log, not from estimates.",
          },
          {
            label: "An evidence file, not a folder",
            body: "What each document says, whether it is still valid, which version is current and why the old one was replaced, and which line is holding the file up. The whole dossier prints as an index and downloads as an archive.",
          },
          {
            label: "Checked against the national lists",
            body: "Places, locations, organisations, forms and field values come from a read-only connection to the national database, or from a package built from its backup.",
          },
          {
            label: "A template per form",
            body: "Each report form is a template on the same screens. Operators get a blank template, and their list of problems back, as Excel, in Arabic or English.",
          },
        ],
        stack: ["ANU Brain (Odoo 19)", "Python", "PostgreSQL (read-only)", "Excel import", "XML export"],
      },
      features: [
        { label: "Two-phase accreditation", body: "Office accreditation first, then operational, each with its own letter or certificate." },
        { label: "Escalation", body: "Reminders and escalation when a step passes its target time." },
        { label: "Accreditation dossier", body: "The full evidence and decision trail of one file, printed or downloaded." },
        { label: "Every problem at once", body: "The whole file is checked in one pass, grouped by column." },
        { label: "Fix once, remember", body: "One correction applies to every matching row, and to future files." },
        { label: "Nearest known locations", body: "Unknown village names matched by the report's coordinates." },
        { label: "Already-exported warning", body: "A report sent before is flagged before it is sent again." },
        { label: "Arabic and English", body: "Screens, messages, and Arabic headers and answers in operators' files." },
      ],
      facts: [
        { value: "2", label: "accreditation phases: office, then operational" },
        { value: "6 s", label: "to read a 600-row operator file" },
        { value: "4 s", label: "to check every row of it" },
      ],
      faq: [
        {
          q: "Does it replace our national database?",
          a: "No. The national database stays the system of record. ANU reads its reference lists and prepares checked files for its own import; it never writes to the database.",
        },
        {
          q: "Our operators all fill in their files differently. Will it cope?",
          a: "Each report form has a template, and operators can download a blank one. Headers and answers are read in Arabic or English, and each operator gets back a list of the problems in their file.",
        },
        {
          q: "What if a place is not in the database yet?",
          a: "The system shows the known locations nearest the report's coordinates. A genuinely new place is exported first as a location report; once it is approved, the reports that use it follow.",
        },
        {
          q: "Can we see where an accreditation file is waiting?",
          a: "Yes. Each step has a target time measured from the approval log, overdue steps are escalated, and the dashboard shows waiting times, bottlenecks and rework by step and department.",
        },
        {
          q: "Does it need a live link to the database?",
          a: "No. Reference lists can come from a read-only connection or from a package built from a database backup, refreshed whenever the database changes.",
        },
        {
          q: "Is it in use?",
          a: "Both tools are built and shown as a working demonstration in Arabic and English. The first report form works end to end; further forms are added as templates on the same screens.",
        },
      ],
      metaTitle: "ANU Field Operations: accreditation and field reports",
      metaDescription:
        "Accredit field organisations with a locked approval log and escalation, and turn operators' Excel files into checked reports for the national database.",
      keywords: [
        "accreditation management system",
        "field reports Excel import",
        "government workflow software Iraq",
        "field data validation",
        "public authority software",
      ],
    },
    ar: {
      name: "أنو للعمليات الميدانية",
      short: "العمليات الميدانية",
      pitch: "اعتماد المنظمات العاملة في الميدان وتقارير ميدانية مدقّقة للجهات العامة.",
      summary:
        "يمنح نظام أنو للعمليات الميدانية الهيئة الوطنية أداتين للمنظمات التي تعمل في الميدان تحت إشرافها. يأخذ الاعتماد المنظمة من طلبها الأول إلى الشهادة، مع تسجيل كل خطوة وقياس مدتها وتصعيدها إذا تأخرت. وتحوّل التقارير الميدانية ملف Excel الوارد من كل منظمة إلى تقارير مدقّقة بصيغة التبادل الخاصة بقاعدة البيانات الوطنية، دون إعادة كتابة.",
      audience: [
        "الهيئات الوطنية والمراكز الإقليمية",
        "وحدات الاعتماد والجودة",
        "فرق إدارة المعلومات",
        "المنظمات الميدانية التي ترفع تقاريرها إلى هيئة",
      ],
      problem: {
        title: "ملفات على الورق، وتقارير بمئة تهجئة",
        body: "تنتقل ملفات الاعتماد بين المكاتب على الورق، ولا يعرف أحد أي مستند يؤخر أحدها. وتصل التقارير الميدانية ملفات Excel كتبتها كل منظمة على طريقتها، فيصححها الموظفون سطراً سطراً في أداة مكتبية قديمة قبل أن تصل إلى قاعدة البيانات الوطنية.",
        symptoms: [
          "ملفات اعتماد متوقفة لا يعرف أحد أين",
          "مستندات يتبيّن انتهاؤها بعد صدور القرار",
          "القرية نفسها مكتوبة بخمس طرق في ملف واحد",
          "تقارير تُصحَّح يدوياً سطراً بعد سطر",
        ],
      },
      how: {
        title: "من طلب الاعتماد إلى قاعدة البيانات الوطنية",
        steps: [
          {
            title: "اعتماد المكتب",
            body: "الاستلام، ثم القبول الأولي من المدير، فالتدقيق القانوني وقائمة المتطلبات المسبقة، وصولاً إلى كتاب اعتماد المكتب.",
          },
          {
            title: "الاعتماد التشغيلي",
            body: "تقدّم المنظمة إجراءات التشغيل القياسية، وتُسجَّل الرسوم، ويوقّع القسمان المالي والعمليات بالتوازي، ثم يجري عرض ميداني، ويصبح قرار اللجنة شهادة الاعتماد.",
          },
          {
            title: "رفع ملف المنظمة",
            body: "يختار الموظف الاستمارة والمكتب، ويرفع ملف Excel مع مرفقاته، فيرى كل مشكلات الملف دفعة واحدة.",
          },
          {
            title: "إصلاح كل مشكلة مرة واحدة",
            body: "تُجمع المشكلات حسب العمود، والإصلاح الواحد يصحح كل الأسطر التي تحمل القيمة نفسها ويمكن حفظه للملفات القادمة. وتظهر بجانب القرية غير المعروفة أقرب المواقع المسجّلة إلى إحداثياتها.",
          },
          {
            title: "التصدير إلى قاعدة البيانات الوطنية",
            body: "تُصدَّر المواقع الجديدة أولاً للموافقة عليها، ثم يجهز أرشيف واحد فيه التقارير القياسية ومرفقاتها وقائمة بمحتوياته، ليُستورد بأداة القاعدة نفسها.",
          },
        ],
      },
      inside: {
        title: "كيف تبنيه أنو",
        body: "وحدتان على أنو برين. وتبقى قاعدة البيانات الوطنية هي النظام المرجعي: تقرأ أنو قوائمها المرجعية وتجهّز الملفات لاستيرادها، ولا تكتب فيها شيئاً أبداً.",
        items: [
          {
            label: "سجل موافقات لا يُعدَّل",
            body: "يُسجَّل كل انتقال، ويظهر في سجل الملف، ويصل إلى الجهة المسؤولة التالية على شكل مهمة.",
          },
          {
            label: "مستويات الخدمة من السجل",
            body: "لكل خطوة مدة مستهدفة تُقاس من لحظة وصول الملف إليها، مع تذكيرات وتصعيد إلى مدير الاعتماد. ومن السجل نفسه يأتي وسيط الانتظار والمئين التسعون والاختناقات وحمل العمل وإعادة العمل، لا من التقدير.",
          },
          {
            label: "ملف أدلة لا مجرد مجلد",
            body: "ما يقوله كل مستند عن نفسه، وهل ما زال سارياً، وأي نسخة هي الحالية ولماذا استُبدلت السابقة، وأي بند يؤخر الملف. ويُطبع الملف الكامل فهرساً ويُنزَّل أرشيفاً.",
          },
          {
            label: "تدقيق مقابل القوائم الوطنية",
            body: "الأماكن والمواقع والمنظمات والاستمارات وقيم الحقول تأتي من اتصال للقراءة فقط بقاعدة البيانات الوطنية، أو من حزمة مستخرجة من نسختها الاحتياطية.",
          },
          {
            label: "قالب لكل استمارة",
            body: "كل استمارة تقرير قالب على الشاشات نفسها. وتحصل المنظمات على قالب فارغ، وعلى قائمة مشكلات ملفها، بصيغة Excel وبالعربية أو الإنجليزية.",
          },
        ],
        stack: ["أنو برين (Odoo 19)", "Python", "PostgreSQL للقراءة فقط", "استيراد Excel", "تصدير XML"],
      },
      features: [
        { label: "اعتماد على مرحلتين", body: "اعتماد المكتب أولاً ثم الاعتماد التشغيلي، ولكلٍّ كتابه أو شهادته." },
        { label: "التصعيد", body: "تذكيرات وتصعيد عندما تتجاوز خطوة مدتها المستهدفة." },
        { label: "ملف الاعتماد الكامل", body: "كل أدلة الملف الواحد وقراراته، مطبوعة أو منزّلة." },
        { label: "كل المشكلات دفعة واحدة", body: "يُدقَّق الملف كله في مرور واحد، مجمّعاً حسب العمود." },
        { label: "أصلح مرة وتذكّر", body: "تصحيح واحد يسري على كل سطر مطابق وعلى الملفات القادمة." },
        { label: "أقرب المواقع المعروفة", body: "أسماء القرى غير المعروفة تُطابق بإحداثيات التقرير." },
        { label: "تنبيه التصدير المكرر", body: "التقرير الذي صُدّر من قبل يُنبَّه عليه قبل إرساله مرة أخرى." },
        { label: "العربية والإنجليزية", body: "الشاشات والرسائل، والعناوين والإجابات العربية في ملفات المنظمات." },
      ],
      facts: [
        { value: "2", label: "مرحلتا اعتماد: المكتب ثم التشغيل" },
        { value: "6", label: "ثوانٍ لقراءة ملف منظمة من 600 سطر" },
        { value: "4", label: "ثوانٍ لتدقيق كل أسطره" },
      ],
      faq: [
        {
          q: "هل يحلّ محل قاعدة البيانات الوطنية لدينا؟",
          a: "لا. تبقى قاعدة البيانات الوطنية هي النظام المرجعي. تقرأ أنو قوائمها المرجعية وتجهّز ملفات مدقّقة لاستيرادها، ولا تكتب في القاعدة أبداً.",
        },
        {
          q: "كل منظمة تملأ ملفها بطريقتها، فهل يتعامل النظام مع ذلك؟",
          a: "لكل استمارة تقرير قالب، ويمكن للمنظمات تنزيل قالب فارغ. ويقرأ النظام العناوين والإجابات بالعربية أو الإنجليزية، وتعود إلى كل منظمة قائمة بمشكلات ملفها.",
        },
        {
          q: "ماذا لو لم يكن المكان مسجّلاً في القاعدة بعد؟",
          a: "يعرض النظام أقرب المواقع المسجّلة إلى إحداثيات التقرير. أما المكان الجديد فعلاً فيُصدَّر أولاً تقريرَ موقع، وبعد الموافقة عليه تتبعه التقارير التي تستخدمه.",
        },
        {
          q: "هل نعرف أين ينتظر ملف الاعتماد؟",
          a: "نعم. لكل خطوة مدة مستهدفة تُقاس من سجل الموافقات، وتُصعَّد الخطوات المتأخرة، وتعرض لوحة المتابعة مدد الانتظار والاختناقات وإعادة العمل حسب الخطوة والقسم.",
        },
        {
          q: "هل يحتاج اتصالاً مباشراً بالقاعدة؟",
          a: "لا. يمكن أن تأتي القوائم المرجعية من اتصال للقراءة فقط، أو من حزمة مستخرجة من نسخة احتياطية للقاعدة، تُحدَّث كلما تغيّرت القاعدة.",
        },
        {
          q: "هل هو مستخدم حالياً؟",
          a: "الأداتان مبنيتان وتُعرضان تجريبياً بالعربية والإنجليزية. تعمل أول استمارة تقرير من البداية إلى النهاية، وتُضاف الاستمارات الأخرى قوالبَ على الشاشات نفسها.",
        },
      ],
      metaTitle: "أنو للعمليات الميدانية: الاعتماد والتقارير الميدانية",
      metaDescription:
        "اعتماد المنظمات الميدانية بسجل موافقات ثابت ومدد مستهدفة وتصعيد، وتحويل ملفات Excel الميدانية إلى تقارير مدقّقة لقاعدة البيانات الوطنية.",
      keywords: [
        "نظام اعتماد المنظمات",
        "تقارير ميدانية Excel",
        "نظام للجهات الحكومية العراق",
        "تدقيق البيانات الميدانية",
        "أتمتة الإجراءات الحكومية",
      ],
    },
  },
}
