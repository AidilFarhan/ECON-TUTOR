/* =========================================================
   Econ Tutor · graf interaktif STPM (Ekonomi 944)
   Penggal 1 Bab 1: perubahan keluk kemungkinan pengeluaran
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
})();
