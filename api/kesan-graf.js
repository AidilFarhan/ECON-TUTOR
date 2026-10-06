/* =========================================================
   Econ Tutor · /api/kesan-graf
   POST  gambar JPEG (badan permintaan) → paksi, nombor dan keluk yang dikesan oleh AI
         { keluk: [{ label, jenis, titik: [[u, v], …] }],
           paksi: { x, y (label), O, hujungX, hujungY ([u, v] atau null), tandaX, tandaY ([[nilai, kedudukan], …]) }, baki }
         u = pecahan dari kiri gambar, v = pecahan dari BAWAH gambar (0..1).
   Hanya untuk pelajar yang sudah log masuk; had HAD_SEHARI imbasan sehari.
   Gambar tidak disimpan: ia dihantar kepada pembekal AI (API gaya OpenAI, lalai mireld.my) dan dibuang.
   Pemboleh ubah persekitaran (Vercel sahaja): MIRELD_API_KEY (kunci), MIRELD_MODEL (ID model yang boleh
   membaca gambar), MIRELD_BASE_URL (pilihan; lalai https://api.mireld.my/v1).
   ========================================================= */
import { ambilKuki, bacaSesi, dibenarkan } from "../lib/sesi.js";
import { HAD_SEHARI, NAMA_KUKI_AI, bacaKiraan, hariIni, kukiKiraan, tandatanganKiraan } from "../lib/had-ai.js";

const URL_LALAI = "https://api.mireld.my/v1";
const MAKS_BAIT = 3 * 1024 * 1024;
const MAKS_KELUK = 6; // sama dengan EKO.bina.MAKS_KELUK
const MAKS_TITIK = 12;
const JENIS = ["permintaan", "penawaran", "kkp"];

const ARAHAN = [
  "Anda mengesan keluk dalam gambar graf ekonomi (buku teks, slaid atau tulisan tangan) untuk pelajar SPM, STPM dan Matrikulasi di Malaysia.",
  "Koordinat ialah pecahan gambar penuh: x = 0 di tepi kiri dan 1 di tepi kanan; y = 0 di tepi ATAS dan 1 di tepi BAWAH.",
  "Bagi setiap keluk atau garis yang dilukis (bukan paksi, bukan garis panduan putus-putus ke paksi, bukan anak panah):",
  "- label: huruf pada keluk itu dalam gambar (contoh D, S, D1, KKP). Jika tiada label, beri rentetan kosong.",
  "- jenis: permintaan, penawaran atau kkp hanya jika label atau tajuk dalam gambar menunjukkannya dengan jelas; jika tidak, lain. Jangan teka daripada bentuk sahaja.",
  "- titik: 2 titik (kedua-dua hujung) bagi garis lurus, atau 5 hingga 10 titik yang mengikut lengkung, disusun dari satu hujung ke hujung yang lain. Titik mesti terletak di atas dakwat keluk itu.",
  "paksi_x dan paksi_y: label paksi datar dan paksi tegak seperti yang tertulis, termasuk unitnya (contoh Kuantiti (unit), Harga (RM)); rentetan kosong jika tidak kelihatan.",
  "asalan: titik persilangan paksi tegak dengan paksi datar. hujung_x: hujung kanan garis paksi datar. hujung_y: hujung atas garis paksi tegak (hujung garis, bukan labelnya).",
  "tanda_x dan tanda_y: setiap NOMBOR yang tertulis di sepanjang paksi datar (tanda_x) dan paksi tegak (tanda_y), sama ada tanda skala atau nilai di hujung garis panduan putus-putus. nilai ialah nombor itu; x (bagi tanda_x) atau y (bagi tanda_y) ialah kedudukan tanda itu pada garis paksi, bukan kedudukan teksnya. Abaikan sifar di asalan dan label bukan nombor seperti P0, Q1 atau E. Senarai kosong jika paksi tiada nombor.",
  "Jika gambar bukan graf dengan dua paksi, atau keluknya tidak dapat dilihat dengan jelas, beri ada_graf = false dan senarai keluk kosong.",
  "Jawab dengan SATU objek JSON sahaja, tanpa teks lain, dalam bentuk ini:",
  '{"ada_graf": true, "paksi_x": "", "paksi_y": "", "asalan": {"x": 0, "y": 0}, "hujung_x": {"x": 0, "y": 0}, "hujung_y": {"x": 0, "y": 0}, "tanda_x": [{"nilai": 0, "x": 0}], "tanda_y": [{"nilai": 0, "y": 0}], "keluk": [{"label": "", "jenis": "permintaan | penawaran | kkp | lain", "titik": [{"x": 0, "y": 0}]}]}'
].join("\n");

const TITIK = {
  type: "object",
  additionalProperties: false,
  required: ["x", "y"],
  properties: { x: { type: "number" }, y: { type: "number" } }
};

const SKEMA = {
  type: "object",
  additionalProperties: false,
  required: ["ada_graf", "paksi_x", "paksi_y", "asalan", "hujung_x", "hujung_y", "tanda_x", "tanda_y", "keluk"],
  properties: {
    ada_graf: { type: "boolean" },
    paksi_x: { type: "string" },
    paksi_y: { type: "string" },
    asalan: TITIK,
    hujung_x: TITIK,
    hujung_y: TITIK,
    tanda_x: {
      type: "array",
      items: { type: "object", additionalProperties: false, required: ["nilai", "x"], properties: { nilai: { type: "number" }, x: { type: "number" } } }
    },
    tanda_y: {
      type: "array",
      items: { type: "object", additionalProperties: false, required: ["nilai", "y"], properties: { nilai: { type: "number" }, y: { type: "number" } } }
    },
    keluk: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["label", "jenis", "titik"],
        properties: {
          label: { type: "string" },
          jenis: { type: "string", enum: ["permintaan", "penawaran", "kkp", "lain"] },
          titik: { type: "array", items: TITIK }
        }
      }
    }
  }
};

function json(status, data, pengepala = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...pengepala }
  });
}

// Tolak permintaan dari laman lain (sama seperti api/sesi.js).
function asalSama(req) {
  const asal = req.headers.get("origin");
  if (!asal) return true;
  try {
    return new URL(asal).host === (req.headers.get("x-forwarded-host") || req.headers.get("host") || new URL(req.url).host);
  } catch (e) {
    return false;
  }
}

function keB64(bait) {
  let s = "";
  for (let i = 0; i < bait.length; i += 0x8000) s += String.fromCharCode.apply(null, bait.subarray(i, i + 0x8000));
  return btoa(s);
}

function teks(nilai, maks) {
  return typeof nilai === "string" ? nilai.replace(/\s+/g, " ").trim().slice(0, maks) : "";
}

function pecahan(n) {
  return +Math.min(1, Math.max(0, n)).toFixed(4);
}

// { x, y } daripada model (y dari atas) → [u, v] (v dari bawah), atau null
function titikUV(p) {
  return p && Number.isFinite(p.x) && Number.isFinite(p.y) ? [pecahan(p.x), pecahan(1 - p.y)] : null;
}

// Nombor pada paksi → [[nilai, kedudukan]], kedudukan = pecahan gambar di sepanjang paksi itu
function tandaPaksi(senarai, kunci) {
  const keluar = [];
  for (const t of Array.isArray(senarai) ? senarai : []) {
    if (keluar.length >= MAKS_TITIK) break;
    if (!t || !Number.isFinite(t.nilai) || Math.abs(t.nilai) > 1e9 || !Number.isFinite(t[kunci])) continue;
    keluar.push([t.nilai, pecahan(kunci === "y" ? 1 - t.y : t.x)]);
  }
  return keluar;
}

// Jawapan model → bentuk yang selamat untuk pelayar: nombor terhad 0..1, bilangan terhad, y dibalikkan (dari bawah).
export function kemasHasil(mentah) {
  const kosong = { keluk: [], paksi: { x: "", y: "", O: null, hujungX: null, hujungY: null, tandaX: [], tandaY: [] } };
  if (!mentah || mentah.ada_graf !== true || !Array.isArray(mentah.keluk)) return kosong;
  const keluk = [];
  for (const k of mentah.keluk) {
    if (keluk.length >= MAKS_KELUK) break;
    if (!k || !Array.isArray(k.titik)) continue;
    let titik = [];
    for (const p of k.titik) {
      if (!p || !Number.isFinite(p.x) || !Number.isFinite(p.y)) continue;
      const u = Math.min(1, Math.max(0, p.x));
      const v = 1 - Math.min(1, Math.max(0, p.y));
      const akhir = titik[titik.length - 1];
      if (!akhir || Math.abs(akhir[0] - u) + Math.abs(akhir[1] - v) > 0.004) titik.push([+u.toFixed(4), +v.toFixed(4)]);
    }
    if (titik.length < 2) continue;
    if (titik.length > MAKS_TITIK) {
      const n = titik.length;
      titik = Array.from({ length: MAKS_TITIK }, (_, i) => titik[Math.round((i * (n - 1)) / (MAKS_TITIK - 1))]);
    }
    keluk.push({
      label: teks(k.label, 12).replace(/[^\p{L}\p{N}′' ]/gu, "").slice(0, 6),
      jenis: JENIS.includes(k.jenis) ? k.jenis : null,
      titik
    });
  }
  return {
    keluk,
    paksi: {
      x: teks(mentah.paksi_x, 40),
      y: teks(mentah.paksi_y, 40),
      O: titikUV(mentah.asalan),
      hujungX: titikUV(mentah.hujung_x),
      hujungY: titikUV(mentah.hujung_y),
      tandaX: tandaPaksi(mentah.tanda_x, "x"),
      tandaY: tandaPaksi(mentah.tanda_y, "y")
    }
  };
}

// Panggilan gaya OpenAI (chat/completions). Jawapan berskema diminta dahulu; jika pembekal atau model
// menolak parameter itu (400), cuba sekali lagi dengan arahan JSON dalam prom sahaja.
async function tanyaAI(b64, cfg, ambil) {
  const badan = {
    model: cfg.model,
    max_tokens: 8000,
    messages: [
      { role: "system", content: ARAHAN },
      {
        role: "user",
        content: [
          { type: "text", text: "Kesan paksi, nombor pada paksi dan keluk dalam gambar graf ini." },
          { type: "image_url", image_url: { url: "data:image/jpeg;base64," + b64 } }
        ]
      }
    ]
  };
  const hantar = (b) =>
    ambil(cfg.url + "/chat/completions", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: "Bearer " + cfg.kunci },
      body: JSON.stringify(b),
      signal: AbortSignal.timeout(50000)
    });
  let res = await hantar({ ...badan, response_format: { type: "json_schema", json_schema: { name: "graf", strict: true, schema: SKEMA } } });
  if (res.status === 400) {
    const { max_tokens, ...ringkas } = badan;
    res = await hantar(ringkas);
  }
  if (!res.ok) {
    const e = new Error("API AI " + res.status);
    e.status = res.status;
    throw e;
  }
  return res.json();
}

// Teks jawapan model → objek JSON (model tanpa jawapan berskema kadang-kadang membalut JSON dengan teks atau pagar kod)
export function bacaJson(teksJawapan) {
  if (typeof teksJawapan !== "string") return null;
  const a = teksJawapan.indexOf("{"),
    b = teksJawapan.lastIndexOf("}");
  if (a < 0 || b <= a) return null;
  try {
    return JSON.parse(teksJawapan.slice(a, b + 1));
  } catch (e) {
    return null;
  }
}

export async function kendaliPost(req, pilihan = {}) {
  if (!asalSama(req)) return json(403, { ralat: "asal" });
  const env = pilihan.env || process.env;
  const sekarang = pilihan.sekarang || Date.now();

  const sesi = await bacaSesi(ambilKuki(req.headers.get("cookie")), env.RAHSIA_SESI, Math.floor(sekarang / 1000));
  if (!sesi || !dibenarkan(sesi.email, env.EMAIL_DIBENARKAN)) return json(401, { ralat: "tiada_sesi" });
  const cfg = { kunci: env.MIRELD_API_KEY, model: env.MIRELD_MODEL, url: (env.MIRELD_BASE_URL || URL_LALAI).replace(/\/+$/, "") };
  if (!cfg.kunci || !cfg.model || !/^https:\/\//.test(cfg.url)) return json(503, { ralat: "belum_sedia" });

  if (!/^image\/jpeg\b/.test(req.headers.get("content-type") || "")) return json(415, { ralat: "gambar" });
  if (+(req.headers.get("content-length") || 0) > MAKS_BAIT) return json(413, { ralat: "gambar" });
  let bait;
  try {
    bait = new Uint8Array(await req.arrayBuffer());
  } catch (e) {
    return json(400, { ralat: "gambar" });
  }
  if (bait.length > MAKS_BAIT) return json(413, { ralat: "gambar" });
  if (bait.length < 1024 || bait[0] !== 0xff || bait[1] !== 0xd8) return json(400, { ralat: "gambar" });

  const hari = hariIni(sekarang);
  const guna = await bacaKiraan(ambilKuki(req.headers.get("cookie"), NAMA_KUKI_AI), env.RAHSIA_SESI, sesi.email, hari);
  if (guna >= HAD_SEHARI) return json(429, { ralat: "had", had: HAD_SEHARI });

  let jawapan;
  try {
    jawapan = await tanyaAI(keB64(bait), cfg, pilihan.ambil || fetch);
  } catch (e) {
    // kunci atau model salah, kredit habis atau had kadar: tiada butiran dihantar kepada pelajar
    console.error("kesan-graf:", e.status || e.name || "ralat");
    return json(502, { ralat: "ai" });
  }

  // panggilan ini dibilkan walaupun tiada graf dikesan, jadi ia dikira
  const kuki = kukiKiraan(await tandatanganKiraan({ email: sesi.email, hari, n: guna + 1 }, env.RAHSIA_SESI));
  const baki = HAD_SEHARI - guna - 1;
  if (jawapan.usage) console.log("kesan-graf: token masuk " + jawapan.usage.prompt_tokens + ", keluar " + jawapan.usage.completion_tokens);

  // jawapan bukan JSON (atau terpotong): dianggap tiada graf dikesan
  const pilihanAI = jawapan.choices && jawapan.choices[0];
  const hasil = kemasHasil(bacaJson(pilihanAI && pilihanAI.message && pilihanAI.message.content));
  if (!hasil.keluk.length) console.log("kesan-graf: tiada keluk, finish_reason " + (pilihanAI && pilihanAI.finish_reason));
  return json(200, { ...hasil, baki }, { "set-cookie": kuki });
}

// Pengendali Vercel (pilihan hanya untuk ujian)
export function POST(req) {
  return kendaliPost(req);
}
