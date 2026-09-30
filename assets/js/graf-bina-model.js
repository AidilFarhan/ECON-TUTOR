/* =========================================================
   Econ Tutor · model graf bina (EKO.bina)
   Fungsi tulen tanpa DOM: boleh diuji dalam Node (vm).

   GrafBina {
     versi: 1,
     paksi: { x: { label }, y: { label } },
     keluk: Keluk[],
     titik: TitikKeluk[],       // satu titik per keluk untuk PERGERAKAN di sepanjang keluk
     peristiwa: Peristiwa[]     // "anjak" (peralihan keluk) atau "gerak" (pergerakan di sepanjang keluk)
   }
   Keluk {
     id, label, jenis: null, warna: "d" | "s" | "c3" | "c4" | "c5",
     titik: [[x, y], …],        // ruang ternormal 0..1 dalam kotak paksi, tertib sepanjang laluan
     anjak: { x, y },           // peralihan = translasi sahaja; titik[] tidak pernah diubah
     arahSeret: "x" | "y" | "xy" | "tiada",
     meta: { arah, sumber }
   }
   TitikKeluk { id, keluk, s, sAwal }   // s = pecahan panjang lengkok 0..1 (bukan nilai x)
   Peristiwa  { jenis: "anjak", keluk, dari: {x, y}, ke: {x, y} }
            | { jenis: "gerak", keluk, titik, dari: s, ke: s }
   ========================================================= */
(function () {
  "use strict";

  var E = window.EKO;
  var B = (E.bina = {});

  var WARNA = ["d", "s", "c3", "c4", "c5"];
  var MAKS_KELUK = 6;
  var BAHAGIAN = 16; // segmen licin antara dua titik kawalan
  var TEPI = 0.95; // hujung keluk tidak boleh melepasi 95% paksi (label mesti kelihatan)
  var NAMPAK_MIN = 0.1; // hujung jauh keluk kekal sekurang-kurangnya 10% dari paksi (boleh dialih hampir ke paksi)
  var S_MIN = 0.04;
  var S_MAKS = 0.96;

  B.WARNA = WARNA;
  B.MAKS_KELUK = MAKS_KELUK;

  // Bentuk keluk sedia ada (titik ternormal). Semua berakhir sebelum 0.72 supaya ada ruang untuk beralih.
  B.TEMPLAT = {
    menurun: { nama: "Menurun (garis lurus)", label: "D", warna: "d", titik: [[0.08, 0.84], [0.66, 0.14]] },
    "menurun-cembung": { nama: "Menurun (melengkung)", label: "D", warna: "d", titik: [[0.1, 0.86], [0.2, 0.58], [0.36, 0.38], [0.68, 0.16]] },
    menaik: { nama: "Menaik (garis lurus)", label: "S", warna: "s", titik: [[0.1, 0.14], [0.68, 0.84]] },
    "menaik-cembung": { nama: "Menaik (melengkung)", label: "S", warna: "s", titik: [[0.08, 0.18], [0.4, 0.28], [0.6, 0.48], [0.7, 0.84]] },
    mendatar: { nama: "Mendatar", label: "D", warna: "d", titik: [[0.03, 0.5], [0.8, 0.5]] },
    tegak: { nama: "Tegak", label: "S", warna: "s", titik: [[0.5, 0.03], [0.5, 0.82]] },
    // KKP cembung ke titik asalan (suku elips) dari paksi Y ke paksi X; jenis diketahui kerana dipilih sebagai KKP
    kkp: {
      nama: "KKP (keluk kemungkinan pengeluaran)",
      label: "KKP",
      warna: "c3",
      titik: [[0, 0.78], [0.276, 0.721], [0.509, 0.552], [0.665, 0.298], [0.72, 0]],
      jenis: "kkp",
      arahSeret: "skala",
      s: 0.45
    }
  };

  function klon(o) {
    return JSON.parse(JSON.stringify(o));
  }
  B.klon = klon;

  function bundar(v) {
    return Math.round(v * 1000) / 1000;
  }

  /* ---------- binaan ---------- */
  B.buatGraf = function (o) {
    o = o || {};
    return {
      versi: 1,
      paksi: {
        x: { label: (o.paksi && o.paksi.x && o.paksi.x.label) || "Kuantiti (unit)" },
        y: { label: (o.paksi && o.paksi.y && o.paksi.y.label) || "Harga (RM)" }
      },
      keluk: [],
      titik: [],
      peristiwa: []
    };
  };

  // Arah keseluruhan keluk daripada titik kawalan
  B.arahKeluk = function (pts) {
    if (!pts || pts.length < 2) return "lain";
    var a = pts[0],
      z = pts[pts.length - 1];
    var dx = z[0] - a[0],
      dy = z[1] - a[1];
    var panjang = Math.sqrt(dx * dx + dy * dy);
    if (panjang < 1e-6) return "lain";
    if (Math.abs(dx) / panjang < 0.05) return "tegak";
    if (Math.abs(dy) / panjang < 0.05) return "mendatar";
    // monoton? setiap langkah mesti searah dengan keseluruhan
    var tanda = dx * dy < 0 ? -1 : 1;
    for (var i = 1; i < pts.length; i++) {
      var ddx = pts[i][0] - pts[i - 1][0],
        ddy = pts[i][1] - pts[i - 1][1];
      if (Math.abs(ddx) > 1e-9 && Math.abs(ddy) > 1e-9 && (ddx * ddy < 0 ? -1 : 1) !== tanda) return "lain";
    }
    return tanda < 0 ? "menurun" : "menaik";
  };

  B.arahSeretLalai = function (arah) {
    return arah === "mendatar" ? "y" : "x";
  };

  B.buatKeluk = function (o) {
    var pts = o.titik.map(function (p) {
      return [bundar(p[0]), bundar(p[1])];
    });
    var arah = B.arahKeluk(pts);
    return {
      id: o.id,
      label: o.label || "K",
      jenis: o.jenis || null,
      warna: WARNA.indexOf(o.warna) !== -1 ? o.warna : "d",
      titik: pts,
      anjak: { x: 0, y: 0 },
      skala: 1, // peralihan KKP: kembang/kecut dari asalan (arahSeret "skala"); keluk lain kekal 1
      arahSeret: o.arahSeret || B.arahSeretLalai(arah),
      meta: { arah: arah, sumber: o.sumber || "contoh" },
      // hanya bagi keluk daripada persamaan (EKO.persamaan); keluk lain tidak perlu persamaan
      persamaan: o.persamaan ? klon(o.persamaan) : null
    };
  };

  function idBaharu(graf) {
    var n = 0;
    graf.keluk.forEach(function (k) {
      var m = /^k(\d+)$/.exec(k.id);
      if (m) n = Math.max(n, +m[1]);
    });
    return "k" + (n + 1);
  }

  function labelBebas(graf, label) {
    var ada = function (l) {
      return graf.keluk.some(function (k) {
        return k.label === l;
      });
    };
    // keluk generik (K) guna huruf seterusnya; elak huruf yang sudah bermakna (D, S, P, Q, E, A, B)
    if (label === "K") {
      var huruf = ["K", "L", "M", "N", "R", "T", "U", "V"];
      for (var i = 0; i < huruf.length; i++) if (!ada(huruf[i])) return huruf[i];
    }
    var l = label;
    while (ada(l) && l.length < 8) l += "′";
    return l;
  }

  B.labelBebas = function (graf, label) {
    return labelBebas(graf, label);
  };

  function warnaBebas(graf, cadangan) {
    var dipakai = graf.keluk.map(function (k) {
      return k.warna;
    });
    if (cadangan && dipakai.indexOf(cadangan) === -1) return cadangan;
    for (var i = 0; i < WARNA.length; i++) if (dipakai.indexOf(WARNA[i]) === -1) return WARNA[i];
    return cadangan || WARNA[graf.keluk.length % WARNA.length];
  }

  // Tambah keluk daripada templat atau spesifikasi { label, warna, titik, sumber }. Pulang graf baharu.
  B.tambahKeluk = function (graf, spek) {
    if (typeof spek === "string") spek = B.TEMPLAT[spek];
    if (!spek || !spek.titik || spek.titik.length < 2 || graf.keluk.length >= MAKS_KELUK) return graf;
    var g = klon(graf);
    var k = B.buatKeluk({
      id: idBaharu(g),
      label: labelBebas(g, spek.label || "K"),
      warna: warnaBebas(g, spek.warna),
      titik: spek.titik,
      sumber: spek.sumber,
      arahSeret: spek.arahSeret,
      jenis: spek.jenis,
      persamaan: spek.persamaan
    });
    g.keluk.push(k);
    var s0 = spek.s != null ? spek.s : 0.4;
    g.titik.push({ id: "t-" + k.id, keluk: k.id, s: s0, sAwal: s0 });
    return g;
  };

  B.buangKeluk = function (graf, id) {
    var g = klon(graf);
    g.keluk = g.keluk.filter(function (k) {
      return k.id !== id;
    });
    g.titik = g.titik.filter(function (t) {
      return t.keluk !== id;
    });
    return g;
  };

  B.cari = function (graf, id) {
    for (var i = 0; i < graf.keluk.length; i++) if (graf.keluk[i].id === id) return graf.keluk[i];
    return null;
  };

  B.titikKeluk = function (graf, id) {
    for (var i = 0; i < graf.titik.length; i++) if (graf.titik[i].keluk === id) return graf.titik[i];
    return null;
  };

  // Digit selepas huruf → subskrip: "D1" → "D₁"
  B.subskrip = function (teks) {
    var sub = "₀₁₂₃₄₅₆₇₈₉";
    return String(teks).replace(/([A-Za-z\u0080-￿])(\d+)/g, function (_, h, d) {
      return h + d.replace(/\d/g, function (c) {
        return sub.charAt(+c);
      });
    });
  };

  // Buang subskrip di hujung: "S₀" → "S"
  B.asasLabel = function (label) {
    return String(label).replace(/[₀-₉]+$/, "") || String(label);
  };

  B.namakan = function (graf, id, label) {
    var g = klon(graf);
    var k = B.cari(g, id);
    var l = B.subskrip(String(label || "").replace(/\s+/g, " ").trim()).slice(0, 8);
    if (k && l) k.label = l;
    return g;
  };

  B.labelPaksi = function (graf, paksi, label) {
    var g = klon(graf);
    if (g.paksi[paksi]) g.paksi[paksi].label = String(label || "").slice(0, 40);
    return g;
  };

  /* ---------- geometri ---------- */
  // Catmull-Rom sentripetal (alpha 0.5): licin tanpa gelung, melalui setiap titik kawalan,
  // dan sah untuk keluk tegak atau keluk yang bukan fungsi y = f(x).
  B.licin = function (pts, bahagian) {
    var n = pts.length;
    if (n < 3) return pts.map(function (p) {
      return [p[0], p[1]];
    });
    var k = bahagian || BAHAGIAN;
    var P = [[2 * pts[0][0] - pts[1][0], 2 * pts[0][1] - pts[1][1]]].concat(pts, [[2 * pts[n - 1][0] - pts[n - 2][0], 2 * pts[n - 1][1] - pts[n - 2][1]]]);
    function jarak(a, b) {
      var d = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
      return Math.max(Math.sqrt(d), 1e-6);
    }
    var out = [[pts[0][0], pts[0][1]]];
    for (var i = 1; i < P.length - 2; i++) {
      var p0 = P[i - 1],
        p1 = P[i],
        p2 = P[i + 1],
        p3 = P[i + 2];
      var t1 = jarak(p0, p1),
        t2 = t1 + jarak(p1, p2),
        t3 = t2 + jarak(p2, p3);
      for (var j = 1; j <= k; j++) {
        var t = t1 + ((t2 - t1) * j) / k;
        var pt = [];
        for (var d = 0; d < 2; d++) {
          var a1 = ((t1 - t) / t1) * p0[d] + (t / t1) * p1[d];
          var a2 = ((t2 - t) / (t2 - t1)) * p1[d] + ((t - t1) / (t2 - t1)) * p2[d];
          var a3 = ((t3 - t) / (t3 - t2)) * p2[d] + ((t - t2) / (t3 - t2)) * p3[d];
          var b1 = ((t2 - t) / t2) * a1 + (t / t2) * a2;
          var b2 = ((t3 - t) / (t3 - t1)) * a2 + ((t - t1) / (t3 - t1)) * a3;
          pt.push(((t2 - t) / (t2 - t1)) * b1 + ((t - t1) / (t2 - t1)) * b2);
        }
        out.push(pt);
      }
    }
    return out;
  };

  function tambahAnjak(pts, a) {
    return pts.map(function (p) {
      return [p[0] + a.x, p[1] + a.y];
    });
  }

  // Laluan licin keluk (ternormal). anjak: true = kedudukan semasa, false = kedudukan asal.
  B.laluan = function (k, denganAnjak) {
    // keluk persamaan sudah disampel rapat (atau garis lurus tepat): tidak perlu dilicinkan
    var poli = k.persamaan ? k.titik.map(function (p) {
      return [p[0], p[1]];
    }) : B.licin(k.titik);
    if (denganAnjak === false) return poli;
    var sk = k.skala || 1;
    if (sk !== 1) poli = poli.map(function (p) {
      return [p[0] * sk, p[1] * sk];
    });
    return tambahAnjak(poli, k.anjak);
  };

  // Panjang lengkok kumulatif
  B.panjang = function (poli, sx, sy) {
    sx = sx || 1;
    sy = sy || 1;
    var c = [0];
    for (var i = 1; i < poli.length; i++) {
      var dx = (poli[i][0] - poli[i - 1][0]) * sx,
        dy = (poli[i][1] - poli[i - 1][1]) * sy;
      c.push(c[i - 1] + Math.sqrt(dx * dx + dy * dy));
    }
    return c;
  };

  // Titik pada pecahan panjang lengkok s (0..1)
  B.titikPadaS = function (poli, s) {
    var c = B.panjang(poli);
    var L = c[c.length - 1];
    if (!L) return [poli[0][0], poli[0][1]];
    var sasar = E.clamp(s, 0, 1) * L;
    for (var i = 1; i < c.length; i++) {
      if (c[i] >= sasar) {
        var seg = c[i] - c[i - 1];
        var t = seg ? (sasar - c[i - 1]) / seg : 0;
        return [poli[i - 1][0] + (poli[i][0] - poli[i - 1][0]) * t, poli[i - 1][1] + (poli[i][1] - poli[i - 1][1]) * t];
      }
    }
    var z = poli[poli.length - 1];
    return [z[0], z[1]];
  };

  // Sub-laluan antara s1 dan s2 (ikut tertib s1 → s2)
  B.subLaluan = function (poli, s1, s2) {
    var c = B.panjang(poli);
    var L = c[c.length - 1] || 1;
    var a = Math.min(s1, s2),
      b = Math.max(s1, s2);
    var out = [B.titikPadaS(poli, a)];
    for (var i = 0; i < poli.length; i++) {
      var si = c[i] / L;
      if (si > a && si < b) out.push([poli[i][0], poli[i][1]]);
    }
    out.push(B.titikPadaS(poli, b));
    return s1 <= s2 ? out : out.reverse();
  };

  // Unjuran titik p ke laluan. sx, sy = piksel per unit (jarak diukur dalam piksel).
  // Pulang { s, x, y, jarak }.
  B.unjur = function (poli, p, sx, sy) {
    sx = sx || 1;
    sy = sy || 1;
    var c = B.panjang(poli);
    var L = c[c.length - 1];
    var terbaik = { s: 0, x: poli[0][0], y: poli[0][1], jarak: Infinity };
    for (var i = 1; i < poli.length; i++) {
      var ax = poli[i - 1][0] * sx,
        ay = poli[i - 1][1] * sy,
        bx = poli[i][0] * sx,
        by = poli[i][1] * sy;
      var px = p[0] * sx,
        py = p[1] * sy;
      var vx = bx - ax,
        vy = by - ay;
      var len = vx * vx + vy * vy;
      var t = len ? E.clamp(((px - ax) * vx + (py - ay) * vy) / len, 0, 1) : 0;
      var qx = ax + vx * t,
        qy = ay + vy * t;
      var d = Math.sqrt((px - qx) * (px - qx) + (py - qy) * (py - qy));
      if (d < terbaik.jarak) {
        // s diukur dalam ruang ternormal supaya kekal sama apabila saiz skrin berubah
        var segN = c[i] - c[i - 1];
        terbaik = { s: L ? (c[i - 1] + segN * t) / L : 0, x: qx / sx, y: qy / sy, jarak: d };
      }
    }
    return terbaik;
  };

  // Potong laluan pada kotak [0,1]² (Liang–Barsky). Pulang senarai kepingan.
  B.klipKotak = function (poli) {
    var kepingan = [];
    var semasa = null;
    for (var i = 1; i < poli.length; i++) {
      var a = poli[i - 1],
        b = poli[i];
      var dx = b[0] - a[0],
        dy = b[1] - a[1];
      var t0 = 0,
        t1 = 1;
      var p = [-dx, dx, -dy, dy];
      var q = [a[0], 1 - a[0], a[1], 1 - a[1]];
      var sah = true;
      for (var j = 0; j < 4; j++) {
        if (Math.abs(p[j]) < 1e-12) {
          if (q[j] < -1e-9) sah = false;
        } else {
          var r = q[j] / p[j];
          if (p[j] < 0) t0 = Math.max(t0, r);
          else t1 = Math.min(t1, r);
        }
      }
      if (!sah || t0 > t1) {
        semasa = null;
        continue;
      }
      var mula = [a[0] + dx * t0, a[1] + dy * t0],
        akhir = [a[0] + dx * t1, a[1] + dy * t1];
      if (!semasa || t0 > 1e-9) {
        semasa = [mula];
        kepingan.push(semasa);
      }
      semasa.push(akhir);
      if (t1 < 1 - 1e-9) semasa = null;
    }
    return kepingan.filter(function (k) {
      return k.length > 1;
    });
  };

  // Julat s yang kelihatan dalam kotak (untuk mengehadkan titik gerak)
  B.julatSNampak = function (poli) {
    var c = B.panjang(poli);
    var L = c[c.length - 1] || 1;
    var a = null,
      b = null;
    for (var i = 0; i < poli.length; i++) {
      var p = poli[i];
      if (p[0] >= 0 && p[0] <= 1 && p[1] >= 0 && p[1] <= 1) {
        if (a == null) a = c[i] / L;
        b = c[i] / L;
      }
    }
    if (a == null) return [S_MIN, S_MAKS];
    return [Math.max(S_MIN, a + 0.02), Math.min(S_MAKS, b - 0.02)];
  };

  function had(poli) {
    var h = { x0: Infinity, x1: -Infinity, y0: Infinity, y1: -Infinity };
    poli.forEach(function (p) {
      h.x0 = Math.min(h.x0, p[0]);
      h.x1 = Math.max(h.x1, p[0]);
      h.y0 = Math.min(h.y0, p[1]);
      h.y1 = Math.max(h.y1, p[1]);
    });
    return h;
  }

  // Julat anjakan yang dibenarkan: hujung kekal dalam 95% paksi, dan sekurang-kurangnya 30% paksi kelihatan.
  B.hadAnjak = function (k) {
    var h = had(B.laluan(k, false));
    return {
      x: [Math.min(0, NAMPAK_MIN - h.x1), Math.max(0, TEPI - h.x1)],
      y: [Math.min(0, NAMPAK_MIN - h.y1), Math.max(0, TEPI - h.y1)]
    };
  };

  // Julat skala KKP: hujung kekal dalam 95% paksi, dan sekurang-kurangnya 20% paksi
  B.hadSkala = function (k) {
    var h = had(B.laluan(k, false));
    var m = Math.max(h.x1, h.y1, 1e-6);
    return [Math.min(1, 0.2 / m), Math.max(1, TEPI / m)];
  };

  /* ---------- tindakan (pulang graf baharu) ---------- */
  // PERALIHAN KKP: kembang (> 1, beralih ke kanan) atau kecut (< 1, ke kiri) dari asalan
  B.skalaKeluk = function (graf, id, s) {
    var g = klon(graf);
    var k = B.cari(g, id);
    if (!k || k.arahSeret !== "skala" || !isFinite(s)) return g;
    var h = B.hadSkala(k);
    k.skala = Math.round(E.clamp(s, h[0], h[1]) * 1e6) / 1e6;
    return g;
  };

  // PERALIHAN: set anjakan mutlak keluk, ikut arahSeret dan had. Bentuk tidak berubah.
  B.anjakKeluk = function (graf, id, ax, ay) {
    var g = klon(graf);
    var k = B.cari(g, id);
    if (!k || k.arahSeret === "tiada" || k.arahSeret === "skala") return g;
    var h = B.hadAnjak(k);
    var x = k.arahSeret === "y" ? 0 : E.clamp(ax, h.x[0], h.x[1]);
    var y = k.arahSeret === "x" ? 0 : E.clamp(ay, h.y[0], h.y[1]);
    // 9 tempat perpuluhan: anjakan unit kemas (contoh 20/150) kekal tepat dalam unit dunia
    k.anjak = { x: Math.round(x * 1e9) / 1e9, y: Math.round(y * 1e9) / 1e9 };
    return g;
  };

  // PERGERAKAN: titik bergerak di sepanjang keluk yang sama; keluk tidak berubah.
  B.gerakTitik = function (graf, id, s) {
    var g = klon(graf);
    var k = B.cari(g, id);
    var t = B.titikKeluk(g, id);
    if (!k || !t) return g;
    var j = B.julatSNampak(B.laluan(k));
    t.s = bundar(E.clamp(s, j[0], j[1]));
    return g;
  };

  // Catat peristiwa. Peristiwa berturut-turut yang sama jenis dan keluk digabung (dari kekal, ke dikemas kini).
  B.catat = function (graf, p) {
    var g = klon(graf);
    var akhir = g.peristiwa[g.peristiwa.length - 1];
    if (akhir && akhir.jenis === p.jenis && akhir.keluk === p.keluk && akhir.titik === p.titik) akhir.ke = klon(p.ke);
    else g.peristiwa.push(klon(p));
    return g;
  };

  // Situasi asal: semua keluk kembali ke kedudukan asal dan setiap titik ke s awal. Keluk dan label kekal.
  B.setSemula = function (graf) {
    var g = klon(graf);
    g.keluk.forEach(function (k) {
      k.anjak = { x: 0, y: 0 };
      k.skala = 1;
    });
    g.titik.forEach(function (t) {
      t.s = t.sAwal;
    });
    g.peristiwa = [];
    return g;
  };

  B.dianjak = function (k) {
    return Math.abs(k.anjak.x) > 0.004 || Math.abs(k.anjak.y) > 0.004 || Math.abs((k.skala || 1) - 1) > 0.004;
  };

  // Arah peralihan keluk dalam perkataan. KKP yang mengembang = "kanan" (istilah buku teks: KKP beralih ke kanan).
  B.arahAlih = function (k) {
    if (k.arahSeret === "skala") {
      var s = k.skala || 1;
      return s > 1.004 ? ["kanan"] : s < 0.996 ? ["kiri"] : [];
    }
    return B.arahAnjak(k.anjak);
  };

  // Arah anjakan dalam perkataan: ["kanan"], ["kiri", "atas"] …
  B.arahAnjak = function (a) {
    var out = [];
    if (a.x > 0.004) out.push("kanan");
    else if (a.x < -0.004) out.push("kiri");
    if (a.y > 0.004) out.push("atas");
    else if (a.y < -0.004) out.push("bawah");
    return out;
  };

  /* ---------- lukisan tangan → keluk ---------- */
  var LUKIS_MIN_PX = 30; // lukisan lebih pendek daripada ini diabaikan
  var LUKIS_TOL_PX = 2.5; // toleransi awal Ramer–Douglas–Peucker (piksel)
  var LUKIS_MAKS_TITIK = 12;
  var LURUS_SUDUT = 6; // darjah: garis hampir mendatar/tegak diluruskan

  // Purata bergerak (hujung dikekalkan) untuk mengurangkan getaran jari
  B.purata = function (pts, w) {
    var h = Math.floor((w || 5) / 2);
    if (pts.length <= 2 || h < 1) return pts.map(function (p) {
      return [p[0], p[1]];
    });
    return pts.map(function (p, i) {
      if (i === 0 || i === pts.length - 1) return [p[0], p[1]];
      var a = Math.max(0, i - h),
        b = Math.min(pts.length - 1, i + h);
      var sx = 0,
        sy = 0;
      for (var j = a; j <= b; j++) {
        sx += pts[j][0];
        sy += pts[j][1];
      }
      return [sx / (b - a + 1), sy / (b - a + 1)];
    });
  };

  // Ramer–Douglas–Peucker; jarak diukur dalam piksel (sx, sy = piksel per unit)
  B.permudah = function (pts, tol, sx, sy) {
    sx = sx || 1;
    sy = sy || 1;
    if (pts.length < 3) return pts.slice();
    var simpan = [];
    for (var i = 0; i < pts.length; i++) simpan.push(false);
    simpan[0] = simpan[pts.length - 1] = true;
    var tindan = [[0, pts.length - 1]];
    while (tindan.length) {
      var j = tindan.pop();
      var a = pts[j[0]],
        b = pts[j[1]];
      var ax = a[0] * sx,
        ay = a[1] * sy,
        bx = b[0] * sx,
        by = b[1] * sy;
      var vx = bx - ax,
        vy = by - ay;
      var len = Math.sqrt(vx * vx + vy * vy);
      var jauh = -1,
        idx = -1;
      for (var k = j[0] + 1; k < j[1]; k++) {
        var px = pts[k][0] * sx - ax,
          py = pts[k][1] * sy - ay;
        var d = len ? Math.abs(px * vy - py * vx) / len : Math.sqrt(px * px + py * py);
        if (d > jauh) {
          jauh = d;
          idx = k;
        }
      }
      if (jauh > tol) {
        simpan[idx] = true;
        tindan.push([j[0], idx], [idx, j[1]]);
      }
    }
    return pts.filter(function (p, i) {
      return simpan[i];
    });
  };

  // Lukisan (titik ternormal mentah) → { titik } atau { ralat }. o.sx, o.sy = piksel per unit.
  B.dariLukisan = function (mentah, o) {
    o = o || {};
    var sx = o.sx || 500,
      sy = o.sy || 340;
    // dalam kotak; hujung tidak melepasi 95% supaya label kelihatan
    var pts = [];
    (mentah || []).forEach(function (p) {
      if (!isFinite(p[0]) || !isFinite(p[1])) return;
      var q = [E.clamp(p[0], 0, TEPI), E.clamp(p[1], 0, TEPI)];
      var z = pts[pts.length - 1];
      if (!z || Math.abs(z[0] - q[0]) * sx + Math.abs(z[1] - q[1]) * sy > 0.5) pts.push(q);
    });
    // saiz lukisan = pepenjuru kotak sempadan (getaran jari tidak menambah saiz)
    var h = had(pts.length ? pts : [[0, 0]]);
    var pepenjuru = Math.sqrt(Math.pow((h.x1 - h.x0) * sx, 2) + Math.pow((h.y1 - h.y0) * sy, 2));
    if (pts.length < 2 || pepenjuru < LUKIS_MIN_PX) return { ralat: "Lukisan terlalu pendek. Lukis keluk yang lebih panjang di dalam graf." };
    var licin = B.purata(pts, 5);
    var tol = LUKIS_TOL_PX;
    var kawalan = B.permudah(licin, tol, sx, sy);
    while (kawalan.length > LUKIS_MAKS_TITIK) {
      tol *= 1.5;
      kawalan = B.permudah(licin, tol, sx, sy);
    }
    // arah tetap: kiri → kanan (bawah → atas bagi keluk hampir tegak)
    var a = kawalan[0],
      z = kawalan[kawalan.length - 1];
    var dxPx = (z[0] - a[0]) * sx,
      dyPx = (z[1] - a[1]) * sy;
    if (Math.abs(dxPx) >= Math.abs(dyPx) ? dxPx < 0 : dyPx < 0) kawalan.reverse();
    // garis hampir mendatar/tegak diluruskan
    var lurus = false;
    if (kawalan.length === 2) {
      var sudut = (Math.atan2(Math.abs(dyPx), Math.abs(dxPx)) * 180) / Math.PI;
      if (sudut < LURUS_SUDUT) {
        var ym = (kawalan[0][1] + kawalan[1][1]) / 2;
        kawalan = [[kawalan[0][0], ym], [kawalan[1][0], ym]];
        lurus = "mendatar";
      } else if (sudut > 90 - LURUS_SUDUT) {
        var xm = (kawalan[0][0] + kawalan[1][0]) / 2;
        kawalan = [[xm, kawalan[0][1]], [xm, kawalan[1][1]]];
        lurus = "tegak";
      }
    }
    return {
      titik: kawalan.map(function (p) {
        return [bundar(p[0]), bundar(p[1])];
      }),
      diluruskan: lurus
    };
  };

  /* ---------- graf contoh ---------- */
  // Graf konsep permintaan dan penawaran (tiada nombor pada paksi)
  B.grafContoh = function () {
    var g = B.buatGraf({ paksi: { x: { label: "Kuantiti (unit)" }, y: { label: "Harga (RM)" } } });
    // graf contoh ditulis oleh kita, jadi jenisnya diketahui (keluk lain tidak diandaikan)
    g = B.tambahKeluk(g, { label: "D", warna: "d", titik: B.TEMPLAT["menurun-cembung"].titik, s: 0.42, jenis: "permintaan" });
    g = B.tambahKeluk(g, { label: "S", warna: "s", titik: B.TEMPLAT.menaik.titik, s: 0.45, jenis: "penawaran" });
    return g;
  };
})();
