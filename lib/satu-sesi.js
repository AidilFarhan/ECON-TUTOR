/* =========================================================
   Econ Tutor · satu sesi aktif bagi setiap email
   Log masuk baharu menggantikan sesi lama: ID sesi terkini bagi
   setiap email disimpan dalam Upstash Redis (REST, fetch sahaja),
   dan kuki yang membawa ID lama ditolak.
   Tanpa pemboleh ubah stor (KV_REST_API_URL + KV_REST_API_TOKEN atau
   UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN) had ini tidak aktif.
   Jika stor gagal dihubungi, sesi dibenarkan ("gagal terbuka"):
   senarai akses masih disemak, cuma had peranti tidak dikuatkuasakan.
   EMAIL_BANYAK_PERANTI: email yang dikecualikan (format sama seperti
   EMAIL_DIBENARKAN), contohnya akaun cikgu.
   ========================================================= */
import { TEMPOH_SESI, dibenarkan } from "./sesi.js";

const HAD_MASA_STOR = 2500; // ms

function stor(env) {
  const url = env.KV_REST_API_URL || env.UPSTASH_REDIS_REST_URL;
  const token = env.KV_REST_API_TOKEN || env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url: String(url).replace(/\/+$/, ""), token } : null;
}

function kunci(email) {
  return "econ:sesi:" + email;
}

async function arahan(s, senarai, ambil) {
  const kawal = new AbortController();
  const pemasa = setTimeout(() => kawal.abort(), HAD_MASA_STOR);
  try {
    const res = await ambil(s.url, {
      method: "POST",
      headers: { authorization: "Bearer " + s.token, "content-type": "application/json" },
      body: JSON.stringify(senarai),
      signal: kawal.signal
    });
    if (!res.ok) throw new Error("stor " + res.status);
    return (await res.json()).result;
  } finally {
    clearTimeout(pemasa);
  }
}

export function hadAktif(email, env) {
  return !!stor(env) && !dibenarkan(email, env.EMAIL_BANYAK_PERANTI);
}

export function idBaharu() {
  return crypto.randomUUID();
}

// Jadikan `id` satu-satunya sesi sah bagi email ini. Pulangkan false jika stor gagal.
export async function daftarSesi(email, id, env, ambil = fetch) {
  try {
    await arahan(stor(env), ["SET", kunci(email), id, "EX", TEMPOH_SESI], ambil);
    return true;
  } catch (e) {
    console.error("satu-sesi: gagal menyimpan sesi", e && e.message);
    return false;
  }
}

// "sah" atau "diganti" (email ini telah log masuk di tempat lain selepas kuki ini dikeluarkan).
export async function statusSesi(sesi, env, ambil = fetch) {
  if (!hadAktif(sesi.email, env)) return "sah";
  try {
    const semasa = await arahan(stor(env), ["GET", kunci(sesi.email)], ambil);
    return !semasa || semasa === sesi.id ? "sah" : "diganti";
  } catch (e) {
    console.error("satu-sesi: gagal membaca sesi", e && e.message);
    return "sah";
  }
}
