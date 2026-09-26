# Econ Tutor · Design System

The visual language of Econ Tutor is **minimal and glassy**: calm frosted-glass surfaces over a soft aurora background, one teal accent, and colour reserved for meaning. There is a colour for each chapter, one for each curve, and one for each state.

Everything is defined in one stylesheet, [`assets/css/style.css`](assets/css/style.css), with CSS custom properties. There is no preprocessor and no utility framework. Class names and tokens are in Malay, matching the codebase; a glossary is at the end.

---

## 1. Principles

1. **Textbook first.** Terms, notation and graph conventions follow the KSSM Economics textbooks. The design must never make a student unlearn what the exam expects.
2. **Calm surfaces, meaningful colour.** Glass panels are neutral. Colour marks a chapter, a curve (demand, supply…), or a state (correct, wrong, warning), and nothing else.
3. **Touch is the default.** Students use phones. Targets are at least 44 px, graphs are draggable with a finger, the bottom navigation is in thumb reach, and nothing depends on hover.
4. **Show the working.** Interactive graphs always pair the picture with a live reading panel that shows numbers and the calculation, not just a moving line.
5. **Same experience in light and dark.** Every colour is a token with a light and a dark value, and no component hard-codes a colour (except the fixed brand mark).
6. **Graphs stack vertically.** Two related graphs go one above the other, never side by side, so each keeps a readable width on every screen.

---

## 2. Theming

| Mechanism | Behaviour |
| --- | --- |
| `prefers-color-scheme: dark` | Dark tokens apply automatically unless the user forced light |
| `html[data-theme="light"]`, `html[data-theme="dark"]` | Explicit choice from the theme button (cycles *sistem → cerah → gelap*) |
| `html[data-tema-kami]` | Marks that the theme came from the user rather than the system |
| Storage | `localStorage["econtutor:v1"].tema`, applied by an inline script in `<head>` before first paint (no flash) |

Dark tokens are declared twice: under `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) }` and under `:root[data-theme="dark"]`. Keep both blocks in sync when adding a token.

---

## 3. Colour tokens

### 3.1 Surfaces and ink

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--bg` | `#edf1f3` | `#0a1116` | Page background (behind aurora) |
| `--bg-2` | `#e3e9ed` | `#0e171e` | Alternate background |
| `--ink` | `#0f1a22` | `#e6edf1` | Primary text, active nav pill |
| `--ink-2` | `#33434e` | `#b4c2ca` | Secondary text, axes |
| `--ink-3` | `#62727d` | `#8595a1` | Muted text, hints, guide lines |
| `--line` | ink @ 9% | ink @ 9% | Hairlines, grid |
| `--line-2` | ink @ 17% | ink @ 17% | Input and button borders, dividers |
| `--glass` | white @ 56% | `rgba(20,31,40,.58)` | `.kaca` panels (most translucent) |
| `--glass-2` | white @ 80% | `rgba(17,27,35,.84)` | `.kaca-pekat`, cards, callouts, graph cards |
| `--glass-3` | white @ 92% | `rgba(15,24,31,.94)` | Inputs, menus, near-opaque surfaces, glass fallback |
| `--glass-edge` / `--glass-hi` | white 78% / 65% | white 8.5% / 6% | Glass border and top inner highlight |

### 3.2 Accent and states

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--accent` | `#0b7a6a` | `#3cc2a8` | Primary buttons, links, focus, progress |
| `--accent-2` | `#0a6457` | `#5dd6be` | Primary hover |
| `--accent-ink` | `#ffffff` | `#04201a` | Text on accent |
| `--accent-soft` | accent @ 12% | accent @ 15% | Hover fills, chips, selected rows |
| `--focus` | accent @ 45% | accent @ 50% | Focus ring |
| `--good` / `--good-soft` | `#1d8a52` | `#4ccb86` | Correct answer, success, "dah ingat" |
| `--bad` / `--bad-soft` | `#c23f2d` | `#f07b63` | Wrong answer, errors |
| `--warn` / `--warn-soft` | `#a86b12` | `#e7b24a` | Warnings, tips, "no access" icon |

### 3.3 Graph palette

Each curve keeps the same colour across every graph, so a student learns "blue = demand".

| Token | Light | Dark | Meaning |
| --- | --- | --- | --- |
| `--c-d` | `#2b67b0` | `#70a9ef` | **Demand (D)**, AC, definitions |
| `--c-s` | `#d14f3a` | `#f27f67` | **Supply (S)**, VC, "focus" callouts |
| `--c-3` | `#0b8a74` | `#3cc2a8` | Third series (AVC, examples) |
| `--c-4` | `#c0861a` | `#e7b24a` | Fourth series (MC) |
| `--c-5` | `#7b55b8` | `#b08ded` | Fifth series (TC, formulas) |
| `--c-6` | `#5c6b75` | `#95a4af` | Neutral series (FC, reference lines) |

Each has a `-soft` companion (about 14%) for areas such as surplus, tax revenue and callout washes.

### 3.4 Chapter colours: Ringgit banknotes

Chapter colours are taken from Malaysian banknotes, a local and memorable mnemonic. Set per chapter through `warna` in the data file and exposed to CSS as `--warna-bab`.

| Token | Note | Chapter |
| --- | --- | --- |
| `--bab-rm1` | RM1 blue | T4 Bab 1 · Pengenalan kepada Ekonomi |
| `--bab-rm5` | RM5 green | T4 Bab 2 · Pasaran |
| `--bab-rm10` | RM10 red | T4 Bab 3 · Wang, Bank, dan Pendapatan Individu |
| `--bab-rm20` | RM20 orange | T4 Bab 4 · Pengeluaran |
| `--bab-rm50` | RM50 teal | T5 Bab 1 · Ekonomi dan Kerajaan |
| `--bab-rm100` | RM100 purple | T5 Bab 2 · Malaysia dan Ekonomi Global |

### 3.5 Aurora background

`.latar` is a fixed layer made of four radial blobs (`--blob-1…4`: mint, sky, peach, butter in light; deep versions in dark) plus a masked 26 px dot grid that fades out towards the bottom. It sits at `z-index: -1` and ignores pointer events.

---

## 4. Typography

| Role | Font | Weight | Size |
| --- | --- | --- | --- |
| Display / headings | **Bricolage Grotesque** (`--font-d`) | 650 (700 brand, 750 initials) | See scale |
| Body / UI | **Plus Jakarta Sans** (`--font`) | 400–800 | 16 px, line-height 1.62 |

Both fonts load from Google Fonts, with system fallbacks. Headings use `letter-spacing: -0.015em`, `line-height: 1.18` and `text-wrap: balance`.

| Element | Size |
| --- | --- |
| Hero title `.wira h1` | `clamp(34px, 5.2vw, 58px)` |
| Chapter title | `clamp(30px, 4.6vw, 46px)` |
| Page title (Kuiz, Graf…) | `clamp(30px, 4.4vw, 44px)` |
| Section title `.seksyen > h2` | `clamp(24px, 3.1vw, 32px)` |
| Login title | 30 px (26 px under 420 px) |
| Graph title `.graf-tajuk b` | 16.5 px display |
| Callout body `.kotak` | 15.5 px |
| Labels, chips, status | 11.5–13 px, weight 650–800, uppercase eyebrow labels use `letter-spacing: 0.08–0.1em` |
| SVG graph text `.g-teks` | 12.5 px, weight 700; `.kecil` 11 px |

Numbers use `font-variant-numeric: tabular-nums` (`.tnum`, tables, graph text, readings).

---

## 5. Layout, spacing, shape

| Token | Value | Use |
| --- | --- | --- |
| `--maxw` | 1180 px | Content width (`.bekas`) |
| `--gutter` | 20 px, or 16 px ≤ 560 px | Side padding |
| `--bar-h` | 64 px | Header height, used for scroll padding |
| `--radius-xl` | 28 px | Login card, hero panels |
| `--radius-l` | 22 px | Glass panels, graph cards |
| `--radius` | 16 px | Callouts, menus |
| `--radius-s` / `--radius-xs` | 11 / 8 px | Small chips, inner elements |
| Pills | 999 px | Buttons, nav, chips, status, tabs |

Spacing follows a loose 4 px rhythm (4, 6, 8, 10, 12, 14, 18, 22 px) with fluid section padding such as `clamp(18px, 3.2vw, 34px)`.

**Breakpoints** (max-width):

| Width | Change |
| --- | --- |
| 980 px | Chapter layout becomes one column; the table of contents stops being sticky |
| 900 px | Home hero stacks |
| **860 px** | Top nav hides; floating bottom nav appears; toast moves above it |
| 640 px | Tighter table cells |
| 620 px | Flashcard list items stack |
| 560 px | Gutter 20 → 16 px |
| 420 px | Login card padding and title shrink |

---

## 6. Elevation and glass

| Level | Class / token | Recipe |
| --- | --- | --- |
| Glass | `.kaca` | `--glass` + `backdrop-filter: blur(18px) saturate(150%)` + `--glass-edge` border + `--shadow` + inner highlight |
| Dense glass | `.kaca-pekat` | `--glass-2` + `blur(14px) saturate(140%)` |
| Solid | `--glass-3` | Inputs, dropdown menus, fallback when `backdrop-filter` is unsupported |
| Shadows | `--shadow`, `--shadow-2` | Soft, long, low-opacity; stronger in dark mode |

Don't nest glass inside glass more than once. Inner cards use `--glass-2` or `--glass-3` without blur.

---

## 7. Motion

- The easing curve is `--ease: cubic-bezier(0.22, 0.8, 0.26, 1)`, a quick start with a soft settle.
- Durations:
  - 0.15 s: graph node radius
  - 0.18–0.2 s: buttons and hovers
  - 0.25 s: toast
  - 0.3 s: panels entering (`masuk` animation)
  - 0.5 s: progress bars
  - 0.6 s: flashcard 3D flip
- Buttons lift by 1 px on hover and scale to 0.98 on press.
- Ambient cues: the graph hint dot pulses (`denyut`, 2.2 s), and a spinner (`pusing`) shows while loading.
- `prefers-reduced-motion: reduce` slows or removes animations, and `EKO.kurangGerak()` lets JS skip tweens.

---

## 8. Iconography

`EKO.ikon(name)` returns inline 24 × 24 stroke icons: 1.8–2 px strokes, round caps and joins, with `currentColor`, `aria-hidden`, and a 20 px display size (`.ikon`).

Available names:
- Navigation: `rumah`, `buku`, `graf`, `kad`, `kuiz`, `kertas`
- Theme: `matahari`, `bulan`, `sistem`
- Arrows and actions: `kanan`, `kiri`, `kocok`, `ulang`, `cari`, `betul`, `salah`, `senarai`, `tangan`, `jam`, `mata`, `bintang`, `pensel`, `kotak`

The **brand mark** (`EKO.tandaJenama()`) is a dark rounded square with a blue demand curve, a red supply curve and a white equilibrium dot. Its colours are fixed in both themes. The Google "G" on the login button follows Google's sign-in branding.

---

## 9. Components

### 9.1 Navigation
- **Top bar** (`.bar-atas` > `.bar-dalam.kaca`): a sticky glass pill with the brand (`.jenama` + `SPM` chip), nav links (`.nav-atas a`, where the current page is an inverted ink pill), the theme button (`.ikon-btn`, 40 px round) and the account button (`.akaun-btn`, a 40 px accent circle with the initial).
- **Bottom bar** (`.bar-bawah`, ≤ 860 px) is a floating glass pill with icon + label tabs and respects `safe-area-inset-bottom`.
- **Breadcrumbs** (`.remah`) sit above page titles.

### 9.2 Buttons
| Class | Look | Use |
| --- | --- | --- |
| `.btn` | 44 px pill, `--glass-2`, `--line-2` border | Default action |
| `.btn-utama` | Accent fill, accent glow shadow | One primary action per area |
| `.btn-hantu` | Transparent, `--ink-2` text | Tertiary actions ("Guna akaun lain") |
| `.btn-kecil` | 36 px, 14 px text | Dense toolbars, menus |
| `.ikon-btn` | 40 px round, transparent | Icon-only header actions |
| `.cip` | Small pill with accent border | Filters, "Buka nota", toggles (`aria-pressed`) |
| `[disabled]` | 45% opacity, no pointer | — |

### 9.3 Note content (inside `seksyen.html`)
| Pattern | Markup | Meaning |
| --- | --- | --- |
| Callouts | `.kotak.def` (blue), `.kotak.rumus` (purple), `.kotak.tip` (amber), `.kotak.contoh` (green), `.kotak.fokus` (red), `.kotak.info` (neutral) + `.kotak-label` | Definition, formula, exam tip, worked example, focus, info |
| Worked calculation | `.kira` > `.baris` … `.jawapan` | Step-by-step arithmetic |
| Formula line | `.rumus-baris`, `.pecahan` | Inline formula with a fraction |
| Flow | `.aliran` > `span` + `i` (arrow) | Cause → effect chains |
| Mini cards | `.grid-2` / `.grid-3` > `.kad-mini` | Side-by-side short concepts (not graphs) |
| Table | `.jadual` > `table` (`caption`, `.n` numeric, `.c` centred) | Textbook tables |
| Term | `.istilah` | Highlighted key term |
| Graph | `<figure data-graf="name" data-opt='{…}'>` | Mounted by the graph engine |

### 9.4 Graph card (`.graf-kad`)
The anatomy is title (`.graf-tajuk`, with a pulsing hint `.graf-petunjuk`), then controls (`.graf-kawalan`: sliders `.julat`, segmented `G.pilih`, buttons, legend chips), then canvas (`.graf-kanvas` > SVG), then reading panel (`.graf-baca`, `aria-live="polite"`: value chips `.nilai`, explanation `.ayat`, optional table).

### 9.5 Study and assessment
- **Question image** (`.gambar-soalan`): a figure cropped from the original paper, shown at its print size (max 100% width) inside a white rounded frame with a hairline border. The frame stays white in dark mode (slightly dimmed) because the originals are black on white. The caption (`.kapsyen-gambar`) is small muted text. Inside answer options the frame is smaller (max 260 px) and aligned left.
- **Flashcard** (`.kad-flip` > `.dalam` > `.muka.depan` / `.muka.belakang`): a 0.6 s 3D flip on tap or `Space`. Buttons `.btn-ulang` ("Ulang lagi") and `.btn-ingat` ("Dah ingat"), with a keyboard hint row of `kbd` elements.
- **Quiz**: a glass header (`.kuiz-kepala`) with question count, score, timer and progress bar. After answering, options turn green (`.betul`) or red (`.salah`) and an explanation (`.penerangan`) appears. The results screen shows a review list.
- **Kertas 2**: question cards with a `textarea` answer, a "Tunjuk skema" reveal, and checkable scheme points (`data-m` marks) that give an estimated score. Rubric tables show levels.
- **Status pills** (`.status.baik | .buruk | .amaran | .neutral | .biru | .merah`) are 12.5 px, weight 750 pills.
- **Toast** (`#toast`) is an ink pill at the bottom centre (above the bottom bar on phones) that shows for 2.2 s.

### 9.6 Login (`masuk.html`)
- **Card:** a centred `.masuk-kad.kaca` (max 420 px, `--radius-xl`) on the aurora background.
- **Card contents, top to bottom:**
  - brand
  - title and subtitle
  - Google button (`.masuk-google`, 48 px, `--glass-3`)
  - "atau guna email" divider
  - segmented tabs (`.masuk-tab`, *Log masuk / Daftar akaun*)
  - fields (`.medan`, 48 px inputs, with a *Tunjuk/Sorok* toggle)
  - primary submit button
  - text link (`.masuk-pautan`)
- **States** are separate panels: loading (`.pusing`), verify email (mail icon), no access (amber lock icon).
- **Messages** use `.masuk-mesej`, which is neutral by default, with `.ralat` (bad) and `.baik` (good) variants.

### 9.7 Account menu
`.akaun-btn` opens `.akaun-menu`, a near-opaque glass popover showing the name, email and a *Log keluar* button. It closes on outside click or `Escape`.

---

## 10. Graph design language

These rules are shared by all 31 widgets. Follow them for new graphs.

| Element | Rule |
| --- | --- |
| Axes | Origin at 0 with arrowheads; **Y label at the top-left, X label at the bottom-right** (textbook convention), e.g. *Harga (RM)*, *Kuantiti (unit)* |
| Curves (`.g-lengkung`) | 3 px, round caps; colour by meaning (§3.3); the curve name sits at its end (`D`, `S₁`, `AC`) |
| Grid | `--line`, 1 px; off by default in static figures |
| Guides (`.g-panduan`) | 1.3 px dashed `--ink-3` lines dropping from a point to both axes, with a value chip on the axis |
| Nodes (`.g-nod`) | `--glass-3` fill, 2.5 px coloured ring; tracker nodes 6 px |
| Handles (`[data-pegang]`) | 8 px node + 14 px soft halo + invisible 22 px hit area; cursor `grab` |
| Value chips (`.cip` in SVG) | Ink pill with background-coloured text, kept inside the canvas; stagger chips that would overlap |
| Areas (`.g-kawasan`) | `-soft` fills for surplus, revenue, deadweight loss |
| Tracker (`.g-garis-silang`) | Dashed vertical line; value labels next to each node with a halo stroke (`.g-teks-nilai`), stacked so they never overlap, flipping side near the right edge |
| Intersections | Plain 7 px node with a small label ("MC = AC"); the label hides when the tracker is close |
| Reading panel | Always update it: key values as chips, then one or two sentences of reasoning with the calculation |
| Size | Width = container (max 780 px); height from an aspect-ratio function, taller on phones |

---

## 11. Content voice and formatting

- **Language:** Bahasa Melayu, using the textbook's terminology (*keluk permintaan*, *kos berubah purata*, *imbangan akaun semasa*). English terms are fine in developer docs and code comments only.
- **Numbers:**
  - Space as the thousands separator and a point for decimals: `1 234.5`.
  - Use `RM` directly before the number, with no space: `RM462.5`.
  - The minus sign is the true minus `−`.
  - Always format through `EKO.fmt` or `EKO.rm`.
- **Tone:** second person, friendly and exam-aware ("Ingat:", "Tip peperiksaan"). Explain *why*, not just *what*.
- **Sources:** content comes from the textbook. Anything extra is labelled *cadangan* (suggestion) and never presented as the official scheme.

---

## 12. Accessibility checklist

- Every interactive element has a visible `:focus-visible` ring (2.5 px `--focus`, offset 2 px).
- Graph SVGs are `role="application"` with `aria-label` and `tabindex="0"`. Arrow keys move handles (Shift = larger steps), and Home/End jump to the ends. Static figures are `role="img"`.
- Reading panels, toasts and login messages are `aria-live="polite"`.
- There is a skip link ("Langkau ke kandungan"), `lang="ms"`, one `h1` per view, and toggles use `aria-pressed` / `aria-expanded`.
- Colour is never the only signal: curves are labelled, states carry text ("Betul", "Salah", "✓ dah ingat").
- Touch targets are at least 44 px for primary controls and 40 px for icon buttons, and there is no horizontal page scroll at 360 px.
- Reduced motion is respected (§7).

---

## 13. Do and don't

| Do | Don't |
| --- | --- |
| Use tokens (`var(--c-d)`) for every colour | Hard-code hex values in components |
| Put two graphs one above the other | Put graphs side by side in `.grid-2` |
| Pair every interactive graph with a reading panel | Leave numbers only in the picture |
| Keep one `.btn-utama` per area | Stack several primary buttons |
| Add both light and dark values for new tokens | Add a token only to `:root` |
| Follow textbook labels and notation | Invent new symbols or English labels in student-facing UI |

---

## Glossary (class and token names)

| Malay | English | Malay | English |
| --- | --- | --- | --- |
| kaca / pekat | glass / dense | keluk / lengkung | curve |
| latar | background | paksi | axis |
| bekas | container | panduan | guide line |
| bar atas / bawah | top / bottom bar | nod / pemegang | node / handle |
| jenama | brand | kawasan | shaded area |
| kotak | callout box | bacaan (`baca`) | reading panel |
| rumus | formula | julat | slider (range) |
| contoh | example | pilih | segmented choice |
| kira | calculation | cip | chip |
| jadual | table | status | status pill |
| aliran | flow | utama | primary |
| istilah | term | hantu | ghost |
| seksyen | section | kecil | small |
| remah | breadcrumb | masuk / keluar | sign in / sign out |
| tema cerah / gelap | light / dark theme | akaun | account |
