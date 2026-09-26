/* =========================================================
   Econ Tutor · halaman log masuk (Firebase Authentication)
   1. Pelajar log masuk dengan Google atau email + kata laluan.
   2. Token ID Firebase dihantar ke /api/sesi. Pelayan menyemak
      token, pengesahan email dan senarai akses, kemudian
      menetapkan kuki sesi.
   3. Pelajar dibawa ke kandungan.
   ========================================================= */
import {
  initializeApp,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut,
  reload
} from "./vendor/firebase-auth-12.19.0.js";
import konfigurasi from "./firebase-config.js";

const $ = (id) => document.getElementById(id);
const param = new URLSearchParams(location.search);
const PANEL = ["panel-muat", "panel-utama", "panel-sah", "panel-tiada-akses"];

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

let mod = "masuk";
let sedangProses = false;
let auth = null;

/* ---------- paparan ---------- */
function tunjuk(id, teksMuat) {
  PANEL.forEach((p) => ($(p).hidden = p !== id));
  if (teksMuat) $("teks-muat").textContent = teksMuat;
  const tajuk = { "panel-sah": "Sahkan email", "panel-tiada-akses": "Tiada akses" }[id];
  $("tajuk-masuk").textContent = tajuk || (mod === "daftar" ? "Daftar akaun" : "Log masuk");
  $("sub-masuk").hidden = !!tajuk;
}

function mesej(teks, jenis) {
  const m = $("mesej");
  m.textContent = teks || "";
  m.className = "masuk-mesej" + (jenis ? " " + jenis : "");
}

function sibuk(ya) {
  document.querySelectorAll("#panel-utama button, #panel-utama input, #panel-sah button, #panel-tiada-akses button").forEach((el) => {
    el.disabled = ya;
  });
}

function tetapkanMod(baru) {
  mod = baru;
  document.querySelectorAll(".masuk-tab button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.mod === baru)));
  const daftar = baru === "daftar";
  $("btn-hantar").textContent = daftar ? "Daftar akaun" : "Log masuk";
  $("input-kata").setAttribute("autocomplete", daftar ? "new-password" : "current-password");
  $("bantuan-kata").hidden = !daftar;
  $("btn-lupa").hidden = daftar;
  $("tajuk-masuk").textContent = daftar ? "Daftar akaun" : "Log masuk";
  mesej("");
}

const RALAT = {
  "auth/invalid-email": "Format email tidak sah.",
  "auth/missing-email": "Masukkan email anda.",
  "auth/missing-password": "Masukkan kata laluan.",
  "auth/weak-password": "Kata laluan mesti sekurang-kurangnya 6 aksara.",
  "auth/email-already-in-use": "Email ini sudah didaftarkan. Pilih Log masuk.",
  "auth/invalid-credential": "Email atau kata laluan salah.",
  "auth/invalid-login-credentials": "Email atau kata laluan salah.",
  "auth/wrong-password": "Email atau kata laluan salah.",
  "auth/user-not-found": "Email atau kata laluan salah.",
  "auth/user-disabled": "Akaun ini telah dinyahaktifkan.",
  "auth/too-many-requests": "Terlalu banyak cubaan. Tunggu sebentar dan cuba lagi.",
  "auth/network-request-failed": "Tiada sambungan internet. Semak rangkaian dan cuba lagi.",
  "auth/popup-blocked": "Tetingkap Google disekat. Benarkan pop-up untuk laman ini dan cuba lagi.",
  "auth/unauthorized-domain": "Domain laman ini belum dibenarkan dalam Firebase (Authorized domains).",
  "auth/operation-not-allowed": "Kaedah log masuk ini belum diaktifkan dalam Firebase.",
  "auth/account-exists-with-different-credential": "Email ini sudah berdaftar dengan kaedah lain. Cuba log masuk dengan email dan kata laluan.",
  "auth/internal-error": "Ralat dalaman. Cuba lagi sebentar."
};
const SENYAP = ["auth/popup-closed-by-user", "auth/cancelled-popup-request", "auth/user-cancelled"];

function ralat(e) {
  const kod = (e && e.code) || "";
  if (SENYAP.indexOf(kod) > -1) return mesej("");
  mesej(RALAT[kod] || "Log masuk gagal" + (kod ? " (" + kod.replace("auth/", "") + ")" : "") + ". Cuba lagi.", "ralat");
}

/* ---------- aliran utama ---------- */
function perluSah(pengguna) {
  const pembekal = pengguna.providerData.map((p) => p.providerId);
  return !pengguna.emailVerified && pembekal.indexOf("google.com") === -1;
}

async function teruskan(pengguna) {
  if (sedangProses) return;
  sedangProses = true;
  mesej("");
  tunjuk("panel-muat", "Menyemak akses…");
  try {
    if (perluSah(pengguna)) return papar("panel-sah", pengguna.email);
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
    if (data.ralat === "tiada_akses") return papar("panel-tiada-akses", data.email || pengguna.email);
    if (data.ralat === "belum_sah") return papar("panel-sah", pengguna.email);
    tunjuk("panel-utama");
    if (res.status === 404) mesej("Pelayan log masuk tidak ditemui. Laman ini perlu dibuka melalui Vercel.", "ralat");
    else if (data.ralat === "konfigurasi") mesej("Pelayan belum disediakan sepenuhnya (RAHSIA_SESI). Maklumkan kepada cikgu.", "ralat");
    else mesej("Tidak dapat mengesahkan log masuk. Cuba lagi sebentar.", "ralat");
  } catch (e) {
    tunjuk("panel-utama");
    ralat(e);
  } finally {
    sedangProses = false;
  }
}

function papar(panel, email) {
  $(panel === "panel-sah" ? "email-sah" : "email-tiada-akses").textContent = email || "";
  tunjuk(panel);
}

async function tukarAkaun() {
  sibuk(true);
  try {
    await signOut(auth);
  } catch (e) {}
  sibuk(false);
  mesej("");
  tunjuk("panel-utama");
}

function tetapanPautan() {
  return { url: location.origin + "/masuk.html" };
}

async function hantarPengesahan(pengguna) {
  try {
    await sendEmailVerification(pengguna, tetapanPautan());
  } catch (e) {
    // domain pautan belum dibenarkan: hantar tanpa pautan kembali
    if (e && e.code === "auth/unauthorized-continue-uri") await sendEmailVerification(pengguna);
    else throw e;
  }
}

/* ---------- mula ---------- */
async function mula() {
  if (/FBAN|FBAV|Instagram|Line\/|TikTok|musical_ly|; wv\)/i.test(navigator.userAgent)) $("nota-apl").hidden = false;

  if (!konfigurasi || !konfigurasi.apiKey || !konfigurasi.projectId) {
    tunjuk("panel-utama");
    sibuk(true);
    mesej("Log masuk belum disediakan. Cikgu perlu memasukkan tetapan Firebase dalam assets/js/firebase-config.js.", "ralat");
    return;
  }

  auth = getAuth(initializeApp(konfigurasi));
  auth.languageCode = "ms";

  // ?keluar=1: log keluar daripada Firebase juga (kuki sesi sudah dipadam oleh butang akaun)
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

  document.querySelectorAll(".masuk-tab button").forEach((b) => b.addEventListener("click", () => tetapkanMod(b.dataset.mod)));

  $("btn-lihat").addEventListener("click", () => {
    const k = $("input-kata");
    const tunjukKata = k.type === "password";
    k.type = tunjukKata ? "text" : "password";
    $("btn-lihat").textContent = tunjukKata ? "Sorok" : "Tunjuk";
    $("btn-lihat").setAttribute("aria-pressed", String(tunjukKata));
  });

  $("btn-google").addEventListener("click", async () => {
    mesej("");
    sibuk(true);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (e) {
      ralat(e);
    }
    sibuk(false);
  });

  $("borang-email").addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const email = $("input-email").value.trim();
    const kata = $("input-kata").value;
    if (!email) return mesej("Masukkan email anda.", "ralat");
    if (kata.length < 6) return mesej(mod === "daftar" ? "Kata laluan mesti sekurang-kurangnya 6 aksara." : "Masukkan kata laluan.", "ralat");
    mesej("");
    sibuk(true);
    try {
      if (mod === "daftar") {
        sedangProses = true; // tunggu email pengesahan dihantar sebelum menukar panel
        const hasil = await createUserWithEmailAndPassword(auth, email, kata);
        await hantarPengesahan(hasil.user);
        sedangProses = false;
        papar("panel-sah", hasil.user.email);
        mesej("Email pengesahan telah dihantar.", "baik");
      } else {
        await signInWithEmailAndPassword(auth, email, kata);
      }
    } catch (e) {
      sedangProses = false;
      if (auth.currentUser && mod === "daftar") papar("panel-sah", auth.currentUser.email);
      ralat(e);
    }
    sibuk(false);
  });

  $("btn-lupa").addEventListener("click", async () => {
    const email = $("input-email").value.trim();
    if (!email) {
      $("input-email").focus();
      return mesej("Masukkan email anda dulu, kemudian tekan Lupa kata laluan.", "ralat");
    }
    sibuk(true);
    try {
      await sendPasswordResetEmail(auth, email, tetapanPautan());
      mesej("Jika email ini berdaftar, pautan untuk menetapkan semula kata laluan telah dihantar.", "baik");
    } catch (e) {
      if (e && e.code === "auth/user-not-found") mesej("Jika email ini berdaftar, pautan untuk menetapkan semula kata laluan telah dihantar.", "baik");
      else ralat(e);
    }
    sibuk(false);
  });

  $("btn-dah-sah").addEventListener("click", async () => {
    const p = auth.currentUser;
    if (!p) return tunjuk("panel-utama");
    sibuk(true);
    try {
      await reload(p);
    } catch (e) {}
    sibuk(false);
    if (perluSah(auth.currentUser)) return mesej("Email belum disahkan lagi. Klik pautan dalam email dahulu.", "ralat");
    teruskan(auth.currentUser);
  });

  $("btn-hantar-semula").addEventListener("click", async () => {
    if (!auth.currentUser) return tunjuk("panel-utama");
    sibuk(true);
    try {
      await hantarPengesahan(auth.currentUser);
      mesej("Email pengesahan dihantar semula.", "baik");
    } catch (e) {
      ralat(e);
    }
    sibuk(false);
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
