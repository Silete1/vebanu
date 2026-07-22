$ErrorActionPreference = 'Stop'
$outDir = Join-Path $PSScriptRoot 'deliverables'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null
$out = Join-Path $outDir 'Odoo_19_Doors_Trading_Implementation_Task_Plan.docx'

$phases = @(
 @{Code='P0'; Name='Mobilization and governance'; Tasks=@(
  @('001','Confirm commercial scope, objectives, success measures, exclusions and change-control procedure','Project Manager','Standard','Signed scope baseline and KPI list'),
  @('002','Appoint sponsor, steering committee, process owners, key users, data owners and backups','Project Manager','Standard','Approved responsibility matrix'),
  @('003','Create project workspace, decision log, issue/risk log, change register and weekly cadence','Project Manager','Standard','Project controls operational'),
  @('004','Confirm Odoo.sh production, staging and development branches, access and backup policy','Technical Lead','Standard','Environment readiness record'),
  @('005','Document reusable configuration patterns from the furniture reference database and validate which apply to the doors business','Functional Lead','Reference reviewed','Reference review report'),
  @('006','Confirm Arabic/English language, Asia/Baghdad timezone, IQD base currency and USD transaction currency','Chief Accountant','Standard','Localization decision sheet'),
  @('007','Run kickoff and approve detailed discovery calendar for all 17+ core users','Project Manager','Standard','Kickoff minutes and workshop plan'))},
 @{Code='P1'; Name='Discovery and solution blueprint'; Tasks=@(
  @('010','Map lead/quotation/POS/order/delivery/return processes for retail, wholesale and contractors','Sales Lead','Standard','Signed sales process map'),
  @('011','Map foreign and local purchasing, container tracking, receipt and three-way-match controls','AP Accountant','Standard','Signed procure-to-pay map'),
  @('012','Map three-site stock topology, receipts, internal transfers, reservations, dispatch and counts','Inventory Lead','Standard','Signed warehouse map'),
  @('013','Define door customization intake, pricing, workshop status and handover without MRP or field service','Operations Lead','Extension','Approved light-customization blueprint'),
  @('014','Define quality criteria by product family and the exact mandatory release gate','Inventory Lead','Extension','Quality control matrix'),
  @('015','Define AR, AP, driver cash, bank, expenses, landed cost, FX, tax and closing processes','Chief Accountant','Standard + extension','Finance blueprint'),
  @('016','Define branch profitability dimensions, analytic accounts/plans and executive reporting KPIs','Chief Accountant','Standard','Management reporting blueprint'),
  @('017','Define discount tiers, exception thresholds, credit limits and two-stage approval authority','Owners + AR Accountant','Extension','Approval authority matrix'),
  @('018','Profile all legacy data sources, volumes, quality, duplicates and historical retention needs','Data Lead','Standard','Data assessment report'),
  @('019','Approve fit-gap register classifying every requirement as standard, configuration, Studio, custom or excluded','Steering Committee','Standard','Signed solution blueprint'))},
 @{Code='P2'; Name='Platform, company and security foundation'; Tasks=@(
  @('020','Install and validate Sales, Purchase, Inventory, Barcode, POS, Accounting, Contacts, Quality, Approvals, Expenses, Documents and Dashboards','Technical Lead','Standard Enterprise','Installed-app baseline'),
  @('021','Keep MRP, Project-based field installation and Field Service outside operational scope','Functional Lead','Explicit exclusion','No unintended manufacturing/service flow'),
  @('022','Configure legal company profile, addresses, logo, document layout, languages and currencies','Functional Lead','Standard','Approved company setup'),
  @('023','Create 3 warehouses: Main Warehouse, Branch 1 and Branch 2 with internal/transit locations','Inventory Consultant','Standard','Warehouse topology tested'),
  @('024','Configure sequences by warehouse/branch for quotations, POS, receipts, deliveries, transfers and journals','Functional Lead','Standard','Traceable numbering scheme'),
  @('025','Create 17+ named users and assign least-privilege application access','Administrator','Standard','User register'),
  @('026','Implement segregated accounting roles for AR, AP, driver treasury, inventory cost, tax/expenses, bank reconciliation and chief accountant','Technical Lead','Custom security','Negative-access tests pass'),
  @('027','Restrict each warehouse specialist to intended operational locations while preserving approved cross-branch visibility','Technical Lead','Custom security','Warehouse access tests pass'),
  @('028','Configure owners as read-only executive users with approval rights and dashboards','Administrator','Configuration + extension','Executive access accepted'),
  @('029','Enable audit-friendly chatter, activities, document attachments and approval evidence retention','Functional Lead','Standard','Audit trail convention'),
  @('030','Execute security test matrix: allowed actions, prohibited actions and escalation paths for every role','QA Lead','Standard','Signed segregation-of-duties test'))},
 @{Code='P3'; Name='Master data and product architecture'; Tasks=@(
  @('031','Design product category hierarchy for doors, frames, panels, locks, accessories, glass and services','Product Data Owner','Standard','Approved category tree'),
  @('032','Define stockable products versus non-stock service products and accounting properties','Inventory Accountant','Standard','Product-type matrix'),
  @('033','Create independent attributes for color/finish, RAL code, width, height, frame size, handing and model','Product Data Owner','Standard','Attribute dictionary'),
  @('034','Decide variant-generation rules to avoid unnecessary SKU explosion and archive invalid combinations','Product Data Owner','Standard','Variant policy'),
  @('035','Define SKU, barcode and display-name conventions supporting Arabic/English search','Product Data Owner','Standard','Naming convention'),
  @('036','Add normalized searchable RAL/color and dimension fields and filters to product, sales and POS selection','Technical Lead','Custom UI/search','Independent search accepted'),
  @('037','Configure units of measure, packaging, supplier codes, lead times, minimum quantities and purchase prices','Purchase Lead','Standard','Supplier data ready'),
  @('038','Configure AVCO or FIFO decision by category, automated valuation, stock/input/output and price-difference accounts','Inventory Accountant','Standard','Valuation setup approved'),
  @('039','Create customization service catalog: trimming, lock drilling, glass insertion and RAL spraying with IQD prices','Sales Lead','Standard','Service catalog'),
  @('040','Configure optional accessory/customization prompts when a door is added to quotation or POS','Technical Lead','Custom UX','Add-on prompt test passes'),
  @('041','Prepare controlled import templates for products, variants, barcodes, suppliers, contacts and price lists','Data Lead','Standard','Approved templates'),
  @('042','Cleanse, deduplicate, trial-import and reconcile master data counts','Data Lead','Standard','Migration rehearsal report'))},
 @{Code='P4'; Name='Sales, POS, pricing and customer controls'; Tasks=@(
  @('043','Configure sales teams by branch, quotation templates, validity, payment terms and delivery policy','Sales Consultant','Standard','Sales setup tested'),
  @('044','Configure two POS terminals, cash/card/customer-account methods, receipts, taxes and session controls','POS Consultant','Standard','Branch POS pilots pass'),
  @('045','Configure quantity-based pricelist breaks: 1-4 standard, 5-9 5%, 10-19 10%, 20+ 15%','Sales Consultant','Standard','Price tests pass at boundaries'),
  @('046','Prevent unauthorized manual discounts and log requested versus permitted discount','Technical Lead','Extension','Discount control test passes'),
  @('047','Build sequential exception approval: AR Accountant then one Owner for excess discount or credit exposure','Technical Lead','Custom workflow','Approval, rejection and timeout tests pass'),
  @('048','Configure customer credit limits, payment terms, overdue policy and warning/block thresholds','AR Accountant','Standard + extension','Credit-control matrix accepted'),
  @('049','Build customer 360 action from Sales and POS showing invoices, debt, limits, purchases and exact variants','Technical Lead','Custom UI','Customer history acceptance test'),
  @('050','Build cross-branch availability panel showing on hand, reserved, available, incoming and sold by warehouse','Technical Lead','Custom UI/report','Three-warehouse quantities reconcile'),
  @('051','Configure reservations, partial fulfillment, backorders, branch sourcing and customer promises','Sales + Inventory Leads','Standard','Allocation scenarios pass'),
  @('052','Configure quotation/order cancellation, returns, refunds, exchanges and damaged-goods handling','Functional Lead','Standard','Exception scenarios pass'),
  @('053','Configure delivery orders with driver assignment and cash-on-delivery payment expectation','Functional Lead','Extension','COD traceability test'),
  @('054','Validate retail, wholesale, contractor, mixed payment, credit, return and customization end-to-end scenarios','QA Lead','Standard','Sales/POS test pack signed'))},
 @{Code='P5'; Name='Purchase, imports and landed cost'; Tasks=@(
  @('055','Configure local/foreign vendors, USD/IQD price lists, incoterms, lead times and purchase agreements','Purchase Consultant','Standard','Vendor purchasing setup'),
  @('056','Configure RFQ/PO approval limits including high-value owner approval','Technical Lead','Approvals/configuration','Purchase approval tests pass'),
  @('057','Configure purchase receipt and vendor bill control policy for three-way matching','AP Accountant','Standard','PO/receipt/bill tolerance tests'),
  @('058','Model container/import reference, ETD, ETA, carrier, customs status and document attachments','Technical Lead','Studio or custom','Shipment tracker accepted'),
  @('059','Configure incoming quantities and expected dates from confirmed purchase orders','Purchase Consultant','Standard','Incoming stock visibility validated'),
  @('060','Configure landed-cost service products for freight, customs, clearance and offloading','Inventory Accountant','Standard','Landed-cost catalog'),
  @('061','Define and test landed-cost allocation methods and accounting postings by receipt/container','Inventory Accountant','Standard','Cost allocation reconciliation'),
  @('062','Configure foreign-currency bills, exchange rates, realized/unrealized differences and payment scheduling','Chief Accountant','Standard','FX accounting tests pass'),
  @('063','Test partial receipt, damaged receipt, short shipment, extra charges, return-to-vendor and bill variance','QA Lead','Standard','Procure-to-pay UAT signed'))},
 @{Code='P6'; Name='Inventory, transfers, barcode and quality'; Tasks=@(
  @('064','Configure receipts, deliveries, internal transfers, transit locations and branch replenishment routes','Inventory Consultant','Standard','Operation types validated'),
  @('065','Configure barcode nomenclature, product labels, package/transfer sheet barcodes and scanners','Barcode Consultant','Standard + extension','Barcode pilot passes'),
  @('066','Create digital transfer manifest with batch lines and a single scan/open action','Technical Lead','Custom','Manifest generated and traceable'),
  @('067','Implement one-click/batch validation at receiving branch with discrepancy capture, not blind acceptance','Technical Lead','Custom','Rapid transfer acceptance test'),
  @('068','Validate real-time origin, transit and destination balances during every transfer state','QA Lead','Standard','Transfer quantity reconciliation'),
  @('069','Configure putaway/storage conventions, damaged/quarantine locations and scrap policy','Inventory Lead','Standard','Location controls accepted'),
  @('070','Configure quality control points for receipt, pre-delivery and POS handover by product family','Quality Consultant','Standard Enterprise','Quality points active'),
  @('071','Configure checks for dimensions, paint integrity, warping, accessories, glass and lock preparation','Quality Consultant','Standard','Check templates approved'),
  @('072','Implement hard block preventing delivery/POS handover while quality is pending or failed','Technical Lead','Custom blocking rule','Negative release tests pass'),
  @('073','Configure quality alerts, quarantine, rework/customization return, downgrade and manager disposition','Quality Consultant','Standard + extension','Failed-quality workflow passes'),
  @('074','Configure cycle counts, annual inventory, count tolerances and approval of adjustments','Inventory Accountant','Standard','Count procedure and tests'),
  @('075','Configure reordering rules using on-hand, forecast and incoming demand without double ordering','Inventory Planner','Standard','Replenishment scenarios pass'),
  @('076','Reconcile inventory valuation, stock cards and branch quantities after all inventory scenarios','Inventory Accountant','Standard','Inventory control signoff'))},
 @{Code='P7'; Name='Finance, treasury, tax and expenses'; Tasks=@(
  @('077','Design and import Iraqi chart of accounts with account groups and control accounts','Chief Accountant','Localization/configuration','COA approved'),
  @('078','Configure sales, purchase, cash, bank, card, driver and miscellaneous journals with sequences','Chief Accountant','Standard','Journal matrix'),
  @('079','Configure IQD rounding, USD transactions, exchange-rate policy and multi-currency reporting','Chief Accountant','Standard','Currency tests pass'),
  @('080','Configure sales and purchase tax treatment and validate Iraqi statutory requirements with client tax adviser','Tax Accountant','Configuration','Tax signoff; legal advice retained by client'),
  @('081','Configure 3.3% supply and 7% service withholding logic, certificates and reporting where applicable','Technical Lead + Tax Accountant','Localization/custom','Withholding scenarios pass'),
  @('082','Configure AR invoicing, receipts, aging, follow-up, credit notes and branch cash verification','AR Accountant','Standard','AR month simulation'),
  @('083','Configure AP bills, payment schedules, vendor statements, refunds and three-way-match review','AP Accountant','Standard','AP month simulation'),
  @('084','Create a dedicated virtual cash journal/box for each delivery driver','Treasury Accountant','Standard design','Driver journals operational'),
  @('085','Implement driver collection posting from delivered COD order to assigned driver box','Technical Lead','Custom workflow','Collection traceability test'),
  @('086','Implement daily driver statement, counted cash, central-vault transfer and over/short variance approval','Technical Lead','Custom workflow/report','Daily handover signoff test'),
  @('087','Configure branch petty cash, employee advances, settlements, fuel and vehicle expenses','Expense Accountant','Standard','Expense workflows pass'),
  @('088','Configure reconciliation models for recurring fuel, porter, hospitality and branch cost-center coding','Bank Reconciliation Analyst','Standard','Auto-matching sample accuracy accepted'),
  @('089','Configure bank/card statement import format, reconciliation, outstanding accounts and terminal clearing','Bank Reconciliation Analyst','Standard','Bank and card reconciliation test'),
  @('090','Configure analytic plans/accounts for Main, Branch 1, Branch 2, delivery and workshop customization','Chief Accountant','Standard','Analytic allocation tests'),
  @('091','Configure fiscal periods, lock dates, accruals, inventory close, FX revaluation and month-end checklist','Chief Accountant','Standard','Mock close completed'),
  @('092','Validate trial balance, P&L, balance sheet, cash flow, partner ledger, aging, tax and inventory valuation','Chief Accountant','Standard','Financial report signoff'))},
 @{Code='P8'; Name='Reporting and management control'; Tasks=@(
  @('093','Create executive dashboard for consolidated sales, gross margin, cash, receivables, payables and inventory','BI Consultant','Standard dashboard','Owner dashboard accepted'),
  @('094','Create branch profitability view using revenue, COGS, discounts, expenses and analytic allocations','BI Consultant','Standard + report extension','Branch P&L reconciles to GL'),
  @('095','Create inventory control dashboard for on hand, reserved, available, incoming, aging, slow stock and reorder risk','BI Consultant','Standard dashboard','Inventory dashboard accepted'),
  @('096','Create shipment/container tracker for PO value, ETA, received status and landed-cost completion','BI Consultant','Custom report','Shipment tracker accepted'),
  @('097','Create discount and credit-exception dashboard with approval turnaround and overrides','BI Consultant','Custom report','Control dashboard accepted'),
  @('098','Create driver cash dashboard for open collections, handovers, variances and overdue cash','BI Consultant','Custom report','Treasury dashboard accepted'),
  @('099','Configure saved filters and scheduled reports for each executive/accounting/warehouse role','Functional Lead','Standard','Role reporting pack'))},
 @{Code='P9'; Name='Data migration and cutover'; Tasks=@(
  @('100','Approve migration scope, cut-off dates, ownership, reconciliation rules and rollback criteria','Data Lead','Standard','Migration strategy'),
  @('101','Clean and import customers, suppliers, contacts, credit terms and credit limits','Data Lead','Standard','Contact reconciliation'),
  @('102','Clean and import products, variants, RAL/dimensions, barcodes, vendor data and opening prices','Data Lead','Standard','Product reconciliation'),
  @('103','Import opening stock by warehouse/location/variant and reconcile quantities and valuation','Inventory Accountant','Standard','Signed stock reconciliation'),
  @('104','Import open sales orders, purchase orders and in-transit shipments as agreed','Data Lead','Standard','Open-document reconciliation'),
  @('105','Import open AR/AP items, advances, driver balances, petty cash, bank and GL opening balances','Chief Accountant','Standard','Opening trial balance signoff'),
  @('106','Perform at least two full migration rehearsals and record timing, errors and corrections','Data Lead','Standard','Rehearsal reports'),
  @('107','Freeze legacy data, execute final extraction/import and archive signed source files','Project Manager','Standard','Cutover data pack'),
  @('108','Run post-load reconciliation: record counts, stock, subledgers, journals and trial balance','Chief Accountant','Standard','Go-live reconciliation certificate'))},
 @{Code='P10'; Name='Technical development and release assurance'; Tasks=@(
  @('109','Write functional specifications and acceptance criteria for every extension before coding','Functional Lead','Custom governance','Approved specifications'),
  @('110','Create isolated custom addons with manifests, access controls, translations and upgrade-safe inheritance','Development Lead','Custom','Installable modules'),
  @('111','Add automated unit/transaction tests for discount, credit, quality, driver cash and transfer controls','Development Lead','Custom','Automated test evidence'),
  @('112','Review performance and query behavior of cross-branch availability and customer history panels','Technical Lead','Custom','Performance benchmark'),
  @('113','Test Arabic/English labels, RTL rendering, IQD/USD formats and printable documents','QA Lead','Standard + custom','Localization QA report'),
  @('114','Perform code review, security review, dependency check and staging installation/upgrade test','Technical Lead','Custom','Release approval'),
  @('115','Document configuration, custom modules, parameters, support diagnostics and rollback steps','Technical Lead','Custom','Technical runbook'))},
 @{Code='P11'; Name='Training, UAT, go-live and closure'; Tasks=@(
  @('116','Prepare role-based Arabic/English training guides and realistic door-trading exercises','Training Lead','Standard','Training materials'),
  @('117','Train owners on dashboards, approvals, drill-down and exception monitoring','Training Lead','Standard','Owner attendance and assessment'),
  @('118','Train seven accounting roles separately, including prohibited actions and handoffs','Training Lead','Standard','Accounting competency signoff'),
  @('119','Train warehouse specialists on barcode, transfers, quality, dispatch, counts and discrepancies','Training Lead','Standard','Warehouse competency signoff'),
  @('120','Train sales/POS users on attribute search, stock visibility, pricing, customer history and approvals','Training Lead','Standard','Sales competency signoff'),
  @('121','Run conference-room pilot across complete order-to-cash, procure-to-pay and record-to-report cycles','QA Lead','Standard','Pilot issue log'),
  @('122','Run formal UAT with client users, evidence, severity, retest and signed acceptance','Project Manager','Standard','UAT signoff'),
  @('123','Complete go-live readiness review covering data, devices, users, controls, reports and support','Steering Committee','Standard','Go/no-go decision'),
  @('124','Execute production cutover and validate first transactions at all three locations','Project Team','Standard','Day-one validation'),
  @('125','Provide daily hypercare in week one, then agreed review cadence with severity-based SLA','Support Lead','Standard','Hypercare log'),
  @('126','Reconcile first POS closures, driver handovers, stock transfers, bank/card receipts and accounting close','Chief Accountant','Standard','Post-go-live control signoff'),
  @('127','Deliver administrator handover, as-built configuration, source code, test evidence and support runbook','Project Manager','Standard','Handover pack'),
  @('128','Close critical issues, approve deferred backlog and obtain final project acceptance','Sponsor','Standard','Closure certificate'))}
)

$mdOut = Join-Path $outDir 'Odoo_19_Doors_Trading_Implementation_Task_Plan.md'
$md = [Text.StringBuilder]::new()
[void]$md.AppendLine('# Odoo 19 Implementation Task Plan')
[void]$md.AppendLine('')
[void]$md.AppendLine('**Ready-Made Doors, Frames, Hardware and Accessories Trading - Iraq**  ')
[void]$md.AppendLine('Three locations | 17+ core users | Odoo 19 Enterprise  ')
[void]$md.AppendLine('Version 1.0 | 11 July 2026')
[void]$md.AppendLine('')
[void]$md.AppendLine('> Prepared from `standard_tasks.xlsx`, the local Odoo 19 Community/Enterprise source, and a read-only review of the supplied Odoo.sh furniture reference using the `codex_odoo_sh` identity. Reference custom code was deliberately ignored as requested.')
[void]$md.AppendLine('')
[void]$md.AppendLine('## 1. Executive summary')
[void]$md.AppendLine('')
[void]$md.AppendLine('The target is a trading and distribution system, not manufacturing or field installation. Odoo will control imported and locally purchased ready-made doors and components, inventory across three sites, in-house light customization sold as services, showroom POS, wholesale/contractor credit sales, delivery, driver cash, landed costs, quality release, and segregated accounting.')
[void]$md.AppendLine('')
[void]$md.AppendLine('Use Odoo 19 Enterprise standard applications as the transaction and accounting backbone, with a small controlled set of custom addons for requirements that must block, aggregate, secure, or orchestrate across applications. Do not rely on Studio alone for accounting-critical security, posting, or blocking logic.')
[void]$md.AppendLine('')
[void]$md.AppendLine('The furniture reference confirms useful patterns: standard Sales, Purchase, Inventory, POS, Accounting, Quality, Approvals, Expenses, Documents, Dashboards and Landed Costs are installed; it demonstrates multiple POS configurations, multiple cash/driver-style journals, Arabic labels, and separate Color, Size and Height attributes. It has one warehouse, so its physical topology must not be copied: this company requires three warehouses plus transit controls.')
[void]$md.AppendLine('')
[void]$md.AppendLine('## 2. Business and scope boundaries')
[void]$md.AppendLine('')
[void]$md.AppendLine('- Included: imports/local purchases, receipts, storage, transfers, quotations, POS, delivery, returns, light customization charges, quality, landed cost, finance, expenses, driver cash, approvals, dashboards, migration, testing, training and hypercare.')
[void]$md.AppendLine('- Excluded: raw-material manufacturing, BoMs, work orders, MRP costing, construction-site installation, field-service crews, GPS/route optimization and eCommerce unless separately approved.')
[void]$md.AppendLine('- Light customization uses service lines plus controlled workshop/quality statuses. Detailed work-center capacity or consumed-component costing is future scope.')
[void]$md.AppendLine('- Iraqi tax and withholding treatment must be approved in writing by the client chief accountant/tax adviser before production use.')
[void]$md.AppendLine('')
[void]$md.AppendLine('## 3. Target physical and system design')
[void]$md.AppendLine('')
[void]$md.AppendLine('| Area | Target design | Odoo foundation | Required special control |')
[void]$md.AppendLine('|---|---|---|---|')
[void]$md.AppendLine('| Sites | Main Warehouse, Branch 1, Branch 2 | Multi-warehouse Inventory, Barcode, POS | Transit locations and branch-specific permissions |')
[void]$md.AppendLine('| Products | Doors, frames, panels, locks, accessories, glass and services | Products, variants, attributes, pricelists | Independent RAL/color and dimension search |')
[void]$md.AppendLine('| Supply | Foreign containers and local purchasing | Purchase, receipts, bills, landed costs | Shipment tracker and 3-way-match discipline |')
[void]$md.AppendLine('| Demand | Retail POS, wholesale and contractor orders | Sales, POS, invoicing, reservations | Credit/discount approvals and cross-branch stock |')
[void]$md.AppendLine('| Control | Quality, treasury, accounting and executive oversight | Quality, Accounting, Expenses, Dashboards | Mandatory release block and driver handover |')
[void]$md.AppendLine('')
[void]$md.AppendLine('## 4. Standard versus customization decision')
[void]$md.AppendLine('')
[void]$md.AppendLine('| Requirement | Treatment | Rationale |')
[void]$md.AppendLine('|---|---|---|')
$decisionsMd=@(
 @('Variants, RAL/size attributes, quantities, incoming and forecast','Standard foundation + custom search/panel','Core data is standard; separated filters and consolidated branch presentation need tailored UI.'),
 @('Quantity discounts','Standard pricelists','Minimum-quantity rules cover the agreed tiers.'),
 @('Discount and credit approvals','Custom chained approval','Freeze transaction and require AR then one Owner with audit evidence.'),
 @('Quality checks','Enterprise Quality + custom release block','Checks are standard; absolute delivery/POS enforcement requires extension.'),
 @('Landed costs and FX','Standard','Configure and reconcile standard accounting/inventory capabilities.'),
 @('Fast transfer manifest','Barcode + custom manifest action','Keep standard transfers as truth while removing line-by-line receipt entry.'),
 @('Customer 360 and branch stock','Custom read-only panels','Information spans partner, accounting, sales, POS and inventory.'),
 @('Driver cash boxes','Cash journals + custom COD/handover','Journals hold balances; delivery linkage, counted handover and variance need workflow.'),
 @('Expense matching','Standard reconciliation models','Recurring descriptions can propose accounts and analytic dimensions.'),
 @('Light customization','Service products + small workflow','Avoid MRP while ensuring charge capture and quality status.'))
foreach($d in $decisionsMd){[void]$md.AppendLine("| $($d[0]) | $($d[1]) | $($d[2]) |")}
[void]$md.AppendLine('')
[void]$md.AppendLine('## 5. Delivery gates')
[void]$md.AppendLine('')
foreach($g in @('Gate 0 - Scope and governance approved.','Gate 1 - Discovery and fit-gap blueprint signed.','Gate 2 - Foundation, security and master-data design accepted.','Gate 3 - Configured prototype and custom specifications approved.','Gate 4 - System testing and migration rehearsal pass.','Gate 5 - Role training and formal UAT signed.','Gate 6 - Go-live readiness and opening reconciliations approved.','Gate 7 - Hypercare closed and handover accepted.')){[void]$md.AppendLine("- $g")}
[void]$md.AppendLine('')
[void]$md.AppendLine('Acceptance requires configured evidence, tests, reconciliations, negative-access tests where relevant, issue closure and named client approval. A demonstration alone is not acceptance.')
[void]$md.AppendLine('')
[void]$md.AppendLine('## 6. Detailed implementation task register')
[void]$md.AppendLine('')
[void]$md.AppendLine('Each row is a deliverable-bearing task. “Extension” includes Studio only where safe; accounting-critical, blocking, security and cross-application logic requires a version-controlled addon. Dependencies follow phase order unless an approved project plan records overlap.')
foreach($p in $phases){
 [void]$md.AppendLine('');[void]$md.AppendLine("### $($p.Code) - $($p.Name)");[void]$md.AppendLine('')
 [void]$md.AppendLine('| ID | Task | Responsible | Treatment | Deliverable / acceptance evidence |');[void]$md.AppendLine('|---:|---|---|---|---|')
 foreach($x in $p.Tasks){[void]$md.AppendLine("| $($x[0]) | $($x[1]) | $($x[2]) | $($x[3]) | $($x[4]) |")}
}
[void]$md.AppendLine('');[void]$md.AppendLine('## 7. Minimum end-to-end UAT scenarios');[void]$md.AppendLine('')
$uats=@('Retail POS cash sale with door, frame, accessory and trimming; correct tier price; passed quality; receipt and stock/accounting postings.','Wholesale order for 15 doors sourced across branches; 10% tier, reservation, transfer, delivery and invoice.','Excess discount and credit breach; quotation frozen; AR then Owner approval; rejection and timeout paths.','Foreign USD container purchase, partial receipt, freight/customs/clearance/offloading landed costs, bill match and FX payment.','Manifest-driven Main-to-Branch transfer with dispatch to transit, scan at receipt and discrepancy.','Failed paint/warp inspection moves stock to quarantine and blocks delivery/POS until passed recheck.','COD delivery posts to the assigned driver box; counted handover transfers to central vault; over/short variance is recorded.','Customer 360 shows six-month variant history, invoices, spend, open debt and credit limit.','Bank/card import and reconciliation model proposes expense account, branch and analytic coding.','Mock close reconciles valuation, landed cost, POS, driver cash, AR/AP, bank, tax, trial balance and branch P&L.')
foreach($x in $uats){[void]$md.AppendLine("- $x")}
[void]$md.AppendLine('');[void]$md.AppendLine('## 8. Role-based training');[void]$md.AppendLine('')
[void]$md.AppendLine('| Audience | Curriculum | Evidence |');[void]$md.AppendLine('|---|---|---|')
[void]$md.AppendLine('| Owners/directors | Dashboards, branch P&L, cash, approvals, drill-down and exceptions | Attendance and approval exercises |')
[void]$md.AppendLine('| Seven finance roles | Role-specific transactions, handoffs, reconciliations, close and prohibited actions | Separate competency checklist per role |')
[void]$md.AppendLine('| Three inventory specialists | Receipts, barcode transfers, quality, quarantine, dispatch and counts | Practical warehouse scenarios |')
[void]$md.AppendLine('| Sales/POS users | RAL/dimension search, branch stock, pricing, add-ons, customer history, credit and returns | POS and quotation exercises |')
[void]$md.AppendLine('| Administrators/key users | Users, safe configuration, master-data governance, diagnostics and escalation | Administrator handover signoff |')
[void]$md.AppendLine('');[void]$md.AppendLine('## 9. Client inputs required');[void]$md.AppendLine('')
foreach($x in @('Legal company/tax details, approved Iraqi chart of accounts, and written tax/withholding treatment.','Named users, job descriptions, emails, branch assignment, approval limits and backups.','Products/variants with Arabic/English names, RAL/finish, dimensions, SKU/barcode, category, cost, price and supplier data.','Opening stock by site/variant, open orders, AR/AP, employee advances, driver cash, petty cash, banks and opening trial balance.','Approved quality criteria, price tiers, add-on prices, credit/discount authority, return policy and driver handover policy.','POS/scanner hardware, card settlement process, bank statement formats, labels, invoices and receipt samples.')){[void]$md.AppendLine("- $x")}
[void]$md.AppendLine('');[void]$md.AppendLine('## 10. Key risks and controls');[void]$md.AppendLine('')
[void]$md.AppendLine('| Risk | Control | Owner |');[void]$md.AppendLine('|---|---|---|')
[void]$md.AppendLine('| Variant explosion and slow/confusing search | Attribute governance, valid-combination policy and POS performance test | Product Data Owner |')
[void]$md.AppendLine('| Over-customization | Signed fit-gap, configuration-first design and extension review gate | Steering Committee |')
[void]$md.AppendLine('| Accounting segregation gaps | Least privilege, scoped custom rules and negative-access testing | Chief Accountant |')
[void]$md.AppendLine('| Incorrect Iraqi tax/withholding | Written client/tax-adviser validation and scenario signoff | Tax Accountant |')
[void]$md.AppendLine('| Opening data does not reconcile | Two rehearsals, frozen files and signed reconciliation | Data Lead |')
[void]$md.AppendLine('| Quality or cash controls bypassed | Hard blocks, audit logs, controlled exceptions and monitoring | Operations/Finance |')
[void]$md.AppendLine('');[void]$md.AppendLine('## 11. Assumptions and exclusions');[void]$md.AppendLine('')
foreach($x in @('One Iraqi legal company with three warehouses/branches; multi-company would change accounting, security and reporting scope.','Odoo 19 Enterprise and Odoo.sh are available; licenses, hardware, banks and third-party services are commercial items unless explicitly included.','No MRP, raw-material planning, work centers, field installation, GPS, route optimization or eCommerce.','Historical transaction migration is limited to an agreed period or summarized openings; full legacy history needs separate profiling.','Effort and calendar estimates follow discovery, data profiling and signed custom specifications; this document defines work, not commercial duration.','Furniture-reference custom addons and master data will not be copied without separate specification, review and approval.')){[void]$md.AppendLine("- $x")}
[void]$md.AppendLine('');[void]$md.AppendLine('## 12. Final acceptance checklist');[void]$md.AppendLine('')
foreach($x in @('All 126 tasks are completed, formally deferred or removed through approved change control.','No Severity 1 or 2 issue remains open; accepted lower-severity items have owners and dates.','Security, quality release, discount/credit approval, driver cash and transfer controls pass positive and negative tests.','Opening stock, AR, AP, cash/bank and trial balance reconcile to signed cutover files.','Role training, UAT, go-live readiness, first-live transactions and administrator handover are signed.','Source code, as-built configuration, migration pack, test evidence and support runbook are delivered.')){[void]$md.AppendLine("- [ ] $x")}
[void]$md.AppendLine('');[void]$md.AppendLine('## Appendix A - Inventory configuration register');[void]$md.AppendLine('')
[void]$md.AppendLine('This register must be completed in staging, approved by the Inventory Accountant and Inventory Lead, then repeated in production during cutover. **Value** is the required decision for this business; `Confirm` means the client must select a value before configuration freeze; `N/A` means deliberately leave disabled/not installed and record the reason.')
[void]$md.AppendLine('')
[void]$md.AppendLine('| ID | Odoo area / menu | Setting or record | Required value / decision | Owner | Acceptance test |')
[void]$md.AppendLine('|---:|---|---|---|---|---|')
$inventoryConfig=@(
 @('INV-01','Apps','Inventory, Barcode, Purchase Stock, Sale Stock','Install and version-lock in staging and production','Technical Lead','All apps installed; menu access only to intended groups'),
 @('INV-02','Apps','Quality','Install Enterprise Quality; activate quality checks and alerts','Technical Lead','Quality Check and Quality Alert menus available'),
 @('INV-03','Inventory > Configuration > Settings','Storage Locations / Multi-Locations','Enable. Required for three warehouses, transit, quarantine, input and output locations','Inventory Lead','Locations can be selected on transfers and reports'),
 @('INV-04','Inventory > Configuration > Settings','Multi-Warehouses','Enable; create Main, Branch 1 and Branch 2 under the same company','Inventory Lead','On-hand report splits correctly by all three warehouses'),
 @('INV-05','Inventory > Configuration > Settings','Barcode Scanner','Enable Barcode and choose agreed nomenclature; use Odoo-supported scanners','Inventory Lead','Scan opens/updates product or transfer reliably'),
 @('INV-06','Inventory > Configuration > Settings','Packages','Enable only if doors/accessories are moved in labelled bundles or cartons; otherwise N/A','Inventory Lead','If enabled, package transfer retains contents and traceability'),
 @('INV-07','Inventory > Configuration > Settings','Lots / Serial Numbers','Confirm by product family. Default N/A for normal door variants; enable lots only where supplier batch/warranty traceability is required','Inventory Lead','Selected family requires and traces supplier lot; normal products do not create noise'),
 @('INV-08','Inventory > Configuration > Settings','Consignment','N/A unless the company sells supplier-owned stock; do not enable by default','Chief Accountant','Written N/A decision or consignment scenario tested'),
 @('INV-09','Inventory > Configuration > Settings','Dropshipping','N/A because responsibility ends on company delivery/handover and normal inventory control is required; enable only under approved exception','Sales + Inventory Leads','No unapproved drop-ship route is selectable'),
 @('INV-10','Inventory > Configuration > Settings','Cross-Docking','N/A initially; use normal receipt then transfer so quality and receipt control are never bypassed','Inventory Lead','Inbound goods remain unavailable until receipt/quality completion'),
 @('INV-11','Inventory > Configuration > Settings','Advanced Routes','Enable only the routes needed for warehouse replenishment and transit; avoid unused routes','Inventory Consultant','No unintended routes appear on normal products'),
 @('INV-12','Inventory > Configuration > Settings','Warnings','Enable inventory warnings for insufficient/negative stock and configure manager escalation','Inventory Lead','Attempted negative issue produces the agreed warning/block'),
 @('INV-13','Inventory > Configuration > Warehouses','Main Warehouse','Code `MAIN`; receipt: Confirm 1-step or Input > Quality > Stock; delivery: Pick > Quality Gate > Output/Ship as needed','Inventory Lead','Receipt and delivery operations match signed physical flow'),
 @('INV-14','Inventory > Configuration > Warehouses','Branch 1','Code `B1`; own stockroom, POS picking type, incoming transfer receipt and customer delivery/handover operation','Inventory Lead','Branch 1 POS and transfers affect only B1 stock'),
 @('INV-15','Inventory > Configuration > Warehouses','Branch 2','Code `B2`; own stockroom, POS picking type, incoming transfer receipt and customer delivery/handover operation','Inventory Lead','Branch 2 POS and transfers affect only B2 stock'),
 @('INV-16','Inventory > Configuration > Locations','Transit','Create shared internal Transit location between Main/B1/B2; no sales reservation from Transit','Inventory Lead','Dispatch reduces origin, transit holds quantity, receipt increases destination'),
 @('INV-17','Inventory > Configuration > Locations','Quality / Quarantine','Create separate internal Quarantine location per Main and branch or a controlled shared quarantine; excluded from sellable stock','Quality Lead','Failed item cannot be reserved/sold/delivered'),
 @('INV-18','Inventory > Configuration > Locations','Damaged, Scrap and Returns','Create and document controlled destinations; scrap requires reason and approval','Inventory Accountant','Scrap/return postings reconcile and are not sellable'),
 @('INV-19','Inventory > Configuration > Locations','Input, Stock and Output','Name physical zones consistently; restrict each warehouse specialist to intended locations','Inventory Lead','Location-aware reports match physical zones'),
 @('INV-20','Inventory > Configuration > Operation Types','Receipts','Separate Main import/local receipt type; require PO source, responsible user, scheduled date and quality point','Warehouse Specialist','Receipt from PO creates correct stock and quality checks'),
 @('INV-21','Inventory > Configuration > Operation Types','Internal Transfers','Use Main-to-Branch and Branch-to-Main operation types with transit, sequences and barcode manifest','Warehouse Specialist','Origin, transit and destination balances reconcile at each state'),
 @('INV-22','Inventory > Configuration > Operation Types','Customer Deliveries','Assign driver, customer, delivery address, quality state and COD expectation; block validation when quality is pending/failed','Warehouse Specialist','Negative test proves delivery cannot validate before pass'),
 @('INV-23','Inventory > Configuration > Operation Types','Returns','Create return routes to inspection/quarantine, not direct saleable stock','Quality Lead','Returned door is inspected before it becomes available'),
 @('INV-24','Inventory > Configuration > Operation Types','Sequences and documents','Separate readable sequences for receipts, transfers, delivery orders, returns and inventory adjustments','Inventory Lead','Every movement is uniquely traceable on printed/digital document'),
 @('INV-25','Inventory > Products > Categories','Category tree','Doors, Frames, Panels, Locks, Accessories, Glass, Customization Services, Freight/Customs/Offloading','Product Data Owner','Every product maps to exactly one approved category'),
 @('INV-26','Inventory > Products > Categories','Costing method','Select **AVCO** for imported, interchangeable door stock unless Finance formally approves FIFO by category; never mix without policy','Inventory Accountant','Test two receipts at different costs and verify expected valuation'),
 @('INV-27','Inventory > Products > Categories','Inventory valuation','Set **Automated** valuation for stockable categories; services/non-stock use normal expense/revenue accounting','Chief Accountant','Receipt/delivery create correct valuation and COGS entries'),
 @('INV-28','Inventory > Products > Categories','Stock accounts','Map stock valuation, stock input, stock output, price difference, COGS and inventory adjustment accounts by category','Inventory Accountant','Journal entries hit approved accounts for receipt, delivery, return and adjustment'),
 @('INV-29','Inventory > Products','Product type','Doors, frames, panels, locks and accessories = Goods/stockable; trimming, drilling, glazing and spraying = Service','Product Data Owner','Service sale does not create stock movement; goods do'),
 @('INV-30','Inventory > Products > Attributes','Color / RAL','Create a dedicated Color/RAL attribute and normalized RAL code field; preserve Arabic/English display names','Product Data Owner','Search returns all matching RAL products without dimension clutter'),
 @('INV-31','Inventory > Products > Attributes','Dimensions','Create separate Width, Height and Frame Size attributes/fields; avoid one free-text mixed measurement field','Product Data Owner','Sales user filters standard frame then width/height independently'),
 @('INV-32','Inventory > Products > Attributes','Variant policy','Generate only valid purchasable/sellable combinations; archive invalid combinations; establish naming/SKU formula','Product Data Owner','No invalid combination can be sold or imported'),
 @('INV-33','Inventory > Products','UoM, packaging and barcode','Door unit = Units; define packs/cartons only where physically used; one barcode per sellable variant','Product Data Owner','Barcode scan selects exact variant and UoM'),
 @('INV-34','Inventory > Products','Vendor data','Record supplier reference, lead time, currency, min quantity, packaging and last/contract price','Purchase Lead','RFQ selects expected supplier and price'),
 @('INV-35','Inventory > Products','Reordering rules','Create only for proven replenishment items; use warehouse-specific min/max and supplier lead time; exclude slow bespoke variants','Inventory Planner','Forecast produces a sensible RFQ without duplicate demand'),
 @('INV-36','Inventory > Products','Sales availability','Use on hand, reserved, forecast and incoming fields; expose custom cross-branch panel read-only in Sales/POS','Sales Lead','Panel reconciles to stock report for all sites'),
 @('INV-37','Inventory > Operations > Transfers','Reservation policy','Confirm when stock is reserved: quotation, confirmed order or picking; recommended confirmed order only','Sales + Inventory Leads','Two concurrent orders cannot promise the same available quantity'),
 @('INV-38','Inventory > Operations > Transfers','Partial and backorder policy','Allow partial delivery only with customer approval; generate traceable backorder and retain reservation rules','Sales Lead','Partial delivery leaves correct open quantity and invoice status'),
 @('INV-39','Inventory > Operations > Transfers','Rapid transfer manifest','Custom manifest must reference the underlying transfer, scan/batch validate destination and capture discrepancies','Technical Lead','A branch receipt is faster than line entry but retains full movement audit'),
 @('INV-40','Quality > Quality Control','Receipt quality points','Create checks by product category/family: dimensions, finish, warping, accessories, glass and count','Quality Lead','Receipt generates all required checks'),
 @('INV-41','Quality > Quality Control','Pre-delivery/POS quality points','Create delivery and POS handover checks; define required photos/notes for failures','Quality Lead','Picking/POS handover produces required check'),
 @('INV-42','Custom addon + Quality','Release block','Block delivery validation and POS handover while any required check is pending/failed; provide manager-only controlled disposition','Technical Lead','Pending and failed negative tests pass; pass releases item'),
 @('INV-43','Inventory > Operations > Physical Inventory','Cycle count policy','Define ABC/count frequency, count owners, freeze/adjustment policy, variance threshold and approval','Inventory Accountant','Count adjustment posts only after required approval'),
 @('INV-44','Inventory > Reporting','Operational reports','Validate On Hand, Forecasted, Moves History, Valuation, Aging/slow stock, Replenishment and branch comparison','Inventory Accountant','Each report reconciles to a controlled sample'),
 @('INV-45','Security','Warehouse permissions','Warehouse specialists can operate assigned location; sales can see cross-branch availability but cannot validate unassigned movements','Technical Lead','Positive and negative access matrix passes'),
 @('INV-46','Cutover','Opening stock','Import by product variant and warehouse/location with quantity, cost, lot where applicable and signed count source','Inventory Accountant','Opening quantity and valuation reconcile by warehouse and total')
)
foreach($r in $inventoryConfig){[void]$md.AppendLine("| $($r[0]) | $($r[1]) | $($r[2]) | $($r[3]) | $($r[4]) | $($r[5]) |")}
[void]$md.AppendLine('');[void]$md.AppendLine('## Appendix B - Accounting configuration register');[void]$md.AppendLine('')
[void]$md.AppendLine('The Chief Accountant owns the final accounting design. No tax, withholding, chart-of-account, currency or opening-balance configuration is accepted without written accountant approval and reconciliation evidence.')
[void]$md.AppendLine('')
[void]$md.AppendLine('| ID | Odoo area / menu | Setting or record | Required value / decision | Owner | Acceptance test |')
[void]$md.AppendLine('|---:|---|---|---|---|---|')
$accountingConfig=@(
 @('ACC-01','Accounting > Configuration > Settings','Fiscal Localization and Fiscal Country','Iraq; select/import approved Iraqi localization or approved custom COA before postings. Do not reload localization after live postings without controlled project','Chief Accountant','Company fiscal country, taxes and COA approved'),
 @('ACC-02','Accounting > Configuration > Chart of Accounts','Chart design','Create account groups and code ranges for assets, liabilities, equity, income, COGS, operating expenses, financial income/expense and control accounts','Chief Accountant','Trial balance groups are complete and signed'),
 @('ACC-03','Accounting > Configuration > Chart of Accounts','Control accounts','Define AR, AP, inventory valuation, stock input/output, price difference, cash, bank, card clearing, driver cash, advances, tax and FX accounts','Chief Accountant','Posting matrix maps each transaction to approved controls'),
 @('ACC-04','Accounting > Configuration > Settings','Company currency','IQD as company currency; set currency rounding after accountant confirmation and lock decision before transactions','Chief Accountant','IQD invoices, POS and entries round as approved'),
 @('ACC-05','Accounting > Configuration > Currencies','USD','Activate USD for suppliers/imports; set rate source, manual override authority, effective-date policy and approval evidence','AP Accountant','USD bill/payment and revaluation use approved rates'),
 @('ACC-06','Accounting > Configuration > Settings','Exchange difference','Configure exchange-difference journal plus gain/loss accounts; test realization and period-end revaluation','Chief Accountant','FX settlement and revaluation post to approved accounts'),
 @('ACC-07','Accounting > Configuration > Taxes','Default sales/purchase taxes','Set defaults only after tax-policy approval; explicitly decide tax-included versus tax-excluded pricing','Tax Accountant','New product/invoice receives correct default tax'),
 @('ACC-08','Accounting > Configuration > Taxes','Tax rounding','Select per-line or global rounding based on invoice/POS legal display requirement; document decision','Tax Accountant','Invoice/POS sample totals match approved calculation'),
 @('ACC-09','Accounting > Configuration > Taxes','Cash-basis taxes','N/A by default unless Iraqi tax adviser requires it; if enabled configure dedicated cash-basis journal/accounts','Tax Accountant','Written N/A decision or cash-basis test passes'),
 @('ACC-10','Accounting > Configuration > Taxes','Fiscal positions','Create only approved domestic/export/exempt or special customer/vendor mappings; do not create generic unverified rules','Tax Accountant','Customer/vendor scenario maps taxes/accounts correctly'),
 @('ACC-11','Accounting > Configuration > Taxes','Withholding','Implement 3.3% supplies/doors and 7% services only after legal confirmation; create tax, payable/receivable accounts, certificates and reports; custom extension if standard behavior cannot meet requirement','Tax Accountant + Technical Lead','Supply and service scenarios calculate, post and report correctly'),
 @('ACC-12','Accounting > Configuration > Journals','Sales journal','Create sales invoice/credit-note sequence and default income/AR handling; do not allow sales staff journal changes','AR Accountant','Invoice and refund sequence/accounting correct'),
 @('ACC-13','Accounting > Configuration > Journals','Purchase journal','Create vendor-bill/refund sequence; enforce bill reference/duplicate control and AP review','AP Accountant','Vendor bill/refund is traceable and duplicate warning works'),
 @('ACC-14','Accounting > Configuration > Journals','Inventory valuation journal','Use dedicated automated inventory valuation journal; restrict posting access','Inventory Accountant','Stock receipt/delivery entries post automatically'),
 @('ACC-15','Accounting > Configuration > Journals','Landed cost journal','Configure default landed-cost journal and service-product expense/clearing accounts','Inventory Accountant','Freight/customs/offloading allocation posts and reconciles'),
 @('ACC-16','Accounting > Configuration > Journals','Cash journals','Create central vault and separate controlled branch cash journals; map each to distinct GL account and sequence','Treasury Accountant','Cash movement and closing balance reconcile per journal'),
 @('ACC-17','Accounting > Configuration > Journals','Driver cash journals','Create one virtual cash journal per driver, separate GL/analytic tracking and restricted access','Treasury Accountant','COD is assigned to correct driver box and cannot be mixed'),
 @('ACC-18','Accounting > Configuration > Journals','Bank journals','Create each bank account with account number, currency, outstanding receipts/payments accounts, import format and sequence','Bank Reconciliation Analyst','Statement import and payment reconciliation work'),
 @('ACC-19','Accounting > Configuration > Journals','Card-terminal clearing','Create card clearing journal/account per terminal or branch; define settlement timing, fees and variance handling','Bank Reconciliation Analyst','POS card sale, settlement and fee reconcile'),
 @('ACC-20','Point of Sale > Configuration','POS accounting','Map each branch POS to correct sales journal, cash/card payment methods, receivable account, cash control and stock location','POS Consultant','POS closing reconciles to cash/card/receivable and stock'),
 @('ACC-21','Accounting > Configuration > Payment Terms','Customer payment terms','Create cash, COD, credit and contractor terms; align overdue policy and credit limit logic','AR Accountant','Invoice due date and credit warning behave correctly'),
 @('ACC-22','Accounting > Configuration > Payment Terms','Vendor payment terms','Create foreign/local supplier terms and payment calendar rules','AP Accountant','Bill due dates support payment schedule'),
 @('ACC-23','Accounting > Customers','Customer credit controls','Set limits, overdue threshold, exception workflow and responsible AR approver; custom block for required series approval','AR Accountant + Technical Lead','Order over limit cannot confirm without approved sequence'),
 @('ACC-24','Accounting > Vendors / Purchase','Three-way matching','Enable/control PO, receipt and bill matching with documented quantity/price tolerance and exception approver','AP Accountant','Partial receipt/bill variance triggers agreed review'),
 @('ACC-25','Accounting > Accounting > Payments','Inbound payment methods','Configure cash, bank, card clearing, driver COD and customer account methods with correct outstanding accounts','AR Accountant','Payment reaches correct journal and reconciles invoice'),
 @('ACC-26','Accounting > Accounting > Payments','Outbound payment methods','Configure bank, cash and USD supplier payment methods with approval separation','AP Accountant','Vendor payment reduces AP and reconciles bank/cash'),
 @('ACC-27','Accounting > Accounting > Bank','Reconciliation models','Create rules for Fuel, Porter, Hospitality, bank fees, card fees and recurring descriptions; assign account, tax, analytic distribution and branch','Bank Reconciliation Analyst','Controlled sample reaches target accuracy; exceptions stay unreconciled'),
 @('ACC-28','Accounting > Accounting > Bank','Bank/card reconciliation','Define statement import frequency, auto-match rules, manual-review threshold, owner and daily/weekly reconciliation SLA','Bank Reconciliation Analyst','Bank and terminal clearing reconcile to statements'),
 @('ACC-29','Expenses','Employee advances and petty cash','Configure expense products, employee advance/settlement flow, approvers, payment journals and branch analytics','Expense Accountant','Advance, receipt and settlement reconcile to employee/GL'),
 @('ACC-30','Expenses','Operational expense coding','Create controlled products/categories for fuel, porter, hospitality, vehicle maintenance and workshop costs; set default accounts/analytics','Expense Accountant','New expense posts to approved account/branch'),
 @('ACC-31','Accounting > Configuration > Analytic Accounting','Analytic plan','Enable analytic accounting; create mandatory Branch/Location plan: Main, Branch 1, Branch 2, Delivery, Customization Workshop','Chief Accountant','Revenue/COGS/expense sample carries expected analytic distribution'),
 @('ACC-32','Accounting > Configuration > Analytic Accounting','Analytic distribution policy','Set defaults on journals, products and expense types; define exception approval so branch P&L is reliable','Chief Accountant','Branch P&L ties to GL after allocation'),
 @('ACC-33','Accounting > Configuration > Settings','Lock dates','Set tax lock, period lock and hard lock policy; only Chief Accountant changes locks after close','Chief Accountant','Attempted posting before lock is blocked for non-authorized user'),
 @('ACC-34','Accounting > Configuration > Settings','Secure posted entries / audit trail','Enable applicable audit protection and restrict cancellation/editing of posted moves; define credit-note/reversal method','Chief Accountant','Posted-entry edit/cancel negative tests pass'),
 @('ACC-35','Accounting > Configuration > Settings','Invoice display/document policy','Configure Arabic/English templates, logo, legal footer, tax display, payment terms, delivery address and amount-in-words if required','AR Accountant','Approved invoice, credit note and vendor bill print samples'),
 @('ACC-36','Accounting > Assets','Fixed assets','Configure only if vehicles, IT, showroom fixtures or other capital assets are in scope; otherwise mark N/A and document','Chief Accountant','Written N/A decision or depreciation test passes'),
 @('ACC-37','Accounting > Configuration > Settings','Early payment discounts','N/A unless a formal supplier/customer policy exists; configure discount accounts/taxes if enabled','Chief Accountant','Written N/A decision or early-payment test passes'),
 @('ACC-38','Accounting > Configuration > Settings','Batch payments / check printing / SEPA','N/A unless used by local banks; do not enable European payment tools solely because they exist in Odoo','AP Accountant','Written N/A decision or bank-format test passes'),
 @('ACC-39','Accounting > Reporting','Financial reports','Validate Trial Balance, P&L, Balance Sheet, General Ledger, AR/AP Aging, Partner Ledger, Tax Report, Cash Flow and Journal Audit','Chief Accountant','Reports reconcile to controlled transaction set'),
 @('ACC-40','Accounting > Reporting','Branch profitability','Use analytic plan and approved allocation rules; custom report/dashboard may aggregate inventory COGS, discounts and expenses','Chief Accountant','Branch P&L ties to GL and inventory valuation'),
 @('ACC-41','Accounting > Operations','Month-end checklist','Close POS, driver boxes, petty cash, card clearing, bank, AR/AP, inventory valuation, landed costs, FX and taxes before lock','Chief Accountant','Mock close completed with signed reconciliations'),
 @('ACC-42','Migration','Opening balances','Import AR/AP open items, GL, cash/bank, driver balances, advances and stock valuation under signed cutover mapping','Chief Accountant','Opening trial balance and subledgers reconcile'),
 @('ACC-43','Security','Finance segregation','AR/AP/treasury/inventory cost/tax/bank/chief roles use least privilege; no accountant changes another role’s controlled ledger without authorized group','Technical Lead + Chief Accountant','Negative access test matrix passes'),
 @('ACC-44','Go-live','First-day finance controls','Reconcile first POS session, first COD collection/handover, first transfer, first receipt/bill, first bank/card receipt and first invoice','Chief Accountant','Day-one control signoff')
)
foreach($r in $accountingConfig){[void]$md.AppendLine("| $($r[0]) | $($r[1]) | $($r[2]) | $($r[3]) | $($r[4]) | $($r[5]) |")}
[IO.File]::WriteAllText($mdOut,$md.ToString(),[Text.UTF8Encoding]::new($false))
Write-Output $mdOut
exit 0

# Generate through styled HTML and LibreOffice for deterministic pagination on large task tables.
function HE($s) { [System.Net.WebUtility]::HtmlEncode([string]$s) }
$htmlPath = Join-Path $outDir 'odoo_plan_source.html'
$sb = [Text.StringBuilder]::new()
[void]$sb.Append(@'
<!DOCTYPE html><html><head><meta charset="utf-8"><style>
@page { size: Letter; margin: 0.7in 0.65in; }
body { font-family: Calibri, Arial, sans-serif; font-size: 10.5pt; line-height: 1.18; color:#1f2933; }
h1 { color:#2E74B5; font-size:16pt; margin:16pt 0 8pt; page-break-after:avoid; }
h2 { color:#2E74B5; font-size:13pt; margin:12pt 0 6pt; page-break-after:avoid; }
p { margin:0 0 6pt; } ul { margin:3pt 0 8pt 18pt; } li { margin-bottom:3pt; }
.cover { text-align:center; padding-top:1.4in; page-break-after:always; }
.cover h1 { font-size:27pt; margin-bottom:16pt; }.cover h2{font-size:18pt;color:#4f4f4f}.meta{color:#666}.note{font-style:italic;margin-top:24pt}
table { width:100%; border-collapse:collapse; margin:5pt 0 10pt; font-size:8.3pt; page-break-inside:auto; }
thead { display:table-header-group; } tr { page-break-inside:avoid; }
th { background:#2E74B5; color:white; font-weight:bold; padding:5pt; border:0.5pt solid #9ca3af; text-align:left; }
td { padding:4.5pt; border:0.5pt solid #b8c0c8; vertical-align:middle; }
.id{width:5%}.task{width:42%}.owner{width:14%}.treatment{width:15%}.deliverable{width:24%}
</style></head><body>
'@)
[void]$sb.Append('<div class="cover"><h1>Odoo 19 Implementation Task Plan</h1><h2>Ready-Made Doors, Frames, Hardware and Accessories Trading - Iraq</h2><p>Three locations | 17+ core users | Sales, POS, Inventory, Purchase, Quality and Finance</p><p class="meta">Version 1.0 | 11 July 2026 | Planning baseline for discovery and implementation</p><p class="note">Prepared from standard_tasks.xlsx, the local Odoo 19 Community/Enterprise source, and a read-only review of the supplied Odoo.sh furniture reference database using the codex_odoo_sh identity. Custom code in that reference was deliberately not treated as a requirements baseline.</p></div>')
[void]$sb.Append('<h1>1. Executive summary</h1><p>The target solution is a trading and distribution system, not a manufacturing or field-installation system. Odoo will control imported and locally purchased ready-made doors and components, inventory across three physical sites, light in-house customization sold as services, showroom POS, wholesale/contractor credit sales, delivery, driver cash, landed cost, quality release, and segregated accounting.</p><p>The recommended approach is Odoo 19 Enterprise with standard applications as the accounting and operational backbone, plus a small, controlled set of custom addons for requirements that must block, aggregate or orchestrate transactions across applications. Studio alone should not be used for accounting-critical security or blocking logic.</p><p>The furniture reference supports this direction: standard Sales, Purchase, Inventory, POS, Accounting, Quality, Approvals, Expenses, Documents, Dashboards and Landed Costs are installed; it also demonstrates multiple POS configurations, multiple cash/driver-style journals, Arabic labels and separate Color, Size and Height attributes. It has only one warehouse, so its topology must not be copied; this design requires three warehouses and transit controls.</p>')
[void]$sb.Append('<h1>2. Business and solution boundaries</h1><ul><li>Included: import/local purchasing, warehousing, internal transfers, sales, POS, delivery handover, returns, light customization charges, quality, accounting, landed cost, expenses, driver cash, approvals and dashboards.</li><li>Excluded: raw-material manufacturing, bills of materials, work orders, MRP costing, construction-site installation, field-service dispatch and engineering crews.</li><li>Light customization is handled as service lines and controlled workshop/quality statuses. Detailed capacity or work-center planning is future scope.</li><li>Iraqi tax and withholding configuration requires written validation by the client chief accountant/tax adviser.</li></ul>')
[void]$sb.Append('<h1>3. Standard-versus-extension decision</h1><table><thead><tr><th>Requirement</th><th>Recommended treatment</th><th>Reason</th></tr></thead><tbody>')
$decisions=@(
 @('Variants, RAL/size attributes, quantities, incoming and forecast','Standard foundation + custom search/panel','Core data is standard; separated filters and consolidated branch presentation need tailored UI.'),
 @('Quantity discounts','Standard pricelists','Minimum-quantity rules cover the agreed tiers.'),
 @('Discount and credit approvals','Custom chained approval','Freeze transaction and require AR then one Owner with audit evidence.'),
 @('Quality checks','Enterprise Quality + custom release block','Checks are standard; absolute delivery/POS enforcement requires extension.'),
 @('Landed costs and FX','Standard','Configure and reconcile standard accounting/inventory capabilities.'),
 @('Fast transfer manifest','Barcode + custom manifest action','Keep standard transfers as truth; remove line-by-line receipt entry.'),
 @('Customer 360 and branch stock','Custom read-only panels','Information spans accounting, sales, POS and inventory.'),
 @('Driver cash boxes','Cash journals + custom COD/handover','Journals hold balances; delivery assignment, counted handover and variance need workflow.'),
 @('Expense matching','Standard reconciliation models','Recurring descriptions can propose accounts and analytics.'),
 @('Light customization','Service products + small workflow','Avoid MRP while guaranteeing price capture and quality status.'))
foreach($d in $decisions){[void]$sb.Append("<tr><td>$(HE $d[0])</td><td>$(HE $d[1])</td><td>$(HE $d[2])</td></tr>")};[void]$sb.Append('</tbody></table>')
[void]$sb.Append('<h1>4. Delivery gates and acceptance</h1><ul><li>Gate 0: scope and governance approved.</li><li>Gate 1: discovery and fit-gap blueprint signed.</li><li>Gate 2: foundation, security and master-data design accepted.</li><li>Gate 3: configured prototype and custom specifications approved.</li><li>Gate 4: testing and migration rehearsal pass.</li><li>Gate 5: training and UAT signed.</li><li>Gate 6: go-live readiness and opening reconciliations approved.</li><li>Gate 7: hypercare closed and handover accepted.</li></ul><p>Acceptance requires configured evidence, tests, reconciliations, negative-access checks where relevant, issue closure and named client approval.</p>')
[void]$sb.Append('<h1>5. Detailed implementation task register</h1><p>Each item is a deliverable-bearing task. “Extension” includes Studio only where safe; accounting-critical, blocking, security and cross-application logic requires a version-controlled addon.</p>')
foreach($p in $phases){
 [void]$sb.Append("<h2>$(HE $p.Code) - $(HE $p.Name)</h2><table><thead><tr><th class='id'>ID</th><th class='task'>Task</th><th class='owner'>Responsible</th><th class='treatment'>Treatment</th><th class='deliverable'>Deliverable / acceptance evidence</th></tr></thead><tbody>")
 foreach($x in $p.Tasks){[void]$sb.Append("<tr><td>$(HE $x[0])</td><td>$(HE $x[1])</td><td>$(HE $x[2])</td><td>$(HE $x[3])</td><td>$(HE $x[4])</td></tr>")}
 [void]$sb.Append('</tbody></table>')
}
[void]$sb.Append('<h1>6. Minimum end-to-end UAT scenario pack</h1><ul><li>Retail POS cash sale with door, frame, accessory and trimming; correct tier price; passed quality; receipt and postings.</li><li>Wholesale order for 15 doors across branches; 10% tier, reservation, transfer, delivery and invoice.</li><li>Excess discount and credit breach; freeze, AR then Owner approval, rejection path.</li><li>USD container purchase, partial receipt, landed costs, three-way match and FX payment.</li><li>Manifest-driven Main-to-Branch transfer with transit and discrepancy.</li><li>Failed quality moves to quarantine and blocks delivery/POS until passed recheck.</li><li>COD delivery to driver box, counted handover, central vault transfer and variance.</li><li>Customer 360 shows variant history, invoices, debt and credit limit.</li><li>Bank/card import and reconciliation model proposes account, branch and analytics.</li><li>Mock close reconciles stock, POS, driver cash, AR/AP, bank, tax, trial balance and branch P&amp;L.</li></ul>')
[void]$sb.Append('<h1>7. Training and client inputs</h1><p>Training is separate for owners, each of the seven finance roles, the three inventory specialists, sales/POS users, and administrators. Completion requires attendance plus practical competency exercises, not attendance alone.</p><p>Required inputs include legal/tax data; approved chart of accounts; users and approval limits; product/variant/RAL/dimension/barcode data; opening stock and finance balances; quality rules; pricing and credit policies; POS/scanner hardware; card and bank formats; and signed tax treatment.</p>')
[void]$sb.Append('<h1>8. Assumptions, risks and final acceptance</h1><ul><li>One Iraqi legal company and three warehouses/branches. Multi-company changes scope.</li><li>Odoo 19 Enterprise and Odoo.sh are available; licenses, hardware and third-party integrations are commercial items unless included.</li><li>No MRP, field installation, GPS, route optimization or eCommerce.</li><li>Reference custom addons are not copied without separate specification, security review and approval.</li><li>At least two migration rehearsals and a mock month-end close are mandatory.</li><li>Final acceptance requires all 128 tasks completed/deferred by change control, no open critical issues, reconciled openings, signed security/control tests, training, UAT, handover and closure.</li></ul></body></html>')
[IO.File]::WriteAllText($htmlPath,$sb.ToString(),[Text.UTF8Encoding]::new($false))
$lo='C:\Program Files\LibreOffice\program\soffice.exe'
& $lo --headless --infilter='HTML (StarWriter)' --convert-to 'docx:Office Open XML Text' --outdir $outDir $htmlPath | Out-Null
$converted=Join-Path $outDir 'odoo_plan_source.docx'
if(Test-Path $out){Remove-Item -LiteralPath $out -Force}
Move-Item -LiteralPath $converted -Destination $out
Remove-Item -LiteralPath $htmlPath -Force
Write-Output $out
exit 0

function Set-CellText($cell,$text,$bold=$false,$color='000000') {
 $cell.Range.Text = $text
 $cell.Range.Font.Name = 'Calibri'; $cell.Range.Font.Size = 8.5; $cell.Range.Font.Bold = [int]$bold; $cell.Range.Font.Color = [Convert]::ToInt32($color,16)
 $cell.VerticalAlignment = 1
}

$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0
$word.ScreenUpdating = $false
$word.Options.CheckGrammarAsYouType = $false
$word.Options.CheckSpellingAsYouType = $false
$doc = $word.Documents.Add()
$sec = $doc.Sections.Item(1)
$sec.PageSetup.PaperSize = 2
$sec.PageSetup.TopMargin = $word.InchesToPoints(0.75); $sec.PageSetup.BottomMargin = $word.InchesToPoints(0.7)
$sec.PageSetup.LeftMargin = $word.InchesToPoints(0.75); $sec.PageSetup.RightMargin = $word.InchesToPoints(0.75)
$styles = $doc.Styles
$styles.Item('Normal').Font.Name='Calibri'; $styles.Item('Normal').Font.Size=10.5
$styles.Item('Normal').ParagraphFormat.SpaceAfter=6; $styles.Item('Normal').ParagraphFormat.LineSpacingRule=0
foreach($n in 1..3){ $s=$styles.Item("Heading $n"); $s.Font.Name='Calibri'; $s.Font.Color=0xB5742E; $s.Font.Bold=$true }
$styles.Item('Heading 1').Font.Size=16; $styles.Item('Heading 1').ParagraphFormat.SpaceBefore=16; $styles.Item('Heading 1').ParagraphFormat.SpaceAfter=8
$styles.Item('Heading 2').Font.Size=13; $styles.Item('Heading 2').ParagraphFormat.SpaceBefore=12; $styles.Item('Heading 2').ParagraphFormat.SpaceAfter=6
$styles.Item('Heading 3').Font.Size=11; $styles.Item('Heading 3').ParagraphFormat.SpaceBefore=8; $styles.Item('Heading 3').ParagraphFormat.SpaceAfter=4

$sel=$word.Selection
$sel.ParagraphFormat.Alignment=1
$sel.Font.Name='Calibri'; $sel.Font.Size=27; $sel.Font.Bold=$true; $sel.Font.Color=0xB5742E
$sel.TypeText('Odoo 19 Implementation Task Plan'); $sel.TypeParagraph()
$sel.Font.Size=18; $sel.Font.Bold=$false; $sel.Font.Color=0x4F4F4F
$sel.TypeText('Ready-Made Doors, Frames, Hardware and Accessories Trading - Iraq'); $sel.TypeParagraph(); $sel.TypeParagraph()
$sel.Font.Size=11; $sel.TypeText('Three locations | 17+ core users | Sales, POS, Inventory, Purchase, Quality and Finance'); $sel.TypeParagraph()
$sel.TypeText('Version 1.0 | 11 July 2026 | Planning baseline for discovery and implementation'); $sel.TypeParagraph(); $sel.TypeParagraph()
$sel.Font.Size=10; $sel.Font.Italic=$true
$sel.TypeText('Prepared from the supplied standard_tasks.xlsx baseline, the local Odoo 19 Community/Enterprise source, and a read-only review of the supplied Odoo.sh furniture reference database using the codex_odoo_sh identity. Custom code in that reference was deliberately not treated as a requirements baseline.'); $sel.TypeParagraph()
$sel.InsertBreak(7)

function Add-H($text,$level=1){$sel.Style="Heading $level"; $sel.TypeText($text); $sel.TypeParagraph(); $sel.Style='Normal'}
function Add-P($text,$boldLead=''){ $sel.Style='Normal'; if($boldLead){$sel.Font.Bold=$true;$sel.TypeText($boldLead);$sel.Font.Bold=$false};$sel.TypeText($text);$sel.TypeParagraph() }
function Add-Bullets($items){foreach($x in $items){$sel.Style='Normal';$sel.Range.ListFormat.ApplyBulletDefault();$sel.TypeText($x);$sel.TypeParagraph()};$sel.Range.ListFormat.RemoveNumbers()}

Add-H '1. Executive summary'
Add-P 'The target solution is a trading and distribution system, not a manufacturing or field-installation system. Odoo will control imported and locally purchased ready-made doors and components, inventory across three physical sites, light in-house customization sold as services, showroom POS, wholesale/contractor credit sales, delivery, driver cash, landed cost, quality release, and segregated accounting.'
Add-P 'The recommended approach is Odoo 19 Enterprise with standard applications as the accounting and operational backbone, plus a small, controlled set of custom addons for the requirements that must block, aggregate or orchestrate transactions across applications. Studio alone should not be used for accounting-critical security or blocking logic.'
Add-P 'The reference database supports this direction: it has standard Sales, Purchase, Inventory, POS, Accounting, Quality, Approvals, Expenses, Documents, Dashboards and Landed Costs installed; it also demonstrates multiple POS configurations, multiple cash/driver-style journals, Arabic labels and separate product attributes such as Color, Size and Height. It currently has one warehouse, so its branch topology must not be copied; the new design requires three warehouses and transit controls.'
Add-H '2. Business and solution boundaries'
Add-Bullets @(
 'Included: import/local purchasing, warehousing, internal transfers, sales, POS, delivery handover, returns, light customization charges, quality checks, accounting, landed cost, expenses, driver cash, approvals, dashboards and reporting.',
 'Explicitly excluded: raw-material manufacturing, bills of materials, work orders, MRP costing, construction-site installation, field-service dispatch and engineering crews.',
 'Light customization is handled as optional service lines and controlled workshop/quality statuses. If detailed capacity, work-center planning or consumed-component costing becomes necessary, it is a separately approved future scope.',
 'Iraqi tax and withholding configuration requires written validation by the client chief accountant/tax adviser before production use.'
)
Add-H '3. Target operating model'
$t=$doc.Tables.Add($sel.Range,6,4); $t.Style='Table Grid'; $t.Rows.Item(1).HeadingFormat=$true
@('Area','Target design','Primary Odoo capability','Special control') | ForEach-Object -Begin {$i=1} -Process {Set-CellText $t.Cell(1,$i) $_ $true 'FFFFFF';$t.Cell(1,$i).Shading.BackgroundPatternColor=0xB5742E;$i++}
$rows=@(
 @('Physical sites','Main Warehouse, Branch 1, Branch 2','Multi-warehouse Inventory, Barcode, POS','Transit locations and branch-specific roles'),
 @('Products','Doors, frames, panels, locks, accessories and service add-ons','Products, variants, attributes, pricelists','Independent RAL/dimension search'),
 @('Supply','Foreign containers and local purchasing','Purchase, receipts, vendor bills, landed costs','Shipment tracker and 3-way-match discipline'),
 @('Demand','Retail POS, wholesale and contractor orders','Sales, POS, invoicing, reservations','Credit/discount approvals and cross-branch availability'),
 @('Control','Quality, treasury, accounting and executive oversight','Quality, Accounting, Expenses, Dashboards','Mandatory release block and driver cash handover'))
for($r=0;$r -lt $rows.Count;$r++){for($c=0;$c -lt 4;$c++){Set-CellText $t.Cell($r+2,$c+1) $rows[$r][$c]}}
$sel.SetRange($t.Range.End,$t.Range.End);$sel.TypeParagraph()

Add-H '4. Standard-versus-extension decision'
$t=$doc.Tables.Add($sel.Range,11,3);$t.Style='Table Grid';$t.Rows.Item(1).HeadingFormat=$true
@('Requirement','Recommended treatment','Reason')|ForEach-Object -Begin{$i=1}-Process{Set-CellText $t.Cell(1,$i) $_ $true 'FFFFFF';$t.Cell(1,$i).Shading.BackgroundPatternColor=0xB5742E;$i++}
$dec=@(
 @('Variants, RAL/size attributes, warehouse quantities, incoming and forecast','Standard foundation + custom search/panel','Core data exists in standard Odoo; the requested fast separated filters and consolidated branch view need tailored UI.'),
 @('Quantity discounts','Standard pricelists','Min-quantity price rules cover the agreed tiers; boundary tests remain mandatory.'),
 @('Discount and credit approvals','Custom chained approval','A transaction must freeze and require AR then Owner approval with an auditable decision.'),
 @('Quality checks','Enterprise Quality + custom delivery/POS block','Quality points/checks are standard; the absolute release gate across delivery and POS needs enforcement.'),
 @('Landed costs and FX','Standard accounting/inventory','Standard landed-cost and multi-currency capabilities should be configured and reconciled.'),
 @('Fast transfer manifest','Barcode + custom manifest action','Standard transfers remain the accounting truth; a batch scan/validate experience removes line entry.'),
 @('Customer 360 and branch stock','Custom read-only panels/reports','Information spans partner, accounting, sales, POS and inventory models.'),
 @('Driver cash boxes','Standard cash journals + custom COD/handover workflow','Journals hold balances; assignment, delivery linkage, counted handover and variance need workflow.'),
 @('Expense matching','Standard reconciliation models','Recurring labels can propose accounts/analytics; sample accuracy and exceptions must be tested.'),
 @('Light customization','Service products + small workflow extension','Avoid MRP while guaranteeing price capture and quality status.'))
for($r=0;$r -lt $dec.Count;$r++){for($c=0;$c -lt 3;$c++){Set-CellText $t.Cell($r+2,$c+1) $dec[$r][$c]}}
$sel.SetRange($t.Range.End,$t.Range.End);$sel.TypeParagraph()

Add-H '5. Delivery gates and acceptance model'
Add-Bullets @(
 'Gate 0 - Scope and governance approved.', 'Gate 1 - Discovery and fit-gap blueprint signed.', 'Gate 2 - Foundation, security and master-data design accepted.', 'Gate 3 - Configured prototype and custom specifications approved.', 'Gate 4 - System/integration testing and migration rehearsal pass.', 'Gate 5 - Role training and formal UAT signed.', 'Gate 6 - Go-live readiness and opening reconciliations approved.', 'Gate 7 - Hypercare closed and handover accepted.'
)
Add-P 'No phase is accepted from a demonstration alone. Evidence must include configured records, test scripts/results, reconciliations, access-negative tests where relevant, issue closure and named client approval.'

Add-H '6. Detailed implementation task register'
Add-P 'Each task below is a deliverable-bearing work item. “Extension” includes Studio only where safe; accounting-critical, blocking, security and cross-application logic requires a version-controlled addon. Task dependencies follow the phase order unless the project plan records a justified overlap.'
foreach($p in $phases){
 Add-H ("$($p.Code) - $($p.Name)") 2
 $t=$doc.Tables.Add($sel.Range,$p.Tasks.Count+1,5);$t.Style='Table Grid';$t.Rows.Item(1).HeadingFormat=$true;$t.AllowAutoFit=$true
 @('ID','Task','Responsible','Treatment','Deliverable / acceptance evidence')|ForEach-Object -Begin{$i=1}-Process{Set-CellText $t.Cell(1,$i) $_ $true 'FFFFFF';$t.Cell(1,$i).Shading.BackgroundPatternColor=0xB5742E;$i++}
 for($r=0;$r -lt $p.Tasks.Count;$r++){for($c=0;$c -lt 5;$c++){Set-CellText $t.Cell($r+2,$c+1) $p.Tasks[$r][$c]}}
 $t.Columns.Item(1).PreferredWidth=$word.InchesToPoints(0.35);$t.Columns.Item(2).PreferredWidth=$word.InchesToPoints(3.05);$t.Columns.Item(3).PreferredWidth=$word.InchesToPoints(1.05);$t.Columns.Item(4).PreferredWidth=$word.InchesToPoints(1.05);$t.Columns.Item(5).PreferredWidth=$word.InchesToPoints(1.5)
 $sel.SetRange($t.Range.End,$t.Range.End);$sel.TypeParagraph()
}

Add-H '7. Minimum end-to-end UAT scenario pack'
Add-Bullets @(
 'Retail POS cash sale with door, frame, accessory and optional trimming; correct tier price; passed quality; receipt and stock/accounting postings.',
 'Wholesale quotation for 15 doors sourced across branches; 10% automatic tier; reservation, transfer, delivery and invoice.',
 'Attempted excessive discount and credit-limit breach; quotation frozen; AR approval followed by one Owner; rejection path verified.',
 'Foreign USD purchase/container, partial receipt, customs/freight/offloading landed-cost allocation, vendor bill match and FX payment.',
 'Main-to-Branch 1 transfer created as manifest, dispatched to transit, scanned at receipt, discrepancy recorded and balances updated.',
 'Door failing paint/warp inspection moved to quarantine; delivery and POS handover blocked until approved disposition and passed recheck.',
 'COD delivery assigned to driver, customer cash posted to driver box, daily counted handover to central vault, over/short variance recorded.',
 'Customer 360 shows six-month product/variant history, invoices, total spend, open debt and credit limit before order confirmation.',
 'Bank/card import and reconciliation model automatically proposes branch/account/analytic coding for recurring expense descriptions.',
 'Month-end mock close reconciles stock valuation, landed cost, POS, driver cash, AR, AP, bank, tax, trial balance and branch P&L.'
)

Add-H '8. Training curriculum and attendance requirements'
$t=$doc.Tables.Add($sel.Range,6,3);$t.Style='Table Grid';$t.Rows.Item(1).HeadingFormat=$true
@('Audience','Curriculum','Completion evidence')|ForEach-Object -Begin{$i=1}-Process{Set-CellText $t.Cell(1,$i) $_ $true 'FFFFFF';$t.Cell(1,$i).Shading.BackgroundPatternColor=0xB5742E;$i++}
$tr=@(
 @('Owners / directors','Dashboards, branch P&L, cash, approvals, audit trail, exceptions','Attendance plus approval exercises'),
 @('Seven finance roles','Role-specific transactions, handoffs, reconciliations, close and prohibited access','Separate competency checklist per role'),
 @('Three inventory specialists','Receipts, transfers, barcode, quality, quarantine, dispatch and counts','Practical warehouse scenarios'),
 @('Sales / POS','Search by RAL/dimension, availability, pricing, add-ons, credit, customer history, returns','POS and quotation exercises'),
 @('Administrators / key users','Users, safe configuration, master-data governance, troubleshooting and escalation','Administrator handover signoff'))
for($r=0;$r -lt $tr.Count;$r++){for($c=0;$c -lt 3;$c++){Set-CellText $t.Cell($r+2,$c+1) $tr[$r][$c]}}
$sel.SetRange($t.Range.End,$t.Range.End);$sel.TypeParagraph()

Add-H '9. Client inputs and decisions required before configuration freeze'
Add-Bullets @(
 'Legal company and tax registration details; approved Iraqi chart of accounts; tax and withholding treatment signed by the client tax adviser.',
 'Named users, job descriptions, emails, location assignment, approval limits, backups and segregation-of-duties confirmation.',
 'Complete product/variant list with Arabic/English descriptions, RAL/finish, dimensions, SKU/barcode, category, cost, prices and suppliers.',
 'Opening stock by site and variant, open sales/purchases, receivables/payables, driver cash, petty cash, banks and opening trial balance.',
 'Approved quality criteria, discount/credit authority, price tiers, service add-on prices, return rules and driver handover policy.',
 'Barcode/scanner/POS hardware inventory, card-terminal settlement process, bank statement formats and label/receipt samples.',
 'Continued read-only access to the Odoo.sh furniture reference environment if additional configuration comparisons are requested.'
)

Add-H '10. Key risks and controls'
$t=$doc.Tables.Add($sel.Range,7,3);$t.Style='Table Grid';$t.Rows.Item(1).HeadingFormat=$true
@('Risk','Control','Owner')|ForEach-Object -Begin{$i=1}-Process{Set-CellText $t.Cell(1,$i) $_ $true 'FFFFFF';$t.Cell(1,$i).Shading.BackgroundPatternColor=0xB5742E;$i++}
$rk=@(
 @('Variant explosion and confusing search','Attribute governance, valid-combination policy, representative POS performance test','Product Data Owner'),
 @('Over-customization of standard Odoo','Signed fit-gap, configuration-first design, extension review gate','Steering Committee'),
 @('Accounting segregation gaps','Least privilege, custom groups/rules only when required, negative-access testing','Chief Accountant'),
 @('Incorrect Iraqi tax/withholding setup','Written external/client tax validation and scenario signoff','Tax Accountant'),
 @('Opening balances or stock do not reconcile','Two rehearsals, frozen files and signed reconciliation before go-live','Data Lead'),
 @('Quality or cash controls bypassed under pressure','Hard blocks, audit logs, manager exception paths and hypercare monitoring','Operations + Finance'))
for($r=0;$r -lt $rk.Count;$r++){for($c=0;$c -lt 3;$c++){Set-CellText $t.Cell($r+2,$c+1) $rk[$r][$c]}}
$sel.SetRange($t.Range.End,$t.Range.End);$sel.TypeParagraph()

Add-H '11. Assumptions and exclusions'
Add-Bullets @(
 'One Iraqi legal company with three warehouses/branches; a multi-company legal structure would change accounting, security and reporting scope.',
 'Odoo 19 Enterprise subscription and Odoo.sh environments are available; licenses, hardware, third-party services and bank integrations are commercial items unless explicitly included.',
 'No manufacturing, raw-material planning, work centers, field installation, route optimization, GPS tracking or eCommerce is included.',
 'Historical transactional migration is limited to an agreed period/summary; full legacy history requires separate profiling and effort.',
 'Timelines and effort estimates are produced only after discovery, data profiling and signed custom specifications; this document defines work, not commercial duration.',
 'The reference database is evidence of configuration patterns only. Its custom addons and furniture-specific master data will not be copied without separate review and approval.'
)

Add-H '12. Final acceptance checklist'
Add-Bullets @(
 'All 128 tasks are completed, formally deferred or removed through approved change control.',
 'No Severity 1 or Severity 2 issue remains open; accepted lower-severity items have owners and dates.',
 'Security, quality release, discount/credit approvals, driver cash and transfer controls pass positive and negative tests.',
 'Opening stock, AR, AP, cash/bank and trial balance reconcile to signed cutover files.',
 'Role-based training, UAT, go-live readiness, first-live transaction validation and administrator handover are signed.',
 'Source code, as-built configuration, migration pack, test evidence and support runbook are delivered.'
)

$footer=$sec.Footers.Item(1).Range
$footer.Text='Odoo 19 Doors Trading Implementation Task Plan'
$footer.Font.Name='Calibri';$footer.Font.Size=8;$footer.Font.Color=0x777777
$footer.ParagraphFormat.Alignment=1
$doc.SaveAs2($out,16)
$doc.Close();$word.Quit()
[Runtime.InteropServices.Marshal]::ReleaseComObject($doc)|Out-Null
[Runtime.InteropServices.Marshal]::ReleaseComObject($word)|Out-Null
Write-Output $out
