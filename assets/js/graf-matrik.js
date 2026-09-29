/* =========================================================
   Econ Tutor · graf interaktif Matrikulasi (AE015, AE025)
   carta-jadual: keluk daripada jadual modul (TU/MU, TP/AP/MP, kos,
                 hasil monopoli, fungsi penggunaan dan tabungan …)
                 Satu atau lebih panel disusun menegak dan dijejak serentak.
   lrac:         kos purata jangka panjang sebagai sampul keluk SAC
   ========================================================= */
(function () {
  "use strict";

  var E = window.EKO;
  var G = E.graf;

  /* =========================================================
     Carta daripada jadual. Semua data datang daripada data-opt:
     { tajuk, petunjuk, namaX, unitX, nilaiX:[…], xAwal, dp, nota:{x: html}, notaLalai,
       diskret: true → penjejak lompat antara baris (siri masa); lalai: bergerak licin,
       panel:[{ labelX, labelY, x:[a,b], y:[a,b], tikX, tikY, asalan, paksiXBawah,
                siri:[{ id, nama, label, kelas, data:[[x,y]…], unit, rm, dp, licin, titik, dxLabel, dyLabel }],
                zon:[{ dari, ke, kelas: "z1"|"z2"|"z3", label }],
                teks:[[x, y, "teks", kelas, anchor, dx, dy]], bulat:[[x, y]] }] }
     ========================================================= */
  var WARNA = { d: "c-d", s: "c-s", c3: "c-3", c4: "c-4", c5: "c-5", c6: "c-6" };

  G.daftar(
    "carta-jadual",
    function (host, opt) {
      var K = G.kad(host, {
        tajuk: opt.tajuk || "Carta daripada jadual",
        petunjuk: opt.petunjuk || "Gerakkan tetikus, ketik atau guna anak panah ←→ pada " + (opt.namaX || "kuantiti").toLowerCase(),
        kawalan: false
      });
      var panel = opt.panel || [];
      var nilaiX = opt.nilaiX || [];
      var xAwal = opt.xAwal != null ? opt.xAwal : nilaiX[0];
      var carta = [];
      var semuaSiri = [];

      function fmtX(v) {
        return (opt.namaX ? opt.namaX + " " : "") + E.fmt(v, opt.dpX != null ? opt.dpX : 2) + (opt.unitX ? " " + opt.unitX : "");
      }

      // Nilai tepat pada baris jadual; di antara baris, dibaca daripada keluk licin
      // (atau garis lurus bagi siri licin: false). Di luar julat siri: tiada nilai.
      function nilaiPada(s, x) {
        for (var i = 0; i < s.data.length; i++) if (Math.abs(s.data[i][0] - x) < 1e-9) return s.data[i][1];
        if (x < s.data[0][0] || x > s.data[s.data.length - 1][0]) return null;
        if (s.licin === false) {
          for (var j = 1; j < s.data.length; j++) {
            var a = s.data[j - 1],
              b = s.data[j];
            if (x <= b[0]) return E.lerp(a[1], b[1], (x - a[0]) / (b[0] - a[0]));
          }
          return null;
        }
        if (!s.f)
          s.f = G.monoton(
            s.data.map(function (p) {
              return p[0];
            }),
            s.data.map(function (p) {
              return p[1];
            })
          );
        return s.f(x);
      }

      function baca(x) {
        if (x == null) return;
        var tepat = nilaiX.indexOf(x) !== -1;
        var dpX = opt.dpX != null ? opt.dpX : 2;
        var bits = [[opt.namaX || "X", E.fmt(x, tepat ? dpX : Math.max(dpX, 2)) + (opt.unitX ? " " + opt.unitX : ""), ""]];
        semuaSiri.forEach(function (s) {
          var v = nilaiPada(s, x);
          var dp = s.dp != null ? s.dp : opt.dp != null ? opt.dp : 2;
          if (!tepat) dp = Math.max(dp, 2);
          var teks = v == null ? "–" : s.rm ? E.rm(v, dp, dp > 0) : E.fmt(v, dp) + (s.unit ? " " + s.unit : "");
          bits.push([s.nama, teks, s.kelas || ""]);
        });
        var nota = tepat && opt.nota && opt.nota[String(x)] != null ? opt.nota[String(x)] : opt.notaLalai || "";
        if (!tepat && !nota) nota = '<span class="teks-lemah">Nilai di antara baris jadual dibaca daripada keluk.</span>';
        K.baca.innerHTML = G.nilai(bits) + (nota ? '<div class="ayat">' + nota + "</div>" : "");
      }

      panel.forEach(function (p, idx) {
        var siri = (p.siri || []).map(function (s) {
          var t = {
            id: s.id,
            nama: s.nama,
            label: s.label,
            kelas: s.kelas || "d",
            warna: WARNA[s.kelas || "d"] || "c-d",
            data: s.data,
            licin: s.licin,
            titik: s.titik,
            dxLabel: s.dxLabel,
            dyLabel: s.dyLabel
          };
          semuaSiri.push({ nama: s.nama, kelas: t.kelas, data: s.data, unit: s.unit, dp: s.dp, rm: s.rm, licin: s.licin });
          return t;
        });
        var c = G.carta(
          K.kanvas,
          {
            x: p.x,
            y: p.y,
            tikX: p.tikX,
            tikY: p.tikY,
            labelX: p.labelX,
            labelY: p.labelY,
            asalan: p.asalan,
            paksiXBawah: p.paksiXBawah,
            siri: siri,
            zon: p.zon,
            nilaiX: nilaiX,
            selanjar: !opt.diskret,
            xAwal: xAwal,
            fmtX: fmtX,
            nisbah: function (w) {
              return w < 480 ? p.nisbahSempit || 0.72 : p.nisbahLebar || 0.46;
            },
            aria: p.aria || p.labelY,
            anotasi: function (plot) {
              (p.bulat || []).forEach(function (b) {
                plot.bulat(b[0], b[1], 7, "g-nod", "tanda");
              });
              (p.teks || []).forEach(function (t) {
                plot.teks(t[0], t[1], t[2], "g-teks " + (t[3] || ""), t[4] || "start", "label", t[5] || 0, t[6] || 0);
              });
            }
          },
          function (x) {
            carta.forEach(function (lain) {
              if (lain !== c && lain.x !== x) lain.set(x);
            });
            baca(x);
          }
        );
        if (idx > 0) c.plot.svg.style.borderTop = "1px solid var(--line)";
        carta.push(c);
      });
      baca(xAwal);

      var henti = G.pantauSaiz(K.kanvas, function () {
        carta.forEach(function (c) {
          c.ukur();
        });
      });
      return { musnah: henti };
    },
    { tajuk: "Carta daripada jadual modul", bab: "m1-b4" }
  );

  /* =========================================================
     AE015 BAB 5 · Kos purata jangka panjang (LRAC)
     Mod "tiga": tiga saiz loji (SAC1, SAC2, SAC3); LRAC = bahagian terendah.
     Mod "banyak": banyak saiz loji; LRAC licin berbentuk U menyentuh setiap SAC.
     Nilai contoh (bukan data modul).
     ========================================================= */
  var LOJI3 = [
    { nama: "SAC1", m: 25, c: 4.2 },
    { nama: "SAC2", m: 55, c: 3.0 },
    { nama: "SAC3", m: 82, c: 3.9 }
  ];
  var K_SAC = 0.004;
  var HAD_Y = 8.5; // setiap keluk berakhir di bawah had ini supaya tidak terpotong
  function sac3(i, q) {
    var l = LOJI3[i];
    return l.c + K_SAC * (q - l.m) * (q - l.m);
  }
  function lrac(q) {
    return 3 + 0.0012 * (q - 55) * (q - 55);
  }
  function dLrac(q) {
    return 0.0024 * (q - 55);
  }
  var TANGEN = [18, 36, 55, 74, 92];
  function sacT(j, q) {
    var t = TANGEN[j];
    return lrac(t) + dLrac(t) * (q - t) + 0.006 * (q - t) * (q - t);
  }
  // julat q supaya f(q) <= had, dalam [0, 100]
  function julatBawah(f, had) {
    var a = null,
      b = null;
    for (var q = 0; q <= 100.0001; q += 0.25) {
      if (f(q) <= had) {
        if (a == null) a = q;
        b = q;
      }
    }
    return [a, b];
  }

  G.daftar(
    "lrac",
    function (host, opt) {
      var K = G.kad(host, {
        tajuk: opt.tajuk || "Kos purata jangka panjang (LRAC)",
        petunjuk: "Seret titik pada LRAC · anak panah ←→"
      });
      var st = { mod: opt.mod === "banyak" ? "banyak" : "tiga", q: 30 };
      var seg = G.segmen(
        K.kawalan,
        [
          ["tiga", "Tiga saiz loji"],
          ["banyak", "Banyak saiz loji"]
        ],
        st.mod,
        function (v) {
          st.mod = v;
          lukis();
        }
      );
      var plot = G.plot(K.kanvas, {
        x: [0, 108],
        y: [0, 10],
        tikX: [],
        tikY: [],
        labelX: "Keluaran (unit)",
        labelY: "Kos (RM)",
        nisbah: function (w) {
          return w < 480 ? 0.95 : 0.6;
        },
        aria: "Keluk kos purata jangka panjang sebagai sampul keluk kos purata jangka pendek"
      });

      function kosPanjang(q) {
        if (st.mod === "banyak") return lrac(q);
        return Math.min(sac3(0, q), sac3(1, q), sac3(2, q));
      }
      function lojiDipilih(q) {
        var i = 0;
        for (var j = 1; j < 3; j++) if (sac3(j, q) < sac3(i, q)) i = j;
        return i;
      }

      function lukis() {
        plot.kosong();
        plot.paksi();
        var i, r, f;
        if (st.mod === "tiga") {
          for (i = 0; i < 3; i++) {
            f = (function (k) {
              return function (q) {
                return sac3(k, q);
              };
            })(i);
            r = julatBawah(f, HAD_Y);
            plot.fungsi(f, r[0], r[1], "g-lengkung c3 hantu", "lengkung", 120);
            plot.teks(LOJI3[i].m, sac3(i, LOJI3[i].m), LOJI3[i].nama, "g-teks c3", "middle", "label", 0, 18);
          }
          var r1 = julatBawah(kosPanjang, HAD_Y);
          plot.fungsi(kosPanjang, r1[0], r1[1], "g-lengkung d", "lengkung", 240);
          plot.teks(r1[1], kosPanjang(r1[1]), "LAC", "g-teks d", "end", "label", -4, -10);
        } else {
          for (i = 0; i < TANGEN.length; i++) {
            f = (function (k) {
              return function (q) {
                return sacT(k, q);
              };
            })(i);
            r = julatBawah(f, 7.2);
            plot.fungsi(f, r[0], r[1], "g-lengkung c3 hantu", "lengkung", 120);
            plot.teks(TANGEN[i], sacT(i, TANGEN[i]), "SAC" + (i + 1), "g-teks c3", "middle", "label", 0, -12);
          }
          var r2 = julatBawah(lrac, 7.8);
          plot.fungsi(lrac, r2[0], r2[1], "g-lengkung d", "lengkung", 240);
          plot.teks(r2[1], lrac(r2[1]), "LRAC", "g-teks d", "end", "label", -4, -10);
        }
        var y = kosPanjang(st.q);
        plot.panduanKePaksi(st.q, y, { labelX: E.fmt(st.q, 1), labelY: E.fmt(y, 2) });
        plot.nod(st.q, y, { pegang: "q", kelas: "d" });
        baca(y);
      }

      function baca(y) {
        var bits = [
          ["Keluaran", E.fmt(st.q, 1) + " unit", ""],
          ["Kos purata jangka panjang", E.rm(y, 2, true), "d"]
        ];
        var ayat;
        if (st.mod === "tiga") {
          var i = lojiDipilih(st.q);
          bits.push(["Saiz loji dipilih", LOJI3[i].nama, "c3"]);
          ayat =
            "Pada keluaran " + E.fmt(st.q, 1) + " unit, firma memilih loji <b>" + LOJI3[i].nama + "</b> kerana kos puratanya paling rendah pada keluaran itu. " +
            "LAC terdiri daripada bahagian setiap keluk SAC yang paling rendah.";
        } else if (st.q < 50) {
          ayat = '<span class="status baik">LRAC menurun</span> Firma menikmati <b>ekonomi bidangan dalaman</b>. SAC menyentuh LRAC pada bahagian SAC yang sedang menurun.';
        } else if (st.q <= 60) {
          ayat = '<span class="status biru">LRAC minimum</span> Saiz loji optimum: SAC menyentuh LRAC pada titik minimum SAC itu sendiri.';
        } else {
          ayat = '<span class="status buruk">LRAC meningkat</span> Firma mengalami <b>tak ekonomi bidangan dalaman</b>. SAC menyentuh LRAC pada bahagian SAC yang sedang meningkat.';
        }
        K.baca.innerHTML = G.nilai(bits) + '<div class="ayat">' + ayat + ' <span class="teks-lemah">(Nilai contoh.)</span></div>';
      }

      function had(q) {
        var r = julatBawah(kosPanjang, st.mod === "banyak" ? 7.8 : HAD_Y);
        return E.clamp(Math.round(q * 10) / 10, Math.ceil(r[0]), Math.floor(r[1]));
      }

      G.interaksi(plot, {
        seret: function (n, pt) {
          if (n !== "q" || pt.x == null) return;
          st.q = had(pt.x);
          lukis();
        },
        kekunci: function (k) {
          if (!k.dx) return;
          st.q = had(st.q + k.dx);
          lukis();
        }
      });

      seg.set(st.mod);
      lukis();
      var henti = G.pantauSaiz(K.kanvas, function () {
        plot.ukur();
        lukis();
      });
      return { musnah: henti };
    },
    { tajuk: "Kos purata jangka panjang (LRAC)", bab: "m1-b5" }
  );
})();
