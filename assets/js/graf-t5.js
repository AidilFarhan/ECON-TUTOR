/* =========================================================
   Econ Tutor · graf interaktif Tingkatan 5
   Bab 1: IHP, inflasi & dasar (AD-AS), pengangguran, KDNK,
          KDNK benar, belanjawan negara, jenis cukai, kadar faedah
   Bab 2: faedah berbanding, akaun semasa, penukaran mata wang
   Nota: nilai contoh (bukan data rasmi) ditanda dalam bacaan.
   ========================================================= */
(function () {
  "use strict";

  var E = window.EKO;
  var G = E.graf;
  var svgEl = G.svgEl;

  // Pemegang yang boleh diseret (koordinat px)
  function pemegang(plot, px, py, nama, kelas, r) {
    var g = svgEl("g", { class: "g-nod-g g-pemegang", "data-pegang": nama, style: "touch-action:none" }, plot.lapis.pemegang);
    svgEl("circle", { cx: px, cy: py, r: 20, fill: "transparent" }, g);
    svgEl("circle", { cx: px, cy: py, r: 13, class: "g-nod-halo" }, g);
    svgEl("circle", { cx: px, cy: py, r: r || 7.5, class: "g-nod " + (kelas || "") }, g);
    return g;
  }

  function teksPx(plot, x, y, str, kelas, anchor, lapis) {
    var t = svgEl("text", { x: x, y: y, class: kelas || "g-teks", "text-anchor": anchor || "start" }, plot.lapis[lapis || "label"]);
    t.textContent = str;
    return t;
  }

  var CONTOH = ' <span class="teks-lemah">(Nilai contoh untuk latihan, bukan data rasmi.)</span>';

  /* =========================================================
     BAB 1 · Indeks harga pengguna (IHP)
     ========================================================= */
  G.daftar(
    "ihp",
    function (host, opt) {
      var K = G.kad(host, { tajuk: opt.tajuk || "Indeks harga pengguna (IHP) dan kadar inflasi", petunjuk: "Seret hujung bar untuk ubah harga tahun semasa" });
      var ASAL = [
        { nama: "Makanan & minuman", w: 30, p0: 10, p1: 12 },
        { nama: "Pengangkutan", w: 25, p0: 4, p1: 4.4 },
        { nama: "Perumahan & utiliti", w: 20, p0: 800, p1: 840 },
        { nama: "Pendidikan", w: 15, p0: 50, p1: 55 },
        { nama: "Pakaian", w: 10, p0: 60, p1: 57 }
      ];
      var B = ASAL.map(function (b) {
        return Object.assign({}, b);
      });
      G.butang(K.kawalan, "Harga minyak naik (pengangkutan +30%)", function () {
        B[1].p1 = E.bundar(B[1].p0 * 1.3, 2);
        lukis();
      });
      G.butang(K.kawalan, "Harga makanan turun", function () {
        B[0].p1 = E.bundar(B[0].p0 * 0.95, 2);
        lukis();
      });
      G.butang(K.kawalan, E.ikon("ulang") + " Set semula", function () {
        B = ASAL.map(function (b) {
          return Object.assign({}, b);
        });
        lukis();
      });
      var BARIS = 50;
      var plot = G.plot(K.kanvas, { x: [0, 170], y: [0, 1], tinggi: 30 + B.length * BARIS + 34, margin: { l: 14, r: 20, t: 30, b: 34 }, aria: "Carta indeks harga setiap kumpulan barang" });

      function indeks(b) {
        return (b.p1 / b.p0) * 100;
      }
      function kiraIHP() {
        var jw = 0,
          jum = 0;
        B.forEach(function (b) {
          jw += b.w;
          jum += indeks(b) * b.w;
        });
        return jum / jw;
      }

      function lukis() {
        plot.kosong();
        var kiri = plot.kiri(),
          kanan = plot.kanan(),
          atas = plot.atas(),
          bawah = plot.bawah();
        [0, 40, 80, 120, 160].forEach(function (v) {
          var x = plot.X(v);
          plot.garisPx(x, atas - 6, x, bawah, "g-grid", "grid");
          teksPx(plot, x, bawah + 18, String(v), "g-tik", "middle", "paksi");
        });
        teksPx(plot, kanan, bawah + 32, "Indeks harga (tahun dasar = 100)", "g-label", "end", "paksi");
        var ihp = kiraIHP();
        B.forEach(function (b, i) {
          var yT = atas + i * BARIS;
          var ind = indeks(b);
          teksPx(plot, kiri, yT + 12, plot.sempit ? b.nama : b.nama + " · wajaran " + b.w, "g-label");
          teksPx(plot, kanan, yT + 12, plot.sempit ? E.rm(b.p1, 2, true) : E.rm(b.p0, 2, true) + " → " + E.rm(b.p1, 2, true), "g-teks lemah", "end");
          var kelas = ind > 100.001 ? "s" : ind < 99.999 ? "c3" : "c6";
          var yB = yT + 20,
            tb = 18;
          svgEl("rect", { x: plot.X(0), y: yB, width: Math.max(0, plot.X(ind) - plot.X(0)), height: tb, rx: 6, class: "g-bar " + kelas }, plot.lapis.kawasan);
          teksPx(plot, plot.X(ind) - 10, yB + 13, E.fmt(ind, 1), "g-teks pada-bar", "end");
          pemegang(plot, plot.X(ind), yB + tb / 2, "b" + i, kelas, 7);
        });
        var x100 = plot.X(100);
        plot.garisPx(x100, atas - 8, x100, bawah, "g-garis-silang", "panduan");
        var xi = plot.X(ihp);
        plot.garisPx(xi, atas - 8, xi, bawah, "g-garis-harga", "panduan");
        plot.cip(xi, atas - 16, "IHP " + E.fmt(ihp, 1), { anchor: ihp >= 100 ? "start" : "end" });
        plot.cip(x100, atas - 16, "100", { anchor: ihp >= 100 ? "end" : "start", kelas: "lemah" });
        baca(ihp);
      }

      function baca(ihp) {
        var inflasi = ihp - 100;
        var baris = B.map(function (b) {
          var ind = indeks(b);
          return "<tr><td>" + b.nama + '</td><td class="n">' + b.w + '</td><td class="n">' + E.fmt(b.p0, 2, true) + '</td><td class="n">' + E.fmt(b.p1, 2, true) + '</td><td class="n">' + E.fmt(ind, 1) + '</td><td class="n">' + E.fmt(ind * b.w, 1) + "</td></tr>";
        }).join("");
        var jw = B.reduce(function (a, b) {
          return a + b.w;
        }, 0);
        var jum = B.reduce(function (a, b) {
          return a + indeks(b) * b.w;
        }, 0);
        var status =
          inflasi > 0.05
            ? '<span class="status buruk">Inflasi ' + E.fmt(inflasi, 1) + "%</span> Tingkat harga umum meningkat berbanding tahun dasar, maka kos sara hidup naik dan kuasa beli wang merosot."
            : inflasi < -0.05
              ? '<span class="status biru">Deflasi ' + E.fmt(-inflasi, 1) + "%</span> Tingkat harga umum menurun berbanding tahun dasar."
              : '<span class="status neutral">Harga stabil</span> Tingkat harga umum sama dengan tahun dasar.';
        K.baca.innerHTML =
          G.nilai([
            ["IHP", E.fmt(ihp, 2), "s"],
            ["Kadar inflasi", E.fmt(inflasi, 2) + "%", inflasi > 0 ? "s" : "c3"]
          ]) +
          '<div class="ayat">' + status + " Indeks harga setiap barang = (harga tahun semasa ÷ harga tahun dasar) × 100. <b>IHP = Σ(indeks × wajaran) ÷ Σwajaran = " + E.fmt(jum, 1) + " ÷ " + jw + " = " + E.fmt(ihp, 2) + "</b>. Kadar inflasi = (IHP tahun semasa − IHP tahun dasar) ÷ IHP tahun dasar × 100 = <b>" + E.fmt(inflasi, 2) + "%</b>." + CONTOH + "</div>" +
          '<div class="jadual"><table><thead><tr><th>Kumpulan barang</th><th class="n">Wajaran</th><th class="n">Harga dasar (RM)</th><th class="n">Harga semasa (RM)</th><th class="n">Indeks</th><th class="n">Indeks × wajaran</th></tr></thead><tbody>' +
          baris +
          '<tr><td><b>Jumlah</b></td><td class="n"><b>' + jw + '</b></td><td></td><td></td><td></td><td class="n"><b>' + E.fmt(jum, 1) + "</b></td></tr></tbody></table></div>";
      }

      var aktif = -1;
      G.interaksi(plot, {
        seret: function (n, pt, fasa) {
          if (n.charAt(0) !== "b" || pt.x == null) return;
          var i = parseInt(n.slice(1), 10);
          aktif = i;
          var ind = E.clamp(Math.round(pt.x * 2) / 2, 50, 165);
          B[i].p1 = E.bundar((B[i].p0 * ind) / 100, 2);
          lukis();
        },
        kekunci: function (k) {
          if (aktif < 0) aktif = 0;
          if (k.dy) aktif = (aktif - (k.dy > 0 ? 1 : -1) + B.length) % B.length;
          if (k.dx) {
            var ind = E.clamp(indeks(B[aktif]) + (k.dx > 0 ? 1 : -1) * (Math.abs(k.dx) > 1 ? 5 : 1), 50, 165);
            B[aktif].p1 = E.bundar((B[aktif].p0 * ind) / 100, 2);
          }
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
    { tajuk: "Indeks harga pengguna", bab: "t5-b1" }
  );

  /* =========================================================
     BAB 1 · Permintaan agregat & penawaran agregat:
     jenis inflasi dan kesan dasar fiskal / kewangan
     ========================================================= */
  var PERISTIWA_INFLASI = [
    {
      label: "Tarikan permintaan (AD ke kanan)",
      pilihan: [
        ["D+pengguna", "Perbelanjaan pengguna meningkat (bonus, kenaikan gaji)"],
        ["D+pelaburan", "Pelaburan swasta meningkat"],
        ["D+kerajaan", "Perbelanjaan kerajaan meningkat"],
        ["D+eksport", "Permintaan luar negara terhadap eksport meningkat"],
        ["D+wang", "Penawaran wang bertambah, kadar faedah rendah"]
      ]
    },
    {
      label: "Tolakan kos (AS ke kiri)",
      pilihan: [
        ["S-upah", "Kenaikan upah buruh"],
        ["S-bahan", "Kenaikan harga bahan mentah dan tenaga (minyak)"],
        ["S-cukai", "Kenaikan cukai atau subsidi ditarik balik"],
        ["S-untung", "Firma menaikkan margin keuntungan"]
      ]
    },
    {
      label: "Inflasi diimport (AS ke kiri)",
      pilihan: [
        ["S-import", "Harga barang import meningkat"],
        ["S-ringgit", "Ringgit susut nilai, input import lebih mahal"]
      ]
    },
    {
      label: "Permintaan agregat merosot (AD ke kiri)",
      pilihan: [["D-meleset", "Kemelesetan: isi rumah dan firma mengurangkan perbelanjaan"]]
    }
  ];

  var DASAR = [
    {
      label: "Dasar fiskal mengembang (AD ke kanan)",
      pilihan: [
        ["D+fcukai", "Kurangkan kadar cukai"],
        ["D+fbelanja", "Tambah perbelanjaan kerajaan"]
      ]
    },
    {
      label: "Dasar fiskal menguncup (AD ke kiri)",
      pilihan: [
        ["D-fcukai", "Naikkan kadar cukai"],
        ["D-fbelanja", "Kurangkan perbelanjaan kerajaan"]
      ]
    },
    {
      label: "Dasar kewangan mengembang (AD ke kanan)",
      pilihan: [
        ["D+kfaedah", "Turunkan kadar faedah (OPR)"],
        ["D+krizab", "Turunkan nisbah rizab berkanun"],
        ["D+ksurat", "Bank pusat membeli surat jaminan kerajaan"],
        ["D+ksewa", "Longgarkan syarat sewa beli"]
      ]
    },
    {
      label: "Dasar kewangan menguncup (AD ke kiri)",
      pilihan: [
        ["D-kfaedah", "Naikkan kadar faedah (OPR)"],
        ["D-krizab", "Naikkan nisbah rizab berkanun"],
        ["D-ksurat", "Bank pusat menjual surat jaminan kerajaan"],
        ["D-ksewa", "Ketatkan syarat sewa beli"]
      ]
    }
  ];

  var RANTAI = {
    "D+fcukai": ["Kadar cukai ↓", "Pendapatan boleh guna ↑", "Perbelanjaan penggunaan & pelaburan ↑"],
    "D+fbelanja": ["Perbelanjaan kerajaan ↑", "Projek & peluang pekerjaan ↑", "Pendapatan isi rumah ↑"],
    "D-fcukai": ["Kadar cukai ↑", "Pendapatan boleh guna ↓", "Perbelanjaan penggunaan & pelaburan ↓"],
    "D-fbelanja": ["Perbelanjaan kerajaan ↓", "Projek kerajaan ↓", "Pendapatan isi rumah ↓"],
    "D+kfaedah": ["Kadar faedah ↓", "Kos pinjaman ↓", "Pinjaman untuk penggunaan & pelaburan ↑"],
    "D+krizab": ["Nisbah rizab berkanun ↓", "Lebihan rizab bank perdagangan ↑", "Pinjaman (kredit) ↑"],
    "D+ksurat": ["BNM membeli surat jaminan", "Tunai bank perdagangan ↑", "Penawaran wang & kredit ↑"],
    "D+ksewa": ["Syarat sewa beli longgar", "Deposit ↓, tempoh bayaran ↑", "Pembelian barang tahan lama ↑"],
    "D-kfaedah": ["Kadar faedah ↑", "Kos pinjaman ↑", "Pinjaman untuk penggunaan & pelaburan ↓"],
    "D-krizab": ["Nisbah rizab berkanun ↑", "Lebihan rizab bank perdagangan ↓", "Pinjaman (kredit) ↓"],
    "D-ksurat": ["BNM menjual surat jaminan", "Tunai bank perdagangan ↓", "Penawaran wang & kredit ↓"],
    "D-ksewa": ["Syarat sewa beli ketat", "Deposit ↑, tempoh bayaran ↓", "Pembelian barang tahan lama ↓"]
  };

  function labelPilihan(senarai, kod) {
    var hasil = "";
    senarai.forEach(function (k) {
      k.pilihan.forEach(function (p) {
        if (p[0] === kod) hasil = p[1];
      });
    });
    return hasil;
  }

  G.daftar(
    "ad-as",
    function (host, opt) {
      var modDasar = opt.mod === "dasar";
      var K = G.kad(host, {
        tajuk: opt.tajuk || (modDasar ? "Kesan dasar fiskal dan dasar kewangan" : "Jenis inflasi: tarikan permintaan, tolakan kos dan diimport"),
        petunjuk: modDasar ? "Pilih dasar, perhati peralihan AD" : "Pilih punca, perhati keseimbangan baharu"
      });
      var SENARAI = modDasar ? DASAR : PERISTIWA_INFLASI;
      var st = { dqD: 0, dqS: 0, kod: "" };
      var tD = null,
        tS = null;
      var ANJAK = 22;
      var pil = G.pilih(K.kawalan, {
        label: modDasar ? "Pilih dasar kerajaan" : "Pilih punca",
        kumpulan: [{ pilihan: [["", "— pilih —"]] }].concat(SENARAI),
        ubah: function (v) {
          st.kod = v;
          if (!v) {
            anim(0, 0);
            return;
          }
          var arah = v.charAt(1) === "+" ? 1 : -1;
          if (v.charAt(0) === "D") anim(arah * ANJAK, 0);
          else anim(0, arah * ANJAK);
        }
      });
      G.butang(K.kawalan, E.ikon("ulang") + " Set semula", function () {
        pil.set("");
        st.kod = "";
        anim(0, 0);
      });

      var plot = G.plot(K.kanvas, {
        x: [0, 160],
        y: [0, 200],
        tikX: [0, 40, 80, 120, 160],
        tikY: [0, 50, 100, 150, 200],
        labelX: "KDNK benar",
        labelY: "Tingkat harga umum",
        nisbah: function (w) {
          return w < 480 ? 0.9 : 0.6;
        },
        aria: "Graf permintaan agregat dan penawaran agregat"
      });

      function anim(d, s) {
        if (tD) tD();
        if (tS) tS();
        tD = G.tween(st.dqD, d, 560, function (v) {
          st.dqD = v;
          lukis();
        });
        tS = G.tween(st.dqS, s, 560, function (v) {
          st.dqS = v;
          lukis();
        });
      }

      function AD(dq) {
        return G.kelukD(180, 1, dq);
      }
      function AS(dq) {
        return G.kelukS(20, 1, dq);
      }

      function label(Kx, teks, kls, isD) {
        var q = isD ? Kx.Q(24) : Kx.Q(188);
        q = Math.min(q, 156);
        var p = Kx.P(q);
        if (q > 0 && p > 0 && p < 200) plot.teks(q, p, teks, "g-teks " + kls, "end", "label", -6, isD ? -8 : 16);
      }

      function lukis() {
        plot.kosong();
        plot.paksi();
        var d0 = AD(0),
          s0 = AS(0),
          d1 = AD(st.dqD),
          s1 = AS(st.dqS);
        var adaD = Math.abs(st.dqD) > 0.2,
          adaS = Math.abs(st.dqS) > 0.2;
        if (adaD) plot.fungsi(d0.P, 0, 160, "g-lengkung d hantu", "hantu");
        if (adaS) plot.fungsi(s0.P, 0, 160, "g-lengkung s hantu", "hantu");
        plot.fungsi(d1.P, 0, 160, "g-lengkung d", "lengkung");
        plot.fungsi(s1.P, 0, 160, "g-lengkung s", "lengkung");
        label(d1, adaD ? "AD₁" : "AD", "d", true);
        label(s1, adaS ? "AS₁" : "AS", "s", false);
        if (adaD) label(d0, "AD₀", "d lemah", true);
        if (adaS) label(s0, "AS₀", "s lemah", false);
        var e0 = G.silang(d0, s0),
          e1 = G.silang(d1, s1);
        var ubah = adaD || adaS;
        if (ubah) {
          plot.panduanKePaksi(e0.q, e0.p, { labelY: "P₀", labelX: "Y₀", kelasCip: "lemah" });
          plot.nod(e0.q, e0.p, { r: 5, label: "E₀", kelasLabel: "lemah", dx: -22, dy: -8 });
          if (adaD) plot.panah(d0.Q(160), 160, d1.Q(160), 160, "d", "tanda", 9);
          if (adaS) plot.panah(s0.Q(170), 170, s1.Q(170), 170, "s", "tanda", 9);
        }
        plot.panduanKePaksi(e1.q, e1.p, { labelY: ubah ? "P₁" : "P", labelX: ubah ? "Y₁" : "Y" });
        plot.nod(e1.q, e1.p, { kelas: "isi", r: 6, label: ubah ? "E₁" : "E", dx: 10, dy: -10 });
        baca(e0, e1, ubah);
      }

      function baca(e0, e1, ubah) {
        var dP = ((e1.p - e0.p) / e0.p) * 100;
        var dY = ((e1.q - e0.q) / e0.q) * 100;
        var bits = [
          ["Tingkat harga", E.fmt(e0.p, 0) + " → " + E.fmt(e1.p, 0), dP > 0.1 ? "s" : dP < -0.1 ? "c3" : ""],
          ["KDNK benar", E.fmt(e0.q, 0) + " → " + E.fmt(e1.q, 0), dY > 0.1 ? "c3" : dY < -0.1 ? "s" : ""]
        ];
        var ayat;
        if (!st.kod) {
          ayat = modDasar
            ? "Pilih satu alat dasar. Dasar <b>mengembang</b> digunakan ketika kemelesetan dan pengangguran tinggi, manakala dasar <b>menguncup</b> digunakan untuk mengawal inflasi."
            : "Keseimbangan ekonomi ditentukan oleh <b>permintaan agregat (AD)</b> dan <b>penawaran agregat (AS)</b>. Pilih satu punca untuk melihat jenis inflasi yang berlaku.";
          K.baca.innerHTML = G.nilai(bits) + '<div class="ayat">' + ayat + "</div>";
          return;
        }
        var nama = labelPilihan(SENARAI, st.kod);
        if (modDasar) {
          var naik = st.kod.charAt(1) === "+";
          var jenis = st.kod.charAt(2) === "f" ? "fiskal" : "kewangan";
          var r = RANTAI[st.kod] || [];
          var rantai = r.concat(["Permintaan agregat " + (naik ? "↑" : "↓"), "KDNK benar & guna tenaga " + (naik ? "↑" : "↓"), "Tingkat harga umum " + (naik ? "↑" : "↓")]);
          ayat =
            '<span class="status ' + (naik ? "baik" : "biru") + '">Dasar ' + jenis + (naik ? " mengembang" : " menguncup") + "</span> <b>" + nama + ".</b> " +
            (naik
              ? "Sesuai semasa kemelesetan: permintaan agregat bertambah, keluaran dan guna tenaga meningkat, tetapi tingkat harga turut naik."
              : "Sesuai untuk mengawal inflasi: permintaan agregat berkurang, tingkat harga menurun, tetapi keluaran dan guna tenaga turut berkurang.") +
            (jenis === "kewangan" ? " Dasar kewangan dilaksanakan oleh <b>Bank Negara Malaysia</b>." : " Dasar fiskal dilaksanakan oleh <b>kerajaan</b> melalui belanjawan negara.");
          K.baca.innerHTML =
            G.nilai(bits) +
            '<div class="aliran">' +
            rantai
              .map(function (x) {
                return "<span>" + x + "</span>";
              })
              .join("<i>→</i>") +
            '</div><div class="ayat">' + ayat + "</div>";
          return;
        }
        var kod = st.kod;
        if (kod.charAt(0) === "D" && kod.charAt(1) === "+") {
          ayat =
            '<span class="status buruk">Inflasi tarikan permintaan</span> <b>' + nama + ".</b> Permintaan agregat melebihi penawaran agregat (\"terlalu banyak wang mengejar terlalu sedikit barang\"), maka tingkat harga umum naik " + E.fmt(dP, 1) + "% dan KDNK benar turut meningkat.";
        } else if (kod === "D-meleset") {
          ayat = '<span class="status biru">Kemelesetan</span> Permintaan agregat merosot, maka tingkat harga umum menurun dan KDNK benar berkurang. Pengangguran cenderung meningkat.';
        } else {
          var imp = kod === "S-import" || kod === "S-ringgit";
          ayat =
            '<span class="status buruk">' + (imp ? "Inflasi diimport" : "Inflasi tolakan kos") + "</span> <b>" + nama + ".</b> Kos pengeluaran meningkat, penawaran agregat berkurang, maka tingkat harga umum naik " + E.fmt(dP, 1) + "% <b>tetapi KDNK benar menurun</b> " + E.fmt(-dY, 1) + "%. Keadaan harga naik dan keluaran merosot ini merugikan ekonomi.";
        }
        K.baca.innerHTML = G.nilai(bits) + '<div class="ayat">' + ayat + "</div>";
      }

      lukis();
      var henti = G.pantauSaiz(K.kanvas, function () {
        plot.ukur();
        lukis();
      });
      return {
        musnah: function () {
          henti();
          if (tD) tD();
          if (tS) tS();
        }
      };
    },
    { tajuk: "Permintaan & penawaran agregat", bab: "t5-b1" }
  );

  /* =========================================================
     BAB 1 · Tenaga buruh & kadar pengangguran (model 100 orang)
     ========================================================= */
  G.daftar(
    "pengangguran",
    function (host, opt) {
      var K = G.kad(host, { tajuk: opt.tajuk || "Tenaga buruh dan kadar pengangguran", petunjuk: "Ubah gelangsar atau ketik seorang individu" });
      var st = { bukan: 32, anggur: 2 };
      var jb = G.julat(K.kawalan, {
        label: "Bukan tenaga buruh",
        min: 0,
        max: 60,
        step: 1,
        nilai: st.bukan,
        fmt: function (v) {
          return v + " orang";
        },
        ubah: function (v) {
          st.bukan = v;
          st.anggur = Math.min(st.anggur, 100 - v);
          ja.set(st.anggur);
          lukis();
        }
      });
      var ja = G.julat(K.kawalan, {
        label: "Penganggur",
        min: 0,
        max: 30,
        step: 1,
        nilai: st.anggur,
        fmt: function (v) {
          return v + " orang";
        },
        ubah: function (v) {
          st.anggur = Math.min(v, 100 - st.bukan);
          lukis();
        }
      });
      var plot = G.plot(K.kanvas, { x: [0, 1], y: [0, 1], tinggi: 250, margin: { l: 14, r: 14, t: 12, b: 10 }, aria: "Model 100 orang berumur 15 hingga 64 tahun" });
      var titik = [];

      function lukis() {
        plot.kosong();
        titik = [];
        var bekerja = 100 - st.bukan - st.anggur;
        var kiri = plot.kiri(),
          kanan = plot.kanan();
        var sel = Math.min(19, (kanan - kiri) / 10);
        var r = sel * 0.36;
        var ofset = kiri + (kanan - kiri - sel * 10) / 2;
        var atas = plot.atas() + 30;
        teksPx(plot, ofset, plot.atas() + 12, "100 orang berumur 15–64 tahun", "g-label");
        var kunci = [
          ["Bekerja", "g-nod isi c3"],
          ["Penganggur", "g-nod isi s"],
          ["Bukan tenaga buruh", "g-nod hilang"]
        ];
        for (var i = 0; i < 100; i++) {
          var jenis = i < bekerja ? 0 : i < bekerja + st.anggur ? 1 : 2;
          var cx = ofset + (i % 10) * sel + sel / 2,
            cy = atas + Math.floor(i / 10) * sel + sel / 2;
          svgEl("circle", { cx: cx, cy: cy, r: r, class: kunci[jenis][1] }, plot.lapis.tanda);
          titik.push([cx, cy, jenis]);
        }
        var xk = ofset + sel * 10 + 18;
        if (xk + 140 < plot.W) {
          kunci.forEach(function (k, j) {
            var y = atas + 10 + j * 26;
            svgEl("circle", { cx: xk + 6, cy: y - 4, r: 6, class: k[1] }, plot.lapis.tanda);
            teksPx(plot, xk + 18, y, k[0], "g-teks");
          });
        }
        var tb = bekerja + st.anggur;
        var kadar = tb ? (st.anggur / tb) * 100 : 0;
        var penuh = kadar < 4;
        K.baca.innerHTML =
          G.nilai([
            ["Tenaga buruh", tb + " orang", "d"],
            ["Bekerja", bekerja, "c3"],
            ["Penganggur", st.anggur, "s"],
            ["Kadar pengangguran", E.fmt(kadar, 2) + "%", penuh ? "c3" : "s"],
            ["Kadar penyertaan tenaga buruh", E.fmt(tb, 0) + "%", ""]
          ]) +
          '<div class="ayat">' +
          (penuh ? '<span class="status baik">Guna tenaga penuh</span> Kadar pengangguran kurang daripada 4%.' : '<span class="status buruk">Melebihi paras guna tenaga penuh</span> Kadar pengangguran 4% atau lebih.') +
          " <b>Kadar pengangguran = penganggur ÷ tenaga buruh × 100 = " + st.anggur + " ÷ " + tb + " × 100 = " + E.fmt(kadar, 2) + "%</b>. Tenaga buruh ialah penduduk berumur 15 hingga 64 tahun yang bekerja atau aktif mencari pekerjaan. Suri rumah, pelajar, pesara dan golongan yang hilang keupayaan bekerja <b>bukan</b> tenaga buruh." +
          "</div>";
      }

      G.interaksi(plot, {
        tekan: function (pt) {
          var pilih = null,
            jarak = 14;
          titik.forEach(function (t) {
            var d = Math.sqrt(Math.pow(t[0] - pt.px, 2) + Math.pow(t[1] - pt.py, 2));
            if (d < jarak) {
              jarak = d;
              pilih = t;
            }
          });
          if (!pilih) return;
          if (pilih[2] === 0 && st.anggur < 30) st.anggur++;
          else if (pilih[2] === 1) {
            st.anggur--;
            if (st.bukan < 60) st.bukan++;
          } else if (pilih[2] === 2 && st.bukan > 0) st.bukan--;
          jb.set(st.bukan);
          ja.set(st.anggur);
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
    { tajuk: "Kadar pengangguran", bab: "t5-b1" }
  );

  /* =========================================================
     BAB 1 · KDNK pendekatan perbelanjaan (air terjun)
     ========================================================= */
  G.daftar(
    "kdnk",
    function (host, opt) {
      var K = G.kad(host, { tajuk: opt.tajuk || "KDNK pendekatan perbelanjaan: C + I + G + (X − M)", petunjuk: "Seret hujung setiap bar" });
      var ASAL = { C: 1000, I: 360, G: 240, X: 1300, M: 1100 };
      var st = Object.assign({}, ASAL);
      var NAMA = {
        C: "Perbelanjaan penggunaan (C)",
        I: "Pelaburan (I)",
        G: "Perbelanjaan kerajaan (G)",
        X: "Eksport (X)",
        M: "Import (M)"
      };
      var KUNCI = ["C", "I", "G", "X", "M"];
      var KELAS = { C: "d", I: "c5", G: "c3", X: "c4", M: "s" };
      G.butang(K.kawalan, "Eksport merosot 20%", function () {
        st.X = Math.round(ASAL.X * 0.8);
        lukis();
      });
      G.butang(K.kawalan, "Kerajaan tambah perbelanjaan", function () {
        st.G = ASAL.G + 60;
        lukis();
      });
      G.butang(K.kawalan, E.ikon("ulang") + " Set semula", function () {
        Object.assign(st, ASAL);
        lukis();
      });
      var plot = G.plot(K.kanvas, {
        x: [0, 6],
        y: [0, 3200],
        tikY: [0, 500, 1000, 1500, 2000, 2500, 3000],
        labelY: "RM bilion",
        grid: true,
        nisbah: function (w) {
          return w < 480 ? 0.95 : 0.56;
        },
        margin: { l: 52 },
        aria: "Carta air terjun KDNK pendekatan perbelanjaan"
      });

      function lukis() {
        plot.kosong();
        plot.paksi({ tikY: plot.cfg.tikY, labelY: "RM bilion", grid: true, asalan: true });
        var kum = 0;
        var lebar = 0.62;
        var sempit = plot.sempit;
        KUNCI.forEach(function (k, i) {
          var x = i + 0.5;
          var dari = kum,
            ke = k === "M" ? kum - st.M : kum + st[k];
          plot.segi(x - lebar / 2, Math.min(dari, ke), x + lebar / 2, Math.max(dari, ke), "g-bar " + KELAS[k], "kawasan");
          if (i < 4) plot.garis(x + lebar / 2, ke, x + 1 - lebar / 2, ke, "g-panduan", "panduan");
          plot.teks(x, Math.max(dari, ke), (k === "M" ? "−" : "+") + E.fmt(st[k], 0), "g-teks " + KELAS[k], "middle", "label", 0, k === "M" ? -8 : -24);
          plot.teksPx(plot.X(x), plot.bawah() + 17, sempit ? k : k === "M" ? "Import" : k === "X" ? "Eksport" : k === "G" ? "Kerajaan" : k === "I" ? "Pelaburan" : "Penggunaan", "g-tik", "middle", "paksi");
          pemegang(plot, plot.X(x), plot.Y(ke), k, KELAS[k], 7);
          kum = ke;
        });
        var xT = 5.5;
        plot.segi(xT - lebar / 2, 0, xT + lebar / 2, kum, "g-bar", "kawasan");
        plot.teks(xT, kum, E.fmt(kum, 0), "g-teks besar", "middle", "label", 0, -8);
        plot.teksPx(plot.X(xT), plot.bawah() + 17, "KDNK", "g-tik", "middle", "paksi");
        var xb = st.X - st.M;
        K.baca.innerHTML =
          G.nilai([
            ["C", E.fmt(st.C, 0), "d"],
            ["I", E.fmt(st.I, 0), "c5"],
            ["G", E.fmt(st.G, 0), "c3"],
            ["X − M", (xb >= 0 ? "+" : "−") + E.fmt(Math.abs(xb), 0), xb >= 0 ? "c4" : "s"],
            ["KDNK", "RM" + E.fmt(kum, 0) + " bilion", ""]
          ]) +
          '<div class="ayat"><b>KDNK = C + I + G + (X − M) = ' + E.fmt(st.C, 0) + " + " + E.fmt(st.I, 0) + " + " + E.fmt(st.G, 0) + " + (" + E.fmt(st.X, 0) + " − " + E.fmt(st.M, 0) + ") = RM" + E.fmt(kum, 0) + " bilion</b>. " +
          "Pendekatan perbelanjaan menjumlahkan semua perbelanjaan ke atas barang dan perkhidmatan akhir yang dikeluarkan dalam negara. Eksport bersih " + (xb >= 0 ? "positif menambah" : "negatif mengurangkan") + " KDNK." + CONTOH + "</div>";
      }

      G.interaksi(plot, {
        seret: function (n, pt) {
          if (KUNCI.indexOf(n) < 0 || pt.y == null) return;
          var kum = 0;
          for (var i = 0; i < KUNCI.length; i++) {
            if (KUNCI[i] === n) break;
            kum = KUNCI[i] === "M" ? kum - st.M : kum + st[KUNCI[i]];
          }
          var v = n === "M" ? kum - pt.y : pt.y - kum;
          st[n] = E.clamp(Math.round(v / 10) * 10, 0, 2500);
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
    { tajuk: "KDNK pendekatan perbelanjaan", bab: "t5-b1" }
  );

  /* =========================================================
     BAB 1 · KDNK nominal lawan KDNK benar & kadar pertumbuhan
     ========================================================= */
  G.daftar(
    "kdnk-benar",
    function (host, opt) {
      var K = G.kad(host, { tajuk: opt.tajuk || "KDNK nominal, KDNK benar dan kadar pertumbuhan ekonomi", petunjuk: "Ubah KDNK nominal dan indeks harga" });
      var ASAL = { n1: 1800, n2: 1950, h1: 120, h2: 125 };
      var st = Object.assign({}, ASAL);
      var j = {};
      [
        ["n1", "KDNK nominal tahun 1", 1000, 2600, 10, "RM", " b"],
        ["h1", "Indeks harga tahun 1", 90, 160, 1, "", ""],
        ["n2", "KDNK nominal tahun 2", 1000, 2600, 10, "RM", " b"],
        ["h2", "Indeks harga tahun 2", 90, 160, 1, "", ""]
      ].forEach(function (x) {
        j[x[0]] = G.julat(K.kawalan, {
          label: x[1],
          min: x[2],
          max: x[3],
          step: x[4],
          nilai: st[x[0]],
          fmt: function (v) {
            return x[5] + E.fmt(v, 0) + x[6];
          },
          ubah: function (v) {
            st[x[0]] = v;
            lukis();
          }
        });
      });
      G.butang(K.kawalan, E.ikon("ulang") + " Set semula", function () {
        Object.assign(st, ASAL);
        for (var k in j) j[k].set(st[k]);
        lukis();
      });
      var plot = G.plot(K.kanvas, {
        x: [0, 4],
        y: [0, 2800],
        tikY: [0, 500, 1000, 1500, 2000, 2500],
        labelY: "RM bilion",
        nisbah: function (w) {
          return w < 480 ? 0.8 : 0.46;
        },
        margin: { l: 52 },
        aria: "Carta KDNK nominal dan benar"
      });

      function lukis() {
        plot.kosong();
        plot.paksi({ tikY: plot.cfg.tikY, labelY: "RM bilion", grid: true });
        var b1 = (st.n1 / st.h1) * 100,
          b2 = (st.n2 / st.h2) * 100;
        [
          [1, st.n1, b1, "Tahun 1"],
          [3, st.n2, b2, "Tahun 2"]
        ].forEach(function (t) {
          plot.segi(t[0] - 0.62, 0, t[0] - 0.04, t[1], "g-bar c4 lembut", "kawasan");
          plot.segi(t[0] + 0.04, 0, t[0] + 0.62, t[2], "g-bar d", "kawasan");
          plot.teks(t[0] - 0.33, t[1], E.fmt(t[1], 0), "g-teks c4", "middle", "label", 0, -8);
          plot.teks(t[0] + 0.33, t[2], E.fmt(t[2], 0), "g-teks d", "middle", "label", 0, -8);
          plot.teksPx(plot.X(t[0]), plot.bawah() + 17, t[3], "g-tik", "middle", "paksi");
        });
        var atasBar = Math.max(st.n1, st.n2, b1, b2);
        var yPanah = Math.min(2700, atasBar + 330);
        plot.panah(1.33, yPanah - 80, 3.33, yPanah - 80 + ((b2 - b1) / Math.max(b1, 1)) * 400, "c3", "tanda", 9);
        var g = ((b2 - b1) / b1) * 100,
          gn = ((st.n2 - st.n1) / st.n1) * 100;
        plot.teks(2.33, yPanah, "KDNK benar " + (g >= 0 ? "+" : "") + E.fmt(g, 2) + "%", "g-teks c3 besar", "middle", "label", 0, -4);
        var xL = plot.kanan() - 132,
          yL = plot.atas() + 2;
        svgEl("rect", { x: xL, y: yL - 9, width: 11, height: 11, rx: 3, class: "g-bar c4 lembut" }, plot.lapis.label);
        teksPx(plot, xL + 16, yL, "nominal", "g-label");
        svgEl("rect", { x: xL + 76, y: yL - 9, width: 11, height: 11, rx: 3, class: "g-bar d" }, plot.lapis.label);
        teksPx(plot, xL + 92, yL, "benar", "g-label");
        K.baca.innerHTML =
          G.nilai([
            ["KDNK benar tahun 1", "RM" + E.fmt(b1, 1) + " b", "d"],
            ["KDNK benar tahun 2", "RM" + E.fmt(b2, 1) + " b", "d"],
            ["Pertumbuhan benar", E.fmt(g, 2) + "%", g >= 0 ? "c3" : "s"],
            ["Pertumbuhan nominal", E.fmt(gn, 2) + "%", "c4"]
          ]) +
          '<div class="ayat">KDNK nominal dihitung pada harga semasa, KDNK benar pada harga tahun dasar. <b>KDNK benar = KDNK nominal ÷ indeks harga × 100</b>: tahun 1 = ' + E.fmt(st.n1, 0) + " ÷ " + st.h1 + " × 100 = " + E.fmt(b1, 1) + "; tahun 2 = " + E.fmt(st.n2, 0) + " ÷ " + st.h2 + " × 100 = " + E.fmt(b2, 1) + ". " +
          "<b>Kadar pertumbuhan ekonomi = (KDNK benar tahun 2 − KDNK benar tahun 1) ÷ KDNK benar tahun 1 × 100 = " + E.fmt(g, 2) + "%</b>. " +
          (gn > g + 0.01 ? "Pertumbuhan nominal (" + E.fmt(gn, 2) + "%) lebih tinggi kerana sebahagiannya disebabkan oleh kenaikan harga, bukan pertambahan keluaran." : "") +
          CONTOH + "</div>";
      }

      lukis();
      var henti = G.pantauSaiz(K.kanvas, function () {
        plot.ukur();
        lukis();
      });
      return { musnah: henti };
    },
    { tajuk: "KDNK nominal & benar", bab: "t5-b1" }
  );

  /* =========================================================
     BAB 1 · Belanjawan negara (jongkang-jongket)
     ========================================================= */
  G.daftar(
    "belanjawan-negara",
    function (host, opt) {
      var K = G.kad(host, { tajuk: opt.tajuk || "Belanjawan negara: seimbang, defisit atau lebihan?", petunjuk: "Ubah hasil dan perbelanjaan kerajaan" });
      var ASAL = { cukai: 250, bukan: 70, urus: 310, bangun: 80 };
      var KDNK = 1900;
      var st = Object.assign({}, ASAL);
      var j = {};
      [
        ["cukai", "Hasil cukai", 100, 400],
        ["bukan", "Hasil bukan cukai", 0, 150],
        ["urus", "Perbelanjaan mengurus", 100, 400],
        ["bangun", "Perbelanjaan pembangunan", 0, 150]
      ].forEach(function (x) {
        j[x[0]] = G.julat(K.kawalan, {
          label: x[1],
          min: x[2],
          max: x[3],
          step: 5,
          nilai: st[x[0]],
          fmt: function (v) {
            return "RM" + v + "b";
          },
          ubah: function (v) {
            st[x[0]] = v;
            lukis();
          }
        });
      });
      G.butang(K.kawalan, "Jadikan seimbang", function () {
        st.bangun = E.clamp(st.cukai + st.bukan - st.urus, 0, 150);
        st.urus = st.cukai + st.bukan - st.bangun;
        j.bangun.set(st.bangun);
        j.urus.set(st.urus);
        lukis();
      });
      G.butang(K.kawalan, E.ikon("ulang") + " Set semula", function () {
        Object.assign(st, ASAL);
        for (var k in j) j[k].set(st[k]);
        lukis();
      });
      var plot = G.plot(K.kanvas, { x: [0, 1], y: [0, 1], tinggi: 250, margin: { l: 10, r: 10, t: 10, b: 10 }, aria: "Jongkang-jongket belanjawan negara" });

      function blok(x, yBawah, lebar, nilai, skala, kelas, label, g) {
        var h = nilai * skala;
        svgEl("rect", { x: x - lebar / 2, y: yBawah - h, width: lebar, height: Math.max(0, h - 1.5), rx: 5, class: "g-bar " + kelas }, g);
        if (h > 22 && lebar > label.length * 6.9 + 8) {
          var t = svgEl("text", { x: x, y: yBawah - h / 2 + 4, class: "g-teks pada-bar", "text-anchor": "middle" }, g);
          t.textContent = label;
        }
        return yBawah - h;
      }

      function lukis() {
        plot.kosong();
        var hasil = st.cukai + st.bukan,
          belanja = st.urus + st.bangun;
        var beza = belanja - hasil;
        var W = plot.W;
        var cx = W / 2,
          cy = 170;
        var sempit = W < 420;
        var L = Math.min(W - (sempit ? 40 : 60), 520);
        var sudut = E.clamp((beza / Math.max(hasil, belanja)) * 60, -13, 13);
        var rad = (sudut * Math.PI) / 180;
        var kos = Math.cos(rad),
          sin = Math.sin(rad);
        var kiriX = cx - (L / 2) * kos,
          kiriY = cy - (L / 2) * sin;
        var kananX = cx + (L / 2) * kos,
          kananY = cy + (L / 2) * sin;
        svgEl("path", { d: "M" + cx + " " + (cy + 4) + " L" + (cx - 22) + " " + (cy + 52) + " L" + (cx + 22) + " " + (cy + 52) + " Z", class: "g-bar lembut" }, plot.lapis.latar);
        svgEl("line", { x1: 30, y1: cy + 52, x2: W - 30, y2: cy + 52, class: "g-paksi" }, plot.lapis.latar);
        svgEl("line", { x1: kiriX, y1: kiriY, x2: kananX, y2: kananY, class: "g-lengkung c6" }, plot.lapis.lengkung);
        svgEl("circle", { cx: cx, cy: cy, r: 5, class: "g-nod isi" }, plot.lapis.tanda);
        var skala = 120 / Math.max(hasil, belanja, 1);
        var lebar = Math.min(110, L * (sempit ? 0.32 : 0.28));
        var gK = svgEl("g", { transform: "rotate(" + sudut + " " + kiriX + " " + kiriY + ")" }, plot.lapis.kawasan);
        var y1 = blok(kiriX + lebar / 2 + 4, kiriY - 2, lebar, st.cukai, skala, "c3", "Cukai", gK);
        var y2 = blok(kiriX + lebar / 2 + 4, y1, lebar, st.bukan, skala, "c3 lembut", sempit ? "Lain" : "Bukan cukai", gK);
        var gN = svgEl("g", { transform: "rotate(" + sudut + " " + kananX + " " + kananY + ")" }, plot.lapis.kawasan);
        var y3 = blok(kananX - lebar / 2 - 4, kananY - 2, lebar, st.urus, skala, "s", "Mengurus", gN);
        var y4 = blok(kananX - lebar / 2 - 4, y3, lebar, st.bangun, skala, "c4", sempit ? "Bangun" : "Pembangunan", gN);
        var tK = svgEl("text", { x: kiriX + lebar / 2 + 4, y: y2 - 8, class: "g-teks", "text-anchor": "middle", transform: "rotate(" + sudut + " " + kiriX + " " + kiriY + ")" }, plot.lapis.label);
        tK.textContent = "Hasil RM" + hasil + "b";
        var tN = svgEl("text", { x: kananX - lebar / 2 - 4, y: y4 - 8, class: "g-teks", "text-anchor": "middle", transform: "rotate(" + sudut + " " + kananX + " " + kananY + ")" }, plot.lapis.label);
        tN.textContent = (sempit ? "Belanja RM" : "Perbelanjaan RM") + belanja + "b";
        var status, kelas;
        if (Math.abs(beza) < 0.5) {
          status = "Belanjawan seimbang";
          kelas = "neutral";
        } else if (beza > 0) {
          status = "Belanjawan defisit";
          kelas = "buruk";
        } else {
          status = "Belanjawan lebihan";
          kelas = "baik";
        }
        var ayat;
        if (kelas === "neutral") ayat = "Jumlah hasil kerajaan <b>sama dengan</b> jumlah perbelanjaan kerajaan.";
        else if (kelas === "buruk")
          ayat =
            "Jumlah hasil <b>kurang daripada</b> jumlah perbelanjaan sebanyak RM" + beza + " bilion (" + E.fmt((beza / KDNK) * 100, 1) + "% daripada KDNK). Defisit dibiayai melalui <b>pinjaman</b> dalam atau luar negeri. Belanjawan defisit digunakan dalam dasar fiskal <b>mengembang</b> untuk merangsang ekonomi ketika kemelesetan.";
        else ayat = "Jumlah hasil <b>melebihi</b> jumlah perbelanjaan sebanyak RM" + -beza + " bilion. Belanjawan lebihan digunakan dalam dasar fiskal <b>menguncup</b> untuk mengawal inflasi; lebihan boleh digunakan untuk membayar hutang.";
        K.baca.innerHTML =
          G.nilai([
            ["Hasil kerajaan", "RM" + hasil + "b", "c3"],
            ["Perbelanjaan kerajaan", "RM" + belanja + "b", "s"],
            [beza > 0 ? "Defisit" : beza < 0 ? "Lebihan" : "Baki", "RM" + Math.abs(beza) + "b", ""]
          ]) +
          '<div class="ayat"><span class="status ' + kelas + '">' + status + "</span> " + ayat + " Perbelanjaan mengurus (emolumen, pencen, subsidi, bayaran khidmat hutang) berulang setiap tahun; perbelanjaan pembangunan untuk projek seperti infrastruktur, sekolah dan hospital." + CONTOH + "</div>";
      }

      lukis();
      var henti = G.pantauSaiz(K.kanvas, function () {
        plot.ukur();
        lukis();
      });
      return { musnah: henti };
    },
    { tajuk: "Belanjawan negara", bab: "t5-b1" }
  );

  /* =========================================================
     BAB 1 · Jenis cukai: progresif, regresif, berkadar malar
     ========================================================= */
  G.daftar(
    "kadar-cukai",
    function (host, opt) {
      var K = G.kad(host, { tajuk: opt.tajuk || "Cukai progresif, regresif dan berkadar malar", petunjuk: "Gerakkan tetikus atau seret nod pendapatan" });
      var BRAKET = [
        [0, 20, 0],
        [20, 50, 5],
        [50, 100, 15],
        [100, Infinity, 25]
      ];
      var TETAP = 1.5; // RM ribu setahun (cukai regresif contoh)
      var MALAR = 10;
      function cukaiProgresif(y) {
        var c = 0;
        BRAKET.forEach(function (b) {
          if (y > b[0]) c += ((Math.min(y, b[1]) - b[0]) * b[2]) / 100;
        });
        return c;
      }
      var S = [
        { id: "p", nama: "Progresif", kelas: "s", warna: "c-s", f: function (y) { return y > 0 ? (cukaiProgresif(y) / y) * 100 : 0; } },
        { id: "r", nama: "Regresif", kelas: "d", warna: "c-d", f: function (y) { return y > 0 ? (TETAP / y) * 100 : 0; } },
        { id: "m", nama: "Berkadar malar", kelas: "c3", warna: "c-3", f: function () { return MALAR; } }
      ];
      var st = { y: 60 };
      G.legenda(K.kawalan, S, function () {
        lukis();
      });
      var plot = G.plot(K.kanvas, {
        x: [0, 210],
        y: [0, 32],
        tikX: [0, 50, 100, 150, 200],
        tikY: [0, 5, 10, 15, 20, 25, 30],
        labelX: "Pendapatan (RM ribu setahun)",
        labelY: "Kadar cukai purata (%)",
        nisbah: function (w) {
          return w < 480 ? 0.9 : 0.56;
        },
        aria: "Graf kadar cukai purata mengikut pendapatan"
      });

      function lukis() {
        plot.kosong();
        plot.paksi();
        S.forEach(function (s) {
          if (s.tunjuk === false) return;
          plot.fungsi(s.f, s.id === "r" ? 4.7 : 0.5, 205, "g-lengkung " + s.kelas, "lengkung", 200);
          var yl = s.id === "r" ? 190 : 200;
          plot.teks(yl, s.f(yl), s.nama, "g-teks " + s.kelas, "end", "label", -4, s.id === "m" ? -8 : s.id === "p" ? -8 : -8);
        });
        var y = st.y;
        plot.garisPx(plot.X(y), plot.atas(), plot.X(y), plot.bawah(), "g-garis-silang", "panduan");
        S.forEach(function (s) {
          if (s.tunjuk === false) return;
          var v = s.f(y);
          if (v <= 32) plot.nod(y, v, { kelas: s.kelas, r: 5.5, lapis: "atas" });
        });
        pemegang(plot, plot.X(y), plot.bawah(), "y", "", 7);
        plot.cip(plot.X(y), plot.bawah() + 14, "RM" + E.fmt(y, 0) + " ribu", { anchor: "middle" });
        var cp = cukaiProgresif(y) * 1000,
          cr = TETAP * 1000,
          cm = y * 10 * MALAR;
        K.baca.innerHTML =
          G.nilai([
            ["Pendapatan", "RM" + E.fmt(y * 1000, 0), ""],
            ["Progresif", E.rm(cp, 0) + " (" + E.fmt((cp / (y * 1000)) * 100, 1) + "%)", "s"],
            ["Regresif", E.rm(cr, 0) + " (" + E.fmt((cr / (y * 1000)) * 100, 1) + "%)", "d"],
            ["Berkadar malar", E.rm(cm, 0) + " (" + MALAR + "%)", "c3"]
          ]) +
          '<div class="ayat"><b>Progresif</b>: kadar cukai semakin tinggi apabila pendapatan bertambah (contoh: cukai pendapatan individu). <b>Regresif</b>: kadar cukai semakin menurun apabila pendapatan bertambah, jadi golongan berpendapatan rendah menanggung peratusan lebih besar. <b>Berkadar malar</b>: kadar tetap walaupun pendapatan berubah (contoh: cukai pendapatan syarikat). ' +
          "Di sini kadar cukai purata = jumlah cukai ÷ pendapatan × 100. Struktur progresif contoh: RM0–20 ribu 0%, RM20–50 ribu 5%, RM50–100 ribu 15%, melebihi RM100 ribu 25%; regresif contoh: RM1 500 setahun untuk semua; malar contoh: " + MALAR + "%." + CONTOH + "</div>";
      }

      function letak(x) {
        st.y = E.clamp(Math.round(x), 5, 205);
        lukis();
      }
      G.interaksi(plot, {
        seret: function (n, pt) {
          if (n === "y" && pt.x != null) letak(pt.x);
        },
        hover: function (pt) {
          letak(pt.x);
        },
        tekan: function (pt) {
          letak(pt.x);
        },
        tekanSeret: true,
        kekunci: function (k) {
          letak(st.y + (k.dx || k.dy) * 2);
        }
      });

      lukis();
      var henti = G.pantauSaiz(K.kanvas, function () {
        plot.ukur();
        lukis();
      });
      return { musnah: henti };
    },
    { tajuk: "Jenis cukai", bab: "t5-b1" }
  );

  /* =========================================================
     BAB 1 · Kadar faedah, pelaburan & tabungan
     ========================================================= */
  G.daftar(
    "kadar-faedah",
    function (host, opt) {
      var K = G.kad(host, { tajuk: opt.tajuk || "Kadar faedah, pelaburan dan tabungan", petunjuk: "Seret garis kadar faedah ke atas atau bawah" });
      var st = { r: 3 };
      var I = function (r) {
        return (9 - r) / 0.04;
      };
      var S = function (r) {
        return (r - 1) / 0.04;
      };
      var plot = G.plot(K.kanvas, {
        x: [0, 220],
        y: [0, 10],
        tikX: [0, 50, 100, 150, 200],
        tikY: [0, 2, 4, 6, 8, 10],
        labelX: "Nilai (RM bilion)",
        labelY: "Kadar faedah (%)",
        nisbah: function (w) {
          return w < 480 ? 0.9 : 0.56;
        },
        aria: "Graf kadar faedah, pelaburan dan tabungan"
      });

      function lukis() {
        plot.kosong();
        plot.paksi();
        plot.fungsiY(I, 0.5, 9.5, "g-lengkung d", "lengkung");
        plot.fungsiY(S, 1.2, 9.6, "g-lengkung c3", "lengkung");
        plot.teks(I(1), 1, "Pelaburan", "g-teks d", "end", "label", -6, -8);
        plot.teks(S(9.2), 9.2, "Tabungan", "g-teks c3", "end", "label", -8, 4);
        var r = st.r;
        var py = plot.Y(r);
        svgEl("line", { x1: plot.kiri(), y1: py, x2: plot.kanan(), y2: py, class: "g-garis-harga" }, plot.lapis.panduan);
        var g = svgEl("g", { "data-pegang": "r", class: "g-pemegang", style: "touch-action:none" }, plot.lapis.pemegang);
        svgEl("line", { x1: plot.kiri(), y1: py, x2: plot.kanan(), y2: py, class: "g-garis-hit" }, g);
        svgEl("circle", { cx: plot.kanan() - 6, cy: py, r: 15, class: "g-nod-halo" }, g);
        svgEl("circle", { cx: plot.kanan() - 6, cy: py, r: 8, class: "g-nod" }, g);
        plot.cip(plot.kiri() - 4, py, E.fmt(r, 2, true) + "%", { anchor: "end" });
        var i = I(r),
          s = S(r);
        if (i <= 220) {
          plot.garisPx(plot.X(i), py, plot.X(i), plot.bawah(), "g-panduan", "panduan");
          plot.nod(i, r, { kelas: "d isi", r: 6 });
          plot.cip(plot.X(i), plot.bawah() + 12, "I " + E.fmt(i, 0), { anchor: "middle", warna: "var(--c-d)" });
        }
        if (s >= 0 && s <= 220) {
          plot.garisPx(plot.X(s), py, plot.X(s), plot.bawah(), "g-panduan", "panduan");
          plot.nod(s, r, { kelas: "c3 isi", r: 6 });
          plot.cip(plot.X(s), plot.bawah() + 12, "S " + E.fmt(s, 0), { anchor: "middle", warna: "var(--c-3)" });
        }
        var ayat =
          r < 4.5
            ? "Kadar faedah <b>rendah</b>: kos pinjaman murah, maka pelaburan dan pembelian secara kredit meningkat, tetapi ganjaran menabung rendah. Inilah tujuan <b>dasar kewangan mengembang</b> ketika kemelesetan."
            : r > 5.5
              ? "Kadar faedah <b>tinggi</b>: kos pinjaman mahal, maka pelaburan berkurang, manakala tabungan meningkat kerana ganjaran menabung tinggi. Inilah tujuan <b>dasar kewangan menguncup</b> untuk mengawal inflasi."
              : "Pada kadar faedah sederhana, pelaburan dan tabungan hampir sama.";
        K.baca.innerHTML =
          G.nilai([
            ["Kadar faedah", E.fmt(r, 2, true) + "%", ""],
            ["Pelaburan", "RM" + E.fmt(i, 0) + " b", "d"],
            ["Tabungan", "RM" + E.fmt(Math.max(0, s), 0) + " b", "c3"]
          ]) +
          '<div class="ayat">Kadar faedah ialah kos yang ditanggung oleh peminjam untuk membuat pinjaman. Hubungan kadar faedah dengan pelaburan adalah <b>negatif</b>, dengan tabungan adalah <b>positif</b>. ' + ayat + CONTOH + "</div>";
      }

      G.interaksi(plot, {
        seret: function (n, pt) {
          if (n === "r" && pt.y != null) {
            st.r = E.clamp(Math.round(pt.y * 4) / 4, 1.25, 8.75);
            lukis();
          }
        },
        kekunci: function (k) {
          st.r = E.clamp(st.r + (k.dy || k.dx) * 0.25, 1.25, 8.75);
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
    { tajuk: "Kadar faedah", bab: "t5-b1" }
  );

  /* =========================================================
     BAB 2 · Faedah berbanding (dua negara, dua barang)
     ========================================================= */
  G.daftar(
    "faedah-berbanding",
    function (host, opt) {
      var K = G.kad(host, { tajuk: opt.tajuk || "Faedah berbanding: Negara A dan Negara B", petunjuk: "Seret hujung keluk pada paksi" });
      var ASAL = { ax: 120, ay: 90, bx: 40, by: 60 };
      var st = Object.assign({}, ASAL);
      G.butang(K.kawalan, E.ikon("ulang") + " Set semula", function () {
        Object.assign(st, ASAL);
        lukis();
      });
      var plot = G.plot(K.kanvas, {
        x: [0, 160],
        y: [0, 120],
        tikX: [0, 40, 80, 120, 160],
        tikY: [0, 30, 60, 90, 120],
        labelX: "Getah (tan)",
        labelY: "Beras (tan)",
        nisbah: function (w) {
          return w < 480 ? 0.9 : 0.6;
        },
        aria: "Keluk kemungkinan pengeluaran dua negara"
      });

      function lukis() {
        plot.kosong();
        plot.paksi();
        plot.laluan([[0, st.ay], [st.ax, 0]], "g-lengkung d", "lengkung");
        plot.laluan([[0, st.by], [st.bx, 0]], "g-lengkung s", "lengkung");
        plot.teks(st.ax * 0.5, st.ay * 0.5, "Negara A", "g-teks d", "start", "label", 8, -6);
        plot.teks(st.bx * 0.5, st.by * 0.5, "Negara B", "g-teks s", "start", "label", 8, -6);
        plot.nod(st.ax, 0, { pegang: "ax", kelas: "d" });
        plot.nod(0, st.ay, { pegang: "ay", kelas: "d" });
        plot.nod(st.bx, 0, { pegang: "bx", kelas: "s" });
        plot.nod(0, st.by, { pegang: "by", kelas: "s" });
        plot.cip(plot.X(st.ax), plot.bawah() + 12, String(st.ax), { anchor: "middle", warna: "var(--c-d)" });
        plot.cip(plot.X(st.bx), plot.bawah() + 12, String(st.bx), { anchor: "middle", warna: "var(--c-s)" });
        plot.cip(plot.kiri() - 4, plot.Y(st.ay), String(st.ay), { anchor: "end", warna: "var(--c-d)" });
        plot.cip(plot.kiri() - 4, plot.Y(st.by), String(st.by), { anchor: "end", warna: "var(--c-s)" });
        baca();
      }

      function baca() {
        var aG = st.ay / st.ax,
          bG = st.by / st.bx; // kos lepas 1 getah (dalam beras)
        var aB = st.ax / st.ay,
          bB = st.bx / st.by; // kos lepas 1 beras (dalam getah)
        var getah = Math.abs(aG - bG) < 1e-9 ? null : aG < bG ? "A" : "B";
        var beras = getah ? (getah === "A" ? "B" : "A") : null;
        var mutlakG = st.ax === st.bx ? "tiada" : st.ax > st.bx ? "Negara A" : "Negara B";
        var mutlakB = st.ay === st.by ? "tiada" : st.ay > st.by ? "Negara A" : "Negara B";
        var ayat;
        if (!getah) {
          ayat = "Kos lepas kedua-dua negara sama, maka <b>tiada faedah berbanding</b> dan tiada keuntungan daripada pengkhususan dan perdagangan.";
        } else {
          var lo = Math.min(aG, bG),
            hi = Math.max(aG, bG);
          ayat =
            "Negara " + getah + " mempunyai kos lepas getah yang lebih rendah, maka mempunyai <b>faedah berbanding dalam getah</b>. Negara " + beras + " mempunyai <b>faedah berbanding dalam beras</b>. " +
            "Kedua-dua negara untung jika Negara " + getah + " mengkhusus dalam getah, Negara " + beras + " dalam beras, lalu berdagang pada terma antara <b>" + E.fmt(lo, 2) + " hingga " + E.fmt(hi, 2) + " tan beras bagi 1 tan getah</b>. " +
            "Faedah mutlak: getah → " + mutlakG + ", beras → " + mutlakB + (mutlakG === mutlakB && mutlakG !== "tiada" ? " (walaupun " + mutlakG + " lebih cekap dalam kedua-dua barang, perdagangan tetap menguntungkan)." : ".");
        }
        K.baca.innerHTML =
          '<div class="jadual"><table><thead><tr><th>Negara</th><th class="n">Getah maks</th><th class="n">Beras maks</th><th class="n">Kos lepas 1 tan getah</th><th class="n">Kos lepas 1 tan beras</th></tr></thead><tbody>' +
          '<tr><td><b style="color:var(--c-d)">A</b></td><td class="n">' + st.ax + '</td><td class="n">' + st.ay + '</td><td class="n">' + E.fmt(aG, 2) + ' tan beras</td><td class="n">' + E.fmt(aB, 2) + " tan getah</td></tr>" +
          '<tr><td><b style="color:var(--c-s)">B</b></td><td class="n">' + st.bx + '</td><td class="n">' + st.by + '</td><td class="n">' + E.fmt(bG, 2) + ' tan beras</td><td class="n">' + E.fmt(bB, 2) + " tan getah</td></tr>" +
          "</tbody></table></div>" +
          '<div class="ayat">' + ayat + " Faedah berbanding wujud apabila sesebuah negara sanggup mengeluarkan sesuatu barang dengan kos lepas yang lebih rendah berbanding negara lain.</div>";
      }

      G.interaksi(plot, {
        seret: function (n, pt) {
          if (pt.x == null) return;
          if (n === "ax" || n === "bx") st[n] = E.clamp(Math.round(pt.x / 5) * 5, 10, 155);
          else if (n === "ay" || n === "by") st[n] = E.clamp(Math.round(pt.y / 5) * 5, 10, 115);
          else return;
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
    { tajuk: "Faedah berbanding", bab: "t5-b2" }
  );

  /* =========================================================
     BAB 2 · Akaun semasa imbangan pembayaran (air terjun)
     ========================================================= */
  G.daftar(
    "akaun-semasa",
    function (host, opt) {
      var K = G.kad(host, { tajuk: opt.tajuk || "Akaun semasa dalam imbangan pembayaran", petunjuk: "Seret hujung setiap bar ke atas atau bawah" });
      var KOMP = [
        { id: "barang", nama: "Akaun barangan", pendek: "Barangan", nota: "eksport − import barang nampak (imbangan dagangan)" },
        { id: "khidmat", nama: "Akaun perkhidmatan", pendek: "Perkhidmatan", nota: "pengangkutan, insurans, pelancongan dan lain-lain (barang tak nampak)" },
        { id: "primer", nama: "Pendapatan primer", pendek: "Primer", nota: "pampasan pekerja dan pendapatan pelaburan seperti dividen, faedah dan keuntungan" },
        { id: "sekunder", nama: "Pendapatan sekunder", pendek: "Sekunder", nota: "bayaran pindahan seperti kiriman wang pekerja asing dan bantuan" }
      ];
      // Jadual 2.5 buku teks: imbangan pembayaran Malaysia 2016 (RM bilion)
      var ASAL = { barang: 101.4, khidmat: -19.1, primer: -34.6, sekunder: -18.6 };
      var st = Object.assign({}, ASAL);
      G.butang(K.kawalan, "Pelancong asing bertambah", function () {
        st.khidmat = ASAL.khidmat + 25;
        lukis();
      });
      G.butang(K.kawalan, "Harga komoditi jatuh", function () {
        st.barang = ASAL.barang - 70;
        lukis();
      });
      G.butang(K.kawalan, E.ikon("ulang") + " Set semula", function () {
        Object.assign(st, ASAL);
        lukis();
      });
      var plot = G.plot(K.kanvas, {
        x: [0, 5],
        y: [-150, 250],
        tikY: [-150, -100, -50, 0, 50, 100, 150, 200, 250],
        labelY: "RM bilion",
        asalan: false,
        paksiXBawah: true,
        nisbah: function (w) {
          return w < 480 ? 0.95 : 0.58;
        },
        margin: { l: 52 },
        aria: "Carta air terjun akaun semasa"
      });

      function lukis() {
        plot.kosong();
        plot.paksi({ tikY: plot.cfg.tikY, labelY: "RM bilion", asalan: false, paksiXBawah: true, grid: true });
        plot.garis(0, 0, 5, 0, "g-garis-sifar", "grid");
        var kum = 0,
          lebar = 0.6;
        KOMP.forEach(function (k, i) {
          var x = i + 0.5,
            v = st[k.id];
          var dari = kum,
            ke = kum + v;
          plot.segi(x - lebar / 2, Math.min(dari, ke), x + lebar / 2, Math.max(dari, ke), "g-bar " + (v >= 0 ? "c3" : "s"), "kawasan");
          plot.garis(x + lebar / 2, ke, x + 1 - lebar / 2, ke, "g-panduan", "panduan");
          plot.teks(x, Math.max(dari, ke), (v >= 0 ? "+" : "−") + E.fmt(Math.abs(v), 1), "g-teks " + (v >= 0 ? "c3" : "s"), "middle", "label", 0, v >= 0 ? -24 : -8);
          plot.teksPx(plot.X(x), plot.bawah() + 17, plot.sempit ? k.pendek.slice(0, 7) : k.pendek, "g-tik", "middle", "paksi");
          pemegang(plot, plot.X(x), plot.Y(ke), k.id, v >= 0 ? "c3" : "s", 7);
          kum = ke;
        });
        var xT = 4.5;
        plot.segi(xT - lebar / 2, Math.min(0, kum), xT + lebar / 2, Math.max(0, kum), "g-bar " + (kum >= 0 ? "baik" : "buruk"), "kawasan");
        plot.teks(xT, Math.max(0, kum), (kum >= 0 ? "+" : "−") + E.fmt(Math.abs(kum), 1), "g-teks besar", "middle", "label", 0, -8);
        plot.teksPx(plot.X(xT), plot.bawah() + 17, "Baki", "g-tik", "middle", "paksi");
        var lebih = kum > 0,
          sama = kum === 0;
        K.baca.innerHTML =
          G.nilai(
            KOMP.map(function (k) {
              return [k.pendek, (st[k.id] >= 0 ? "+" : "−") + E.fmt(Math.abs(st[k.id]), 1), st[k.id] >= 0 ? "c3" : "s"];
            }).concat([["Baki akaun semasa", (kum >= 0 ? "+" : "−") + "RM" + E.fmt(Math.abs(kum), 1) + "b", kum >= 0 ? "c3" : "s"]])
          ) +
          '<div class="ayat">' +
          (sama ? '<span class="status neutral">Seimbang</span> ' : lebih ? '<span class="status baik">Lebihan akaun semasa</span> Jumlah penerimaan melebihi jumlah pembayaran. ' : '<span class="status buruk">Defisit akaun semasa</span> Jumlah pembayaran melebihi jumlah penerimaan. ') +
          "Baki akaun semasa = akaun barangan + akaun perkhidmatan + pendapatan primer + pendapatan sekunder. " +
          KOMP.map(function (k) {
            return "<b>" + k.nama + "</b>: " + k.nota;
          }).join("; ") +
          ". <span class=\"teks-lemah\">(Data asal: Jadual 2.5 buku teks, tahun 2016. Seret bar untuk menguji keadaan lain.)</span></div>";
      }

      G.interaksi(plot, {
        seret: function (n, pt) {
          if (pt.y == null) return;
          var kum = 0;
          for (var i = 0; i < KOMP.length; i++) {
            if (KOMP[i].id === n) {
              st[n] = E.clamp(Math.round((pt.y - kum) / 5) * 5, -150, 220);
              lukis();
              return;
            }
            kum += st[KOMP[i].id];
          }
        }
      });

      lukis();
      var henti = G.pantauSaiz(K.kanvas, function () {
        plot.ukur();
        lukis();
      });
      return { musnah: henti };
    },
    { tajuk: "Akaun semasa", bab: "t5-b2" }
  );

  /* =========================================================
     BAB 2 · Penukaran mata wang: harga belian & harga jualan
     ========================================================= */
  // Jadual 2.8 buku teks: kadar Bank Negara Malaysia, 3 Februari 2017 (0900)
  var KADAR = [
    { kod: "USD", nama: "Dolar Amerika", unit: 1, beli: 4.425, jual: 4.429 },
    { kod: "SGD", nama: "Dolar Singapura", unit: 1, beli: 3.1307, jual: 3.1345 },
    { kod: "AUD", nama: "Dolar Australia", unit: 1, beli: 3.3851, jual: 3.3891 },
    { kod: "EUR", nama: "Euro", unit: 1, beli: 4.7613, jual: 4.7674 },
    { kod: "GBP", nama: "Paun Sterling", unit: 1, beli: 5.5397, jual: 5.5464 },
    { kod: "CNY", nama: "Renminbi China", unit: 1, beli: 0.6426, jual: 0.644 },
    { kod: "JPY", nama: "Yen Jepun", unit: 100, beli: 3.917, jual: 3.9233 },
    { kod: "THB", nama: "Baht Thailand", unit: 100, beli: 12.6054, jual: 12.6215 },
    { kod: "IDR", nama: "Rupiah Indonesia", unit: 100, beli: 0.0331, jual: 0.0332 }
  ];

  G.daftar(
    "penukar",
    function (host, opt) {
      var K = G.kad(host, { tajuk: opt.tajuk || "Penukaran mata wang: harga belian dan harga jualan", petunjuk: "Pilih mata wang dan arah pertukaran" });
      var st = { i: 0, arah: "beli", rm: 796500, asing: 36000 };
      var pil = G.pilih(K.kawalan, {
        label: "Mata wang asing",
        kumpulan: [
          {
            pilihan: KADAR.map(function (k, i) {
              return [String(i), k.kod + " · " + k.nama + (k.unit > 1 ? " (per " + k.unit + ")" : "")];
            })
          }
        ],
        ubah: function (v) {
          st.i = parseInt(v, 10);
          lukis();
        }
      });
      pil.set(String(st.i));
      G.segmen(
        K.kawalan,
        [
          ["beli", "Saya beli mata wang asing"],
          ["jual", "Saya jual mata wang asing"]
        ],
        st.arah,
        function (v) {
          st.arah = v;
          medan.el.querySelector("span").innerHTML = v === "beli" ? "Jumlah ringgit (RM)" : "Jumlah mata wang asing";
          medan.set(v === "beli" ? st.rm : st.asing);
          lukis();
        }
      );
      var grid = G.gridMedan(K.kawalan);
      var medan = G.medan(grid, {
        label: "Jumlah ringgit (RM)",
        nilai: st.rm,
        min: 0,
        max: 10000000,
        step: 10,
        ubah: function (v) {
          if (st.arah === "beli") st.rm = v;
          else st.asing = v;
          lukis();
        }
      });
      var plot = G.plot(K.kanvas, { x: [0, 1], y: [0, 1], tinggi: 128, margin: { l: 24, r: 24, t: 14, b: 14 }, aria: "Julat harga belian dan harga jualan" });

      function lukis() {
        plot.kosong();
        var k = KADAR[st.i];
        var lo = k.beli * 0.97,
          hi = k.jual * 1.03;
        plot.julat([lo, hi], [0, 1]);
        var y = 64;
        var xB = plot.X(k.beli),
          xJ = plot.X(k.jual);
        svgEl("line", { x1: plot.kiri(), y1: y, x2: plot.kanan(), y2: y, class: "g-trek" }, plot.lapis.latar);
        svgEl("line", { x1: xB, y1: y, x2: xJ, y2: y, class: "g-trek-isi", style: "stroke:var(--c-4)" }, plot.lapis.tanda);
        svgEl("circle", { cx: xB, cy: y, r: 8, class: "g-nod isi c3" }, plot.lapis.tanda);
        svgEl("circle", { cx: xJ, cy: y, r: 8, class: "g-nod isi s" }, plot.lapis.tanda);
        teksPx(plot, xB, y - 18, "Harga belian RM" + E.fmt(k.beli, 4, true), "g-teks c3", "end");
        teksPx(plot, xJ, y - 18, "Harga jualan RM" + E.fmt(k.jual, 4, true), "g-teks s", "start");
        teksPx(plot, (xB + xJ) / 2, y + 28, "margin pengurup wang RM" + E.fmt(k.jual - k.beli, 4, true), "g-teks c4", "middle");
        var unitTeks = k.unit > 1 ? k.unit + " " + k.kod : "1 " + k.kod;
        var hasil, ayat;
        if (st.arah === "beli") {
          hasil = (st.rm / k.jual) * k.unit;
          ayat =
            "Anda <b>membeli</b> " + k.kod + ", jadi pengurup wang <b>menjual</b> mata wang asing kepada anda pada <b>harga jualan</b> RM" + E.fmt(k.jual, 4, true) + " bagi " + unitTeks + ". " +
            E.rm(st.rm, 2, true) + " ÷ " + E.fmt(k.jual, 4, true) + (k.unit > 1 ? " × " + k.unit : "") + " = <b>" + E.fmt(hasil, 2, true) + " " + k.kod + "</b>.";
        } else {
          hasil = (st.asing / k.unit) * k.beli;
          ayat =
            "Anda <b>menjual</b> " + k.kod + ", jadi pengurup wang <b>membeli</b> mata wang asing daripada anda pada <b>harga belian</b> RM" + E.fmt(k.beli, 4, true) + " bagi " + unitTeks + ". " +
            E.fmt(st.asing, 2, true) + " " + k.kod + (k.unit > 1 ? " ÷ " + k.unit : "") + " × " + E.fmt(k.beli, 4, true) + " = <b>" + E.rm(hasil, 2, true) + "</b>.";
        }
        var pusing = st.arah === "beli" ? (hasil / k.unit) * k.beli : null;
        K.baca.innerHTML =
          G.nilai([
            [st.arah === "beli" ? "Anda bayar" : "Anda serah", st.arah === "beli" ? E.rm(st.rm, 2, true) : E.fmt(st.asing, 2, true) + " " + k.kod, ""],
            ["Anda terima", st.arah === "beli" ? E.fmt(hasil, 2, true) + " " + k.kod : E.rm(hasil, 2, true), "c3"]
          ]) +
          '<div class="ayat">' + ayat +
          (pusing != null ? " Jika ditukar semula serta-merta, anda hanya mendapat " + E.rm(pusing, 2, true) + ": perbezaan harga jualan dan harga belian ialah keuntungan pengurup wang." : "") +
          ' <span class="teks-lemah">(Kadar BNM 3 Februari 2017 daripada Jadual 2.8 buku teks, bukan kadar semasa.)</span></div>';
      }

      lukis();
      var henti = G.pantauSaiz(K.kanvas, function () {
        plot.ukur();
        lukis();
      });
      return { musnah: henti };
    },
    { tajuk: "Penukaran mata wang", bab: "t5-b2" }
  );
  /* =========================================================
     BAB 2 · Kesan tarif, subsidi dan kuota (Rajah 2.5 – 2.7)
     Model: DD: Q = 100 − P; penawaran tempatan S₀: Q = P − 10;
     penawaran import sebelum dasar: Q = 1.6(P − 10).
     ========================================================= */
  // Label paksi yang bertingkat supaya tidak bertindih
  function cipBertingkat(plot, senarai, paksi) {
    var baris = [[], []];
    senarai
      .slice()
      .sort(function (a, b) {
        return paksi === "x" ? a.px - b.px : b.px - a.px;
      })
      .forEach(function (c) {
        var lebar = String(c.teks).length * 6.7 + 14;
        var r = 0;
        var akhir = baris[0][baris[0].length - 1];
        if (akhir != null && Math.abs(c.px - akhir) < (paksi === "x" ? lebar + 2 : 22)) r = 1;
        baris[r].push(c.px);
        if (paksi === "x") plot.cip(c.px, plot.bawah() + 12 + r * 22, c.teks, { anchor: "middle", kelas: c.kelas });
        else plot.cip(plot.kiri() - 4 - r * 34, c.px, c.teks, { anchor: "end", kelas: c.kelas });
      });
  }

  G.daftar(
    "sekatan-import",
    function (host, opt) {
      var K = G.kad(host, {
        tajuk: opt.tajuk || "Kesan tarif, subsidi dan kuota terhadap perdagangan antarabangsa",
        petunjuk: "Pilih dasar, kemudian seret nod pada keluk S₂"
      });
      var DS = {
        tarif: { nama: "Tarif", barang: "kereta", min: 0, max: 35, step: 2.5, rajah: "Rajah 2.5" },
        subsidi: { nama: "Subsidi", barang: "tepung gandum", min: 0, max: 30, step: 1, rajah: "Rajah 2.6" },
        kuota: { nama: "Kuota import", barang: "kereta", min: 0, max: 40, step: 2, rajah: "Rajah 2.7" }
      };
      var AWAL = { tarif: 22.5, subsidi: 18, kuota: 20 };
      var st = { d: DS[opt.dasar] ? opt.dasar : "tarif", v: Object.assign({}, AWAL) };

      G.segmen(
        K.kawalan,
        [
          ["tarif", "Tarif"],
          ["subsidi", "Subsidi"],
          ["kuota", "Kuota import"]
        ],
        st.d,
        function (v) {
          st.d = v;
          var ds = DS[v];
          julat.el.querySelector("span").textContent = labelJulat();
          julat.input.min = ds.min;
          julat.input.max = ds.max;
          julat.input.step = ds.step;
          julat.set(st.v[v]);
          lukis();
        }
      );
      var julat = G.julat(K.kawalan, {
        label: labelJulat(),
        min: DS[st.d].min,
        max: DS[st.d].max,
        step: DS[st.d].step,
        nilai: st.v[st.d],
        fmt: function (v) {
          if (st.d === "tarif") return fmtP(kira("tarif", v).P2 - 35);
          if (st.d === "subsidi") return "RM" + E.fmt(v / 10, 2, true);
          return E.fmt(v, 0) + " ribu";
        },
        ubah: function (v) {
          st.v[st.d] = v;
          lukis();
        }
      });
      G.butang(K.kawalan, E.ikon("ulang") + " Set semula", function () {
        st.v[st.d] = AWAL[st.d];
        julat.set(st.v[st.d]);
        lukis();
      });

      function labelJulat() {
        return st.d === "tarif" ? "Tarif P₁P₂" : st.d === "subsidi" ? "Subsidi seunit" : "Kuota import";
      }
      function kereta() {
        return st.d !== "subsidi";
      }
      function fmtP(p) {
        return kereta() ? "RM" + E.fmt(p, 1) + " ribu" : "RM" + E.fmt(p / 10, 2, true);
      }
      function fmtQ(q) {
        return E.fmt(q, 1) + (kereta() ? " ribu unit" : " ribu pek");
      }

      // Pengiraan keseimbangan (harga dalam RM ribu bagi kereta; ×0.1 bagi tepung sepek)
      function kira(d, v) {
        var r = { P0: 55, Q0: 45, P1: 35, dom1: 25, jum1: 65, imp1: 40 };
        var P2, dom2, jum2, imp2;
        if (d === "tarif") {
          P2 = (126 + 1.6 * v) / 3.6;
          imp2 = 1.6 * (P2 - v - 10);
          if (imp2 <= 0) {
            P2 = 55;
            imp2 = 0;
          }
          dom2 = P2 - 10;
          jum2 = 100 - P2;
        } else if (d === "subsidi") {
          P2 = (126 - v) / 3.6;
          dom2 = P2 + v - 10;
          jum2 = 100 - P2;
          imp2 = jum2 - dom2;
        } else {
          var kq = Math.min(v, 40);
          P2 = (110 - kq) / 2;
          dom2 = P2 - 10;
          jum2 = 100 - P2;
          imp2 = kq;
        }
        r.P2 = P2;
        r.dom2 = dom2;
        r.jum2 = jum2;
        r.imp2 = imp2;
        return r;
      }

      // Keluk S₂ (kuantiti sebagai fungsi harga)
      function S2Q(p) {
        var v = st.v[st.d];
        if (st.d === "tarif") return p >= 10 + v ? 2.6 * p - 26 - 1.6 * v : NaN;
        if (st.d === "subsidi") return 2.6 * p - 26 + v;
        return p - 10 + v;
      }
      // saiz dasar supaya keluk S₂ melalui titik (q, p) yang diseret
      function magDariQ(q, p) {
        if (st.d === "tarif") return (2.6 * p - 26 - q) / 1.6;
        if (st.d === "subsidi") return q - 2.6 * p + 26;
        return q - p + 10;
      }
      function setMag(v) {
        var ds = DS[st.d];
        st.v[st.d] = E.clamp(Math.round(v / ds.step) * ds.step, ds.min, ds.max);
        julat.set(st.v[st.d]);
        lukis();
      }

      var plot = G.plot(K.kanvas, {
        x: [0, 95],
        y: [0, 105],
        nisbah: function (w) {
          return w < 480 ? 1.2 : 0.72;
        },
        margin: { l: 80, b: 70 },
        aria: "Graf kesan tarif, subsidi dan kuota import"
      });

      function labelPada(fQ, p, teks, kls) {
        var q = fQ(p);
        if (q > 0 && q <= 95 && p > 0 && p <= 105) plot.teks(q, p, teks, "g-teks " + kls, "start", "label", 6, 4);
      }
      function pHujung(fQ, pMaks) {
        // harga tertinggi yang masih dalam julat x
        for (var p = pMaks; p > 0; p -= 0.5) {
          var q = fQ(p);
          if (isFinite(q) && q <= 93) return p;
        }
        return pMaks;
      }

      function lukis() {
        plot.kosong();
        var kr = kereta();
        plot.paksi({
          tikX: [],
          tikY: [0, 20, 40, 60, 80, 100],
          labelX: null,
          labelY: kr ? "Harga (RM ribu)" : "Harga (RM sepek)",
          fmtTikY: kr
            ? null
            : function (v) {
                return E.fmt(v / 10, 0);
              },
          grid: true
        });
        teksPx(plot, plot.kanan() + 8, plot.bawah() + 62, kr ? "Kuantiti kereta (ribu unit)" : "Kuantiti tepung gandum (ribu pek)", "g-label", "end", "paksi");
        var r = kira(st.d, st.v[st.d]);
        var v = st.v[st.d];
        var D = function (p) {
          return 100 - p;
        };
        var S0 = function (p) {
          return p - 10;
        };
        var S1 = function (p) {
          return 2.6 * (p - 10);
        };

        // kawasan hasil kerajaan (tarif): AE₂GH
        if (st.d === "tarif" && r.imp2 > 0.2 && r.P2 - r.P1 > 0.2) {
          plot.segi(r.dom2, r.P1, r.jum2, r.P2, "g-kawasan c4", "kawasan");
          if (!plot.sempit || r.jum2 - r.dom2 > 14) plot.teks((r.dom2 + r.jum2) / 2, (r.P1 + r.P2) / 2, "Hasil kerajaan", "g-teks kecil", "middle", "label", 0, 4);
        }

        // keluk
        plot.fungsiY(D, 5, 100, "g-lengkung d", "lengkung");
        plot.fungsiY(S0, 10, 103, "g-lengkung s", "lengkung");
        plot.fungsiY(S1, 10, pHujung(S1, 103), "g-lengkung c4", "lengkung");
        if (st.d === "subsidi") {
          var S0b = function (p) {
            return p - 10 + v;
          };
          var pS0b = pHujung(S0b, 103);
          plot.fungsiY(S0b, 10, pS0b, "g-lengkung c5 nipis", "hantu");
          plot.teks(S0b(pS0b - 1), pS0b - 1, "S₀′", "g-teks c5", "end", "label", -8, -6);
        }
        var pBawah = st.d === "tarif" ? 10 + v : 10;
        var pAtas = pHujung(S2Q, 103);
        if (v > 0.001) plot.fungsiY(S2Q, pBawah, pAtas, "g-lengkung c3", "lengkung");
        labelPada(D, 12, "D₀", "d");
        labelPada(S0, 96, "S₀", "s");
        labelPada(S1, pHujung(S1, 103) - 2, "S₁", "c4");
        if (v > 0.001) {
          var pL = pHujung(S2Q, 100) - 1;
          plot.teks(S2Q(pL), pL, "S₂", "g-teks c3", "end", "label", -16, -10);
        }

        // garis harga P₀, P₁, P₂
        plot.garis(0, r.P0, r.Q0, r.P0, "g-panduan", "panduan");
        plot.garis(0, r.P1, r.jum1, r.P1, "g-panduan", "panduan");
        if (Math.abs(r.P2 - r.P1) > 0.05) plot.garis(0, r.P2, Math.max(r.jum2, r.dom2), r.P2, "g-panduan", "panduan");

        // garis kuantiti ke paksi
        var qs = [
          { q: r.Q0, p: r.P0, teks: "Q₀", kelas: "lemah" },
          { q: r.dom1, p: r.P1, teks: "Q₁" },
          { q: r.jum1, p: r.P1, teks: st.d === "subsidi" ? "Q₃" : "Q₄" }
        ];
        if (Math.abs(r.P2 - r.P1) > 0.05) {
          qs.push({ q: r.dom2, p: st.d === "subsidi" ? r.P2 : r.P2, teks: "Q₂" });
          qs.push({ q: r.jum2, p: r.P2, teks: st.d === "subsidi" ? "Q₄" : "Q₃" });
        }
        qs.forEach(function (o) {
          plot.garis(o.q, o.p, o.q, 0, "g-panduan", "panduan");
        });
        cipBertingkat(
          plot,
          qs.map(function (o) {
            return { px: plot.X(o.q), teks: o.teks, kelas: o.kelas };
          }),
          "x"
        );
        var ps = [
          { p: r.P0, teks: "P₀", kelas: "lemah" },
          { p: r.P1, teks: "P₁" }
        ];
        if (Math.abs(r.P2 - r.P1) > 0.05) ps.push({ p: r.P2, teks: "P₂" });
        cipBertingkat(
          plot,
          ps.map(function (o) {
            return { px: plot.Y(o.p), teks: o.teks, kelas: o.kelas };
          }),
          "y"
        );

        // kurungan import: segmen pada garis harga, label di atas atau di bawah
        function kurungImport(qa, qb, p, kelas, teks, atas) {
          if (qb - qa < 0.5) return;
          plot.garis(qa, p, qb, p, "g-garis-kurung " + kelas, "tanda");
          plot.garis(qa, p - 1.5, qa, p + 1.5, "g-garis-kurung " + kelas, "tanda");
          plot.garis(qb, p - 1.5, qb, p + 1.5, "g-garis-kurung " + kelas, "tanda");
          if (!plot.sempit || qb - qa > 12) plot.teks((qa + qb) / 2, p, teks, "g-teks kecil " + kelas, "middle", "label", 0, atas ? -7 : 16);
        }
        var ubah = Math.abs(r.P2 - r.P1) > 0.05;
        var subsidi = st.d === "subsidi";
        kurungImport(r.dom1, r.jum1, r.P1, "s", "Import " + E.fmt(r.imp1, 0), subsidi && ubah);
        if (ubah) kurungImport(r.dom2, r.jum2, r.P2, "d", (st.d === "kuota" ? "Kuota " : "Import ") + E.fmt(r.imp2, 0), !subsidi);

        // nod
        plot.nod(r.Q0, r.P0, { r: 5, label: "E₀", kelasLabel: "lemah", dx: 8, dy: -8 });
        plot.nod(r.jum1, r.P1, { r: 5.5, label: "E₁", dx: 8, dy: 16 });
        plot.bulat(r.dom1, r.P1, 4, "g-nod isi s", "tanda");
        if (ubah) {
          plot.nod(r.jum2, r.P2, { kelas: "isi", r: 6, label: "E₂", dx: 8, dy: -8 });
          plot.bulat(r.dom2, r.P2, 4, "g-nod isi c3", "tanda");
          if (st.d === "tarif" && !plot.sempit) {
            plot.teks(r.dom2, r.P2, "A", "g-teks kecil lemah", "end", "label", -5, -6);
            plot.teks(r.dom2, r.P1, "H", "g-teks kecil lemah", "end", "label", -5, 14);
            plot.teks(r.jum2, r.P1, "G", "g-teks kecil lemah", "start", "label", 5, 14);
            plot.teks(r.dom1, r.P1, "B", "g-teks kecil lemah", "end", "label", -5, -6);
          }
        }

        // pemegang di hujung atas keluk S₂ (atau S₁ jika dasar sifar)
        var pH = pHujung(S2Q, 100) - 1;
        var qH = S2Q(pH);
        if (isFinite(qH)) pemegang(plot, plot.X(qH), plot.Y(pH), "s2", "c3", 7.5);

        baca(r);
      }

      function baca(r) {
        var d = st.d,
          ds = DS[d],
          v = st.v[d];
        var brg = ds.barang;
        var hasil, labelHasil;
        if (d === "tarif") {
          hasil = (r.P2 - r.P1) * r.imp2;
          labelHasil = "Hasil tarif (AE₂GH)";
        } else if (d === "subsidi") {
          hasil = (v / 10) * r.dom2;
          labelHasil = "Belanja subsidi";
        }
        var fmtHasil = function (x) {
          return d === "tarif" ? "RM" + E.fmt(x, 0) + " juta" : "RM" + E.fmt(x, 1) + " ribu";
        };
        var bits = [
          ["Harga", fmtP(r.P1) + " → " + fmtP(r.P2), r.P2 > r.P1 + 0.01 ? "s" : r.P2 < r.P1 - 0.01 ? "c3" : ""],
          ["Penawaran tempatan", E.fmt(r.dom1, 1) + " → " + E.fmt(r.dom2, 1), "c3"],
          ["Import", E.fmt(r.imp1, 1) + " → " + E.fmt(r.imp2, 1), "s"]
        ];
        if (hasil != null) bits.push([labelHasil, fmtHasil(hasil), "c4"]);

        var jadual =
          '<div class="jadual"><table><caption>' + ds.rajah + " · perbandingan sebelum dan selepas " + ds.nama.toLowerCase() + "</caption><thead><tr><th>Butiran</th><th class=\"n\">Sebelum (P₁)</th><th class=\"n\">Selepas (P₂)</th></tr></thead><tbody>" +
          "<tr><td>Harga " + brg + '</td><td class="n">' + fmtP(r.P1) + '</td><td class="n">' + fmtP(r.P2) + "</td></tr>" +
          "<tr><td>Jumlah kuantiti diminta</td><td class=\"n\">" + fmtQ(r.jum1) + '</td><td class="n">' + fmtQ(r.jum2) + "</td></tr>" +
          "<tr><td>Penawaran pengeluar tempatan</td><td class=\"n\">" + fmtQ(r.dom1) + '</td><td class="n">' + fmtQ(r.dom2) + "</td></tr>" +
          "<tr><td>Kuantiti diimport</td><td class=\"n\">" + fmtQ(r.imp1) + '</td><td class="n">' + fmtQ(r.imp2) + "</td></tr>" +
          (d === "tarif" ? "<tr><td>Hasil kerajaan (tarif)</td><td class=\"n\">Tiada</td><td class=\"n\">" + fmtHasil(hasil) + "</td></tr>" : "") +
          (d === "subsidi" ? "<tr><td>Perbelanjaan kerajaan (subsidi)</td><td class=\"n\">Tiada</td><td class=\"n\">" + fmtHasil(hasil) + "</td></tr>" : "") +
          (d === "kuota" ? '<tr><td>Hasil kerajaan</td><td class="n">Tiada</td><td class="n">Tiada hasil cukai</td></tr>' : "") +
          "</tbody></table></div>";

        var ayat;
        if (v <= 0.001 || Math.abs(r.P2 - r.P1) < 0.05) {
          ayat =
            (d === "subsidi" ? "S₀′ ialah penawaran pengeluar tempatan selepas subsidi. " : "") + "Selepas perdagangan antarabangsa, keluk penawaran <b>S₁S₁</b> (tempatan + import) bersilang dengan <b>D₀D₀</b> pada E₁. Pada harga P₁, pengeluar tempatan menawarkan 0Q₁ dan selebihnya, <b>" + fmtQ(r.imp1) + "</b>, diimport." +
            (d === "kuota" ? " Kuota ini tidak mengikat kerana had import tidak kurang daripada kuantiti yang diimport." : " Naikkan saiz dasar untuk melihat kesannya.");
        } else if (d === "tarif") {
          ayat =
            '<span class="status buruk">Tarif</span> Tarif sebanyak P₁P₂ menyebabkan keluk penawaran beralih ke kiri daripada S₁S₁ kepada <b>S₂S₂</b>. Harga ' + brg + " naik daripada " + fmtP(r.P1) + " kepada " + fmtP(r.P2) + ", jumlah kuantiti diminta turun kepada 0Q₃, penawaran tempatan naik kepada 0Q₂ dan import berkurang kepada Q₂Q₃ (" + fmtQ(r.imp2) + "). Kerajaan memperoleh hasil cukai import sebanyak kawasan <b>AE₂GH</b>.";
        } else if (d === "subsidi") {
          ayat =
            '<span class="status baik">Subsidi</span> Subsidi mengurangkan kos pengeluar tempatan, maka penawaran tempatan bertambah (S₀ kepada S₀′) dan keluk penawaran beralih ke kanan daripada S₁S₁ kepada <b>S₂S₂</b>. Harga ' + brg + " turun daripada " + fmtP(r.P1) + " kepada " + fmtP(r.P2) + ", penawaran tempatan naik kepada " + fmtQ(r.dom2) + " dan import berkurang kepada " + fmtQ(r.imp2) + ". Kerajaan menanggung perbelanjaan subsidi.";
        } else {
          ayat =
            '<span class="status buruk">Kuota import</span> Kuota mengehadkan import kepada Q₂Q₃ (' + fmtQ(r.imp2) + "), maka keluk penawaran beralih ke kiri daripada S₁S₁ kepada <b>S₂S₂</b>. Harga " + brg + " naik daripada " + fmtP(r.P1) + " kepada " + fmtP(r.P2) + " dan penawaran tempatan naik kepada 0Q₂. Berbeza dengan tarif, kerajaan <b>tidak</b> memperoleh hasil cukai.";
        }

        var kesan = [];
        if (v > 0.001 && Math.abs(r.P2 - r.P1) >= 0.05) {
          if (d === "tarif") {
            kesan = [
              "Harga " + brg + " diimport meningkat kerana pengimport memindahkan beban tarif kepada pengguna dengan menaikkan harga jualan.",
              "Permintaan " + brg + " diimport menurun manakala permintaan terhadap " + brg + " keluaran tempatan meningkat kerana harganya secara relatif lebih rendah.",
              "Penawaran " + brg + " oleh pengeluar tempatan meningkat.",
              "Jumlah " + brg + " diimport berkurang, maka perbelanjaan negara atas " + brg + " import turut menurun.",
              "Kerajaan memperoleh hasil daripada kutipan tarif.",
              "Guna tenaga dalam negara meningkat kerana pengeluaran tempatan memerlukan lebih banyak buruh, maka kadar pengangguran menurun."
            ];
          } else if (d === "subsidi") {
            kesan = [
              "Harga " + brg + " keluaran tempatan menurun.",
              "Permintaan terhadap " + brg + " keluaran tempatan meningkat kerana harganya secara relatif lebih murah daripada " + brg + " import.",
              "Penawaran " + brg + " oleh pengeluar tempatan meningkat.",
              "Jumlah " + brg + " diimport berkurang, maka perbelanjaan negara atas " + brg + " import menurun.",
              "Guna tenaga dalam negara meningkat, maka kadar pengangguran menurun."
            ];
          } else {
            kesan = [
              "Harga " + brg + " diimport meningkat kerana penawaran " + brg + " import dalam pasaran tempatan berkurang.",
              "Permintaan " + brg + " diimport menurun manakala permintaan terhadap " + brg + " keluaran tempatan meningkat.",
              "Penawaran " + brg + " oleh pengeluar tempatan meningkat.",
              "Jumlah " + brg + " diimport berkurang, maka perbelanjaan atas " + brg + " import turut menurun.",
              "Guna tenaga dalam negara meningkat, maka kadar pengangguran menurun."
            ];
          }
        }
        K.baca.innerHTML =
          G.nilai(bits) +
          '<div class="ayat">' + ayat + ' <span class="teks-lemah">(Nilai contoh berdasarkan ' + ds.rajah + " buku teks.)</span></div>" +
          (kesan.length ? '<div class="ayat"><b>Kesan ' + ds.nama.toLowerCase() + ":</b></div><ul>" + kesan.map(function (k) {
            return "<li>" + k + "</li>";
          }).join("") + "</ul>" : "") +
          jadual;
      }

      G.interaksi(plot, {
        seret: function (n, pt) {
          if (n !== "s2" || pt.x == null) return;
          setMag(magDariQ(pt.x, pt.y));
        },
        kekunci: function (k) {
          // kanan: keluk S₂ ke kanan; atas: dasar diperbesar
          var arah = k.dx ? (st.d === "tarif" ? -k.dx : k.dx) : k.dy;
          if (!arah) return false;
          setMag(st.v[st.d] + (arah > 0 ? 1 : -1) * DS[st.d].step);
        }
      });

      lukis();
      var henti = G.pantauSaiz(K.kanvas, function () {
        plot.ukur();
        lukis();
      });
      return { musnah: henti };
    },
    { tajuk: "Kesan tarif, subsidi dan kuota", bab: "t5-b2" }
  );

  /* =========================================================
     BAB 2 · Penentuan kadar pertukaran asing (RM/USD)
     Paksi tegak: RM bagi USD1; paksi mendatar: kuantiti USD
     ========================================================= */
  var FAKTOR_USD = [
    {
      label: "Permintaan USD bertambah (RM susut nilai)",
      pilihan: [
        ["D+import", "Import Malaysia meningkat"],
        ["D+citarasa", "Rakyat Malaysia lebih gemar barang import"],
        ["D+faedah", "Kadar faedah di Malaysia turun, modal portfolio keluar"],
        ["D+spekulasi", "Spekulasi: nilai RM dijangka merosot"],
        ["D+luar", "Rakyat Malaysia melabur atau melancong ke luar negara"]
      ]
    },
    {
      label: "Permintaan USD berkurang (RM naik nilai)",
      pilihan: [["D-import", "Rakyat Malaysia membeli barang buatan tempatan, import berkurang"]]
    },
    {
      label: "Penawaran USD bertambah (RM naik nilai)",
      pilihan: [
        ["S+eksport", "Eksport Malaysia meningkat"],
        ["S+pelancong", "Pelancong asing ke Malaysia bertambah"],
        ["S+faedah", "Kadar faedah di Malaysia naik, modal asing masuk"],
        ["S+spekulasi", "Spekulasi: nilai RM dijangka meningkat"],
        ["S+fdi", "Pelaburan langsung asing masuk ke Malaysia"]
      ]
    },
    {
      label: "Penawaran USD berkurang (RM susut nilai)",
      pilihan: [["S-eksport", "Eksport Malaysia merosot"]]
    }
  ];
  var SEBAB_USD = {
    "D+import": "Pengimport Malaysia menjual RM untuk mendapatkan USD bagi membayar pengeksport asing",
    "D+citarasa": "Lebih banyak barang import dibeli, maka lebih banyak USD diperlukan",
    "D+faedah": "Pulangan simpanan di Malaysia rendah, pelabur memindahkan modal portfolio ke luar negara",
    "D+spekulasi": "Orang ramai menjual RM dan membeli USD sebelum nilai RM jatuh",
    "D+luar": "Pelabur dan pelancong Malaysia perlu memperoleh mata wang asing",
    "D-import": "Kurang barang import dibeli, maka kurang USD diperlukan",
    "S+eksport": "Pembeli asing menukar USD kepada RM untuk membayar pengeksport Malaysia",
    "S+pelancong": "Pelancong asing menukar USD kepada RM untuk berbelanja di Malaysia",
    "S+faedah": "Pulangan simpanan di Malaysia tinggi, modal portfolio asing mengalir masuk",
    "S+spekulasi": "Orang ramai membeli RM sekarang sebelum nilainya naik",
    "S+fdi": "Pelabur asing menukar USD kepada RM untuk membina kilang di Malaysia",
    "S-eksport": "Kurang pembeli asing memerlukan RM, maka kurang USD ditawarkan"
  };

  G.daftar(
    "kadar-pertukaran",
    function (host, opt) {
      var K = G.kad(host, {
        tajuk: opt.tajuk || "Penentuan kadar pertukaran Ringgit Malaysia dengan Dolar Amerika",
        petunjuk: "Seret garis kadar pertukaran atau pilih satu peristiwa"
      });
      var A = 5.75,
        B = 0.025,
        C = 3.25,
        ANJAK = 16;
      var st = { dqD: 0, dqS: 0, r: 4.5, kod: "" };
      var tD = null,
        tS = null,
        tR = null;

      var pil = G.pilih(K.kawalan, {
        label: "Pilih peristiwa",
        kumpulan: [{ pilihan: [["", "— pilih —"]] }].concat(FAKTOR_USD),
        ubah: function (v) {
          st.kod = v;
          var d = 0,
            s = 0;
          if (v) {
            var arah = v.charAt(1) === "+" ? 1 : -1;
            if (v.charAt(0) === "D") d = arah * ANJAK;
            else s = arah * ANJAK;
          }
          anim(d, s);
        }
      });
      G.butang(K.kawalan, "USD1 = RM5.00", function () {
        animR(5);
      });
      G.butang(K.kawalan, "USD1 = RM4.00", function () {
        animR(4);
      });
      G.butang(K.kawalan, E.ikon("tangan") + " Biarkan pasaran menyesuaikan", function () {
        animR(eq().p, 1200);
      });
      G.butang(K.kawalan, E.ikon("ulang") + " Set semula", function () {
        pil.set("");
        st.kod = "";
        anim(0, 0);
      });

      var plot = G.plot(K.kanvas, {
        x: [0, 100],
        y: [3, 6],
        tikX: [0, 20, 40, 60, 80, 100],
        tikY: [3, 3.5, 4, 4.5, 5, 5.5, 6],
        labelX: "Kuantiti Dolar Amerika (USD juta)",
        labelY: "RM / USD",
        asalan: false,
        fmtTikY: function (v) {
          return E.fmt(v, 2, true);
        },
        nisbah: function (w) {
          return w < 480 ? 0.95 : 0.62;
        },
        aria: "Graf penentuan kadar pertukaran asing"
      });

      function Dk(dq) {
        return G.kelukD(A, B, dq);
      }
      function Sk(dq) {
        return G.kelukS(C, B, dq);
      }
      function eq() {
        return G.silang(Dk(st.dqD), Sk(st.dqS));
      }
      function anim(d, s) {
        if (tD) tD();
        if (tS) tS();
        var e1 = G.silang(Dk(d), Sk(s));
        tD = G.tween(st.dqD, d, 560, function (x) {
          st.dqD = x;
          lukis();
        });
        tS = G.tween(st.dqS, s, 560, function (x) {
          st.dqS = x;
          lukis();
        });
        animR(e1.p, 560);
      }
      function animR(v, ms) {
        if (tR) tR();
        tR = G.tween(st.r, v, ms || 700, function (x) {
          st.r = x;
          lukis();
        });
      }

      function lukis() {
        plot.kosong();
        plot.paksi();
        var d0 = Dk(0),
          s0 = Sk(0),
          d1 = Dk(st.dqD),
          s1 = Sk(st.dqS);
        var adaD = Math.abs(st.dqD) > 0.2,
          adaS = Math.abs(st.dqS) > 0.2;
        if (adaD) plot.fungsi(d0.P, 0, 100, "g-lengkung d hantu", "hantu");
        if (adaS) plot.fungsi(s0.P, 0, 100, "g-lengkung s hantu", "hantu");
        plot.fungsi(d1.P, 0, 100, "g-lengkung d", "lengkung");
        plot.fungsi(s1.P, 0, 100, "g-lengkung s", "lengkung");
        var qd = Math.min(94, d1.Q(3.35)),
          qs = Math.min(94, s1.Q(5.85));
        if (qd > 0) plot.teks(qd, d1.P(qd), adaD ? "D₁" : "DD", "g-teks d", "end", "label", -6, -8);
        if (qs > 0) plot.teks(qs, s1.P(qs), adaS ? "S₁" : "SS", "g-teks s", "end", "label", -6, 16);
        var E0 = G.silang(d0, s0),
          e1 = G.silang(d1, s1);
        var ubah = adaD || adaS;
        if (ubah) {
          plot.panduanKePaksi(E0.q, E0.p, { labelY: "RM" + E.fmt(E0.p, 2, true), kelasCip: "lemah" });
          plot.nod(E0.q, E0.p, { r: 5, label: "E₀", kelasLabel: "lemah", dx: -22, dy: -8 });
          if (adaD) plot.panah(d0.Q(5.3), 5.3, d1.Q(5.3), 5.3, "d", "tanda", 9);
          if (adaS) plot.panah(s0.Q(3.6), 3.6, s1.Q(3.6), 3.6, "s", "tanda", 9);
        }
        plot.panduanKePaksi(e1.q, e1.p, { keY: Math.abs(st.r - e1.p) > 0.01 });
        plot.nod(e1.q, e1.p, { kelas: "isi", r: 6, label: ubah ? "E₁" : "E", dx: 10, dy: -10 });

        // garis kadar pertukaran
        var r = st.r;
        var qD = d1.Q(r),
          qS = s1.Q(r);
        var beza = qD - qS;
        var py = plot.Y(r);
        if (Math.abs(beza) > 0.6) {
          var qa = Math.min(qD, qS),
            qb = Math.max(qD, qS);
          var kls = beza > 0 ? "d" : "s";
          var h = beza > 0 ? -0.07 : 0.07;
          plot.segi(qa, r, qb, r + h * 1.6, "g-kawasan " + kls, "kawasan");
          plot.garis(qa, r + h, qb, r + h, "g-garis-kurung " + kls, "tanda");
          plot.garis(qa, r, qa, r + h, "g-garis-kurung " + kls, "tanda");
          plot.garis(qb, r, qb, r + h, "g-garis-kurung " + kls, "tanda");
          plot.cip(plot.X((qa + qb) / 2), plot.Y(r + h * 3), (beza > 0 ? "Lebihan permintaan USD " : "Lebihan penawaran USD ") + E.fmt(Math.abs(beza), 0), { anchor: "middle", warna: beza > 0 ? "var(--c-d)" : "var(--c-s)" });
          plot.bulat(qD, r, 5, "g-nod isi d", "tanda");
          plot.bulat(qS, r, 5, "g-nod isi s", "tanda");
          if (qa > 1 && !plot.sempit) {
            plot.teks(qa, 3, beza > 0 ? "Q₁" : "Q₁", "g-teks kecil lemah", "middle", "label", 0, -6);
            plot.teks(qb, 3, "Q₂", "g-teks kecil lemah", "middle", "label", 0, -6);
          }
          plot.panahPx(plot.kiri() + 16, py + (beza > 0 ? 14 : -14), plot.kiri() + 16, py + (beza > 0 ? -22 : 22), "aksen", "tanda", 8);
        }
        svgEl("line", { x1: plot.kiri(), y1: py, x2: plot.kanan(), y2: py, class: "g-garis-harga" }, plot.lapis.panduan);
        var g = svgEl("g", { "data-pegang": "kadar", class: "g-pemegang", style: "touch-action:none" }, plot.lapis.pemegang);
        svgEl("line", { x1: plot.kiri(), y1: py, x2: plot.kanan(), y2: py, class: "g-garis-hit" }, g);
        svgEl("circle", { cx: plot.kanan() - 6, cy: py, r: 15, class: "g-nod-halo" }, g);
        svgEl("circle", { cx: plot.kanan() - 6, cy: py, r: 8, class: "g-nod" }, g);
        plot.cip(plot.kanan() - 22, py - 16, "USD1 = RM" + E.fmt(r, 2, true), { anchor: "end" });
        baca(E0, e1, r, qD, qS, beza);
      }

      function baca(E0, e1, r, qD, qS, beza) {
        var bits = [
          ["Kadar semasa", "USD1 = RM" + E.fmt(r, 2, true), ""],
          ["Diminta", "USD" + E.fmt(qD, 1) + " juta", "d"],
          ["Ditawarkan", "USD" + E.fmt(qS, 1) + " juta", "s"],
          ["Keseimbangan", "RM" + E.fmt(e1.p, 2, true), "c3"]
        ];
        var ayat = "";
        if (Math.abs(beza) > 0.6) {
          if (beza < 0) {
            ayat =
              '<span class="status merah">Lebihan penawaran USD</span> Pada USD1 = RM' + E.fmt(r, 2, true) + " (lebih tinggi daripada keseimbangan), Ringgit Malaysia mengalami <b>kejatuhan nilai</b>. Kuantiti USD yang ditawarkan melebihi kuantiti yang diminta sebanyak <b>USD" + E.fmt(-beza, 1) + " juta</b>, maka kadar pertukaran cenderung <b>turun</b> sehingga keseimbangan dicapai semula pada E.";
          } else {
            ayat =
              '<span class="status biru">Lebihan permintaan USD</span> Pada USD1 = RM' + E.fmt(r, 2, true) + " (lebih rendah daripada keseimbangan), Ringgit Malaysia mengalami <b>kenaikan nilai</b>. Kuantiti USD yang diminta melebihi kuantiti yang ditawarkan sebanyak <b>USD" + E.fmt(beza, 1) + " juta</b>, maka kadar pertukaran cenderung <b>naik</b> sehingga keseimbangan dicapai semula pada E.";
          }
        } else {
          ayat =
            '<span class="status baik">Keseimbangan</span> Keluk DD bersilang dengan keluk SS, iaitu kuantiti USD diminta sama dengan kuantiti USD ditawarkan. Kadar pertukaran ialah <b>USD1 = RM' + E.fmt(e1.p, 2, true) + "</b>.";
        }
        var ubah = Math.abs(e1.p - E0.p) > 0.005;
        if (st.kod && ubah) {
          var susut = e1.p > E0.p;
          var nama = labelPilihan(FAKTOR_USD, st.kod);
          ayat +=
            ' <span class="status ' + (susut ? "buruk" : "baik") + '">' + (susut ? "RM susut nilai" : "RM naik nilai") + "</span> <b>" + nama + ".</b> " + (SEBAB_USD[st.kod] || "") + ", maka keluk " + (st.kod.charAt(0) === "D" ? "permintaan" : "penawaran") + " USD beralih ke " + (st.kod.charAt(1) === "+" ? "kanan" : "kiri") + ". Kadar pertukaran berubah daripada RM" + E.fmt(E0.p, 2, true) + " kepada <b>RM" + E.fmt(e1.p, 2, true) + "</b> bagi USD1.";
          var x0 = 950000 / E0.p,
            x1 = 950000 / e1.p,
            m0 = 450000 * E0.p,
            m1 = 450000 * e1.p;
          ayat +=
            '</div><div class="ayat"><b>Kesan terhadap eksport:</b> getah asli bernilai RM950 000 kini berharga <b>USD' + E.fmt(x1, 2, true) + "</b> kepada pengimport Amerika Syarikat (sebelum ini USD" + E.fmt(x0, 2, true) + "), maka eksport Malaysia menjadi " + (susut ? "lebih murah dan <b>meningkat</b>" : "lebih mahal dan <b>menurun</b>") + ".</div>" +
            '<div class="ayat"><b>Kesan terhadap import:</b> barang kosmetik bernilai USD450 000 kini berharga <b>RM' + E.fmt(m1, 0) + "</b> kepada pengimport Malaysia (sebelum ini RM" + E.fmt(m0, 0) + "), maka import menjadi " + (susut ? "lebih mahal dan <b>menurun</b>. Imbangan dagangan cenderung <b>baik</b>." : "lebih murah dan <b>meningkat</b>. Imbangan dagangan cenderung <b>merosot</b>.");
        }
        K.baca.innerHTML = G.nilai(bits) + '<div class="ayat">' + ayat + ' <span class="teks-lemah">(Kadar contoh berdasarkan rajah 2.4.4 buku teks.)</span></div>';
      }

      G.interaksi(plot, {
        seret: function (n, pt, fasa) {
          if (n !== "kadar" || pt.y == null) return;
          if (fasa === "mula" && tR) tR();
          st.r = E.clamp(Math.round(pt.y * 100) / 100, 3.1, 5.9);
          lukis();
        },
        kekunci: function (k) {
          st.r = E.clamp(st.r + (k.dy || k.dx) * 0.05, 3.1, 5.9);
          lukis();
        }
      });

      lukis();
      var henti = G.pantauSaiz(K.kanvas, function () {
        plot.ukur();
        lukis();
      });
      return {
        musnah: function () {
          henti();
          [tD, tS, tR].forEach(function (t) {
            if (t) t();
          });
        }
      };
    },
    { tajuk: "Kadar pertukaran asing", bab: "t5-b2" }
  );
})();
