# Econ Tutor · Product Requirements Document

| | |
| --- | --- |
| **Product** | Econ Tutor: interactive SPM Economics (KSSM), STPM Economics (944) and Matrikulasi Economics (AE015, AE025) study site |
| **Owner** | Economics teacher (repo owner, GitHub `AidilFarhan`) |
| **Audience** | The owner's Form 4 and Form 5 Economics students, STPM (Form 6) Economics students and Matrikulasi (Semester 1–2) Economics students |
| **Status** | v1 live at `econwebsite.vercel.app` (sign-in required) |
| **Last updated** | 29 September 2026 |

Related: [ARCHITECTURE.md](ARCHITECTURE.md) · [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) · [AGENTS.md](AGENTS.md)

---

## 1. Problem

SPM Economics is graph-heavy and definition-heavy. Students currently learn from:

- **Static textbooks.** Students see a finished demand–supply or cost diagram but never *move* it, so shifts, surpluses, tariffs and intersections stay abstract.
- **Scattered practice.** Trial papers, marking schemes and teacher notes sit in separate PDFs that are hard to use on a phone and give no feedback.
- **Passive revision.** Students re-read instead of recalling. There is no simple way to drill definitions or check understanding chapter by chapter.

The teacher wants **one place**, faithful to the textbook, where students can read, manipulate graphs, drill, and practise real exam questions with the scheme. Access should be limited to their own students.

## 2. Goals and non-goals

### Goals
1. Cover **every chapter** of the Form 4 and Form 5 textbooks with complete notes in textbook order and wording, plus the STPM 944 and Matrikulasi AE015/AE025 syllabi from the owner's modules and slides.
2. Make every important diagram **interactive**. Students drag curves, price lines and nodes, and immediately see values and reasoning.
3. Support **active recall**: flashcards and quizzes per chapter and per form, with explanations.
4. Let students **practise every syllabus calculation** with a calculator that shows the formula, the answer and the worked steps.
5. Provide **exam practice** with state trial papers: Kertas 1 as a timed quiz, and Kertas 2 with answer boxes and self-marking against the scheme.
6. Work well on **phones**, in light and dark mode, including slow connections.
7. Restrict access to **students the teacher approves** (Google or email sign-in with an allowlist).
8. Stay **free to run** and **easy for the teacher to maintain**, with no build tools and content in plain files.

### Non-goals (v1)
- Student accounts with synced progress across devices, and a teacher dashboard of student results.
- Content authoring UI (content is edited in data files).
- Chat, forums, AI tutoring or video.
- Subjects other than Economics, and languages other than Bahasa Melayu for student-facing content.
- Publishing the source PDFs (textbooks, teacher notes, exam papers).

## 3. Users

| Persona | Context | Needs |
| --- | --- | --- |
| **Form 4 student** | First exposure to economics; phone-first; studies in short bursts | Clear notes, "see it move" graphs, quick recall drills |
| **Form 5 student (SPM candidate)** | Revising all chapters; practising papers before SPM | Chapter and mixed quizzes, trial papers with schemes, knowing what is left to revise |
| **STPM student** | Form 6, preparing for STPM Ekonomi 944 across three terms | Complete notes per penggal, interactive graphs, flashcards, calculators for STPM formulas |
| **Matrikulasi student** | Semester 1 (AE015 Mikroekonomi) or Semester 2 (AE025 Makroekonomi) | Notes that follow the lecture slides, graphs from the slide tables, flashcards, calculators for the course formulas |
| **Teacher (owner/admin)** | Curates content, controls access, low time for tooling | Faithful content, simple access list, changes go live without manual merging, no maintenance burden |

## 4. User stories

| # | As a… | I want to… | So that… |
| --- | --- | --- | --- |
| U1 | student | read a chapter in textbook order with a table of contents | I can follow the syllabus and jump to a subtopic |
| U2 | student | drag a demand or supply curve and see the new equilibrium price and quantity | I understand shifts instead of memorising pictures |
| U3 | student | hover or slide along a cost curve and read exact values, including decimals | I can link the table, the formula and the graph |
| U4 | student | flip flashcards and mark "Dah ingat" or "Ulang lagi" | I focus on what I haven't memorised |
| U5 | student | take a chapter quiz and see why each answer is right | I learn from mistakes immediately |
| U6 | student | take a trial Kertas 1 in its original order with a timer | I practise under exam conditions |
| U7 | student | write a Kertas 2 answer, reveal the scheme and tick the points I made | I can estimate my mark and see what I missed |
| U8 | student | see my progress and continue where I left off | I know what to revise next |
| U9 | student | sign in with my Google account or email | I can get in quickly without another password to remember |
| U10 | teacher | allow only my students' emails | the materials stay within my class |
| U11 | teacher | add a new trial paper or fix a note by editing one file | I can maintain the site myself |
| U12 | student | enter the numbers from a question (Ed, PBG, IHP, KDNK…) and see the answer with the working | I can check my own calculation and learn the steps the scheme expects |

## 5. Functional requirements

Status key: ✅ shipped · ⏸ built but hidden · 🔜 planned

### 5.1 Notes: ✅
- **FR-1** Six SPM chapters: T4 Bab 1–4 and T5 Bab 1–2. Subtopics are numbered as in the textbook (e.g. 1.3.4).
- **FR-1b** Fourteen Matrikulasi chapters: AE015 Mikroekonomi Bab 1–6 (Semester 1) and AE025 Makroekonomi Bab 1–8 (Semester 2), rewritten from the owner's lecture slides. Source errors are corrected in "Nota semakan" boxes; AE015 2.2–2.4 and 6.5 Oligopoli are marked *cadangan* until the owner supplies the slides. No Matrikulasi quizzes for now.
- **FR-1c** The home page shows level buttons (Tingkatan 4, Tingkatan 5, STPM, Matrikulasi, Ijazah Sarjana Muda) under the introduction; each opens `#nota-<level>`. The notes page has the same buttons as a filter; Ijazah Sarjana Muda shows an "Akan datang" notice until content exists.
- **FR-1a** Sixteen STPM chapters (Ekonomi 944): Penggal 1 Bab 1–5, Penggal 2 Bab 1–5, Penggal 3 Bab 1–6, written from the owner's modules. Numeric errors in a module are corrected and flagged with a "Nota semakan" box. STPM chapters have notes and flashcards; STPM quizzes are not included for now.
- **FR-2** Each chapter shows guiding questions, definitions, formulas, worked calculations, tables, examples and exam tips as styled callouts.
- **FR-3** A sticky table of contents highlights the current section. "Tandakan selesai dibaca" records completion, and there is a link to the next chapter.
- **FR-4** Data, examples and exercises follow the textbook. The T5 notes include the textbook's *Latihan Sumatif*. Teacher notes are used as reference only.

**Acceptance.**
- Every textbook subtopic has a matching section.
- Numbers match the textbook tables.
- No page scrolls horizontally at 360 px.

### 5.2 Interactive graphs: ✅
- **FR-5** 103 graphs are embedded in the notes (36 SPM, 29 STPM, 38 Matrikulasi; 38 widget types). The *Makmal graf* page first asks the user to choose Tingkatan 4, Tingkatan 5, STPM or Matrikulasi, then lists that level's graphs by chapter.
- **FR-5a** Every curve is shown in full: it ends at an axis intercept or a clear end point inside the plot, with its label visible, and never runs into the frame.
- **FR-6** Curves, price lines and nodes can be dragged with mouse, touch or keyboard.
- **FR-6a** Every curve and tracker moves smoothly (0.01-unit steps with decimal readings), not node by node. Series charts snap to a table row only when the pointer is within 5 px of it. Yearly data series (employment by sector, the Matrikulasi growth chart) still move one year at a time.
- **FR-7** Each graph has a live reading panel with values and a one-to-two-sentence explanation that includes the calculation.
- **FR-8** Market graphs cover individual and market demand/supply, equilibrium, price controls, elasticity, taxes and subsidies. In the market demand/supply graphs, each individual curve can be dragged independently.
- **FR-8a** The STPM PPC-shift graph (`kkp-anjakan`) offers 8 cases: shift right, shift left, only Y or only X increases, only Y or only X decreases, and one good increases while the other decreases. For each cause (resource endowment, technology, capital-goods composition) the reading names the cause of an increase and, for a decrease, the reverse cause (for resources: depletion of minerals, fewer foreign workers, lower investment). A *Situasi asal* button resets the curve to the dashed original.
- **FR-9** The short-run cost graph tracks continuously along the curves and shows decimal values. AC and AVC are derived as TC ÷ Q and VC ÷ Q, so decimal readings are consistent with the formula. A full Jadual 4.3 table is shown, and its rows are clickable. Following the Form 4 textbook (4.1.5), MC is plotted at whole outputs and **MC = AC: AC minimum** is shown where MC cuts AC, between the 6th and 7th unit: an *AC minimum (MC = AC)* button moves the tracker there and explains it, and the Keadaan column marks output 6 (lowest AC in the table, as in Jadual 4.4) as "AC minimum".
- **FR-10** Form 5 graphs cover:
  - price index
  - AD–AS
  - unemployment
  - GDP (real vs nominal)
  - tax rates and the national budget
  - interest rates
  - comparative advantage
  - tariff, subsidy and quota
  - current account
  - currency converter
  - exchange rate
- **FR-11** Related graphs are stacked **vertically**, never side by side.
- **FR-11a** *Bina graf* (`#bina-graf`, linked from the Makmal graf chooser) lets a student build their own graph:
  - start from an example (conceptual D and S);
  - add up to 6 curves: downward, upward, curved, horizontal or vertical;
  - select, rename (`D1` becomes `D₁`) and delete curves, and edit the axis labels.
  - Two explicit modes separate the concepts:
    - *Pergerakan di sepanjang keluk* moves point A → B along the same curve.
    - *Peralihan keluk* drags the whole curve D₀ → D₁ with the shape unchanged.
  - *Situasi asal* resets the graph.
  - Works with mouse, touch and keyboard.
  - **ƒ Persamaan** (phase 2) adds a curve from an equation:
    - accepted forms include `Qd = 100 − 2P`, `Qs = 20 + 3P`, `y = −2x + 10`, `P = 10`, `Q = 40` and `Qd = a − bP; a = 100; b = 2`;
    - the axes become numeric and readings show values (P 20 → 17.5, Qd 60 → 65);
    - parameters get sliders;
    - a shifted straight line shows its equivalent equation (Qd = 110 − 2P);
    - invalid or unsupported equations show a short Malay error.
  - **✏ Lukis keluk** (phase 3) turns a stroke drawn with a finger or mouse into a curve:
    - the stroke is smoothed and simplified;
    - near-horizontal or near-vertical lines are straightened;
    - strokes that are too short are rejected with a message;
    - the new curve (labelled K, L, M…) can be renamed, shifted and tracked like any other.
  - **Terangkan graf** (phase 5a) opens a panel of textbook-style explanations for the selected curve. It explains only the concept of the current mode (owner request):
    - in *Pergerakan di sepanjang keluk* mode: the curve type (definition, relationship, law) and movement along the curve (*pengembangan*/*penguncupan*), with what happened in the student's graph;
    - in *Peralihan keluk* mode: the curve type (definition) and the shift (*pertambahan*/*pengurangan*), with the non-price factors for that direction.
    - The reading panel uses the same terms.
    - Curve types: Permintaan, Penawaran and KKP. A KKP (template *KKP*, or a drawn/traced curve set to KKP) moves along the curve to show opportunity cost, and shifts outward/inward from the origin (economic growth), with textbook causes.
    - The curve type is chosen by the student. Suggestions show a confidence score and reasons, and are never applied automatically. Equations with Qd/Qs set the type.
  - **Market equilibrium** (phase 6):
    - when the graph has a Permintaan and a Penawaran curve, their intersection E is shown;
    - after a shift, E₀ → E₁ with P₀ → P₁ and Q₀ → Q₁ (exact values for equations, for example 16 → 20);
    - in shift mode, the reading panel and *Terangkan graf* explain the effect with the textbook mechanism (excess demand or supply at P₀), including when both curves shift.
  - **Latihan graf** (`#latihan-graf`, phase 7) is an exercise mode:
    - each question (for example "Pendapatan pengguna meningkat. Telefon pintar ialah barang normal…") starts from a D, S or market graph;
    - the student changes the graph and presses **Semak Jawapan**, which checks the graph state with fixed rules (no AI);
    - feedback distinguishes a correct answer, moving along the curve instead of shifting it (and the reverse), the wrong direction, the wrong curve, and an incomplete answer when two curves should change.
    - 8 questions from T4 Bab 2 cover demand factors, supply factors, movement along the curve, market effects and two curves shifting together.
    - Questions live in a data file, so teachers can add more without code changes.
  - **Tekap gambar** (phase 4, no AI by owner decision):
    - the student photographs or uploads a graph (textbook, slide, handwriting), aligns it with markers O and T, and traces each curve with a finger;
    - the traced curves become normal curves (type, shift, explanation, equilibrium);
    - the image never leaves the device and is not stored.
  - Automatic recognition of a photo (5b) would need an AI service, so it waits for an owner decision on provider, cost and privacy.

**Acceptance.**
- Every graph renders in light and dark mode without errors.
- Readings update on drag.
- Graphs are usable with a finger on a 360 px screen and by keyboard.

### 5.3 Flashcards: ✅
- **FR-12** 799 cards (263 SPM, 286 STPM, 250 Matrikulasi). Filter by all, Form 4, Form 5, STPM Penggal 1–3, Matrikulasi Semester 1–2 or a chapter, and search.
- **FR-13** Cards flip on tap or `Space`. The *Dah ingat* and *Ulang lagi* buttons, or keys `2` and `1`, mark a card and move straight to the next one; `←`/`→` navigate. The "dah ingat" state is saved.

### 5.4 Quizzes: ✅
- **FR-14** 178 chapter questions (SPM only). Each chapter quiz also includes trial-paper questions tagged to that chapter.
- **FR-15** Mixed sets: Form 4 (20 questions), Form 5 (20) and Form 4 + 5 (25), drawn at random.
- **FR-16** Options are shuffled, except numbered or I/II/III combinations. The quiz shows an instant right/wrong result with an explanation, a timer, a score and a review screen. The best score is saved per set.

### 5.5 Trial papers: ✅ Kelantan 2025 · ✅ Seberang Perai 2025 · ✅ Perak 2024 · ⏸ Terengganu
- **FR-17** Kertas 1: 40 MCQs in the original order, available as a quiz set (`kel25-k1`, `sp25-k1`, `prk24-k1`). Diagrams are either redrawn as SVG (Kelantan) or shown as images cropped from the original paper (Seberang Perai, Perak), including answer options that are graphs.
- **FR-18** Kertas 2 has 7 questions:
  - Section A: 3 compulsory questions.
  - Section B: choose 2 of 4.
- **FR-19** Each Kertas 2 part has an answer box (auto-saved), a *Tunjuk skema* reveal, tickable scheme points that give an estimated mark, and level rubrics where the paper uses them.
- **FR-20** Points that are not in the official scheme are labelled *cadangan*.
- **FR-21** The system supports multiple papers (`EKO.daftarK2`). The home page, Percubaan page and Kuiz list update automatically.
- **FR-21a** Pictures, diagrams and graphs in Kertas 2 questions are shown as images cropped from the original PDF, and answer diagrams from the marking scheme appear inside the scheme panel.
- **FR-22** MPP3 Terengganu 2025 is complete but hidden until publication permission is confirmed. See the README for how to enable it.

### 5.6 Progress and personalisation: ✅
- **FR-23** Progress is saved in the browser: chapters read, cards remembered, best quiz scores, Kertas 2 answers and ticks, the last chapter opened, and the theme.
- **FR-24** The home page shows overall progress and a "Sambung" (continue) button.
- **FR-25** Theme: follow the system, light, or dark.

### 5.7 Access control: ✅
- **FR-26** All content requires sign-in. Unauthenticated visitors are redirected to the login page. Direct requests for content files return 401.
- **FR-27** Sign-in methods:
  - **Google.**
  - **Email + password.** Includes registration, email verification and password reset.
- **FR-28** Only emails on the teacher's allowlist (`EMAIL_DIBENARKAN`) can enter. Whole domains can be allowed with `@domain`. Others see a clear "Tiada akses" screen that tells them to ask the teacher, with a **Hubungi cikgu** button that opens WhatsApp with a ready message ("Saya nak akses Nota Ekonomi Interaktif" + their email).
- **FR-29** Accounts that register with email and password must verify their email before entry.
- **FR-30** The header shows the signed-in account. Its menu has a **Hubungi cikgu** button that opens the teacher's WhatsApp with a ready message ("Salam cikgu, saya ada soalan tentang Nota Ekonomi Interaktif." + the student's name and email), and a *Log keluar* (sign-out) button.
- **FR-31** A session lasts 12 hours and renews silently while the Firebase sign-in is still valid. Removing an email blocks that user after the next redeploy.

### 5.8 Teacher operations: ✅
- **FR-32** Deploy by merging to `main` (Vercel auto-deploys). The AI agent merges its own PRs as soon as all checks pass and tells the teacher "SAYA DAH MERGE KE MAIN"; changes to access, exam material or deletions still wait for the teacher.
- **FR-33** Manage access by editing `EMAIL_DIBENARKAN` in Vercel, then redeploying.
- **FR-34** Add or correct content by editing one data file (documented in the README and AGENTS.md).

### 5.9 Economics calculator (Kalkulator Ekonomi): ✅
- **FR-35** A **Kalkulator** tab (`#kalkulator`) holds 56 calculators, grouped by chapter: 39 covering every formula and calculation in the T4 and T5 syllabus, 9 for STPM and 8 for Matrikulasi:
  - T4 Bab 1: opportunity cost on the PPC.
  - T4 Bab 2: market demand/supply, equilibrium and surpluses, Ed with total revenue, Es, finding Q₁ or P₁ from a given elasticity, tax burden, subsidy benefit.
  - T4 Bab 3: personal income, real wage, disposable income, taxable income and income tax (YA 2016 table in the textbook), personal budget, hire purchase instalment, savings and investment return.
  - T4 Bab 4: TP/AP/MP with production stages, short-run cost table (TC, VC, AFC, AVC, AC, MC), total revenue and profit, economic profit, productivity, social cost and benefit.
  - T5 Bab 1: price index, weighted and unweighted CPI, inflation rate, cost-push pricing, real income, unemployment rate and LFPR, GDP (expenditure), real GDP, growth rate, national budget balance, progressive/regressive/proportional tax, company tax, statutory reserve ratio.
  - T5 Bab 2: comparative advantage, specific and ad valorem tariffs, current account, currency conversion (buying/selling rates), effect of exchange-rate changes on exports and imports.
  - STPM: opportunity cost on the PPC, equilibrium from linear functions with tax or subsidy, Ec/Ey, cost derivations (Q, AVC, TFC, TVC), GDP to GNP (KNK), AE–Y equilibrium with multiplier and gaps, credit creation, Fisher equation, openness of the economy.
  - Matrikulasi: arc elasticity (ordinary and midpoint), consumer equilibrium with two goods, explicit and implicit cost, monopoly equilibrium (MR = MC), two- and three-sector equilibrium with multiplier and gaps, money supply M1/M2 and growth, money-value index, nominal terms of trade (KSP).
- **FR-36** Each calculator shows the formula, live answers, numbered worked steps (*jalan kira*), each written first as an economic sentence (naming the numerator and denominator of every division) and then in numbers, and an interpretation. Invalid or missing input shows a clear message instead of a wrong number.
- **FR-37** Initial values are the textbook's worked examples and reproduce the textbook answers. Some calculators offer several example chips.
- **FR-38** Table calculators (market, equilibrium, TP/AP/MP, cost, CPI) allow editing cells and adding or removing rows; tapping a row shows that row's working. Every column fits on screen from 360 px up, with no horizontal scrolling and no clipped values; each value sits directly under its header.
- **FR-39** Filter by form or chapter and search by keyword. Deep links: `#kalkulator-<chapterId>` and `#kalkulator-<calculatorId>`. Each chapter page has a "Kalkulator (n)" button.

## 6. Non-functional requirements

| Area | Requirement |
| --- | --- |
| Performance | No framework or build. Each page load fetches only static files: about 1.6 MB of uncompressed JS (mostly notes data and graph widgets) and 72 KB of CSS, plus a 36 KB gzipped auth SDK on the login page only. It should be interactive in under 2 s on a mid-range phone over 4G. |
| Responsiveness | 360 px to desktop. Bottom navigation at 860 px and below. No horizontal scroll. |
| Accessibility | Keyboard-operable graphs and flashcards, visible focus, `aria-live` readings, colour never the only cue, reduced-motion support (see DESIGN_SYSTEM §12). |
| Offline / local | Opening `index.html` locally or with `python3 -m http.server` works without sign-in (for the teacher's own use and for development). |
| Browser support | Current Chrome, Safari (iOS 15+), Edge and Firefox. Glass effects fall back to solid surfaces where `backdrop-filter` is missing. |
| Privacy | Learning progress never leaves the device. Firebase stores only the account (email, name, provider). No analytics or trackers. |
| Security | The server verifies tokens and signs the session cookie. Secrets live only in Vercel env vars. Source PDFs are never deployed. |
| Cost | Runs on free tiers: Vercel Hobby and Firebase Spark (Auth only). |
| Maintainability | Content is in plain JS data files, one per chapter. The UI and content are in Bahasa Melayu. The docs are these four files plus the README. |

## 7. Content inventory (v1)

| Chapter | Sections | Flashcards | Quiz Qs | Graphs |
| --- | --- | --- | --- | --- |
| T4 Bab 1 · Pengenalan kepada Ekonomi | 2 | 30 | 21 | 2 |
| T4 Bab 2 · Pasaran | 2 | 33 | 23 | 8 |
| T4 Bab 3 · Wang, Bank, dan Pendapatan Individu | 3 | 37 | 25 | 6 |
| T4 Bab 4 · Pengeluaran | 2 | 28 | 22 | 4 |
| T5 Bab 1 · Ekonomi dan Kerajaan | 3 | 71 | 42 | 11 |
| T5 Bab 2 · Malaysia dan Ekonomi Global | 4 | 64 | 45 | 5 |
| **Total SPM** | **16** | **263** | **178** | **36** |

STPM (Ekonomi 944): 16 chapters (Penggal 1 Bab 1–5, Penggal 2 Bab 1–5, Penggal 3 Bab 1–6), 286 flashcards, 0 quiz questions, 29 graphs.
Matrikulasi (AE015, AE025): 14 chapters (AE015 Bab 1–6, AE025 Bab 1–8), 250 flashcards, 0 quiz questions, 38 graphs, 8 calculators.

Calculators: 56 (SPM 39: T4 Bab 1: 1 · Bab 2: 7 · Bab 3: 7 · Bab 4: 6 · T5 Bab 1: 13 · Bab 2: 5; STPM 9; Matrikulasi 8).

All levels: 36 chapters, 799 flashcards, 178 quiz questions, 103 graphs in the notes (38 widget types), 56 calculators.

Trial papers:
- **Kelantan 2025** (live): K1 40 MCQs and K2 7 questions.
- **Seberang Perai 2025** (live): K1 40 MCQs and K2 7 questions; 23 images.
- **Perak 2024, Modul Gempur SPM** (live): K1 40 MCQs and K2 7 questions; 8 images.
- **MPP3 Terengganu 2025** (hidden): K1 40 MCQs and K2 7 questions.

## 8. Success metrics

v1 has **no analytics**, by design (privacy, simplicity). Success is judged by:

| Metric | How it is measured today |
| --- | --- |
| Adoption: at least 80% of allowlisted students sign in within 2 weeks | Firebase console → Authentication → Users (last sign-in) |
| Engagement: students use graphs, cards and quizzes weekly | Teacher observation and student feedback (no telemetry) |
| Learning: better chapter-quiz and trial-paper performance | Classroom assessments; students report their best scores |
| Reliability: no sign-in or content errors reported | Vercel runtime logs, student reports |

Measuring these automatically needs the planned progress sync (§10).

## 9. Release history

| Date | Release |
| --- | --- |
| 2026-09-25 | Site built: notes T4 Bab 1–4 and T5 Bab 1–2, interactive graphs, flashcards, quizzes, Kelantan trial paper |
| 2026-09-25 | Graph fixes: draggable individual curves in the market graphs, duplicate examples removed, full cost table |
| 2026-09-25 | T5 notes rewritten from the textbook; new tariff/subsidy/quota and exchange-rate graphs; Terengganu paper added |
| 2026-09-26 | Flashcard layout fix; deployed to Vercel (PR #1) with PDFs excluded and the Terengganu paper hidden |
| 2026-09-26 | Cost graph: continuous tracker with decimal values (PR #2) |
| 2026-09-26 | Sign-in page (Google or email), server-side gate and email allowlist (PR #3) |
| 2026-09-26 | Trial papers Seberang Perai 2025 and Perak 2024 with images from the original papers |
| 2026-09-26 | Home title "Buku Teks Ekonomi Interaktif"; Kalkulator Ekonomi tab with 39 calculators |
| 2026-09-26 | Home title renamed to "Nota Ekonomi Interaktif" (matches the promo video) |
| 2026-09-29 | STPM level added; graph lab asks for Tingkatan 4, Tingkatan 5 or STPM first (PR #13) |
| 2026-09-29 | All 16 STPM chapters, 4 new STPM graphs and 9 STPM calculators (PR #14) |
| 2026-09-29 | STPM graphs show every curve in full (PR #15); agent auto-merges when checks pass |
| 2026-09-29 | Matrikulasi level: AE015 Bab 1–6 and AE025 Bab 1–8 notes, 2 new graph widgets (`carta-jadual`, `lrac`) and 8 calculators |
| 2026-09-29 | Home and Nota pages get level buttons (Tingkatan 4, Tingkatan 5, STPM, Matrikulasi, Ijazah Sarjana Muda); "SPM" chip and hero eyebrow removed; home intro no longer lists the trial papers |
| 2026-09-29 | PPC-shift graph with 8 cases and *Situasi asal*; all curves move smoothly; calculator steps written as economic sentences; *Dah ingat* button fixed |
| 2026-09-30 | "Hubungi cikgu" WhatsApp button in the account menu |
| 2026-09-30 | Calculator tables fit the screen with aligned columns (no horizontal scroll, no clipped values) |
| 2026-10-01 | *Bina graf* phase 1: generic curve model (`EKO.bina`) and `#bina-graf` page with movement-along vs shift modes |
| 2026-10-01 | *Bina graf* phase 2: equation input (`EKO.persamaan`) with numeric axes, parameter sliders and the equivalent equation after a shift |
| 2026-10-01 | *Bina graf* phase 3: draw a curve by finger or mouse (smoothed, simplified, straightened) |
| 2026-10-01 | *Bina graf* phase 5a: curve-type registry (Permintaan, Penawaran) and *Terangkan graf* explanations in textbook terms |
| 2026-10-01 | *Bina graf* phase 6: market equilibrium E₀ → E₁ with P and Q changes (`EKO.keseimbangan`) |
| 2026-10-01 | *Bina graf* phase 7: *Latihan graf* with *Semak Jawapan* (`EKO.senario`, 8 T4 Bab 2 questions) |
| 2026-10-01 | *Bina graf* phase 4: *Tekap gambar*, which traces a graph from a photo on the device without AI (`EKO.imbas`) |
| 2026-10-01 | *Bina graf*: curve type KKP (opportunity cost along the curve, economic growth as an outward shift from the origin) |
| 2026-10-01 | Short-run cost graph: *MC = AC: AC minimum* state (button, reading, Keadaan column), following the Form 4 textbook |

## 10. Roadmap and open questions

| Priority | Item | Notes |
| --- | --- | --- |
| High | Confirm permission to publish the Terengganu paper | Enabling takes 3 steps (README) |
| Medium | *Bina graf*, remaining phase | Phases 1–3, 4 (tracing a photo, no AI), 5a, 6 and 7 are done. Remaining: 5b, automatic recognition of a photographed graph. It needs an AI vision service behind the existing `EKO.imbas.pengecam` hook. It waits for the owner to decide on provider, API key, cost limits and a privacy note for students, since AI is a non-goal in §2. The ChatGPT/Gemini apps cannot be used directly; only their developer APIs can |
| Medium | STPM quizzes | Deferred by the owner; module practice questions are available as a source |
| Medium | Matrikulasi: replace *cadangan* sections (AE015 2.2–2.4, 6.5 Oligopoli) | Waiting for the owner to find the slides |
| Medium | Matrikulasi quizzes | Kept empty for now by the owner's decision |
| Low | Ijazah Sarjana Muda notes | The level button exists and shows "Akan datang" |
| Medium | Block account sharing (one email, one device at a time) | Owner wants this later; needs server-side session storage |
| Medium | Self-service allowlist page for the teacher | Avoids editing env vars and redeploying |
| Medium | Progress sync and teacher dashboard | Firestore in the existing Firebase project, keyed by verified email; needs a privacy note for students |
| Medium | More trial papers | Existing format supports this with no code changes |
| Low | Custom domain | Must be added to Firebase Authorized domains |
| Low | Offline PWA for signed-in students | Must not cache content in a way that bypasses the access gate |
| Open | Should the login allow a whole school domain (e.g. `@moe-dl.edu.my`) instead of individual emails? | Supported technically; a policy decision for the teacher |

## 11. Risks

| Risk | Mitigation |
| --- | --- |
| Google sign-in fails inside in-app browsers (Instagram, TikTok) | The login page detects these browsers and tells students to open Chrome or Safari; email sign-in still works |
| Verification emails land in spam | The UI tells students to check Spam; resend button |
| Allowlist changes forgotten (no redeploy) | Documented in the README and in the env var comment; could be solved by the self-service page |
| Content errors against the textbook | Content is sourced from the textbook; teacher reviews; *cadangan* labels mark non-official points |
| Copyright of exam papers | Source PDFs are never deployed; papers are published only with permission (Terengganu is hidden) |
