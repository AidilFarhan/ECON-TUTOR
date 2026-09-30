/* =========================================================
   Econ Tutor · keseimbangan pasaran (EKO.keseimbangan)
   Pengiraan sahaja, tanpa DOM dan tanpa lukisan: boleh diuji dalam Node.

   - Pasangan D/S dicari melalui jenis keluk ("permintaan", "penawaran"), bukan label.
   - Keluk konsep/lukisan: persilangan geometri dua laluan.
   - Dua keluk persamaan pada paksi bernombor: diperhalusi secara matematik (Newton pada
     F_D = 0, F_S = 0 dengan anjakan), jadi Qd = 100 − 2P, Qs = 20 + 3P memberi tepat P = 16, Q = 68.
   - Hasil (arahP, arahQ, kes) juga digunakan oleh penerangan dan (kelak) Semak Jawapan.
   ========================================================= */
(function () {
  "use strict";

  var E = window.EKO;
  var B = E.bina;
  var PS = E.persamaan;
  var KS = (E.keseimbangan = {});

  var TOL = 0.002; // perubahan ternormal yang dikira "berubah"

  // Semua titik persilangan dua laluan (ruang ternormal)
  KS.silangLaluan = function (a, b) {
    var out = [];
    for (var i = 1; i < a.length; i++) {
      var p = a[i - 1],
        r = [a[i][0] - p[0], a[i][1] - p[1]];
      for (var j = 1; j < b.length; j++) {
        var q = b[j - 1],
          s = [b[j][0] - q[0], b[j][1] - q[1]];
        var d = r[0] * s[1] - r[1] * s[0];
        if (Math.abs(d) < 1e-12) continue;
        var t = ((q[0] - p[0]) * s[1] - (q[1] - p[1]) * s[0]) / d,
          u = ((q[0] - p[0]) * r[1] - (q[1] - p[1]) * r[0]) / d;
        if (t >= -1e-9 && t <= 1 + 1e-9 && u >= -1e-9 && u <= 1 + 1e-9) {
          var x = p[0] + t * r[0],
            y = p[1] + t * r[1];
          var ada = out.some(function (o) {
            return Math.abs(o[0] - x) < 1e-6 && Math.abs(o[1] - y) < 1e-6;
          });
          if (!ada) out.push([x, y]);
        }
      }
    }
    return out;
  };

  // Keluk permintaan dan penawaran bagi graf. Keluk dipilih diutamakan jika ia salah satunya.
  KS.pasangan = function (graf, pilih) {
    var d = null,
      s = null;
    var k = pilih ? B.cari(graf, pilih) : null;
    if (k && k.jenis === "permintaan") d = k;
    if (k && k.jenis === "penawaran") s = k;
    graf.keluk.forEach(function (x) {
      if (!d && x.jenis === "permintaan") d = x;
      if (!s && x.jenis === "penawaran") s = x;
    });
    return d && s ? { d: d, s: s } : null;
  };

  function paksiNombor(graf) {
    return graf.paksi.x.maks > 0 && graf.paksi.y.maks > 0;
  }

  // Perhalusi persilangan dua keluk persamaan dalam unit dunia (Newton 2D, beza terhingga)
  function halus(graf, kD, kS, awalW, asal) {
    var Mx = graf.paksi.x.maks,
      My = graf.paksi.y.maks;
    function sisa(k, x, y) {
      var ax = asal ? 0 : k.anjak.x * Mx,
        ay = asal ? 0 : k.anjak.y * My;
      return PS.sisa(k.persamaan, x - ax, y - ay);
    }
    var x = awalW[0],
      y = awalW[1];
    var h = 1e-6 * Math.max(Mx, My);
    for (var i = 0; i < 30; i++) {
      var f1 = sisa(kD, x, y),
        f2 = sisa(kS, x, y);
      if (!isFinite(f1) || !isFinite(f2)) return null;
      if (Math.abs(f1) + Math.abs(f2) < 1e-10) break;
      var a = (sisa(kD, x + h, y) - f1) / h,
        b = (sisa(kD, x, y + h) - f1) / h,
        c = (sisa(kS, x + h, y) - f2) / h,
        d = (sisa(kS, x, y + h) - f2) / h;
      var det = a * d - b * c;
      if (!isFinite(det) || Math.abs(det) < 1e-14) return null;
      x -= (d * f1 - b * f2) / det;
      y -= (a * f2 - c * f1) / det;
    }
    if (Math.abs(sisa(kD, x, y)) + Math.abs(sisa(kS, x, y)) > 1e-6 * (1 + Math.abs(x) + Math.abs(y))) return null;
    // buang ralat titik terapung kecil (79.9999999 → 80)
    return [Math.round(x * 1e6) / 1e6, Math.round(y * 1e6) / 1e6];
  }

  function titikImbang(graf, kD, kS, asal) {
    var a = B.laluan(kD, !asal),
      b = B.laluan(kS, !asal);
    var semua = KS.silangLaluan(a, b);
    if (!semua.length) return null;
    // utamakan persilangan yang kelihatan dalam graf
    var dalam = semua.filter(function (p) {
      return p[0] >= -1e-9 && p[0] <= 1 + 1e-9 && p[1] >= -1e-9 && p[1] <= 1 + 1e-9;
    });
    var n = (dalam.length ? dalam : semua)[0];
    var hasil = { n: n, w: null, nampak: !!dalam.length, lebihSatu: semua.length > 1 };
    if (kD.persamaan && kS.persamaan && paksiNombor(graf)) {
      var w = halus(graf, kD, kS, [n[0] * graf.paksi.x.maks, n[1] * graf.paksi.y.maks], asal);
      if (w) {
        hasil.w = w;
        hasil.n = [w[0] / graf.paksi.x.maks, w[1] / graf.paksi.y.maks];
      }
    }
    return hasil;
  }

  function arahAlih(k) {
    var a = B.arahAnjak(k.anjak);
    return a.indexOf("kanan") !== -1 ? "kanan" : a.indexOf("kiri") !== -1 ? "kiri" : null;
  }

  function tanda(v, tol) {
    return v > tol ? 1 : v < -tol ? -1 : 0;
  }

  // Pulang null (tiada pasangan D/S) atau
  // { d, s, E0, E1, berubah, alihD, alihS, kes, arahP, arahQ, bernilai, ralat? }
  KS.kira = function (graf, pilih) {
    var p = KS.pasangan(graf, pilih);
    if (!p) return null;
    var E0 = titikImbang(graf, p.d, p.s, true),
      E1 = titikImbang(graf, p.d, p.s, false);
    var alihD = arahAlih(p.d),
      alihS = arahAlih(p.s);
    var hasil = {
      d: p.d.id,
      s: p.s.id,
      E0: E0,
      E1: E1,
      berubah: B.dianjak(p.d) || B.dianjak(p.s),
      alihD: alihD,
      alihS: alihS,
      kes: alihD && alihS ? "DS" : alihD ? "D" + (alihD === "kanan" ? "+" : "-") : alihS ? "S" + (alihS === "kanan" ? "+" : "-") : null,
      bernilai: !!(E0 && E0.w && E1 && E1.w),
      arahP: 0,
      arahQ: 0
    };
    if (!E1) {
      hasil.ralat = "tiada-silang";
      return hasil;
    }
    if (E0) {
      if (hasil.bernilai) {
        var tol = 1e-9 * (graf.paksi.x.maks + graf.paksi.y.maks);
        hasil.arahP = tanda(E1.w[1] - E0.w[1], tol);
        hasil.arahQ = tanda(E1.w[0] - E0.w[0], tol);
      } else {
        hasil.arahP = tanda(E1.n[1] - E0.n[1], TOL);
        hasil.arahQ = tanda(E1.n[0] - E0.n[0], TOL);
      }
    }
    return hasil;
  };

  // Arah jangkaan bagi setiap kes asas (buku teks)
  KS.JANGKA = {
    "D+": { p: 1, q: 1 },
    "D-": { p: -1, q: -1 },
    "S+": { p: -1, q: 1 },
    "S-": { p: 1, q: -1 }
  };
})();
