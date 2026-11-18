import type { SystemStory } from "./types"

export const governmentHr: SystemStory = {
  slug: "government-hr",
  group: "industry",
  status: "demo",
  order: 17,
  related: ["legal", "brain", "field-operations"],
  visual: { poster: "/media/systems/government-hr" },
  copy: {
    en: {
      name: "ANU Government HR",
      short: "Government HR",
      pitch: "Enter a deputation once; the memo, approvals, mission order and stamped PDF follow.",
      summary:
        "ANU Government HR handles employee deputations for Arabic-speaking government departments. The preparer enters the deputation once, and the same case produces the memorandum, routes it to the right managers and the Director General, prepares the mission order and issues one stamped, numbered and archived PDF. It runs on ANU Brain, Arabic first, on a government case foundation built to carry other procedures.",
      audience: [
        "Government directorates",
        "Administrative and HR departments",
        "Request preparers and administrative officers",
        "Directors general",
      ],
      problem: {
        title: "One deputation, typed four times",
        body: "A deputation starts as a memo in a word processor, is retyped into a mission order, carried from office to office for signatures, entered in the outgoing book by hand and photocopied with the stamp. Each copy can drift from the last, and nobody can say on whose desk a request is waiting.",
        symptoms: [
          "Names and dates retyped between the memo and the order",
          "Requests waiting on a desk nobody can see",
          "Supporting documents checked after the signature",
          "Reprints that no longer match the stamped original",
        ],
      },
      how: {
        title: "One case, from the request to the stamped order",
        steps: [
          {
            title: "Prepare the request",
            body: "The preparer enters the subject, department, activity, destination, dates, participants and the supporting documents. Nothing is typed twice after this.",
          },
          {
            title: "Approve the memorandum",
            body: "The memo goes to the concerned department manager, the Director General and the administrative department manager in turn. Each approver is taken from the organisation chart and receives one task.",
          },
          {
            title: "Check the documents",
            body: "The administrative officer verifies the required supporting documents and archives the approved memorandum.",
          },
          {
            title: "Approve the mission order",
            body: "The mission order is prepared from the same case and approved by the administrative department manager and the Director General, who authorises the official stamp.",
          },
          {
            title: "Register and issue",
            body: "The officer records the outgoing number and date, and the system issues the stamped PDF once and archives it. Every later print is that archived copy.",
          },
        ],
      },
      inside: {
        title: "How ANU builds it",
        body: "A government case foundation with the deputation on top. The approval route, the decision log, the supporting documents and the archived letters belong to the case, so the next procedure reuses them instead of starting again.",
        items: [
          {
            label: "Routing from the organisation chart",
            body: "Department managers and their users come from the staff records already in ANU Brain; when a manager changes, the route follows without any change to the software.",
          },
          {
            label: "A decision log that cannot be edited",
            body: "Every approval, return and resubmission is recorded with who, when and why. A return needs a reason, and earlier rounds stay visible as superseded.",
          },
          {
            label: "Returns go to the right person",
            body: "A memo returned during the first approvals goes back to the preparer; a returned mission order goes to the administrative officer.",
          },
          {
            label: "The stamp, once",
            body: "The official stamp is set per institution and appears only on the first authorised render. Reprints serve the archived PDF, even if names, departments or the stamp change later.",
          },
          {
            label: "Checked on the server",
            body: "Every step is authorised on the server, and several institutions can share one system with their data, numbering and stamp kept apart.",
          },
        ],
        stack: ["ANU Brain (Odoo 19)", "Python", "QWeb PDF reports", "Pivot and graph analytics"],
      },
      features: [
        {
          label: "Deputation register",
          body: "Case reference, outgoing number, subject, department, destination, period, duration, participants and status in one list, exportable to Excel.",
        },
        {
          label: "Case analytics",
          body: "Cases and participants by department, destination and status, with processing time once a case is issued.",
        },
        { label: "Structured supporting documents", body: "Each required document type is listed on the case and verified, not just attached." },
        {
          label: "Plain states",
          body: "Draft, initial approvals, document review, mission order preparation, final approvals, awaiting outgoing registration, completed, returned or rejected.",
        },
        { label: "One task per step", body: "Each routed step creates one to-do for one person, and duplicates are suppressed." },
        { label: "Arabic official letters", body: "Memorandum and mission order printed right to left, with the outgoing number and date." },
      ],
      facts: [
        { value: "1", label: "case behind the memo and the mission order" },
        { value: "7", label: "routed steps, each a task for one named person" },
      ],
      faq: [
        {
          q: "Can it follow our own approval chain?",
          a: "Yes. Approvers are resolved from your organisation chart, and the sequence of steps is set to your institution's procedure during implementation.",
        },
        {
          q: "What happens when a request is returned?",
          a: "The approver must give a reason. The request goes back to whoever has to correct it, and when it is resubmitted a new round starts; the earlier decisions stay on record.",
        },
        {
          q: "Can the stamped document be changed after it is issued?",
          a: "No. The final PDF is generated once, with the stamp on that authorised render, and archived. Every reprint is the archived file.",
        },
        {
          q: "Can we bring in records from our old system?",
          a: "Yes. ANU maps the old tool's tables to the new case during implementation, so past deputations can be carried over.",
        },
        {
          q: "Can it run on our own servers?",
          a: "Yes. It runs wherever ANU Brain runs: on ANU Cloud or on servers inside your institution.",
        },
        {
          q: "Is it only for deputations?",
          a: "Deputation is the first procedure. The case, route, decision log and archived letters are a shared foundation, so other administrative procedures can be built on it.",
        },
      ],
      metaTitle: "ANU Government HR: employee deputation system",
      metaDescription:
        "Enter an employee deputation once: memorandum, approvals from the organisation chart, mission order, outgoing number and an archived stamped PDF, in Arabic.",
      keywords: [
        "government HR system Iraq",
        "employee deputation workflow",
        "mission order system",
        "government correspondence Arabic",
        "official stamp PDF archive",
      ],
    },
    ar: {
      name: "أنو للموارد البشرية الحكومية",
      short: "الإيفادات الحكومية",
      pitch: "أدخل الإيفاد مرة واحدة، فتتبعه المذكرة والموافقات والأمر الإداري والكتاب المختوم.",
      summary:
        "يدير نظام أنو للموارد البشرية الحكومية إيفادات الموظفين في الدوائر الحكومية. يُدخل معدّ الطلب بيانات الإيفاد مرة واحدة، ومن المعاملة نفسها تُعدّ المذكرة وتُرفع إلى المدراء المعنيين والمدير العام، ويُهيّأ الأمر الإداري بالإيفاد، ويصدر كتاب رسمي واحد مختوم ومرقّم ومؤرشف بصيغة PDF. ويعمل على أنو برين بالعربية أولاً، فوق أساس للمعاملات الحكومية مبني ليحمل إجراءات أخرى.",
      audience: [
        "الدوائر والمديريات الحكومية",
        "أقسام الشؤون الإدارية والموارد البشرية",
        "معدّو الطلبات والموظفون الإداريون",
        "المدراء العامون",
      ],
      problem: {
        title: "إيفاد واحد يُكتب أربع مرات",
        body: "يبدأ الإيفاد مذكرةً في برنامج لتحرير النصوص، ثم يُعاد طبعه أمراً إدارياً، ويُحمل من غرفة إلى أخرى للتوقيع، ويُقيَّد في سجل الصادر باليد، ويُستنسخ مع الختم. وقد تختلف كل نسخة عن سابقتها، ولا يعرف أحد على أي مكتب ينتظر الطلب.",
        symptoms: [
          "أسماء وتواريخ تُعاد كتابتها بين المذكرة والأمر الإداري",
          "طلبات تنتظر على مكتب لا يراه أحد",
          "أوليات تُدقَّق بعد التوقيع",
          "نسخ مطبوعة لم تعد تطابق الأصل المختوم",
        ],
      },
      how: {
        title: "معاملة واحدة، من الطلب إلى الأمر المختوم",
        steps: [
          {
            title: "إعداد الطلب",
            body: "يُدخل المعدّ الموضوع والقسم والنشاط وجهة الإيفاد والتواريخ والمشاركين والأوليات المطلوبة، ولا يُكتب شيء مرتين بعد ذلك.",
          },
          {
            title: "الموافقة على المذكرة",
            body: "تُرفع المذكرة إلى مدير القسم المعني ثم المدير العام ثم مدير القسم الإداري. ويُحدَّد كل معتمِد من الهيكل التنظيمي، وتصله مهمة واحدة.",
          },
          {
            title: "تدقيق الأوليات",
            body: "يدقّق الموظف الإداري المستندات المطلوبة ويؤرشف المذكرة المعتمدة.",
          },
          {
            title: "اعتماد الأمر الإداري",
            body: "يُعدّ أمر الإيفاد من المعاملة نفسها، ويعتمده مدير القسم الإداري ثم المدير العام الذي يأذن بوضع الختم الرسمي.",
          },
          {
            title: "التسجيل والإصدار",
            body: "يسجّل الموظف الإداري رقم الصادر وتاريخه، فيُصدر النظام الكتاب المختوم مرة واحدة ويؤرشفه، وكل طبعة لاحقة هي النسخة المؤرشفة نفسها.",
          },
        ],
      },
      inside: {
        title: "كيف تبنيه أنو",
        body: "أساس للمعاملات الحكومية، والإيفاد مبني فوقه. مسار الموافقات وسجل القرارات والأوليات والكتب المؤرشفة تعود إلى المعاملة، فيعيد الإجراء التالي استخدامها بدل البدء من جديد.",
        items: [
          {
            label: "المسار من الهيكل التنظيمي",
            body: "مدراء الأقسام ومستخدموهم مأخوذون من سجلات الموظفين الموجودة في أنو برين، فإذا تغيّر المدير تبعه المسار دون أي تعديل في البرنامج.",
          },
          {
            label: "سجل قرارات لا يُعدَّل",
            body: "تُسجَّل كل موافقة وإعادة وإعادة تقديم مع من قام بها ومتى ولماذا. ولا تُعاد معاملة دون ذكر السبب، وتبقى الجولات السابقة ظاهرة على أنها مُستبدَلة.",
          },
          {
            label: "الإعادة إلى الشخص المعني",
            body: "تعود المذكرة المعادة في مرحلة الموافقات الأولية إلى معدّ الطلب، ويعود الأمر الإداري المعاد إلى الموظف الإداري.",
          },
          {
            label: "الختم مرة واحدة",
            body: "يُضبط الختم الرسمي لكل جهة، ولا يظهر إلا في أول إصدار مأذون به. وتُقدَّم الطبعات اللاحقة من الملف المؤرشف حتى لو تغيّرت الأسماء أو الأقسام أو الختم لاحقاً.",
          },
          {
            label: "التحقق على الخادم",
            body: "تُتحقق صلاحية كل خطوة على الخادم، ويمكن لعدة جهات أن تشترك في نظام واحد مع فصل بياناتها وترقيمها وختمها.",
          },
        ],
        stack: ["أنو برين (Odoo 19)", "Python", "تقارير QWeb PDF", "تحليلات بالجداول المحورية والرسوم"],
      },
      features: [
        {
          label: "سجل الإيفادات",
          body: "رقم المعاملة ورقم الصادر والموضوع والقسم وجهة الإيفاد والمدة والمشاركون والحالة في قائمة واحدة، قابلة للتصدير إلى Excel.",
        },
        {
          label: "تحليل المعاملات",
          body: "المعاملات والمشاركون حسب القسم وجهة الإيفاد والحالة، مع مدة الإنجاز بعد إصدار المعاملة.",
        },
        { label: "أوليات منظّمة", body: "كل نوع من المستندات المطلوبة مُدرج على المعاملة ومدقَّق، لا مجرد مرفق." },
        {
          label: "حالات واضحة",
          body: "مسودة، موافقات أولية، تدقيق المستندات، إعداد أمر الإيفاد، الموافقات النهائية، بانتظار الصادر، مكتمل، معاد للتصحيح أو مرفوض.",
        },
        { label: "مهمة واحدة لكل خطوة", body: "تُنشئ كل خطوة موجّهة مهمة واحدة لشخص واحد، ولا تتكرر المهام." },
        { label: "كتب رسمية بالعربية", body: "المذكرة والأمر الإداري مطبوعان من اليمين إلى اليسار، مع رقم الصادر وتاريخه." },
      ],
      facts: [
        { value: "1", label: "معاملة واحدة وراء المذكرة والأمر الإداري" },
        { value: "7", label: "خطوات موجّهة، لكلٍّ منها مهمة لشخص محدد" },
      ],
      faq: [
        {
          q: "هل يتبع تسلسل الموافقات المعتمد لدينا؟",
          a: "نعم. يُحدَّد المعتمِدون من الهيكل التنظيمي للجهة، ويُضبط تسلسل الخطوات وفق إجراءات مؤسستكم أثناء التطبيق.",
        },
        {
          q: "ماذا يحدث إذا أُعيد الطلب؟",
          a: "على المعتمِد أن يذكر سبب الإعادة. يعود الطلب إلى من عليه تصحيحه، وعند إعادة تقديمه تبدأ جولة جديدة، وتبقى القرارات السابقة محفوظة في السجل.",
        },
        {
          q: "هل يمكن تغيير الكتاب المختوم بعد إصداره؟",
          a: "لا. يُولَّد الكتاب النهائي بصيغة PDF مرة واحدة مع الختم في ذلك الإصدار المأذون به، ثم يُؤرشف. وكل إعادة طباعة هي الملف المؤرشف نفسه.",
        },
        {
          q: "هل يمكن نقل سجلات النظام القديم؟",
          a: "نعم. تطابق أنو جداول الأداة القديمة مع المعاملة الجديدة أثناء التطبيق، فتُنقل الإيفادات السابقة.",
        },
        {
          q: "هل يعمل على خوادمنا الخاصة؟",
          a: "نعم. يعمل حيث يعمل أنو برين: على ANU Cloud أو على خوادم داخل مؤسستكم.",
        },
        {
          q: "هل هو للإيفادات فقط؟",
          a: "الإيفاد هو الإجراء الأول. أما المعاملة والمسار وسجل القرارات والكتب المؤرشفة فأساس مشترك، يمكن أن تُبنى عليه إجراءات إدارية أخرى.",
        },
      ],
      metaTitle: "أنو للموارد البشرية الحكومية: نظام إيفاد الموظفين",
      metaDescription:
        "أدخل إيفاد الموظف مرة واحدة: المذكرة والموافقات من الهيكل التنظيمي والأمر الإداري ورقم الصادر وكتاب PDF مختوم ومؤرشف، بالعربية.",
      keywords: [
        "نظام الإيفادات الحكومية",
        "برنامج الموارد البشرية الحكومي العراق",
        "أمر إداري بالإيفاد",
        "سجل الصادر الإلكتروني",
        "أرشفة الكتب الرسمية المختومة",
      ],
    },
  },
}
