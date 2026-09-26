/* =========================================================
   Econ Tutor · /api/sesi
   POST   { idToken }  → sahkan token Firebase + senarai akses, tetapkan kuki sesi
   GET                 → { email, nama } bagi sesi semasa (untuk butang akaun)
   DELETE              → log keluar (padam kuki sesi)
   ========================================================= */
import konfigurasi from "../assets/js/firebase-config.js";
import { ambilKuki, bacaSesi, dibenarkan, kukiSesi, tandatanganSesi, NAMA_KUKI } from "../lib/sesi.js";
import { sahkanTokenFirebase } from "../lib/token-firebase.js";

function json(status, data, pengepala = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...pengepala }
  });
}

// Tolak permintaan dari laman lain (log masuk CSRF).
function asalSama(req) {
  const asal = req.headers.get("origin");
  if (!asal) return true;
  try {
    return new URL(asal).host === (req.headers.get("x-forwarded-host") || req.headers.get("host") || new URL(req.url).host);
  } catch (e) {
    return false;
  }
}

export async function kendaliPost(req, pilihan = {}) {
  if (!asalSama(req)) return json(403, { ralat: "asal" });
  const env = pilihan.env || process.env;
  if (!env.RAHSIA_SESI || env.RAHSIA_SESI.length < 32) return json(500, { ralat: "konfigurasi" });

  let idToken;
  try {
    idToken = (await req.json()).idToken;
  } catch (e) {
    return json(400, { ralat: "permintaan" });
  }

  let t;
  try {
    t = await sahkanTokenFirebase(idToken, (pilihan.konfigurasi || konfigurasi).projectId, pilihan);
  } catch (e) {
    return json(e.kod ? 401 : 503, { ralat: e.kod ? "token" : "pelayan" });
  }

  const email = String(t.email || "").toLowerCase();
  if (!email) return json(403, { ralat: "tiada_email" });
  if (t.email_verified !== true) return json(403, { ralat: "belum_sah", email });
  if (!dibenarkan(email, env.EMAIL_DIBENARKAN)) return json(403, { ralat: "tiada_akses", email });

  const nama = typeof t.name === "string" ? t.name.slice(0, 80) : "";
  const kuki = await tandatanganSesi({ email, nama }, env.RAHSIA_SESI);
  return json(200, { ok: true, email, nama }, { "set-cookie": kukiSesi(kuki) });
}

export async function kendaliGet(req, pilihan = {}) {
  const env = pilihan.env || process.env;
  const sesi = await bacaSesi(ambilKuki(req.headers.get("cookie")), env.RAHSIA_SESI);
  if (!sesi || !dibenarkan(sesi.email, env.EMAIL_DIBENARKAN)) return json(401, { ralat: "tiada_sesi" });
  return json(200, { email: sesi.email, nama: sesi.nama });
}

export async function DELETE(req) {
  if (!asalSama(req)) return json(403, { ralat: "asal" });
  return json(200, { ok: true }, { "set-cookie": NAMA_KUKI + "=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax" });
}

// Pengendali Vercel (argumen kedua diabaikan; pilihan hanya untuk ujian)
export function POST(req) {
  return kendaliPost(req);
}

export function GET(req) {
  return kendaliGet(req);
}
