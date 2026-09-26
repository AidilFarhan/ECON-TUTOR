/* =========================================================
   Econ Tutor · sesi log masuk (dikongsi oleh middleware.js dan api/sesi.js)
   Kuki "econ_sesi" = v1.<data base64url>.<HMAC-SHA256 base64url>
   Rahsia HMAC: pemboleh ubah persekitaran RAHSIA_SESI.
   Senarai akses: pemboleh ubah persekitaran EMAIL_DIBENARKAN.
   ========================================================= */

export const NAMA_KUKI = "econ_sesi";
export const TEMPOH_SESI = 12 * 60 * 60; // saat

const pengekod = new TextEncoder();
const penyahkod = new TextDecoder();

function keB64url(bait) {
  let s = "";
  for (let i = 0; i < bait.length; i++) s += String.fromCharCode(bait[i]);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function dariB64url(teks) {
  const b64 = teks.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((teks.length + 3) % 4);
  const s = atob(b64);
  const bait = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) bait[i] = s.charCodeAt(i);
  return bait;
}

const kunciCache = new Map();
function kunciHmac(rahsia) {
  if (!kunciCache.has(rahsia)) {
    kunciCache.set(rahsia, crypto.subtle.importKey("raw", pengekod.encode(rahsia), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]));
  }
  return kunciCache.get(rahsia);
}

// Rahsia yang terlalu pendek dianggap tiada, supaya laman "gagal tertutup".
function rahsiaSah(rahsia) {
  return typeof rahsia === "string" && rahsia.length >= 32;
}

export async function tandatanganSesi(data, rahsia, sekarang = Math.floor(Date.now() / 1000)) {
  if (!rahsiaSah(rahsia)) throw new Error("RAHSIA_SESI belum ditetapkan");
  const isi = keB64url(pengekod.encode(JSON.stringify({ e: data.email, n: data.nama || "", x: sekarang + TEMPOH_SESI })));
  const tanda = new Uint8Array(await crypto.subtle.sign("HMAC", await kunciHmac(rahsia), pengekod.encode("v1." + isi)));
  return "v1." + isi + "." + keB64url(tanda);
}

// Pulangkan { email, nama, tamat } jika kuki sah dan belum tamat; jika tidak, null.
export async function bacaSesi(nilai, rahsia, sekarang = Math.floor(Date.now() / 1000)) {
  if (!nilai || !rahsiaSah(rahsia)) return null;
  const bah = nilai.split(".");
  if (bah.length !== 3 || bah[0] !== "v1") return null;
  try {
    const ok = await crypto.subtle.verify("HMAC", await kunciHmac(rahsia), dariB64url(bah[2]), pengekod.encode("v1." + bah[1]));
    if (!ok) return null;
    const d = JSON.parse(penyahkod.decode(dariB64url(bah[1])));
    if (typeof d.e !== "string" || typeof d.x !== "number" || d.x <= sekarang) return null;
    return { email: d.e, nama: d.n || "", tamat: d.x };
  } catch (e) {
    return null;
  }
}

export function ambilKuki(pengepala, nama = NAMA_KUKI) {
  if (!pengepala) return null;
  for (const bahagian of pengepala.split(";")) {
    const i = bahagian.indexOf("=");
    if (i > -1 && bahagian.slice(0, i).trim() === nama) return bahagian.slice(i + 1).trim();
  }
  return null;
}

export function kukiSesi(nilai, maksUmur = TEMPOH_SESI) {
  return NAMA_KUKI + "=" + nilai + "; Path=/; Max-Age=" + maksUmur + "; HttpOnly; Secure; SameSite=Lax";
}

/* ---------- senarai akses ---------- */
// EMAIL_DIBENARKAN: email dipisahkan dengan koma, koma bertitik, ruang atau baris baharu.
// Entri yang bermula dengan "@" membenarkan seluruh domain, contohnya @moe-dl.edu.my.
let senaraiCache = { mentah: null, email: new Set(), domain: [] };

function senarai(mentah) {
  if (senaraiCache.mentah !== mentah) {
    const email = new Set();
    const domain = [];
    String(mentah || "")
      .split(/[\s,;]+/)
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean)
      .forEach((s) => (s.charAt(0) === "@" ? domain.push(s) : email.add(s)));
    senaraiCache = { mentah, email, domain };
  }
  return senaraiCache;
}

export function dibenarkan(email, mentah) {
  if (!email) return false;
  const e = String(email).toLowerCase();
  const s = senarai(mentah);
  if (s.email.has(e)) return true;
  return s.domain.some((d) => e.endsWith(d));
}
