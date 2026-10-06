/* =========================================================
   Econ Tutor · had guna AI sehari (digunakan oleh api/kesan-graf.js)
   Kuki "econ_ai" = ai1.<data base64url>.<HMAC-SHA256 base64url>
   Data: { e: email, h: hari (YYYY-MM-DD, waktu Malaysia), n: bilangan imbasan }.
   Tiada pangkalan data: kiraan disimpan dalam kuki bertandatangan (RAHSIA_SESI),
   jadi pelajar tidak boleh mengubahnya, tetapi kiraan bermula semula jika kuki dipadam.
   Had sebenar perbelanjaan ialah baki atau had dalam akaun pembekal AI.
   ========================================================= */
import { dariB64url, keB64url } from "./sesi.js";

export const NAMA_KUKI_AI = "econ_ai";
export const HAD_SEHARI = 10;

const pengekod = new TextEncoder();
const penyahkod = new TextDecoder();

function kunci(rahsia) {
  return crypto.subtle.importKey("raw", pengekod.encode(rahsia), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}

// Hari mengikut waktu Malaysia (UTC+8), supaya had bermula semula pada tengah malam tempatan.
export function hariIni(sekarang = Date.now()) {
  return new Date(sekarang + 8 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

export async function tandatanganKiraan(data, rahsia) {
  const isi = keB64url(pengekod.encode(JSON.stringify({ e: data.email, h: data.hari, n: data.n })));
  const tanda = new Uint8Array(await crypto.subtle.sign("HMAC", await kunci(rahsia), pengekod.encode("ai1." + isi)));
  return "ai1." + isi + "." + keB64url(tanda);
}

// Bilangan imbasan pelajar ini pada hari ini; 0 jika kuki tiada, tidak sah, milik email lain atau hari lain.
export async function bacaKiraan(nilai, rahsia, email, hari) {
  if (!nilai) return 0;
  const bah = nilai.split(".");
  if (bah.length !== 3 || bah[0] !== "ai1") return 0;
  try {
    const ok = await crypto.subtle.verify("HMAC", await kunci(rahsia), dariB64url(bah[2]), pengekod.encode("ai1." + bah[1]));
    if (!ok) return 0;
    const d = JSON.parse(penyahkod.decode(dariB64url(bah[1])));
    if (d.e !== email || d.h !== hari || !Number.isInteger(d.n) || d.n < 0) return 0;
    return d.n;
  } catch (e) {
    return 0;
  }
}

export function kukiKiraan(nilai) {
  return NAMA_KUKI_AI + "=" + nilai + "; Path=/api/kesan-graf; Max-Age=" + 2 * 24 * 60 * 60 + "; HttpOnly; Secure; SameSite=Lax";
}
