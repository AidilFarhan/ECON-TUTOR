# AGENTS.md

Guidance for AI coding agents (and human contributors) working on **Econ Tutor**, an interactive SPM Economics (KSSM Form 4 and 5) study site. It is plain HTML/CSS/JS with no build step, plus a Vercel middleware and one function that put the content behind a Google or email sign-in with an allowlist.

Claude Code loads this file through [CLAUDE.md](CLAUDE.md), which adds a few Claude-specific notes.

Read first: [ARCHITECTURE.md](ARCHITECTURE.md) (how it works) · [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) (how it looks) · [PRD.md](PRD.md) (what it must do) · [README.md](README.md) (owner-facing guide, in Malay).

---

## 1. Hard rules

**Always**
- Keep the content app **build-free and dependency-free**. It must still work by opening `index.html` directly or with `python3 -m http.server`.
- Write student-facing text in **Bahasa Melayu** using textbook terminology. Identifiers, CSS classes and code comments are also Malay; follow the existing names (glossary in §9).
- Stay **faithful to the textbooks**: subtopic numbers, definitions, data and figures. Label anything not from the textbook or official scheme as *cadangan*.
- Use design tokens (`var(--…)`) for every colour. Give every new token a light value **and both** dark-mode blocks.
- Stack related graphs **vertically**. Never put graphs side by side (the owner asked for this explicitly).
- Format numbers with `EKO.fmt` / `EKO.rm` (space thousands separator, `.` decimal, `−` minus).
- Escape plain-text values inserted into HTML with `EKO.esc`.
- Verify your change (§4) before committing, including dark mode and a 360–390 px viewport.

**Never**
- Commit secrets. `RAHSIA_SESI` and `EMAIL_DIBENARKAN` live only in Vercel env vars. (`assets/js/firebase-config.js` is public by design and is fine to commit.)
- Add a content path to the `TERBUKA` (public) list in `middleware.js`. Only the login page and the assets it needs may be public.
- Weaken token checks in `lib/token-firebase.js`: algorithm pin, `kid`, `aud`/`iss`/`exp`/`iat`/`auth_time`, and `email_verified` in `api/sesi.js`.
- Deploy source PDFs or the hidden Terengganu paper. Keep `.vercelignore` as it is unless the owner asks.
- Add npm dependencies to browser code, a bundler, a framework or a CSS library.
- Push directly to `main`. `main` auto-deploys to production (§6).
- Rename existing `localStorage` keys or ids (`t4-b1`, `kel25`, card and quiz ids). Students' saved progress depends on them.

---

## 2. Repository map

| Path | What it is |
| --- | --- |
| `index.html` | SPA shell; script tags in load order |
| `masuk.html`, `assets/js/masuk.js` | Login page (Firebase Auth, ES module) |
| `middleware.js` | Vercel Routing Middleware: access gate |
| `api/sesi.js`, `lib/*.js` | Session API, signed cookie, allowlist, Firebase token verification |
| `assets/js/eko-core.js` | `window.EKO`: registries, storage, formatting, icons |
| `assets/js/graf.js` | `EKO.graf` SVG engine + market graphs |
| `assets/js/graf-t4.js`, `graf-t5.js` | Form 4 / Form 5 graph widgets |
| `assets/js/app.js` | Hash router and all views |
| `assets/js/akaun.js` | Header account button and sign-out |
| `assets/js/data/*.js` | Content: one file per chapter, one per trial paper |
| `assets/css/style.css` | The whole design system |
| `assets/js/vendor/` | Self-hosted Firebase Auth bundle (generated, do not edit) |
| `*.pdf` | Source textbooks and papers (reference only, never deployed) |

---

## 3. Code conventions

### Browser scripts (`assets/js/*.js` except `masuk.js`)
- Each file is a classic script wrapped in an IIFE with `"use strict"`, and extends `window.EKO` (`var E = window.EKO; var G = E.graf;`).
- **ES5 style:** `var`, `function`, string concatenation. No arrow functions, `let`/`const`, classes or template literals in `app.js`, `eko-core.js` or the `graf*.js` files. Template literals are allowed in data files for long `html` strings.
- Formatting: 2-space indent, double quotes, semicolons, about 120-character lines.
- Views build HTML strings and set `innerHTML`. Anything a view attaches (observers, timers, key listeners) must be torn down in `bersih()`. Graph widgets return `{ musnah }` to clean up their own.

### Login and server (`masuk.js`, `middleware.js`, `api/`, `lib/`)
- Modern ES modules (`import`/`export`, `const`, async/await). `package.json` has `"type": "module"`.
- Server code uses only Web platform APIs (`Request`, `Response`, `crypto.subtle`, `fetch`), with **no npm packages**.
- Vercel handlers are the named exports `GET`/`POST`/`DELETE` in `api/sesi.js`. Testable logic sits in `kendaliPost` / `kendaliGet`, which accept an options object (`env`, `ambil`, `konfigurasi`, `sekarang`).

### CSS
- Everything lives in `assets/css/style.css`. Add rules in the matching section (look for the `/* ---------- name ---------- */` headers), or append a new clearly labelled section at the end.
- Reuse components before inventing new ones (`.kaca`, `.btn`, `.kotak.*`, `.cip`, `.status`, `.medan`).
- Mobile first means checking 360 px. The important breakpoint is 860 px (bottom navigation).

### Content (`assets/js/data/*.js`)
- Chapter shape: `EKO.daftarBab({ id, tingkatan, no, tajuk, warna, ringkas, seksyen[], kad[], kuiz[] })`. See ARCHITECTURE §3.5 for every schema.
- Quiz: `j` is the index of the correct option (0 = A). Always give an explanation `e`. Keep answer positions varied across a chapter.
- Note HTML uses the existing components: `kotak def/rumus/tip/contoh/fokus/info`, `kira`, `jadual`, `aliran`, `grid-2/3` with `kad-mini`, `istilah`, and `<figure data-graf="…">` for graphs.
- Keep subtopic numbering exactly as the textbook (e.g. `t: "2.1.3"` on cards, `no: "2.1"` on sections).

---

## 4. Verify before you commit

There is no test suite in the repo. Use these checks:

```bash
# 1. Syntax check (all JS, including ESM server files)
for f in assets/js/*.js assets/js/data/*.js middleware.js api/*.js lib/*.js; do node --check "$f" || echo "FAIL $f"; done

# 2. Serve locally (no sign-in gate locally) and open the pages you touched
python3 -m http.server 8765
```

**Content integrity.** Load the data files in Node and check the counts. The script prints chapter counts and throws on syntax or registration errors. Don't commit it:

```js
// Save as check.cjs (the repo is ESM, so .js would fail on require) and run from the repo root: node check.cjs
const fs = require("fs"), vm = require("vm");
const ctx = { console, document: { getElementById: () => null } }; ctx.window = ctx; vm.createContext(ctx);
["eko-core.js", "data/t4-bab1.js", "data/t4-bab2.js", "data/t4-bab3.js", "data/t4-bab4.js",
 "data/t5-bab1.js", "data/t5-bab2.js", "data/percubaan-kelantan-2025.js"]
  .forEach(f => vm.runInContext(fs.readFileSync("assets/js/" + f, "utf8"), ctx, { filename: f }));
for (const b of ctx.EKO.bab) console.log(b.id, b.kad.length, "kad", b.kuiz.length, "kuiz",
  b.kuiz.filter(q => !(q.j >= 0 && q.j < q.p.length)).length, "bad answers");
```

**Browser check (manual or Playwright):**
- The changed view renders with **no console errors**.
- Light **and** dark mode both look right.
- There is **no horizontal scroll** at 360–390 px.
- Graphs can be dragged by pointer and keyboard, and the reading panel updates.
- After navigating to another route and back, there are no duplicated listeners or timers.

**Auth changes.**
- Unit-test the handlers in Node. Generate an RSA key with `crypto.subtle`, serve a fake JWKS through the `ambil` option, and cover: valid, expired, wrong `aud`/`iss`, forged signature, `alg: none`, unverified email, email not on the list, cross-origin `Origin`, and a missing secret.
- For middleware: public paths continue (`x-middleware-next: 1`), pages without a cookie get `302 /masuk.html`, and other files get `401`.

---

## 5. Common tasks

| Task | Steps |
| --- | --- |
| **Fix or extend notes** | Edit the chapter's `assets/js/data/tX-babN.js` → verify the section renders → check the quiz and flashcard counts still load |
| **Add a chapter** | New data file with `EKO.daftarBab` → add `<script src="assets/js/data/…" defer>` to `index.html` **before `app.js`** → pick a `--bab-rm*` colour → update counts in README and PRD |
| **Add a graph** | In `graf-t4.js` / `graf-t5.js`: `G.daftar("name", function (host, opt) { var K = G.kad(host, {tajuk, petunjuk}); … return { musnah: … }; }, { tajuk, bab })`. Follow DESIGN_SYSTEM §10 (axes, colours, reading panel). Embed it with `<figure data-graf="name" data-opt='{…}'></figure>` |
| **Add a trial paper** | New `assets/js/data/percubaan-<state>-<year>.js`: `EKO.daftarSet` for K1 (tag each question with `bab`) and `EKO.daftarK2` for K2 (unique `id`, and **no** `kunciLama`). Add the script tag. Home, Percubaan and Kuiz update automatically. Check every K1 answer against the scheme PDF |
| **Pictures from a paper** | Crop each figure from the PDF with PyMuPDF at 200 dpi (`page.get_pixmap(dpi=200, clip=rect)`), trim white margins, save as WebP in `assets/img/percubaan/<paper>/`. Reference it with `gambar: { src, alt, w, h, kapsyen }` (w and h in pixels), put question text that comes after the figure in `s2`, and use `EKO.gambar(g, true)` for images inside answer options. Always write a meaningful `alt` |
| **Show the Terengganu paper** | Only when the owner confirms permission: (1) add its script tag after the Kelantan one; (2) remove its line from `.vercelignore`; (3) update the footer and meta description in `index.html` |
| **Allow a student** | Vercel → project **econwebsite** → Settings → Environment Variables → `EMAIL_DIBENARKAN` (comma-separated; `@domain` for a whole domain) → Redeploy. Do the same on the duplicate `econ-tutor` project while it exists |
| **Sign everyone out** | Change `RAHSIA_SESI` (random, at least 32 characters) in Vercel → Redeploy |
| **Update the Firebase SDK** | Bundle the exports used by `masuk.js` with esbuild into `assets/js/vendor/firebase-auth-<version>.js`, update the import path, and delete the old bundle (see the README) |
| **New sign-in domain** | Add it in Firebase → Authentication → Settings → Authorized domains (owner action) |

---

## 6. Git and deployment

- Work on a feature branch and open a PR into `main`. **Merging to `main` deploys to production** on two Vercel projects:
  - `econwebsite`: the primary project, `econwebsite.vercel.app`, and the only domain authorised in Firebase.
  - `econ-tutor`: a duplicate, `econ-tutor-two.vercel.app`, planned for deletion.
- Preview deployments (branches) sit behind Vercel SSO, and Google sign-in does not work on preview domains because they are not authorised in Firebase.
- Env var changes apply only to **new** deployments, so redeploy after editing.
- Commit messages and PR titles are in Malay, in the imperative ("Tambah…", "Betulkan…", "Tulis semula…"). Put a short summary on the first line and bullets for details.
- PR descriptions (in Malay) have three parts: a summary, what changed, and how it was tested.

---

## 7. Definition of done

- [ ] Change matches the textbook and the PRD requirement it touches
- [ ] `node --check` passes for every JS file
- [ ] No console errors; light and dark checked; 360 px checked, with no horizontal scroll
- [ ] Graphs: draggable by pointer and keyboard, reading panel correct, stacked vertically
- [ ] No new public paths in `middleware.js`; no secrets in the diff
- [ ] Saved-progress ids and keys unchanged (or migrated)
- [ ] README, PRD counts or ARCHITECTURE updated if behaviour or structure changed

---

## 8. Working with the owner

The owner is an Economics teacher, not a full-time developer. Communicate in casual Bahasa Melayu with English technical terms. Explain steps in terms of the UI they will click (Vercel dashboard, Firebase console). Ask before anything that changes who can access the site, publishes exam material, or deletes projects or data.

---

## 9. Glossary

| Identifier | Meaning |
| --- | --- |
| `EKO` / `E` | Global app namespace (`window.EKO`) |
| `G` / `EKO.graf` | Graph engine |
| `bab`, `tingkatan`, `no`, `tajuk`, `ringkas` | chapter, form (4/5), number, title, summary |
| `seksyen`, `soalan`, `html` | section, guiding questions, note markup |
| `kad` `{d, b, t}` | flashcard: front (*depan*), back (*belakang*), subtopic tag |
| `kuiz` `{s, p, j, e}` | question: stem (*soalan*), options (*pilihan*), answer index (*jawapan*), explanation (*penerangan*) |
| `daftarBab` / `daftarSet` / `daftarK2` | register chapter / MCQ set / Kertas 2 paper |
| `percubaan`, `K1`, `K2`, `skema`, `rubrik`, `markah` | trial exam, Paper 1 (MCQ), Paper 2 (structured/essay), marking scheme, level rubric, marks |
| `papar`, `pergi`, `laluan`, `bersih` | render, navigate, current route, tear down |
| `pUtama`, `pNota`, `pBab`, `pGraf`, `pKad`, `pKuizSenarai`, `pKuizMula`, `pPercubaan`, `pK2` | view functions (home, notes list, chapter, graph lab, flashcards, quiz list, quiz run, trial papers, Kertas 2) |
| `pasang` / `tanggal` / `musnah` | mount graphs / unmount all / destroy one widget |
| `plot`, `lapis`, `paksi`, `keluk`, `nod`, `pegang`/`seret`, `panduan`, `cip` | plot, layers, axis, curve, node, handle/drag, guide line, chip |
| `baca`/`bacaan`, `julat`, `pilih`, `butang`, `legenda`, `carta`, `selanjar` | reading panel, slider, segmented control, button, legend, series chart, continuous tracker |
| `data()`, `kemas()`, `dibaca`, `diingat`, `terbaik`, `akhir` | read storage, update storage, read (chapters), remembered (cards), best score, last opened |
| `masuk`, `keluar`, `sesi`, `akaun`, `kuki`, `rahsia` | sign in, sign out, session, account, cookie, secret |
| `EMAIL_DIBENARKAN`, `RAHSIA_SESI`, `TERBUKA` | allowlist env var, cookie-signing secret env var, public path list |
| `tema` `sistem`/`cerah`/`gelap` | theme: system / light / dark |
