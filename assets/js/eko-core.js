/* =========================================================
   Econ Tutor · teras
   Ruang nama EKO: pendaftaran bab, storan kemajuan, utiliti.
   ========================================================= */
window.EKO = (function () {
  "use strict";

  var E = {};

  /* ---------- pendaftaran kandungan ---------- */
  E.bab = [];
  E.babIkut = {};
  E.setKuiz = [];

  E.daftarBab = function (b) {
    if (!b || !b.id) return;
    b.kad = b.kad || [];
    b.kuiz = b.kuiz || [];
    b.seksyen = b.seksyen || [];
    E.babIkut[b.id] = b;
    E.bab.push(b);
    E.bab.sort(function (x, y) {
      return x.tingkatan - y.tingkatan || x.no - y.no;
    });
  };

  // Set kuiz tambahan (contoh: kertas percubaan) dan soalan yang
  // dipetakan ke bab tertentu.
  E.daftarSet = function (s) {
    E.setKuiz.push(s);
  };

  E.babTingkatan = function (t) {
    return E.bab.filter(function (b) {
      return b.tingkatan === t;
    });
  };

  // Semua soalan untuk sesuatu bab: soalan asal + soalan percubaan yang ditag.
  E.soalanBab = function (idBab) {
    var b = E.babIkut[idBab];
    var senarai = b ? b.kuiz.map(function (q, i) {
      return Object.assign({ id: idBab + "-q" + (i + 1) }, q);
    }) : [];
    E.setKuiz.forEach(function (s) {
      (s.soalan || []).forEach(function (q, i) {
        if (q.bab === idBab) senarai.push(Object.assign({ id: s.id + "-" + (i + 1), src: s.labelPendek + " · S" + (i + 1) }, q));
      });
    });
    return senarai;
  };

  E.kadBab = function (idBab) {
    var b = E.babIkut[idBab];
    return b ? b.kad.map(function (k, i) {
      return Object.assign({ id: idBab + "-k" + (i + 1), bab: idBab }, k);
    }) : [];
  };

  /* ---------- storan (localStorage selamat) ---------- */
  var KUNCI = "econtutor:v1";
  var memori = null;

  function asas() {
    return { tema: "sistem", dibaca: {}, kad: {}, kuiz: {}, k2: {}, akhir: null };
  }

  E.data = function () {
    if (memori) return memori;
    memori = asas();
    try {
      var raw = window.localStorage.getItem(KUNCI);
      if (raw) {
        var d = JSON.parse(raw);
        if (d && typeof d === "object") memori = Object.assign(asas(), d);
      }
    } catch (e) {
      /* storan tidak tersedia: guna memori sahaja */
    }
    return memori;
  };

  E.kemas = function (fn) {
    var d = E.data();
    try {
      fn(d);
    } catch (e) {
      console.error(e);
    }
    try {
      window.localStorage.setItem(KUNCI, JSON.stringify(d));
    } catch (e) {
      /* abaikan */
    }
    return d;
  };

  E.setSemula = function () {
    memori = asas();
    try {
      window.localStorage.removeItem(KUNCI);
    } catch (e) {}
  };

  /* ---------- utiliti ---------- */
  E.clamp = function (v, a, b) {
    return Math.max(a, Math.min(b, v));
  };

  E.lerp = function (a, b, t) {
    return a + (b - a) * t;
  };

  E.bundar = function (v, dp) {
    var f = Math.pow(10, dp == null ? 2 : dp);
    return Math.round(v * f) / f;
  };

  // Format nombor gaya buku teks: ruang sebagai pemisah ribu, titik perpuluhan.
  E.fmt = function (v, dp, paksa) {
    if (v == null || isNaN(v)) return "–";
    var d = dp == null ? 2 : dp;
    var n = E.bundar(v, d);
    var neg = n < 0;
    n = Math.abs(n);
    var s = paksa ? n.toFixed(d) : String(n);
    if (!paksa && s.indexOf("e") !== -1) s = n.toFixed(d);
    var bah = s.split(".");
    var ribu = bah[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return (neg ? "−" : "") + ribu + (bah[1] ? "." + bah[1] : "");
  };

  E.rm = function (v, dp, paksa) {
    if (v == null || isNaN(v)) return "–";
    var neg = v < 0;
    return (neg ? "−" : "") + "RM" + E.fmt(Math.abs(v), dp == null ? 2 : dp, paksa);
  };

  E.peratus = function (v, dp) {
    return E.fmt(v, dp == null ? 1 : dp) + "%";
  };

  E.esc = function (s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  };

  E.kocok = function (arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  };

  E.kurangGerak = function () {
    try {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch (e) {
      return false;
    }
  };

  var toastTimer = null;
  E.toast = function (teks) {
    var el = document.getElementById("toast");
    if (!el) return;
    el.textContent = teks;
    el.classList.add("tunjuk");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      el.classList.remove("tunjuk");
    }, 2200);
  };

  /* ---------- ikon ---------- */
  var IKON = {
    rumah: '<path d="M4 11.2 12 4.5l8 6.7"/><path d="M6.5 9.8V19.5h11V9.8"/><path d="M10 19.5v-5h4v5"/>',
    buku: '<path d="M4.5 5.5A2.5 2.5 0 0 1 7 3h12.5v15.5H7a2.5 2.5 0 0 0-2.5 2.5z"/><path d="M4.5 21V5.5"/><path d="M8.5 7.5h7"/>',
    graf: '<path d="M4 3.5v16.5h16.5"/><path d="M7 16.5C9.5 9 13 7.3 19.5 6"/><path d="M7 7.5c4 1.2 7.5 4.4 12.5 10"/>',
    kad: '<rect x="3" y="7" width="13.5" height="13.5" rx="2.5"/><path d="M7.5 3.5H18A2.5 2.5 0 0 1 20.5 6v10.5"/>',
    kuiz: '<circle cx="12" cy="12" r="8.8"/><path d="m8.4 12.3 2.6 2.6 4.8-5.3"/>',
    kertas: '<path d="M7 3h7.5L19 7.5V21H7z"/><path d="M14.5 3v4.5H19"/><path d="M10 12.5h6M10 16.5h6"/>',
    matahari: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4"/>',
    bulan: '<path d="M20 14.6A8.2 8.2 0 1 1 9.4 4a6.6 6.6 0 0 0 10.6 10.6z"/>',
    sistem: '<rect x="3" y="4.5" width="18" height="12" rx="2"/><path d="M8.5 20h7M12 16.5V20"/>',
    kanan: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    kiri: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    kocok: '<path d="M3.5 7H7c5.2 0 4.8 10 10 10h3.5"/><path d="M3.5 17H7c1.6 0 2.7-1 3.6-2.4M13.4 9.4C14.3 8 15.4 7 17 7h3.5"/><path d="m18 4 3 3-3 3M18 14l3 3-3 3"/>',
    ulang: '<path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3"/><path d="M4.5 4.5v4h4"/>',
    cari: '<circle cx="11" cy="11" r="6.8"/><path d="m20 20-4.2-4.2"/>',
    betul: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    salah: '<path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>',
    senarai: '<path d="M9 6.5h11M9 12h11M9 17.5h11M4.5 6.5h.01M4.5 12h.01M4.5 17.5h.01"/>',
    tangan: '<path d="M8.2 13.2V6.6a1.5 1.5 0 0 1 3 0V12"/><path d="M11.2 11V5.2a1.5 1.5 0 0 1 3 0V11"/><path d="M14.2 11.2V7a1.5 1.5 0 0 1 3 0v7.2a6.3 6.3 0 0 1-6.3 6.3h-.4a5.6 5.6 0 0 1-4.7-2.6l-2.3-3.6a1.5 1.5 0 0 1 2.5-1.7l2.2 3"/>',
    jam: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4.2l2.6 2.5M9.2 2.5h5.6"/>',
    mata: '<path d="M2.5 12S6 5.2 12 5.2 21.5 12 21.5 12 18 18.8 12 18.8 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
    bintang: '<path d="m12 3.6 2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z"/>',
    pensel: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13.5 6.5 4 4"/>',
    kotak: '<rect x="4" y="4" width="16" height="16" rx="3"/>'
  };

  E.ikon = function (nama, kelas) {
    return '<svg class="ikon' + (kelas ? " " + kelas : "") + '" viewBox="0 0 24 24" aria-hidden="true">' + (IKON[nama] || "") + "</svg>";
  };

  E.tandaJenama = function () {
    return (
      '<svg class="jenama-tanda" viewBox="0 0 32 32" aria-hidden="true">' +
      '<rect x="0.5" y="0.5" width="31" height="31" rx="10" fill="#102029" stroke="rgba(255,255,255,0.14)"/>' +
      '<path d="M8 8.8c3.2 7.3 8.4 11.3 16 14.2" stroke="#6fa8ef" stroke-width="2.7" fill="none" stroke-linecap="round"/>' +
      '<path d="M8 23c6.4-2 11.2-6.9 16-14.2" stroke="#f27f67" stroke-width="2.7" fill="none" stroke-linecap="round"/>' +
      '<circle cx="16.1" cy="16.3" r="2.7" fill="#ffffff"/>' +
      "</svg>"
    );
  };

  return E;
})();
