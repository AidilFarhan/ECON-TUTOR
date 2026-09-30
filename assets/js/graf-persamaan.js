/* =========================================================
   Econ Tutor · persamaan keluk (EKO.persamaan)
   Parser sendiri (tiada eval). Fungsi tulen: boleh diuji dalam Node.

   Pemboleh ubah: P (paksi Y) dan Q, Qd, Qs (paksi X), atau x dan y.
   Parameter: huruf kecil lain, contoh "Qd = a − bP; a = 100; b = 2".
   Hasil: Keluk biasa (EKO.bina) dengan tambahan
     persamaan: { teks, kiri, kanan (AST), dep: "x"|"y", nama: {x, y}, sistem: "PQ"|"xy",
                  param: {a: 100}, julatParam: {a: [min, maks, langkah]}, linear }
   Peralihan tetap `anjak` sahaja; persamaan tidak dijana semula apabila keluk diseret.
   ========================================================= */
(function () {
  "use strict";

  var E = window.EKO;
  var B = E.bina;
  var PS = (E.persamaan = {});

  var KOTAK = 0.92; // keluk persamaan berakhir dalam 92% paksi supaya label kelihatan
  var MAKS_PARAM = 4;
  var FUNGSI = /(sqrt|ln|log|exp|sin|cos|tan|abs)\s*\(/i;

  function Ralat(mesej) {
    this.mesej = mesej;
  }

  /* ---------- normalisasi & token ---------- */
  PS.normal = function (teks) {
    var s = String(teks || "")
      .replace(/[\u2212\u2012\u2013\u2014]/g, "-")
      .replace(/[×·∙]/g, "*")
      .replace(/÷/g, "/")
      .replace(/²/g, "^2")
      .replace(/³/g, "^3")
      .replace(/_/g, "");
    // pemisah ribu gaya buku teks: "1 000" → "1000"
    var lama;
    do {
      lama = s;
      s = s.replace(/(\d) (\d{3})(?!\d)/g, "$1$2");
    } while (s !== lama);
    return s;
  };

  function token(s) {
    var out = [];
    var i = 0;
    while (i < s.length) {
      var c = s.charAt(i);
      if (/\s/.test(c)) {
        i++;
        continue;
      }
      if (/[0-9.]/.test(c)) {
        var m = /^(\d+\.?\d*|\.\d+)/.exec(s.slice(i));
        if (!m) throw new Ralat("Nombor tidak sah berhampiran “" + s.slice(i, i + 4) + "”.");
        out.push({ j: "n", v: parseFloat(m[1]), pos: i, t: m[1] });
        i += m[1].length;
        continue;
      }
      if (/[A-Za-z]/.test(c)) {
        var qd = /^Q[ds](?![A-Za-z])/i.exec(s.slice(i)) || /^Q[ds]/.exec(s.slice(i));
        if (qd) {
          out.push({ j: "id", n: "Q" + qd[0].charAt(1).toLowerCase(), pos: i, t: qd[0] });
          i += 2;
          continue;
        }
        out.push({ j: "id", n: c, pos: i, t: c });
        i++;
        continue;
      }
      if ("+-*/^()=".indexOf(c) !== -1) {
        out.push({ j: "op", v: c, pos: i, t: c });
        i++;
        continue;
      }
      if (c === ",") throw new Ralat("Guna titik untuk perpuluhan, contoh 2.5.");
      throw new Ralat("Aksara “" + c + "” tidak dikenali.");
    }
    return out;
  }

  // Nama pemboleh ubah → paksi. Selain ini: parameter (huruf kecil).
  function jenisId(n) {
    if (n === "x" || n === "y") return { paksi: n, sistem: "xy", nama: n };
    if (n === "P" || n === "p") return { paksi: "y", sistem: "PQ", nama: "P" };
    if (n === "Q" || n === "q") return { paksi: "x", sistem: "PQ", nama: "Q" };
    if (n === "Qd" || n === "Qs") return { paksi: "x", sistem: "PQ", nama: n };
    return null;
  }

  /* ---------- parser (recursive descent) ---------- */
  function Parser(tok) {
    this.tok = tok;
    this.i = 0;
  }
  Parser.prototype.lihat = function () {
    return this.tok[this.i];
  };
  Parser.prototype.ambil = function () {
    return this.tok[this.i++];
  };
  Parser.prototype.op = function (v) {
    var t = this.lihat();
    return t && t.j === "op" && t.v === v;
  };
  Parser.prototype.ungkapan = function () {
    var kiri = this.sebutan();
    while (this.op("+") || this.op("-")) {
      var o = this.ambil().v;
      kiri = { j: o, a: kiri, b: this.sebutan() };
    }
    return kiri;
  };
  Parser.prototype.sebutan = function () {
    var kiri = this.unari();
    for (;;) {
      var t = this.lihat();
      if (this.op("*") || this.op("/")) {
        var o = this.ambil().v;
        kiri = { j: o, a: kiri, b: this.unari() };
      } else if (t && (t.j === "n" || t.j === "id" || (t.j === "op" && t.v === "("))) {
        // darab tersirat: 2P, bP, 3(P + 1)
        kiri = { j: "*", a: kiri, b: this.kuasa() };
      } else return kiri;
    }
  };
  Parser.prototype.unari = function () {
    if (this.op("-")) {
      this.ambil();
      return { j: "neg", a: this.unari() };
    }
    if (this.op("+")) {
      this.ambil();
      return this.unari();
    }
    return this.kuasa();
  };
  Parser.prototype.kuasa = function () {
    var asas = this.utama();
    if (this.op("^")) {
      this.ambil();
      return { j: "^", a: asas, b: this.unari() };
    }
    return asas;
  };
  Parser.prototype.utama = function () {
    var t = this.ambil();
    if (!t) throw new Ralat("Persamaan tidak lengkap.");
    if (t.j === "n") return { j: "n", v: t.v };
    if (t.j === "id") {
      var jn = jenisId(t.n);
      return jn ? { j: "v", n: jn.nama, paksi: jn.paksi, sistem: jn.sistem } : { j: "p", n: t.n };
    }
    if (t.v === "(") {
      var dalam = this.ungkapan();
      if (!this.op(")")) throw new Ralat("Kurungan tidak seimbang.");
      this.ambil();
      return dalam;
    }
    if (t.v === ")") throw new Ralat("Kurungan tidak seimbang.");
    throw new Ralat("Semak susunan persamaan berhampiran “" + t.t + "”.");
  };

  function uraiUngkapan(teks) {
    var tok = token(teks);
    if (!tok.length) throw new Ralat("Persamaan tidak lengkap.");
    var p = new Parser(tok);
    var ast = p.ungkapan();
    if (p.i < tok.length) {
      var t = tok[p.i];
      if (t.j === "op" && t.v === ")") throw new Ralat("Kurungan tidak seimbang.");
      throw new Ralat("Semak susunan persamaan berhampiran “" + t.t + "”.");
    }
    return ast;
  }

  /* ---------- nilai AST ---------- */
  function nilai(n, env) {
    switch (n.j) {
      case "n":
        return n.v;
      case "v":
        return env[n.paksi];
      case "p":
        return env.param[n.n];
      case "neg":
        return -nilai(n.a, env);
      case "+":
        return nilai(n.a, env) + nilai(n.b, env);
      case "-":
        return nilai(n.a, env) - nilai(n.b, env);
      case "*":
        return nilai(n.a, env) * nilai(n.b, env);
      case "/":
        return nilai(n.a, env) / nilai(n.b, env);
      case "^":
        return Math.pow(nilai(n.a, env), nilai(n.b, env));
    }
    return NaN;
  }
  PS.nilai = nilai;

  function kumpul(n, out) {
    if (n.j === "v") out.v.push(n);
    else if (n.j === "p") {
      if (out.p.indexOf(n.n) === -1) out.p.push(n.n);
    }
    if (n.a) kumpul(n.a, out);
    if (n.b) kumpul(n.b, out);
    return out;
  }

  // F(x, y) = kiri − kanan
  function F(eq, x, y, param) {
    var env = { x: x, y: y, param: param || eq.param };
    return nilai(eq.kiri, env) - nilai(eq.kanan, env);
  }

  // Adakah F linear pada paksi `d` (untuk beberapa nilai paksi lain)?
  function linearPada(eq, d, param) {
    var cuba = [0.37, 1.9, 7.3, 23.1];
    for (var i = 0; i < cuba.length; i++) {
      var o = cuba[i];
      var f = function (v) {
        return d === "x" ? F(eq, v, o, param) : F(eq, o, v, param);
      };
      var f0 = f(0.5),
        f1 = f(1.5),
        f2 = f(2.5),
        f3 = f(4.5);
      var skala = Math.abs(f0) + Math.abs(f1) + Math.abs(f2) + 1e-9;
      if (!isFinite(f0) || !isFinite(f1) || !isFinite(f2) || !isFinite(f3)) continue;
      if (Math.abs(f2 - 2 * f1 + f0) > 1e-7 * skala) return false;
      if (Math.abs(f3 - f0 - 4 * (f1 - f0)) > 1e-7 * skala) return false;
    }
    return true;
  }

  // Nilai paksi bersandar pada nilai t paksi bebas
  PS.fungsi = function (eq, param) {
    var pr = param || eq.param;
    return function (t) {
      var a, b;
      if (eq.dep === "x") {
        a = F(eq, 0, t, pr);
        b = F(eq, 1, t, pr) - a;
      } else {
        a = F(eq, t, 0, pr);
        b = F(eq, t, 1, pr) - a;
      }
      if (!isFinite(a) || !isFinite(b) || Math.abs(b) < 1e-12) return NaN;
      return -a / b;
    };
  };

  /* ---------- urai teks → persamaan ---------- */
  function uraiParam(bahagian, param) {
    bahagian.forEach(function (b) {
      var s = b.trim();
      if (!s) return;
      var m = /^([a-z])\s*=\s*(-?\s*\d+\.?\d*|-?\s*\.\d+)$/.exec(s);
      if (!m || jenisId(m[1])) throw new Ralat("Nilai parameter tidak sah: “" + s + "”. Contoh: a = 100.");
      param[m[1]] = parseFloat(m[2].replace(/\s/g, ""));
    });
  }

  PS.urai = function (teksAsal) {
    try {
      var s = PS.normal(teksAsal).trim();
      if (!s) throw new Ralat("Taip persamaan dahulu, contoh Qd = 100 − 2P.");
      if (FUNGSI.test(s)) throw new Ralat("Fungsi seperti sqrt, ln atau log belum disokong.");
      // "Qd = a − bP; a = 100; b = 2" (koma juga boleh sebelum "a =")
      var bahagian = s.split(/[;\n]|,(?=\s*[a-z]\s*=)/);
      var utama = bahagian[0];
      var nilaiParam = {};
      uraiParam(bahagian.slice(1), nilaiParam);
      var sama = utama.split("=");
      if (sama.length < 2) throw new Ralat("Persamaan mesti ada tanda =.");
      if (sama.length > 2) throw new Ralat("Hanya satu tanda = dibenarkan dalam persamaan.");
      if (!sama[0].trim() || !sama[1].trim()) throw new Ralat("Persamaan tidak lengkap: kedua-dua belah tanda = mesti ada isi.");
      var kiri = uraiUngkapan(sama[0]),
        kanan = uraiUngkapan(sama[1]);
      var ada = kumpul(kanan, kumpul(kiri, { v: [], p: [] }));
      if (!ada.v.length) throw new Ralat("Persamaan mesti mengandungi P dan/atau Q (atau x dan/atau y).");
      var sistem = ada.v[0].sistem;
      var namaQ = null;
      ada.v.forEach(function (v) {
        if (v.sistem !== sistem) throw new Ralat("Jangan campur x atau y dengan P atau Q dalam satu persamaan.");
        if (v.paksi === "x" && v.sistem === "PQ") {
          if (namaQ && namaQ !== v.n) throw new Ralat("Guna satu pemboleh ubah kuantiti sahaja (Q, Qd atau Qs).");
          namaQ = v.n;
        }
      });
      if (ada.p.length > MAKS_PARAM) throw new Ralat("Paling banyak " + MAKS_PARAM + " parameter (" + ada.p.join(", ") + ").");
      Object.keys(nilaiParam).forEach(function (k) {
        if (ada.p.indexOf(k) === -1) throw new Ralat("Parameter " + k + " tiada dalam persamaan.");
      });
      var param = {};
      ada.p.forEach(function (k) {
        param[k] = nilaiParam[k] != null ? nilaiParam[k] : 1;
      });
      var nama = sistem === "xy" ? { x: "x", y: "y" } : { x: namaQ || "Q", y: "P" };
      var eq = { teks: PS.cantik(utama), kiri: kiri, kanan: kanan, sistem: sistem, nama: nama, param: param, dep: null, linear: false };
      eq.julatParam = {};
      ada.p.forEach(function (k) {
        eq.julatParam[k] = PS.julatParam(param[k]);
      });

      // pilih paksi bersandar: pemboleh ubah tunggal di sebelah kiri/kanan, jika F linear padanya
      var paksiAda = { x: false, y: false };
      ada.v.forEach(function (v) {
        paksiAda[v.paksi] = true;
      });
      var calon = [];
      if (kiri.j === "v") calon.push(kiri.paksi);
      if (kanan.j === "v") calon.push(kanan.paksi);
      calon.push("x", "y");
      for (var i = 0; i < calon.length && !eq.dep; i++) {
        var d = calon[i];
        if (!paksiAda[d]) continue;
        if (linearPada(eq, d)) eq.dep = d;
      }
      if (!eq.dep) throw new Ralat("Persamaan ini belum disokong. Tulis dalam bentuk " + (sistem === "xy" ? "y = …" : "Q = … atau P = …") + ".");
      // pekali pemboleh ubah bersandar mesti bukan sifar
      var g = PS.fungsi(eq);
      var adaNilai = [0.5, 3, 11].some(function (t) {
        return isFinite(g(t));
      });
      if (!adaNilai) throw new Ralat("Persamaan ini tidak menentukan " + nama[eq.dep] + ". Semak persamaan.");
      eq.linear = PS.garisLurus(eq);
      eq.jenis = namaQ === "Qd" ? "permintaan" : namaQ === "Qs" ? "penawaran" : null;
      return { ok: true, persamaan: eq, diberi: Object.keys(nilaiParam) };
    } catch (e) {
      if (e instanceof Ralat) return { ok: false, ralat: e.mesej };
      throw e;
    }
  };

  // Keluk ialah garis lurus jika nilai bersandar linear pada nilai bebas
  PS.garisLurus = function (eq, param) {
    var g = PS.fungsi(eq, param);
    var a = g(0.5),
      b = g(2.5),
      c = g(6.5);
    if (!isFinite(a) || !isFinite(b) || !isFinite(c)) return false;
    return Math.abs(c - a - 3 * (b - a)) <= 1e-7 * (Math.abs(a) + Math.abs(b) + Math.abs(c) + 1);
  };

  // Paparan: tolak guna "−", darab guna "×"
  PS.cantik = function (teks) {
    return String(teks)
      .trim()
      .replace(/\s+/g, " ")
      .replace(/-/g, "−")
      .replace(/\*/g, "×")
      .replace(/\^2(?![\d.])/g, "²")
      .replace(/\^3(?![\d.])/g, "³");
  };

  /* ---------- julat ---------- */
  var LANGKAH_ELOK = [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10];
  PS.bulatElok = function (v) {
    if (!(v > 0)) return 10;
    var p = Math.pow(10, Math.floor(Math.log(v) / Math.LN10));
    for (var i = 0; i < LANGKAH_ELOK.length; i++) if (LANGKAH_ELOK[i] * p >= v - 1e-9) return LANGKAH_ELOK[i] * p;
    return 10 * p;
  };

  PS.julatParam = function (v) {
    var lo, hi;
    if (v > 0) {
      lo = 0;
      hi = PS.bulatElok(3 * v);
    } else if (v < 0) {
      lo = -PS.bulatElok(3 * -v);
      hi = 0;
    } else {
      lo = -10;
      hi = 10;
    }
    var langkah = Math.pow(10, Math.floor(Math.log((hi - lo) / 100) / Math.LN10));
    return [lo, hi, langkah];
  };

  // Cadang nilai maksimum paksi supaya keluk kelihatan penuh
  PS.cadangJulat = function (eq) {
    var g = PS.fungsi(eq);
    var bebas = eq.dep === "x" ? "y" : "x";
    var g0 = g(0);
    var guna = kumpul(eq.kiri, kumpul(eq.kanan, { v: [], p: [] })).v.some(function (v) {
      return v.paksi === bebas;
    });
    var out = {};
    if (!guna) {
      // garis mendatar/tegak: bersandar malar
      if (!(g0 > 0)) return null;
      out[eq.dep] = PS.bulatElok(g0 * 1.25);
      out[bebas] = null;
      return out;
    }
    // cari T (hujung domain bebas)
    var T = null,
      i,
      t,
      v,
      sebelum = g0;
    var titik = [];
    for (i = 0; i <= 240; i++) titik.push(Math.pow(10, -3 + (9 * i) / 240));
    var punca = null;
    for (i = 0; i < titik.length; i++) {
      t = titik[i];
      v = g(t);
      if (!isFinite(v)) continue;
      if (isFinite(sebelum) && ((sebelum > 0 && v <= 0) || (sebelum <= 0 && v > 0))) {
        punca = { t: t, turun: sebelum > 0 };
        break;
      }
      sebelum = v;
    }
    if (g0 > 0 && punca && punca.turun) T = punca.t;
    else if (!(g0 > 0) && punca && !punca.turun) T = 3 * punca.t;
    else if (g0 > 0) {
      for (i = 0; i < titik.length; i++) {
        v = g(titik[i]);
        if (isFinite(v) && v >= 3 * g0) {
          T = titik[i];
          break;
        }
      }
    }
    if (!T || !(T > 0)) T = 10;
    var maks = 0;
    for (i = 0; i <= 60; i++) {
      v = g((T * i) / 60);
      if (isFinite(v)) maks = Math.max(maks, v);
    }
    if (!(maks > 0)) return null;
    out[bebas] = PS.bulatElok(T * 1.1);
    out[eq.dep] = PS.bulatElok(maks * 1.15);
    return out;
  };

  /* ---------- sampel → titik ternormal ---------- */
  PS.sampel = function (eq, paksi, param) {
    var g = PS.fungsi(eq, param);
    var dep = eq.dep,
      bebas = dep === "x" ? "y" : "x";
    var Mb = paksi[bebas].maks,
      Md = paksi[dep].maks;
    var lurus = PS.garisLurus(eq, param);
    var n = lurus ? 1 : 240;
    var kepingan = [],
      semasa = [];
    for (var i = 0; i <= n; i++) {
      var t = (Mb * i) / n;
      var v = g(t);
      if (!isFinite(v)) {
        if (semasa.length > 1) kepingan.push(semasa);
        semasa = [];
        continue;
      }
      var nb = t / Mb,
        nd = v / Md;
      semasa.push(dep === "x" ? [nd / KOTAK, nb / KOTAK] : [nb / KOTAK, nd / KOTAK]);
    }
    if (semasa.length > 1) kepingan.push(semasa);
    // potong pada kotak 92% dan ambil kepingan terpanjang
    var terbaik = null,
      panjang = 0;
    kepingan.forEach(function (k) {
      B.klipKotak(k).forEach(function (c) {
        var L = B.panjang(c);
        if (L[L.length - 1] > panjang) {
          panjang = L[L.length - 1];
          terbaik = c;
        }
      });
    });
    if (!terbaik || panjang < 0.02) return null;
    var pts = terbaik.map(function (p) {
      return [p[0] * KOTAK, p[1] * KOTAK];
    });
    if (lurus) return [pts[0], pts[pts.length - 1]];
    // kurangkan kepada ≤ 120 titik
    var langkah = Math.max(1, Math.ceil(pts.length / 120));
    var out = pts.filter(function (p, i) {
      return i % langkah === 0;
    });
    if (out[out.length - 1] !== pts[pts.length - 1]) out.push(pts[pts.length - 1]);
    return out;
  };

  /* ---------- bentuk setara selepas peralihan (garis lurus sahaja) ---------- */
  function fmtNombor(v) {
    return E.fmt(v, 2);
  }

  // dx, dy dalam unit dunia. Pulang teks, contoh "Qd = 120 − 2P".
  PS.bentukLurus = function (eq, dx, dy) {
    if (!PS.garisLurus(eq)) return null;
    var g = PS.fungsi(eq);
    var c = g(0),
      m = g(1) - c;
    if (!isFinite(c) || !isFinite(m)) return null;
    var ada = kumpul(eq.kiri, kumpul(eq.kanan, { v: [], p: [] })).v;
    var bebas = eq.dep === "x" ? "y" : "x";
    var guna = ada.some(function (v) {
      return v.paksi === bebas;
    });
    if (!guna) m = 0;
    // dep − d_dep = c + m (bebas − d_bebas)
    var dDep = eq.dep === "x" ? dx : dy,
      dBebas = eq.dep === "x" ? dy : dx;
    var c1 = c + dDep - m * dBebas;
    c1 = Math.abs(c1) < 1e-9 ? 0 : c1;
    var namaDep = eq.nama[eq.dep],
      namaBebas = eq.nama[bebas];
    var s = namaDep + " = ";
    var mAbs = Math.abs(m);
    var sebutM = (Math.abs(mAbs - 1) < 1e-9 ? "" : fmtNombor(mAbs)) + namaBebas;
    if (Math.abs(m) < 1e-9) s += fmtNombor(c1);
    else if (c1 === 0) s += (m < 0 ? "−" : "") + sebutM;
    else s += fmtNombor(c1) + (m < 0 ? " − " : " + ") + sebutM;
    return s;
  };

  /* ---------- operasi graf ---------- */
  function paksiNombor(graf) {
    return graf.paksi.x.maks > 0 && graf.paksi.y.maks > 0;
  }

  // Sampel semula semua keluk persamaan (selepas julat paksi berubah). nisbah = {x, y}: maks lama / maks baharu.
  function sampelSemua(g, nisbah) {
    g.keluk.forEach(function (k) {
      if (!k.persamaan) return;
      var pts = PS.sampel(k.persamaan, g.paksi);
      if (pts) k.titik = pts.map(function (p) {
        return [Math.round(p[0] * 1000) / 1000, Math.round(p[1] * 1000) / 1000];
      });
      if (nisbah) k.anjak = { x: Math.round(k.anjak.x * nisbah.x * 1000) / 1000, y: Math.round(k.anjak.y * nisbah.y * 1000) / 1000 };
    });
  }

  // Tambah keluk daripada teks persamaan. Pulang { graf, ralat?, id?, nota? }.
  PS.tambah = function (graf, teks) {
    if (graf.keluk.length >= B.MAKS_KELUK) return { graf: graf, ralat: "Graf sudah ada " + B.MAKS_KELUK + " keluk. Padam satu keluk dahulu." };
    var h = PS.urai(teks);
    if (!h.ok) return { graf: graf, ralat: h.ralat };
    var eq = h.persamaan;
    var lain = null;
    graf.keluk.forEach(function (k) {
      if (k.persamaan && k.persamaan.sistem !== eq.sistem) lain = k.persamaan.sistem;
    });
    if (lain) {
      return {
        graf: graf,
        ralat: lain === "PQ" ? "Graf ini menggunakan P dan Q. Guna P dan Q juga, atau tekan “Kosongkan graf” dahulu." : "Graf ini menggunakan x dan y. Guna x dan y juga, atau tekan “Kosongkan graf” dahulu."
      };
    }
    var cadang = PS.cadangJulat(eq);
    if (!cadang) return { graf: graf, ralat: "Keluk ini tiada bahagian dalam sukuan pertama (nilai positif). Semak tanda atau nilai parameter." };
    var g = B.klon(graf);
    var lama = { x: g.paksi.x.maks || 0, y: g.paksi.y.maks || 0 };
    var nombor = paksiNombor(g);
    ["x", "y"].forEach(function (a) {
      var c = cadang[a] || (nombor ? g.paksi[a].maks : 10);
      g.paksi[a].maks = Math.max(nombor ? g.paksi[a].maks : 0, c);
    });
    if (!nombor && eq.sistem === "xy" && !g.keluk.length) {
      g.paksi.x.label = "x";
      g.paksi.y.label = "y";
    }
    var pts = PS.sampel(eq, g.paksi);
    if (!pts) return { graf: graf, ralat: "Keluk ini tiada bahagian dalam sukuan pertama (nilai positif). Semak tanda atau nilai parameter." };
    if (nombor && (lama.x !== g.paksi.x.maks || lama.y !== g.paksi.y.maks)) {
      sampelSemua(g, { x: lama.x / g.paksi.x.maks, y: lama.y / g.paksi.y.maks });
    }
    var label = eq.jenis === "permintaan" ? "D" : eq.jenis === "penawaran" ? "S" : "K";
    var warna = eq.jenis === "permintaan" ? "d" : eq.jenis === "penawaran" ? "s" : null;
    g = B.tambahKeluk(g, { label: label, warna: warna, titik: pts, sumber: "persamaan", persamaan: eq, jenis: eq.jenis });
    var nota = null;
    var tanpaNilai = Object.keys(eq.param).filter(function (k) {
      return h.diberi.indexOf(k) === -1;
    });
    if (tanpaNilai.length) nota = "Nilai awal " + tanpaNilai.map(function (k) {
      return k + " = 1";
    }).join(", ") + ". Tukar dengan gelangsar, atau tulis contohnya “; " + tanpaNilai[0] + " = 100” selepas persamaan.";
    return { graf: g, id: g.keluk[g.keluk.length - 1].id, nota: nota };
  };

  // Tukar nilai parameter: keluk disampel semula (paksi kekal supaya perubahan kelihatan).
  PS.setParam = function (graf, id, nama, v) {
    var g = B.klon(graf);
    var k = B.cari(g, id);
    if (!k || !k.persamaan || !(nama in k.persamaan.param) || !isFinite(v)) return { graf: graf };
    var param = B.klon(k.persamaan.param);
    param[nama] = v;
    var pts = PS.sampel(k.persamaan, g.paksi, param);
    k.persamaan.param = param;
    if (!pts) return { graf: g, ralat: "Pada nilai ini keluk berada di luar graf." };
    k.titik = pts.map(function (p) {
      return [Math.round(p[0] * 1000) / 1000, Math.round(p[1] * 1000) / 1000];
    });
    k.meta.arah = B.arahKeluk(k.titik);
    return { graf: g };
  };

  // Titik ternormal → nilai dunia
  PS.keDunia = function (graf, p) {
    return [p[0] * graf.paksi.x.maks, p[1] * graf.paksi.y.maks];
  };
  PS.paksiNombor = paksiNombor;
})();
