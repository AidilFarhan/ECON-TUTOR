/* =========================================================
   Econ Tutor · graf interaktif STPM (Ekonomi 944)
   Penggal 1 Bab 1: perubahan keluk kemungkinan pengeluaran
   Penggal 1 Bab 4: keseimbangan firma (PPS, monopoli, bermonopoli)
   Penggal 2 Bab 3: keseimbangan pendapatan negara AE–Y
   Penggal 2 Bab 4: pasaran wang (Md, MS, perangkap kecairan)
   Penggal 3 Bab 6: keluk Lorenz dan pekali Gini
   ========================================================= */
(function () {
  "use strict";

  var E = window.EKO;
  var G = E.graf;

  /* =========================================================
     PENGGAL 1 · BAB 1 · Perubahan KKP (anugerah sumber, teknologi,
     komposisi barang modal dan barang pengguna)
     ========================================================= */
  var PUNCA = {
    sumber: {
      nama: "Anugerah sumber",
      paksiX: "Barang X",
      paksiY: "Barang Y",
      tambah: "Pertambahan anugerah sumber (pertambahan penduduk atau kemasukan buruh asing, penemuan sumber alam baharu, pertambahan pelaburan)",
      kurang: "Pengurangan anugerah sumber (kepupusan bahan galian, pengurangan tenaga kerja asing, kemerosotan pelaburan)"
    },
    teknologi: {
      nama: "Tingkat teknologi",
      paksiX: "Barang X",
      paksiY: "Barang Y",
      tambah: "Perkembangan teknologi yang sama dalam pengeluaran barang X dan barang Y",
      kurang: "Kemunduran teknologi dalam pengeluaran kedua-dua barang"
    },
    komposisi: {
      nama: "Komposisi barang modal",
      paksiX: "Barang modal",
      paksiY: "Barang pengguna",
      tambah: "Kadar pertambahan komposisi barang modal sama dengan kadar pertambahan barang pengguna",
      kurang: "Kadar pengurangan komposisi barang modal sama dengan kadar pengurangan barang pengguna"
    }
  };

  G.daftar(
    "kkp-anjakan",
    function (host, opt) {
      var K = G.kad(host, {
        tajuk: opt.tajuk || "Perubahan keluk kemungkinan pengeluaran",
        petunjuk: "Seret A′ (paksi tegak) atau B′ (paksi datar) · anak panah ↑↓ dan ←→"
      });
      var ASAL = 10;
      var MIN = 4,
        MAKS = 14.5;
      var st = { punca: opt.punca || "sumber", a: 13, b: 13 };

      var segPunca = G.segmen(
        K.kawalan,
        [
          ["sumber", PUNCA.sumber.nama],
          ["teknologi", PUNCA.teknologi.nama],
          ["komposisi", PUNCA.komposisi.nama]
        ],
        st.punca,
        function (v) {
          st.punca = v;
          bina();
        }
      );
      G.pemisah(K.kawalan);
      var segKes = G.segmen(
        K.kawalan,
        [
          ["kanan", "Beralih ke kanan"],
          ["kiri", "Beralih ke kiri"],
          ["y", "Y sahaja"],
          ["x", "X sahaja"]
        ],
        "kanan",
        function (v) {
          var sasar = { kanan: [13, 13], kiri: [7, 7], y: [13, ASAL], x: [ASAL, 13] }[v];
          st.a = sasar[0];
          st.b = sasar[1];
          lukis();
        }
      );

      var plot = G.plot(K.kanvas, {
        x: [0, 16],
        y: [0, 16],
        tikX: [],
        tikY: [],
        labelX: PUNCA[st.punca].paksiX,
        labelY: PUNCA[st.punca].paksiY,
        nisbah: function (w) {
          return w < 480 ? 0.95 : 0.66;
        },
        aria: "Perubahan keluk kemungkinan pengeluaran interaktif"
      });

      // Tukar punca: label paksi ikut punca (barang modal/pengguna bagi komposisi).
      function bina() {
        plot.cfg.labelX = PUNCA[st.punca].paksiX;
        plot.cfg.labelY = PUNCA[st.punca].paksiY;
        lukis();
      }

      // KKP cembung ke luar: suku elips dengan pintasan a (paksi Y) dan b (paksi X)
      function keluk(a, b) {
        return function (x) {
          var r = 1 - (x / b) * (x / b);
          return r <= 0 ? 0 : a * Math.sqrt(r);
        };
      }

      function sama(u, v) {
        return Math.abs(u - v) < 0.25;
      }

      function kes() {
        var naikA = st.a > ASAL + 0.25,
          turunA = st.a < ASAL - 0.25,
          naikB = st.b > ASAL + 0.25,
          turunB = st.b < ASAL - 0.25;
        if (sama(st.a, ASAL) && sama(st.b, ASAL)) return "tetap";
        if (naikA && naikB) return "kanan";
        if (turunA && turunB) return "kiri";
        if (naikA && !naikB && !turunB) return "y";
        if (naikB && !naikA && !turunA) return "x";
        return "campur";
      }

      function lukis() {
        var p = PUNCA[st.punca];
        plot.kosong();
        plot.paksi();
        var berubah = kes() !== "tetap";
        plot.fungsi(keluk(ASAL, ASAL), 0, ASAL, "g-lengkung c3" + (berubah ? " hantu" : ""), berubah ? "hantu" : "lengkung", 120);
        plot.teks(0, ASAL, "A", "g-teks " + (berubah ? "lemah" : "c3"), "end", "label", -10, 4);
        plot.teks(ASAL, 0, "B", "g-teks " + (berubah ? "lemah" : "c3"), "middle", "label", 0, 17);
        if (berubah) {
          plot.fungsi(keluk(st.a, st.b), 0, st.b, "g-lengkung c3", "lengkung", 120);
          var t = 0.62;
          var x0 = ASAL * t,
            y0 = keluk(ASAL, ASAL)(x0);
          var x1 = st.b * t,
            y1 = keluk(st.a, st.b)(x1);
          if (Math.abs(x1 - x0) + Math.abs(y1 - y0) > 0.9) plot.panah(x0, y0, x1 - (x1 - x0) * 0.12, y1 - (y1 - y0) * 0.12, st.a + st.b > 2 * ASAL ? "baik" : "s", "tanda", 9);
        }
        plot.nod(0, st.a, { pegang: "A", kelas: "c3", label: "A′", dx: 14, dy: -10, kelasLabel: "c3" });
        plot.nod(st.b, 0, { pegang: "B", kelas: "c3", label: "B′", dx: 10, dy: -14, kelasLabel: "c3" });
        baca(p);
      }

      function baca(p) {
        var k = kes();
        segKes.set(k === "tetap" || k === "campur" ? null : k);
        var x = p.paksiX.toLowerCase(),
          y = p.paksiY.toLowerCase();
        var ayat;
        if (k === "tetap") ayat = "KKP tidak berubah. Seret A′ atau B′, atau pilih satu keadaan di atas.";
        else if (k === "kanan") ayat = '<span class="status baik">Beralih ke kanan secara selari</span> ' + p.tambah + ". Pengeluaran " + y + " dan " + x + " kedua-duanya bertambah, maka KKP beralih dari AB ke A′B′.";
        else if (k === "kiri") ayat = '<span class="status buruk">Beralih ke kiri secara selari</span> ' + p.kurang + ". Pengeluaran kedua-dua barang berkurang, maka KKP beralih dari AB ke A′B′.";
        else if (k === "y")
          ayat =
            '<span class="status baik">Berpusing ke luar pada paksi tegak</span> ' +
            (st.punca === "komposisi" ? "Pertambahan komposisi barang pengguna sahaja: pengeluaran barang pengguna bertambah manakala barang modal tetap." : "Perkembangan teknologi dalam pengeluaran " + y + " sahaja, maka pengeluaran " + y + " sahaja bertambah.") +
            " KKP beralih dari AB ke A′B.";
        else if (k === "x")
          ayat =
            '<span class="status baik">Berpusing ke luar pada paksi datar</span> ' +
            (st.punca === "komposisi" ? "Pertambahan komposisi barang modal sahaja: pengeluaran barang modal bertambah manakala barang pengguna tetap." : "Perkembangan teknologi dalam pengeluaran " + x + " sahaja, maka pengeluaran " + x + " sahaja bertambah.") +
            " KKP beralih dari AB ke AB′.";
        else ayat = '<span class="status amaran">Perubahan tidak sekata</span> Satu barang bertambah dan satu lagi berkurang. Keadaan ini tidak dibincangkan dalam modul; cuba salah satu keadaan di atas.';
        var bits = [
          [p.paksiY + " maksimum", E.fmt(ASAL, 1) + " → " + E.fmt(st.a, 1) + " unit", "c3"],
          [p.paksiX + " maksimum", E.fmt(ASAL, 1) + " → " + E.fmt(st.b, 1) + " unit", "c3"]
        ];
        K.baca.innerHTML = G.nilai(bits) + '<div class="ayat">' + ayat + ' <span class="teks-lemah">(Nilai contoh.)</span></div>';
      }

      G.interaksi(plot, {
        seret: function (n, pt) {
          if (n === "A" && pt.y != null) st.a = E.bundar(E.clamp(pt.y, MIN, MAKS), 1);
          else if (n === "B" && pt.x != null) st.b = E.bundar(E.clamp(pt.x, MIN, MAKS), 1);
          else return;
          lukis();
        },
        kekunci: function (k) {
          if (k.dy) st.a = E.bundar(E.clamp(st.a + k.dy * 0.5, MIN, MAKS), 1);
          if (k.dx) st.b = E.bundar(E.clamp(st.b + k.dx * 0.5, MIN, MAKS), 1);
          lukis();
        }
      });

      segPunca.set(st.punca);
      lukis();
      var henti = G.pantauSaiz(K.kanvas, function () {
        plot.ukur();
        lukis();
      });
      return { musnah: henti };
    },
    { tajuk: "Perubahan keluk kemungkinan pengeluaran", bab: "stpm-p1-b1" }
  );

  /* =========================================================
     PENGGAL 1 · BAB 4 · Keseimbangan firma: persaingan sempurna,
     monopoli dan persaingan bermonopoli (MR = MC)
     ========================================================= */
  // Kos contoh: TFC = 40, TVC = 12Q − 1.2Q² + 0.06Q³ (nilai contoh, bukan data modul)
  var TFC = 40;
  function avc(q) {
    return 12 - 1.2 * q + 0.06 * q * q;
  }
  function ac(q) {
    return TFC / q + avc(q);
  }
  function mc(q) {
    return 12 - 2.4 * q + 0.18 * q * q;
  }
  var AVC_MIN = avc(10); // 6.00 pada Q = 10
  var Q_HUJUNG = 20; // keluk AC, AVC, AR berakhir di sini (paksi hingga 24)
  var Q_MC = 20; // MC(20) = 36, di bawah paksi atas 40
  // AC bermula apabila nilainya turun ke 36 (90% paksi) supaya tidak terpotong di atas
  var Q_AC = (function () {
    var q = 0.5;
    while (ac(q) > 36) q += 0.01;
    return q;
  })();

  var JENIS_PASARAN = {
    pps: { nama: "Persaingan sempurna", b: 0 },
    mono: { nama: "Monopoli", b: 1.2 },
    bermono: { nama: "Persaingan bermonopoli", b: 0.6 }
  };

  // Q keseimbangan: MR = MC pada bahagian MC yang menaik (Q > 6.67)
  function qSeimbang(A, b) {
    // A − 2bQ = 12 − 2.4Q + 0.18Q²  →  0.18Q² + (2b − 2.4)Q + (12 − A) = 0
    var qa = 0.18,
      qb = 2 * b - 2.4,
      qc = 12 - A;
    var d = qb * qb - 4 * qa * qc;
    if (d < 0) return null;
    return (-qb + Math.sqrt(d)) / (2 * qa);
  }

  G.daftar(
    "struktur-pasaran",
    function (host, opt) {
      var K = G.kad(host, {
        tajuk: opt.tajuk || "Keseimbangan firma: MR = MC",
        petunjuk: "Seret pemegang P (harga / permintaan) · anak panah ↑↓"
      });
      var st = { jenis: opt.jenis || "pps", A: 12 };
      var AWAL = { pps: 12, mono: 30, bermono: 21 };
      st.A = AWAL[st.jenis];

      G.segmen(
        K.kawalan,
        [
          ["pps", JENIS_PASARAN.pps.nama],
          ["mono", JENIS_PASARAN.mono.nama],
          ["bermono", JENIS_PASARAN.bermono.nama]
        ],
        st.jenis,
        function (v) {
          st.jenis = v;
          st.A = AWAL[v];
          lukis();
        }
      );

      var plot = G.plot(K.kanvas, {
        x: [0, 24],
        y: [0, 40],
        tikX: [0, 5, 10, 15, 20],
        tikY: [0, 10, 20, 30, 40],
        labelX: "Kuantiti (unit)",
        labelY: "Harga / kos / hasil (RM)",
        nisbah: function (w) {
          return w < 480 ? 1 : 0.66;
        },
        aria: "Keseimbangan firma dalam pelbagai struktur pasaran"
      });

      function hadA() {
        return st.jenis === "pps" ? [4, 20] : st.jenis === "mono" ? [16, 36] : [12, 34];
      }

      function lukis() {
        var b = JENIS_PASARAN[st.jenis].b;
        plot.kosong();
        plot.paksi();
        var q = qSeimbang(st.A, b);
        var P = q == null ? null : st.A - b * q;
        var ACq = q == null ? null : ac(q);
        var untung = q == null ? 0 : (P - ACq) * q;
        var tutup = q == null || P < avc(q) - 1e-9;

        if (q != null && !tutup && Math.abs(P - ACq) > 0.05)
          plot.segi(0, P, q, ACq, "g-kawasan " + (P > ACq ? "baik" : "buruk"), "kawasan");

        // Semua keluk berakhir di dalam graf (Q = 20 atau pintasan paksi) supaya nampak lengkap.
        plot.fungsi(ac, Q_AC, Q_HUJUNG, "g-lengkung c3", "lengkung", 120);
        plot.fungsi(avc, 0.2, Q_HUJUNG, "g-lengkung c5", "lengkung", 120);
        plot.fungsi(mc, 0.2, Q_MC, "g-lengkung s", "lengkung", 120);
        plot.teks(Q_HUJUNG, ac(Q_HUJUNG), "AC", "g-teks c3", "start", "label", 5, 4);
        plot.teks(Q_HUJUNG, avc(Q_HUJUNG), "AVC", "g-teks c5", "start", "label", 5, 12);
        plot.teks(Q_MC, mc(Q_MC), "MC", "g-teks s", "start", "label", 5, 4);

        if (st.jenis === "pps") {
          plot.garis(0, st.A, Q_HUJUNG, st.A, "g-lengkung d", "lengkung");
          plot.teks(Q_HUJUNG, st.A, "AR = MR", "g-teks d", "end", "label", 0, -8);
        } else {
          var qAR = Math.min(Q_HUJUNG, st.A / b),
            qMR = st.A / (2 * b);
          plot.fungsi(function (x) {
            return st.A - b * x;
          }, 0, qAR, "g-lengkung d", "lengkung", 40);
          plot.fungsi(function (x) {
            return st.A - 2 * b * x;
          }, 0, Math.min(Q_HUJUNG, qMR), "g-lengkung c4", "lengkung", 40);
          var xd = qAR * 0.62;
          plot.teks(xd, st.A - b * xd, "DD = AR", "g-teks d", "start", "label", 6, -8);
          var xm = Math.min(Q_HUJUNG, qMR) * 0.9;
          plot.teks(xm, st.A - 2 * b * xm, "MR", "g-teks c4", "end", "label", -6, 14);
        }

        if (q != null) {
          plot.bulat(q, mc(q), 5, "g-nod isi s", "tanda");
          plot.teks(q, mc(q), "E", "g-teks s", "start", "label", 8, 14);
          plot.panduanKePaksi(q, P, { labelX: E.fmt(q, 1), labelY: E.rm(P, 2) });
          if (st.jenis !== "pps") plot.garis(q, mc(q), q, P, "g-panduan", "panduan");
        }
        plot.nod(0.6, st.A, { pegang: "P", kelas: "d", label: "P", dx: 10, dy: -10, kelasLabel: "d" });
        baca(q, P, ACq, untung, tutup);
      }

      function baca(q, P, ACq, untung, tutup) {
        var nama = JENIS_PASARAN[st.jenis].nama;
        if (q == null) {
          K.baca.innerHTML = '<div class="ayat">Tiada keluaran dengan MR = MC. Seret P ke atas.</div>';
          return;
        }
        var bits = [
          ["Q (MR = MC)", E.fmt(q, 1) + " unit", "s"],
          ["Harga", E.rm(P, 2), "d"],
          ["AC", E.rm(ACq, 2), "c3"],
          [untung >= 0 ? "Untung" : "Rugi", E.rm(Math.abs(untung), 2), untung > 0.5 ? "baik" : untung < -0.5 ? "buruk" : ""]
        ];
        var ayat;
        if (tutup)
          ayat =
            '<span class="status buruk">Tutup perniagaan</span> Harga ' + E.rm(P, 2) + " lebih rendah daripada AVC (" + E.rm(avc(q), 2) + "): TR tidak dapat menampung semua kos berubah. Titik tutup ialah AVC minimum " + E.rm(AVC_MIN, 2) + ".";
        else if (untung > 0.5)
          ayat = '<span class="status baik">Untung lebih normal</span> TR &gt; TC kerana harga (AR) melebihi AC pada Q keseimbangan. Untung = (P − AC) × Q = (' + E.fmt(P, 2) + " − " + E.fmt(ACq, 2) + ") × " + E.fmt(q, 1) + " = <b>" + E.rm(untung, 2) + "</b>.";
        else if (untung < -0.5)
          ayat = '<span class="status amaran">Untung kurang normal (rugi)</span> AC &gt; AR, tetapi harga masih melebihi AVC, maka firma <b>meneruskan</b> operasi dalam jangka pendek kerana TR menampung semua kos berubah dan sebahagian kos tetap.';
        else ayat = '<span class="status neutral">Untung normal</span> AR = AC pada Q keseimbangan, maka TR = TC. Ini keadaan keseimbangan jangka panjang bagi persaingan sempurna dan persaingan bermonopoli.';
        if (st.jenis === "pps") ayat += " Firma persaingan sempurna ialah <b>penerima harga</b>: P = AR = MR (keluk mendatar).";
        else ayat += " " + nama + ": keluk DD = AR bercerun negatif dan MR di bawahnya; harga dibaca pada keluk AR di atas titik MR = MC.";
        K.baca.innerHTML = G.nilai(bits) + '<div class="ayat">' + ayat + ' <span class="teks-lemah">(Nilai contoh.)</span></div>';
      }

      G.interaksi(plot, {
        seret: function (n, pt) {
          if (n !== "P" || pt.y == null) return;
          var h = hadA();
          st.A = E.bundar(E.clamp(pt.y, h[0], h[1]), 1);
          lukis();
        },
        kekunci: function (k) {
          var h = hadA();
          st.A = E.bundar(E.clamp(st.A + k.dy * 0.5, h[0], h[1]), 1);
          lukis();
        }
      });

      lukis();
      var henti = G.pantauSaiz(K.kanvas, function () {
        plot.ukur();
        lukis();
      });
      return { musnah: henti };
    },
    { tajuk: "Keseimbangan firma: MR = MC", bab: "stpm-p1-b4" }
  );

  /* =========================================================
     PENGGAL 2 · BAB 3 · Keseimbangan pendapatan negara AE–Y
     (contoh modul: C = 100 + 0.8Yd, I = 50, G = 50, T = 30)
     ========================================================= */
  G.daftar(
    "ae-y",
    function (host, opt) {
      var K = G.kad(host, {
        tajuk: opt.tajuk || "Keseimbangan pendapatan negara: AE = Y",
        petunjuk: "Seret pemegang G · pilih MPC · anak panah ↑↓"
      });
      var st = { a: 100, b: 0.8, I: 50, G: 50, T: 30, Yf: opt.yf || 1200 };
      var G0 = 50;
      var MAKS = 2000;

      G.segmen(
        K.kawalan,
        [
          ["0.5", "MPC 0.5"],
          ["0.75", "MPC 0.75"],
          ["0.8", "MPC 0.8"],
          ["0.9", "MPC 0.9"]
        ],
        "0.8",
        function (v) {
          st.b = parseFloat(v);
          lukis();
        }
      );
      G.pemisah(K.kawalan);
      G.butang(
        K.kawalan,
        "Set semula",
        function () {
          st.G = G0;
          lukis();
        },
        { tekan: false }
      );

      var plot = G.plot(K.kanvas, {
        x: [0, MAKS],
        y: [0, MAKS],
        tikX: [0, 500, 1000, 1500],
        tikY: [0, 500, 1000, 1500],
        labelX: "Pendapatan negara, Y (RM juta)",
        labelY: "AE (RM juta)",
        nisbah: function (w) {
          return w < 480 ? 1 : 0.7;
        },
        aria: "Keseimbangan pendapatan negara AE sama dengan Y"
      });

      function autonomi() {
        return st.a - st.b * st.T + st.I + st.G;
      }
      function ae(y) {
        return autonomi() + st.b * y;
      }
      function yKeseimbangan() {
        return autonomi() / (1 - st.b);
      }
      // Had G supaya titik keseimbangan E sentiasa kelihatan (Y ≤ 95% hujung garis)
      function gMaks() {
        return Math.max(0, MAKS * 0.9 * 0.95 * (1 - st.b) - (st.a - st.b * st.T + st.I));
      }

      function lukis() {
        st.G = Math.min(st.G, E.bundar(gMaks(), 0));
        plot.kosong();
        plot.paksi();
        var k = 1 / (1 - st.b);
        var Ye = yKeseimbangan();
        // Garis berakhir pada 90% paksi supaya nampak lengkap dengan label di hujung.
        var HAD = MAKS * 0.9;
        plot.garis(0, 0, HAD, HAD, "g-lengkung c5", "lengkung");
        plot.teks(HAD, HAD, "Y = AE (45°)", "g-teks c5", "end", "label", -4, -10);
        plot.garis(st.Yf, 0, st.Yf, HAD * 0.8, "g-panduan", "panduan");
        plot.teks(st.Yf, HAD * 0.8, "Yf", "g-teks lemah", "middle", "label", 0, -6);
        var xHujung = Math.min(HAD, (HAD - autonomi()) / st.b);
        plot.fungsi(ae, 0, xHujung, "g-lengkung d", "lengkung", 10);
        plot.teks(xHujung, ae(xHujung), "AE", "g-teks d", "start", "label", 6, 4);
        var dalam = Ye > 0 && Ye < MAKS;
        if (dalam) {
          plot.bulat(Ye, Ye, 5, "g-nod isi d", "tanda");
          plot.teks(Ye, Ye, "E", "g-teks d", "end", "label", -8, -6);
          plot.panduanKePaksi(Ye, Ye, { labelX: E.fmt(Ye, 0), keY: false });
        }
        var gap = st.Yf - Ye;
        if (Math.abs(gap) > 1 && dalam) {
          var aeF = ae(st.Yf);
          plot.garis(st.Yf, aeF, st.Yf, st.Yf, gap > 0 ? "g-lengkung s" : "g-lengkung c4", "tanda");
        }
        plot.nod(0, autonomi(), { pegang: "G", kelas: "d", label: "G", dx: 12, dy: -8, kelasLabel: "d" });
        baca(k, Ye, gap);
      }

      function baca(k, Ye, gap) {
        var lompang = Math.abs(gap) / k;
        var bits = [
          ["G", "RM" + E.fmt(st.G, 0) + " juta", "d"],
          ["Pengganda 1 ÷ (1 − MPC)", E.fmt(k, 2), "c3"],
          ["Y keseimbangan", "RM" + E.fmt(Ye, 1) + " juta", "d"]
        ];
        var kira =
          "Y = " + E.fmt(st.a, 0) + " + " + E.fmt(st.b, 2) + "(Y − " + E.fmt(st.T, 0) + ") + " + E.fmt(st.I, 0) + " + " + E.fmt(st.G, 0) +
          " → Y = " + E.fmt(st.a - st.b * st.T + st.I + st.G, 0) + " ÷ " + E.fmt(1 - st.b, 2) + " = <b>RM" + E.fmt(Ye, 1) + " juta</b>.";
        var ayat;
        if (Math.abs(gap) <= 1) ayat = '<span class="status baik">Guna tenaga penuh</span> Keseimbangan berada pada Yf. ' + kira;
        else if (gap > 0) {
          bits.push(["Lompang deflasi", "RM" + E.fmt(lompang, 1) + " juta", "buruk"]);
          ayat = '<span class="status amaran">Lompang deflasi</span> Y keseimbangan lebih rendah daripada Yf (RM' + E.fmt(st.Yf, 0) + " juta). Jurang KNK = " + E.fmt(gap, 1) + "; lompang deflasi = jurang ÷ pengganda = " + E.fmt(gap, 1) + " ÷ " + E.fmt(k, 2) + " = <b>RM" + E.fmt(lompang, 1) + " juta</b>. Kerajaan boleh menambah G sebanyak itu (dasar fiskal mengembang). " + kira;
        } else {
          bits.push(["Lompang inflasi", "RM" + E.fmt(lompang, 1) + " juta", "c4"]);
          ayat = '<span class="status amaran">Lompang inflasi</span> Y keseimbangan melebihi Yf (RM' + E.fmt(st.Yf, 0) + " juta): AE berlebihan pada guna tenaga penuh. Lompang inflasi = " + E.fmt(-gap, 1) + " ÷ " + E.fmt(k, 2) + " = <b>RM" + E.fmt(lompang, 1) + " juta</b>. Kerajaan boleh mengurangkan G (dasar fiskal menguncup). " + kira;
        }
        K.baca.innerHTML = G.nilai(bits) + '<div class="ayat">' + ayat + ' <span class="teks-lemah">(C, I, T daripada contoh modul; Yf ialah nilai contoh.)</span></div>';
      }

      G.interaksi(plot, {
        seret: function (n, pt) {
          if (n !== "G" || pt.y == null) return;
          var g = pt.y - (st.a - st.b * st.T + st.I);
          st.G = E.bundar(E.clamp(g, 0, gMaks()), 0);
          lukis();
        },
        kekunci: function (kk) {
          st.G = E.clamp(st.G + kk.dy * 10, 0, gMaks());
          lukis();
        }
      });

      lukis();
      var henti = G.pantauSaiz(K.kanvas, function () {
        plot.ukur();
        lukis();
      });
      return { musnah: henti };
    },
    { tajuk: "Keseimbangan pendapatan negara: AE = Y", bab: "stpm-p2-b3" }
  );

  /* =========================================================
     PENGGAL 2 · BAB 4 · Pasaran wang: Md, MS dan kadar bunga
     (Teori Keutamaan Kecairan Keynes; nilai contoh)
     ========================================================= */
  G.daftar(
    "pasaran-wang",
    function (host, opt) {
      var K = G.kad(host, {
        tajuk: opt.tajuk || "Keseimbangan pasaran wang: Md = MS",
        petunjuk: "Seret keluk MS · pilih perubahan Md · anak panah ←→"
      });
      var LANTAI = 2; // perangkap kecairan
      var st = { W: 80, s: 1 };
      function md(w, s) {
        return LANTAI + 12 * s * Math.pow(40 / w, 1.5);
      }
      // Kuantiti wang apabila Md = 12.6% supaya keluk bermula di bawah paksi atas (14%)
      function mulaMd(s) {
        return 40 * Math.pow((12 * s) / (12.6 - LANTAI), 2 / 3);
      }
      G.segmen(
        K.kawalan,
        [
          ["0.7", "Md berkurang"],
          ["1", "Md asal"],
          ["1.4", "Md bertambah"]
        ],
        "1",
        function (v) {
          st.s = parseFloat(v);
          lukis();
        }
      );
      var plot = G.plot(K.kanvas, {
        x: [0, 340],
        y: [0, 14],
        tikX: [0, 50, 100, 150, 200, 250, 300],
        tikY: [0, 2, 4, 6, 8, 10, 12, 14],
        labelX: "Kuantiti wang (RM juta)",
        labelY: "Kadar bunga (%)",
        nisbah: function (w) {
          return w < 480 ? 0.95 : 0.62;
        },
        aria: "Keseimbangan pasaran wang"
      });

      function lukis() {
        plot.kosong();
        plot.paksi();
        if (st.s !== 1) {
          plot.fungsi(function (w) {
            return md(w, 1);
          }, mulaMd(1), 320, "g-lengkung d hantu", "hantu", 100);
          plot.teks(320, md(320, 1), "Md₀", "g-teks lemah", "end", "label", -4, -8);
        }
        plot.fungsi(function (w) {
          return md(w, st.s);
        }, mulaMd(st.s), 320, "g-lengkung d", "lengkung", 100);
        plot.teks(320, md(320, st.s), st.s === 1 ? "Md" : "Md₁", "g-teks d", "end", "label", -4, -8);
        plot.garis(st.W, 0, st.W, 12.6, "g-lengkung s", "lengkung");
        plot.teks(st.W, 12.6, "MS", "g-teks s", "start", "label", 6, 4);
        var r = md(st.W, st.s);
        plot.bulat(st.W, r, 5, "g-nod isi s", "tanda");
        plot.teks(st.W, r, "E", "g-teks s", "start", "label", 8, -8);
        plot.panduanKePaksi(st.W, r, { labelY: E.fmt(r, 2) + "%", keX: false });
        plot.nod(st.W, 1, { pegang: "MS", kelas: "s", label: "", dx: 0, dy: 0 });
        var trap = r - LANTAI < 0.6;
        var bits = [
          ["MS", "RM" + E.fmt(st.W, 0) + " juta", "s"],
          ["Kadar bunga", E.fmt(r, 2) + "%", "d"]
        ];
        var ayat = trap
          ? '<span class="status amaran">Perangkap kecairan</span> Kadar bunga sudah hampir paling rendah; harga bon paling tinggi, orang ramai memegang wang tunai. Keluk Md hampir mendatar, jadi pertambahan penawaran wang <b>tidak lagi menurunkan</b> kadar bunga.'
          : "Keseimbangan pada Md = MS. Tambah MS (seret ke kanan): lebihan penawaran wang, orang ramai membeli bon, harga bon naik dan kadar bunga <b>turun</b>. Md bertambah: lebihan permintaan wang, orang ramai menjual bon dan kadar bunga <b>naik</b>. Kadar bunga lebih rendah menggalakkan pelaburan, AE, AD dan Y.";
        K.baca.innerHTML = G.nilai(bits) + '<div class="ayat">' + ayat + ' <span class="teks-lemah">(Nilai contoh.)</span></div>';
      }

      G.interaksi(plot, {
        seret: function (n, pt) {
          if (n !== "MS" || pt.x == null) return;
          st.W = E.bundar(E.clamp(pt.x, 60, 320), 0);
          lukis();
        },
        kekunci: function (k) {
          st.W = E.clamp(st.W + k.dx * 5, 60, 320);
          lukis();
        }
      });

      lukis();
      var henti = G.pantauSaiz(K.kanvas, function () {
        plot.ukur();
        lukis();
      });
      return { musnah: henti };
    },
    { tajuk: "Keseimbangan pasaran wang", bab: "stpm-p2-b4" }
  );

  /* =========================================================
     PENGGAL 3 · BAB 6 · Keluk Lorenz dan pekali Gini (nilai contoh)
     L(x) = x^k, Gini = (k − 1) ÷ (k + 1)
     ========================================================= */
  G.daftar(
    "lorenz",
    function (host, opt) {
      var K = G.kad(host, {
        tajuk: opt.tajuk || "Keluk Lorenz dan pekali Gini",
        petunjuk: "Seret titik L pada keluk · anak panah ↑↓",
        kawalan: false
      });
      var st = { y: 0.25 };
      var plot = G.plot(K.kanvas, {
        x: [0, 100],
        y: [0, 100],
        tikX: [0, 20, 40, 60, 80, 100],
        tikY: [0, 20, 40, 60, 80, 100],
        labelX: "% kumulatif penduduk",
        labelY: "% kumulatif pendapatan",
        nisbah: function (w) {
          return w < 480 ? 1 : 0.7;
        },
        aria: "Keluk Lorenz interaktif"
      });
      function k() {
        return Math.log(st.y) / Math.log(0.5);
      }
      function L(x) {
        return 100 * Math.pow(x / 100, k());
      }
      function lukis() {
        plot.kosong();
        plot.paksi();
        var pts = [];
        for (var i = 0; i <= 60; i++) pts.push([(100 * i) / 60, L((100 * i) / 60)]);
        plot.laluan([[0, 0]].concat(pts.slice().reverse()), "g-kawasan c4", "kawasan", true);
        plot.garis(0, 0, 100, 100, "g-lengkung c5", "lengkung");
        plot.teks(70, 70, "Garis kesaksamaan", "g-teks c5", "end", "label", -8, -6);
        plot.fungsi(L, 0, 100, "g-lengkung d", "lengkung", 80);
        plot.teks(62, L(62), "Keluk Lorenz", "g-teks d", "start", "label", 8, 14);
        for (var q = 20; q < 100; q += 20) plot.bulat(q, L(q), 3.5, "g-nod isi d", "tanda");
        plot.nod(50, 100 * st.y, { pegang: "L", kelas: "d", label: "L", dx: -18, dy: -10, kelasLabel: "d" });
        baca();
      }
      function baca() {
        var gini = (k() - 1) / (k() + 1);
        var bahagian = [];
        for (var i = 1; i <= 5; i++) bahagian.push(L(20 * i) - L(20 * (i - 1)));
        var bits = [
          ["Pekali Gini", E.fmt(gini, 3), gini < 0.35 ? "baik" : gini < 0.45 ? "c4" : "buruk"],
          ["40% terbawah", E.fmt(bahagian[0] + bahagian[1], 1) + "%", "d"],
          ["20% teratas", E.fmt(bahagian[4], 1) + "%", "s"]
        ];
        var ayat =
          "Pekali Gini = kawasan antara garis kesaksamaan dengan keluk Lorenz ÷ jumlah kawasan di bawah garis kesaksamaan. Nilainya antara <b>0</b> (agihan saksama sepenuhnya) dan <b>1</b> (paling tidak saksama). " +
          "Semakin jauh keluk Lorenz daripada garis 45°, semakin tidak setara agihan pendapatan. Bahagian pendapatan setiap 20% penduduk (terbawah ke teratas): " +
          bahagian
            .map(function (b) {
              return E.fmt(b, 1) + "%";
            })
            .join(", ") +
          ".";
        K.baca.innerHTML = G.nilai(bits) + '<div class="ayat">' + ayat + ' <span class="teks-lemah">(Nilai contoh.)</span></div>';
      }
      G.interaksi(plot, {
        seret: function (n, pt) {
          if (n !== "L" || pt.y == null) return;
          st.y = E.clamp(pt.y / 100, 0.05, 0.49);
          lukis();
        },
        kekunci: function (kk) {
          st.y = E.clamp(st.y + kk.dy * 0.01, 0.05, 0.49);
          lukis();
        }
      });
      lukis();
      var henti = G.pantauSaiz(K.kanvas, function () {
        plot.ukur();
        lukis();
      });
      return { musnah: henti };
    },
    { tajuk: "Keluk Lorenz dan pekali Gini", bab: "stpm-p3-b6" }
  );
})();
