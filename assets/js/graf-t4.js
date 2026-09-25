/* =========================================================
   Econ Tutor · graf interaktif Tingkatan 4
   Bab 1: KKP, spektrum sistem ekonomi
   Bab 3: guna tenaga, upah benar, pendapatan boleh guna,
          belanjawan peribadi, pembelian kredit, risiko-pulangan
   Bab 4: TP/AP/MP, keluk kos, untung, produktiviti
   ========================================================= */
(function () {
  "use strict";

  var E = window.EKO;
  var G = E.graf;
  var svgEl = G.svgEl;

  /* =========================================================
     Helper umum (turut digunakan oleh graf-t5.js)
     ========================================================= */

  // Tik "cantik" untuk julat 0..maks
  G.tikAuto = function (maks, n) {
    n = n || 5;
    if (!(maks > 0)) return { tik: [0, 1], maks: 1, langkah: 1 };
    var kasar = maks / n;
    var kuasa = Math.pow(10, Math.floor(Math.log(kasar) / Math.LN10));
    var r = kasar / kuasa;
    var langkah = (r <= 1 ? 1 : r <= 2 ? 2 : r <= 2.5 ? 2.5 : r <= 5 ? 5 : 10) * kuasa;
    var atas = Math.ceil(maks / langkah - 1e-9) * langkah;
    var tik = [];
    for (var i = 0; i * langkah <= atas + 1e-9; i++) tik.push(E.bundar(i * langkah, 6));
    return { tik: tik, maks: atas, langkah: langkah };
  };

  // RM dengan sen hanya jika perlu
  G.rm = function (v) {
    return E.rm(v, 2, Math.abs(v - Math.round(v)) > 0.001);
  };

  G.gridMedan = function (induk) {
    var d = G.div("grid-medan");
    d.style.flex = "1 1 100%";
    induk.appendChild(d);
    return d;
  };

  // Medan nombor: pulang {el, input, set}
  G.medan = function (induk, o) {
    var lab = document.createElement("label");
    lab.className = "medan";
    var s = document.createElement("span");
    s.innerHTML = o.label;
    lab.appendChild(s);
    var inp = document.createElement("input");
    inp.type = "number";
    inp.setAttribute("inputmode", "decimal");
    if (o.min != null) inp.min = o.min;
    if (o.max != null) inp.max = o.max;
    inp.step = o.step != null ? o.step : "any";
    inp.value = o.nilai;
    lab.appendChild(inp);
    inp.addEventListener("input", function () {
      var v = parseFloat(inp.value);
      if (isNaN(v)) return;
      if (o.min != null) v = Math.max(o.min, v);
      if (o.max != null) v = Math.min(o.max, v);
      o.ubah(v);
    });
    induk.appendChild(lab);
    return {
      el: lab,
      input: inp,
      set: function (v) {
        inp.value = v;
      }
    };
  };

  /* ---------- carta siri (garis licin + penjejak menegak) ---------- */
  // cfg: x, y, tikX, tikY, labelX, labelY, siri:[{id,nama,kelas,warna,label,data:[[x,y]],licin,titik,tunjuk}],
  //      nilaiX:[...], xAwal, fmtX, zon:[{dari,ke,kelas,label}], anotasi(plot,x)
  G.carta = function (plotHost, cfg, apabila) {
    var plot = G.plot(plotHost, {
      x: cfg.x,
      y: cfg.y,
      tikX: cfg.tikX,
      tikY: cfg.tikY,
      labelX: cfg.labelX,
      labelY: cfg.labelY,
      fmtTikX: cfg.fmtTikX,
      fmtTikY: cfg.fmtTikY,
      asalan: cfg.asalan,
      paksiXBawah: cfg.paksiXBawah,
      nisbah:
        cfg.nisbah ||
        function (w) {
          return w < 480 ? 0.85 : 0.56;
        },
      margin: cfg.margin,
      aria: cfg.aria || "Carta interaktif"
    });
    var st = { x: cfg.xAwal != null ? cfg.xAwal : null };
    var fungsi = {};
    cfg.siri.forEach(function (s) {
      fungsi[s.id] =
        s.licin === false
          ? null
          : G.monoton(
              s.data.map(function (p) {
                return p[0];
              }),
              s.data.map(function (p) {
                return p[1];
              })
            );
    });

    function nilaiPada(s, x) {
      for (var i = 0; i < s.data.length; i++) if (Math.abs(s.data[i][0] - x) < 1e-9) return s.data[i][1];
      return null;
    }

    function lukis() {
      plot.kosong();
      (cfg.zon || []).forEach(function (z) {
        plot.segi(z.dari, plot.y0, z.ke, plot.y1, "g-zon " + z.kelas, "zon");
        var lab = typeof z.label === "function" ? z.label(plot) : z.label;
        if (lab) plot.teks((z.dari + z.ke) / 2, plot.y1, lab, "g-zon-label", "middle", "label", 0, 14);
      });
      plot.paksi();
      if (plot.y0 < 0) plot.garis(plot.x0, 0, plot.x1, 0, "g-garis-sifar", "grid");
      cfg.siri.forEach(function (s) {
        if (s.tunjuk === false) return;
        var kls = "g-lengkung " + (s.kelas || "");
        var f = fungsi[s.id];
        if (f) plot.fungsi(f, s.data[0][0], s.data[s.data.length - 1][0], kls, "lengkung", 140);
        else plot.laluan(s.data, kls, "lengkung");
        if (s.titik !== false) {
          s.data.forEach(function (p) {
            plot.bulat(p[0], p[1], 3.2, "g-nod isi " + (s.kelas || ""), "tanda");
          });
        }
        if (s.label) {
          var akhir = s.data[s.data.length - 1];
          plot.teks(akhir[0], akhir[1], s.label, "g-teks " + (s.kelas || ""), "start", "label", s.dxLabel != null ? s.dxLabel : 8, s.dyLabel != null ? s.dyLabel : 4);
        }
      });
      if (cfg.anotasi) cfg.anotasi(plot, st.x);
      if (st.x != null) {
        plot.garisPx(plot.X(st.x), plot.atas(), plot.X(st.x), plot.bawah(), "g-garis-silang", "panduan");
        cfg.siri.forEach(function (s) {
          if (s.tunjuk === false) return;
          var v = nilaiPada(s, st.x);
          if (v == null) return;
          plot.nod(st.x, v, { kelas: s.kelas || "", r: 6, lapis: "atas" });
        });
        plot.cip(plot.X(st.x), plot.bawah() + 12, cfg.fmtX ? cfg.fmtX(st.x) : String(st.x), { anchor: "middle" });
      }
      if (apabila) apabila(st.x);
    }

    function snap(v) {
      var terbaik = cfg.nilaiX[0];
      var jarak = Infinity;
      cfg.nilaiX.forEach(function (n) {
        var d = Math.abs(n - v);
        if (d < jarak) {
          jarak = d;
          terbaik = n;
        }
      });
      return terbaik;
    }

    function ke(v) {
      if (v !== st.x) {
        st.x = v;
        lukis();
      }
    }

    G.interaksi(plot, {
      hover: function (pt) {
        ke(snap(pt.x));
      },
      tekan: function (pt) {
        ke(snap(pt.x));
      },
      tekanSeret: true,
      kekunci: function (k) {
        var i = cfg.nilaiX.indexOf(st.x);
        var d = k.dx || k.dy;
        i = i < 0 ? 0 : E.clamp(i + (d > 0 ? 1 : d < 0 ? -1 : 0), 0, cfg.nilaiX.length - 1);
        ke(cfg.nilaiX[i]);
      }
    });

    lukis();
    return {
      plot: plot,
      lukis: lukis,
      ukur: function () {
        plot.ukur();
        lukis();
      },
      set: ke,
      get x() {
        return st.x;
      }
    };
  };

  // Butang legenda yang boleh sorok/tunjuk siri
  G.legenda = function (induk, siri, apabila) {
    var w = G.div("g-legenda");
    siri.forEach(function (s) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-pressed", s.tunjuk === false ? "false" : "true");
      b.innerHTML = '<i style="background:var(--' + (s.warna || "c-6") + ')"></i>' + s.nama;
      b.addEventListener("click", function () {
        s.tunjuk = s.tunjuk === false;
        b.setAttribute("aria-pressed", s.tunjuk === false ? "false" : "true");
        apabila();
      });
      w.appendChild(b);
    });
    induk.appendChild(w);
    return w;
  };

  // Bar mendatar bertindan (koordinat px pada plot)
  // baris: [{label, jumlah, bahagian:[{nilai, kelas, label, teks, pendek}]}]
  G.barMendatar = function (plot, baris, o) {
    o = o || {};
    var kiri = plot.kiri(),
      kanan = plot.kanan(),
      atas = plot.atas(),
      bawah = plot.bawah();
    var n = baris.length;
    var jalur = (bawah - atas) / n;
    var tebal = Math.max(18, Math.min(34, jalur - 30));
    var maks = o.maks || 1;
    function X(v) {
      return kiri + (Math.max(0, v) / maks) * (kanan - kiri);
    }
    baris.forEach(function (r, i) {
      var yT = atas + i * jalur;
      var t = svgEl("text", { x: kiri, y: yT + 14, class: "g-label" }, plot.lapis.label);
      t.textContent = r.label;
      if (r.jumlah) {
        var tj = svgEl("text", { x: kanan, y: yT + 14, class: "g-teks", "text-anchor": "end" }, plot.lapis.label);
        tj.textContent = r.jumlah;
      }
      var yB = yT + 22;
      svgEl("rect", { x: kiri, y: yB, width: kanan - kiri, height: tebal, rx: 8, class: "g-trek-bar" }, plot.lapis.latar);
      var x = 0;
      r.bahagian.forEach(function (b) {
        if (!(b.nilai > 0)) return;
        var xa = X(x),
          xb = X(x + b.nilai);
        var w = Math.max(0, xb - xa - 1.5);
        var g = svgEl("g", null, plot.lapis.kawasan);
        svgEl("rect", { x: xa, y: yB, width: w, height: tebal, rx: 5, class: "g-bar " + (b.kelas || "") }, g);
        var tt = svgEl("title", null, g);
        tt.textContent = (b.label || "") + ": " + (b.teks || E.fmt(b.nilai, 2));
        var lbl = b.pendek || "";
        if (lbl && w > lbl.length * 6.8 + 12) {
          var tx = svgEl("text", { x: xa + w / 2, y: yB + tebal / 2 + 4.5, class: "g-teks pada-bar", "text-anchor": "middle" }, plot.lapis.label);
          tx.textContent = lbl;
        }
        x += b.nilai;
      });
    });
    return { X: X, jalur: jalur, tebal: tebal };
  };

  /* =========================================================
     BAB 1 · Keluk kemungkinan pengeluaran (Jadual 1.2)
     ========================================================= */
  G.daftar(
    "kkp",
    function (host, opt) {
      var K = G.kad(host, {
        tajuk: opt.tajuk || "Keluk kemungkinan pengeluaran: pakaian dan makanan",
        petunjuk: "Seret titik X · pilih segmen untuk kos lepas"
      });
      var DATA = [
        [0, 20, "R"],
        [4, 19, "S"],
        [8, 17, "T"],
        [12, 13, "U"],
        [16, 0, "V"]
      ];
      var RUJUK = [
        [6, 8, "W"],
        [13, 19, "Y"]
      ];
      var f0 = G.monoton(
        DATA.map(function (d) {
          return d[0];
        }),
        DATA.map(function (d) {
          return d[1];
        })
      );
      var SKALA = 1.3;
      var st = { s: 1, tumbuh: false, seg: null, x: 7, y: 9, jejak: null };
      var batal = null;

      function f(x) {
        return st.s * f0(x / st.s);
      }
      function hujung() {
        return 16 * st.s;
      }

      var seg = G.segmen(
        K.kawalan,
        [
          ["0", "R → S"],
          ["1", "S → T"],
          ["2", "T → U"],
          ["3", "U → V"]
        ],
        null,
        function (v) {
          var n = parseInt(v, 10);
          st.seg = st.seg === n ? null : n;
          seg.set(st.seg == null ? null : String(st.seg));
          lukis();
        }
      );
      G.pemisah(K.kawalan);
      var btnT = G.butang(
        K.kawalan,
        "Pertumbuhan ekonomi",
        function () {
          st.tumbuh = !st.tumbuh;
          btnT.setAttribute("aria-pressed", st.tumbuh ? "true" : "false");
          if (batal) batal();
          batal = G.tween(st.s, st.tumbuh ? SKALA : 1, 700, function (v) {
            st.s = v;
            lukis();
          });
        },
        { tekan: false }
      );

      var plot = G.plot(K.kanvas, {
        x: [0, 22],
        y: [0, 27],
        tikX: [0, 4, 8, 12, 16, 20],
        tikY: [0, 5, 10, 15, 20, 25],
        labelX: "Pakaian (ribu helai)",
        labelY: "Makanan (tan metrik)",
        nisbah: function (w) {
          return w < 480 ? 0.92 : 0.62;
        },
        aria: "Keluk kemungkinan pengeluaran interaktif"
      });

      function terdekat(px, py) {
        var hasil = { x: 0, y: f(0), jarak: Infinity };
        var n = 180;
        var xb = hujung();
        for (var i = 0; i <= n; i++) {
          var x = (xb * i) / n;
          var y = f(x);
          var dx = plot.X(x) - px;
          var dy = plot.Y(y) - py;
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d < hasil.jarak) hasil = { x: x, y: y, jarak: d };
        }
        return hasil;
      }

      function status() {
        if (terdekat(plot.X(st.x), plot.Y(st.y)).jarak < 7) return "cekap";
        if (st.x > hujung() || st.y > f(st.x)) return "luar";
        return "dalam";
      }

      function lukis() {
        plot.kosong();
        plot.paksi();
        var tumbuh = st.s > 1.002;
        if (tumbuh) {
          plot.fungsi(f0, 0, 16, "g-lengkung c3 hantu", "hantu", 140);
          plot.teks(14.2, f0(14.2), "KKP₀", "g-teks lemah", "end", "label", -8, 4);
          if (st.s > 1.06) {
            var xa = 9,
              ya = f0(9);
            plot.panah(xa + 0.3, ya + 0.35, xa * st.s - 0.3, ya * st.s - 0.35, "baik", "tanda", 9);
          }
        }
        plot.fungsi(f, 0, hujung(), "g-lengkung c3", "lengkung", 160);
        var xl = 14.2 * st.s;
        plot.teks(xl, f(xl), tumbuh ? "KKP₁" : "KKP", "g-teks c3", "start", "label", 9, 2);

        if (st.seg != null) {
          var a = DATA[st.seg],
            b = DATA[st.seg + 1];
          plot.garis(a[0], a[1], b[0], a[1], "g-panduan", "panduan");
          plot.panah(a[0], a[1], b[0], a[1], "c4", "tanda", 8);
          plot.panah(b[0], a[1], b[0], b[1], "s", "tanda", 8);
          plot.teks((a[0] + b[0]) / 2, a[1], "+" + (b[0] - a[0]) + " ribu helai", "g-teks c4", "middle", "label", 0, -9);
          plot.teks(b[0], (a[1] + b[1]) / 2, "−" + (a[1] - b[1]) + " tan", "g-teks s", "start", "label", 8, 4);
        }

        DATA.forEach(function (d, i) {
          plot.bulat(d[0], d[1], 4.5, "g-nod isi c3", "tanda");
          plot.teks(d[0], d[1], d[2], "g-teks c3", "start", "label", 8, i === 4 ? -10 : -9);
        });
        RUJUK.forEach(function (p) {
          plot.bulat(p[0], p[1], 4, "g-nod", "tanda");
          plot.teks(p[0], p[1], p[2], "g-teks lemah", "start", "label", 8, -7);
        });

        var s = status();
        var kls = s === "cekap" ? "c3" : s === "luar" ? "s" : "c4";
        plot.panduanKePaksi(st.x, st.y, { labelX: E.fmt(st.x, 1), labelY: E.fmt(st.y, 1) });
        if (st.jejak) {
          plot.bulat(st.jejak.x, st.jejak.y, 5, "g-nod c3", "atas");
          plot.cip(plot.X(st.jejak.x) + 12, plot.Y(st.jejak.y) - 18, "(" + E.fmt(st.jejak.x, 1) + ", " + E.fmt(st.jejak.y, 1) + ")", { kelas: "lemah" });
        }
        plot.nod(st.x, st.y, { pegang: "X", kelas: kls, label: "X", dx: 12, dy: -12, kelasLabel: kls });
        baca(s);
      }

      function baca(s) {
        var bits = [
          ["Pakaian", E.fmt(st.x, 1) + " ribu helai", "c4"],
          ["Makanan", E.fmt(st.y, 1) + " tan metrik", "s"]
        ];
        var ayat;
        if (s === "cekap") {
          ayat =
            '<span class="status baik">Pada keluk: cekap</span> Semua faktor pengeluaran digunakan sepenuhnya (guna tenaga penuh). Untuk menambah pakaian, sebahagian makanan mesti dikorbankan. Pergerakan di sepanjang KKP menggambarkan <b>masalah pilihan</b> dan <b>kos lepas</b>.';
        } else if (s === "dalam") {
          ayat =
            '<span class="status amaran">Di dalam keluk: tidak cekap</span> Kombinasi seperti titik W boleh dicapai tetapi ada faktor pengeluaran yang <b>menganggur</b> atau tidak digunakan sepenuhnya. Ekonomi boleh menambah kedua-dua barang tanpa mengorbankan mana-mana.';
        } else {
          ayat =
            '<span class="status buruk">Di luar keluk: tidak tercapai</span> Kombinasi seperti titik Y tidak dapat dihasilkan dengan faktor pengeluaran dan teknologi sedia ada. Inilah <b>masalah kekurangan</b> (ketidakupayaan ekonomi).' +
            (st.tumbuh ? "" : " Tekan <b>Pertumbuhan ekonomi</b> untuk melihat KKP beralih ke kanan.");
        }
        if (st.tumbuh) ayat += " Pertumbuhan ekonomi (pertambahan faktor pengeluaran atau kemajuan teknologi) menganjak KKP ke kanan, jadi titik Y kini boleh dicapai.";
        if (st.seg != null) {
          var a = DATA[st.seg],
            b = DATA[st.seg + 1];
          var kl = (a[1] - b[1]) / (b[0] - a[0]);
          bits.push(["Kos lepas " + a[2] + "→" + b[2], E.fmt(kl, 2, true) + " tan bagi 1 ribu helai", "c3"]);
          ayat +=
            "<br>Dari " + a[2] + " ke " + b[2] + ": tambahan " + (b[0] - a[0]) + " ribu helai pakaian mengorbankan " + (a[1] - b[1]) + " tan metrik makanan. Kecerunan = (" + b[1] + " − " + a[1] + ") ÷ (" + b[0] + " − " + a[0] + ") = <b>−" + E.fmt(kl, 2, true) +
            "</b>. Kos lepas semakin bertambah (0.25 → 0.50 → 1.00 → 3.25) kerana faktor pengeluaran tidak sesuai sepenuhnya untuk kedua-dua kegunaan, maka KKP <b>cembung ke titik asalan</b>.";
        }
        K.baca.innerHTML = G.nilai(bits) + '<div class="ayat">' + ayat + "</div>";
      }

      G.interaksi(plot, {
        seret: function (n, pt) {
          if (n !== "X" || pt.x == null) return;
          var x = E.clamp(pt.x, 0, 21.5),
            y = E.clamp(pt.y, 0, 26.5);
          var t = terdekat(plot.X(x), plot.Y(y));
          if (t.jarak < 9) {
            x = t.x;
            y = t.y;
          }
          st.x = x;
          st.y = y;
          st.jejak = null;
          lukis();
        },
        hover: function (pt) {
          var t = terdekat(pt.px, pt.py);
          var baru = t.jarak < 26 ? t : null;
          if (baru || st.jejak) {
            st.jejak = baru;
            lukis();
          }
        },
        keluar: function () {
          if (st.jejak) {
            st.jejak = null;
            lukis();
          }
        },
        tekan: function (pt) {
          var t = terdekat(pt.px, pt.py);
          if (t.jarak < 24) {
            st.x = t.x;
            st.y = t.y;
            st.jejak = null;
            lukis();
          }
        },
        kekunci: function (k) {
          st.x = E.clamp(st.x + k.dx * 0.25, 0, 21.5);
          st.y = E.clamp(st.y + k.dy * 0.25, 0, 26.5);
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
          if (batal) batal();
        }
      };
    },
    { tajuk: "Keluk kemungkinan pengeluaran", bab: "t4-b1" }
  );

  /* =========================================================
     BAB 1 · Spektrum sistem ekonomi (Rajah 1.4)
     ========================================================= */
  var SISTEM = {
    bebas: {
      nama: "Sistem ekonomi pasaran bebas",
      pendek: "Pasaran bebas",
      alias: "sistem ekonomi kapitalis atau <i>laissez-faire</i>",
      status: "biru",
      kelas: "d",
      pemilikan: "Individu dan pihak swasta bebas memiliki, menggunakan dan mengubah pemilikan faktor pengeluaran.",
      penentu: "Pengguna dan pengeluar, melalui mekanisme pasaran (tangan tak nampak).",
      pilihan: "Kebebasan luas: pengguna memilih ikut kuasa beli, pengeluar memilih teknik paling cekap untuk untung maksimum.",
      apa: "Ditentukan oleh kuasa permintaan dan penawaran: barang yang tinggi permintaannya dan menguntungkan.",
      berapa: "Kuasa pasaran, iaitu jumlah permintaan dan penawaran di pasaran.",
      bagaimana: "Cara paling cekap yang meminimumkan kos (intensif modal atau intensif buruh ikut harga relatif).",
      siapa: "Corak agihan pendapatan wang: yang berpendapatan tinggi mempunyai kuasa beli lebih tinggi.",
      contoh: "Amerika Syarikat, Hong Kong"
    },
    campuran: {
      nama: "Sistem ekonomi campuran",
      pendek: "Campuran",
      alias: "gabungan ciri pasaran bebas dan perancangan pusat",
      status: "neutral",
      kelas: "c3",
      pemilikan: "Individu dan swasta memiliki faktor pengeluaran, tetapi faktor tertentu dimiliki kerajaan untuk mengeluarkan barang awam.",
      penentu: "Mekanisme pasaran bagi barang ekonomi; kerajaan bagi barang awam.",
      pilihan: "Individu dan pengeluar bebas memilih, tetapi dikawal oleh undang-undang dan peraturan kerajaan.",
      apa: "Barang ekonomi melalui kuasa pasaran; barang awam oleh kerajaan.",
      berapa: "Barang ekonomi melalui mekanisme pasaran; barang awam mengikut keperluan rakyat (diluluskan di Parlimen).",
      bagaimana: "Swasta: cara yang memaksimumkan untung. Kerajaan: cara yang memaksimumkan kebajikan masyarakat.",
      siapa: "Barang ekonomi ikut kuasa beli; kerajaan campur tangan melalui cukai dan subsidi, dan barang awam untuk semua.",
      contoh: "Malaysia, Thailand, Singapura"
    },
    pusat: {
      nama: "Sistem ekonomi perancangan pusat",
      pendek: "Perancangan pusat",
      alias: "sistem ekonomi sosialis atau komunis",
      status: "merah",
      kelas: "s",
      pemilikan: "Semua faktor pengeluaran dimiliki secara mutlak oleh kerajaan atau badan perancangan pusat.",
      penentu: "Kerajaan melalui badan perancangan pusat.",
      pilihan: "Individu dan pengeluar tiada kebebasan memilih barang, pekerjaan atau penggunaan faktor pengeluaran.",
      apa: "Ditentukan oleh badan perancangan pusat; pengguna tiada kebebasan memilih.",
      berapa: "Kuasa mutlak kerajaan, mengikut keperluan rakyat supaya tiada lebihan atau kurangan.",
      bagaimana: "Kerajaan memilih cara paling cekap; biasanya intensif buruh untuk menambah peluang pekerjaan.",
      siapa: "Kerajaan mengagihkan secara adil dan sama rata (kadang-kadang melalui catuan atau kupon).",
      contoh: "Korea Utara, Cuba"
    }
  };

  var NEGARA = [
    [6, "Hong Kong", "HK"],
    [15, "Amerika Syarikat", "AS"],
    [40, "Singapura", "SG"],
    [47, "Thailand", "TH"],
    [55, "Malaysia", "MY"],
    [86, "Cuba", "Cuba"],
    [95, "Korea Utara", "Korea U."]
  ];

  G.daftar(
    "sistem-ekonomi",
    function (host, opt) {
      var K = G.kad(host, {
        tajuk: opt.tajuk || "Spektrum sistem ekonomi",
        petunjuk: "Seret penanda atau ketik nama negara",
        kawalan: false
      });
      var st = { pos: opt.mula != null ? opt.mula : 55 };
      var plot = G.plot(K.kanvas, {
        x: [0, 100],
        y: [0, 10],
        tinggi: 160,
        margin: { l: 24, r: 24, t: 10, b: 10 },
        aria: "Spektrum sistem ekonomi interaktif"
      });

      function zon(p) {
        return p < 30 ? "bebas" : p <= 72 ? "campuran" : "pusat";
      }

      function lukis() {
        plot.kosong();
        var W = plot.W,
          H = plot.H;
        var sempit = W < 520;
        var yT = 74;
        var x0 = plot.X(0),
          x1 = plot.X(100);
        var idKlip = plot.id + "-klip";
        var defs = svgEl("defs", null, plot.lapis.zon);
        var cp = svgEl("clipPath", { id: idKlip }, defs);
        svgEl("rect", { x: x0, y: yT - 9, width: x1 - x0, height: 18, rx: 9 }, cp);
        var gz = svgEl("g", { "clip-path": "url(#" + idKlip + ")" }, plot.lapis.zon);
        [
          [0, 30, "z1", "Pasaran bebas", "Bebas"],
          [30, 72, "z2", "Campuran", "Campuran"],
          [72, 100, "z3", "Perancangan pusat", "Pusat"]
        ].forEach(function (z) {
          svgEl("rect", { x: plot.X(z[0]), y: yT - 9, width: plot.X(z[1]) - plot.X(z[0]), height: 18, class: "g-zon " + z[2] }, gz);
          var t = svgEl("text", { x: (plot.X(z[0]) + plot.X(z[1])) / 2, y: yT + 30, class: "g-zon-label", "text-anchor": "middle" }, plot.lapis.label);
          t.textContent = (sempit ? z[4] : z[3]).toUpperCase();
        });
        NEGARA.forEach(function (n, i) {
          var px = plot.X(n[0]);
          var yLabel = yT - (i % 2 === 0 ? 48 : 28);
          svgEl("line", { x1: px, y1: yLabel + 5, x2: px, y2: yT - 11, class: "g-panduan" }, plot.lapis.panduan);
          var t = svgEl("text", { x: px, y: yLabel, class: "g-teks" + (zon(n[0]) === zon(st.pos) ? "" : " lemah"), "text-anchor": "middle" }, plot.lapis.label);
          t.textContent = sempit ? n[2] : n[1];
          svgEl("circle", { cx: px, cy: yT, r: 2.6, class: "g-nod isi" }, plot.lapis.tanda);
        });
        var yA = yT + 70;
        plot.panahPx(x0 + 2, yA, x1 - 2, yA, "aksen", "tanda", 8);
        var ta = svgEl("text", { x: (x0 + x1) / 2, y: yA - 8, class: "g-label", "text-anchor": "middle" }, plot.lapis.label);
        ta.textContent = sempit ? "Campur tangan kerajaan bertambah" : "Semakin ke kanan, semakin banyak campur tangan kerajaan";
        var S = SISTEM[zon(st.pos)];
        plot.nod(st.pos, plot.invY(yT), { pegang: "pos", kelas: S.kelas });
        baca();
      }

      function baris(k, v) {
        return "<tr><th>" + k + "</th><td>" + v + "</td></tr>";
      }

      function baca() {
        var S = SISTEM[zon(st.pos)];
        var dekat = NEGARA.reduce(function (a, n) {
          return Math.abs(n[0] - st.pos) < Math.abs(a[0] - st.pos) ? n : a;
        });
        var p = st.pos;
        var tahap = p < 12 ? "sangat minimum" : p < 30 ? "minimum" : p < 50 ? "sederhana" : p <= 72 ? "agak tinggi" : p < 90 ? "tinggi" : "hampir mutlak";
        K.baca.innerHTML =
          G.nilai([
            ["Sistem", S.pendek, S.kelas],
            ["Campur tangan kerajaan", tahap, ""],
            ["Paling hampir", dekat[1], ""]
          ]) +
          '<div class="ayat"><span class="status ' + S.status + '">' + S.nama + "</span> juga dikenal sebagai " + S.alias + ". Contoh negara: <b>" + S.contoh + "</b>.</div>" +
          '<div class="jadual ringkas"><table><tbody>' +
          baris("Pemilikan faktor pengeluaran", S.pemilikan) +
          baris("Penentu kehendak", S.penentu) +
          baris("Pembuat pilihan", S.pilihan) +
          baris("Apa dikeluarkan?", S.apa) +
          baris("Berapa dikeluarkan?", S.berapa) +
          baris("Bagaimana dikeluarkan?", S.bagaimana) +
          baris("Untuk siapa?", S.siapa) +
          "</tbody></table></div>";
      }

      G.interaksi(plot, {
        seret: function (n, pt) {
          if (n !== "pos" || pt.x == null) return;
          st.pos = E.clamp(pt.x, 0, 100);
          lukis();
        },
        tekan: function (pt) {
          var dekat = null;
          NEGARA.forEach(function (n) {
            if (Math.abs(plot.X(n[0]) - pt.px) < 22 && (!dekat || Math.abs(n[0] - pt.x) < Math.abs(dekat[0] - pt.x))) dekat = n;
          });
          st.pos = dekat ? dekat[0] : E.clamp(pt.x, 0, 100);
          lukis();
        },
        tekanSeret: true,
        kekunci: function (k) {
          st.pos = E.clamp(st.pos + (k.dx || k.dy) * 2, 0, 100);
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
    { tajuk: "Spektrum sistem ekonomi", bab: "t4-b1" }
  );

  /* =========================================================
     BAB 3 · Guna tenaga mengikut sektor (Rajah 3.3)
     ========================================================= */
  G.daftar(
    "guna-tenaga",
    function (host, opt) {
      var K = G.kad(host, {
        tajuk: opt.tajuk || "Guna tenaga mengikut sektor di Malaysia",
        petunjuk: "Gerakkan tetikus atau ketik pada tahun"
      });
      var TAHUN = [1960, 1970, 1980, 1990, 2000, 2010, 2014];
      function siri(id, nama, label, kelas, warna, nilai) {
        return {
          id: id,
          nama: nama,
          label: label,
          kelas: kelas,
          warna: warna,
          data: TAHUN.map(function (t, i) {
            return [t, nilai[i]];
          })
        };
      }
      var SIRI = [
        siri("utama", "Sektor utama", "Utama", "c3", "c-3", [62.3, 53.1, 41.4, 26.6, 17.0, 14.1, 12.9]),
        siri("kedua", "Sektor kedua", "Kedua", "s", "c-s", [12.3, 15.4, 21.3, 26.2, 31.7, 26.8, 25.8]),
        siri("ketiga", "Sektor ketiga", "Ketiga", "d", "c-d", [25.3, 31.5, 37.4, 47.2, 51.3, 59.1, 61.3])
      ];
      var AYAT = {
        1960: "Ekonomi bergantung kepada <b>sektor utama</b> (pertanian, perhutanan, perikanan, perlombongan) seperti getah dan bijih timah. Lebih separuh tenaga buruh bekerja dalam sektor ini.",
        1970: "Sektor utama masih dominan tetapi peratusnya mula menurun apabila perindustrian digalakkan.",
        1980: "Perindustrian berkembang. Sumbangan sektor kedua (pembuatan, pembinaan) dan sektor ketiga (perkhidmatan) terus meningkat.",
        1990: "Sektor ketiga menjadi <b>penyumbang guna tenaga terbesar</b>, manakala sektor utama dan sektor kedua hampir setara.",
        2000: "Sektor kedua mencapai tahap tertinggi (31.7%) hasil perkembangan industri pembuatan.",
        2010: "Ekonomi beralih kepada perkhidmatan. Sektor kedua mula menurun, sektor ketiga melebihi separuh jumlah guna tenaga.",
        2014: "Sektor ketiga menyumbang <b>61.3%</b> guna tenaga, sektor utama tinggal 12.9%. Trend: sektor utama menurun, sektor kedua tidak stabil, sektor ketiga meningkat."
      };
      var carta = G.carta(
        K.kanvas,
        {
          x: [1956, 2022],
          y: [0, 70],
          tikX: [1960, 1970, 1980, 1990, 2000, 2010, 2020],
          tikY: [0, 10, 20, 30, 40, 50, 60, 70],
          fmtTikX: String,
          fmtTikY: function (v) {
            return v + "%";
          },
          asalan: false,
          labelX: "Tahun",
          labelY: "Peratus guna tenaga",
          siri: SIRI,
          nilaiX: TAHUN,
          xAwal: 2014,
          fmtX: String,
          aria: "Carta garis guna tenaga mengikut sektor"
        },
        baca
      );
      G.legenda(K.kawalan, SIRI, carta.lukis);

      function baca(x) {
        if (x == null) return;
        var i = TAHUN.indexOf(x);
        var bits = [["Tahun", x, ""]].concat(
          SIRI.map(function (s) {
            return [s.nama, E.fmt(s.data[i][1], 1) + "%", s.kelas];
          })
        );
        K.baca.innerHTML =
          G.nilai(bits) + '<div class="ayat">' + AYAT[x] + ' <span class="teks-lemah">Sumber: buku teks (Kementerian Kewangan, Laporan Ekonomi 2015/16).</span></div>';
      }

      var henti = G.pantauSaiz(K.kanvas, carta.ukur);
      return { musnah: henti };
    },
    { tajuk: "Guna tenaga mengikut sektor", bab: "t4-b3" }
  );

  /* =========================================================
     BAB 3 · Upah wang lawan upah benar
     ========================================================= */
  G.daftar(
    "upah-benar",
    function (host, opt) {
      var K = G.kad(host, { tajuk: opt.tajuk || "Upah wang dan upah benar (kuasa beli)", petunjuk: "Ubah upah atau harga barang" });
      var ASAL = { upah: 3000, a: 5, b: 10, c: 15 };
      var st = Object.assign({}, ASAL);
      var grid = G.gridMedan(K.kawalan);
      var m = {
        upah: G.medan(grid, { label: "Upah wang (RM)", nilai: st.upah, min: 0, max: 50000, step: 100, ubah: ubah("upah") }),
        a: G.medan(grid, { label: "Harga A (RM)", nilai: st.a, min: 0.5, max: 1000, step: 0.5, ubah: ubah("a") }),
        b: G.medan(grid, { label: "Harga B (RM)", nilai: st.b, min: 0.5, max: 1000, step: 0.5, ubah: ubah("b") }),
        c: G.medan(grid, { label: "Harga C (RM)", nilai: st.c, min: 0.5, max: 1000, step: 0.5, ubah: ubah("c") })
      };
      function ubah(k) {
        return function (v) {
          st[k] = v;
          lukis();
        };
      }
      function set(o) {
        Object.assign(st, o);
        for (var k in m) m[k].set(st[k]);
        lukis();
      }
      G.butang(K.kawalan, "Harga purata naik ke RM20", function () {
        set({ a: 10, b: 20, c: 30 });
      });
      G.butang(K.kawalan, "Upah naik 20%", function () {
        set({ upah: Math.round(st.upah * 1.2) });
      });
      G.butang(K.kawalan, E.ikon("ulang") + " Set semula", function () {
        set(ASAL);
      });

      var plot = G.plot(K.kanvas, { x: [0, 1], y: [0, 1], tinggi: 200, margin: { l: 14, r: 14, t: 10, b: 10 }, aria: "Kuasa beli upah benar" });
      var UNIT = 10;
      var HAD = 80;
      var benarAsal = ASAL.upah / ((ASAL.a + ASAL.b + ASAL.c) / 3);

      function lukis() {
        var harga = (st.a + st.b + st.c) / 3;
        var benar = harga > 0 ? st.upah / harga : 0;
        var n = Math.floor(benar / UNIT + 1e-9);
        var nAsal = Math.round(benarAsal / UNIT);
        var jumlah = Math.min(HAD, Math.max(n, nAsal));
        var lajur = 10;
        var baris = Math.max(3, Math.ceil(jumlah / lajur));
        plot.cfg.tinggi = 34 + baris * Math.min(28, (Math.max(280, K.kanvas.clientWidth || 560) - 28) / lajur) + 16;
        plot.ukur();
        plot.kosong();
        var kiri = plot.kiri(),
          kanan = plot.kanan();
        var sel = Math.min(28, (kanan - kiri) / lajur);
        var r = sel * 0.33;
        var ofset = kiri + (kanan - kiri - sel * lajur) / 2;
        var atas = plot.atas() + 26;
        var tk = svgEl("text", { x: ofset, y: plot.atas() + 12, class: "g-label" }, plot.lapis.label);
        tk.textContent = "Setiap ● = " + UNIT + " unit barang yang mampu dibeli";
        for (var i = 0; i < jumlah; i++) {
          var cx = ofset + (i % lajur) * sel + sel / 2;
          var cy = atas + Math.floor(i / lajur) * sel + sel / 2;
          var kelas = i < Math.min(n, nAsal) ? "g-nod isi c3" : i < n ? "g-nod isi c4" : "g-nod hilang";
          svgEl("circle", { cx: cx, cy: cy, r: r, class: kelas }, plot.lapis.tanda);
        }
        if (n > HAD) {
          var tl = svgEl("text", { x: kanan, y: plot.atas() + 12, class: "g-teks c4", "text-anchor": "end" }, plot.lapis.label);
          tl.textContent = "+" + (n - HAD) * UNIT + " unit lagi";
        }
        baca(harga, benar);
      }

      function baca(harga, benar) {
        var beza = ((benar - benarAsal) / benarAsal) * 100;
        var ayat =
          "Upah benar = upah wang ÷ harga purata = " + E.rm(st.upah, 0) + " ÷ " + E.rm(harga, 2, true) + " = <b>" + E.fmt(benar, 1) + " unit</b>. Upah benar ialah jumlah barang dan perkhidmatan yang mampu dibeli dengan sejumlah upah wang, juga dikenal sebagai <b>kuasa beli</b> upah wang.";
        if (beza < -0.5) ayat += ' <span class="status buruk">Kuasa beli merosot ' + E.fmt(-beza, 0) + "%</span> Harga naik lebih cepat daripada upah wang. Titik bergaris menunjukkan barang yang tidak lagi mampu dibeli.";
        else if (beza > 0.5) ayat += ' <span class="status baik">Kuasa beli naik ' + E.fmt(beza, 0) + "%</span> Upah wang naik lebih cepat daripada harga barang.";
        else if (st.upah !== ASAL.upah) ayat += " Upah wang dan harga berubah pada kadar yang sama, maka upah benar tidak berubah.";
        K.baca.innerHTML =
          G.nilai([
            ["Upah wang", E.rm(st.upah, 0), ""],
            ["Harga purata", E.rm(harga, 2, true), ""],
            ["Upah benar", E.fmt(benar, 1) + " unit", "c3"]
          ]) +
          '<div class="ayat">' + ayat + "</div>";
      }

      lukis();
      var henti = G.pantauSaiz(K.kanvas, lukis);
      return { musnah: henti };
    },
    { tajuk: "Upah wang dan upah benar", bab: "t4-b3" }
  );

  /* =========================================================
     BAB 3 · Pendapatan boleh guna (contoh Encik Zaidi)
     ========================================================= */
  G.daftar(
    "pbg",
    function (host, opt) {
      var K = G.kad(host, { tajuk: opt.tajuk || "Pendapatan boleh guna (contoh Encik Zaidi)", petunjuk: "Ubah pendapatan, potongan dan tabungan" });
      var ASAL = { gaji: 6000, elaun: 1000, perkeso: 17.5, zakat: 50, cukai: 110, tabung: 10 };
      var st = Object.assign({}, ASAL);
      var grid = G.gridMedan(K.kawalan);
      var medan = {};
      [
        ["gaji", "Gaji (RM)", 100],
        ["elaun", "Elaun (RM)", 50],
        ["perkeso", "PERKESO (RM)", 0.5],
        ["zakat", "Zakat (RM)", 10],
        ["cukai", "Cukai (RM)", 10]
      ].forEach(function (x) {
        medan[x[0]] = G.medan(grid, {
          label: x[1],
          nilai: st[x[0]],
          min: 0,
          max: 200000,
          step: x[2],
          ubah: function (v) {
            st[x[0]] = v;
            lukis();
          }
        });
      });
      var jt = G.julat(K.kawalan, {
        label: "Tabungan",
        min: 0,
        max: 50,
        step: 1,
        nilai: st.tabung,
        fmt: function (v) {
          return v + "% PBG";
        },
        ubah: function (v) {
          st.tabung = v;
          lukis();
        }
      });
      G.butang(K.kawalan, E.ikon("ulang") + " Contoh buku teks", function () {
        Object.assign(st, ASAL);
        for (var k in medan) medan[k].set(st[k]);
        jt.set(st.tabung);
        lukis();
      });
      var plot = G.plot(K.kanvas, { x: [0, 1], y: [0, 1], tinggi: 156, margin: { l: 14, r: 14, t: 10, b: 6 }, aria: "Bar pendapatan boleh guna" });

      function lukis() {
        plot.kosong();
        var kasar = st.gaji + st.elaun;
        var kwsp = E.bundar(kasar * 0.11, 2);
        var potong = kwsp + st.perkeso + st.zakat + st.cukai;
        var pbg = kasar - potong;
        var tabung = (Math.max(0, pbg) * st.tabung) / 100;
        var belanja = Math.max(0, pbg) - tabung;
        G.barMendatar(
          plot,
          [
            {
              label: "Pendapatan individu",
              jumlah: G.rm(kasar),
              bahagian: [
                { nilai: Math.max(0, pbg), kelas: "c3", label: "Pendapatan boleh guna", teks: G.rm(pbg), pendek: "PBG" },
                { nilai: kwsp, kelas: "d", label: "KWSP (11%)", teks: G.rm(kwsp), pendek: "KWSP" },
                { nilai: st.perkeso, kelas: "c5", label: "PERKESO", teks: G.rm(st.perkeso), pendek: "PERKESO" },
                { nilai: st.zakat, kelas: "c4", label: "Zakat", teks: G.rm(st.zakat), pendek: "Zakat" },
                { nilai: st.cukai, kelas: "s", label: "Cukai pendapatan", teks: G.rm(st.cukai), pendek: "Cukai" }
              ]
            },
            {
              label: "Penggunaan PBG",
              jumlah: G.rm(pbg),
              bahagian: [
                { nilai: belanja, kelas: "c4", label: "Perbelanjaan penggunaan", teks: G.rm(belanja), pendek: "Perbelanjaan" },
                { nilai: tabung, kelas: "baik", label: "Tabungan", teks: G.rm(tabung), pendek: "Tabungan" }
              ]
            }
          ],
          { maks: Math.max(1, kasar) }
        );
        K.baca.innerHTML =
          G.nilai([
            ["Pendapatan individu", G.rm(kasar), ""],
            ["Potongan wajib", G.rm(potong), "s"],
            ["PBG", G.rm(pbg), "c3"],
            ["Tabungan", G.rm(tabung), "c4"]
          ]) +
          '<div class="ayat">KWSP pekerja = 11% × ' + G.rm(kasar) + " = " + G.rm(kwsp) + ". Jumlah potongan wajib = " + G.rm(kwsp) + " + " + G.rm(st.perkeso) + " + " + G.rm(st.zakat) + " + " + G.rm(st.cukai) + " = <b>" + G.rm(potong) + "</b>.<br>" +
          "<b>Pendapatan boleh guna = pendapatan individu − potongan wajib = " + G.rm(kasar) + " − " + G.rm(potong) + " = " + G.rm(pbg) + "</b>. PBG digunakan untuk <b>perbelanjaan penggunaan + tabungan</b>.</div>";
      }

      lukis();
      var henti = G.pantauSaiz(K.kanvas, function () {
        plot.ukur();
        lukis();
      });
      return { musnah: henti };
    },
    { tajuk: "Pendapatan boleh guna", bab: "t4-b3" }
  );

  /* =========================================================
     BAB 3 · Belanjawan peribadi (contoh Puan Malisah)
     ========================================================= */
  G.daftar(
    "belanjawan",
    function (host, opt) {
      var K = G.kad(host, { tajuk: opt.tajuk || "Belanjawan peribadi Puan Malisah (sebulan)", petunjuk: "Ubah peruntukan setiap kategori" });
      var PBG = 7820;
      var KAT = [
        { id: "tetap", label: "Tetap", nama: "Perbelanjaan tetap", nota: "ansuran rumah RM1 500, ansuran kereta RM1 100, insurans RM600, bil RM500", asal: 3700, kelas: "d" },
        { id: "harian", label: "Harian", nama: "Perbelanjaan harian", nota: "makanan RM1 000, petrol RM400, wang saku anak RM200", asal: 1600, kelas: "c4" },
        { id: "lain", label: "Luar jangka", nama: "Luar jangka & lain-lain", nota: "perubatan RM200, pelancongan RM500, derma RM200", asal: 900, kelas: "c5" },
        { id: "tabung", label: "Simpanan", nama: "Simpanan & pelaburan", nota: "simpanan RM500, amanah saham RM100", asal: 600, kelas: "c3" }
      ];
      var st = {};
      var gelangsar = {};
      KAT.forEach(function (k) {
        st[k.id] = k.asal;
        gelangsar[k.id] = G.julat(K.kawalan, {
          label: k.label,
          min: 0,
          max: 6000,
          step: 50,
          nilai: k.asal,
          fmt: function (v) {
            return E.rm(v, 0);
          },
          ubah: function (v) {
            st[k.id] = v;
            lukis();
          }
        });
      });
      G.butang(K.kawalan, E.ikon("ulang") + " Contoh buku teks", function () {
        KAT.forEach(function (k) {
          st[k.id] = k.asal;
          gelangsar[k.id].set(k.asal);
        });
        lukis();
      });
      var plot = G.plot(K.kanvas, { x: [0, 1], y: [0, 1], tinggi: 84, margin: { l: 14, r: 14, t: 8, b: 6 }, aria: "Bar belanjawan peribadi" });

      function lukis() {
        plot.kosong();
        var guna = 0;
        var bahagian = KAT.map(function (k) {
          guna += st[k.id];
          return { nilai: st[k.id], kelas: k.kelas, label: k.nama, teks: E.rm(st[k.id], 0), pendek: k.id === "tabung" ? "Simpanan" : k.id === "tetap" ? "Tetap" : k.id === "harian" ? "Harian" : "Lain" };
        });
        var baki = PBG - guna;
        if (baki > 0) bahagian.push({ nilai: baki, kelas: "lembut", label: "Baki pendapatan", teks: E.rm(baki, 0), pendek: "Baki" });
        var maks = Math.max(PBG, guna) * 1.02;
        var bar = G.barMendatar(plot, [{ label: "Peruntukan PBG " + E.rm(PBG, 0), jumlah: baki >= 0 ? "Baki " + E.rm(baki, 0) : "Defisit " + E.rm(-baki, 0), bahagian: bahagian }], { maks: maks });
        var xp = bar.X(PBG);
        plot.garisPx(xp, plot.atas() + 16, xp, plot.bawah(), "g-garis-harga", "panduan");
        var ayat;
        if (baki >= 0) {
          ayat =
            '<span class="status baik">Belanjawan lebihan</span> Perbelanjaan dan simpanan (' + E.rm(guna, 0) + ") tidak melebihi PBG. Baki " + E.rm(baki, 0) + " boleh ditambah ke tabungan atau disimpan untuk kecemasan.";
        } else {
          ayat =
            '<span class="status buruk">Belanjawan defisit</span> Peruntukan melebihi PBG sebanyak <b>' + E.rm(-baki, 0) + "</b>. Utamakan <b>keperluan</b>, tangguhkan <b>kehendak</b> (contoh pelancongan) supaya tidak terjebak dengan hutang.";
        }
        K.baca.innerHTML =
          G.nilai([
            ["PBG", E.rm(PBG, 0), ""],
            ["Perbelanjaan", E.rm(guna - st.tabung, 0), "c4"],
            ["Simpanan", E.rm(st.tabung, 0), "c3"],
            [baki >= 0 ? "Baki" : "Defisit", E.rm(Math.abs(baki), 0), baki >= 0 ? "" : "s"]
          ]) +
          '<div class="ayat">' + ayat + ' <span class="teks-lemah">Contoh asal: ' + KAT.map(function (k) {
            return k.nama.toLowerCase() + " (" + k.nota + ")";
          }).join("; ") + ".</span></div>";
      }

      lukis();
      var henti = G.pantauSaiz(K.kanvas, function () {
        plot.ukur();
        lukis();
      });
      return { musnah: henti };
    },
    { tajuk: "Belanjawan peribadi", bab: "t4-b3" }
  );

  /* =========================================================
     BAB 3 · Pembelian kredit (contoh Puan Prema)
     ========================================================= */
  G.daftar(
    "sewa-beli",
    function (host, opt) {
      var K = G.kad(host, { tajuk: opt.tajuk || "Pembelian secara kredit: kereta Puan Prema", petunjuk: "Ubah syarat · gerakkan nod bulan" });
      var ASAL = { harga: 100000, dep: 20, kadar: 4, tahun: 6 };
      var st = Object.assign({ bulan: 24 }, ASAL);
      var grid = G.gridMedan(K.kawalan);
      function ubah(k, bulat) {
        return function (v) {
          st[k] = bulat ? Math.max(1, Math.round(v)) : v;
          lukis();
        };
      }
      var md = {
        harga: G.medan(grid, { label: "Harga tunai (RM)", nilai: st.harga, min: 1000, max: 3000000, step: 1000, ubah: ubah("harga") }),
        dep: G.medan(grid, { label: "Pendahuluan (%)", nilai: st.dep, min: 0, max: 90, step: 1, ubah: ubah("dep") }),
        kadar: G.medan(grid, { label: "Faedah setahun (%)", nilai: st.kadar, min: 0, max: 20, step: 0.1, ubah: ubah("kadar") }),
        tahun: G.medan(grid, { label: "Tempoh (tahun)", nilai: st.tahun, min: 1, max: 35, step: 1, ubah: ubah("tahun", true) })
      };
      G.butang(K.kawalan, E.ikon("ulang") + " Contoh buku teks", function () {
        Object.assign(st, ASAL);
        for (var k in md) md[k].set(st[k]);
        lukis();
      });

      var plot = G.plot(K.kanvas, {
        x: [0, 75],
        y: [0, 130000],
        labelX: "Bulan",
        labelY: "Jumlah dibayar (RM)",
        nisbah: function (w) {
          return w < 480 ? 0.86 : 0.56;
        },
        margin: { l: 58 },
        aria: "Graf pembelian secara kredit"
      });

      function kira() {
        var dep = (st.harga * st.dep) / 100;
        var pinjam = st.harga - dep;
        var faedah = ((pinjam * st.kadar) / 100) * st.tahun;
        var perlu = pinjam + faedah;
        var n = Math.max(1, Math.round(st.tahun * 12));
        return { dep: dep, pinjam: pinjam, faedah: faedah, perlu: perlu, n: n, ansuran: perlu / n, jumlahKos: dep + perlu };
      }

      function lukis() {
        var k = kira();
        st.bulan = E.clamp(Math.round(st.bulan), 0, k.n);
        var t = G.tikAuto(k.jumlahKos * 1.06, 5);
        var langkahX = k.n <= 36 ? 6 : k.n <= 120 ? 12 : k.n <= 240 ? 24 : 60;
        var tikX = [];
        for (var b = 0; b <= k.n; b += langkahX) tikX.push(b);
        plot.julat([0, k.n * 1.05], [0, t.maks]);
        plot.cfg.tikX = tikX;
        plot.cfg.tikY = t.tik;
        plot.cfg.fmtTikY = function (v) {
          return v >= 1e6 ? E.fmt(v / 1e6, 2) + "j" : v >= 1000 ? E.fmt(v / 1000, 1) + "k" : E.fmt(v, 0);
        };
        plot.kosong();
        plot.paksi();
        plot.laluan([[0, k.dep], [k.n, k.jumlahKos], [k.n, st.harga]], "g-kawasan c4", "kawasan", true);
        plot.laluan([[0, k.dep], [k.n, st.harga]], "g-lengkung c3 nipis", "lengkung");
        plot.laluan([[0, k.dep], [k.n, k.jumlahKos]], "g-lengkung d", "lengkung");
        plot.garis(0, st.harga, k.n * 1.05, st.harga, "g-garis-harga", "panduan");
        plot.cip(plot.kiri() + 8, plot.Y(st.harga) - 14, "Harga tunai " + E.rm(st.harga, 0), {});
        plot.teks(k.n, k.jumlahKos, "Jumlah dibayar", "g-teks d", "end", "label", -6, -10);
        plot.teks(k.n * 0.55, k.dep + (st.harga - k.dep) * 0.55, "Pokok", "g-teks c3", "start", "label", 8, 18);
        var m = st.bulan;
        var dibayar = k.dep + k.ansuran * m;
        plot.panduanKePaksi(m, dibayar, { labelX: "Bulan " + m, labelY: plot.cfg.fmtTikY(dibayar) });
        plot.nod(m, dibayar, { pegang: "bulan", kelas: "d" });
        var baki = k.jumlahKos - dibayar;
        K.baca.innerHTML =
          G.nilai([
            ["Pendahuluan", E.rm(k.dep, 0), ""],
            ["Pinjaman", E.rm(k.pinjam, 0), ""],
            ["Faedah", G.rm(k.faedah), "c4"],
            ["Ansuran", E.rm(k.ansuran, 2, true) + " sebulan", "d"],
            ["Dibayar hingga bulan " + m, E.rm(dibayar, 0), ""],
            ["Baki", E.rm(baki, 0), ""]
          ]) +
          '<div class="ayat">Jumlah pinjaman = ' + E.rm(st.harga, 0) + " − " + E.rm(k.dep, 0) + " = " + E.rm(k.pinjam, 0) + ". Faedah = " + E.rm(k.pinjam, 0) + " × " + E.fmt(st.kadar, 2) + "% × " + st.tahun + " tahun = <b>" + G.rm(k.faedah) + "</b>. " +
          "Jumlah perlu dibayar = " + E.rm(k.pinjam, 0) + " + " + G.rm(k.faedah) + " = <b>" + G.rm(k.perlu) + "</b>, maka bayaran ansuran = " + G.rm(k.perlu) + " ÷ " + k.n + " bulan = <b>" + E.rm(k.ansuran, 2, true) + "</b> sebulan. " +
          "Keseluruhannya pembeli membayar " + E.rm(k.jumlahKos, 0) + ", iaitu " + G.rm(k.faedah) + " lebih daripada harga tunai (kawasan kuning ialah faedah terkumpul).</div>";
      }

      G.interaksi(plot, {
        seret: function (n, pt) {
          if (n === "bulan" && pt.x != null) {
            st.bulan = pt.x;
            lukis();
          }
        },
        hover: function (pt) {
          var mm = E.clamp(Math.round(pt.x), 0, kira().n);
          if (mm !== st.bulan) {
            st.bulan = mm;
            lukis();
          }
        },
        tekan: function (pt) {
          st.bulan = pt.x;
          lukis();
        },
        tekanSeret: true,
        kekunci: function (kk) {
          var d = kk.dx || kk.dy;
          st.bulan += Math.abs(d) > 1 ? (d > 0 ? 12 : -12) : d;
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
    { tajuk: "Pembelian secara kredit", bab: "t4-b3" }
  );

  /* =========================================================
     BAB 3 · Risiko, pulangan & kecairan (Jadual 3.10)
     ========================================================= */
  G.daftar(
    "risiko-pulangan",
    function (host, opt) {
      var K = G.kad(host, { tajuk: opt.tajuk || "Risiko, pulangan dan kecairan pelaburan", petunjuk: "Halakan tetikus atau ketik pada titik" });
      var TAHAP = ["Bebas risiko", "Rendah", "Sederhana", "Tinggi"];
      var PUL = { 1: "Rendah", 2: "Sederhana", 3: "Tinggi" };
      var KEC = { Tinggi: "c3", Sederhana: "c4", Rendah: "s" };
      var DATA = [
        { nama: "Simpanan tetap", r: 0, p: 1, k: "Tinggi", dx: -0.17, bentuk: "faedah", nota: "Simpanan hingga RM250 000 dijamin oleh Perbadanan Insurans Deposit Malaysia (PIDM), maka dianggap bebas risiko." },
        { nama: "Sekuriti kerajaan", r: 0, p: 1, k: "Sederhana", dx: 0.17, bentuk: "faedah, dan nilai pokok dibayar semula pada tarikh matang", nota: "Dijamin oleh kerajaan, maka bebas risiko." },
        { nama: "Unit amanah", r: 1, p: 1, k: "Tinggi", dx: -0.17, bentuk: "dividen dan keuntungan modal", nota: "Dana diuruskan oleh pasukan pelaburan profesional dan risiko dikongsi antara ramai pelabur." },
        { nama: "Hartanah", r: 1, p: 1, k: "Rendah", dx: 0.17, bentuk: "sewa dan keuntungan modal", nota: "Nilai hartanah stabil tetapi aset tetap sukar ditukar kepada tunai dengan cepat." },
        { nama: "Logam berharga", r: 2, p: 3, k: "Rendah", dx: 0, bentuk: "keuntungan modal (kenaikan harga emas atau perak)", nota: "Harga logam berharga turun naik mengikut pasaran dunia." },
        { nama: "Saham syarikat", r: 3, p: 3, k: "Sederhana", dx: -0.17, bentuk: "dividen dan keuntungan modal", nota: "Harga saham terdedah kepada turun naik mengikut prestasi syarikat dan keadaan ekonomi." },
        { nama: "Urus niaga pertukaran asing (FOREX)", r: 3, p: 3, k: "Tinggi", dx: 0.17, bentuk: "keuntungan modal (perubahan nilai mata wang)", nota: "Kadar pertukaran mata wang sentiasa berubah." }
      ];
      var LEG = [
        { nama: "Kecairan tinggi", warna: "c-3", k: "Tinggi" },
        { nama: "Kecairan sederhana", warna: "c-4", k: "Sederhana" },
        { nama: "Kecairan rendah", warna: "c-s", k: "Rendah" }
      ];
      var st = { pilih: 5 };
      G.legenda(K.kawalan, LEG, function () {
        lukis();
      });

      var plot = G.plot(K.kanvas, {
        x: [-0.6, 3.6],
        y: [0.4, 3.6],
        tikX: [0, 1, 2, 3],
        tikY: [1, 2, 3],
        labelX: "Tahap risiko",
        labelY: "Tahap pulangan",
        asalan: false,
        nisbah: function (w) {
          return w < 480 ? 0.95 : 0.58;
        },
        margin: { l: 78 },
        aria: "Rajah risiko dan pulangan pelaburan"
      });

      function tunjuk(d) {
        for (var i = 0; i < LEG.length; i++) if (LEG[i].k === d.k) return LEG[i].tunjuk !== false;
        return true;
      }

      function lukis() {
        plot.cfg.fmtTikX = function (v) {
          return plot.sempit && v === 0 ? "Bebas" : TAHAP[v];
        };
        plot.cfg.fmtTikY = function (v) {
          return PUL[v];
        };
        plot.kosong();
        plot.paksi();
        plot.garis(-0.35, 0.72, 3.4, 3.45, "g-panduan", "panduan");
        plot.teks(1.55, 2.1, "risiko ↑ pulangan ↑", "g-teks lemah", "middle", "label", 0, -8);
        DATA.forEach(function (d, i) {
          if (!tunjuk(d)) return;
          var x = d.r + d.dx;
          if (i === st.pilih) plot.bulat(x, d.p, 17, "g-nod-halo", "tanda");
          plot.bulat(x, d.p, 11, "g-nod isi " + KEC[d.k], "tanda");
          var t = plot.teks(x, d.p, String(i + 1), "g-teks pada-bar", "middle", "label", 0, 4.5);
          t.style.pointerEvents = "none";
        });
        var d = DATA[st.pilih];
        if (d && tunjuk(d)) {
          var px = plot.X(d.r + d.dx),
            py = plot.Y(d.p);
          plot.cip(px, py - 30, d.nama.replace("Urus niaga pertukaran asing ", ""), { anchor: "middle", warna: "var(--" + (KEC[d.k] === "s" ? "c-s" : KEC[d.k] === "c4" ? "c-4" : "c-3") + ")" });
        }
        baca();
      }

      function baca() {
        var d = DATA[st.pilih];
        K.baca.innerHTML =
          G.nilai([
            ["Pelaburan", d.nama, ""],
            ["Risiko", TAHAP[d.r], ""],
            ["Pulangan", PUL[d.p], ""],
            ["Kecairan", d.k, KEC[d.k]]
          ]) +
          '<div class="ayat">Pulangan dalam bentuk <b>' + d.bentuk + "</b>. " + d.nota + " Secara umum hubungan risiko dengan pulangan adalah <b>positif</b>: semakin tinggi risiko, semakin tinggi pulangan. Kecairan ialah keupayaan aset ditukar menjadi tunai.</div>" +
          '<div class="teks-lemah" style="font-size:12.5px">' +
          DATA.map(function (x, i) {
            return "<b>" + (i + 1) + "</b> " + x.nama;
          }).join(" · ") +
          "</div>";
      }

      function terdekat(pt, had) {
        var pilih = -1,
          jarak = Infinity;
        DATA.forEach(function (d, i) {
          if (!tunjuk(d)) return;
          var dx = plot.X(d.r + d.dx) - pt.px,
            dy = plot.Y(d.p) - pt.py;
          var j = Math.sqrt(dx * dx + dy * dy);
          if (j < jarak) {
            jarak = j;
            pilih = i;
          }
        });
        return jarak <= had ? pilih : -1;
      }

      G.interaksi(plot, {
        hover: function (pt) {
          var i = terdekat(pt, 30);
          if (i >= 0 && i !== st.pilih) {
            st.pilih = i;
            lukis();
          }
        },
        tekan: function (pt) {
          var i = terdekat(pt, 80);
          if (i >= 0 && i !== st.pilih) {
            st.pilih = i;
            lukis();
          }
        },
        kekunci: function (k) {
          var d = k.dx || k.dy;
          st.pilih = (st.pilih + (d > 0 ? 1 : -1) + DATA.length) % DATA.length;
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
    { tajuk: "Risiko, pulangan & kecairan", bab: "t4-b3" }
  );

  /* =========================================================
     BAB 4 · TP, AP, MP & tahap pengeluaran (Jadual 4.8)
     ========================================================= */
  G.daftar(
    "tp-ap-mp",
    function (host, opt) {
      var K = G.kad(host, { tajuk: opt.tajuk || "Hukum pulangan berkurangan & tahap pengeluaran", petunjuk: "Gerakkan tetikus atau ketik pada bilangan buruh" });
      var L = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      var TP = [0, 6, 14, 24, 32, 37, 41, 44, 46, 46, 45];
      var AP = [null, 6, 7, 8, 8, 7.4, 6.83, 6.28, 5.75, 5.1, 4.5];
      var MP = [null, 6, 8, 10, 8, 5, 4, 3, 2, 0, -1];
      function data(arr) {
        var d = [];
        arr.forEach(function (v, i) {
          if (v != null) d.push([L[i], v]);
        });
        return d;
      }
      function labelZon(pendek, panjang) {
        return function (p) {
          return p.sempit ? pendek : panjang;
        };
      }
      var ZON = [
        { dari: 0, ke: 4, kelas: "z1", label: labelZon("I", "TAHAP I") },
        { dari: 4, ke: 9, kelas: "z2", label: labelZon("II", "TAHAP II") },
        { dari: 9, ke: 10.8, kelas: "z3", label: labelZon("III", "III") }
      ];
      var nisbah = function (w) {
        return w < 480 ? 0.66 : 0.42;
      };
      var fmtX = function (v) {
        return v + " buruh";
      };
      var c1 = null,
        c2 = null;
      c1 = G.carta(
        K.kanvas,
        {
          x: [0, 10.8],
          y: [0, 56],
          tikX: L,
          tikY: [0, 10, 20, 30, 40, 50],
          labelX: "Buruh (orang)",
          labelY: "Jumlah keluaran, TP (unit)",
          siri: [{ id: "tp", nama: "TP", label: "TP", kelas: "d", warna: "c-d", data: data(TP) }],
          nilaiX: L,
          xAwal: 3,
          zon: ZON,
          fmtX: fmtX,
          nisbah: nisbah,
          aria: "Keluk jumlah keluaran",
          anotasi: function (plot) {
            plot.teks(8.5, 46, "TP maksimum", "g-teks lemah", "middle", "label", 0, 20);
          }
        },
        function (x) {
          if (c2 && c2.x !== x) c2.set(x);
          baca(x);
        }
      );
      c2 = G.carta(
        K.kanvas,
        {
          x: [0, 10.8],
          y: [-2, 12],
          tikX: L,
          tikY: [-2, 0, 2, 4, 6, 8, 10, 12],
          asalan: false,
          paksiXBawah: true,
          labelX: "Buruh (orang)",
          labelY: "AP dan MP (unit)",
          siri: [
            { id: "ap", nama: "AP", label: "AP", kelas: "c3", warna: "c-3", data: data(AP) },
            { id: "mp", nama: "MP", label: "MP", kelas: "s", warna: "c-s", data: data(MP), dyLabel: 12 }
          ],
          nilaiX: L,
          xAwal: 3,
          zon: ZON,
          fmtX: fmtX,
          nisbah: nisbah,
          aria: "Keluk keluaran purata dan keluaran marginal",
          anotasi: function (plot) {
            plot.bulat(4, 8, 8, "g-nod", "tanda");
            plot.teks(4, 8, "MP = AP", "g-teks", "start", "label", 11, -9);
            plot.bulat(9, 0, 8, "g-nod", "tanda");
            plot.teks(9, 0, "MP = 0", "g-teks", "end", "label", -11, -9);
            plot.teks(3, 10, "MP maks", "g-teks s", "middle", "label", 0, -11);
          }
        },
        function (x) {
          if (c1 && c1.x !== x) c1.set(x);
          baca(x);
        }
      );
      c2.plot.svg.style.borderTop = "1px solid var(--line)";

      function baca(x) {
        if (x == null) return;
        var i = L.indexOf(x);
        var bits = [
          ["Buruh", x + " orang", ""],
          ["TP", TP[i] + " unit", "d"],
          ["AP", AP[i] == null ? "–" : E.fmt(AP[i], 2) + " unit", "c3"],
          ["MP", MP[i] == null ? "–" : E.fmt(MP[i], 0) + " unit", "s"]
        ];
        var ayat;
        if (x === 0) ayat = "Tanpa buruh (input berubah), tiada keluaran walaupun tanah (input tetap) tersedia.";
        else if (x < 4)
          ayat =
            '<span class="status biru">Tahap I · tidak cekap</span> TP bertambah dengan kadar semakin cepat kerana MP ' + (x < 3 ? "sedang meningkat" : "mencapai maksimum 10 unit pada buruh ke-3") +
            ", dan AP juga meningkat. Input berubah terlalu sedikit berbanding input tetap, maka berlaku <b>pembaziran input tetap</b>. Pengeluar rasional tidak akan berhenti di tahap ini.";
        else if (x <= 9)
          ayat =
            '<span class="status baik">Tahap II · paling cekap</span> Bermula apabila MP = AP (AP maksimum 8 unit, buruh ke-4) dan berakhir apabila MP = 0 (TP maksimum 46 unit, buruh ke-9). TP bertambah dengan kadar berkurangan, manakala AP dan MP menurun. Gabungan input berubah dengan input tetap paling optimum.';
        else ayat = '<span class="status merah">Tahap III · tidak cekap</span> MP negatif (−1 unit) dan TP merosot daripada 46 kepada 45 unit. Berlaku <b>pembaziran input berubah</b>: lebih ramai buruh menghasilkan keluaran yang semakin kurang.';
        if (x >= 4) ayat += "<br><b>Hukum pulangan berkurangan</b>: selepas buruh ke-3, setiap buruh tambahan menambah keluaran yang semakin kecil (MP buruh ke-" + x + " = " + E.fmt(MP[i], 0) + " unit).";
        K.baca.innerHTML = G.nilai(bits) + '<div class="ayat">' + ayat + "</div>";
      }
      baca(3);

      var henti = G.pantauSaiz(K.kanvas, function () {
        c1.ukur();
        c2.ukur();
      });
      return { musnah: henti };
    },
    { tajuk: "TP, AP, MP & tahap pengeluaran", bab: "t4-b4" }
  );

  /* =========================================================
     BAB 4 · Keluk kos jangka pendek (Jadual 4.3)
     ========================================================= */
  G.daftar(
    "kos",
    function (host, opt) {
      var K = G.kad(host, { tajuk: opt.tajuk || "Kos pengeluaran jangka pendek", petunjuk: "Gerakkan tetikus atau ketik pada output" });
      var Q = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      var VC = [0, 50, 95, 130, 160, 195, 245, 315, 395];
      var TC = VC.map(function (v) {
        return v + 100;
      });
      var AC = [null, 150, 97.5, 76.7, 65, 59, 57.5, 59.3, 61.9];
      var AVC = [null, 50, 47.5, 43.3, 40, 39, 40.8, 45, 49.4];
      var MC = [null, 50, 45, 35, 30, 35, 50, 70, 80];
      function d(arr) {
        var h = [];
        arr.forEach(function (v, i) {
          if (v != null) h.push([Q[i], v]);
        });
        return h;
      }
      var S1 = [
        { id: "tc", nama: "TC", label: "TC", kelas: "c5", warna: "c-5", data: d(TC) },
        { id: "vc", nama: "VC", label: "VC", kelas: "s", warna: "c-s", data: d(VC) },
        {
          id: "fc",
          nama: "FC",
          label: "FC",
          kelas: "c6",
          warna: "c-6",
          licin: false,
          titik: false,
          data: d(
            Q.map(function () {
              return 100;
            })
          )
        }
      ];
      var S2 = [
        { id: "ac", nama: "AC", label: "AC", kelas: "d", warna: "c-d", data: d(AC) },
        { id: "avc", nama: "AVC", label: "AVC", kelas: "c3", warna: "c-3", data: d(AVC) },
        { id: "mc", nama: "MC", label: "MC", kelas: "c4", warna: "c-4", data: d(MC) }
      ];
      var Q1 = [1, 2, 3, 4, 5, 6, 7, 8];
      var fAC = G.monoton(Q1, AC.slice(1));
      var fAVC = G.monoton(Q1, AVC.slice(1));
      var fMC = G.monoton(Q1, MC.slice(1));
      function silang(f, g, a, b) {
        var v0 = f(a) - g(a);
        for (var x = a + 0.01; x <= b + 1e-9; x += 0.01) {
          var v = f(x) - g(x);
          if (v0 * v <= 0) return x;
          v0 = v;
        }
        return null;
      }
      var xAC = silang(fMC, fAC, 4, 8);
      var xAVC = silang(fMC, fAVC, 3, 8);
      var nisbah = function (w) {
        return w < 480 ? 0.72 : 0.44;
      };
      var fmtX = function (v) {
        return "Q = " + v;
      };
      var c1 = null,
        c2 = null;
      c1 = G.carta(
        K.kanvas,
        {
          x: [0, 9],
          y: [0, 540],
          tikX: Q,
          tikY: [0, 100, 200, 300, 400, 500],
          labelX: "Output (unit)",
          labelY: "Kos (RM)",
          siri: S1,
          nilaiX: Q,
          xAwal: 4,
          fmtX: fmtX,
          nisbah: nisbah,
          aria: "Keluk jumlah kos, kos berubah dan kos tetap",
          anotasi: function (plot, x) {
            if (x == null || S1[0].tunjuk === false || S1[1].tunjuk === false) return;
            var xo = x + 0.22;
            plot.garis(xo, VC[x], xo, TC[x], "g-garis-kurung", "tanda");
            plot.garis(xo - 0.08, VC[x], xo + 0.08, VC[x], "g-garis-kurung", "tanda");
            plot.garis(xo - 0.08, TC[x], xo + 0.08, TC[x], "g-garis-kurung", "tanda");
            plot.teks(xo, (VC[x] + TC[x]) / 2, "FC", "g-teks", "start", "label", 7, 4);
          }
        },
        function (x) {
          if (c2 && c2.x !== x) c2.set(x);
          baca(x);
        }
      );
      c2 = G.carta(
        K.kanvas,
        {
          x: [0, 9],
          y: [0, 160],
          tikX: Q,
          tikY: [0, 40, 80, 120, 160],
          labelX: "Output (unit)",
          labelY: "Kos seunit (RM)",
          siri: S2,
          nilaiX: Q,
          xAwal: 4,
          fmtX: fmtX,
          nisbah: nisbah,
          aria: "Keluk kos purata, kos berubah purata dan kos marginal",
          anotasi: function (plot) {
            if (xAC != null && S2[0].tunjuk !== false && S2[2].tunjuk !== false) {
              plot.bulat(xAC, fAC(xAC), 7, "g-nod", "tanda");
              plot.teks(xAC, fAC(xAC), "MC = AC", "g-teks", "end", "label", -10, -10);
            }
            if (xAVC != null && S2[1].tunjuk !== false && S2[2].tunjuk !== false) {
              plot.bulat(xAVC, fAVC(xAVC), 7, "g-nod", "tanda");
              plot.teks(xAVC, fAVC(xAVC), "MC = AVC", "g-teks lemah", "start", "label", 8, 22);
            }
          }
        },
        function (x) {
          if (c1 && c1.x !== x) c1.set(x);
          baca(x);
        }
      );
      c2.plot.svg.style.borderTop = "1px solid var(--line)";
      G.legenda(K.kawalan, S1.concat(S2), function () {
        c1.lukis();
        c2.lukis();
      });

      function baca(x) {
        if (x == null) return;
        var bits = [
          ["Output", x + " unit", ""],
          ["FC", "RM100", ""],
          ["VC", "RM" + VC[x], "s"],
          ["TC", "RM" + TC[x], "c5"]
        ];
        var ayat;
        if (x === 0) {
          ayat = "Pada output sifar, kos berubah = 0 tetapi firma tetap menanggung <b>kos tetap RM100</b> (contohnya sewa bangunan, premium insurans), maka TC = FC.";
        } else {
          bits.push(["AC", E.rm(AC[x], 1), "d"], ["AVC", E.rm(AVC[x], 1), "c3"], ["MC", "RM" + MC[x], "c4"]);
          ayat =
            "TC = FC + VC = RM100 + RM" + VC[x] + " = <b>RM" + TC[x] + "</b>. AC = TC ÷ Q = RM" + TC[x] + " ÷ " + x + " = <b>" + E.rm(AC[x], 1) + "</b>. MC = ΔTC ÷ ΔQ = (RM" + TC[x] + " − RM" + TC[x - 1] + ") ÷ 1 = <b>RM" + MC[x] + "</b>. " +
            (MC[x] < AC[x] ? '<span class="status biru">MC &lt; AC</span> maka AC sedang <b>menurun</b>.' : '<span class="status merah">MC &gt; AC</span> maka AC sedang <b>meningkat</b>.') +
            " MC memotong AC pada titik minimum AC.";
        }
        K.baca.innerHTML = G.nilai(bits) + '<div class="ayat">' + ayat + "</div>";
      }
      baca(4);

      var henti = G.pantauSaiz(K.kanvas, function () {
        c1.ukur();
        c2.ukur();
      });
      return { musnah: henti };
    },
    { tajuk: "Keluk kos jangka pendek", bab: "t4-b4" }
  );

  /* =========================================================
     BAB 4 · Untung perakaunan lawan untung ekonomi
     ========================================================= */
  G.daftar(
    "untung",
    function (host, opt) {
      var K = G.kad(host, { tajuk: opt.tajuk || "Untung dan untung ekonomi: kedai bakeri Puan Surayati", petunjuk: "Ubah hasil dan kos" });
      var ASAL = { tr: 10000, bahan: 3000, gaji: 900, bil: 1000, dilepas: 3000, faedah: 40 };
      var st = Object.assign({}, ASAL);
      var grid = G.gridMedan(K.kawalan);
      var md = {};
      [
        ["tr", "Jumlah hasil (RM)"],
        ["bahan", "Bahan mentah (RM)"],
        ["gaji", "Gaji pembantu (RM)"],
        ["bil", "Bil utiliti (RM)"],
        ["dilepas", "Gaji dilepaskan (RM)"],
        ["faedah", "Faedah simpanan (RM)"]
      ].forEach(function (x) {
        md[x[0]] = G.medan(grid, {
          label: x[1],
          nilai: st[x[0]],
          min: 0,
          max: 1000000,
          step: 10,
          ubah: function (v) {
            st[x[0]] = v;
            lukis();
          }
        });
      });
      G.butang(K.kawalan, E.ikon("ulang") + " Contoh buku teks", function () {
        Object.assign(st, ASAL);
        for (var k in md) md[k].set(st[k]);
        lukis();
      });
      var plot = G.plot(K.kanvas, { x: [0, 1], y: [0, 1], tinggi: 236, margin: { l: 14, r: 14, t: 10, b: 6 }, aria: "Bar untung dan untung ekonomi" });

      function lukis() {
        plot.kosong();
        var eks = st.bahan + st.gaji + st.bil;
        var imp = st.dilepas + st.faedah;
        var untung = st.tr - eks;
        var ekon = st.tr - eks - imp;
        var maks = Math.max(st.tr, eks + imp, 1) * 1.02;
        var bar = G.barMendatar(
          plot,
          [
            { label: "Jumlah hasil", jumlah: E.rm(st.tr, 0), bahagian: [{ nilai: st.tr, kelas: "c3", label: "Jumlah hasil", teks: E.rm(st.tr, 0), pendek: "TR" }] },
            {
              label: "Pandangan akauntan",
              jumlah: (untung >= 0 ? "Untung " : "Rugi ") + E.rm(Math.abs(untung), 0),
              bahagian: [
                { nilai: eks, kelas: "s", label: "Kos eksplisit", teks: E.rm(eks, 0), pendek: "Eksplisit" },
                { nilai: Math.max(0, untung), kelas: "baik", label: "Untung", teks: E.rm(untung, 0), pendek: "Untung" }
              ]
            },
            {
              label: "Pandangan ahli ekonomi",
              jumlah: (ekon >= 0 ? "Untung ekonomi " : "Rugi ekonomi ") + E.rm(Math.abs(ekon), 0),
              bahagian: [
                { nilai: eks, kelas: "s", label: "Kos eksplisit", teks: E.rm(eks, 0), pendek: "Eksplisit" },
                { nilai: imp, kelas: "c4", label: "Kos implisit", teks: E.rm(imp, 0), pendek: "Implisit" },
                { nilai: Math.max(0, ekon), kelas: "baik", label: "Untung ekonomi", teks: E.rm(ekon, 0), pendek: "Untung" }
              ]
            }
          ],
          { maks: maks }
        );
        var xt = bar.X(st.tr);
        plot.garisPx(xt, plot.atas() + 18, xt, plot.bawah(), "g-garis-silang", "panduan");
        K.baca.innerHTML =
          G.nilai([
            ["Kos eksplisit", E.rm(eks, 0), "s"],
            ["Kos implisit", E.rm(imp, 0), "c4"],
            ["Untung", E.rm(untung, 0), untung >= 0 ? "c3" : "s"],
            ["Untung ekonomi", E.rm(ekon, 0), ekon >= 0 ? "c3" : "s"]
          ]) +
          '<div class="ayat">Jumlah untung = jumlah hasil − jumlah kos = ' + E.rm(st.tr, 0) + " − " + E.rm(eks, 0) + " = <b>" + E.rm(untung, 0) + "</b>.<br>" +
          "Untung ekonomi = jumlah hasil − (kos eksplisit + kos implisit) = " + E.rm(st.tr, 0) + " − (" + E.rm(eks, 0) + " + " + E.rm(imp, 0) + ") = <b>" + E.rm(ekon, 0) + "</b>. " +
          "Kos implisit ialah kos faktor milik sendiri (gaji yang dilepaskan dan faedah simpanan yang tidak diperoleh) yang tidak dibayar secara nyata tetapi merupakan kos lepas." +
          (ekon < 0 && untung >= 0 ? ' <span class="status amaran">Untung di atas kertas, rugi dari segi ekonomi</span>' : "") +
          "</div>";
      }

      lukis();
      var henti = G.pantauSaiz(K.kanvas, function () {
        plot.ukur();
        lukis();
      });
      return { musnah: henti };
    },
    { tajuk: "Untung & untung ekonomi", bab: "t4-b4" }
  );

  /* =========================================================
     BAB 4 · Produktiviti (Kilang A lawan Kilang B)
     ========================================================= */
  G.daftar(
    "produktiviti",
    function (host, opt) {
      var K = G.kad(host, { tajuk: opt.tajuk || "Produktiviti: Kilang A lawan Kilang B", petunjuk: "Ubah output dan bilangan pekerja" });
      var ASAL = { oa: 120, la: 5, ob: 100, lb: 4 };
      var st = Object.assign({}, ASAL);
      var j = {};
      [
        ["oa", "Output A", 20, 300, 5, " helai"],
        ["la", "Pekerja A", 1, 15, 1, " orang"],
        ["ob", "Output B", 20, 300, 5, " helai"],
        ["lb", "Pekerja B", 1, 15, 1, " orang"]
      ].forEach(function (x) {
        j[x[0]] = G.julat(K.kawalan, {
          label: x[1],
          min: x[2],
          max: x[3],
          step: x[4],
          nilai: st[x[0]],
          fmt: function (v) {
            return v + x[5];
          },
          ubah: function (v) {
            st[x[0]] = v;
            lukis();
          }
        });
      });
      G.butang(K.kawalan, E.ikon("ulang") + " Contoh buku teks", function () {
        Object.assign(st, ASAL);
        for (var k in j) j[k].set(st[k]);
        lukis();
      });
      var plot = G.plot(K.kanvas, { x: [0, 1], y: [0, 1], tinggi: 164, margin: { l: 14, r: 14, t: 10, b: 6 }, aria: "Bar produktiviti" });

      function lukis() {
        plot.kosong();
        var pa = st.oa / st.la,
          pb = st.ob / st.lb;
        var maks = Math.max(pa, pb) * 1.08;
        G.barMendatar(
          plot,
          [
            { label: "Kilang A · " + st.oa + " helai ÷ " + st.la + " pekerja", jumlah: E.fmt(pa, 2) + " helai/pekerja", bahagian: [{ nilai: pa, kelas: pa >= pb ? "c3" : "c6", label: "Produktiviti A", teks: E.fmt(pa, 2), pendek: "A" }] },
            { label: "Kilang B · " + st.ob + " helai ÷ " + st.lb + " pekerja", jumlah: E.fmt(pb, 2) + " helai/pekerja", bahagian: [{ nilai: pb, kelas: pb >= pa ? "c3" : "c6", label: "Produktiviti B", teks: E.fmt(pb, 2), pendek: "B" }] }
          ],
          { maks: maks }
        );
        var menang = Math.abs(pa - pb) < 1e-9 ? "" : pa > pb ? "A" : "B";
        var perlu = Math.ceil(pb * st.la);
        var ayat =
          "Produktiviti = output ÷ input. Kilang A = " + st.oa + " ÷ " + st.la + " = <b>" + E.fmt(pa, 2) + "</b>, Kilang B = " + st.ob + " ÷ " + st.lb + " = <b>" + E.fmt(pb, 2) + "</b> helai seorang pekerja. " +
          (menang
            ? "<b>Kilang " + menang + "</b> lebih produktif" + ((menang === "B" && st.ob < st.oa) || (menang === "A" && st.oa < st.ob) ? " walaupun jumlah outputnya lebih kecil" : "") + ", maka penggunaan inputnya lebih cekap dan kos seunitnya lebih rendah."
            : "Kedua-dua kilang sama produktif.") +
          (menang === "B" ? " Kilang A perlu menghasilkan sekurang-kurangnya " + perlu + " helai dengan " + st.la + " pekerja untuk menyamai Kilang B." : "");
        K.baca.innerHTML =
          G.nilai([
            ["Produktiviti A", E.fmt(pa, 2), menang === "A" ? "c3" : ""],
            ["Produktiviti B", E.fmt(pb, 2), menang === "B" ? "c3" : ""]
          ]) + '<div class="ayat">' + ayat + "</div>";
      }

      lukis();
      var henti = G.pantauSaiz(K.kanvas, function () {
        plot.ukur();
        lukis();
      });
      return { musnah: henti };
    },
    { tajuk: "Produktiviti", bab: "t4-b4" }
  );
})();
