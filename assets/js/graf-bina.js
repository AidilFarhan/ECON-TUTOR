/* =========================================================
   Econ Tutor · Bina graf (widget "bina-keluk" + paparan #bina-graf)
   Melukis GrafBina (EKO.bina) dengan enjin EKO.graf.
   Dua mod yang sentiasa berasingan:
   - gerak: PERGERAKAN di sepanjang keluk (titik A → B, keluk kekal)
   - alih : PERALIHAN keluk (keseluruhan keluk D₀ → D₁, bentuk kekal)
   ========================================================= */
(function () {
  "use strict";

  var E = window.EKO;
  var G = E.graf;
  var B = E.bina;
  var PS = E.persamaan;
  var JK = E.jenisKeluk;
  var T = E.terang;
  var esc = E.esc;
  var CONTOH_PERSAMAAN = ["Qd = 100 − 2P", "Qs = 20 + 3P", "y = −2x + 10", "Qd = a − bP; a = 100; b = 2"];

  var TOKEN = { d: "var(--c-d)", s: "var(--c-s)", c3: "var(--c-3)", c4: "var(--c-4)", c5: "var(--c-5)" };
  var ARAH = { menurun: "menurun", menaik: "menaik", mendatar: "mendatar", tegak: "tegak", lain: "bentuk lain" };
  var MOD = { gerak: "Pergerakan di sepanjang keluk", alih: "Peralihan keluk" };
  var PETUNJUK = { gerak: "Seret titik di sepanjang keluk", alih: "Seret keseluruhan keluk" };
  var JARAK = 26; // px: jarak maksimum untuk memilih keluk dengan ketukan

  function dalamKotak(p) {
    return p[0] >= -1e-6 && p[0] <= 1 + 1e-6 && p[1] >= -1e-6 && p[1] <= 1 + 1e-6;
  }

  function widget(host, opt) {
    var K = G.kad(host, { tajuk: opt.tajuk || "Bina graf", petunjuk: PETUNJUK.gerak });
    var petunjuk = K.tajuk.querySelector(".graf-petunjuk");
    var st = {
      graf: B.grafContoh(),
      mod: opt.mod === "alih" ? "alih" : "gerak",
      pilih: null,
      hover: null,
      seret: null,
      lukis: false, // mod input lukis keluk (bukan mod pembelajaran)
      coretan: null, // titik mentah semasa melukis
      baruDilukis: null // id keluk yang baru dilukis (untuk nota dalam panel bacaan)
    };
    st.pilih = st.graf.keluk.length ? st.graf.keluk[0].id : null;

    /* ---------- kawalan ---------- */
    // Kumpulan mod: dua butang sentiasa bersebelahan supaya mod aktif jelas
    var kotakMod = G.div("bina-mod");
    kotakMod.setAttribute("role", "group");
    kotakMod.setAttribute("aria-label", "Mod pembelajaran");
    kotakMod.innerHTML = '<b class="bina-mod-label">Mod</b>';
    K.kawalan.appendChild(kotakMod);
    var segMod = G.segmen(kotakMod, [["gerak", MOD.gerak], ["alih", MOD.alih]], st.mod, function (v) {
      tukarMod(v);
    });
    G.butang(K.kawalan, E.ikon("ulang") + " Situasi asal", function () {
      st.graf = B.setSemula(st.graf);
      lukis();
    });
    var pilihTambah = G.pilih(K.kawalan, {
      label: "Tambah keluk",
      kumpulan: [
        {
          pilihan: [["", "— pilih bentuk keluk —"]].concat(
            Object.keys(B.TEMPLAT).map(function (t) {
              return [t, B.TEMPLAT[t].nama];
            })
          )
        }
      ],
      ubah: function (v) {
        if (!v) return;
        var n = st.graf.keluk.length;
        st.graf = B.tambahKeluk(st.graf, v);
        if (st.graf.keluk.length > n) st.pilih = st.graf.keluk[st.graf.keluk.length - 1].id;
        pilihTambah.set("");
        binaPanel();
        binaParam();
        lukis();
      }
    });

    /* ---------- input persamaan ---------- */
    var btnPers = G.butang(K.kawalan, "<b>ƒ</b> Persamaan", function () {
      var buka = kotakPers.hidden;
      kotakPers.hidden = !buka;
      btnPers.setAttribute("aria-expanded", buka ? "true" : "false");
      if (buka) inpPers.focus();
    });
    btnPers.setAttribute("aria-expanded", "false");

    /* ---------- lukis keluk ---------- */
    var btnLukis = G.butang(K.kawalan, E.ikon("pensel") + " Lukis keluk", function () {
      setLukis(!st.lukis);
    }, { tekan: false });

    /* ---------- terangkan graf (EKO.terang) ---------- */
    var btnTerang = G.butang(K.kawalan, E.ikon("buku") + " Terangkan graf", function () {
      var buka = kotakTerang.hidden;
      kotakTerang.hidden = !buka;
      btnTerang.setAttribute("aria-pressed", buka ? "true" : "false");
      btnTerang.setAttribute("aria-expanded", buka ? "true" : "false");
      binaTerang();
      if (buka && kotakTerang.scrollIntoView) kotakTerang.scrollIntoView({ block: "nearest", behavior: E.kurangGerak() ? "auto" : "smooth" });
    }, { tekan: false });
    btnTerang.setAttribute("aria-expanded", "false");

    function setLukis(on, pesan) {
      st.lukis = !!on && st.graf.keluk.length < B.MAKS_KELUK;
      st.coretan = null;
      st.hover = null;
      st.pesanLukis = pesan || null;
      btnLukis.setAttribute("aria-pressed", st.lukis ? "true" : "false");
      btnLukis.innerHTML = st.lukis ? E.ikon("salah") + " Batal lukisan" : E.ikon("pensel") + " Lukis keluk";
      // semasa melukis, jari tidak menatal halaman
      plot.svg.style.touchAction = st.lukis ? "none" : "";
      if (st.lukis) host.setAttribute("data-lukis", "1");
      else host.removeAttribute("data-lukis");
      petunjuk.textContent = st.lukis ? "Lukis keluk dengan jari atau tetikus" : PETUNJUK[st.mod];
      lukis();
    }

    function selesaiLukis() {
      var coretan = st.coretan;
      st.coretan = null;
      if (!coretan) return;
      var sk = skala();
      var h = B.dariLukisan(coretan, { sx: sk[0], sy: sk[1] });
      if (h.ralat) {
        st.pesanLukis = h.ralat;
        lukis();
        return;
      }
      st.graf = B.tambahKeluk(st.graf, { label: "K", titik: h.titik, sumber: "lukis" });
      st.pilih = st.graf.keluk[st.graf.keluk.length - 1].id;
      st.baruDilukis = { id: st.pilih, diluruskan: h.diluruskan };
      setLukis(false);
      binaPanel();
      binaParam();
      lukis();
    }
    var kotakPers = G.div("bina-pers");
    kotakPers.hidden = true;
    kotakPers.innerHTML =
      '<div class="bina-pers-baris">' +
      '<label class="medan"><span>Persamaan</span><input type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Contoh: Qd = 100 − 2P" data-pers></label>' +
      '<button type="button" class="btn btn-utama" data-pers-tambah>Tambah</button>' +
      "</div>" +
      '<div class="baris-cip bina-pers-contoh"><span class="teks-lemah">Contoh:</span>' +
      CONTOH_PERSAMAAN.map(function (c) {
        return '<button type="button" class="cip" data-pers-contoh="' + esc(c) + '">' + esc(c) + "</button>";
      }).join("") +
      "</div>" +
      '<p class="medan-bantuan">Guna <b>P</b> untuk harga dan <b>Q</b>, <b>Qd</b> atau <b>Qs</b> untuk kuantiti (atau <b>x</b> dan <b>y</b>). Huruf kecil lain ialah parameter, contohnya Qd = a − bP; a = 100; b = 2.</p>' +
      '<p class="bina-ralat" role="alert" hidden></p>' +
      '<p class="bina-nota" hidden></p>';
    K.kawalan.appendChild(kotakPers);
    var inpPers = kotakPers.querySelector("[data-pers]");
    var ralatPers = kotakPers.querySelector(".bina-ralat");
    var notaPers = kotakPers.querySelector(".bina-nota");

    function mesej(el, teks) {
      el.textContent = teks || "";
      el.hidden = !teks;
    }

    function tambahPersamaan() {
      var adaKonsep = !PS.paksiNombor(st.graf) && st.graf.keluk.some(function (k) {
        return !k.persamaan;
      });
      var r = PS.tambah(st.graf, inpPers.value);
      if (r.ralat) {
        mesej(ralatPers, r.ralat);
        mesej(notaPers, "");
        return;
      }
      st.graf = r.graf;
      st.pilih = r.id;
      mesej(ralatPers, "");
      mesej(
        notaPers,
        [r.nota, adaKonsep ? "Keluk konsep yang sedia ada tidak mempunyai persamaan, jadi nilainya tidak dibaca. Tekan “Kosongkan graf” di bawah jika mahu graf persamaan sahaja." : ""]
          .filter(Boolean)
          .join(" ")
      );
      inpPers.value = "";
      binaPanel();
      binaParam();
      lukis();
    }

    kotakPers.addEventListener("click", function (e) {
      var b = e.target.closest ? e.target.closest("button") : null;
      if (!b) return;
      if (b.hasAttribute("data-pers-tambah")) tambahPersamaan();
      else if (b.hasAttribute("data-pers-contoh")) {
        inpPers.value = b.getAttribute("data-pers-contoh");
        mesej(ralatPers, "");
        inpPers.focus();
      }
    });
    inpPers.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        tambahPersamaan();
      }
    });

    var plot = G.plot(K.kanvas, {
      x: [0, 1],
      y: [0, 1],
      tikX: [],
      tikY: [],
      grid: false,
      nisbah: function (w) {
        return w < 480 ? 0.92 : 0.62;
      },
      aria: "Graf bina interaktif. Pilih keluk dalam senarai di bawah graf. Kekunci anak panah menggerakkan titik atau mengalihkan keluk mengikut mod."
    });

    // Gelangsar parameter keluk dipilih (di antara graf dan panel bacaan)
    var kotakParam = G.div("bina-param");
    host.insertBefore(kotakParam, K.baca);

    // Panel penerangan di bawah panel bacaan (dibuka dengan "Terangkan graf")
    var kotakTerang = G.div("bina-terang");
    kotakTerang.hidden = true;
    kotakTerang.setAttribute("aria-live", "polite");
    host.appendChild(kotakTerang);

    var panel = G.div("bina-panel");
    host.appendChild(panel);

    function binaTerang() {
      if (kotakTerang.hidden) return;
      // kekalkan <details> yang sedang dibuka apabila panel dilukis semula
      var buka = [];
      Array.prototype.forEach.call(kotakTerang.querySelectorAll("details"), function (d, i) {
        if (d.open) buka.push(i);
      });
      var k = cari(st.pilih);
      if (!k) {
        kotakTerang.innerHTML = '<p class="teks-lemah">Pilih atau tambah satu keluk untuk melihat penerangannya.</p>';
        return;
      }
      var r = T.keluk(st.graf, k.id);
      var html =
        '<div class="bina-terang-kepala"><b>' + r.tajuk + "</b>" +
        '<label class="medan bina-jenis"><span>Jenis keluk ' + esc(k.label) + "</span><select data-jenis>" +
        '<option value="">Belum ditetapkan</option>' +
        JK.senarai()
          .map(function (j) {
            return '<option value="' + esc(j.id) + '"' + (k.jenis === j.id ? " selected" : "") + ">" + esc(j.nama) + "</option>";
          })
          .join("") +
        "</select></label></div>";
      var cadang = r.cadangan.filter(function (c) {
        return c.skor >= 0.3;
      });
      if (!r.jenis) {
        html +=
          '<div class="bina-cadang"><span class="teks-lemah">' + (cadang.length ? "Cadangan (sahkan sendiri):" : "Tiada cadangan yang cukup yakin. Pilih jenis sendiri jika anda tahu maknanya.") + "</span>" +
          cadang
            .slice(0, 2)
            .map(function (c) {
              return (
                '<button type="button" class="cip" data-cadang="' + esc(c.jenis) + '">' + E.ikon("betul") + " " + esc(c.nama) + " · " + Math.round(c.skor * 100) + "%</button>" +
                '<span class="teks-lemah bina-sebab">' + esc(c.sebab.join(", ")) + "</span>"
              );
            })
            .join("") +
          "</div>";
      }
      html += r.blok
        .map(function (b) {
          return '<div class="kotak ' + b.jenis + '"><span class="kotak-label">' + esc(b.tajuk) + "</span>" + b.html + "</div>";
        })
        .join("");
      kotakTerang.innerHTML = html;
      var semua = kotakTerang.querySelectorAll("details");
      buka.forEach(function (i) {
        if (semua[i]) semua[i].open = true;
      });
    }

    function tetapkanJenis(v) {
      if (!st.pilih) return;
      st.graf = T.tetapkan(st.graf, st.pilih, v || null);
      binaPanel();
      lukis();
    }

    kotakTerang.addEventListener("change", function (e) {
      if (e.target.hasAttribute("data-jenis")) tetapkanJenis(e.target.value);
    });
    kotakTerang.addEventListener("click", function (e) {
      var b = e.target.closest ? e.target.closest("[data-cadang]") : null;
      if (b) tetapkanJenis(b.getAttribute("data-cadang"));
    });

    function binaParam() {
      kotakParam.innerHTML = "";
      var k = cari(st.pilih);
      var eq = k && k.persamaan;
      var nama = eq ? Object.keys(eq.param) : [];
      kotakParam.hidden = !nama.length;
      if (!nama.length) return;
      var tajuk = document.createElement("p");
      tajuk.className = "bina-param-tajuk";
      tajuk.innerHTML = "Parameter keluk <b>" + esc(k.label) + "</b>: " + esc(eq.teks);
      kotakParam.appendChild(tajuk);
      var amaran = document.createElement("p");
      amaran.className = "bina-ralat";
      amaran.hidden = true;
      nama.forEach(function (n) {
        var j = eq.julatParam[n];
        G.julat(kotakParam, {
          label: n,
          min: j[0],
          max: j[1],
          step: j[2],
          nilai: eq.param[n],
          fmt: function (v) {
            return E.fmt(v, 2);
          },
          ubah: function (v) {
            var r = PS.setParam(st.graf, k.id, n, v);
            st.graf = r.graf;
            mesej(amaran, r.ralat);
            lukis();
          }
        });
      });
      kotakParam.appendChild(amaran);
    }

    function cari(id) {
      return B.cari(st.graf, id);
    }

    function skala() {
      return [plot.X(1) - plot.X(0), plot.Y(0) - plot.Y(1)];
    }

    function tukarMod(v) {
      if (st.lukis) setLukis(false);
      st.mod = v;
      st.hover = null;
      segMod.set(v);
      petunjuk.textContent = PETUNJUK[v];
      host.setAttribute("data-mod", v);
      lukis();
    }

    /* ---------- lukis ---------- */
    // Tik paksi bernombor (ruang ternormal 0..1, label dalam unit dunia)
    function tik(maks) {
      var kasar = maks / 5;
      var p = Math.pow(10, Math.floor(Math.log(kasar) / Math.LN10));
      var langkah = 10 * p;
      [1, 2, 2.5, 5, 10].some(function (m) {
        if (m * p >= kasar - 1e-9) {
          langkah = m * p;
          return true;
        }
        return false;
      });
      var out = [];
      for (var v = langkah; v <= maks + 1e-9; v += langkah) out.push(v / maks);
      return out;
    }

    function dunia(p) {
      return PS.keDunia(st.graf, p);
    }

    // Unit kemas bagi paksi bernombor: 1% julat dibundarkan ke kuasa 10 (120 → 1, 12 → 0.1)
    function unit(maks) {
      return Math.pow(10, Math.floor(Math.log(maks / 100) / Math.LN10));
    }

    // Nilai titik pada keluk persamaan: pemboleh ubah bebas dibundarkan kepada 1 unit kemas,
    // pemboleh ubah bersandar dikira terus daripada persamaan (P = 20 → Qd = 60, bukan 59.98)
    function nilaiTitik(k, p) {
      var w = dunia(p);
      var eq = k.persamaan;
      var bebas = eq.dep === "x" ? 1 : 0;
      var dp = Math.max(0, -Math.round(Math.log(unit(st.graf.paksi[bebas ? "y" : "x"].maks)) / Math.LN10));
      var v = E.bundar(w[bebas], dp);
      var d = PS.fungsi(eq)(v);
      if (!isFinite(d)) return w;
      return bebas ? [d, v] : [v, d];
    }

    // Peralihan keluk persamaan dibundarkan kepada unit kemas pada paksi (contoh +10, bukan +9.6)
    function anjakKemas(k, ax, ay) {
      if (!k.persamaan || !PS.paksiNombor(st.graf)) return [ax, ay];
      var mx = st.graf.paksi.x.maks,
        my = st.graf.paksi.y.maks;
      var ux = unit(mx) / mx,
        uy = unit(my) / my;
      // kepil pada had dahulu, kemudian bundar ke arah dalam supaya nilai di had pun kemas (+42, bukan +42.45)
      var h = B.hadAnjak(k);
      function kemas(v, u, julat) {
        v = E.clamp(v, julat[0], julat[1]);
        var r = Math.round(v / u) * u;
        if (r > julat[1] + 1e-9) r -= u;
        if (r < julat[0] - 1e-9) r += u;
        return r;
      }
      return [kemas(ax, ux, h.x), kemas(ay, uy, h.y)];
    }

    function lukis() {
      plot.cfg.labelX = st.graf.paksi.x.label;
      plot.cfg.labelY = st.graf.paksi.y.label;
      if (PS.paksiNombor(st.graf)) {
        var mx = st.graf.paksi.x.maks,
          my = st.graf.paksi.y.maks;
        plot.cfg.tikX = tik(mx);
        plot.cfg.tikY = tik(my);
        plot.cfg.fmtTikX = function (n) {
          return E.fmt(n * mx, 2);
        };
        plot.cfg.fmtTikY = function (n) {
          return E.fmt(n * my, 2);
        };
        plot.cfg.grid = true;
      } else {
        plot.cfg.tikX = [];
        plot.cfg.tikY = [];
        plot.cfg.grid = false;
      }
      plot.kosong();
      plot.paksi();
      labelDiletak = [];
      var dipilih = null;
      st.graf.keluk.forEach(function (k) {
        if (k.id === st.pilih) dipilih = k;
        else lukisKeluk(k);
      });
      // keluk dipilih dilukis terakhir supaya kawasan sentuhnya di atas
      if (dipilih) lukisKeluk(dipilih);
      if (st.mod === "gerak" && dipilih && !st.lukis) lukisTitik(dipilih);
      if (st.coretan && st.coretan.length > 1) plot.laluan(st.coretan, "bina-coretan", "atas");
      baca();
      if (!st.coretan) binaTerang();
    }

    function lukisKeluk(k) {
      var kls = k.warna;
      var asas = B.asasLabel(k.label);
      var dianjak = B.dianjak(k);
      var dipilih = k.id === st.pilih;
      var keping = B.klipKotak(B.laluan(k));
      if (dianjak) {
        var hantu = B.klipKotak(B.laluan(k, false));
        hantu.forEach(function (p) {
          plot.laluan(p, "g-lengkung " + kls + " hantu", "hantu");
        });
        labelHujung(hantu, asas + "₀", "g-teks lemah");
        panahAnjak(k);
      }
      if (dipilih || k.id === st.hover) {
        keping.forEach(function (p) {
          plot.laluan(p, "bina-sorot" + (dipilih ? " dipilih" : ""), "kawasan");
        });
      }
      keping.forEach(function (p) {
        plot.laluan(p, "g-lengkung " + kls + (dipilih ? " bina-dipilih" : ""), "lengkung");
      });
      labelHujung(keping, dianjak ? asas + "₁" : k.label, "g-teks " + kls + (dipilih ? " besar" : ""));
      // mod alih: keseluruhan keluk ialah pemegang
      if (st.mod === "alih" && k.arahSeret !== "tiada" && !st.lukis) {
        keping.forEach(function (p) {
          var gk = G.svgEl("g", { "data-pegang": "keluk:" + k.id, class: "g-pemegang", style: "touch-action:none;cursor:grab" }, plot.lapis.pemegang);
          gk.appendChild(plot.laluan(p, "g-lengkung tebal-hit bina-hit", "pemegang"));
        });
      }
    }

    // Anak panah dari keluk asal ke keluk semasa (di tengah keluk)
    function panahAnjak(k) {
      var a = B.titikPadaS(B.laluan(k, false), 0.5);
      var b = [a[0] + k.anjak.x, a[1] + k.anjak.y];
      if (!dalamKotak(a) || !dalamKotak(b)) return;
      var ax = plot.X(a[0]),
        ay = plot.Y(a[1]),
        bx = plot.X(b[0]),
        by = plot.Y(b[1]);
      var d = Math.sqrt((bx - ax) * (bx - ax) + (by - ay) * (by - ay));
      if (d < 22) return;
      var u = [(bx - ax) / d, (by - ay) / d];
      plot.panahPx(ax + u[0] * 8, ay + u[1] * 8, bx - u[0] * 8, by - u[1] * 8, "aksen", "tanda", 9);
    }

    var labelDiletak = []; // [kiri, garis dasar, lebar] label yang sudah dilukis dalam lukisan semasa
    function bertindih(kiri, y, lebar) {
      return function (l) {
        return kiri < l[0] + l[2] && l[0] < kiri + lebar && Math.abs(y - l[1]) < 14;
      };
    }

    // Label pada hujung keluk: hujung paling kanan (atau paling atas bagi keluk tegak)
    function labelHujung(keping, teks, kelas) {
      if (!keping.length) return;
      var awal = keping[0],
        akhir = keping[keping.length - 1];
      var calon = [
        [awal[0], awal[1]],
        [akhir[akhir.length - 1], akhir[akhir.length - 2]]
      ];
      var c;
      var beza = calon[1][0][0] - calon[0][0][0];
      if (Math.abs(beza) > 0.02) c = beza > 0 ? calon[1] : calon[0];
      else c = calon[1][0][1] >= calon[0][0][1] ? calon[1] : calon[0];
      var px = plot.X(c[0][0]),
        py = plot.Y(c[0][1]);
      var tx = px - plot.X(c[1][0]),
        ty = py - plot.Y(c[1][1]);
      var x = px + 8,
        y;
      if (Math.abs(tx) < 1) {
        y = py + 4; // tegak: label di sebelah kanan hujung atas
      } else if (Math.abs(ty) < 1) {
        y = py - 8; // mendatar
      } else {
        y = ty > 0 ? py - 6 : py + 14;
      }
      var anchor = "start";
      var lebar = String(teks).length * 8 + 4;
      if (x + lebar > plot.W - 4) {
        anchor = "end";
        x = px - 8;
      }
      // elak label bertindih: turunkan (atau naikkan) 16 px sehingga ruang kosong
      var kiri = anchor === "end" ? x - lebar : x;
      var cuba = [0, 16, -16, 32, -32];
      for (var i = 0; i < cuba.length; i++) {
        var yc = E.clamp(y + cuba[i], 14, plot.H - 6);
        if (!labelDiletak.some(bertindih(kiri, yc, lebar))) break;
      }
      labelDiletak.push([kiri, yc, lebar]);
      plot.teksPx(x, yc, teks, kelas, anchor, "label");
    }

    // Normal (px) yang menghala ke atas, untuk meletakkan label titik jauh dari keluk
    function normal(poli, s) {
      var p1 = B.titikPadaS(poli, Math.max(0, s - 0.01)),
        p2 = B.titikPadaS(poli, Math.min(1, s + 0.01));
      var tx = plot.X(p2[0]) - plot.X(p1[0]),
        ty = plot.Y(p2[1]) - plot.Y(p1[1]);
      var d = Math.sqrt(tx * tx + ty * ty) || 1;
      var n = [ty / d, -tx / d];
      if (n[1] > 0.01 || (Math.abs(n[1]) <= 0.01 && n[0] < 0)) n = [-n[0], -n[1]];
      return n;
    }

    function labelTitik(poli, s, p, teks, kelas) {
      var n = normal(poli, s);
      var px = plot.X(p[0]) + n[0] * 16,
        py = plot.Y(p[1]) + n[1] * 16 + 4;
      plot.teksPx(px, E.clamp(py, 14, plot.H - 6), teks, kelas, n[0] < -0.3 ? "end" : n[0] > 0.3 ? "start" : "middle", "label");
    }

    function sPapar(k, t) {
      var j = B.julatSNampak(B.laluan(k));
      return E.clamp(t.s, j[0], j[1]);
    }

    function lukisTitik(k) {
      var t = B.titikKeluk(st.graf, k.id);
      if (!t) return;
      var poli = B.laluan(k);
      var s = sPapar(k, t);
      var pA = B.titikPadaS(poli, t.sAwal),
        pB = B.titikPadaS(poli, s);
      var bergerak = Math.abs(s - t.sAwal) > 0.004 && dalamKotak(pA);
      // nilai pada paksi hanya bagi keluk persamaan (keluk konsep tiada nilai sebenar)
      var bernilai = !!k.persamaan && PS.paksiNombor(st.graf);
      function cipPaksi(p) {
        if (!bernilai) return {};
        var w = nilaiTitik(k, p);
        return { labelX: E.fmt(w[0], 2), labelY: E.fmt(w[1], 2) };
      }
      if (bergerak) {
        // cip A disorok jika bertindih dengan cip B (nilai A tetap ada dalam panel bacaan)
        var cipA = cipPaksi(pA);
        if (Math.abs(plot.X(pA[0]) - plot.X(pB[0])) < 46) delete cipA.labelX;
        if (Math.abs(plot.Y(pA[1]) - plot.Y(pB[1])) < 22) delete cipA.labelY;
        plot.panduanKePaksi(pA[0], pA[1], cipA);
        var sub = B.klipKotak(B.subLaluan(poli, t.sAwal, s));
        sub.forEach(function (p) {
          plot.laluan(p, "g-anak-panah aksen bina-jejak", "tanda");
        });
        // kepala anak panah berhenti kira-kira 12 px sebelum nod B supaya tidak terlindung
        var px = sub.length ? sub[sub.length - 1] : [];
        var bx = plot.X(pB[0]),
          by = plot.Y(pB[1]);
        var hujung = null;
        for (var i = px.length - 1; i >= 0; i--) {
          var qx = plot.X(px[i][0]),
            qy = plot.Y(px[i][1]);
          if (!hujung) {
            if (Math.sqrt((bx - qx) * (bx - qx) + (by - qy) * (by - qy)) >= 12) hujung = [qx, qy];
          } else if (Math.sqrt((hujung[0] - qx) * (hujung[0] - qx) + (hujung[1] - qy) * (hujung[1] - qy)) >= 12) {
            plot.panahPx(qx, qy, hujung[0], hujung[1], "aksen", "tanda", 9);
            break;
          }
        }
        plot.nod(pA[0], pA[1], { kelas: k.warna, r: 5.5 });
        labelTitik(poli, t.sAwal, pA, "A", "g-teks lemah");
      }
      plot.panduanKePaksi(pB[0], pB[1], cipPaksi(pB));
      plot.nod(pB[0], pB[1], { pegang: "titik", kelas: k.warna + " isi" });
      labelTitik(poli, s, pB, bergerak ? "B" : "A", "g-teks " + k.warna);
    }

    /* ---------- panel bacaan ---------- */
    function arahPaksi(d, naik, turun) {
      return d > 0.004 ? naik : d < -0.004 ? turun : "tidak berubah";
    }

    function baca() {
      if (st.lukis) {
        K.baca.innerHTML =
          G.nilai([["Input", "Lukis keluk"]]) +
          '<div class="ayat">' +
          (st.pesanLukis ? '<span class="status buruk">' + esc(st.pesanLukis) + "</span> " : "") +
          "Lukis satu keluk di dalam graf dengan jari atau tetikus, kemudian lepaskan. Lukisan akan dilicinkan; garisan yang hampir mendatar atau tegak akan diluruskan. Tekan <b>Batal lukisan</b> untuk berhenti.</div>";
        return;
      }
      var k = cari(st.pilih);
      var chipMod = ["Mod", MOD[st.mod]];
      var notaBaru = "";
      if (k && st.baruDilukis && st.baruDilukis.id === k.id) {
        notaBaru =
          '<div class="ayat"><span class="status baik">Keluk dilukis</span> Keluk <b>' + esc(k.label) + "</b> sudah dilicinkan" +
          (st.baruDilukis.diluruskan ? " dan diluruskan (" + st.baruDilukis.diluruskan + ")" : "") +
          ". Namakan keluk dalam senarai di bawah graf, contohnya D atau S. Keluk ini boleh dialih atau dijejak seperti keluk lain.</div>";
      }
      bacaKeluk(k, chipMod);
      if (notaBaru) K.baca.innerHTML += notaBaru;
    }

    function bacaKeluk(k, chipMod) {
      if (!k) {
        K.baca.innerHTML = G.nilai([chipMod]) + '<div class="ayat">Tiada keluk dalam graf. Pilih satu bentuk dalam <b>Tambah keluk</b>, tekan <b>ƒ Persamaan</b> atau <b>Lukis keluk</b>.</div>';
        return;
      }
      var nama = esc(k.label);
      var asas = esc(B.asasLabel(k.label));
      var eq = k.persamaan;
      var jenis = JK.dapat(k.jenis); // daftar jenis keluk (graf-terang.js), null jika belum ditetapkan
      var bernilai = !!eq && PS.paksiNombor(st.graf);
      // nama pemboleh ubah: daripada persamaan (P, Qd…) atau label paksi
      var X = bernilai ? esc(eq.nama.x) : esc(st.graf.paksi.x.label || "paksi datar"),
        Y = bernilai ? esc(eq.nama.y) : esc(st.graf.paksi.y.label || "paksi tegak");
      var chipPers = eq ? ["Persamaan", esc(eq.teks)] : null;
      // keluk berparameter: tunjuk juga persamaan dengan nilai semasa (garis lurus sahaja)
      var semasa = eq && Object.keys(eq.param).length ? PS.bentukLurus(eq, 0, 0) : null;
      if (semasa) chipPers = ["Persamaan", esc(eq.teks) + " · " + esc(semasa)];
      var ayat;
      if (st.mod === "alih") {
        var arah = B.arahAnjak(k.anjak);
        if (!arah.length) {
          K.baca.innerHTML =
            G.nilai([chipMod, ["Keluk", nama, k.warna], chipPers]) +
            '<div class="ayat"><span class="status neutral">Kedudukan asal</span> Seret keseluruhan keluk <b>' + nama +
            "</b> (atau tekan kekunci anak panah). Bentuk keluk kekal; hanya kedudukannya berubah.</div>";
          return;
        }
        var arahTeks = arah.join(" dan ");
        // istilah buku teks jika jenis keluk diketahui (contoh "Pertambahan permintaan")
        var istilahA = T.istilahAlih(k);
        ayat =
          '<span class="status neutral">' + (istilahA ? istilahA.istilah : "Keluk beralih ke " + arahTeks) + "</span> Keseluruhan keluk <b>" + asas + "</b> beralih ke " + arahTeks + " dari <b>" + asas + "₀</b> ke <b>" + asas +
          "₁</b>. " + (istilahA ? istilahA.ayat + " " : "") + "Setiap titik pada keluk beralih sejauh yang sama, jadi bentuk keluk tidak berubah.";
        var chipBaharu = null;
        if (bernilai) {
          var dx = k.anjak.x * st.graf.paksi.x.maks,
            dy = k.anjak.y * st.graf.paksi.y.maks;
          if (Math.abs(dx) > 1e-9) ayat += " Pada setiap nilai " + Y + ", " + X + " berubah sebanyak <b>" + (dx > 0 ? "+" : "") + E.fmt(dx, 2) + "</b>.";
          if (Math.abs(dy) > 1e-9) ayat += " Pada setiap nilai " + X + ", " + Y + " berubah sebanyak <b>" + (dy > 0 ? "+" : "") + E.fmt(dy, 2) + "</b>.";
          var baharu = PS.bentukLurus(eq, dx, dy);
          if (baharu) {
            chipBaharu = ["Setara bagi " + asas + "₁", esc(baharu), k.warna];
            ayat += " Persamaan setara bagi " + asas + "₁: <b>" + esc(baharu) + "</b> (persamaan asal tidak diubah).";
          }
        }
        ayat += jenis
          ? " Peralihan keluk " + jenis.pendek + " berlaku apabila <b>faktor bukan harga</b> berubah."
          : " Peralihan keluk berlaku apabila faktor selain pemboleh ubah pada paksi berubah (bagi keluk permintaan dan penawaran: faktor bukan harga).";
        K.baca.innerHTML =
          G.nilai([chipMod, ["Keluk", asas + "₀ → " + asas + "₁", k.warna], ["Arah", "Ke " + arahTeks], chipPers, chipBaharu]) + '<div class="ayat">' + ayat + "</div>";
        return;
      }
      var t = B.titikKeluk(st.graf, k.id);
      var poli = B.laluan(k);
      var s = sPapar(k, t);
      var pA = B.titikPadaS(poli, t.sAwal),
        pB = B.titikPadaS(poli, s);
      var wA = bernilai ? nilaiTitik(k, pA) : null,
        wB = bernilai ? nilaiTitik(k, pB) : null;
      if (Math.abs(s - t.sAwal) <= 0.004 || !dalamKotak(pA)) {
        K.baca.innerHTML =
          G.nilai([chipMod, ["Keluk", nama, k.warna], ["Titik", "A"], chipPers, wB ? [Y, E.fmt(wB[1], 2)] : null, wB ? [X, E.fmt(wB[0], 2)] : null]) +
          '<div class="ayat"><span class="status neutral">Titik asal A</span> Seret titik <b>A</b> di sepanjang keluk <b>' + nama +
          "</b> (atau tekan kekunci anak panah). Keluk kekal di tempatnya; hanya titik yang bergerak.</div>";
        return;
      }
      var perubahan;
      if (bernilai) {
        var ubahY = arahPaksi(pB[1] - pA[1], "meningkat", "menurun"),
          ubahX = arahPaksi(pB[0] - pA[0], "meningkat", "menurun");
        var teksY = "<b>" + Y + "</b> " + ubahY + (ubahY === "tidak berubah" ? "" : " daripada " + E.fmt(wA[1], 2) + " kepada " + E.fmt(wB[1], 2)),
          teksX = "<b>" + X + "</b> " + ubahX + (ubahX === "tidak berubah" ? "" : " daripada " + E.fmt(wA[0], 2) + " kepada " + E.fmt(wB[0], 2));
        perubahan = eq.sistem === "PQ" && ubahY !== "tidak berubah" ? "Apabila " + teksY + ", " + teksX + "." : teksY + " dan " + teksX + ".";
      } else {
        perubahan = "<b>" + Y + "</b> " + arahPaksi(pB[1] - pA[1], "meningkat", "menurun") + " dan <b>" + X + "</b> " + arahPaksi(pB[0] - pA[0], "meningkat", "menurun") + ".";
      }
      var istilahG = T.istilahGerak(st.graf, k);
      ayat =
        '<span class="status neutral">' + (istilahG ? istilahG.istilah : "Pergerakan di sepanjang keluk") + "</span> Titik bergerak dari <b>A</b> ke <b>B</b> di sepanjang keluk <b>" + nama + "</b> yang sama. " + perubahan +
        (jenis
          ? " Keluk tidak beralih: ini perubahan dalam <b>" + jenis.kuantiti + "</b>, yang berlaku apabila <b>harga barang itu sendiri</b> berubah."
          : " Keluk tidak beralih: pergerakan di sepanjang keluk berlaku apabila pemboleh ubah pada paksi itu sendiri berubah (bagi keluk permintaan: harga barang itu sendiri).");
      K.baca.innerHTML =
        G.nilai([
          chipMod,
          ["Keluk", nama, k.warna],
          ["Titik", "A → B", k.warna],
          chipPers,
          wA ? [Y, E.fmt(wA[1], 2) + " → " + E.fmt(wB[1], 2)] : null,
          wA ? [X, E.fmt(wA[0], 2) + " → " + E.fmt(wB[0], 2)] : null
        ]) + '<div class="ayat">' + ayat + "</div>";
    }

    /* ---------- panel keluk & paksi ---------- */
    function binaPanel() {
      var n = st.graf.keluk.length;
      var html =
        '<div class="bina-panel-kepala"><b>Keluk dalam graf</b><span class="teks-lemah">' + n + " / " + B.MAKS_KELUK + "</span></div>" +
        '<ul class="bina-senarai">' +
        st.graf.keluk
          .map(function (k) {
            var id = esc(k.id);
            return (
              '<li class="bina-baris">' +
              '<button type="button" class="cip bina-pilih" data-pilih="' + id + '" aria-pressed="' + (k.id === st.pilih) + '">' +
              '<span class="titik" style="color:' + TOKEN[k.warna] + '"></span><span class="bina-nama-cip">' + esc(k.label) + "</span>" +
              '<span class="bina-arah">' + esc([JK.dapat(k.jenis) ? JK.dapat(k.jenis).pendek : "", k.persamaan ? k.persamaan.teks : ARAH[k.meta.arah]].filter(Boolean).join(" · ")) + "</span></button>" +
              '<label class="medan bina-nama"><span class="sr-only">Nama keluk</span><input type="text" maxlength="8" autocomplete="off" spellcheck="false" data-nama="' + id + '" value="' + esc(k.label) + '"></label>' +
              '<button type="button" class="cip bina-padam" data-padam="' + id + '" aria-label="Padam keluk ' + esc(k.label) + '">' + E.ikon("salah") + "</button>" +
              "</li>"
            );
          })
          .join("") +
        "</ul>" +
        (n ? "" : '<p class="teks-lemah">Tiada keluk. Pilih satu bentuk dalam <b>Tambah keluk</b>.</p>') +
        '<div class="grid-medan bina-paksi">' +
        '<label class="medan"><span>Label paksi tegak (Y)</span><input type="text" maxlength="40" autocomplete="off" data-paksi="y" value="' + esc(st.graf.paksi.y.label) + '"></label>' +
        '<label class="medan"><span>Label paksi datar (X)</span><input type="text" maxlength="40" autocomplete="off" data-paksi="x" value="' + esc(st.graf.paksi.x.label) + '"></label>' +
        "</div>" +
        '<div class="baris-cip"><button type="button" class="cip" data-contoh>' + E.ikon("ulang") + " Mula semula dengan graf contoh</button>" +
        '<button type="button" class="cip" data-kosong>' + E.ikon("salah") + " Kosongkan graf</button></div>";
      panel.innerHTML = html;
      pilihTambah.select.disabled = n >= B.MAKS_KELUK;
      btnLukis.disabled = n >= B.MAKS_KELUK;
    }

    function pilihKeluk(id) {
      if (st.pilih === id) return;
      st.pilih = id;
      st.baruDilukis = null;
      Array.prototype.forEach.call(panel.querySelectorAll("[data-pilih]"), function (b) {
        b.setAttribute("aria-pressed", b.getAttribute("data-pilih") === id ? "true" : "false");
      });
      binaParam();
    }

    panel.addEventListener("click", function (e) {
      var b = e.target.closest ? e.target.closest("button") : null;
      if (!b) return;
      if (b.hasAttribute("data-pilih")) {
        pilihKeluk(b.getAttribute("data-pilih"));
        lukis();
      } else if (b.hasAttribute("data-padam")) {
        var id = b.getAttribute("data-padam");
        st.graf = B.buangKeluk(st.graf, id);
        if (st.pilih === id) st.pilih = st.graf.keluk.length ? st.graf.keluk[0].id : null;
        binaPanel();
        binaParam();
        lukis();
      } else if (b.hasAttribute("data-contoh") || b.hasAttribute("data-kosong")) {
        st.graf = b.hasAttribute("data-contoh") ? B.grafContoh() : B.buatGraf();
        st.pilih = st.graf.keluk.length ? st.graf.keluk[0].id : null;
        mesej(notaPers, "");
        mesej(ralatPers, "");
        binaPanel();
        binaParam();
        lukis();
      }
    });

    panel.addEventListener("input", function (e) {
      var el = e.target;
      if (el.hasAttribute("data-nama")) {
        var id = el.getAttribute("data-nama");
        st.graf = B.namakan(st.graf, id, el.value);
        var k = cari(id);
        var cip = panel.querySelector('[data-pilih="' + id + '"] .bina-nama-cip');
        if (k && cip) cip.textContent = k.label;
        lukis();
      } else if (el.hasAttribute("data-paksi")) {
        st.graf = B.labelPaksi(st.graf, el.getAttribute("data-paksi"), el.value);
        lukis();
      }
    });

    // Selepas selesai menaip, tunjuk label yang disimpan (contoh "D1" → "D₁")
    panel.addEventListener("change", function (e) {
      var el = e.target;
      if (el.hasAttribute("data-nama")) {
        var k = cari(el.getAttribute("data-nama"));
        if (k) el.value = k.label;
      }
    });

    /* ---------- interaksi ---------- */
    function dekat(pt) {
      var sk = skala();
      var terbaik = null;
      st.graf.keluk.forEach(function (k) {
        var u = B.unjur(B.laluan(k), [pt.x, pt.y], sk[0], sk[1]);
        if (!dalamKotak([u.x, u.y])) return;
        if (!terbaik || u.jarak < terbaik.jarak) terbaik = { id: k.id, jarak: u.jarak, s: u.s };
      });
      return terbaik;
    }

    function gerakKe(pt) {
      var k = cari(st.pilih);
      if (!k || pt.x == null) return;
      var sk = skala();
      var u = B.unjur(B.laluan(k), [pt.x, pt.y], sk[0], sk[1]);
      st.graf = B.gerakTitik(st.graf, k.id, u.s);
      lukis();
    }

    function mulaGerak() {
      var t = B.titikKeluk(st.graf, st.pilih);
      st.seret = t ? { jenis: "gerak", keluk: st.pilih, dari: t.s } : null;
    }

    // Catat satu peristiwa bagi setiap seretan (bukan setiap gerakan penuding)
    function selesaiSeret() {
      var s = st.seret;
      st.seret = null;
      if (!s) return;
      if (s.jenis === "anjak") {
        var k = cari(s.keluk);
        if (k && (k.anjak.x !== s.dari.x || k.anjak.y !== s.dari.y)) {
          st.graf = B.catat(st.graf, { jenis: "anjak", keluk: s.keluk, dari: s.dari, ke: B.klon(k.anjak) });
        }
      } else if (s.jenis === "gerak") {
        var t = B.titikKeluk(st.graf, s.keluk);
        if (t && t.s !== s.dari) st.graf = B.catat(st.graf, { jenis: "gerak", keluk: s.keluk, titik: t.id, dari: s.dari, ke: t.s });
      }
    }

    G.interaksi(plot, {
      seret: function (nama, pt, fasa) {
        if (fasa === "mula") st.baruDilukis = null;
        if (nama === "titik") {
          if (fasa === "mula") mulaGerak();
          gerakKe(pt);
        } else if (nama.indexOf("keluk:") === 0) {
          var id = nama.slice(6);
          if (fasa === "mula") {
            pilihKeluk(id);
            var k = cari(id);
            st.seret = k && pt.x != null ? { jenis: "anjak", keluk: id, mula: [pt.x, pt.y], dari: B.klon(k.anjak) } : null;
          }
          if (st.seret && st.seret.jenis === "anjak" && pt.x != null) {
            var a = anjakKemas(cari(id), st.seret.dari.x + pt.x - st.seret.mula[0], st.seret.dari.y + pt.y - st.seret.mula[1]);
            st.graf = B.anjakKeluk(st.graf, id, a[0], a[1]);
          }
          lukis();
        }
        if (fasa === "tamat") selesaiSeret();
      },
      // Ketukan di luar pemegang: pilih keluk terdekat; dalam mod gerak, ketuk/seret pada keluk dipilih menggerakkan titik
      tekan: function (pt, e) {
        // mod lukis: kumpul titik lukisan (setiap ≥ 2 px)
        if (st.lukis) {
          if (e && e.type === "pointerdown") {
            st.coretan = [[pt.x, pt.y]];
            st.pesanLukis = null;
          } else if (st.coretan) {
            var z = st.coretan[st.coretan.length - 1];
            if (Math.abs(plot.X(z[0]) - pt.px) + Math.abs(plot.Y(z[1]) - pt.py) < 2) return;
            st.coretan.push([pt.x, pt.y]);
          }
          lukis();
          return;
        }
        if (e && e.type === "pointerdown") {
          st.seret = null;
          st.baruDilukis = null;
          var d = dekat(pt);
          if (!d || d.jarak > JARAK) return;
          if (d.id !== st.pilih) {
            pilihKeluk(d.id);
            st.seret = { jenis: "pilih" };
            lukis();
            return;
          }
          if (st.mod === "gerak") {
            mulaGerak();
            gerakKe(pt);
          }
          return;
        }
        if (st.seret && st.seret.jenis === "gerak") gerakKe(pt);
      },
      tekanSeret: true,
      lepas: function (nama) {
        if (nama !== "__tekan") return;
        if (st.lukis) selesaiLukis();
        else selesaiSeret();
      },
      hover: function (pt) {
        if (st.lukis) return;
        var d = dekat(pt);
        var h = d && d.jarak < JARAK ? d.id : null;
        if (h !== st.hover) {
          st.hover = h;
          lukis();
        }
      },
      keluar: function () {
        if (st.hover) {
          st.hover = null;
          lukis();
        }
      },
      kekunci: function (kk) {
        var k = cari(st.pilih);
        if (!k || st.lukis) return false;
        st.baruDilukis = null;
        var langkah = 0.01;
        if (st.mod === "alih") {
          // keluk persamaan: satu langkah = satu unit kemas pada paksi
          var nombor = k.persamaan && PS.paksiNombor(st.graf);
          var lx = nombor ? unit(st.graf.paksi.x.maks) / st.graf.paksi.x.maks : langkah,
            ly = nombor ? unit(st.graf.paksi.y.maks) / st.graf.paksi.y.maks : langkah;
          var dx = k.arahSeret === "y" || k.arahSeret === "tiada" ? 0 : kk.dx * lx,
            dy = k.arahSeret === "x" || k.arahSeret === "tiada" ? 0 : kk.dy * ly;
          if (!dx && !dy) return false;
          st.seret = { jenis: "anjak", keluk: k.id, dari: B.klon(k.anjak) };
          var a = anjakKemas(k, k.anjak.x + dx, k.anjak.y + dy);
          st.graf = B.anjakKeluk(st.graf, k.id, a[0], a[1]);
        } else {
          if (!kk.dx && !kk.dy) return false;
          var t = B.titikKeluk(st.graf, k.id);
          var poli = B.laluan(k);
          var p1 = B.titikPadaS(poli, Math.max(0, t.s - 0.01)),
            p2 = B.titikPadaS(poli, Math.min(1, t.s + 0.01));
          var dot = kk.dx * (p2[0] - p1[0]) + kk.dy * (p2[1] - p1[1]);
          var arah = Math.abs(dot) > 1e-9 ? (dot > 0 ? 1 : -1) : (kk.dx || kk.dy) > 0 ? 1 : -1;
          var besar = Math.max(Math.abs(kk.dx), Math.abs(kk.dy));
          st.seret = { jenis: "gerak", keluk: k.id, dari: t.s };
          st.graf = B.gerakTitik(st.graf, k.id, sPapar(k, t) + arah * langkah * besar);
        }
        selesaiSeret();
        lukis();
      }
    });

    host.setAttribute("data-mod", st.mod);
    binaPanel();
    binaParam();
    lukis();
    var henti = G.pantauSaiz(K.kanvas, function () {
      plot.ukur();
      lukis();
    });
    return {
      musnah: henti,
      dapat: function () {
        return B.klon(st.graf);
      }
    };
  }

  G.daftar("bina-keluk", widget, { tajuk: "Bina graf" });

  /* ---------- paparan #bina-graf ---------- */
  B.papar = function (app) {
    app.innerHTML =
      '<div class="bekas pandangan halaman-bina">' +
      '<nav class="remah"><a href="#utama">Utama</a><span>/</span><a href="#graf">Graf</a><span>/</span><span>Bina graf</span></nav>' +
      '<div class="bahagian-kepala" style="margin-top:14px"><div><h1 style="font-size:clamp(30px,4.4vw,44px)">Bina graf</h1>' +
      "<p>Bina graf ekonomi sendiri dan bezakan dua perubahan: <b>pergerakan di sepanjang keluk</b> (titik bergerak, keluk kekal) dan <b>peralihan keluk</b> (keseluruhan keluk beralih). Pilih mod dahulu, kemudian seret.</p></div></div>" +
      '<figure class="bina-graf" data-graf="bina-keluk"></figure>' +
      "</div>";
  };
})();
