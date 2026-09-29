/* =========================================================
   Econ Tutor · graf interaktif STPM (Ekonomi 944)
   Penggal 1 Bab 1: perubahan keluk kemungkinan pengeluaran
   Penggal 1 Bab 4: keseimbangan firma (PPS, monopoli, bermonopoli)
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
        x: [0, 20],
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
        return st.jenis === "pps" ? [4, 20] : st.jenis === "mono" ? [16, 40] : [12, 36];
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

        plot.fungsi(ac, 1.6, 20, "g-lengkung c3", "lengkung", 120);
        plot.fungsi(avc, 0.2, 20, "g-lengkung c5", "lengkung", 120);
        plot.fungsi(mc, 0.2, 18.5, "g-lengkung s", "lengkung", 120);
        plot.teks(20, ac(20), "AC", "g-teks c3", "end", "label", -4, -8);
        plot.teks(20, avc(20), "AVC", "g-teks c5", "end", "label", -4, 16);
        plot.teks(18.5, mc(18.5), "MC", "g-teks s", "start", "label", 6, 4);

        if (st.jenis === "pps") {
          plot.garis(0, st.A, 20, st.A, "g-lengkung d", "lengkung");
          plot.teks(20, st.A, "AR = MR", "g-teks d", "end", "label", -4, -8);
        } else {
          var qAR = st.A / b,
            qMR = st.A / (2 * b);
          plot.fungsi(function (x) {
            return st.A - b * x;
          }, 0, Math.min(20, qAR), "g-lengkung d", "lengkung", 40);
          plot.fungsi(function (x) {
            return st.A - 2 * b * x;
          }, 0, Math.min(20, qMR), "g-lengkung c4", "lengkung", 40);
          var xa = Math.min(19, qAR * 0.92),
            xm = Math.min(19, qMR * 0.9);
          plot.teks(xa, st.A - b * xa, "DD = AR", "g-teks d", "start", "label", 6, -6);
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
})();
