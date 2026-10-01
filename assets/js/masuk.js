/* =========================================================
   Econ Tutor · halaman log masuk (Firebase Authentication)
   Google mengendalikan log masuk dan pendaftaran akaun.
   Pelayan menyemak token, pengesahan email dan senarai akses
   sebelum menetapkan kuki sesi dan membuka kandungan.
   ========================================================= */
import {
  initializeApp, getAuth, GoogleAuthProvider, signInWithPopup,
  onAuthStateChanged, signOut
} from "./vendor/firebase-auth-12.19.0.js";
import konfigurasi from "./firebase-config.js";

const $ = (id) => document.getElementById(id);
const param = new URLSearchParams(location.search);
const PANEL = ["panel-muat", "panel-utama", "panel-tiada-akses"];

// Destinasi selepas log masuk: hanya laluan dalam laman ini.
const destinasi = (function () {
  try {
    const u = new URL(param.get("ke") || "/", location.origin);
    if (u.origin !== location.origin || /^\/masuk/.test(u.pathname)) return "/";
    return u.pathname + u.search + u.hash;
  } catch (e) {
    return "/";
  }
})();

// Email pelajar membantu cikgu menambah akaun dalam senarai akses.
const WHATSAPP_CIKGU = "601160757145";
const MESEJ_AKSES = "Saya nak akses Nota Ekonomi Interaktif";
function pautanWhatsApp(email) {
  const teks = MESEJ_AKSES + (email ? "\nEmail: " + email : "");
  return "https://wa.me/" + WHATSAPP_CIKGU + "?text=" + encodeURIComponent(teks);
}

let sedangProses = false;
let auth = null;

/* ---------- paparan ---------- */
function tunjuk(id, teksMuat) {
  PANEL.forEach((p) => ($(p).hidden = p !== id));
  if (teksMuat) $("teks-muat").textContent = teksMuat;
  $("tajuk-masuk").textContent = id === "panel-tiada-akses" ? "Tiada akses" : "Log masuk";
}

function mesej(teks, jenis) {
  const m = $("mesej");
  m.textContent = teks || "";
  m.className = "masuk-mesej" + (jenis ? " " + jenis : "");
}

function sibuk(ya) {
  document.querySelectorAll("#panel-utama button, #panel-tiada-akses button").forEach((el) => {
    el.disabled = ya;
  });
  $("btn-google").setAttribute("aria-busy", String(ya));
  $("btn-google").querySelector("span").textContent = ya ? "Membuka Google…" : "Teruskan dengan Google";
}

const RALAT = {
  "auth/user-disabled": "Akaun ini telah dinyahaktifkan.",
  "auth/too-many-requests": "Terlalu banyak cubaan. Tunggu sebentar dan cuba lagi.",
  "auth/network-request-failed": "Tiada sambungan internet. Semak rangkaian dan cuba lagi.",
  "auth/popup-blocked": "Tetingkap Google disekat. Benarkan pop-up untuk laman ini dan cuba lagi.",
  "auth/unauthorized-domain": "Log masuk Google belum tersedia pada alamat laman ini. Maklumkan kepada cikgu.",
  "auth/operation-not-allowed": "Log masuk Google belum diaktifkan. Maklumkan kepada cikgu.",
  "auth/account-exists-with-different-credential": "Email ini sudah berdaftar dengan kaedah lain. Hubungi cikgu untuk bantuan log masuk Google.",
  "auth/internal-error": "Ralat dalaman. Cuba lagi sebentar."
};
const SENYAP = ["auth/popup-closed-by-user", "auth/cancelled-popup-request", "auth/user-cancelled"];

function ralat(e) {
  const kod = (e && e.code) || "";
  if (SENYAP.indexOf(kod) > -1) return mesej("");
  mesej(RALAT[kod] || "Log masuk gagal" + (kod ? " (" + kod.replace("auth/", "") + ")" : "") + ". Cuba lagi.", "ralat");
}

/* ---------- aliran utama ---------- */
async function teruskan(pengguna) {
  if (sedangProses) return;
  sedangProses = true;
  mesej("");
  tunjuk("panel-muat", "Menyemak akses…");
  try {
    const idToken = await pengguna.getIdToken(true);
    const res = await fetch("/api/sesi", {
      method: "POST",
      headers: { "content-type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ idToken })
    });
    if (res.ok) {
      tunjuk("panel-muat", "Berjaya. Membuka Econ Tutor…");
      location.replace(destinasi);
      return;
    }
    const data = await res.json().catch(() => ({}));
    if (data.ralat === "tiada_akses") {
      $("email-tiada-akses").textContent = data.email || pengguna.email || "";
      $("btn-hubungi").href = pautanWhatsApp(data.email || pengguna.email);
      tunjuk("panel-tiada-akses");
      return;
    }
    tunjuk("panel-utama");
    if (data.ralat === "belum_sah") mesej("Email akaun ini belum disahkan. Teruskan dengan Google untuk mengesahkan akaun anda.", "ralat");
    else if (res.status === 404) mesej("Pelayan log masuk tidak ditemui. Laman ini perlu dibuka melalui Vercel.", "ralat");
    else if (data.ralat === "konfigurasi") mesej("Pelayan belum disediakan sepenuhnya. Maklumkan kepada cikgu.", "ralat");
    else mesej("Tidak dapat mengesahkan log masuk. Cuba lagi sebentar.", "ralat");
  } catch (e) {
    tunjuk("panel-utama");
    ralat(e);
  } finally {
    sedangProses = false;
  }
}

async function tukarAkaun() {
  sibuk(true);
  try {
    await signOut(auth);
    mesej("");
    tunjuk("panel-utama");
  } catch (e) {
    ralat(e);
  } finally {
    sibuk(false);
  }
}

/* ---------- mula ---------- */
async function mula() {
  if (/FBAN|FBAV|Instagram|Line\/|TikTok|musical_ly|; wv\)/i.test(navigator.userAgent)) $("nota-apl").hidden = false;

  if (!konfigurasi || !konfigurasi.apiKey || !konfigurasi.projectId) {
    tunjuk("panel-utama");
    sibuk(true);
    $("btn-google").querySelector("span").textContent = "Teruskan dengan Google";
    $("btn-google").setAttribute("aria-busy", "false");
    mesej("Log masuk belum disediakan. Maklumkan kepada cikgu.", "ralat");
    return;
  }

  auth = getAuth(initializeApp(konfigurasi));
  auth.languageCode = "ms";

  // ?keluar=1: log keluar daripada Firebase juga.
  if (param.has("keluar")) {
    try {
      await signOut(auth);
      await fetch("/api/sesi", { method: "DELETE", credentials: "same-origin" });
    } catch (e) {}
    history.replaceState(null, "", location.pathname);
    mesej("Anda telah log keluar.", "baik");
  }

  onAuthStateChanged(auth, (pengguna) => {
    if (pengguna) teruskan(pengguna);
    else if (!sedangProses) tunjuk("panel-utama");
  });

  $("btn-google").addEventListener("click", async () => {
    mesej("");
    sibuk(true);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (e) {
      ralat(e);
    } finally {
      sibuk(false);
    }
  });

  $("btn-cuba-lagi").addEventListener("click", () => {
    if (auth.currentUser) teruskan(auth.currentUser);
    else tunjuk("panel-utama");
  });
  document.querySelectorAll("[data-tukar-akaun]").forEach((b) => b.addEventListener("click", tukarAkaun));
}

mula().catch((e) => {
  tunjuk("panel-utama");
  ralat(e);
});
