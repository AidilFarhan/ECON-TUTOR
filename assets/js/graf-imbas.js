/* =========================================================
   Econ Tutor · tekap graf daripada gambar (EKO.imbas)
   Gambar dipaparkan di belakang graf, pelajar menjajarkan paksi (penanda O dan T),
   kemudian menekap keluk dengan Lukis keluk, ATAU meminta AI mengesan keluk.

   - Gambar dikecilkan (≤ 1600 px) dan dikod semula ke JPEG (metadata EXIF/GPS terbuang),
     dipegang sebagai object URL, dan dibuang apabila widget dimusnahkan. Gambar tidak
     masuk ke dalam model GrafBina dan tidak disimpan. Tekap sendiri: gambar kekal dalam peranti.
   - Matematik penjajaran (IM.muatAwal, IM.padan) dan IM.dariAI ialah fungsi tulen: boleh diuji dalam Node.
   - IM.pengecam: pengecam automatik (AI). analisis() menghantar JPEG itu ke /api/kesan-graf
     (Claude API) dan hanya dipanggil selepas pelajar bersetuju dalam UI. Hasilnya ialah
     cadangan yang mesti disahkan oleh pelajar ([Sahkan] / [Sunting]).
   ========================================================= */
(function () {
  "use strict";

  var E = window.EKO;
  var IM = (E.imbas = {});

  var MAKS_PX = 1600;
  var MIN_PX = 120;

  /* ---------- matematik penjajaran (ruang ternormal kotak paksi, y ke atas) ---------- */
  // Kedudukan awal gambar: muat di dalam kotak paksi, nisbah aspek gambar dikekalkan.
  // aspekKotak = lebar kotak paksi (px) / tinggi kotak paksi (px).
  IM.muatAwal = function (w, h, aspekKotak) {
    var a = w / h;
    var r;
    if (a >= aspekKotak) {
      var tinggi = aspekKotak / a;
      r = { x: 0, y: (1 - tinggi) / 2, w: 1, h: tinggi };
    } else {
      var lebar = a / aspekKotak;
      r = { x: (1 - lebar) / 2, y: 0, w: lebar, h: 1 };
    }
    return r;
  };

  // Penanda awal: 8% ke dalam dari bucu kiri bawah (O) dan kanan atas (T) gambar
  IM.penandaAwal = function (r) {
    return {
      O: [r.x + r.w * 0.08, r.y + r.h * 0.08],
      T: [r.x + r.w * 0.92, r.y + r.h * 0.92]
    };
  };

  // Regang gambar supaya penanda O → asalan (0, 0) dan T → hujung paksi (1, 1).
  // Pulang segi empat baharu, atau null jika penanda terlalu rapat / terbalik.
  IM.padan = function (r, O, T) {
    var uo = (O[0] - r.x) / r.w,
      vo = (O[1] - r.y) / r.h,
      ut = (T[0] - r.x) / r.w,
      vt = (T[1] - r.y) / r.h;
    if (ut - uo < 0.05 || vt - vo < 0.05) return null;
    var w = 1 / (ut - uo),
      h = 1 / (vt - vo);
    return { x: -uo * w, y: -vo * h, w: w, h: h };
  };

  // Titik gambar (pecahan u, v) → ruang ternormal, untuk meletakkan penanda semula selepas penjajaran
  IM.keNormal = function (r, u, v) {
    return [r.x + u * r.w, r.y + v * r.h];
  };

  /* ---------- memuat gambar (DOM, dalam peranti sahaja) ---------- */
  var MESEJ_GAGAL = "Gambar tidak dapat dibuka. Sila ambil gambar atau muat naik gambar graf yang lebih jelas.";

  // selesai(ralat, { url, w, h }). Pemanggil mesti URL.revokeObjectURL(url) apabila selesai.
  IM.muat = function (fail, selesai) {
    if (!fail || (fail.type && !/^image\//.test(fail.type))) {
      selesai("Fail ini bukan gambar. Sila ambil gambar atau pilih gambar graf.");
      return;
    }
    var url;
    try {
      url = URL.createObjectURL(fail);
    } catch (e) {
      selesai(MESEJ_GAGAL);
      return;
    }
    var img = new Image();
    img.onload = function () {
      var w = img.naturalWidth,
        h = img.naturalHeight;
      if (w < MIN_PX || h < MIN_PX) {
        URL.revokeObjectURL(url);
        selesai("Gambar terlalu kecil. Sila ambil gambar graf yang lebih jelas.");
        return;
      }
      var k = Math.min(1, MAKS_PX / Math.max(w, h));
      var c = document.createElement("canvas");
      c.width = Math.round(w * k);
      c.height = Math.round(h * k);
      try {
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      } catch (e) {
        URL.revokeObjectURL(url);
        selesai(MESEJ_GAGAL);
        return;
      }
      URL.revokeObjectURL(url);
      if (!c.toBlob) {
        selesai(null, { url: c.toDataURL("image/jpeg", 0.85), w: c.width, h: c.height, dataUrl: true });
        return;
      }
      c.toBlob(
        function (blob) {
          if (!blob) {
            selesai(MESEJ_GAGAL);
            return;
          }
          selesai(null, { url: URL.createObjectURL(blob), w: c.width, h: c.height });
        },
        "image/jpeg",
        0.85
      );
    };
    img.onerror = function () {
      URL.revokeObjectURL(url);
      selesai(MESEJ_GAGAL);
    };
    img.src = url;
  };

  /* ---------- pengecam automatik (AI, /api/kesan-graf) ---------- */
  // Keluk daripada AI (pecahan gambar: u dari kiri, v dari bawah) → titik ternormal dalam kotak paksi,
  // melalui segi empat gambar yang telah dijajarkan. Fungsi tulen. Keluk di luar kotak paksi dibuang.
  IM.dariAI = function (r, senarai) {
    var keluar = [];
    (senarai || []).forEach(function (k) {
      var pts = [];
      (k.titik || []).forEach(function (p) {
        var q = IM.keNormal(r, p[0], p[1]);
        var x = Math.min(0.95, Math.max(0, q[0])),
          y = Math.min(0.95, Math.max(0, q[1]));
        var akhir = pts[pts.length - 1];
        if (!akhir || Math.abs(akhir[0] - x) + Math.abs(akhir[1] - y) > 0.01) pts.push([x, y]);
      });
      if (pts.length < 2) return;
      // susun kiri → kanan (bawah → atas jika hampir tegak), seperti keluk yang dilukis
      var dx = pts[pts.length - 1][0] - pts[0][0],
        dy = pts[pts.length - 1][1] - pts[0][1];
      if (Math.abs(dx) > 0.02 ? dx < 0 : dy < 0) pts.reverse();
      keluar.push({ label: k.label || "", jenis: k.jenis || null, titik: pts });
    });
    return keluar;
  };

  IM.MESEJ_AI = {
    tiada: "Graf tidak dapat dikesan. Pastikan paksi dan keluk jelas dalam gambar, kemudian cuba lagi atau tekap sendiri.",
    had: "Had imbasan AI untuk hari ini sudah habis. Cuba lagi esok, atau tekap keluk sendiri.",
    sesi: "Sesi log masuk sudah tamat. Muat semula halaman, kemudian cuba lagi.",
    tutup: "Imbasan AI tidak tersedia buat masa ini. Anda masih boleh menekap keluk sendiri.",
    gagal: "Imbasan AI tidak berjaya. Sila cuba lagi, atau tekap keluk sendiri."
  };

  // Gambar dihantar ke pelayan HANYA apabila analisis() dipanggil (selepas pelajar bersetuju).
  // hasil = { url } daripada IM.muat. selesai(mesejRalat) atau selesai(null, { keluk, paksi, baki }).
  IM.pengecam = {
    analisis: function (hasil, selesai) {
      var M = IM.MESEJ_AI;
      if (!window.fetch || location.protocol === "file:") {
        selesai(M.tutup);
        return;
      }
      fetch(hasil.url)
        .then(function (r) {
          return r.blob();
        })
        .then(function (blob) {
          return fetch("/api/kesan-graf", { method: "POST", credentials: "same-origin", headers: { "content-type": "image/jpeg" }, body: blob });
        })
        .then(function (res) {
          if (res.status === 429) return selesai(M.had, { baki: 0 });
          if (res.status === 401) return selesai(M.sesi);
          if (res.status === 404 || res.status === 503) return selesai(M.tutup);
          if (!res.ok) return selesai(M.gagal);
          return res.json().then(function (d) {
            if (!d.keluk || !d.keluk.length) selesai(M.tiada, { baki: d.baki });
            else selesai(null, d);
          });
        })
        .catch(function () {
          selesai(M.gagal);
        });
    }
  };

  IM.buang = function (hasil) {
    if (hasil && hasil.url && !hasil.dataUrl) {
      try {
        URL.revokeObjectURL(hasil.url);
      } catch (e) {}
    }
  };
})();
