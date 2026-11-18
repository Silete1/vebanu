# anu.ltd creative direction: "Way of Anu", the sky ledger

Compiled 2026-11-18 for ANU Software Solutions (Baghdad). Companion to `research/design-research.md`, which covers performance, tiers, View Transitions, CSS scroll-driven support, the 3D asset pipeline and AI-readability. This file does not repeat those; it covers the story, the facts behind it, the visual vocabulary, the components and the render pipeline.
Brand constraints: ink `#090B11`, Signal `#2563EB` (the only UI accent), bone `#F8FAFC`, radius 0, hairlines, square glyphs (outline / half / dashed / solid), line-network texture, Inter Tight + Tajawal + Roboto Mono, liquid 280 ms settle. The current mark (`public/brand/anu-mark.svg`) is a **four-bladed star** with a `#2f6bf5 → #6a2bd8` gradient. That shape is the bridge to the cuneiform sky sign (see §3.3).

Tags: **[P]** primary or scholarly (Oracc, CDLI, museum record, vendor docs). **[S]** secondary (Wikipedia, press, aggregator). **[U]** unverified, inferred or practice-based. Checked this session: Met Open Access API (object PD flags), Stellarium source, the Noto font sizes (measured), NASA SVS API, and the Poly Haven / ambientCG APIs.

---

## 0. TL;DR

1. **Anu is literally "sky".** Sumerian *an* means sky or heaven. The same sign 𒀭 (**U+1202D**; "U+12000D" does not exist) also reads *diĝir*, "god". Uruk was his city. In Babylonian astronomy the sky had three bands, and the middle one was the **Way of Anu**. [P]
2. **The Way of Anu reads like an ERP module list.** MUL.APIN's 23 "stars of Anu" include **the Field** (an area measure: the Square of Pegasus), **the Hired Worker** (Aries), **the Furrow / ear of grain** (Virgo), **the Scales** (Libra), **the Arrow** (Sirius), **the Bull of Heaven** (Taurus) and **the True Shepherd of Anu** (Orion), whose god Papsukkal is the "vizier of Anu". It is the strongest true hook found, and it drives the home page. [P]
3. **The first writing was a ledger.** Proto-cuneiform at Uruk (c. 3350–3000 BCE) is about 85% administrative: barley, beer, rations, labour and livestock. Accounting tokens and sealed clay envelopes came before it. "Software for how Iraq works", told as 5,000 years of Iraqi record-keeping, is factual, not decoration. [P]
4. **Unicode 18.0 (Sept 2026) encodes proto-cuneiform numerals** (323 signs; full script provisionally at U+12690–12BFF). The ledger numerals can be real code points, but expect no font support yet, so draw them as SVG. [P]
5. **Use the AN sign, not a generic eight-pointed star.** In Mesopotamian art the eight-pointed star belongs to Ishtar (Venus). To many Iraqis it also recalls the 1959–63 Qasim-era flag. Anu's own emblem was a horned crown, and he had no known human form. ANU's four-blade mark plus the AN sign (four crossing strokes) is the accurate, ownable link. [P]
6. **Iraqi audiences are proud of this heritage and increasingly literate in it.** Young Iraqis wear cuneiform jewellery. The 25,000-dinar note shows Hammurabi. Ur, Uruk and Eridu are UNESCO-listed, and the Iraq Museum reopened in 2022. **Fake cuneiform will be noticed.** Use real signs with real meanings, frame them as heritage rather than worship, and avoid Anunnaki and "ancient aliens" tropes. [P/S]
7. **Free authentic textures exist.** The Met's proto-cuneiform barley tablets, a Late Uruk ration bowl, cylinder seals and the Ur headdress are all CC0 (verified via API). British Museum images are CC BY-NC-SA, so they **cannot be used** on a commercial site. [P]
8. **Noto Sans Cuneiform is OFL but 467 KB as WOFF2.** A 4-glyph subset measured **3,092 bytes**. Subset it, or bake the 5–8 needed glyphs to inline SVG. [P measured]
9. **Every motion idea here is CSS/SVG first.** The sky is SVG plus CSS. WebGL is reserved for an optional star shader on the high tier. Pre-rendered Blender loops supply the "real 3D". Unreal is optional, for a brand film on the Windows PC. [S]
10. **Recommended direction: "Way of Anu: the sky ledger" (طريق آنو).** It is a dusk-to-night home page in which wedges become ledger rows, ledger rows become constellations, and a seal rolls the record shut.

---

## 1. Anu/An: who he is, the sign, and how to use it respectfully

### 1.1 Facts worth using (all checkable)
- **Name.**
  - Sumerian *An* = "sky, heaven"; Akkadian *Anu(m)*.
  - Written with the sign AN, which could also stand for *diĝir* ("god").
  - **The number 60 could write his name** ([Wikipedia: Anu](https://en.wikipedia.org/wiki/Anu); [Oracc AMGG: An/Anu](https://oracc.museum.upenn.edu/amgg/listofdeities/an/)) [P].
- **Rank.**
  - He belongs to the oldest generation of gods and was originally the supreme deity, in a triad with Enlil and Ea/Enki.
  - He grants kingship, and his decrees were unalterable.
  - He later ceded active roles to Enlil and then Marduk but kept his high status ([Oracc](https://oracc.museum.upenn.edu/amgg/listofdeities/an/), [Britannica](https://www.britannica.com/topic/Anu)) [P].
- **He is remote and has no human image.**
  - Anu almost never appears in art, and no recognisable human form is known.
  - A Kassite-period text gives his symbol as a **horned crown on a pedestal**, as seen on *kudurru* boundary stones; it is identical to Enlil's ([Wikipedia: Anu, citing George 1992](https://en.wikipedia.org/wiki/Anu)) [P/S].
  - **Design consequence:** an abstract sky is more accurate than a bearded deity.
- **Consorts.** Ki, Uraš and Antu, all "earth". *An-ki* (sky-earth) is the Sumerian expression for the cosmos [S].
- **Uruk (Warka, الوركاء).**
  - Uruk was his main city. It had two precincts: **Kullaba / the "Anu district"** and **Eanna** (Inanna's "house of heaven").
  - The **White Temple** stands on a terrace raised about ten times to about 12–13 m, often called the "Anu ziggurat". Radiocarbon dates it to 3517–3358 BCE ([Anu ziggurat](https://en.wikipedia.org/wiki/Anu_ziggurat); reconstruction by [artefacts-berlin](https://www.artefacts-berlin.de/portfolio-item/uruk-visualisation-project-the-white-temple/)) [S].
  - **Caveat:** there is no direct evidence that Anu was worshipped there; the attribution comes from much later (Krul 2018, via Wikipedia). Write "the White Temple, traditionally linked to Anu".
- **Seleucid revival (3rd c. BCE).**
  - Uruk's new **Bīt Rēš** temple of Anu and Antu, with the **Ešarra ziggurat**, became the city's centre.
  - Two circumpolar stars, "the Great Anu and Antu of Heaven", received offerings ([Wikipedia: Anu](https://en.wikipedia.org/wiki/Anu)) [S].
- **Myths.**
  - In *Gilgamesh* Tablet VI, Ishtar asks her father Anu for the **Bull of Heaven**. He warns of seven years of famine, then gives in ([Bull of Heaven](https://en.wikipedia.org/wiki/Bull_of_Heaven)) [S].
  - In *Adapa*, Anu offers the bread and water of life, which Adapa refuses.
- **Number 60.**
  - Anu's number is the base of sexagesimal counting, which survives in our 60 seconds, 60 minutes and 360°.
  - The sign 𒐕 (U+12415, ONE GEŠ2) is a single wedge worth 60 [S].
  - A good line for an ERP firm: *every minute you track has 60 seconds because of Mesopotamian scribes.*

### 1.2 The sky: Ways of Enlil, Anu and Ea (the real "band of the sky")
- **Three Ways.** Babylonian astronomy divided the eastern horizon and sky into three "Ways": **Enlil** (north), **Anu** (middle, about the celestial equator) and **Ea** (south). J. G. Rogers put Anu's band at about **±17°** ([Wikipedia: Anu, Astral role](https://en.wikipedia.org/wiki/Anu); [Babylonian astronomy](https://en.wikipedia.org/wiki/Babylonian_astronomy)) [S].
- **The source text: MUL.APIN** ("the Plough star").
  - Two tablets; compiled around 1000 BCE. Its observational base is perhaps 1350–1150 BCE; the earliest dated copy is from 686 BCE. The British Museum copy is BM 86378 ([MUL.APIN](https://en.wikipedia.org/wiki/MUL.APIN)) [S].
  - Tablet 1 lists **33 stars of Enlil, 23 of Anu and 15 of Ea**.
  - **MUL.APIN contains no drawn map; it is lists.** Any "Babylonian star map" is a modern reconstruction, so say so in captions.
- **The 23 stars of Anu, with their ANU tie-ins.** Transcribed from Stellarium's MUL.APIN sky culture by S. M. Hoffmann, after Hunger & Steele 2018 ([source](https://github.com/Stellarium/stellarium/blob/master/skycultures/babylonian_mulapin/description.md)) [P]:

| MUL.APIN name (gloss) | Modern sky | Honest ANU tie-in |
|---|---|---|
| IKU **"the Field"** (an area measure), "seat of Ea, who goes in front of the stars of Anu" | Square of Pegasus | real-estate twins, land and parcels; a **square**, like ANU's glyphs |
| LÚ.ḪUN.GÁ **"the Hired Worker"** (Dumuzi/Tammuz) | Aries | HR, payroll, labour rations |
| ŠE.ER'U **"the Furrow"** (Šala, the "ear of grain") | Virgo (Spica) | inventory, grain and supply; CNC toolpaths as furrows |
| ZIBĀNĪTU **"the Scales"** ("horns of the Scorpion") | Libra | accounting balance; legal workflows |
| GAG.SI.SÁ **"the Arrow"** | Sirius | logistics, ports, speed |
| GU₄.AN.NA **"the Bull of Heaven"**; Is-lê, "jaw of the bull, **crown of Anu**" | Taurus / Hyades | power, heavy assets, ports |
| SIPA.ZI.AN.NA **"the True Shepherd of Anu"**; Papsukkal, "**vizier of Anu**" | Orion | government workflows: the sky's own administrator |
| MUL.MUL **"the Stars"** (the Sebettu) | Pleiades | community and support |
| planets: Venus, Mars, Saturn, Mercury, "which change place and cross the sky" | - | moving data, live status |

- **Data licence warning.** Stellarium's Babylonian culture is **CC BY-ND 4.0** (no derivatives). Use it as a reference only. Rebuild the lines from public star positions yourself (§7).
- **Naming notes.** Orion's Babylonian name is variously rendered "True/Faithful Shepherd of Heaven/of Anu" ([All Skies Encyclopaedia](https://ase.exopla.net/index.php/SIPA.ZI.AN.NA)) [S]. Taurus = GU₄.AN.NA, "Bull of Heaven"; a variant name is AGA Anim, "Crown of Anu" ([ASE](https://ase.exopla.net/index.php/GU4.AN.NA)) [S].

### 1.3 The sign 𒀭 (AN / DINGIR)
- **Code point.**
  - **U+1202D CUNEIFORM SIGN AN**, added in Unicode 5.0 (2006). Bidi class **L**, so the glyph is laid out left-to-right even inside RTL text.
  - **U+12000D is invalid** (Unicode ends at U+10FFFF) ([codepoints.net](https://codepoints.net/U+1202D); verified with Python `unicodedata`) [P].
- **Form.** It began as a **star pictogram** ([Dingir](https://en.wikipedia.org/wiki/Dingir)). Archaic forms are a star of crossing strokes; later wedge forms combine horizontal, vertical and diagonal wedges, and Neo-Assyrian forms are simplified. The exact ray and wedge counts per period are not stated in the sources found, so draw from photographed tablets, not from memory [U].
- **Readings.**
  - *an* "sky"; *diĝir* "god";
  - a silent determinative before divine names (transliterated as a superscript ᵈ);
  - a logogram for Anu;
  - the syllable /an/.
- **Related signs to use instead of over-using AN.**
  - **𒀯 MUL** (U+1202F, AN×3) means "star". It is the **determinative before star and constellation names** (*mul*APIN). **Use MUL, not DINGIR, to label constellations and chapters.** It is accurate and carries no "divine" meaning.
  - **𒆠 KI** (U+121A0) = earth (*an-ki* = cosmos); **𒊺 ŠE** (U+122BA) = barley; **𒁹 DIŠ** (U+12079) = 1; **𒌋 U** (U+1230B) = 10; **𒐕** (U+12415) = 60 [P].
- **The eight-pointed star is Ishtar's, not Anu's.**
  - The star may first have meant "heaven" in general. By the Old Babylonian period it was tied to **Venus/Ishtar**, often shown in a disc and paired with Sin's crescent and Shamash's rayed disc on kudurrus ([Star of Ishtar](https://en.wikipedia.org/wiki/Star_of_Ishtar)) [S].
  - It was also on Iraq's **1959–63 flag and emblem** under Qasim: a red eight-pointed star, yellow centre, read as Ishtar/Assyrians and the Kurdish sun. It was replaced in 1963 ([Flag of Iraq](https://en.wikipedia.org/wiki/Flag_of_Iraq), [FOTW](https://crwflags.com/fotw/flags/iq_1959.html), [Coat of arms](https://en.wikipedia.org/wiki/Coat_of_arms_of_Iraq)) [S]. It is a patriotic but era-specific political symbol.
  - Two overlapping squares (۞, Rub el Hizb) is a **Qur'anic section marker**. Never construct ANU's star that way.
- **Correction to `vebanu/docs/celestial-background-suggestions.md`.**
  - It states that DINGIR "depicts an eight-pointed celestial star representing supreme divine order". It is a star-sign meaning sky/god, so fix that line.
  - Its video sources (Coverr, Pexels) are **not "open domain"**. They use their own free licences. Wikimedia files need a per-file check.
- **Writing direction (a gift for the bilingual site).**
  - The earliest cuneiform ran in **vertical columns top-to-bottom, with columns ordered right-to-left**.
  - It was later turned 90° into left-to-right lines. When that happened is debated, with dates from the mid-3rd to the mid-2nd millennium ([CDLI Bulletin 2003:2](https://cdli.earth/articles/cdlb/2003-2)) [P].
  - The Arabic layout's right-to-left case order is historically apt. The glyph rows themselves stay LTR.

### 1.4 Arabic names and spellings
| Concept | Arabic | Note |
|---|---|---|
| Anu (god/sky) | **أنو** / **آنو** | ar.wikipedia uses [أنو (أسطورة)](https://ar.wikipedia.org/wiki/أنو_(أسطورة)) and Marefa uses [أنو (إله)](https://www.marefa.org/أنو_(إله)). Iraqi academic prose often writes **آنو** [S]. The vebanu codebase uses **أنو** throughout (51 hits). |
| Uruk | **الوركاء** (Warka); أوروك | Iraqis say Warka |
| ziggurat | **زقورة** | |
| White Temple / Eanna | **المعبد الأبيض** / إي-آنا ("بيت السماء") | |
| cuneiform / proto-cuneiform | **الخط المسماري** / الكتابة المسمارية البدائية | |
| Way of Anu | **طريق آنو** (also مسار آنو) | MUL.APIN = نص مول أبين |
| Bull of Heaven | **الثور السماوي** | |
| cylinder seal | **ختم أسطواني** | |
| Sumerian / Mesopotamia | سومري / **بلاد الرافدين** | "Land of the Two Rivers" is the everyday phrase |

- **Keep the brand as أنو** (it is already in code and copy). In story copy, introduce the deity once as **آنو** with the gloss "اسم السماء عند السومريين" ("the Sumerians' name for the sky").
- **Possible collision [U].** In Levantine and, colloquially, Iraqi Arabic, a bare **انو** is the complementiser "that". Always write the brand with hamza (أنو) and Latin ANU nearby. Test with Iraqi readers.

### 1.5 How Iraqis relate to Sumerian heritage today
- **Pride and unity.**
  - Iraqi nationalism has long drawn on Sumer, Akkad, Babylon and Assyria ([Iraqi nationalism](https://en.wikipedia.org/wiki/Iraqi_nationalism)) [S].
  - Commentators frame it as a **cross-sectarian shared belonging** ([New Lines, "Between two rivers, between two myths"](https://newlinesmag.com/essays/between-two-rivers-between-two-myths/)) [S, opinion].
  - Qasim's "Iraq first" emblem used Shamash and Ishtar motifs. The Ba'ath government bent the same heritage toward pan-Arabism.
  - **Avoid either political register.**
- **Living use (Oct 2025).** A Shafaq News report profiles the following ([Shafaq](https://shafaq.com/en/Report/The-first-word-Iraqis-find-hope-in-Sumerian-symbols)) [S]:
  - young Iraqis wearing cuneiform jewellery ("hope", "freedom");
  - a Mosul designer using cuneiform patterns in posters and logos;
  - souvenir makers near Ur;
  - a University of Baghdad sociologist calling it "acts of resilience".
- **State symbols and moments.**
  - The 25,000-dinar note shows Hammurabi before Shamash and the Lion of Babylon ([CBI notes](https://cbi.iq/page/89), [note detail](https://www.leftovercurrency.com/exchange/iraqi-dinars/current-iraqi-dinar-banknotes/25000-iraqi-dinars-banknote-hammurabi/)) [S].
  - UNESCO listed the **Ahwar** (marshes plus Ur, Uruk and Eridu) in 2016 ([UNESCO 1481](https://whc.unesco.org/en/list/1481)) and **Babylon** in 2019 ([UNESCO 278](https://whc.unesco.org/en/list/278)) [S].
  - Pope Francis held an interfaith meeting at Ur in March 2021, and Iraq made 6 March a National Day of Tolerance ([Al Jazeera](https://www.aljazeera.com/news/2021/3/5/pope-to-visit-ancient-city-of-ur-the-cradle-of-civilization), [The National](https://www.thenationalnews.com/mena/iraq/iraq-declares-march-6-national-day-of-tolerance-as-pope-francis-tour-continues-1.1178522)) [S].
  - About 17,000 looted artefacts came back from the US in 2021, and the Gilgamesh Dream Tablet in December 2021 ([Al Jazeera](https://www.aljazeera.com/news/2021/8/3/iraq-says-us-to-return-17000-ancient-looted-artifacts), [Al Jazeera](https://www.aljazeera.com/news/2021/12/7/iraq-marks-return-of-looted-gilgamesh-tablet-from-the-us)).
  - The Iraq Museum reopened on 6 March 2022 ([Art Newspaper](https://theartnewspaper.com/2022/03/11/iraq-museum-baghdad-reopens)) [S].
- **In Baghdad's streets.** Mohammed Ghani Hikmat's *Save Iraqi Culture* (2010, by al-Zawraa Park) is a monumental broken cylinder carrying the cuneiform line "When writing began" ([Designed in Iraq](https://designediniraq.org/entry/save-iraqi-culture-sculpture/)) [S]. The cylinder-and-writing motif is already a Baghdad public symbol.
- **Tone that lands:** quiet pride, precise facts, continuity ("we have been keeping records here for 5,000 years"). Not exoticism, not mythic grandeur, and not victimhood (war and looting imagery).

### 1.6 Respectful vs kitsch: rules
| Do | Don't |
|---|---|
| Say **"Anu, the Sumerian sky"**. Treat it as heritage and language, not worship. In AR: «آنو، اسم السماء عند السومريين» | Present Anu as a god the brand invokes ("blessed by Anu"), or draw a bearded sky-god (none is attested) |
| Use **real signs with real meanings** (AN, MUL, KI, ŠE, numerals), each with a caption or `aria-label` | Fake "cuneiform-ish" wedges arranged as gibberish; Iraqi readers increasingly recognise signs |
| Cite objects with museum, number and date ("Jemdet Nasr tablet, Met 1988.433.1") | "Ancient wisdom" filler; Anunnaki, Nibiru or "ancient aliens" (a pseudo-history trap that is popular on Arabic social media) |
| Abstract the forms: terraces, cases, wedges, seal friezes, the starry band | Gold-on-black "pharaoh" luxury, papyrus textures, mixing in Egyptian hieroglyphs or Persian Persepolis motifs |
| Use inclusive language: Mesopotamian heritage belongs to all Iraqis (Arab, Kurd, Assyrian/Chaldean/Syriac, Turkmen, Yazidi, Mandaean) | Claim the heritage for one group, or echo Saddam-era Babylon reconstruction (bricks stamped with his name) |
| Use the AN sign plus ANU's four-blade mark | An eight-pointed star in disc (Ishtar, the Qasim flag) or ۞-style overlapping squares (a Qur'anic marker) |
| Keep national maps out of the sky metaphors | Maps with internal borders (the Kurdistan Region boundary is politically sensitive), or ISIS-destruction imagery (Nimrud, Mosul) as drama |

---

## 2. The ledger story: the first writing was accounting

### 2.1 Timeline
| When | What | Source |
|---|---|---|
| c. 8000–7500 BCE | small clay **tokens** (counters) at Near Eastern sites (Tepe Asiab c. 7800 BCE) | [Schmandt-Besserat](https://sites.utexas.edu/dsb/tokens/prehistoric-administrative-technologies-and-the-ancient-near-eastern-redistribution-economy-the-case-of-greater-susiana/) [P] |
| c. 3500 BCE | **cylinder seals** invented (Uruk is the usual attribution); rolled over clay on jars, door locks and envelopes to control stored goods | [Aramco World](https://www.aramcoworld.com/articles/2021/mesopotamias-art-of-the-seal), [Antiquity 2024](https://www.cambridge.org/core/journals/antiquity/article/seals-and-signs-tracing-the-origins-of-writing-in-ancient-southwest-asia/B3C2D400F3F80A7A0162D9035C9C2804) [S/P] |
| 4th millennium BCE | **bullae**: hollow clay envelopes holding tokens, sealed outside, about 70 known from Susa; then **numerical tablets** with impressed counts | Schmandt-Besserat [P]; disputed as a direct precursor of signs by Kelley, Cartolano and Ferrara ([Antiquity 2024](https://www.cambridge.org/core/journals/antiquity/article/seals-and-signs-tracing-the-origins-of-writing-in-ancient-southwest-asia/B3C2D400F3F80A7A0162D9035C9C2804)) [P] |
| c. 3350–3200 BCE (Uruk IV) | **proto-cuneiform** in Uruk's Eanna precinct: hundreds of signs plus numerals; almost entirely non-lexical (accounts) | [Englund 2004](https://cdli.earth/files-up/publications/englund2004c.pdf), [Englund 2011](https://cdli.ucla.edu/staff/englund/publications/englund2011a.pdf) [P] |
| c. 3200–3000 BCE (Uruk III / Jemdet Nasr) | bulk of the corpus: grain, beer, livestock, textiles, labour rations; mass-made **beveled-rim bowls** as ration measures | Englund [P]; Met 62.70.25 |
| c. 3100 BCE | **Kushim tablet**: "29,086 measures barley · 37 months · Kushim" (the signs sum to 28,086); often called the oldest written personal name, though it may be a title | [Wikipedia](https://en.wikipedia.org/wiki/Kushim_(Uruk_period)), [Guinness 2026](https://www.guinnessworldrecords.com/news/2026/8/sanga-kushim-why-the-first-person-in-recorded-history-was-an-accountant) [S] |
| 2026-09 | **Unicode 18.0** adds Proto-Cuneiform **numerals only** (323 chars); full block provisionally U+12690–U+12BFF (1,392 cp) | [Unicode 18 beta notes](https://www.unicode.org/versions/beta-18.0.0.html), [WG2 n5361](https://www.unicode.org/wg2/docs/n5361-ProvisionnallyAssigned.pdf), [release](https://www.linuxtoday.com/blog/unicode-18-0-released-with-13007-new-characters/) [P] |

### 2.2 Numbers to quote, with care
- **Corpus size:** "over 6,000" archaic tablets after new finds (Englund 2004) [P]. Wikipedia figures (about 4,000 from Uruk) are older [S].
- **Share:** **about 85% administrative, about 15% lexical lists** (Englund) [P]. The common "90%" figure was not found in sources, so do not use it.
- **Numeral systems:**
  - roughly **13–15 metrological systems**;
  - sexagesimal (base 60) for discrete things;
  - **bisexagesimal** (by 120) for grain products and rations;
  - the **ŠE system** for grain capacity
  ([Proto-cuneiform numerals](https://en.wikipedia.org/wiki/Proto-cuneiform_numerals), [St. Lawrence notes](https://myslu.stlawu.edu/~dmel/mesomath/sumerian.html)) [S].
  - **Design point:** different things were counted with different number systems. That is units of measure and product categories, which is exactly an ERP's job.
- **Ruled cases:** archaic tablets are divided into **ruled rectangular cases**, one entry per box. ANU's hairline square grid is, literally, a tablet's layout [P, visible on Met 1988.433.1–3].

### 2.3 Authentic objects you can use (Met Open Access, **CC0**; `isPublicDomain: true` verified via the Met API on 2026-11-18)
Each object page is `https://www.metmuseum.org/art/collection/search/<id>`. Full-resolution images are on `images.metmuseum.org`.

| Object | Date / period | Accession (id) | Use |
|---|---|---|---|
| **Proto-cuneiform tablet with seal impressions: barley distribution**, with a cylinder-seal rolling of a man, hunting dogs and boars | c. 3100–2900 BCE, Jemdet Nasr | 1988.433.1 ([329081](https://www.metmuseum.org/art/collection/search/329081)), img `DP293243.jpg` | **hero ledger reference**: cases + numerals + seal rolling on one object |
| Tablet: distribution of barley and emmer | same | 1988.433.2 ([327384](https://www.metmuseum.org/art/collection/search/327384)) | case-grid texture |
| Tablet: malt and barley groats, 4.5 × 6.85 cm | same | 1988.433.3 ([327385](https://www.metmuseum.org/art/collection/search/327385)), `DP293245.jpg` | macro close-up for wedge detail |
| **Beveled rim bowl** (ration bowl) | c. 3300–3100 BCE, Late Uruk | 62.70.25 ([325431](https://www.metmuseum.org/art/collection/search/325431)) | "the first standard unit" |
| Bowl fragment with **frieze of bulls** | c. 3300–2900 BCE | 50.218 ([324111](https://www.metmuseum.org/art/collection/search/324111)) | frieze rhythm; Bull of Heaven echo |
| Head of a ram | c. 3500–3100 BCE, Late Uruk | 1981.53 ([326655](https://www.metmuseum.org/art/collection/search/326655)) | Uruk-period sculpture |
| Cylinder seals with modern impressions: **oblique lines** / **geometric** | ED IIIa / ED I | 62.70.75 ([325480](https://www.metmuseum.org/art/collection/search/325480)), 62.70.76 ([325481](https://www.metmuseum.org/art/collection/search/325481)) | **abstract** seal patterns, ideal for a non-figurative frieze |
| Ur III tablets: "balanced account of Dugga" (c. 2039 BCE); "rations of beer, bread, oil and onions for messengers" (c. 2028 BCE) | Ur III | 11.217.3 ([322447](https://www.metmuseum.org/art/collection/search/322447)), 1985.180.2 ([327069](https://www.metmuseum.org/art/collection/search/327069)) | "balanced account" = an accounting headline |
| Triangular label with stamp seal, **for a grain loan** | 7th c. BCE | 57.27.23 ([324617](https://www.metmuseum.org/art/collection/search/324617)) | a "tag/label" UI metaphor |
| Ur headdress (gold, lapis, carnelian); bull's-head lyre ornament | c. 2600–2350 BCE | 33.35.3 ([322903](https://www.metmuseum.org/art/collection/search/322903)), 47.100.81 ([324023](https://www.metmuseum.org/art/collection/search/324023)) | lapis/gold colour sampling only |
| Glazed-brick **striding lion** panels, Babylon Processional Way | 604–562 BCE | 31.13.1 ([322585](https://www.metmuseum.org/art/collection/search/322585)), 31.13.2 ([322586](https://www.metmuseum.org/art/collection/search/322586)) | sample the glaze blue |

**Other sources and their licences:**

| Source | Licence | Usable on anu.ltd? |
|---|---|---|
| The Met Open Access | CC0 | **yes** (verify each object's PD flag) |
| Yale (Babylonian Collection via LUX) | Yale Open Access: images of PD works "for any purpose" ([guide](https://guides.library.yale.edu/openaccess)) [P] | yes, per object |
| CDLI | site text CC BY 4.0, but **artifact images follow per-owner terms**; many restrict commercial use ([terms](https://cdli.earth/terms-of-use)) [P] | reference only, unless the owner permits |
| British Museum (Standard of Ur, Ram, MUL.APIN BM 86378) | CC BY-NC-SA 4.0 | **no** (commercial site) |
| Penn Museum (Ram in a Thicket, Ur) | commercial use needs written approval | no, unless licensed |
| Wikimedia Commons | per file. Photos of 3D objects carry the photographer's licence: e.g. Osama Shukir Muhammed Amin's Iraq Museum photos (Warka Vase etc.) are **CC BY-SA 4.0** ([example](https://commons.wikimedia.org/wiki/File:Inanna_receiving_offerings_on_the_Uruk_Vase,_circa_3200-3000_BCE.jpg)) [S] | yes, with credit; ShareAlike applies to the edited image only |
| Smithsonian 3D | CC0 where marked (§7) | yes, verify |

### 2.4 Font and encoding: Noto Sans Cuneiform
- **Licence and coverage.** SIL OFL 1.1. 1,238 characters across three blocks: Cuneiform U+12000–123FF, Numbers & Punctuation U+12400–1247F, Early Dynastic U+12480–1254F ([Google Fonts](https://fonts.google.com/noto/specimen/Noto+Sans+Cuneiform/about), [Fontsource](https://fontsource.org/fonts/noto-sans-cuneiform/about)) [P]. It is a Neo-Assyrian-style sans, which suits a "modern" wedge.
- **Measured sizes (this session).**
  - Fontsource WOFF2 (v5.2.5): **467,032 bytes**.
  - Notofonts hinted TTF: **819,980 bytes**.
  - Google Fonts `css2?family=Noto+Sans+Cuneiform&text=𒀀𒀭𒁹𒌋`: **3,092 bytes**.
- **Recommendation.**
  - (a) Bake the 6–10 glyphs to inline SVG `<symbol>`s with fontTools (zero font requests, styleable strokes and fills, morphable); or
  - (b) run `pyftsubset NotoSansCuneiform-Regular.ttf --unicodes=U+1202D,U+1202F,U+121A0,U+122BA,U+12079,U+1230B,U+12415 --flavor=woff2` and self-host it (no Google request from Iraq). Load it with `font-display: optional`, and only where glyphs appear.
- **Proto-cuneiform numerals (Unicode 18).** No font was found [U], so draw the archaic numerals (cups and circles made with a round stylus) as SVG. They are the most authentic "ledger" marks of all.
- **Markup.** Wrap glyphs as `<span lang="sux-Xsux" dir="ltr" aria-label="AN, sky">𒀭</span>`. Isolate them inside Arabic text with `unicode-bidi: isolate`.

---

## 3. Visual vocabulary to borrow (abstracted)

### 3.1 Ziggurat terraces → stacked modules
- **Fact.** Ziggurats are **stepped terraces of mudbrick with a temple on top**. Uruk's terrace was rebuilt about ten times, so it grew by accretion.
- **Abstraction.** Implementation layers or Odoo modules dock as terraces (each slightly inset, all hairline). "Rebuilt ten times on the same base" doubles as the upgrade and migration story.
- **Fit.** It fits ink, bone and hairlines perfectly. Render terraces as **outlines, never sandy 3D blocks** in the UI.

### 3.2 Cylinder-seal rollouts → a scroll-driven frieze
- **Fact.** A seal is a carved stone cylinder. **Rolling** it repeats its scene endlessly across wet clay, and it authorised, witnessed and locked storerooms. It was both a signature and an access control.
- **Abstraction.** A hairline frieze that unrolls with scroll. Its motifs are ANU's product pictograms (crane, cabinet, scales, gavel, POS terminal, tablet) drawn in the **flat, frontal, repeating** grammar of seals.
- **Meaning.** It maps to approval, audit trail and e-signature (government and legal workflows).
- **Reference.** The Met's abstract seals (62.70.75, 62.70.76) show that a non-figurative seal language is authentic.

### 3.3 Wedges → ANU's square glyphs (a pattern system)
- **Basic marks.** A reed stylus makes three marks:
  - the **vertical wedge** (DIŠ, "1");
  - the **horizontal wedge** (AŠ);
  - the **Winkelhaken** corner (U, "10").
- **Tablet "cases".** Proto-cuneiform's ruled cases map to the glyph states:

| Tablet case | ANU glyph | Status meaning |
|---|---|---|
| empty case | □ outline | planned |
| case with first wedges | ◧ half | in progress |
| erased or broken clay | ┅ dashed | blocked / at risk |
| fired, sealed tablet | ■ solid (blue = live) | done |

- **The mark.** ANU's four-blade mark and the four strokes of the archaic AN star can **morph into each other** (§5-E). This is the single most ownable move. The current mark's gradient runs to violet `#6a2bd8`; the brief's palette says Signal only. Decide whether the mark keeps its gradient, and in motion use Signal.

### 3.4 Lapis, gold, glazed blue: what fits ink/blue/bone
- **Lapis lazuli.** Royal Cemetery of Ur, c. 2600 BCE: the Standard of Ur, the Ram in a Thicket. The stone came from Badakhshan, about 2,000+ km away, which makes it a story of early long-distance supply chains [S].
  - Commonly swatched as `#26619C` ([colordesigner](https://colordesigner.io/color/26619c)). That is a deeper, greyer cousin of Signal `#2563EB`.
- **Ishtar Gate glazed brick** (Babylon, c. 575 BCE).
  - The blue imitated lapis. The British Museum attributes one fragment's blue to copper ([BM W 1837,1014.8](https://www.britishmuseum.org/collection/object/W_1837-1014-8); [Ishtar Gate](https://en.wikipedia.org/wiki/Ishtar_Gate)) [P/S].
  - The Berlin gate wing stays closed: the Pergamon reopens only its north wing on 4 June 2027; the Ishtar Gate section is expected around 2037 ([AP via WTOP](https://wtop.com/world/2026/05/berlins-pergamon-museum-will-reopen-in-mid-2027-as-a-lengthy-restoration-moves-forward/)) [S].
  - It is Neo-Babylonian, about 3,000 years after Uruk, and heavily used in Iraqi tourism imagery. **Borrow the brick-course rhythm, not the lions.**
- **Gold.** Ur headdress, Ram in a Thicket. Gold reads Gulf-luxury and "pharaoh" kitsch on screens. **Never use it in UI.** At most, use a warm "starlight" pinpoint inside renders.
- **Palette proposal (atmosphere-only tokens; never text, borders or buttons):**

| Token | Hex | Role |
|---|---|---|
| `--ink` | `#090B11` | unchanged: night, text on bone |
| `--sky-lapis-950` | `#0B1533` | deep-night gradient stop (lapis-dark) |
| `--sky-lapis-800` | `#16285E` | dusk band; Way-of-Anu band fill at 40% |
| `--signal` | `#2563EB` | unchanged: the only interactive and live accent; one "live" star per view |
| `--glaze` | `#3F7FD0` | optional 1 px star cores / seal highlights in renders (copper-glaze blue) [U, tune] |
| `--starlight` | `#F4EEDF` | warm pinpoints (≤ 2 px) in renders only |
| `--clay` | `#A27A57` | tablet renders and imagery only; never UI chrome |
| `--bone` | `#F8FAFC` | unchanged |

### 3.5 Star maps and the eight-pointed star
- **MUL.APIN.** It is lists, not drawings. Visualise the **three Ways as three horizontal bands**: honest and graphic.
- **Other material.** There are later circular star diagrams (e.g. the Nineveh "planisphere", BM K 8538, divided into eight sectors [S/U]), but they are BM-licensed. Use them as reference, not as image.
- **Eight-pointed star.** See §1.3. Use the AN sign's **four crossing strokes**; never a disc-framed eight-point star.

### 3.6 Registers (Warka Vase) → page bands
- **Fact.** The Warka Vase (Uruk, c. 3200–3000 BCE, Iraq Museum IM19606) tells its story in **stacked horizontal registers**: water, plants, animals, people, then the goddess at the top. It was looted in 2003 and returned in pieces in June 2003 ([Warka Vase](https://en.wikipedia.org/wiki/Warka_Vase)) [S].
- **Abstraction.** The home page is a vertical sequence of registers rising from earth (ledger, clay) to sky (stars). That is the arc in §8.

---

## 4. Reference sites and directions (2023–2026)
Sites already analysed in `design-research.md` §1 (Igloo, Madar, Midwam, Jisr, GitHub globe, Shopify Editions) are not repeated. Awwwards blocks fetching, so dates come from search snippets [S].

| Site | Recognition | What it does / technique | Phones | Borrow |
|---|---|---|---|---|
| **Getty Presents: Mesopotamia**, getty.edu/mesopotamia (Final Form) | Webby + People's Voice ([Webby](https://www.webbyawards.com/crafted-with-code/getty-presents-mesopotamia/)) [P] | Scroll timeline over photogrammetry-led renders. React + GSAP. Videos converted to **image sequences**. Final Form's toolchain (Squoosh) found **AVIF about 2:1, up to 15:1 smaller than JPG**. Later shipped in five more languages | built for limited bandwidth | the closest precedent: Mesopotamian objects with scroll storytelling, AVIF sequences and multilingual |
| **Space Trash Signs**, spacetrashsigns.org (Serviceplan Innovation, Moby Digg, Privateer, 2024) | Awwwards SOTD; iF and Red Dot listings ([case](https://www.house-of-communication.com/nl/en/cases/privateer-space-trash-signs.html), [Space.com](https://www.space.com/space-trash-constellations-highlight-space-junk-problem)) [S] | **Constellations generated from data**: ten debris "signs" in a web observatory, with transitions between constellations | moderate | "your data becomes constellations": the Way-of-Anu chapter |
| **Rarest Stars Shine Brightest** | Awwwards SOTD, 18 Jan 2025 ([Awwwards](https://www.awwwards.com/sites/rarest-stars-shine-brightest)) [S] | journey through space to "discover hidden stars", each star a person | [U] | one star per client or case |
| **Vaonis** (smart telescopes) / **Hyperia by Vaonis** | Awwwards HM Mar 2025 / Mar 2026 ([1](https://www.awwwards.com/sites/vaonis), [2](https://www.awwwards.com/sites/hyperia-by-vaonis)) [S] | precise hardware brand plus night sky; e-commerce with product video | product video, not realtime | "precision instrument under a real sky" tone |
| **Infinity Constellation** (with.radiance) | Awwwards HM, 22 Dec 2025 ([Awwwards](https://www.awwwards.com/sites/https-www-infinityconstellation-com)) [S] | constellation-led brand site | [U] | review for star-line styling |
| **Alireza** (Immersive Garden, Saudi) | Awwwards, FWA, CSSDA SOTD ([case](https://immersive-g.com/projects/alireza)) [P] | heritage motif (the palm) as the **structural spine**: scroll from leaves to roots, each section a chapter of company history | [U] | a heritage form as the page's skeleton (for ANU: sky to earth registers) |
| **Expo 2020 Dubai identity** (Lippincott) | global identity ([The National](https://www.thenationalnews.com/uae/dubai-expo-s-new-logo-design-inspired-by-ancient-ring-1.165499), [Lippincott](https://lippincott.com/work/dubai-expo-2020)) [S] | logo derived from a **4,000-year-old gold ring** found at Saruq Al Hadid | n/a | proof that an artefact-to-mark story works in the Gulf at scale |
| **AlUla: Tayma and Khaybar** (Siegel+Gale); **Design Space AlUla** (Clara Sancho Studio, Pascal Zoghbi) | brand case studies ([Siegel+Gale](https://www.siegelgale.com/case-study/khaybar-tayma/), [29LT](https://blog.29lt.com/2024/02/18/design-space-alula-logo-custom-type)) [P] | **Dadanitic inscriptions and rock carvings** turned into modern logotypes; Arabic wordmark built from Jabal Ikmah inscriptions | n/a | ancient script → modern type, done respectfully |
| **Google Arts & Culture + WMF, "Preserving Iraq's Heritage"**; **"Art & Soul of Mosul"** (2021) | Google ([Babylon](https://www.blog.google/topics/arts-culture/world-monuments-fund-babylon-iraq/), [Mosul](https://blog.google/outreach-initiatives/arts-culture/mosuls-art-soul-comes-to-life/)) [S] | drone footage plus **3D models** of the Ishtar Gate and Mosul landmarks | GA&C viewer | Iraqi users already know "heritage in 3D"; ANU should feel more precise, not more theatrical |
| **Stellarium Web**, stellarium-web.org | open source (GPL-2.0 engine) | realtime WebGL sky in the browser, with sky cultures including **Babylonian MUL.APIN** | heavy | reference for star rendering and labelling; do not embed |
| Codrops: [particles galaxy](https://tympanus.net/codrops/2022/06/21/creating-a-particles-galaxy-with-three-js), [scroll-based three.js](https://tympanus.net/codrops/2022/01/05/crafting-scroll-based-animations-in-three-js/) | tutorials | points shader plus scroll camera | tune for mid tier | technique only |

**Phone reality.** None of the celestial award sites publish mobile metrics. Getty's AVIF-sequence approach and design-research's "poster first, GL optional" pattern are the proven paths.

**Mood-board search directions (open, curate, don't copy):**
- **Behance:**
  - Searches: [sumerian](https://www.behance.net/search/projects/sumerian), [cuneiform](https://www.behance.net/search/projects/Cuneiform), [ziggurat](https://www.behance.net/search/projects/ziggurat).
  - Picks: [Alef Design "Ziggurat"](https://www.behance.net/gallery/57743719/Ziggurat), a construction group logo built from the Chogha Zanbil plan in 1/5/11 lines, close to ANU's hairline logic; [Yousif Aziz](https://www.behance.net/yousif_aziz), vector Mesopotamian stars and symbols; [Ziad Al Halabi, Alrafidain Group rebrand](https://ziadalhalabi.myportfolio.com/alrafidain-group), a Baghdad holding company with a Sumerian and water motif.
- **Iraqi design archive:** [Designed in Iraq: cuneiform](https://designediniraq.org/entry/cuneiform/) and its colour, shape and pattern guide ([about](https://designediniraq.org/about/)).
- **Dribbble:** [cuneiform](https://dribbble.com/search/cuneiform), [constellation ui](https://dribbble.com/search/constellation-ui), [star map dark ui](https://dribbble.com/search/star-map).
- **Pinterest phrases:** "sumerian modern branding", "cuneiform pattern minimal", "ziggurat logo line", "cylinder seal rollout", "celestial tech website dark", "star chart hairline design", "Ishtar gate brick pattern minimal".

---

## 5. Scroll components (concrete, light, RTL-aware)
- **Shared rules.** Default to the final state, then add `@supports (animation-timeline: view())` and `@media (prefers-reduced-motion: no-preference)`. Only `transform` and `opacity` animate on large layers. `--dir: 1 | -1` mirrors horizontal motion (design-research §7.5). The **sky never mirrors**: stars are real positions.
- **Compositor note.** `transform`, `opacity` and `filter` run off the main thread. Chromium can composite `clip-path` and `background-color` in some cases, but SVG `stroke-dashoffset` and gradients repaint on the main thread ([Chrome blog](https://developer.chrome.com/blog/hardware-accelerated-animations)) [P/U]. Keep repainting elements small.

**A. "Way of Anu" progress band** (all tiers, about 1 KB CSS)
- **Build.** A fixed 2 px band carries 23 tiny ticks, one per MUL.APIN star of Anu. Under it, a 1 px Signal fill is `scaleX` from 0 to 1 on `animation-timeline: scroll(root)`. Each chapter lights its named star with a `view()` timeline on that section. Label it in Roboto Mono, e.g. `MUL.APIN I · 23 STARS OF ANU`.
- **Fallback.** A static band with the current chapter tick filled. The `aria-hidden` band never replaces real navigation.
- **RTL.** `transform-origin: right` under `:dir(rtl)` ([MDN :dir()](https://developer.mozilla.org/en-US/docs/Web/CSS/:dir)); the ticks keep sky order.
```css
.anu-way__fill{transform:scaleX(1);transform-origin:left}
:root:dir(rtl) .anu-way__fill{transform-origin:right}
@supports (animation-timeline: scroll()){@media (prefers-reduced-motion:no-preference){
 .anu-way__fill{animation:way linear both;animation-timeline:scroll(root)}}}
@keyframes way{from{transform:scaleX(0)}to{transform:scaleX(1)}}
```

**B. Dusk to night sky** (all tiers)
- **Build.** Three fixed full-viewport layers (`--sky-lapis-800` dusk, `--sky-lapis-950`, `--ink`), each a static gradient. Crossfade their **opacity** on `scroll(root)` ranges (0–30%, 30–70%, 70–100%).
- **Why not `@property` colour interpolation?** It repaints a full-screen gradient every frame, which hurts on weak Android.
- **Fallback.** Low tier uses a single static ink-to-lapis gradient. Set `color-scheme: dark` on `html`, and keep text contrast at AA on the lightest stop.

**C. Starfield parallax** (mid+; low = static)
- **Build.** Reuse `public/brand/sky-far.svg` (6.5 KB) and `sky-near.svg` (1.7 KB) as tiled backgrounds on two fixed layers. `translateY` at 4% and 10% of `scroll(root)`.
- **Twinkle.** At most 12 separate star nodes run a 4–7 s `opacity` loop, paused off-screen via `animation-play-state`.
- **High tier.** One raw-WebGL2 `gl.POINTS` pass (about 3–5 KB of code) draws the ~600 stars brighter than magnitude 5 from real positions, with size from magnitude and a slow twinkle. DPR ≤ 1.5; stop when hidden.
- **Fallback.** SVG layers without motion.
- **RTL.** No mirroring.

**D. Constellations that connect** (mid+)
- **Data.** Pre-project about 8 Anu-path asterisms (Field = Pegasus square, Hired Worker, Furrow, Scales, Bull of Heaven, True Shepherd, Arrow, Pleiades) from Hipparcos RA/Dec to 2D at build time, into **one SVG** of 8–20 lines each (≤ 6 KB).
- **Draw method 1, cheap repaint.** `<line pathLength="1" stroke-dasharray="1" stroke-dashoffset="1">` animated to 0 by `view()`.
- **Draw method 2, compositor-only.** Each line is an absolutely positioned 1 px `<i>` with `transform: rotate(θ) scaleX(0→1)` and `transform-origin: 0 50%`.
- **Labels.** Format: `𒀯 THE FIELD · IKU · Pegasus` in mono, with the AR label «الحقل» in Tajawal. Each label links to the matching product.
- **Fallback.** Lines drawn and static. Every label is real HTML text (for crawlers and accessibility).

**E. The mark assembles from four wedges** (all tiers; hero)
- **Build.**
  1. Four SVG wedges (stylus triangles) start rotated and offset, then settle with `--ease-settle` into the archaic **AN star** (four crossing strokes).
  2. On the next scroll beat they **crossfade into ANU's four-blade mark** (same centre, same 4-fold symmetry).
  3. True path morphing via the CSS `d` property is not Baseline. Safari support is uncertain [U] ([MDN d](https://developer.mozilla.org/en-US/docs/Web/CSS/d)), so ship the crossfade. Pre-bake morph frames only if wanted.
- **Above the fold.** Plays once on load (CSS, under 700 ms) and never blocks LCP; the H1 is visible at first paint.
- **Fallback.** The static mark.
- **RTL.** Symmetric; no change.

**F. Clay tablet → ledger rows** (all tiers; the Odoo/ERP chapter)
- **Build.**
  1. A 960 px AVIF render (≤ 60 KB) of a tablet with ruled cases (Blender, §6), with a **hairline SVG case-grid overlay** aligned to it.
  2. As the section crosses (`view()`), each case's wedge marks fade (`opacity`) while an HTML ledger row slides 8 px into place: glyph status □◧■ + Roboto Mono tabular numbers.
- **Copy beat.** «٢٨٬٠٨٦ وحدة شعير · ٣٧ شهرًا · كوشيم» (28,086 barley · 37 months · Kushim) turns into an invoice line (`INV/2026/0042 · 37 days · ANU`). Caption the source tablet.
- **Numbers.** Use `@property --n { syntax:'<integer>' }` plus `counter()` to count up. It runs on the main thread but is tiny; low tier shows the final values.
- **RTL.** Rows and numerals are RTL (Arabic-Indic digits via `Intl.NumberFormat('ar-IQ')`). Cuneiform glyphs inside stay `dir="ltr"`, isolated. Case order runs right-to-left, which is historically apt (§1.3).

**G. Cylinder-seal frieze rolls with scroll** (mid+; government and legal chapter)
- **Frieze.** A 72–96 px band holds a seamless SVG tile (3–6 KB) of ANU pictograms in seal grammar, `background-repeat: repeat-x`.
- **Seal.** A 36-frame **AVIF sprite of a rotating seal** (pre-rendered, about 40 KB), or a CSS cylinder: an `overflow:hidden` pill whose inner strip translates while a static highlight gradient overlay shades it. It moves across with `translateX(calc(var(--p) * 100% * var(--dir)))` on `view()`.
- **Reveal.** An ink "cover" element slides away behind the seal (`translateX`, compositor-only), unveiling the impression as if rolled into clay.
- **Close.** End on a **solid ■ "sealed"** glyph and a line such as "Approved. Witnessed. Archived."
- **Fallback.** A static frieze with the seal parked at the end.
- **RTL.** Rolls from the right (`--dir: -1`). The motifs are symmetric and don't need mirroring.

**H. Ziggurat terraces dock** (mid+; method or implementation chapter)
- **Build.**
  1. A sticky section 200–300 vh tall holds 6 terraces (Discover → Configure → Migrate → Train → Go-live → Support), each a hairline box inset by one grid step.
  2. Each terrace rises 24 px and fades in on staggered `animation-range: contain 10% contain 25%` … steps (CSS only).
  3. The top step gets the blue ■.
  4. Optional: a pre-rendered 4 s loop of the stepped form in Line-Art style (§6) behind it at 30% opacity.
- **Fallback.** A static stepped stack; no sticky on low tier (sticky plus tall sections can feel like scrolljacking on small screens).
- **RTL.** The inset steps mirror via logical `margin-inline-start`.

**I. Ways of the sky as the section index** (all tiers; footer or overview)
- **Build.** Three horizontal bands (Enlil / Anu / Ea) form a site map. Products sit on Anu's band; company, careers and contact on Enlil's; support and docs on Ea's. Pure HTML and CSS.
- **RTL.** Mirrors normally (it's navigation, not sky).

**Budget for all of the above:** ≤ 8 KB CSS, ≤ 25 KB SVG, ≤ 120 KB AVIF on the home page's first two screens; WebGL stars ≤ 5 KB, high tier only. This sits inside design-research §7.2.

---

## 6. Rendering: Blender (this Linux PC) and Unreal (optional)

### 6.1 State of this machine
- **Hardware.** The GPU is an **RTX 3060 Laptop, 6 GB**. Blender is **not installed**.
- **Install** **Blender 5.2 LTS** (released 14 July 2026, supported to July 2028) from the official tarball ([5.2 LTS](https://www.blender.org/releases/5-2/)). Use Cycles with OptiX.
  - 5.2's new Cycles **texture cache** (reported up to 80% less memory) helps with 6 GB VRAM ([CG Channel](https://www.cgchannel.com/?p=177211)) [S].

### 6.2 Colour management (premium look)
- **AgX** has been the default view transform since 4.0. Blender 5.0 (Nov 2025) added AgX HDR, **ACES 1.3/2.0** views, per-file working spaces (ACEScg, Rec.2020) and HDR display (Rec.2100 PQ/HLG) ([5.0 notes](https://www.blender.org/download/releases/5-0/), [80.lv on ACES 2.0](https://80.lv/articles/blender-5-0-s-aces-2-0-view-transform-explained)) [P/S].
- **For web sRGB deliverables:** AgX with the "Base Contrast" or "Punchy" look, exposure tuned on a calibrated sRGB monitor.
- **Keep AgX for brand stills.** Use ACES only if grading with Unreal footage in Resolve. Note that picking an ACES view does **not** switch the working space automatically.

### 6.3 Stylised night sky
- **Real sky (backgrounds and HDRI).**
  - World → Environment Texture with **NASA SVS Deep Star Maps 2020** (equirectangular EXR, 4K at 34 MB, 8K at 125 MB; 1.7 billion stars from Hipparcos-2, Tycho-2 and Gaia DR2; public domain; §7). Rotate to Baghdad's latitude (about 33.3°N) for an honest "sky over Iraq".
  - Alternative: Poly Haven **Rogland Clear Night** (CC0, desert, Milky Way).
- **Stylised (brand) sky.**
  - Voronoi Texture (F1 distance) → Math Power (8–20) → ColorRamp gives pinpoint stars. Layer 2–3 scales with a White Noise mask for magnitude spread ([80.lv nebula setup](https://80.lv/articles/spectacular-space-nebula-shader-set-up-with-blender/)) [S].
  - Tint 90% bone, 8% Signal, 2% starlight.
  - Add a faint **Way-of-Anu band**: a Gradient Texture across the celestial equator, masked to ±17°, with 3–5% emission.
- **Data-driven constellations.**
  - Load a CSV of Hipparcos stars (RA, Dec, Vmag) with Python into a point cloud (`mesh.from_pydata`, plus a `magnitude` attribute).
  - Geometry Nodes: Instance on Points (ico-sphere 0, emission scaled by `10^(-0.4·mag)`).
  - Constellation edges: Curve Line → Curve to Mesh with a 0.0005 profile, or Grease Pencil strokes for crisp hairlines.
- **Denoising.** Stars are tiny, and denoisers smear them. Render stars on a separate view layer with **denoise off**, then composite.

### 6.4 Clay tablet with impressed wedges
- **Form.** A cube with Bevel and Subdivision gives a "pillowed" tablet (4.5 × 6.9 × 1.6 cm like Met 1988.433.3). Slight Simple Deform bend, plus a Displace with low-frequency noise.
- **Wedges.** A GN grid of points per **ruled case** instances a stylus mesh (a triangular pyramid, plus a cylinder for round numerals). Carve with **SDF Grid Boolean (Difference)** (5.0+: Mesh to SDF Grid → SDF Grid Boolean → Grid to Mesh) ([manual](https://docs.blender.org/manual/en/5.2/modeling/geometry_nodes/volume/operations/sdf_grid_boolean.html), [5.0 GN notes](https://developer.blender.org/docs/release_notes/5.0/geometry_nodes/)) [P]. Alternative: the Mesh Boolean node.
- **Material.** ambientCG **Clay005–009** or Poly Haven **clay_plaster / mud_cracked_dry_03** (CC0), tinted toward `--clay`. Roughness 0.85–0.95. Pointiness or AO masks for dust in the wedges.
- **Light.** **Raking light**: a key at 10–20° above the surface, as epigraphers photograph tablets. It makes wedges legible.
- **Brand variants.** Bone tablet on ink; or ink tablet with a single Signal-lit case.

### 6.5 Ziggurat
- **Form.** GN stack: 3–7 scaled boxes with decreasing size, a central stair instance and buttress ribs (array on the faces). Base the proportions on the Ur reconstruction (Woolley) and the Uruk terrace (§1.1).
- **Line art.** The **Grease Pencil Line Art** modifier gives hairline renders that match ANU's language. Export stills or SVG for the web, so you get "3D" geometry as 2D hairlines with zero runtime cost.
- **Shaded variant.** Mud-brick (Brick Texture node) at a 33 cm brick module, lit at blue hour. Keep it as the "film" look, not the UI.

### 6.6 Premium "product art"
- **Lights.** Large softbox key (an area light 2–3× object size, close), rim/kicker for edge separation, **negative fill** (black planes) to carve shape. Small light sources only for glints.
- **Camera.** 70–100 mm equivalent for objects (less distortion, monumental), f/4–8 DOF, eye-level or slightly low for "monument".
- **Loops.** 4–6 s at 30 fps; cyclic F-curves; motion blur on for camera moves, off for turntables.
- **Output.** 16-bit EXR or PNG, then ffmpeg (design-research §6.3). Render both 16:9 and **4:5 portrait** (mobile hero). Never bake text into renders; text stays HTML.
- **Arabic text in Blender.**
  - Blender text objects still do not shape Arabic: no joining, no RTL ([Blender issue #67452](https://projects.blender.org/blender/blender/issues/67452), [devtalk](https://devtalk.blender.org/t/help-needed-with-rtl-complex-language-support/37819)) [P].
  - If type must appear in 3D, export shaped text as SVG paths from a browser or Inkscape and import the curves. Paid HarfBuzz add-ons exist [S].
- **Python.** Parameterise renders (`blender -b anu.blend -P render.py -- --scene tablet --aspect 4x5 --lang ar`). Fix `scene.cycles.seed`. Set `prefs.addons['cycles'].preferences.compute_device_type='OPTIX'` in the script. Keep one `.blend` per motif and assets linked from a library file.

### 6.7 Unreal Engine 5: what it adds and whether it is worth it
- **Version.** **UE 5.8** (17 June 2026) is billed as the last major UE5 release. It adds **Lumen Lite** (reported about 2× faster GI) and makes **MegaLights** production-ready ([release notes](https://dev.epicgames.com/documentation/unreal-engine/unreal-engine-5-8-release-notes), [Guru3D](https://guru3d.com/story/unreal-engine-58-debuts-lumen-lite-and-productionready-megalights/)) [P/S]. UE6 early access is expected in 2027 [S].
- **What it would add for ANU.**
  - **Sky Atmosphere**: physically based Rayleigh and Mie dusk-to-night transitions. **It has no stars**, so add a sky sphere with the SVS star map ([docs](https://dev.epicgames.com/documentation/unreal-engine/sky-atmosphere-component-in-unreal-engine), [forum](https://forums.unrealengine.com/t/add-stars-night-material-to-sky-atmosphere/459844)).
  - Volumetric clouds and dust.
  - **Niagara** for drifting dust or "stars condensing into a tablet".
  - Lumen GI for a sunlit shrine interior.
  - **Movie Render Graph** plus the path tracer for final frames (5.7 improved EXR metadata and naming) ([CG Channel](https://www.cgchannel.com/2025/11/unreal-engine-5-7-five-key-features-for-cg-artists/)).
  - Teams use it for **marketing films** and realtime look-dev, rendering offline to video. Pixel streaming stays off the table (design-research §6.2).
- **Linux.**
  - Official precompiled Linux builds are downloadable **only when signed in with an Epic account** at unrealengine.com/linux ([Epic forum](https://forums.unrealengine.com/t/pre-compiled-linux-unreal-engine-installation/609358)).
  - Size: the 5.5.4 zip was about 25 GB, about 43 GB extracted [S].
  - Ubuntu 22.04 is the recommended OS ([Linux requirements](https://dev.epicgames.com/documentation/unreal-engine/linux-development-requirements-for-unreal-engine)) [P].
  - There is no Epic Games Launcher on Linux; Fab assets come via the browser.
  - On a 6 GB laptop GPU, Lumen and path-traced 4K cinematics are VRAM-bound. **Verdict:** feasible for tests, painful for production.
- **Windows (owner's PC).** First-class Launcher, Fab and drivers. Run the cinematic there.
- **Licence.** Free under $1 M revenue (design-research §6.2).

### 6.8 Recommended pipeline
1. **Now, on Linux with Blender 5.2 LTS:**
   - Four motifs (tablet, seal, ziggurat line-art, stylised sky), rendered as AVIF posters (≤ 60 KB mobile), AV1 + H.264 loops (≤ 1.5 MB, 4–6 s), a 36-frame seal sprite, and Line-Art SVGs.
   - One `render.py` driving aspect, language and variant.
   - Assets archived with their licences.
2. **Web:**
   - The sky is CSS/SVG on all tiers.
   - Videos only on mid and high tiers after load.
   - One WebGL star pass on high tier only.
   - No realtime ziggurat or tablet models on the home page.
3. **Optional, on Windows with UE 5.8:**
   - A 45–60 s brand film, "From Uruk to ANU": dusk over a stepped terrace, wedges pressed into clay, stars connecting into the Way of Anu, cut to the product UI.
   - Blender meshes come over via USD or FBX.
   - The film is for YouTube and LinkedIn; the web gets 6 s cutdowns (AV1) behind posters.

---

## 7. Free / CC0 assets (verify each before shipping, and archive the licence)

| Asset | Licence | Notes |
|---|---|---|
| **NASA SVS Deep Star Maps 2020** ([4851](https://svs.gsfc.nasa.gov/4851)), equirectangular; EXR 4K/8K/16K/32K/64K + celestial-grid TIFs | **Public domain** ("all of our content is in the public domain unless otherwise noted", [SVS help](https://svs.gsfc.nasa.gov/help/)) [P] | credit NASA/Goddard SVS, with Gaia data credited ESA/Gaia/DPAC; no NASA insignia, no implied endorsement |
| NASA SVS Tycho Catalog Skymap v2 ([3572](https://svs.gsfc.nasa.gov/3572/)) | public domain | lighter, older |
| ESA Gaia sky maps ([Gaia's sky in colour](https://www.esa.int/de/media/gaia-s-sky-in-colour)) | **CC BY-SA 3.0 IGO** (ShareAlike) [P] | edits must be shared under the same licence; credit ESA/Gaia/DPAC |
| ESO images ([copyright](https://www.eso.org/public/outreach/copyright/)) | **CC BY 4.0** unless noted [P] | clear, visible credit; adaptation allowed |
| **Poly Haven night HDRIs** (API-listed): `rogland_clear_night` (arid desert, Milky Way), `rogland_moonlit_night`, `kloppenheim_02`, `satara_night_no_lamps`, `moonless_golf`, `qwantani_night`, `clarens_night_01/02`, `dikhololo_night`, `lakeside_night` | **CC0** ([licence](https://polyhaven.com/license)) [P] | e.g. [rogland_clear_night](https://polyhaven.com/a/rogland_clear_night) |
| Poly Haven textures: `clay_plaster`, `clay_block_wall`, `clay_floor_001`, `patterned_clay_wall`, `mud_cracked_dry_03`, `brown_mud_dry` | **CC0** | tablet surface, mud brick |
| **ambientCG**: `Clay001`, `Clay005`–`Clay009`, `GlazedTerracotta001`–`003` (glazed-brick reference), `RoofingTiles0xx` | **CC0** ([licence](https://docs.ambientcg.com/license/)) [P] | e.g. [Clay005](https://ambientcg.com/view?id=Clay005) |
| Star data: [d3-celestial](https://github.com/ofrohn/d3-celestial) (stars to mag 6, constellation lines, Milky Way GeoJSON) | code **BSD-3**; check `data/` provenance [U] | the fastest route to a ≤ 10 KB star JSON |
| [HYG database](https://github.com/astronexus/HYG-Database) | repo licence "other" (README states CC BY-SA 4.0 for recent versions) [U] | ShareAlike on the data file |
| Stellarium **Babylonian MUL.APIN** sky culture ([source](https://github.com/Stellarium/stellarium/tree/master/skycultures/babylonian_mulapin)) | **CC BY-ND 4.0** [P] | reference only; draw your own lines |
| **Smithsonian 3D**: baked clay cuneiform tablet, Iraq (NMNH Anthropology, acc. 106940) ([3d.si.edu](https://3d.si.edu/object/3d/assyrian-baked-clay-cuneiform-tablet:761f8e4b-f943-44c4-bcc9-43795999566d)) | labelled **CC0**, but the page also shows non-commercial download terms [S, conflicting] | confirm on the page before use; good scan for a hero tablet |
| Sketchfab CC BY tablets: [Nuzi tablet](https://sketchfab.com/3d-models/cuneiform-tablet-e33282e3992f43fd9dc1b0161ecffd29), [FSU Babylonian tablet](https://sketchfab.com/3d-models/babylonian-cuneiform-clay-tablet-circa-2500-bc-266219fab385446a8eb3e4cc9f0c761d), [Mount Holyoke tablet](https://sketchfab.com/3d-models/babylonian-cuneiform-tablet-open-c4d41399b7eb41c3a83d0deac9ed61b6) | **CC BY** (credit) [S] | the BM low-poly tablet is CC BY-NC-SA (**no**); Sketchfab's [CC0 heritage programme](https://sketchfab.com/blogs/community/sketchfab-launches-public-domain-dedication-for-3d-cultural-heritage) has more |
| **HeiCuBeDa** Hilprecht collection (Jena): about 1,977 high-res tablet scans ([DOI](https://doi.org/10.11588/DATA/IE8CCN)) | open access; exact licence to confirm. Sister set MaiCuBeDa is CC BY-SA 4.0 [S] | the best for wedge geometry studies |
| Ur ziggurat: Penn's Ur project model on Sketchfab and Thingiverse ([project note](https://web.sas.upenn.edu/lagash/?p=235395)) | licence unverified | otherwise paid CGTrader/RenderHub models; or build it procedurally (§6.5) |
| Met CC0 images (§2.3); Yale PD images; Commons CC BY-SA (Iraq Museum photos) | see §2.3 | |
| Noto Sans Cuneiform | OFL 1.1 | subset or SVG (§2.4) |

---

## 8. Recommended creative direction (one page)

### Name: **Way of Anu: the sky ledger** · **طريق آنو: سجل السماء**
**The idea.** The first thing Uruk wrote down was a ledger, and the first thing it named was the sky. ANU keeps Iraq's records with the precision of the first scribes and the overview of the sky. The story runs **from clay to stars**: from a single wedge to a working constellation of systems.

**Home page arc (dusk → night; seven registers rising from earth to sky):**
1. **Dusk / the mark.** Lapis-dusk sky (B). Four wedges press in and settle into the AN star, then become ANU's four-blade mark (E). The H1 is visible at first paint: *Software for how Iraq works.* The Way-of-Anu band (A) appears at the edge.
2. **Before writing, counting.** Tokens, then a tablet, then ledger rows (F). Kushim's barley line becomes an invoice. Odoo ERP implementation and its numbers.
3. **The Way of Anu.** Stars appear (C) and **constellations connect** (D):
   - the **Field** → real-estate twins;
   - the **Hired Worker** → HR and payroll;
   - the **Furrow** → inventory and furniture CNC;
   - the **Scales** → accounting and legal;
   - the **Arrow** → ports and logistics;
   - the **True Shepherd of Anu** (Papsukkal, the vizier) → government workflows.

   Each label is preceded by 𒀯 MUL and links to its product.
4. **The seal of record.** The cylinder-seal frieze rolls (G): approve, witness, archive. Legal and government workflows, and POS receipts.
5. **Terraces.** The ziggurat docks (H): the implementation method in six steps, ending with a blue ■ "live".
6. **Twins under the sky.** A port and a property in hairline line-art, then a pre-rendered loop (a poster on low tier), linking into product pages (design-research's realtime-on-product-routes rule).
7. **Night ledger / proof.** Full night. Clients and case numbers as a quiet field of named stars; one Signal star for the CTA ("Talk to ANU"). Footer: Ways of the sky site index (I) plus "Motion: Full / Calm / Static".

**Motion signatures (one per section, max):**
- **Settle:** the existing 280 ms liquid ease.
- **Press:** stylus-like arrival, scale 1.015→1 over 120 ms, then settle.
- **Connect:** hairlines draw star to star.
- **Roll:** horizontal, tied to reading direction.
- **Rise:** terraces dock from below.

Everything ends still. Nothing loops forever except the faint twinkle (≤ 12 stars).

**Palette.** Ink, bone and Signal are unchanged. Add atmosphere-only `--sky-lapis-950 #0B1533` and `--sky-lapis-800 #16285E`, plus render-only `--clay #A27A57`, `--starlight #F4EEDF` and `--glaze #3F7FD0`. No gold and no violet in UI.

**Typography.**
- Inter Tight and Tajawal, unchanged.
- Roboto Mono for **catalogue-style captions** (`MUL.APIN I ii 18 · GU₄.AN.NA · Taurus`, `Met 1988.433.1 · c. 3100 BCE`) and tabular ledger numbers. Arabic-Indic digits on `/ar`.
- Real cuneiform glyphs (subset or SVG) used only as **markers and determinatives** at 0.9–1.2 em, always with `aria-label`, always LTR-isolated; never as body text or fake script.
- A small "translation" hover or tap on each glyph shows the reading and meaning. It teaches, and Iraqi visitors will enjoy checking it.

**Copy tone.** Factual pride, short sentences, sources in captions. EN: *"Anu is the Sumerian word for sky."* AR: «آنو اسم السماء عند السومريين». Never "god of your business".

**What NOT to do:**
- **No gods or idols.**
  - No bearded Anu, no lamassu mascots, no Ishtar figures.
  - No "divine" claims in copy.
  - No Anunnaki, aliens, Nibiru or "lost knowledge".
- **No kitsch shapes or colours.**
  - No disc-framed eight-pointed star or ۞-like overlapping squares.
  - No gold-on-black luxury, papyrus, sandstorms or Egyptian cross-overs.
  - No faux-cuneiform fonts for headlines.
- **No politics or trauma.**
  - No Saddam-era Babylon, Qasim-flag or Ba'ath iconography.
  - No national maps with internal borders.
  - No war or looting imagery.
- **No unlicensed images.** No British Museum or Penn images; no un-checked Commons files.
- **No slow 3D.**
  - No realtime ziggurat or tablet on the home page.
  - No canvas as the LCP.
  - No sky that blocks text.
  - No scrolljacked "journeys". Native scroll with sticky sections only where short.
- **No mirrored sky in RTL.** Mirror the UI and motion direction, never the stars.

**Next steps:**
1. Settle the brand-mark gradient question.
2. Build A, B, C and E in CSS/SVG on `/en` and `/ar`, then measure INP on a mid-range Android.
3. Install Blender 5.2 LTS and render tablet and seal posters.
4. Build D and F with real data and captions.
5. Review the copy and glyph meanings with an Iraqi reader (and ideally an Assyriologist) before launch.
