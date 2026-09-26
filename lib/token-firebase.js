/* =========================================================
   Econ Tutor · sahkan token ID Firebase di pelayan (tanpa pustaka luar)
   Rujukan: https://firebase.google.com/docs/auth/admin/verify-id-tokens
   ========================================================= */
import { dariB64url } from "./sesi.js";

const URL_KUNCI = "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com";
const penyahkod = new TextDecoder();

let cacheKunci = { tamat: 0, kunci: null };

async function kunciAwam(ambil) {
  const sekarang = Date.now();
  if (cacheKunci.kunci && cacheKunci.tamat > sekarang) return cacheKunci.kunci;
  const res = await ambil(URL_KUNCI);
  if (!res.ok) throw new Error("Gagal memuatkan kunci awam Firebase (" + res.status + ")");
  const jwks = await res.json();
  const umur = /max-age=(\d+)/.exec(res.headers.get("cache-control") || "");
  const kunci = new Map();
  for (const k of jwks.keys || []) {
    kunci.set(k.kid, await crypto.subtle.importKey("jwk", k, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]));
  }
  cacheKunci = { tamat: sekarang + (umur ? Number(umur[1]) : 3600) * 1000, kunci };
  return kunci;
}

// Pulangkan tuntutan token jika sah. Jika tidak, lontar Error dengan .kod.
export async function sahkanTokenFirebase(token, idProjek, pilihan = {}) {
  const ambil = pilihan.ambil || fetch;
  const sekarang = pilihan.sekarang != null ? pilihan.sekarang : Math.floor(Date.now() / 1000);
  const gagal = (kod) => {
    const e = new Error("Token tidak sah: " + kod);
    e.kod = kod;
    throw e;
  };
  if (!idProjek) gagal("tiada_projek");
  if (typeof token !== "string") gagal("format");
  const bah = token.split(".");
  if (bah.length !== 3) gagal("format");

  let kepala, tuntutan;
  try {
    kepala = JSON.parse(penyahkod.decode(dariB64url(bah[0])));
    tuntutan = JSON.parse(penyahkod.decode(dariB64url(bah[1])));
  } catch (e) {
    gagal("format");
  }
  if (kepala.alg !== "RS256" || !kepala.kid) gagal("algoritma");

  const kunci = (await kunciAwam(ambil)).get(kepala.kid);
  if (!kunci) gagal("kid");
  const ok = await crypto.subtle.verify("RSASSA-PKCS1-v1_5", kunci, dariB64url(bah[2]), new TextEncoder().encode(bah[0] + "." + bah[1]));
  if (!ok) gagal("tandatangan");

  const kelonggaran = 60;
  if (tuntutan.aud !== idProjek) gagal("aud");
  if (tuntutan.iss !== "https://securetoken.google.com/" + idProjek) gagal("iss");
  if (typeof tuntutan.sub !== "string" || !tuntutan.sub) gagal("sub");
  if (typeof tuntutan.exp !== "number" || tuntutan.exp <= sekarang) gagal("tamat");
  if (typeof tuntutan.iat !== "number" || tuntutan.iat > sekarang + kelonggaran) gagal("iat");
  if (typeof tuntutan.auth_time !== "number" || tuntutan.auth_time > sekarang + kelonggaran) gagal("auth_time");
  return tuntutan;
}
