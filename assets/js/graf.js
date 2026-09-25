/* =========================================================
   Econ Tutor · enjin graf interaktif (SVG, tanpa pustaka)
   - Plot: paksi, skala, lapisan, alat lukis
   - Interaksi: nod boleh diseret (tetikus, sentuh, papan kekunci)
   - Widget asas: permintaan, penawaran, jumlah pasaran,
     keseimbangan, keanjalan, cukai & subsidi
   ========================================================= */
(function () {
  "use strict";

  var NS = "http://www.w3.org/2000/svg";
  var E = window.EKO;
  var G = (E.graf = {});
  var daftar = {};
  var aktif = [];
  var kiraId = 0;

  G.daftar = function (nama, fn, info) {
    daftar[nama] = fn;
    if (info) G.info[nama] = info;
  };
  G.info = {};
  G.ada = function (nama) {
    return !!daftar[nama];
  };

  /* ---------- pemasangan ---------- */
  G.pasang = function (root) {
    var senarai = (root || document).querySelectorAll("[data-graf]:not([data-dipasang])");
    Array.prototype.forEach.call(senarai, function (el) {
      var nama = el.getAttribute("data-graf");
      var fn = daftar[nama];
      el.setAttribute("data-dipasang", "1");
      if (!fn) {
        el.innerHTML = '<p class="teks-lemah">Graf “' + E.esc(nama) + "” belum tersedia.</p>";
        return;
      }
      var opt = {};
      try {
        opt = JSON.parse(el.getAttribute("data-opt") || "{}");
      } catch (e) {
        opt = {};
      }
      try {
        var w = fn(el, opt) || {};
        aktif.push(w);
      } catch (e) {
        console.error("Graf " + nama, e);
        el.innerHTML = '<p class="teks-lemah">Graf tidak dapat dimuatkan.</p>';
      }
    });
  };

  G.tanggal = function () {
    aktif.forEach(function (w) {
      if (w && typeof w.musnah === "function") {
        try {
          w.musnah();
        } catch (e) {}
      }
    });
    aktif = [];
  };

  /* ---------- DOM kecil ---------- */
  function svgEl(tag, attrs, induk) {
    var n = document.createElementNS(NS, tag);
    if (attrs) {
      for (var k in attrs) {
        if (attrs[k] != null) n.setAttribute(k, attrs[k]);
      }
    }
    if (induk) induk.appendChild(n);
    return n;
  }
  G.svgEl = svgEl;

  function div(kelas, html) {
    var d = document.createElement("div");
    if (kelas) d.className = kelas;
    if (html != null) d.innerHTML = html;
    return d;
  }
  G.div = div;

  /* ---------- rangka kad graf ---------- */
  G.kad = function (host, o) {
    o = o || {};
    host.classList.add("graf-kad");
    host.innerHTML = "";
    var tajuk = div("graf-tajuk");
    tajuk.innerHTML =
      "<b>" + (o.tajuk || "Graf") + "</b>" + (o.petunjuk ? '<span class="graf-petunjuk">' + o.petunjuk + "</span>" : "");
    host.appendChild(tajuk);
    var kawalan = div("graf-kawalan");
    if (o.kawalan === false) kawalan.hidden = true;
    host.appendChild(kawalan);
    var kanvas = div("graf-kanvas");
    host.appendChild(kanvas);
    var baca = div("graf-baca");
    baca.setAttribute("aria-live", "polite");
    host.appendChild(baca);
    return { host: host, tajuk: tajuk, kawalan: kawalan, kanvas: kanvas, baca: baca };
  };

  // Cip nilai untuk panel bacaan: [[label, nilai, kelas], ...]
  G.nilai = function (senarai) {
    return (
      '<div class="nilai">' +
      senarai
        .filter(Boolean)
        .map(function (s) {
          return '<span class="' + (s[2] || "") + '"><em>' + s[0] + "</em> <b>" + s[1] + "</b></span>";
        })
        .join("") +
      "</div>"
    );
  };

  G.butang = function (induk, label, fn, o) {
    o = o || {};
    var b = document.createElement("button");
    b.type = "button";
    b.className = o.kelas || "cip";
    b.innerHTML = label;
    if (o.tekan != null) b.setAttribute("aria-pressed", o.tekan ? "true" : "false");
    b.addEventListener("click", fn);
    induk.appendChild(b);
    return b;
  };

  // Kumpulan butang pilihan tunggal
  G.segmen = function (induk, pilihan, nilaiAwal, fn) {
    var bts = [];
    pilihan.forEach(function (p) {
      var b = G.butang(
        induk,
        p[1],
        function () {
          bts.forEach(function (x) {
            x.setAttribute("aria-pressed", x === b ? "true" : "false");
          });
          fn(p[0]);
        },
        { tekan: p[0] === nilaiAwal }
      );
      bts.push(b);
    });
    return {
      set: function (v) {
        bts.forEach(function (x, i) {
          x.setAttribute("aria-pressed", pilihan[i][0] === v ? "true" : "false");
        });
      }
    };
  };

  G.pemisah = function (induk) {
    var s = document.createElement("span");
    s.className = "pemisah";
    s.setAttribute("aria-hidden", "true");
    induk.appendChild(s);
  };

  G.julat = function (induk, o) {
    var lab = document.createElement("label");
    lab.className = "julat";
    var id = "j" + ++kiraId;
    lab.innerHTML =
      "<span>" + o.label + "</span>" +
      '<input type="range" id="' + id + '" min="' + o.min + '" max="' + o.max + '" step="' + (o.step || 1) + '" value="' + o.nilai + '">' +
      "<output for=\"" + id + "\"></output>";
    var inp = lab.querySelector("input");
    var out = lab.querySelector("output");
    function kemas() {
      var v = parseFloat(inp.value);
      out.textContent = o.fmt ? o.fmt(v) : v;
      return v;
    }
    inp.addEventListener("input", function () {
      o.ubah(kemas());
    });
    kemas();
    induk.appendChild(lab);
    return {
      el: lab,
      input: inp,
      set: function (v) {
        inp.value = v;
        kemas();
      }
    };
  };

  G.pilih = function (induk, o) {
    var lab = document.createElement("label");
    lab.className = "medan";
    lab.style.minWidth = "min(100%, 260px)";
    lab.style.flex = "1 1 260px";
    var html = "<span>" + o.label + '</span><select id="p' + ++kiraId + '">';
    o.kumpulan.forEach(function (k) {
      if (k.label) html += '<optgroup label="' + E.esc(k.label) + '">';
      k.pilihan.forEach(function (p) {
        html += '<option value="' + E.esc(p[0]) + '">' + E.esc(p[1]) + "</option>";
      });
      if (k.label) html += "</optgroup>";
    });
    html += "</select>";
    lab.innerHTML = html;
    var sel = lab.querySelector("select");
    sel.addEventListener("change", function () {
      o.ubah(sel.value);
    });
    induk.appendChild(lab);
    return {
      el: lab,
      select: sel,
      set: function (v) {
        sel.value = v;
      }
    };
  };

  /* ---------- pantau saiz ---------- */
  G.pantauSaiz = function (el, fn) {
    var lebar = el.clientWidth;
    var jadual = false;
    function cuba() {
      var w = el.clientWidth;
      if (Math.abs(w - lebar) > 2 && !jadual) {
        lebar = w;
        jadual = true;
        requestAnimationFrame(function () {
          jadual = false;
          fn();
        });
      }
    }
    if (window.ResizeObserver) {
      var ro = new ResizeObserver(cuba);
      ro.observe(el);
      return function () {
        ro.disconnect();
      };
    }
    window.addEventListener("resize", cuba);
    return function () {
      window.removeEventListener("resize", cuba);
    };
  };

  /* ---------- animasi ---------- */
  G.tween = function (dari, ke, ms, fn, siap) {
    if (E.kurangGerak() || !ms) {
      fn(ke, 1);
      if (siap) siap();
      return function () {};
    }
    var t0 = null;
    var batal = false;
    var id;
    function langkah(t) {
      if (batal) return;
      if (t0 == null) t0 = t;
      var k = Math.min(1, (t - t0) / ms);
      var e = 1 - Math.pow(1 - k, 3);
      var v;
      if (typeof dari === "number") v = dari + (ke - dari) * e;
      else {
        v = {};
        for (var key in ke) v[key] = dari[key] + (ke[key] - dari[key]) * e;
      }
      fn(v, k);
      if (k < 1) id = requestAnimationFrame(langkah);
      else if (siap) siap();
    }
    id = requestAnimationFrame(langkah);
    return function () {
      batal = true;
      cancelAnimationFrame(id);
    };
  };

  /* ---------- interpolasi licin (kubik monoton) ---------- */
  G.monoton = function (xs, ys) {
    var n = xs.length;
    var i;
    var dxs = [];
    var ms = [];
    for (i = 0; i < n - 1; i++) {
      var dx = xs[i + 1] - xs[i];
      dxs.push(dx);
      ms.push((ys[i + 1] - ys[i]) / dx);
    }
    var c1s = [ms[0]];
    for (i = 0; i < dxs.length - 1; i++) {
      var m = ms[i];
      var mN = ms[i + 1];
      if (m * mN <= 0) c1s.push(0);
      else {
        var dx0 = dxs[i];
        var dxN = dxs[i + 1];
        var sama = dx0 + dxN;
        c1s.push((3 * sama) / ((sama + dxN) / m + (sama + dx0) / mN));
      }
    }
    c1s.push(ms[ms.length - 1]);
    var c2s = [];
    var c3s = [];
    for (i = 0; i < c1s.length - 1; i++) {
      var c1 = c1s[i];
      var m2 = ms[i];
      var inv = 1 / dxs[i];
      var sama2 = c1 + c1s[i + 1] - m2 - m2;
      c2s.push((m2 - c1 - sama2) * inv);
      c3s.push(sama2 * inv * inv);
    }
    return function (x) {
      var last = n - 1;
      if (x <= xs[0]) return ys[0] + (x - xs[0]) * c1s[0];
      if (x >= xs[last]) return ys[last] + (x - xs[last]) * c1s[last];
      var lo = 0;
      var hi = c3s.length - 1;
      var mid;
      while (lo <= hi) {
        mid = Math.floor(0.5 * (lo + hi));
        if (xs[mid] < x) lo = mid + 1;
        else if (xs[mid] > x) hi = mid - 1;
        else return ys[mid];
      }
      var j = Math.max(0, hi);
      var d = x - xs[j];
      return ys[j] + c1s[j] * d + c2s[j] * d * d + c3s[j] * d * d * d;
    };
  };

  /* ---------- Plot ---------- */
  function Plot(host, cfg) {
    this.cfg = cfg || {};
    this.host = host || null;
    this.id = "g" + ++kiraId;
    var statik = !!this.cfg.statik;
    this.svg = svgEl("svg", {
      xmlns: NS,
      role: statik ? "img" : "application",
      "aria-label": this.cfg.aria || "Graf interaktif",
      tabindex: statik ? null : "0",
      focusable: statik ? "false" : null
    });
    this.lapis = {};
    var self = this;
    ["latar", "zon", "grid", "kawasan", "paksi", "hantu", "lengkung", "panduan", "tanda", "label", "pemegang", "atas"].forEach(function (n) {
      self.lapis[n] = svgEl("g", { class: "l-" + n }, self.svg);
    });
    if (host) host.appendChild(this.svg);
    this.ukur();
  }
  G.Plot = Plot;

  Plot.prototype.ukur = function () {
    var c = this.cfg;
    var w = c.lebar || (this.host ? this.host.clientWidth : 0) || 560;
    w = Math.max(280, Math.min(c.lebarMaks || 780, Math.round(w)));
    var nis = typeof c.nisbah === "function" ? c.nisbah(w) : c.nisbah || 0.68;
    var h = c.tinggi || Math.round(w * nis);
    if (c.tinggiMin) h = Math.max(h, c.tinggiMin);
    if (c.tinggiMaks) h = Math.min(h, c.tinggiMaks);
    this.W = w;
    this.H = h;
    var m = c.margin || {};
    var sempit = w < 420;
    this.m = {
      l: m.l != null ? m.l : sempit ? 44 : 56,
      r: m.r != null ? m.r : sempit ? 14 : 22,
      t: m.t != null ? m.t : 22,
      b: m.b != null ? m.b : 42
    };
    this.sempit = sempit;
    this.x0 = c.x ? c.x[0] : 0;
    this.x1 = c.x ? c.x[1] : 10;
    this.y0 = c.y ? c.y[0] : 0;
    this.y1 = c.y ? c.y[1] : 10;
    this.svg.setAttribute("viewBox", "0 0 " + w + " " + h);
    this.svg.setAttribute("width", w);
    this.svg.setAttribute("height", h);
  };

  Plot.prototype.julat = function (x, y) {
    if (x) {
      this.x0 = x[0];
      this.x1 = x[1];
      this.cfg.x = x;
    }
    if (y) {
      this.y0 = y[0];
      this.y1 = y[1];
      this.cfg.y = y;
    }
  };

  Plot.prototype.X = function (v) {
    return this.m.l + ((v - this.x0) / (this.x1 - this.x0)) * (this.W - this.m.l - this.m.r);
  };
  Plot.prototype.Y = function (v) {
    return this.H - this.m.b - ((v - this.y0) / (this.y1 - this.y0)) * (this.H - this.m.t - this.m.b);
  };
  Plot.prototype.invX = function (px) {
    return this.x0 + ((px - this.m.l) / (this.W - this.m.l - this.m.r)) * (this.x1 - this.x0);
  };
  Plot.prototype.invY = function (py) {
    return this.y0 + ((this.H - this.m.b - py) / (this.H - this.m.t - this.m.b)) * (this.y1 - this.y0);
  };
  Plot.prototype.kiri = function () {
    return this.m.l;
  };
  Plot.prototype.kanan = function () {
    return this.W - this.m.r;
  };
  Plot.prototype.atas = function () {
    return this.m.t;
  };
  Plot.prototype.bawah = function () {
    return this.H - this.m.b;
  };

  Plot.prototype.kosong = function (senarai) {
    var self = this;
    (senarai || Object.keys(this.lapis)).forEach(function (n) {
      var g = self.lapis[n];
      while (g && g.firstChild) g.removeChild(g.firstChild);
    });
  };

  Plot.prototype.titik = function (evt) {
    var ctm = this.svg.getScreenCTM();
    if (!ctm) return null;
    var pt = this.svg.createSVGPoint();
    pt.x = evt.clientX;
    pt.y = evt.clientY;
    var p = pt.matrixTransform(ctm.inverse());
    return { px: p.x, py: p.y, x: this.invX(p.x), y: this.invY(p.y) };
  };

  // --- alat lukis (koordinat data kecuali dinyatakan) ---
  Plot.prototype.garis = function (x1, y1, x2, y2, kelas, lapis, attrs) {
    var a = Object.assign({ x1: this.X(x1), y1: this.Y(y1), x2: this.X(x2), y2: this.Y(y2), class: kelas || "g-panduan" }, attrs || {});
    return svgEl("line", a, this.lapis[lapis || "panduan"]);
  };
  Plot.prototype.garisPx = function (x1, y1, x2, y2, kelas, lapis, attrs) {
    var a = Object.assign({ x1: x1, y1: y1, x2: x2, y2: y2, class: kelas || "g-panduan" }, attrs || {});
    return svgEl("line", a, this.lapis[lapis || "panduan"]);
  };

  Plot.prototype.laluan = function (pts, kelas, lapis, tutup, attrs) {
    var self = this;
    var d = pts
      .map(function (p, i) {
        return (i ? "L" : "M") + self.X(p[0]).toFixed(2) + " " + self.Y(p[1]).toFixed(2);
      })
      .join(" ");
    if (tutup) d += " Z";
    return svgEl("path", Object.assign({ d: d, class: kelas || "g-lengkung" }, attrs || {}), this.lapis[lapis || "lengkung"]);
  };

  // y = f(x) disampel dari xa ke xb; dipotong pada julat y plot
  Plot.prototype.fungsi = function (f, xa, xb, kelas, lapis, n, attrs) {
    var pts = [];
    var k = n || 80;
    for (var i = 0; i <= k; i++) {
      var x = xa + ((xb - xa) * i) / k;
      var y = f(x);
      if (isFinite(y)) pts.push([x, y]);
    }
    return this.laluan(this.klip(pts), kelas, lapis, false, attrs);
  };

  // x = g(y) disampel dari ya ke yb
  Plot.prototype.fungsiY = function (g, ya, yb, kelas, lapis, n, attrs) {
    var pts = [];
    var k = n || 80;
    for (var i = 0; i <= k; i++) {
      var y = ya + ((yb - ya) * i) / k;
      var x = g(y);
      if (isFinite(x)) pts.push([x, y]);
    }
    return this.laluan(this.klip(pts), kelas, lapis, false, attrs);
  };

  // buang titik di luar kawasan plot (dengan sedikit kelonggaran)
  Plot.prototype.klip = function (pts) {
    var x0 = this.x0,
      x1 = this.x1,
      y0 = this.y0,
      y1 = this.y1;
    var tol = 1e-9;
    var keluar = [];
    for (var i = 0; i < pts.length; i++) {
      var p = pts[i];
      var dalam = p[0] >= x0 - tol && p[0] <= x1 + tol && p[1] >= y0 - tol && p[1] <= y1 + tol;
      if (dalam) keluar.push(p);
      else if (keluar.length && i > 0) {
        // potong di sempadan
        var q = pts[i - 1];
        keluar.push(potongSempadan(q, p, x0, x1, y0, y1));
        break;
      } else if (!keluar.length && i + 1 < pts.length) {
        var nx = pts[i + 1];
        var dlm2 = nx[0] >= x0 - tol && nx[0] <= x1 + tol && nx[1] >= y0 - tol && nx[1] <= y1 + tol;
        if (dlm2) keluar.push(potongSempadan(nx, p, x0, x1, y0, y1));
      }
    }
    return keluar;
  };

  function potongSempadan(dalam, luar, x0, x1, y0, y1) {
    var t = 1;
    var dx = luar[0] - dalam[0];
    var dy = luar[1] - dalam[1];
    if (dx !== 0) {
      if (luar[0] > x1) t = Math.min(t, (x1 - dalam[0]) / dx);
      if (luar[0] < x0) t = Math.min(t, (x0 - dalam[0]) / dx);
    }
    if (dy !== 0) {
      if (luar[1] > y1) t = Math.min(t, (y1 - dalam[1]) / dy);
      if (luar[1] < y0) t = Math.min(t, (y0 - dalam[1]) / dy);
    }
    t = Math.max(0, t);
    return [dalam[0] + dx * t, dalam[1] + dy * t];
  }

  Plot.prototype.segi = function (xa, ya, xb, yb, kelas, lapis, attrs) {
    var x = Math.min(this.X(xa), this.X(xb));
    var y = Math.min(this.Y(ya), this.Y(yb));
    var w = Math.abs(this.X(xb) - this.X(xa));
    var h = Math.abs(this.Y(yb) - this.Y(ya));
    return svgEl("rect", Object.assign({ x: x, y: y, width: w, height: h, class: kelas || "g-kawasan" }, attrs || {}), this.lapis[lapis || "kawasan"]);
  };

  Plot.prototype.bulat = function (x, y, r, kelas, lapis, attrs) {
    return svgEl("circle", Object.assign({ cx: this.X(x), cy: this.Y(y), r: r, class: kelas || "g-nod" }, attrs || {}), this.lapis[lapis || "tanda"]);
  };

  Plot.prototype.teks = function (x, y, str, kelas, anchor, lapis, dx, dy) {
    var t = svgEl(
      "text",
      { x: this.X(x) + (dx || 0), y: this.Y(y) + (dy || 0), class: kelas || "g-teks", "text-anchor": anchor || "start" },
      this.lapis[lapis || "label"]
    );
    t.textContent = str;
    return t;
  };

  Plot.prototype.teksPx = function (px, py, str, kelas, anchor, lapis) {
    var t = svgEl("text", { x: px, y: py, class: kelas || "g-teks", "text-anchor": anchor || "start" }, this.lapis[lapis || "label"]);
    t.textContent = str;
    return t;
  };

  // Cip label dengan latar (koordinat px)
  Plot.prototype.cip = function (px, py, str, o) {
    o = o || {};
    var g = svgEl("g", { class: "g-cip" + (o.kelas ? " " + o.kelas : "") }, this.lapis[o.lapis || "atas"]);
    var lebar = Math.round(String(str).length * 6.7 + 14);
    var tinggi = 20;
    var x = px;
    if (o.anchor === "middle") x = px - lebar / 2;
    else if (o.anchor === "end") x = px - lebar;
    var y = py - tinggi / 2;
    // kekal dalam kanvas
    x = Math.max(2, Math.min(this.W - lebar - 2, x));
    y = Math.max(2, Math.min(this.H - tinggi - 2, y));
    svgEl("rect", { x: x, y: y, width: lebar, height: tinggi, rx: 10, class: "g-cip-latar", style: o.warna ? "fill:" + o.warna : null }, g);
    var t = svgEl("text", { x: x + lebar / 2, y: y + 14, "text-anchor": "middle", class: "g-cip-teks" }, g);
    t.textContent = str;
    return g;
  };

  // Anak panah (koordinat px)
  Plot.prototype.panahPx = function (x1, y1, x2, y2, kelas, lapis, saiz) {
    var g = svgEl("g", { class: "g-anak-panah-g" }, this.lapis[lapis || "tanda"]);
    svgEl("line", { x1: x1, y1: y1, x2: x2, y2: y2, class: "g-anak-panah " + (kelas || "") }, g);
    var a = Math.atan2(y2 - y1, x2 - x1);
    var s = saiz || 9;
    var p1 = [x2 - s * Math.cos(a - 0.45), y2 - s * Math.sin(a - 0.45)];
    var p2 = [x2 - s * Math.cos(a + 0.45), y2 - s * Math.sin(a + 0.45)];
    svgEl("path", { d: "M" + p1[0] + " " + p1[1] + " L" + x2 + " " + y2 + " L" + p2[0] + " " + p2[1], class: "g-anak-panah " + (kelas || "") }, g);
    return g;
  };
  Plot.prototype.panah = function (x1, y1, x2, y2, kelas, lapis, saiz) {
    return this.panahPx(this.X(x1), this.Y(y1), this.X(x2), this.Y(y2), kelas, lapis, saiz);
  };

  // Paksi ekonomi: asalan 0, anak panah di hujung, label di atas & kanan.
  Plot.prototype.paksi = function (o) {
    o = o || this.cfg;
    var L = this.lapis.paksi;
    var xk = this.kiri(),
      xn = this.kanan(),
      yt = this.atas(),
      yb = this.bawah();
    var self = this;
    // grid
    if (o.grid !== false) {
      (o.tikY || []).forEach(function (v) {
        if (v === self.y0) return;
        self.garisPx(xk, self.Y(v), xn, self.Y(v), "g-grid", "grid");
      });
      (o.tikX || []).forEach(function (v) {
        if (v === self.x0) return;
        self.garisPx(self.X(v), yt, self.X(v), yb, "g-grid", "grid");
      });
    }
    var yPaksiX = this.y0 < 0 && this.y1 > 0 && !o.paksiXBawah ? this.Y(0) : yb;
    svgEl("line", { x1: xk, y1: yb + 0.5, x2: xk, y2: yt - 10, class: "g-paksi" }, L);
    svgEl("line", { x1: xk - 0.5, y1: yPaksiX, x2: xn + 8, y2: yPaksiX, class: "g-paksi" }, L);
    svgEl("path", { d: "M" + (xk - 4.5) + " " + (yt - 4) + " L" + xk + " " + (yt - 13) + " L" + (xk + 4.5) + " " + (yt - 4) + " Z", class: "g-panah" }, L);
    svgEl("path", { d: "M" + (xn + 3) + " " + (yPaksiX - 4.5) + " L" + (xn + 12) + " " + yPaksiX + " L" + (xn + 3) + " " + (yPaksiX + 4.5) + " Z", class: "g-panah" }, L);
    // label
    if (o.labelY) {
      var ty = svgEl("text", { x: xk + 8, y: yt - 6, class: "g-label" }, L);
      ty.textContent = o.labelY;
    }
    if (o.labelX) {
      var tx = svgEl("text", { x: xn + 8, y: yPaksiX + 30, class: "g-label", "text-anchor": "end" }, L);
      tx.textContent = o.labelX;
    }
    if (o.asalan !== false) {
      var t0 = svgEl("text", { x: xk - 8, y: yb + 16, class: "g-tik", "text-anchor": "end" }, L);
      t0.textContent = "0";
    }
    var fx = o.fmtTikX || function (v) {
      return E.fmt(v, 2);
    };
    var fy = o.fmtTikY || function (v) {
      return E.fmt(v, 2);
    };
    (o.tikX || []).forEach(function (v) {
      if (v === self.x0 && o.asalan !== false) return;
      var x = self.X(v);
      svgEl("line", { x1: x, y1: yPaksiX, x2: x, y2: yPaksiX + 4, class: "g-tik-garis" }, L);
      var t = svgEl("text", { x: x, y: yPaksiX + 17, class: "g-tik", "text-anchor": "middle" }, L);
      t.textContent = fx(v);
    });
    (o.tikY || []).forEach(function (v) {
      if (v === self.y0 && o.asalan !== false) return;
      var y = self.Y(v);
      svgEl("line", { x1: xk - 4, y1: y, x2: xk, y2: y, class: "g-tik-garis" }, L);
      var t = svgEl("text", { x: xk - 8, y: y + 4, class: "g-tik", "text-anchor": "end" }, L);
      t.textContent = fy(v);
    });
  };

  // Garis panduan putus-putus dari titik ke paksi, dengan cip nilai
  Plot.prototype.panduanKePaksi = function (x, y, o) {
    o = o || {};
    var px = this.X(x),
      py = this.Y(y);
    if (o.keY !== false) this.garisPx(this.kiri(), py, px, py, "g-panduan", "panduan");
    if (o.keX !== false) this.garisPx(px, py, px, this.bawah(), "g-panduan", "panduan");
    if (o.labelY) this.cip(this.kiri() - 4, py, o.labelY, { anchor: "end", warna: o.warnaY, kelas: o.kelasCip });
    if (o.labelX) this.cip(px, this.bawah() + 12, o.labelX, { anchor: "middle", warna: o.warnaX, kelas: o.kelasCip });
  };

  // Nod (boleh dipegang jika o.pegang diberi)
  Plot.prototype.nod = function (x, y, o) {
    o = o || {};
    var px = this.X(x),
      py = this.Y(y);
    var g = svgEl("g", { class: "g-nod-g" + (o.pegang ? " g-pemegang" : "") }, this.lapis[o.pegang ? "pemegang" : o.lapis || "tanda"]);
    if (o.pegang) {
      g.setAttribute("data-pegang", o.pegang);
      g.style.touchAction = "none";
      svgEl("circle", { cx: px, cy: py, r: 22, fill: "transparent" }, g);
      svgEl("circle", { cx: px, cy: py, r: 14, class: "g-nod-halo" }, g);
    }
    svgEl("circle", { cx: px, cy: py, r: o.r || (o.pegang ? 8 : 5.5), class: "g-nod " + (o.kelas || "") }, g);
    if (o.label) {
      var t = svgEl("text", { x: px + (o.dx != null ? o.dx : 10), y: py + (o.dy != null ? o.dy : -10), class: "g-teks " + (o.kelasLabel || ""), "text-anchor": o.anchor || "start" }, this.lapis.label);
      t.textContent = o.label;
    }
    return g;
  };

  G.plot = function (host, cfg) {
    return new Plot(host, cfg);
  };

  /* ---------- interaksi ---------- */
  G.interaksi = function (plot, h) {
    var svg = plot.svg;
    var seret = null;
    var idPenunjuk = null;
    function mula(e) {
      if (e.button != null && e.button > 0) return;
      var sasaran = e.target && e.target.closest ? e.target.closest("[data-pegang]") : null;
      var pt = plot.titik(e);
      if (!pt) return;
      if (sasaran) {
        seret = sasaran.getAttribute("data-pegang");
        idPenunjuk = e.pointerId;
        try {
          svg.setPointerCapture(e.pointerId);
        } catch (_) {}
        e.preventDefault();
        if (h.seret) h.seret(seret, pt, "mula");
      } else if (h.tekan) {
        h.tekan(pt, e);
        if (h.tekanSeret) {
          seret = "__tekan";
          idPenunjuk = e.pointerId;
          try {
            svg.setPointerCapture(e.pointerId);
          } catch (_) {}
        }
      }
    }
    function gerak(e) {
      var pt = plot.titik(e);
      if (!pt) return;
      if (seret) {
        if (e.pointerId !== idPenunjuk) return;
        e.preventDefault();
        if (seret === "__tekan") {
          if (h.tekan) h.tekan(pt, e);
        } else if (h.seret) h.seret(seret, pt, "gerak");
      } else if (e.pointerType === "mouse" || e.pointerType === "pen") {
        if (h.hover) h.hover(pt, e);
      }
    }
    function tamat(e) {
      if (!seret) return;
      var s = seret;
      seret = null;
      try {
        svg.releasePointerCapture(e.pointerId);
      } catch (_) {}
      if (s !== "__tekan" && h.seret) h.seret(s, plot.titik(e) || {}, "tamat");
      if (h.lepas) h.lepas(s);
    }
    svg.addEventListener("pointerdown", mula);
    svg.addEventListener("pointermove", gerak);
    svg.addEventListener("pointerup", tamat);
    svg.addEventListener("pointercancel", tamat);
    svg.addEventListener("pointerleave", function (e) {
      if (!seret && h.keluar) h.keluar(e);
    });
    if (h.kekunci) {
      svg.addEventListener("keydown", function (e) {
        var k = e.key;
        if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End", "PageUp", "PageDown"].indexOf(k) === -1) return;
        var besar = e.shiftKey ? 4 : 1;
        var dx = k === "ArrowRight" ? 1 : k === "ArrowLeft" ? -1 : 0;
        var dy = k === "ArrowUp" ? 1 : k === "ArrowDown" ? -1 : 0;
        if (h.kekunci({ dx: dx * besar, dy: dy * besar, kunci: k }) !== false) e.preventDefault();
      });
    }
  };

  // titik terdekat pada segmen (px) — pulang parameter t (0..1)
  G.unjuran = function (px, py, ax, ay, bx, by) {
    var vx = bx - ax,
      vy = by - ay;
    var len = vx * vx + vy * vy;
    if (!len) return 0;
    var t = ((px - ax) * vx + (py - ay) * vy) / len;
    return E.clamp(t, 0, 1);
  };

  /* ---------- helper keluk linear P–Q ---------- */
  // Permintaan: P = a − b (Q − dq). Penawaran: P = c + d (Q − dq) + t
  G.kelukD = function (a, b, dq) {
    dq = dq || 0;
    return {
      P: function (q) {
        return a - b * (q - dq);
      },
      Q: function (p) {
        return dq + (a - p) / b;
      },
      a: a,
      b: b,
      dq: dq
    };
  };
  G.kelukS = function (c, d, dq, t) {
    dq = dq || 0;
    t = t || 0;
    return {
      P: function (q) {
        return c + t + d * (q - dq);
      },
      Q: function (p) {
        return dq + (p - c - t) / d;
      },
      c: c,
      d: d,
      dq: dq,
      t: t
    };
  };
  G.silang = function (D, S) {
    // a − b(q − dqD) = c + t + d(q − dqS)
    var q = (D.a + D.b * D.dq - S.c - S.t + S.d * S.dq) / (D.b + S.d);
    return { q: q, p: D.P(q) };
  };

  /* =========================================================
     WIDGET: pergerakan & peralihan keluk (permintaan / penawaran)
     ========================================================= */
  var PRESET_KELUK = {
    durian: {
      jenis: "d",
      tajuk: "Keluk permintaan Han Boon terhadap buah durian",
      a: 7,
      b: 0.5,
      x: [0, 18],
      y: [0, 8],
      tikX: [0, 2, 4, 6, 8, 10, 12, 14, 16],
      tikY: [0, 1, 2, 3, 4, 5, 6, 7],
      labelX: "Kuantiti (kg)",
      labelY: "Harga (RM)",
      titik: [
        [4, 5, "a"],
        [6, 4, "b"],
        [8, 3, "c"],
        [10, 2, "d"]
      ],
      rujuk: 1,
      anjak: 3,
      unitQ: "kg",
      qMin: 1,
      qMaks: 13,
      fmtQ: function (q) {
        return E.fmt(q, 1) + " kg";
      },
      fmtP: function (p) {
        return E.rm(p, 2, true);
      }
    },
    kasut: {
      jenis: "s",
      tajuk: "Keluk penawaran kasut Syarikat Kasut Teguh",
      c: -20,
      d: 10,
      x: [0, 14],
      y: [0, 100],
      tikX: [0, 2, 4, 6, 8, 10, 12],
      tikY: [0, 20, 40, 60, 80, 100],
      labelX: "Kuantiti ('000 pasang)",
      labelY: "Harga (RM)",
      titik: [
        [4, 20, "a"],
        [6, 40, "b"],
        [8, 60, "c"],
        [10, 80, "d"]
      ],
      rujuk: 1,
      anjak: 2,
      qMin: 2.5,
      qMaks: 11.5,
      fmtQ: function (q) {
        return E.fmt(q, 1) + " ribu pasang";
      },
      fmtP: function (p) {
        return E.rm(p, 0);
      }
    }
  };

  var FAKTOR_D = [
    {
      label: "Permintaan bertambah (keluk beralih ke kanan)",
      pilihan: [
        ["pendapatan+", "Pendapatan pengguna meningkat"],
        ["pengganti+", "Harga barang pengganti naik"],
        ["penggenap-", "Harga barang penggenap turun"],
        ["citarasa+", "Cita rasa terhadap barang meningkat (iklan, fesyen)"],
        ["musim+", "Musim perayaan / awal persekolahan"],
        ["jangka+", "Harga dijangka naik pada masa depan"],
        ["kerajaan+", "Kerajaan turunkan cukai pendapatan / beri bantuan tunai"]
      ]
    },
    {
      label: "Permintaan berkurang (keluk beralih ke kiri)",
      pilihan: [
        ["pendapatan-", "Pendapatan pengguna menurun"],
        ["pengganti-", "Harga barang pengganti turun"],
        ["penggenap+", "Harga barang penggenap naik"],
        ["citarasa-", "Cita rasa terhadap barang berkurang"],
        ["jangka-", "Harga dijangka turun pada masa depan"],
        ["kerajaan-", "Kerajaan naikkan kadar cukai pendapatan"]
      ]
    }
  ];

  var FAKTOR_S = [
    {
      label: "Penawaran bertambah (keluk beralih ke kanan)",
      pilihan: [
        ["kos-", "Harga faktor pengeluaran (upah, bahan mentah) turun"],
        ["teknologi+", "Kemajuan tingkat teknologi"],
        ["cuaca+", "Cuaca baik untuk tanaman"],
        ["subsidi+", "Kerajaan beri subsidi / taraf perintis"],
        ["jangka-", "Harga dijangka turun pada masa depan"],
        ["jualan+", "Matlamat firma: memaksimumkan jualan"]
      ]
    },
    {
      label: "Penawaran berkurang (keluk beralih ke kiri)",
      pilihan: [
        ["kos+", "Harga faktor pengeluaran naik"],
        ["cuaca-", "Cuaca buruk: banjir, kemarau, tanah runtuh"],
        ["cukai+", "Kerajaan naikkan cukai ke atas input"],
        ["jangka+", "Harga dijangka naik pada masa depan"],
        ["untung+", "Matlamat firma: memaksimumkan keuntungan"]
      ]
    }
  ];

  function arahFaktor(kumpulan, kod) {
    // pulang +1 (kumpulan pertama: ke kanan) atau -1 (kumpulan kedua: ke kiri)
    var arah = 0;
    kumpulan.forEach(function (k, i) {
      k.pilihan.forEach(function (p) {
        if (p[0] === kod) arah = i === 0 ? 1 : -1;
      });
    });
    return arah;
  }

  function labelFaktor(senarai, kod) {
    var hasil = "";
    senarai.forEach(function (k) {
      k.pilihan.forEach(function (p) {
        if (p[0] === kod) hasil = p[1];
      });
    });
    return hasil;
  }

  function widgetKeluk(host, opt) {
    var pr = PRESET_KELUK[opt.preset] || PRESET_KELUK[opt.jenis === "s" ? "kasut" : "durian"];
    var isD = pr.jenis === "d";
    var nama = isD ? "permintaan" : "penawaran";
    var K = G.kad(host, {
      tajuk: opt.tajuk || pr.tajuk,
      petunjuk: "Seret nod pada keluk"
    });
    var st = {
      mod: opt.mod || "gerak",
      q: pr.titik[pr.rujuk][0],
      dq: 0,
      faktor: null
    };
    var batalTween = null;

    // kawalan
    var seg = G.segmen(
      K.kawalan,
      [
        ["gerak", "Pergerakan di sepanjang keluk"],
        ["alih", "Peralihan keluk"]
      ],
      st.mod,
      function (v) {
        st.mod = v;
        pilihF.el.hidden = v !== "alih";
        btnSemula.hidden = v !== "alih";
        if (v === "gerak") animasiAnjak(0);
        lukis();
      }
    );
    var pilihF = G.pilih(K.kawalan, {
      label: "Pilih faktor bukan harga",
      kumpulan: [{ pilihan: [["", "— pilih faktor —"]] }].concat(isD ? FAKTOR_D : FAKTOR_S),
      ubah: function (v) {
        st.faktor = v || null;
        var arah = v ? arahFaktor(isD ? FAKTOR_D : FAKTOR_S, v) : 0;
        animasiAnjak(arah * pr.anjak);
      }
    });
    var btnSemula = G.butang(K.kawalan, E.ikon("ulang") + " Set semula", function () {
      st.faktor = null;
      pilihF.set("");
      animasiAnjak(0);
    });
    pilihF.el.hidden = st.mod !== "alih";
    btnSemula.hidden = st.mod !== "alih";

    var plot = G.plot(K.kanvas, {
      x: pr.x,
      y: pr.y,
      tikX: pr.tikX,
      tikY: pr.tikY,
      labelX: pr.labelX,
      labelY: pr.labelY,
      nisbah: function (w) {
        return w < 480 ? 0.86 : 0.64;
      },
      aria: "Graf " + nama + " interaktif"
    });

    function keluk(dq) {
      return isD ? G.kelukD(pr.a, pr.b, dq) : G.kelukS(pr.c, pr.d, dq);
    }

    function animasiAnjak(sasaran) {
      if (batalTween) batalTween();
      batalTween = G.tween(st.dq, sasaran, 520, function (v) {
        st.dq = v;
        lukis();
      });
    }

    function hadQ(K0) {
      // julat Q yang sah untuk nod pada keluk asal
      var qa = K0.Q(pr.y[1] * 0.96);
      var qb = K0.Q(pr.y[0] + (pr.y[1] - pr.y[0]) * 0.06);
      return [Math.max(pr.qMin, Math.min(qa, qb)), Math.min(pr.qMaks, Math.max(qa, qb))];
    }

    function lukis() {
      plot.kosong();
      plot.paksi();
      var K0 = keluk(0);
      var K1 = keluk(st.dq);
      var kls = isD ? "d" : "s";
      var lab = isD ? "D" : "S";
      var xa = pr.x[0],
        xb = pr.x[1];
      var dianjak = Math.abs(st.dq) > 0.01;
      // keluk asal
      plot.fungsi(K0.P, xa, xb, "g-lengkung " + kls + (dianjak ? " hantu" : ""), dianjak ? "hantu" : "lengkung");
      labelHujung(K0, dianjak ? lab + "₀" : lab + lab, kls, dianjak);
      if (dianjak) {
        plot.fungsi(K1.P, xa, xb, "g-lengkung " + kls, "lengkung");
        labelHujung(K1, lab + "₁", kls, false);
      }
      var Kaktif = K1;
      if (st.mod === "gerak") {
        // titik jadual
        pr.titik.forEach(function (t, i) {
          plot.bulat(t[0], t[1], 4, "g-nod " + kls, "tanda");
          plot.teks(t[0], t[1], t[2], "g-teks lemah", isD ? "start" : "end", "label", isD ? 9 : -9, -8);
        });
        var had = hadQ(K0);
        st.q = E.clamp(st.q, had[0], had[1]);
        var p = K0.P(st.q);
        var rj = pr.titik[pr.rujuk];
        // anak panah arah pergerakan
        if (Math.abs(st.q - rj[0]) > 0.3) {
          plot.panah(rj[0], rj[1], st.q, p, "aksen", "tanda", 10);
        }
        plot.panduanKePaksi(st.q, p, { labelY: pr.fmtP(p), labelX: pr.fmtQ(st.q) });
        plot.nod(st.q, p, { pegang: "nod", kelas: kls });
        baca(p, st.q);
      } else {
        // peralihan: tunjuk kuantiti pada harga yang sama
        var rj2 = pr.titik[pr.rujuk];
        var p0 = rj2[1];
        var q0 = K0.Q(p0);
        var q1 = K1.Q(p0);
        plot.garisPx(plot.kiri(), plot.Y(p0), plot.X(Math.max(q0, q1)), plot.Y(p0), "g-panduan", "panduan");
        plot.panduanKePaksi(q0, p0, { keY: false, labelX: "Q₀" });
        plot.nod(q0, p0, { kelas: kls + " isi", r: 5 });
        if (dianjak) {
          plot.panduanKePaksi(q1, p0, { keY: false, labelX: "Q₁" });
          plot.panah(q0, p0 + (pr.y[1] - pr.y[0]) * 0.06, q1, p0 + (pr.y[1] - pr.y[0]) * 0.06, kls, "tanda", 10);
          plot.nod(q1, p0, { kelas: kls, pegang: "anjak" });
        } else {
          plot.nod(q0, p0, { kelas: kls, pegang: "anjak" });
        }
        plot.cip(plot.kiri() - 4, plot.Y(p0), pr.fmtP(p0), { anchor: "end" });
        bacaAlih(p0, q0, q1);
      }
    }

    function labelHujung(Kx, teks, kls, hantu) {
      var q, p;
      if (isD) {
        q = Math.min(pr.x[1] * 0.97, Kx.Q(pr.y[0] + (pr.y[1] - pr.y[0]) * 0.1));
        p = Kx.P(q);
      } else {
        q = Math.min(pr.x[1] * 0.95, Kx.Q(pr.y[1] * 0.92));
        p = Kx.P(q);
      }
      if (q > pr.x[0] && q <= pr.x[1] && p >= pr.y[0] && p <= pr.y[1]) {
        plot.teks(q, p, teks, "g-teks " + kls + (hantu ? " lemah" : ""), "start", "label", 8, isD ? -6 : 14);
      }
    }

    function baca(p, q) {
      var rj = pr.titik[pr.rujuk];
      var status = "";
      var ayat = "";
      var beza = isD ? rj[1] - p : p - rj[1];
      var tol = (pr.y[1] - pr.y[0]) * 0.012;
      if (Math.abs(p - rj[1]) < tol) {
        status = '<span class="status neutral">Titik asal ' + rj[2] + "</span>";
        ayat = "Seret nod di sepanjang keluk. Perubahan <b>harga barang itu sendiri</b> hanya menggerakkan titik di sepanjang keluk yang sama.";
      } else if (beza > 0) {
        status = '<span class="status baik">Pengembangan ' + nama + "</span>";
        ayat = isD
          ? "Harga turun daripada " + pr.fmtP(rj[1]) + " kepada <b>" + pr.fmtP(p) + "</b>, maka kuantiti diminta naik kepada <b>" + pr.fmtQ(q) + "</b>. Hubungan harga dengan kuantiti diminta adalah <b>negatif (songsang)</b>."
          : "Harga naik daripada " + pr.fmtP(rj[1]) + " kepada <b>" + pr.fmtP(p) + "</b>, maka kuantiti ditawarkan naik kepada <b>" + pr.fmtQ(q) + "</b>. Hubungan harga dengan kuantiti ditawarkan adalah <b>positif</b>.";
      } else {
        status = '<span class="status buruk">Penguncupan ' + nama + "</span>";
        ayat = isD
          ? "Harga naik daripada " + pr.fmtP(rj[1]) + " kepada <b>" + pr.fmtP(p) + "</b>, maka kuantiti diminta turun kepada <b>" + pr.fmtQ(q) + "</b> (ceteris paribus)."
          : "Harga turun daripada " + pr.fmtP(rj[1]) + " kepada <b>" + pr.fmtP(p) + "</b>, maka kuantiti ditawarkan turun kepada <b>" + pr.fmtQ(q) + "</b> (ceteris paribus).";
      }
      K.baca.innerHTML =
        G.nilai([
          ["Harga", pr.fmtP(p), kls()],
          [isD ? "Kuantiti diminta" : "Kuantiti ditawarkan", pr.fmtQ(q), kls()]
        ]) +
        '<div class="ayat">' + status + " " + ayat + "</div>";
    }
    function kls() {
      return isD ? "d" : "s";
    }

    function bacaAlih(p0, q0, q1) {
      var dianjak = Math.abs(st.dq) > 0.01;
      var f = st.faktor ? labelFaktor(isD ? FAKTOR_D : FAKTOR_S, st.faktor) : "";
      var ayat;
      if (!dianjak) {
        ayat = "Pilih satu <b>faktor bukan harga</b> di atas, atau seret nod ke kiri/kanan. Harga barang itu kekal pada " + pr.fmtP(p0) + ", tetapi kuantiti pada setiap tingkat harga berubah.";
      } else {
        var naik = st.dq > 0;
        ayat =
          (f ? "<b>" + f + ".</b> " : "") +
          "Keluk " + (isD ? "DD" : "SS") + " beralih ke <b>" + (naik ? "kanan" : "kiri") + "</b>: " +
          (naik ? "pertambahan " : "pengurangan ") + nama +
          ". Pada harga yang sama (" + pr.fmtP(p0) + "), kuantiti " + (isD ? "diminta" : "ditawarkan") + " " + (naik ? "meningkat" : "menurun") +
          " daripada " + pr.fmtQ(q0) + " kepada <b>" + pr.fmtQ(q1) + "</b>.";
      }
      K.baca.innerHTML =
        G.nilai([
          ["Harga (tetap)", pr.fmtP(p0), kls()],
          ["Q₀", pr.fmtQ(q0), ""],
          dianjak ? ["Q₁", pr.fmtQ(q1), kls()] : null
        ]) + '<div class="ayat">' + ayat + "</div>";
    }

    G.interaksi(plot, {
      seret: function (nama2, pt, fasa) {
        if (nama2 === "nod") {
          var K0 = keluk(0);
          // unjuran ke keluk: guna Q dari x atau dari y, pilih yang lebih dekat
          var qx = pt.x;
          var qy = K0.Q(pt.y);
          var dx = Math.abs(plot.X(qx) - pt.px) + Math.abs(plot.Y(K0.P(qx)) - pt.py);
          var dy = Math.abs(plot.X(qy) - pt.px) + Math.abs(plot.Y(K0.P(qy)) - pt.py);
          st.q = dx < dy ? qx : qy;
          lukis();
        } else if (nama2 === "anjak") {
          if (fasa === "mula" && batalTween) batalTween();
          var rj = pr.titik[pr.rujuk];
          var q0 = keluk(0).Q(rj[1]);
          st.dq = E.clamp(pt.x - q0, -pr.anjak * 1.4, pr.anjak * 1.4);
          st.faktor = null;
          pilihF.set("");
          if (fasa === "tamat" && Math.abs(st.dq) < 0.2) st.dq = 0;
          lukis();
        }
      },
      tekan: function (pt) {
        jejak(pt, 60);
      },
      hover: function (pt) {
        jejak(pt, 34);
      },
      tekanSeret: true,
      kekunci: function (k) {
        if (st.mod === "gerak") {
          var langkah = (pr.x[1] - pr.x[0]) / 60;
          st.q += (k.dx || -k.dy * (isD ? 1 : -1)) * langkah * (isD ? 1 : 1);
          lukis();
        } else {
          st.dq = E.clamp(st.dq + (k.dx || k.dy) * 0.25, -pr.anjak * 1.4, pr.anjak * 1.4);
          lukis();
        }
      }
    });

    // nod mengikut penunjuk jika dekat dengan keluk
    function jejak(pt, jarakMaks) {
      if (st.mod !== "gerak") return;
      var K0 = keluk(0);
      var qy = K0.Q(pt.y);
      var dxPx = Math.abs(plot.Y(K0.P(pt.x)) - pt.py);
      var dyPx = Math.abs(plot.X(qy) - pt.px);
      if (Math.min(dxPx, dyPx) < jarakMaks) {
        st.q = dxPx < dyPx ? pt.x : qy;
        lukis();
      }
    }

    lukis();
    var henti = G.pantauSaiz(K.kanvas, function () {
      plot.ukur();
      lukis();
    });
    return {
      musnah: function () {
        henti();
        if (batalTween) batalTween();
      },
      _set: seg
    };
  }

  G.daftar("permintaan", function (h, o) {
    return widgetKeluk(h, Object.assign({ preset: "durian" }, o));
  }, { tajuk: "Hukum permintaan & peralihan keluk", bab: "t4-b2" });

  G.daftar("penawaran", function (h, o) {
    return widgetKeluk(h, Object.assign({ preset: "kasut" }, o));
  }, { tajuk: "Hukum penawaran & peralihan keluk", bab: "t4-b2" });

  /* =========================================================
     WIDGET: pembentukan keluk pasaran (jumlah mendatar)
     ========================================================= */
  var PRESET_JUMLAH = {
    dd: {
      tajuk: "Pembentukan keluk permintaan pasaran baju kemeja",
      nama: ["Rani", "Sofea"],
      f: [
        function (p) {
          return (60 - p) / 10;
        },
        function (p) {
          return (70 - p) / 10;
        }
      ],
      y: [0, 70],
      x: [0, 13],
      tikY: [0, 10, 20, 30, 40, 50, 60],
      tikX: [0, 2, 4, 6, 8, 10, 12],
      pMin: 12,
      pMaks: 62,
      p0: 30,
      kls: "d",
      labelKeluk: ["D", "D", "D"],
      unit: "unit"
    },
    ss: {
      tajuk: "Pembentukan keluk penawaran pasaran beg galas",
      nama: ["Syarikat Jenas", "Syarikat Kiwis"],
      f: [
        function (p) {
          return 15 + p / 3;
        },
        function (p) {
          return 5 + p / 3;
        }
      ],
      y: [0, 70],
      x: [0, 70],
      tikY: [0, 15, 30, 45, 60],
      tikX: [0, 20, 40, 60],
      pMin: 10,
      pMaks: 65,
      p0: 30,
      kls: "s",
      labelKeluk: ["S", "S", "S"],
      unit: "unit"
    }
  };

  G.daftar("jumlah-pasaran", function (host, opt) {
    var pr = PRESET_JUMLAH[opt.jenis] || PRESET_JUMLAH.dd;
    var isD = (opt.jenis || "dd") === "dd";
    var kls = pr.kls;
    var K = G.kad(host, {
      tajuk: opt.tajuk || pr.tajuk,
      petunjuk: "Seret nod di sepanjang keluk, atau seret keluk " + pr.nama[0] + " dan " + pr.nama[1] + " ke kiri atau kanan"
    });
    var HAD = isD ? 3 : 15; // had peralihan keluk individu (unit)
    var LANGKAH = isD ? 0.5 : 1;
    var st = { p: pr.p0, dq: [0, 0] };
    var seretan = null;
    var panelSimpan = [];

    G.butang(K.kawalan, E.ikon("ulang") + " Set semula", function () {
      st.p = pr.p0;
      st.dq = [0, 0];
      lukis();
    });

    var plot = G.plot(K.kanvas, {
      x: [0, 1],
      y: pr.y,
      // tiga panel sentiasa disusun ke bawah, bukan bersebelahan
      nisbah: function (w) {
        var h = Math.max(190, Math.min(250, w * 0.42));
        return (h * 3 + 32) / w;
      },
      margin: { l: 0, r: 0, t: 0, b: 0 },
      aria: "Pembentukan keluk pasaran. Seret nod atau keluk individu."
    });

    // kuantiti individu (i = 0, 1) dan pasaran (i = 2); asal = tanpa peralihan
    function q(i, p, asal) {
      if (i === 2) return q(0, p, asal) + q(1, p, asal);
      return Math.max(0, pr.f[i](p) + (asal ? 0 : st.dq[i]));
    }
    function dianjak(i) {
      return i === 2 ? Math.abs(st.dq[0]) + Math.abs(st.dq[1]) > 0.01 : Math.abs(st.dq[i]) > 0.01;
    }

    function panel(i, susun) {
      var W = plot.W,
        H = plot.H;
      var jarak = 16;
      if (susun === "lajur") {
        var w = (W - jarak * 2) / 3;
        return { x: i * (w + jarak), y: 0, w: w, h: H };
      }
      var h = (H - jarak * 2) / 3;
      return { x: 0, y: i * (h + jarak), w: W, h: h };
    }

    // skala data ↔ piksel bagi satu panel (fungsi berasingan supaya setiap
    // panel menyimpan margin sendiri)
    function skala(kp) {
      var m = { l: kp.x + 44, r: plot.W - (kp.x + kp.w) + 10, t: kp.y + 26, b: plot.H - (kp.y + kp.h) + 34 };
      var lebar = plot.W - m.l - m.r,
        tinggi = plot.H - m.t - m.b;
      return {
        kp: kp,
        X: function (v) {
          return m.l + ((v - pr.x[0]) / (pr.x[1] - pr.x[0])) * lebar;
        },
        Y: function (v) {
          return plot.H - m.b - ((v - pr.y[0]) / (pr.y[1] - pr.y[0])) * tinggi;
        },
        invX: function (px) {
          return pr.x[0] + ((px - m.l) / lebar) * (pr.x[1] - pr.x[0]);
        },
        invY: function (py) {
          return pr.y[0] + ((plot.H - m.b - py) / tinggi) * (pr.y[1] - pr.y[0]);
        }
      };
    }

    function laluanKeluk(ps, i, asal) {
      var pts = [];
      for (var k = 0; k <= 80; k++) {
        var p = pr.pMin - 2 + ((pr.pMaks + 3 - (pr.pMin - 2)) * k) / 80;
        var qq = q(i, p, asal);
        if (qq > 0.001 && qq <= pr.x[1]) pts.push([ps.X(qq), ps.Y(p)]);
      }
      return pts;
    }
    function d(pts) {
      return "M" + pts.map(function (pp) {
        return pp[0].toFixed(1) + " " + pp[1].toFixed(1);
      }).join(" L");
    }

    function lukis() {
      plot.kosong();
      var susun = "baris";
      var nilai = [];
      for (var i = 0; i < 3; i++) {
        var kp = panel(i, susun);
        var ps = skala(kp);
        panelSimpan[i] = ps;
        var X = ps.X,
          Y = ps.Y;
        // paksi
        var L = plot.lapis.paksi;
        svgEl("line", { x1: X(0), y1: Y(0), x2: X(0), y2: Y(pr.y[1]) - 8, class: "g-paksi" }, L);
        svgEl("line", { x1: X(0), y1: Y(0), x2: X(pr.x[1]) + 6, y2: Y(0), class: "g-paksi" }, L);
        pr.tikY.forEach(function (v) {
          if (!v) return;
          svgEl("line", { x1: X(0), y1: Y(v), x2: X(pr.x[1]), y2: Y(v), class: "g-grid" }, plot.lapis.grid);
          var t = svgEl("text", { x: X(0) - 6, y: Y(v) + 4, class: "g-tik", "text-anchor": "end" }, L);
          t.textContent = v;
        });
        pr.tikX.forEach(function (v) {
          var t = svgEl("text", { x: X(v), y: Y(0) + 15, class: "g-tik", "text-anchor": "middle" }, L);
          t.textContent = v;
        });
        var judul = svgEl("text", { x: X(0) + 6, y: kp.y + 14, class: "g-label" }, L);
        judul.textContent = (i < 2 ? "(" + "abc"[i] + ") " + pr.nama[i] : "(c) Pasaran") + " · Harga (RM)";
        var qLabel = svgEl("text", { x: X(pr.x[1]) + 6, y: Y(0) + 28, class: "g-label", "text-anchor": "end" }, L);
        qLabel.textContent = "Kuantiti (" + pr.unit + ")";

        // keluk asal (hantu) jika sudah dialih
        if (dianjak(i)) {
          var ptsAsal = laluanKeluk(ps, i, true);
          if (ptsAsal.length > 1) svgEl("path", { d: d(ptsAsal), class: "g-lengkung " + kls + " hantu" }, plot.lapis.hantu || plot.lapis.lengkung);
        }
        var pts = laluanKeluk(ps, i, false);
        if (pts.length > 1) {
          svgEl("path", { d: d(pts), class: "g-lengkung " + kls + (i === 2 ? "" : " nipis") }, plot.lapis.lengkung);
          var ujung = pts[pts.length - 1];
          var diTepi = ujung[0] + 24 > ps.X(pr.x[1]);
          var tl = svgEl("text", { x: diTepi ? ujung[0] - 6 : ujung[0] + 6, y: diTepi ? ujung[1] - 8 : ujung[1] + (isD ? 4 : -2), class: "g-teks " + kls, "text-anchor": diTepi ? "end" : "start" }, plot.lapis.label);
          tl.textContent = pr.labelKeluk[i] + (i === 2 ? "ₚ" : dianjak(i) ? "₁" : "");
        }

        // garis harga, panduan dan nod
        var qq = q(i, st.p, false);
        nilai.push(qq);
        svgEl("line", { x1: X(0), y1: Y(st.p), x2: X(pr.x[1]), y2: Y(st.p), class: "g-garis-harga" }, plot.lapis.panduan);
        svgEl("line", { x1: X(qq), y1: Y(st.p), x2: X(qq), y2: Y(0), class: "g-panduan" }, plot.lapis.panduan);
        plot.cip(X(qq), Y(0) + 12, E.fmt(qq, 1), { anchor: "middle" });
        if (i === 0 || susun === "baris") plot.cip(X(0) - 4, Y(st.p), "RM" + E.fmt(st.p, 1), { anchor: "end" });
        // pemegang harga di hujung kanan garis
        var gh = svgEl("g", { "data-pegang": "harga" + i, class: "g-pemegang", style: "touch-action:none" }, plot.lapis.pemegang);
        svgEl("line", { x1: X(0), y1: Y(st.p), x2: X(pr.x[1]), y2: Y(st.p), class: "g-garis-hit" }, gh);
        svgEl("circle", { cx: X(pr.x[1]) - 4, cy: Y(st.p), r: 12, class: "g-nod-halo" }, gh);
        svgEl("circle", { cx: X(pr.x[1]) - 4, cy: Y(st.p), r: 6, class: "g-nod" }, gh);
        // kawasan sentuh untuk mengalih keluk individu (di atas garis harga)
        if (i < 2 && pts.length > 1) {
          var gk = svgEl("g", { "data-pegang": "keluk" + i, class: "g-pemegang", style: "touch-action:none;cursor:grab" }, plot.lapis.pemegang);
          svgEl("path", { d: d(pts), class: "g-lengkung tebal-hit" }, gk);
        }
        // nod pada keluk (boleh diseret di sepanjang keluk)
        var gn = svgEl("g", { "data-pegang": "nod" + i, class: "g-pemegang", style: "touch-action:none" }, plot.lapis.pemegang);
        svgEl("circle", { cx: X(qq), cy: Y(st.p), r: 15, class: "g-nod-halo" }, gn);
        svgEl("circle", { cx: X(qq), cy: Y(st.p), r: 7, class: "g-nod isi " + kls }, gn);
      }
      baca(nilai);
    }

    function baca(nilai) {
      var eq = pr.nama[0] + " " + E.fmt(nilai[0], 1) + " + " + pr.nama[1] + " " + E.fmt(nilai[1], 1) + " = <b>" + E.fmt(nilai[2], 1) + " " + pr.unit + "</b>";
      var ayat =
        "Pada harga RM" + E.fmt(st.p, 1) + ": " + eq + ". Keluk pasaran diperoleh dengan <b>menjumlahkan secara mendatar</b> kuantiti " +
        (isD ? "diminta" : "ditawarkan") + " setiap " + (isD ? "individu" : "firma") + " pada setiap tingkat harga. Harga pasaran sama bagi semua, jadi menyeret satu nod menggerakkan nod lain di sepanjang keluk masing-masing.";
      var alih = [];
      [0, 1].forEach(function (i) {
        if (!dianjak(i)) return;
        var kanan = st.dq[i] > 0;
        alih.push(
          "Keluk " + pr.nama[i] + " beralih ke <b>" + (kanan ? "kanan" : "kiri") + "</b> sebanyak " + E.fmt(Math.abs(st.dq[i]), 1) + " " + pr.unit + " (" +
            (isD ? (kanan ? "permintaan bertambah, contohnya pendapatan " + pr.nama[i] + " meningkat" : "permintaan berkurang, contohnya pendapatan " + pr.nama[i] + " menurun")
                 : (kanan ? "penawaran bertambah, contohnya kos pengeluaran " + pr.nama[i] + " turun" : "penawaran berkurang, contohnya kos pengeluaran " + pr.nama[i] + " naik")) +
            ")"
        );
      });
      if (alih.length) {
        var jum = st.dq[0] + st.dq[1];
        ayat +=
          " " + alih.join("; ") + ". Maka keluk pasaran turut beralih " +
          (Math.abs(jum) < 0.01 ? "sehingga kesannya saling membatalkan" : "ke <b>" + (jum > 0 ? "kanan" : "kiri") + "</b> sebanyak " + E.fmt(Math.abs(jum), 1) + " " + pr.unit + " pada setiap harga") +
          ". Garis putus-putus ialah keluk asal.";
      }
      K.baca.innerHTML =
        G.nilai([
          ["Harga", "RM" + E.fmt(st.p, 1), kls],
          [pr.nama[0], E.fmt(nilai[0], 1), ""],
          [pr.nama[1], E.fmt(nilai[1], 1), ""],
          ["Pasaran", E.fmt(nilai[2], 1) + " " + pr.unit, kls]
        ]) +
        '<div class="ayat">' + ayat + "</div>";
    }

    function panelDi(px, py) {
      for (var i = 0; i < panelSimpan.length; i++) {
        var kp = panelSimpan[i].kp;
        if (py >= kp.y - 10 && py <= kp.y + kp.h + 10 && px >= kp.x - 10 && px <= kp.x + kp.w + 10) return i;
      }
      return -1;
    }
    function setHarga(p) {
      st.p = E.clamp(Math.round(p * 2) / 2, pr.pMin, pr.pMaks);
    }
    // harga yang meletakkan nod panel i paling hampir dengan penunjuk
    function hargaTerdekat(i, px, py) {
      var ps = panelSimpan[i];
      var terbaik = st.p,
        jarak = Infinity;
      for (var p = pr.pMin; p <= pr.pMaks + 1e-9; p += 0.25) {
        var dx = ps.X(q(i, p, false)) - px,
          dy = ps.Y(p) - py;
        var j = dx * dx + dy * dy;
        if (j < jarak) {
          jarak = j;
          terbaik = p;
        }
      }
      return terbaik;
    }

    G.interaksi(plot, {
      seret: function (n, pt, fasa) {
        var jenis = n.replace(/\d+$/, ""),
          i = parseInt(n.slice(jenis.length), 10);
        var ps = panelSimpan[i];
        if (!ps) return;
        if (jenis === "harga") {
          if (pt.py != null) setHarga(ps.invY(pt.py));
        } else if (jenis === "nod") {
          if (pt.px != null) setHarga(hargaTerdekat(i, pt.px, pt.py));
        } else if (jenis === "keluk") {
          if (fasa === "mula") seretan = { q0: ps.invX(pt.px), dq0: st.dq[i] };
          if (!seretan || pt.px == null) return;
          var baru = seretan.dq0 + (ps.invX(pt.px) - seretan.q0);
          baru = E.clamp(Math.round(baru / LANGKAH) * LANGKAH, -HAD, HAD);
          st.dq[i] = Math.abs(baru) < LANGKAH / 2 ? 0 : baru;
          if (fasa === "tamat") seretan = null;
        } else return;
        lukis();
      },
      tekan: function (pt) {
        var i = panelDi(pt.px, pt.py);
        if (i < 0) return;
        setHarga(panelSimpan[i].invY(pt.py));
        lukis();
      },
      tekanSeret: true,
      kekunci: function (k) {
        if (k.dy) setHarga(st.p + k.dy * 2.5);
        else if (k.dx) st.dq[0] = E.clamp(st.dq[0] + k.dx * LANGKAH, -HAD, HAD);
        lukis();
      }
    });

    lukis();
    var henti = G.pantauSaiz(K.kanvas, function () {
      plot.ukur();
      lukis();
    });
    return { musnah: henti };
  }, { tajuk: "Keluk pasaran daripada keluk individu", bab: "t4-b2" });

  /* =========================================================
     WIDGET: keseimbangan pasaran (generik, pelbagai preset)
     ========================================================= */
  var PRESET_SS = {
    seluar: {
      tajuk: "Keseimbangan pasaran seluar sukan",
      a: 60,
      b: 10 / 3,
      c: 0,
      d: 10 / 3,
      x: [0, 20],
      y: [0, 64],
      tikX: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
      tikY: [0, 10, 20, 30, 40, 50, 60],
      labelX: "Kuantiti ('000 helai)",
      labelY: "Harga (RM)",
      anjak: 3,
      hargaAwal: 45,
      pMin: 6,
      pMaks: 58,
      fmtP: function (p) {
        return E.rm(p, 2);
      },
      fmtQ: function (q) {
        return E.fmt(q, 2) + " ribu helai";
      },
      mod: "pasaran"
    },
    wira: {
      tajuk: "Cuba sendiri: tangan tak nampak",
      a: 60,
      b: 10 / 3,
      c: 0,
      d: 10 / 3,
      x: [0, 20],
      y: [0, 64],
      tikX: [0, 4, 8, 12, 16, 20],
      tikY: [0, 20, 40, 60],
      labelX: "Kuantiti ('000 helai)",
      labelY: "Harga (RM)",
      anjak: 3,
      hargaAwal: 47,
      pMin: 6,
      pMaks: 58,
      fmtP: function (p) {
        return E.rm(p, 2);
      },
      fmtQ: function (q) {
        return E.fmt(q, 1) + " ribu";
      },
      mod: "pasaran",
      ringkas: true
    },
    kawalan: {
      tajuk: "Dasar harga maksimum & harga minimum",
      a: 18,
      b: 0.02,
      c: 2,
      d: 0.012,
      x: [0, 900],
      y: [0, 18],
      tikX: [0, 200, 400, 600, 800],
      tikY: [0, 4, 8, 12, 16],
      labelX: "Kuantiti (tan)",
      labelY: "Harga (RM/kg)",
      dpKurung: 0,
      anjak: 120,
      hargaAwal: 6,
      pMin: 3,
      pMaks: 16,
      fmtP: function (p) {
        return E.rm(p, 2);
      },
      fmtQ: function (q) {
        return E.fmt(q, 0) + " tan";
      },
      mod: "kawalan"
    },
    sekatan: {
      tajuk: "Kesan sekatan perdagangan terhadap pasaran tempatan",
      a: 90,
      b: 0.6,
      c: 10,
      d: 0.4,
      x: [0, 150],
      y: [0, 100],
      tikX: [0, 25, 50, 75, 100, 125, 150],
      tikY: [0, 20, 40, 60, 80, 100],
      labelX: "Kuantiti (ribu unit)",
      labelY: "Harga (RM)",
      anjak: 25,
      hargaAwal: null,
      fmtP: function (p) {
        return E.rm(p, 2);
      },
      fmtQ: function (q) {
        return E.fmt(q, 1) + " ribu unit";
      },
      mod: "sekatan"
    },
    forex: {
      tajuk: "Pasaran pertukaran asing: Ringgit berbanding Dolar AS",
      a: 0.43,
      b: 0.004,
      c: 0.03,
      d: 0.004,
      x: [0, 100],
      y: [0, 0.44],
      tikX: [0, 20, 40, 60, 80, 100],
      tikY: [0, 0.1, 0.2, 0.3, 0.4],
      labelX: "Kuantiti Ringgit (RM bilion)",
      labelY: "USD bagi RM1",
      anjak: 12,
      hargaAwal: null,
      fmtP: function (p) {
        return "USD" + E.fmt(p, 3, true);
      },
      fmtQ: function (q) {
        return "RM" + E.fmt(q, 1) + " bilion";
      },
      fmtTikY: function (v) {
        return E.fmt(v, 2, true);
      },
      mod: "forex"
    }
  };

  var FAKTOR_FOREX = [
    {
      label: "Permintaan ringgit bertambah (DD ke kanan)",
      pilihan: [
        ["D+eksport", "Eksport Malaysia meningkat"],
        ["D+pelancong", "Pelancong asing ke Malaysia bertambah"],
        ["D+pla", "Aliran masuk pelaburan asing (PLA) meningkat"],
        ["D+faedah", "Kadar faedah di Malaysia dinaikkan"],
        ["D+citarasa", "Cita rasa pengguna asing terhadap barang Malaysia meningkat"],
        ["D+spekulasi", "Spekulasi: ringgit dijangka naik nilai"]
      ]
    },
    {
      label: "Permintaan ringgit berkurang (DD ke kiri)",
      pilihan: [
        ["D-eksport", "Eksport Malaysia merosot"],
        ["D-harga", "Tingkat harga umum di Malaysia naik, eksport kurang berdaya saing"],
        ["D-faedah", "Kadar faedah di Malaysia diturunkan"],
        ["D-spekulasi", "Spekulasi: ringgit dijangka jatuh nilai"]
      ]
    },
    {
      label: "Penawaran ringgit bertambah (SS ke kanan)",
      pilihan: [
        ["S+import", "Import Malaysia meningkat"],
        ["S+melancong", "Lebih ramai rakyat Malaysia melancong ke luar negara"],
        ["S+labur", "Pelaburan Malaysia ke luar negara meningkat"]
      ]
    },
    {
      label: "Penawaran ringgit berkurang (SS ke kiri)",
      pilihan: [["S-import", "Import Malaysia berkurang"]]
    }
  ];

  var FAKTOR_SEKATAN = [
    {
      label: "Sekatan perdagangan (penawaran berkurang)",
      pilihan: [
        ["S-tarif", "Tarif (cukai import) dikenakan"],
        ["S-kuota", "Kuota import dihadkan"],
        ["S-embargo", "Embargo: import dari negara tertentu dilarang"],
        ["S-bukan", "Sekatan bukan ekonomi: piawaian kesihatan & keselamatan"]
      ]
    },
    {
      label: "Liberalisasi (penawaran bertambah)",
      pilihan: [
        ["S+bebas", "Tarif dihapuskan (perdagangan bebas, contoh AFTA)"],
        ["S+subsidi", "Subsidi kepada pengeluar tempatan"]
      ]
    }
  ];

  G.daftar("keseimbangan", function (host, opt) {
    var pr = Object.assign({}, PRESET_SS[opt.preset] || PRESET_SS.seluar);
    var mod = pr.mod;
    var K = G.kad(host, {
      tajuk: opt.tajuk || pr.tajuk,
      petunjuk: mod === "forex" || mod === "sekatan" ? "Pilih faktor, perhati keseimbangan baharu" : "Seret garis harga"
    });
    var st = {
      dqD: 0,
      dqS: 0,
      p: pr.hargaAwal,
      tunjukHarga: pr.hargaAwal != null,
      faktor: ""
    };
    var tweenD = null,
      tweenS = null,
      tweenP = null;

    var E0 = G.silang(G.kelukD(pr.a, pr.b, 0), G.kelukS(pr.c, pr.d, 0));

    // ---- kawalan ----
    if (mod === "pasaran") {
      if (!pr.ringkas) {
        G.butang(K.kawalan, "Permintaan ↑", function () {
          animD(pr.anjak);
        });
        G.butang(K.kawalan, "Permintaan ↓", function () {
          animD(-pr.anjak);
        });
        G.butang(K.kawalan, "Penawaran ↑", function () {
          animS(pr.anjak);
        });
        G.butang(K.kawalan, "Penawaran ↓", function () {
          animS(-pr.anjak);
        });
        G.pemisah(K.kawalan);
      }
      G.butang(K.kawalan, E.ikon("tangan") + " Biarkan pasaran menyesuaikan", function () {
        laraskan();
      });
      G.butang(K.kawalan, E.ikon("ulang") + " Set semula", function () {
        animD(0);
        animS(0);
        st.tunjukHarga = true;
        animP(pr.hargaAwal);
      });
    } else if (mod === "kawalan") {
      G.segmen(
        K.kawalan,
        [
          ["maks", "Harga maksimum (siling)"],
          ["min", "Harga minimum (lantai)"]
        ],
        "maks",
        function (v) {
          var e = semasaE();
          animP(v === "maks" ? e.p * 0.72 : e.p * 1.28);
        }
      );
      G.butang(K.kawalan, E.ikon("ulang") + " Mansuhkan kawalan", function () {
        animP(semasaE().p);
      });
    } else {
      var pil = G.pilih(K.kawalan, {
        label: mod === "forex" ? "Pilih peristiwa" : "Pilih dasar",
        kumpulan: [{ pilihan: [["", "— pilih —"]] }].concat(mod === "forex" ? FAKTOR_FOREX : FAKTOR_SEKATAN),
        ubah: function (v) {
          st.faktor = v;
          if (!v) {
            animD(0);
            animS(0);
            return;
          }
          var keluk = v.charAt(0);
          var arah = v.charAt(1) === "+" ? 1 : -1;
          var kuat = v === "S-embargo" ? 1.8 : v === "S-bukan" ? 0.6 : 1;
          if (keluk === "D") {
            animS(0);
            animD(arah * pr.anjak * kuat);
          } else {
            animD(0);
            animS(arah * pr.anjak * kuat);
          }
        }
      });
      G.butang(K.kawalan, E.ikon("ulang") + " Set semula", function () {
        pil.set("");
        st.faktor = "";
        animD(0);
        animS(0);
      });
    }

    var plot = G.plot(K.kanvas, {
      x: pr.x,
      y: pr.y,
      tikX: pr.tikX,
      tikY: pr.tikY,
      labelX: pr.labelX,
      labelY: pr.labelY,
      fmtTikY: pr.fmtTikY,
      nisbah: function (w) {
        return w < 480 ? 0.9 : 0.62;
      },
      aria: "Graf keseimbangan pasaran interaktif"
    });

    function D() {
      return G.kelukD(pr.a, pr.b, st.dqD);
    }
    function S() {
      return G.kelukS(pr.c, pr.d, st.dqS);
    }
    function semasaE() {
      return G.silang(D(), S());
    }

    function animD(v) {
      if (tweenD) tweenD();
      tweenD = G.tween(st.dqD, v, 520, function (x) {
        st.dqD = x;
        lukis();
      });
    }
    function animS(v) {
      if (tweenS) tweenS();
      tweenS = G.tween(st.dqS, v, 520, function (x) {
        st.dqS = x;
        lukis();
      });
    }
    function animP(v, ms) {
      if (tweenP) tweenP();
      st.tunjukHarga = true;
      tweenP = G.tween(st.p == null ? v : st.p, v, ms || 700, function (x) {
        st.p = x;
        lukis();
      });
    }
    function laraskan() {
      var e = semasaE();
      if (st.p == null) st.p = e.p;
      animP(e.p, 1400);
    }

    function lukis() {
      plot.kosong();
      plot.paksi();
      var d0 = G.kelukD(pr.a, pr.b, 0),
        s0 = G.kelukS(pr.c, pr.d, 0);
      var d1 = D(),
        s1 = S();
      var adaD = Math.abs(st.dqD) > pr.anjak * 0.01;
      var adaS = Math.abs(st.dqS) > pr.anjak * 0.01;
      var x0 = pr.x[0],
        x1 = pr.x[1];
      if (adaD) plot.fungsi(d0.P, x0, x1, "g-lengkung d hantu", "hantu");
      if (adaS) plot.fungsi(s0.P, x0, x1, "g-lengkung s hantu", "hantu");
      plot.fungsi(d1.P, x0, x1, "g-lengkung d", "lengkung");
      plot.fungsi(s1.P, x0, x1, "g-lengkung s", "lengkung");
      labelKeluk(d1, adaD ? "D₁" : mod === "forex" ? "DD (ringgit)" : "DD", "d", true);
      labelKeluk(s1, adaS ? "S₁" : mod === "forex" ? "SS (ringgit)" : "SS", "s", false);
      if (adaD) labelKeluk(d0, "D₀", "d lemah", true);
      if (adaS) labelKeluk(s0, "S₀", "s lemah", false);

      var e1 = G.silang(d1, s1);
      var berubah = adaD || adaS;
      if (berubah) {
        plot.panduanKePaksi(E0.q, E0.p, {});
        plot.nod(E0.q, E0.p, { kelas: "", r: 5, label: "E₀", kelasLabel: "lemah", dx: -22, dy: -8 });
        // anak panah peralihan
        var pRef = pr.y[0] + (pr.y[1] - pr.y[0]) * 0.8;
        if (adaD) {
          var qa = d0.Q(pRef),
            qb = d1.Q(pRef);
          if (qa > x0 && qb > x0 && qa < x1 && qb < x1) plot.panah(qa, pRef, qb, pRef, "d", "tanda", 9);
        }
        if (adaS) {
          var pRef2 = pr.y[0] + (pr.y[1] - pr.y[0]) * 0.85;
          var qc = s0.Q(pRef2),
            qd = s1.Q(pRef2);
          if (qc > x0 && qd > x0 && qc < x1 && qd < x1) plot.panah(qc, pRef2, qd, pRef2, "s", "tanda", 9);
        }
      }
      plot.panduanKePaksi(e1.q, e1.p, {
        labelY: pr.fmtP(e1.p),
        labelX: mod === "forex" ? "RM" + E.fmt(e1.q, 0) + "b" : E.fmt(e1.q, 1)
      });
      plot.nod(e1.q, e1.p, { kelas: "isi", r: 6, label: berubah ? "E₁" : "E", dx: 10, dy: -10 });

      // garis harga
      var info = null;
      if (st.tunjukHarga && st.p != null && (mod === "pasaran" || mod === "kawalan")) {
        info = lukisHarga(d1, s1, e1);
      }
      baca(e1, info, berubah);
    }

    function labelKeluk(Kx, teks, kls, isD) {
      var q, p;
      if (isD) {
        q = Math.min(pr.x[1] * 0.96, Kx.Q(pr.y[0] + (pr.y[1] - pr.y[0]) * 0.08));
      } else {
        q = Math.min(pr.x[1] * 0.93, Kx.Q(pr.y[1] * 0.93));
      }
      p = Kx.P(q);
      if (q > pr.x[0] && q <= pr.x[1] && p >= pr.y[0] && p <= pr.y[1]) {
        plot.teks(q, p, teks, "g-teks " + kls, "end", "label", -6, isD ? -8 : 16);
      }
    }

    function lukisHarga(d1, s1, e1) {
      var p = st.p;
      var qd = d1.Q(p),
        qs = s1.Q(p);
      var px0 = plot.kiri(),
        px1 = plot.kanan();
      var py = plot.Y(p);
      var beza = qd - qs;
      var tol = (pr.x[1] - pr.x[0]) * 0.006;
      // kawasan lebihan
      if (Math.abs(beza) > tol) {
        var qa = Math.min(qd, qs),
          qb = Math.max(qd, qs);
        var kelas = beza > 0 ? "d" : "s";
        var tinggiKurung = (pr.y[1] - pr.y[0]) * 0.035;
        plot.segi(qa, p, qb, p + (beza > 0 ? -1 : 1) * tinggiKurung * 1.8, "g-kawasan " + kelas, "kawasan");
        plot.garis(qa, p, qa, p + (beza > 0 ? -1 : 1) * tinggiKurung, "g-garis-kurung " + kelas, "tanda");
        plot.garis(qb, p, qb, p + (beza > 0 ? -1 : 1) * tinggiKurung, "g-garis-kurung " + kelas, "tanda");
        plot.garis(qa, p + (beza > 0 ? -1 : 1) * tinggiKurung, qb, p + (beza > 0 ? -1 : 1) * tinggiKurung, "g-garis-kurung " + kelas, "tanda");
        var tengah = (qa + qb) / 2;
        var lbl = (beza > 0 ? "Lebihan permintaan " : "Lebihan penawaran ") + E.fmt(Math.abs(beza), pr.dpKurung != null ? pr.dpKurung : 1);
        plot.cip(plot.X(tengah), plot.Y(p + (beza > 0 ? -1 : 1) * tinggiKurung * 3.1), lbl, { anchor: "middle", warna: beza > 0 ? "var(--c-d)" : "var(--c-s)" });
        plot.bulat(qd, p, 5, "g-nod isi d", "tanda");
        plot.bulat(qs, p, 5, "g-nod isi s", "tanda");
        // tekanan harga
        if (mod === "pasaran") {
          var ax = px0 + 16;
          plot.panahPx(ax, py + (beza > 0 ? 14 : -14), ax, py + (beza > 0 ? -22 : 22), "aksen", "tanda", 8);
        }
      }
      // garis & pemegang
      svgEl("line", { x1: px0, y1: py, x2: px1, y2: py, class: "g-garis-harga" }, plot.lapis.panduan);
      var g = svgEl("g", { "data-pegang": "harga", class: "g-pemegang", style: "touch-action:none" }, plot.lapis.pemegang);
      svgEl("line", { x1: px0, y1: py, x2: px1, y2: py, class: "g-garis-hit" }, g);
      svgEl("circle", { cx: px1 - 6, cy: py, r: 15, class: "g-nod-halo" }, g);
      svgEl("circle", { cx: px1 - 6, cy: py, r: 8, class: "g-nod" }, g);
      var labelH = pr.fmtP(p);
      if (mod === "kawalan") {
        var e = e1;
        if (p < e.p - (pr.y[1] - pr.y[0]) * 0.01) labelH = "Harga maksimum " + labelH;
        else if (p > e.p + (pr.y[1] - pr.y[0]) * 0.01) labelH = "Harga minimum " + labelH;
      }
      plot.cip(px1 - 22, py - 16, labelH, { anchor: "end" });
      return { p: p, qd: qd, qs: qs, beza: beza, tol: tol };
    }

    function baca(e1, info, berubah) {
      var bits = [];
      var ayat = "";
      if (info) {
        bits.push(["Harga", pr.fmtP(info.p), ""]);
        bits.push(["Kuantiti diminta", pr.fmtQ(info.qd), "d"]);
        bits.push(["Kuantiti ditawarkan", pr.fmtQ(info.qs), "s"]);
      }
      bits.push(["Keseimbangan", pr.fmtP(e1.p) + " · " + pr.fmtQ(e1.q), ""]);

      if (mod === "pasaran") {
        if (info && Math.abs(info.beza) > info.tol) {
          if (info.beza > 0) {
            ayat = '<span class="status biru">Lebihan permintaan</span> Pada ' + pr.fmtP(info.p) + " (lebih rendah daripada harga keseimbangan), kuantiti diminta melebihi kuantiti ditawarkan sebanyak <b>" + pr.fmtQ(info.beza) + "</b>. Harga cenderung <b>naik</b>: pengeluar menambah penawaran, pengguna mengurangkan permintaan sehingga keseimbangan dicapai.";
          } else {
            ayat = '<span class="status merah">Lebihan penawaran</span> Pada ' + pr.fmtP(info.p) + " (lebih tinggi daripada harga keseimbangan), kuantiti ditawarkan melebihi kuantiti diminta sebanyak <b>" + pr.fmtQ(-info.beza) + "</b>. Harga cenderung <b>turun</b>: pengguna menambah permintaan, pengeluar mengurangkan penawaran.";
          }
        } else {
          ayat = '<span class="status baik">Keseimbangan</span> Kuantiti diminta sama dengan kuantiti ditawarkan. Harga dan kuantiti tidak cenderung berubah.';
        }
        if (berubah) ayat += " " + ayatPerubahan(e1);
      } else if (mod === "kawalan") {
        if (info && info.beza > info.tol) {
          ayat = '<span class="status biru">Harga maksimum</span> Kerajaan menetapkan harga <b>lebih rendah</b> daripada harga keseimbangan untuk melindungi pengguna. Akibatnya berlaku <b>lebihan permintaan (kekurangan barang) sebanyak ' + pr.fmtQ(info.beza) + "</b>. Kesan sampingan: barang sukar didapati, beratur panjang, pasaran gelap, maka kerajaan mungkin perlu melaksanakan catuan.";
        } else if (info && info.beza < -info.tol) {
          ayat = '<span class="status merah">Harga minimum</span> Kerajaan menetapkan harga <b>lebih tinggi</b> daripada harga keseimbangan untuk melindungi pengeluar (contoh: harga minimum padi, gaji minimum). Akibatnya berlaku <b>lebihan penawaran sebanyak ' + pr.fmtQ(-info.beza) + "</b>, yang mungkin perlu dibeli dan disimpan oleh kerajaan.";
        } else {
          ayat = '<span class="status baik">Tiada kawalan berkesan</span> Harga berada pada tingkat keseimbangan pasaran.';
        }
      } else if (mod === "forex") {
        var r0 = E0.p,
          r1 = e1.p;
        var usd = 1 / r1;
        bits.push(["USD1 =", "RM" + E.fmt(usd, 4, true), "c3"]);
        if (!berubah) {
          ayat = "Kadar pertukaran ditentukan oleh permintaan dan penawaran ringgit. Pilih satu peristiwa untuk melihat kesannya.";
        } else if (r1 > r0 + 1e-6) {
          ayat = '<span class="status baik">Ringgit meningkat nilai</span> RM1 kini bernilai ' + pr.fmtP(r1) + " (sebelum ini " + pr.fmtP(r0) + "). Import menjadi lebih murah bagi rakyat Malaysia, tetapi harga eksport Malaysia menjadi lebih mahal bagi pembeli asing.";
        } else {
          ayat = '<span class="status buruk">Ringgit susut nilai</span> RM1 kini hanya bernilai ' + pr.fmtP(r1) + " (sebelum ini " + pr.fmtP(r0) + "). Eksport Malaysia menjadi lebih murah dan berdaya saing, tetapi barang import menjadi lebih mahal.";
        }
      } else if (mod === "sekatan") {
        if (!berubah) {
          ayat = "Pilih satu dasar untuk melihat kesannya terhadap harga dan kuantiti keseimbangan barang di pasaran tempatan.";
        } else if (st.dqS < 0) {
          ayat = '<span class="status buruk">Penawaran berkurang</span> Sekatan mengurangkan barang import di pasaran, keluk SS beralih ke kiri. Harga keseimbangan <b>naik</b> daripada ' + pr.fmtP(E0.p) + " kepada " + pr.fmtP(e1.p) + ", kuantiti keseimbangan <b>turun</b> daripada " + pr.fmtQ(E0.q) + " kepada " + pr.fmtQ(e1.q) + ". Pengeluar tempatan terlindung, pengguna membayar lebih.";
        } else {
          ayat = '<span class="status baik">Penawaran bertambah</span> Keluk SS beralih ke kanan. Harga keseimbangan <b>turun</b> kepada ' + pr.fmtP(e1.p) + " dan kuantiti keseimbangan <b>naik</b> kepada " + pr.fmtQ(e1.q) + ". Pengguna mendapat lebih banyak pilihan pada harga lebih rendah.";
        }
      }
      K.baca.innerHTML = G.nilai(bits) + '<div class="ayat">' + ayat + "</div>";
    }

    function ayatPerubahan(e1) {
      var bahagian = [];
      if (st.dqD > 0.01) bahagian.push("pertambahan permintaan");
      if (st.dqD < -0.01) bahagian.push("pengurangan permintaan");
      if (st.dqS > 0.01) bahagian.push("pertambahan penawaran");
      if (st.dqS < -0.01) bahagian.push("pengurangan penawaran");
      var arahP = e1.p > E0.p + 0.01 ? "naik" : e1.p < E0.p - 0.01 ? "turun" : "tidak berubah";
      var arahQ = e1.q > E0.q + 0.01 ? "naik" : e1.q < E0.q - 0.01 ? "turun" : "tidak berubah";
      return "Kesan " + bahagian.join(" dan ") + ": harga keseimbangan <b>" + arahP + "</b> (" + pr.fmtP(E0.p) + " → " + pr.fmtP(e1.p) + "), kuantiti keseimbangan <b>" + arahQ + "</b> (" + pr.fmtQ(E0.q) + " → " + pr.fmtQ(e1.q) + ").";
    }

    G.interaksi(plot, {
      seret: function (n, pt, fasa) {
        if (n !== "harga") return;
        if (fasa === "mula" && tweenP) tweenP();
        st.p = E.clamp(pt.y, pr.pMin != null ? pr.pMin : pr.y[0], pr.pMaks != null ? pr.pMaks : pr.y[1]);
        lukis();
      },
      kekunci: function (k) {
        if (!st.tunjukHarga || st.p == null) return false;
        st.p = E.clamp(st.p + (k.dy || k.dx) * (pr.y[1] - pr.y[0]) * 0.01, pr.pMin, pr.pMaks);
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
        [tweenD, tweenS, tweenP].forEach(function (t) {
          if (t) t();
        });
      }
    };
  }, { tajuk: "Keseimbangan & ketidakseimbangan pasaran", bab: "t4-b2" });

  /* =========================================================
     WIDGET: keanjalan harga (permintaan / penawaran)
     ========================================================= */
  var PRESET_ANJAL = {
    "dd-anjal": {
      jenis: "d",
      label: "Anjal (barang mewah)",
      A: [60, 20],
      B: [90, 16],
      f: function (q) {
        return 28 - (2 / 15) * q;
      },
      g: function (p) {
        return (28 - p) * 7.5;
      },
      x: [0, 150],
      y: [0, 30],
      tikX: [0, 30, 60, 90, 120, 150],
      tikY: [0, 5, 10, 15, 20, 25, 30],
      qMin: 15,
      qMaks: 140
    },
    "dd-takanjal": {
      jenis: "d",
      label: "Tak anjal (barang keperluan)",
      A: [100, 40],
      B: [80, 72],
      f: function (q) {
        return 200 - 1.6 * q;
      },
      g: function (p) {
        return (200 - p) / 1.6;
      },
      x: [0, 140],
      y: [0, 100],
      tikX: [0, 20, 40, 60, 80, 100, 120, 140],
      tikY: [0, 20, 40, 60, 80, 100],
      qMin: 64,
      qMaks: 122
    },
    "ss-anjal": {
      jenis: "s",
      label: "Anjal (barang perkilangan)",
      A: [150, 50],
      B: [180, 52],
      f: function (q) {
        return 40 + q / 15;
      },
      g: function (p) {
        return (p - 40) * 15;
      },
      x: [0, 250],
      y: [0, 60],
      tikX: [0, 50, 100, 150, 200, 250],
      tikY: [0, 10, 20, 30, 40, 50, 60],
      qMin: 40,
      qMaks: 240
    },
    "ss-takanjal": {
      jenis: "s",
      label: "Tak anjal (barang pertanian)",
      A: [400, 8],
      B: [440, 10],
      f: function (q) {
        return 0.05 * q - 12;
      },
      g: function (p) {
        return (p + 12) / 0.05;
      },
      x: [0, 500],
      y: [0, 14],
      tikX: [0, 100, 200, 300, 400, 500],
      tikY: [0, 2, 4, 6, 8, 10, 12, 14],
      qMin: 260,
      qMaks: 495
    }
  };

  G.daftar("keanjalan", function (host, opt) {
    var jenis = opt.jenis === "ss" ? "ss" : "dd";
    var isD = jenis === "dd";
    var K = G.kad(host, {
      tajuk: opt.tajuk || (isD ? "Keanjalan harga permintaan & jumlah hasil" : "Keanjalan harga penawaran"),
      petunjuk: "Seret titik B di sepanjang keluk"
    });
    var st = { preset: jenis + "-" + (opt.mula || "anjal"), qB: null };
    G.segmen(
      K.kawalan,
      [
        [jenis + "-anjal", "Keluk landai · anjal"],
        [jenis + "-takanjal", "Keluk curam · tak anjal"]
      ],
      st.preset,
      function (v) {
        st.preset = v;
        st.qB = null;
        var pr = PRESET_ANJAL[v];
        plot.julat(pr.x, pr.y);
        plot.cfg.tikX = pr.tikX;
        plot.cfg.tikY = pr.tikY;
        lukis();
      }
    );
    var pr0 = PRESET_ANJAL[st.preset];
    var plot = G.plot(K.kanvas, {
      x: pr0.x,
      y: pr0.y,
      tikX: pr0.tikX,
      tikY: pr0.tikY,
      labelX: isD ? "Kuantiti (unit)" : "Kuantiti (unit)",
      labelY: "Harga (RM)",
      nisbah: function (w) {
        return w < 480 ? 0.9 : 0.6;
      },
      aria: "Graf keanjalan harga interaktif"
    });

    function lukis() {
      var pr = PRESET_ANJAL[st.preset];
      if (st.qB == null) st.qB = pr.B[0];
      st.qB = E.clamp(st.qB, pr.qMin, pr.qMaks);
      var qA = pr.A[0],
        pA = pr.A[1];
      var qB = st.qB,
        pB = pr.f(qB);
      plot.kosong();
      plot.paksi();
      var kls = isD ? "d" : "s";
      if (isD) {
        // kawasan jumlah hasil
        var qMin = Math.min(qA, qB),
          pMin = Math.min(pA, pB);
        plot.segi(0, 0, qMin, pMin, "g-kawasan kelabu", "kawasan");
        if (pB < pA) {
          plot.segi(0, pB, qA, pA, "g-kawasan buruk", "kawasan");
          plot.segi(qA, 0, qB, pB, "g-kawasan baik", "kawasan");
        } else if (pB > pA) {
          plot.segi(qB, 0, qA, pA, "g-kawasan buruk", "kawasan");
          plot.segi(0, pA, qB, pB, "g-kawasan baik", "kawasan");
        }
      }
      plot.fungsi(pr.f, pr.x[0], pr.x[1], "g-lengkung " + kls, "lengkung");
      var qL = isD ? Math.min(pr.x[1] * 0.97, pr.g(pr.y[0] + (pr.y[1] - pr.y[0]) * 0.1)) : Math.min(pr.x[1] * 0.96, pr.g(pr.y[1] * 0.94));
      plot.teks(qL, pr.f(qL), isD ? "DD" : "SS", "g-teks " + kls, "end", "label", -6, isD ? -8 : 16);
      plot.panduanKePaksi(qA, pA, { labelY: "RM" + E.fmt(pA, 2), labelX: E.fmt(qA, 0) });
      plot.nod(qA, pA, { kelas: kls + " isi", r: 6, label: "A", dx: -18, dy: -10, kelasLabel: kls });
      plot.panduanKePaksi(qB, pB, { labelY: "RM" + E.fmt(pB, 2), labelX: E.fmt(qB, 0) });
      plot.nod(qB, pB, { kelas: kls, pegang: "B", label: "B", dx: 12, dy: -12, kelasLabel: kls });
      if (Math.abs(qB - qA) > (pr.x[1] - pr.x[0]) * 0.03) plot.panah(qA, pA, qB, pB, "aksen", "tanda", 9);
      baca(pr, qA, pA, qB, pB);
    }

    function baca(pr, qA, pA, qB, pB) {
      var dQ = ((qB - qA) / qA) * 100;
      var dP = ((pB - pA) / pA) * 100;
      var ek = Math.abs(dP) > 1e-9 ? dQ / dP : NaN;
      var nilaiE = Math.abs(ek);
      var jenisE = nilaiE > 1.0001 ? "anjal" : nilaiE < 0.9999 ? "tak anjal" : "anjal uniti";
      var bits = [
        ["%ΔP", (dP > 0 ? "+" : "") + E.fmt(dP, 1) + "%", ""],
        ["%ΔQ", (dQ > 0 ? "+" : "") + E.fmt(dQ, 1) + "%", ""],
        [isD ? "E<sub>d</sub>" : "E<sub>s</sub>", isFinite(ek) ? E.fmt(nilaiE, 2) : "–", isD ? "d" : "s"]
      ];
      var ayat = "";
      if (!isFinite(ek) || Math.abs(dP) < 0.05) {
        ayat = "Seret titik B untuk mengubah harga. Nilai pekali dikira daripada titik asal A.";
      } else if (isD) {
        var trA = pA * qA,
          trB = pB * qB,
          dTR = trB - trA;
        bits.push(["TR di A", E.rm(trA, 0), ""]);
        bits.push(["TR di B", E.rm(trB, 0), dTR >= 0 ? "c3" : "s"]);
        var arahP = pB < pA ? "turun" : "naik";
        var arahTR = dTR > 0 ? "meningkat" : "menurun";
        ayat =
          'Permintaan <span class="status ' + (jenisE === "anjal" ? "baik" : "amaran") + '">' + jenisE + "</span> kerana |E<sub>d</sub>| = " + E.fmt(nilaiE, 2) + (jenisE === "anjal" ? " > 1" : " < 1") +
          " (%ΔQ " + (Math.abs(dQ) > Math.abs(dP) ? "lebih besar" : "lebih kecil") + " daripada %ΔP). Apabila harga " + arahP + ", jumlah hasil <b>" + arahTR + " sebanyak " + E.rm(Math.abs(dTR), 0) + "</b>. " +
          "Kawasan hijau ialah hasil yang ditambah, kawasan merah ialah hasil yang berkurang.";
      } else {
        ayat =
          'Penawaran <span class="status ' + (jenisE === "anjal" ? "baik" : "amaran") + '">' + jenisE + "</span> kerana E<sub>s</sub> = " + E.fmt(nilaiE, 2) + (jenisE === "anjal" ? " > 1" : " < 1") +
          ". Tanda positif menunjukkan hubungan positif antara harga dengan kuantiti ditawarkan. " +
          (jenisE === "anjal" ? "Barang perkilangan boleh ditambah pengeluarannya dengan cepat apabila harga naik." : "Barang pertanian sukar ditambah pengeluarannya dalam jangka pendek.");
      }
      K.baca.innerHTML = G.nilai(bits) + '<div class="ayat">' + ayat + "</div>";
    }

    G.interaksi(plot, {
      seret: function (n, pt) {
        if (n !== "B") return;
        var pr = PRESET_ANJAL[st.preset];
        var qx = pt.x,
          qy = pr.g(pt.y);
        var dx = Math.abs(plot.Y(pr.f(qx)) - pt.py);
        var dy = Math.abs(plot.X(qy) - pt.px);
        st.qB = dx < dy ? qx : qy;
        lukis();
      },
      kekunci: function (k) {
        var pr = PRESET_ANJAL[st.preset];
        st.qB += (k.dx || k.dy) * (pr.x[1] - pr.x[0]) * 0.01;
        lukis();
      }
    });
    lukis();
    var henti = G.pantauSaiz(K.kanvas, function () {
      plot.ukur();
      lukis();
    });
    return { musnah: henti };
  }, { tajuk: "Keanjalan harga", bab: "t4-b2" });

  /* =========================================================
     WIDGET: cukai & subsidi (beban dan faedah)
     ========================================================= */
  G.daftar("cukai-subsidi", function (host, opt) {
    var K = G.kad(host, {
      tajuk: opt.tajuk || "Siapa menanggung cukai? Siapa menikmati subsidi?",
      petunjuk: "Ubah jenis dasar, keanjalan dan kadar"
    });
    var st = { dasar: opt.dasar || "cukai", dd: opt.dd || "anjal", t: opt.t != null ? opt.t : 6 };
    var S0 = { c: 10, d: 0.8 };
    var DD = {
      anjal: { a: 34, b: 0.4 },
      takanjal: { a: 66, b: 2 }
    };
    G.segmen(
      K.kawalan,
      [
        ["cukai", "Cukai per unit"],
        ["subsidi", "Subsidi per unit"]
      ],
      st.dasar,
      function (v) {
        st.dasar = v;
        lukis();
      }
    );
    G.pemisah(K.kawalan);
    G.segmen(
      K.kawalan,
      [
        ["anjal", "Permintaan anjal"],
        ["takanjal", "Permintaan tak anjal"]
      ],
      st.dd,
      function (v) {
        st.dd = v;
        lukis();
      }
    );
    G.julat(K.kawalan, {
      label: "Kadar",
      min: 0,
      max: 10,
      step: 0.5,
      nilai: st.t,
      fmt: function (v) {
        return "RM" + E.fmt(v, 1, true) + "/unit";
      },
      ubah: function (v) {
        st.t = v;
        lukis();
      }
    });
    var plot = G.plot(K.kanvas, {
      x: [0, 40],
      y: [0, 50],
      tikX: [0, 5, 10, 15, 20, 25, 30, 35, 40],
      tikY: [0, 10, 20, 30, 40, 50],
      labelX: "Kuantiti (unit)",
      labelY: "Harga (RM)",
      nisbah: function (w) {
        return w < 480 ? 0.92 : 0.62;
      },
      aria: "Graf kesan cukai dan subsidi"
    });

    function lukis() {
      plot.kosong();
      plot.paksi();
      var dd = DD[st.dd];
      var D = G.kelukD(dd.a, dd.b, 0);
      var s0 = G.kelukS(S0.c, S0.d, 0, 0);
      var tanda = st.dasar === "cukai" ? 1 : -1;
      var s1 = G.kelukS(S0.c, S0.d, 0, tanda * st.t);
      var e0 = G.silang(D, s0);
      var e1 = G.silang(D, s1);
      var pPengeluar = e1.p - tanda * st.t; // harga bersih diterima pengeluar
      var ada = st.t > 0.01;
      if (ada) {
        if (st.dasar === "cukai") {
          plot.segi(0, e0.p, e1.q, e1.p, "g-kawasan d", "kawasan");
          plot.segi(0, pPengeluar, e1.q, e0.p, "g-kawasan s", "kawasan");
        } else {
          plot.segi(0, e1.p, e1.q, e0.p, "g-kawasan d", "kawasan");
          plot.segi(0, e0.p, e1.q, pPengeluar, "g-kawasan s", "kawasan");
        }
      }
      plot.fungsi(D.P, 0, 40, "g-lengkung d", "lengkung");
      plot.fungsi(s0.P, 0, 40, "g-lengkung s" + (ada ? " hantu" : ""), ada ? "hantu" : "lengkung");
      if (ada) plot.fungsi(s1.P, 0, 40, "g-lengkung s", "lengkung");
      var qD = Math.min(38, D.Q(4));
      plot.teks(qD, D.P(qD), "DD", "g-teks d", "end", "label", -4, -8);
      plot.teks(38, s0.P(38), ada ? "S₀" : "SS", "g-teks s" + (ada ? " lemah" : ""), "end", "label", -4, 16);
      if (ada) {
        var qS1 = Math.min(38, s1.Q(48));
        plot.teks(qS1, s1.P(qS1), st.dasar === "cukai" ? "S₁ (+cukai)" : "S₁ (+subsidi)", "g-teks s", "end", "label", -6, st.dasar === "cukai" ? -8 : 16);
      }
      plot.panduanKePaksi(e0.q, e0.p, { labelY: "P₀ " + E.fmt(e0.p, 2), labelX: "Q₀" });
      plot.nod(e0.q, e0.p, { r: 5, label: "E₀", kelasLabel: "lemah", dx: -24, dy: -8 });
      if (ada) {
        plot.panduanKePaksi(e1.q, e1.p, { labelY: "P₁ " + E.fmt(e1.p, 2), labelX: "Q₁" });
        plot.garisPx(plot.kiri(), plot.Y(pPengeluar), plot.X(e1.q), plot.Y(pPengeluar), "g-panduan", "panduan");
        plot.cip(plot.kiri() - 4, plot.Y(pPengeluar), E.fmt(pPengeluar, 2), { anchor: "end", warna: "var(--c-s)" });
        plot.nod(e1.q, e1.p, { kelas: "isi", r: 6, label: "E₁", dx: 10, dy: -10 });
        plot.bulat(e1.q, pPengeluar, 4.5, "g-nod isi s", "tanda");
      }
      // bacaan
      var bebanP = Math.abs(e1.p - e0.p);
      var bebanS = Math.abs(pPengeluar - e0.p);
      var jumlah = bebanP + bebanS;
      var bits = [
        ["P₀", E.rm(e0.p, 2), ""],
        ["P₁ (pengguna)", E.rm(e1.p, 2), "d"],
        ["Harga bersih pengeluar", E.rm(pPengeluar, 2), "s"],
        ["Q", E.fmt(e0.q, 1) + " → " + E.fmt(e1.q, 1), ""]
      ];
      var ayat;
      if (!ada) {
        ayat = "Naikkan kadar untuk melihat bagaimana keluk penawaran beralih.";
      } else if (st.dasar === "cukai") {
        bits.push(["Beban pengguna", E.fmt((bebanP / jumlah) * 100, 0) + "%", "d"]);
        bits.push(["Beban pengeluar", E.fmt((bebanS / jumlah) * 100, 0) + "%", "s"]);
        ayat =
          "Cukai menambah kos pengeluaran, keluk penawaran beralih ke kiri (ke atas) sebanyak RM" + E.fmt(st.t, 2) + " seunit. " +
          (st.dd === "anjal"
            ? "Kerana permintaan <b>anjal</b>, pengeluar sukar menaikkan harga, jadi <b>beban pengeluar lebih besar</b> daripada beban pengguna."
            : "Kerana permintaan <b>tak anjal</b>, pengeluar boleh memindahkan cukai melalui harga, jadi <b>beban pengguna lebih besar</b>.") +
          " Hasil cukai kerajaan = RM" + E.fmt(st.t, 2) + " × " + E.fmt(e1.q, 1) + " = <b>" + E.rm(st.t * e1.q, 2) + "</b>.";
      } else {
        bits.push(["Faedah pengguna", E.fmt((bebanP / jumlah) * 100, 0) + "%", "d"]);
        bits.push(["Faedah pengeluar", E.fmt((bebanS / jumlah) * 100, 0) + "%", "s"]);
        ayat =
          "Subsidi mengurangkan kos pengeluaran, keluk penawaran beralih ke kanan (ke bawah). " +
          (st.dd === "anjal"
            ? "Kerana permintaan <b>anjal</b>, <b>pengeluar menikmati subsidi lebih besar</b> daripada pembeli."
            : "Kerana permintaan <b>tak anjal</b>, <b>pembeli menikmati subsidi lebih besar</b> melalui harga yang lebih rendah.") +
          " Kos subsidi kepada kerajaan = <b>" + E.rm(st.t * e1.q, 2) + "</b>.";
      }
      K.baca.innerHTML = G.nilai(bits) + '<div class="ayat">' + ayat + ' <span class="teks-lemah">Kawasan biru: bahagian pengguna. Kawasan merah: bahagian pengeluar.</span></div>';
    }
    lukis();
    var henti = G.pantauSaiz(K.kanvas, function () {
      plot.ukur();
      lukis();
    });
    return { musnah: henti };
  }, { tajuk: "Kepentingan keanjalan: cukai & subsidi", bab: "t4-b2" });

  /* =========================================================
     Rajah statik (untuk soalan kuiz)
     spec: { x, y, labelX, labelY, keluk:[{jenis:'garis', dari:[q,p], ke:[q,p], kelas, label}],
             titik:[{q,p,label}], panduan:[{q,p,lx,ly}], panah:[{dari,ke,kelas}], teks:[{q,p,t,kelas,anchor}] }
     ========================================================= */
  G.statik = function (spec) {
    var plot = new Plot(null, {
      statik: true,
      lebar: spec.lebar || 400,
      tinggi: spec.tinggi || 280,
      x: spec.x || [0, 10],
      y: spec.y || [0, 10],
      tikX: spec.tikX,
      tikY: spec.tikY,
      labelX: spec.labelX || "Kuantiti (unit)",
      labelY: spec.labelY || "Harga (RM)",
      grid: spec.grid === true,
      margin: spec.margin || { l: 46, r: 18, t: 24, b: 38 },
      aria: spec.aria || "Rajah"
    });
    plot.paksi();
    (spec.kawasan || []).forEach(function (k) {
      plot.segi(k.dari[0], k.dari[1], k.ke[0], k.ke[1], "g-kawasan " + (k.kelas || ""), "kawasan");
    });
    (spec.keluk || []).forEach(function (k) {
      var kelas = "g-lengkung " + (k.kelas || "");
      if (k.titik) plot.laluan(k.titik, kelas, "lengkung");
      else plot.laluan([k.dari, k.ke], kelas, "lengkung");
      if (k.label) {
        var hujung = k.labelDi === "awal" ? (k.titik ? k.titik[0] : k.dari) : k.titik ? k.titik[k.titik.length - 1] : k.ke;
        plot.teks(hujung[0], hujung[1], k.label, "g-teks " + (k.kelas || ""), k.anchor || "start", "label", k.dx != null ? k.dx : 6, k.dy != null ? k.dy : 4);
      }
    });
    (spec.panduan || []).forEach(function (g) {
      if (g.keY !== false) plot.garisPx(plot.kiri(), plot.Y(g.p), plot.X(g.q), plot.Y(g.p), "g-panduan", "panduan");
      if (g.keX !== false) plot.garisPx(plot.X(g.q), plot.Y(g.p), plot.X(g.q), plot.bawah(), "g-panduan", "panduan");
      if (g.ly) plot.teksPx(plot.kiri() - 6, plot.Y(g.p) + 4, g.ly, "g-tik", "end", "label");
      if (g.lx) plot.teksPx(plot.X(g.q), plot.bawah() + 15, g.lx, "g-tik", "middle", "label");
    });
    (spec.panah || []).forEach(function (a) {
      plot.panah(a.dari[0], a.dari[1], a.ke[0], a.ke[1], a.kelas || "", "tanda", 8);
    });
    (spec.titik || []).forEach(function (t) {
      plot.bulat(t.q, t.p, 4.5, "g-nod isi", "tanda");
      if (t.label) plot.teks(t.q, t.p, t.label, "g-teks", t.anchor || "start", "label", t.dx != null ? t.dx : 7, t.dy != null ? t.dy : -7);
    });
    (spec.teks || []).forEach(function (t) {
      plot.teks(t.q, t.p, t.t, "g-teks " + (t.kelas || ""), t.anchor || "start", "label", t.dx || 0, t.dy || 0);
    });
    return plot.svg.outerHTML;
  };
})();
