# Econ Tutor · Product Requirements Document

| | |
| --- | --- |
| **Product** | Econ Tutor: interactive SPM Economics (KSSM) study site |
| **Owner** | Economics teacher (repo owner, GitHub `AidilFarhan`) |
| **Audience** | The owner's Form 4 and Form 5 Economics students |
| **Status** | v1 live at `econwebsite.vercel.app` (sign-in required) |
| **Last updated** | 26 September 2026 |

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
1. Cover **every chapter** of the Form 4 and Form 5 textbooks with complete notes in textbook order and wording.
2. Make every important diagram **interactive**. Students drag curves, price lines and nodes, and immediately see values and reasoning.
3. Support **active recall**: flashcards and quizzes per chapter and per form, with explanations.
4. Provide **exam practice** with state trial papers: Kertas 1 as a timed quiz, and Kertas 2 with answer boxes and self-marking against the scheme.
5. Work well on **phones**, in light and dark mode, including slow connections.
6. Restrict access to **students the teacher approves** (Google or email sign-in with an allowlist).
7. Stay **free to run** and **easy for the teacher to maintain**, with no build tools and content in plain files.

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
| **Teacher (owner/admin)** | Curates content, controls access, low time for tooling | Faithful content, simple access list, deploys by merging to `main`, no maintenance burden |

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

## 5. Functional requirements

Status key: ✅ shipped · ⏸ built but hidden · 🔜 planned

### 5.1 Notes: ✅
- **FR-1** Six chapters: T4 Bab 1–4 and T5 Bab 1–2. Subtopics are numbered as in the textbook (e.g. 1.3.4).
- **FR-2** Each chapter shows guiding questions, definitions, formulas, worked calculations, tables, examples and exam tips as styled callouts.
- **FR-3** A sticky table of contents highlights the current section. "Tandakan selesai dibaca" records completion, and there is a link to the next chapter.
- **FR-4** Data, examples and exercises follow the textbook. The T5 notes include the textbook's *Latihan Sumatif*. Teacher notes are used as reference only.

**Acceptance.**
- Every textbook subtopic has a matching section.
- Numbers match the textbook tables.
- No page scrolls horizontally at 360 px.

### 5.2 Interactive graphs: ✅
- **FR-5** 36 graphs are embedded in the notes (31 widget types), and a *Makmal graf* page lists them all by chapter.
- **FR-6** Curves, price lines and nodes can be dragged with mouse, touch or keyboard.
- **FR-7** Each graph has a live reading panel with values and a one-to-two-sentence explanation that includes the calculation.
- **FR-8** Market graphs cover individual and market demand/supply, equilibrium, price controls, elasticity, taxes and subsidies. In the market demand/supply graphs, each individual curve can be dragged independently.
- **FR-9** The short-run cost graph tracks continuously along the curves and shows decimal values. AC and AVC are derived as TC ÷ Q and VC ÷ Q, so decimal readings are consistent with the formula. A full Jadual 4.3 table is shown, and its rows are clickable.
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

**Acceptance.**
- Every graph renders in light and dark mode without errors.
- Readings update on drag.
- Graphs are usable with a finger on a 360 px screen and by keyboard.

### 5.3 Flashcards: ✅
- **FR-12** 263 cards. Filter by all, Form 4, Form 5 or a chapter, and search.
- **FR-13** Cards flip on tap or `Space`. Keys `1` ("Ulang lagi") and `2` ("Dah ingat") mark a card, and `←`/`→` navigate. The "dah ingat" state is saved.

### 5.4 Quizzes: ✅
- **FR-14** 178 chapter questions. Each chapter quiz also includes trial-paper questions tagged to that chapter.
- **FR-15** Mixed sets: Form 4 (20 questions), Form 5 (20) and Form 4 + 5 (25), drawn at random.
- **FR-16** Options are shuffled, except numbered or I/II/III combinations. The quiz shows an instant right/wrong result with an explanation, a timer, a score and a review screen. The best score is saved per set.

### 5.5 Trial papers: ✅ Kelantan · ⏸ Terengganu
- **FR-17** Kertas 1: 40 MCQs in the original order, with question diagrams redrawn as SVG. Available as a quiz set (`kel25-k1`).
- **FR-18** Kertas 2 has 7 questions:
  - Section A: 3 compulsory questions.
  - Section B: choose 2 of 4.
- **FR-19** Each Kertas 2 part has an answer box (auto-saved), a *Tunjuk skema* reveal, tickable scheme points that give an estimated mark, and level rubrics where the paper uses them.
- **FR-20** Points that are not in the official scheme are labelled *cadangan*.
- **FR-21** The system supports multiple papers (`EKO.daftarK2`). The home page, Percubaan page and Kuiz list update automatically.
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
- **FR-28** Only emails on the teacher's allowlist (`EMAIL_DIBENARKAN`) can enter. Whole domains can be allowed with `@domain`. Others see a clear "Tiada akses" screen that tells them to ask the teacher.
- **FR-29** Accounts that register with email and password must verify their email before entry.
- **FR-30** The header shows the signed-in account and a *Log keluar* (sign-out) button.
- **FR-31** A session lasts 12 hours and renews silently while the Firebase sign-in is still valid. Removing an email blocks that user after the next redeploy.

### 5.8 Teacher operations: ✅
- **FR-32** Deploy by merging to `main` (Vercel auto-deploys).
- **FR-33** Manage access by editing `EMAIL_DIBENARKAN` in Vercel, then redeploying.
- **FR-34** Add or correct content by editing one data file (documented in the README and AGENTS.md).

## 6. Non-functional requirements

| Area | Requirement |
| --- | --- |
| Performance | No framework or build. Each page load fetches only static files: about 0.7 MB of uncompressed JS (mostly notes data and graph widgets) and 60 KB of CSS, plus a 36 KB gzipped auth SDK on the login page only. It should be interactive in under 2 s on a mid-range phone over 4G. |
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
| **Total** | **16** | **263** | **178** | **36** |

Trial papers:
- **Kelantan 2025** (live): K1 40 MCQs and K2 7 questions.
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

## 10. Roadmap and open questions

| Priority | Item | Notes |
| --- | --- | --- |
| High | Delete the duplicate Vercel project `econ-tutor` | `econwebsite` is the primary project; both deploy from `main` |
| High | Confirm permission to publish the Terengganu paper | Enabling takes 3 steps (README) |
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
