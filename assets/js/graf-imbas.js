/* =========================================================
   Econ Tutor · tekap graf daripada gambar (EKO.imbas)
   Gambar dipaparkan di belakang graf, pelajar menjajarkan paksi (penanda O dan T),
   kemudian menekap keluk dengan Lukis keluk, ATAU meminta AI mengesan paksi, nombor pada paksi dan keluk.

   - Gambar dikecilkan (≤ 1600 px) dan dikod semula ke JPEG (metadata EXIF/GPS terbuang),
     dipegang sebagai object URL, dan dibuang apabila widget dimusnahkan. Gambar tidak
     masuk ke dalam model GrafBina dan tidak disimpan. Tekap sendiri: gambar kekal dalam peranti.
   - Matematik penjajaran (IM.muatAwal, IM.padan) dan petaan hasil AI (IM.dariAI, IM.paksiAI, IM.maksPaksi) ialah fungsi tulen: boleh diuji dalam Node.
   - IM.pengecam: pengecam automatik (AI). analisis() menghantar JPEG itu ke /api/kesan-graf
     (pembekal AI luar) dan hanya dipanggil selepas pelajar bersetuju dalam UI. Hasilnya ialah
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

  // Paksi yang dikesan AI → penanda O dan T (ruang ternormal) untuk IM.padan; null jika paksi tidak dikesan.
  IM.paksiAI = function (r, paksi) {
    if (!paksi || !paksi.O || !paksi.hujungX || !paksi.hujungY) return null;
    var O = IM.keNormal(r, paksi.O[0], paksi.O[1]);
    var T = IM.keNormal(r, paksi.hujungX[0], paksi.hujungY[1]);
    return IM.padan(r, O, T) ? { O: O, T: T } : null;
  };

  // Nombor pada satu paksi ([[kedudukan ternormal, nilai]]) → { maks, tanda }.
  // Rajah buku teks selalunya tidak berskala (contoh 8, 13, 18 pada jarak yang tidak berkadar dengan 0), jadi
  // nombor itu tidak dipaksa menjadi satu skala lurus: tanda = [[kedudukan, nilai], …] disimpan seperti dalam gambar
  // dan nilai di antara dua tanda diinterpolasi (asalan = 0). maks = nilai di hujung paksi (ekstrapolasi tanda terakhir).
  function maksDari(pts) {
    pts = pts
      .filter(function (p) {
        return p[1] > 0 && isFinite(p[1]) && p[0] > 0.03 && p[0] <= 1.05;
      })
      .sort(function (a, b) {
        return a[0] - b[0];
      });
    // nilai mesti bertambah di sepanjang paksi; bacaan yang melanggar susunan dibuang
    var tanda = [];
    pts.forEach(function (p) {
      var akhir = tanda[tanda.length - 1] || [0, 0];
      if (p[0] - akhir[0] > 0.02 && p[1] > akhir[1]) tanda.push([Math.round(Math.min(1, p[0]) * 1e4) / 1e4, p[1]]);
    });
    if (!tanda.length) return null;
    var b = tanda[tanda.length - 1],
      a = tanda[tanda.length - 2] || [0, 0];
    var maks = b[1] + ((1 - b[0]) * (b[1] - a[1])) / (b[0] - a[0]);
    return { maks: +maks.toPrecision(4), tanda: tanda };
  }

  // Skala paksi daripada nombor yang dikesan AI: { x, y (nilai di hujung paksi), tandaX, tandaY } atau null
  // (kedua-dua paksi mesti ada sekurang-kurangnya satu nombor). r = segi empat gambar selepas dijajarkan.
  // Anggaran sahaja: bergantung pada kedudukan yang dikesan.
  IM.maksPaksi = function (r, paksi) {
    if (!paksi) return null;
    var mx = maksDari(
      (paksi.tandaX || []).map(function (t) {
        return [IM.keNormal(r, t[1], 0)[0], t[0]];
      })
    );
    var my = maksDari(
      (paksi.tandaY || []).map(function (t) {
        return [IM.keNormal(r, 0, t[1])[1], t[0]];
      })
    );
    return mx && my ? { x: mx.maks, y: my.maks, tandaX: mx.tanda, tandaY: my.tanda } : null;
  };

  // Label paksi seperti tertulis dalam gambar (P0, Q1, 8 …) → { x: [[kedudukan ternormal, teks]], y: […] }.
  // Dipaparkan pada paksi apabila graf tidak bernombor (contohnya paksi berlabel P0 dan Q0, atau hanya satu paksi bernombor).
  IM.namaPaksi = function (r, paksi) {
    function kemas(senarai, ke) {
      var keluar = [];
      (senarai || [])
        .map(function (t) {
          return [Math.round(ke(t[1]) * 1e4) / 1e4, String(t[0])];
        })
        .filter(function (t) {
          return t[0] > 0.03 && t[0] <= 1 && t[1];
        })
        .sort(function (a, b) {
          return a[0] - b[0];
        })
        .forEach(function (t) {
          var akhir = keluar[keluar.length - 1];
          if (!akhir || t[0] - akhir[0] > 0.03) keluar.push(t);
        });
      return keluar;
    }
    if (!paksi) return { x: [], y: [] };
    return {
      x: kemas(paksi.labelX, function (u) {
        return IM.keNormal(r, u, 0)[0];
      }),
      y: kemas(paksi.labelY, function (v) {
        return IM.keNormal(r, 0, v)[1];
      })
    };
  };

  // Nilai x pada ketinggian y (atau y pada x jika paksi = 1) di sepanjang poligaris; null jika di luar julat
  function pada(pts, v, paksi) {
    var a = paksi ? 0 : 1,
      b = paksi ? 1 : 0;
    for (var i = 1; i < pts.length; i++) {
      var p = pts[i - 1],
        q = pts[i];
      if ((p[a] - v) * (q[a] - v) <= 0 && p[a] !== q[a]) return p[b] + ((v - p[a]) / (q[a] - p[a])) * (q[b] - p[b]);
    }
    return null;
  }

  function julat(pts, a) {
    var lo = Infinity,
      hi = -Infinity;
    pts.forEach(function (p) {
      lo = Math.min(lo, p[a]);
      hi = Math.max(hi, p[a]);
    });
    return [lo, hi];
  }

  // "S₁" / "S1" / "D'" → { asas: "S", indeks: 1 }. Tanpa nombor: indeks −1 ("S" lebih awal daripada "S1").
  IM.pecahLabel = function (label) {
    var t = String(label || "").replace(/\s+/g, "").replace(/[₀-₉]/g, function (c) {
      return String("₀₁₂₃₄₅₆₇₈₉".indexOf(c));
    });
    var m = /^([A-Za-z]+)(\d*)(['′]*)$/.exec(t);
    if (!m) return null;
    return { asas: m[1].toUpperCase(), indeks: m[2] ? +m[2] : m[3] ? m[3].length - 0.5 : -1 };
  };

  // Keluk asal dan keluk selepas beralih dalam gambar (S0 dan S1, D dan D1) ialah SATU keluk yang beralih.
  // Senarai daripada IM.dariAI → senarai yang sama, tetapi setiap pasangan digabung menjadi satu keluk
  // dengan titik keluk asal dan alih = { x, y } (translasi) atau { skala } (KKP). Fungsi tulen.
  // Hanya pasangan yang jelas digabung: tepat dua keluk, jenis sama, huruf label sama, nombor berbeza.
  IM.gabungAlih = function (senarai) {
    var kumpulan = {};
    (senarai || []).forEach(function (k, i) {
      var l = IM.pecahLabel(k.label);
      if (!l) return;
      var kunci = (k.jenis || "") + "|" + l.asas;
      (kumpulan[kunci] = kumpulan[kunci] || []).push({ i: i, indeks: l.indeks, asas: l.asas });
    });
    var buang = {},
      alih = {};
    Object.keys(kumpulan).forEach(function (kunci) {
      var g = kumpulan[kunci];
      if (g.length !== 2 || g[0].indeks === g[1].indeks) return;
      g.sort(function (a, b) {
        return a.indeks - b.indeks;
      });
      var A = senarai[g[0].i],
        Bk = senarai[g[1].i];
      var h;
      if (A.jenis === "kkp") {
        var ax = julat(A.titik, 0)[1],
          ay = julat(A.titik, 1)[1],
          bx = julat(Bk.titik, 0)[1],
          by = julat(Bk.titik, 1)[1];
        if (!(ax > 0.05 && ay > 0.05)) return;
        h = { skala: (bx / ax + by / ay) / 2 };
      } else {
        // translasi mendatar pada ketinggian tengah yang dikongsi; keluk hampir mendatar: translasi tegak
        var ya = julat(A.titik, 1),
          yb = julat(Bk.titik, 1);
        var lo = Math.max(ya[0], yb[0]),
          hi = Math.min(ya[1], yb[1]);
        if (ya[1] - ya[0] >= 0.05 && hi - lo > 0.02) {
          var xa = pada(A.titik, (lo + hi) / 2, 0),
            xb = pada(Bk.titik, (lo + hi) / 2, 0);
          if (xa == null || xb == null) return;
          h = { x: xb - xa, y: 0 };
        } else {
          var xr = julat(A.titik, 0),
            xs = julat(Bk.titik, 0);
          var l2 = Math.max(xr[0], xs[0]),
            h2 = Math.min(xr[1], xs[1]);
          if (h2 - l2 <= 0.02) return;
          var y1 = pada(A.titik, (l2 + h2) / 2, 1),
            y2 = pada(Bk.titik, (l2 + h2) / 2, 1);
          if (y1 == null || y2 == null) return;
          h = { x: 0, y: y2 - y1 };
        }
        if (Math.abs(h.x) + Math.abs(h.y) < 0.02) return;
      }
      buang[g[1].i] = true;
      alih[g[0].i] = { alih: h, asas: g[0].asas };
    });
    var keluar = [];
    (senarai || []).forEach(function (k, i) {
      if (buang[i]) return;
      var a = alih[i];
      keluar.push({ label: a ? a.asas : k.label, jenis: k.jenis, titik: k.titik, alih: a ? a.alih : null });
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

  // Salinan gambar untuk AI: grid 10 × 10 bernombor (0..100) dilukis di atasnya, supaya model membaca
  // kedudukan daripada grid dan tidak meneka koordinat. Nombor grid diletakkan pada jidar putih di luar gambar.
  // Koordinat grid merujuk kawasan gambar asal sahaja. selesai(blob JPEG) atau selesai(null).
  IM.JIDAR_GRID = 0.06; // lebar jidar sebagai pecahan sisi gambar yang lebih panjang
  IM.denganGrid = function (url, selesai) {
    var img = new Image();
    img.onload = function () {
      var w = img.naturalWidth,
        h = img.naturalHeight;
      var m = Math.max(28, Math.round(Math.max(w, h) * IM.JIDAR_GRID));
      var c = document.createElement("canvas");
      c.width = w + 2 * m;
      c.height = h + 2 * m;
      try {
        var x = c.getContext("2d");
        x.fillStyle = "#fff";
        x.fillRect(0, 0, c.width, c.height);
        x.drawImage(img, m, m);
        x.strokeStyle = "rgba(230, 0, 180, 0.6)";
        x.lineWidth = Math.max(1, Math.round(Math.max(w, h) / 800));
        x.fillStyle = "#c4009a";
        x.font = "bold " + Math.round(m * 0.48) + "px sans-serif";
        x.textAlign = "center";
        x.textBaseline = "middle";
        for (var i = 0; i <= 10; i++) {
          var gx = m + (w * i) / 10,
            gy = m + (h * i) / 10;
          x.beginPath();
          x.moveTo(gx, m);
          x.lineTo(gx, m + h);
          x.moveTo(m, gy);
          x.lineTo(m + w, gy);
          x.stroke();
          x.fillText(String(i * 10), gx, m / 2);
          x.fillText(String(i * 10), gx, m + h + m / 2);
          x.fillText(String(i * 10), m / 2, gy);
          x.fillText(String(i * 10), m + w + m / 2, gy);
        }
        c.toBlob(selesai, "image/jpeg", 0.88);
      } catch (e) {
        selesai(null);
      }
    };
    img.onerror = function () {
      selesai(null);
    };
    img.src = url;
  };

  // Gambar dihantar ke pelayan HANYA apabila analisis() dipanggil (selepas pelajar bersetuju).
  // hasil = { url } daripada IM.muat. selesai(mesejRalat) atau selesai(null, { keluk, paksi, baki }) (bentuk: api/kesan-graf.js).
  IM.pengecam = {
    analisis: function (hasil, selesai) {
      var M = IM.MESEJ_AI;
      if (!window.fetch || location.protocol === "file:") {
        selesai(M.tutup);
        return;
      }
      new Promise(function (ok, tak) {
        IM.denganGrid(hasil.url, function (blob) {
          if (blob) ok(blob);
          else tak();
        });
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
