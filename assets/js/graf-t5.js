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
      var ASAL = { barang: 140, khidmat: -25, primer: -55, sekunder: -20 };
      var st = Object.assign({}, ASAL);
      G.butang(K.kawalan, "Pelancong asing bertambah", function () {
        st.khidmat = ASAL.khidmat + 30;
        lukis();
      });
      G.butang(K.kawalan, "Harga komoditi jatuh", function () {
        st.barang = ASAL.barang - 90;
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
          plot.teks(x, Math.max(dari, ke), (v >= 0 ? "+" : "−") + Math.abs(v), "g-teks " + (v >= 0 ? "c3" : "s"), "middle", "label", 0, v >= 0 ? -24 : -8);
          plot.teksPx(plot.X(x), plot.bawah() + 17, plot.sempit ? k.pendek.slice(0, 7) : k.pendek, "g-tik", "middle", "paksi");
          pemegang(plot, plot.X(x), plot.Y(ke), k.id, v >= 0 ? "c3" : "s", 7);
          kum = ke;
        });
        var xT = 4.5;
        plot.segi(xT - lebar / 2, Math.min(0, kum), xT + lebar / 2, Math.max(0, kum), "g-bar " + (kum >= 0 ? "baik" : "buruk"), "kawasan");
        plot.teks(xT, Math.max(0, kum), (kum >= 0 ? "+" : "−") + Math.abs(kum), "g-teks besar", "middle", "label", 0, -8);
        plot.teksPx(plot.X(xT), plot.bawah() + 17, "Baki", "g-tik", "middle", "paksi");
        var lebih = kum > 0,
          sama = kum === 0;
        K.baca.innerHTML =
          G.nilai(
            KOMP.map(function (k) {
              return [k.pendek, (st[k.id] >= 0 ? "+" : "−") + Math.abs(st[k.id]), st[k.id] >= 0 ? "c3" : "s"];
            }).concat([["Baki akaun semasa", (kum >= 0 ? "+" : "−") + "RM" + Math.abs(kum) + "b", kum >= 0 ? "c3" : "s"]])
          ) +
          '<div class="ayat">' +
          (sama ? '<span class="status neutral">Seimbang</span> ' : lebih ? '<span class="status baik">Lebihan akaun semasa</span> Jumlah penerimaan melebihi jumlah pembayaran. ' : '<span class="status buruk">Defisit akaun semasa</span> Jumlah pembayaran melebihi jumlah penerimaan. ') +
          "Baki akaun semasa = akaun barangan + akaun perkhidmatan + pendapatan primer + pendapatan sekunder. " +
          KOMP.map(function (k) {
            return "<b>" + k.nama + "</b>: " + k.nota;
          }).join("; ") +
          "." + CONTOH + "</div>";
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
  var KADAR = [
    { kod: "USD", nama: "Dolar AS", unit: 1, beli: 4.35, jual: 4.45 },
    { kod: "SGD", nama: "Dolar Singapura", unit: 1, beli: 3.3, jual: 3.4 },
    { kod: "EUR", nama: "Euro", unit: 1, beli: 4.75, jual: 4.9 },
    { kod: "GBP", nama: "Paun sterling", unit: 1, beli: 5.6, jual: 5.8 },
    { kod: "THB", nama: "Baht Thailand", unit: 100, beli: 12.5, jual: 13.2 },
    { kod: "IDR", nama: "Rupiah Indonesia", unit: 1000, beli: 0.26, jual: 0.3 }
  ];

  G.daftar(
    "penukar",
    function (host, opt) {
      var K = G.kad(host, { tajuk: opt.tajuk || "Penukaran mata wang: harga belian dan harga jualan", petunjuk: "Pilih mata wang dan arah pertukaran" });
      var st = { i: 1, arah: "beli", rm: 1000, asing: 500 };
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
        teksPx(plot, xB, y - 18, "Harga belian RM" + E.fmt(k.beli, 2, true), "g-teks c3", "end");
        teksPx(plot, xJ, y - 18, "Harga jualan RM" + E.fmt(k.jual, 2, true), "g-teks s", "start");
        teksPx(plot, (xB + xJ) / 2, y + 28, "margin pengurup wang RM" + E.fmt(k.jual - k.beli, 2, true), "g-teks c4", "middle");
        var unitTeks = k.unit > 1 ? k.unit + " " + k.kod : "1 " + k.kod;
        var hasil, ayat;
        if (st.arah === "beli") {
          hasil = (st.rm / k.jual) * k.unit;
          ayat =
            "Anda <b>membeli</b> " + k.kod + ", jadi pengurup wang <b>menjual</b> mata wang asing kepada anda pada <b>harga jualan</b> RM" + E.fmt(k.jual, 2, true) + " bagi " + unitTeks + ". " +
            E.rm(st.rm, 2, true) + " ÷ " + E.fmt(k.jual, 2, true) + (k.unit > 1 ? " × " + k.unit : "") + " = <b>" + E.fmt(hasil, 2, true) + " " + k.kod + "</b>.";
        } else {
          hasil = (st.asing / k.unit) * k.beli;
          ayat =
            "Anda <b>menjual</b> " + k.kod + ", jadi pengurup wang <b>membeli</b> mata wang asing daripada anda pada <b>harga belian</b> RM" + E.fmt(k.beli, 2, true) + " bagi " + unitTeks + ". " +
            E.fmt(st.asing, 2, true) + " " + k.kod + (k.unit > 1 ? " ÷ " + k.unit : "") + " × " + E.fmt(k.beli, 2, true) + " = <b>" + E.rm(hasil, 2, true) + "</b>.";
        }
        var pusing = st.arah === "beli" ? (hasil / k.unit) * k.beli : null;
        K.baca.innerHTML =
          G.nilai([
            [st.arah === "beli" ? "Anda bayar" : "Anda serah", st.arah === "beli" ? E.rm(st.rm, 2, true) : E.fmt(st.asing, 2, true) + " " + k.kod, ""],
            ["Anda terima", st.arah === "beli" ? E.fmt(hasil, 2, true) + " " + k.kod : E.rm(hasil, 2, true), "c3"]
          ]) +
          '<div class="ayat">' + ayat +
          (pusing != null ? " Jika ditukar semula serta-merta, anda hanya mendapat " + E.rm(pusing, 2, true) + ": perbezaan harga jualan dan harga belian ialah keuntungan pengurup wang." : "") +
          ' <span class="teks-lemah">(Kadar contoh, bukan kadar semasa.)</span></div>';
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
})();
