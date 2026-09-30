/* =========================================================
   Econ Tutor · tekap graf daripada gambar (EKO.imbas)
   Tanpa AI: gambar dipaparkan di belakang graf, pelajar menjajarkan paksi
   (penanda O dan T), kemudian menekap keluk dengan Lukis keluk.

   - Gambar hanya dalam peranti: dikecilkan (≤ 1600 px) dan dikod semula ke JPEG
     (metadata EXIF/GPS terbuang), dipegang sebagai object URL, dan dibuang apabila
     widget dimusnahkan. Gambar tidak masuk ke dalam model GrafBina dan tidak disimpan.
   - Matematik penjajaran (IM.muatAwal, IM.padan) ialah fungsi tulen: boleh diuji dalam Node.
   - IM.pengecam: titik sambungan untuk pengecam automatik (AI) kelak, contohnya
     { analisis: function (fail, selesai) { … selesai(null, grafDikesan); } }.
     Kosong sekarang; UI tidak bergantung padanya.
   ========================================================= */
(function () {
  "use strict";

  var E = window.EKO;
  var IM = (E.imbas = {});

  var MAKS_PX = 1600;
  var MIN_PX = 120;

  IM.pengecam = null;

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

  IM.buang = function (hasil) {
    if (hasil && hasil.url && !hasil.dataUrl) {
      try {
        URL.revokeObjectURL(hasil.url);
      } catch (e) {}
    }
  };
})();
